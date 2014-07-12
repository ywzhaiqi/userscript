
var UI = {
    tpl_footer_nav: '\
        <div class="chapter-footer-nav">\
            <a class="prev-page" href="{prevUrl}">上一页</a> | \
            <a class="index-page" href="{indexUrl}" title="Enter 键打开目录">目录</a> | \
            <a class="next-page" style="color:{theEndColor}" href="{nextUrl}">下一页</a>\
        </div>\
        '.uiTrans(),
    skins: {},

    init: function(){
        UI.refreshMainStyle();

        UI.refreshSkinStyle(Config.skin_name, true);

        UI.refreshExtraStyle(Config.extra_css);

        UI.fixMobile();

        // 初始化是否隐藏
        if(Config.hide_footer_nav){
            UI.hideFooterNavStyle(true);
        }

        // UI.toggleQuietMode();  // 初始化安静模式
        UI.hideMenuList(Config.menu_list_hiddden);  // 初始化章节列表是否隐藏
        UI.hidePreferencesButton(Config.hide_preferences_button);  // 初始化设置按钮是否隐藏
    },
    refreshMainStyle: function(){
        if(UI.mainStyle){
            $(UI.mainStyle).remove();
        }

        UI.mainStyle = GM_addStyle(
            Res.CSS_MAIN
                .replace("{font_family}", Config.font_family)
                .replace("{font_size}", Config.font_size)
                .replace("{title_font_size}", UI.calcTitleFontSize(Config.font_size))
                .replace("{content_width}", Config.content_width)
                .replace("{text_line_height}", Config.text_line_height)
                .replace("{menu-bar-hidden}", Config.menu_bar_hidden ? "display:none;" : "")
        );
    },
    hideFooterNavStyle: function(hidden){
        var navStyle = $("#footer_nav_css");
        if(hidden) {
            if(navStyle.length === 0) {
                $('<style>')
                    .attr("id", "footer_nav_css")
                    .text(".chapter-footer-nav { display: none; }")
                    .appendTo('head');
            }
        } else {
            navStyle.remove();
        }
    },
    hideMenuList: function(hidden){
        if(typeof(hidden) === "undefined"){
            hidden = !UI.menu_list_hiddden;
        }

        if(hidden){
            App.$menu.addClass('hidden');
            App.$content.css("margin-left", "");
        }else{
            App.$menu.removeClass('hidden');
            App.$content.css("margin-left", "320px");
        }
        UI.menu_list_hiddden = hidden;
    },
    hidePreferencesButton: function(hidden) {
        hidden = _.isUndefined(hidden) ? Config.hide_preferences_button : hidden;
        
        App.$preferencesBtn.toggle(!hidden);
    },
    hideMenuBar: function(hidden) {
        hidden = _.isUndefined(hidden) ? Config.menu_bar_hidden : hidden;
        
        App.$menuBar.toggle(!hidden);
    },
    refreshSkinStyle: function(skin_name, isFirst){
        var style = $("#skin_style");
        if(style.length === 0){
            style = $('<style id="skin_style">').appendTo('head');
        }


        // 图片章节夜间模式会变的无法看
        if (isFirst && skin_name.indexOf('夜间'.uiTrans()) != -1 && Config.picNightModeCheck) {
            setTimeout(function(){
                var img = $('#mynovelreader-content img')[0];
                // console.log(img.width, img.height)
                if (img && img.width > 500 && img.height > 1000) {
                    style.text(UI.skins['缺省皮肤'.uiTrans()]);
                    return;
                }
            }, 200);
        }

        style.text(UI.skins[skin_name]);
    },
    refreshExtraStyle: function(css){
        var style = $("#extra_style");
        if(style.length === 0){
            style = $('<style id="extra_style">').appendTo('head');
        }

        style.text(css);
    },
    toggleQuietMode: function() {
        this._isQuietMode = !this._isQuietMode;
        var selector = '#menu-bar, #menu, #preferencesBtn, .readerbtn';

        if (this.$_quietStyle) {
            this.$_quietStyle.remove();
        }

        if (this._isQuietMode) {
            $(selector).addClass("quiet-mode");

            // 隐藏滚动条
            this.$_quietStyle = $('<style>')
                .text('scrollbar {visibility:collapse !important; } body {overflow: hidden !important; overflow-x: hidden !important;}')
                .appendTo('head');
        } else {
            $(selector).removeClass("quiet-mode");
        }

    },
    addButton: function(){
        GM_addStyle('\
            .readerbtn {\
                position: fixed;\
                right: 10px;\
                bottom: 10px;\
                z-index: 1597;\
                padding: 20px 5px;\
                width: 50px;\
                height: 20px;\
                line-height: 20px;\
                text-align: center;\
                border: 1px solid;\
                border-color: #888;\
                border-radius: 50%;\
                background: rgba(0,0,0,.5);\
                color: #FFF;\
                font: 12px/1.5 "微软雅黑","宋体",Arial;\
                cursor: pointer;\
            }\
        ');

        $("<div>")
            .addClass("readerbtn")
            .html(App.isEnabled ? "退出".uiTrans() : "阅读模式".uiTrans())
            .mousedown(function(event){
                if(event.which == 1){
                    App.toggle();
                }else if(event.which == 2){
                    event.preventDefault();
                    L_setValue("mynoverlreader_disable_once", true);

                    var url = App.activeUrl || App.curPageUrl;
                    App.openUrl(url);
                }
            })
            .appendTo('body');
    },
    calcTitleFontSize: function(contentFontSizeStr){
        var m = contentFontSizeStr.match(/([\d\.]+)(px|em|pt)/);
        if(m) {
            var size = m[1],
                type = m[2];
            return parseInt(size, 10) * 1.88 + type;
        }

        return "";
    },
    fixMobile: function(){  // 自适应网页设计
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1");
        document.head.appendChild(meta);
    },
    preferencesShow: function(event){
        if($("#reader_preferences").length){
            return;
        }

        this._loadBlocker();

        UI.$prefs = $('<div id="reader_preferences">')
            .css('cssText', 'position:fixed; top:12%; left:30%; width:500px; z-index:30000;')
            .append(
                $('<style>').text(Res.preferencesCSS))
            .append(
                $('<div class="body">').html(Res.preferencesHTML))
            .appendTo("body");

        UI.preferencesLoadHandler();
    },
    _loadBlocker: function() {
        if (UI.$blocker == null) {
            UI.$blocker = $('<div>').attr({
                id: 'uil_blocker',
                style: 'position:fixed;top:0px;left:0px;right:0px;bottom:0px;background-color:#000;opacity:0.5;z-index:10000;'
            }).appendTo($('body'));
        }
    },
    hide: function(){
        if(UI.$prefs) UI.$prefs.remove();
        if(UI.$blocker) UI.$blocker.remove();
        UI.$prefs = null;
        UI.$blocker = null;
    },
    preferencesLoadHandler: function(){
        var $form = $("#preferences");

        // checkbox
        $form.find("#enable-cn2tw").get(0).checked = Config.cn2tw;
        $form.find("#disable-auto-launch").get(0).checked = Config.getDisableAutoLaunch();
        $form.find("#booklink-enable").get(0).checked = Config.booklink_enable;
        $form.find("#debug").get(0).checked = Config.debug;
        $form.find("#quietMode").get(0).checked = Config.isQuietMode;
        $form.find("#pic-nightmode-check").get(0).checked = Config.picNightModeCheck;
        $form.find("#copyCurTitle").get(0).checked = Config.copyCurTitle;

        $form.find("#hide-menu-list").get(0).checked = Config.menu_list_hiddden;
        $form.find("#hide-menu-bar").get(0).checked = Config.menu_bar_hidden;
        $form.find("#hide-footer-nav").get(0).checked = Config.hide_footer_nav;
        $form.find("#hide-preferences-button").get(0).checked = Config.hide_preferences_button;
        $form.find("#add-nextpage-to-history").get(0).checked = Config.addToHistory;
        $form.find("#enable-dblclick-pause").get(0).checked = Config.dblclickPause;

        $form.find("#font-family").get(0).value = Config.font_family;
        $form.find("#font-size").get(0).value = Config.font_size;
        $form.find("#content_width").get(0).value = Config.content_width;
        $form.find("#text_line_height").get(0).value = Config.text_line_height;

        $form.find("#remain-height").get(0).value = Config.remain_height;
        $form.find("#extra_css").get(0).value = Config.extra_css;
        $form.find("#custom_siteinfo").get(0).value = Config.customSiteinfo;
        $form.find("#custom_replace_rules").get(0).value = Config.customReplaceRules;

        // 界面语言
        var $lang = $form.find("#lang");
        $("<option>").text("zh-CN").appendTo($lang);
        $("<option>").text("zh-TW").appendTo($lang);
        $lang.val(Config.lang).change(function(){
            var key = $(this).find("option:selected").text();
            Config.lang = key;
        });

        // 皮肤
        var $skin = $form.find("#skin");
        for(var key in UI.skins){
            $("<option>").text(key).appendTo($skin);
        }
        $skin.val(Config.skin_name).change(function(){
            var key = $(this).find("option:selected").text();
            UI.refreshSkinStyle(key);
            Config.skin_name = key;
        });

        // 字体大小等预览
        var preview = _.debounce(function(){
            switch(this.id){
                case "font-size":
                    var titleFontSize = UI.calcTitleFontSize(this.value);
                    if(titleFontSize) {
                        App.$content.css("font-size", this.value);
                        App.$content.find("h1").css("font-size", titleFontSize);
                    }
                    break;
                case "font-family":
                    App.$content.css("font-family", this.value);
                    break;
                case "content_width":
                    App.$content.css("width", this.value);
                    break;
                case "text_line_height":
                    App.$content.css("line-height", this.value);
                    break;
                default:
                    break;
            }
            // UI.refreshMainStyle();
        }, 300);
        $form.on("input", "input", preview);

        // 初始化设置按键
        $form.find("#quietModeKey").get(0).value = Config.quietModeKey;
        $form.find("#openPreferencesKey").get(0).value = Config.openPreferencesKey;
        $form.find("#setHideMenuListKey").get(0).value = Config.hideMenuListKey;

        // 点击事件
        $form.on('click', 'input:checkbox, input:button', function(event){
            UI.preferencesClickHandler(event.target);
        });
    },
    preferencesClickHandler: function(target){
        switch (target.id) {
            case 'close_button':
                UI.preferencesCloseHandler();
                break;
            case 'save_button':
                UI.preferencesSaveHandler();
                break;
            case 'debug':
                debug = target.checked ? console.log.bind(console) : function() {};
                break;
            case 'quietMode':
                UI.toggleQuietMode(target.checked);
                break;
            case 'hide-menu-list':
                UI.hideMenuList(target.checked);
                break;
            case 'hide-preferences-button':
                UI.hidePreferencesButton(target.checked);
                if (target.checked) {
                    alert('隐藏后通过快捷键或 Greasemonkey 用户脚本命令处调用'.uiTrans());
                }
                break;
            case 'hide-menu-bar':
                UI.hideMenuBar(target.checked);
                break;
            case 'hide-footer-nav':
                break;
            case 'quietModeKey':
                var key = prompt('请输入打开设置的快捷键：'.uiTrans(), Config.quietModeKey);
                if (key) {
                    Config.quietModeKey = key;
                    $(target).val(key);
                }
                break;
            case 'openPreferencesKey':
                var key = prompt('请输入打开设置的快捷键：'.uiTrans(), Config.openPreferencesKey);
                if (key) {
                    Config.openPreferencesKey = key;
                    $(target).val(key);
                }
                break;
            case 'setHideMenuListKey':
                var key = prompt('请输入切换左侧章节列表的快捷键：'.uiTrans(), Config.hideMenuListKey);
                if (key) {
                    Config.hideMenuListKey = key;
                    $(target).val(key);
                }
                break;
            default:
                break;
        }
    },
    preferencesCloseHandler: function(){
        // App.$content.removeAttr("style");
        App.$content.find("h1").css("font-size", "");

        UI.hide();
    },
    preferencesSaveHandler: function(){
        var $form = $("#preferences");

        var form = document.getElementById('preferences');

        Config.setDisableAutoLaunch(form.elements.namedItem("disable-auto-launch").checked)

        Config.cn2tw = $form.find("#enable-cn2tw").get(0).checked;
        Config.booklink_enable = $form.find("#booklink-enable").get(0).checked;
        Config.isQuietMode = $form.find("#quietMode").get(0).checked;
        Config.debug = $form.find("#debug").get(0).checked;
        Config.picNightModeCheck = $form.find("#pic-nightmode-check").get(0).checked;
        Config.setCopyCurTitle($form.find("#copyCurTitle").get(0).checked);

        Config.addToHistory = $form.find("#add-nextpage-to-history").get(0).checked;
        Config.dblclickPause = $form.find("#enable-dblclick-pause").get(0).checked;

        var skinName = $form.find("#skin").find("option:selected").text();
        Config.skin_name = skinName;
        UI.refreshSkinStyle(skinName);

        Config.font_family = $form.find("#font-family").get(0).value;
        App.$content.css("font-family", Config.font_family);

        Config.font_size = $form.find("#font-size").get(0).value;
        Config.text_line_height = $form.find("#text_line_height").get(0).value;
        Config.content_width = $form.find("#content_width").get(0).value;
        Config.remain_height = $form.find("#remain-height").get(0).value;

        Config.menu_list_hiddden = $form.find("#hide-menu-list").get(0).checked;
        UI.hideMenuList(Config.menu_list_hiddden);

        Config.menu_bar_hidden = $form.find("#hide-menu-bar").get(0).checked;
        Config.hide_footer_nav = $form.find("#hide-footer-nav").get(0).checked;
        Config.hide_preferences_button = $form.find("#hide-preferences-button").get(0).checked;

        var css = $form.find("#extra_css").get(0).value;
        UI.refreshExtraStyle(css);
        Config.extra_css = css;

        Config.customSiteinfo = $form.find("#custom_siteinfo").get(0).value;
        Config.customReplaceRules = $form.find("#custom_replace_rules").get(0).value;

        UI.hide();
    },
    openHelp: function() {

    },
    notice: function (htmlText){
        var $noticeDiv = $("#alert");

        clearTimeout(UI.noticeDivto);
        $noticeDiv.find("p").html(htmlText);
        $noticeDiv.fadeIn("fast");

        UI.noticeDivto = setTimeout(function(){
            $noticeDiv.fadeOut(500);
        },1666);

        return $noticeDiv;
    }
};

