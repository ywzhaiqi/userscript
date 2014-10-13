
		var matchedRule,
			URL=location.href,
			floatBar;

		function findPic(img){
			//获取包裹img的第一个a元素。
			var imgPN=img;
			var imgPA;
			while(imgPN=imgPN.parentElement){
				if(imgPN.nodeName=='A'){
					imgPA=imgPN;
					break;
				};
			};

			var iPASrc=imgPA? imgPA.href : '';
			//base64字符串过长导致正则匹配卡死浏览器
			var base64Img=/^data:[^;]+;base64,/i.test(img.src);


			if(typeof matchedRule=='undefined'){//找到符合站点的高级规则,并缓存.
				matchedRule=siteInfo._find(function(site,index,array){
					// if(site.enabled && site.url && site.url.test(URL)){
					if(site.url && site.url.test(URL)){
						return true;
					};
				});
				matchedRule=matchedRule? matchedRule[0] : false;
				// console.log('匹配的规则：',matchedRule);
			};

			var src, type;
			var imgSrc;  // 有些图片采用了延迟加载的技术

			if(!src && matchedRule){// 通过高级规则获取.
				// 添加修正的样式
				if (!matchedRule.cssAdded && matchedRule.css) {
					var style = document.createElement('style');
					style.type = 'text/css';
					style.id = 'gm-picviewer-site-style';
					style.textContent = matchedRule.css;
					document.head.appendChild(style);

					matchedRule.cssAdded = true;
				}

				// 排除
				if (matchedRule.exclude && matchedRule.exclude.test(img.src)) {
					return;
				} else {
					try{
						src = matchedRule.getImage.call(img,img,imgPA);
					}catch(err){
						throwErrorInfo(err);
					}

					if(src) {
						type='rule';
						if (matchedRule.lazyAttr) {
							imgSrc = img.getAttribute(matchedRule.lazyAttr);
						}
					}
				}
			};

			if(!src && !base64Img){//遍历通配规则
				tprules._find(function(rule,index,array){
					try{
						src=rule.call(img,img,imgPA);
						if(src){
							//console.log('匹配的通配规则',rule);
							return true;
						};
					}catch(err){
						throwErrorInfo(err);
					};
				});
				if(src)type='tpRule';
			};

			if(!src && imgPA){//链接可能是一张图片...
				if(/\.(?:jpg|jpeg|png|gif|bmp)$/i.test(iPASrc)){
					src=iPASrc;
				};
				if(src)type='scale';
			};

			if(!src){//本图片是否被缩放.
				var imgAS={//实际尺寸。
					h:img.naturalHeight,
					w:img.naturalWidth,
				};

				var imgCStyle=getComputedStyle(img);
				var imgCS={
					h:parseFloat(imgCStyle.height),
					w:parseFloat(imgCStyle.width),
				};

				if(!(imgAS.w==imgCS.w && imgAS.h==imgCS.h)){//如果不是两者完全相等,那么被缩放了.
					if(imgAS.h > prefs.floatBar.minSizeLimit.h || imgAS.w > prefs.floatBar.minSizeLimit.w){//最小限定判断.
						src=img.src;
						type='scale';
					};
				}else{
					if(prefs.floatBar.forceShow.enabled && (imgCS.w>=prefs.floatBar.forceShow.size.w && imgCS.h>=prefs.floatBar.forceShow.size.h)){
						src=img.src;
						type='force';
					};
				};
			};


			if(!src)return;

			var ret={
				src:src,//得到的src
				type:type,//通过哪种方式得到的
				imgSrc: imgSrc || img.src,//处理的图片的src
				iPASrc:iPASrc,//图片的第一个父a元素的链接地址

				img:img,//处理的图片
				imgPA:imgPA,//图片的第一个父a元素
			};

			//console.log('图片查找结果:',ret);
			return ret;
		};


		var isFrame=window!=window.parent;
		var topWindowValid;//frameset的窗口这个标记为false
		var frameSentData;
		var frameSentSuccessData;
		window.addEventListener('message',function(e){//contentscript里面的message监听，监听来自别的窗口的数据。
			var data=e.data;
			if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
			var source=e.source;
			//chrome中所有window窗口的引用都是undefined
			if(typeof source=='undefined' || source!==window){//来自别的窗口
				if(!isFrame){//顶层窗口
					//console.log('top-contentscript接收到：',e);

					var command=data.command;
					switch(command){
						case 'open':{
							var img=document.createElement('img');
							img.src=data.src;

							imgReady(img,{
								ready:function(){
									LoadingAnimC.prototype.open.call({
										img:img,
										data:data.data,
										buttonType:data.buttonType,
										from:data.from,//来自哪个窗口
									});
								},
							});
						}break;
						case 'navigateToImg':{
							var cusEvent=document.createEvent('CustomEvent');
							cusEvent.initCustomEvent('pv-navigateToImg',false,false,data.exist);
							document.dispatchEvent(cusEvent);
						}break;
						case 'topWindowValid':{
							window.postMessage({
								messageID:messageID,
								command:'topWindowValid',
								valid:document.body.nodeName!='FRAMESET',
								to:data.from,
							},'*');
						}break;
					};

				}else{//frame窗口
					//console.log('frame-contentscript接收到',e);
					var command=data.command;
					switch(command){
						case 'navigateToImg':{

							if(!frameSentData.unique){
								var unique=GalleryC.prototype.unique(frameSentData);
								frameSentData=unique.data;
								frameSentData.unique=true;
							};
							var targetImg=frameSentData[data.index].img;
							var exist=(document.documentElement.contains(targetImg) && getComputedStyle(targetImg).display!='none');

							if(exist){
								if(gallery && gallery.shown){//frame里面也打开了一个呢。
									gallery.minimize();
								};
								setTimeout(function(){
									GalleryC.prototype.navigateToImg(targetImg);
									flashEle(targetImg);
								},0);
							};
							window.postMessage({
								messageID:messageID,
								command:'navigateToImg',
								exist:exist,
								to:data.from,
							},'*');
						}break;
						case 'sendFail':{
							frameSentData=frameSentSuccessData;//frameSentData重置为发送成功的数据。
						}break;
						case 'topWindowValid':{
							var cusEvent=document.createEvent('CustomEvent');
							cusEvent.initCustomEvent('pv-topWindowValid',false,false,data.valid);
							document.dispatchEvent(cusEvent);
						}break;
					};
				};

			};
		},true);



		//页面脚本用来转发消息
		//原因chrome的contentscript无法访问非自己外的别的窗口。都会返回undefined，自然也无法向其他的窗口发送信息,这里用pagescript做个中间代理
		//通讯逻辑..A页面的contentscript发送到A页面的pagescript，pagescript转交给B页面的contentscript

		var messageID='pv-0.5106795670312598';

		var pageScript=document.createElement('script');
		pageScript.id = 'picviewer-page-script';

		var pageScriptText=function(messageID){
			var frameID=Math.random();
			var frames={
				top:window.top,
			};

			window.addEventListener('message',function(e){
				var data=e.data;
				if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
				var source=e.source;
				if(source===window){//来自contentscript,发送出去,或者干嘛。
					if(data.to){
						data.from=frameID;
						frames[data.to].postMessage(data,'*');
					}else{
						switch(data.command){
							case 'getIframeObject':{
								var frameWindow=frames[data.windowId];
								var iframes=document.getElementsByTagName('iframe');
								var iframe;
								var targetIframe;
								for(var i=iframes.length-1 ; i>=0 ; i--){
									iframe=iframes[i];
									if(iframe.contentWindow===frameWindow){
										targetIframe=iframe;
										break;
									};
								};
								var cusEvent=document.createEvent('CustomEvent');
								cusEvent.initCustomEvent('pv-getIframeObject',false,false,targetIframe);
								document.dispatchEvent(cusEvent);
							}break;
						};
					};

				}else{//来自别的窗口的，contentscript可以直接接收，这里保存下来自的窗口的引用
					frames[data.from]=source;
				};
			},true)
		};

		pageScript.textContent='(' + pageScriptText.toString() + ')('+ JSON.stringify(messageID) +')';
		document.head.appendChild(pageScript);


		function clikToOpen(data){

			var preventDefault = matchedRule.clikToOpen.preventDefault;

			function mouseout(){
				document.removeEventListener('mouseout',mouseout,true);
				document.removeEventListener('click',click,true);
				if(data.imgPA && preventDefault){
					data.imgPA.removeEventListener('click',clickA,false);
				};
			};

			function click(e){
				if(e.button!=0)return;
				FloatBarC.prototype.open.call({
					data:data,
				},
				e,
				matchedRule.clikToOpen.type);
			};

			function clickA(e){//阻止a的默认行为
				e.preventDefault();
			};

			document.addEventListener('click',click,true);

			if(data.imgPA && preventDefault){
				data.imgPA.addEventListener('click',clickA,false);
			};

			setTimeout(function(){//稍微延时。错开由于css hover样式发生的out;
				document.addEventListener('mouseout',mouseout,true);
			},100);

			return function(){
				mouseout()
			};
		};

		//监听 mouseover
		var canclePreCTO;
		function globalMouseoverHandler(e){

			//console.log(e);
			if(galleryMode)return;//库模式全屏中......

			var target=e.target;

			if(target.nodeName!='IMG' || target.classList.contains('pv-pic-ignored')){
				return;
			};
			var result=findPic(target);

			if(result){
				if(!floatBar){
					floatBar=new FloatBarC();
				};
				if(result.type=='rule' && matchedRule.clikToOpen && matchedRule.clikToOpen.enabled){
					if(canclePreCTO){//取消上次的，防止一次点击打开多张图片
						canclePreCTO();
					};
					canclePreCTO=clikToOpen(result);
				};
				floatBar.start(result);//出现悬浮工具栏
			};
		};

		document.addEventListener('mouseover',globalMouseoverHandler,true);

		// 注册按键
		if (prefs.gallery.keys.keysEnabled) {
			document.addEventListener('keydown', function(event) {
				if (floatBar && floatBar.shown) {
					var key = String.fromCharCode(event.keyCode).toLowerCase();

					Object.keys(prefs.gallery.keys).some(function(action) {
						if (key == prefs.gallery.keys[action]) {
							floatBar.open(null, action);
							event.stopPropagation();
							event.preventDefault();
							return true;
						}
					})
				}
			}, true);
		}
