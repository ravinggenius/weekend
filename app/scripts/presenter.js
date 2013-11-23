define(function () {
	// http://stackoverflow.com/a/9744576
	var padLeft = function (number, padLength, padChar) {
		padChar = (typeof padChar !== 'undefined') ? padChar : '0';
		var pad = new Array(1 + padLength).join(padChar);
		return (pad + number).slice(-Math.max(pad.length, number.toString().length));
	};

	var body = $('#rainbow');

	var answer = $('#answer');

	var hour = $('#timer .hour');
	var minute = $('#timer .minute');
	var second = $('#timer .second');

	return function (snapshot) {
		// rgb(62, 59, 59) - rgb(0, 0, 0) weekend
		// rgb(104, 59, 59) - rgb(0, 0, 0) weekdays
		body.css({
			backgroundColor: 'rgb(' + snapshot.hours + ', ' + snapshot.minutes + ', ' + snapshot.seconds + ')'
		});

		body.removeClass('answer-yes');
		body.removeClass('answer-no');
		body.addClass(snapshot.isWeekend ? 'answer-yes' : 'answer-no');

		answer.text(snapshot.isWeekend ? 'Yes' : 'No');

		hour.text(padLeft(snapshot.hours, 3));
		minute.text(padLeft(snapshot.minutes, 2));
		second.text(padLeft(snapshot.seconds, 2));
	};
});
