
/**
 * AutoPager
 */
function AutoPager(SSS, floatWO, cplink, nextlink) {
	var nullFn = function() {},
		C = console;

	var remove = [];  // 需要移除的事件

	this.init.apply(this, arguments);

	this.cplink = cplink;
	this.nextlink = nextlink;

    //获取插入位置节点.
    var insertPoint,
    	insertMode,
    	pageElement = getAllElements(SSS.a_pageElement);

    if (SSS.a_HT_insert) {
        insertPoint = getElement(SSS.a_HT_insert[0]);
        insertMode = SSS.a_HT_insert[1];
    } else {
        if (pageElement.length > 0) {
            var pELast = pageElement[pageElement.length - 1];
            insertPoint = pELast.nextSibling ? pELast.nextSibling : pELast.parentNode.appendChild(document.createTextNode(' '));
        }
    }

    if (insertPoint) {
        debug('验证是否能找到插入位置节点:成功,', insertPoint);
    } else {
        C.error('验证是否能找到插入位置节点:失败', (SSS.a_HT_insert ? SSS.a_HT_insert[0] : ''), 'JS执行终止');
        floatWO.updateColor('Astop');
        return;
    }

    if (pageElement.length > 0) {
        debug('验证是否能找到主要元素:成功,', pageElement);
    } else {
        C.error('验证是否能找到主要元素:失败,', SSS.a_pageElement, 'JS执行终止');
        floatWO.updateColor('Astop');
        return;
    }

    if (SSS.a_stylish) {  // 插入自定义样式
        GM_addStyle(SSS.a_stylish, 'Super_preloader-custom-style');
    }

    var insertPointP;
    if (insertMode != 2) {
        insertPointP = insertPoint.parentNode;
    }

    var addIntoDoc;
    if (insertMode == 2) {
        addIntoDoc = function(obj) {
            return insertPoint.appendChild(obj);
        };
    } else {
        addIntoDoc = function(obj) {
            return insertPointP.insertBefore(obj, insertPoint);
        };
    }

    var doc, win;

    function XHRLoaded(req) {
        var str = req.responseText;
        doc = win = createDocumentByString(str);

        if (!doc) {
            C.error('文档对象创建失败');
            removeL();
            return;
        }
        floatWO.updateColor('autopager');
        floatWO.CmodeIcon('hide');
        floatWO.loadedIcon('show');
        working = false;
        scroll();
    }

    function removeL(isRemoveAddPage) {
        debug('移除各种事件监听');
        floatWO.updateColor('Astop');
        var _remove = remove;
        for (var i = 0, ii = _remove.length; i < ii; i++) {
            _remove[i]();
        }

        if (isRemoveAddPage) {
            var separator = document.querySelector('.sp-separator');
            if (separator) {
                var insertBefore = insertPoint;
                if (insertMode == 2) {
                    var l = insertPoint.children.length;
                    if (l > 0) {
                        insertBefore = insertPoint.children[l - 1];
                    }
                }

                var range = document.createRange();
                range.setStartBefore(separator);
                range.setEndBefore(insertBefore);
                range.deleteContents();
                range.detach();

                if (insertMode == 2) {  // 还需要额外移除？
                    insertPoint.removeChild(insertBefore);
                }
            }
            var style = document.getElementById("Super_preloader-style");
            if (style)
                style.parentNode.removeChild(style);
        }
    }
    if (isHashchangeSite && !hashchangeAdded) {
        window.addEventListener("hashchange", onhashChange, false);
        hashchangeAdded = true;
        debug('成功添加 hashchange 事件');
    }

    function onhashChange(event) {
        debug("触发 Hashchang 事件");
        removeL(true);

        setTimeout(function(){
            nextlink = getElement(SSS.nextLink || 'auto;');
            nextlink = getFullHref(nextlink);
            // preLink = getElement(SSS.preLink || 'auto;');
            autopager(SSS, floatWO);
        }, hashchangeTimer);
    }

    var iframe;
    var messageR;

    function iframeLoaded() {
        var iframe = this;
        //alert(this.contentDocument.body)
        var body = iframe.contentDocument.body;
        if (body && body.firstChild) {
            setTimeout(function() {
                doc = iframe.contentDocument;
                removeScripts(doc);
                win = iframe.contentWindow || doc;
                floatWO.updateColor('autopager');
                floatWO.CmodeIcon('hide');
                floatWO.loadedIcon('show');
                working = false;

                scroll();
            }, SSS.a_itimeout);
        }
    }

    function iframeRquest(link) {
        messageR = false;
        if (SSS.a_newIframe || !iframe) {
            var i = document.createElement('iframe');
            iframe = i;
            i.name = 'superpreloader-iframe';
            i.width = '100%';
            i.height = '0';
            i.frameBorder = "0";
            i.style.cssText = '\
                margin:0!important;\
                padding:0!important;\
                visibility:hidden!important;\
            ';
            i.src = link;
            if (SSS.a_iloaded) {
                i.addEventListener('load', iframeLoaded, false);
                remove.push(function() {
                    i.removeEventListener('load', iframeLoaded, false);
                });
            } else {
                var messagehandler = function (e) {
                    if (!messageR && e.data == 'superpreloader-iframe:DOMLoaded') {
                        messageR = true;
                        iframeLoaded.call(i);
                        if (SSS.a_newIframe) {
                            window.removeEventListener('message', messagehandler, false);
                        }
                    }
                };
                window.addEventListener('message', messagehandler, false);
                remove.push(function() {
                    window.removeEventListener('message', messagehandler, false);
                });
            }
            document.body.appendChild(i);
        } else {
            iframe.src = link;
            iframe.contentDocument.location.replace(link);
        }
    }

    var working;

    function doRequest() {
        working = true;
        floatWO.updateColor('loading');
        floatWO.CmodeIcon('show');

        debug('获取下一页' + (SSS.a_useiframe ? '(iframe方式)': ''), nextlink);
        if (SSS.a_useiframe) {
            iframeRquest(nextlink);
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: nextlink,
                overrideMimeType: 'text/html; charset=' + document.characterSet,
                onload: XHRLoaded
            });
        }
    }

    var ipagesmode = SSS.a_ipages[0];
    var ipagesnumber = SSS.a_ipages[1];
    var scrollDo = nullFn;
    var afterInsertDo = nullFn;
    if (prefs.Aplus) {
        afterInsertDo = doRequest;
        doRequest();
    } else {
        scrollDo = doRequest;
        if (ipagesmode) doRequest();
    }

    var manualDiv;

    function manualAdiv() {
        if (!manualDiv) {
            GM_addStyle('\
                #sp-sp-manualdiv{\
                    line-height:1.6!important;\
                    opacity:1!important;\
                    position:relative!important;\
                    float:none!important;\
                    top:0!important;\
                    left:0!important;\
                    z-index: 1000!important;\
                    min-width:366px!important;\
                    width:auto!important;\
                    text-align:center!important;\
                    font-size:14px!important;\
                    padding:3px 0!important;\
                    margin:5px 10px 8px;\
                    clear:both!important;\
                    border-top:1px solid #ccc!important;\
                    border-bottom:1px solid #ccc!important;\
                    -moz-border-radius:30px!important;\
                    border-radius:30px!important;\
                    background-color:#F5F5F5!important;\
                    -moz-box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
                    -webkit-box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
                    box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
                }\
                .sp-sp-md-span{\
                    font-weight:bold!important;\
                    margin:0 5px!important;\
                }\
                #sp-sp-md-number{\
                    width:50px!important;\
                    vertical-align:middle!important;\
                    display:inline-block!important;\
                    text-align:left!important;\
                }\
                #sp-sp-md-imgnext{\
                    padding:0!important;\
                    margin:0 0 0 5px!important;\
                    vertical-align:middle!important;\
                    display:inline-block!important;\
                }\
                #sp-sp-manualdiv:hover{\
                    cursor:pointer;\
                }\
                #sp-sp-md-someinfo{\
                    position:absolute!important;\
                    right:16px!important;\
                    bottom:1px!important;\
                    font-size:10px!important;\
                    text-shadow:white 0 1px 0!important;\
                    color:#5A5A5A!important;\
                    font-style:italic!important;\
                    z-index:-1!important;\
                    background:none!important;\
                }\
            ');

            var div = $C('div', { id: 'sp-sp-manualdiv' });
            manualDiv = div;
            var span = $C('span', { class: 'sp-sp-md-span' }, '下');
            div.appendChild(span);

            var input = $C('input', {
                type: 'number',
                value: 1,
                min: 1,
                title: '输入你想要拼接的页数(必须>=1),然后按回车.',
                id: 'sp-sp-md-number'
            });

            var getInputValue = function () {
                var value = Number(input.value);
                if (isNaN(value) || value < 1) {
                    value = 1;
                    input.value = 1;
                }
                return value;
            };

            var spage = function () {
                if (doc) {
                    var value = getInputValue();
                    //alert(value);
                    ipagesmode = true;
                    ipagesnumber = value + paged;
                    insertedIntoDoc();
                }
            };
            input.addEventListener('keyup', function(e) {
                //alert(e.keyCode);
                if (e.keyCode == 13) { //回车
                    spage();
                }
            }, false);
            div.appendChild(input);
            div.appendChild($C('span', { className: 'sp-sp-md-span' }, '页'));
            div.appendChild($C('img', {id: 'sp-sp-md-imgnext', src: _sep_icons.next}));
            div.appendChild($C('span', { id: 'sp-sp-md-someinfo' }, prefs.someValue));
            document.body.appendChild(div);
            div.addEventListener('click', function(e) {
                if (e.target.id == 'sp-sp-md-number') return;
                spage();
            }, false);
        }
        addIntoDoc(manualDiv);
        manualDiv.style.display = 'block';
    }

    function beforeInsertIntoDoc() {
        working = true;
        if (SSS.a_manualA && !ipagesmode) { //显示手动翻页触发条.
            manualAdiv();
        } else { //直接拼接.
            insertedIntoDoc();
        }
    }


    var sepStyle;
    var goNextImg = [false];
    var sNumber = prefs.sepStartN;
    var _sep_icons = sep_icons;
    var curNumber = sNumber;

    function createSep(lastUrl, currentUrl, nextUrl) {
        var div = document.createElement('div');
        if (SSS.a_separator) {
            if (!sepStyle) {
                sepStyle = GM_addStyle('\
                    div.sp-separator{\
                        line-height:1.6!important;\
                        opacity:1!important;\
                        position:relative!important;\
                        float:none!important;\
                        top:0!important;\
                        left:0!important;\
                        min-width:366px;\
                        width:auto;\
                        text-align:center!important;\
                        font-size:14px!important;\
                        display:block!important;\
                        padding:3px 0!important;\
                        margin:5px 10px 8px;\
                        clear:both!important;\
                        border-top:1px solid #ccc!important;\
                        border-bottom:1px solid #ccc!important;\
                        -moz-border-radius:30px!important;\
                        border-radius:30px!important;\
                        background-color:#F5F5F5!important;\
                        -moz-box-shadow:inset 0 16px 20px #fff,0 2px 3px rgba(0,0,0,0.1);\
                        -webkit-box-shadow:inset 0 16px 20px #fff,0 2px 3px rgba(0,0,0,0.1);\
                        box-shadow:inset 0 16px 20px #fff,0 2px 3px rgba(0,0,0,0.1);\
                    }\
                    div.sp-separator img{\
                        vertical-align:middle!important;\
                        cursor:pointer!important;\
                        padding:0!important;\
                        margin:0 5px!important;\
                        border:none!important;\
                        display:inline-block!important;\
                        float:none!important;\
                        width: auto;\
                        height: auto;\
                    }\
                    div.sp-separator a.sp-sp-nextlink{\
                        margin:0 20px 0 -6px!important;\
                        display:inline!important;\
                        text-shadow:#fff 0 1px 0!important;\
                        background:none!important;\
                    }\
                    div.sp-separator span.sp-span-someinfo{\
                        position:absolute!important;\
                        right:16px!important;\
                        bottom:1px!important;\
                        font-size:10px!important;\
                        text-shadow:white 0 1px 0!important;\
                        color:#5A5A5A!important;\
                        font-style:italic!important;\
                        z-index:-1!important;\
                        background:none!important;\
                    }\
                ');
            }

            div.className = 'sp-separator';
            div.id = 'sp-separator-' + curNumber;
            div.addEventListener('click', sepHandler, false);

            var pageStr = '第 <span style="color:red!important;">' + curNumber + '</span> 页' +
                    ( SSS.a_separatorReal ? getRalativePageStr(lastUrl, currentUrl, nextUrl) : '');
            div.appendChild($C('a', {
                class: 'sp-sp-nextlink',
                href: currentUrl,
                title: currentUrl
            }, pageStr));

            div.appendChild($C('img', {
                src: _sep_icons.top,
                class: 'sp-sp-gotop',
                alt: '去到顶部',
                title: '去到顶部'
            }));

            div.appendChild($C('img', {
                src: curNumber == sNumber ? _sep_icons.pre_gray : _sep_icons.pre,
                class: 'sp-sp-gopre',
                title: '上滚一页'
            }));

            var i_next = $C('img', {
                src: _sep_icons.next_gray,
                class: 'sp-sp-gonext',
                title: '下滚一页'
            });

            if (goNextImg.length == 2) {
                goNextImg.shift();
            }
            goNextImg.push(i_next);
            div.appendChild(i_next);

            div.appendChild($C('img', {
                src: _sep_icons.bottom,
                class: 'sp-sp-gobottom',
                alt: '去到底部',
                title: '去到底部'
            }));

            div.appendChild($C('span', { class: 'sp-span-someinfo' }, prefs.someValue));
            curNumber += 1;
        } else {
            div.style.cssText = '\
                height:0!important;\
                width:0!important;\
                margin:0!important;\
                padding:0!important;\
                border:none!important;\
                clear:both!important;\
                display:block!important;\
                visibility:hidden!important;\
            ';
        }
        return div;
    }

    var paged = 0;

    function insertedIntoDoc() {
        if (!doc) return;

        if(SSS.a_documentFilter){
            try{
                SSS.a_documentFilter(doc, nextlink);
            }catch(e){
                C.error("执行 documentFilter 错误", e, SSS.a_documentFilter.toString());
            }
        }

        var docTitle = getElementByCSS("title", doc).textContent;

        removeScripts(doc);

        var fragment = document.createDocumentFragment();
        var pageElements = getAllElements(SSS.a_pageElement, false, doc, win);
        var ii = pageElements.length;
        if (ii <= 0) {
            debug('获取下一页的主要内容失败', SSS.a_pageElement);
            removeL();
            return;
        }

        // 提前查找下一页链接，后面再赋值
        var lastUrl = cplink;
        cplink = nextlink;
        var nl = getElement(SSS.nextLink, false, doc, win);
        if (nl) {
            nl = getFullHref(nl);
            if (nl == nextlink) {
                nextlink = null;
            } else {
                nextlink = nl;
            }
        } else {
            nextlink = null;
        }

        var i, pe_x, pe_x_nn;
        for (i = 0; i < ii; i++) {
            pe_x = pageElements[i];
            pe_x_nn = pe_x.nodeName;
            if (pe_x_nn == 'BODY' || pe_x_nn == 'HTML' || pe_x_nn == 'SCRIPT') continue;
            fragment.appendChild(pe_x);
        }

        if (SSS.filter && typeof(SSS.filter) == 'string') { //功能未完善.
            //alert(SSS.filter);
            var nodes = [];
            try {
                nodes = getAllElements(SSS.filter, fragment);
            } catch (e) {}
            var nodes_x;
            for (i = nodes.length - 1; i >= 0; i--) {
                nodes_x = nodes[i];
                nodes_x.parentNode.removeChild(nodes_x);
            }
        }

        // lazyImgSrc
        if (SSS.lazyImgSrc) {
            handleLazyImgSrc(SSS.lazyImgSrc, fragment);
        }

        var imgs;
        if (!window.opera && SSS.a_useiframe && !SSS.a_iloaded) {
            imgs = getAllElements('css;img[src]', fragment); //收集所有图片
        }

        // 处理下一页内容部分链接是否新标签页打开
        if (prefs.forceTargetWindow) {
        	var arr = Array.prototype.slice.call(fragment.querySelectorAll('a[href]:not([href^="mailto:"]):not([href^="javascript:"]):not([href^="#"])'));
        	arr.forEach(function (elem){
        	    elem.setAttribute('target', '_blank');
        	    if (elem.getAttribute('onclick') == 'atarget(this)') {  // 卡饭论坛的控制是否在新标签页打开
        	    	elem.removeAttribute('onclick');
        	    }
        	});
        }

        var sepdiv = createSep(lastUrl, cplink, nextlink);
        if (pageElements[0] && pageElements[0].tagName == 'TR') {
            var insertParent = insertPoint.parentNode;
            var colNodes = getAllElements('child::tr[1]/child::*[self::td or self::th]', insertParent);
            var colums = 0;
            for (var x = 0, l = colNodes.length; x < l; x++) {
                var col = colNodes[x].getAttribute('colspan');
                colums += parseInt(col, 10) || 1;
            }
            var td = doc.createElement('td');
            td.appendChild(sepdiv);
            var tr = doc.createElement('tr');
            td.setAttribute('colspan', colums);
            tr.appendChild(td);
            fragment.insertBefore(tr, fragment.firstChild);
        } else {
            fragment.insertBefore(sepdiv, fragment.firstChild);
        }

        addIntoDoc(fragment);

        // filter
        if (SSS.filter && typeof(SSS.filter) == 'function') {
            try{
                SSS.filter(pageElements);
                debug("执行 filter(pages) 成功");
            }catch(e){
                C.error("执行 filter(pages) 错误", e, SSS.filter.toString());
            }
        }

        if (imgs) { //非opera,在iframeDOM取出数据时需要重载图片.
            setTimeout(function() {
                var _imgs = imgs;
                var i, ii, img;
                for (i = 0, ii = _imgs.length; i < ii; i++) {
                    img = _imgs[i];
                    var src = img.src;
                    img.src = src;
                }
            }, 99);
        }

        if (SSS.a_replaceE) {
            var oldE = getAllElements(SSS.a_replaceE);
            var oldE_lt = oldE.length;
            //alert(oldE_lt);
            if (oldE_lt > 0) {
                var newE = getAllElements(SSS.a_replaceE, false, doc, win);
                var newE_lt = newE.length;
                //alert(newE_lt);
                if (newE_lt == oldE_lt) {  // 替换
                    var oldE_x, newE_x;
                    for (i = 0; i < newE_lt; i++) {
                        oldE_x = oldE[i];
                        newE_x = newE[i];
                        newE_x = doc.importNode(newE_x, true);
                        oldE_x.parentNode.replaceChild(newE_x, oldE_x);
                    }
                }
            }
        }

        paged += 1;
        if (ipagesmode && paged >= ipagesnumber) {
            ipagesmode = false;
        }
        floatWO.loadedIcon('hide');
        if (manualDiv) {
            manualDiv.style.display = 'none';
        }
        if (goNextImg[0]) goNextImg[0].src = _sep_icons.next;


        var ev = document.createEvent('Event');
        ev.initEvent('Super_preloaderPageLoaded', true, false);
        document.dispatchEvent(ev);

        if(prefs.enableHistory){
            try {
                window.history.pushState(null, docTitle, cplink);
            } catch(e) {}
        }

        if (paged >= SSS.a_maxpage) {
            debug('到达所设定的最大翻页数', SSS.a_maxpage);
            notice('<b>状态</b>:' + '到达所设定的最大翻页数:<b style="color:red">' + SSS.a_maxpage + '</b>');
            removeL();
            return;
        }
        var delayiframe = function(fn) {
            setTimeout(fn, 199);
        };
        if (nextlink) {
            // debug('找到下一页链接:', nextlink);
            doc = win = null;
            if (ipagesmode) {
                if (SSS.a_useiframe) { //延时点,firefox,太急会卡-_-!
                    delayiframe(doRequest);
                } else {
                    doRequest();
                }
            } else {
                working = false;
                if (SSS.a_useiframe) {
                    delayiframe(afterInsertDo);
                } else {
                    afterInsertDo();
                }
            }
        } else {
            debug('没有找到下一页链接', SSS.nextLink);
            removeL();
            return;
        }
    }

    //返回,剩余高度是总高度的比值.
    var relatedObj_0, relatedObj_1;
    if (SSS.a_relatedObj) {
        if (Array.isArray(SSS.a_relatedObj)) {
            relatedObj_0 = SSS.a_relatedObj[0];
            relatedObj_1 = SSS.a_relatedObj[1];
        } else {
            relatedObj_0 = SSS.a_pageElement;
            relatedObj_1 = 'bottom';
        }
    }

    function getRemain() {
        var scrolly = window.scrollY;
        var WI = window.innerHeight;
        var obj = relatedObj_0 &&getLastElement(relatedObj_0);
        var scrollH = (obj && obj.nodeType == 1) ? (obj.getBoundingClientRect()[relatedObj_1] + scrolly) : Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        return (scrollH - scrolly - WI) / WI; //剩余高度于页面总高度的比例.
    }

    var pause = false;
    if (prefs.pauseA) {
        var Sbutton = ['target', 'shiftKey', 'ctrlKey', 'altKey'];
        var ltype = prefs.mouseA ? 'mousedown' : 'dblclick';
        var button_1 = Sbutton[prefs.Pbutton[0]];
        var button_2 = Sbutton[prefs.Pbutton[1]];
        var button_3 = Sbutton[prefs.Pbutton[2]];

        var pauseIt = function () {
            pause = !pause;
            if (prefs.stop_ipage) ipagesmode = false;
            if (pause) {
                floatWO.updateColor('Apause');
                notice('<b>状态</b>:' + '自动翻页<span style="color:red!important;"><b>暂停</b></span>.');
            } else {
                floatWO.updateColor('autopager');
                floatWO.CmodeIcon('hide');
                notice('<b>状态</b>:' + '自动翻页<span style="color:red!important;"><b>启用</b></span>.');
            }
            scroll();
        };
        var Sctimeout;

        var clearPause = function () {
            clearTimeout(Sctimeout);
            document.removeEventListener('mouseup', arguments.callee, false);
        };

        var pausehandler = function (e) {
            if (!SSS.a_manualA || ipagesmode || pause) {
                if (e[button_1] && e[button_2] && e[button_3]) {
                    if (e.type == 'mousedown') {
                        document.addEventListener('mouseup', clearPause, false);
                        Sctimeout = setTimeout(pauseIt, prefs.Atimeout);
                    } else {
                        pauseIt();
                    }
                }
            }
        };
        document.addEventListener(ltype, pausehandler, false);
        remove.push(function() {
            document.removeEventListener(ltype, pausehandler, false);
        });
    }

    function scroll() {                
        if (!pause && !working && (getRemain() <= SSS.a_remain || ipagesmode)) {
            if (doc) { //有的话,就插入到文档.
                beforeInsertIntoDoc();
            } else { //否则就请求文档.
                scrollDo();
            }
        }
    }

    var timeout;
    function timeoutfn(){
        clearTimeout(timeout);
        timeout = setTimeout(scroll, 100);
    }

    window.addEventListener('scroll', timeoutfn, false);
    remove.push(function() {
        window.removeEventListener('scroll', timeoutfn, false);
    });


    this.startipages = function(value) {
        if (value > 0) {
            ipagesmode = true;
            ipagesnumber = value + paged;
            notice('<b>状态</b>:' + '当前已翻页数量:<b>' + paged + '</b>,' + '连续翻页到第<b style="color:red!important;">' + ipagesnumber + '</b>页.');
            if (SSS.a_manualA) insertedIntoDoc();
            scroll();
        }
    };
}

