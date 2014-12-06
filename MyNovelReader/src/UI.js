
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

        // 初始变量
        UI.$menu = $('#menu');
        UI.$menuBar = $('#menu-bar');
        UI.$content = $('#mynovelreader-content');
        UI.$preferencesBtn = $('#preferencesBtn');

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
            UI.$menu.addClass('hidden');
            UI.$content.css("margin-left", "");
        }else{
            UI.$menu.removeClass('hidden');
            UI.$content.css("margin-left", "320px");
        }
        UI.menu_list_hiddden = hidden;
    },
    hidePreferencesButton: function(hidden) {
        hidden = _.isUndefined(hidden) ? Config.hide_preferences_button : hidden;

        UI.$preferencesBtn.toggle(!hidden);
    },
    hideMenuBar: function(hidden) {
        hidden = _.isUndefined(hidden) ? Config.menu_bar_hidden : hidden;

        UI.$menuBar.toggle(!hidden);
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
            this.$_quietStyle = null;
        }

        if (this._isQuietMode) {
            $(selector).addClass("quiet-mode");

            if (!isChrome) {  // firefox 下隐藏滚动条
                this.$_quietStyle = $('<style>')
                    .text('scrollbar {visibility:collapse !important; } body {overflow: hidden !important; overflow-x: hidden !important;}')
                    .appendTo('head');
            }
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
                z-index: 2247483648;\
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

        UI._loadBlocker();

        UI.$prefs = $('<div id="reader_preferences">')
            .css('cssText', 'position:fixed; top:12%; left:30%; width:500px; z-index:300000;')
            .append(
                $('<style>').text(Res.preferencesCSS))
            .append(
                $('<div class="body">').html(Res.preferencesHTML))
            .appendTo('body');

        UI.preferencesLoadHandler();
    },
    _loadBlocker: function() {
        UI.$blocker = $('<div>').attr({
            id: 'uil_blocker',
            style: 'position:fixed;top:0px;left:0px;right:0px;bottom:0px;background-color:#000;opacity:0.5;z-index:100000;'
        }).appendTo('body');
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
        $form.find("#hide-footer-nav").get(0).checked = Config.hide_footer_nav;
        $form.find("#hide-preferences-button").get(0).checked = Config.hide_preferences_button;
        $form.find("#add-nextpage-to-history").get(0).checked = Config.addToHistory;
        $form.find("#enable-dblclick-pause").get(0).checked = Config.dblclickPause;

        $form.find("#font-family").get(0).value = Config.font_family;
        $form.find("#font-size").get(0).value = Config.font_size;
        $form.find("#content_width").get(0).value = Config.content_width;
        $form.find("#text_line_height").get(0).value = Config.text_line_height;
        $form.find("#split_content").get(0).checked = Config.split_content;
        $form.find("#scroll_animate").get(0).checked = Config.scrollAnimate;

        $form.find("#remain-height").get(0).value = Config.remain_height;
        $form.find("#extra_css").get(0).value = Config.extra_css;
        $form.find("#custom_siteinfo").get(0).value = Config.customSiteinfo;
        UI._rules = $form.find("#custom_replace_rules").get(0).value = Config.customReplaceRules;

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
                        UI.$content.css("font-size", this.value);
                        UI.$content.find("h1").css("font-size", titleFontSize);
                    }
                    break;
                case "font-family":
                    UI.$content.css("font-family", this.value);
                    break;
                case "content_width":
                    UI.$content.css("width", this.value);
                    break;
                case "text_line_height":
                    UI.$content.css("line-height", this.value);
                    break;
                default:
                    break;
            }
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
        var key;
        switch (target.id) {
            case 'close_button':
                UI.preferencesCloseHandler();
                break;
            case 'save_button':
                UI.preferencesSaveHandler();
                break;
            case 'debug':
                Config.debug = !Config.debug;
                toggleConsole(Config.debug);
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
            case 'hide-footer-nav':
                break;
            case 'quietModeKey':
                key = prompt('请输入打开设置的快捷键：'.uiTrans(), Config.quietModeKey);
                if (key) {
                    Config.quietModeKey = key;
                    $(target).val(key);
                }
                break;
            case 'openPreferencesKey':
                key = prompt('请输入打开设置的快捷键：'.uiTrans(), Config.openPreferencesKey);
                if (key) {
                    Config.openPreferencesKey = key;
                    $(target).val(key);
                }
                break;
            case 'setHideMenuListKey':
                key = prompt('请输入切换左侧章节列表的快捷键：'.uiTrans(), Config.hideMenuListKey);
                if (key) {
                    Config.hideMenuListKey = key;
                    $(target).val(key);
                }
                break;
            // case 'saveAsTxt':
            //     Download.saveAsTxt();
            //     break;
            default:
                break;
        }
    },
    preferencesCloseHandler: function(){
        // UI.$content.removeAttr("style");
        UI.$content.find("h1").css("font-size", "");

        UI.hide();
    },
    preferencesSaveHandler: function(){
        var $form = $("#preferences");

        Config.setDisableAutoLaunch($form.find("#disable-auto-launch").get(0).checked);

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
        UI.$content.css("font-family", Config.font_family);

        Config.font_size = $form.find("#font-size").get(0).value;
        Config.text_line_height = $form.find("#text_line_height").get(0).value;
        Config.content_width = $form.find("#content_width").get(0).value;
        Config.remain_height = $form.find("#remain-height").get(0).value;
        Config.split_content = $form.find("#split_content").get(0).checked;
        Config.scrollAnimate = $form.find("#scroll_animate").get(0).checked;

        Config.menu_list_hiddden = $form.find("#hide-menu-list").get(0).checked;
        UI.hideMenuList(Config.menu_list_hiddden);

        Config.hide_footer_nav = $form.find("#hide-footer-nav").get(0).checked;
        Config.hide_preferences_button = $form.find("#hide-preferences-button").get(0).checked;

        var css = $form.find("#extra_css").get(0).value;
        UI.refreshExtraStyle(css);
        Config.extra_css = css;

        Config.customSiteinfo = $form.find("#custom_siteinfo").get(0).value;

        // 自定义替换规则直接生效
        var rules = $form.find("#custom_replace_rules").get(0).value;
        Config.customReplaceRules = rules;
        if (rules != UI._rules) {
            var contentHtml = App.oArticles.join('\n');
            if (rules) {
                // 转换规则
                rules = Rule.parseCustomReplaceRules(rules);
                // 替换
                contentHtml = Parser.prototype.replaceHtml(contentHtml, rules);
            }

            UI.$content.html(contentHtml);

            App.resetCache();

            UI._rules = rules;
        }

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
        }, 1666);

        return $noticeDiv;
    }
};

