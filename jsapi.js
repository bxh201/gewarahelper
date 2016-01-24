
if (typeof JSON === 'object') {
	JSON.parse_ = JSON.parse;
	JSON.parse = function(s) {
		try {
			var o = JSON.parse_(s);
			return o ? o : false;
		} catch (e) {
			console.warn('JSON parsing error:', s);
		}
		return false;
	};
};

var new_ = function(tag, t, parent) {
	var e = document.createElement(tag);
	if (t) {
		e.innerText = t;
		if (t.hasOwnProperty && t.hasOwnProperty('html') && typeof t.html !== 'undefined') e.innerHTML = t.html;
	}
	return parent ? parent.appendChild(e) : e;
};
var 弹层 = new_('div', '', document.body);
弹层.style.position = 'fixed';
弹层.style.left = 0;
弹层.style.top = 0;
弹层.style.zIndex = 1234567890;

var 显示消息 = function(消息){
	document.title = 消息;
	return new_('li', 消息, 弹层);
};

var url正则 = function(参数名) {
	return new RegExp('(?:' + 参数名 + '=)(\\d+)');
};

var 获取参数 = function(参数名, 链接) {
	if(!链接) 链接 = document.location.href;
	var 匹配 = 链接.match(url正则(参数名));
	if (匹配.length == 2) return 匹配[1];
	return false;
};
