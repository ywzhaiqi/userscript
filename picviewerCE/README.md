picviewerCE.user.js
===================

[picViewer By NLF](http://userscripts.org/scripts/show/105741) 修改版。[直接安装地址](https://github.com/ywzhaiqi/userscript/blob/master/picviewerCE/picviewerCE.user.js)

## 修改说明

- 修改了默认的设置
    - **双击图片窗口**关闭图片
- 新增了几个查看大图的站点规则
- 新增了几个库的命令
    - `导出所有图片到新窗口`
    - 显示隐藏底部条

## 鼠标手势调用（FireGesture）

### 打开原图

    var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        doc = srcNode.ownerDocument;

    var actualBtn = doc.querySelector('#pv-float-bar-container > .pv-float-bar-button-actual');
    if (actualBtn) {
        actualBtn.click();
    }

### 打开库

    var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        doc = srcNode.ownerDocument;

    var galleryBtn = doc.querySelector('#pv-float-bar-container > .pv-float-bar-button-gallery');
    if (galleryBtn) {
        galleryBtn.click();
    }