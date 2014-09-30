// 悬浮窗
function FloatWindow() {
	this.init.apply(this, arguments);
}

FloatWindow.prototype = {

	init: function(SSS, autoPO) {
		this.SSS = SSS;
		this.autoPO = autoPO;

		this.addStyle();

		this.addContaner();

		this.initContainer();
	},
	destory: function() {
		this.removeStyle();

		this.removeContainer();
	},
	addStyle: function() {
		this.style = GM_addStyle('\
		    #sp-fw-container {\
		        z-index:999999!important;\
		        text-align:left!important;\
		    }\
		    #sp-fw-container * {\
		        font-size:13px!important;\
		        color:black!important;\
		        float:none!important;\
		    }\
		    #sp-fw-main-head{\
		        position:relative!important;\
		        top:0!important;\
		        left:0!important;\
		    }\
		    #sp-fw-span-info{\
		        position:absolute!important;\
		        right:1px!important;\
		        top:0!important;\
		        font-size:10px!important;\
		        line-height:10px!important;\
		        background:none!important;\
		        font-style:italic!important;\
		        color:#5a5a5a!important;\
		        text-shadow:white 0px 1px 1px!important;\
		    }\
		    #sp-fw-container input {\
		        vertical-align:middle!important;\
		        display:inline-block!important;\
		        outline:none!important;\
		        height: auto !important;\
		        padding: 0px !important;\
		        margin-bottom: 0px !important;\
		    }\
		    #sp-fw-container input[type="number"] {\
		        width:50px!important;\
		        text-align:left!important;\
		    }\
		    #sp-fw-container input[type="checkbox"] {\
		        border:1px solid #B4B4B4!important;\
		        padding:1px!important;\
		        margin:3px!important;\
		        width:13px!important;\
		        height:13px!important;\
		        background:none!important;\
		        cursor:pointer!important;\
		    }\
		    #sp-fw-container input[type="button"] {\
		        border:1px solid #ccc!important;\
		        cursor:pointer!important;\
		        background:none!important;\
		        width:auto!important;\
		        height:auto!important;\
		    }\
		    #sp-fw-container li {\
		        list-style:none!important;\
		        margin:3px 0!important;\
		        border:none!important;\
		        float:none!important;\
		    }\
		    #sp-fw-container fieldset {\
		        border:2px groove #ccc!important;\
		        -moz-border-radius:3px!important;\
		        border-radius:3px!important;\
		        padding:4px 9px 6px 9px!important;\
		        margin:2px!important;\
		        display:block!important;\
		        width:auto!important;\
		        height:auto!important;\
		    }\
		    #sp-fw-container legend {\
		        line-height: 20px !important;\
		        margin-bottom: 0px !important;\
		    }\
		    #sp-fw-container fieldset>ul {\
		        padding:0!important;\
		        margin:0!important;\
		    }\
		    #sp-fw-container ul#sp-fw-a_useiframe-extend{\
		        padding-left:40px!important;\
		    }\
		    #sp-fw-rect {\
		        position:relative!important;\
		        top:0!important;\
		        left:0!important;\
		        float:right!important;\
		        height:10px!important;\
		        width:10px!important;\
		        padding:0!important;\
		        margin:0!important;\
		        -moz-border-radius:3px!important;\
		        border-radius:3px!important;\
		        border:1px solid white!important;\
		        -webkit-box-shadow:inset 0 5px 0 rgba(255,255,255,0.3), 0 0 3px rgba(0,0,0,0.8)!important;\
		        -moz-box-shadow:inset 0 5px 0 rgba(255,255,255,0.3), 0 0 3px rgba(0,0,0,0.8)!important;\
		        box-shadow:inset 0 5px 0 rgba(255,255,255,0.3), 0 0 3px rgba(0,0,0,0.8)!important;\
		        opacity:0.8!important;\
		    }\
		    #sp-fw-dot,\
		    #sp-fw-cur-mode {\
		        position:absolute!important;\
		        z-index:9999!important;\
		        width:5px!important;\
		        height:5px!important;\
		        padding:0!important;\
		        -moz-border-radius:3px!important;\
		        border-radius:3px!important;\
		        border:1px solid white!important;\
		        opacity:1!important;\
		        -webkit-box-shadow:inset 0 -2px 1px rgba(0,0,0,0.3),inset 0 2px 1px rgba(255,255,255,0.3), 0px 1px 2px rgba(0,0,0,0.9)!important;\
		        -moz-box-shadow:inset 0 -2px 1px rgba(0,0,0,0.3),inset 0 2px 1px rgba(255,255,255,0.3), 0px 1px 2px rgba(0,0,0,0.9)!important;\
		        box-shadow:inset 0 -2px 1px rgba(0,0,0,0.3),inset 0 2px 1px rgba(255,255,255,0.3), 0px 1px 2px rgba(0,0,0,0.9)!important;\
		    }\
		    #sp-fw-dot{\
		        right:-3px!important;\
		        top:-3px!important;\
		    }\
		    #sp-fw-cur-mode{\
		        left:-3px!important;\
		        top:-3px!important;\
		        width:6px!important;\
		        height:6px!important;\
		    }\
		    #sp-fw-content{\
		        padding:0!important;\
		        margin:5px 5px 0 0!important;\
		        -moz-border-radius:3px!important;\
		        border-radius:3px!important;\
		        border:1px solid #A0A0A0!important;\
		        -webkit-box-shadow:-2px 2px 5px rgba(0,0,0,0.3)!important;\
		        -moz-box-shadow:-2px 2px 5px rgba(0,0,0,0.3)!important;\
		        box-shadow:-2px 2px 5px rgba(0,0,0,0.3)!important;\
		    }\
		    #sp-fw-main {\
		        padding:5px!important;\
		        border:1px solid white!important;\
		        -moz-border-radius:3px!important;\
		        border-radius:3px!important;\
		        background-color:#F2F2F7!important;\
		        background: -moz-linear-gradient(top, #FCFCFC, #F2F2F7 100%)!important;\
		        background: -webkit-gradient(linear, 0 0, 0 100%, from(#FCFCFC), to(#F2F2F7))!important;\
		    }\
		    #sp-fw-foot{\
		     position:relative!important;\
		     left:0!important;\
		     right:0!important;\
		     min-height:20px!important;\
		    }\
		    #sp-fw-savebutton{\
		        position:absolute!important;\
		        top:0!important;\
		        right:2px!important;\
		    }\
		    #sp-fw-container .sp-fw-spanbutton{\
		        border:1px solid #ccc!important;\
		        -moz-border-radius:3px!important;\
		        border-radius:3px!important;\
		        padding:2px 3px!important;\
		        cursor:pointer!important;\
		        background-color:#F9F9F9!important;\
		        -webkit-box-shadow:inset 0 10px 5px white!important;\
		        -moz-box-shadow:inset 0 10px 5px white!important;\
		        box-shadow:inset 0 10px 5px white!important;\
		    }\
		');
	},
	removeStyle: function() {
		if (this.style) {
			this.style.parentNode.removeChild(this.style);
			this.style = null;
		}
	},
	addContaner: function() {
		var div = document.createElement('div');
		div.id = 'sp-fw-container';
		div.innerHTML = '\
		    <div id="sp-fw-rect" style="background-color:#000;">\
		        <div id="sp-fw-dot" style="display:none;"></div>\
		        <div id="sp-fw-cur-mode" style="display:none;"></div>\
		    </div>\
		    <div id="sp-fw-content" style="display:none;">\
		        <div id="sp-fw-main">\
		            <div id="sp-fw-main-head">\
		                <input type="checkbox" title="使用翻页模式,否则使用预读模式" id="sp-fw-a_enable" name="sp-fw-a_enable"/>使用翻页模式\
		                <span id="sp-fw-span-info">Super_preloaderPlus</span>\
		            </div>\
		            <fieldset>\
		                <legend title="预读模式的相关设置" >预读设置</legend>\
		                <ul>\
		                    <li>\
		                        <input type="checkbox" title="使用iframe预先载入好下一页到缓存,否则使用xhr请求下一页源码,取出所有的图片进行预读" id="sp-fw-useiframe" name="sp-fw-useiframe"/>使用iframe方式\
		                    </li>\
		                    <li>\
		                        <input type="checkbox" title="查看预读的内容,将其显示在页面的底部,看看预读了些什么." id="sp-fw-viewcontent" name="sp-fw-viewcontent"/>查看预读的内容\
		                    </li>\
		                </ul>\
		            </fieldset>\
		            <fieldset id="sp-fw-autopager-field" style="display:block;">\
		                <legend title="自动翻页模式的相关设置">翻页设置</legend>\
		                <ul>\
		                    <li>\
		                        <input type="checkbox" title="使用iframe方式进行翻页,否则使用xhr方式翻页,可以解决某些网页xhr方式无法翻页的问题,如果xhr翻页正常的话,就不要勾这项吧." id="sp-fw-a_useiframe" name="sp-fw-a_useiframe"/>使用iframe方式</input>\
		                        <input type="checkbox" style="display:none!important;" title="每个下一页都用新的iframe，可以解决下一页图片或按钮点击的问题" id="sp-fw-a_newIframe" name="sp-fw-a_newIframe">新iframe</input>\
		                        <ul id="sp-fw-a_useiframe-extend">\
		                            <li>\
		                                <input type="checkbox" title="等待iframe完全载入后(发生load事件),将内容取出,否则在DOM完成后,就直接取出来..(勾上后,会比较慢,但是可能会解决一些问题.)" id="sp-fw-a_iloaded" name="sp-fw-a_iloaded" />等待iframe完全载入\
		                            </li>\
		                            <li>\
		                                <input type="number"  min="0" title="在可以从iframe取数据的时候,继续等待设定的毫秒才开始取出数据(此项为特殊网页准备,如果正常,请设置为0)" id="sp-fw-a_itimeout" name="sp-fw-a_itimeout"/>ms延时取出\
		                            </li>\
		                        </ul>\
		                    </li>\
		                    <li>\
		                        <input type="checkbox" id="sp-fw-a_manualA" name="sp-fw-a_manualA" title="不会自动拼接上来,会出现一个类似翻页导航的的图形,点击翻页(在论坛的帖子内容页面,可以考虑勾选此项,从而不影响你的回帖)"/>手动模式\
		                    </li>\
		                    <li>\
		                         剩余<input type="number" min="0" id="sp-fw-a_remain" name="sp-fw-a_remain" title="当剩余的页面的高度是浏览器可见窗口高度的几倍开始翻页"/>倍页面高度触发\
		                    </li>\
		                    <li>\
		                         最多翻<input type="number" min="0" id="sp-fw-a_maxpage" name="sp-fw-a_maxpage" title="最多翻页数量,当达到这个翻页数量的时候,自动翻页停止." />页\
		                    </li>\
		                    <li>\
		                        <input type="checkbox" id="sp-fw-a_separator" name="sp-fw-a_separator" title="分割页面主要内容的导航条,可以进行页面主要内容之间的快速跳转定位等."/>显示翻页导航\
		                    </li>\
		                    <li>\
		                        <input type="checkbox" title="将下一页的body部分内容整个拼接上来.(当需翻页的网站没有高级规则时,该项强制勾选,无法取消.)" id="sp-fw-a_force" name="sp-fw-a_force"/>强制拼接\
		                    </li>\
		                    <li>\
		                        <input type="checkbox" id="sp-fw-a_ipages_0" name="sp-fw-a_ipages_0" title="在JS加载后,立即连续翻后面设定的页数"/>启用 \
		                        立即翻<input type="number" min="1" id="sp-fw-a_ipages_1" name="sp-fw-a_ipages_1" title="连续翻页的数量" />页\
		                        <input type="button" value="开始" title="现在立即开始连续翻页" id="sp-fw-a_starti" />\
		                    </li>\
		                </ul>\
		            </fieldset>\
		            <div id="sp-fw-foot">\
		             <input type="checkbox" id="sp-fw-enable" title="总开关,启用js,否则禁用." name="sp-fw-enable"/>启用\
		             <span id="sp-fw-setup" class="sp-fw-spanbutton" title="打开设置窗口">设置</span>\
		             <span id="sp-fw-savebutton" class="sp-fw-spanbutton" title="保存设置">保存</span>\
		            </div>\
		        </div>\
		    </div>\
		';
		document.body.appendChild(div);

		// 缓存变量
		this.container = div;
		this.rect = this.getId('sp-fw-rect');  // 悬浮窗的小正方形,用颜色描述当前的状态.
		this.dot = this.getId('sp-fw-dot');    // 设置面板.
		this.cur_mode = this.getId('sp-fw-cur-mode');
	},
	removeContainer: function() {
		if (this.container) {
			this.container.parentNode.removeChild(this.container);
			this.container = null;
		}
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
			autoPO = this.autoPO,
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
		    autoPO.startipages(value);
		}, false);

		//总开关
		var enable = $('sp-fw-enable');
		$('sp-fw-setup').addEventListener('click', setup, false);

		// 保存设置按钮.
		var savebutton = $('sp-fw-savebutton');
		savebutton.addEventListener('click', function(e) {
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
		    //alert(xToString(value));
		    SSS.savedValue[SSS.sedValueIndex] = value;
		    //alert(xToString(SSS.savedValue));
		    saveValue('spfwset', xToString(SSS.savedValue));
		    if ((e.shiftKey ? !prefs.FW_RAS : prefs.FW_RAS)) { //按住shift键,执行反向操作.
		        setTimeout(function(){
		            location.reload();
		        }, 1);
		    }
		}, false);

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