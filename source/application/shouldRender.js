let previous = {};

export default (parts) => {
	const reply = (previous.seconds !== parts.seconds) ||
		(previous.minutes !== parts.minutes) ||
		(previous.hours !== parts.hours);

	if (reply) {
		previous = parts;
	}

	return reply;
};
