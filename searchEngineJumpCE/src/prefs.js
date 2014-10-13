
loadPrefs();

function loadPrefs() {
    prefs.openInNewTab = GM_getValue('openInNewTab', prefs.openInNewTab);
    prefs.debug = GM_getValue('debug', prefs.debug);
    prefs.hideEnglineLabel = GM_getValue('hideEnglineLabel', prefs.hideEnglineLabel);
    prefs.engineListDataType = GM_getValue('engineListDataType', prefs.engineListDataType);

    engineListData.custom = GM_getValue('engineList') || '';
}

function openPrefs(){
    var d = document;
    var on = function(node, e, f) {
        node.addEventListener(e, f, false);
    };

    var $ = function(s) { return d.getElementById('sej-prefs-'+s); };
    if($('setup')) return;

    var styleNode = GM_addStyle('\
        #sej-prefs-setup { position:fixed;z-index:2147483647;top:38px;right:60px;padding:20px 30px 10px;background:#eee;width:500px;border:1px solid black; }\
        #sej-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
        #sej-prefs-setup i { font-family: "微软雅黑", arial; }\
        #sej-prefs-setup a { color:black;text-decoration:underline; }\
        #sej-prefs-setup div { text-align:center;font-size:14px; }\
        #sej-prefs-title { font-weight:bold; }\
        #sej-prefs-setup ul { margin:15px 0 0 0;padding:0;list-style:none;background:#eee;border:0; }\
        #sej-prefs-setup input, #sej-prefs-setup select { border:1px solid gray;padding:2px;background:white; }\
        #sej-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
        #sej-prefs-setup textarea { width:98%; height:60px; margin:3px 0; }\
        #sej-prefs-setup button { padding: 1px 6px; font-size: 12px; margin-right: 3px; }\
        #sej-prefs-setup #top-buttons{background:none repeat scroll 0 0 #fff;display:block;position:absolute;top:-35px;border-right:12px solid #e0e0e0;border-top:12px solid #e0e0e0;border-left:12px solid #e0e0e0;text-align:center}\
        #sej-prefs-setup img { display: initial; }\
        #sej-prefs-minitip { position: absolute; background: #ff9; border: 1px solid #F96; padding: 10px; left: -400px; top: 200px; right: 570px; }\
        #sej-prefs-minitip p { margin: 5px 5px; }\
        #sej-prefs-minitip span { color: green; }\
    ');

    var div = d.createElement('div');
    div.id = 'sej-prefs-setup';
    d.body.appendChild(div);
    div.innerHTML = '\
        <div id="top-buttons">\
            <button id="sej-prefs-ok" title="需要刷新页面才能生效">√ 确定</button>\
            <button id="sej-prefs-cancel" title="取消本次设定，所有选项还原">X 取消</button>\
        </div>\
        <div id="sej-prefs-title">SearchEngineJumpCE 设置</div>\
        <ul>\
            <li><input type="checkbox" id="sej-prefs-openInNewTab" /> 在新页面打开</li>\
            <li><input type="checkbox" id="sej-prefs-debug" /> 调试模式</li>\
            <li>\
                前几个搜索的文字部分：\
                <select id="sej-prefs-hideEnglineLabel" >\
                    <option value="0">不隐藏</option>\
                    <option value="1">根据高度自行判断</option>\
                    <option value="2">隐藏</option>\
                </select>\
            </li>\
            <li>\
                搜索列表版本：\
                <select id="sej-prefs-engineListDataType" >\
                    <option value="custom">用户版本</option>\
                    <option value="normal">作者版本</option>\
                    <option value="simple">极简版本</option>\
                    <option value="wenke">文科版本</option>\
                </select>\
                <a style="margin-left: 20px;" target="_blank" href="https://greasyfork.org/zh-CN/scripts/5316/feedback" title="通过反馈给作者加入你的版本">加入你的版本？</a>\
            </li>\
            <li>自定义搜索列表：\
                <img id="sej-prefs-engineList-tip" class="minitipicon" src="data:image/gif;base64,R0lGODlhDAAMAKIAALGXVv////7+/dPGn+zm1bqjadHDm/r49CH5BAAAAAAALAAAAAAMAAwAQAM1GCFkVYYIRYC9uFm1gzXC0HHAIBQYaRXBIQLkcCguZslBBXu7RaApHgCSsoFevdtk0XhElgkAOw==" />\
                <div>\
                    <textarea id="sej-prefs-engineList" style="height: 350px;"></textarea>\
                </div>\
            </li>\
        </ul>\
        <div id="sej-prefs-minitip" style="display: none;">' +
            introduceToHtml() + '\
        </div>\
    ';
    div = null;

    var engineListType_sel = $('engineListDataType'),
        engineList_txt = $('engineList');

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
        GM_setValue('engineListDataType', prefs.engineListDataType = engineListType_sel.value);

        if (engineListType_sel.value == 'custom') {
            GM_setValue('engineList', engineListData.custom = engineList_txt.value);
        }

        // 刷新工具条
        remove();
        run();

        close();
    });

    on($('cancel'), 'click', close);

    $('engineList-tip').onclick = function() {
        var minitip = $('minitip');
        minitip.style.display = (minitip.style.display == 'block') ? 'none' : 'block';
    };

    engineListType_sel.onchange = function() {
        engineList_txt.value = engineListData[engineListType_sel.value].trim();
    };

    $('debug').checked = prefs.debug;
    $('openInNewTab').checked = prefs.openInNewTab;
    $('hideEnglineLabel').value = prefs.hideEnglineLabel;
    engineListType_sel.value = prefs.engineListDataType;

    engineList_txt.value = engineListData[prefs.engineListDataType].trim();
};
