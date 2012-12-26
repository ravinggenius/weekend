define(function () {
  // http://stackoverflow.com/a/9744576
  var padLeft = function (number, padLength, padChar) {
    padChar = (typeof padChar !== 'undefined') ? padChar : '0';
    var pad = new Array(1 + padLength).join(padChar);
    return (pad + number).slice(-Math.max(pad.length, number.toString().length));
  };

  return function (snapshot) {
    var answer = snapshot.isWeekend ? 'Yes' : 'No';
    var timeLeft = padLeft(snapshot.hours, 3) + ':' + padLeft(snapshot.minutes, 2) + ':' + padLeft(snapshot.seconds, 2);
    console.log(answer, timeLeft);
  };
});
