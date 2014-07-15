// ==UserScript==
// @name               Next Page ModY
// @author             ywzhaiqi && Sunwan（原作者）
// @version            1.3.1
// @namespace          https://github.com/ywzhaiqi/userscript/tree/master/NextPage
// @description        使用左右方向键来翻页
// @include            http://*
// @include            https://*
// @include            file://*
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_addStyle
// @grant              GM_registerMenuCommand
// ==/UserScript==

/*
    如需在本地文件生效，需要在 about:config 中设置 extensions.greasemonkey.fileIsGreaseable 为 true
 */


(function() {

    var Config = {
        debug: false,

        addkeydown: true,
        checkDomainPort: true,  // 是否跳过跨域的链接
        custom_next: "",
        custom_previous: "",
    };

    var Rule = {};

    // 自定义规则，用于自动查找无效的情况，支持 css、xpath、函数
    Rule.specialSite = [
        {name: '图灵社区 : 图书 tupubarticle',
            /**
                url 支持正则、字符串、数组，默认去掉了 http 头
                url: /www\.ituring\.com.cn\/tupubarticle/i,
                url: 'www.ituring.com.cn/tupubarticle',
                url: ['www.ituring.com.cn/tupubarticle'],

                nextLink: 'css;.current-article + li > a',
            */
            url: /www\.ituring\.com.cn\/tupubarticle/i,
            nextLink: '//li[@class="current-article"]/following-sibling::li[1]/a',
            prevLink: '//li[@class="current-article"]/preceding-sibling::li[1]/a'
        },
        {name: 'Google code',
            url: /code\.google\.com\//i,
            nextLink: '//a[@title="Next"]',
            prevLink: '//a[@title="Previous"]'
        },
        {name: 'ZEALER',
            url: /www\.zealer\.com\//i,
            nextLink: '//li[@class="next"]/a',
            prevLink: '//li[@class="previous"]/a'
        },
    ];

    // 来自 nextpage.uc.xul
    Rule.specialCommon = [
        {name: 'Discuz论坛帖子列表页面',
            url: /[^\/]+\/(?:(?:forum)|(?:showforum)|(?:viewforum))/i,
            preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
            nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]'
        },
        {name: 'Discuz论坛帖子内容页面',
            url: /[^\/]+\/(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))/i,
            preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
            nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]'
        },
        {name: 'phpWind论坛帖子列表页面',
            url: /[^\/]+\/(?:bbs\/)?thread/i,
            preLink: '//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
            nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)][@href]'
        },
        {name: 'phpWind论坛帖子内容页面',
            url: /[^\/]+\/(?:bbs\/)?read/i,
            preLink: '//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
            nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)][@href]'
        }
    ];


    // ==== tools
    var forEach = function (array, action) {
        for (var i = 0; i < array.length; i++) {
            action(array[i], i);
        }
    };

    var some = function (array, action) {
        for (var i = 0; i < array.length; i++) {
            if (action(array[i], i)) return true;
        }
        return false;
    };

    var toRE = function (obj) {
        if (obj instanceof RegExp) {
            return obj;
        } else if (typeof(obj) === 'string'){
            obj = '^' + obj;
        }

        return new RegExp(obj);
    };

    // ==== main
    var locationHref = location.href,
        matchUrl = locationHref.replace(/^https?:\/\//i, '');

    var isMatchUrls = function(urls) {
        if (!Array.isArray(urls)) urls = [urls];

        return some(urls, function(url){ return toRE(url).test(matchUrl); });
    };


    var checked = false;
    var delay = false;
    var emptyRegexp = /^\s$/;
    var next = {};
    var previous = {};
    // 下一页链接里的文字
    next.texts = [
        'next',
        'next page',
        'old',
        'older',
        'earlier',
        '下页',
        '下頁',
        '下一页',
        '下一頁',
        '后一页',
        '后一頁',
        '翻下页',
        '翻下頁',
        '后页',
        '后頁',
        '下翻',
        '下一个',
        '下一张',
        '下一幅',
        '下一节',
        '下一章',
        '下一篇',
        '后一章',
        '后一篇'
    ];
    // 上一页链接里的文字
    previous.texts = [
        'previous',
        'prev',
        'previous page',
        'new',
        'newer',
        'later',
        '上页',
        '上頁',
        '上一页',
        '上一頁',
        '前一页',
        '前一頁',
        '翻上页',
        '翻上頁',
        '前页',
        '前頁',
        '上翻',
        '上一个',
        '上一张',
        '上一幅',
        '上一节',
        '上一章',
        '上一篇',
        '前一章',
        '前一篇'
    ];
    // 可能会误判的关键词
    next.miswords = {
        "下一章": 30,
        "下一篇": 30,
        "后一章": 30,
        "后一篇": 30,
        "下一节": 30,
        ">>": 2000,
        "»": 2000,
    }
    previous.miswords = {
        "上一章": 30,
        "上一篇": 30,
        "前一章": 30,
        "前一篇": 30,
        "上一节": 30,
        "<<": 2000,
        "«": 2000,
        "new": 30,
    }

    loadConfig();

    // 最后添加一些论坛使用的翻页符号
    next.texts.push(">>");
    next.texts.push(">");
    next.texts.push("»");
    next.texts.push("›");
    previous.texts.push("<<");
    previous.texts.push("<");
    previous.texts.push("«");
    previous.texts.push("‹");

    // 翻页文字的前面和后面可能包含的字符（正则表达式）
    var preRegexp = '(^\\s*(?:[<‹«]*|[>›»]*|[\\(\\[『「［【]?)\\s*)';
    // var nextRegexp = '(\\s*(?:[>›»]*|[\\)\\]』」］】]?)\\s*$)';
    // 调整如下
    var nextRegexp = '(?:\\s*([＞>›»]*)|(?:[\\)\\]』」］】→]?)\\s*$)';

    // 检查定义过的规则
    function checkDefinedNext(win, direction, searchSub) {
        win = win || window;
        var doc = win.document;

        var search = function(array) {
            var i, nextLink, prevLink, xpath, link;
            for (i = 0; i < array.length; i++) {
                if (isMatchUrls(array[i].url)) {
                    nextLink = array[i].nextLink;
                    prevLink = array[i].prevLink;

                    if (direction && nextLink) {
                        link = doc.evaluate(nextLink, doc, null, 9, null).singleNodeValue;
                        if (!link) continue;

                        next.found = true;
                        next.link = link;
                        return 1
                    } else if (prevLink) {
                        link = doc.evaluate(prevLink, doc, null, 9, null).singleNodeValue;
                        if (!link) continue;
                        // if (!link) return -1;

                        previous.found = true;
                        previous.link = link;
                        return 1;
                    }
                }
            }
        };

        if (search(Rule.specialSite) || search(Rule.specialCommon)) return 1;
        //对子窗口应用特殊规则
        if (searchSub) {
            var f = win.frames;
            for (var i = 0, c; i < f.length; i++) {
                c = checkDefinedNext(f[i]);
                if (c == 1 || c == -1) return c;
            }
        }
    }

    function checkLinks(doc) {
        if (!doc) doc = document;

        var _domain_port = doc.location.host;

        var link, text, ldnc, lnc, ldpc, lpc, num, digCurFound, linkNumber, found, tmpNode;
        var regexp = new RegExp();
        // 查找相应的链接
        var links = doc.getElementsByTagName('A');
        for (var i = 0, l = links.length; i < l; i++) {
            link = links[i];

            // 如果不是当前域,跳过
            if (Config.checkDomainPort && /^https?:/i.test(link.href) && link.hostname.indexOf(doc.domain) === -1) {
                continue;
            }

            // 跳过不起作用的链接
            if (!link.offsetParent || link.offsetWidth == 0 || link.offsetHeight == 0 || (!link.hasAttribute("href") && !link.hasAttribute("onclick")))
                continue;
            // 跳过日历
            if (/(?:^|\s)(?:monthlink|weekday|day|day[\-_]\S+)(?:\s|$)/i.test(link.className))
                continue;

            if (/^nextlink/i.test(link.id) || /^linknext/i.test(link.id) ||
                /(^|\s)nextlink/i.test(link.className) || /(^|\s)linknext/i.test(link.className))
                next.link = link;
            if (/^prev(ious)?link/i.test(link.id) || /^linkprev(ious)?/i.test(link.id) ||
                /(^|\s)prev(ious)?link/i.test(link.className) || /(^|\s)linkprev(ious)?/i.test(link.className))
                previous.link = link;

            text = link.textContent;
            if (!text) {
                // 若链接中没有文字，则检查图片的alt属性、链接或图片的title
                [].some.call(link.childNodes, function(img){
                    if (img.localName == "IMG") {
                        text = img.alt || link.title || img.title;
                        if (text) return;
                    }
                });

                if (!text) continue;
            }
            text = text.toLowerCase().replace(/^\s+|\s+$/g, "");
            if (!text) continue;

            // 纯数字链接
            if (isDigital(text)) {
                if (digCurFound) continue;
                linkNumber = parseInt(RegExp.$1);

                // 检测下一个位置是否是当前页面的页数
                if ((tmpNode = getCurrentPageNode(link, linkNumber, 1)) && tmpNode) {
                    digCurFound = true;
                    previous.link = link;
                    previous.found = true;
                    previous.pos = i;
                    // 再检测下下一个位置是否是“下一页”的链接
                    if (getNextLink(tmpNode, linkNumber + 2, true))
                        break;
                    // 设置往后的30个位置以内为“下一页”的可能链接，以提高检测速度。
                    ldnc = i + 30;
                }
                // 检测上一个位置是否是当前页面的页数
                else if (getCurrentPageNode(link, linkNumber, -1)) {
                    digCurFound = true;
                    next.link = link;
                    next.found = true;
                    next.pos = i;
                    ldpc = i + 30;
                    continue;
                }
                // 检测自身是否是当前页面的页数
                else if (getCurrentPageNode(link, linkNumber, 0)) {
                    digCurFound = true;
                    // 再检测下一个位置是否是“下一页”的链接
                    if (getNextLink(link, linkNumber + 1, true)) {
                        next.pos = i;
                        ldpc = i + 30;
                        continue;
                    }
                    // 设置往后的30个位置以内为“下一页”的可能链接，以提高检测速度。
                    ldnc = i + 30;
                }
                continue;
            } else {
                found = false;
                if (!next.found && !(lnc < i) && !(ldnc < i)) {
                    for (var j = 0; j < next.texts.length; j++) {
                        regexp.compile(preRegexp + next.texts[j] + nextRegexp, 'i');
                        if (regexp.test(text)) {
                            // 检测到“下一页”的链接
                            found = true;
                            next.link = link;
                            num = next.miswords[next.texts[j]];
                            // 若“下一页”的词语有可能会误判时，最多再检测预定个数的链接。
                            (num == null) ? next.found = true : lnc = i + num;
                            break;
                        }
                    }
                }
                if (!next.digital && lnc < i) next.found = true;

                if (!found && !previous.found && !(lpc < i) && !(ldpc < i)) {
                    for (var j = 0; j < previous.texts.length; j++) {
                        regexp.compile(preRegexp + previous.texts[j] + nextRegexp, 'i');
                        if (regexp.test(text)) {
                            // 检测到“上一页”的链接
                            previous.link = link;
                            num = previous.miswords[previous.texts[j]];
                            // 若“上一页”的词语有可能会误判时，最多再检测预定个数的链接。
                            (num == null) ? previous.found = true : lpc = i + num;
                            break;
                        }
                    }
                }
                if (lpc < i) previous.found = true;
                // 重新设置纯数字链接未被检查
                digCurFound = null;
            }

            // 找到“上一页”和“下一页”的链接或找到其中一个而另一个超过规定范围没找到，将不再查找。
            if (next.found && previous.found ||
                next.found && i > next.pos + 30 ||
                previous.found && i > previous.pos + 30) {

                break;
            }
        }
        // 通过以上方法没有找到“下一页”的，把第一次检测出来的数字1的链接作为当前页，2作为“下一页”。
        if (!next.found /*&& !next.link*/ && next.digital)
            next.link = next.digital;

        if (next.link) next.found = true;
        if (previous.link) previous.found = true;

        if (!next.found && !previous.found)
            checkButtons();
    }

    // 检查翻页按钮
    function checkButtons() {
        var but, text, found;
        var regexp = new RegExp();
        var buts = document.getElementsByTagName('INPUT');
        for (var i = 0; i < buts.length; i++) {
            but = buts[i];
            if (but.hasAttribute("disabled") || !(/^button$/i.test(but.type) && but.getAttribute("onclick"))) continue;

            text = but.value;
            found = false;
            if (!next.found) {
                for (var j = 0; j < next.texts.length; j++) {
                    if (regexp.compile(preRegexp + next.texts[j] + nextRegexp, 'i').test(text)) {
                        // 检测到“下一页”的按钮
                        next.link = but;
                        next.found = found = true;
                        break;
                    }
                }
            }

            if (!found && !previous.found) {
                for (var j = 0; j < previous.texts.length; j++) {
                    if (regexp.compile(preRegexp + previous.texts[j] + nextRegexp, 'i').test(text)) {
                        // 检测到“上一页”的按钮
                        previous.link = but;
                        previous.found = true;
                        break;
                    }
                }
            }
            if (next.found && previous.found) break;
        }
    }

    // 取得相邻的纯数字节点，type: 1 下一个；-1 上一个
    function getSiblingNode(node, type) {
        if (!node) return null;
        node = getSibling(node, type);
        while (node && (node.nodeName == "#coment" ||
            (/^\s*[\]］】]?[,\|]?\s*[\[［【]?\s*$/.test(node.textContent))))
            node = getSibling(node, type);
        return node;
    }

    function getSibling(aNode, type) {
        if (!aNode) return null;
        if (isOnlyNode(aNode)) {
            try {
                aNode = (type == 1 ? aNode.parentNode.nextSibling : aNode.parentNode.previousSibling);
                if (skipNode(aNode))
                    aNode = (type == 1 ? aNode.nextSibling : aNode.previousSibling);
                aNode = aNode.childNodes[0];
                if (skipNode(aNode))
                    aNode = aNode.nextSibling;
            } catch (e) {
                return null;
            }
        } else {
            aNode = (type == 1 ? aNode.nextSibling : aNode.previousSibling);
        }
        return aNode;
    }

    function isOnlyNode(n) {
        return !n.nextSibling && !n.previousSibling ||
            !n.nextSibling && skipNode(n.previousSibling) && !n.previousSibling.previousSibling ||
            !n.previousSibling && skipNode(n.nextSibling) && !n.nextSibling.nextSibling ||
            skipNode(n.previousSibling) && !n.previousSibling.previousSibling &&
            skipNode(n.nextSibling) && !n.nextSibling.nextSibling;
    }

    function skipNode(sNode) {
        return sNode && /*sNode.nodeName == "#text" &&*/ (/^\s*$/.test(sNode.textContent));
    }

    // 检测是否有下一页的纯数字链接，number:页数
    function getNextLink(node, number, set) {
        var tNode = getSiblingNode(node, 1);
        if (tNode && tNode.nodeName == "A" && isDigital(tNode.textContent)) {
            if (RegExp.$1 == number) {
                // 找到纯数字链接
                if (set) {
                    next.link = tNode;
                    next.found = true;
                }
                return tNode;
            }
        }
        return null;
    }

    function isDigital(str, t) {
        str = str.replace(/^\s+|\s+$/g, "");
        if (t == -1)
            str = str.split(/\s+/).pop();
        else if (t == 1)
            str = str.split(/\s+/)[0];
        return (/^(\d+)$/.test(str)) ||
            (/^\[\s?(\d+)\s?\]$/.test(str)) ||
            (/^【\s?(\d+)\s?】$/.test(str)) ||
            (/^［\s?(\d+)\s?］$/.test(str)) ||
            (/^<\s?(\d+)\s?>$/.test(str));
    }

    // 判断是否是当前页面的数字，type:-1,0,1 分别是要判别的上一个、当前、下一个节点
    function getCurrentPageNode(node, linkNum, type) {
        var tNode;
        if (type == 0) {
            tNode = getSiblingNode(node, 1) || getSiblingNode(node, -1);
            if (!tNode) return null;
            if (!node.hasAttribute("onclick") && node.href != tNode.href &&
                (!node.hasAttribute("href") && isDigital(node.textContent, type) ||
                    !(/\/#[^\/]+$/.test(node.href)) && node.href == location.href && isDigital(node.textContent, type))) {
                if (linkNum > 0 && RegExp.$1 == linkNum) return node;
            }
            // 某些论坛处在第一页时，实际链接和当前页链接不符，只有和其余纯数字链接的结构或颜色不同时，
            // 才使用纯数字的“2”作为“下一页”的链接。
            else if (!next.digital && (/^\s*[\[［【]?1[\]］】]?\s*$/.test(node.textContent))) {
                var two = getNextLink(node, 2);
                if (two && difDigital(node, two))
                    next.digital = two;
            }
        } else {
            tNode = getSiblingNode(node, type);
            if (!tNode) return null;
            if (tNode.nodeName != "A" && isDigital(tNode.textContent, type) ||
                tNode.nodeName == "A" && !tNode.hasAttribute("onclick") && node.href != tNode.href &&
                (!tNode.hasAttribute("href") && isDigital(tNode.textContent, type) ||
                    !(/\/#[^\/]+$/.test(tNode.href)) && tNode.href == location.href && isDigital(tNode.textContent, type))) {
                var n = linkNum + type;
                if (n > 0 && RegExp.$1 == n) {
                    if (next.digital) next.digital = null;
                    return tNode;
                }
            }
        }
        return null;
    }

    function difDigital(node1, node2) {
        if (getStructure(node1) == getStructure(node2) && getStyleColor(node1) == getStyleColor(node2))
            return false;
        return true;
    }

    function getStructure(aNode) {
        return aNode.innerHTML.replace(/\d+/, "");
    }

    function getStyleColor(aNode) {
        return document.defaultView.getComputedStyle(aNode, null).getPropertyValue("color");
    }

    function openLink(linkNode) {
        if (!linkNode) return;
        var hf = linkNode.getAttribute("href");
        if (!linkNode.hasAttribute("onclick") && hf && !(/^#/.test(hf)) && linkNode.href != location.href) {
            cleanVars();
            location.assign(linkNode.href);
        } else {
            // 有些4D鼠标摆动一下滚轮会触发多下的方向键，故增设一个延迟参数，使它只翻一页。
            delay = true;
            setTimeout(cleanVars, 300);
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", 1, 1, window, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, linkNode);
            linkNode.dispatchEvent(e);
        }
    }

    function cleanVars() {
        try {
            checked = false;
            delay = false;
            next.link = next.found = next.digital = null;
            previous.link = previous.found = previous.digital = null;
            delete next.pos;
            delete previous.pos;
        } catch (e) {}
    }

    function goNext(direction) {
        // 检查过且没有发现上一页或下一页的连接，则退出
        if (checked && !next.found && !previous.found)
            return;

        var c = checkDefinedNext(window, direction);
        if (c == -1) {
            return;
        } else if (!c) {
            if (!checked) {
                checkLinks();
                checked = true;
            }
        }

        if (Config.debug) {
            if (next.found)
                next.link.style.boxShadow = '0 0 2px 2px #FF5555';
            if (previous.found)
                previous.link.style.boxShadow = '0 0 2px 2px #5AC900';
            console.log(next, previous)
            return;
        }

        if (direction && next.found) {
            openLink(next.link);
        } else if (!direction && previous.found) {
            openLink(previous.link)
        }
    }

    function onKeyDown(event) {
        // 不是左右方向建被按下或不到延迟时间则退出
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey || 
            event.keyCode != 37 && event.keyCode != 39 || delay)
            return

        var target = event.target,
            localName = target.localName;

        // 确保光标不是定位在文字输入框或选择框
        if (localName == 'textarea' || localName == 'input' || localName == 'select')
            return;

        // 百度贴吧回复输入的问题
        if (target.getAttribute('contenteditable') == 'true')
            return;

        if (event.keyCode == 37) {  // 左方向键，跳到“上一页”
            goNext(false);
        } else if (event.keyCode == 39) {  // 右方向键，跳到“下一页”
            goNext(true);
        }
    }

    function loadConfig() {
        Config.debug = !!GM_getValue('debug', Config.debug);
        Config.addkeydown = !!GM_getValue('addkeydown', Config.addkeydown);
        Config.checkDomainPort = !!GM_getValue('checkDomainPort', Config.checkDomainPort);

        Config.custom_next = GM_getValue('custom_next', Config.custom_next);
        Config.custom_previous = GM_getValue('custom_previous', Config.custom_previous);

        // 取得自定义关键词
        getCustom(next, "next");
        getCustom(previous, "previous");
    }

    // 取得并设置自定义关键词
    function getCustom(aObj, key) {
        var cKeyWords = Config["custom_" + key];
        var words = cKeyWords.split(/,|，/);
        words.forEach(function(w) {
            var site = null;
            if (/^\s*{\s*(\S*?)\s*}(.*)$/.test(w)) {
                site = RegExp.$1;
                w = RegExp.$2;
                site = site.replace(/[\/\?\.\(\)\+\-\[\]\$]/g, "\\$&").replace(/\*/g, "\.*");
            }
            w = w.replace(/\\/g, "\\").replace(/^\s+|\s+$/g, "");
            if (w) {
                if (site) {
                    var re = new RegExp(site, 'i');
                    if (re.test(location.href))
                        aObj.texts.push(w);
                } else
                    aObj.texts.push(w);
            }
        });
    }

    // 注册菜单
    function registerMenu(key) {
        if (navigator.language == "zh-CN") {
            var word = key == "next" ? "下一页" : "上一页";
            GM_registerMenuCommand("Next Page " + word + "关键词", function() {
                setCustom(key, word)
            });
        } else {
            GM_registerMenuCommand("Next Page custom_" + key, function() {
                setCustom(key, key)
            });
        }
    }

    // 设置新的关键词
    function setCustom(k, w) {
        var text = navigator.language == "zh-CN" ? "请输入“" + w + "”的关键词，以“,”号分隔开。" : "Please enter the " + w + " page key-words, split with ','.";
        var result = prompt(text, GM_getValue("custom_" + k, ""));
        if (result != null) GM_setValue("custom_" + k, result);
    }

    function setup(){
        var d = document;
        var on = function(node, e, f) {
            node.addEventListener(e, f, false);
        };

        var $ = function(s) { return d.getElementById('nextpage-prefs-'+s); };
        if($('setup')) return;

        var styleNode = GM_addStyle('\
            #nextpage-prefs-setup { position:fixed;z-index:2147483647;top:30px;right:60px;padding:20px 30px;background:#eee;width:500px;border:1px solid black; }\
            #nextpage-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
            #nextpage-prefs-setup a { color:black;text-decoration:underline; }\
            #nextpage-prefs-setup div { text-align:center;font-weight:bold;font-size:14px; }\
            #nextpage-prefs-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:#eee;border:0; }\
            #nextpage-prefs-setup input, #nextpage-prefs-setup select { border:1px solid gray;padding:2px;background:white; }\
            #nextpage-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
            #nextpage-prefs-setup button { width:150px;margin:0 10px;text-align:center; }\
            #nextpage-prefs-custom_next { width:98%;height:100px;margin:3px 0; }\
            #nextpage-prefs-custom_previous { width:98%;height:100px;margin:3px 0; }\
        ');

        var div = d.createElement('div');
        div.id = 'nextpage-prefs-setup';
        d.body.appendChild(div);
        div.innerHTML = '\
            <div>Next Page 设置</div>\
                <ul>\
                    <li><input type="checkbox" id="nextpage-prefs-debug" /> 调试模式</li>\
                    <li><input type="checkbox" id="nextpage-prefs-addkeydown" /> 注册左右键翻页？</li>\
                    <li title="跨域的链接会被跳过">\
                        <input type="checkbox" id="nextpage-prefs-checkDomainPort"/>\
                         是否跳过跨域的链接？<i>注：需要更多的测试</i></li>\
                    <li>下一页关键字：\
                        <div><textarea id="nextpage-prefs-custom_next" placeholder="自定义下一页关键字，以“,”号分隔开。"></textarea></div>\
                    </li>\
                    <li>上一页关键字：\
                        <div><textarea id="nextpage-prefs-custom_previous" placeholder="自定义上一页关键字，以“,”号分隔开。"></textarea></div>\
                    </li>\
                </ul>\
            <div><button id="nextpage-prefs-ok">确定</button><button id="nextpage-prefs-cancel">取消</button></div>';
        div = null;

        var close = function() {
            if (styleNode) {
                styleNode.parentNode.removeChild(styleNode);
            }
            var div = $('setup');
            div.parentNode.removeChild(div);
        };

        on($('ok'), 'click', function(){
            GM_setValue('debug', $('debug').checked);
            GM_setValue('addkeydown', $('addkeydown').checked);
            GM_setValue('checkDomainPort', $('checkDomainPort').checked);
            GM_setValue("custom_next", $('custom_next').value);
            GM_setValue("custom_previous", $('custom_previous').value);

            loadConfig();

            window.removeEventListener("keydown", onKeyDown, true);
            if (Config.addkeydown) {
                window.addEventListener("keydown", onKeyDown, true);
            }

            close();
        });

        on($('cancel'), 'click', close);

        $('debug').checked = Config.debug;
        $('addkeydown').checked = Config.addkeydown;
        $('checkDomainPort').checked = Config.checkDomainPort;
        $('custom_next').value = Config.custom_next;
        $('custom_previous').value = Config.custom_previous;    
    }

    if (Config.addkeydown) {
        window.addEventListener("keydown", onKeyDown, true);
    }

    // 监听下一页事件.
    document.addEventListener('nextpage.go', function() {
        goNext(true);
    }, false);

    // 监听上一页事件.
    document.addEventListener('nextpage.back', function() {
        goNext(false);
    }, false);

    GM_registerMenuCommand('Next Page 设置', setup);
})();