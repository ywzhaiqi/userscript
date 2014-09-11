自用修改版
=========

他人脚本的修改版。

注：不一定会随着作者更新而更新，有些脚本并没有在用。如果有问题，**请使用原版**。

### [Blacklist_Blocker_Rule.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/Blacklist_Blocker_Rule.user.js)

- [七星庐 - 基于黑名单的内容屏蔽脚本](http://qixinglu.com/post/blacklist_blocker_greasemonkey_script.html) 修改版。
- 添加2个例子站点规则
- 改进原自动翻页的监视方式

### [Google Images direct link.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/Google%20Images%20direct%20link.user.js)

- [Google Images direct link By Lorentz](http://userscripts.org/scripts/show/78355) 修改版。
- 相似图片搜索增加自动翻页的支持。
- PS：脚本自身已经支持自动翻页，但作者未将相似图片搜索支持自动翻页，可能是因为该方法会因为翻页页数的增加而造成工作量的增加。

### [Manga_OnlineViewer_CE.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/Manga_OnlineViewer_CE.user.js)

- [Manga OnlineViewer](https://greasyfork.org/scripts/1319-manga-onlineviewer) 修改版。
- 增加了几个站点：[5652 漫画网](http://mh.5652.com/)，[动漫之家漫画网](http://manhua.dmzj.com/)，[爱漫画](http://www.imanhua.com/)，[CC图库漫画网](http://www.tuku.cc/)，[新动漫网](http://www.xindm.cn/)，[看漫画](http://www.kkkmh.com/)，[动漫屋](http://www.dm5.com/)，[基德在线漫画网](http://www.jide123.net/)
- 第一个站点里面写了一些注释，可以参考下

### [PanLinkCheck.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/PanLinkCheck.user.js)

- [网盘死链检查 By Jixun](https://greasyfork.org/scripts/1262) 修改版
- **注意**：对百度盘链接的检查有严重 bug，由于同时对多个链接进行请求，会被百度盘临时封掉。所以我目前只对自己需要的网址添加 @include
- 修正 FireGestures 一拖曳就会检查的问题。
- 增加 360云盘 的检查（有效文件的检查未完成）
- 文件名加入英文（Scriptish 中文忽略的 bug）

### [TiebaNojump.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/TiebaNojump.user.js)

- 百度贴吧反跳转，根据某个版本增加楼中楼、翻页的支持。
- **已弃用，请改用 [百度贴吧不可能会跳转！](https://greasyfork.org/zh-CN/scripts/783-%E7%99%BE%E5%BA%A6%E8%B4%B4%E5%90%A7%E4%B8%8D%E5%8F%AF%E8%83%BD%E4%BC%9A%E8%B7%B3%E8%BD%AC)**

### [TxtReader.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/TxtReader.user.js)

- [txt小说阅读器 ](http://userscripts.org/scripts/show/185278) 修改版。
- 乱改了一通，实际上并未多大变化，仅仅更改了样式，禁用了文本替换功能（太耗时间）
- 用的次数不多，用到的时候发现问题改下

### [Video_wipe_ADs.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/Video_wipe_ADs.user.js)

- [Video wipe ADs](https://greasyfork.org/scripts/358-video-wipe-ads) 修改版。
- 修正 firefox 下的一个问题
- 完全改写代码结构

### [doubanIMDb.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/doubanIMDb.user.js)

- 2014-7-29，dirtyacc 修正烂番茄 ApiKey。详见 http://bbs.kafan.cn/forum.php?mod=viewthread&tid=1759550

### [picviewerCE.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/picviewerCE.user.js)

- [picViewer By NLF](http://userscripts.org/scripts/show/105741) 修改版
- 新增了几个站点的规则
- 新增了几个库的命令
    - 新窗口 `输出所有图片链接` （纯属测试）
    - 显示隐藏底部列表。可配合 [Manga_OnlineViewer_CE.user.js][] 脚本。

### [quick-view-douban 修正版.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/quick-view-douban%20%E4%BF%AE%E6%AD%A3%E7%89%88.user.js)

- [豆瓣快查 for Greasemonkey](http://userscripts.org/scripts/show/129416) 修改版。
- 修正电影搜索，电影搜索限制：每分钟10次（采用公开 api v2）
- 搜索面板增加图片的显示

### [searchenginejump.user.js](https://github.com/ywzhaiqi/userscript/blob/master/.%E4%BF%AE%E6%94%B9%E7%89%88/searchenginejump.user.js)

[直接安装地址](https://raw.githubusercontent.com/ywzhaiqi/userscript/master/.%E4%BF%AE%E6%94%B9%E7%89%88/searchenginejump.user.js)

- [searchEngineJump By NLF](http://userscripts.org/scripts/show/84970) 自用修改版。可改用 [SearchEngineJump_by_ted423](https://greasyfork.org/zh-CN/scripts/213-searchenginejump-by-ted423)，更加全面。
- 简化了原版的结构
- 修正 bing 因为改版失效的问题
- 修改 @include 不为全局
- 从 ted423 版中提取并添加了一些新的搜索
- 增加了监视标题变化的功能，随着标题的变化，会重新插入。主要是对百度、Google 不刷新页面搜索的支持。
- POST 的支持，来自 [POST 实现 - Greasy Forum](https://greasyfork.org/forum/discussion/1490/post-%E5%AE%9E%E7%8E%B0)

### [Youku_RSS.user.js](Youku_RSS.user.js)

- 修正了这类网址的插入位置，http://i.youku.com/u/UNTEzNTY1OTgw
- 这类网址怎么得到 RSS 订阅地址？http://www.youku.com/show_page/id_z6939e1f4c08611e38b3f.html