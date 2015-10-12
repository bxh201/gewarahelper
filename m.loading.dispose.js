var _dispose = function() {
	Array.prototype.slice.call(document.getElementsByClassName('loadingStyle')).forEach(function(e) {
		e.parentNode.removeChild(e);
	})
};

var _run_dispose = function() {
	setInterval(_dispose, 1000 * 5);
	for (var i = 1; i < 10; i++) {
		setTimeout(_dispose, 500 * i);
	}
};

setTimeout(_run_dispose, 100);
