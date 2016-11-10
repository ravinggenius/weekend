import React from 'react';

import styles from './styles.css';

export default class extends React.Component {
  render() {
    return  <footer className={styles.credits}>
      <small className={styles.copyright}>© <a href="http://www.ravinggenius.com/">Thomas Ingram</a></small>
    </footer>;
  }
}
