noLazyImageLoad.user.js
=======================

取消图片的延迟加载。参考 [nolazyload](https://greasyfork.org/scripts/791-nolazyload)


### 可能存在的问题

>一般网站的图片加载进缓存其实就可以了,如果直接修改页面的IMG标签的属性,会导致与这些网站的本身的lazyload脚本功能冲突,有时会导致页面出各种奇怪的错误
>
淘宝直接显示原因是,修改IMG属性不会导致出错,如果不修改,它加载的反而不是缓存里的图片,而是图片文件xxx.jpg.奇怪参数 导致图片又重新下载,所以才会修改淘宝的图片直接显示 

来自 [nolazyload 作者回复](https://greasyfork.org/forum/discussion/1578/%E8%83%BD%E5%90%A6%E6%94%AF%E6%8C%81%E7%9F%A5%E4%B9%8Ezhihu-com%E4%B8%8A%E7%9A%84%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD#Comment_5335)