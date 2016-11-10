import React from 'react';

import styles from './styles.css';

import { padLeft } from '../../utils/formatting';

export default class extends React.Component {
  static propTypes = {
    hours: React.PropTypes.number.isRequired,
    minutes: React.PropTypes.number.isRequired,
    seconds: React.PropTypes.number.isRequired
  };

  render() {
    return <output className={styles.clockFace}>
      <span>{padLeft(this.props.hours, 3)}</span>
      <span>:</span>
      <span>{padLeft(this.props.minutes, 2)}</span>
      <span>:</span>
      <span>{padLeft(this.props.seconds, 2)}</span>
    </output>;
  }
}
