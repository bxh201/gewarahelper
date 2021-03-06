function mcc(k, v, g){
	var o = {
		url: 'http://m.gewara.com/',
		name: k,
		value: v,
		expirationDate: parseInt((new Date()).getTime()/1000 + 60*60*24*365)
	};
	if(g) return {url: o['url'], name: o['name']};
	return o;
}

var cookies列表 = ['partnerName'];
var 加载cookies = function(a) {
	a.forEach(function(n) {
		chrome.cookies.get(mcc(n, null, true), function(c) {
			var e = document.querySelector('input[id="' + n + '"]') || new_('input');
			e.value = c ? c.value : '';
		})
	});
};
加载cookies(cookies列表);

var 保存cookies = function() {
	var l = [];
	Array.prototype.slice.call(document.querySelectorAll('fieldset[class=cookies] input')).forEach(function(e) {
		chrome.cookies.set(mcc(e.id, e.value));
		l.push(e.id);
	});
	加载cookies(l);
};
_b_cookies.onclick = 保存cookies;

[['银联钱包', 'unionpayWallet'], ['建行', 'ccbAppPay'], ['顺手付', 'sfAppPay']].forEach(function(e) {
	var v = e[1];
	new_('button', e[0], _partnerName).onclick = function() {
		chrome.cookies.set(mcc('partnerName', v));
		加载cookies(['partnerName']);
	};
});

_b2.onclick = function(){
	chrome.cookies.remove({
		url: 'http://m.gewara.com/',
		name: 'partnerName'
	});
	加载cookies(['partnerName']);
};



var o2a = function(o) {
	var a = [];
	for (var k in o) {
		if (o.hasOwnProperty(k)) a.push([k, o[k]]);
	}
	return a;
};

var genkv = function(p, type) {
	var o = {};
	o2a(p).forEach(function(e) {
		switch (type) {
			case 'checkbox':
				o[e[0]] = e[1].checked;
				break;
			case 'radio':
				o[e[0]] = e[1][0].checked;
				break;
			default:
				o[e[0]] = e[1].value;
		}
	});
	return o;
};

var gencb = function(p, c, type) {
	var cb = function(o) {
		o2a(p).forEach(function(e) {
			switch (type) {
				case 'checkbox':
					e[1].checked = !!o[e[0]];
					break;
				case 'radio':
					e[1][(!!o[e[0]] ? 0 : 1)].checked = true;
					break;
				default:
					e[1].value = o[e[0]];
			}
		});
		if (c && typeof c === 'function') c();
	};
	return cb;
};

var _加载参数 = function(p, c, t){
	return chrome.storage.sync.get(genkv(p, t), gencb(p, c, t));
};

var map_ua = {
	UA: _ua
};

var map_wanda = {
	'万达手机号': _wanda
};
var map_wanda_automod = {
	'万达手机号自动修改': _wanda_automod
};

var map_load = Object.assign({}, map_ua, map_wanda);

_加载参数(map_load);
_加载参数(map_wanda_automod, null, 'checkbox');

var _保存按钮绑定 = function(按钮, 映射, t, ex) {
	按钮.onclick = function() {
		按钮.disabled = true;
		var o = Object.assign({}, genkv(映射, t));
		if(ex && ex.length) ex.forEach(function(e){
			o = Object.assign({}, o, genkv(e[0], e[1]));
		});
		console.log('storset', o);
		chrome.storage.sync.set(o, function() {
			按钮.disabled = false;
		});
	};
};

_保存按钮绑定(_b_saveua, map_ua);
_保存按钮绑定(_b_savewanda, map_wanda, 'text', [[map_wanda_automod, 'checkbox']]);




var type2prop = {
	checkbox: 'checked',
	radio: 'value'
};
var 保存 = function() {
	var o = {};
	var 元素列表 = Array.from(arguments);
	元素列表.forEach(function(e) {
		var 属性 = 'value';
		if (e.tagName == 'INPUT' && type2prop.hasOwnProperty(e.type)) 属性 = type2prop[e.type];
		console.log(e.tagName, e.name, 属性, e[属性]);
		o[e.name] = e[属性];
	});
	chrome.storage.sync.set(o, function() {
		console.log(o);
		元素列表.forEach(function(e) {
			e.parentElement.setAttribute('提示', e.name + ': ' + o[e.name]);
			if(提示计时器.hasOwnProperty(e.name)) window.clearTimeout(提示计时器[e.name]);
			提示计时器[e.name] = window.setTimeout(function() {
				e.parentElement.setAttribute('提示', '');
				delete 提示计时器[e.name];
			}, 1500);
		});
	});
};
var 即时保存 = function() {
	return 保存(this);
};

签到.onclick = 即时保存;
弹窗.onclick = 即时保存;
答案.onchange = 即时保存;
_加载参数({答案: 答案});
_加载参数({签到: 签到, 弹窗: 弹窗}, null, 'checkbox');

var 提示计时器 = {};
document.styleSheets[0].addRule('label.自动保存::after', 'content: attr(提示); padding-left: 10px;');



_ua.style.width = '100%';

var resize = function(w, h, 不要复查){
	if(document) {
		var html = document.getElementsByTagName('html')[0];
		if(html) {
			if(w)html.style.width = w;
			if(h)html.style.height = h;
			if(w && !不要复查)window.setTimeout(function(){if(window.outerWidth < w) {resize(w + 10, false, true); window.setTimeout(function(){resize(w, h, 不要复查);});}}, 2000);
		}
	}
	return window ? [window.innerWidth, window.innerHeight] : [w, h];
};

window.setTimeout(function(){resize(400);});

