// 载入动画
function LoadingAnimC(data,buttonType,waitImgLoad,openInTopWindow){
	this.args=arrayFn.slice.call(arguments,0);
	this.data=data;//data
	this.buttonType=buttonType;//点击的按钮类型
	this.openInTopWindow=openInTopWindow;//是否在顶层窗口打开，如果在frame里面的话
	this.waitImgLoad=waitImgLoad;//是否等待完全读取后打开
	this.init();
};

LoadingAnimC.all=[];

LoadingAnimC.prototype={
	init:function(){
		LoadingAnimC.all.push(this);
		this.addStyle();
		var container=document.createElement('span');

		container.className='pv-loading-container';
		this.loadingAnim=container;

		container.title='正在加载:' + this.data.src;
		container.innerHTML=
							'<span class="pv-loading-button pv-loading-retry" title="重试"></span>'+
							'<span class="pv-loading-button pv-loading-cancle" title="取消"></span>';

		document.body.appendChild(container);

		var self = this;
		container.addEventListener('click',function(e){
			var tcl=e.target.classList;
			if(tcl.contains('pv-loading-cancle')){
				self.imgReady.abort();
				self.remove();
			}else if(tcl.contains('pv-loading-retry')){
				self.remove();
				new LoadingAnimC(self.args[0],self.args[1],self.args[2],self.args[3]);
			};
		},true);

		this.setPosition();

		if (this.buttonType == 'current') {
			this.loadImg(this.data.imgSrc);
		} else {
			if (!this.data.xhr) {
				this.loadImg(this.data.src, this.data.srcs);
			} else {
				xhrLoad.load({
					url: this.data.src,
					xhr: this.data.xhr,
					cb: function(imgSrc, imgSrcs, caption) {
						if (imgSrc) {
							self.loadImg(imgSrc, imgSrcs);
						} else {
							self.error();
						}
					},
					onerror: function() {
						self.error();
					}
				});
			}
		}
	},
	addStyle:function(){
		if(LoadingAnimC.styleAdded)return;
		LoadingAnimC.styleAdded=true;
		var style=document.createElement('style');
		style.type='text/css';
		style.textContent='\
			.pv-loading-container {\
				position: absolute;\
				z-index:999999997;\
				background: black url("'+prefs.icons.loading+'") center no-repeat;\
				background-origin: content-box;\
				border: none;\
				padding: 1px 30px 1px 2px;\
				margin: 0;\
				opacity: 0.7;\
				height: 24px;\
				min-width: 24px;\
				box-shadow: 2px 2px 0px #666;\
				-webkit-transition: opacity 0.15s ease-in-out;\
				transition: opacity 0.15s ease-in-out;\
			}\
			.pv-loading-container:hover {\
				opacity: 0.9;\
			}\
			.pv-loading-button {\
				cursor: pointer;\
				height: 24px;\
				width: 24px;\
				position: absolute;\
				right: 0;\
				top: 0;\
				opacity: 0.4;\
				background:transparent center no-repeat;\
				-webkit-transition: opacity 0.15s ease-in-out;\
				transition: opacity 0.15s ease-in-out;\
			}\
			.pv-loading-button:hover {\
				opacity: 1;\
			}\
			.pv-loading-cancle{\
				background-image: url("'+prefs.icons.loadingCancle+'");\
			}\
			.pv-loading-retry{\
				display:none;\
				background-image: url("'+prefs.icons.retry+'");\
			}\
			.pv-loading-container_error{\
				background-image:none;\
			}\
			.pv-loading-container_error::after{\
				content:"加载失败";\
				line-height: 24px;\
				color: red;\
				font-size: 14px;\
				display:inline;\
			}\
			.pv-loading-container_error .pv-loading-cancle{\
				display:none;\
			}\
			.pv-loading-container_error .pv-loading-retry{\
				display:block;\
			}\
		';
		document.head.appendChild(style);
	},
	remove:function(){
		if(!this.removed){
			this.removed=true;
			this.loadingAnim.parentNode.removeChild(this.loadingAnim);
			LoadingAnimC.all.splice(LoadingAnimC.all.indexOf(this),1);
		};
	},
	error:function(img,e){
		this.loadingAnim.classList.add('pv-loading-container_error');
		console.debug('picviewer CE 载入大图错误：%o', this.data);

		var self=this;
		setTimeout(function(){
			self.remove();
		},3000);
	},
	setPosition:function(){
		var position=getContentClientRect(this.data.img);
		var cs=this.loadingAnim.style;
		var scrolled=getScrolled();
		cs.top=position.top + scrolled.y +1 + 'px';
		cs.left=position.left + scrolled.x +1 + 'px';
		cs.removeProperty('display');
	},

	// 根据 imgSrc 载入图片，imgSrcs 为备用图片地址，imgSrc 加载失败备用
	loadImg: function(imgSrc, imgSrcs) {
		var self = this;

		var img = document.createElement('img');
		img.src = imgSrc;

		var opts = {
			error: function(e) {
				if (Array.isArray(imgSrcs)) {
					var src = imgSrcs.shift();
					if (src) {
						self.loadImg(src, imgSrcs);
						return;
					}
				}

				self.error(this, e);
			},
		};

		opts[self.waitImgLoad ? 'load' : 'ready'] = function(e) {
			self.load(this, e);
		};

		self.imgReady = imgReady(img, opts);
	},

	load:function(img,e){
		this.remove();
		this.img=img;
		var buttonType=this.buttonType;

		if(buttonType=='gallery'){
			var allData=this.getAllValidImgs();
			allData.target=this.data;
			this.data=allData;
		};

		var self=this;
		function openInTop(){
			var data=self.data;

			//删除不能发送的项。
			var delCantClone=function(obj){
				delete obj.img;
				delete obj.imgPA;
			};

			if(Array.isArray(data)){
				frameSentSuccessData=frameSentData;
				frameSentData=cloneObject(data,true);//备份一次
				//console.log(frameSentData);

				delCantClone(data.target);
				data.forEach(function(obj){
					delCantClone(obj);
				});
			}else{
				delCantClone(data);
			};

			window.postMessage({
				messageID:messageID,
				src:img.src,
				data:data,
				command:'open',
				buttonType:buttonType,
				to:'top',
			},'*');
		};

		if(this.openInTopWindow && isFrame && topWindowValid!==false && buttonType!='magnifier'){
			if(topWindowValid){
				openInTop();
			}else{//先发消息问问顶层窗口是不是非frameset窗口
				window.postMessage({
					messageID:messageID,
					command:'topWindowValid',
					to:'top',
				},'*');

				document.addEventListener('pv-topWindowValid',function(e){
					topWindowValid=e.detail;
					if(topWindowValid){//如果顶层窗口有效
						openInTop()
					}else{
						self.open();
					};
				},true);
			};

		}else{
			this.open();
		};


	},
	getAllValidImgs:function(){
		var imgs=document.getElementsByTagName('img'), // html collection
			validImgs=[]
		;
		arrayFn.forEach.call(imgs,function(img,index,imgs){
			var result=findPic(img);
			if(result){
				validImgs.push(result);
			};
		});
		return validImgs;
	},
	open:function(){
		switch(this.buttonType){
			case 'gallery':{
				if(!gallery){
					gallery=new GalleryC();
				};
				gallery.load(this.data,this.from);
			}break;
			case 'magnifier':{
				new MagnifierC(this.img,this.data);
			}break;
			case 'actual':;
			case 'current':;
			case 'original':{//original 是为了兼容以前的规则
				new ImgWindowC(this.img, this.data);
			}break;
		};
	},
};
