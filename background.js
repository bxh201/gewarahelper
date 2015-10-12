
function cookies_monitor(changeInfo){
	log_changed(changeInfo);
	var c = changeInfo.cookie;
	if(c.domain.search('gewara') > -1) {
		if(c.name == 'useMovieVersion' && c.value != 'oldv6.0') {
			chrome.cookies.set(cc('useMovieVersion', 'oldv6.0'), log_added);
		}
	}
}

function cc(k, v){
	return {
		url: 'http://www.gewara.com/',
		name: k,
		value: v,
		expirationDate: parseInt((new Date()).getTime()/1000 + 60*60*24*365)
	};
}

function logme(o, r){
	r = r ? r + ': ' : '';
	console && console.log(r + JSON.stringify(o));
}

function log_added(o){
	return logme(o, 'added');
}

function log_changed(o){
	return logme(o, 'changed');
}

chrome.cookies.set(cc('tuipiaoTips', 'true'), log_added);

chrome.cookies.set(cc('tuipiaoInfo', 'true'), log_added);

chrome.cookies.set(cc('useMovieVersion', 'oldv6.0'), log_added);

chrome.cookies.onChanged.addListener(cookies_monitor);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		// console.log(details);
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name === 'User-Agent') {
				details.requestHeaders[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H321 MicroMessenger/6.2.4 NetType/WIFI Language/zh_CN';
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
		"*://wappaygw.alipay.com/*",
		"*://netpay.cmbchina.com/netpayment/basehttp.dll*",
		"*://netpay.cmbchina.com/netpayment/BaseHttp.dll*"
		]
	},
	// extraInfoSpec
	["blocking", "requestHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		console.log(details);
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name.toLowerCase() == 'referer') {
				// console.log('removed referrer:', details.requestHeaders.splice(i, 1));
				// Location: http://m.gewara.com/movie/m/home/redirect:/touch/home/confirmOrder.xhtml
				details.requestHeaders[i].value = details.url.replace('/useDiscount.xhtml', '/confirmOrder.xhtml');
				return {
					requestHeaders: details.requestHeaders
				};
			}
		}
	}, {
		urls: [
			'http://m.gewara.com/*/useDiscount.xhtml?tradeNo=*'
		]
	}, ['blocking', 'requestHeaders']
);

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return {cancel: true};
	},
	{
		urls: [
		"*://pi.gewara.com/*"
	]
	},
	["blocking"]
);

