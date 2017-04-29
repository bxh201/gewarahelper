
var cssEle = document.createElement('style');
document.documentElement.firstElementChild.appendChild(cssEle);

function setPxPerRem() {
	//var dpr = 1;
	//var PxPerRem = parseInt(document.documentElement.clientWidth * dpr / 10);
	if( parseInt(getComputedStyle(document.getElementsByTagName('html')[0], null).getPropertyValue('font-size'), 10) > 16 )
	cssEle.innerHTML = 'html{font-size:' + Math.min(document.documentElement.clientHeight/15, 64) + 'px!important;}';
}
setPxPerRem();
