import React from 'react';

// http://stackoverflow.com/a/9744576
const padLeft = function (number, padLength, padChar) {
	padChar = (typeof padChar !== 'undefined') ? padChar : '0';
	const pad = new Array(1 + padLength).join(padChar);
	return (pad + number).slice(-Math.max(pad.length, number.toString().length));
};

export default class extends React.Component {
	render() {
		const snapshot = this.props.snapshot;
		const { isWeekend, hours, minutes, seconds } = this.props.snapshot;

		document.body.style.backgroundColor = `rgb(${hours}, ${minutes}, ${seconds})`;

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
