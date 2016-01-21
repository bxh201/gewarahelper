

Array.prototype.slice.call(document.querySelectorAll('dd[onclick^="clickCinemaLi"]')).forEach(function(dd) {
	var 链接 = dd.getAttribute('onclick').trim();
	console.log(链接);
	var 匹配 = 链接.match(/clickCinemaLi\s*\(\s*(\d+),\s*(\d+)\s*\)\s*;?/);
	if (!匹配) return;
	if (匹配.length != 3) return;
	var 影院编号 = 匹配[1];
	if (!影院编号) return;
	var 优惠编号 = 匹配[2];
	if (!优惠编号) return;
	var 最终链接 = '/movie/m/choiceMovie.xhtml?cid=' + 影院编号 + '&discountid=' + 优惠编号;
	var 活动编号 = 获取参数('adverId');
	if (活动编号) 最终链接 += '&adverId=' + 活动编号;
	var e = dd.querySelector('a');
	e.href = 最终链接;
	//dd.removeAttribute('onclick');
	dd.onclick = '';
});

