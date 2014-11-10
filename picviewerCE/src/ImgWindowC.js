//图片窗口
function ImgWindowC(img, data){
	this.img=img;
	this.src=img.src;
	this.data = data;

	this.init();
};

ImgWindowC.all=[];//所有的窗口对象
ImgWindowC.styleZIndex=2147483647;//全局z-index;
ImgWindowC.zoomRange=prefs.imgWindow.zoom.range.slice(0).sort();//升序
ImgWindowC.zoomRangeR=ImgWindowC.zoomRange.slice(0).reverse();//降序
ImgWindowC.overlayer=null;


ImgWindowC.prototype={
	init:function(){
		var self=this;
		//图片是否已经被打开
		if(ImgWindowC.all._find(function(iwin){
			if(iwin.src==self.src){
				iwin.firstOpen();
				return true;
			};
		}))return;

		this.addStyle();

		var img=this.img;
		img.className='pv-pic-window-pic pv-pic-ignored';
		img.style.cssText='\
			top:0px;\
			left:0px;\
		';

		var imgNaturalSize={
			h:img.naturalHeight,
			w:img.naturalWidth,
		};
		this.imgNaturalSize=imgNaturalSize;

		var container=document.createElement('span');
		container.style.cssText='\
			cursor:pointer;\
			top:0px;\
			left:0px;\
		';
		container.className='pv-pic-window-container';
		container.innerHTML=
			'<span class="pv-pic-window-rotate-indicator">'+
				'<span class="pv-pic-window-rotate-indicator-pointer"></span>'+
			'</span>'+
			'<span class="pv-pic-window-rotate-overlayer"></span>'+
			'<span class="pv-pic-window-toolbar" unselectable="on">'+
				'<span class="pv-pic-window-tb-hand pv-pic-window-tb-tool" title="抓手"></span>'+
				'<span class="pv-pic-window-tb-tool-badge-container pv-pic-window-tb-tool-extend-menu-container">'+
					'<span class="pv-pic-window-tb-rotate pv-pic-window-tb-tool" title="旋转"></span>'+
					'<span class="pv-pic-window-tb-tool-badge">0</span>'+
					'<span class="pv-pic-window-tb-tool-extend-menu pv-pic-window-tb-tool-extend-menu-rotate">'+
						'<span class="pv-pic-window-tb-tool-extend-menu-item">0</span>'+
						'<span class="pv-pic-window-tb-tool-extend-menu-item">+90</span>'+
						'<span class="pv-pic-window-tb-tool-extend-menu-item">-90</span>'+
					'</span>'+
				'</span>'+
				'<span class="pv-pic-window-tb-tool-badge-container pv-pic-window-tb-tool-extend-menu-container">'+
					'<span class="pv-pic-window-tb-zoom pv-pic-window-tb-tool" title="缩放"></span>'+
					'<span class="pv-pic-window-tb-tool-badge">0</span>'+
					'<span class="pv-pic-window-tb-tool-extend-menu pv-pic-window-tb-tool-extend-menu-zoom">'+
						'<span class="pv-pic-window-tb-tool-extend-menu-item">1</span>'+
						'<span class="pv-pic-window-tb-tool-extend-menu-item">+0.1</span>'+
						'<span class="pv-pic-window-tb-tool-extend-menu-item">-0.1</span>'+
					'</span>'+
				'</span>'+
				'<span class="pv-pic-window-tb-flip-horizontal pv-pic-window-tb-command" title="水平翻转"></span>'+
				'<span class="pv-pic-window-tb-flip-vertical pv-pic-window-tb-command" title="垂直翻转"></span>'+
			'</span>'+
			'<span class="pv-pic-window-close"></span>' +
			'<span class="pv-pic-window-range"></span>' +
			'<span class="pv-pic-window-description"></span>';

		container.insertBefore(img,container.firstChild);

		this.imgWindow=container;

		var toolMap={
			'hand':container.querySelector('.pv-pic-window-tb-hand'),
			'rotate':container.querySelector('.pv-pic-window-tb-rotate'),
			'zoom':container.querySelector('.pv-pic-window-tb-zoom'),
			'fh':container.querySelector('.pv-pic-window-tb-flip-horizontal'),
			'fv':container.querySelector('.pv-pic-window-tb-flip-vertical'),
		};
		this.toolMap=toolMap;


		//关闭
		var closeButton=container.querySelector('.pv-pic-window-close');
		closeButton.style.cssText='\
			top: -24px;\
			right: 0px;\
		';
		this.closeButton=closeButton;

		closeButton.addEventListener('click',function(e){
			self.remove();
		},false);

		/**
		 * 说明
		 * 1、对原来的适应屏幕等功能会有影响，暂时禁用。
		 * 2、分为 absolute 和默认的2种情况
		 */
		if (this.data) {
			var descriptionSpan = container.querySelector('.pv-pic-window-description');
			// descriptionSpan.style.cssText = '\
			// 	bottom: -40px;\
			// 	left: 10px;\
			// ';
			descriptionSpan.textContent = this.data.description || '';
			// descriptionSpan.style.display = this.data.description ? 'block' : 'none';
			descriptionSpan.style.display = 'none';
			this.descriptionSpan = descriptionSpan;
		}

		var toolbar=container.querySelector('.pv-pic-window-toolbar');
		toolbar.style.cssText='\
			top: 0px;\
			left: -45px;\
		';
		this.toolbar=toolbar;

		this.selectedToolClass='pv-pic-window-tb-tool-selected';

		this.viewRange=container.querySelector('.pv-pic-window-range');

		this.rotateIndicator=container.querySelector('.pv-pic-window-rotate-indicator');
		this.rotateIPointer=container.querySelector('.pv-pic-window-rotate-indicator-pointer');
		this.rotateOverlayer=container.querySelector('.pv-pic-window-rotate-overlayer');


		this.hKeyUp=true;
		this.rKeyUp=true;
		this.zKeyUp=true;

		this.spaceKeyUp=true;
		this.ctrlKeyUp=true;
		this.altKeyUp=true;
		this.shiftKeyUp=true;

		//缩放工具的扩展菜单
		container.querySelector('.pv-pic-window-tb-tool-extend-menu-zoom').addEventListener('click',function(e){
			var target=e.target;
			var text=target.textContent;
			var value;
			switch(text){
				case '1':{
					value=1;
				}break;
				case '+0.1':{
					value=self.zoomLevel + 0.1;
				}break;
				case '-0.1':{
					value=self.zoomLevel - 0.1;
				}break;
			};
			if(typeof value!='undefined'){
				self.zoom(value,{x:0,y:0});
			};
		},true);

		//旋转工具的扩展菜单
		container.querySelector('.pv-pic-window-tb-tool-extend-menu-rotate').addEventListener('click',function(e){
			var target=e.target;
			var text=target.textContent;
			var value;
			function convert(deg){
				return deg * Math.PI/180;
			};

			switch(text){
				case '0':{
					value=0;
				}break;
				case '+90':{
					value=self.rotatedRadians + convert(90);
				}break;
				case '-90':{
					value=self.rotatedRadians - convert(90);
				}break;
			};

			var PI=Math.PI;
			if(typeof value!='undefined'){
				if(value>=2*PI){
					value-=2*PI;
				}else if(value<0){
					value+=2*PI;
				};
				self.rotate(value,true);
			};
		},true);

		toolbar.addEventListener('mousedown',function(e){//鼠标按下选择工具
			self.toolbarEventHandler(e);
		},false);


		toolbar.addEventListener('dblclick',function(e){//鼠标双击工具
			self.toolbarEventHandler(e);
		},false);


		//阻止浏览器对图片的默认控制行为
		img.addEventListener('mousedown',function(e){
			e.preventDefault();
		},false);


		container.addEventListener('mousedown',function(e){//当按下的时，执行平移，缩放，旋转操作
			self.imgWindowEventHandler(e);
		},false);

		container.addEventListener('click',function(e){//阻止opera ctrl+点击保存图片
			self.imgWindowEventHandler(e);
		},false);

		if(prefs.imgWindow.zoom.mouseWheelZoom){//是否使用鼠标缩放
			addWheelEvent(container,function(e){//滚轮缩放
				self.imgWindowEventHandler(e);
			},false);
		};


		if(prefs.imgWindow.overlayer.shown){//是否显示覆盖层
			var overlayer=ImgWindowC.overlayer;
			if(!overlayer){
				var overlayer=document.createElement('span');
				ImgWindowC.overlayer=overlayer;
				overlayer.className='pv-pic-window-overlayer';
				document.body.appendChild(overlayer);
				overlayer.style.backgroundColor=prefs.imgWindow.overlayer.color;
			};
			overlayer.style.display='block';
		};

		//是否点击图片外部关闭
		if(prefs.imgWindow.close.clickOutside.trigger){
			var clickOutside=function(e){
				var target=e.target;
				if(!container.contains(target)){
					self.remove();
				};
			};
			this.clickOutside=clickOutside;
			document.addEventListener(prefs.imgWindow.close.clickOutside.trigger,clickOutside,true);
		};

		//是否双击图片本身关闭
		if(prefs.imgWindow.close.dblClickImgWindow){
			var dblClickImgWindow=function(e){
				var target=e.target;
				if(target==container || target==img || target==self.rotateOverlayer){
					self.remove();
				};
			};
			container.addEventListener('dblclick',dblClickImgWindow,true);
		};


		document.body.appendChild(container);
		ImgWindowC.all.push(this);

		this._blur=this.blur.bind(this);
		this._focusedKeydown=this.focusedKeydown.bind(this);
		this._focusedKeyup=this.focusedKeyup.bind(this);

		this.rotatedRadians=0;//已经旋转的角度
		this.zoomLevel=1;//缩放级别
		this.setToolBadge('zoom',1);

		//选中默认工具
		this.selectTool(prefs.imgWindow.defaultTool);

		this.firstOpen();
	},


	addStyle:function(){
		if(ImgWindowC.style)return;
		var style=document.createElement('style');
		ImgWindowC.style=style;
		style.textContent='\
			.pv-pic-window-container {\
				position: absolute;\
				background-color: rgba(40,40,40,0.9);\
				padding: 8px;\
				border: 5px solid #ccc;\
				line-height: 0;\
				text-align: left;\
			}\
			.pv-pic-window-container_focus {\
				box-shadow: 0 0 10px rgba(0,0,0,0.6);\
			}\
			.pv-pic-window-close,\
			.pv-pic-window-toolbar,\
			.pv-pic-window-tb-tool-extend-menu{\
				-webkit-transition: opacity 0.2s ease-in-out;\
				transition: opacity 0.2s ease-in-out;\
			}\
			.pv-pic-window-toolbar {\
				position: absolute;\
				background-color: #535353;\
				padding: 0;\
				opacity: 0.9;\
				display: none;\
				cursor: default;\
				-o-user-select: none;\
				-webkit-user-select: none;\
				-moz-user-select: -moz-none;\
				user-select: none;\
			}\
			.pv-pic-window-toolbar:hover {\
				opacity: 1;\
			}\
			.pv-pic-window-toolbar_focus {\
				display: block;\
			}\
			.pv-pic-window-close {\
				cursor: pointer;\
				position: absolute;\
				right: 0px;\
				top: -24px;\
				background: url("'+prefs.icons.close+'") no-repeat center bottom;\
				height: 17px;\
				width: 46px;\
				opacity: 0.9;\
				border:none;\
				padding:0;\
				padding-top:2px;\
				background-color:#1771FF;\
				display: none;\
			}\
			.pv-pic-window-close:hover {\
				background-color:red;\
				opacity: 1;\
			}\
			.pv-pic-window-close_focus {\
				display: block;\
			}\
			.pv-pic-window-description {\
				margin-top: 20px;\
				min-height: 20px;\
			}\
			.pv-pic-window-pic {\
				position: relative;\
				display:inline-block;\/*opera把图片设置display:block会出现渲染问题，会有残影，还会引发其他各种问题，吓尿*/\
				max-width:none;\
				min-width:none;\
				max-height:none;\
				min-height:none;\
				padding:0;\
				margin:0;\
				border:none;\
				vertical-align:middle;\
			}\
			.pv-pic-window-pic_focus {\
				box-shadow: 0 0 6px black;\
			}\
			.pv-pic-window-tb-tool,\
			.pv-pic-window-tb-command{\
				height: 24px;\
				width: 24px;\
				padding: 12px 8px 6px 6px;\
				margin:0;\
				display: block;\
				background: transparent no-repeat center;\
				cursor: pointer;\
				position: relative;\
				border: none;\
				border-left: 2px solid transparent;\
				border-bottom: 1px solid #868686;\
				background-origin: content-box;\
			}\
			.pv-pic-window-toolbar > span:last-child {\
				border-bottom: none;\
			}\
			.pv-pic-window-tb-tool:hover,\
			.pv-pic-window-tb-command:hover{\
				border-left: 2px solid red;\
			}\
			.pv-pic-window-tb-tool-selected{\
				box-shadow: inset 0 21px 0 rgba(255,255,255,0.3) ,inset 0 -21px 0 rgba(0,0,0,0.3);\
				border-left:2px solid #1771FF;\
			}\
			.pv-pic-window-tb-hand {\
				background-image: url("'+prefs.icons.hand+'");\
			}\
			.pv-pic-window-tb-rotate {\
				background-image: url("'+prefs.icons.rotate+'");\
			}\
			.pv-pic-window-tb-zoom {\
				background-image: url("'+prefs.icons.zoom+'");\
			}\
			.pv-pic-window-tb-flip-horizontal {\
				background-image: url("'+prefs.icons.flipHorizontal+'");\
			}\
			.pv-pic-window-tb-flip-vertical {\
				background-image: url("'+prefs.icons.flipVertical+'");\
			}\
			.pv-pic-window-tb-tool-badge-container {\
				display: block;\
				position: relative;\
			}\
			.pv-pic-window-tb-tool-badge {\
				position: absolute;\
				top: -3px;\
				right: 1px;\
				font-size: 10px;\
				line-height: 1.5;\
				padding: 0 3px;\
				background-color: #F93;\
				border-radius: 50px;\
				opacity: 0.5;\
				color: black;\
			}\
			.pv-pic-window-tb-tool-extend-menu{\
				position:absolute;\
				top:0;\
				margin-left:-1px;\
				background-color:#535353;\
				display:none;\
				left:40px;\
				color:#C3C3C3;\
				font-size:12px;\
				text-shadow:0px -1px 0px black;\
				opacity:0.7;\
			}\
			.pv-pic-window-tb-tool-extend-menu:hover{\
				opacity:0.9;\
			}\
			.pv-pic-window-tb-tool-extend-menu-item{\
				display:block;\
				line-height:1.5;\
				text-align:center;\
				padding:10px;\
				cursor:pointer;\
				border: none;\
				border-right: 2px solid transparent;\
				border-bottom: 1px solid #868686;\
			}\
			.pv-pic-window-tb-tool-extend-menu-item:last-child{\
				border-bottom: none;\
			}\
			.pv-pic-window-tb-tool-extend-menu-item:hover{\
				border-right:2px solid red;\
			}\
			.pv-pic-window-tb-tool-extend-menu-item:active{\
				padding:11px 9px 9px 11px;\
			}\
			.pv-pic-window-tb-tool-extend-menu-container:hover .pv-pic-window-tb-tool{\
				border-left:2px solid red;\
			}\
			.pv-pic-window-tb-tool-extend-menu-container:hover .pv-pic-window-tb-tool-extend-menu{\
				display:block;\
			}\
			.pv-pic-window-tb-tool-extend-menu-container::after{\
				content:"";\
				position:absolute;\
				right:1px;\
				bottom:2px;\
				width:0;\
				height:0;\
				padding:0;\
				margin:0;\
				border:3px solid #C3C3C3;\
				border-top-color:transparent;\
				border-left-color:transparent;\
				opacity:0.5;\
			}\
			.pv-pic-window-overlayer{\
				height:100%;\
				width:100%;\
				position:fixed;\
				z-index:999999999;\
				top:0;\
				left:0;\
			}\
			.pv-pic-window-rotate-indicator{\
				display:none;\
				position:fixed;\
				width:250px;\
				height:250px;\
				padding:10px;\
				margin-top:-135px;\
				margin-left:-135px;\
				background:transparent url("'+ prefs.icons.rotateIndicatorBG +'") no-repeat center;\
			}\
			.pv-pic-window-rotate-indicator-pointer{\
				display:block;\
				margin-left:auto;\
				margin-right:auto;\
				background:transparent url("'+ prefs.icons.rotateIndicatorPointer +'") no-repeat center;\
				width:60px;\
				height:240px;\
				position:relative;\
				top:5px;\
				transform:rotate(0.1deg);\
			}\
			.pv-pic-window-rotate-overlayer{/*当切换到旋转工具的时候显示这个覆盖层，然后旋转指示器显示在这个覆盖层的下面*/\
				position:absolute;\
				top:0;\
				bottom:0;\
				left:0;\
				right:0;\
				display:none;\
				background-color:transparent;\
			}\
			.pv-pic-window-range{\
				position:absolute;\
				border:none;\
				width:100px;\
				height:100px;\
				box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);\
				display:none;\
				padding:0;\
				background-color:rgba(255, 0, 0, 0.150);\
			}\
		';
		document.head.appendChild(style);
	},

	firstOpen:function(){
		this.focus();
		var imgWindow=this.imgWindow;
		var scrolled=getScrolled();
		imgWindow.style.left=-5 + scrolled.x + 'px';
		imgWindow.style.top=-5 + scrolled.y + 'px';

		if(prefs.imgWindow.fitToScreen){
			this.fitToScreen();
			this.center(true,true);
		}else{
			//window的尺寸
			var wSize=getWindowSize();
			//空隙
			wSize.h -= 16;
			wSize.w -= 16;

			var imgWindowCS=getComputedStyle(imgWindow);

			var rectSize={
				h:parseFloat(imgWindowCS.height),
				w:parseFloat(imgWindowCS.width),
			};

			this.center(rectSize.w <= wSize.w , rectSize.h <= wSize.h);
		};

		this.keepScreenInside();
	},
	keepScreenInside:function(){//保持按钮在屏幕里面.
		var imgWindow=this.imgWindow;
		var imgWindowFullSize={
			h:imgWindow.offsetHeight,
			w:imgWindow.offsetWidth,
		};

		var windowSize=getWindowSize();

		function keepSI(obj,offsetDirection,defaultValue, out){
			var objRect=obj.getBoundingClientRect();
			var objStyle=obj.style;

			while(offsetDirection.length){
				var oD=offsetDirection[0];
				var oDV=defaultValue[0];
				offsetDirection.shift();
				defaultValue.shift();
				var oValue=parseFloat(objStyle[oD]);
				var newValue;
				switch(oD){
					case 'top':{
						newValue=oValue - objRect.top;
						if(objRect.top<0){
							newValue=Math.min(newValue,imgWindowFullSize.h);
						}else{
							newValue=Math.max(newValue,oDV);
						};
					}break;
					case 'right':{
						newValue=oValue + (objRect.right - windowSize.w);
						if(objRect.right > windowSize.w){//屏幕外
							newValue=Math.min(newValue,imgWindowFullSize.w);
						}else{
							newValue=Math.max(newValue,oDV);
						};
					}break;
					case 'bottom':{
						newValue=oValue + (objRect.bottom - windowSize.h);
						if(objRect.bottom > windowSize.h){//屏幕外
							newValue=Math.min(newValue,imgWindowFullSize.h);
						}else{
							newValue=Math.max(newValue,oDV);
						};
					}break;
					case 'left':{
						newValue=oValue - objRect.left;
						if(objRect.left<0){
							newValue=Math.min(newValue,imgWindowFullSize.w);
						}else{
							newValue=Math.max(newValue,oDV);
						}
					}break;
				};
				//console.log(newValue);
				objStyle[oD]=newValue + 'px';

			};
		};

		keepSI(this.closeButton,['top','right'],[-24,0]);
		keepSI(this.toolbar,['top','left'],[0,-45]);

		// 保持注释在图片里面
		// keepSI(this.descriptionSpan,['bottom', 'left'],[-40, 10]);
	},
	fitToScreen:function(){
		var wSize=getWindowSize();
		//空隙
		wSize.h -= 16;
		wSize.w -= 16;

		var imgWindow=this.imgWindow;
		var imgWindowCS=getComputedStyle(imgWindow);
		var rectSize={
			h:parseFloat(imgWindowCS.height),
			w:parseFloat(imgWindowCS.width),
		};

		var size;
		if(rectSize.w - wSize.w>0 || rectSize.h - wSize.h>0){//超出屏幕，那么缩小。
			if(rectSize.w/rectSize.h > wSize.w/wSize.h){
				size={
					w:wSize.w,
					h:wSize.w / (rectSize.w/rectSize.h),
				};
			}else{
				size={
					h:wSize.h,
					w:wSize.h * (rectSize.w/rectSize.h),
				}
			};

			this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);
		};
	},
	center:function(horizontal,vertical){
		if(!horizontal && !vertical)return;
		var wSize=getWindowSize();
		var imgWindow=this.imgWindow;
		var scrolled=getScrolled();
		if(horizontal)imgWindow.style.left= (wSize.w - imgWindow.offsetWidth)/2 + scrolled.x +'px';
		if(vertical)imgWindow.style.top= (wSize.h - imgWindow.offsetHeight)/2 + scrolled.y +'px';
	},


	move:function(e){
		this.working=true;
		var cursor=this.cursor;
		this.changeCursor('handing');

		var mouseCoor={
			x:e.pageX,
			y:e.pageY,
		};
		var imgWindow=this.imgWindow;
		var imgWStyle=imgWindow.style;
		var oriOffset={
			left:parseFloat(imgWStyle.left),
			top:parseFloat(imgWStyle.top),
		};
		var self=this;
		var moveHandler=function(e){
			imgWStyle.left=oriOffset.left+ e.pageX-mouseCoor.x +'px';
			imgWStyle.top=oriOffset.top + e.pageY-mouseCoor.y +'px';
			self.keepScreenInside();
		};
		var mouseupHandler=function(){
			e.preventDefault();
			self.changeCursor(cursor);
			self.working=false;
			if(self.tempHand && self.spaceKeyUp){//如果是临时切换到抓手工具，平移完成后返回上个工具
				self.tempHand=false;
				self.changeCursor(self.selectedTool);
			};
			document.removeEventListener('mousemove',moveHandler,true);
			document.removeEventListener('mouseup',mouseupHandler,true);
		};
		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',mouseupHandler,true);
	},
	rotate:function(origin,topLeft){

		var img=this.img;
		var imgWindow=this.imgWindow;

		var iTransform=img.style[support.cssTransform].replace(/rotate\([^)]*\)/i,'');

		var imgWindowCS=getComputedStyle(imgWindow);
		var imgRectSize={
			h:parseFloat(imgWindowCS.height),
			w:parseFloat(imgWindowCS.width),
		};

		var rectOffset={
			top:parseFloat(imgWindow.style.top),
			left:parseFloat(imgWindow.style.left),
		};

		var imgSize={
			h:img.clientHeight,
			w:img.clientWidth,
		};

		var imgOffset={
			top:parseFloat(img.style.top),
			left:parseFloat(img.style.left),
		};

		var self=this;
		var PI=Math.PI;

		var rotate=function (radians){
			if(self.rotatedRadians==radians)return;
			img.style[support.cssTransform] = ' rotate('+ radians +'rad) ' + iTransform;//旋转图片
			self.rotateIPointer.style[support.cssTransform]='rotate('+ radians +'rad)';//旋转指示器

			self.rotatedRadians=radians;
			self.setToolBadge('rotate',radians/(PI/180));

			var afterimgRectSize=self.getRotatedImgRectSize( radians, imgSize );
			imgWindow.style.width=afterimgRectSize.w +'px';
			imgWindow.style.height=afterimgRectSize.h + 'px';

			if(!topLeft){
				self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize);
			};

			self.setImgOffset(imgOffset,imgRectSize,afterimgRectSize);
			self.keepScreenInside();
		};


		if(typeof origin=='number'){
			rotate(origin);
			return;
		};


		this.working=true;

		var lastRotatedRadians=this.rotatedRadians;
		this.shiftKeyUp=true;
		var shiftRotateStep=prefs.imgWindow.shiftRotateStep / (180/Math.PI);//转成弧度

		var moveHandler=function(e){
			var radians=lastRotatedRadians + Math.atan2( e.clientY - origin.y, e.clientX - origin.x );
			if(radians>=2*PI){
				radians-=2*PI;
			}else if(radians<0){
				radians+=2*PI;
			};

			if(!self.shiftKeyUp){//如果按下了shift键，那么步进缩放
				radians -= radians % shiftRotateStep;
				radians += shiftRotateStep;
			};
			rotate(radians);
		};

		var mouseupHandler=function(){
			self.working=false;
			self.rotateIndicator.style.display='none';
			document.removeEventListener('mousemove',moveHandler,true);
			document.removeEventListener('mouseup',mouseupHandler,true);
		};

		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',mouseupHandler,true);
	},
	convertToValidRadians:function(radians){
		//转成0-90的等价角度。
		var PI=Math.PI;
		if(radians > PI){
			radians = 2*PI - radians;
		};
		if(radians > 1/2*PI){
			radians = PI - radians;
		};
		return radians;
	},
	getRotatedImgRectSize:function( radians, imgSize ){//通过旋转后的角度和图片的大小，求虚拟矩形的大小
		imgSize= imgSize ? imgSize :{
			h:this.img.clientHeight,
			w:this.img.clentWidth,
		};

		if(typeof radians==='undefined'){
			radians = this.rotatedRadians;
		};

		radians=this.convertToValidRadians(radians);

		return {
			h:this.notExponential(imgSize.h* Math.cos(radians) + imgSize.w * Math.sin(radians)),
			w:this.notExponential(imgSize.h* Math.sin(radians) + imgSize.w * Math.cos(radians)),
		};
	},
	getRotatedImgCliSize:function(rectSize,radians){//通过虚拟矩形的大小和图片的旋转角度，求图片的大小

		if(typeof radians==='undefined'){
			radians = this.rotatedRadians;
		};

		radians=this.convertToValidRadians(radians);

		if(radians==0){
			//radians=Math.PI/180 * 1/100;
			return rectSize;
		};

		var h=(rectSize.h-rectSize.w * Math.tan(radians))/(Math.cos(radians)-Math.sin(radians)*Math.tan(radians));
		var w=(rectSize.h - h*Math.cos(radians))/Math.sin(radians);
		return {
			h:h,
			w:w,
		};

	},
	setImgOffset:function(oriOffset,bImgSize,aImgSize){
		var imgStyle=this.img.style;

		//避免出现指数形式的数字和单位相加，导致变成无效值
		var top=this.notExponential(oriOffset.top + (aImgSize.h-bImgSize.h)*1/2) + 'px';
		var left=this.notExponential(oriOffset.left + (aImgSize.w-bImgSize.w)*1/2)  + 'px';
		imgStyle.top= top;
		imgStyle.left= left;
	},
	setImgWindowOffset:function(oriOffset,bImgWindowSize,aImgWidnowSize,ratio){
		ratio= ratio? ratio : {x:1/2,y:1/2};
		var imgWindowStyle=this.imgWindow.style;
		var top=oriOffset.top - (aImgWidnowSize.h-bImgWindowSize.h)*ratio.y + 'px';
		var left=oriOffset.left - (aImgWidnowSize.w-bImgWindowSize.w)*ratio.x + 'px';
		imgWindowStyle.top= top;
		imgWindowStyle.left= left;
	},
	zoom:function(e,ratio){//e可能是undefined,可能是事件对象，可能是直接的缩放级别数字
		var imgWindow=this.imgWindow;
		var imgWindowCS=getComputedStyle(imgWindow);
		var imgRectSize={
			h:parseFloat(imgWindowCS.height),
			w:parseFloat(imgWindowCS.width),
		};

		var rectOffset={
			top:parseFloat(imgWindow.style.top),
			left:parseFloat(imgWindow.style.left),
		};

		var img=this.img;
		var self=this;

		var zoom=function(level){//缩放到指定级别
			if(typeof level=='undefined' || level<0 || level==self.zoomLevel)return;

			var afterImgSize={
				h:self.imgNaturalSize.h * level,
				w:self.imgNaturalSize.w * level,
			};
			img.width=afterImgSize.w;
			img.height=afterImgSize.h;

			var afterimgRectSize=self.getRotatedImgRectSize( self.rotatedRadians, afterImgSize );
			//console.log(afterimgRectSize);
			imgWindow.style.width=afterimgRectSize.w +'px';
			imgWindow.style.height=afterimgRectSize.h + 'px';
			self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize,ratio);
			self.setImgOffset({top:0,left:0},afterImgSize,afterimgRectSize);//如果旋转了，调整偏移
			self.zoomLevel=level;
			self.setToolBadge('zoom',level);
			self.keepScreenInside();
		};

		if(typeof e!='object'){
			ratio=ratio? ratio : {
				x:1/2,
				y:1/2,
			};
			zoom(e);
			return;
		};

		this.working=true;

		ratio=this.getZoomRatio({
			x:e.clientX,
			y:e.clientY,
		});


		var moved;
		var lastPageX=e.pageX;
		var currentLevel=this.zoomLevel;
		var moveFired=0;
		var moveHandler=function(e){
			moveFired++
			if(moveFired < 2){//有时候点击的时候不小心会触发一发move
				return;
			};
			moved=true;
			var pageX=e.pageX;
			var level;
			if(pageX > lastPageX){//向右移，zoomin扩大
				self.changeCursor('zoom',false);
				level=0.05;
			}else{//向左移，zoomout缩小
				self.changeCursor('zoom',true);
				level=-0.05;
			};
			lastPageX=pageX;
			currentLevel += level;
			zoom(currentLevel);
		};

		var mouseupHandler=function(e){
			self.working=false;
			document.removeEventListener('mousemove',moveHandler,true);
			document.removeEventListener('mouseup',mouseupHandler,true);

			var level=self.getNextZoomLevel();

			if(self.zoomOut && self.altKeyUp){
				self.zoomOut=false;
			};

			if(!moved){//如果没有平移缩放。
				zoom(level);
			};

			self.changeCursor('zoom',self.zoomOut);

			if(self.tempZoom && self.ctrlKeyUp && self.altKeyUp){
				self.tempZoom=false;
				self.changeCursor(self.selectedTool);
			};

		};

		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',mouseupHandler,true);
	},
	getNextZoomLevel:function(){
		var level;
		var self=this;
		if(this.zoomOut){//缩小
			ImgWindowC.zoomRangeR._find(function(value){
				if(value < self.zoomLevel){
					level=value;
					return true;
				}
			})
		}else{
			ImgWindowC.zoomRange._find(function(value){
				if(value > self.zoomLevel){
					level=value;
					return true;
				};
			});
		}
		return level;
	},
	getZoomRatio:function(mouseCoor){
		var ibcRect=this.img.getBoundingClientRect();
		var ratio={
			x:(mouseCoor.x-ibcRect.left)/ibcRect.width,
			y:(mouseCoor.y-ibcRect.top)/ibcRect.height,
		};
		if(ratio.x<0){
			ratio.x=0
		}else if(ratio.x>1){
			ratio.x=1
		};
		if(ratio.y<0){
			ratio.y=0
		}else if(ratio.y>1){
			ratio.y=1
		};
		return ratio;
	},
	aerialView:function(e){
		this.working=true;
		//记住现在的缩放比例
		var cLevel=this.zoomLevel;

		var wSize=getWindowSize();
		wSize.h -= 16;
		wSize.w -= 16;

		var imgWindow=this.imgWindow;
		var imgWindowCS=getComputedStyle(imgWindow);
		var rectSize={
			h:parseFloat(imgWindowCS.height),
			w:parseFloat(imgWindowCS.width),
		};
		var rectRatio=rectSize.h/rectSize.w;
		var windowRatio=wSize.h/wSize.w;

		var size;
		var rangeSize={};
		if(rectRatio > windowRatio){
			size={
				h:wSize.h,
				w:wSize.h / rectRatio,
			};
			rangeSize.h=Math.min(wSize.h *  (size.h / rectSize.h), size.h);
			rangeSize.w=Math.min(rangeSize.h / windowRatio , size.w);
		}else{
			size={
				w:wSize.w,
				h:wSize.w * rectRatio,
			};
			rangeSize.w=Math.min(wSize.w *  (size.w / rectSize.w), size.w);
			rangeSize.h=Math.min(rangeSize.w * windowRatio , size.h);
		};


		this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);

		this.center(true,true);

		this.keepScreenInside();

		var viewRange=this.viewRange;
		var vRS=viewRange.style;
		vRS.display='block';
		vRS.height=rangeSize.h + 'px';
		vRS.width=rangeSize.w + 'px';
		vRS.top=0 + 'px';
		vRS.left=0 + 'px';



		var viewRangeRect=viewRange.getBoundingClientRect();
		var scrolled=getScrolled();
		var viewRangeCenterCoor={
			x:viewRangeRect.left + scrolled.x + 1/2 * rangeSize.w,
			y:viewRangeRect.top + scrolled.y + 1/2 * rangeSize.h,
		};

		var self=this;

		var moveRange={
			x:[8,8+size.w-rangeSize.w],
			y:[8,8+size.h-rangeSize.h]
		};


		function setViewRangePosition(pageXY){
			var top=pageXY.y - viewRangeCenterCoor.y;
			var left=pageXY.x - viewRangeCenterCoor.x;
			if(top<=moveRange.y[0]){
				top=moveRange.y[0];
			}else if(top>=moveRange.y[1]){
				top=moveRange.y[1];
			};
			vRS.top= top + 'px';
			if(left<=moveRange.x[0]){
				left=moveRange.x[0];
			}else if(left>=moveRange.x[1]){
				left=moveRange.x[1];
			};
			vRS.left= left + 'px';
		};

		setViewRangePosition({
			x:e.pageX,
			y:e.pageY,
		});

		var moveHandler=function(e){
			setViewRangePosition({
				x:e.pageX,
				y:e.pageY,
			});
		};

		var mouseupHandler=function(){
			self.working=false;
			viewRange.style.display='none';
			self.zoom(cLevel);
			var scrolled=getScrolled();
			imgWindow.style.top= -13 -  rectSize.h * ((parseFloat(vRS.top) - moveRange.y[0])/size.h) + scrolled.y +'px';
			imgWindow.style.left= -13 - rectSize.w * ((parseFloat(vRS.left) - moveRange.x[0])/size.w) + scrolled.x +'px';

			//说明图片的高度没有屏幕高，居中
			//说明图片的宽度没有屏幕宽，居中
			self.center(rangeSize.w == size.w , rangeSize.h == size.h);

			self.keepScreenInside();

			document.removeEventListener('mousemove',moveHandler,true);
			document.removeEventListener('mouseup',mouseupHandler,true);
		};
		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',mouseupHandler,true);
	},
	setToolBadge:function(tool,content){
		var scale=0;
		switch(tool){
			case 'zoom':{
				scale=2;
			}break;
			case 'rotate':{
				scale=1;
			}break;
			default:break;
		}
		content=typeof content=='string'? content : content.toFixed(scale);
		this.toolMap[tool].nextElementSibling.textContent=content;
	},
	notExponential:function(num){//不要转为指数形势
		if(num>0){
			if(num >= 999999999999999934463){
				return  999999999999999934463;
			}else if(num <= 0.000001){
				return 0.000001;
			};
		}else if(num < 0){
			if(num >= -0.000001){
				return -0.000001;
			}else if(num <= -999999999999999934463){
				return -999999999999999934463
			};
		};

		return num;
	},

	blur:function(e){
		if(!this.focused)return;
		var imgWindow =this.imgWindow;
		//点击imgWinodw的外部的时候失去焦点
		if(e!==true && imgWindow.contains(e.target))return;
		imgWindow.classList.remove('pv-pic-window-container_focus');
		this.toolbar.classList.remove('pv-pic-window-toolbar_focus');
		this.closeButton.classList.remove('pv-pic-window-close_focus');
		this.img.classList.remove('pv-pic-window-pic_focus');
		document.removeEventListener('mousedown',this._blur,true);
		document.removeEventListener('keydown',this._focusedKeydown,true);
		document.removeEventListener('keyup',this._focusedKeyup,true);
		this.changeCursor('default');
		ImgWindowC.selectedTool=this.selectedTool;
		this.focused=false;
	},
	focus:function(){
		if(this.focused)return;
		this.imgWindow.classList.add('pv-pic-window-container_focus');
		this.toolbar.classList.add('pv-pic-window-toolbar_focus');
		this.closeButton.classList.add('pv-pic-window-close_focus');
		this.img.classList.add('pv-pic-window-pic_focus');
		this.imgWindow.style.zIndex= ImgWindowC.styleZIndex;
		this.zIndex=ImgWindowC.styleZIndex;
		ImgWindowC.styleZIndex ++;
		document.addEventListener('keydown',this._focusedKeydown,true);
		document.addEventListener('keyup',this._focusedKeyup,true);
		document.addEventListener('mousedown',this._blur,true);

		//还原鼠标样式。
		this.changeCursor(this.selectedTool);

		if(prefs.imgWindow.syncSelectedTool && ImgWindowC.selectedTool){
			this.selectTool(ImgWindowC.selectedTool);
		};

		this.focused=true;
	},
	focusedKeyup:function(e){
		var keyCode=e.keyCode;
		var valid=[32,18,16,72,17,72,82,90,67];
		if(valid.indexOf(keyCode)==-1)return;

		e.preventDefault();

		switch(keyCode){
			case 32:{//空格键，临时切换到移动
				this.spaceKeyUp=true;
				if(!this.tempHand)return;//如果之前没有临时切换到抓手工具（当已经在工作的时候，按下空格不会临时切换到抓手工具）
				if(!this.working){//松开按键的时候，没有在继续平移了。
					this.tempHand=false;
					this.changeCursor(this.selectedTool);
				};
			}break;
			case 18:{//alt键盘切换缩小放大。
				this.altKeyUp=true;
				if(!this.zoomOut)return;
				if(!this.working){
					this.zoomOut=false;
					this.changeCursor('zoom');
					if(this.tempZoom && this.ctrlKeyUp){
						this.tempZoom=false;
						this.changeCursor(this.selectedTool);
					};
				};
			}break;
			case 16:{//shift键，旋转的时候按住shift键，步进缩放。
				this.shiftKeyUp=true;
			}break;
			case 17:{//ctrl键
				clearTimeout(this.ctrlkeyDownTimer);
				if(!this.justCKeyUp){//如果刚才没有松开c，规避划词软件的ctrl+c松开
					this.ctrlKeyUp=true;
					if(!this.tempZoom)return;//如果没有切换到了缩放
					if(!this.working && this.altKeyUp){
						this.tempZoom=false;
						this.changeCursor(this.selectedTool);
					};
				};
			}break;
			case 67:{//c键
				this.justCKeyUp=true;
				var self=this;
				clearTimeout(this.justCKeyUpTimer);
				this.justCKeyUpTimer=setTimeout(function(){
					self.justCKeyUp=false;
				},100)
			}break;
			case 72:{//h键
				this.hKeyUp=true;
			}break;
			case 82:{//r键
				this.rKeyUp=true;
			}break;
			case 90:{//z键
				this.zKeyUp=true;
			}break;
			default:break;
		};

		if([72,82,90].indexOf(keyCode)!=-1){
			if(!this.working && this.restoreBeforeTool){
				this.restoreBeforeTool=false;
				this.selectTool(this.beforeTool);
			};
		};
	},
	focusedKeydown:function(e){
		var keyCode=e.keyCode;
		var valid=[32,82,72,90,18,16,17,27,67];//有效的按键
		if(valid.indexOf(keyCode)==-1) return;

		e.preventDefault();

		if(this.working){//working的时候也可以接受按下shift键，以便旋转的时候可以任何时候按下
			if(keyCode==16){//shift键
				this.shiftKeyUp=false;
			};
			return;
		};

		switch(keyCode){
			case 82:{//r键,切换到旋转工具
				if(this.rKeyUp){
					this.rKeyUp=false;
					this.beforeTool=this.selectedTool;
					this.selectTool('rotate');
				};
			}break;
			case 72:{//h键,切换到抓手工具
				if(this.hKeyUp){
					this.hKeyUp=false;
					this.beforeTool=this.selectedTool;
					this.selectTool('hand');
				};
			}break;
			case 90:{//z键,切换到缩放工具
				if(this.zKeyUp){
					this.zKeyUp=false;
					this.beforeTool=this.selectedTool;
					this.selectTool('zoom');
				};
			}break;
			case 32:{//空格键阻止,临时切换到抓手功能
				if(this.spaceKeyUp){
					this.spaceKeyUp=false;
					if(this.selectedTool!='hand'){
						this.tempHand=true;
						this.changeCursor('hand');
					};
				};
			}break;
			case 18:{//alt键,在当前选择是缩放工具的时候，按下的时候切换到缩小功能
				if(this.altKeyUp){
					if((this.selectedTool!='zoom' && !this.tempZoom) || this.zoomOut)return;
					this.zoomOut=true;
					this.altKeyUp=false;
					this.changeCursor('zoom',true);
				};
			}break;
			case 17:{//ctrl键临时切换到缩放工具
				if(this.ctrlKeyUp){
					var self=this;
					this.ctrlkeyDownTimer=setTimeout(function(){//规避词典软件的ctrl+c，一瞬间切换到缩放的问题
						self.ctrlKeyUp=false;
						if(self.selectedTool!='zoom'){
							self.tempZoom=true;
							self.changeCursor('zoom');
						};
					},100);
				};
			}break;
			case 67:{//c键
				clearTimeout(this.ctrlkeyDownTimer);
			}break;
			case 27:{//ese关闭窗口
				if(prefs.imgWindow.close.escKey){
					this.remove();
				};
			}break;
			default:break;
		};
	},

	toolbarEventHandler:function(e){
		e.stopPropagation();
		var target=e.target;
		var toolMap=this.toolMap;
		for(var i in toolMap){
			if(toolMap.hasOwnProperty(i) && toolMap[i]==target){
				switch(e.type){
					case 'mousedown':{
						this.selectTool(i);
					}break;
					case 'dblclick':{
						this.dblclickCommand(i);
					}break;
					default:break;
				};
				break;
			};
		};
	},
	imgWindowEventHandler:function(e){
		e.stopPropagation();
		switch(e.type){
			case 'click':{//阻止opera的图片保存
				if(e.ctrlKey && e.target.nodeName=='IMG'){
					e.preventDefault();
				};
			}break;
			case 'mousedown':{
				if(!this.focused){//如果没有focus，先focus
					this.focus();
					this.keepScreenInside();
				};

				var target=e.target;
				if(e.button==2){//由于rotate时候的覆盖层问题，修复右键的图片菜单弹出
					if(target!=this.rotateOverlayer)return;
					var self=this;
					this.rotateOverlayer.style.display='none';
					var upHandler=function(){
						document.removeEventListener('mouseup',upHandler,true);
						setTimeout(function(){
							self.rotateOverlayer.style.display='block';
						},10);
					};
					document.addEventListener('mouseup',upHandler,true);
					return;
				};

				if(e.button!=0 || (target!=this.imgWindow && target!=this.img && target!=this.rotateOverlayer))return;
				e.preventDefault();
				var selectedTool=this.selectedTool;
				if(this.tempHand){
					this.move(e);
				}else if(this.tempZoom){
					this.zoom(e);
				}else if(selectedTool=='hand'){
					this.restoreBeforeTool=!this.hKeyUp;
					if(this.hKeyUp){
						this.move(e);
					}else{//鸟瞰视图
						this.aerialView(e);
					};
				}else if(selectedTool=='rotate'){
					var origin={//旋转原点
						x:e.clientX - 30,//稍微偏左一点。
						y:e.clientY ,
					};

					var rIS=this.rotateIndicator.style;
					rIS.display='block';
					rIS.top=origin.y + 'px';
					rIS.left=origin.x + 'px';

					this.restoreBeforeTool=!this.rKeyUp;
					this.rotate(origin);
				}else if(selectedTool=='zoom'){
					this.restoreBeforeTool=!this.zKeyUp;
					this.zoom(e);
				};
			}break;
			case 'wheel':{
				if(!this.focused)return;//如果没有focus
				if(e.deltaY===0)return;//非Y轴的滚动
				e.preventDefault();
				if(this.working)return;
				var oriZoomOut=this.zoomOut;
				this.zoomOut = !!(e.deltaY > 0);

				var ratio=this.getZoomRatio({
					x:e.clientX,
					y:e.clientY,
				});

				var level=this.getNextZoomLevel();

				this.zoom(level,ratio);
				this.zoomOut=oriZoomOut;
			}break;
			default:break;
		};
	},

	dblclickCommand:function(tool){
		var done;
		switch(tool){
			case 'hand':{//双击居中,并且适应屏幕
				this.zoom(1);
				this.fitToScreen();
				this.center(true,true);
				this.keepScreenInside();
			}break;
			case 'rotate':{//双击还原旋转
				if(this.rotatedRadians==0)return;
				done=true;
				this.rotate(0,true);
			}break;
			case 'zoom':{//双击还原缩放
				if(this.zoomLevel==1)return;
				done=true;
				this.zoom(1,{x:0,y:0});
			}break;
			default:break;
		};

		if((tool=='rotate' || tool=='zoom') && done){
			var scrolled=getScrolled();
			var imgWindow=this.imgWindow;
			var imgWinodowRect=imgWindow.getBoundingClientRect();
			var imgWindowStyle=imgWindow.style;
			if(imgWinodowRect.left<40){
				imgWindowStyle.left=40 + scrolled.x + 'px';
			};
			if(imgWinodowRect.top<-5){
				imgWindowStyle.top=-5 + scrolled.y +'px';
			};
			this.keepScreenInside();
		};

		},
	doFlipCommand:function(command){
		var map={
			fv:[/scaleY\([^)]*\)/i,' scaleY(-1) '],
			fh:[/scaleX\([^)]*\)/i,' scaleX(-1) '],
		};

		var iTransform=this.img.style[support.cssTransform];

		var toolClassList=this.toolMap[command].classList;

		if(map[command][0].test(iTransform)){
			iTransform=iTransform.replace(map[command][0],'');
			toolClassList.remove(this.selectedToolClass);
		}else{
			iTransform += map[command][1];
			toolClassList.add(this.selectedToolClass);
		};
		this.img.style[support.cssTransform]=iTransform;

	},
	selectTool:function(tool){
		var command=['fv','fh'];
		if(command.indexOf(tool)==-1){//工具选择
			if(this.selectedTool==tool)return;
			var selectedTool=this.selectedTool;
			this.selectedTool=tool;
			if(this.tempHand || this.tempZoom){//临时工具中。不变鼠标
				return;
			};

			this.rotateOverlayer.style.display=(tool=='rotate'? 'block' : 'none');//这个覆盖层是为了捕捉双击或者单击事件。

			if(selectedTool){
				this.toolMap[selectedTool].classList.remove(this.selectedToolClass);
			};
			this.toolMap[tool].classList.add(this.selectedToolClass);
			this.changeCursor(tool);
		}else{//命令
			this.doFlipCommand(tool);
		};
	},
	changeCursor:function(tool,zoomOut){
		if(tool=='zoom'){
			tool+=zoomOut? '-out' : '-in';
		};
		if(this.cursor==tool)return;
		this.cursor=tool;

		var cursor;

		switch(tool){
			case 'hand':{
				cursor=support.cssCursorValue.grab || 'pointer';
			}break;
			case 'handing':{
				cursor=support.cssCursorValue.grabbing || 'pointer';
			}break;
			case 'zoom-in':{
				cursor=support.cssCursorValue.zoomIn;
			}break;
			case 'zoom-out':{
				cursor=support.cssCursorValue.zoomOut;
			}break;
			case 'rotate':{
				cursor='progress';
			}break;
			case 'default':{
				cursor='';
			}break;
		};

		if(typeof cursor!='undefined'){
			this.imgWindow.style.cursor=cursor;
		};

	},

	remove:function(){
		if(this.removed)return;
		this.removed=true;
		this.blur(true);
		this.img.src= prefs.icons.brokenImg_small;//如果在加载中取消，图片也取消读取。

		this.imgWindow.parentNode.removeChild(this.imgWindow);

		//点击点击外部关闭的监听
		if(prefs.imgWindow.close.clickOutside.enabled){
			document.removeEventListener(prefs.imgWindow.close.clickOutside.trigger,this.clickOutside,true);
		};

		var index=ImgWindowC.all.indexOf(this);
		ImgWindowC.all.splice(index,1);

		//focus next
		if(ImgWindowC.all.length==0){
			if(ImgWindowC.overlayer){
				ImgWindowC.overlayer.style.display='none';
			};
		}else{
			var topmost=0;
			ImgWindowC.all.forEach(function(iwin){
				if(iwin.zIndex > topmost){
					topmost=iwin;
				};
			});
			if(topmost){
				topmost.focus();
			};
		};

	},

};
