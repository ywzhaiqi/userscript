
//------------------------ 悬浮窗 -----------------
var floatWO = {
	updateColor: nullFn,
	loadedIcon: nullFn,
	CmodeIcon: nullFn,
	destory: nullFn
};

function FloatWindow() {
	this.init.apply(this, arguments);
}

FloatWindow.prototype = {

	init: function(SSS) {
		this.SSS = SSS;

		this.addStyle();

		this.addContaner();

		this.initContainer();
	},
	destory: function() {
		['sp-fw-style', 'sp-fw-container'].forEach(function(id) {
			var node = document.getElementById(id);
			if (node) {
				node.parentNode.removeChild(node);
			}
		});
	},
	addStyle: function() {
		var style = document.createElement('style');
		style.id = 'sp-fw-style';
		style.innerHTML = <%= res.FloatWindowCSS %>;
		document.head.appendChild(style);
	},
	addContaner: function() {
		var div = document.createElement('div');
		div.id = 'sp-fw-container';
		div.innerHTML = <%= res.FloatWindowHTML %>;
		document.body.appendChild(div);

		// 缓存变量
		this.container = div;
		this.rect = this.getId('sp-fw-rect');  // 悬浮窗的小正方形,用颜色描述当前的状态.
		this.dot = this.getId('sp-fw-dot');    // 设置面板.
		this.cur_mode = this.getId('sp-fw-cur-mode');
	},
	// 有待进一步优化
	initContainer: function() {
		var spanel = this.getId('sp-fw-content');

		var spanelc = {
			show: function() {
				spanel.style.display = 'block';
			},
			hide: function() {
				spanel.style.display = 'none';
			},
		};

		var rectt1,
			rectt2;

		// 设置面板显隐
		this.rect.addEventListener('mouseover', function(e) {
			rectt1 = setTimeout(spanelc.show, 100);
		}, false);
		this.rect.addEventListener('mouseout', function(e) {
			clearTimeout(rectt1);
		}, false);

		this.container.addEventListener('mouseover', function(e) {
			clearTimeout(rectt2);
		}, false);

		this.container.addEventListener('mouseout', function(e) {
			if (e.relatedTarget && e.relatedTarget.disabled) return; // for firefox and chrome
			rectt2 = setTimeout(spanelc.hide, 288);
		}, false);

		// 载入完成后,显示的小点
		this.dot.style.backgroundColor = FWKG_color.dot;

		// 当载入状态时,用来描述当前是翻页模式,还是预读模式.
		this.cur_mode.style.backgroundColor = this.SSS.a_enable ? FWKG_color.autopager : FWKG_color.prefetcher;

		this.loadSetting();
	},
	// 有待进一步优化
	loadSetting: function() {
		var SSS = this.SSS,
			div = this.container;

		function $(id) {
			return document.getElementById(id);
		}

		// 启用翻页模式
		var a_enable = $('sp-fw-a_enable');
		// 翻页设置区域
		var autopager_field = $('sp-fw-autopager-field');

		//预读设置
		var useiframe = $('sp-fw-useiframe');
		var viewcontent = $('sp-fw-viewcontent');

		//翻页设置
		var a_useiframe = $('sp-fw-a_useiframe');
		var a_iloaded = $('sp-fw-a_iloaded');
		var a_itimeout = $('sp-fw-a_itimeout');
		var a_manualA = $('sp-fw-a_manualA');
		var a_remain = $('sp-fw-a_remain');
		var a_maxpage = $('sp-fw-a_maxpage');
		var a_separator = $('sp-fw-a_separator');
		var a_ipages_0 = $('sp-fw-a_ipages_0');
		var a_ipages_1 = $('sp-fw-a_ipages_1');
		var a_force = $('sp-fw-a_force');

		// newIframe 输入框的点击
		var a_newIframe = $('sp-fw-a_newIframe');
		a_newIframe.addEventListener('click', function(){
			a_useiframe.checked = a_newIframe.checked;
		}, false);

		var a_starti = $('sp-fw-a_starti'); // 开始立即翻页
		a_starti.addEventListener('click', function() {
			if (this.disabled) return;
			var value = Number(a_ipages_1.value);
			if (isNaN(value) || value <= 0) {
				value = SSS.a_ipages[1];
				a_ipages_1.value = value;
			}
			autoPO && autoPO.startipages(value);
		}, false);

		//总开关
		var enable = $('sp-fw-enable');
		$('sp-fw-setup').addEventListener('click', setup, false);

		// 保存设置按钮.
		var savebutton = $('sp-fw-savebutton');
		savebutton.addEventListener('click', function(e) {
			save();

			// restartAP(SSS);

			if ((e.shiftKey ? !prefs.FW_RAS : prefs.FW_RAS)) { //按住shift键,执行反向操作.
				setTimeout(function(){
					location.reload();
				}, 1);
			}
		}, false);

		function save() {
			var value = {
				Rurl: SSS.Rurl,
				useiframe: gl(useiframe),
				viewcontent: gl(viewcontent),
				enable: gl(enable),
			};

			function gl(obj) {
				return (obj.type == 'checkbox' ? obj.checked : obj.value);
			}
			if (SSS.a_enable !== undefined) {
				value.a_enable = gl(a_enable);
				value.a_useiframe = gl(a_useiframe);
				value.a_newIframe = gl(a_newIframe);
				value.a_iloaded = gl(a_iloaded);
				value.a_manualA = gl(a_manualA);
				value.a_force = gl(a_force);
				var t_a_itimeout = Number(gl(a_itimeout));
				value.a_itimeout = isNaN(t_a_itimeout) ? SSS.a_itimeout : (t_a_itimeout >= 0 ? t_a_itimeout : 0);
				var t_a_remain = Number(gl(a_remain));
				value.a_remain = isNaN(t_a_remain) ? SSS.a_remain : Number(t_a_remain.toFixed(2));
				var t_a_maxpage = Number(gl(a_maxpage));
				value.a_maxpage = isNaN(t_a_maxpage) ? SSS.a_maxpage : (t_a_maxpage >= 1 ? t_a_maxpage : 1);
				var t_a_ipages_1 = Number(gl(a_ipages_1));
				value.a_ipages = [gl(a_ipages_0), (isNaN(t_a_ipages_1) ? SSS.a_ipages[1] : (t_a_ipages_1 >= 1 ? t_a_ipages_1 : 1))];
				value.a_separator = gl(a_separator);
			}

			SSS.savedValue[SSS.sedValueIndex] = value;
			saveValue('spfwset', xToString(SSS.savedValue));
		}

		function ll(obj, value) {
			if (obj.type == 'checkbox') {
				obj.checked = value;
			} else {
				obj.value = value;
			}
		}


		// 载入翻页设置.
		if (SSS.a_enable === undefined) { //未定义翻页功能.
			a_enable.disabled = true;
			autopager_field.style.display = 'none';
		} else {
			ll(a_enable, SSS.a_enable);
			ll(a_useiframe, SSS.a_useiframe);
			ll(a_newIframe, SSS.a_newIframe);
			ll(a_iloaded, SSS.a_iloaded);
			ll(a_itimeout, SSS.a_itimeout);
			ll(a_manualA, SSS.a_manualA);
			ll(a_force, SSS.a_force);
			ll(a_remain, SSS.a_remain);
			ll(a_maxpage, SSS.a_maxpage);
			ll(a_separator, SSS.a_separator);
			ll(a_ipages_0, SSS.a_ipages[0]);
			ll(a_ipages_1, SSS.a_ipages[1]);
		}

		if (!SSS.a_enable) { //当前不是翻页模式,禁用立即翻页按钮.
			a_starti.disabled = true;
		}

		if (!SSS.hasRule) { //如果没有高级规则,那么此项不允许操作.
			a_force.disabled = true;
		}

		//载入预读设置.
		ll(useiframe, SSS.useiframe);
		ll(viewcontent, SSS.viewcontent);

		//总开关
		ll(enable, SSS.enable);

		var vertical = parseInt(prefs.FW_offset[0], 10);
		var horiz = parseInt(prefs.FW_offset[1], 10);
		var FW_position = prefs.FW_position;

		// 非opera用fixed定位.
		div.style.position = 'fixed';
		switch (FW_position) {
			case 1:
				div.style.top = vertical + 'px';
				div.style.left = horiz + 'px';
				break;
			case 2:
				div.style.top = vertical + 'px';
				div.style.right = horiz + 'px';
				break;
			case 3:
				div.style.bottom = vertical + 'px';
				div.style.right = horiz + 'px';
				break;
			case 4:
				div.style.bottom = vertical + 'px';
				div.style.left = horiz + 'px';
				break;
			default:
				break;
		}
	},

	FWKG_state: {
		loading: '读取中状态',
		prefetcher: '预读状态',
		autopager: '翻页状态',
		Apause: '翻页状态(暂停)',
		Astop: '翻页状态(停止)(翻页完成,或者被异常停止)(无法再开启)',
		dot: '读取完后',
	},
	// 相关动作
	updateColor: function(state) {
		this.rect.style.backgroundColor = FWKG_color[state];
		this.rect.setAttribute("title", this.FWKG_state[state]);
	},
	loadedIcon: function(command) {
		this.dot.style.display = command == 'show' ? 'block' : 'none';
	},
	CmodeIcon: function(command) {
		this.cur_mode.style.display = command == 'show' ? 'block' : 'none';
	},

	// tools
	getId: function(id) {
		return document.getElementById(id);
	}
};
