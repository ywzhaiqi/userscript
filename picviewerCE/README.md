picviewerCE.user.js
===================

[picViewer By NLF](http://userscripts-mirror.org/scripts/show/105741) 修改版，需要运行在 **Greasemonkey / Tampermonkey** 环境中。

由于 picviewer 脚本比较复杂，在修改的过程中难免会尝试问题，不愿麻烦的请使用原版。

## 修改说明

### 修正

- 修正原脚本在 chrome 下会加载 2 次的 bug。
- 修正原脚本在 chrome 30+ 当鼠标移动到浮动工具栏时会消失的问题，因为 `mouseenter` 可能不会触发。

### 修改

- 修改为 **双击关闭图片窗口**，还可使用 esc 键关闭。

### 新增

- 新增了多个查看大图的站点规则
- **新增了设置界面**，详见下图。在 Greasemonkey/Tampermonkey 用户脚本处打开，还可在图库的命令处打开设置。
- **新增了 xhr 方式获取大图**
- **新增了 Mouseover Popup Image Viewer 脚本规则的兼容**，非完全兼容，仅兼容主要部分。
- 新增按键，已被默认禁用。
    - 当出现悬浮条时按下 `a` 键打开原图（actual）
    - 当出现悬浮条时按下 `c` 键打开当前图片（current）
    - 当出现悬浮条时按下 `m` 键打开放大镜（magnifier）
    - 当出现悬浮条时按下 `g` 键打开库（gallery）
- 新增了几个库的命令
    - **导出图片**：导出所有大图到新窗口
    - **复制图片**：复制所有大图地址
    - **自动重载**：需要手动启用。在勾选时，当滚动到最后几个图片，会自动滚动页面到最底部，如果有新的图片会添加到库里面。例如百度图片、花瓣等库浏览时，可不断加载新的图片直到最底部，还可配合翻页脚本加载后几页的图片。
    - **进入全屏和退出全屏按钮**
    - **设置**
- 新增了 `显示隐藏缩略图` 切换按钮

![设置界面](https://github.com/ywzhaiqi/userscript/raw/master/picviewerCE/config.png)

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

### 附录

- github 直接安装地址：[https://github.com/ywzhaiqi/userscript/raw/master/picviewerCE/picviewerCE.user.js](https://github.com/ywzhaiqi/userscript/raw/master/picviewerCE/picviewerCE.user.js)
- greasyfork 地址：[https://greasyfork.org/zh-CN/scripts/5199-picviewer-ce](https://greasyfork.org/zh-CN/scripts/5199-picviewer-ce)

### 其它说明

- 七星浏览器（1.37.3.242）可能会额外筛选出未缩放的图片。在设置默认缩放为 125% 的前提下，由于其缩放 bug，造成实际上并未缩放的图片，在七星浏览器上尺寸会不相等，比如 119 * 119（120 * 120），详见 http://bbs.qixing123.com/thread-777-1-1.html