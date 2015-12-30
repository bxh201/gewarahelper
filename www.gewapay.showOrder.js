
var 数字 = document.location.search.match(/\d+/g);
if(数字 && 数字.length) {
	var 订单号 = 数字[0];
	下发取票密码_反复(订单号);
	var li = new_('li', '', 弹层);
	new_('a', '查看取票密码', li).onclick = function() {
		this.style.display = 'none';
		new_('iframe', '', li).src = '/home/qryOrderCheckpass.xhtml?orderid=' + 订单号;
	};
	new_('a', '分享微博', new_('li', '', 弹层)).onclick = function() {
		bindWeibo('sina', 订单号);
	};
}
