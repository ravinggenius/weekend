import { wire } from 'hyperhtml';

import styles from './styles.css';

export default ({ hours, minutes, seconds }) => wire({
	hours,
	minutes,
	seconds
})`
	<output className=${styles.clockFace}>
		<span>${hours.toString().padStart(3, '0')}</span>
		<span>:</span>
		<span>${minutes.toString().padStart(2, '0')}</span>
		<span>:</span>
		<span>${seconds.toString().padStart(2, '0')}</span>
	</output>
`;
