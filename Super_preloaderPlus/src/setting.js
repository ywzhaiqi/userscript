// 主要用于 chrome 原生下检查更新，也可用于手动检查更新
var scriptInfo = {
	version: '<%= pkg.version %>',
	updateTime: '<%= grunt.template.today("yyyy/m/d") %>',
	homepageURL: 'https://greasyfork.org/scripts/293-super-preloaderplus-one',
	downloadUrl: 'https://greasyfork.org/scripts/293-super-preloaderplus-one/code/Super_preloaderPlus_one.user.js',
	metaUrl: 'https://greasyfork.org/scripts/293-super-preloaderplus-one/code/Super_preloaderPlus_one.meta.js',
};

var setup = function(){
	var d = document;
	var on = function(node, e, f) {
		node.addEventListener(e, f, false);
	};

	var $ = function(s) { return d.getElementById('sp-prefs-'+s); };
	if($('setup')) return;

	var styleNode = GM_addStyle('\
		#sp-prefs-setup { position:fixed;z-index:2147483647;top:30px;right:60px;padding:20px 30px;background:#eee;width:500px;border:1px solid black; }\
		#sp-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
		#sp-prefs-setup a { color:black;text-decoration:underline; }\
		#sp-prefs-setup div { text-align:center;font-weight:bold;font-size:14px; }\
		#sp-prefs-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:#eee;border:0; }\
		#sp-prefs-setup input, #sp-prefs-setup select { border:1px solid gray;padding:2px;background:white; }\
		#sp-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
		#sp-prefs-setup button { width:150px;margin:0 10px;text-align:center;}\
		#sp-prefs-setup textarea { width:98%; height:60px; margin:3px 0; }\
		#sp-prefs-setup b { font-weight: bold; font-family: "微软雅黑", sans-serif; }\
		#sp-prefs-setup button:disabled { color: graytext; }\
		#sp-prefs-setup select { height: auto; }\
	');

	var div = d.createElement('div');
	div.id = 'sp-prefs-setup';
	d.body.appendChild(div);
	div.innerHTML = '\
		<div>Super_preloaderPlus_one 设置</div>\
			<ul>\
				<li>当前版本为 <b>' + scriptInfo.version + ' </b>，上次更新时间为 <b>'+ scriptInfo.updateTime + '</b>\
					<a id="sp-prefs-homepageURL" target="_blank" href="' + scriptInfo.homepageURL + '"/>脚本主页</a>\
				</li>\
				<li><input type="checkbox" id="sp-prefs-debug" /> 调试模式</li>\
				<li><input type="checkbox" id="sp-prefs-dblclick_pause" /> 鼠标双击暂停翻页（默认为 Ctrl + 长按左键）</li>\
				<li><input type="checkbox" id="sp-prefs-enableHistory" /> 添加下一页到历史记录</li>\
				<li title="下一页的链接设置成在新标签页打开"><input type="checkbox" id="sp-prefs-forceTargetWindow" /> 新标签打开链接</li>\
				<li><input type="checkbox" id="sp-prefs-SITEINFO_D-useiframe" /> 在预读模式下，默认启用 iframe 方式</li>\
				<li><input type="checkbox" id="sp-prefs-SITEINFO_D-a_enable" /> 默认启用自动翻页 </li>\
				<li><input type="checkbox" id="sp-prefs-SITEINFO_D-a_force_enable" /> 自动翻页默认启用强制拼接</li>\
				<li>自定义排除列表：\
					<div><textarea id="sp-prefs-excludes" placeholder="自定义排除列表，支持通配符。\n例如：http://*.douban.com/*"></textarea></div>\
				</li>\
				<li>自定义站点规则：\
					<div><textarea id="sp-prefs-custom_siteinfo" placeholder="自定义站点规则"></textarea></div>\
				</li>\
			</ul>\
		<div><button id="sp-prefs-ok">确定</button><button id="sp-prefs-cancel">取消</button></div>';
	div = null;

	var close = function() {
		if (styleNode && styleNode.parentNode) {
			styleNode.parentNode.removeChild(styleNode);
		}
		var div = $('setup');
		div.parentNode.removeChild(div);
	};

	on($('ok'), 'click', function(){
		GM_setValue('enableHistory', prefs.enableHistory = !!$('enableHistory').checked);
		GM_setValue('forceTargetWindow', prefs.forceTargetWindow = !!$('forceTargetWindow').checked);
		GM_setValue('SITEINFO_D.useiframe', SITEINFO_D.useiframe = !!$('SITEINFO_D-useiframe').checked);
		GM_setValue('SITEINFO_D.autopager.enable', SITEINFO_D.autopager.enable = !!$('SITEINFO_D-a_enable').checked);
		GM_setValue('SITEINFO_D.autopager.force_enable', SITEINFO_D.autopager.force_enable = !!$('SITEINFO_D-a_force_enable').checked);

		GM_setValue('debug', xbug = $('debug').checked);
		debug = xbug ? console.log.bind(console) : function() {};

		GM_setValue('dblclick_pause', $('dblclick_pause').checked);
		GM_setValue('excludes', prefs.excludes = $('excludes').value);
		GM_setValue('custom_siteinfo', prefs.custom_siteinfo = $('custom_siteinfo').value);

		loadSetting();

		close();
	});

	on($('cancel'), 'click', close);

	$('debug').checked = xbug;
	$('enableHistory').checked = prefs.enableHistory;
	$('forceTargetWindow').checked = prefs.forceTargetWindow;
	$('dblclick_pause').checked = GM_getValue('dblclick_pause') || false;
	$('SITEINFO_D-useiframe').checked = SITEINFO_D.useiframe;
	$('SITEINFO_D-a_enable').checked = SITEINFO_D.autopager.enable;
	$('SITEINFO_D-a_force_enable').checked = SITEINFO_D.autopager.force_enable;
	$('excludes').value = prefs.excludes;
	$('custom_siteinfo').value = prefs.custom_siteinfo;

};

var isUpdating = true;
function checkUpdate(button) {
	if (isUpdating) {
		return;
	}

	button.innerHTML = '正在更新中...';
	button.disabled = 'disabled';

	var reset = function() {
		isUpdating = false;
		button.innerHTML = '马上更新';
		button.disabled = '';
	};

	GM_xmlhttpRequest({
		method: "GET",
		url: scriptInfo.metaUrl,
		onload: function(response) {
			var txt = response.responseText;
			var curVersion = scriptInfo.version;
			var latestVersion = txt.match(/@\s*version\s*([\d\.]+)\s*/i);
			if (latestVersion) {
				latestVersion = latestVersion[1];
			} else {
				alert('解析版本号错误');
				return;
			}

			//对比版本号
			var needUpdate;
			var latestVersions = latestVersion.split('.');
			var lVLength = latestVersions.length;
			var currentVersion = curVersion.split('.');
			var cVLength = currentVersion.length;
			var lV_x;
			var cV_x;
			for (var i = 0; i < lVLength; i++) {
				lV_x = Number(latestVersions[i]);
				cV_x = (i >= cVLength) ? 0 : Number(currentVersion[i]);
				if (lV_x > cV_x) {
					needUpdate = true;
					break;
				} else if (lV_x < cV_x) {
					break;
				}
			}

			if (needUpdate) {
				alert('本脚本从版本 ' + scriptInfo.version + '  更新到了版本 ' + latestVersion + '.\n请点击脚本主页进行安装');
				document.getElementById("sp-prefs-homepageURL").boxShadow = '0 0 2px 2px #FF5555';
			}

			reset();
		}
	});

	setTimeout(reset, 30 * 1000);
}
