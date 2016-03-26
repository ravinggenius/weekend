import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/application/index.jsx!';
import TimeKeeper from './components/time_keeper/index';

const main = document.getElementsByTagName('main')[0];

new TimeKeeper(function (snapshot) {
	ReactDOM.render(React.createElement(Application, {
		snapshot: snapshot
	}), main);
});
