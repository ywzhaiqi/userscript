if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}

function getMStr(func) {
    var lines = func.toString();
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}

function toRE(obj, flag) {
	if (!obj) {
		return obj;
	} else if (obj instanceof RegExp) {
		return obj;
	} else if (flag) {
		return new RegExp(obj, flag);
	} else if (obj instanceof Array) {
		return new RegExp(obj[0], obj[1]);
	} else if (typeof obj === 'string') {
		if (obj.indexOf('*') != -1 && obj.indexOf('.*') == -1) {
			obj = wildcardToRegExpStr(obj);
		}
		return new RegExp(obj);
	}
}

function wildcardToRegExpStr(urlstr) {
	if (urlstr.source) return urlstr.source;
	var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
		return str === "*" ? ".*" : "[^/]*";
	});
	return "^" + reg + "$";
}

function isXPath(xpath) {
	return xpath.startsWith('./') || xpath.startsWith('//') || xpath.startsWith('id(');
}

function getElementMix(selector, contextNode, doc) {
	var ret;
	if (!selector || !contextNode) return ret;
	doc = doc || document;

	var type = typeof selector;
	if (type == 'string') {
		if (isXPath(selector)) {
			ret = getElementByXpath(selector, contextNode, doc);
		} else {
			ret = contextNode.parentNode.querySelector(selector);
		}
	} else if (type == 'function') {
		ret = selector(contextNode, doc);
	}
	return ret;
}

function launchFullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	}
}

function cancelFullScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

// 检测缩放
function detectZoom (){
    var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio){
        ratio = Math.round(ratio * 100);
    }

    return ratio;
}

//获取位置
function getContentClientRect(target){
	var rect=target.getBoundingClientRect();
	var compStyle=getComputedStyle(target);
	var pFloat=parseFloat;
	var top=rect.top + pFloat(compStyle.paddingTop) + pFloat(compStyle.borderTopWidth);
	var right=rect.right - pFloat(compStyle.paddingRight) - pFloat(compStyle.borderRightWidth);
	var bottom=rect.bottom - pFloat(compStyle.paddingBottom) - pFloat(compStyle.borderBottomWidth);
	var left=rect.left + pFloat(compStyle.paddingLeft) + pFloat(compStyle.borderLeftWidth);
	return {
		top:top,
		right:right,
		bottom:bottom,
		left:left,
		width:right-left,
		height:bottom-top,
	};
};

//获取窗口大小.
function getWindowSize(){
	/*
		//包含滚动条
		return {
			h:window.innerHeight,
			w:window.innerWidth,
		};
	*/

	//去除滚动条的窗口大小
	var de=document.documentElement;
	var body=document.body;
	var backCompat=document.compatMode=='BackCompat';
	return {
		h:backCompat? body.clientHeight : de.clientHeight,
		w:backCompat? body.clientWidth : de.clientWidth,
	};

};

//获取已滚动的距离
function getScrolled(container){
	if(container){
		return {
			x:container.scrollLeft,
			y:container.scrollTop,
		};
	};
	return {
		x:'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || document.body.scrollLeft),
		y:'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset :  document.documentElement.scrollTop || document.body.scrollTop),
	};
};

//xpath 获取单个元素
function getElementByXpath(xpath,contextNode,doc){
	doc=doc || document;
	contextNode=contextNode || doc;
	return doc.evaluate(xpath,contextNode,null,9,null).singleNodeValue;
};


//事件支持检测.
function eventSupported( eventName,elem ){
	elem = elem || document.createElement("div");
	eventName = "on" + eventName;
	var isSupported = (eventName in elem);
	if (!isSupported){
		if(!elem.setAttribute){//setAttribute是元素节点的方法
			elem=document.createElement("div");
		};
		var setAttr;
		if(!elem.hasAttribute(eventName)){
			setAttr=true;
			elem.setAttribute(eventName, "return;");
		};
		isSupported = typeof elem[eventName] == "function";
		if(setAttr)elem.removeAttribute(eventName);
	};
	return isSupported;
};


//检测属性支持.dom属性
//返回带前缀的可以直接执行是属性
function proSupported(proName,elem){
	//判断第一个字母是否大写，如果是的话，为构造函数，前缀也要大写
	var prefix=/^[A-Z]/.test(proName)? ['','WebKit-','O-','Moz-','MS-'] : ['','webkit-','o-','moz-','ms-'];
	var i=0;
	var p_i;
	var sProName;
	elem = elem || document.createElement("div");
	while(typeof (p_i=prefix[i++])!='undefined'){
		sProName=(p_i+proName).replace(/-([A-z])/g,function(a,b){
			return b.toUpperCase();
		});
		//console.log(sProName);
		if(sProName in elem)return sProName;
	};
};


