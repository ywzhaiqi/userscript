百度搜索反跳转（修改版）
===================

改自 [百度搜索反跳转](http://userscripts.org:8080/scripts/show/161812)，增加了翻页脚本的支持、#wd= 页面的重定向。

1. 下一页的支持有2种方式（设置在脚本内 checkNextPageMethod，默认为 第一种）

	0 对 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize、 BaiduMonkeyW 脚本的支持，准确、资源消耗相对较小

	1 对所有脚本都适用，但不准确、消耗相对较大。如果脚本不在 0 的范围内，用这个。

2. 百度搜索 /#wd= 页面重定向到baidu?