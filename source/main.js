import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/application/index.jsx!';
import TimeKeeper from './components/time_keeper/index';

const main = document.getElementsByTagName('main')[0];

new TimeKeeper(function (isWeekend, timeRemaining) {
	ReactDOM.render(React.createElement(Application, {
		isWeekend: isWeekend,
		timeRemaining: timeRemaining
	}), main);
});
