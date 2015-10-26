
var 数字 = document.location.search.match(/\d+/g);
if(数字 && 数字.length) {
	var 订单号 = 数字[0];
	下发取票密码_反复(订单号);
}
