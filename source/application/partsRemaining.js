import isWeekend from './isWeekend';

export default (now) => {
	const hour = 60 * 60;
	const day = hour * 24;
	const dayIndex = now.getDay();
	const hourIndex = now.getHours();

	const weekendStart = (hour * (24 - 17)) + day;
	const weekendEnd = day + (hour * 8);
	const weekendLength = weekendStart + weekendEnd;

	let elapsed = (now.getMinutes() * 60) + now.getSeconds();

	let remaining;

	if (isWeekend(now)) {
		if ((dayIndex === 5) || (dayIndex === 6)) {
			elapsed += (day * (dayIndex - 5)) + (hour * (hourIndex - 17));
		}

		if ((dayIndex === 0) || (dayIndex === 1)) {
			elapsed += (hour * (24 - 17)) + day;
			elapsed += (day * dayIndex) + (hour * hourIndex);
		}

		remaining = weekendLength - elapsed;
	} else {
		elapsed += (day * (dayIndex - 1)) + (hour * (hourIndex - 8));
		remaining = (day * 7) - weekendLength - elapsed;
	}

	remaining = remaining / 60 / 60;
	const hours = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const minutes = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const seconds = Math.round(remaining);

	return { hours, minutes, seconds };
};
