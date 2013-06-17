小说阅读脚本
============

### 需要

Firefox（Greasemonkey/Scriptish）， Chrome（Tampermonkey），Opera（暴力猴） 

### 支持站点

 - 起点中文网、晋江文学网、纵横中文网、潇湘书院、逐浪等
 - 燃文、无错、书迷楼、冰火中文、百晓生、浩奇、书河等（bookline.me点击的网站）
 - 角度吧、飞库、6小说、笔趣阁、强兵、摩卡、极速等（SoDu.so点击的网站）
 - 手打吧、泡书吧、17k、看下、青帝、侠客等
 - 其它小说站点

### 特性

 - 自动获取标题、内容、上一页、下一页、目录页链接。
 - 自动加载下一页。
 - 自定义阅读样式。
 - 过滤页面广告。
 - 小说屏蔽字修复。
 - 鼠标双击启用停用翻页。
 - 末页链接变灰色。

### 启用按钮

![右侧按钮启用](http://i1277.photobucket.com/albums/y489/ywzhaiqi/5C0F8BF496058BFB811A672C630994AE_zps80424679.png)

### 启用后效果图

![效果图](http://i1277.photobucket.com/albums/y489/ywzhaiqi/5C0F8BF4811A672C6548679C56FE_zps3962153a.png)

### 说明
 
 - 手动调用代码（Firefox）: `content.window.wrappedJSObject.readx();`，再次调用退出。
 - 如需更改阅读样式和默认设置，安装 https://userscripts.org/scripts/show/169728 这个后在里面更改。
 - 配置中如果设置 `config.AUTO_ENABLE = true`， 则进入阅读模式后会一直启用直至退出，但可能一些站点会有影响，此时请反馈作者或到脚本管理器加入排除列表或设置为 false。
 - 默认设置从 booklink.me 点击的网站自动进入阅读模式

### 自定义样式说明

修改按钮到左边

	var button_css = '\
	.readerbtn {\
	    left: 0px !important;\
	}\
	';

### 自定义规则说明

	/**
	 * 注意：
	 *    1、自定义规则，优先级最高。
	 *    2、小说阅读脚本只限定在一些网站（非全局），故你所添加的规则可能无法生效。
	 *       解决方法：反馈给作者或在 Greasemonkey/Scriptish 脚本管理处加入。
	 *    3、如果定义了站点规则会让内置的同个站点的规则失效
	 *    4、格式要正确，后面要有,
	 */

	var SITE_INFO = [
	    // 极简版规则
	    {
	        name: "纵横中文网",
	        url: "^http://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$",
	        contentPatch: function(fakeStub){
	            // 去除隐藏文字
	            fakeStub.find('.watermark').remove();
	        }
	    },
	    /**
	     *  特殊规则，内容用js生成。需要用 iframe 方式或补丁方式（二选一）。
	     *  下面的起点中文也是如此，但采用另一种补丁的方式。
	     *      iframe方式简单，补丁方式需要分析代码（绿色无污染）。
	     */
	    {
	        name: "读读看",
	        url: "^http://www\\.dudukan\\.net/html/.*\\.html$",
	        exampleUrl: "http://www.dudukan.net/html/90/90733/19323854.html",
	        contentReplace: "看小说.*|binhuo|www\\.92to\\.com",
	        useiframe: true,    
	        timeout: 500  // 要等待js把内容生成出来，单位毫秒
	    },

	    // 详细版规则
	    {
	        // 没什么作用，随意起名
	        name: "起点中文网",

	        // 匹配的地址，正则。2种形式都可以
	        url: "^http://read\\.qidian\\.com/\\S+/\\d+,\\d+.aspx$",

	        // （可选）标题正则
	        titleReg: "小说:(.*?)独家首发\\/(.*?)\\/.*",
	        // （可选）0或1，代表书名的位置，另一个是章节位置
	        titlePos: 0,

	        // （可选）首页jQuery选择器
	        indexSelector: ".pageopt a:contains('回目录')",
	        // （可选）上一页jQuery选择器
	        prevSelector: "a#PrevLink",
	        // （可选）下一页jQuery选择器
	        nextSelector: "a#NextLink",

	        // （可选）内容jQuery选择器
	        contentSelector: "#content",
	        // （可选）内容移除，正则表达式
	        contentReplace: "起点中文网|www\\.qidian\\.com|欢迎广大书友.*",

	        // （可选）下面2个一起。如果加载的下一页没有成功，则设置这个为true或用下面的补丁。
	        useiframe: false,
	        timeout: 0,  // 延迟（毫秒），要等页面的js运行完毕才能获取到内容。

	        // （可选）补丁，对页面的提前处理，fakeStub 为 $(document) 对象
	        contentPatch: function(fakeStub){
	            fakeStub.find('div#content script:first').addClass('reader-ajax');
	        }
	    },
	];

### 更新

 - 2013年6月17日，版本 2.4.0。
 	- 修改无错和16K图片全局替换为个别替换。
 	- 新增配置参数 contentReplace 的另一种写法：`contentReplace: {'<img.*?ait="(.*?)".*?>': "$1",}`
 	- 增加第一中文的站点配置
 - 2013年6月15日，版本 2.3.8。增加无错和16kbook图片的替换，修复Chrome下加载下一页的bug。
 - 2013年6月13日，版本 2.3.7。完善框架内的运行，个别站点还有问题。
 - 2013年6月11日，版本 2.3.2。完善非 Firefox 下标题的获取。
 - 2013年6月11日，版本 2.3.1。
 	- 增加图片居中的修正，旧版自定义文件需要在 css 增加 `.content img.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}\`。
 	- 修复按钮退出后 booklink.me 无法自动启用的问题。可能需要刷新一下页面。
 - 2013年6月10日，版本 2.3.0。
 	- 增加自定义站点设置，**需手动更新个人配置文件**，更新时请备份。
 	- 增加 iframe 方式加载下一页。
 	- 完善屏蔽字修复误替换图片。
 - 2013年6月09日，版本 2.2.9。修复内容中移除标题过度的问题。
 - 2013年6月09日，版本 2.2.8。修复屏蔽字替换造成图片错误的问题。
 - 2013年6月09日，版本 2.2.7。修复cookie禁用时脚本不能运行的问题和通知有时不能显示的问题。
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
 - 2013年5月30日，版本 1.7。增加了一些站点，改进了自动获取标题。
 - 2013年5月30日，版本 1.6.1。修复塔读文学
 - 2013年5月28日，版本 1.6。修复个别站点内容去除广告过多的问题。
 - 2013年5月14日，版本 1.5。限制在指定的一些网站中，未在范围的网站不生效。
 - 2013年5月13日，版本 1.4。增加右边 "阅读模式" 按钮，改自动启用为手动启用。
 - 2013年5月08日，版本 1.3。更改字体为18px, 增加了字体设置功能，完善了一些站点的配置。
 - 2013年5月01日，版本 1.2。改为默认自动启用，如需禁止，取消 Greasemonkey 的勾选。单个站点启用禁用未完善。
 - 2013年4月28日，版本 1.1。完善了大量的站点。如起点等