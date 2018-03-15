import { wire } from 'hyperhtml';

import styles from './styles.css';

export default (isWeekend) => {
	const className = isWeekend ? styles.answerYes : styles.answerNo;

	return wire({
		isWeekend
	})`
		<p class=${className}>${isWeekend ? 'Yes!' : 'nope'}</p>
	`;
};
