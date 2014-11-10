// ------------------- run -------------------------

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

	// if (typeof matchedRule == 'undefined') { // 找到符合站点的高级规则,并缓存.

	// };

	var src,  // 大图地址
		srcs,  // 备用的大图地址
		type,  // 类别
		imgSrc = img.src,  // img 节点的 src
		xhr,
		description;  // 图片的注释

	if(!src && matchedRule){// 通过高级规则获取.
		// 排除
		if (matchedRule.exclude && matchedRule.exclude.test(imgSrc)) {
			return;
		} else {
			try{
				src = matchedRule.getImage.call(img,img,imgPA);
			}catch(err){
				throwErrorInfo(err);
			}

			if(src) {
				if (Array.isArray(src)) {
					srcs = src;
					src = srcs.shift();
				}

				type = 'rule';
				xhr = matchedRule.xhr;

				if (matchedRule.lazyAttr) {  // 由于采用了延迟加载技术，所以图片可能为 loading.gif
					imgSrc = img.getAttribute(matchedRule.lazyAttr) || img.src;
				}

				if (matchedRule.description) {
					var node = getElementMix(matchedRule.description, img);
					if (node) {
						description = node.getAttribute('title') || node.textContent;
					}
				}
			}
		}
	};

	if (!src && !base64Img) { // 兼容 MPIV 脚本规则
		var info = MPIV.parseNode(img);
		if (info && info.url && (info.url != imgSrc)) {
			type = 'rule';
			src = info.url;
			srcs = info.urls;
			if (info.q) {
				xhr = {
					q: info.q
				};
			}
		}
	}

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
			h: parseFloat(imgCStyle.height),
			w: parseFloat(imgCStyle.width),
		};
		// 2014年11月3日，目前的七星浏览器存在缩放bug，会得到小数点，所以要四舍五入
		// 还会造成实际上并未缩放的图片，在七星浏览器上，尺寸会不相等，比如 119 * 119（实际：120 * 120）
		// if (!isNaN(imgCS.h)) imgCS.h = Math.round(imgCS.h);
		// if (!isNaN(imgCS.w)) imgCS.w = Math.round(imgCS.w);

		if(!(imgAS.w==imgCS.w && imgAS.h==imgCS.h)){//如果不是两者完全相等,那么被缩放了.
			if(imgAS.h > prefs.floatBar.minSizeLimit.h || imgAS.w > prefs.floatBar.minSizeLimit.w){//最小限定判断.
				src=imgSrc;
				type='scale';

				// // 图片尺寸相差
				// if (!isNaN(imgCS.h) && (imgAS.h * imgAS.w / (imgCS.h * imgCS.w) * 100 - 100) < prefs.gallery.zoomresized) {
				// 	type = 'scaleZoomResized'
				// }
				if (imgAS.h < prefs.gallery.scaleSmallSize && imgAS.w < prefs.gallery.scaleSmallSize) {
					type = 'scaleSmall';
				}
			};
		}else{
			if(prefs.floatBar.forceShow.enabled && (imgCS.w>=prefs.floatBar.forceShow.size.w && imgCS.h>=prefs.floatBar.forceShow.size.h)){
				src=imgSrc;
				type='force';
			};
		};
	};

	if(!src)return;

	var ret = {
		src: src,                  // 得到的src
		srcs: srcs,                // 多个 src，失败了会尝试下一个
		type: type,                // 通过哪种方式得到的
		imgSrc: imgSrc,            // 处理的图片的src
		iPASrc: iPASrc,            // 图片的第一个父a元素的链接地址

		xhr: xhr,
		description: description || '',

		img: img,                  // 处理的图片
		imgPA: imgPA,              // 图片的第一个父a元素
	};

	//console.log('图片查找结果:',ret);
	return ret;
}