//css属性支持
//带前缀的默认为大写（所有浏览器支持）
//比如WebkitTransform,MozTransform,OTransfomr
//chrome浏览器大小写前缀都行。
//firefox,opera只能大写
//ie 9+只能小写
function cssProSupported(proName,elem,capitalize){
	if(capitalize!==false)capitalize=true;
	proName=proName.toLowerCase();

	var prefix=['','-webkit-','-o-','-moz-','-ms-'];
	elem=elem || document.createElement('div');
	var style=elem.style;
	var camelPro;

	// 会有个错误 invalid 'in' operand style
	try {
		for(var i=0,ii=prefix.length;i<ii;i++){
			var first=true;
			camelPro=(prefix[i]+proName).replace(/-([a-z])/g,function(a,b){
				b=b.toUpperCase();
				if(first){
					first=false;
					if(!capitalize){
						b=b.toLowerCase();
					};
				};
				return b;
			});
			//console.log(camelPro);
			if(camelPro in style){
				return camelPro;
			}
		}
	} catch(ex) {}

	if(!capitalize)return;
	return cssProSupported(proName,elem,false);

};

//css属性值支持
function cssValueSupported(proName,value,elem){
	var prefix=['','-webkit-','-o-','-moz-','-ms-'];
	elem=elem || document.createElement('div');
	var style=elem.style;
	var prefixedValue;
	for(var i=0,ii=prefix.length;i<ii;i++){
		prefixedValue=prefix[i] + value;
		style[proName]=prefixedValue;
		if(style[proName]==prefixedValue){
			return prefixedValue;
		};
	};
};


//elem.dataset的兼容实现
//ie不支持；firefoxGM储存不能反映到元素属性上。
function dataset(elem,pro,value){

	function getDataPrefix(){
		return 'data-' + pro.replace(/[A-Z]/g,function(m){
			return '-' + m.toLowerCase();
		});
	};

	if(typeof value=='undefined'){//取值
		if(elem.dataset){
			value = elem.dataset[pro];
		}else{//没有取到值，返回undefined，getAttribute默认是返回null，所以判断一下。
			var prefixedPro=getDataPrefix();
			if(elem.hasAttribute(prefixedPro)){
				value=elem.getAttribute(prefixedPro);
			};
		};
		return value;
	}else{
		elem.setAttribute(getDataPrefix(),value);
	};
};


//重新检查悬浮图片
function imgReHover(img){
	//要检查的图片，是当前悬浮的。
	if(!floatBar.shown || floatBar.data.img != img)return;
	//console.log(img);

	var mHover=document.createEvent('MouseEvent');
	var cr=img.getBoundingClientRect();
	mHover.initMouseEvent('mouseover',true,true,window,0, cr.left + 10, cr.top + 10, cr.left + 10, cr.top + 10, false,false,false,false, 0,null);
	img.dispatchEvent(mHover);
};

// 获取真正的unsafeWindow,chrome里面也能访问到真实环境的变量
// 在 chrome 37 测试无效
if(!envir.firefox && !envir.opera && !envir.ie && !storage.supportGM){
	;(function(){
		document.addEventListener('picViewer-return-unsafeWindow',function(e){
			unsafeWindow = e.detail;
			// alert(unsafeWindow.$);
		},true);

		//页面脚本
		var s=document.createElement('script');
		s.textContent='(' + (function(){
			var cusEvent=document.createEvent('CustomEvent');
			cusEvent.initCustomEvent('picViewer-return-unsafeWindow',false,false,window);
			document.dispatchEvent(cusEvent);
		}).toString() +')()';
		document.head.appendChild(s);
	})();
};


//抛出错误到错误控制台
function throwErrorInfo(err){
	if(console && console.error){
		console.error(err.message + '\n\n' + (err.stacktrace? err.stacktrace : '') + '\n\n' , err);
	};
};

//对象克隆
function cloneObject(obj,deep){
	var obj_i;
	var ret=Array.isArray(obj)? [] : {};
	for(var i in obj){
		if(!obj.hasOwnProperty(i))continue;
		obj_i=obj[i];
		if(!deep || typeof obj_i!='object' || obj_i===null || obj_i.nodeType){
			ret[i]=obj_i;
		}else{
			ret[i]=cloneObject(obj_i,deep);
		};
	};
	return ret;
};

