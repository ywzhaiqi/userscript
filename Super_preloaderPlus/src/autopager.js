
function Style(doc, id) {
	this.doc = doc;
	this.id = id || 'GM-SP-style';
	this.cssTexts = [];
}
Style.prototype = {
	constructor: Style,

	init: function() {
		var s = this.doc.getElementById(this.id);
		if (!s) {
			s = this.doc.createElement('style');
			s.id = this.id;
			s.innerHTML = this.cssTexts.join('\n');
			this.doc.head.appendChild(s);
		} else {
			s.innerHTML = this.cssTexts.join('\n');
		}
	},
	add: function(css) {
		this.cssTexts.push(css);
	},
	remove: function() {
		var s = this.doc.getElementById(this.id);
		if (s) {
			s.parentNode.removeChild(s);
		}
	}
};


//------------------------ AutoPager -----------------
var autoPO = null;

/**
 * 外部变量: sep_icons
 */
function AutoPager() {
	this.init.apply(this, arguments);
}

AutoPager.prototype = {
	constructor: AutoPager,

	init: function(SSS, floatWO, nextlink) {
		// 设置初始值
		this.SSS = SSS;
		this.floatWO = floatWO;

		this.cplink = document.URL;
		this.pause = false; // 是否暂停
		this.paged = 0;     // 当前已经加载到了第几页
		this.remove = [];   // 需要移除的事件
		this.doc = null;    // 提前获取下一页的 document

		this.nextlink = nextlink || getFullHref(getElement(SSS.nextLink || 'auto;'));
		if (!this.nextlink) {
			floatWO.updateColor('Astop');
			return;
		}

		// 更新悬浮窗的颜色.
		floatWO.updateColor('autopager');

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
				insertPoint = pELast.nextSibling || pELast.parentNode.appendChild(document.createTextNode(' '));
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

		this.addStyle();

		// 变量
		this.insertPoint = insertPoint;
		this.insertMode = insertMode;
		this.pageElement = pageElement;
		this.loadedURLs = {};
		this.loadedURLs[this.cplink] = true;

		this.ipagesmode = SSS.a_ipages[0];
		this.ipagesnumber = SSS.a_ipages[1];
		this.scrollDo = nullFn;
		this.afterInsertDo = nullFn;

		if (prefs.Aplus) {
			this.afterInsertDo = this.doRequest;
			this.doRequest();
		} else {
			this.scrollDo = this.doRequest;
			if (this.ipagesmode) {
				this.doRequest();
			}
		}

		//返回,剩余高度是总高度的比值.
		if (SSS.a_relatedObj) {
			if (Array.isArray(SSS.a_relatedObj)) {
				this.relatedObj_0 = SSS.a_relatedObj[0];
				this.relatedObj_1 = SSS.a_relatedObj[1];
			} else {
				this.relatedObj_0 = SSS.a_pageElement;
				this.relatedObj_1 = 'bottom';
			}
		}

		this.addListener();
	},
	destory: function(isRemoveAddPage) {
		debug('移除各种事件监听');

		this.removeListener();

		if (isRemoveAddPage) {
			// 移除所有插入的分隔条和页面
			var separator = document.querySelector('.sp-separator');
			if (separator) {
				var insertBefore = this.insertPoint;
				if (this.insertMode == 2) {
					var l = this.insertPoint.children.length;
					if (l > 0) {
						insertBefore = this.insertPoint.children[l - 1];
					}
				}

				var range = document.createRange();
				range.setStartBefore(separator);
				range.setEndBefore(insertBefore);
				range.deleteContents();
				// range.detach();

				if (this.insertMode == 2) {  // 还需要额外移除？
					this.insertPoint.removeChild(insertBefore);
				}
			}

			// 移除样式
			if (this.style) {
				this.style.remove();
			}

			['sp-sp-manualdiv', 'superpreloader-iframe'].forEach(function(id) {
				var node = document.getElementById(id);
				if (node) {
					node.parentNode.removeChild(node);
				}
			});
		}
	},
	addListener: function() {
		var self = this;

		var delayScroll = function() {
			if (self.timer) {
				window.clearTimeout(self.timer);
				self.timer = null;
			}
			self.timer = window.setTimeout(function(){
				self.scroll();
				self.timer = null;
			}, 100);
		};

		window.addEventListener('scroll', delayScroll, false);
		this.remove.push(function() {
			window.removeListener('scroll', delayScroll, false);
		});

		// 双击或其它方式暂停
		if (prefs.pauseA) {
			var Sbutton = ['target', 'shiftKey', 'ctrlKey', 'altKey'];
			var ltype = prefs.mouseA ? 'mousedown' : 'dblclick';
			var button_1 = Sbutton[prefs.Pbutton[0]];
			var button_2 = Sbutton[prefs.Pbutton[1]];
			var button_3 = Sbutton[prefs.Pbutton[2]];

			var Sctimeout;

			var clearPause = function () {
				clearTimeout(Sctimeout);
				document.removeEventListener('mouseup', clearPause, false);
			};

			var pausehandler = function (e) {
				if (!self.SSS.a_manualA || self.ipagesmode || self.pause) {
					if (e[button_1] && e[button_2] && e[button_3]) {
						if (e.type == 'mousedown') {
							document.addEventListener('mouseup', clearPause, false);
							Sctimeout = setTimeout(self.pauseIt.bind(self), prefs.Atimeout);
						} else {
							self.pauseIt();
						}
					}
				}
			};
			document.addEventListener(ltype, pausehandler, false);
			this.remove.push(function() {
				document.removeEventListener(ltype, pausehandler, false);
			});
		}
	},
	removeListener: function() {
		var _remove = this.remove;
		for (var i = 0, ii = _remove.length; i < ii; i++) {
			_remove[i]();
		}

		this.floatWO.updateColor('Astop');
	},
	addStyle: function() {  // 插入样式
		this.style = new Style(document, 'sp-ap-style');

		// 自定义样式
		if (this.SSS.a_stylish) {
			this.style.add(this.SSS.a_stylish);
		}

		// 分辨率 高度 > 宽度 的是手机
		if(window.screen.height > window.screen.width){
			this.style.add('div.sp-separator { min-width:auto !important; }');
		}

		// 手动触发条
		if (this.SSS.a_manualA) {
			this.style.add(<%= res.manualDivCSS %>);
		}

		// 分隔条样式
		if (this.SSS.a_separator) {
			this.style.add(<%= res.separatorCSS %>);
		}

		this.style.init();
	},
	scroll: function() {
		if (!this.pause && !this.working && (this.getRemain() <= this.SSS.a_remain || this.ipagesmode)) {
			if (this.doc) { // 有的话,就插入到文档.
				this.beforeInsertIntoDoc();
			} else { // 否则就请求文档.
				this.scrollDo();
			}
		}
	},
	pauseIt: function () {
		this.pause = !this.pause;

		if (prefs.stop_ipage) {
			this.ipagesmode = false;
		}

		if (this.pause) {
			this.floatWO.updateColor('Apause');
			notice('<b>状态</b>:' + '自动翻页<span style="color:red!important;"><b>暂停</b></span>.');
		} else {
			this.floatWO.updateColor('autopager');
			this.floatWO.CmodeIcon('hide');
			notice('<b>状态</b>:' + '自动翻页<span style="color:red!important;"><b>启用</b></span>.');
		}

		this.scroll();
	},
	doRequest: function() {
		if (!this.nextlink || this.loadedURLs[this.nextlink]) return;

		var self = this;

		this.working = true;
		this.floatWO.updateColor('loading');
		this.floatWO.CmodeIcon('show');

		debug('获取下一页' + (this.SSS.a_useiframe ? '(iframe方式)': ''), this.nextlink);
		if (this.SSS.a_useiframe) {
			this.iframeRquest(this.nextlink);
		} else {
			GM_xmlhttpRequest({
				method: "GET",
				url: this.nextlink,
				overrideMimeType: 'text/html; charset=' + document.characterSet,
				onload: function(res) {
					self.XHRLoaded(res);
				},
				onerror: function(){
					debug('GM_xmlhttpRequest Error.');
					self.floatWO.updateColor('Astop');
				},
			});
		}
	},
	XHRLoaded: function (res) {
		var str = res.responseText;
		this.doc = this.win = createDocumentByString(str, this.nextlink);

		if (!this.doc) {
			C.error('文档对象创建失败');
			this.removeListener();
			return;
		}

		this.floatWO.updateColor('autopager');
		this.floatWO.CmodeIcon('hide');
		this.floatWO.loadedIcon('show');
		this.working = false;
		this.scroll();
	},
	iframeRquest: function (link) {
		var self = this,
			SSS = this.SSS;

		var _iframeLoaded = function() {
			self.iframeLoaded.call(self, self.iframe);
		};

		this.messageR = false;
		if (SSS.a_newIframe || !this.iframe) {
			var i = document.createElement('iframe');
			this.iframe = i;
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
				i.addEventListener('load', _iframeLoaded, false);
				self.remove.push(function() {
					i.removeEventListener('load', _iframeLoaded, false);
				});
			} else {
				var messagehandler = function (e) {
					if (!self.messageR && e.data == 'superpreloader-iframe:DOMLoaded') {
						self.messageR = true;
						_iframeLoaded();
						if (SSS.a_newIframe) {
							window.removeEventListener('message', messagehandler, false);
						}
					}
				};
				window.addEventListener('message', messagehandler, false);
				self.remove.push(function() {
					window.removeEventListener('message', messagehandler, false);
				});
			}
			document.body.appendChild(i);
		} else {
			this.iframe.src = link;
			this.iframe.contentDocument.location.replace(link);
		}
	},
	iframeLoaded: function (iframe) {
		var self = this;

		var body = iframe.contentDocument.body;
		if (body && body.firstChild) {
			setTimeout(function() {
				self.doc = iframe.contentDocument;
				self.removeScripts(self.doc);
				self.win = iframe.contentWindow || self.doc;
				self.floatWO.updateColor('autopager');
				self.floatWO.CmodeIcon('hide');
				self.floatWO.loadedIcon('show');
				self.working = false;

				self.scroll();
			}, self.SSS.a_itimeout);
		}
	},
	beforeInsertIntoDoc: function () {
		this.working = true;
		if (this.SSS.a_manualA && !this.ipagesmode) { //显示手动翻页触发条.
			this.manualAdiv();
		} else { //直接拼接.
			this.insertedIntoDoc();
		}
	},
	addIntoDoc: function(obj) {
		if (this.insertMode == 2) {
			return this.insertPoint.appendChild(obj);
		} else {
			return this.insertPoint.parentNode.insertBefore(obj, this.insertPoint);
		}
	},
	manualAdiv: function () {
		var self = this;

		if (!this.manualDiv) {
			this.manualDiv = this.createManualAdiv();
		}

		this.addIntoDoc(this.manualDiv);
		this.manualDiv.style.display = 'block';
	},
	createManualAdiv: function() {
		var div = $C('div', { id: 'sp-sp-manualdiv' });

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
			if (self.doc) {
				var value = getInputValue();
				//alert(value);
				self.ipagesmode = true;
				self.ipagesnumber = value + self.paged;
				self.insertedIntoDoc();
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
		div.appendChild($C('img', {id: 'sp-sp-md-imgnext', src: sep_icons.next}));
		div.appendChild($C('span', { id: 'sp-sp-md-someinfo' }, prefs.someValue));
		div.addEventListener('click', function(e) {
			if (e.target.id == 'sp-sp-md-number') return;
			spage();
		}, false);

		document.body.appendChild(div);

		return div;
	},
	createSep: function (lastUrl, currentUrl, nextUrl) {
		var self = this;
		var sNumber = prefs.sepStartN,
			_sep_icons = sep_icons;

		if (!this.curNumber) {
			this.curNumber = sNumber;
		}

		if (!this.goNextImg) {
			this.goNextImg = [false];
		}

		var div = document.createElement('div');
		if (this.SSS.a_separator) {

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
						self.sp_transition(a, b);
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

			div.className = 'sp-separator';
			div.id = 'sp-separator-' + this.curNumber;
			div.addEventListener('click', sepHandler, false);

			var pageStr = '第 <span style="color:red!important;">' + this.curNumber + '</span> 页' +
					( this.SSS.a_separatorReal ? getRalativePageStr(lastUrl, currentUrl, nextUrl) : '');
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
				src: this.curNumber == sNumber ? _sep_icons.pre_gray : _sep_icons.pre,
				class: 'sp-sp-gopre',
				title: '上滚一页'
			}));

			var i_next = $C('img', {
				src: _sep_icons.next_gray,
				class: 'sp-sp-gonext',
				title: '下滚一页'
			});

			if (this.goNextImg.length == 2) {
				this.goNextImg.shift();
			}
			this.goNextImg.push(i_next);
			div.appendChild(i_next);

			div.appendChild($C('img', {
				src: _sep_icons.bottom,
				class: 'sp-sp-gobottom',
				alt: '去到底部',
				title: '去到底部'
			}));

			div.appendChild($C('span', { class: 'sp-span-someinfo' }, prefs.someValue));
			this.curNumber += 1;
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
	},
	insertedIntoDoc: function() {
		if (!this.doc) return;

		if (this.loadedURLs[this.nextlink]) {
			debug('页面已经存在', this.nextlink);
			this.removeListener();
			return;
		}
		this.loadedURLs[this.nextlink] = true;

		var SSS = this.SSS;

		if (SSS.a_documentFilter) {
			try {
				SSS.a_documentFilter(this.doc, this.nextlink);
			} catch (e) {
				C.error("执行 documentFilter 错误", e);
			}
		}

		var docTitle = (getElementByCSS("title", this.doc) || {} ).textContent;

		this.removeScripts(this.doc);

		var pageElements = getAllElements(SSS.a_pageElement, false, this.doc, this.win);
		var ii = pageElements.length;
		if (ii <= 0) {
			debug('获取下一页的主要内容失败', SSS.a_pageElement);
			this.removeListener();
			return;
		}

		// 提前查找下一页链接，后面再赋值
		var lastUrl = this.cplink;
		this.cplink = this.nextlink;
		var nl = getElement(SSS.nextLink, false, this.doc, this.win);
		if (nl) {
			nl = getFullHref(nl);
			if (nl == this.nextlink) {
				this.nextlink = null;
			} else {
				this.nextlink = nl;
			}
		} else {
			this.nextlink = null;
		}

		var fragment = document.createDocumentFragment();
		var i, pe_x, pe_x_nn;
		for (i = 0; i < ii; i++) {
			pe_x = pageElements[i];
			pe_x_nn = pe_x.nodeName;
			if (pe_x_nn == 'BODY' || pe_x_nn == 'HTML' || pe_x_nn == 'SCRIPT') continue;
			fragment.appendChild(pe_x);
		}

		if (SSS.a_filter && typeof(SSS.a_filter) == 'string') { //功能未完善.
			var nodes = [];
			try {
				nodes = getAllElements(SSS.a_filter, fragment);
			} catch (e) {}

			var nodes_x;
			for (i = nodes.length - 1; i >= 0; i--) {
				nodes_x = nodes[i];
				nodes_x.parentNode.removeChild(nodes_x);
			}
		}

		// lazyImgSrc
		if (SSS.a_lazyImgSrc) {
			handleLazyImgSrc(SSS.a_lazyImgSrc, fragment);
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
				if (elem.getAttribute('onclick') == 'atarget(this)') {  // 卡饭论坛的特殊情况
					elem.removeAttribute('onclick');
				}
			});
		}

		// 分隔条
		var sepdiv = this.createSep(lastUrl, this.cplink, this.nextlink);
		// 判断插入的位置是否为 table
		if (pageElements[0] && pageElements[0].tagName == 'TR') {
			var insertParent = insertPoint.parentNode;
			var colNodes = getAllElements('child::tr[1]/child::*[self::td or self::th]', insertParent);
			var colums = 0;
			for (var x = 0, l = colNodes.length; x < l; x++) {
				var col = colNodes[x].getAttribute('colspan');
				colums += parseInt(col, 10) || 1;
			}
			var td = this.doc.createElement('td');
			td.appendChild(sepdiv);
			var tr = this.doc.createElement('tr');
			td.setAttribute('colspan', colums);
			tr.appendChild(td);
			fragment.insertBefore(tr, fragment.firstChild);
		} else {
			fragment.insertBefore(sepdiv, fragment.firstChild);
		}

		this.addIntoDoc(fragment);

		// filter
		if (SSS.a_filter && typeof(SSS.a_filter) == 'function') {
			try{
				SSS.a_filter(pageElements);
				debug("执行 filter(pages) 函数成功");
			}catch(e){
				C.error("执行 filter(pages) 函数错误", e, SSS.a_filter.toString());
			}
		}

		if (imgs) { //非opera,在iframeDOM取出数据时需要重载图片.
			setTimeout(function() {
				var _imgs = imgs;
				var i, ii, img;
				for (i = 0, ii = _imgs.length; i < ii; i++) {
					img = _imgs[i];
					img.src = img.src;
				}
			}, 99);
		}

		if (SSS.a_replaceE) {
			var oldE = getAllElements(SSS.a_replaceE);
			var oldE_lt = oldE.length;
			//alert(oldE_lt);
			if (oldE_lt > 0) {
				var newE = getAllElements(SSS.a_replaceE, false, this.doc, this.win);
				var newE_lt = newE.length;
				//alert(newE_lt);
				if (newE_lt == oldE_lt) {  // 替换
					var oldE_x, newE_x;
					for (i = 0; i < newE_lt; i++) {
						oldE_x = oldE[i];
						newE_x = newE[i];
						newE_x = this.doc.importNode(newE_x, true);
						oldE_x.parentNode.replaceChild(newE_x, oldE_x);
					}
				}
			}
		}

		this.paged += 1;
		if (this.ipagesmode && this.paged >= this.ipagesnumber) {
			this.ipagesmode = false;
		}
		this.floatWO.loadedIcon('hide');
		if (this.manualDiv) {
			this.manualDiv.style.display = 'none';
		}
		if (this.goNextImg[0]) this.goNextImg[0].src = sep_icons.next;

		var ev = document.createEvent('Event');
		ev.initEvent('Super_preloaderPageLoaded', true, false);
		document.dispatchEvent(ev);

		if(prefs.enableHistory){
			try {
				window.history.pushState(null, docTitle, this.cplink);
			} catch(e) {}
		}

		if (this.paged >= SSS.a_maxpage) {
			debug('到达所设定的最大翻页数', SSS.a_maxpage);
			notice('<b>状态</b>:' + '到达所设定的最大翻页数:<b style="color:red">' + SSS.a_maxpage + '</b>');
			this.removeListener();
			return;
		}

		if (this.nextlink) {
			// debug('找到下一页链接:', nextlink);
			this.doc = this.win = null;

			var self = this;
			var delayiframe = function(fn) {
				setTimeout(fn.bind(self), 199);
			};

			if (this.ipagesmode) {
				if (SSS.a_useiframe) { // 延时点,firefox,太急会卡-_-!
					delayiframe(this.doRequest);
				} else {
					this.doRequest();
				}
			} else {
				this.working = false;
				if (SSS.a_useiframe) {
					delayiframe(this.afterInsertDo);
				} else {
					this.afterInsertDo();
				}
			}
		} else {
			debug('没有找到下一页链接，选择器为 %s', SSS.nextLink);
			this.removeListener();
			return;
		}
	},

	// 外部调用函数
	startipages: function(value) {
		if (value > 0) {
			this.ipagesmode = true;
			this.ipagesnumber = value + this.paged;
			notice('<b>状态</b>:' + '当前已翻页数量:<b>' + this.paged + '</b>,' + '连续翻页到第<b style="color:red!important;">' + this.ipagesnumber + '</b>页.');

			if (this.SSS.a_manualA) {
				this.insertedIntoDoc();
			}
			this.scroll();
		}
	},

	getRemain: function () {
		var scrolly = window.scrollY;
		var WI = window.innerHeight;
		var obj = this.relatedObj_0 && getLastElement(this.relatedObj_0);
		var scrollH = (obj && obj.nodeType == 1) ? (obj.getBoundingClientRect()[this.relatedObj_1] + scrolly) : Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		return (scrollH - scrolly - WI) / WI; //剩余高度于页面总高度的比例.
	},
	removeScripts: function (node) {  // 移除元素的 script
	    var scripts = getAllElements('css;script', node);
	    var scripts_x;
	    for (var i = scripts.length - 1; i >= 0; i--) {
	        scripts_x = scripts[i];
	        scripts_x.parentNode.removeChild(scripts_x);
	    }
	},
	// tools
	sp_transition: function(start, end) {
		var TweenF = this.TweenF;
		if (!TweenF) {
			TweenF = Tween[TweenM[prefs.s_method]];
			TweenF = TweenF[TweenEase[prefs.s_ease]] || TweenF;
			this.TweenF = TweenF;
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
	},
};
