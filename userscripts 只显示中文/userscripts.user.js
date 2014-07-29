// ==UserScript==
// @name           userscripts 只显示中文
// @namespace      https://github.com/ywzhaiqi
// @version        1.7.3
// @author         ywzhaiqi@gmail.com
// @description    在 userscripts、greasyfork 脚本页面只显示中文脚本，支持 AutoPager 和其它翻页脚本。
// @homepageURL    https://greasyfork.org/scripts/305
// @updateURL      https://greasyfork.org/scripts/305/code/305.meta.js
// @downloadURL    https://greasyfork.org/scripts/305/code/305.user.js

// @include        http*://greasyfork.org/scripts*
// @include        http*://greasyfork.org/*/scripts*
// @include        http*://userscripts.org*/scripts*
// @include        http*://userscripts-mirror.org*/scripts*
// @include        http*://www.webextender.net*/scripts*
// @grant          GM_getValue
// @grant          GM_setValue
// @run-at         document-end
// ==/UserScript==

(function(){

var Config = {
    debug: false,
    buttonID: 'gm-userscript-show-chinese-button',
    hiddenStyleID: 'gm-userscript-show-chinese-style',
    // 需要？稍微减少 MutationObserver 的触发？
    igoreAddedNodeName: ['script', 'hr', 'p', 'button'],

    chineseRegExp: /[\u4E00-\u9Fa5]/,
    // 日文包含：1、片假名（Katakana） 2、平假名（Hiragana） 3、汉字
    // 下面正则检测的是 片假名 和 平假名
    japaneseRegexp: /[\u30A0-\u30FF]|[\u3040-\u309F]/,
};


var Sites = {
    // 兼容了 "Greasy Fork (Firefox)"、"GreasyFork 中文" 脚本
    'greasyfork.org': {
        button: '#script-list-filter',                     // 按钮插入的位置
        line: '.script-list > li, #script-table > tr[id]', // 要隐藏的行（css 选择器）
        test: 'h2, td',                             // 要检测的对象（css 选择器）
    },

    'userscripts.org': {
        button: '#content th.la',
        line: 'tr[id^="scripts-"]',
        test: '.title, .desc',
    },
};

Sites['userscripts-mirror.org'] = Sites['userscripts.org'];
Sites['www.webextender.net'] = Sites['userscripts.org'];


var debug = Config.debug ? console.log.bind(console) : function() {};

var onlyChinese,
    info;

function init() {
    var hostname = location.hostname;

    info = Sites[hostname];
    if (!info) {
        return;
    }

    var buttonParent = document.querySelector(info.button);
    if (!buttonParent) {
        return;
    }

    // load setting
    onlyChinese = GM_getValue('onlyChinese', false);

    if (onlyChinese) {
        addHiddenStyle();
    }

    addButton(buttonParent);

    checkScriptNode();

    // 增加对 翻页脚本的支持
    addMutationObserver('body', checkScriptNode);
}

function addHiddenStyle() {
    if (document.getElementById(Config.hiddenStyleID)) {
        return;
    }

    var cssArr = info.line.split(',').map(function(selector) {
        return selector + ':not([gm-script-lan="zh"]) {display:none !important}';
    });

    var style = document.createElement('style');
    style.id = Config.hiddenStyleID;
    style.textContent = cssArr.join('\n');
    document.head.appendChild(style);
}

function removeHiddenStyle() {
    var style = document.getElementById(Config.hiddenStyleID);
    if (style) {
        document.head.removeChild(style);
    }
}

function checkScriptNode() {
    var scripts = document.querySelectorAll(info.line);
    var script,
        nodes;
    for (var i = scripts.length - 1; i >= 0; i--) {
        script = scripts[i];

        if (script.hasAttribute('gm-script-lan')) {
            continue;
        }

        nodes = script.querySelectorAll(info.test);
        if (nodes.length === 0) {
            nodes = [script];
        }
        script.setAttribute('gm-script-lan', getScriptLan(nodes));
    }
}

function getScriptLan(nodes) {
    for (var i = nodes.length - 1, text; i >= 0; i--) {
        text = nodes[i].textContent;

        if (text.match(Config.japaneseRegexp)) {
            return 'jp';
        }

        if (text.match(Config.chineseRegExp)) {
            return 'zh';
        }
    }

    return '';
}

function addButton(parent) {
    var button = document.createElement('button');
    button.type = "button";
    button.id = Config.buttonID;
    button.innerHTML = onlyChinese ? "显示全部" : "只显示中文";
    button.onclick = function(){
        if (onlyChinese) {
            removeHiddenStyle();
            button.innerHTML = "只显示中文";
        } else {
            addHiddenStyle();
            button.innerHTML = "显示全部";
        }

        onlyChinese = !onlyChinese;
        GM_setValue('onlyChinese', onlyChinese);
    };

    return parent.appendChild(button);
}

function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(function(mutations){
        // 排除设定里的插入对象
        var nodeAdded = mutations.some(function(x){
            return [].some.call(x.addedNodes, function(node) {
                return node.localName && Config.igoreAddedNodeName.indexOf(node.localName) == -1;
            });
        });
        if (nodeAdded) {
            // console.log(mutations)
            // observer.disconnect();
            callback(mutations);
        }
    });
    observer.observe(watch, {childList: true, subtree: true});
}


// function showAll () {
//  var trs = document.querySelectorAll(".gm-mhide");
//  for (var i = trs.length - 1; i >= 0; i--) {
//      trs[i].classList.remove("gm-mhide");
//  }

//  onlyChinese = false;
// }

// // 隐藏其它，只显示中文
// function hideOthers(){
//  var scripts = document.querySelectorAll(info.line + ':not(.gm-mhide)'),
//      script, checkElems;

//  debug('要检查的行是：', scripts, '选择器是：' + info.line + ':not(.gm-mhide)');

//  var hasChinese = function (elems) {
//      for (var i = elems.length - 1, text; i >= 0; i--) {
//          text = elems[i].textContent;

//          if (text.match(Config.japaneseRegexp)) {
//              continue;
//          }

//          if (text.match(Config.chineseRegExp)) {
//              return true;
//          }
//      }

//      return false;
//  };

//  for (var i = scripts.length - 1; i >= 0; i--) {
//      script = scripts[i];

//      checkElems = script.querySelectorAll(info.test);
//      if (!hasChinese(checkElems)) {
//          script.classList.add('gm-mhide');
//      }
//  }

//  onlyChinese = true;
// }


init();


})();

