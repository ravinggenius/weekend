define(['clock'], function (Clock) {
  var TimeKeeper = function () {
  };

  TimeKeeper.prototype.rewindClock = function () {
    this.clock = new Clock(this.secondsToWind());
  };

  TimeKeeper.prototype.secondsToWind = function () {
    var now = new Date();
    var hour = 60 * 60;
    var day = hour * 24;
    var dayIndex = now.getDay();
    var hourIndex = now.getHours();
    var isWeekend = (function () {
      return (
        (dayIndex === 0) ||
        ((dayIndex === 1) && (hourIndex < 8)) ||
        ((dayIndex === 5) && (hourIndex >= 17)) ||
        (dayIndex === 6)
      );
    })();

    var weekendStart = (hour * (24 - 17)) + day;
    var weekendEnd = day + (hour * 8);
    var weekendLength = weekendStart + weekendEnd;
    var elapsed = (now.getMinutes() * 60) + now.getSeconds();

    var reply;

    if (isWeekend) {
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

  TimeKeeper.prototype.watchClock = function (tickback) {
    var self = this;

    this.rewindClock();

    setInterval(function () {
      var remaining = self.clock.tick();

      tickback(remaining);

      if (
        (remaining.hours === 0) &&
        (remaining.minutes === 0) &&
        (remaining.seconds === 0)
      ) {
        self.rewindClock();
      }
    }, 1000);
  };

  return TimeKeeper;
});
