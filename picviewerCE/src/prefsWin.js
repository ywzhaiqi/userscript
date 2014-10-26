
GM_config.init({
    id: 'pv-prefs',
    title: GM_config.create('a', {
       href: 'https://greasyfork.org/zh-CN/scripts/5199-picviewer-ce',
       target: '_blank',
       textContent: 'picviewerCE 设置',
    }),
    css: '',
    fields: {
        // 浮动工具栏
        'floatBar.position': {
            label: '浮动工具栏位置',
            type: 'select',
            options: ['top left', 'top right', 'bottom right', 'bottom left'],
            textContents: ['图片左上角', '图片右上角', '图片右下角', '图片左下角'],
            default: prefs.floatBar.position,
            section: ['浮动工具栏'],
        },
        'floatBar.forceShow.size.w': {
            label: '无缩放图片，强制显示的宽度（像素）',
            type: 'int',
            size: 5,
            default: prefs.floatBar.forceShow.size.w,
            title: '在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.(以便进行旋转,放大,翻转等等操作)..',
        },
        'floatBar.forceShow.size.h': {
            label: '无缩放图片，强制显示的高度（像素）',
            type: 'int',
            size: 5,
            default: prefs.floatBar.forceShow.size.h,
            title: '在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.(以便进行旋转,放大,翻转等等操作)..',
        },
        'floatBar.minSizeLimit.w': {
            label: '显示浮动工具栏，图片最小的宽度（像素）',
            type: 'int',
            size: 5,
            default: prefs.floatBar.minSizeLimit.w,
            title: '就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情况下),如果没有被缩放的原图片小于设定值,那么也不显示浮动工具栏',
        },
        'floatBar.minSizeLimit.h': {
            label: '显示浮动工具栏，图片最小的高度（像素）',
            type: 'int',
            size: 5,
            default: prefs.floatBar.minSizeLimit.h,
            title: '就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情况下),如果没有被缩放的原图片小于设定值,那么也不显示浮动工具栏',
        },
        // 按键
        'floatBar.keys.enable': {
            label: '启用以下4个快捷键',
            type: 'checkbox',
            default: prefs.floatBar.keys.enable
        },
        'floatBar.keys.actual': {
            label: '&nbsp;&nbsp;&nbsp;&nbsp;打开大图',
            type: 'text',
            size: 5,
            default: prefs.floatBar.keys.actual,
            title: '当出现悬浮条时按下此按键打开大图'
        },
        'floatBar.keys.current': {
            label: '&nbsp;&nbsp;&nbsp;&nbsp;打开当前图片',
            type: 'text',
            size: 5,
            default: prefs.floatBar.keys.current,
            title: '当出现悬浮条时按下此按键打开当前显示的图片'
        },
        'floatBar.keys.magnifier': {
            label: '&nbsp;&nbsp;&nbsp;&nbsp;打开放大镜观察',
            type: 'text',
            size: 5,
            default: prefs.floatBar.keys.magnifier,
            title: '当出现悬浮条时按下此按键打开放大镜观察'
        },
        'floatBar.keys.gallery': {
            label: '&nbsp;&nbsp;&nbsp;&nbsp;打开图库',
            type: 'text',
            size: 5,
            default: prefs.floatBar.keys.gallery,
            title: '当出现悬浮条时按下此按键打开图库'
        },

        // 放大镜
        'magnifier.radius': {
            label: '默认半径（像素）',
            type: 'text',
            size: 5,
            default: prefs.magnifier.radius,
            section: ['放大镜'],
        },
        'magnifier.wheelZoom.enabled': {
            label: '启用滚轮缩放',
            type: 'checkbox',
            default: prefs.magnifier.wheelZoom.enabled,
        },
        // 'magnifier.wheelZoom.range': {
        //     label: '缩放的范围',
        //     type: 'select',
        //     default: prefs.magnifier.wheelZoom.range,
        // },

        // 图库
        'gallery.fitToScreen': {
            label: '图片适应屏幕',
            type: 'checkbox',
            default: prefs.gallery.fitToScreen,
            section: ['图库'],
            title: '适应方式为contain，非cover'
        },
        'gallery.sidebarPosition': {
            label: '缩略图栏位置',
            type: 'select',
            options: ['bottom', 'right', 'left', 'top'],
            textContents: ['底部', '右侧', '左侧', '顶部'],
            default: prefs.gallery.sidebarPosition,
        },
        'gallery.sidebarSize': {
            label: '缩略图栏高（像素）',
            type: 'int',
            size: 5,
            default: prefs.gallery.sidebarSize,
            title: '缩略图栏的高（如果是水平放置）或者宽（如果是垂直放置）'
        },
        'gallery.max': {
            label: '最多预读多少张图片',
            title: '前后各多少张',
            type: 'int',
            size: 5,
            default: prefs.gallery.max
        },
        'gallery.autoZoom': {
            label: '缩放改回 100%（仅 chrome）',
            type: 'checkbox',
            default: prefs.gallery.autoZoom,
            title: '如果有放大，则把图片及 sidebar 部分的缩放改回 100%，增大可视面积（仅在 chrome 下有效）'
        },

        // 图片窗口
        'imgWindow.fitToScreen': {
            label: '适应屏幕，并且水平垂直居中',
            type: 'checkbox',
            default: prefs.imgWindow.fitToScreen,
            section: ['图片窗口'],
            title: '适应方式为contain，非cover'
        },
        'imgWindow.close.dblClickImgWindow': {
            label: '双击图片窗口关闭',
            type: 'checkbox',
            default: prefs.imgWindow.close.dblClickImgWindow,
        },
        'imgWindow.close.clickOutside': {
            label: '点击图片外部关闭',
            type: 'select',
            options: ['', 'click', 'dblclick'],
            textContents: ['无', '单击', '双击'],
            default: prefs.imgWindow.close.clickOutside,
        },
        // 'imgWindow.zoom.mouseWheelZoom': {
        //     label: '滚轮缩放比例',
        //     type: 'select',
        //     default: prefs.imgWindow.zoom.mouseWheelZoom,
        // },

        // 其它
        'waitImgLoad': {
            label: '等图片完全载入后,才开始执行弹出,放大等操作',
            type: 'checkbox',
            default: prefs.waitImgLoad,
            section: ['其它'],
            title: '按住ctrl键的时候,可以临时执行和这个设定相反的设定'
        },
    },
    events: {
        open: function(doc, win, frame) {
            frame.style.width = '500px';
            frame.style.left = 'auto';
            frame.style.right = '60px';
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
    // 根据 GM_config 的设置载入设置到 prefs
    Object.keys(GM_config.fields).forEach(function(keyStr) {
        var keys = keyStr.split('.');
        var lastKey = keys.pop();

        var lastPref = keys.reduce(function(previousValue, curKey) {
            return previousValue[curKey];
        }, prefs) || prefs;

        lastPref[lastKey] = GM_config.get(keyStr);
    });
}
