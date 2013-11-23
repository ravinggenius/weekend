define(['clock'], function (Clock) {
	isWeekend = function (now) {
		var dayIndex = now.getDay();
		var hourIndex = now.getHours();

		return (
			(dayIndex === 0) ||
			((dayIndex === 1) && (hourIndex < 8)) ||
			((dayIndex === 5) && (hourIndex >= 17)) ||
			(dayIndex === 6)
		);
	};

	secondsToWind = function (now) {
		var hour = 60 * 60;
		var day = hour * 24;
		var dayIndex = now.getDay();
		var hourIndex = now.getHours();

		var weekendStart = (hour * (24 - 17)) + day;
		var weekendEnd = day + (hour * 8);
		var weekendLength = weekendStart + weekendEnd;
		var elapsed = (now.getMinutes() * 60) + now.getSeconds();

		var reply;

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

	var TimeKeeper = function (tickback) {
		this.clock = new Clock();
		this.checkTime();

		this.clock.on('alarm', function () {
			this.checkTime();
			this.clock.windUp(secondsToWind(this.now));
		}.bind(this));

		this.clock.on('tick', function (snapshot) {
			tickback(_.extend(snapshot, {
				isWeekend: isWeekend(this.now)
			}));
		}.bind(this));
	};

	TimeKeeper.prototype.checkTime = function () {
		this.now = new Date();
	};

	return TimeKeeper;
});
