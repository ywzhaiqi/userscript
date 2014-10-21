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

脚本内置一些常用站点的图标，如果图标不存在，请按示例加载最后面

    360音乐, http://s.music.so.com/s?ie=utf-8&q=%s, http://www.so.com/favicon.ico

如果是已经存在的域名，也可简写成 www.amazon.cn

	亚马逊（中）, http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s
	亚马逊（英）, http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=%s, www.amazon.cn

### 同类脚本或扩展

- [SearchEngineJump_by_ted423]
- [search_engineJump 文科版](https://greasyfork.org/scripts/2739-search-enginejump)
- chrome [search2](https://chrome.google.com/webstore/detail/godjlopkhiadfppdjhbekbppchinkmpi) 扩展


[SearchEngineJump_by_ted423]: https://greasyfork.org/scripts/213-searchenginejump-by-ted423