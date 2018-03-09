export default () => {
	const reply = new Date().toISOString();

	return reply.replace('T', ' ').replace(/\.\d+Z$/, '');
};
