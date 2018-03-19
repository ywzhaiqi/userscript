
//库
function GalleryC(){
	this.init();
};

var gallery;
var galleryMode;

GalleryC.prototype={
	init:function(){
		this.addStyle();
		var container=document.createElement('span');

		this.gallery=container;
		container.className='pv-gallery-container';
		container.tabIndex=1;//为了获取焦点，来截获键盘事件
		container.innerHTML=
			'<span class="pv-gallery-head">'+
				'<span class="pv-gallery-head-float-left">'+
					'<span title="图片信息" class="pv-gallery-head-left-img-info">'+
						'<span class="pv-gallery-head-left-img-info-resolution" title="分辨率">0 x 0</span>'+
						'<span class="pv-gallery-head-left-img-info-scaling" title="缩放比">（100%）</span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
						'<span class="pv-gallery-head-left-img-info-description" title="图片注释"></span>'+
					'</span>'+
				'</span>'+

				'<span title="点击退出收藏模式" class="pv-gallery-head-command pv-gallery-head-command-exit-collection">'+
					'<span>退出收藏</span>'+
					'<span class="pv-gallery-vertical-align-helper"></span>'+
				'</span>'+

				'<span title="弹出照片进行复杂操作" class="pv-gallery-head-command pv-gallery-head-command-operate">'+
					'<span>折腾</span>'+
					'<span class="pv-gallery-vertical-align-helper"></span>'+
				'</span>'+

				'<span class="pv-gallery-head-command-container">'+
					'<span class="pv-gallery-head-command pv-gallery-head-command-collect">'+
						'<span class="pv-gallery-head-command-collect-icon"></span>'+
						'<span class="pv-gallery-head-command-collect-text"></span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+
					'<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-collect">'+
						'<span title="给收藏的图片添加一些描述吧" class="pv-gallery-head-command-drop-list-item pv-gallery-head-command-drop-list-item-collect-description">'+
							'<span>描述：</span>'+
							'<textarea data-prefs="description" cols="25" rows="5"></textarea>'+
						'</span>'+
					'</span>'+
				'</span>'+

				'<span class="pv-gallery-head-command-container">'+
					'<span title="播放幻灯片" class="pv-gallery-head-command pv-gallery-head-command-slide-show">'+
						'<span class="pv-gallery-head-command_overlayer"></span>'+
						'<span class="pv-gallery-head-command-slide-show-button">'+
							'<span class="pv-gallery-head-command-slide-show-button-inner"></span>'+
							'<span class="pv-gallery-vertical-align-helper"></span>'+
						'</span>'+
						'<span class="pv-gallery-head-command-slide-show-countdown" title="倒计时"></span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+
					'<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-slide-show">'+
						'<span class="pv-gallery-head-command-drop-list-item" title="间隔时间，单位（秒）">'+
							'<input data-prefs="interval" step="1" min="1" type="number" value="5" />'+
							'<span>间隔(s)</span>'+
						'</span>'+
						'<span class="pv-gallery-head-command-drop-list-item"  title="从后往前播放">'+
							'<input id="pv-gallery-head-command-drop-list-item-slide-show-backward" data-prefs="backward" type="checkbox" />'+
							'<label for="pv-gallery-head-command-drop-list-item-slide-show-backward">后退　　　</label>'+
						'</span>'+
						'<span class="pv-gallery-head-command-drop-list-item"  title="从每张图片完全读取完成后才开始倒计时">'+
							'<input id="pv-gallery-head-command-drop-list-item-slide-show-wait" data-prefs="wait" type="checkbox" checked="checked" />'+
							'<label for="pv-gallery-head-command-drop-list-item-slide-show-wait">等待图片读取</label>'+
						'</span>'+
						'<span class="pv-gallery-head-command-drop-list-item"  title="快速跳过读取错误的图片">'+
							'<input id="pv-gallery-head-command-drop-list-item-slide-show-skipErrorImg" data-prefs="skipErrorImg" type="checkbox" checked="checked" />'+
							'<label for="pv-gallery-head-command-drop-list-item-slide-show-skipErrorImg">跳过错误图片</label>'+
						'</span>'+
					'</span>'+
				'</span>'+

				'<span class="pv-gallery-head-command-container">'+
					'<span title="选择图片类别" class="pv-gallery-head-command pv-gallery-head-command-category">'+
						'<span>类别</span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+
					'<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-category">'+
					'</span>'+
				'</span>'+

				'<span class="pv-gallery-head-command-container">'+
					'<span title="一些命令菜单" class="pv-gallery-head-command pv-gallery-head-command-others">'+
						'<span>命令</span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+
					'<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-others">'+
						'<span class="pv-gallery-head-command-drop-list-item" data-command="openInNewWindow" title="新窗口打开图片">新窗口打开</span>'+
						'<span class="pv-gallery-head-command-drop-list-item" data-command="scrollIntoView" title="滚动到当前图片所在的位置">定位到图片</span>'+
						'<span class="pv-gallery-head-command-drop-list-item" data-command="enterCollection" title="查看所有收藏的图片">查看收藏</span>'+
						'<span class="pv-gallery-head-command-drop-list-item" data-command="exportImages" title="导出所有图片的链接到新窗口">导出图片</span>'+
						'<span class="pv-gallery-head-command-drop-list-item" data-command="copyImages" title="复制所有大图的地址">复制图片</span>'+
						'<span class="pv-gallery-head-command-drop-list-item" title="最后几张图片时，滚动主窗口到最底部，然后自动加载新的图片">'+
							'<input type="checkbox"  data-command="scrollToEndAndReload"/>'+
							'<label data-command="scrollToEndAndReload">自动重载</label>'+
						'</span>'+
						'<span id="pv-gallery-fullscreenbtn" class="pv-gallery-head-command-drop-list-item" data-command="fullScreen">进入全屏</span>'+
						'<span class="pv-gallery-head-command-drop-list-item" data-command="openPrefs">设置</span>'+
					'</span>'+
				'</span>'+

				'<span class="pv-gallery-head-command-container">'+
					'<span title="分享" class="pv-gallery-head-command pv-gallery-head-command-share">'+
						'<span>分享</span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+
					'<span class="pv-gallery-head-command-drop-list pv-gallery-head-command-drop-list-share">'+
					'</span>'+
				'</span>'+

				'<span title="关闭库" class="pv-gallery-head-command pv-gallery-head-command-close">'+
				'</span>'+

			'</span>'+

			'<span class="pv-gallery-body">'+

				'<span class="pv-gallery-img-container">'+

					'<span class="pv-gallery-img-content">'+
						'<span class="pv-gallery-img-parent">'+
							'<img title="读取错误，点击重载" class="pv-gallery-img_broken" src="'+prefs.icons.brokenImg+'" />'+
						'</span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+

					'<span class="pv-gallery-img-controler pv-gallery-img-controler-pre"></span>'+
					'<span class="pv-gallery-img-controler pv-gallery-img-controler-next"></span>'+

					'<span class="pv-gallery-scrollbar-h pv-gallery-img-scrollbar-h">'+
						'<span class="pv-gallery-scrollbar-h-track pv-gallery-img-scrollbar-h-track">'+
							'<span class="pv-gallery-scrollbar-h-handle pv-gallery-img-scrollbar-h-handle"></span>'+
						'</span>'+
					'</span>'+

					'<span class="pv-gallery-scrollbar-v pv-gallery-img-scrollbar-v">'+
						'<span class="pv-gallery-scrollbar-v-track pv-gallery-img-scrollbar-v-track">'+
							'<span class="pv-gallery-scrollbar-v-handle pv-gallery-img-scrollbar-v-handle"></span>'+
						'</span>'+
					'</span>'+

					'<span class="pv-gallery-sidebar-toggle" title="开关侧边栏">'+
						'<span class="pv-gallery-sidebar-toggle-content"></span>'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
					'</span>'+

				'</span>'+

				'<span class="pv-gallery-sidebar-container" unselectable="on">'+
					'<span class="pv-gallery-vertical-align-helper"></span>'+
					'<span class="pv-gallery-sidebar-content" >'+

						'<span class="pv-gallery-sidebar-controler pv-gallery-sidebar-controler-pre"></span>'+
						'<span class="pv-gallery-sidebar-controler pv-gallery-sidebar-controler-next"></span>'+

						'<span class="pv-gallery-sidebar-thumbnails-container">'+
						'</span>'+

						'<span class="pv-gallery-scrollbar-h pv-gallery-thumb-scrollbar-h">'+
							'<span class="pv-gallery-scrollbar-h-track pv-gallery-thumb-scrollbar-h-track">'+
								'<span class="pv-gallery-scrollbar-h-handle pv-gallery-thumb-scrollbar-h-handle"></span>'+
							'</span>'+
						'</span>'+
						'<span class="pv-gallery-scrollbar-v pv-gallery-thumb-scrollbar-v">'+
							'<span class="pv-gallery-scrollbar-v-track pv-gallery-thumb-scrollbar-v-track">'+
								'<span class="pv-gallery-scrollbar-v-handle pv-gallery-thumb-scrollbar-v-handle"></span>'+
							'</span>'+
						'</span>'+

					'</span>'+
				'</span>'+

			'</span>';
		document.body.appendChild(container);

		var maximizeTrigger=document.createElement('span');
		this.maximizeTrigger=maximizeTrigger;
		maximizeTrigger.innerHTML='-回到库-<span class="pv-gallery-maximize-trigger-close" title="关闭库"></span>';
		maximizeTrigger.className='pv-gallery-maximize-trigger';

		document.body.appendChild(maximizeTrigger);


		var validPos=['top','right','bottom','left'];
		var sBarPosition=prefs.gallery.sidebarPosition;
		if(validPos.indexOf(sBarPosition)==-1){
			sBarPosition='bottom';
		};

		this.sBarPosition=sBarPosition;
		this.selectedClassName='pv-gallery-sidebar-thumb_selected-' + sBarPosition;


		var sBarDirection='v';//垂直放置
		var isHorizontal=false;
		if(sBarPosition=='top' || sBarPosition=='bottom'){
			sBarDirection='h';//水平放置
			isHorizontal=true;
		};
		this.sBarDirection=sBarDirection;
		this.isHorizontal=isHorizontal;

		var classPrefix='pv-gallery-';
		var validClass=[
			'head',

			'head-left-img-info',
			'head-left-img-info-description',
			'head-left-img-info-resolution',
			'head-left-img-info-scaling',

			'head-command-close',
			'head-command-operate',
			'head-command-slide-show',
			'head-command-slide-show-button-inner',
			'head-command-slide-show-countdown',
			'head-command-collect',
			'head-command-exit-collection',

			'head-command-drop-list-category',
			'head-command-drop-list-others',
			'head-command-drop-list-share',
			'head-command-drop-list-slide-show',
			'head-command-drop-list-collect',

			'body',

			'img-container',

			'img-scrollbar-h',
			'img-scrollbar-h-handle',
			'img-scrollbar-h-track',

			'img-scrollbar-v',
			'img-scrollbar-v-handle',
			'img-scrollbar-v-track',

			'thumb-scrollbar-h',
			'thumb-scrollbar-h-handle',
			'thumb-scrollbar-h-track',

			'thumb-scrollbar-v',
			'thumb-scrollbar-v-handle',
			'thumb-scrollbar-v-track',

			'img-content',
			'img-parent',
			'img_broken',

			'img-controler-pre',
			'img-controler-next',

			'sidebar-toggle',
			'sidebar-toggle-content',

			'sidebar-container',
			'sidebar-content',

			'sidebar-controler-pre',
			'sidebar-controler-next',

			'sidebar-thumbnails-container',
		];

		var eleMaps={};
		this.eleMaps=eleMaps;

		validClass.forEach(function(c){
			eleMaps[c]=container.querySelector('.'+ classPrefix + c);
		});

		var posClass=[//需要添加'top bottom left right'class的元素
			'img-container',
			'sidebar-toggle',
			'sidebar-container',
			'sidebar-thumbnails-container',
		];
		posClass.forEach(function(c){
			eleMaps[c].classList.add(classPrefix + c + '-' +sBarPosition);
		});

		var hvClass=[//需要添加'v h'class的元素
			'sidebar-toggle',
			'sidebar-toggle-content',
			'sidebar-container',
			'sidebar-content',
			'sidebar-controler-pre',
			'sidebar-controler-next',
			'sidebar-thumbnails-container',
		];
		hvClass.forEach(function(c){
			eleMaps[c].classList.add(classPrefix + c + '-' + sBarDirection);
		});



		//图片区域水平方向的滚动条
		var imgScrollbarH=new this.Scrollbar({
				bar:eleMaps['img-scrollbar-h'],
				handle:eleMaps['img-scrollbar-h-handle'],
				track:eleMaps['img-scrollbar-h-track'],
			},
			eleMaps['img-content'],
			true);
			this.imgScrollbarH=imgScrollbarH;

		//图片区域垂直方向的滚动条
		var imgScrollbarV=new this.Scrollbar({
				bar:eleMaps['img-scrollbar-v'],
				handle:eleMaps['img-scrollbar-v-handle'],
				track:eleMaps['img-scrollbar-v-track'],
			},
			eleMaps['img-content'],
			false);
		this.imgScrollbarV=imgScrollbarV;

		//缩略图区域的滚动条
		var thumbScrollbar;
		if(isHorizontal){
			thumbScrollbar=new this.Scrollbar({
				bar:eleMaps['thumb-scrollbar-h'],
				handle:eleMaps['thumb-scrollbar-h-handle'],
				track:eleMaps['thumb-scrollbar-h-track'],
			},
			eleMaps['sidebar-thumbnails-container'],
			true);
		}else{
			thumbScrollbar=new this.Scrollbar({
				bar:eleMaps['thumb-scrollbar-v'],
				handle:eleMaps['thumb-scrollbar-v-handle'],
				track:eleMaps['thumb-scrollbar-v-track'],
			},
			eleMaps['sidebar-thumbnails-container'],
			false);
		};
		this.thumbScrollbar=thumbScrollbar;

		var self=this;

		var imgStatistics={//图片的总类，统计,初始化值
			rule:{
				shown:true,
				count:0,
				description:'由高级规则匹配出来的',
				name:'高级规则',
			},
			tpRule:{
				shown:true,
				count:0,
				description:'由通配规则匹配出来的',
				name:'通配规则',
			},
			scale:{
				shown:true,
				count:0,
				description:'js自动查找，相对页面显示的图片有缩放过的',
				name:'缩放过的',
			},
			force:{
				shown:true,
				count:0,
				description:'js自动查找，无缩放过的，但是满足一定的大小',
				name:'无缩放过',
			},

			// new
			// scaleZoomResized: {
			// 	shown: false,
			// 	count: 0,
			// 	description: '缩放的图片，图片尺寸最少相差比例 ' + prefs.gallery.zoomresized + '%',
			// 	name: '小缩放'
			// },
			scaleSmall: {
				shown: true,
				count: 0,
				description: '缩放的图片，实际尺寸的高或宽都小于 ' + prefs.gallery.scaleSmallSize + ' 像素',
				name: '小尺寸'
			},
		};
		this.imgStatistics=imgStatistics;

		//生成分类下拉列表
		var typeMark='';
		var imgStatistics_i;
		for(var i in imgStatistics){
			if(!imgStatistics.hasOwnProperty(i))continue;
			imgStatistics_i=imgStatistics[i];
			typeMark+=
				'<span class="pv-gallery-head-command-drop-list-item" title="'+imgStatistics_i.description+'">'+
					'<input type="checkbox" data-type="'+i+'" id="pv-gallery-head-command-drop-list-item-category-'+i+'" />'+
					'<label for="pv-gallery-head-command-drop-list-item-category-'+i+'">'+imgStatistics_i.name+'</label>'+
				'</span>';
		};
		eleMaps['head-command-drop-list-category'].innerHTML=typeMark;


		//收藏相关
		var collection={
			getMatched:function(){
				return (this.all || this.get())._find(function(value,index){
					if(value.src==self.src){
						return true;
					};
				});
			},
			check:function(){
				//从缓存数据中检查。
				var matched=this.getMatched();
				this.favorite=matched? matched[0] : null;

				this.tAreaValue();
				this.highLight();
			},
			tAreaValue:function(){
				this.textArea.value=this.favorite? this.favorite.description : self.eleMaps['head-left-img-info-description'].textContent;
			},
			highLight:function(){
				eleMaps['head-command-collect'].classList[this.favorite? 'add' : 'remove']('pv-gallery-head-command-collect-favorite');
			},
			add:function(){
				this.favorite={
					src:self.src,
					thumbSrc:dataset(self.relatedThumb,'thumbSrc'),
					naturalSize:self.imgNaturalSize,
					description:this.textArea.value,
				};

				//为了防止多个页面同时的储存，添加前，先载入最新的数据。
				this.get();
				//检查是否已经在里面了
				var matched=this.getMatched();

				if(matched){//如果已经存在，删除旧的。
					this.all.splice(matched[1],1);
				};
				this.all.unshift(this.favorite);//添加到最前面。
				this.highLight();
				this.save();
			},
			remove:function(){
				//获得最新数据
				this.get();
				//检查是否已经在里面了
				var matched=this.getMatched();
				if(matched){
					this.all.splice(matched[1],1);
					this.save();
				};
				this.favorite=null;
				this.highLight();
			},
			save:function(){
				storage.setItem('pv_collection',encodeURIComponent(JSON.stringify(this.all)));
			},
			get:function(){
				var ret=storage.getItem('pv_collection') || '[]';
				try{
					ret=JSON.parse(decodeURIComponent(ret));
				}catch(e){
					ret=[];
				};
				this.all=ret;
				return ret;
			},
			enter:function(){

				if(this.all.length==0){
					alert('你还木有收藏任何图片');
					return;
				};

				this.mMode=true;
				var button=this.dropListButton;
				button.textContent='退出收藏查看';
				dataset(button,'command','exitCollection');
				this.headButton.style.display='inline-block';
				eleMaps['sidebar-thumbnails-container'].classList.add('pv-gallery-sidebar-thumbnails_hide-span');

				//生成dom
				var container=document.createElement('span');

				this.container=container;

				var data_i;
				var spanMark='';
				var i=0;
				while(data_i=this.all[i++]){
					 spanMark +=
					 '<span class="pv-gallery-sidebar-thumb-container" '+
						' data-natural-size="' + JSON.stringify(data_i.naturalSize).replace(/"/g,'&quot;') +
						'" data-src="' + data_i.src +
						'" data-thumb-src="' + data_i.thumbSrc +
						'">'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
						'<span class="pv-gallery-sidebar-thumb-loading" title="正在读取中......"></span>'+
					'</span>';
				};
				container.innerHTML=spanMark;
				eleMaps['sidebar-thumbnails-container'].appendChild(container);


				this.selected=self.selected;//备份

				self.select(container.children[0]);
				self.thumbScrollbar.reset();
				self.loadThumb();
			},
			exit:function(){
				if(!this.mMode)return;

				this.mMode=false;
				var button=this.dropListButton;
				button.textContent='查看所有收藏';
				dataset(button,'command','enterCollection');
				this.headButton.style.display='none';
				eleMaps['sidebar-thumbnails-container'].removeChild(this.container);
				eleMaps['sidebar-thumbnails-container'].classList.remove('pv-gallery-sidebar-thumbnails_hide-span');

				self.select(this.selected);
				self.thumbScrollbar.reset();
				self.loadThumb();
			},
			textArea:eleMaps['head-command-drop-list-collect'].querySelector('textarea'),
			dropListButton:eleMaps['head-command-drop-list-others'].querySelector('[data-command$="Collection"]'),
			headButton:eleMaps['head-command-exit-collection'],
		};

		this.collection=collection;

		eleMaps['head-command-drop-list-collect'].addEventListener('input',function(e){
			var target=e.target;
			if(!collection.favorite)return;
			collection.favorite[dataset(target,'prefs')]=target.value;
			clearTimeout(collection.saveTimer);
			collection.saveTimer=setTimeout(function(){
				collection.save();
			},500);
		},true);


		var slideShow={
			opts:{
				interval:5000,
				wait:true,
				backward:false,
				skipErrorImg:true,
				run:false,
			},
			//timing:
				//select(选中下一个图片后（缩略图栏选中了），还没开始读取大图（一般选中后，延时200ms开始读取大图）),
				//loadEnd(当前显示图片已经读取完成后),
				//click(点击按钮),
				//change(改变设置)
			run:function(timing){
				if(!this.opts.run)return;

				if(timing!='loadEnd'){
					this.stop();
				};

				if(timing=='click' || timing=='select'){
					if(!this.getEle()){//没有要切换到的图片了，停止
						this.exit();
						return;
					};
				};

				if(this.opts.skipErrorImg){
					if(self.imgError && !self.isLoading){//确保是当前图片和选中缩略图一致的时候
						self.select(this.getEle());
						return;
					};
				};


				if(this.opts.wait){
					if(timing!='select' && (timing=='loadEnd'  || (!self.isLoading && (self.img.complete || self.imgError)))){
						this.go();
					};
				}else{
					if(timing!='loadEnd'){
						this.go();
					};
				};

			},
			getEle:function(){
				return self.getThumSpan(this.opts.backward)
			},
			go:function(){
				this.stop();//停止上次的。
				var interval=this.opts.interval;
				var _self=this;
				this.timer=setTimeout(function(){
					_self.setCountdown(0);
					clearInterval(_self.countdownTimer);
					self.select(_self.getEle());
				},interval);

				var startTime=Date.now();
				this.countdownTimer=setInterval(function(){
					_self.setCountdown(interval - (Date.now()-startTime));
				},100);
			},
			stop:function(){
				this.setCountdown(this.opts.interval);
				clearTimeout(this.timer);
				clearInterval(this.countdownTimer);
			},
			exit:function(){
				this.opts.run=true;
				this.switchStatus();
				this.stop();
			},
			setCountdown:function(value){
				eleMaps['head-command-slide-show-countdown'].textContent=(value/1000).toFixed(2);
			},
			switchStatus:function(){
				this.opts.run=!this.opts.run;
				eleMaps['head-command-slide-show-button-inner'].classList[this.opts.run? 'add' : 'remove']('pv-gallery-head-command-slide-show-button-inner_stop');
			},
			check:function(){
				this.opts.run?  this.run('click') : this.stop();
			},
		};

		slideShow.setCountdown(slideShow.opts.interval);;
		this.slideShow=slideShow;

		//幻灯片播放下拉列表change事件的处理
		eleMaps['head-command-drop-list-slide-show'].addEventListener('change',function(e){
			var target=e.target;
			var value;
			var prefs=dataset(target,'prefs');
			if(target.type=='checkbox'){
				value=target.checked;
			}else{
				value=parseFloat(target.value);
				if(isNaN(value)){//无效
					value=slideShow.opts[prefs] / 1000;
				};
				value=value>0 ? value : 1;
				target.value=value;
				value *= 1000;
			};
			slideShow.opts[prefs]=value;
			slideShow.run('change');
			//console.log(slideShow.opts);
		},true);


		//分类下拉列表的点击发生change事件的处理
		eleMaps['head-command-drop-list-category'].addEventListener('change',function(e){
			var target=e.target;
			self.iStatisCopy[dataset(target,'type')].shown=target.checked;
			self.switchThumbVisible();//切换图片类别显隐;
		},true);


		//命令下拉列表的点击处理
		eleMaps['head-command-drop-list-others'].addEventListener('click',function(e){
			if(e.button!=0)return;//左键
			var target=e.target;
			var command=dataset(target,'command');
			if(!command)return;
			switch(command){
				case 'openInNewWindow':{
					window.open(self.src,'_blank');
				}break;
				case 'scrollIntoView':{
					if(collection.mMode){
						alert('收藏模式中，无法使用');
						return;
					};
					var relatedThumb=self.relatedThumb;
					var index=arrayFn.indexOf.call(self.imgSpans,relatedThumb);
					var targetImg=self.data[index].img;

					if(targetImg){
						if(!document.documentElement.contains(targetImg) || getComputedStyle(targetImg).display=='none'){//图片不存在文档中，或者隐藏了。
							alert('图片不在文档中，或者被隐藏了，无法定位！');
							return;
						};
						self.minimize();
						setTimeout(function(){
							self.navigateToImg(targetImg);
							flashEle(targetImg);
						},0);

					}else{//frame发送过来的时候删除了不能传送的图片

						document.addEventListener('pv-navigateToImg',function(e){
							//console.log('pv-navigateToImg',e);
							if(!e.detail){
								alert('图片不在文档中，或者被隐藏了，无法定位！');
								return;
							};
							self.minimize();
							setTimeout(function(){//将frame滚动到中间位置
								if(self.iframe){
									self.navigateToImg(self.iframe);
								};
							},0);
						},true);
						window.postMessage({//问问frame。。
							messageID:messageID,
							command:'navigateToImg',
							index:index,
							to:self.from,
						},'*');
					};

				}break;
				case 'exportImages':
					self.exportImages();
					break;
				case 'copyImages':
					self.copyImages(true);
					break;
				case 'scrollToEndAndReload':
					var checkbox = target.parentNode.firstChild;
					checkbox.checked = !checkbox.checked;

					prefs.gallery.scrollEndAndLoad = checkbox.checked;
					break;
				case 'fullScreen':
					if (target.classList.contains('fullscreenbtn')) {
						if (cancelFullScreen()) return;
						target.textContent = '进入全屏';
						target.classList.remove('fullscreenbtn');
						return;
					}

					if (launchFullScreen(document.documentElement)) return;
					target.classList.toggle('fullscreenbtn');
					target.textContent = '退出全屏';
					target.classList.add('fullscreenbtn');
					break;
				case 'openPrefs':
					openPrefs();
					break;
				case 'enterCollection':{
					//进入管理模式
					collection.enter();
				}break;
				case 'exitCollection':{
					//退出管理模式
					collection.exit();
				}break;
			};
		},true);

		// 监视全屏的变化
		function fullScreenChanged() {
			if (!document.fullscreenElement && // alternative standard method
				!document.mozFullScreenElement &&
				!document.webkitFullscreenElement &&
				!document.msFullscreenElement) {

				var btn = document.getElementById("pv-gallery-fullscreenbtn");
				if (btn) {
					btn.textContent = '进入全屏';
					btn.removeClass('fullscreenbtn');
				}
			}
		}
		document.addEventListener('webkitfullscreenchange', fullScreenChanged, false);
		document.addEventListener('mozfullscreenchange', fullScreenChanged, false);
		document.addEventListener('fullscreenchange', fullScreenChanged, false);

		//生成分享的下拉列表
		var shareMark='';
		var shareItem;
		for(var i in prefs.share){
			if(!prefs.share.hasOwnProperty(i))continue;
			shareItem=prefs.share[i];
			if(shareItem.disabled)continue;
			shareMark+=(
				'<span class="pv-gallery-head-command-drop-list-item" data-site="'+i+'" style="\
					background-image:url(\''+ shareItem.icon +'\');\
					background-position:4px center;\
					background-repeat:no-repeat;\
					padding-left:24px;">'+shareItem.name+'</span>');
		};

		eleMaps['head-command-drop-list-share'].innerHTML=shareMark;

		//分享下拉列表的点击处理
		eleMaps['head-command-drop-list-share'].addEventListener('click',function(e){
			if(e.button!=0)return;//左键
			var target=e.target;
			var site=dataset(target,'site');
			if(!site)return;
			var site_info=prefs.share[site];
			var param=site_info.api.call(self.img,{
				title:encodeURIComponent(document.title),
				pic:encodeURIComponent(self.src),
				url:encodeURIComponent(location.href),
			});
			if(!param)return;
			window.open(param.url,'_blank','height='+param.wSize.h+',width='+param.wSize.w+',left=30,top=30,location=no,status=no,toolbar=no,menubar=no,scrollbars=yes');
		},true);



		var loadThumbsTimer;
		eleMaps['sidebar-thumbnails-container'].addEventListener('scroll',function(e){//发生scroll事件时加载缩略图
			clearTimeout(loadThumbsTimer);//加个延时，在连续触发的时候缓一缓。
			loadThumbsTimer=setTimeout(function(){
				self.loadThumb();
			},200);
		},false);

		addWheelEvent(eleMaps['body'],function(e){//wheel事件
			if(e.deltaZ!=0)return;//z轴
			var target=e.target;
			e.preventDefault();
			if(eleMaps['sidebar-container'].contains(target)){//缩略图区滚动滚轮翻图片
				var distance=self.thumbSpanOuterSize;

				if(e.deltaY<0 || e.deltaX<0){//向上滚
					distance=-distance;
				};
				thumbScrollbar.scrollBy(distance)
			}else{//图片区域滚动
				var distance=100;
				if(e.deltaY!=0){//y轴
					if(self.img.classList.contains('pv-gallery-img_zoom-out')){//图片可以缩小时，滚动图片，否则切换图片。
						if(e.deltaY < 0){
							distance=-distance;
						};
						if(eleMaps['img-scrollbar-h'].contains(target)){//如果在横向滚动条上。
							imgScrollbarH.scrollBy(distance);
						}else{
							imgScrollbarV.scrollBy(distance);
						};
					}else{
						e.deltaY < 0 ? self.selectPrevious() : self.selectNext();
					};
				}else{//x轴
					if(e.deltaX < 0){
						distance=-distance;
					};
					imgScrollbarH.scrollBy(distance);
				};
			};
		},true);


		//focus,blur;
		addCusMouseEvent('mouseenter',container,function(){
			this.focus();
		});
		addCusMouseEvent('mouseleave',container,function(){
			this.blur();
		});

		//上下左右切换图片,空格键模拟滚动一页

		var validKeyCode=[38,39,40,37,32,9]//上右下左,32空格,tab禁止焦点切换。
		var keyDown;

		document.addEventListener('keydown',function(e){
			var keyCode=e.keyCode;
			var index=validKeyCode.indexOf(keyCode);
			if(index==-1)return;

			var target=e.target;

			if(!container.contains(target))return;//触发焦点不再gallery里面。
			e.preventDefault();

			if(keyCode==9)return;//tab键
			if(keyCode==32){//32空格，模拟滚动一页
				imgScrollbarV.scrollByPages(1);
				return;
			};

			if(keyDown)return;//已按下。
			keyDown=true;

			var stop;
			switch(index){
				case 0:;
				case 3:{
					self.selectPrevious();
					stop=self.simpleSlideShow(true);
				}break;
				case 1:;
				case 2:{
					self.selectNext();
					stop=self.simpleSlideShow();
				}break;
			};

			function keyUpHandler(e){
				if(e.keyCode!=validKeyCode[index])return;
				document.removeEventListener('keyup',keyUpHandler,false);
				keyDown=false;
				stop();
			};
			document.addEventListener('keyup',keyUpHandler,false);

		},true);


		var imgDraged;
		eleMaps['img-parent'].addEventListener('mousedown',function(e){//如果图片尺寸大于屏幕的时候按住图片进行拖移
			var target=e.target;
			if(e.button!=0 || target.nodeName!='IMG')return;
			var bigger=target.classList.contains('pv-gallery-img_zoom-out');//如果是大于屏幕

			var oClient={
				x:e.clientX,
				y:e.clientY,
			};

			var oScroll={
				left:self.imgScrollbarH.getScrolled(),
				top:self.imgScrollbarV.getScrolled(),
			};

			var moveFiredCount=0;
			var moveHandler=function(e){
				moveFiredCount++;
				if(moveFiredCount<2){//给个缓冲。。
					return;
				};
				imgDraged=true;
				if(bigger){
					target.style.cursor= support.cssCursorValue.grabbing || 'pointer';
					self.imgScrollbarV.scroll(oScroll.top-(e.clientY-oClient.y));
					self.imgScrollbarH.scroll(oScroll.left-(e.clientX-oClient.x));
				};
			};

			var upHandler=function(){
				target.style.cursor='';

				//拖曳之后阻止随后可能产生click事件产生的大小切换。
				//确保在随后的click事件发生后执行
				setTimeout(function(){
					imgDraged=false;
				},0);

				document.removeEventListener('mousemove',moveHandler,true);
				document.removeEventListener('mouseup',upHandler,true);
			};

			document.addEventListener('mousemove',moveHandler,true);
			document.addEventListener('mouseup',upHandler,true);
		},true);

		eleMaps['img-parent'].addEventListener('click',function(e){//点击图片本身就行图片缩放处理
			var target=e.target;
			if(e.button!=0 || target.nodeName!='IMG')return;

			if(imgDraged){//在拖动后触发的click事件，取消掉。免得一拖动完就立即进行的缩放。。。
				imgDraged=false;
				return;
			};

			if(target.classList.contains('pv-gallery-img_zoom-in')){//放大
				self.fitContains=false;
				var zoomX = typeof e.offsetX=='undefined' ? e.layerX : e.offsetX;
				var zoomY = typeof e.offsetY=='undefined' ? e.layerY : e.offsetY;
				var scaleX=zoomX/target.offsetWidth;
				var scaleY=zoomY/target.offsetHeight;
				self.fitToScreen({
					x:scaleX,
					y:scaleY,
				});
			}else if(target.classList.contains('pv-gallery-img_zoom-out')){
				self.fitContains=true;
				self.fitToScreen();
			};
		},true);


		container.addEventListener('mousedown',function(e){//鼠标按在导航上，切换图片
			if(e.button!=0)return;//左键
			var target=e.target;
			if(target.nodeName=='IMG')e.preventDefault();

			var matched=true;
			var stop;
			switch(target){
				case eleMaps['img-controler-pre']:;
				case eleMaps['sidebar-controler-pre']:{//上一个
					self.selectPrevious();
					stop=self.simpleSlideShow(true);
				}break;
				case eleMaps['img-controler-next']:;
				case eleMaps['sidebar-controler-next']:{//下一个
					self.selectNext();
					stop=self.simpleSlideShow();
				}break;
				default:{
					matched=false;
				}break;
			};

			function mouseUpHandler(e){
				document.removeEventListener('mouseup',mouseUpHandler,true);
				stop();
			};

			if(matched){
				e.preventDefault();
				document.addEventListener('mouseup',mouseUpHandler,true);
			};
		},false);

		eleMaps['sidebar-thumbnails-container'].addEventListener('click',function(e){//点击缩略图切换
			if(e.button!=0)return;//左键
			var target=e.target;
			var targetP;
			if(!dataset(target,'src') && (targetP=target.parentNode) && !dataset(targetP,'src'))return;

			self.select(targetP? targetP : target);
		},false);

		//点击读取错误的图片占位符重新读取
		eleMaps['img_broken'].addEventListener('click',function(e){
			if(self.isLoading){
				self.select(self.errorSpan);
			}else{
				self.getImg(self.errorSpan);
			};
		},false);


		eleMaps['head'].addEventListener('click',function(e){//顶栏上面的命令
			if(e.button!=0)return;
			var target=e.target;
			if(eleMaps['head-command-close']==target){
				self.close();
			}else if(eleMaps['head-command-operate'].contains(target)){
				imgReady(self.src,{
					ready:function(){
						new ImgWindowC(this);
					},
				});
			}else if(eleMaps['head-command-collect'].contains(target)){
				if(collection.favorite){
					collection.remove();
				}else{
					collection.add();
				};
			}else if(eleMaps['head-command-exit-collection'].contains(target)){
				collection.exit();
			}else if(eleMaps['head-command-slide-show'].contains(target)){
				slideShow.switchStatus();
				slideShow.check();
			};

		},false);


		//点击还原。
		maximizeTrigger.addEventListener('click',function(e){
			var target=e.target;
			this.style.display='none';
			if(target==this){
				self.show();
				self.resizeHandler();
			}else{
				self.minimized=false;
			};
		},true);


		this._resizeHandler=this.resizeHandler.bind(this);

		//插入动态生成的css数据。
		this.globalSSheet.insertRule('.pv-gallery-sidebar-thumb-container{'+
			((isHorizontal ? 'width' : 'height') + ':'  + (isHorizontal ?  getComputedStyle(eleMaps['sidebar-thumbnails-container']).height : getComputedStyle(eleMaps['sidebar-thumbnails-container']).width)) +
		'}',this.globalSSheet.cssRules.length);

		this.forceRepaintTimes=0;

		container.style.display='none';
		this.shown=false;

		// 我添加的部分
		this.initToggleBar();
		this.initZoom();
	},

	initToggleBar: function() {  // 是否显示切换 sidebar 按钮
		/**
		 * TODO：仿造下面的链接重新改造过？
		 * http://image.baidu.com/detail/newindex?col=%E8%B5%84%E8%AE%AF&tag=%E4%BD%93%E8%82%B2&pn=0&pid=5123662821688142478&aid=&user_id=10086&setid=-1&sort=0&newsPn=4&star=&fr=hotword&from=1
		 */
		if (prefs.gallery.sidebarToggle) {
			var toggleBar = this.eleMaps['sidebar-toggle'];
			toggleBar.style.display = 'block';
			toggleBar.style.height = '12px';
			toggleBar.addEventListener('click', this.showHideBottom.bind(this), false);

			// 顶部圆角
			switch (prefs.gallery.sidebarPosition) {
				case 'bottom':
					toggleBar.style.borderRadius = '8px 8px 0 0';  // 左上、右上、右下、左下
					break;
				case 'top':
					toggleBar.style.borderRadius = '0 0 8px 8px';
					break;
				case 'left':
					toggleBar.style.height = '60px';
					toggleBar.style.borderRadius = '0 8px 8px 0';
					break;
				case 'right':
					toggleBar.style.height = '60px';
					toggleBar.style.borderRadius = '8px 0 0 8px';
					break;
			}
		}
	},
	showHideBottom: function() {  // 显示隐藏 sidebar-container
		var sidebarContainer = this.eleMaps['sidebar-container'],
			isHidden = sidebarContainer.style.visibility == 'hidden';

		sidebarContainer.style.visibility = isHidden ? 'visible' : 'hidden';

		var sidebarPosition = prefs.gallery.sidebarPosition,
			capitalize = function(string) { // 将字符串中每个单词首字母大写
				var words = string.split(" ");
				for (var i = 0; i < words.length; i++) {
					words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
				}
				return words.join(" ");
			};

		// 修正下图片底部的高度
		this.eleMaps['img-container'].style['border' + capitalize(sidebarPosition)] = isHidden ?
				prefs.gallery.sidebarSize + 'px solid transparent' :
				'0';
		// 修正底部距离
		this.eleMaps['sidebar-toggle'].style[sidebarPosition] = isHidden ? '-5px' : '0';
	},
	initZoom: function() {  // 如果有放大，则把图片及 sidebar 部分缩放比率改为 1
		if (prefs.gallery.autoZoom && document.body.style.zoom != undefined) {
			var oZoom = detectZoom();
			if (oZoom > 100) {
				this.eleMaps['body'].style.zoom = 100 / oZoom;
			}
		}
	},

	getThumSpan:function(previous,relatedTarget){
		var ret;
		var rt = relatedTarget || this.selected;
		if(!rt)return;
		while((rt=previous ? rt.previousElementSibling : rt.nextElementSibling)){
			if(rt.clientWidth!=0){
				ret=rt;
				break;
			};
		};
		return ret;
	},
	selectPrevious:function(){
		this.select(this.getThumSpan(true));
	},
	selectNext:function(){
		this.select(this.getThumSpan());
	},
	select:function(ele,noTransition){
		if(!ele || this.selected==ele)return;
		if(this.selected){
			this.selected.classList.remove(this.selectedClassName);
			this.selected.classList.remove('pv-gallery-sidebar-thumb_selected');
		};
		ele.classList.add(this.selectedClassName);
		ele.classList.add('pv-gallery-sidebar-thumb_selected');

		this.selected=ele;
		this.arrowVisib();

		var self=this;
		clearTimeout(this.loadImgTimer);
		this.loadImgTimer=setTimeout(function(){//快速跳转的时候不要尝试读取图片。
			self.loadImg(ele);
		},200);

		this.selectedIntoView(noTransition);
		this.forceRepaint();
		this.slideShow.run('select');
	},
	loadThumb:function(){//读取可视范围里面的缩略图

		var self=this;

		var pro=this.isHorizontal ? ['scrollLeft','clientWidth','offsetLeft','offsetWidth'] : ['scrollTop','clientHeight','offsetTop','offsetHeight'];
		var thumbC=this.eleMaps['sidebar-thumbnails-container'];

		var scrolled=thumbC[pro[0]];

		var loadStopDis=scrolled + thumbC[pro[1]];

		var imgSpans=this.selected.parentNode.children;
		var span_i;
		var spanOffset;
		var thumb;

		var i=0
		while(span_i=imgSpans[i++]){
			if(span_i.clientWidth==0)continue;//隐藏的

			spanOffset=span_i[pro[2]];
			if(spanOffset + span_i[pro[3]] <= scrolled)continue;//在滚动条上面了
			if(spanOffset >= loadStopDis)break;//在滚动条下面了

			if(dataset(span_i,'thumbLoaded'))continue;//已经加载了缩略图

			thumb=document.createElement('img');
			thumb.src=dataset(span_i,'thumbSrc') || dataset(span_i,'src') || prefs.icons.brokenImg_small;
			thumb.className='pv-gallery-sidebar-thumb';

			dataset(span_i,'thumbLoaded','true');
			span_i.appendChild(thumb);

			imgReady(thumb,{
				error:function(e){
					this.src=prefs.icons.brokenImg_small;
				},
			});
		};

	},
	selectedIntoView:function(noTransition){
		var thumBC=this.eleMaps['sidebar-thumbnails-container'];
		var pro=this.isHorizontal ? ['offsetLeft','clientWidth','offsetWidth'] : ['offsetTop','clientHeight','offsetHeight'] ;
		//需要滚动的距离。
		var needScrollDis= this.selected[pro[0]];
		//尽可能的居中显示
		var thumBCClient=thumBC[pro[1]];
		var scrollCenter=Math.max((thumBCClient - this.selected[pro[2]])/2,0);

		this.thumbScrollbar.scroll(needScrollDis - scrollCenter,false,!noTransition);
	},
	getImg:function(ele){
		var self = this;

		var src = dataset(ele,'src');

		this.lastLoading=src;//记住最后读取的图片
		this.isLoading=true;//表示选择的图片正在读取

		// 特殊的 xhr 方式获取
		var xhr = dataset(ele, 'xhr');
		if (xhr) {
			var xhrError = function() {
				dataset(ele, 'xhr', '');
				dataset(ele, 'src', dataset(ele, 'thumb-src'));
				self.getImg(ele);
			};
			xhrLoad.load({
				url: src,
				xhr: JSON.parse(decodeURIComponent(xhr)),
				cb: function(imgSrc, imgSrcs, caption) {
					if (imgSrc) {
						dataset(ele, 'src', imgSrc);
						dataset(ele, 'xhr', '');
						self.getImg(ele);
					} else {
						xhrError();
					}
				},
				onerror: xhrError
			});
			return;
		}

		var allLoading=this.allLoading;
		if(allLoading.indexOf(src)!=-1){//在读取队列中。
			return;
		};
		allLoading.push(src);

		//上一个读取中的图片，不是当前显示的。那么直接终止
		var preImgR=this.imgReady;
		if(preImgR && this.img){
			if(preImgR.img.src!=this.src){
				preImgR.abort();
				preImgR.removeLI();
			};
		};


		//显示读取指示器。
		var loadingIndicator=ele.querySelector('.pv-gallery-sidebar-thumb-loading');
		loadingIndicator.style.display='block';


		this.imgReady=imgReady(src,{
			ready:function(){
				//从读取队列中删除自己
				var index=allLoading.indexOf(src);
				if(index!=-1){
					allLoading.splice(index,1);
				};

				if(src!=self.lastLoading)return;

				loadingIndicator.style.display='';
				if(preImgR)preImgR.abort();
				self.loadImg(this,ele);
			},
			loadEnd:function(e){//在loadend后开始预读。
				//从读取队列中删除自己
				var index=allLoading.indexOf(src);
				if(index!=-1){
					allLoading.splice(index,1);
				};

				if(src!=self.lastLoading)return;

				if(e.type=='error'){
					loadingIndicator.style.display='';
					self.errorSpan=ele;
					if(preImgR)preImgR.abort();
					self.loadImg(this,ele,true);
				};

				self.slideShow.run('loadEnd');

				//console.log(this,'预读开始');
				if(prefs.gallery.preload){
					if(self.preloading){//结束上次的预读。
						self.preloading.abort();
					};
					self.preloading=new self.Preload(ele,self);
					self.preloading.preload();
				};
			},
		});

		this.imgReady.removeLI=function(){
			loadingIndicator.style.display='';
		};

	},
	loadImg:function(img,relatedThumb,error){
		if(img.nodeName!='IMG'){//先读取。
			this.getImg(img);
			return;
		};

		if(this.img){
			this.img.style.display='none';
		};

		var imgNaturalSize={
			h:img.naturalHeight,
			w:img.naturalWidth,
		};
		this.imgNaturalSize=imgNaturalSize;

		this.eleMaps['head-left-img-info-resolution'].textContent= imgNaturalSize.w + ' x ' + imgNaturalSize.h;
		// 加上图片的注释
		var description = decodeURIComponent(dataset(relatedThumb, 'description')),
			defaultLength = prefs.gallery.descriptionLength;
		this.eleMaps['head-left-img-info-description'].title = description;
		this.eleMaps['head-left-img-info-description'].textContent= description.length > defaultLength ?
				description.slice(0, defaultLength) + '...' :
				description;

		this.img=img;
		this.src=img.src;
		this.isLoading=false;

		this.relatedThumb=relatedThumb;
		img.className='pv-gallery-img';

		if(error){
			this.imgError=true;
			this.img.style.display='none';
			this.eleMaps['img_broken'].style.display='inline-block';
		}else{
			this.imgError=false;
			this.eleMaps['img_broken'].style.display='';
			if(!dataset(relatedThumb,'naturalSize')){
				dataset(relatedThumb,'naturalSize',JSON.stringify(imgNaturalSize));
			};
		};

		function styled(){
			img.style.opacity=1;
			img.style[support.cssTransform]='scale(1)';
		};


		if(prefs.gallery.transition){
			setTimeout(styled,0);
		}else{
			styled();
		};

		this.eleMaps['img-parent'].appendChild(img);

		this.fitContains=prefs.gallery.fitToScreen;//适应屏幕

		this.fitToScreen({
			x:0,
			y:0,
		});

		this.collection.check();//检查是否在收藏里面。

	},
	fitToScreen:function(scale){

		var container=this.eleMaps['img-content'];
		var containerSize={
			h:container.clientHeight,
			w:container.clientWidth,
		};

		var img=this.img;

		img.classList.remove('pv-gallery-img_zoom-in');
		img.classList.remove('pv-gallery-img_zoom-out');

		var imgSty=img.style;
		imgSty.width='';
		imgSty.height='';

		var contentSSize={
			h:container.scrollHeight,
			w:container.scrollWidth,
		};
		var larger=contentSSize.h>containerSize.h || contentSSize.w>containerSize.w;

		var scaled='100%';

		if(this.fitContains){//适应屏幕
			this.imgScrollbarV.hide();
			this.imgScrollbarH.hide();
			if(larger){
				img.classList.add('pv-gallery-img_zoom-in');
				if(contentSSize.h/contentSSize.w >=containerSize.h/containerSize.w){
					var height=this.imgNaturalSize.h-(contentSSize.h - containerSize.h);
					imgSty.height=height + 'px';
					scaled=height/this.imgNaturalSize.h;
				}else{
					var width=this.imgNaturalSize.w-(contentSSize.w - containerSize.w);
					imgSty.width=width + 'px';
					scaled=width/this.imgNaturalSize.w;
				};
				scaled=(scaled*100).toFixed(2) + '%';
			};
		}else{//不做尺寸调整
			this.imgScrollbarV.reset();
			this.imgScrollbarH.reset();

			if(larger){
				img.classList.add('pv-gallery-img_zoom-out');
				if(scale){//通过鼠标点击进行的切换。
					this.imgScrollbarH.scroll(container.scrollWidth * scale.x - containerSize.w/2);
					this.imgScrollbarV.scroll(container.scrollHeight * scale.y - containerSize.h/2);
				};
			};
		};


		var imgScaledInfo=this.eleMaps['head-left-img-info-scaling'];
		imgScaledInfo.textContent='（'+scaled+'）';
		if(scaled!='100%'){
			imgScaledInfo.style.color='#E9CCCC';
		}else{
			imgScaledInfo.style.color='';
		};

	},

	_dataCache: {},
	_appendThumbSpans: function(data, index) {  // 添加缩略图栏的 spans
		var spanMark = '';
		var iStatisCopy = this.iStatisCopy;

		if (typeof index == 'undefined' && this.selected) {
			index = Array.prototype.slice.call(this.imgSpans).indexOf(this.selected);
		}

		(data || this.data).forEach(function(item) {
			iStatisCopy[item.type].count++;
			spanMark += '<span class="pv-gallery-sidebar-thumb-container' +
				'" data-type="' + item.type +
				'" data-src="' + item.src +
				(item.xhr ? '" data-xhr="' + encodeURIComponent(JSON.stringify(item.xhr)) : '') +
				'" data-description="' + encodeURIComponent(item.description || '') +
				'" data-thumb-src="' + item.imgSrc +
				'" title="' + item.img.title +
				'">' +
				'<span class="pv-gallery-vertical-align-helper"></span>' +
				'<span class="pv-gallery-sidebar-thumb-loading" title="正在读取中......"></span>' +
				'</span>';
		});

		var thumbnails = this.eleMaps['sidebar-thumbnails-container'];

		if (data) {  // 新的
			thumbnails.innerHTML += spanMark;
		} else {
			thumbnails.innerHTML = spanMark;

			this._dataCache = {};
		}

		// 如果是新的，则添加，否则重置并添加。
		var self = this;
		(data || this.data).forEach(function(d) {
			self._dataCache[d.imgSrc] = true;
		});

		//写入类别数据。
		var gallery = this.gallery;
		var input, label, iStatisCopy_i;

		for (var i in iStatisCopy) {
			if (!iStatisCopy.hasOwnProperty(i)) continue;
			iStatisCopy_i = iStatisCopy[i];
			input = gallery.querySelector('#pv-gallery-head-command-drop-list-item-category-' + i);
			input.checked = iStatisCopy_i.shown;
			if (iStatisCopy_i.count == 0) {
				input.disabled = true;
				input.parentNode.classList.add('pv-gallery-head-command-drop-list-item_disabled');
			} else {
				input.disabled = false;
				input.parentNode.classList.remove('pv-gallery-head-command-drop-list-item_disabled');
			};

			label = gallery.querySelector('label[for="pv-gallery-head-command-drop-list-item-category-' + i + '"]');
			label.textContent = label.textContent.replace(/（.*）/i, '') + '（' + iStatisCopy_i.count + '）';
		};

		this.imgSpans = thumbnails.children;

		this.thumbScrollbar.reset();

		this.select(this.imgSpans[index], true);
	},
	load:function(data, from, reload){
		if(this.shown || this.minimized){//只允许打开一个,请先关掉当前已经打开的库

			if(from){//frame发送过来的数据。
				window.postMessage({
					messageID:messageID,
					command:'sendFail',
					to:from,
				},'*');
			};

			if(this.minimized){
				alert('请先关掉当前已经打开的库');
				flashEle(this.maximizeTrigger);
			};
			return;
		};

		var self=this;
		if(from){//来自frame，获取这个frame所在的iframe标签。定位到图片的时候要用到。
			window.postMessage({
				messageID:messageID,
				command:'getIframeObject',
				windowId:from,
			},'*');
			document.addEventListener('pv-getIframeObject',function(e){
				self.iframe=e.detail;
			},true);
		};

		var unique=this.unique(data);
		data=unique.data;
		var index=unique.index;

		if (reload && this.data.length >= data.length) {
			// alert('没有新增的图片');
			return;
		}

		this.clear();//还原对象的一些修改，以便复用。
		this.show(reload);

		this.data=data;
		this.from=from;//如果来自frame，那么这个from应该保存了那个frame的窗口id，便于以后通信。

		this._appendThumbSpans(null, index);

		this.runOnce();

		this.switchThumbVisible();
	},
	clear:function(){
		this._dataCache = {};

		this.allLoading=[];//读取中的图片数组
		this.iStatisCopy=cloneObject(this.imgStatistics,true);//图片统计副本
		this.selected==null;
		if(this.img){
			this.img.style.display='none';
			this.img=null;
		};
		//读取错误的图片占位符
		this.eleMaps['img_broken'].style.display='';
		//清空dom
		this.eleMaps['sidebar-thumbnails-container'].innerHTML='';
		this.eleMaps['head-left-img-info-resolution'].textContent='0 x 0';
		this.eleMaps['head-left-img-info-scaling'].textContent='（100%）';
		//隐藏滚动条
		this.imgScrollbarV.hide();
		this.imgScrollbarH.hide();
		this.thumbScrollbar.hide();
		//重置style;
		this.thumbVisibleStyle.textContent='';
	},

	unique:function(data){
		var imgSrc=data.target.src;

		var data_i,
			data_i_src,
			dataSrcs=[];

		var index;

		for(var i=0,ii=data.length;i<ii;i++){
			data_i=data[i];
			data_i_src=data_i.src;
			if(dataSrcs.indexOf(data_i_src)!=-1){//已经存在
				data.splice(i,1);//移除
				i--;
				ii--;
				continue;
			};
			dataSrcs.push(data_i_src);

			if(imgSrc==data_i_src){
				index=i;
			};
		};

		if(typeof index =='undefined'){
			index=0;
			data.unshift(data.target);
		};

		delete data.target;

		return {
			data:data,
			index:index,
		};
	},
	show:function(reload){
		this.shown=true;
		galleryMode=true;

		if (!reload) {
			var des=document.documentElement.style;
			this.deOverflow={
				x:des.overflowX,
				y:des.overflowY,
			};
			des.overflow='hidden';
			this.gallery.style.display='';
			this.gallery.focus();
			window.addEventListener('resize',this._resizeHandler,true);
		}
	},
	close:function(reload){
		this.shown=false;
		this.minimized=false;

		if (!reload) {
			galleryMode=false;
			this.gallery.blur();
			this.gallery.style.display='none';
			var des=document.documentElement.style;
			des.overflowX=this.deOverflow.x;
			des.overflowY=this.deOverflow.y;
			this.slideShow.exit();
			this.collection.exit();
			window.removeEventListener('resize',this._resizeHandler,true);

			// 退出全屏
			var btn = document.getElementById('pv-gallery-fullscreenbtn');
			if (btn.classList.contains('fullscreenbtn')) {
				cancelFullScreen();
				btn.textContent = '进入全屏';
				btn.classList.remove('fullscreenbtn');
			}
		}
	},
	runOnce:function(){//运行一次来获取某些数据。
		var thumbSpanCS=getComputedStyle(this.selected);
		this.thumbSpanOuterSize=this.isHorizontal?
				this.selected.offsetWidth + parseFloat(thumbSpanCS.marginLeft) + parseFloat(thumbSpanCS.marginRight) :
				this.selected.offsetHeight + parseFloat(thumbSpanCS.marginTop) + parseFloat(thumbSpanCS.marginBottom);


		//console.log(this.thumbSpanOuterSize);

		this.runOnce=function(){
		};
	},

	minimize:function(){
		this.close();
		this.maximizeTrigger.style.display='block';
		this.minimized=true;
	},
	navigateToImg:function(targetImg){
		targetImg.scrollIntoView();//先调用原方法，可以让overflow hidden的滚动出来。

		//让图片近可能的居中
		var imgBCRect=getContentClientRect(targetImg);
		var wSize=getWindowSize();

		window.scrollBy(imgBCRect.left - (wSize.w - imgBCRect.width)/2,
			imgBCRect.top - (wSize.h - imgBCRect.height)/2);

	},
	switchThumbVisible:function(){
		var style=this.thumbVisibleStyle;
		var count=0;
		var styleText=[];
		var iStatisCopy=this.iStatisCopy;
		var iStatisCopy_i;

		for(var i in iStatisCopy){
			if(!iStatisCopy.hasOwnProperty(i))continue;
			iStatisCopy_i=iStatisCopy[i];
			if(iStatisCopy_i.shown){
				count+=iStatisCopy_i.count;
			}else{
				styleText.push('.pv-gallery-sidebar-thumb-container[data-type="'+i+'"]');
			};
		};

		//写入style;
		style.textContent=styleText.join(',') + '{\
			display:none !important;\
		}';

		//初始化缩略图区的滚动条
		this.thumbScrollbar.reset();
		this.arrowVisib();

		//载入缩略图
		this.loadThumb();
	},
	forceRepaint:function(){//解决opera的fixed元素，当滚动条不再最高处的时候，不重绘fixed元素的问题。
		clearTimeout(this.forceRepaintTimer);
		var self=this;
		this.forceRepaintTimer=setTimeout(function(){
			if(envir.opera){
				self.forceRepaintTimes % 2 ==0 ? window.scrollBy(0,1) : window.scrollBy(0,-1);
				self.forceRepaintTimes++;
			};
		},333);
	},
	resizeHandler:function(){//窗口变化时，调整一些东西。
		this.thumbScrollbar.reset();
		//this.selectedIntoView();
		this.fitToScreen();
		this.loadThumb();
	},
	_isLastSpan: function(span) {  // 用于判断是否自动重载，是否是最后几个图片
		if (this.selected.clientWidth == 0) return false;
		if (!span) return true;

		var index = Array.prototype.slice.call(this.imgSpans).indexOf(span);
		if (index != -1) {
			var total = this.imgSpans.length;
			if (total - index < prefs.gallery.scrollEndAndLoad_num) {
				return true;
			}
		}
	},
	arrowVisib:function(){//当当前选择元素的前面或者后面没有元素的时候隐藏控制箭头

		var icps=this.eleMaps['img-controler-pre'].style;
		var icns=this.eleMaps['img-controler-next'].style;
		var scps=this.eleMaps['sidebar-controler-pre'].style;
		var scns=this.eleMaps['sidebar-controler-next'].style;

		//下一张的箭头
		var nextSpan = this.getThumSpan();
		if (nextSpan) {
			icns.display='';
			scns.display='';
		}else{
			icns.display='none';
			scns.display='none';
		};

		// 最后几张图片，滚到底部添加新的图片
		if (prefs.gallery.scrollEndAndLoad && this._isLastSpan(nextSpan)) {
			this.scrollToEndAndReload();
		}

		//上一张的箭头
		if(this.getThumSpan(true)){
			icps.display='';
			scps.display='';
		}else{
			icps.display='none';
			scps.display='none';
		};
	},
	simpleSlideShow:function(backward,interval){
		clearInterval(this.slideShowInterval);//幻灯播放，只允许存在一个，否则得乱套

		var self=this;
		var slideShowInterval=setInterval(function(){
			var before=self.selected;
			backward ? self.selectPrevious() : self.selectNext();
			if(before == self.selected){//没有下一个元素了。。
				stop();
			};
		},(interval? interval : 800));

		this.slideShowInterval=slideShowInterval;

		function stop(){
			clearInterval(slideShowInterval);
		};

		return stop;
	},

	reload: function() {  // 重新加载所有图片到库里面
		// 函数在 LoadingAnimC 中
		var data = this.getAllValidImgs();
		// 设置当前选中的图片
		data.target = {
			src: this.selected.dataset.src
		};

		this.close(true);

		this.load(data, null, true);
	},
	reloadNew: function() {  // 加载新的图片到库里面
		var newer = true;
		var data = this.getAllValidImgs(newer);
		if (data.length) {
			this._appendThumbSpans(data);
		}
	},
	getAllValidImgs:function(newer){
		var validImgs = [];

		var imgs = document.getElementsByTagName('img'),
		    container = document.querySelector('.pv-gallery-container'),
		    preloadContainer = document.querySelector('.pv-gallery-preloaded-img-container');

		// 排除库里面的图片
		imgs = Array.prototype.slice.call(imgs).filter(function(img){
		    return !(container.contains(img) || preloadContainer.contains(img));
		});

		// 已经在图库里面的
		var self = this;
		imgs.forEach(function(img) {
		    if (newer && self._dataCache[img.src]) return;

		    var result = findPic(img);
		    if (result) {
		        validImgs.push(result);
		        self.data.push(result);
		    }

		    self._dataCache[img.src] = true;
		});

		return validImgs;
	},
	scrollToEndAndReload: function() {  // 滚动主窗口到最底部，然后自动重载库的图片

		window.scrollTo(0, 99999);

		var self = this;
		clearTimeout(self.reloadTimeout);
		self.reloadTimeout = setTimeout(function(){
			// self.reload();
			self.reloadNew();
		}, 1000);
	},
	exportImages: function () {  // 导出所有图片到新窗口
		var nodes = document.querySelectorAll('.pv-gallery-sidebar-thumb-container[data-src]');
		var arr = [].map.call(nodes, function(node){
			return '<div><img src=' + node.dataset.src + ' /></div>'
		});

		var title = document.title;

		var html = '\
			<head>\
				<title>' + title + ' 导出大图</title>\
				<style>\
					div { float: left; max-height: 180px; max-width: 320px; margin: 2px; }\
					img { max-height: 180px; max-width: 320px; }\
				</style>\
			</head>\
			<body>\
				<p>【图片标题】：' + title + '</p>\
				<p>【图片数量】：' + nodes.length + '</p>\
		';

		html += arr.join('\n') + '</body>'
		GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(html));
	},
	copyImages: function(isAlert) {
		var nodes = document.querySelectorAll('.pv-gallery-sidebar-thumb-container[data-src]');
		var urls = [].map.call(nodes, function(node){
			return node.dataset.src;
		});

		GM_setClipboard(urls.join('\n'));

		if (isAlert) {
			alert('已成功复制 ' + urls.length + ' 张大图地址');
		}
	},

	Preload:function(ele,oriThis){
		this.ele=ele;
		this.oriThis=oriThis;//主this
		this.init();
	},
	Scrollbar:function(scrollbar,container,isHorizontal){
		this.scrollbar=scrollbar;
		this.container=container;
		this.isHorizontal=isHorizontal
		this.init();
	},

	addStyle:function(){
		var style=document.createElement('style');
		style.type='text/css';
		style.textContent='\
			/*最外层容器*/\
			.pv-gallery-container {\
				position: fixed;\
				top: 0;\
				left: 0;\
				width: 100%;\
				height: 100%;\
				min-width:none;\
				min-height:none;\
				padding: 0;\
				margin: 0;\
				border: none;\
				z-index:2147483647;\
				background-color: transparent;\
			}\
			/*全局border-box*/\
			.pv-gallery-container span{\
				-moz-box-sizing: border-box;\
				box-sizing: border-box;\
				line-height: 1.6;\
			}\
			.pv-gallery-container * {\
				font-size: 14px;\
			}\
			/*点击还原的工具条*/\
			.pv-gallery-maximize-trigger{\
				position:fixed;\
				bottom:15px;\
				left:15px;\
				display:none;\
				background:#000;\
				opacity:0.6;\
				padding-left:10px;\
				font-size:16px;\
				line-height:0;\
				color:white;\
				cursor:pointer;\
				box-shadow:3px 3px 0 0 #333;\
				z-index:899999998;\
			}\
			.pv-gallery-maximize-trigger:hover{\
				opacity:0.9;\
			}\
			.pv-gallery-maximize-trigger-close{\
				display:inline-block;\
				padding-left:10px;\
				vertical-align:middle;\
				height:30px;\
				padding:10px 0;\
				width:24px;\
				background:url("'+prefs.icons.loadingCancle+'") center no-repeat;\
			}\
			.pv-gallery-maximize-trigger-close:hover{\
				background-color:#333;\
			}\
			/*顶栏*/\
			.pv-gallery-head {\
				position: absolute;\
				top: 0;\
				left: 0;\
				width: 100%;\
				height:30px;\
				z-index:1;\
				background-color:rgb(0,0,0);\
				border:none;\
				border-bottom:1px solid #333333;\
				text-align:right;\
				line-height:0;\
				font-size: 14px;\
				color:#757575;\
				padding-right:42px;\
			}\
			.pv-gallery-head > span{\
				vertical-align:middle;\
			}\
			/*顶栏左边*/\
			.pv-gallery-head-float-left{\
				float:left;\
				height:100%;\
				text-align:left;\
				padding-left:5px;\
			}\
			.pv-gallery-head-float-left > span{\
				display:inline-block;\
				height:100%;\
				vertical-align:middle;\
			}\
			.pv-gallery-head-float-left > span > *{\
				vertical-align:middle;\
			}\
			.pv-gallery-head-left-img-info{\
				cursor:help;\
			}\
			.pv-gallery-head-left-img-info-description {\
				margin-left: 10px;\
			}\
			/*顶栏里面的按钮样式-开始*/\
			.pv-gallery-head-command{\
				display:inline-block;\
				cursor:pointer;\
				height:100%;\
				padding:0 8px;\
				text-align:center;\
				position:relative;\
				z-index:1;\
				vertical-align:middle;\
				-o-user-select: none;\
				-ms-user-select: none;\
				-webkit-user-select: none;\
				-moz-user-select: -moz-none;\
				user-select: none;\
			}\
				/*辅助点击事件的生成，countdown*/\
			.pv-gallery-head-command_overlayer{\
				top:0;\
				left:0;\
				right:0;\
				bottom:0;\
				position:absolute;\
				opacity:0;\
			}\
			.pv-gallery-head-command > *{\
				vertical-align:middle;\
			}\
			.pv-gallery-head-command-close{\
				position:absolute;\
				top:0;\
				right:0;\
				width:40px;\
				border-left: 1px solid #333333;\
				background:transparent no-repeat center;\
				background-image:url("'+prefs.icons.loadingCancle+'");\
			}\
			.pv-gallery-head-command-slide-show-countdown{\
				font-size:0.8em;\
			}\
			.pv-gallery-head-command-slide-show-button{\
				border-radius:36px;\
				display:inline-block;\
				width:18px;\
				height:18px;\
				border:2px solid #757575;\
				margin-right:3px;\
				line-height:0;\
			}\
			.pv-gallery-head-command-slide-show-button-inner{\
				display:inline-block;\
				border:none;\
				border-top:4px solid transparent;\
				border-bottom:4px solid transparent;\
				border-left:8px solid #757575;\
				vertical-align:middle;\
			}\
			.pv-gallery-head-command-slide-show-button-inner_stop{\
				border-color:#757575;\
			}\
			.pv-gallery-head-command-collect-icon{\
				display:inline-block;\
				height:20px;\
				width:20px;\
				background:transparent url("' + prefs.icons.fivePointedStar + '") 0 0 no-repeat;\
			}\
			.pv-gallery-head-command-collect-icon ~ .pv-gallery-head-command-collect-text::after{\
				content:"收藏";\
			}\
			.pv-gallery-head-command-collect-favorite > .pv-gallery-head-command-collect-icon{\
				background-position:-40px 0 !important;\
			}\
			.pv-gallery-head-command-collect-favorite > .pv-gallery-head-command-collect-text::after{\
				content:"已收藏";\
			}\
			.pv-gallery-head-command-exit-collection{\
				color:#939300 !important;\
				display:none;\
			}\
			.pv-gallery-head-command:hover{\
				background-color:#272727;\
				color:#ccc;\
			}\
			/*droplist*/\
			.pv-gallery-head-command-drop-list{\
				position:absolute;\
				right:0;\
				display:none;\
				box-shadow:0 0 3px #808080;\
				background-color:#272727;\
				line-height: 1.6;\
				text-align:left;\
				padding:10px;\
				color:#ccc;\
				margin-top:-1px;\
			}\
			.pv-gallery-head-command-drop-list-item{\
				display:block;\
				padding:2px 5px;\
				cursor:pointer;\
				white-space:nowrap;\
			}\
			.pv-gallery-head-command-drop-list-item-collect-description{\
				cursor:default;\
			}\
			.pv-gallery-head-command-drop-list-item-collect-description > textarea{\
				resize:both;\
				width:auto;\
				height:auto;\
			}\
			.pv-gallery-head-command-drop-list-item_disabled{\
				color:#757575;\
			}\
			.pv-gallery-head-command-drop-list-item input + *{\
				padding-left:3px;\
			}\
			.pv-gallery-head-command-drop-list-item input[type=number]{\
				text-align:left;\
				max-width:50px;\
				height:20px;\
			}\
			.pv-gallery-head-command-drop-list-item > * {\
				vertical-align:middle;\
			}\
			.pv-gallery-head-command-drop-list-item label {\
				font-weight: normal;\
			}\
			.pv-gallery-head-command-drop-list-item:hover{\
				background-color:#404040;\
			}\
			/*container*/\
			.pv-gallery-head-command-container{\
				display:inline-block;\
				height:100%;\
				position:relative;\
			}\
			/* after伪类生成标识下拉菜单的三角图标*/\
			.pv-gallery-head-command-container > .pv-gallery-head-command::after{\
				content:"";\
				display:inline-block;\
				vertical-align:middle;\
				border:none;\
				border-top:7px solid #757575;\
				border-left:5px solid transparent;\
				border-right:5px solid transparent;\
				margin-left:5px;\
				-moz-transition:all 0.3s ease-in-out 0s;\
				-webkit-transition:all 0.3s ease-in-out 0s;\
				transition:all 0.3s ease-in-out 0s;\
			}\
			.pv-gallery-head-command-container:hover{\
				box-shadow:0 0 3px #808080;\
			}\
			.pv-gallery-head-command-container:hover > .pv-gallery-head-command{\
				background-color:#272727;\
				color:#ccc;\
			}\
			.pv-gallery-head-command-container:hover > .pv-gallery-head-command::after{\
				-webkit-transform:rotate(180deg);\
				-moz-transform:rotate(180deg);\
				transform:rotate(180deg);\
				border-top:7px solid #ccc;\
			}\
			.pv-gallery-head-command-container:hover .pv-gallery-head-command-collect-icon{\
				background-position:-20px 0;\
			}\
			.pv-gallery-head-command-container:hover .pv-gallery-head-command-slide-show-button{\
				border-color:#ccc;\
			}\
			.pv-gallery-head-command-container:hover .pv-gallery-head-command-slide-show-button-inner{\
				border-left-color:#ccc;\
			}\
			.pv-gallery-head-command-container:hover .pv-gallery-head-command-slide-show-button-inner_stop{\
				border-color:#ccc;\
			}\
			.pv-gallery-head-command-container:hover > .pv-gallery-head-command-drop-list{\
				display:block;\
			}\
			/*顶栏里面的按钮样式-结束*/\
			.pv-gallery-body {\
				display: block;\
				height: 100%;\
				width: 100%;\
				margin: 0;\
				padding: 0;\
				border: none;\
				border-top: 30px solid transparent;\
				position: relative;\
				background-clip: padding-box;\
				z-index:0;\
			}\
			.pv-gallery-img-container {\
				display: block;\
				padding: 0;\
				margin: 0;\
				border: none;\
				height: 100%;\
				width: 100%;\
				background-clip: padding-box;\
				background-color: rgba(20,20,20,0.96);\
				position:relative;\
			}\
			.pv-gallery-img-container-top {\
				border-top: '+ prefs.gallery.sidebarSize +'px solid transparent;\
			}\
			.pv-gallery-img-container-right {\
				border-right: '+ prefs.gallery.sidebarSize +'px solid transparent;\
			}\
			.pv-gallery-img-container-bottom {\
				border-bottom: '+ prefs.gallery.sidebarSize +'px solid transparent;\
			}\
			.pv-gallery-img-container-left {\
				border-left: '+ prefs.gallery.sidebarSize +'px solid transparent;\
			}\
			/*大图区域的切换控制按钮*/\
			.pv-gallery-img-controler{\
				position:absolute;\
				top:50%;\
				height:60px;\
				width:50px;\
				margin-top:-30px;\
				cursor:pointer;\
				opacity:0.3;\
				z-index:1;\
			}\
			.pv-gallery-img-controler-pre{\
				background:rgba(70,70,70,0.5) url("'+prefs.icons.arrowLeft+'") no-repeat center;\
				left:10px;\
			}\
			.pv-gallery-img-controler-next{\
				background:rgba(70,70,70,0.5) url("'+prefs.icons.arrowRight+'") no-repeat center;\
				right:10px;\
			}\
			.pv-gallery-img-controler:hover{\
				background-color:rgba(140,140,140,0.5);\
				opacity:0.9;\
				z-index:2;\
			}\
			/*滚动条样式--开始*/\
			.pv-gallery-scrollbar-h,\
			.pv-gallery-scrollbar-v{\
				display:none;\
				z-index:1;\
				opacity:0.3;\
				position:absolute;\
				margin:0;\
				padding:0;\
				border:none;\
			}\
			.pv-gallery-scrollbar-h{\
				bottom:10px;\
				left:0;\
				right:0;\
				height:10px;\
				margin:0 2px;\
			}\
			.pv-gallery-scrollbar-v{\
				top:0;\
				bottom:0;\
				right:10px;\
				width:10px;\
				margin:2px 0;\
			}\
			.pv-gallery-scrollbar-h:hover{\
				height:15px;\
			}\
			.pv-gallery-scrollbar-v:hover{\
				width:15px;\
			}\
			.pv-gallery-scrollbar-h:hover,\
			.pv-gallery-scrollbar-v:hover{\
				opacity:0.9;\
				z-index:2;\
			}\
			.pv-gallery-scrollbar-h-track,\
			.pv-gallery-scrollbar-v-track{\
				position:absolute;\
				top:0;\
				left:0;\
				right:0;\
				bottom:0;\
				background-color:rgba(100,100,100,1);\
				border:2px solid transparent;\
			}\
			.pv-gallery-scrollbar-h-handle,\
			.pv-gallery-scrollbar-v-handle{\
				position:absolute;\
				background-color:black;\
			}\
			.pv-gallery-scrollbar-h-handle{\
				height:100%;\
			}\
			.pv-gallery-scrollbar-v-handle{\
				width:100%;\
			}\
			.pv-gallery-scrollbar-h-handle:hover,\
			.pv-gallery-scrollbar-v-handle:hover{\
				background-color:#502121;\
			}\
			.pv-gallery-scrollbar-h-handle:active,\
			.pv-gallery-scrollbar-v-handle:active{\
				background-color:#391A1A;\
			}\
			/*滚动条样式--结束*/\
			.pv-gallery-img-content{\
				display:block;\
				width:100%;\
				height:100%;\
				overflow:hidden;\
				text-align:center;\
				padding:0;\
				border:none;\
				margin:0;\
				line-height:0;\
				font-size:0;\
				white-space:nowrap;\
			}\
			.pv-gallery-img-parent{\
				display:inline-block;\
				vertical-align:middle;\
				line-height:0;\
			}\
			.pv-gallery-img_broken{\
				display:none;\
				cursor:pointer;\
			}\
			.pv-gallery-img{\
				position:relative;\/*辅助e.layerX,layerY*/\
				display:inline-block;\
				vertical-align:middle;\
				width:auto;\
				height:auto;\
				padding:0;\
				border:5px solid #313131;\
				margin:10px;\
				opacity:0.6;\
				-webkit-transform:scale(0.9);\
				-moz-transform:scale(0.9);\
				transform:scale(0.9);\
				'+
				(prefs.gallery.transition ? ('\
				-webkit-transition: opacity 0.15s ease-in-out,\
					-webkit-transform 0.1s ease-in-out;\
				-moz-transition: opacity 0.15s ease-in-out,\
					-moz-transform 0.1s ease-in-out;\
				transition: opacity 0.15s ease-in-out,\
					transform 0.1s ease-in-out;\
				') : '') + '\
			}\
			.pv-gallery-img_zoom-out{\
				cursor:'+support.cssCursorValue.zoomOut+';\
			}\
			.pv-gallery-img_zoom-in{\
				cursor:'+support.cssCursorValue.zoomIn+';\
			}\
			.pv-gallery-sidebar-toggle{\
				position:absolute;\
				line-height:0;\
				text-align:center;\
				background-color:rgb(0,0,0);\
				color:#757575;\
				white-space:nowrap;\
				cursor:pointer;\
				z-index:1;\
				display:none;\
			}\
			.pv-gallery-sidebar-toggle:hover{\
				color:#ccc;\
			}\
			.pv-gallery-sidebar-toggle-h{\
				width:80px;\
				margin-left:-40px;\
				left:50%;\
			}\
			.pv-gallery-sidebar-toggle-v{\
				height:80px;\
				margin-top:-40px;\
				top:50%;\
			}\
			.pv-gallery-sidebar-toggle-top{\
				top:-5px;\
			}\
			.pv-gallery-sidebar-toggle-right{\
				right:-5px;\
			}\
			.pv-gallery-sidebar-toggle-bottom{\
				bottom:-5px;\
			}\
			.pv-gallery-sidebar-toggle-left{\
				left:-5px;\
			}\
			.pv-gallery-sidebar-toggle-content{\
				display:inline-block;\
				vertical-align:middle;\
				white-space:normal;\
				word-wrap:break-word;\
				overflow-wrap:break-word;\
				line-height:1.1;\
				font-size:12px;\
				text-align:center;\
				margin:2px;\
			}\
			.pv-gallery-sidebar-toggle-content-v{\
				width:1.1em;\
			}\
			/*侧边栏开始*/\
			.pv-gallery-sidebar-container {\
				position: absolute;\
				background-color:rgb(0,0,0);\
				padding:5px;\
				border:none;\
				margin:none;\
				text-align:center;\
				line-height:0;\
				white-space:nowrap;\
				-o-user-select: none;\
				-webkit-user-select: none;\
				-moz-user-select: -moz-none;\
				user-select: none;\
			}\
			.pv-gallery-sidebar-container-h {\
				height: '+ prefs.gallery.sidebarSize +'px;\
				width: 100%;\
			}\
			.pv-gallery-sidebar-container-v {\
				width: '+ prefs.gallery.sidebarSize +'px;\
				height: 100%;\
			}\
			.pv-gallery-sidebar-container-top {\
				top: 0;\
				left: 0;\
				border-bottom:1px solid #333333;\
			}\
			.pv-gallery-sidebar-container-right {\
				top: 0;\
				right: 0;\
				border-left:1px solid #333333;\
			}\
			.pv-gallery-sidebar-container-bottom {\
				bottom: 0;\
				left: 0;\
				border-top:1px solid #333333;\
			}\
			.pv-gallery-sidebar-container-left {\
				top: 0;\
				left: 0;\
				border-right:1px solid #333333;\
			}\
			.pv-gallery-sidebar-content {\
				display: inline-block;\
				margin: 0;\
				padding: 0;\
				border: none;\
				background-clip: padding-box;\
				vertical-align:middle;\
				position:relative;\
				text-align:left;\
			}\
			.pv-gallery-sidebar-content-h {\
				height: 100%;\
				width: 90%;\
				border-left: 40px solid transparent;\
				border-right: 40px solid transparent;\
			}\
			.pv-gallery-sidebar-content-v {\
				height: 90%;\
				width: 100%;\
				border-top: 40px solid transparent;\
				border-bottom: 40px solid transparent;\
			}\
			.pv-gallery-sidebar-controler{\
				cursor:pointer;\
				position:absolute;\
				background:rgba(255,255,255,0.1) no-repeat center;\
			}\
			.pv-gallery-sidebar-controler:hover{\
				background-color:rgba(255,255,255,0.3);\
			}\
			.pv-gallery-sidebar-controler-pre-h,\
			.pv-gallery-sidebar-controler-next-h{\
				top:0;\
				width:36px;\
				height:100%;\
			}\
			.pv-gallery-sidebar-controler-pre-v,\
			.pv-gallery-sidebar-controler-next-v{\
				left:0;\
				width:100%;\
				height:36px;\
			}\
			.pv-gallery-sidebar-controler-pre-h {\
				left: -40px;\
				background-image: url("'+prefs.icons.arrowLeft+'");\
			}\
			.pv-gallery-sidebar-controler-next-h {\
				right: -40px;\
				background-image: url("'+prefs.icons.arrowRight+'");\
			}\
			.pv-gallery-sidebar-controler-pre-v {\
				top: -40px;\
				background-image: url("'+prefs.icons.arrowTop+'");\
			}\
			.pv-gallery-sidebar-controler-next-v {\
				bottom: -40px;\
				background-image: url("'+prefs.icons.arrowBottom+'");\
			}\
			.pv-gallery-sidebar-thumbnails-container {\
				display: block;\
				overflow: hidden;\
				height: 100%;\
				width: 100%;\
				margin:0;\
				border:none;\
				padding:0;\
				line-height:0;\
				position:relative;\
			}\
			.pv-gallery-sidebar-thumbnails-container span{\
				vertical-align:middle;\
			}\
			.pv-gallery-sidebar-thumbnails-container-h{\
				border-left:1px solid #464646;\
				border-right:1px solid #464646;\
				white-space:nowrap;\
			}\
			.pv-gallery-sidebar-thumbnails-container-v{\
				border-top:1px solid #464646;\
				border-bottom:1px solid #464646;\
				white-space:normal;\
			}\
			.pv-gallery-sidebar-thumbnails-container-top {\
				padding-bottom:5px;\
			}\
			.pv-gallery-sidebar-thumbnails-container-right {\
				padding-left:5px;\
			}\
			.pv-gallery-sidebar-thumbnails-container-bottom {\
				padding-top:5px;\
			}\
			.pv-gallery-sidebar-thumbnails-container-left {\
				padding-right:5px;\
			}\
			.pv-gallery-sidebar-thumb-container {\
				display:inline-block;\
				text-align: center;\
				border:2px solid rgb(52,52,52);\
				cursor:pointer;\
				position:relative;\
				padding:2px;\
				font-size:0;\
				line-height:0;\
				white-space:nowrap;\
				vertical-align: middle;\
				top:0;\
				left:0;\
				-webkit-transition:all 0.2s ease-in-out;\
				transition:all 0.2s ease-in-out;\
			}\
			.pv-gallery-sidebar-thumbnails-container-h  .pv-gallery-sidebar-thumb-container {\
				margin:0 2px;\
				height:100%;\
			}\
			.pv-gallery-sidebar-thumbnails-container-v  .pv-gallery-sidebar-thumb-container {\
				margin:2px 0;\
				width:100%;\
			}\
			.pv-gallery-sidebar-thumbnails_hide-span > .pv-gallery-sidebar-thumb-container {\
				display:none;\
			}\
			.pv-gallery-sidebar-thumb-container:hover {\
				border:2px solid rgb(57,149,211);\
			}\
			.pv-gallery-sidebar-thumb_selected {\
				border:2px solid rgb(229,59,62);\
			}\
			.pv-gallery-sidebar-thumb_selected-top {\
				top:5px;\
			}\
			.pv-gallery-sidebar-thumb_selected-right {\
				left:-5px;\
			}\
			.pv-gallery-sidebar-thumb_selected-bottom {\
				top:-5px;\
			}\
			.pv-gallery-sidebar-thumb_selected-left {\
				left:5px;\
			}\
			.pv-gallery-sidebar-thumb-loading{\
				position:absolute;\
				top:0;\
				left:0;\
				text-align:center;\
				width:100%;\
				height:100%;\
				display:none;\
				opacity:0.6;\
				background:black url("'+ prefs.icons.loading + '") no-repeat center ;\
			}\
			.pv-gallery-sidebar-thumb-loading:hover{\
				opacity:0.8;\
			}\
			.pv-gallery-sidebar-thumb {\
				display: inline-block;\
				vertical-align: middle;\
				max-width: 100% !important;\
				max-height: 100% !important;\
				height: auto !important;\
				width: auto !important;\
			}\
			.pv-gallery-vertical-align-helper{\
				display:inline-block;\
				vertical-align:middle;\
				width:0;\
				height:100%;\
				margin:0;\
				border:0;\
				padding:0;\
				visibility:hidden;\
				white-space:nowrap;\
				background-color:red;\
			}\
		';
		var head=document.head;
		head.appendChild(style);
		this.globalSSheet=style.sheet;

		var style2=document.createElement('style');
		this.thumbVisibleStyle=style2;
		style2.type='text/css';
		head.appendChild(style2);

		// 让 description 的文字内容溢出用点点点(...)省略号表示
		// .pv-gallery-head-left-img-info-description {
		//   	overflow: hidden;
		//     text-overflow: ellipsis;
		//     white-space: nowrap;
		//     width: 27em;
		// }
	},

};


