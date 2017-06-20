
var app签到 = function() {
	isGewaraApp = true;
	//window.onbeforeunload = function(){return 'test'};
	getWeiboDatePointNext();
};

window.addEventListener('message', function(event) {
	console.log(event, event.source == window);
	if (!event.isTrusted || event.origin !== location.origin) return;
	if (event.data.签到) {
		app签到();
	}
}, false);

