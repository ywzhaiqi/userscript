//------------------------ 运行部分 -----------------

var xbug = prefs.debug || GM_getValue("debug") || false;
var C = console;
var debug = xbug ? console.debug.bind(console) : function() {};
var nullFn = function() {}; // 空函数.

var sp = {
	init: function() {

	}
};


// 变量
var isHashchangeSite = false,
	hashchangeTimer = 0;


function loadSetting(){  // 载入全局的设置
	var a_enable = GM_getValue('SITEINFO_D.autopager.enable');
	if (a_enable !== undefined) {
		SITEINFO_D.autopager.enable = a_enable;
	}

	var loadDblclickPause = function(reload){
		var dblclickPause = GM_getValue('dblclick_pause', prefs.dblclick_pause);
		if (dblclickPause) {
			prefs.mouseA = false;
			prefs.Pbutton = [0, 0, 0];
		}

		if (reload) location.reload();
	};

	var loadCustomSiteInfo = function() {
		var infos;
		try {
			infos = new Function('', 'return ' + prefs.custom_siteinfo)();
		} catch(e) {
			console.error('自定义站点规则错误', prefs.custom_siteinfo);
			// alert('自定义站点规则错误');
		}

		if (Array.isArray(infos)) {
			SITEINFO = infos.concat(SITEINFO);
		}
	};

	loadDblclickPause();

	loadCustomSiteInfo();
}

