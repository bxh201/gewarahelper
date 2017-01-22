function mcc(k, v){
	return {
		url: 'http://m.gewara.com/',
		name: k,
		value: v,
		expirationDate: parseInt((new Date()).getTime()/1000 + 60*60*24*365)
	};
}

_b1.onclick = function(){
	chrome.cookies.set(mcc('partnerName', 'unionpayWallet'));
};

_b2.onclick = function(){
	chrome.cookies.remove({
		url: 'http://m.gewara.com/',
		name: 'partnerName'
	});
};

_ccb.onclick = function(){
	chrome.cookies.set(mcc('partnerName', 'ccbAppPay'));
};

_sf.onclick = function(){
	chrome.cookies.set(mcc('partnerName', 'sfAppPay'));
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


_ua.style.width = '100%';

var resize = function(w, h){
	if(document) {
		var html = document.getElementsByTagName('html')[0];
		if(html) {
			if(w)html.style.width = w;
			if(h)html.style.height = h;
		}
	}
	return window ? [window.innerWidth, window.innerHeight] : [w, h];
};

resize(400);

