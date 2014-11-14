//------------------------ libs -----------------

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}

// 自造简化版 underscroe 库，仅 ECMAScript 5
var _ = (function(){

	var ArrayProto = Array.prototype;

	var slice = ArrayProto.slice;

	var nativeIsArray = Array.isArray;

	var _ = function(obj){
		if(obj instanceof _) return obj;
		if(!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	};

	// Return the first value which passes a truth test. Aliased as `detect`.
	_.find = function(obj, iterator, context){
		var result;
		obj.some(function(value, index, array){
			if(iterator.call(context, value, index, array)){
				result = value;
				return true;
			}
		});
		return result;
	};

	return _;
})();


function gmCompatible() {

	GM_addStyle = function(css, id){
		var s = document.createElement('style');
		if (id) {
			s.setAttribute(id, id);
		}
		s.setAttribute('type', 'text/css');
		s.setAttribute('style', 'display: none !important;');
		s.appendChild(document.createTextNode(css));
		return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
	};

	if (typeof unsafeWindow == "undefined") {
		unsafeWindow = window;
	}

	if (typeof GM_getValue != "undefined" && GM_getValue("a", "b") !== undefined) {
		return;
	}

	GM_getValue = function(key, defaultValue) {
		var value = window.localStorage.getItem(key);
		if (value === null) value = defaultValue;
		else if (value == 'true') value = true;
		else if (value == 'false') value = false;
		return value;
	};
	GM_setValue = function(key, value) {
		window.localStorage.setItem(key, value);
	};
	GM_registerMenuCommand = function() {};

	if (typeof GM_xmlhttpRequest == 'undefined') {
		GM_xmlhttpRequest = function(opt) {
			var req = new XMLHttpRequest();
			req.open('GET', opt.url, true);
			req.overrideMimeType(opt.overrideMimeType);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4) {
					if (req.status == 200) {
						opt.onload(req);
					}
					else {
						opt.onerror();
					}
				}
			};
			req.send(null);
		};
	}
}

