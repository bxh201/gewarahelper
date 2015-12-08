
var 修改链接 = function(新手机号, 原链接) {
	if (!原链接) 原链接 = document.location.href;
	if (!新手机号) return 原链接;
	return 原链接.replace(/mobile=\d+/, 'mobile=' + 新手机号);
};

弹层.style.left = '30%';

var 手机号 = 获取参数('mobile');
if (手机号) {
	var li;
	li = new_('li', '积分手机号：', 弹层);
	li.style.width = '20em';
	var 输入框 = new_('input', '', li);
	输入框.placeholder = 手机号;
	输入框.size = 11;
	var 按钮 = new_('button', '应用', li);
	按钮.style.display = 'inline';
	按钮.style.width = '3em';
	按钮.onclick = function() {
		//alert(修改链接(输入框.value));
		document.location = 修改链接(输入框.value);
	};
}

chrome.storage.sync.get({
	'万达手机号': false,
	'万达手机号自动修改': false
}, function(o) {
	if (o['万达手机号'] && 手机号 != o['万达手机号']) {
		var li = new_('li', '', 弹层);
		var a = new_('a', '', li);
		a.href = 修改链接(o['万达手机号']);
		new_('button', '改为' + o['万达手机号'], a);
		if (o['万达手机号自动修改']) {
			document.location = 修改链接(o['万达手机号']);
		}
	}
});

