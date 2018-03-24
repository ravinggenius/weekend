import Color from 'color';

import isWeekend from './application/isWeekend';
import partsRemaining from './application/partsRemaining';
import remainingSeconds from './application/remainingSeconds';
import scale from './application/scale';
import shouldRender from './application/shouldRender';

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
	const hms = query.get('pause');
	const pattern = /^\d+:\d+:\d+$/;

	if (hms && pattern.test(hms)) {
		const [ h, m, s ] = hms.split(':').map(_ => Number.parseInt(_, 10));
		const now = new Date();

		const remaining = remainingSeconds(now);
		const offset = remaining - (h * 60 * 60) - (m * 60) - s;

		now.setTime(now.getTime() + (offset * 1000));

		render(now);
	} else {
		render(new Date());
	}
} else {
	setInterval(() => render(new Date()), 1000 / 20);
}
