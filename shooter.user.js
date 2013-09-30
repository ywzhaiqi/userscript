// ==UserScript==
// @id             shooter@ywzhaiqi@gmail.com
// @name           shooter.cn 直接下载
// @version        1.3
// @namespace
// @author         ywzhaiqi@gmail.com
// @description    在 shooter.cn 搜索页面按下载按钮直接下载。语言、发行着色。
// @include        http://*shooter.cn/search/*
// @downloadURL    https://userscripts.org/scripts/source/167084.user.js
// @updateURL      https://userscripts.org/scripts/source/167084.meta.js
// @run-at         document-end
// ==/UserScript==

(function(){

var isHighlight = GM_getValue("isHighlight");
if(typeof isHighlight == 'undefined')
	isHighlight = true;

var highlightXPath = '//ul[@id="sublist_ul"]/li[contains(text(), "语言")] | //span[@name="rlsitelink"]';

GM_addStyle("\
  #resultsdiv { width: 800px !important; }\
  .sublist_box_title_l { max-width: 770px !important; }\
	.mHighlight {\
		background-color: rgb(153, 255, 153) !important;\
	}\
");

// 直接下载
var buttons = document.querySelectorAll("a#downsubbtn");
for (var i = buttons.length - 1; i >= 0; i--) {
	buttons[i].setAttribute("onclick", buttons[i].getAttribute("onclick").replace('local_downfile', 'shtgdownfile'));
};

setTimeout(setHighlight, 0);


// 设置着色
function setHighlight(){
  if(isHighlight){
    $x(highlightXPath).forEach(function(e){
      e.classList.add("mHighlight");
    });

    GM_registerMenuCommand("取消射手网着色？", toggleHighlight);
  }else{
    GM_registerMenuCommand("设置射手网着色？", toggleHighlight);
  }
}

function toggleHighlight(){
	isHighlight = !isHighlight;

	GM_setValue("isHighlight", isHighlight);
	window.location.reload();
}

function $x(aXPath, aContext){
    var nodes = [];
    var doc = document;
    var aContext = aContext || doc;

    try {
      var results = doc.evaluate(aXPath, aContext, null,
                                 XPathResult.ANY_TYPE, null);
      var node;
      while (node = results.iterateNext()) {
        nodes.push(node);
      }
    }
    catch (ex) {}

    return nodes;
}

})();