UI.skins["缺省皮肤".uiTrans()] = "";
UI.skins["暗色皮肤".uiTrans()] = "body { color: #666; background: rgba(0;0;0;.1); }\
                .title { color: #222; }";
UI.skins["白底黑字".uiTrans()] = "body { color: black; background: white;}\
                .title { font-weight: bold; border-bottom: 0.1em solid; margin-bottom: 1.857em; padding-bottom: 0.857em;}";
UI.skins["夜间模式".uiTrans()] = "body { color: #939392; background: #2d2d2d; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; }";
UI.skins["夜间模式1".uiTrans()] = "body { color: #679; background: black; } #preferencesBtn { background: white; }";
UI.skins["夜间模式2".uiTrans()] = "body { color: #e3e3e3; background: #2d2d2d; } #preferencesBtn { background: white; }";
// UI.skins["夜间模式（多看）".uiTrans()] = "body { color: #3A5056; background: #101819; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; }";
UI.skins["夜间模式（多看）".uiTrans()] = "body { color: #4A4A4A; background: #101819; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; }";
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
    CSS_MAIN: <%= res.mainCss %>
        .replace('{fontawesomeWoff}', fontawesomeWoff),

    preferencesHTML: <%= res.preferencesHTML %>
        .uiTrans().replace(/\\n/g, '\n'),

    preferencesCSS: <%= res.preferencesCSS %>,
};
