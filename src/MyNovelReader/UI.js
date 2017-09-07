import Setting from './Setting'
import config from './config'
import Parser from './parser'
import Rule from './rule'
import { toggleConsole, L_setValue, isChrome } from './lib'
import Res from './res'
import App from './app'

const SAVE_MESSAGE_NAME = 'userscript-MyNovelReader-Setting-Saved'

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
        $('<link rel="stylesheet" class="noRemove">')
            .attr('src', Res.CSS_FONT_AWESOME)
            .appendTo('head');

        UI.refreshMainStyle();

        UI.refreshSkinStyle(Setting.skin_name, true);

        UI.refreshExtraStyle(Setting.extra_css);

        UI.fixMobile();

        // 初始变量
        UI.$menu = $('#menu');
        UI.$menuBar = $('#menu-bar');
        UI.$content = $('#mynovelreader-content');
        UI.$preferencesBtn = $('#preferencesBtn');

        // 初始化是否隐藏
        if(Setting.hide_footer_nav){
            UI.hideFooterNavStyle(true);
        }

        // UI.toggleQuietMode();  // 初始化安静模式
        UI.hideMenuList(Setting.menu_list_hiddden);  // 初始化章节列表是否隐藏
        UI.hidePreferencesButton(Setting.hide_preferences_button);  // 初始化设置按钮是否隐藏

        // TODO: Greasemonkey 无效，unsafeWindow 也不行
        if (config.setting_load_by_message) {
            window.addEventListener('message', e => {
                if (e.data === SAVE_MESSAGE_NAME) {
                    location.reload()
                }
            })
        }
    },
    refreshMainStyle: function(){
        var mainCss = Res.CSS_MAIN
                .replace("{font_family}", Setting.font_family)
                .replace("{font_size}", UI.calcContentFontSize(Setting.font_size))
                .replace("{title_font_size}", UI.calcTitleFontSize(Setting.font_size))
                .replace("{content_width}", Setting.content_width)
                .replace("{text_line_height}", Setting.text_line_height)
                .replace("{menu-bar-hidden}", Setting.menu_bar_hidden ? "display:none;" : "");

        if(UI.$mainStyle){
            UI.$mainStyle.text(mainCss);
            return;
        }

        UI.$mainStyle = $('<style id="main">')
            .text(mainCss)
            .appendTo('head');
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
        hidden = _.isUndefined(hidden) ? Setting.hide_preferences_button : hidden;

        UI.$preferencesBtn.toggle(!hidden);
    },
    hideMenuBar: function(hidden) {
        hidden = _.isUndefined(hidden) ? Setting.menu_bar_hidden : hidden;

        UI.$menuBar.toggle(!hidden);
    },
    refreshSkinStyle: function(skin_name, isFirst){
        var $style = $("#skin_style");
        if($style.length === 0){
            $style = $('<style id="skin_style">').appendTo('head');
        }

        // 图片章节夜间模式会变的无法看
        if (isFirst && skin_name.indexOf('夜间'.uiTrans()) != -1 && Setting.picNightModeCheck) {
            setTimeout(function(){
                var img = $('#mynovelreader-content img')[0];
                // console.log(img.width, img.height)
                if (img && img.width > 500 && img.height > 1000) {
                    $style.text(UI.skins['缺省皮肤'.uiTrans()]);
                    return;
                }
            }, 200);
        }

        $style.text(UI.skins[skin_name]);
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
    calcContentFontSize: function(fontSizeStr) {
        var m = fontSizeStr.match(/([\d\.]+)(px|r?em|pt)/);
        if(m) {
            var size = m[1],
                type = m[2];
            return parseFloat(size, 10) + type;
        }

        m = fontSizeStr.match(/([\d\.]+)/);
        if (m) {
            return parseFloat(m[1], 10) + 'px';
        }

        return "";
    },
    calcTitleFontSize: function(fontSizeStr){
        var m = fontSizeStr.match(/([\d\.]+)(px|r?em|pt)/);
        if(m) {
            var size = m[1],
                type = m[2];
            return parseFloat(size, 10) * 1.8 + type;
        }

        m = fontSizeStr.match(/([\d\.]+)/);
        if (m) {
            return parseFloat(m[1], 10) * 1.8 + 'px';
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
        $form.find("#enable-cn2tw").get(0).checked = Setting.cn2tw;
        $form.find("#disable-auto-launch").get(0).checked = Setting.getDisableAutoLaunch();
        $form.find("#booklink-enable").get(0).checked = Setting.booklink_enable;
        $form.find("#debug").get(0).checked = Setting.debug;
        $form.find("#quietMode").get(0).checked = Setting.isQuietMode;
        $form.find("#pic-nightmode-check").get(0).checked = Setting.picNightModeCheck;
        $form.find("#copyCurTitle").get(0).checked = Setting.copyCurTitle;

        $form.find("#hide-menu-list").get(0).checked = Setting.menu_list_hiddden;
        $form.find("#hide-footer-nav").get(0).checked = Setting.hide_footer_nav;
        $form.find("#hide-preferences-button").get(0).checked = Setting.hide_preferences_button;
        $form.find("#add-nextpage-to-history").get(0).checked = Setting.addToHistory;
        $form.find("#enable-dblclick-pause").get(0).checked = Setting.dblclickPause;

        $form.find("#font-family").get(0).value = Setting.font_family;
        $form.find("#font-size").get(0).value = Setting.font_size;
        $form.find("#content_width").get(0).value = Setting.content_width;
        $form.find("#text_line_height").get(0).value = Setting.text_line_height;
        $form.find("#split_content").get(0).checked = Setting.split_content;
        $form.find("#scroll_animate").get(0).checked = Setting.scrollAnimate;

        $form.find("#remain-height").get(0).value = Setting.remain_height;
        $form.find("#extra_css").get(0).value = Setting.extra_css;
        $form.find("#custom_siteinfo").get(0).value = Setting.customSiteinfo;
        UI._rules = $form.find("#custom_replace_rules").get(0).value = Setting.customReplaceRules;

        // 界面语言
        var $lang = $form.find("#lang");
        $("<option>").text("zh-CN").appendTo($lang);
        $("<option>").text("zh-TW").appendTo($lang);
        $lang.val(Setting.lang).change(function(){
            var key = $(this).find("option:selected").text();
            Setting.lang = key;
        });

        // 皮肤
        var $skin = $form.find("#skin");
        for(var key in UI.skins){
            $("<option>").text(key).appendTo($skin);
        }
        $skin.val(Setting.skin_name).change(function(){
            var key = $(this).find("option:selected").text();
            UI.refreshSkinStyle(key);
            Setting.skin_name = key;
        });

        // 字体大小等预览
        var preview = _.debounce(function(){
            switch(this.id){
                case "font-size":
                    var contentFontSize = UI.calcContentFontSize(this.value);
                    var titleFontSize = UI.calcTitleFontSize(this.value);
                    if(titleFontSize) {
                        UI.$content.css("font-size", contentFontSize);
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
        $form.find("#quietModeKey").get(0).value = Setting.quietModeKey;
        $form.find("#openPreferencesKey").get(0).value = Setting.openPreferencesKey;
        $form.find("#setHideMenuListKey").get(0).value = Setting.hideMenuListKey;

        // 点击事件
        $form.on('click', 'input:checkbox, input:button', function(event){
            UI.preferencesClickHandler(event.target);
        });
    },
    cleanPreview: function() {
        UI.$content.find("h1").css("font-size", "");

        // 恢复初始设置（有误操作）
        // UI.$content.removeAttr('style');
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
                Setting.debug = !Setting.debug;
                toggleConsole(Setting.debug);
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
                key = prompt('请输入打开设置的快捷键：'.uiTrans(), Setting.quietModeKey);
                if (key) {
                    Setting.quietModeKey = key;
                    $(target).val(key);
                }
                break;
            case 'openPreferencesKey':
                key = prompt('请输入打开设置的快捷键：'.uiTrans(), Setting.openPreferencesKey);
                if (key) {
                    Setting.openPreferencesKey = key;
                    $(target).val(key);
                }
                break;
            case 'setHideMenuListKey':
                key = prompt('请输入切换左侧章节列表的快捷键：'.uiTrans(), Setting.hideMenuListKey);
                if (key) {
                    Setting.hideMenuListKey = key;
                    $(target).val(key);
                }
                break;
            case 'saveAsTxt':
                UI.preferencesCloseHandler();
                App.saveAsTxt();
                break;
            default:
                break;
        }
    },
    preferencesCloseHandler: function(){
        UI.cleanPreview();

        UI.hide();
    },
    preferencesSaveHandler: function(){
        var $form = $("#preferences");

        Setting.setDisableAutoLaunch($form.find("#disable-auto-launch").get(0).checked);

        Setting.cn2tw = $form.find("#enable-cn2tw").get(0).checked;
        Setting.booklink_enable = $form.find("#booklink-enable").get(0).checked;
        Setting.isQuietMode = $form.find("#quietMode").get(0).checked;
        Setting.debug = $form.find("#debug").get(0).checked;
        Setting.picNightModeCheck = $form.find("#pic-nightmode-check").get(0).checked;
        Setting.setCopyCurTitle($form.find("#copyCurTitle").get(0).checked);

        Setting.addToHistory = $form.find("#add-nextpage-to-history").get(0).checked;
        Setting.dblclickPause = $form.find("#enable-dblclick-pause").get(0).checked;

        var skinName = $form.find("#skin").find("option:selected").text();
        Setting.skin_name = skinName;
        UI.refreshSkinStyle(skinName);

        Setting.font_family = $form.find("#font-family").get(0).value;
        UI.$content.css("font-family", Setting.font_family);

        Setting.font_size = $form.find("#font-size").get(0).value;
        Setting.text_line_height = $form.find("#text_line_height").get(0).value;
        Setting.content_width = $form.find("#content_width").get(0).value;
        Setting.remain_height = $form.find("#remain-height").get(0).value;
        Setting.split_content = $form.find("#split_content").get(0).checked;
        Setting.scrollAnimate = $form.find("#scroll_animate").get(0).checked;

        Setting.menu_list_hiddden = $form.find("#hide-menu-list").get(0).checked;
        UI.hideMenuList(Setting.menu_list_hiddden);

        Setting.hide_footer_nav = $form.find("#hide-footer-nav").get(0).checked;
        Setting.hide_preferences_button = $form.find("#hide-preferences-button").get(0).checked;

        var css = $form.find("#extra_css").get(0).value;
        UI.refreshExtraStyle(css);
        Setting.extra_css = css;

        Setting.customSiteinfo = $form.find("#custom_siteinfo").get(0).value;

        // 自定义替换规则直接生效
        var rules = $form.find("#custom_replace_rules").get(0).value;
        Setting.customReplaceRules = rules;
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

        // 重新载入样式
        UI.cleanPreview();
        UI.refreshMainStyle();

        UI.hide();

        // 发送给其它窗口
        if (config.setting_load_by_message) {
            window.postMessage(SAVE_MESSAGE_NAME, '*')
        }
    },
    openHelp: function() {

    },
    notice: function (htmlText, ms){
        var $noticeDiv = $("#alert");
        if (!ms) {
            ms = 1666;
        }

        clearTimeout(UI.noticeDivto);
        $noticeDiv.find("p").html(htmlText);
        $noticeDiv.fadeIn("fast");

        UI.noticeDivto = setTimeout(function(){
            $noticeDiv.fadeOut(500);
        }, ms);

        return $noticeDiv;
    }
};

UI.skins["缺省皮肤".uiTrans()] = "";
UI.skins["暗色皮肤".uiTrans()] = "body { color: #666; background-color: rgba(0;0;0;.1); }\
                .title { color: #222; }";
UI.skins["白底黑字".uiTrans()] = "body { color: black; background-color: white;}\
                .title { font-weight: bold; border-bottom: 0.1em solid; margin-bottom: 1.857em; padding-bottom: 0.857em;}";
UI.skins["夜间模式".uiTrans()] = "body { color: #939392; background: #2d2d2d; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; } .chapter.active div{color: #939392;}";
UI.skins["夜间模式1".uiTrans()] = "body { color: #679; background-color: black; } #preferencesBtn img { background-color: white !important; } .title { color: #3399FF; background-color: #121212; }";
UI.skins["夜间模式2".uiTrans()] = "body { color: #AAAAAA; background-color: #121212; } #preferencesBtn img { background-color: white; } #mynovelreader-content img { background-color: #c0c0c0; } .title { color: #3399FF; background-color: #121212; }   body a { color: #E0BC2D; } body a:link { color: #E0BC2D; } body a:visited { color:#AAAAAA; } body a:hover { color: #3399FF; } body a:active { color: #423F3F; }";
UI.skins["夜间模式（多看）".uiTrans()] = "body { color: #4A4A4A; background: #101819; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; }";

UI.skins["橙色背景".uiTrans()] = "body { color: #24272c; background-color: #FEF0E1; }";
UI.skins["绿色背景".uiTrans()] = "body { color: black; background-color: #d8e2c8; }";
UI.skins["绿色背景2".uiTrans()] = "body { color: black; background-color: #CCE8CF; }";
UI.skins["蓝色背景".uiTrans()] = "body { color: black; background-color: #E7F4FE; }";
UI.skins["棕黄背景".uiTrans()] = "body { color: black; background-color: #C2A886; }";
UI.skins["经典皮肤".uiTrans()] = "body { color: black; background-color: #EAEAEE; } .title { background-color: #f0f0f0; }";

UI.skins["起点牛皮纸（深色）".uiTrans()] = "body { color: black; background: url(\"http://qidian.gtimg.com/qd/images/read.qidian.com/theme/body_theme1_bg_2x.0.3.png\"); }";
UI.skins["起点牛皮纸（浅色）".uiTrans()] = "body { color: black; background: url(\"http://qidian.gtimg.com/qd/images/read.qidian.com/theme/theme_1_bg_2x.0.3.png\"); }";

export default UI

