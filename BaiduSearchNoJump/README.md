BaiduSearchNoJump
================

百度搜索反跳转。最早改自 [百度搜索反跳转](http://userscripts.org:8080/scripts/show/161812)，已和原版本完全不一样。

- 放弃原服务器解析的方法，改用 HEAD 方式。
- 增加了翻页脚本的支持。
- 增加了不刷新页面、首页搜索的支持。

[greasyfork 地址](https://greasyfork.org/scripts/1771)，[github 地址](https://github.com/ywzhaiqi/userscript/tree/master/%E7%99%BE%E5%BA%A6%E6%90%9C%E7%B4%A2%E5%8F%8D%E8%B7%B3%E8%BD%AC%EF%BC%88%E4%BF%AE%E6%94%B9%E7%89%88%EF%BC%89)

### 旧的说明（已不准确）

1. 下一页的支持有2种方式（设置在脚本内 checkNextPageMethod，默认为 第一种）

	0 对 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize、 BaiduMonkeyW 脚本的支持，准确、资源消耗相对较小

	1 对所有脚本都适用，但不准确、消耗相对较大。如果脚本不在 0 的范围内，用这个。

2. 百度搜索 /#wd= 页面重定向到baidu?