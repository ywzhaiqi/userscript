		//各网站高级规则;
		var siteInfo=[
			{name: "google 图片搜索",
				//网址例子.(方便测试.查看.之类的)
				siteExample:"http://www.google.com.hk/search?q=firefox&tbm=isch",
				//是否启用
				enabled:true,
				//站点正则
				url:/https?:\/\/www.google(\.\w{1,3}){1,3}\/search\?.*&tbm=isch/,
				//鼠标左键点击直接打开..（这个只是当高级规则的getImage()返回图片的时候生效）
				// 无效？只有少数情况下有作用？
				clikToOpen:{
					enabled:true,
					preventDefault:true,//是否尝试阻止点击的默认行为（比如如果是你点的是一个链接，默认行为是打开这个链接，如果是true，js会尝试阻止链接的打开(如果想临时打开这个链接，请使用右键的打开命令)）
					type:'actual',//默认的打开方式: 'actual'(弹出,原始图片) 'magnifier'(放大镜) 'current'(弹出,当前图片)
				},
				//获取图片实际地址的处理函数,
				//this 为当前鼠标悬浮图片的引用,
				//第一个参数和this相同，也是当前鼠标悬浮图片的引用,
				//第二个参数为包裹当前图片的第一个a元素(可能不存在).
				getImage:function(img,a){
					if(!a)return;
					if (a.href.match(/imgurl=(.*?\.\w{1,5})&/i)) {
						return decodeURIComponent(RegExp.$1);
					}
				},

				// ====== 我新增的 ======
				// 自定义样式
				css: '',
				// 排除的图片正则
				// exclude: /weixin_code\.png$/i,
			},
			{name: "Bing 图片搜索",
				siteExample:"http://cn.bing.com/images/search?q=%E7%BE%8E%E5%A5%B3",
				enabled:true,
				url: /^https?:\/\/[^.]*\.bing\.com\/images\//i,
				getImage:function(img, a){
					if (!a) return;
					var oldsrc=this.src;
					var $ = /,imgurl:"([^"]+)/.exec(a.getAttribute('m'));
					var newsrc= $ ? $[1] : '';
					if(newsrc!=oldsrc)return newsrc;
				}
			},
			// 百度自身的全屏查看方式更加好，跟这个脚本的库查看类似。
			{name: "百度图片搜索",
				siteExample: "http://image.baidu.com/i?ie=utf-8&word=%E9%A3%8E%E6%99%AF&oq=%E9%A3%8E%E6%99",
				enabled: true,
				url: /^https?:\/\/image\.baidu\.com\/.*&word=/i,
				getImage: function(img, a) {
					if (!a) return;
					var reg = /&objurl=(http.*?\.(?:jpg|jpeg|png|gif|bmp))/i;
					if (a.href.match(reg)) {
						return decodeURIComponent(RegExp.$1);
					}
				}
			},
			{name: "百度图片 - channel/detail",
				siteExample: "http://image.baidu.com/channel?c=%E7%BE%8E%E5%A5%B3&t=%E5%85%A8%E9%83%A8&s=0",
				enabled: true,
				url: /^https?:\/\/image\.baidu\.com\/(?:channel|detail)/i,
				getImage: function(img, a) {
					var src = this.src,
						ret = src;
					var pic = new RegExp("(hiphotos|imgsrc)\\.baidu\\.com/(.+?)/.+?([0-9a-f]{40})");
					ret = src.replace(pic, '$1.baidu.com/$2/pic/item/$3');

					if (ret != src) {
						return ret;
					}
				}
			},
			{name:"百度贴吧",
				enabled:true,
				url:/^https?:\/\/tieba\.baidu\.[^\/]+\//i,
				getImage:function(img){
					var src=img.src;
					var reg=/^(http:\/\/imgsrc\.baidu\.com\/forum\/)ab(pic\/item\/[\w.]+)/i ;
					var result=src.match(reg);
					//帖子列表页面
					if(result){//小图的时候
						return result[1]+result[2];
					}else{//小图点击之后的较大图，或者帖子内容页面的图片。
						var prefix = 'http://imgsrc.baidu.com/forum/pic/item/';
						var reg2 = /\/sign=\w+\/([\w.]+)$/;
						var sign = src.match(reg2);
						return  sign ? prefix + sign[1] : null;
					};
				},
			},
			{name:"豆瓣",
				siteExample:"http://movie.douban.com/photos/photo/1000656155/",
				enabled:true,
				url:/^https?:\/\/[^.]*\.douban\.com/i,
				getImage:function(){
					var oldsrc = this.src,
						newsrc = oldsrc;
					var pic = /\/view\/photo\/(?:photo|albumcover|albumicon|thumb)\/public\//i;
					var movieCover = /\/view\/movie_poster_cover\/[si]pst\/public\//i;
					var bookCover = /\/view\/ark_article_cover\/cut\/public\//i;
					var spic = /(img\d.douban.com)\/spic\//i

					// 这个网址大图会出错
					// http://movie.douban.com/subject/25708579/discussion/58950206/
					if (pic.test(oldsrc)) {
						newsrc = oldsrc.replace(pic, '/view/photo/raw/public/');
					} else if (movieCover.test(oldsrc)) {
						newsrc = oldsrc.replace(movieCover, '/view/photo/raw/public/');
					} else if (bookCover.test(oldsrc)) {
						newsrc = oldsrc.replace(bookCover, '/view/ark_article_cover/retina/public/');
					} else if (spic.test(oldsrc)) {
						newsrc = oldsrc.replace(spic, '$1/mpic/');
					}

					return newsrc == oldsrc ? null : newsrc;
				}
			},
			{name:"新浪微博",
				siteExample:"http://weibo.com/pub/?source=toptray",
				enabled:true,
				url:/^https?:\/\/(?:[^.]+\.)*weibo\.com/i,
				getImage:function(img){
					var oldsrc=this.src;
					var pic=/(\.sinaimg\.cn\/)(?:bmiddle|thumbnail)/i;//微博内容图片.
					var head=/(\.sinaimg\.cn\/\d+)\/50\//i;//头像.
					var photoList=/\.sinaimg\.cn\/thumb150\/\w+/i//相册
					var newsrc;
					if(pic.test(oldsrc)){
						newsrc=oldsrc.replace(pic,'$1large');
						return newsrc==oldsrc? '' : newsrc;
					}else if(head.test(oldsrc)){
						newsrc=oldsrc.replace(head,'$1/180/');
						return newsrc==oldsrc? '' : newsrc;
					}else if(photoList.test(oldsrc)){
						newsrc=oldsrc.replace('/thumb150/','/mw690/');
						return newsrc==oldsrc? '' : newsrc;
					};
				},
			},
			{name:"腾讯微博",
				siteExample:"http://t.qq.com/p/news",
				enabled:true,
				url:/^http:\/\/[^\/]*t\.qq\.com\//i,
				getImage:function(img){
					var pic=/(\.qpic\.cn\/mblogpic\/\w+)\/\d+/i;//图片
					var head=/(\.qlogo\.cn\/mbloghead\/\w+)\/\d+/i;//头像.
					var oldsrc=this.src;
					var newsrc;
					if(pic.test(oldsrc)){
						newsrc=oldsrc.replace(pic,'$1/2000');
						return newsrc==oldsrc? '' : newsrc;;
					}else if(head.test(oldsrc)){
						newsrc=oldsrc.replace(head,'$1/0');
						return newsrc==oldsrc? '' : newsrc;;
					};
				},
			},
			{name:"淘宝搜索",
				enabled:true,
				url:/^http:\/\/[^\.]+\.taobao\.com\//i,
				getImage:function(){
					var src = this.src;
					var ret = src.replace(new RegExp("((?:img\\d\\d\\.taobaocdn|g(?:[^.]*\\.?){1,2}?\\.alicdn)\\.com/)(?:img/|tps/http:\\//img\\d\\d+\\.taobaocdn\\.com/)?((?:imgextra|bao/uploaded)/i\\d+/[^!]+![^.]+\\.[^_]+)_.+", 'i'),
						'$1/$2');
					if (ret != src) return ret;
				},
			},
			{name: "deviantart",
				siteExample: "http://www.deviantart.com",
				enabled:true,
				url:/^https?:\/\/[^.]*\.deviantart\.com/i,
				getImage:function(){
					var oldsrc=this.src;
					var newsrc=oldsrc.replace(/(http:\/\/[^\/]+\/fs\d+\/)200H\/(.*)/i,'$1$2');
					return newsrc==oldsrc? '' : newsrc;
				},
			},
			{name: '花瓣网',
				enabled: true,
				url: /^https?:\/\/huaban\.com\//i,
				getImage: function() {
					var pic = /(.*img.hb.aicdn.com\/.*)_fw236$/i
					if (this.src.match(pic)) {
						return RegExp.$1 + '_fw658';
					}
				},
				css: '.pin a.img .cover { display: none; }',
				exclude: /weixin_code\.png$/i,
			},
			// 其它
			{name:"wiki百科",
				enabled:true,
				url:/^http:\/\/[^.]+.wikipedia.org\/wiki\/\w+/i,
				getImage:function(){
					var src=this.src;
					var ret=src.replace('/thumb/','/');
					if(src==ret)return;//非缩略图
					return (ret.match(/(https?:\/\/.*)\/\d+px-.*/) || [])[1];
				},
			},
			{name: "cnbeta",
				enabled: true,
				url: /^https?:\/\/www.cnbeta.com\//i,
				getImage: function() {
					var oldsrc = this.src,
						newsrc = oldsrc;
					// http://static.cnbetacdn.com/newsimg/2014/0922/19_1411376098.png_180x132.png
					if (oldsrc.match(/(static.cnbetacdn.com\/.+)_\d+x\d+\.\w{2,4}$/)) {
						newsrc = 'http://' + RegExp.$1;
					}

					return newsrc == oldsrc ? null : newsrc;
				}
			},
			{name:"沪江碎碎",
				enabled:true,
				url:/^https?:\/\/([^.]+\.)*(?:yeshj\.com|hjenglish\.com|hujiang\.com)/i,
				getImage:function(img){
					var oldsrc=this.src;
					var reg=/^(https?:\/\/(?:[^.]+\.)*hjfile.cn\/.+)(_(?:s|m))(\.\w+)$/i;
					if(reg.test(oldsrc)){
						return oldsrc.replace(reg,'$1$3');
					};
				},
			},
			{name: '大众点评',
				siteExample: 'http://www.dianping.com/shop/17873296/photos',
				url: /^https?:\/\/www.dianping.com\/shop/i,
				getImage: function() {
					var oldsrc = this.src,
						newsrc;
					var pic = /(.+?dpfile\.com\/.+)\(240c180\)\/(thumb\..+)/;
					newsrc = oldsrc.replace(pic, '$1(700x700)/$2');

					return newsrc == oldsrc ? null : newsrc;
				}
			},
			// 视频网站
			{name: "人人影视",
				enabled: true,
				url: /^http:\/\/www\.yyets\.com\//i,
				getImage: function() {
					var src = this.src;
					var ret = src.replace(new RegExp('(res\\.yyets\\.com/ftp/(?:attachment/)?\\d+/\\d+)/[ms]_(.*)', 'i'), '$1/$2');
					if (src == ret) return; //非缩略图
					return ret;
				},
			},
			{name: 'trakt.tv',
				url: /^http:\/\/trakt\.tv\//i,
				siteExample: 'http://trakt.tv/shows',
				getImage: function() {
					var oldsrc = this.src;
					if (oldsrc.match(/(.*\/images\/posters\/\d+)-(?:300|138)\.jpg\?(\d+)$/)) {
						return RegExp.$1 + '.jpg?' + RegExp.$2;
					}
				}
			},
			// 美女
			{name: "美女薄情馆",  // 这个网站有限制，每天只能看多少张
				url: /^http:\/\/boqingguan\.com\//i,
				siteExample: 'http://boqingguan.com/Picture/31637',
				lazyAttr: 'data-original',  // 由于采用了延迟加载技术，所以图片可能为 loading.gif
				getImage: function(img, a) {
					var oldsrc = this.getAttribute('data-original') || this.src;
					if (oldsrc) {
						var newsrc = oldsrc.replace(/![a-z\d]+$/, '');
						return newsrc == oldsrc ? '' : newsrc;
					}
				}
			},
			// 游戏
			{name:"178.com",
				enabled:true,
				url:/^https?:\/\/(?:\w+\.)+178\.com\//i,
				clikToOpen:{
					enabled:true,
					preventDefault:true,
					type:'actual',
				},
				getImage:function(img,a){
					if(!a)return;
					var reg=/^https?:\/\/(?:\w+\.)+178\.com\/.+?(https?:\/\/img\d*.178.com\/[^.]+\.(?:jpg|jpeg|png|gif|bmp))/i;
					return (a.href.match(reg) || [])[1];
				},
			},
			{name: "天极网",
				url: /^http:\/\/game\.yesky\.com\//i,
				enabled: true,
				siteExample: "http://game.yesky.com/tupian/165/37968665.shtml",
				getImage: function() {
					var src = this.src;
					var ret = src.replace(/_\d+x\d+\.([a-z]+)$/i, '.$1');
					if (ret!=src) return ret;
				}
			},
			{name: "超级玩家",
				url: /^http:\/\/dota2\.sgamer\.com\/albums\//i,
				enabled: true,
				siteExample: "http://dota2.sgamer.com/albums/201407/8263_330866.html",
				getImage: function() {
					var src = this.src;
					var ret = src.replace(/\/s([^\.\/]+\.[a-z]+$)/i, '/$1');
					if (ret!=src) return ret;
				}
			},
			// 漫画站
			{name: "nhentai",
				url: /^http:\/\/nhentai\.net\/g\/\d+\//i,
				enabled: true,
				siteExample: "http://nhentai.net/g/113475/",
				getImage: function() {
					var src = this.src;
					var ret = src.replace(/\/(\d+)t(\.[a-z]+)$/i, '/$1$2');
					if (ret!=src) return ret;
				}
			},
			// 论坛
			{name:"极限主题社区",
				enabled:true,
				url:/^https?:\/\/bbs\.themex\.net\/.+/i,
				clikToOpen:{
					enabled:true,
					preventDefault:true,
					type:'actual',
				},
				getImage:function(){
					var reg=/^(https?:\/\/bbs\.themex\.net\/attachment\.php\?.+)&thumb=1(.+)/i;
					var src=this.src;
					var ret=src.replace(reg,'$1$2');
					return ret!=src? ret : '';
				},
			},
			{name:"opera官方论坛",
				siteExample:"http://bbs.operachina.com",
				enabled:true,
				url:/^http:\/\/bbs\.operachina\.com/i,
				getImage:function(){
					var src=this.src;
					if(/file.php\?id=\d+$/i.test(src)){
						return src+'&mode=view';
					};
				},
			},

			// 特殊的需要修正
			{name: 'github 修正',
				url: /^https?:\/\/github\.com\//i,
				clikToOpen: {
					enabled: true,
					preventDefault: true,
					type: 'actual',
				},
				getImage: function() {
					return this.src;
				}
			},

			// 需要 xhr 获取的
			{name: '优美图',
				url: /http:\/\/www\.topit\.me\//,
				getImage: function(img, a) {  // 如果有 xhr，则应该返回 xhr 的 url
					var oldsrc = this.src;
					if (a && oldsrc.match(/topit\.me\/.*\.jpg$/)) {
						return a.href;
					}
				},
				xhr: {
					q: ['a[download]', 'a#item-tip'],
				}
			},
			{name:"pixiv",  // 有些页面不行，需要 xhr 获取
				enabled:true,
				url:/^http:\/\/www\.pixiv\.net/i,
				getImage:function(img){
					var oldsrc = this.src,
						newsrc = oldsrc;
					var reg = /(pixiv.net\/img\d+\/img\/.+\/\d+)_[ms]\.(\w{2,5})$/i;
					if (reg.test(oldsrc)) {
						newsrc = oldsrc.replace(reg, '$1.$2');
					}
					// 这里的链接需要 xhr 获取？
					// http://www.pixiv.net/member_illust.php?id=341433

					return newsrc == oldsrc ? null : newsrc;
				},
			},
			// {name: '优酷电视剧',
			// 	siteExample: 'http://www.youku.com/v_olist/c_97.html',
			// 	url: /^https?:\/\/www.youku.com\/v_olist\//,
			// 	getImage: function() {
			// 		// {"r":"www\\.youku\\.com\\/show_page\\/id_.*\\.html","q":".baseinfo > .thumb > img"}
			// 	}
			// },
		];

		// 通配型规则,无视站点.
		var tprules=[
			function(img,a){ // 解决新的dz论坛的原图获取方式.
				var reg=/(.+\/attachments?\/.+)\.thumb\.\w{2,5}$/i;
				var oldsrc=this.src;
				var newsrc=oldsrc.replace(reg,'$1');
				if(oldsrc!=newsrc)return newsrc;
			},

			// GoogleContent
			function(img, a) { // 来自 Imagus 扩展
				var reg = new RegExp('((?:(?:lh|gp|yt)\\d+\\.g(?:oogleuserconten|gph)|\\d\\.bp\\.blogspo)t\\.com/)(?:([_-](?:[\\w\\-]{11}/){4})[^/]+(/[^?#]+)?|([^=]+)).*');

				var $ = reg.exec(this.src);
				if ($) {
					var url = true ?
						$[1] + ($[4] ? $[4] + '=' : $[2]) + 's0' + ($[3] || '') : // 原图
						$[1] + ($[4] ? $[4] + '=' : $[2]) + 's1024' + ($[3] || ''); // 1024 大小
					return 'http://' + url;
				}
			},
		];

		// TODO：兼容 Imagus 扩展和 Mouseover Popup Image Viewer 脚本的规则
		var rule = {};

		// Imagus 扩展的规则
		// 1、要移除前面的 https?://
		rule.imagus = [
			{name: 'GoogleContent',
				img: '^((?:(?:lh|gp|yt)\\d+\\.g(?:oogleuserconten|gph)|\\d\\.bp\\.blogspo)t\\.com/)(?:([_-](?:[\\w\\-]{11}/){4})[^/]+(/[^?#]+)?|([^=]+)).*',
				to: function($) {
					return true ?
							$[1] + ($[4] ? $[4] + '=' : $[2]) + 's0' + ($[3]||'') :  // 原图
							$[1] + ($[4] ? $[4] + '=' : $[2]) + 's1024' + ($[3]||'');  // 1024 大小
				}
			}
		];

		// Mouseover Popup Image Viewer 脚本的规则
		rule.MPIV = [
			{ d: 'www.topit.me', r: /(.*topit\.me)\/[ml]\/(.*\.jpg)$/, q: 'a[download], a#item-tip' },
			{ d: 'www.topit.me', r: /(.*topit\.me\/[c1]\/.*)m\.jpg$/, s: '$1l.jpg' },
		];
