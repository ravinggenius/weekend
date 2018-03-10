import timeStamp from './time_stamp';
import styles from './tick.css';

export default (render) => render`
	<p>hello hyper!</p>
	<p>${timeStamp()}</p>
	<pre class=${styles.special}>${JSON.stringify(styles, null, 2)}</pre>
`;
