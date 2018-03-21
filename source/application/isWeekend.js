export default (now) => {
	const dayIndex = now.getDay();
	const hourIndex = now.getHours();

	return (dayIndex === 0) ||
		((dayIndex === 1) && (hourIndex < 8)) ||
		((dayIndex === 5) && (hourIndex >= 17)) ||
		(dayIndex === 6);
};
