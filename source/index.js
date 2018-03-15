import Color from 'color';
import { bind } from 'hyperhtml';

import answer from './components/answer';
import clock from './components/clock';

import './styles.css';

const scale = (number, fromMax, toMax = 255) => Math.round((number * toMax) / fromMax);

const isWeekend = (now) => {
	const dayIndex = now.getDay();
	const hourIndex = now.getHours();

	return (dayIndex === 0) ||
		((dayIndex === 1) && (hourIndex < 8)) ||
		((dayIndex === 5) && (hourIndex >= 17)) ||
		(dayIndex === 6);
};

const partsRemaining = (now) => {
	const hour = 60 * 60;
	const day = hour * 24;
	const dayIndex = now.getDay();
	const hourIndex = now.getHours();

	const weekendStart = (hour * (24 - 17)) + day;
	const weekendEnd = day + (hour * 8);
	const weekendLength = weekendStart + weekendEnd;

	let elapsed = (now.getMinutes() * 60) + now.getSeconds();

	let remaining;

	if (isWeekend(now)) {
		if ((dayIndex === 5) || (dayIndex === 6)) {
			elapsed += (day * (dayIndex - 5)) + (hour * (hourIndex - 17));
		}

		if ((dayIndex === 0) || (dayIndex === 1)) {
			elapsed += (hour * (24 - 17)) + day;
			elapsed += (day * dayIndex) + (hour * hourIndex);
		}

		remaining = weekendLength - elapsed;
	} else {
		elapsed += (day * (dayIndex - 1)) + (hour * (hourIndex - 8));
		remaining = (day * 7) - weekendLength - elapsed;
	}

	remaining = remaining / 60 / 60;
	const hours = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const minutes = Math.floor(remaining);

	remaining = (remaining - Math.floor(remaining)) * 60;
	const seconds = Math.round(remaining);

	return { hours, minutes, seconds };
};

const themeColor = document.querySelector('meta[name="theme-color"]');

const render = (root, now) => {
	const happy = isWeekend(now);
	const parts = partsRemaining(now);

	const color = new Color({
		r: scale(parts.hours, happy ? 62 : 104),
		g: scale(parts.minutes, 59),
		b: scale(parts.seconds, 59)
	});

	document.body.classList.toggle('isDark', color.isDark());
	document.body.classList.toggle('isLight', color.isLight());
	document.body.style.backgroundColor = color.hex();

	themeColor.setAttribute('content', color.hex());

	root`
		${answer(isWeekend(now))}
		${clock(parts)}
	`;
};

setInterval((root) => render(root, new Date()), 1000 / 20, bind(document.querySelector('main')));
