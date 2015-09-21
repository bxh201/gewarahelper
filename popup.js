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

