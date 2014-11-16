
var debug;  // 调试函数

GM_config.init({
    id: 'pv-prefs',
    title: GM_config.create('a', {
       href: 'https://greasyfork.org/zh-CN/scripts/5199-picviewer-ce',
       target: '_blank',
       textContent: 'picviewerCE 设置',
       title: '点击此处打开主页'
    }),
    isTabs: true,
    skin: 'tab',
    frameStyle: {
        width: '480px',
        zIndex:'2147483648',
    },
    css: [
        "#pv-prefs input[type='text'] { width: 50px; } ",
        "#pv-prefs input[type='number'] { width: 50px; } ",
        "#pv-prefs .inline .config_var { margin-left: 6px; }",
        "#pv-prefs label.size { width: 205px; }",
        "#pv-prefs span.sep-x { margin-left: 0px !important; }",
        "#pv-prefs label.sep-x { margin-right: 5px; }",
        "#pv-prefs label.floatBar-key { margin-left: 20px; width: 100px; }",
        "#pv-prefs input.color { width: 120px; }",
    ].join('\n'),
    fields: {
        // 浮动工具栏
        'floatBar.position': {
            label: '显示位置',
            type: 'select',
            options: {
                'top left': '图片左上角',
                'top right': '图片右上角',
                'bottom right': '图片右下角',
                'bottom left': '图片左下角'
            },
            "default": prefs.floatBar.position,
            section: ['浮动工具栏'],
        },
        'floatBar.showDelay': {
            label: '显示延时',
            type: 'int',
            "default": prefs.floatBar.showDelay,
            after: ' 毫秒',
        },
        'floatBar.hideDelay': {
            label: '隐藏延时',
            type: 'int',
            className: 'hideDelay',
            "default": prefs.floatBar.hideDelay,
            after: ' 毫秒'
        },
        'floatBar.forceShow.size.w': {
            label: '非缩放图片，超过该尺寸，强制显示',
            type: 'int',
            className: 'size',
            "default": prefs.floatBar.forceShow.size.w,
            title: '在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.(以便进行旋转,放大,翻转等等操作)..',
            line: 'start',
        },
        'floatBar.forceShow.size.h': {
            label: ' x ',
            type: 'int',
            className: 'sep-x',
            after: ' 像素',
            "default": prefs.floatBar.forceShow.size.h,
            line: 'end',
        },
        'floatBar.minSizeLimit.w': {
            label: '缩放图片，小于该尺寸，不显示',
            type: 'int',
            className: 'size',
            "default": prefs.floatBar.minSizeLimit.w,
            title: '就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情4况下),如果没有被缩放的原图片小于设定值,那么也不显示浮动工具栏',
            line: 'start',
        },
        'floatBar.minSizeLimit.h': {
            label: ' x ',
            type: 'int',
            className: 'sep-x',
            after: ' 像素',
            "default": prefs.floatBar.minSizeLimit.h,
            line: 'end',
        },
        // 按键
        'floatBar.keys.enable': {
            label: '启用以下4个快捷键',
            type: 'checkbox',
            "default": prefs.floatBar.keys.enable
        },
        'floatBar.keys.actual': {
            label: '打开大图',
            type: 'text',
            className: 'floatBar-key',
            "default": prefs.floatBar.keys.actual,
            title: '当出现悬浮条时按下此按键打开大图'
        },
        'floatBar.keys.current': {
            label: '打开当前图片',
            type: 'text',
            className: 'floatBar-key',
            "default": prefs.floatBar.keys.current,
            title: '当出现悬浮条时按下此按键打开当前显示的图片'
        },
        'floatBar.keys.magnifier': {
            label: '打开放大镜观察',
            type: 'text',
            className: 'floatBar-key',
            "default": prefs.floatBar.keys.magnifier,
            title: '当出现悬浮条时按下此按键打开放大镜观察'
        },
        'floatBar.keys.gallery': {
            label: '打开图库',
            type: 'text',
            className: 'floatBar-key',
            "default": prefs.floatBar.keys.gallery,
            title: '当出现悬浮条时按下此按键打开图库'
        },

        // 放大镜
        'magnifier.radius': {
            label: '默认半径',
            type: 'int',
            "default": prefs.magnifier.radius,
            section: ['放大镜'],
            after: ' 像素'
        },
        'magnifier.wheelZoom.enabled': {
            label: '启用滚轮缩放',
            type: 'checkbox',
            "default": prefs.magnifier.wheelZoom.enabled,
        },
        'magnifier.wheelZoom.range': {
            label: '滚轮缩放的倍率',
            type: 'textarea',
            "default": prefs.magnifier.wheelZoom.range.join(', '),
        },

        // 图库
        'gallery.fitToScreen': {
            label: '对图片进行缩放以适应屏幕',
            type: 'checkbox',
            "default": prefs.gallery.fitToScreen,
            section: ['图库'],
            title: '适应方式为contain，非cover'
        },
        'gallery.sidebarPosition': {
            label: '缩略图栏位置',
            type: 'select',
            options: {
                'bottom': '底部',
                'right': '右侧',
                'left': '左侧',
                'top': '顶部'
            },
            "default": prefs.gallery.sidebarPosition,
            line: 'start',
        },
        'gallery.sidebarSize': {
            label: '高度',
            type: 'int',
            "default": prefs.gallery.sidebarSize,
            title: '缩略图栏的高（如果是水平放置）或者宽（如果是垂直放置）',
            after: ' 像素',
            line: 'end',
        },
        'gallery.max': {
            label: '最多预读 ',
            type: 'number',
            "default": prefs.gallery.max,
            after: ' 张图片（前后各多少张）'
        },
        'gallery.autoZoom': {
            label: '缩放改回 100%（chrome）',
            type: 'checkbox',
            "default": prefs.gallery.autoZoom,
            title: '如果有放大，则把图片及 sidebar 部分的缩放改回 100%，增大可视面积（仅在 chrome 下有效）'
        },
        'gallery.descriptionLength': {
            label: '注释的最大宽度',
            type: 'int',
            "default": prefs.gallery.descriptionLength,
            after: ' 个字符'
        },

        // 图片窗口
        'imgWindow.fitToScreen': {
            label: '适应屏幕，并且水平垂直居中',
            type: 'checkbox',
            "default": prefs.imgWindow.fitToScreen,
            section: ['图片窗口'],
            title: '适应方式为contain，非cover',
        },
        'imgWindow.close.defaultTool': {
            label: '打开窗口时默认选择的工具',
            type: 'select',
            options: {
                'hand': '抓手',
                'rotate': '旋转',
                'zoom': '放大镜',
            },
            "default": prefs.imgWindow.close.defaultTool,
        },
        'imgWindow.close.escKey': {
            label: 'Esc键关闭',
            type: 'checkbox',
            "default": prefs.imgWindow.close.escKey,
            line: 'start',
        },
        'imgWindow.close.dblClickImgWindow': {
            label: '双击图片窗口关闭',
            type: 'checkbox',
            "default": prefs.imgWindow.close.dblClickImgWindow,
        },
        'imgWindow.close.clickOutside': {
            label: '点击图片外部关闭',
            type: 'select',
            options: {
                '': '无',
                'click': '单击',
                'dblclick': '双击',
            },
            "default": prefs.imgWindow.close.clickOutside,
            line: 'end',
        },
        'imgWindow.overlayer.shown': {
            label: '覆盖层',
            type: 'checkbox',
            "default": prefs.imgWindow.overlayer.shown,
            line: 'start',
        },
        'imgWindow.overlayer.color': {
            label: '颜色和不透明度',
            type: 'text',
            className: 'color',
            "default": prefs.imgWindow.overlayer.color,
            line: 'end'
        },
        'imgWindow.shiftRotateStep': {
            label: '旋转时，按住shift键，旋转的步进',
            type: 'int',
            "default": prefs.imgWindow.shiftRotateStep,
            after: ' 度'
        },
        'imgWindow.zoom.mouseWheelZoom': {
            label: '滚轮缩放',
            type: 'checkbox',
            "default": prefs.imgWindow.zoom.mouseWheelZoom,
        },
        'imgWindow.zoom.range': {
            label: '滚轮缩放比例',
            type: 'textarea',
            "default": prefs.imgWindow.zoom.range.join(', '),
            title: '缩放比例.(不要出现负数,谢谢-_-!~)',
            attr: {
                "spellcheck": "false"
            }
        },

        // 其它
        'waitImgLoad': {
            label: '等图片完全载入后，才开始执行弹出放大等操作',
            type: 'checkbox',
            "default": prefs.waitImgLoad,
            section: ['其它'],
            title: '按住ctrl键的时候,可以临时执行和这个设定相反的设定'
        },
        'debug': {
            label: '调试模式',
            type: 'checkbox',
            "default": prefs.debug
        },
    },
    events: {
        open: function(doc, win, frame) {
        },
        save: function() {
            loadPrefs();
        }
    }
});


GM_registerMenuCommand('picviewerCE 设置', openPrefs);

loadPrefs();

function openPrefs() {
    GM_config.open();
}

function loadPrefs() {
    // 根据 GM_config 的 key 载入设置到 prefs
    Object.keys(GM_config.fields).forEach(function(keyStr) {
        var keys = keyStr.split('.');
        var lastKey = keys.pop();

        var lastPref = keys.reduce(function(previousValue, curKey) {
            return previousValue[curKey];
        }, prefs) || prefs;

        var value = GM_config.get(keyStr);
        if (typeof value != 'undefined') {
            // 特殊的
            if (keyStr == 'magnifier.wheelZoom.range' || keyStr == 'imgWindow.zoom.range') {
                lastPref[lastKey] = value.split(/[,，]\s*/).map(function(s) { return parseFloat(s)});
            } else {
                lastPref[lastKey] = value;
            }
        }
    });

    debug = prefs.debug ? console.debug.bind(console) : function() {};
}
