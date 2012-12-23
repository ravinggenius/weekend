require(['presenter', 'time_keeper'], function (present, TimeKeeper) {
  var timeKeeper = new TimeKeeper();

  timeKeeper.watchClock(function (snapshot) {
    present(snapshot);
  });
});
