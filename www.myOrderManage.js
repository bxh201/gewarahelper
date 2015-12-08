
var 已发送 = [];

$.get('/home/myOrderManageQueryDateTableDefault.xhtml', function(r) {
	r.match(/orderId=\d+/g).forEach(function(链接) {
		var 匹配 = 链接.match(/orderId=(\d+)/);
		if (匹配.length > 1) {
			var 订单号 = 匹配[1];
			if (已发送.indexOf(订单号) === -1) {
				下发取票密码_反复(订单号);
				已发送.push(订单号);
			}
		}
	})
}, 'text');
