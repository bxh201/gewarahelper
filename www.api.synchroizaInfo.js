
function bindWeibo(type, value) {
	$.post('/ajax/member/synchroizaInfo.xhtml', {
		rights: 'moviecomment'
	}, function(r) {
		console.log(r, window.data);
		var result = window.data;
		显示消息(JSON.stringify(result));
		if (result.success) {
			if (result.appList) {
				if (result.appList.indexOf(type) > -1) {
					clickGetPoint(value);
				} else {
					if ('sina' == type) {
						syscData('/home/bind/sina/userApp.xhtml?source=close', '新浪微博', 'sina');
					} else {
						显示消息('无同步权限');
					}
				}
			}
		}
	}, 'script');
}

function clickGetPoint(value) {
	显示消息('正在获取分享积分，订单号：' + value);
	$.post('/ajax/shareGetPoint.xhtml?math=' + Date.now(), {
		'orderId': value
	}, function(r) {
		console.log(r, window.data);
		var result = window.data;
		if (result.success) {
			显示消息('成功分享至新浪微博！');
		} else {
			显示消息(result.msg || '');
			if (result.msg == 'isNotBind') {
				syscData('/home/bind/sina/userApp.xhtml?source=close', '新浪微博', 'sina');
			}
		}
	}, 'script');
}

function syscData(url, title, tag) {
	window.open(url);
	显示消息('正在设置' + title + '的同步功能！');
}
