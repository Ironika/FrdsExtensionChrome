var div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = '60px';
div.style.right = '40px';
div.style.zIndex = 2000;
div.style.color = 'white';
div.style.backgroundColor = '#c3002f';
div.style.padding = '10px';
div.style.marginRight = '15px;';
div.style.height = '50px';
div.style.overflow = 'scroll';
div.style.minWidth = '225px';

var p = document.createElement('p');
p.style.margin = '0';
p.append('Debug Datas : ');

var span = document.createElement('span');
span.style.position = 'absolute';
span.style.top = '5px';
span.style.right = '25px';
span.style.fontSize = '20px';
span.style.cursor = 'pointer';
span.append('+');
span.addEventListener('click', function (event) {
	if(span.innerHTML == '+') {
		span.innerHTML = '-';
		div.style.height = '300px';
	}
	else {
		span.innerHTML = '+';
		div.style.height = '50px';
	}
});

div.appendChild(span);
div.appendChild(p);

var ul = document.createElement('ul');
ul.style.listStyleType = 'none';
ul.style.padding = 0;

//eim data in HTML
var element = document.getElementsByClassName('c_263-4')[0];
if(element) {
	var currentEim = element.getAttribute('data-eim-code');
	if(currentEim) {
		var eim = document.createElement('li');
		eim.append('EIM : ' + currentEim);
		ul.appendChild(eim)
	}
}

//datas to result_do.json
chrome.runtime.onMessage.addListener(
  	function(request, sender, sendResponse) {
    	var datas = request.datasChromeExtension;
    	var li;
    	for(let data in datas) {
    		li = document.createElement('li');
    		li.append(data + ' : ' + datas[data]);
    		ul.appendChild(li)
    	}
});

div.appendChild(ul);

document.documentElement.appendChild(div)