
var getBooleanConfig = function(configName, defaultValue) {
    var config = GM_getValue(configName);
    if(config === undefined) {
        GM_setValue(configName, defaultValue);
        config = defaultValue;
    }
    return config;
};

var Config = {
    getDisableAutoLaunch: function() {  // 强制手动启用模式
        return getBooleanConfig("disable_auto_launch", false);
    },
    setDisableAutoLaunch: function(bool) {
        GM_setValue("disable_auto_launch", bool);
    },

    // 按键调用会遇到问题： Greasemonkey 访问违规：unsafeWindow 无法调用 GM_getValue
    // 故改成这种形式
    copyCurTitle: getBooleanConfig("copyCurTitle", true),
    setCopyCurTitle: function (bool) {
        this.copyCurTitle = !!bool;
        GM_setValue("copyCurTitle", !!bool);
    },

    get cn2tw() {
        if (_.isUndefined(this._cn2tw)) {
            this._cn2tw = getBooleanConfig('cn2tw', Config.lang === 'zh-TW' ? true : false);
        }
        return this._cn2tw;
    },
    set cn2tw(bool) {
        GM_setValue('cn2tw', bool);
        this._cn2tw = bool;
    },

    get booklink_enable() {  // booklink.me 跳转的自动启动
        return getBooleanConfig("booklink_enable", true);
    },
    set booklink_enable(bool) {
        GM_setValue("booklink_enable", bool);
    },

    get debug() {  // 调试
        if (_.isUndefined(this._debug)) {
            this._debug = getBooleanConfig("debug", false);
        }
        return this._debug;
    },
    set debug(bool) {
        this._debug = bool;
        GM_setValue("debug", bool);
        toggleConsole(bool);
    },

    get addToHistory() {
        if (_.isUndefined(this._addToHistory)) {
            this._addToHistory = getBooleanConfig("add_nextpage_to_history", true);
        }
        return this._addToHistory;
    },
    set addToHistory(bool) {
        this._addToHistory = bool;
        GM_setValue("add_nextpage_to_history", bool);
    },

    get dblclickPause() {
        return getBooleanConfig('dblclick_pause', true);
    },
    set dblclickPause(bool) {
        GM_setValue('dblclick_pause', bool);
    },

    get remain_height() {  // 距离底部多少高度（px）开始加载下一页
        if(_.isUndefined(this._remain_height)){
            this._remain_height = parseInt(GM_getValue("remain_height"), 10) || 400;
        }
        return this._remain_height;
    },
    set remain_height(val) {
        this._remain_height = val;
        GM_setValue("remain_height", val);
    },

    get lang() {
        if (_.isUndefined(this._lang)) {
            this._lang = GM_getValue("lang") || ((navigator.language === "zh-TW" || navigator.language === "zh-HK") ? "zh-TW" : "zh-CN");
        }
        return this._lang;
    },
    set lang(val) {
        this._lang = val;
        GM_setValue("lang", val);
    },

    get font_family() {
        return GM_getValue("font_family") || "微软雅黑,宋体,黑体,楷体".uiTrans();
    },
    set font_family(val) {
        GM_setValue("font_family", val);
    },

    get font_size() {  // 字体大小
        return GM_getValue("font_size") || "18px";
    },
    set font_size(val) {
        GM_setValue("font_size", val);
    },

    get text_line_height(){
        return GM_getValue("text_line_height") || "2.25em";
    },
    set text_line_height(val){
        GM_setValue("text_line_height", val);
    },

    get content_width() {  // 内容宽度
        return GM_getValue("content_width") || "800px";
    },
    set content_width(val) {
        GM_setValue("content_width", val);
    },

    get extra_css() {
        return GM_getValue("extra_css", "");
    },
    set extra_css(val) {
        GM_setValue("extra_css", val);
    },

    get customSiteinfo() {
        return GM_getValue('custom_siteinfo', '[]');
    },
    set customSiteinfo(val) {
        GM_setValue('custom_siteinfo', val);
    },

    get customReplaceRules() {
        var rules = GM_getValue('custom_replace_rules', 'b[āà]ng=棒\n『(.)』=$1');

        return rules;
    },
    set customReplaceRules(val) {
        GM_setValue('custom_replace_rules', val);
    },

    get skin_name() {
        return GM_getValue("skin_name") || "缺省皮肤".uiTrans();
    },
    set skin_name(val) {
        GM_setValue("skin_name", val);
    },

    get menu_list_hiddden() {
        return getBooleanConfig("menu_list_hiddden", false);
    },
    set menu_list_hiddden(bool) {
        GM_setValue("menu_list_hiddden", bool);
    },

    get hide_footer_nav() {
        return getBooleanConfig("hide_footer_nav", true);
    },
    set hide_footer_nav(bool) {
        GM_setValue("hide_footer_nav", bool);
        UI.hideFooterNavStyle(bool);
    },

    get hide_preferences_button() {
        return getBooleanConfig("hide_preferences_button", false);
    },
    set hide_preferences_button(bool) {
        GM_setValue('hide_preferences_button', bool);
    },

    // === 快捷键

    // 安静模式切换快捷键
    get quietModeKey() {
        if (this._quietModeKey) {
            return this._quietModeKey;
        }
        this._quietModeKey = GM_getValue('quietModeKey') || 'q';

        return this._quietModeKey;
    },
    set quietModeKey(keyCode) {
        this._quietModeKey = keyCode;
        GM_setValue('quietModeKey', keyCode);
    },

    // 打开设置窗口的快捷键
    get openPreferencesKey() {
        if (this._openPreferencesKey) {
            return this._openPreferencesKey;
        }
        this._openPreferencesKey = GM_getValue('open_preferences_key') || 's';

        return this._openPreferencesKey;
    },
    set openPreferencesKey(keyCode) {
        this._openPreferencesKey = keyCode;
        GM_setValue('open_preferences_key', keyCode);
    },

    // 隐藏左侧章节列表的快捷键
    get hideMenuListKey() {  // 默认为 c
        // 'C'.charCodeAt(0) = 67
        if (this._hideMenuListKey) {
            return this._hideMenuListKey;
        }
        this._hideMenuListKey = GM_getValue('hide_menulist_key') || 'c';

        return this._hideMenuListKey;
    },
    set hideMenuListKey(key) {
        this._hideMenuListKey = key;
        GM_setValue("hide_menulist_key", key);
    },

    get picNightModeCheck() {
        return getBooleanConfig('picNightModeCheck', true);
    },
    set picNightModeCheck(bool) {
        GM_setValue('picNightModeCheck', bool);
    },

    get split_content() {
        if (_.isUndefined(this._split_content)) {
            this._split_content = GM_getValue('split_content', true);
        }
        return this._split_content;
    },
    set split_content(bool) {
        this._split_content = bool;
        GM_setValue('split_content', bool);
    },

    get scrollAnimate() {
        return GM_getValue('scrollAnimate', false);
    },
    set scrollAnimate(bool) {
        GM_setValue('scrollAnimate', bool);
    },
};
