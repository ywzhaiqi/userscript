小说阅读脚本
============

### 文件说明

 - [MyNovelReader.user.js](MyNovelReader.user.js)，GM 脚本，[greasyfork 地址](https://greasyfork.org/scripts/292-my-novel-reader)
 - [MyNovelReader.mobile.js](MyNovelReader.mobile.js)，自用于 Opera Mobile 12，去除jQuery版。
 - old
    - [mynovelreader.3.0.4.user.js](old/mynovelreader.3.0.4.user.js)，由网友 Roger Au 设计的 3.0.4 版。
 	- [novelreaderdb@gmailcom.user.js](old/novelreaderdb@gmailcom.user.js)，自定义配置文件，旧版。
 	- [mynovelreader2.user.js](old/mynovelreader2.user.js)，2系列最后一个版本。
 	- [MyNovelReader3.user.coffee](old/MyNovelReader3.user.coffee)，2转3时用 coffee 写的，已弃用。
 	- [mynovelreader-iframe方式-有问题.user.js](mynovelreader-iframe方式-有问题.user.js)，采用 iframe 方式加载而不需要刷新页面。有问题，旧版。

### grunt 说明

安装 [Node.js](http://nodejs.org/) 和 [npm](https://npmjs.org/)，然后运行

    npm install -g grunt-cli
    npm install
    grunt

这时就会合并生成 MyNovelReader.user.js 文件。

 - 通过 `grunt` 命令合并生成 MyNovelReader.user.js 文件。
 - 通过 `grunt watch` 命令监视文件变化并自动生成。
 - 通过 `grunt getincludes` 命令提取 meta.js 中的 include 域名
 - windows 可通过 `mklink /H MyNovelReader.user.js FILEPATH` 命令创建硬链接，实现修改后 Greasemonkey 自动生效。
 - [新手上路 - Grunt 中文社区](http://www.gruntjs.org/docs/getting-started.html)

### 说明

Firefox（Greasemonkey/Scriptish）， Chrome（Tampermonkey），Maxthon（暴力猴），Opera（暴力猴）

3.0.4 界面由网友 Roger Au 设计，[安装地址](http://userscripts.org/scripts/version/165951/639713.user.js)

Opera 12 的暴力猴旧版本有个问题，请更新至新版。

[txt小说阅读器 for Greasemonkey](http://userscripts.org/scripts/show/185278)：简单的小说阅读插件，提供简单排版、章节索引、敏感字修复和网址过滤等功能。 

### 启用按钮

![按钮启用](http://i1277.photobucket.com/albums/y489/ywzhaiqi/My%20Novel%20Reader/542F7528630994AE_zps50c95a75.png)

### 启用后效果图

![效果图](http://i1277.photobucket.com/albums/y489/ywzhaiqi/My%20Novel%20Reader/6548679C56FE_zps42c320b1.png)

### 支持站点

- [起点中文网](http://www.qidian.com/Default.aspx)、[纵横中文网]( http://book.zongheng.com/)、[创世中文网](http://chuangshi.qq.com/)、晋江文学网、潇湘书院、逐浪等
- [燃文](http://www.ranwen.cc/)、[百晓生](http://www.bxs.cc/)、[无错](http://www.wcxiaoshuo.com/)、[书迷楼](http://www.shumilou.com/)、[冰火中文](http://www.binhuo.com/)、[浩奇](http://www.haoqi99.com/)、[书河](http://www.shuhe.cc/)、[热点书库](http://www.hotsk.com/)、[哈哈文学](http://www.hahawx.com/)、[读零零](http://www.du00.com/)、[手牵手](http://www.sqsxs.com/)、[万书吧](http://www.wanshuba.com/)等（[bookline.me](http://booklink.me/) 点击的网站）
- 角度吧、飞库、6小说、笔趣阁、强兵、摩卡、极速等（SoDu.so点击的网站）
- 手打吧、泡书吧、17k、[16K](http://www.16kbook.org/)、看下、青帝、侠客等
- [落秋中文](http://www.luoqiu.net/)、[吾读小说网](http://www.5du5.com/)、[平凡文学网](http://www.wtcxs.com/)
- 其它小说站点

### 特性

- 自动获取标题、内容、上一页、下一页、目录页链接。
- 自动加载下一页。
- 过滤页面广告。
- 小说屏蔽字修复。
- 无错、16K、第一中文等网站图片替换成文字。
- 大块文本分段。[测试链接1](http://www.geiliwx.com/GeiLi/21/21048/12731217.shtml)
- 自定义阅读样式。
- 自定义站点规则。

### 使用说明和技巧

- 默认设置从 booklink.me 点击的网站自动进入阅读模式
- **书签调用方式**：<a href="javascript:readx();">调用 My Novel Reader</a>，将此链接加为书签即可手动调用（右键或拖动到书签栏）。如果此链接无法正确显示，请手动设置地址为 javascript:readx\(\);
- **手动调用代码（Firefox）**: `content.window.wrappedJSObject.readx();`，再次调用退出。
- **辅助脚本：[booklime.me 辅助](http://userscripts.org/scripts/show/165572)**：一键打开未读章节。
- 鼠标双击内容暂停翻页。
- 鼠标中键点击 "退出" 按钮则为临时退出模式。
- 章节列表的标题为目录链接
- 章节列表左键点击滚动，中键打开链接（无阅读模式）

快捷键

 - `Enter` 键打开目录页，并已复制当前的章节标题到剪贴板，可用于查找
 - `Left` 键滚到上一页，到顶部则打开上一章
 - `Right` 键滚到下一页，到底部则打开下一章
 - `c` 键切换左侧的章节列表
 - `s` 键打开设置界面

### 自定义规则说明

已 [http://www.mossiella.com/html/255.html](http://www.mossiella.com/html/255.html) 为例

 1. 打开 Greasemonkey 管理脚本页面
 2. 找到 My Novel Reader 脚本，打开选项，添加包含网址：http://www.mossiella.com/html/*.html
 3. 在本脚本设置界面的 **自定义站点规则** 加入下面的规则，刷新页面即可

```js
[{
    url: "^http://www\\.mossiella\\.com/html/\\d+\\.html",
    bookTitleSelector: "a[rel='category tag']",
    contentRemove: ".navi, > strong, #commentform",
}, ]
```

#### 旧版规则（已弃用）

安装 https://userscripts.org/scripts/show/169728 后在里面添加，说明在其中。

### 可参考的脚本或扩展

- [Tategaki Novel](https://greasyfork.org/zh-CN/scripts/882-tategaki-novel)，小说横排。
    - 测试链接：http://www.pixiv.net/novel/show.php?id=4547114

### 更新

- 详见 [History for MyNovelReader - github.com](https://github.com/ywzhaiqi/userscript/commits/master/MyNovelReader)
- .....
- 2013年12月07日
    - [版本 3.7.9](http://userscripts.org/scripts/diff/165951/689214)。修正几个规则。
- 2013年11月28日
    - [版本 3.7.8](http://userscripts.org/scripts/diff/165951/683232)。修正设置无法预览的情况。
- 2013年11月27日
    - [版本 3.7.7](http://userscripts.org/scripts/diff/165951/681561)。增加都来读小说网规则。
- 2013年11月24日
    - [版本 3.7.6](http://userscripts.org/scripts/diff/165951/678723)。修正飞卢小说网图片，[反馈](http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1556975&pid=30047632&fromuid=799029)。
    - [版本 3.7.5](http://userscripts.org/scripts/diff/165951/678680)。修正69中文规则，[反馈](http://userscripts.org/topics/135470)。
- 2013年11月22日
    - [版本 3.7.4](http://userscripts.org/scripts/diff/165951/675976)。新增 D586小说网。内置 jquery.easing，修改 @resource 为 http。
- 2013年11月21日
    - [版本 3.7.3](http://userscripts.org/scripts/diff/165951/674885)。调整几个站点规则。
- 2013年11月12日
    - [版本 3.7.2](http://userscripts.org/scripts/diff/165951/668716)。修正几个规则。增加自定义站点设置。增加双击暂停设置。
- 2013年11月11日
    - [版本 3.7.1](http://userscripts.org/scripts/diff/165951/667724)。修正3Z中文网规则。增加 checkContent。取消 Chrome 的再次加载。
- 2013年11月10日
    - [版本 3.7.0](http://userscripts.org/scripts/diff/165951/667535)。增加 [笔下阁](http://www.bixiage.com/)，123du.cc 规则
- 2013年11月07日
    - [版本 3.6.9](http://userscripts.org/scripts/diff/165951/665689)。增加绿色背景2，其它一些小调整。
- 2013年11月05日
    - [版本 3.6.8](http://userscripts.org/scripts/diff/165951/663785)。修正 bug，优化结构，增加是否隐藏设置按钮。
- 2013年11月04日
    - [版本 3.6.7](http://userscripts.org/scripts/diff/165951/663596)。增加 [看书啦](http://www.kanshu.la)，[反馈](http://userscripts.org/topics/134334)。增加 `安静模式`，s键调出设置界面，esc键退出，[反馈](http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1556975&pid=29884946&fromuid=799029)。增加 `是否添加下一页到历史记录` 的设置。
    - [版本 3.6.6](http://userscripts.org/scripts/diff/165951/662687)。修正上个版本的 Chrome 下的 bug。
    - [版本 3.6.5](http://userscripts.org/scripts/diff/165951/662672)。改进百晓生过滤规则。增加切换左侧列表快捷键的修改。
- 2013年11月03日，[版本 3.6.4](http://userscripts.org/scripts/diff/165951/661843)
    - 增加 [顶点小说](http://www.xs222.com)、[豌豆文学网](http://www.wandoou.com)，反馈自 [能不能加上顶点小说 - Userscripts.org](http://userscripts.org/topics/134251)
    - 修正快捷键 C 键问题，修正启动问题，反馈自 [648 楼](http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1556975&pid=29890748&fromuid=799029)
- 2013年10月31日
    - [版本 3.6.3](http://userscripts.org/scripts/diff/165951/660858)。修正百晓生过滤规则，修正 Opera 12 下一页加载的问题。
- 2013年10月30日
    - [版本 3.6.2](http://userscripts.org/scripts/diff/165951/659625)。更改 @require 链接为 https。
- 2013年10月29日
    - [版本 3.6.1](http://userscripts.org/scripts/diff/165951/659381)。修正着笔中文，来自 [着笔中文不支持了吗？ - Userscripts.org](http://userscripts.org/topics/133888)
    - [版本 3.6.0](http://userscripts.org/scripts/diff/165951/659374)。更改 @require 地址。增加一个背景，来自 [希望添加个底色 - Userscripts.org](http://userscripts.org/topics/133884)。
    - [版本 3.5.9](http://userscripts.org/scripts/diff/165951/659081)。增加 [大豪门](http://www.dahaomen.net/) 规则，修正百晓生。
- 2013年10月28日
    - [版本 3.5.8](http://userscripts.org/scripts/diff/165951/658460)。新增 `zhuzhudao.cc`。
- 2013年10月27日
    - [版本 3.5.7](http://userscripts.org/scripts/diff/165951/657662)。新增 `笔下中文` 站点。contentRemove 移到后面。
- 2013年10月25日
    - [版本 3.5.6](http://userscripts.org/scripts/diff/165951/656596)。拼音字误替换修正。增加规则 `小说阅读网`。
- 2013年10月20日
    - [版本 3.5.5](http://userscripts.org/scripts/diff/165951/654614)。调整设置界面。
    - [版本 3.5.4](http://userscripts.org/scripts/diff/165951/654548)。增加或修正规则：易读、百晓生、16K小说网、热点、落秋中文、五月中文网。设置窗口弹出时增加 loadBlocker。
- 2013年10月19日
    - [版本 3.5.3](http://userscripts.org/scripts/diff/165951/654031)。修正规则，增加`努努书坊`规则。
- 2013年10月18日
    - [版本 3.5.2](http://userscripts.org/scripts/diff/165951/653647)。修正 Chrome 下的字体图标。修正 onload 方式的启用。 
- 2013年10月17日
    - [版本 3.5.1](http://userscripts.org/scripts/diff/165951/653432)。修正距离底部加载立即生效。
    - [版本 3.5.0](http://userscripts.org/scripts/diff/165951/653263)。拼音字修复移至内容处理的头部。改 this 为 App。改内容的id为`mynovelreader-content`，防止被原脚本添加样式。
- 2013年10月15日
    - [版本 3.4.9](http://userscripts.org/scripts/diff/165951/652422)。修正鼠标中键临时退出的问题。
    - [版本 3.4.8](http://userscripts.org/scripts/diff/165951/652328)。Tampermonkey 下有时候无法启动脚本，尝试 load 后再次运行脚本。
- 2013年10月14日
    - [版本 3.4.7](http://userscripts.org/scripts/diff/165951/651922)。增加：加载下一页后添加历史记录功能。
- 2013年10月13日
    - [版本 3.4.6](http://userscripts.org/scripts/diff/165951/651567)。修正规则。
    - [版本 3.4.5](http://userscripts.org/scripts/diff/165951/651485)。添加 书农在线书库，增加 行高 的设置。
- 2013年10月11日
    - [版本 3.4.4](http://userscripts.org/scripts/diff/165951/650635)。修正上几个版本带来的 bug：滚动后没有激活章节列表。
    - [版本 3.4.3](http://userscripts.org/scripts/diff/165951/650532)。修正左边目录鼠标点击的问题（改 a 为 div，因为 a 在 Firefox 24 下鼠标中键点击后无法阻止默认的动作）。
    - [版本 3.4.2](http://userscripts.org/scripts/diff/165951/650482)。修正左边目录中键点击打开2个章节的问题。
    - [版本 3.4.1](http://userscripts.org/scripts/diff/165951/650258)。增加 `免费小说阅读网` 规则。
- 2013年10月09日
    - [版本 3.4.0](http://userscripts.org/scripts/diff/165951/649399)。修正晋江、燃文的标题。
    - [版本 3.3.9](http://userscripts.org/scripts/diff/165951/649379)。修正 Chrome 的 Tampermonkey 下滚动无法加载下一页（TM 的问题，改 `$(window).scroll(throttled);` 为 `$(unsafeWindow).scroll(throttled);` 后正常），改善书河小说网过滤规则。
- 2013年10月08日
    - [版本 3.3.8](http://userscripts.org/scripts/diff/165951/648862)。修正非 Firefox 下自动获取标题的问题。 
    - 版本 3.3.7。移动设置的保存退出按钮到上面。
- 2013年10月07日，版本 3.3.6。晋江 @include 修正，增加几个拼音字。
- 2013年10月05日
    - 版本 3.3.5。增加 六九中文 规则。
    - 版本 3.3.4。引入 underscorejs，代码的改写。新增1个站点，修正滚动。
- 2013年10月02日
    - 版本 3.3.3。新增2个站点，修改设置输入框的大小，改进自动获取标题的兼容性。
    - 版本 3.3.2。新增2个站点，改进图标字体的 url，修改滚动的效果。 
- 2013年9月30日，版本 3.3.1。fix bug for Chrome。
- 2013年9月29日，版本 3.3.0。修正几个规则，增加对下一页等链接的筛选。
- 2013年9月28日
    - 版本 3.2.9。修正读零零最后一页的判定。
    - 版本 3.2.8。增加字体设置。
    - 版本 3.2.7。修正创世纪加载下一页的问题。调整变量名。改 keyup 为 keydown。
- 2013年9月27日
    - 版本 3.2.6。增加3个站点，修正自动获取标题，修正内容的误删除，修正距离底部的判断，修正组合快捷键的问题（Ctrl + c 等不生效）。
    - 版本 3.2.4。增加隐藏导航条设置，增加快捷键 c 切换章节列表。
    - 版本 3.2.3。fix bug: 滚动未激活章节列表。增加点击书名复制当前标题功能。略微调整激活条样式。
- 2013年9月26日
    - 版本 3.2.2。fix bug: 底部高度的计算。修正读零零小说网的配置。
    - 版本 3.2.1。增加滚动激活章节列表，左键、右键的事件。增加设置默认隐藏章节列表。
- 2013年9月25日
    - 版本 3.1.9。增加左侧的章节列表，点击可隐藏，滚动激活功能待添加。默认隐藏底部导航栏。
    - 版本 3.1.8。再次修正起点中文图片问题。
    - 版本 3.1.7。修正自动查找标题的问题，设置菜单关闭还原不生效。
- 2013年9月24日
    - 版本 3.1.6。修改起点配置，增加对图片的支持。
    - 版本 3.1.5。新增读零零小说网配置，新增多节合并成一章的功能。
- 2013年9月23日
    - 版本 3.1.4。飘天文学增加移除广告
    - 版本 3.1.3。增加飘天文学
    - 版本 3.1.2。修正内容的移除。
    - 版本 3.1.1。设置的保存改为不刷新页面。
    - 版本 3.1.0。暂时放弃 3.0.4 的界面，增加皮肤的选择、字体大小等图形设置。
- 2013年9月17日
    - 版本 3.0.4。更改 fontawesome 字体链接到 google code，补全站点规则的 titleReg。
    - 版本 3.0.3。fix bug.
    - 版本 3.0.2。修复设置界面重复显示2次的bug，修复起点设置按钮消失的问题。
- 2013年9月16日，
    - 版本 3.0.1。修复 Chrome 下的字体图标问题。
    - 版本 3.0.0。版本界面大改版，由网友 Roger Au 设计，截图未更新。
- 2013年9月14日，版本 2.7.9。改进 3z中文网 规则
- 2013年8月25日，版本 2.7.5。修复内容首行缩进，改进 mutation
- 2013年8月22日，版本 2.7.4。增加内容 mutation（未完善，用于创世纪等），修改启动方式
- .....
- 2013年7月18日，版本 2.5.3。增加站点：创世中文网，添加 history.pushState
- 2013年7月04日，版本 2.5.1。新增了一些小说屏蔽字修复。
- 2013年6月25日，版本 2.5.0。新增站点 92to。
- 2013年6月24日，版本 2.4.8。
    - 改善冰火图片加载的问题。
- 2013年6月23日，版本 2.4.7。
    - 百晓生站点配置的改进。
- 2013年6月22日，版本 2.4.6。
    - 增加正在加载下一页的提示。
    - 增加已到达最后一页的提示。
- 2013年6月21日，版本 2.4.5。
    - 几乎重新设置了 @include 列表，以防止在其他页面自动进入阅读模式。
    - 修正了某些时候需要再次刷新才会自动启用的问题。
    - 修改增加了一些拼音的替换。
    - 增加了 laishuwu、shushuw、zhaoxiaoshuo 几个站点配置。
    - 增加了3Z中文网配置，来自 @wolfar。
    - 完善了啃书的自动启用范围和图片居中修正。
    - 完善了百晓生的站点配置。
    - 标题间增加了空格，例：`第631章一拳轰杀` 变成 `第631章 一拳轰杀`。
    - 增加了自适应网页设计。
- 2013年6月20日，版本 2.4.4。**修复有些图片网站被屏蔽字修复误替换的严重问题**
- 2013年6月19日，版本 2.4.3。改善内容中误移除标题的问题。
- 2013年6月18日，版本 2.4.2。改善 noscript 下的支持（iframe加载下一页的除外）。
- 2013年6月17日，版本 2.4.1。修复 Chrome 下退出按钮的问题。
- 2013年6月17日，版本 2.4.0。
    - 修改无错和16K图片全局替换为个别替换。
    - 新增配置参数 contentReplace 的另一种写法：`contentReplace: {'<img.*?ait="(.*?)".*?>': "$1",}`
    - 增加第一中文的站点配置
- 2013年6月15日，版本 2.3.8。增加无措和16kbook图片的替换，修复Chrome下加载下一页的bug。
- 2013年6月13日，版本 2.3.7。完善框架内的运行，个别站点还有问题。
- 2013年6月11日，版本 2.3.2。完善非 Firefox 下标题的获取。
- 2013年6月11日，版本 2.3.1。
    - 增加图片居中的修正，旧版自定义文件需要在 css 增加 `.content img.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}\`。
    - 修复按钮退出后 booklink.me 无法自动启用的问题。可能需要刷新一下页面。
- 2013年6月10日，版本 2.3.0。
    - 增加自定义站点设置，**需手动更新个人配置文件**，更新时请备份。
    - 增加 iframe 方式加载下一页。
    - 完善屏蔽字修复误替换图片。
- 2013年6月09日
    - 版本 2.2.9。修复内容中移除标题过度的问题。
    - 版本 2.2.8。修复屏蔽字替换造成图片错误的问题。
    - 版本 2.2.7。修复cookie禁用时脚本不能运行的问题和通知有时不能显示的问题。
- 2013年6月08日，版本 2.2.6。增加修改图标位置功能。
- 2013年6月08日，版本 2.2.3。
    - 新增了大量屏蔽字修复（来自小说下载阅读器）。
    - 修复了由于屏蔽字修复带来的起点个别内容替换过多的问题。
    - 恢复了 config 中 booklinkme 跳转的设置
    - AUTO_ENABLE 默认设置更改为 true，即进入阅读模式后会一直启用直至退出。但一些网站自动启用会有影响，此时请反馈作者或到脚本管理器加入排除列表。
- 2013年6月08日，版本 2.2.1。**这版本改动较大**
    - 更改默认样式为 defpt 版本略加修改。
    - 增加小说屏蔽字修复功能，来自 [小说屏蔽字修复 for Greasemonkey](https://userscripts.org/scripts/show/128277)
    - 增加阅读模式下退出按钮，如果 `config.AUTO_ENABLE=true` 则进入阅读模式后每个站点都会自动启用，但一些站点的目录也可能会启用，通知作者或在脚本管理器自行加入排除列表。
    - 增加阅读模式下鼠标双击停止翻页。（来自 Super_preloader）。
    - 增加了一些主页的排除，优化了目录链接的获取。
    - 大幅重整了代码。
    - 去掉了 GM 设置字体。
    - config 中 booklinkme 跳转已失效，会导致退出按钮失效。
- 2013年6月06日，版本 2.1。完善了对 Opera 暴力猴下的支持，更改了部分站点信息。
- 2013年6月05日，版本 **2.0**。采用全新的方法自动查找标题，新增了外部配置文件的支持（参考了部分Super_preloader代码），完善了部分内容。
- 2013年6月03日，版本 1.8。较多改进。重写了自动获取标题（学习了Clealy），其它多项修改。
- 2013年5月30日
    - 版本 1.7。增加了一些站点，改进了自动获取标题。
    - 版本 1.6.1。修复塔读文学
- 2013年5月28日，版本 1.6。修复个别站点内容去除广告过多的问题。
- 2013年5月14日，版本 1.5。限制在指定的一些网站中，未在范围的网站不生效。
- 2013年5月13日，版本 1.4。增加右边 "阅读模式" 按钮，改自动启用为手动启用。
- 2013年5月08日，版本 1.3。更改字体为18px, 增加了字体设置功能，完善了一些站点的配置。
- 2013年5月01日，版本 1.2。改为默认自动启用，如需禁止，取消 Greasemonkey 的勾选。单个站点启用禁用未完善。
- 2013年4月28日，版本 1.1。完善了大量的站点。如起点等