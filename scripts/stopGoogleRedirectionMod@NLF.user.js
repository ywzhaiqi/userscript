// ==UserScript==
// @name           stopGoogleRedirectionMod
// @author         NLF
// @description    禁止google的搜索结果重定向，加快访问速度，防止撞墙（support （opera，firefox（GreaseMonkey），chrome） Latest Stable，IE9+）
// @version        1.0.0.5
// @created        2013-12-26
// @lastUpdated    2013-2-5
// @grant          none
// @run-at         document-start
// @namespace      http://userscripts.org/users/NLF
// @homepage       http://userscripts-mirror.org/scripts/show/186798
// @include        https://www.google.*
// ==/UserScript==

;(function () {
	'use strict';

	// 将在真实环境下执行的实际函数。
	function contentScript() {
		'use strict';
		
		// 匹配应用本脚本的网页
		if (!/^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\//i.test(location.href)) {
			return;
		};
		
		var emptyFn = function () {
		};
		
		// 覆盖google处理重定向的函数
		if (typeof Object.defineProperty == 'function') {
			Object.defineProperty(window, 'rwt', {
				configurable: false,
				enumerable: true,
				get: function () {
					return emptyFn;
				},
			});
		} else if (typeof window.__defineGetter__ == 'function') {
			window.__defineGetter__('rwt', function () {
				return emptyFn;
			});
		};
		
	};


	// 如果发生通信的话，需要一个独一无二的ID
	var messageID = Math.random().toString();
	
	// 把指定函数丢到真实环境中执行，规避一切脚本管理器乱七八糟的执行环境产生的奇葩Bug，
	// 特别是chrome上的那个坑爹tampermonkey。。。
	function runInPageContext(fn) {
		if (typeof fn !== 'function') {
			return;
		};
		
		// 创建一个脚本插入到pageContext执行
		var script = document.createElement('script');
		script.type = 'text/javascript';
		
		// 去掉函数名，防止污染全局环境。
		var sContent = ';(' + fn.toString().replace(/[^(]+/, 'function ') + ')(' + JSON.stringify(messageID) + ');';
		
		// console.log('执行的脚本实际内容\n', sContent);
		
		script.textContent = sContent;

		// 检测html元素是否可访问
		// scriptish @run-at document-start时，html元素在第一时间不可访问
		var de = document.documentElement;
		
		if (de) {
			de.appendChild(script);
			de.removeChild(script);
		} else {
			new (window.MutationObserver || window.WebKitMutationObserver)(function (ms, observer) {
			
				var de = document.documentElement;
				if (de) {
					// console.log(de.outerHTML);
					observer.disconnect();
					
					de.appendChild(script);
					de.removeChild(script);
				};
			}).observe(document, {
				childList: true,
			});
		};
		
	};

	runInPageContext(contentScript);
})();
