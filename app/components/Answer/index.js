import React from 'react';

import styles from './styles.css';

export default class extends React.Component {
  static propTypes = {
    isWeekend: React.PropTypes.bool
  };

  render() {
    const isWeekend = this.props.isWeekend;
    let answer;

    if (isWeekend === null) {
      answer = '...';
    } else {
      answer = isWeekend ? 'Yes' : 'Nope';
    }

    return <section className={styles.answer}>{answer}</section>;
  }
}
