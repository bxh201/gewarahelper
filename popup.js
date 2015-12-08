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

var map_ua = {
	UA: _ua
};

_b_saveua.onclick = function() {
	_b_saveua.disabled = true;
	chrome.storage.sync.set(genkv(map_ua), function() {
		_b_saveua.disabled = false;
	});
};

chrome.storage.sync.get(genkv(map_ua), gencb(map_ua));

