
new_('script', '', document.head || document.documentElement).src = chrome.extension.getURL('m.point.inject.js');

var 已签到 = document.querySelectorAll('div.sanjiao').length;
new_li(已签到 ? '已签到' : '未签到');

var 签到 = function() {
	window.postMessage({
		签到: true
	}, '*')
};
new_li('app 微博控签到').onclick = 签到;


if (document.querySelectorAll('div.getPointHead').length && !已签到) chrome.storage.sync.get({
	'弹窗': false,
	'签到': false
}, function(o) {
	if (o['签到']) {
		new_li('准备自动签到');
		if (o['弹窗']) window.open('//m.gewara.com/touch/wala/answer.xhtml');
		setTimeout(签到, 1000);
	}
});

