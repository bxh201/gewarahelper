
var 下发取票密码 = function(订单号, cb) {
	$.post('//www.gewara.com/home/repeatSendOrderSMS.xhtml', {
		orderid: 订单号
	}, cb);
};
var 下发取票密码_反复 = function(订单号) {
	return 下发取票密码(订单号, function(r){
		console.log('下发取票密码_r', 订单号, r);
		if(r.indexOf('var data') < 0) return false;
		eval(r);
		if(data) {
			if(data.success) {
				return 下发取票密码_反复(订单号);
			}
			return data.msg;
		}
		return false;
	});
};
