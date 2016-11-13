import React from 'react';
import Color from 'color';
import ReactBody from 'react-body';

import Answer from 'components/Answer';
import ClockFace from 'components/ClockFace';

import styles from './styles.css';
import appStyles from 'containers/App/styles.css';

import { scale } from '../../utils/color';
import { isWeekend, partsRemaining } from '../../utils/time';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      now: new Date()
    });
  }

  render() {
    const happy = isWeekend(this.state.now);
    const parts = partsRemaining(this.state.now);

    const color = new Color({
      r: scale(parts.hours, happy ? 62 : 104),
      g: scale(parts.minutes, 59),
      b: scale(parts.seconds, 59)
    });

    document.body.style.backgroundColor = color.hexString();

    return <article className={styles.clock}>
      <ReactBody className={appStyles.isDark} if={color.dark()} />
      <ReactBody className={appStyles.isLight} if={color.light()} />
      <Answer isWeekend={happy} />
      <ClockFace {...parts} />
    </article>;
  }
}
