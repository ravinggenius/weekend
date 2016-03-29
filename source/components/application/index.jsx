import React from 'react';

const isDark = function (red, green, blue) {
	const strength = (red * 299) + (green * 587) + (blue * 114);
	return (strength / 1000) < 128;
};

// http://stackoverflow.com/a/9744576
const padLeft = function (number, padLength, padChar) {
	padChar = (typeof padChar !== 'undefined') ? padChar : '0';
	const pad = new Array(1 + padLength).join(padChar);
	return (pad + number).slice(-Math.max(pad.length, number.toString().length));
};

const scale = function (number, fromMax) {
	const toMax = 255;
	return Math.round(number * toMax / fromMax);
};

export default class extends React.Component {
	render() {
		const isWeekend = this.props.isWeekend;
		const { hours, minutes, seconds } = this.props.timeRemaining;

		const red = scale(hours, isWeekend ? 62 : 104);
		const green = scale(minutes, 59);
		const blue = scale(seconds, 59);

		document.body.className = (isDark(red, green, blue) ? 'is-dark' : 'is-light');
		document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

		return <article>
			<section className="answer">{isWeekend ? 'Yes' : 'No'}</section>

			<output className="countdown">
				<span className="segment hour">{padLeft(hours, 3)}</span>
				<span className="separator">:</span>
				<span className="segment minute">{padLeft(minutes, 2)}</span>
				<span className="separator">:</span>
				<span className="segment second">{padLeft(seconds, 2)}</span>
			</output>
		</article>;
	}
}
