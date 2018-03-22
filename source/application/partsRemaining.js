import remainingSeconds from './remainingSeconds';

export default (now) => {
	let remaining = remainingSeconds(now);

	remaining = remaining / 60 / 60;
	const hours = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const minutes = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const seconds = Math.round(remaining);

	return { hours, minutes, seconds };
};
