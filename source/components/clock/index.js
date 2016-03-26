import ee from 'event-emitter';

const initializeCounter = function (base60) {
	let reply = {};

	base60 = base60 / 60 / 60;
	reply.hours = Math.floor(base60);

	base60 = (base60 - Math.floor(base60)) * 60;
	reply.minutes = Math.floor(base60);

	base60 = (base60 - Math.floor(base60)) * 60;
	reply.seconds = Math.round(base60);

	return reply;
};

export default class {
	constructor() {
		this.counter = initializeCounter(0);
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
		this.counter = initializeCounter(secondsToWind);
	}

	alarm() {
		const isZero = (this.counter.hours === 0) &&
			(this.counter.minutes === 0) &&
			(this.counter.seconds === 0);

		if (isZero) {
			this.events.emit('alarm');
		}
	}

	tick() {
		let c = this.counter;

		if (c.seconds > 0) {
			c.seconds = c.seconds - 1;
		} else if (c.minutes > 0) {
			c.minutes = c.minutes - 1;
			c.seconds = 59;
		} else if (c.hours > 0) {
			c.hours = c.hours - 1;
			c.minutes = 59;
			c.seconds = 59;
		}

		this.events.emit('tick', {
			hours: c.hours,
			minutes: c.minutes,
			seconds: c.seconds
		});
	}
}
