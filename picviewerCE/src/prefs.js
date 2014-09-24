		//一些设定。
		var prefs={
			floatBar:{//浮动工具栏相关设置.
				butonOrder:['actual','current','magnifier','gallery'],//按钮排列顺序'actual'(实际的图片),'current'(当前显示的图片),'magnifier'(放大镜观察),'gallery'(图集)
				showDelay:366,//浮动工具栏显示延时.单位(毫秒)
				hideDelay:566,//浮动工具栏隐藏延时.单位(毫秒)
				position:'top left',// 取值为: 'top left'(图片左上角) 或者 'top right'(图片右上角) 'bottom right'(图片右下角) 'bottom left'(图片左下角);
				offset:{//浮动工具栏偏移.单位(像素)
					x:-15,//x轴偏移(正值,向右偏移,负值向左)
					y:-15,//y轴偏移(正值,向下,负值向上)
				},
				forceShow:{//在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.(以便进行旋转,放大,翻转等等操作)..
					enabled:true,//启用强制显示.
					size:{//图片尺寸.单位(像素);
						w:166,
						h:166,
					},
				},
				minSizeLimit:{//就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情况下),如果没有被缩放的原图片小于设定值,那么也不显示浮动工具栏.
					w:100,
					h:100,
				},
			},

			magnifier:{//放大镜的设置.
				radius:77,//默认半径.单位(像素).
				wheelZoom:{//滚轮缩放.
					enabled:true,
					pauseFirst:true,//需要暂停(单击暂停)后,才能缩放.(推荐,否则因为放大镜会跟着鼠标,如果放大镜过大,那么会影响滚动.)..
					range:[0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放的范围
				},
			},

			gallery:{//图库相关设定
				fitToScreen:true,//图片适应屏幕(适应方式为contain，非cover).
				sidebarPosition:'bottom',//'top' 'right' 'bottom' 'left'  四个可能值
				sidebarSize: 120,//侧栏的高（如果是水平放置）或者宽（如果是垂直放置）
				transition:true,//大图片区的动画。
				preload:true,//对附近的图片进行预读。
				max:5,//最多预读多少张（前后各多少张）

				autoScrollAndReload: false, // 最后一张图片时，滚动主窗口到最底部，然后自动重载库的图片。还有bug，有待进一步测试
			},

			imgWindow:{//图片窗相关设置
				fitToScreen:false,//适应屏幕,并且水平垂直居中(适应方式为contain，非cover).
				syncSelectedTool:true,//同步当前选择的工具，如果开了多个图片窗口，其中修改一个会反映到其他的上面。
				defaultTool:'hand',//"hand","rotate","zoom";打开窗口的时候默认选择的工具
				close:{//关闭的方式
					escKey:true,//按esc键
					dblClickImgWindow:true,//双击图片窗口
					clickOutside:{//是否点击图片外部关闭
						enabled:false,
						trigger:'click',//'click'|'dblclick'；点击或者双击
					},
				},
				overlayer:{//覆盖层.
					shown:false,//显示
					color:'rgba(0,0,0,0.8)',//颜色和不透明度设置.
				},
				shiftRotateStep:15,//旋转的时候，按住shift键时,旋转的步进.单位:度.
				zoom:{//滚轮缩放
					range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放比例.(不要出现负数,谢谢-_-!~)
					mouseWheelZoom:true,//是否允许使用滚轮缩放。
				},
			},

			//等图片完全载入后,才开始执行弹出,放大等等操作,
			//按住ctrl键的时候,可以临时执行和这个设定相反的设定.
			waitImgLoad:true,

			//框架里面的图片在顶层窗口展示出来，但是当frame与顶层窗口domain不一样的时候，可能导致图片被反盗链拦截，
			//按住shift键，可以临时执行和这个设定相反的设定
			framesPicOpenInTopWindow:true,
		};


		//各网站高级规则;
		var siteInfo=[
			{sitename: "google 图片搜索",
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
			{sitename: "Bing 图片搜索",
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
			{sitename: "百度图片搜索",
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
			{sitename: "百度图片 - channel/detail",
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
			// 自带的更好
			// {sitename:"百度图片（详细页面）",
			//  enabled:true,
			//  url:/^http:\/\/image\.baidu\.com\/detail\//i,
			//  getImage:function(){
			//      var src=this.src;
			//      var ret=src.replace(/\/w%3D230\/sign=[^\/]+\//i, '/pic/item/');
			//      if(src==ret)return;//非缩略图
			//      return ret;
			//  },
			// },
			{sitename:"百度贴吧",
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
			{sitename:"豆瓣",
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
			{sitename:"新浪微博",
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
			{sitename:"腾讯微博",
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
			{sitename:"淘宝搜索",
				enabled:true,
				url:/^http:\/\/[^\.]+\.taobao\.com\//i,
				getImage:function(){
					var src = this.src;
					var ret = src.replace(new RegExp("((?:img\\d\\d\\.taobaocdn|g(?:[^.]*\\.?){1,2}?\\.alicdn)\\.com/)(?:img/|tps/http:\\//img\\d\\d+\\.taobaocdn\\.com/)?((?:imgextra|bao/uploaded)/i\\d+/[^!]+![^.]+\\.[^_]+)_.+", 'i'),
						'$1/$2');
					if (ret != src) return ret;
				},
			},
			{sitename: "deviantart",
				siteExample: "http://www.deviantart.com",
				enabled:true,
				url:/^https?:\/\/[^.]*\.deviantart\.com/i,
				getImage:function(){
					var oldsrc=this.src;
					var newsrc=oldsrc.replace(/(http:\/\/[^\/]+\/fs\d+\/)200H\/(.*)/i,'$1$2');
					return newsrc==oldsrc? '' : newsrc;
				},
			},
			{sitename: '花瓣网',
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
			{sitename:"wiki百科",
				enabled:true,
				url:/^http:\/\/[^.]+.wikipedia.org\/wiki\/\w+/i,
				getImage:function(){
					var src=this.src;
					var ret=src.replace('/thumb/','/');
					if(src==ret)return;//非缩略图
					return (ret.match(/(https?:\/\/.*)\/\d+px-.*/) || [])[1];
				},
			},
			{sitename: "cnbeta",
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
			{sitename:"人人影视",
				enabled:true,
				url:/^http:\/\/www\.yyets\.com\//i,
				getImage:function(){
					var src = this.src;
					var ret = src.replace(new RegExp('(res\\.yyets\\.com/ftp/(?:attachment/)?\\d+/\\d+)/[ms]_(.*)', 'i'), '$1/$2');
					if (src == ret) return; //非缩略图
					return ret;
				},
			},
			{sitename:"沪江碎碎",
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
			{sitename: '大众点评',
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
			// 游戏
			{sitename:"178.com",
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
			{sitename: "天极网",
				url: /^http:\/\/game\.yesky\.com\//i,
				enabled: true,
				siteExample: "http://game.yesky.com/tupian/165/37968665.shtml",
				getImage: function() {
					var src = this.src;
					var ret = src.replace(/_\d+x\d+\.([a-z]+)$/i, '.$1');
					if (ret!=src) return ret;
				}
			},
			{sitename: "超级玩家",
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
			{sitename: "nhentai",
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
			{sitename:"极限主题社区",
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
			// {sitename:"opera官方论坛",
			// 	siteExample:"http://bbs.operachina.com",
			// 	enabled:true,
			// 	url:/^http:\/\/bbs\.operachina\.com/i,
			// 	getImage:function(){
			// 		var src=this.src;
			// 		if(/file.php\?id=\d+$/i.test(src)){
			// 			return src+'&mode=view';
			// 		};
			// 	},
			// },

			// ------------------------- 需要 xhr 获取的 --------------------------------
			// 有些页面不行，需要 xhr 获取
			{sitename:"pixiv",
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
			// {sitename: "Google plus",
			//  enabled: true,
			//  url: /^https?:\/\/plus\.google\.com/i,
			//  siteExample: "https://plus.google.com/u/0/+LynxEvil/posts/dpJTXa2Lgwf",
			//  getImage: function (img) {
			//      //lh5.googleusercontent.com/-wmoUHKSaEkg/Ue3kP5ZkfQI/AAAAAAAAXkY/BcJoyTtZbP8/s405-p/2.jpg
			//      //lh6.googleusercontent.com/-wmoUHKSaEkg/Ue3kP5ZkfQI/AAAAAAAAXkY/BcJoyTtZbP8/w334-h413-no/2.jpg

			//      //lh3.googleusercontent.com/-sLCbDrGjLug/Ue3kLooLKZI/AAAAAAAARFY/KRG3uRMWiBI/s202-p/a.jpg
			//      //lh6.googleusercontent.com/-sLCbDrGjLug/Ue3kLooLKZI/AAAAAAAAXkk/1PKW5XBQBzM/w325-h415-no/a.jpg
			//  },
			// },
			// {sitename: '优酷电视剧',
			// 	siteExample: 'http://www.youku.com/v_olist/c_97.html',
			// 	url: /^https?:\/\/www.youku.com\/v_olist\//,
			// 	getImage: function() {
			// 		// {"r":"www\\.youku\\.com\\/show_page\\/id_.*\\.html","q":".baseinfo > .thumb > img"}
			// 	}
			// },
		];

		//通配型规则,无视站点.
		var tprules=[
			function(img,a){//解决新的dz论坛的原图获取方式.
				var reg=/(.+\/attachments?\/.+)\.thumb\.\w{2,5}$/i;
				var oldsrc=this.src;
				var newsrc=oldsrc.replace(reg,'$1');
				if(oldsrc!=newsrc)return newsrc;
			},
		];
