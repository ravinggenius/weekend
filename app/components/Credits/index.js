import React from 'react';

import styles from './styles.css';

export default function () {
  return <footer className={styles.credits}>
    <small className={styles.copyright}>
      ©&nbsp;
      <a href="http://www.ravinggenius.com/">Thomas Ingram</a>
    </small>
  </footer>;
}
