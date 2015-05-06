
function logme(o){
	console.log(JSON.stringify(o));
}

chrome.cookies.set({
	url: 'http://www.gewara.com/',
	name: 'tuipiaoTips',
	value: 'true'
}, logme);

chrome.cookies.set({
	url: 'http://www.gewara.com/',
	name: 'tuipiaoInfo',
	value: 'true'
}, logme);

chrome.cookies.set({
	url: 'http://www.gewara.com/',
	name: 'useMovieVersion',
	value: 'oldv6.0'
}, logme);


chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name === 'User-Agent') {
				details.requestHeaders[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B440';
				return {requestHeaders: details.requestHeaders};
			}
		}
	},
	// filters
	{
		urls: [
		"*://m.gewara.com/*",
		"*://pay.gewara.com/*",
		"*://wappay.bypay.cn/*",
		"*://wappaygw.alipay.com/*"
		]
	},
	// extraInfoSpec
	["blocking", "requestHeaders"]
);