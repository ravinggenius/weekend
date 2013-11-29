(function (app) {
	'use strict';

	var present = app.presenter;
	var TimeKeeper = app.TimeKeeper;

	new TimeKeeper(function (snapshot) {
		present(snapshot);
	});
})(window.APP);
