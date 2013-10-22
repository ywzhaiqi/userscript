Super_preloaderPlus.user.js
===========================

## 文件说明

- **Super_preloaderPlus_one.user.js**：修改增强2合1版本。
- **Super_preloader_one.user.js**：整合自原版2个文件，微量修改。
- **Super_preloader_plus.user.js**
- **Super_preloader_plus.db.user.js**

## 修改说明

### Super_preloaderPlus

Chrome 10+, Firefox

 - 修正 Discuz论坛帖子下一页必须使用 iframe 才能显示头像图片的问题
 - 修正内容为表格时分隔条错位的情况
 - 新增页面添加后 Super_preloaderPageLoaded 事件
 - 新增 `documentFilter(doc, requestURL, info)`: 对下一页 document 对象进行提前处理。见[例：documentFilter](#documentFilter)
 - 新增 `filter(pages)`: 对新增页面的处理，例如对百度贴吧的点击放大或点击播放等的处理

### Super_preloaderPlus.db

 - 修正 google 搜索下一页图片显示（非iframe），新闻搜索
 - 新增 youtube 搜索及下一页图片显示
 - 新增 百度贴吧列表 图片点击放大，吧内搜索，百度空间，百度新闻搜索
 - 去除 Discuz论坛帖子 useiframe


### documentFilter

例1: 修正google 搜索下一页图片、视频显示（非iframe）

	documentFilter: function(doc){
		var x = doc.evaluate('//script/text()[contains(self::text(), "apthumb") or contains(self::text(), "vidthumb")]',
		            doc, null, 9, null).singleNodeValue;
		if (!x) return;

		var datas = x.nodeValue.match(/'(ap|vid)thumb\d+','[^']+(?:\\x3d)*/g);
		datas.forEach(function(text){
		    var [id, data] = text.split("','");
		    id = id.slice(1);
		    var m = doc.getElementById(id);
		    if(m)
		        m.src = data.replace(/\\x3d/g, "=");
		});
	}