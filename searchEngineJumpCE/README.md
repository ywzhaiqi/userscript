searchEngineJumpCE.user.js
===========================

基于 [searchEngineJump By NLF](http://userscripts.org/scripts/show/84970) 修改增强简化。**仅适用于 Greasemonkey 或 Tampermonkey**。

### 安装地址

- [greasyfork](https://greasyfork.org/zh-CN/scripts/5316-searchenginejump-简化改进版)
- [github 主页](https://github.com/ywzhaiqi/userscript/tree/master/searchEngineJumpCE)
- [github 直接安装地址](https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/searchEngineJumpCE.user.js)

### 修改说明

- 修改站点数据为文本格式
- 修改 @include 不为全局
- 站点规则整合自原版、ted423 的版本
- 新增设置界面，可设置 `是否隐藏前几个搜索的文字部分` 和 `自定义搜索列表` 等。
- 新增监视标题变化的功能，随着标题的变化，会重新插入。主要是对百度、Google 不刷新页面搜索的支持。
- 新增 POST 的支持，来自 [POST 实现 - Greasy Forum](https://greasyfork.org/forum/discussion/1490/post-%E5%AE%9E%E7%8E%B0)

### 特别说明

- 如果需要搜索条在左侧的，请改用 [SearchEngineJump_by_ted423] 脚本。
- 并不是所有站点都会有搜索条

### 添加图标

脚本内置一些常用站点的图标，如果图标不存在，请看示例（最后一个链接）

    360音乐, http://s.music.so.com/s?ie=utf-8&q=%s, http://www.so.com/favicon.ico
    360音乐, http://s.music.so.com/s?ie=utf-8&q=%s, data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVQ4jaXOz2oTURQG8Ltv7vEZAl1Jsm3VZO7ccdqNlK4sBFd9k0IoCD5BaRYKVtRi5l8zmZTY0o5NoVuhI9KFRbGpLaSkDYEk1s/FnTGDC6l64bf5zncPhxlhRjdDOph5dwt/wwzpwAgzOjN3eXsmJPwLc5e3mblD+B/M3CaklVq3sfPNweWwg8thB60zH4/28/i9l2D3m4TEYmsKF4NzPP34GAvNHBaaOVQ+lHExOMdiawrpboIZmwRjkyAbhL1THyuHSyg6HJqnFB2O1aiMvVMfsqG6acxoEIwGQfcJ/VEP88Ek9BqHDAgyIOg1jrl6Fv1RD7qvumlM1gmyThAex9Wwi/lgEtJXmawTpE+YC7LoDjoQHh/nMSZ9VRIux/YXGyuHS5A1lUmfIGuE1aiMt5/fQLh8nMeYrKmScAkP6zmc9b+iEpVR2sqjtJVHJSpjeD1QFzgcST/B9A2CvkEQHqFocTxws/A/reGkd4yT3jGeRU+QvKthF8JT/QTTPUJCOIRilaOwznHvdewVx/Ra5teS/qgH4Y7/MN0lpAmHoFkErcpjhMI6x/TzDK5/fEfl/TI0a9xnwlGf/kSz1ZI7LzK4+5JDs8YzJhzevumSYlVdJ+wk521WsCZmhU1Hwo4HN3dUsCZmfwKCejnLHZeJTwAAAABJRU5ErkJggg==

如果是已经存在的域名，也可简写成 www.amazon.cn

	亚马逊（中）, http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s
	亚马逊（英）, http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=%s, www.amazon.cn

### 同类脚本或扩展

- [SearchEngineJump_by_ted423]
- [search_engineJump 文科版](https://greasyfork.org/scripts/2739-search-enginejump)
- chrome [search2](https://chrome.google.com/webstore/detail/godjlopkhiadfppdjhbekbppchinkmpi) 扩展


[SearchEngineJump_by_ted423]: https://greasyfork.org/scripts/213-searchenginejump-by-ted423