AutoPager.prototype = {
	init: function(SSS, floatWO) {
		this.SSS = SSS;
		this.floatWO = floatWO;

		// 更新悬浮窗的颜色.
		floatWO.updateColor('autopager');
	},
	destroy: function(isRemoveAddPage) {

	},
	addListener: function() {

	},
	removeListener: function() {

	},
	handleEvent: function(event) {

	},
	stateToggle: function() {

	},
	scroll : function() {

	},
	request : function() {

	},
	requestLoad : function(res) {

	},
	addPage : function(htmlDoc, page) {
	},
};

function sp_transition(start, end) {
    var TweenF = sp_transition.TweenF;
    if (!TweenF) {
        TweenF = Tween[TweenM[prefs.s_method]];
        TweenF = TweenF[TweenEase[prefs.s_ease]] || TweenF;
        sp_transition.TweenF = TweenF;
    }
    var frameSpeed = 1000 / prefs.s_FPS;
    var t = 0; //次数,开始
    var b = start; //开始
    var c = end - start; //结束
    var d = Math.ceil(prefs.s_duration / frameSpeed); //次数,结束

    var x = window.scrollX;

    function transition() {
        var y = Math.ceil(TweenF(t, b, c, d));
        //alert(y);
        window.scroll(x, y);
        if (t < d) {
            t++;
            setTimeout(transition, frameSpeed);
        }
    }
    transition();
}

