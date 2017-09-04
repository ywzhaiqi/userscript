/**
 * 提取自 NextPage for mobile 扩展，https://addons.mozilla.org/en-US/mobile/addon/nextpage-for-mobile/
 */

var nextPage = new function() {

    this.debug = true;

    var config = {
        //快进,快退访问已浏览过的页面,操作太快的话,有些页面(尤其是discuz)的翻页可能会出现异常,可以改为false.
        //目前,启用预读的话,usehistory会自动禁用
        useHistory: true
        //是否搜索图片,有些问题,似乎无法正常工作
        ,
        searchImg: false
        //------------------------------------------------------------------------------
        //是否启用快捷键
        ,
        key_use: false
        //快捷键的冻结时间,即两次翻页的间隔,单位是毫秒
        ,
        key_freeze: 1000
        //上一页的按键
        ,
        key_prev: "VK_LEFT"
        //下一页的按键
        ,
        key_next: "VK_RIGHT"
        //辅助键,默认是ctrl,不使用的话,改成false即可,也可以是alt,shift
        ,
        key_modifiers: false
        //------------------------------------------------------------------------------
        //预读模式:
        // 0,完全禁用预读
        //2,模式2,使用iframe置换的方式,效果最好,在模式2下,可以针对站点进行排除,被排除的站点会预读但不会置换
        ,
        prefetchMode: 0
        //是否在状态栏显示预读开关
        ,
        prefetchSwitcher: false
        //开关的初始状态
        ,
        perfetchSwitcherInit: true
        //状态栏开关的标题
        ,
        prefetchSwitcherLabel: "Prefetch"
        //false是在domcontentloaded加载,true是在load加载,false预读的比较快,true比较不会影响当前页面的加载
        ,
        prefetchAfterLoad: false
        //最大的同时预读的页面,0的话,只对当前页面预读
        //目前,只允许值为0
        ,
        prefetchMax: 0
        //启动预读的延迟时间,单位是秒,当prefetchAfterLoad是true的情况下,参数无效
        ,
        prefetchDelay: 3
        //连续预读,不会因为切换页面而停止
        ,
        prefetchContinue: true
        //预读的内容开关
        ,
        prefetch_images: true //图片
        ,
        prefetch_javascript: true //脚本
        ,
        prefetch_redirect: true //重定向之后的文档
        ,
        prefetch_plugins: false //插件,比如flash
        ,
        prefetch_subframes: true //子窗口,frame,iframe
        ,
        prefetch_auth: false //安全验证

        //以下的设定在配置文件中修改
        //如果使用左,右方向键做翻页的快捷键的话(无论是否使用辅助键ctrl,alt等),需要将这个值改为true,否则discuz论坛会不正常
        ,
        isFix4Discuz: false
        //禁止在控制台输出
        ,
        isDisableLog: true
    };
    //---------------------------------------------------------------------------------
    var rule = {};
    //强制使用模拟点击方式的页面,比如淘宝的成交列表,使用正则的方式来判断
    rule.forceClick = [
        /item\.taobao\.com/i,
        /news\.163\.com\/photoview\//i,
        /360buy\.com\/product/i
    ];


    //完全禁止使用iframe方式预读,会转而使用xhr方式,兼容性比较好
    rule.disableIframe = [
        /^https?:\/\/\w{3,10}\.google(?:\.\w{1,4}){1,2}\/search/i,
        /image\.youdao\.com/i
    ];
    //通用规则的站点,比如discuz和phpwind的论坛
    rule.specialCommon = [{
        siteName: 'Discuz论坛帖子列表页面',
        url: /^https?:\/\/[^\/]+\/(?:(?:forum)|(?:showforum)|(?:viewforum))/i,
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]'
    }, {
        siteName: 'Discuz论坛帖子内容页面',
        url: /^https?:\/\/[^\/]+\/(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))/i,
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]'
    }, {
        siteName: 'phpWind论坛帖子列表页面',
        url: /^https?:\/\/[^\/]+\/(?:bbs\/)?thread/i,
        preLink: '//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)][@href]'
    }, {
        siteName: 'phpWind论坛帖子内容页面',
        url: /^https?:\/\/[^\/]+\/(?:bbs\/)?read/i,
        preLink: '//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)][@href]'
    }];
    //专用规则的站点
    rule.specialSite = [{
        siteName: "xda",
        url: /forum\.xda-developers\.com\/(showthread|forumdisplay)\.php\?/i,
        nextLink: "//a[@rel='next']",
        preLink: "//a[@rel='prev']"
    }];

    // 下一页链接里的文字
    var next = {};
    var previous = {};
    //链接中的文字
    next.texts = [
        'next',
        'next page',
        'old',
        'older',
        'earlier',
        '下页',
        '下頁',
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
        '后一篇',
        '往后',
        "Next photo",
        '下一页',
        '下1页',
        '下1頁',
        'newer entries',
        ''
    ];
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
        '前一篇',
        '往前',
        'Previous photo',
        '上1页',
        '上1頁',
        'older entries',
        ''
    ];

    //可能会误判的词
    next.continueTexts = [">>", "»"];
    previous.continueTexts = ["<<", "«"];

    //链接或其他标签的属性,比如id,class,title之类使用的
    next.attrValue = /^(next(link)?|linknext|pgdown)$/i;
    previous.attrValue = /^(prev(ious)?(link)?|linkprev(ious)?|pgup)$/i;

    // 翻页文字的前面和后面可能包含的字符,
    next.startRegexp = /(?:^\s*(?:[\(\[『「［【]?)\s*)/;
    next.endRegexp = /(?:\s*([＞>›»]*)|(?:[\)\]』」］】→]?)\s*$)/;

    previous.startRegexp = /(?:^\s*([＜<‹«]*)|(?:[\(\[『「［【←]?)\s*)/;
    previous.endRegexp = /(?:\s*(?:[\)\]』」］】]?)\s*$)/;

    //---------------------------------------------------------------------------------
    var current = null;
    const discuzRegexp = /\/forumdisplay\.php\?fid=\d+/i;
    const emptyRegexp = /^\s$/;
    //---------------------------------------------------------------------------------
    //控制台输出
    function log(str) {
        if (config.isDisableLog) return;
        Components.classes["@mozilla.org/consoleservice;1"]
            .getService(Components.interfaces.nsIConsoleService).logStringMessage(str);

    }

    //检查字符串是否为空
    function isEmpty(str) {
        if (!str) return true;
        if (emptyRegexp.test(str)) return true;
        return false;
    }

    //有些操作,比如事件等,必须用沙箱方式才行
    function getUnsafeWindow(win) {
        win = win || content;
        let sandbox = Components.utils.Sandbox(win);
        sandbox.unsafeWindow = win.wrappedJSObject;
        return sandbox.unsafeWindow;
    }

    //检查站点的地址是否和列表匹配
    function isMatch(e, index, array) {
        return e.test(getCurrentHref(this))
    }

    /**
     * 当前页面/给定窗口的链接
     */
    function getCurrentHref(win) {
        win = win || content;
        return win.document.location.href;
    }

    /**
     *清理临时存储的变量
     */
    function cleanVariable() {
        try {
            current = null;
            next.link = next.found = next.digital = next.win = next.dir = next.searchFrom = null;
            previous.link = previous.found = previous.win = previous.dir = previous.searchFrom = null;

            first.link = first.found = first.win = first.dir = first.searchFrom = null;
            last.link = last.found = last.win = last.dir = last.searchFrom = null;
        } catch (e) {}
    }

    //更新变量
    function updateCurrent(item, window, notFound) {
        current.link = item;
        current.found = !notFound;
        current.win = window;
    }

    function getVersion() {
        var info = Components.classes["@mozilla.org/xre/app-info;1"]
            .getService(Components.interfaces.nsIXULAppInfo);
        return parseInt(info.version.substr(0, 3) * 10, 10) / 10;
    }

    //-----------------------------------------------------------------------------------

    /**
     * 检查特殊链接
     */
    function checkDefinedNext(win, searchSub) {
        win = win || content;
        let doc = win.document;
        //明确的地址
        let search = function(array) {
            for (let i = 0; i < array.length; i++) {
                if (doc.location.href.match(array[i].url)) {
                    let xpath = array[i][current.dir];
                    //字符串且是翻页
                    if (typeof(xpath) == "function" && searchSub) {
                        cleanVariable();
                        xpath();
                        return -1;
                    } else {
                        //如果不存在规则,返回
                        if (!xpath || emptyRegexp.test(xpath)) return 0;
                        let link;
                        try {
                            link = doc.evaluate(xpath, doc, null, 9, null).singleNodeValue;
                            //没有匹配的结果,返回

                            if (!link) return array[i]["disableSearch"] ? -1 : 0;
                        } catch (e) {
                            return 0;
                        }
                        current.link = link;
                        current.found = true;
                        current.win = win;
                        return 1;
                    }
                }
            }
        };
        if (search(rule.specialSite) || search(rule.specialCommon)) return 1;
        //对子窗口应用特殊规则
        if (searchSub) {
            let f = win.frames;
            for (let i = 0; i < f.length; i++) {
                let c = checkDefinedNext(f[i]);
                if (c == 1 || c == -1) return c;
            }
        }
    }

    function checkNext(window) {
        window = window || content;
        //检查连接
        checkLinks(window);
        if (current.found) return;
        //检查按钮
        checkTags(window, "INPUT")
        //检查图片
        if (current.found) return;
        if (config.searchImg)
            checkTags(window, "IMG")
    }

    /**
     * 检查图片元素,和其他的元素
     * @param window
     * @param tag
     *
     */
    function checkTags(window, tag) {
        let items = window.document.getElementsByTagName(tag);
        let item, text;
        for (let i = 0; i < items.length; i++) {

            item = items[i];
            if (!isEffective(item)) continue;

            if (tag == "INPUT") {
                //按钮的话,检查value属性
                text = item.value;
            } else if (tag == "IMG")
            //图片的话,就检查alt和title属性
                text = item.alt || item.title;
            else
            //其他标签,就检查内容
                text = item.innerHTML;

            if (current.fullRegExp.test(text)) {
                if (RegExp.$1 == "" && RegExp.$2 == "") continue;
                if (current.continueTexts.indexOf(RegExp.$2) == -1) {
                    updateCurrent(item, window);
                    return;
                } else if (!isTempFound) {
                    isTempFound = true;
                    updateCurrent(item, window, true);
                }
            }
        }
    }

    /**
     *
     */
    function checkLinks(window) {
        let items = window.document.getElementsByTagName('A');
        let item, text, value;
        let isTempFound = 0;
        for (let i = 0; i < items.length; i++) {
            item = items[i];
            if (!isEffective(item, window)) continue;

            //textContent 加了title会不会有问题?
            text = item.textContent || item.title;
            //inner img
            if (isEmpty(text)) {
                let imgs = item.children;

                for (let i = 0; i < imgs.length; i++) {
                    if (imgs[i].nodeName != "IMG") continue;
                    text = imgs[i].title || imgs[i].alt;
                    if (!isEmpty(text)) break;
                }
            }
            if (isEmpty(text)) continue;
            if (num.isDigital(text) && (isTempFound < 2) && (current.dir == "nextLink" || current.dir == "preLink")) {
                //可能会误判,所以继续检测
                let linkNumber = parseInt(RegExp.$1);
                let type = (current.dir == "nextLink") ? -1 : 1;
                let node = num.getPageNode(item, linkNumber, type, window.document);
                if (node) {
                    isTempFound = 2;
                    //检测出来结果之后,并不结束,继续检查其他的连接,如果在没有其他的结果,才使用现在的这个
                    updateCurrent(item, window, true);
                }
            } else {
                if (current.fullRegExp.test(text)) {
                    if (RegExp.$1 == "" && RegExp.$2 == "") continue;
                    //可能的误判问题,$1可以得到实际匹配的结果
                    log("regexp is:" + RegExp.$1);
                    if (current.continueTexts.indexOf(RegExp.$2) == -1) {
                        updateCurrent(item, window);
                        return;
                    } else if (isTempFound == 0) {
                        isTempFound = 1;
                        updateCurrent(item, window, true);
                    }
                    //这里似乎还是有问题啊,只能保存一次,不过获取到两次以上可能出错结果的情况应该不会太多吧
                }
            }
        }
        //将之前记录的通过翻页计算的结果作为最终的结果
        if (!current.found && isTempFound) {
            current.found = true;
            return;
        }

    }

    /**
     * 判断元素是否是有效的,比如隐藏的,就被认为是无效的
     * @param e
     */
    function isEffective(e, win) {
        //localname在3.5和之后的版本中是不一致的,为了避免这个问题,使用nodeName

        if (e.nodeName == "A") {
            //如果不是当前域,跳过
            // if (e.hostname != win.location.hostname)
            if (/^https?:/i.test(e.href) && e.hostname.indexOf(win.document.domain) === -1)
                return false;
            //有这个必要吗
            if (e.href && !/^\s*$|^https?:|^javascript:|^file:/i.test(e.href))
                return false;
            // 跳过不起作用的链接
            if (!e.offsetParent || e.offsetWidth == 0 || e.offsetHeight == 0 || (!e.hasAttribute("href") && !e.hasAttribute("onclick")))
                return false;
            // 跳过日历
            if (/(?:^|\s)(?:monthlink|weekday|day|day[\-_]\S+)(?:\s|$)/i.test(e.className))
                return false;
            return true;
        } else if (e.nodeName == "IMG") {
            //todo 对图像的初步的排查
            return true;
        } else if (e.nodeName == "INPUT") {
            if (e.disabled) return false;
            if (e.type != "button" && e.type != "submit") return false;
            return true;
            //有的事件是通过addeventlistner添加的,所以这个应该取消掉
            //if(!e.onclick)return false;
        } else {
            //暂时没有用到
            try {
                return e.style.display != "none";
            } catch (e) {
                return false;
            }
        }
    }


    function checkNextInIframe(frame) {
        if (frame) {
            log("check special frame")
            checkNext(frame);
        } else {
            log("check all frames")
            let f = content.frames;

            for (let i = 0; i < f.length; i++) {
                checkNext(f[i])
                if (current.found) {
                    return;
                }
            }
        }
    }

    var num = new function() {
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
            function getNextLink(node, number, aSet) {
                var tNode = getSiblingNode(node, 1);
                if (tNode && tNode.nodeName == "A" && this.isDigital(tNode.textContent)) {
                    if (RegExp.$1 == number) {
                        // 找到纯数字链接
                        if (aSet) {
                            next.link = tNode;
                            next.found = true;
                        }
                        return tNode;
                    }
                }
                return null;
            }

            this.isDigital = function(str, t) {
                str = str.replace(/^\s+|\s+$/g, "");
                if (t == -1)
                    str = str.split(/\s+/).pop();
                else if (t == 1)
                    str = str.split(/\s+/)[0];
                return (/^(\d+)$/.test(str)) ||
                    (/^\[\s?(\d+)\s?\]$/.test(str)) ||
                    (/^【\s?(\d+)\s?】$/.test(str)) ||
                    (/^［\s?(\d+)\s?］$/.test(str)) ||
                    (/^<\s?(\d+)\s?>$/.test(str)) ||
                    (/^＜\s?(\d+)\s?＞$/.test(str)) ||
                    (/^『\s?(\d+)\s?』$/.test(str)) ||
                    (/^「\s?(\d+)\s?」$/.test(str)) ||
                    (/^第\s?(\d+)\s?页$/.test(str));
            }

            // 判断是否是当前页面的数字，type:-1,0,1 分别是要判别的上一个、当前、下一个节点
            this.getPageNode = function(node, linkNum, type, doc) {
                var tNode;
                if (type == 0) {
                    tNode = getSiblingNode(node, 1) || getSiblingNode(node, -1);
                    if (!tNode) return null;
                    if (!node.hasAttribute("onclick") && node.href != tNode.href &&
                        (!node.hasAttribute("href") && this.isDigital(node.textContent, type) ||
                            !(/\/#[^\/]+$/.test(node.href)) && node.href == doc.location.href && this.isDigital(node.textContent, type))) {
                        if (linkNum > 0 && RegExp.$1 == linkNum) return node;
                    }
                    // 某些论坛处在第一页时，实际链接和当前页链接不符，只有和其余纯数字链接的结构或颜色不同时，
                    // 才使用纯数字的“2”作为“下一页”的链接。
                    else if (!next.digital && (/^\s*[\[［【]?1[\]］】]?\s*$/.test(node.textContent))) {
                        var two = getNextLink(node, 2);
                        if (two && difDigital(node, two, doc))
                            next.digital = two;
                    }
                } else {
                    tNode = getSiblingNode(node, type);
                    if (!tNode) return null;
                    if (tNode.nodeName != "A" && this.isDigital(tNode.textContent, type) ||
                        tNode.nodeName == "A" && !tNode.hasAttribute("onclick") && node.href != tNode.href &&
                        (!tNode.hasAttribute("href") && this.isDigital(tNode.textContent, type) ||
                            !(/\/#[^\/]+$/.test(tNode.href)) && tNode.href == doc.location.href && this.isDigital(tNode.textContent, type))) {
                        var n = linkNum + type;
                        if (n > 0 && RegExp.$1 == n) {
                            if (next.digital) next.digital = null;
                            return tNode;

                        }
                    }
                }
                return null;
            }

            function difDigital(node1, node2, doc) {
                if (getStructure(node1) == getStructure(node2) && getStyleColor(node1, doc) == getStyleColor(node2, doc))
                    return false;
                return true;
            }

            function getStructure(aNode) {
                return aNode.innerHTML.replace(/\d+/, "");
            }

            function getStyleColor(aNode, doc) {
                //得到得到的是最终的样式
                return doc.defaultView.getComputedStyle(aNode, null).getPropertyValue("color");
            }
        }
        //-----------------------------------------------------------------------------------
        /**
         * 打开链接
         */

    function openLink() {
        let linkNode = current.link;
        let win = current.win;

        fix4Discuz();
        //add a delay
        /*
        config.key_pressed = true;
        setTimeout(function() {
            config.key_pressed = false;
        }, config.key_freeze);
        */

        if (isGoAsLink()) {
            log("as link")
            //直接打开链接的方式,这种方式之所以优先,是可能会利用到history

            if (loadFromHistory()) {
                return;
            }
            cleanVariable();
            win.document.location.assign(linkNode.href);
        } else {
            log("as click")
            //模拟点击的方式,会比较可靠
            //这个延时是为了防止重复点击的,不过好像没有效果
            //            setTimeout(cleanVariable, 300);
            cleanVariable()
            let e = win.document.createEvent("MouseEvents");
            e.initMouseEvent("click", 1, 1, win, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, linkNode);
            linkNode.dispatchEvent(e);
        }
    }

    function testFunc() {
        let linkNode = current.link;
        let win = current.win;

        console.log('[nextPage.uc.js]', current.dir, linkNode)

        if (current.dir == 'nextLink') {
            linkNode.style.boxShadow = '0 0 2px 2px #FF5555';
        } else {
            linkNode.style.boxShadow = '0 0 2px 2px #5AC900';
        }
    }

    /**
     *  从历史纪录快速加载已经访问过的页面
     */
    function loadFromHistory(isSearchOnly) {
        //todo 怎么得到sessionHistory?
        return false;
        let linkNode = current.link;
        if (config.useHistory) {
            let his = gBrowser.sessionHistory;
            for (let i = 0; i < his.count; i++) {
                let uri = his.getEntryAtIndex(i, true).QueryInterface(Components.interfaces.nsISHEntry);
                if (uri.URI.spec == linkNode.href || fix4History(uri.URI.spec, linkNode.href)) {
                    log("load from history")
                    if (!isSearchOnly) {
                        gBrowser.gotoIndex(i);
                    }
                    //清理临时变量
                    cleanVariable();
                    return true;
                }
            }
        }
        return false;
    }

    //调整一些url的匹配,去掉一些随机的参数之类的,能够更好的利用到历史记录
    function fix4History(href1, href2) {
        //google 搜索修正,因为会加入随机的参数,导致无法使用history
        if (/www\.google\.com(\.hk|\.cn)?\/search\?/i.test(href2)) {
            //这两个都是随机的的值,每次搜索都是不一样的结果
            let h1 = href1.replace(/&ei=\w*&|&hs=\w*&/ig, "&");
            let h2 = href2.replace(/&ei=\w*&|&hs=\w*&/ig, "&");
            if (h1 == h2)
                return true;
            //
        }

        return false;
    }

    /**
     * 判断是否按照普通链接的方式来执行,返回false的话就使用模拟点击的方式处理
     */
    function isGoAsLink() {
        let linkNode = current.link;
        if (linkNode.nodeName != "A") return false;
        let href = linkNode.getAttribute("href");
        let referrer = getCurrentHref(current.win)
            //强制使用模拟点击的
        if (rule.forceClick.some(isMatch, current.win))
            return false;

        //href属性不存在或者无效的情况
        if (!href) return false;
        if (emptyRegexp.test(href)) return false;
        //包括javascript处理
        if (linkNode.hasAttribute("onclick")) return false;
        //todo 这里似乎是有问题的
        //                if (href.indexOf("javascript:void(0)") == 0)return false;
        if (href.indexOf("javascript:") == 0) return false;
        //如果链接于当前页面地址相同,必定是有js的处理,当然,也可能就是当前页面
        if (referrer && href == referrer) return false;
        if (href == "#") return false;
        if (!linkNode.target || /^\s*$|^_?(blank|self)$/.test(linkNode.target)) {
            //链接在当前窗口
        } else if (/^_?(parent|top)$/.test(linkNode.target)) {
            //寻找到目标窗口
            current.win = current.win[RegExp.$1];
        }
        //再找不到就是自定的窗口了,这个就不必处理,改为使用模拟点击的方式
        else {
            //当然,可以再找到目标窗口,不过这样做没有什么必要,因为不是top窗口,也无法利用到历史记录的
            return false;
        }
        return true;
    }

    /**
     *     修改页面,保证在使用方向键的时候,discuz页面的正常
     */
    function fix4Discuz(win) {
        win = win || content;
        if (config.isFix4Discuz && getCurrentHref(win).match(discuzRegexp)) {
            getUnsafeWindow(win).document.onkeyup = null;
        }
    }


    this.next = function(direction) {
        //if (config.key_pressed)return;

        current = direction ? next : previous;
        current.dir = direction ? "nextLink" : "preLink";

        excuter = this.debug ? testFunc : openLink;
        //检查特殊窗口
        let c = checkDefinedNext(undefined, true);
        if (c == 1) {
            excuter();
            return;
        } else if (c == -1) return;

        if (!current.found) {
            checkNext();
        }

        if (current.found) {
            excuter();
        } else {
            //todo 检查iframe的部分
            checkNextInIframe();
            if (current.found) {
                excuter();
            } else {
                alert('没有找到 ' + current.dir)
            }
        }
        //todo

    }

    this.init = function() {
        let combine = function(next) {
            let texts = next.texts;
            next.fullRegExp = new RegExp(next.startRegexp.toString().slice(1, -1) + "(" + texts.join("|") + ")" + next.endRegexp.toString().slice(1, -1), 'i');
        }
        combine(next);
        combine(previous);
    }
}

nextPage.init();