UI.skins["缺省皮肤".uiTrans()] = "";
UI.skins["暗色皮肤".uiTrans()] = "body { color: #666; background: rgba(0;0;0;.1); }\
                .title { color: #222; }";
UI.skins["白底黑字".uiTrans()] = "body { color: black; background: white;}\
                .title { font-weight: bold; border-bottom: 0.1em solid; margin-bottom: 1.857em; padding-bottom: 0.857em;}";
UI.skins["夜间模式".uiTrans()] = "body { color: #e3e3e3; background: #2d2d2d; } #preferencesBtn { background: white; }";
UI.skins["夜间模式2".uiTrans()] = "body { color: #679; background: black; } #preferencesBtn { background: white; }";
UI.skins["橙色背景".uiTrans()] = "body { color: #24272c; background: #FEF0E1; }";
UI.skins["绿色背景".uiTrans()] = "body { color: black; background: #d8e2c8; }";
UI.skins["绿色背景2".uiTrans()] = "body { color: black; background: #CCE8CF; }";
UI.skins["蓝色背景".uiTrans()] = "body { color: black; background: #E7F4FE; }";
UI.skins["棕黄背景".uiTrans()] = "body { color: black; background: #C2A886; }";
UI.skins["经典皮肤".uiTrans()] = "body { color: black; background-color: #EAEAEE; } .title { background: #f0f0f0; }";


