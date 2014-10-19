picviewerCE.user.js
===================

[picViewer By NLF](http://userscripts-mirror.org/scripts/show/105741) 修改版。[github 安装地址](https://github.com/ywzhaiqi/userscript/raw/master/picviewerCE/picviewerCE.user.js)

## 修改说明

### 修正

- 修正原脚本在 chrome 下会加载 2 次的 bug。
- 修正原脚本在 chrome 30+ 当鼠标移动到浮动工具栏时会消失的问题，因为 `mouseenter` 可能不会触发。

### 修改

- 修改为 **双击关闭图片窗口**，还可使用 esc 键关闭。

### 新增

- 新增了几个查看大图的站点规则
- **新增了 xhr 方式获取大图**
- **新增了 Mouseover Popup Image Viewer 脚本规则的兼容**，非完全兼容，仅兼容主要部分。
- 新增按键，已被默认禁用。
    - 当出现悬浮条时按下 `a` 键打开原图（actual）
    - 当出现悬浮条时按下 `c` 键打开当前图片（current）
    - 当出现悬浮条时按下 `m` 键打开放大镜（magnifier）
    - 当出现悬浮条时按下 `g` 键打开库（gallery）
- 新增了几个库的命令
    - `重载`。跟下面的自动重载类同，这是手动重载。
    - `导出所有图片到新窗口`
    - **进入全屏和退出全屏按钮**
- 新增了 `显示隐藏底部条` 按钮
- *新增库浏览时，当滚动到最后一个，会自动滚动原页面到最底部，如果有新的图片会自动重载。例如百度图片库浏览时。* 需要手动启用，有待进一步完善。

## 鼠标手势调用（FireGesture）

### 打开原图

    var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        document = srcNode.ownerDocument;

    var actualBtn = document.querySelector('#pv-float-bar-container > .pv-float-bar-button-actual');
    if (actualBtn) {
        actualBtn.click();
    }

### 打开库

    var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        document = srcNode.ownerDocument;

    var galleryBtn = document.querySelector('#pv-float-bar-container > .pv-float-bar-button-gallery');
    if (galleryBtn) {
        galleryBtn.click();
    }