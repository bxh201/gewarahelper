

Array.prototype.slice.call(document.querySelectorAll('a[href^="javascript:clickCinemaLi"]')).forEach(function(e) {
	console.log(e.href);
	var 链接 = e.href.trim();
	var 匹配 = 链接.match(/javascript:clickCinemaLi\((\d+),(\d+)\);/);
	if (!匹配) return;
	if (匹配.length != 3) return;
	var 影院编号 = 匹配[1];
	if (!影院编号) return;
	var 优惠编号 = 匹配[2];
	if (!优惠编号) return;
	var 最终链接 = '/movie/m/choiceMovie.xhtml?cid=' + 影院编号 + '&discountid=' + 优惠编号;
	var 活动编号 = 获取参数('adverId');
	if (活动编号) 最终链接 += '&adverId=' + 活动编号;
	e.href = 最终链接;
});

