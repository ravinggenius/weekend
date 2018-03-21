import Color from 'color';

import isWeekend from './application/isWeekend';
import partsRemaining from './application/partsRemaining';
import scale from './application/scale';
import shouldRender from './application/shouldRender';

import './styles.css';

const themeColor = document.querySelector('meta[name="theme-color"]');

const answer = document.querySelector('.answer');
answer.classList.remove('answer');

const clock = {
	hours: document.querySelector('.clock .hours'),
	minutes: document.querySelector('.clock .minutes'),
	seconds: document.querySelector('.clock .seconds')
};

const render = (now) => {
	const parts = partsRemaining(now);

	if (shouldRender(parts)) {
		const happy = isWeekend(now);

		const color = new Color({
			r: scale(parts.hours, happy ? 62 : 104),
			g: scale(parts.minutes, 59),
			b: scale(parts.seconds, 59)
		});

		document.body.classList.toggle('is-dark', color.isDark());
		document.body.classList.toggle('is-light', color.isLight());
		document.body.style.backgroundColor = color.hex();

		themeColor.setAttribute('content', color.hex());

		answer.classList.toggle('answer-yes', happy);
		answer.classList.toggle('answer-no', !happy);

		answer.textContent = happy ? 'Yes!' : 'nope';

		clock.hours.textContent = parts.hours.toString().padStart(3, '0');
		clock.minutes.textContent = parts.minutes.toString().padStart(2, '0');
		clock.seconds.textContent = parts.seconds.toString().padStart(2, '0');
	}
};

const query = new URL(document.location).searchParams;

if (query.has('pause')) {
	render(new Date());
} else {
	setInterval(() => render(new Date()), 1000 / 20);
}