//闪烁元素。
function flashEle(ele,duration){
	if(dataset(ele,'pvFlashing'))return;
	if(ele.offsetHeight==0)return;
	dataset(ele,'pvFlashing','1');

	var oOutline=ele.style.outline;
	var oOutlineOffset=ele.style.outlineOffset;
	var oOpacity=ele.style.opacity;
	var oTransform=ele.style[support.cssTransform];

	var count=0;
	var startTime=Date.now();
	duration=duration? duration : 1200;

	var flashInterval=setInterval(function(){
		var outline='none',
			outlineOffset=0,
			opacity=0.3,
			transform='';

		if(count % 2 == 0){
			outline='5px dashed rgba(255,0,0,0.95)';
			opacity=0.95;
			outlineOffset='1px';
			transform='scale(1.1)';
		}else{
			if((Date.now() - startTime) > duration){
				clearInterval(flashInterval);
				outline=oOutline;
				opacity=oOpacity;
				outlineOffset=oOutlineOffset;
				transform=oTransform;
				ele.removeAttribute('data-pv-flashing');
			};
		};

		ele.style.outline=outline;
		ele.style.outlineOffset=outlineOffset;
		ele.style.opacity=opacity;
		ele.style[support.cssTransform]=transform;

		count++;
	},80);
};

//支持情况.
var support={
	cssTransform:cssProSupported('transform'),
	cssCursorValue:{
		zoomIn:cssValueSupported('cursor','zoom-in'),
		zoomOut:cssValueSupported('cursor','zoom-out'),
		grab:cssValueSupported('cursor','grab'),
		grabbing:cssValueSupported('cursor','grabbing'),
	},
};


//console.log('浏览器的一些对象支持情况:',support);

//动画算法
/*
 t: current time（当前时间）；
 b: beginning value（初始值）；
 c: change in value（变化量）；
 d: duration（持续时间）。
*/

var Tween = {
	Cubic: {
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
	},
};

//imgReady
var imgReady=(function(){
	var iRInterval,
		iRReadyFn=[],
		isrcs=[]
	;

	var timeLimit=3 * 60 * 1000;//3分钟

	function checkReady(){
		var now= Date.now();
		for(var i=0,ii=iRReadyFn.length,iRReadyFn_i;i<ii;i++){
			iRReadyFn_i=iRReadyFn[i];
			//now - iRReadyFn_i.startTime >= timeLimit ||
			if(iRReadyFn_i()){
				iRReadyFn.splice(i,1);
				isrcs.splice(i,1);
				i--;
				ii--;
			};
		};
		//console.log('checkReady',iRReadyFn.length)
		if(iRReadyFn.length==0){
			clearInterval(iRInterval);
			iRInterval=null;
		};
	};



	var imgReady=function(img,opts){

		if(/NodeList|HTMLCollection/.test(Object.prototype.toString.call(img))  || Array.isArray(img)){
			arrayFn.forEach.call(img,function(img,index,array){
				if(img instanceof HTMLImageElement){
					imgReady(img,opts);
				};
			});
			return;
		};

		if(!(img instanceof HTMLImageElement)){
			var t_img=document.createElement('img');
			t_img.src=img;
			img=t_img;
			t_img=null;
		};

		var ready,load,error,loadEnd,abort,timeout,time;
		ready=opts.ready;
		load=opts.load;
		error=opts.error;
		loadEnd=opts.loadEnd;
		abort=opts.abort;
		timeout=opts.timeout;
		time=typeof opts.time=='number'? opts.time : 0;

		if(time){
			setTimeout(function(){
				if(!loadEndDone){
					aborted=true;
					removeListener();
					img.src= prefs.icons.brokenImg_small;
					if(timeout){
						timeout.call(img,{
							target:img,
							type:'timeout',
						});
					};
					loadEndDone=true;
					if(loadEnd){
						loadEnd.call(img,{
							target:img,
							type:'timeout',
						});
					};

				};
			},time);
		};

		var src=img.src;
		var loadEndDone;

		function go(type,e){
			switch(type){
				case 'load':{
					removeListener();
					go('ready');//如果直接触发load，那么先触发ready
					if(load){
						load.call(img,e);
					};

					if(!loadEndDone){
						loadEndDone=true;
						if(loadEnd){
							loadEnd.call(img,e);
						};
					};
				}break;
				case 'ready':{
					if(!ready || readyHandler.done)return;
					readyHandler.done=true;
					ready.call(img,{
						target:img,
						type:'ready',
					});
				}break;
				case 'error':{
					removeListener();
					if(error){
						error.call(img,e);
					};
					if(!loadEndDone){
						loadEndDone=true;
						if(loadEnd){
							loadEnd.call(img,e);
						};
					};
				}break;
			};
		};

		var aborted;
		var ret={
			img:img,
			abort:function(){
				if(!loadEndDone){
					aborted=true;
					removeListener();
					img.src= prefs.icons.brokenImg_small;
					if(abort){
						abort.call(img,{
							target:img,
							type:'abort',
						});
					};
					loadEndDone=true;
					if(loadEnd){
						loadEnd.call(img,{
							target:img,
							type:'abort',
						});
					};
				};
			},
		};

		function readyHandler(){//尽快的检测图片大小.
			if(loadEndDone || aborted)return true;
			if(img.naturalWidth==0 || img.naturalHeight==0)return;
			go('ready');
			return true;
		};


		function loadHandler(e){
			go('load',e);
		};

		function errorHandler(e){
			go('error',e);
		};

		function removeListener(){
			img.removeEventListener('load',loadHandler,true);
			img.removeEventListener('error',errorHandler,true);
		};

		//ready必须在load之前触发。

		if(img.complete){//图片已经加载完成.
			if(typeof img.width=='number' && img.width && img.height){//图片
				setTimeout(function(){
					if(aborted)return;
					go('load',{
						type:'load',
						target:img,
					});
				},0);
			}else{//这不是图片.opera会识别错误.
				setTimeout(function(){
					if(aborted)return;
					go('error',{
						type:'error',
						target:img,
					});
				},0);
			};
			return ret;
		};


		img.addEventListener('load',loadHandler,true);
		img.addEventListener('error',errorHandler,true);


		if(ready){
			var index=isrcs.indexOf(src);
			if(index==-1){
				isrcs.push(src);
				readyHandler.startTime= Date.now();
				iRReadyFn.push(readyHandler);
			}else{
				iRReadyFn[index].startTime= Date.now();
			};

			if(!iRInterval){
				iRInterval=setInterval(checkReady,66);
			};
		};

		return ret;
	};

	return imgReady;
})();


