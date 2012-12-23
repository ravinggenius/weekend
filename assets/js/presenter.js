define(function () {
  var two = function (n) {
    return ((n > 9) ? '' : '0') + n;
  };

  var three = function (n) {
    return ((n > 99) ? '' : '0') + two(n);
  };

  return function (snapshot) {
    var answer = snapshot.isWeekend ? 'Yes' : 'No';
    var timeLeft = three(snapshot.hours) + ':' + two(snapshot.minutes) + ':' + two(snapshot.seconds);
    console.log(answer, timeLeft);
  };
});