function sepHandler(e) {
    e.stopPropagation();
    var div = this;
    //alert(div);
    var target = e.target;
    //alert(target);

    function getRelativeDiv(which) {
        var id = div.id;
        id = id.replace(/(sp-separator-)(.+)/, function(a, b, c) {
            return b + String((Number(c) + (which == 'pre' ? -1 : 1)));
        });
        //alert(id);
        return (id ? document.getElementById(id) : null);
    }

    function scrollIt(a, b) {
        //a=a!==undefined? a : window.scrollY;
        if (prefs.sepT) {
            sp_transition(a, b);
        } else {
            window.scroll(window.scrollX, b);
        }
    }

    var o_scrollY, divS;

    switch (target.className) {
        case 'sp-sp-gotop':
            scrollIt(window.scrollY, 0);
            break;
        case 'sp-sp-gopre':
            var prediv = getRelativeDiv('pre');
            if (!prediv) return;
            o_scrollY = window.scrollY;
            var preDS = prediv.getBoundingClientRect().top;
            if (prefs.sepP) {
                divS = div.getBoundingClientRect().top;
                preDS = o_scrollY - (divS - preDS);
            } else {
                preDS += o_scrollY - 6;
            }
            scrollIt(o_scrollY, preDS);
            break;
        case 'sp-sp-gonext':
            var nextdiv = getRelativeDiv('next');
            if (!nextdiv) return;
            o_scrollY = window.scrollY;
            var nextDS = nextdiv.getBoundingClientRect().top;
            if (prefs.sepP) {
                divS = div.getBoundingClientRect().top;
                nextDS = o_scrollY + (-divS + nextDS);
            } else {
                nextDS += o_scrollY - 6;
            }
            scrollIt(o_scrollY, nextDS);
            break;
        case 'sp-sp-gobottom':
            scrollIt(window.scrollY, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
            break;
        default:
            break;
    }
}