Super_preloaderPlus.user.js
===========================

## 文件说明

- **Super_preloaderPlus_one.user.js**：修改增强2合1版本。[userscripts.org](http://userscripts.org/scripts/show/178900)。
- **Super_preloader_one.user.js**：整合自原版2个文件，微量修改。
- **Super_preloader_plus.user.js**
- **Super_preloader_plus.db.user.js**

### 说明

Firefox（Greasemonkey/Scriptish），Chrome（原生/Tampermonkey），Maxthon（暴力猴）

基于原脚本 [Super_preloader](http://userscripts.org/scripts/show/84937)，修改精简增强。**此版本不需要数据库文件**。

**Firefox 用户**还可使用 uc脚本 [uAutoPagerize2.uc.js](https://github.com/ywzhaiqi/userChromeJS/tree/master/uAutoPagerize2) ，共用同一数据库。

**Chrome 用户**推荐使用原生安装，Tampermonkey 更卡更耗资源且有些页面无法用 iframe 加载下一页（起点），缺点是无法自动更新。在 chrome 30 下简单测试，2组数据：`26M  35M  60M`，`40M  62M  118M`，分别为无、原生、Tampermonkey 下的内存占用。

**Admuncher(奶牛) 和 Tampermonkey 可能会有冲突**

### 具体修改说明

 - 修正：Discuz论坛帖子下一页必须使用 iframe 才能显示头像图片的问题。
 - 修正：内容为表格时分隔条错位的情况。
 - 修改了代码结构，删除了部分内容。
 - 修改：chrome 下用 iframe 加载下一页式的调用。 
 - 修改：原 xhttpRequest 改为 GM_xmlhttpRequest，可让一些站点在 Noscript 运行。
 - 修改：`relatedObj: true,` 则会根据规则的 `pageElement` 来计算页面底部。
 - 新增：新增或修正了诸多规则，增加了一些规则的 preLink。
 - 新增：新增了一些规则的 `replaceE`，可替换导航栏为下一页的导航栏。
 - 新增：分隔条显示实际页数（改自lastDream2013），参数 `separatorReal` 可控制各个站点是否显示。
 - 新增：图标状态的显示。
 - 新增：下一页添加后触发 `Super_preloaderPageLoaded` 事件。
 - 新增：`nextLink` 参数的数组形式。
 - 新增：`newIframe` 参数，每个下一页都使用新的 iframe，可以解决一些下一页按钮点击的问题。详见下面的使用注意。
 - 新增：`stylish` 参数，可对该站点样式进行修正。
 - 新增：`startFilter` 参数，找到规则后可先对页面进行提前处理。
 - 新增：`documentFilter(doc, requestURL, info)` 参数，对下一页 document 对象进行提前处理。
 - 新增：`filter(pages)` 参数，对新增页面后的处理。
 - 新增：小说阅读脚本启用后本脚本不再启用。
 - 提高速度，从以下几方面着手
     - 加入 @exclude
     - 禁用自动查找上一页功能，调用的时候才查找。
     - 修改一些规则的 iframe 加载下一页为 http 加载
     - 增加一些规则的上一页 xpath

### 独有的功能

 - Google 搜索下一页图片（视频）的显示，内置去除重定向
 - 百度贴吧下一页的点击放大，回复按钮可用
 - youtube 搜索页面下一页图片的显示
 - VeryCD 搜索页面图片的显示（非 iframe）
 - 天涯论坛帖子，修复只看楼主
 - 抽屉新热榜修复图片，推荐、收藏、评论点击
 - 小米论坛下一页第一层的修正

### 其它说明

- 在 Greasemonkey 等用户脚本命令处可设置为 **鼠标双击暂停翻页**。
- 如果需要 **默认预读**，修改 `enable: true,           // 启用自动翻页...` 为 `enable: false,`

### 新参数 newIframe 使用注意

`newIframe` 是为了解决下一页按钮点击的问题而新增的，每次加载下一页都采用新的 iframe。

以下面规则为例，`useiframe` 必须为 true，`iloaded` 一般为 true。`pageElement` 需要改成这样 `id("J_posts_list")/*`，而 `id("J_posts_list")` 则下一页点击无效。

        {name: 'Mozilla Firefox中文社区',
            url: '^http://www\\.firefox\\.net\\.cn/',
            nextLink: '//div[@class="pages"]/a[contains(text(), "下一页")]',
            autopager: {
                pageElement: 'id("J_posts_list")/*',
                useiframe: true,
                    iloaded: true,
                    newIframe: true
            }
        },

### 风险脚本的误报

[风险脚本过滤器](http://userscripts.org/scripts/issues/164600) 检测到：自动 follow。

它的检测正则是 `follow(_|\/|([^.\s]+)(\.|\?))`， 匹配脚本内 `following-sibling::*[.` 或 `following::a[contains(., \"Next\")]` 等。

### 更新

 - 2013年11月08日
     - [版本 5.5.0](http://userscripts.org/scripts/diff/178900/666293)。新增一些规则的replaceE。调整 Discuz 论坛的搜索或导读。"中关村在线"和"太平洋电脑网" 的阅读全部。新增 xda-developers 规则。改为 GM_xmlhttpRequest。
 - 2013年11月07日
     - [版本 5.4.8](http://userscripts.org/scripts/diff/178900/665799)。修正 Chrome 下去除重定向偶尔无作用的问题。
 - 2013年11月05日
     - [版本 5.4.7](http://userscripts.org/scripts/diff/178900/663877)。内置 Google 搜索去除重定向。
 - 2013年11月03日
     - [版本 5.4.6](http://userscripts.org/scripts/diff/178900/662220)。增加设置：鼠标双击暂停翻页。
     - [版本 5.4.5](http://userscripts.org/scripts/diff/178900/661941)。修正 newIframe 的问题。
     - [版本 5.4.4](http://userscripts.org/scripts/diff/178900/661936)。增加 天猫 - 搜索。更改百度贴吧为 newIframe 方式。
 - 2013年10月27日
     - [版本 5.4.3](http://userscripts.org/scripts/diff/178900/657464)。新增 `CC漫画网` 规则。
 - 2013年10月26日
     - [版本 5.4.1](http://userscripts.org/scripts/diff/178900/657157)。修正爱漫画。
     - [版本 5.4.2](http://userscripts.org/scripts/diff/178900/657246)。修正Firefox中文社区。
 - 2013年10月25日
     - [版本 5.4.0](http://userscripts.org/scripts/diff/178900/656659)。修正 newIframe。新增 firefox.net 下一页回复按钮可用。
 - 2013年10月22日，[版本 5.3.9](http://userscripts.org/scripts/diff/178900/655762)。
     - 修正 Tampermonkey 下导致 QQ 授权登录 的问题，反馈地址 [1071 楼](http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1555846&pid=29819838&fromuid=799029)
     - 新增规则 `桌酷壁纸`
 - 2013年10月21日，[版本 5.3.8](http://userscripts.org/scripts/diff/178900/655057)。
     - 悬浮框新增 `新iframe` 的点击，可以解决下一页图片或按钮点击的问题。
     - 新增规则 `手机网易网`、`手机凤凰网`、`手机环球网`、`TouringCarTimes`、`铁血`。
     - 规则的 `nextLink` 新增 Array 格式的识别。
     - 规则新增参数 `separatorReal`，是否显示真实的页数。
 - 2013年10月19日
     - [版本 5.3.7](http://userscripts.org/scripts/diff/178900/654123)。新增规则 `gelbooru, safebooru etc`。
     - [版本 5.3.6](http://userscripts.org/scripts/diff/178900/654044)。规则新增 `newIframe` 参数，下一页使用新的 iframe，能解决下一页按钮无法点击的问题。新增规则 `36氪`,`爱范儿`
 - 2013年10月18日
     - [版本 5.3.5](http://userscripts.org/scripts/diff/178900/653826)。修正 Chrome 原生安装百度贴吧下一页图片点击无效果的问题（无法访问外部变量）。
     - 版本 5.3.4。添加到历史记录功能改为默认禁用。新增 Discuz 论坛 - 导读 规则。
 - 2013年10月16日
     - [版本 5.3.3](http://userscripts.org/scripts/diff/178900/652749)。修正 userstyles.org 的规则
     - [版本 5.3.2](http://userscripts.org/scripts/diff/178900/652686)。**修正 Chrome 下 iframe 加载的问题**，修正 firefox.net 规则。
 - 2013年10月15日
     - [版本 5.3.1](http://userscripts.org/scripts/diff/178900/652359)。增加把下一页链接添加到历史记录的功能。
 - 2013年10月13日
     - [版本 5.3.0](http://userscripts.org/scripts/diff/178900/651568)。修改百度贴吧列表规则使其适用于 uAutoPagerize2。
     - [版本 5.2.9](http://userscripts.org/scripts/diff/178900/651541)。解决百度贴吧列表加载下一页后多个工具栏的情况。
     - [版本 5.2.8](http://userscripts.org/scripts/diff/178900/651475)。修改规则用于 Discuz论坛帖子 回复后插入到最后一页。去掉分隔条的 z-index。添加 youku、qiyi 到排除列表。
 - 2013年10月12日
     - [版本 5.2.6](http://userscripts.org/scripts/diff/178900/651153)。分隔条新增实际网页数的显示（改自 lastDream 2013）。
 - 2013年10月10日
     - [版本 5.2.5](http://userscripts.org/scripts/diff/178900/650353)。新增规则：虎嗅网。
 - 2013年10月09日
     - [版本 5.2.4](http://userscripts.org/scripts/diff/178900/649640)。
     - [版本 5.2.3](http://userscripts.org/scripts/diff/178900/649372)。修正[简书](http://jianshu.io/)下悬浮窗的问题。
 - 2013年10月08日
     - [版本 5.2.2](http://userscripts.org/scripts/diff/178900/648798)。修正非 FF、Tampermonkey 下 Array.slice 的兼容性。
     - [版本 5.2.1](http://userscripts.org/scripts/diff/178900/648746)。修正百度贴吧帖子下一页回复可用，修正 Array.slice 的兼容性。
 - 2013年10月07日
     - 版本 5.2.0。修正百度知道、新闻搜索规则。
     - 版本 5.1.9。规则的一些调整。
     - 版本 5.1.8。移除 underscorejs，增加多个规则，调整代码结构等。
 - 2013年10月04日，版本 5.1.6。引入 underscorejs，简化部分内容。
 - 2013年10月03日
     - 版本 5.1.5。修正 Chrome 下 iframe 加载的问题。
     - 版本 5.1.4。增加 Chrome 原生安装的支持。
     - 版本 5.1.3。Chrome 的某个 TM 版本在卡饭论坛  `window.addEventListener('scroll', timeoutfn, false);` 失效，改为 `unsafeWindow.addEventListener('scroll', timeoutfn, false);`。
 - 2013年10月02日，版本 5.1.2。同步更新数据库 [Super_preloader.db](http://userscripts.org/scripts/show/142198)。
 - 2013年10月01日，版本 5.1.1。移除 hashchange 事件，有 bug。
 - 2013年10月01日，版本 5.0.9。Google 首页等添加 hashchange 事件
 - 2013年9月....