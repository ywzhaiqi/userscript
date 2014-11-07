// 默认设置，请到设置界面修改
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

		// 按键，感觉用不太到，默认禁用
		keys: {
			enable: false,
			actual: 'a',  //  当出现悬浮条时按下 `a` 打开原图
			current: 'c',
			magnifier: 'm',
			gallery: 'g',
		},
	},

	magnifier:{//放大镜的设置.
		radius: 77,//默认半径.单位(像素).
		wheelZoom:{//滚轮缩放.
			enabled:true,
			pauseFirst:true,//需要暂停(单击暂停)后,才能缩放.(推荐,否则因为放大镜会跟着鼠标,如果放大镜过大,那么会影响滚动.)..
			range:[0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放的范围
		},
	},

	gallery:{//图库相关设定
		fitToScreen:true,//图片适应屏幕(适应方式为contain，非cover).
		sidebarPosition: 'bottom',//'top' 'right' 'bottom' 'left'  四个可能值
			sidebarSize: 120,//侧栏的高（如果是水平放置）或者宽（如果是垂直放置）
			sidebarToggle: true,  // 是否显示隐藏按钮
		transition:true,//大图片区的动画。
		preload:true,//对附近的图片进行预读。
		max:5,//最多预读多少张（前后各多少张）

		zoomresized: 25,  // 图片尺寸最少相差比例，单位：%
		scaleSmallSize: 200,  // 图库的新类别，缩放的图片，尺寸的高或宽都小于该值

		scrollEndAndLoad: false, // 滚动主窗口到最底部，然后自动重载库的图片。还有bug，有待进一步测试
		scrollEndAndLoad_num: 3,  // 最后几张图片执行

		autoZoom: true,  // 如果有放大，则把图片及 sidebar 部分的缩放改回 100%，增大可视面积（仅在 chrome 下有效）
		descriptionLength: 32,  // 注释的最大宽度
	},

	imgWindow:{// 图片窗相关设置
		fitToScreen: false,//适应屏幕,并且水平垂直居中(适应方式为contain，非cover).
		syncSelectedTool:true,//同步当前选择的工具，如果开了多个图片窗口，其中修改一个会反映到其他的上面。
		defaultTool:'hand',//"hand","rotate","zoom";打开窗口的时候默认选择的工具
		close:{//关闭的方式
			escKey:true,//按esc键
			dblClickImgWindow: true,//双击图片窗口
			clickOutside:'', // 点击图片外部关闭。值为''|'click'|'dblclick'；无或点击或双击
		},
		overlayer:{// 覆盖层.
			shown:false,//显示
			color:'rgba(0,0,0,0.8)',//颜色和不透明度设置.
		},
		shiftRotateStep:15,// 旋转的时候，按住shift键时,旋转的步进.单位:度.
		zoom:{//滚轮缩放
			range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放比例.(不要出现负数,谢谢-_-!~)
			mouseWheelZoom:true,//是否允许使用滚轮缩放。
		},
	},

	//等图片完全载入后,才开始执行弹出,放大等等操作,
	//按住ctrl键的时候,可以临时执行和这个设定相反的设定.
	waitImgLoad: false,

	//框架里面的图片在顶层窗口展示出来，但是当frame与顶层窗口domain不一样的时候，可能导致图片被反盗链拦截，
	//按住shift键，可以临时执行和这个设定相反的设定
	framesPicOpenInTopWindow:true,

	// lowLevel: true,  // 如果有多个图片，优先选择低一级的

	debug: false,
};