GalleryC.prototype.Preload.prototype={//预读对象
	init:function(){
		if(!this.container){//预读的图片都仍里面
			var div=document.createElement('div');
			div.className='pv-gallery-preloaded-img-container';
			div.style.display='none';
			document.body.appendChild(div);
			GalleryC.prototype.Preload.prototype.container=div;
		};
		this.max=prefs.gallery.max;
		this.nextNumber=0;
		this.nextEle=this.ele;
		this.preNumber=0;
		this.preEle=this.ele;
		this.direction='pre';
	},
	preload:function(){
		var ele=this.getPreloadEle();
		if(!ele){
			//console.log('预读正常结束');
			return;
		};

		//console.log('正在预读：',ele);
		var self=this;
		this.imgReady=imgReady(dataset(ele,'src'),{
			loadEnd:function(){
				if(self.aborted){
					//console.log('强制终止了');
					return;
				};
				dataset(ele,'preloaded','true')
				self.container.appendChild(this);
				self.preload();
			},
			time:60 * 1000,//限时一分钟，否则强制结束并开始预读下一张。
		});
	},
	getPreloadEle:function(){
		if((this.max<=this.nextNumber && this.max<=this.preNumber) || (!this.nextEle && !this.preEle)){
			return;
		};
		var ele=this.direction=='pre'?  this.getNext() : this.getPrevious();
		if(ele && !dataset(ele,'preloaded')){
			return ele;
		}else{
			return this.getPreloadEle();
		};
	},
	getNext:function(){
		this.nextNumber++;
		this.direction='next';
		if(!this.nextEle)return;
		return (this.nextEle = this.oriThis.getThumSpan(false,this.nextEle));
	},
	getPrevious:function(){
		this.preNumber++;
		this.direction='pre';
		if(!this.preEle)return;
		return (this.preEle = this.oriThis.getThumSpan(true,this.preEle));
	},
	abort:function(){
		this.aborted=true;
		if(this.imgReady){
			this.imgReady.abort();
		};
	},
};


