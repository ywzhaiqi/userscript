
Mouseover Popup Image Viewer
============================

[Mouseover Popup Image Viewer](http://userscripts.org/scripts/show/109262)，在图片上鼠标悬停放大的脚本。

**官方说明与规则**：[MPIV: Host Rules How-To](http://w9p.co/userscripts/mpiv/host_rules.html)

[本文卡饭链接](http://bbs.kafan.cn/thread-1654392-1-1.html)  [本文 github 链接](https://github.com/ywzhaiqi/userscript/tree/master/Mouseover%20Popup%20Image%20Viewer)

规则
----

非内置，需要手动添加，设置按钮在 Greasemonkey/Scriptish 菜单的用户脚本命令处。

### 来自官方

#### 百度贴吧

	{"r":"(hiphotos|imgsrc)\\.baidu\\.com/(.+?)/.+?([0-9a-f]{40})","s":"http://$1.baidu.com/$2/pic/item/$3.jpg"}

#### 新浪微博

	{"r":"(ww[0-9]\\.sinaimg\\.cn)/(thumbnail|square)/([a-z0-9]+)", "s":"http://$1/mw1024/$3.jpg"}

#### Userstyles.org

	{"r":"userstyles\\.org/styles/\\d+/", "q":"a[title]"}

#### Google Play (Android apps)

	{"r":"(lh\\d+\\.ggpht\\.com/[^=]+)", "s":"https://$1"}

### 我添加的规则

部分转自 Imagus 扩展、picview。以下规则部分反馈给作者。

#### 豆瓣

	{"r": "(img\\d+\\.douban\\.com/)(?:(view/)(?:photo|movie_poster_cover)/(?!large)[^/]+|(icon/u(?=\\d))|[sm](?=pic/))(.*)","s": "return 'http://' + m[1] + (m[2] ? m[2] + 'photo/photo' : ((m[3]||'') + 'l')) + m[4];"}

#### 人人影视

	{"r":"(res\\.yyets\\.com/ftp/(?:attachment/)?\\d+/\\d+)/[ms]_(.*)","s":"http://$1/$2"}

#### 淘宝

 	{"r":"((?:img\\d\\d\\.taobaocdn|g(?:[^.]*\\.?){1,2}?\\.alicdn)\\.com/)(?:img/|tps/http:\\//img\\d\\d+\\.taobaocdn\\.com/)?((?:imgextra|bao/uploaded)/i\\d+/[^!]+![^.]+\\.[^_]+)_.+","s":"http://$1$2"}

#### 腾讯微博

	{"r":"(t\\d+\\.qpic.cn\\/mblogpic\\/[^\\/]+)\\/(?!2000)\\d+$","s":"http://$1/2000"} 

#### 优酷电视剧

	{"r":"www\\.youku\\.com\\/show_page\\/id_.*\\.html","q":".baseinfo > .thumb > img"} 

#### 沪江碎碎

	{"r":"^(https?:\\//(?:[^.]+\\.)*hjfile.cn/.+)(_(?:s|m))(\\.\\w+)$","s":"$1$3"}

#### cnbeta

	{"r":"(static\\.cnbetacdn\\.com\\/newsimg\\/.*)_180x132\\.([a-z]+)","s":"http://$1"}

#### 人人网（部分有效）

	{"r":"http:\\/\\/fmn\\.(rrimg|rrfmn|xnpic)\\.com\\/(.*)\\/p\\/.*85lt_(.*\\.jpg)","s":"http://fmn.$1.com/$2/$3"}

### 虾米（部分有效）

	{"r":"(img\\.xiami\\.net\\/images\\/artistpic\\/.*)_1\\.jpg","s":"http://$1_4.jpg"} 

	{"r":"(img\\.xiami\\.net\\/images\\/(?:album|artist)\\/.*)_\\d\\.jpg","s":"http://$1.jpg"}

#### 无觅网（有个问题）

	{"r":"www\\.wumii\\.com/item/[^/]+$","s":"var img = node.parentNode.querySelector('.img-clip > img'); if(img && img.src) return img.src;"} 
	