// ==UserScript==
// @name           userscripts 只显示中文
// @namespace      https://github.com/ywzhaiqi
// @version        1.3
// @author         ywzhaiqi@gmail.com
// @description    在 userscripts、greasyfork 脚本页面只显示中文脚本，支持 AutoPager 和其它翻页脚本。

// 注： UserScriptLoader.uc.js 可能不支持正则
// @include        http*://userscripts.org/scripts?page=*
// @include        http*://userscripts.org/scripts/search?q=*
// @include        http*://greasyfork.org/scripts*
// @include        http*://userscripts-mirror.org/scripts*
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function(){

var Config = {
	debug: false,
	chineseRegExp: /[\u4E00-\u9FA5]/,
};

var Sites = {
	// 站点 host: [要隐藏行的 css 选择器，要检测的 css 选择器（是前面的子选择器）]
	'greasyfork.org': ['.script-list > li', 'article'],
	'userscripts.org': ['tr[id^="scripts-"]', '.title, .desc'],
	'userscripts-mirror.org': ['tr[id^="scripts-"]', '.title, .desc'],
};


var debug = Config.debug ? console.log.bind(console) : function() {};


var hided = false,
	site;

function init() {
	var host = location.host;

	site = Sites[host];
	if (!site) {
		return;
	}

	var parent = document.querySelector("#content th.la, #script-list-filter");
	if (!parent) {
		return ;
	}

	addStyle(".gm-mhide {display:none !important}");

	addButton(parent);

	// 增加对 翻页脚本的支持
	addMutationObserver('body', function(){
		if (hided) {
			hideOthers();
		} else {
			showAll();
		}
	});
}

function addButton(parent) {
	var button = document.createElement('button');
	button.type = "button";
	button.innerHTML = "只显示中文";
	button.onclick = function(){
		if(hided){
			showAll();
			button.innerHTML = "只显示中文";
		}else{
			hideOthers();
			button.innerHTML = "显示全部";
		}
	};
	
	parent.appendChild(button);
}

function showAll () {
	var trs = document.querySelectorAll(".gm-mhide");
	for (var i = trs.length - 1; i >= 0; i--) {
		trs[i].classList.remove("gm-mhide");
	}

	hided = false;
}

// 隐藏其它，只显示中文
function hideOthers(){
	var scripts = document.querySelectorAll(site[0] + ':not(.gm-mhide)'),
		script, checkElems;

	debug('要检查的行是：', scripts, '选择器是：' + site[0] + ':not(.gm-mhide)');

	var hasChinese = function (elems) {
		for (var i = elems.length - 1; i >= 0; i--) {
			if (elems[i].textContent.match(Config.chineseRegExp)) {
				return true;
			}
		}

		return false;
	};

	for (var i = scripts.length - 1; i >= 0; i--) {
		script = scripts[i];

		checkElems = script.querySelectorAll(site[1]);
		if (!hasChinese(checkElems)) {
			script.classList.add('gm-mhide');
		}
	}

	hided = true;
}


function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(function(mutations){
        var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
        if (nodeAdded) {
            // observer.disconnect();
            callback();
        }
    });
    observer.observe(watch, {childList: true, subtree: true});
}


function addStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	return document.head.appendChild(style);
}


init();


})();

