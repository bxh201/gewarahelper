
function bindWeibo(type, value) {
	$.post('/ajax/member/synchroizaInfo.xhtml', {
		rights: 'moviecomment'
	}, function(r) {
		console.log(r, window.data);
		result = window.data;
		if (result.success) {
			if (result.appList) {
				if (result.appList.indexOf(type) > -1) {
					clickGetPoint(value);
				} else {
					if ('sina' == type) {
						syscData('/home/bind/sina/userApp.xhtml?source=close', '新浪微博', 'sina');
					} else {
						alert('无同步权限');
					}
				}
			}
		}
	}, 'script');
}

function clickGetPoint(value) {
	document.title = '获取数据中，请稍候...';
	$.post('/ajax/shareGetPoint.xhtml?math=' + Date.now(), {
		'orderId': value
	}, function(r) {
		console.log(r, window.data);
		result = window.data;
		if (result.success) {
			document.title = '成功分享至新浪微博！';
		} else {
			if (result.msg == 'isNotBind') {
				syscData('/home/bind/sina/userApp.xhtml?source=close', '新浪微博', 'sina');
			} else {
				document.title = result.msg;
				new_('a', result.msg, new_('li', '', 弹层));
			}
		}
	}, 'script');
}

function syscData(url, title, tag) {
	window.open(url);
	document.title = '正在设置' + title + '的同步功能！';
}