var fontawesomeWoff = GM_getResourceURL('fontawesomeWoff');
if (!fontawesomeWoff || fontawesomeWoff.length < 10) {
    fontawesomeWoff = "http://libs.baidu.com/fontawesome/4.0.3/fonts/fontawesome-webfont.woff?v=4.0.3";
} else if (isChrome) {
    fontawesomeWoff = "data:font/woff;charset=utf-8;base64," + fontawesomeWoff;
}


var Res = {
    CSS_MAIN: function() {
        /*
        @font-face {
            font-family: "FontAwesome";
            src: url({fontawesomeWoff});
            font-weight: normal;
            font-style: normal;
        }
        body > a { display:none !important; }
        .hidden {
            display: none;
        }
        .quiet-mode {
            display: none;
        }
        body {
            background: #F3F2EE;
            color: #1F0909;
            padding: 0px;
            margin: 0px;
            font-family: "Microsoft YaHei UI", 微软雅黑, 新宋体, 宋体, arial;
        }
        a { color: #065488; }
        a:link { text-decoration: none; }
        #mynovelreader-content {
            width: {content_width};
            font-size: {font_size};
            font-family: {font_family};
            line-height: {text_line_height};
            margin-left:auto;
            margin-right:auto;
            padding-bottom: 15px;
        }
        article {
            margin-top: 55px;
            word-wrap: break-word;
        }
        article h1 {
            clear: both;
            line-height: 50px;
            font-size: {title_font_size};
            font-weight: normal;
            margin: 25px -20px;
            padding: 0 20px 10px;
            border-bottom: 1px solid rgba(0,0,0,.25);
            font-weight: normal;
            text-transform: none;
        }
        .chapter-footer-nav {
            text-align:center;
            font-size:0.9em;
            margin:-10px 0px 30px 0px;
        }
        #loading {
            color: white;
            text-align: center;
            font: 12px "微软雅黑", "宋体", "Times New Roman", "Verdana";
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
            width: 376px;
            height: 32px;
            line-height: 32px;
            border-radius: 20px;
            border: 1px solid #666;
            background-color: #333;
        }
        #loading img {
            vertical-align: middle;
        }
        #loading a {
            color: white;
        }
        #preferencesBtn{
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1597;
        }
        #alert {
            position: fixed;
            z-index: 100;
            float: auto;
            width: auto;
            height: auto;
            top: 10px;
            left: 500px;
            background: rgba(215, 240, 253, 0.65);
            color: #2d7091;
            border: 1px solid rgba(45,112,145,0.3);
            border-radius: 4px;
            text-shadow: 0 1px 0 #fff;
        }
        #alert p {
            font-size: 13px;
            margin: 6px;
        }
        img.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}
        #menu-bar {
            border: solid rgba(0, 100, 255, .9);
            border-width: 3px 2px 3px 0px;
            position: fixed;
            left: 0px;
            top: 40%;
            height: 100px;
            width: 2px;
            z-index: 199;
            {menu-bar-hidden}
        }
        #menu {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            width: 270px;
            max-width: 100%;
            background: #333;
            overflow-y: auto;
        }
        #menu:after {
            content: "";
            display: block;
            position: absolute;
            top: 46px;
            bottom: 0;
            right: 0;
            width: 1px;
            background: rgba(0,0,0,0.6);
            box-shadow: 0 0 5px 2px rgba(0,0,0,0.6);
        }
        #header{
            color: #777;
            margin-top: 0;
            border-top: 1px solid rgba(0,0,0,0.3);
            background: #404040;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
            text-shadow: 0 1px 0 rgba(0,0,0,0.5);
            padding: 10px 12px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 20px;
        }
        #header a {
            color: #777777;
        }
        #divider {
            position: relative;
            z-index: 300;
            border-top: 1px solid rgba(255,255,255,0.01);
            border-bottom: 1px solid rgba(0,0,0,0.3);
            margin: 0;
            height: 4px;
            background: rgba(0,0,0,0.2);
            box-shadow: 0 1px 0 rgba(255,255,255,0.05), inset 0 1px 3px rgba(0,0,0,0.3);
        }
        #chapter-list {
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 200;
            margin: 0;
            padding: 0;
            cursor: pointer;
            list-style: none;
            overflow-y: auto;
        }
        .chapter {
            list-style: none;
        }
        .chapter:last-child {
            border-bottom: 1px solid rgba(0,0,0,0.3);
            box-shadow: 0 1px 0 rgba(255,255,255,0.05);
        }
        .chapter div {
            color: #ccc;
            font-size: 15px;
            padding: 8px 20px;
            border-top: 1px solid rgba(0,0,0,0.3);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
            text-shadow: 0 1px 0 rgba(0,0,0,0.5);
            display: block;
            text-decoration: none;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
        }
        .chapter div:before {
            content: "\f105";
            width: 20px;
            margin-left: -10px;
            float: left;
            font-family: "FontAwesome";
            text-align: center;
        }
        .chapter div:hover {
            background: #404040;
            color: #fff;
            outline: 0;
        }
        .chapter.active div {
            background: #1a1a1a;
            color: #fff;
            font-size: 16px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
        }
        ::-webkit-scrollbar {
            height: 9px !important;
            width: 9px !important;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #7D7D7D !important;
            border-radius: 3px !important;
        }
        ::-webkit-scrollbar-track-piece {
            background-color: rgba(0,0,0,.25) !important;
        }
         */
    }.getMStr().replace('{fontawesomeWoff}', fontawesomeWoff),
    preferencesHTML: function(){
        /*
        <form id="preferences" name="preferences">
            <div id="setting_table1">
                <span id="top-buttons">
                    <input title="部分选项需要刷新页面才能生效" id="save_button" value="√ 确认" type="button">
                    <input title="取消本次设定，所有选项还原" id="close_button" value="X 取消" type="button">
                </span>
                <div class="form-row">
                    <label>
                        界面语言<select id="lang">
                        </select>
                    </label>
                    <label title="将小说网页文本转换为繁体。\n\n注意：内置的繁简转换表，只收录了简单的单字转换，启用本功能后，如有错误转换的情形，请利用脚本的自订字词取代规则来修正。\n例如：「千里之外」，会错误转换成「千里之外」，你可以加入规则「千里之外=千里之外」来自行修正。">
                        <input type="checkbox" id="enable-cn2tw" name="enable-cn2tw"/>网页：转繁体
                    </label>
                    <label id="quietMode" class="right" title="隐藏其他，只保留正文，适用于全屏状态下">
                        <input class="key" type="button" id="quietModeKey"/>安静模式
                    </label>
                </div>
                <div class="form-row">
                    <label title="不影响 booklink.me 的启用">
                        <input type="checkbox" id="disable-auto-launch" name="disable-auto-launch"/>强制手动启用
                    </label>
                    <label title="booklink.me 点击的网站强制启用">
                        <input type="checkbox" id="booklink-enable" name="booklink-enable"/>booklink 自动启用
                    </label>
                    <label>
                        <input type="checkbox" id="debug" name="debug"/>调试模式
                    </label>
                    <a href="https://greasyfork.org/scripts/292-my-novel-reader/feedback" target="_blank">反馈地址</a>
                </div>
                <div class="form-row">
                    <label title="图片章节用夜间模式没法看，这个选项在启动时会自动切换到缺省皮肤">
                        <input type="checkbox" id="pic-nightmode-check" name="pic-nightmode-check"/>
                        夜间模式的图片章节检测
                    </label>
                    <label>
                        <input type="checkbox" id="copyCurTitle"/>
                        打开目录复制当前标题
                    </label>
                </div>
                <div class="form-row">
                    <label title="通过快捷键切换">
                        <input type="checkbox" id="hide-menu-list"/>隐藏左侧章节列表
                    </label>
                    <label>
                        <input type="checkbox" id="hide-footer-nav"/>隐藏底部导航栏
                    </label>
                </div>
                <div class="form-row">
                    <label>
                        <input type="checkbox" id="hide-menu-bar"/>隐藏左侧导航条
                    </label>
                    <input class="key" type="button" id="setHideMenuListKey" />
                    <label title="通过快捷键切换或在 Greasemonkey 用户脚本命令处打开设置窗口">
                        <input type="checkbox" id="hide-preferences-button"/>隐藏设置按钮
                    </label>
                    <input class="key" type="button" id="openPreferencesKey"/>
                </div>
                <div class="form-row">
                    <label>
                        距离底部
                        <input type="textbox" id="remain-height" name="remain-height" size="5"/>
                        px 加载下一页
                    </label>
                    <label>
                        <input type="checkbox" id="add-nextpage-to-history"/>添加下一页到历史记录
                    </label>
                    <label>
                        <input type="checkbox" id="enable-dblclick-pause"/>双击暂停翻页
                    </label>
                </div>
                <div class="form-row">
                    <label>
                        <select id="skin">
                        </select>
                    </label>
                    <label>
                        字体
                        <input type="textbox" id="font-family" style="width:250px;"/>
                    </label>
                    <br/><br/>
                    <label>
                        字体大小
                        <input type="textbox" id="font-size" name="font-size" size="6"/>
                    </label>
                    <label>
                        行高
                        <input type="textbox" id="text_line_height" size="6"/>
                    </label>
                    <label>
                        行宽
                        <input type="textbox" id="content_width" size="6"/>
                    </label>
                </div>
                <div class="form-row">
                    <div class="prefs_title">自定义样式</div>
                    <textarea id="extra_css" class="prefs_textarea" placeholder="自定义样式"></textarea>
                </div>
            </div>
            <div id="setting_table2">
                <div class="form-row" title="详见脚本代码的 Rule.specialSite">
                    <div class="prefs_title">自定义站点规则</div>
                    <textarea id="custom_siteinfo" class="prefs_textarea" placeholder="自定义站点规则" />
                </div>
                <div class="form-row" title="一行一个，每行的第一个 = 为分隔符。\n需要刷新页面生效">
                    <div class="prefs_title">自定义替换规则</div>
                    <textarea id="custom_replace_rules" class="prefs_textarea" placeholder="b[āà]ng=棒" />
                </div>
            </div>
        </form>
         */
    }.getMStr().uiTrans().replace(/\\n/g, '\n'),
    preferencesCSS: function(){
        /*
        .body {
             color:#333;
             margin: 0 auto;
             background: white;
             padding: 10px;
             height: 420px;
             overflow-y: auto;
         }
         #top-buttons {
             background: none repeat scroll 0% 0% rgb(255, 255, 255);
             display: block;
             position: absolute;
             top: -35px;
             border-right: 12px solid rgb(224, 224, 224);
             border-top: 12px solid rgb(224, 224, 224);
             border-left: 12px solid rgb(224, 224, 224);
             text-align: center;
         }
         input {
             font-size: 12px;
             margin-right: 3px;
             vertical-align: middle;
         }
         .form-row {
             overflow: hidden;
             padding: 8px 12px;
             margin-top: 3px;
             font-size: 11px;
         }
         .form-row label {
             padding-right: 10px;
         }
         .form-row input {
             vertical-align: middle;
             margin-top: 0px;
         }
         textarea, .form-row input {
             padding: 2px 4px;
             border: 1px solid #e5e5e5;
             background: #fff;
             border-radius: 4px;
             color: #666;
             -webkit-transition: all linear .2s;
             transition: all linear .2s;
         }
         textarea {
             width: 100%;
             overflow: auto;
             vertical-align: top;
         }
         textarea:focus, input:focus {
             border-color: #99baca;
             outline: 0;
             background: #f5fbfe;
             color: #666;
         }
         .prefs_title {
             font-size: 12px;
             font-weight: bold;
         }
         .prefs_textarea {
             font-size: 12px;
             margin-top: 5px;
             height: 100px;
         }
         .right {
            float: right;
         }
         */
    }.getMStr(),
};

