// ==UserScript==
// @id             userscripts@ywzhaiqi@gmail.com
// @name           userscripts 只显示中文
// @version        1.2.1
// @author         ywzhaiqi@gmail.com
// @description    在userscripts.org Script页面只显示中文脚本，可与autopage 配合使用
// @include        /https?://userscripts.org/scripts$/
// 注： UserScriptLoader.uc.js 可能不支持正则
// @include        http*://userscripts.org/scripts?page=*
// @include        http*://userscripts.org/scripts/search?q=*
// @run-at         document-end
// ==/UserScript==

(function(){

var hided = false,
	contentDiv = document.getElementById('content'),
	contentHeight;

// 隐藏其它，只显示中文
function hideOthers(){
	var scripts = document.querySelectorAll(".script-meat"),
		script,
		parent;
	for (var i = scripts.length - 1; i >= 0; i--) {
		script = scripts[i];
		parent = script.parentElement;
		if(parent.className.indexOf('mhide') > -1){ 
			continue;
		}
		if(!/[\u4E00-\u9FA5]/.test(script.querySelector('a').textContent + script.querySelector('p.desc').textContent)){ 
			parent.className += ' mhide'; 
		}
	}

	hided = true;
}

function showAll () {
	var trs = document.querySelectorAll(".mhide");
	for (var i = trs.length - 1; i >= 0; i--) {
		trs[i].className = trs[i].className.replace(/(\s+|)mhide(\s+|)/g, '');
	}

	hided = false;
}

function addButton(){
	var button = document.createElement('button');
	button.type = "button";
	button.innerHTML = "只显示中文";
	button.onclick = function(){
		if(hided){
			showAll();
			button.innerHTML = "只显示中文";
			contentHeight = contentDiv.scrollHeight;
		}else{
			hideOthers();
			button.innerHTML = "显示全部";
			contentHeight = contentDiv.scrollHeight;
		}
	};

	var parent = document.querySelector("th.la");
	parent.appendChild(button);
}

function fixAutoPage(){
	var firstTime = true;
	document.onscroll = function(){
		if(firstTime){
			contentHeight = contentDiv.scrollHeight;
			firstTime = false;
		}
		// console.log(contentDiv.scrollHeight, contentHeight);
		if(contentDiv.scrollHeight > contentHeight){
			// console.log("add");
			if(hided){
				hideOthers();
			}else{
				showAll();
			}
		}
	};
}

GM_addStyle(".mhide {display:none !important}");
addButton();
fixAutoPage();

})();