var addWheelEvent=(function(){

	function getSupportEventName(){
		var ret='DOMMouseScroll';
		if(eventSupported('wheel')){//w3c FF>=17 ie>=9
			ret='wheel';
		}else if(eventSupported('mousewheel')){//opera,chrome
			ret='mousewheel';
		};
		return ret;
	};

	var eventName;

	return function(ele,callback,useCapture){
		if(!eventName){
			eventName=getSupportEventName();
		};

		ele.addEventListener(eventName,function(e){
			var type=e.type;
			var ne;
			if(type!='wheel'){
				ne={};
				for(var i in e){
					ne[i]=e[i];
				};

				ne.type='wheel';
				ne.deltaX=0;
				ne.deltaY=0;
				ne.deltaZ=0;
				ne.deltaMode=1;//line
				ne.preventDefault=e.preventDefault.bind(e);
				ne.stopPropagation=e.stopPropagation.bind(e);

				var x=0,y=0;
				if(typeof e.axis=='number'){//DOMMouseScroll
					if(e.axis==2){
						y=e.detail;
					}else{
						x=e.detail;
					};
				}else{
					//opera早起版本的mousewheel只支持y轴的滚动,e.wheelDeltaY undefined
					if(typeof e.wheelDeltaY=='undefined' ||  e.wheelDeltaY!=0){
						y=-e.wheelDelta/40;
					}else{
						x=-e.wheelDelta/40;
					};
				};
				ne.deltaY =y;
				ne.deltaX =x;

			};

			callback.call(this,ne? ne : e);
		},useCapture || false);
	};
})();


var addCusMouseEvent=(function(){

	function getSupported(){
		return {
			mouseleave:eventSupported('mouseleave'),
			mouseenter:eventSupported('mouseenter'),
		};
	};

	var support;
	var map={
		mouseleave:'mouseout',
		mouseenter:'mouseover',
	};

	return function(type, ele, fn){//事件类型，元素，监听函数
		if(!support){
			support=getSupported();
		};

		// chrome 30+ 虽然支持 mouseenter，但是存在问题
		if(support[type] && !(type == 'mouseenter' && window.chrome)){
			ele.addEventListener(type,fn,false);//mouseleave,enter不冒泡
		}else{
			ele.addEventListener(map[type],function(e){
				var relatedTarget=e.relatedTarget;//mouseout，去往的元素；mouseover，来自的元素
				if(!this.contains(relatedTarget)){
					fn.call(this,e);
				};
			},true);
		};
	};

})();
