// ==UserScript==
// @id             MyGoogleTest
// @name           My Google test
// @version        1.0
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @description    
// @include        http*://www.google.*
// @include        http*://www.baidu.com/*
// @run-at         document-end
// ==/UserScript==


var url = location.href;
if (url.match(/^https?:\/\/(www|encrypted)\.google\..{2,9}\/(webhp|#|$|\?)/)) {
	addMutationObserver('#main', function(){
		console.log('元素被添加')
	});
} else if (url.match(/^https?:\/\/www\.baidu\.com\/[^#]*($|#wd=)/)) {
	addMutationObserver('#wrapper_wrapper', function(){
		console.log('元素被添加')
	});
}


function addMutationObserver(selector, callback) {
	var watch = document.querySelector(selector);
	if (watch) {
		var observer = new MutationObserver(function(mutations){
			var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
			if (nodeAdded) {
				// observer.disconnect();
				callback();
			}
		});
		observer.observe(watch, {childList: true});
	}
}




// watch.addEventListener("DOMNodeInserted", DOMNodeInsertedWatcher, false);

// function DOMNodeInsertedWatcher(e) {
// 	console.log('inserted', e.target, e.target.id)
// }