百度搜索反跳转（修改版）
===================

改自 [百度搜索反跳转](http://userscripts.org:8080/scripts/show/161812)，增加了翻页脚本的支持。

下一页的检测有2种方式（设置在脚本内 checkNextPageMethod，默认为 第一种）
	0 对 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize、 BaiduMonkeyW 脚本的检测，准确、资源消耗相对更小
	1 对所有脚本都适用，但不准确、消耗相对较大。如果非上面的3个脚本，建议用这个。