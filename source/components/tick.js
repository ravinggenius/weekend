import timeStamp from './time_stamp';

export default (render) => render`
	<p>hello hyper!</p>
	<p>${timeStamp()}</p>
`;
