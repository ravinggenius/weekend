/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import ReactBody from 'react-body';

import Clock from 'containers/Clock';
import Credits from 'components/Credits';

import styles from './styles.css';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return <main className={styles.container} role="main">
      <ReactBody className={styles.rainbow} />
      <ReactBody className={styles.isDark} />
      <Clock />
      {React.Children.toArray(this.props.children)}
      <Credits />
    </main>;
  }
}
