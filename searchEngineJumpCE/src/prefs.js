
loadPrefs();

function loadPrefs() {
	prefs.openInNewTab = GM_getValue('openInNewTab', prefs.openInNewTab);
	prefs.debug = GM_getValue('debug', prefs.debug);
	prefs.hideEnglineLabel = GM_getValue('hideEnglineLabel', prefs.hideEnglineLabel);
	engineListDataStr = GM_getValue('engineList', engineListDataStr);
}

function openPrefs(){
    var d = document;
    var on = function(node, e, f) {
        node.addEventListener(e, f, false);
    };

    var $ = function(s) { return d.getElementById('sej-prefs-'+s); };
    if($('setup')) return;

    var styleNode = GM_addStyle('\
        #sej-prefs-setup { position:fixed;z-index:2147483647;top:38px;right:60px;padding:20px 30px;background:#eee;width:500px;border:1px solid black; }\
        #sej-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
        #sej-prefs-setup a { color:black;text-decoration:underline; }\
        #sej-prefs-setup div { text-align:center;font-weight:bold;font-size:14px; }\
        #sej-prefs-setup ul { margin:15px 0 0 0;padding:0;list-style:none;background:#eee;border:0; }\
        #sej-prefs-setup input, #sej-prefs-setup select { border:1px solid gray;padding:2px;background:white; }\
        #sej-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
        #sej-prefs-setup textarea { width:98%; height:60px; margin:3px 0; }\
        #sej-prefs-setup button { padding: 1px 6px; font-size: 12px; margin-right: 3px; }\
        #sej-prefs-setup #top-buttons{background:none repeat scroll 0 0 #fff;display:block;position:absolute;top:-35px;border-right:12px solid #e0e0e0;border-top:12px solid #e0e0e0;border-left:12px solid #e0e0e0;text-align:center}\
    ');

    var div = d.createElement('div');
    div.id = 'sej-prefs-setup';
    d.body.appendChild(div);
    div.innerHTML = '\
    	<div id="top-buttons">\
    		<button id="sej-prefs-ok" title="需要刷新页面才能生效">√ 确定</button>\
    		<button id="sej-prefs-cancel" title="取消本次设定，所有选项还原">X 取消</button>\
    	</div>\
        <div>SearchEngineJumpCE 设置</div>\
            <ul>\
            	<li><input type="checkbox" id="sej-prefs-openInNewTab" /> 在新页面打开</li>\
                <li><input type="checkbox" id="sej-prefs-debug" /> 调试模式</li>\
                <li>\
                	是否隐藏前几个搜索的文字部分\
                	<select id="sej-prefs-hideEnglineLabel" >\
                		<option value="0">不隐藏</option>\
                		<option value="1">根据高度自行判断</option>\
                		<option value="2">隐藏</option>\
                	</select>\
                </li>\
                <li>自定义搜索列表：\
                    <div>\
                    	<textarea id="sej-prefs-engineList" style="height: 400px;"></textarea>\
                    </div>\
                </li>\
            </ul>\
        ';
    div = null;

    var close = function() {
        if (styleNode) {
            styleNode.parentNode.removeChild(styleNode);
        }
        var div = $('setup');
        div.parentNode.removeChild(div);
    };

    on($('ok'), 'click', function(){
    	GM_setValue('openInNewTab', prefs.openInNewTab = !!$('openInNewTab').checked);
    	GM_setValue('debug', prefs.debug = !!$('debug').checked);
    	GM_setValue('hideEnglineLabel', prefs.hideEnglineLabel = $('hideEnglineLabel').value);
    	GM_setValue('engineList', engineListDataStr = $('engineList').value);

        close();
    });

    on($('cancel'), 'click', close);

    $('debug').checked = prefs.debug;
    $('openInNewTab').checked = prefs.openInNewTab;
    $('hideEnglineLabel').value = prefs.hideEnglineLabel;
    $('engineList').value = engineListDataStr.trim();
};