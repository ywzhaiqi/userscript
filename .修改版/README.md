自用修改版
=========

他人的脚本的修改版。**如有问题，请使用原版。**

### Blacklist_Blocker_Rule.user.js

[七星庐 - 基于黑名单的内容屏蔽脚本](http://qixinglu.com/post/blacklist_blocker_greasemonkey_script.html) 修改版。

 - 添加2个例子站点规则
 - 改进原自动翻页的监视方式

### doubanIMDb.user.js

2014-7-29，dirtyacc 修正烂番茄 ApiKey。详见 http://bbs.kafan.cn/forum.php?mod=viewthread&tid=1759550

### Google Images direct link.user.js

[Google Images direct link By Lorentz](http://userscripts.org:8080/scripts/show/78355) 修改版。

 - 相似图片搜索增加自动翻页的支持。

PS：脚本自身已经支持自动翻页，但作者未将相似图片搜索支持自动翻页，可能是因为该方法会因为翻页页数的增加而造成工作量的增加。

### Manga_OnlineViewer_CE.user.js

[Manga OnlineViewer](https://greasyfork.org/scripts/1319-manga-onlineviewer) 修改版

 - 增加了一个站点：[5652 漫画网](http://mh.5652.com/)

### PanLinkCheck.user.js（2014-5-27）

[网盘死链检查 By Jixun](https://greasyfork.org/scripts/1262)

 - **注意**：对百度盘链接的检查有严重 bug，由于同时对多个链接进行请求，会被百度盘临时封掉。所以我目前只对自己需要的网址添加 @include
 - 修正 FireGestures 一拖曳就会检查的问题。
 - 增加 360云盘 的检查（有效文件的检查未完成）
 - 文件名加入英文（Scriptish 中文忽略的 bug）

### picviewerCE.user.js（2014-7-26）

[picViewer By NLF](http://userscripts.org/scripts/show/105741) 修改版

 - 新增了几个站点的规则
 - 新窗口 `输出所有图片链接` 命令（纯属测试）

### quick-view-douban 修正版.user.js（2013-09-01）

[豆瓣快查 for Greasemonkey](http://userscripts.org:8080/scripts/show/129416) 修改版。

 - 修正电影搜索，电影搜索限制：每分钟10次（采用公开 api v2）
 - 搜索面板增加图片的显示

### searchenginejump.user.js（2014-7-2）

[searchEngineJump By NLF](http://userscripts.org/scripts/show/84970) 自用修改版。

 - 修正 bing 因为改版失效的问题
 - 修改 @include 不为全局
 - 参考 [SearchEngineJump_by_ted423](https://greasyfork.org/scripts/213-searchenginejump-by-ted423/) 新增了很多站点

### TiebaNojump.user.js

百度贴吧反跳转，根据某个版本增加楼中楼、翻页的支持。

### TxtReader.user.js

[txt小说阅读器 ](http://userscripts.org:8080/scripts/show/185278) 修改版。

 - 乱改了一通，实际上并未多大变化，仅仅更改了样式，禁用了文本替换功能（太耗时间）
 - 用的次数不多，用到的时候发现问题改下

### Video_wipe_ADs.user.js

[Video wipe ADs](https://greasyfork.org/scripts/358-video-wipe-ads) 修改版。

 - 修正 firefox 下的一个问题
 - 完全改写代码结构
