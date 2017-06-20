
var 匹配 = [];
chrome.storage.sync.get({
	'答案': false
}, function(o) {
	if (!window.answerList) {
		new_li('已答题');
		if (document.querySelectorAll('div.rightOptionBody').length) {
			var 答案 = document.querySelector('div.rightOptionBody p').innerText;
			new_li(答案);
			if (o['答案'] !== 答案) chrome.storage.sync.set({
				答案: 答案
			}, function() {
				new_li('已保存')
			});
		}
		return;
	} // 已答题

	if (!o['答案']) return;

	answerList.querySelectorAll('li').forEach(function(e) {
		console.log(e.querySelector('em').innerText, e.querySelector('p').innerText);
		if (e.querySelector('p').innerText === o['答案']) 匹配.push(e);
	});
	switch (匹配.length) {
		case 1:
			new_li('唯一匹配成功，稍后答题');
			setTimeout(function(){匹配[0].click()}, 1000);
			break;
		case 0:
			new_li('无匹配答案');
			break;
		default:
			new_li('匹配异常');
	};
});

