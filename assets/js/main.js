require(['time_keeper'], function (TimeKeeper) {
  var timeKeeper = new TimeKeeper();

  timeKeeper.watchClock(function (timer) {
    console.log(timer);
  });
});
