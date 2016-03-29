import ee from 'event-emitter';

const formatForTick = function (remaining) {
	remaining = remaining / 60 / 60;
	const hours = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const minutes = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const seconds = Math.round(remaining);

	return {
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
};

export default class {
	constructor() {
		this.counter = 0;
		this.events = ee({});

		setInterval(function () {
			this.tick();
			this.alarm();
		}.bind(this), 1000);
	}

	on(event, callback) {
		this.events.on(event, callback);
	}

	windUp(secondsToWind) {
		this.counter = secondsToWind;
	}

	alarm() {
		if (this.counter === 0) {
			this.events.emit('alarm');
		}
	}

	tick() {
		this.counter = this.counter - 1;
		this.events.emit('tick', formatForTick(this.counter));
	}
}
