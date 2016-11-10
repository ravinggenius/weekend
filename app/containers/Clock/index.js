import React from 'react';
import Color from 'color';

import Answer from 'components/Answer';
import ClockFace from 'components/ClockFace';

import styles from './styles.css';
import appStyles from 'containers/App/styles.css';

import { scale } from '../../utils/color';
import { isWeekend, labelParts, secondsRemaining } from '../../utils/time';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWeekend: null,
      remaining: 0
    };
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    const now = new Date();

    this.setState({
      isWeekend: isWeekend(now),
      remaining: secondsRemaining(now)
    });
  }

  render() {
    const isWeekend = this.state.isWeekend;
    const parts = labelParts(this.state.remaining);

    const color = Color({
      r: scale(parts.hours, isWeekend ? 62 : 104),
      g: scale(parts.minutes, 59),
      b: scale(parts.seconds, 59)
    });

    document.body.classList.remove(appStyles.isDark);
    document.body.classList.remove(appStyles.isLight);
    document.body.classList.add(color.dark() ? appStyles.isDark : appStyles.isLight);

    document.body.style.backgroundColor = color.hexString();

    return <article className={styles.clock}>
      <Answer isWeekend={isWeekend} />
      <ClockFace {...parts} />
    </article>;
  }
}