GalleryC.prototype.Scrollbar.prototype={//滚动条对象
	init:function(){
		var bar=this.scrollbar.bar;
		this.shown=bar.offsetWidth!=0;
		var self=this;
		bar.addEventListener('mousedown',function(e){//点击滚动条区域，该干点什么！
			e.preventDefault();
			var target=e.target;
			var handle=self.scrollbar.handle;
			var track=self.scrollbar.track;
			switch(target){
				case handle:{//手柄；功能，拖动手柄来滚动窗口
					var pro=self.isHorizontal ? ['left','clientX'] : ['top','clientY'];
					var oHOffset=parseFloat(handle.style[pro[0]]);
					var oClient=e[pro[1]];

					var moveHandler=function(e){
						self.scroll(oHOffset + e[pro[1]] - oClient,true);
					};
					var upHandler=function(){
						document.removeEventListener('mousemove',moveHandler,true);
						document.removeEventListener('mouseup',upHandler,true);
					};
					document.addEventListener('mousemove',moveHandler,true);
					document.addEventListener('mouseup',upHandler,true);
				}break;
				case track:{//轨道；功能，按住不放来连续滚动一个页面的距离
					var pro=self.isHorizontal ? ['left','offsetX','layerX','clientWidth','offsetWidth'] : ['top' , 'offsetY' ,'layerY','clientHeight','offsetHeight'];
					var clickOffset=typeof e[pro[1]]=='undefined' ?  e[pro[2]] : e[pro[1]];
					var handleOffset=parseFloat(handle.style[pro[0]]);
					var handleSize=handle[pro[4]];
					var under= clickOffset > handleOffset ;//点击在滚动手柄的下方
					var containerSize=self.container[pro[3]];

					var scroll=function(){
						self.scrollBy(under?  (containerSize - 10) : (-containerSize + 10));//滚动一个页面距离少一点
					};
					scroll();

					var checkStop=function(){//当手柄到达点击位置时停止
						var handleOffset=parseFloat(handle.style[pro[0]]);
						if(clickOffset >= handleOffset && clickOffset <= (handleOffset + handleSize)){
							clearTimeout(scrollTimeout);
							clearInterval(scrollInterval);
						};
					};


					var scrollInterval;
					var scrollTimeout=setTimeout(function(){
						scroll();
						scrollInterval=setInterval(function(){
							scroll();
							checkStop();
						},120);
						checkStop();
					},300);


					checkStop();

					var upHandler=function(){
						clearTimeout(scrollTimeout);
						clearInterval(scrollInterval);
						document.removeEventListener('mouseup',upHandler,true);
					};
					document.addEventListener('mouseup',upHandler,true);
				}break;
			};

		},true);
	},
	reset:function(){//判断滚动条该显示还是隐藏

		var pro=this.isHorizontal ? ['scrollWidth','clientWidth','width'] : ['scrollHeight','clientHeight','height'];

		//如果内容大于容器的content区域

		var scrollSize=this.container[pro[0]];
		var clientSize=this.container[pro[1]];
		var scrollMax=scrollSize - clientSize;
		this.scrollMax=scrollMax;
		if(scrollMax>0){
			this.show();
			var trackSize=this.scrollbar.track[pro[1]];
			this.trackSize=trackSize;
			var handleSize=Math.floor((clientSize/scrollSize) * trackSize);
			handleSize=Math.max(20,handleSize);//限制手柄的最小大小;
			this.handleSize=handleSize;
			this.one=(trackSize-handleSize) / scrollMax;//一个像素对应的滚动条长度
			this.scrollbar.handle.style[pro[2]]= handleSize + 'px';
			this.scroll(this.getScrolled());
		}else{
			this.hide();
		};
	},
	show:function(){
		if(this.shown)return;
		this.shown=true;
		this.scrollbar.bar.style.display='block';
	},
	hide:function(){
		if(!this.shown)return;
		this.shown=false;
		this.scrollbar.bar.style.display='none';
	},
	scrollBy:function(distance,handleDistance){
		this.scroll(this.getScrolled() + (handleDistance?  distance / this.one :  distance));
	},
	scrollByPages:function(num){
		this.scroll(this.getScrolled() + (this.container[(this.isHorizontal ? 'clientWidth' : 'clientHeight')] - 10) * num);
	},
	scroll:function(distance,handleDistance,transition){
		if(!this.shown)return;

		//滚动实际滚动条
		var _distance=distance;
		_distance=handleDistance?  distance / this.one :  distance;
		_distance=Math.max(0,_distance);
		_distance=Math.min(_distance,this.scrollMax);


		var pro=this.isHorizontal? ['left','scrollLeft'] : ['top','scrollTop'];


		//滚动虚拟滚动条
		//根据比例转换为滚动条上应该滚动的距离。
		distance=handleDistance? distance : this.one * distance;
		//处理非法值
		distance=Math.max(0,distance);//如果值小于0那么取0
		distance=Math.min(distance,this.trackSize - this.handleSize);//大于极限值，取极限值

		var shs=this.scrollbar.handle.style;
		var container=this.container;
		if(transition){
			clearInterval(this.transitionInterval);

			var start=0;
			var duration=10;

			var cStart=this.getScrolled();
			var cChange=_distance-cStart;
			var sStart=parseFloat(shs[pro[0]]);
			var sChange=distance-sStart;

			var transitionInterval=setInterval(function(){
				var cEnd=Tween.Cubic.easeInOut(start,cStart,cChange,duration);
				var sEnd=Tween.Cubic.easeInOut(start,sStart,sChange,duration);

				container[pro[1]]=cEnd;
				shs[pro[0]]=sEnd + 'px';

				start++;
				if(start>=duration){
					clearInterval(transitionInterval);
				};
			},35);

			this.transitionInterval=transitionInterval;

			return;
		};

		shs[pro[0]]=distance + 'px';
		container[pro[1]]=_distance;
	},
	getScrolled:function(){
		return  this.container[(this.isHorizontal ? 'scrollLeft' : 'scrollTop')];
	},
};
