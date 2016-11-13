import React from 'react';

import styles from './styles.css';

export default function Answer(props) {
  const className = props.isWeekend ? styles.answerYes : styles.answerNo;
  const answer = props.isWeekend ? 'Yes!' : 'nope';
  return <section className={className}>{answer}</section>;
}

Answer.propTypes = {
  isWeekend: React.PropTypes.bool.isRequired
};
