import React from 'react';

import styles from './styles.css';

import { padLeft } from '../../utils/formatting';

export default function ClockFace(props) {
  return <output className={styles.clockFace}>
    <span>{padLeft(props.hours, 3)}</span>
    <span>:</span>
    <span>{padLeft(props.minutes, 2)}</span>
    <span>:</span>
    <span>{padLeft(props.seconds, 2)}</span>
  </output>;
}

ClockFace.propTypes = {
  hours: React.PropTypes.number.isRequired,
  minutes: React.PropTypes.number.isRequired,
  seconds: React.PropTypes.number.isRequired
};