// By lastDream2013 略加修改，原版只能用于 Firefox
function getRalativePageStr(lastUrl, currentUrl, nextUrl) {
	function getDigital(str) {
		var num = str.replace(/^p/i, '');
		return parseInt(num, 10);
	}

	var getRalativePageNumArray = function (lasturl, url) {
		if (!lasturl || !url) {
			return [0, 0];
		}

		var lasturlarray = lasturl.split(/-|\.|\&|\/|=|#|\?/),
			urlarray = url.split(/-|\.|\&|\/|=|#|\?/),
			url_info,
			lasturl_info;
		// 一些 url_info 为 p1,p2,p3 之类的
		var handleInfo = function(s) {
			if (s) {
				return s.replace(/^p/, '');
			}
			return s;
		};
		while (urlarray.length !== 0) {
			url_info = handleInfo(urlarray.pop());
			lasturl_info = handleInfo(lasturlarray.pop());
			if (url_info != lasturl_info) {
				if (/[0-9]+/.test(url_info) && (url_info == "2" || /[0-9]+/.test(lasturl_info))) {
					return [(parseInt(lasturl_info) || 1), parseInt(url_info)];
		}
			}
		}
		return [0, 0];
	};

	var ralativeOff;

	//论坛和搜索引擎网页显示实际页面信息
	var ralativePageNumarray = [];
	if (nextUrl) {
		ralativePageNumarray = getRalativePageNumArray(currentUrl, nextUrl);
	} else {
		ralativePageNumarray = getRalativePageNumArray(lastUrl, currentUrl);
		ralativeOff = ralativePageNumarray[1] - ralativePageNumarray[0]; //用的上一页的相对信息比较的，要补充差值……
		ralativePageNumarray[1] = ralativePageNumarray[1] + ralativeOff;
		ralativePageNumarray[0] = ralativePageNumarray[0] + ralativeOff;
	}

	// console.log('[获取实际页数] ', '要比较的3个页数：',arguments, '，得到的差值:', ralativePageNumarray);
	if (isNaN(ralativePageNumarray[0]) || isNaN(ralativePageNumarray[1])) {
		return '';
	}

	var realPageSiteMatch = false;
	ralativeOff = ralativePageNumarray[1] - ralativePageNumarray[0];
	//上一页与下一页差值为1，并最大数值不超过10000(一般论坛也不会超过这么多页……)
	if (ralativeOff === 1 && ralativePageNumarray[1] < 10000) {
		realPageSiteMatch = true;
	}

	//上一页与下一页差值不为1，但上一页与下一页差值能被上一页与下一面所整除的，有规律的页面
	if (!realPageSiteMatch && ralativeOff !== 1) {
		if ((ralativePageNumarray[1] % ralativeOff) === 0 && (ralativePageNumarray[0] % ralativeOff) === 0) {
			realPageSiteMatch = true;
		}
	}

	if (!realPageSiteMatch) { //不满足以上条件，再根据地址特征来匹配
		var sitePattern;
		for (var i = 0, length = REALPAGE_SITE_PATTERN.length; i < length; i++) {
			sitePattern = REALPAGE_SITE_PATTERN[i];
			if (currentUrl.toLocaleLowerCase().indexOf(sitePattern) >= 0) {
				realPageSiteMatch = true;
				break;
			}
		}
	}

	var ralativePageStr;
	if (realPageSiteMatch) { //如果匹配就显示实际网页信息
		if (ralativePageNumarray[1] - ralativePageNumarray[0] > 1) { //一般是搜索引擎的第xx - xx项……
			ralativePageStr = ' [ 实际：第 <font color="red">' + ralativePageNumarray[0] + ' - ' + ralativePageNumarray[1] + '</font> 项 ]';
		} else if ((ralativePageNumarray[1] - ralativePageNumarray[0]) === 1) { //一般的翻页数，差值应该是1
			ralativePageStr = ' [ 实际：第 <font color="red">' + ralativePageNumarray[0] + '</font> 页 ]';
		} else if ((ralativePageNumarray[0] === 0 && ralativePageNumarray[1]) === 0) { //找不到的话……
			ralativePageStr = ' [ <font color="red">实际网页结束</font> ]';
		}
	} else {
		ralativePageStr = '';
	}
	return ralativePageStr || '';
}

function handleLazyImgSrc(rule, doc) {
	var imgAttrs = rule.split('|');

	[].forEach.call(doc.querySelectorAll('img'), function(img) {
		var oldSrc = img.src;

		imgAttrs.some(function(attr) {
			var newSrc = img.getAttribute(attr);
			if (newSrc && newSrc != oldSrc) {
				img.setAttribute("src", newSrc);
				img.removeAttribute(attr);
				return true;
			}
		});
	});
}

var noticeDiv;
var noticeDivto;
var noticeDivto2;
function notice(html_txt) {
	if (!noticeDiv) {
		var div = document.createElement('div');
		noticeDiv = div;
		div.style.cssText = '\
			position:fixed!important;\
			z-index:2147483647!important;\
			float:none!important;\
			width:auto!important;\
			height:auto!important;\
			font-size:13px!important;\
			padding:3px 20px 2px 5px!important;\
			background-color:#7f8f9c!important;\
			border:none!important;\
			color:#000!important;\
			text-align:left!important;\
			left:0!important;\
			bottom:0!important;\
			opacity:0;\
			-moz-border-radius:0 6px 0 0!important;\
			border-radius:0 6px 0 0!important;\
			-o-transition:opacity 0.3s ease-in-out;\
			-webkit-transition:opacity 0.3s ease-in-out;\
			-moz-transition:opacity 0.3s ease-in-out;\
		';
		document.body.appendChild(div);
	}
	clearTimeout(noticeDivto);
	clearTimeout(noticeDivto2);
	noticeDiv.innerHTML = html_txt;
	noticeDiv.style.display = 'block';
	noticeDiv.style.opacity = '0.96';
	noticeDivto2 = setTimeout(function() {
		noticeDiv.style.opacity = '0';
	}, 1666);
	noticeDivto = setTimeout(function() {
		noticeDiv.style.display = 'none';
	}, 2000);
}


function $C(type, atArr, inner, action, listen) {
	var e = document.createElement(type);
	for (var at in atArr) {
		if (atArr.hasOwnProperty(at)) {
			e.setAttribute(at, atArr[at]);
		}
	}
	if (action && listen) {
		e.addEventListener(action, listen, false);
	}
	if (inner) {
		e.innerHTML = inner;
	}
	return e;
}

var docChecked;
function autoGetLink(doc, win) {
	if (!autoMatch.keyMatch) return;
	if (!parseKWRE.done) {
		parseKWRE();
		parseKWRE.done = true;
	}

	var startTime = new Date();
	doc = doc || document;
	win = win || window;

	// if (doc == document) { //当前文档,只检查一次.
	//     //alert(nextlink);
	//     if (docChecked) return nextlink;
	//     docChecked = true;
	// }

	var _prePageKey = prePageKey;
	var _nextPageKey = nextPageKey;
	var _nPKL = nextPageKey.length;
	var _pPKL = prePageKey.length;
	var _getFullHref = getFullHref;
	var _getAllElementsByXpath = getAllElementsByXpath;
	var _Number = Number;

	var _cplink = doc.URL || doc._URL;
	var m = _cplink.match(/https?:\/\/([^\/]+)/);
	if (!m) return;
	var _domain_port = m[1]; //端口和域名,用来验证是否跨域.

	var alllinks = doc.links;
	var alllinksl = alllinks.length;

	var _nextlink;
	var _prelink;
	// if (!autoGetLink.checked) { //第一次检查
	//     _nextlink = nextlink;
	//     _prelink = prelink;
	// } else {
	//     _prelink = true;
	// }

	var DCEnable = autoMatch.digitalCheck;
	var DCRE = /^\s*\D{0,1}(\d+)\D{0,1}\s*$/;

	var i, a, ahref, atext, numtext;
	var aP, initSD, searchD = 1,
		preS1, preS2, searchedD, pSNText, preSS, nodeType;
	var nextS1, nextS2, nSNText, nextSS;
	var aimgs, j, jj, aimg_x, xbreak, k, keytext;

	function finalCheck(a, type) {
		var ahref = a.getAttribute('href'); //在chrome上当是非当前页面文档对象的时候直接用a.href访问,不返回href
		if (ahref == '#') {
			return null;
		}
		ahref = _getFullHref(ahref); //从相对路径获取完全的href;

		//3个条件:http协议链接,非跳到当前页面的链接,非跨域
		if (/^https?:/i.test(ahref) && ahref.replace(/#.*$/, '') != _cplink && ahref.match(/https?:\/\/([^\/]+)/)[1] == _domain_port) {
			if (xbug) {
				debug((type == 'pre' ? '上一页' : '下一页') + '匹配到的关键字为:', atext);
			}
			return a; //返回对象A
			//return ahref;
		}
	}

	if (xbug) {
		debug('全文档链接数量:', alllinksl);
	}

	for (i = 0; i < alllinksl; i++) {
		if (_nextlink && _prelink) break;
		a = alllinks[i];
		if (!a) continue; //undefined跳过
		//links集合返回的本来就是包含href的a元素..所以不用检测
		//if(!a.hasAttribute("href"))continue;
		atext = a.textContent;
		if (atext) {
			if (DCEnable) {
				numtext = atext.match(DCRE);
				if (numtext) { //是不是纯数字
					//debug(numtext);
					numtext = numtext[1];
					//alert(numtext);
					aP = a;
					initSD = 0;

					if (!_nextlink) {
						preS1 = a.previousSibling;
						preS2 = a.previousElementSibling;


						while (!(preS1 || preS2) && initSD < searchD) {
							aP = aP.parentNode;
							if (aP) {
								preS1 = aP.previousSibling;
								preS2 = aP.previousElementSibling;
							}
							initSD++;
							//alert('initSD: '+initSD);
						}
						searchedD = initSD > 0 ? true : false;

						if (preS1 || preS2) {
							pSNText = preS1 ? preS1.textContent.match(DCRE) : '';
							if (pSNText) {
								preSS = preS1;
							} else {
								pSNText = preS2 ? preS2.textContent.match(DCRE) : '';
								preSS = preS2;
							}
							//alert(previousS);
							if (pSNText) {
								pSNText = pSNText[1];
								//debug(pSNText)
								//alert(pSNText)
								if (_Number(pSNText) == _Number(numtext) - 1) {
									//alert(searchedD);
									nodeType = preSS.nodeType;
									//alert(nodeType);
									if (nodeType == 3 || (nodeType == 1 && (searchedD ? _getAllElementsByXpath('./descendant-or-self::a[@href]', preSS, doc).snapshotLength === 0 : (!preSS.hasAttribute('href') || _getFullHref(preSS.getAttribute('href')) == _cplink)))) {
										_nextlink = finalCheck(a, 'next');
										//alert(_nextlink);
									}
									continue;
								}
							}
						}
					}

					if (!_prelink) {
						nextS1 = a.nextSibling;
						nextS2 = a.nextElementSibling;

						while (!(nextS1 || nextS2) && initSD < searchD) {
							aP = aP.parentNode;
							if (aP) {
								nextS1 = a.nextSibling;
								nextS2 = a.nextElementSibling;
							}
							initSD++;
							//alert('initSD: '+initSD);
						}
						searchedD = initSD > 0 ? true : false;

						if (nextS1 || nextS2) {
							nSNText = nextS1 ? nextS1.textContent.match(DCRE) : '';
							if (nSNText) {
								nextSS = nextS1;
							} else {
								nSNText = nextS2 ? nextS2.textContent.match(DCRE) : '';
								nextSS = nextS2;
							}
							//alert(nextS);
							if (nSNText) {
								nSNText = nSNText[1];
								//alert(pSNText)
								if (_Number(nSNText) == _Number(numtext) + 1) {
									//alert(searchedD);
									nodeType = nextSS.nodeType;
									//alert(nodeType);
									if (nodeType == 3 || (nodeType == 1 && (searchedD ? _getAllElementsByXpath('./descendant-or-self::a[@href]', nextSS, doc).snapshotLength === 0 : (!nextSS.hasAttribute("href") || _getFullHref(nextSS.getAttribute('href')) == _cplink)))) {
										_prelink = finalCheck(a, 'pre');
										//alert(_prelink);
									}
								}
							}
						}
					}
					continue;
				}
			}
		} else {
			atext = a.title;
		}
		if (!atext) {
			aimgs = a.getElementsByTagName('img');
			for (j = 0, jj = aimgs.length; j < jj; j++) {
				aimg_x = aimgs[j];
				atext = aimg_x.alt || aimg_x.title;
				if (atext) break;
			}
		}
		if (!atext) continue;
		if (!_nextlink) {
			xbreak = false;
			for (k = 0; k < _nPKL; k++) {
				keytext = _nextPageKey[k];
				if (!(keytext.test(atext))) continue;
				_nextlink = finalCheck(a, 'next');
				xbreak = true;
				break;
			}
			if (xbreak || _nextlink) continue;
		}
		if (!_prelink) {
			for (k = 0; k < _pPKL; k++) {
				keytext = _prePageKey[k];
				if (!(keytext.test(atext))) continue;
				_prelink = finalCheck(a, 'pre');
				break;
			}
		}
	}

	debug('搜索链接数量:', i, '耗时:', new Date() - startTime, '毫秒');

	if (!autoGetLink.checked) { //只在第一次检测的时候,抛出上一页链接.
		prelink = _prelink;
		autoGetLink.checked = true;
	}

	//alert(_nextlink);
	return _nextlink;
}

function parseKWRE() {
	function modifyPageKey(name, pageKey, pageKeyLength) {
		function strMTE(str) {
			return (str.replace(/\\/g, '\\\\')
				.replace(/\+/g, '\\+')
				.replace(/\./g, '\\.')
				.replace(/\?/g, '\\?')
				.replace(/\{/g, '\\{')
				.replace(/\}/g, '\\}')
				.replace(/\[/g, '\\[')
				.replace(/\]/g, '\\]')
				.replace(/\^/g, '\\^')
				.replace(/\$/g, '\\$')
				.replace(/\*/g, '\\*')
				.replace(/\(/g, '\\(')
				.replace(/\)/g, '\\)')
				.replace(/\|/g, '\\|')
				.replace(/\//g, '\\/'));
		}

		var pfwordl = autoMatch.pfwordl,
			sfwordl = autoMatch.sfwordl;

		var RE_enable_a = pfwordl[name].enable,
			RE_maxPrefix = pfwordl[name].maxPrefix,
			RE_character_a = pfwordl[name].character,
			RE_enable_b = sfwordl[name].enable,
			RE_maxSubfix = sfwordl[name].maxSubfix,
			RE_character_b = sfwordl[name].character;
		var plwords,
			slwords,
			rep;

		plwords = RE_maxPrefix > 0 ? ('[' + (RE_enable_a ? strMTE(RE_character_a.join('')) : '.') + ']{0,' + RE_maxPrefix + '}') : '';
		plwords = '^\\s*' + plwords;
		//alert(plwords);
		slwords = RE_maxSubfix > 0 ? ('[' + (RE_enable_b ? strMTE(RE_character_b.join('')) : '.') + ']{0,' + RE_maxSubfix + '}') : '';
		slwords = slwords + '\\s*$';
		//alert(slwords);
		rep = prefs.cases ? '' : 'i';

		for (var i = 0; i < pageKeyLength; i++) {
			pageKey[i] = new RegExp(plwords + strMTE(pageKey[i]) + slwords, rep);
			//alert(pageKey[i]);
		}
		return pageKey;
	}

	//转成正则.
	prePageKey = modifyPageKey('previous', prePageKey, prePageKey.length);
	nextPageKey = modifyPageKey('next', nextPageKey, nextPageKey.length);
}

// 地址栏递增处理函数.
function hrefInc(obj, doc, win) {
	var _cplink = doc.URL || doc._URL;

	function getHref(href) {
		var mFails = obj.mFails;
		if (!mFails) return href;
		var str;
		if (typeof mFails == 'string') {
			str = mFails;
		} else {
			var fx;
			var array = [];
			var i, ii;
			var mValue;
			for (i = 0, ii = mFails.length; i < ii; i++) {
				fx = mFails[i];
				if (!fx) continue;
				if (typeof fx == 'string') {
					array.push(fx);
				} else {
					mValue = href.match(fx);
					if (!mValue) return href;
					array.push(mValue);
				}
			}
			str = array.join('');
		}
		return str;
	}
	// alert(getHref(_cplink))

	var sa = obj.startAfter;
	var saType = typeof sa;
	var index;

	if (saType == 'string') {
		index = _cplink.indexOf(sa);
		if (index == -1) {
			_cplink = getHref(_cplink);
			index = _cplink.indexOf(sa);
			if (index == -1) return;
			//alert(index);
		}
	} else {
		var tsa = _cplink.match(sa);
		//alert(sa);
		if (!tsa) {
			_cplink = getHref(_cplink);
			sa = (_cplink.match(sa) || [])[0];
			if (!sa) return;
			index = _cplink.indexOf(sa);
			if (index == -1) return;
		} else {
			sa = tsa[0];
			index = _cplink.indexOf(sa);
			//alert(index)
			//alert(tsa.index)
		}
	}

	index += sa.length;
	var max = obj.max === undefined ? 9999 : obj.max;
	var min = obj.min === undefined ? 1 : obj.min;
	var aStr = _cplink.slice(0, index);
	var bStr = _cplink.slice(index);
	var nbStr = bStr.replace(/^(\d+)(.*)$/, function(a, b, c) {
		b = Number(b) + obj.inc;
		if (b >= max || b < min) return a;
		return b + c;
	});
	// alert(aStr+nbStr);
	if (nbStr !== bStr) {
		var ilresult;
		try {
			ilresult = obj.isLast(doc, unsafeWindow, _cplink);
		} catch (e) {}
		if (ilresult) return;
		return aStr + nbStr;
	}
}

// 获取单个元素,混合
function getElement(selector, contextNode, doc, win) {
	var ret;
	if (!selector) return ret;
	doc = doc || document;
	win = win || window;
	contextNode = contextNode || doc;
	var type = typeof selector;
	if (type == 'string') {
		if (selector.search(/^css;/i) === 0) {
			ret = getElementByCSS(selector.slice(4), contextNode);
		} else if (selector.toLowerCase() == 'auto;') {
			ret = autoGetLink(doc, win);
		} else {
			ret = getElementByXpath(selector, contextNode, doc);
		}
	} else if (type == 'function') {
		var _cplink = doc.URL || doc._URL;
		ret = selector(doc, win, _cplink);
	} else if (selector instanceof Array) {
		for (var i = 0, l = selector.length; i < l; i++) {
			ret = getElement(selector[i], contextNode, doc, win);
			if (ret) {
				break;
			}
		}
	} else {
		ret = hrefInc(selector, doc, win);
	}
	return ret;
}

// css 获取单个元素
function getElementByCSS(css, contextNode) {
	return (contextNode || document).querySelector(css);
}

// css 获取所有元素
function getAllElementsByCSS(css, contextNode) {
	return (contextNode || document).querySelectorAll(css);
}

// xpath 获取单个元素
function getElementByXpath(xpath, contextNode, doc) {
	doc = doc || document;
	contextNode = contextNode || doc;
	return doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// xpath 获取多个元素.
function getAllElementsByXpath(xpath, contextNode, doc) {
	doc = doc || document;
	contextNode = contextNode || doc;
	return doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// 获取多个元素
function getAllElements(selector, contextNode, doc, win) {
	var ret = [];
	if (!selector) return ret;
	var Eles;
	doc = doc || document;
	win = win || window;
	contextNode = contextNode || doc;
	if (typeof selector == 'string') {
		if (selector.search(/^css;/i) === 0) {
			Eles = getAllElementsByCSS(selector.slice(4), contextNode);
		} else {
			Eles = getAllElementsByXpath(selector, contextNode, doc);
		}
	} else if (Array.isArray(selector)) {
		selector.some(function(s) {
			Eles = getAllElements(s, contextNode, doc, win);
			if (Eles) return true;
		});
	} else {
		Eles = selector(doc, win);
		if (!Eles) return ret;
		if (Eles.nodeType) { //单个元素.
			ret[0] = Eles;
			return ret;
		}
	}

	function unique(array) { //数组去重并且保持数组顺序.
		var i, ca, ca2, j;
		for (i = 0; i < array.length; i++) {
			ca = array[i];
			for (j = i + 1; j < array.length; j++) {
				ca2 = array[j];
				if (ca2 == ca) {
					array.splice(j, 1);
					j--;
				}
			}
		}
		return array;
	}

	function makeArray(x) {
		var ret = [];
		var i, ii;
		var x_x;
		if (x.pop) { //普通的 array
			for (i = 0, ii = x.length; i < ii; i++) {
				x_x = x[i];
				if (x_x) {
					if (x_x.nodeType) { //普通类型,直接放进去.
						ret.push(x_x);
					} else {
						ret = ret.concat(makeArray(x_x)); //嵌套的.
					}
				}
			}
			//alert(ret)
			return unique(ret);
		} else if (x.item) { //nodelist or HTMLcollection
			i = x.length;
			while (i) {
				ret[--i] = x[i];
			}
			/*
			for(i=0,ii=x.length;i<ii;i++){
				ret.push(x[i]);
			};
			*/
			return ret;
		} else if (x.iterateNext) { //XPathResult
			i = x.snapshotLength;
			while (i) {
				ret[--i] = x.snapshotItem(i);
			}
			/*
			for(i=0,ii=x.snapshotLength;i<ii;i++){
				ret.push(x.snapshotItem(i));
			};
			*/
			return ret;
		}
	}

	return makeArray(Eles);
}

// 获取最后一个元素.
function getLastElement(selector, contextNode, doc, win) {
	// 如果 xpath 为 id("plist") 则无法获取到最后一个，只能获取到第一个
	selector = selector.replace(/id\((["'])([^"']+).\)/g, '//*[@id=$1$2$1]');

	var eles = getAllElements(selector, contextNode, doc, win);
	var l = eles.length;
	if (l > 0) {
		return eles[l - 1];
	}
}

function saveValue(key, value) {
	localStorage.setItem(key, encodeURIComponent(value));
}

function getValue(key) {
	var value = localStorage.getItem(key);
	return value ? decodeURIComponent(value) : undefined;
}

function createDocumentByString(str, url) {  // string转为DOM，并加上了 _URL 当前链接属性
	if (!str) {
		C.error('没有找到要转成DOM的字符串');
		return;
	}
	if (document.documentElement.nodeName != 'HTML') {
		return new DOMParser().parseFromString(str, 'application/xhtml+xml');
	}

	var doc;
	try {
		// firefox and chrome 30+，Opera 12 会报错
		doc = new DOMParser().parseFromString(str, 'text/html');
	} catch (ex) {}

	if (doc) {
		doc._URL = url;  // 无法覆盖原来的 URL
		return doc;
	}

	if (document.implementation.createHTMLDocument) {
		doc = document.implementation.createHTMLDocument('superPreloader');
	} else {
		try {
			doc = document.cloneNode(false);
			doc.appendChild(doc.importNode(document.documentElement, false));
			doc.documentElement.appendChild(doc.createElement('head'));
			doc.documentElement.appendChild(doc.createElement('body'));
		} catch (e) {}
	}
	if (!doc) return;
	var range = document.createRange();
	range.selectNodeContents(document.body);
	var fragment = range.createContextualFragment(str);
	doc.body.appendChild(fragment);
	var headChildNames = {
		TITLE: true,
		META: true,
		LINK: true,
		STYLE: true,
		BASE: true
	};
	var child;
	var body = doc.body;
	var bchilds = body.childNodes;
	for (var i = bchilds.length - 1; i >= 0; i--) { //移除head的子元素
		child = bchilds[i];
		if (headChildNames[child.nodeName]) body.removeChild(child);
	}

	doc._URL = url;
	return doc;
}

// 从相对路径的a.href获取完全的href值.
function getFullHref(href) {
	if (typeof href != 'string') href = href.getAttribute('href');
	//alert(href);
	//if(href.search(/^https?:/)==0)return href;//http打头,不一定就是完整的href;
	var a = getFullHref.a;
	if (!a) {
		getFullHref.a = a = document.createElement('a');
	}
	a.href = href;
	//alert(a.href);
	return a.href;
}


function toRE(obj) {
	if (obj instanceof RegExp) {
		return obj;
	} else if (obj instanceof Array) {
		return new RegExp(obj[0], obj[1]);
	} else {
		if (obj.search(/^wildc;/i) === 0) {
			obj = wildcardToRegExpStr(obj.slice(6));
		}
		return new RegExp(obj);
	}
}

function wildcardToRegExpStr(urlstr) {
	if (urlstr.source) return urlstr.source;
	var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
		return str === "*" ? ".*" : "[^/]*";
	});
	return "^" + reg + "$";
}

/* jshint ignore:start */

//动画库
var Tween = {
	Linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	Quad: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOut: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOut: function(t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOut: function(t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t, b, c, d) {
			return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOut: function(t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOut: function(t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t, b, c, d, a, p) {
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOut: function(t, b, c, d, a, p) {
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		},
		easeInOut: function(t, b, c, d, a, p) {
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		}
	},
	Back: {
		easeIn: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOut: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOut: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t, b, c, d) {
			return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
		},
		easeOut: function(t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOut: function(t, b, c, d) {
			if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	}
};

var TweenM = [
	'Linear',
	'Quad',
	'Cubic',
	'Quart',
	'Quint',
	'Sine',
	'Expo',
	'Circ',
	'Elastic',
	'Back',
	'Bounce',
];

var TweenEase = [
	'easeIn',
	'easeOut',
	'easeInOut',
];


// 任何转成字符串，存储，修改过
function xToString(x) {
	function toStr(x) {
		switch (typeof x) {
			case 'undefined':
				return Str(x);
			case 'boolean':
				return Str(x);
			case 'number':
				return Str(x);
			case 'string':
				return ('"' +
					(x.replace(/(?:\r\n|\n|\r|\t|\\|")/g, function(a) {
						var ret;
						switch (a) { //转成字面量
							case '\r\n':
								ret = '\\r\\n';
								break;
							case '\n':
								ret = '\\n';
								break;
							case '\r':
								ret = '\\r';
								break;
							case '\t':
								ret = '\\t';
								break;
							case '\\':
								ret = '\\\\';
								break;
							case '"':
								ret = '\\"';
								break;
							default:
								break;
						}
						return ret;
					})) + '"');
			case 'function':
				var fnStr = Str(x);
				return fnStr.indexOf('native code') == -1 ? fnStr : 'function(){}';
			case 'object':
				//注,object的除了单纯{},其他的对象的属性会造成丢失..
				if (x === null) {
					return Str(x);
				}
				switch (x.constructor.name) {
					case "Object":
						var i;
						var rStr = '';
						for (i in x) {
							if (!x.hasOwnProperty(i)) { //去掉原型链上的属性.
								continue;
							}
							rStr += toStr(i) + ':' + toStr(x[i]) + ',';
						}
						return ('{' + rStr.replace(/,$/i, '') + '}');
					case "Array":
						var i;
						var rStr = '';
						for (i in x) {
							if (!x.hasOwnProperty(i)) { //去掉原型链上的属性.
								continue;
							}
							rStr += toStr(x[i]) + ',';
						}
						return '[' + rStr.replace(/,$/i, '') + ']';
					case "String":
						return toStr(Str(x));
					case "RegExp":
						return Str(x);
					case "Number":
						return Str(x);
					case "Boolean":
						return Str(x);
					default:
						//alert(x.constructor);//漏了什么类型么?
						break;
				}
			default:
				break;
		}
	}
	var Str = String;
	return toStr(x);
}

/* jshint ignore:end */
