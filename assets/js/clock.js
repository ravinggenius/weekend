define(function () {
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

  var Clock = function (startTime) {
    this.counter = initializeCounter(startTime);
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

    return {
      hours: c.hours,
      minutes: c.minutes,
      seconds: c.seconds
    };
  };

  return Clock;
});
