import React from 'react';

import styles from './styles.css';

export default function Answer(props) {
  const answer = props.isWeekend ? 'Yes' : 'Nope';
  return <section className={styles.answer}>{answer}</section>;
}

Answer.propTypes = {
  isWeekend: React.PropTypes.bool.isRequired
};
