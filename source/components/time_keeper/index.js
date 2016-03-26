import Clock from '../clock/index';

const isWeekend = function (now) {
	const dayIndex = now.getDay();
	const hourIndex = now.getHours();

	return (dayIndex === 0) ||
		((dayIndex === 1) && (hourIndex < 8)) ||
		((dayIndex === 5) && (hourIndex >= 17)) ||
		(dayIndex === 6);
};

const secondsToWind = function (now) {
	const hour = 60 * 60;
	const day = hour * 24;
	const dayIndex = now.getDay();
	const hourIndex = now.getHours();

	const weekendStart = (hour * (24 - 17)) + day;
	const weekendEnd = day + (hour * 8);
	const weekendLength = weekendStart + weekendEnd;

	let elapsed = (now.getMinutes() * 60) + now.getSeconds();

	let reply;

	if (isWeekend(now)) {
		if ((dayIndex === 5) || (dayIndex === 6)) {
			elapsed += (day * (dayIndex - 5)) + (hour * (hourIndex - 17));
		}
		if ((dayIndex === 0) || (dayIndex === 1)) {
			elapsed += (hour * (24 - 17)) + day;
			elapsed += (day * dayIndex) + (hour * hourIndex);
		}
		reply = weekendLength - elapsed;
	} else {
		elapsed += (day * (dayIndex - 1)) + (hour * (hourIndex - 8));
		reply = (day * 7) - weekendLength - elapsed;
	}

	return reply;
};

export default class {
	constructor(tickback) {
		this.clock = new Clock();

		this.clock.on('alarm', this.setAlarm.bind(this));

		this.clock.on('tick', function (snapshot) {
			snapshot.isWeekend = isWeekend(this.checkTime());
			tickback(snapshot);
		}.bind(this));

		this.setAlarm();
	}

	checkTime() {
		return new Date();
	}

	setAlarm() {
		this.clock.windUp(secondsToWind(this.checkTime()));
	}
}
