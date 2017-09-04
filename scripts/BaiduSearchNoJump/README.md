BaiduSearchNoJump
================

**此脚本已舍弃**

百度搜索反跳转。最早改自 [百度搜索反跳转](http://userscripts.org:8080/scripts/show/161812)，已和原版完全不一样。

- 放弃原服务器解析的方法，改用 HEAD 方式。
- 增加了翻页脚本的支持。
- 增加了不刷新页面、首页搜索的支持。
- [greasyfork 地址](https://greasyfork.org/scripts/1771)
- [github 地址](https://github.com/ywzhaiqi/userscript/tree/master/BaiduSearchNoJump)
- [卡饭论坛链接](http://bbs.kafan.cn/forum.php?mod=viewthread&tid=1736678&page=1&extra=#pid31492392)

### 更新

- [History for BaiduSearchNoJump.user.js - github](https://github.com/ywzhaiqi/userscript/commits/master/BaiduSearchNoJump/BaiduSearchNoJump.user.js)
- 2014-5-28，放弃重定向方法，改用监视内容部分变化的方法。增加 greasyfork 更新链接。
- 2014-5-28，增加 百度搜索 /#wd= 页面重定向到baidu?
- 2014-5-24，修正：跳过解析得到的非完整链接

### 旧的说明（已不准确）

1. 下一页的支持有2种方式（设置在脚本内 checkNextPageMethod，默认为 第一种）

	0 对 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize、 BaiduMonkeyW 脚本的支持，准确、资源消耗相对较小

	1 对所有脚本都适用，但不准确、消耗相对较大。如果脚本不在 0 的范围内，用这个。

2. 百度搜索 /#wd= 页面重定向到baidu?