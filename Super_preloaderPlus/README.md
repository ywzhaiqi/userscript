Super_preloaderPlus
===================

## 文件说明

- **Super_preloaderPlus_one.user.js**：修改增强2合1版本。[greasyfork.org](https://greasyfork.org/scripts/293-super-preloaderplus-one)，[userscripts.org](http://userscripts.org/scripts/show/178900)。
- old
	- **Super_preloader_one.user.js**：整合自原版2个文件，微量修改。
	- **Super_preloader_plus.user.js**
	- **Super_preloader_plus.db.user.js**

### 说明

Firefox（Greasemonkey/Scriptish），Chrome（原生/Tampermonkey），Maxthon（暴力猴）

基于 NLF 的 [Super_preloader](http://userscripts.org/scripts/show/84937) 脚本和 vokins 的 [Super_preloader.db](http://userscripts.org/scripts/show/142198)，修改精简增强。**此版本为2合1版本，不需要数据库文件**。

**Firefox 用户**还可使用 uc脚本 [uAutoPagerize2.uc.js](https://github.com/ywzhaiqi/userChromeJS/tree/master/uAutoPagerize2) ，共用同一数据库，2者各有特点。

**Chrome 用户**，使用 Tampermonkey 方式在某些页面会让内存暴增，而使用原生安装则无此问题，但原生安装无法自动更新，新增的设置无法持久保存。

注：Chrome 高版本已不再支持官方市场以外的扩展或脚本。

 - 在 Chrome 30 下简单测试，2组数据：`26M  35M  60M`，`40M  62M  118M`，分别为无、原生、Tampermonkey 下的内存占用。

#### Chrome 下不同页面内存占用测试

注：暴力猴采用 "正在开发的扩展" 安装方式。

 无  | 暴力猴 |            TM            |                          测试页面                          |                           说明                          
-----|--------|--------------------------|------------------------------------------------------------|---------------------------------------------------------
32M  | 44M    | 71M                      | http://bbs.kafan.cn/forum-215-1.html                       |                                                         
32M  | 43M    | 66M                      | https://www.google.com.hk/search?q=firefox                 |                                                         
93M  | 135M   | 303M（未成功运行时195M） | http://news.sina.com.cn/c/sd/2013-11-08/165728658916.shtml | 该页面有 9 个 iframe，TM下在该页面需要再次刷新才能运行？
164M | 266M   | 可能会600M               | http://money.163.com/14/0526/07/9T5F25JE00253B0H.html      | 该页面有 30 个 iframe                                   


### 具体修改说明

 - 修正：Discuz论坛帖子下一页必须使用 iframe 才能显示头像图片的问题。
 - 修正：内容为表格时分隔条错位的情况。
 - 修改了代码结构，删除了部分内容。
 - 修改：chrome 下用 iframe 加载下一页式的调用。 
 - 修改：原 xhttpRequest 改为 GM_xmlhttpRequest，可让一些站点在 Noscript 运行。
 - 新增：新增或修正了诸多规则，增加了一些规则的 preLink。
 - 新增：新增了一些规则的 `replaceE`，可替换导航栏为下一页的导航栏。
 - 新增：分隔条显示实际页数（改自lastDream2013），参数 `separatorReal` 可控制各个站点是否显示。
 - 新增：图标状态的显示。
 - 新增：下一页添加后触发 `Super_preloaderPageLoaded` 事件。
 - 规则
    - 修改：`relatedObj: true,` 则会根据规则的 `pageElement` 来计算页面底部。
    - 新增：`nextLink` 参数的数组形式。
    - 新增：`lazyImgSrc` 参数。
    - 新增：`newIframe` 参数，每个下一页都使用新的 iframe，可以解决一些下一页按钮点击的问题。详见下面的使用注意。
    - 新增：`stylish` 参数，可对该站点样式进行修正。
    - 新增：`startFilter` 参数，找到规则后可先对页面进行提前处理。
    - 新增：`documentFilter(doc, requestURL, info)` 参数，对下一页 document 对象进行提前处理。
    - 新增：`filter(pages)` 参数，对新增页面后的处理。
 - 新增**设置界面**，Chrome 原生安装无用。
 - 新增：小说阅读脚本启用后本脚本不再启用。
 - 提高速度，从以下几方面着手
     - 加入 @exclude
     - 禁用自动查找上一页功能，调用的时候才查找。
     - 修改一些规则的 iframe 加载下一页为 http 加载
     - 增加一些规则的上一页 xpath

### 独有的功能

 - Google 搜索下一页图片（视频）的显示，内置去除重定向
 - *百度贴吧下一页的点击放大，回复按钮可用，已失效，请改用 [Tieba Preload](https://greasyfork.org/scripts/282-tieba-preload)*
 - youtube 搜索页面下一页图片的显示
 - VeryCD 搜索页面图片的显示（非 iframe）
 - 天涯论坛帖子，修复只看楼主
 - 抽屉新热榜修复图片，推荐、收藏、评论点击
 - 小米论坛下一页第一层的修正

### 其它说明

- 默认为 **Ctrl + 左键长按** 暂停翻页，可点击悬浮窗的设置按钮，或 Greasemonkey 用户脚本命令处（暴力猴的脚本命令处）点击设置菜单进行设置。
- 如果需要 **默认预读**，修改 `enable: true,           // 启用自动翻页...` 为 `enable: false,`

### 添加自定义站点规则

**注**：Chrome 原生安装不支持。

更新脚本到最新版。已 [H!P Crapola](http://forum.jphip.com/index.php?board=87.0) 为例，在设置的 `自定义站点规则` 中填入

    [{name: 'forum.jphip.com',
        url: /^http:\/\/forum\.jphip\.com\/index\.php.*$/i,
        exampleUrl: 'http://forum.jphip.com/index.php?board=87.0',
        nextLink: '//div[@id="mainarea"]/div/div/strong[1]/following-sibling::a[1]',
        autopager: {
            pageElement: 'id("messageindex")/table/tbody/tr',
        }
    },]

刷新后就可以看到效果。

**注意**：请确保规则的正确，特别是多重引号的问题。


### 新参数 newIframe 使用注意

`newIframe` 是为了解决下一页按钮点击的问题而新增的，每次加载下一页都采用新的 iframe。

以下面规则为例，`useiframe` 必须为 true。`pageElement` 需要改成这样 `id("J_posts_list")/*`，而 `id("J_posts_list")` 则无效。

        {name: 'Firefox中文社区 - 帖子',
            url: '^http://www\\.firefox\\.net\\.cn/read',
            nextLink: '//div[@class="pages"]/a[contains(text(), "下一页")]',
            autopager: {
                pageElement: 'id("J_posts_list")/*',
                useiframe: true,
                    newIframe: true
            }
        },

### Google 搜索的说明

Super\_preloaderPlus\_one 脚本不支持从 Google 主页搜索的翻页，只能用这样的搜索

 [https://www.google.com/search?q=firefox](https://www.google.com/search?q=firefox)

这两类半支持

 [https://www.google.com/#newwindow=1&q=firefox](https://www.google.com/#newwindow=1&q=firefox) 
 [https://www.google.com/webhp?q=firefox#newwindow=1&q=firefox&safe=strict](https://www.google.com/webhp?q=firefox#newwindow=1&q=firefox&safe=strict)。

### 更新

 - 以后的更新日志请看 [History for Super_preloaderPlus - ywzhaiqi/userscript · GitHub](https://github.com/ywzhaiqi/userscript/commits/master/Super_preloaderPlus)
 - 2014年05月05日
     - [版本 6.0.2](http://userscripts.org/scripts/diff/178900/1076518)。修正设置中载入`自定义站点规则`的问题。
 - 2014年05月03日
     - [版本 6.0.1](http://userscripts.org/scripts/diff/178900/1074329)。加入全局的 lazyImgSrc，完善对下一页 lazyload 图片的支持，并对预读同样生效。
 - 2014年04月29日
     - [版本 6.0.0](http://userscripts.org/scripts/diff/178900/1071644)。修正3DMGAME、糗事百科。
 - 2014年04月28日
     - [版本 5.9.9](http://userscripts.org/scripts/diff/178900/1071140)。修正天涯论坛、bbs.8264.com下一页图片问题。
     - [版本 5.9.8](http://userscripts.org/scripts/diff/178900/1071114)。百度贴吧帖子加入到排除列表。新增威锋论坛搜索、PortableAppC、phpBB Search规则。修正扑家汉化平台、Show妹子规则。修正分隔条上下页图片可能被放大的问题。
 - 2014年04月15日
     - [版本 5.9.7](http://userscripts.org/scripts/diff/178900/1041682)。修正 mycd.qq.com 下一页图片问题，修正威锋论坛翻页问题。
 - 2014年04月10日
     - [版本 5.9.6](http://userscripts.org/scripts/diff/178900/1034965)。百度贴吧列表加入到排除列表，加入多个PT站点、京东、亚马逊规则，修正178.com。
 - 2014年03月03日
     - [版本 5.9.5](http://userscripts.org/scripts/diff/178900/951302)。修正规则：百度搜索、mozest社区。
 - 2014年03月02日
     - [版本 5.9.4](http://userscripts.org/scripts/diff/178900/950203)。修正规则：百度贴吧帖子、pconline。
 - 2014年02月23日
     - [版本 5.9.3](http://userscripts.org/scripts/diff/178900/938547)。增加规则：Final Fantasy Shrine Forums。
 - 2014年02月16日
     - [版本 5.9.2](http://userscripts.org/scripts/diff/178900/922776)。修正规则：创业帮、VeryCD分类资源页，新增规则：虎扑篮球论坛。
 - 2014年01月29日
     - [版本 5.9.1](http://userscripts.org/scripts/diff/178900/818746)。修正weiphone、userscripts 个别网页的支持。
 - 2014年01月21日
     - [版本 5.9.0](http://userscripts.org/scripts/diff/178900/813880)。新增重灌狂人、SF在线漫画规则。
 - 2014年01月17日
     - [版本 5.8.9](http://userscripts.org/scripts/diff/178900/808575)。增加萝卜网规则，修正糗事百科、抽屉新热榜规则。
 - 2014年01月08日
     - [版本 5.8.8](http://userscripts.org/scripts/diff/178900/757880)。增加规则：火星网、很BT电影联盟、艾泽拉斯国家地理论坛、桌酷壁纸。
 - 2014年01月06日
     - [版本 5.8.7](http://userscripts.org/scripts/diff/178900/733463)。增加规则：美国中文网、天天资源网、天使漫画网。
 - 2013年12月30日
     - [版本 5.8.6](http://userscripts.org/scripts/diff/178900/702548)。增加百度文库搜索，修正卡饭论坛另一种形式的搜索。
 - 2013年12月27日
     - [版本 5.8.5](http://userscripts.org/scripts/diff/178900/700185)。增加搜狐新闻规则。
 - 2013年12月26日
     - [版本 5.8.4](http://userscripts.org/scripts/diff/178900/699378)。修正人民网新闻规则。
 - 2013年12月22日
     - [版本 5.8.3](http://userscripts.org/scripts/diff/178900/697838)。增加规则：和讯财经微博、720P电影下载、CMCT高清影视乐园PT站和chdbits。百度贴吧下一页回复不再可用。
 - 2013年12月21日
     - [版本 5.8.2](http://userscripts.org/scripts/diff/178900/696768)。增加规则：漫画频道_游侠网，[反馈](http://userscripts.org/topics/136218)。
 - 2013年12月20日
     - [版本 5.8.1](http://userscripts.org/scripts/diff/178900/695600)。增加设置：默认启用自动翻页。增加规则：杀价帮3C导购网、IT之家极速版、TTmeiju.Com。
 - 2013年12月17日
     - [版本 5.8.0](http://userscripts.org/scripts/diff/178900/693486)。增加几个规则。
 - 2013年12月15日
     - [版本 5.7.9](http://userscripts.org/scripts/diff/178900/691349)。增加 默认启用 iframe 预读、强制拼接默认启用自动翻页设置。
 - 2013年12月14日
     - [版本 5.7.8](http://userscripts.org/scripts/diff/178900/691105)。增加 DLsite、Gyutto.com 検索結果，[反馈](http://userscripts.org/topics/136012)
 - 2013年12月8日
     - [版本 5.7.7](http://userscripts.org/scripts/diff/178900/689476)。增加 exhentai 规则，来自 [这里](http://userscripts.org/topics/135829)。完善几个手机站点规则。
 - 2013年12月7日
     - [版本 5.7.6](http://userscripts.org/scripts/diff/178900/689255)。看漫画改用非 iframe 方式，新增规则 haruhichan.com
     - [版本 5.7.5](http://userscripts.org/scripts/diff/178900/689175)。修正增加规则：抢了个便宜、Solidot、前程无忧 - 搜索、善用佳软、User Scripts、User Styles。修正GM_addStyle、实际网页页数可能造成的bug。
 - 2013年12月6日
     - [版本 5.7.4](http://userscripts.org/scripts/diff/178900/688960)。恢复对 Opera 的支持，新增多个手机站点规则，删减规则后可用于 Opera 12 for Mobile。
 - 2013年12月4日
     - [版本 5.7.3](http://userscripts.org/scripts/diff/178900/688218)。新增修改规则：淘宝论坛、游侠网 - 新闻、3DMGAME。修正规则的 filter 的问题。 
     - [版本 5.7.2](http://userscripts.org/scripts/diff/178900/688129)。修正新华网规则，[反馈](http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1555846&pid=30111790&fromuid=799029)。修正北海365网规则。
 - 2013年12月2日
     - [版本 5.7.1](http://userscripts.org/scripts/diff/178900/686724)。增加大成社区规则。
     - [版本 5.7.0](http://userscripts.org/scripts/diff/178900/686720)。修正 pconline 规则。
 - 2013年12月1日
     - [版本 5.6.9](http://userscripts.org/scripts/diff/178900/685825)。修正人民网新闻、pixiv规则。
 - 2013年11月29日
     - [版本 5.6.8](http://userscripts.org/scripts/diff/178900/684099)。增加修改规则：创业帮、pconline。
     - [版本 5.6.7](http://userscripts.org/scripts/diff/178900/684075)。修正射手网规则。
     - [版本 5.6.6](http://userscripts.org/scripts/diff/178900/683238)。增加修改规则：淘宝、射手网、pixiv。
 - 2013年11月27日
     - [版本 5.6.5](http://userscripts.org/scripts/diff/178900/681862)。增加改进规则：腾讯新闻、人民网娱乐频道、FT中文网、Mozilla Addons、blogspot、和邪社。
 - 2013年11月23日
     - [版本 5.6.4](http://userscripts.org/scripts/diff/178900/677124)。新增9个规则。
     - [版本 5.6.3](http://userscripts.org/scripts/diff/178900/676807)。添加站点规则 抢了个便宜。
     - [版本 5.6.2](http://userscripts.org/scripts/diff/178900/676750)。修正 Greasemonkey 下设置窗口无法关闭的问题。
 - 2013年11月22日
     - [版本 5.6.1](http://userscripts.org/scripts/diff/178900/675967)。规则新增参数 `lazyImgSrc`，同时更改规则。新增规则：店内搜索页-淘宝网，zd423。
 - 2013年11月21日
     - [版本 5.6.0](http://userscripts.org/scripts/diff/178900/674811)。新增大成网_腾讯网规则。取消载入自定义规则出错的提示（在 github 被 CSP 限制）。
 - 2013年11月16日
     - [版本 5.5.9](http://userscripts.org/scripts/diff/178900/670112)。设置窗口新增自定义站点规则。改进 Google 规则的图片修正。新增和修正一些规则（来自[反馈](http://userscripts.org/topics/135221)）。
 - 2013年11月15日
     - [版本 5.5.8](http://userscripts.org/scripts/diff/178900/669249)。修正停止翻页修改的问题。增加 凤凰网财经 规则。
     - [版本 5.5.7](http://userscripts.org/scripts/diff/178900/669182)。增加规则：凤凰汽车、汽车之家、爱卡汽车、豆瓣-书影音评论、我的小组话题 - 豆瓣、豆瓣全站、搜索 | Mozilla 技术支持。
 - 2013年11月14日
     - [版本 5.5.6](http://userscripts.org/scripts/diff/178900/668982)。增加异次元规则。
     - [版本 5.5.5](http://userscripts.org/scripts/diff/178900/668943)。新增设置界面。
 - 2013年11月13日
     - [版本 5.5.4](http://userscripts.org/scripts/diff/178900/668751)。修正部分 script 未移除带来的 Chrome 的问题。
 - 2013年11月12日
     - [版本 5.5.3](http://userscripts.org/scripts/diff/178900/668265)。调整 pconline 规则。
 - 2013年11月11日
     - [版本 5.5.2](http://userscripts.org/scripts/diff/178900/668198)。修正中关村新闻、pconline 规则。新增奇艺、土豆、搜狐视频搜索、棋友家园规则。修正 iframe 加载的一个 bug。
 - 2013年11月10日
     - [版本 5.5.1](http://userscripts.org/scripts/diff/178900/667425)。修改调整一些规则。
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