function findCurSiteInfo() {
	var index = -1;
	var SSS = {};
	var nextlink;
	var prelink;

	var SII;
	var SIIA;
	var SIIAD = SITEINFO_D.autopager;
	var Rurl;
	var ii = SITEINFO.length;

	debug('高级规则数量:', ii);

	var url = document.location.href.replace(/#.*$/, ''); //url 去掉hash
	for (i = 0; i < ii; i++) {
		SII = SITEINFO[i];
		Rurl = toRE(SII.url);
		if (Rurl.test(url)) {
			debug('找到匹配当前站点的规则:', SII, '是第', i + 1, '规则');

			// 运行规则的 startFilter
			if (SII.autopager && SII.autopager.startFilter) {
				SII.autopager.startFilter(window, document);
				debug('成功运行 startFilter');
			}

			nextlink = getElement(SII.nextLink || 'auto;');
			if (!nextlink) {
				debug('无法找到下一页链接，跳过该规则，继续查找其他规则');
				continue;
			}

			if (SII.preLink && SII.preLink != 'auto;') { //如果设定了具体的preLink
				prelink = getElement(SII.preLink);
			} else {
				if(prefs.autoGetPreLink){
					getElement('auto;');
				}
			}

			// alert(prelink);
			SSS.hasRule = true;
			SSS.Rurl = String(Rurl);
			// alert(SSS.Rurl);
			SSS.nextLink = SII.nextLink || 'auto;';
			SSS.viewcontent = SII.viewcontent;
			SSS.enable = (SII.enable === undefined) ? SITEINFO_D.enable : SII.enable;
			SSS.useiframe = (SII.useiframe === undefined) ? SITEINFO_D.useiframe : SII.useiframe;
			if (SII.pageElement) { //如果是Oautopager的规则..
				if (!(SII.autopager instanceof Object)) SII.autopager = {};
				SII.autopager.pageElement = SII.pageElement;
				if (SII.insertBefore) SII.autopager.HT_insert = [SII.insertBefore, 1];
			}

			// 自动翻页设置.
			SIIA = SII.autopager;
			if (SIIA) {
				SSS.a_pageElement = SIIA.pageElement;
				if (!SSS.a_pageElement) break;

				// 补上 SSS 中缺少的默认值，默认值来自 SIIAD
				Object.keys(SIIAD).forEach(function(key) {
					SSS['a_' + key] = (SIIA[key] === undefined) ? SIIAD[key] : SIIA[key];
				});

				// 如果站点规则存在则加上
				['replaceE', 'HT_insert', 'relatedObj'].forEach(function(key) {
					if (key in SIIA) {
						SSS['a_' + key] = SIIA[key];
					}
				});

				// 兼容 uAutoPagerize2 的规则格式
				// filter 兼容了 uAutoPagerize2 的函数形式，原来是字符串（功能是移除 pageElement 的部分内容）
				['filter', 'documentFilter', 'stylish', 'lazyImgSrc', 'scroll_only', 'mutationTitle'].forEach(function(key) {
					if (key in SII) {
						SSS['a_' + key] = SII[key];
					} else if (key in SIIA) {
						SSS['a_' + key] = SIIA[key];
					}
				});
			}

			// 检验是否存在内容
			var pageElement = getElement(SSS.a_pageElement);
			if (!pageElement) {
				debug('无法找到内容,跳过规则:', SII, '继续查找其他规则');
				continue;
			}

			break;
		}
	}

	if (!SSS.hasRule) {
		debug('未找到合适的高级规则,开始自动匹配.');
		//自动搜索.
		if (!autoMatch.keyMatch) {
			debug('自动匹配功能被禁用了.');
		} else {
			nextlink = autoGetLink();
			//alert(nextlink);
			if (nextlink) { //强制模式.
				var FA = autoMatch.FA;
				SSS.Rurl = window.localStorage ? ('am:' + (url.match(/^https?:\/\/[^:]*\//i) || [])[0]) : 'am:automatch';
				//alert(SSS.Rurl);
				SSS.enable = true;
				SSS.nextLink = 'auto;';
				SSS.viewcontent = autoMatch.viewcontent;
				SSS.useiframe = autoMatch.useiframe;
				SSS.a_force = true;
				SSS.a_manualA = FA.manualA;
				// SSS.a_enable = FA.enable || false; //不能使a_enable的值==undefined...
				SSS.a_enable = FA.enable || SITEINFO_D.autopager.force_enable; //不能使a_enable的值==undefined...
				SSS.a_useiframe = FA.useiframe;
				SSS.a_iloaded = FA.iloaded;
				SSS.a_itimeout = FA.itimeout;
				SSS.a_remain = FA.remain;
				SSS.a_maxpage = FA.maxpage;
				SSS.a_separator = FA.separator;
				SSS.a_ipages = FA.ipages;
			}
		}
	}

	// 如果规则没 lazyImgSrc，设置默认值
	if (SSS.Rurl && !SSS.lazyImgSrc) {
		SSS.lazyImgSrc = prefs.lazyImgSrc;
	}

	return {
		index: index,
		SSS: SSS,
		nextlink: nextlink,
		prelink: prelink,
	}
}

// 载入设置..
function loadLocalSetting(SSS) {
	debug('加载设置');

	var savedValue = getValue('spfwset');
	if (savedValue) {
		try {
			savedValue = eval(savedValue);
		} catch (e) {
			saveValue('spfwset', ''); //有问题的设置,被手动修改过?,清除掉,不然下次还是要出错.
		}
	}
	if (savedValue) {
		SSS.savedValue = savedValue;
		for (i = 0, ii = savedValue.length; i < ii; i++) {
			savedValue_x = savedValue[i];
			if (savedValue_x.Rurl == SSS.Rurl) {
				for (var ix in savedValue_x) {
					if (savedValue_x.hasOwnProperty(ix)) {
						SSS[ix] = savedValue_x[ix]; //加载键值.
					}
				}
				break;
			}
		}
		//alert(i);
		SSS.sedValueIndex = i;
	} else {
		SSS.savedValue = [];
		SSS.sedValueIndex = 0;
	}
}

function restartAP(SSS) {  // 无需刷新的重载
	debug('-----------------');

	loadLocalSetting(SSS);

	floatWO.destory();
	floatWO = new FloatWindow(SSS);

	if (autoPO) {
		autoPO.destory(true);
	}
	autoPO = new AutoPager(SSS, floatWO);
}


function mutationTitle(SSS) {
	var timeoutId;

	var observer = new MutationObserver(function(mutations) {
		// Google 立即执行的话下一页链接还是原先的
		clearTimeout(timeoutId);
		timeoutId = setTimeout(function() {
			restartAP(SSS);
		}, 500);
	});

	var opt = {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: false
	};

	var title = document.getElementsByTagName("title")[0];
	observer.observe(title, opt);
}

function run(window, document) {
	var startTime = new Date();

	var url = document.location.href.replace(/#.*$/, ''); //url 去掉hash
	var hashchangeAdded = false;

	debug('----------------------------------------------------');

	//执行开始..///////////////////

	// 分析黑名单
	var blackList_all = blackList.concat(prefs.excludes.split(/[\n\r]+/).map(function(line) {
		return line.trim();
	}));

	var blackList_re = new RegExp(blackList_all.map(wildcardToRegExpStr).join("|"));
	if(blackList_re.test(url)){
		debug('匹配黑名单，js执行终止');
		return;
	}

	//是否在frame上加载..
	if (prefs.DisableI && window.self != window.parent) {
		var isReturn = !_.find(DIExclude, function(x){ return x[1] && x[2].test(url); });
		if (isReturn) {
			debug('url为:', url, '的页面为非顶层窗口,JS执行终止.');
			return;
		}
	}
	debug('url为:', url, 'JS加载成功');

	//第一阶段..分析高级模式..
	SITEINFO = SITEINFO.concat(SITEINFO_TP, SITEINFO_comp);

	var obj = findCurSiteInfo();
	var SSS = obj.SSS,
		nextlink = obj.nextlink,
		prelink = obj.prelink;

	debug('搜索高级规则和自动匹配过程总耗时:', new Date() - startTime, '毫秒');

	if (SSS && SSS.a_enable && SSS.a_mutationTitle) {
		console.debug('添加标题节点监视');
		mutationTitle(SSS);
	}

	// 上下页都没有找到啊
	if (!nextlink && !prelink) {
		debug('未找到相关链接, JS执行停止. 共耗时' + (new Date() - startTime) + '毫秒');
		return;
	} else {
		debug('上一页链接:', prelink);
		debug('下一页链接:', nextlink);
		nextlink = nextlink ? (nextlink.href || nextlink) : undefined;
		prelink = prelink ? (prelink.href || prelink) : undefined;
	}

	var superPreloader = {
		go: function() {
			nextlink = autoPO && autoPO.nextlink || nextlink;
			if (nextlink) window.location.href = nextlink;
		},
		back: function() {
			prelink = autoPO && autoPO.prelink || prelink;
			if(!prelink) getElement('auto;');
			if (prelink) window.location.href = prelink;
		},
	};

	if (prefs.arrowKeyPage) {
		debug('添加键盘左右方向键翻页监听.');
		document.addEventListener('keyup', function(e) {
			var tarNN = e.target.nodeName;
			if (tarNN != 'BODY' && tarNN != 'HTML') return;
			switch (e.keyCode) {
				case 37:
					superPreloader.back();
					break;
				case 39:
					superPreloader.go();
					break;
				default:
					break;
			}
		}, false);
	}

	// 监听下一页事件.
	debug('添加鼠标手势翻页监听.');
	document.addEventListener('superPreloader.go', function() {
		superPreloader.go();
	}, false);

	// 监听下一页事件.
	document.addEventListener('superPreloader.back', function() {
		superPreloader.back();
	}, false);

	// 没找到下一页的链接
	if (!nextlink) {
		debug('下一页链接不存在,JS无法继续.');
		debug('全部过程耗时:', new Date() - startTime, '毫秒');
		return;
	}

	loadLocalSetting(SSS);

	if (!SSS.hasRule) {
		SSS.a_force = true;
	}

	if (SSS.a_force) {
		SSS.a_pageElement = '//body/*';
		SSS.a_HT_insert = undefined;
		SSS.a_relatedObj = undefined;
	}

	if (prefs.floatWindow) {
		debug('创建悬浮窗');
		floatWO = new FloatWindow(SSS);
	}

	if (!SSS.enable) {
		debug('本规则被关闭,脚本执行停止');
		debug('全部过程耗时:', new Date() - startTime, '毫秒');
		return;
	}

	debug('全部过程耗时:', new Date() - startTime, '毫秒');

	// 预读或者翻页.
	if (SSS.a_enable) {
		debug('初始化,翻页模式.');
		autoPO = new AutoPager(SSS, floatWO, nextlink);
	} else {
		debug('初始化,预读模式.');
		prefetcher(SSS, floatWO, nextlink);
	}
}

function init() {
	if(document.body.getAttribute("name") === "MyNovelReader"){
		return;
	}

	loadSetting();

	GM_registerMenuCommand('Super_preloaderPlus_one 设置', setup);

	// 查找是否是页面不刷新的站点
	var locationHref = location.href;
	var hashSite = _.find(HashchangeSites, function(x){ return toRE(x.url).test(locationHref); });
	if (hashSite) {
		isHashchangeSite = true;
		hashchangeTimer = hashSite.timer;
		debug('当前是页面不刷新的站点', hashSite);
		setTimeout(function() {
			run(window, document);
		}, hashchangeTimer);
	} else {
		run(window, document);
	}
}


// if (isHashchangeSite && !hashchangeAdded) {
// 	window.addEventListener("hashchange", onhashChange, false);
// 	hashchangeAdded = true;
// 	debug('成功添加 hashchange 事件');
// }

// function onhashChange(event) {
// 	debug("触发 Hashchang 事件");
// 	removeL(true);

// 	setTimeout(function(){
// 		nextlink = getElement(SSS.nextLink || 'auto;');
// 		nextlink = getFullHref(nextlink);
// 		// preLink = getElement(SSS.preLink || 'auto;');
// 		autopager(SSS, floatWO);
// 	}, hashchangeTimer);
// }

init();