function getMatchedRule() {
	var rule = siteInfo._find(function(site, index, array) {
		if (site.url && toRE(site.url).test(URL)) {
			return true;
		}
	});

	rule = rule ? rule[0] : false;
	// debug('picviewerCE 匹配的规则：',rule);

	return rule;
}

var isFrame=window!=window.parent;
var topWindowValid;//frameset的窗口这个标记为false
var frameSentData;
var frameSentSuccessData;
function handleMessage(e){ // contentscript里面的message监听，监听来自别的窗口的数据。
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
}

//页面脚本用来转发消息
//原因chrome的contentscript无法访问非自己外的别的窗口。都会返回undefined，自然也无法向其他的窗口发送信息,这里用pagescript做个中间代理
//通讯逻辑..A页面的contentscript发送到A页面的pagescript，pagescript转交给B页面的contentscript
function addPageScript() {
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
}

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
}

//监听 mouseover
var canclePreCTO;
function globalMouseoverHandler(e){

	//console.log(e);
	if(galleryMode)return;//库模式全屏中......

	var target = e.target;

	if (!target || target.classList.contains('pv-pic-ignored')) {
		return;
	}

	// 扩展模式，检查前面一个是否为 img
	if (target.nodeName != 'IMG' && matchedRule && matchedRule.ext) {
		var _type = typeof matchedRule.ext;
		if (_type == 'string') {
			switch (matchedRule.ext) {
				case 'previous':
					target = target.previousElementSibling;
					break;
				case 'previous-2':
					target = target.previousElementSibling &&
							target.previousElementSibling.previousElementSibling;
					break;
			}
		} else if (_type == 'function') {
			try {
				target = matchedRule.ext(target);
			} catch(ex) {
				throwErrorInfo(ex);
			}

			if (!target) return;
		}
	}

	var result;

	// if (target.nodeName != 'IMG') {  // 兼容 MPIV 脚本规则的非 img 节点，缺失图库的功能
	// 	var info = MPIV.parseNode(target);
	// 	if (info && info.r) {
	// 		var img = info.node;
	// 		result = {
	// 			type: 'rule',
	// 			src: info.url,
	// 			srcs: info.urls,
	// 			imgSrc: img.src,

	// 			img: img,
	// 			imgPA: null,
	// 		};

	// 		if (info.q) {
	// 			result.xhr = {
	// 				q: info.q
	// 			};
	// 		}
	// 	}
	// }

	if (!target || !result && target.nodeName != 'IMG') return;

	if (!result) {
		result = findPic(target);
	}

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
}

function isKeyDownEffectiveTarget(target) {
	var localName = target.localName;

	// 确保光标不是定位在文字输入框或选择框
	if (localName == 'textarea' || localName == 'input' || localName == 'select')
	    return false;

	// 视频播放器
	if (localName == 'object' || localName == 'embed')
	    return false;

	// 百度贴吧回复输入的问题
	if (target.getAttribute('contenteditable') == 'true')
	    return false;

	return true;
}

function keydown(event) {
	if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey)
		return;

	if (floatBar && floatBar.shown && isKeyDownEffectiveTarget(event.target)) {
		var key = String.fromCharCode(event.keyCode).toLowerCase();

		Object.keys(prefs.floatBar.keys).some(function(action) {
			if (action == 'enable') return;
			if (key == prefs.floatBar.keys[action]) {
				floatBar.open(null, action);
				event.stopPropagation();
				event.preventDefault();
				return true;
			}
		})
	}
}

matchedRule = getMatchedRule();

// 添加自定义样式
if (matchedRule && matchedRule.css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'gm-picviewer-site-style';
	style.textContent = matchedRule.css;
	document.head.appendChild(style);
}

MPIV.loadRule();

window.addEventListener('message', handleMessage, true);

addPageScript();

document.addEventListener('mouseover', globalMouseoverHandler, true);

// 注册按键
if (prefs.floatBar.keys.enable) {
	document.addEventListener('keydown', keydown, false);
}
