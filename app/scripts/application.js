(function () {
	require(['presenter', 'time_keeper'], function (present, TimeKeeper) {
		new TimeKeeper(function (snapshot) {
			present(snapshot);
		});
	});
})();
