// http://webreflection.blogspot.com/2013/07/eddyjs-bold-approach.html
// https://github.com/WebReflection/eddy

define(['components/eventEmitter/EventEmitter'], function (EventEmitter) {
  var initializeCounter = function (base60) {
    var reply = {};

    base60 = base60 / 60 / 60;
    reply.hours = Math.floor(base60);

    base60 = (base60 - Math.floor(base60)) * 60;
    reply.minutes = Math.floor(base60);

    base60 = (base60 - Math.floor(base60)) * 60;
    reply.seconds = Math.round(base60);

    return reply;
  };

  var Clock = function () {
    this.counter = initializeCounter(0);
    this.clock = new EventEmitter();

    setInterval(function () {
      this.tick();

      if (
        (this.counter.hours === 0) &&
        (this.counter.minutes === 0) &&
        (this.counter.seconds === 0)
      ) {
        this.clock.trigger('alarm');
      }
    }.bind(this), 1000);
  };

  Clock.prototype.on = function (event, callback) {
    this.clock.on(event, callback);
  };

  Clock.prototype.windUp = function (secondsToWind) {
    this.counter = initializeCounter(secondsToWind);
  };

  Clock.prototype.tick = function () {
    var c = this.counter;

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

    this.clock.trigger('tick', [
      {
        hours: c.hours,
        minutes: c.minutes,
        seconds: c.seconds
      }
    ]);
  };

  return Clock;
});
