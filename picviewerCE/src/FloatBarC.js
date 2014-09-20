
        //工具栏
        function FloatBarC(){
            this.init();
        };


        FloatBarC.prototype={
            init:function(){
                this.addStyle();
                var container=document.createElement('span');
                container.id='pv-float-bar-container';
                container.innerHTML=
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>'+
                    '<span class="pv-float-bar-button"></span>';
                document.body.appendChild(container);

                var buttons={
                };
                this.buttons=buttons;
                this.children=container.children;

                arrayFn.forEach.call(this.children,function(child,index){
                    var titleMap={
                        actual:'查看原始',
                        gallery:'查看库',
                        current:'查看当前',
                        magnifier:'放大镜',
                    };
                    var buttonName=prefs.floatBar.butonOrder[index];
                    buttons[buttonName]=child;
                    child.title=titleMap[buttonName];
                    child.classList.add('pv-float-bar-button-' + buttonName);
                });


                this.floatBar=container;


                var self=this;
                container.addEventListener('click',function(e){
                    var buttonType;
                    var target=e.target;
                    for(var type in buttons){
                        if(!buttons.hasOwnProperty(type))return;
                        if(target==buttons[type]){
                            buttonType=type;
                            break;
                        };
                    };
                    if(!buttonType)return;

                    self.hide();
                    self.open(e,buttonType);

                },true);


                addCusMouseEvent('mouseleave',container,function(e){
                    clearTimeout(self.hideTimer);
                    self.hideTimer=setTimeout(function(){
                        self.hide();
                    },prefs.floatBar.hideDelay);
                });

                addCusMouseEvent('mouseenter',container,function(e){
                    clearTimeout(self.hideTimer);
                });

                this._scrollHandler=this.scrollHandler.bind(this);
            },
            addStyle:function(){
                var style=document.createElement('style');
                style.type='text/css';
                style.textContent='\
                    #pv-float-bar-container {\
                        position: absolute;\
                        z-index:999999998;\
                        padding: 5px;\
                        margin: 0;\
                        border: none;\
                        opacity: 0.6;\
                        line-height: 0;\
                        -webkit-transition: opacity 0.2s ease-in-out;\
                        transition: opacity 0.2s ease-in-out;\
                        display:none;\
                    }\
                    #pv-float-bar-container:hover {\
                        opacity: 1;\
                    }\
                    .pv-float-bar-button {\
                        vertical-align:middle;\
                        cursor: pointer;\
                        width: 18px;\
                        height: 18px;\
                        padding: 0;\
                        margin:0;\
                        border: none;\
                        display: inline-block;\
                        position: relative;\
                        box-shadow: 1px 0 3px 0px rgba(0,0,0,0.9);\
                        background: transparent center no-repeat;\
                        background-size:100% 100%;\
                        background-origin: content-box;\
                        -webkit-transition: margin-right 0.15s ease-in-out ,  width 0.15s ease-in-out ,  height 0.15s ease-in-out ;\
                        transition: margin-right 0.15s ease-in-out ,  width 0.15s ease-in-out ,  height 0.15s ease-in-out ;\
                    }\
                    .pv-float-bar-button:not(:last-child){\
                        margin-right: -14px;\
                    }\
                    .pv-float-bar-button:first-child {\
                        z-index: 4;\
                    }\
                    .pv-float-bar-button:nth-child(2) {\
                        z-index: 3;\
                    }\
                    .pv-float-bar-button:nth-child(3) {\
                        z-index: 2;\
                    }\
                    .pv-float-bar-button:last-child {\
                        z-index: 1;\
                    }\
                    #pv-float-bar-container:hover > .pv-float-bar-button {\
                        width: 24px;\
                        height: 24px;\
                    }\
                    #pv-float-bar-container:hover > .pv-float-bar-button:not(:last-child) {\
                        margin-right: 4px;\
                    }\
                    .pv-float-bar-button-actual {\
                        background-image:url("'+ prefs.icons.actual +'");\
                    }\
                    .pv-float-bar-button-gallery {\
                        background-image:url("'+ prefs.icons.gallery +'");\
                    }\
                    .pv-float-bar-button-current {\
                        background-image:url("'+ prefs.icons.current +'");\
                    }\
                    .pv-float-bar-button-magnifier {\
                        background-image:url("'+ prefs.icons.magnifier +'");\
                    }\
                ';
                document.head.appendChild(style);
            },
            start:function(data){

                //读取中的图片,不显示浮动栏,调整读取图标的位置.
                if(LoadingAnimC.all._find(function(item,index,array){
                    if(data.img==item.data.img){
                        return true;
                    };
                }))return;


                //被放大镜盯上的图片,不要显示浮动栏.
                if(MagnifierC.all._find(function(item,index,array){
                    if(data.img==item.data.img){
                        return true;
                    };
                }))return;

                this.data=data;
                var self=this;
                clearTimeout(this.hideTimer);

                var imgOutHandler=function(e){
                    document.removeEventListener('mouseout',imgOutHandler,true);
                    clearTimeout(self.showTimer);
                    clearTimeout(self.hideTimer);
                    self.hideTimer=setTimeout(function(){
                        self.hide();
                    },prefs.floatBar.hideDelay);
                };

                clearTimeout(this.globarOutTimer);
                this.globarOutTimer=setTimeout(function(){//稍微延时。错开由于css hover样式发生的out;
                    document.addEventListener('mouseout',imgOutHandler,true);
                },150);

                clearTimeout(this.showTimer);
                this.showTimer=setTimeout(function(){
                    self.show();
                },prefs.floatBar.showDelay);
            },
            setButton:function(){
                if(this.data.type=='force'){
                    this.buttons['actual'].style.display='none';
                    this.buttons['magnifier'].style.display='none';
                }else{
                    this.buttons['actual'].style.removeProperty('display');
                    this.buttons['magnifier'].style.removeProperty('display');
                };
            },
            setPosition:function(){
                //如果图片被删除了，或者隐藏了。
                if(this.data.img.offsetWidth==0){
                    return true;
                };
                var targetPosi=getContentClientRect(this.data.img);
                var windowSize=getWindowSize();

                var floatBarPosi=prefs.floatBar.position.toLowerCase().split(/\s+/);

                var offsetX=prefs.floatBar.offset.x;
                var offsetY=prefs.floatBar.offset.y;


                var scrolled=getScrolled();

                var fbs=this.floatBar.style;
                var setPosition={
                    top:function(){
                        var top=targetPosi.top + scrolled.y;
                        if(targetPosi.top + offsetY < 0){//满足图标被遮住的条件.
                            top=scrolled.y;
                            offsetY=0;
                        };
                        fbs.top=top + offsetY + 'px';
                    },
                    right:function(){
                        var right=windowSize.w - targetPosi.right;
                        if(right < offsetX){
                            right= -scrolled.x;
                            offsetX=0;
                        }else{
                            right -=scrolled.x;
                        };
                        fbs.right=right - offsetX + 'px';
                    },
                    bottom:function(){
                        var bottom=windowSize.h - targetPosi.bottom;
                        if(bottom <= offsetY){
                            bottom=-scrolled.y;
                            offsetY=0;
                        }else{
                            bottom -= scrolled.y;
                        };
                        fbs.bottom=bottom - offsetY + 'px';
                    },
                    left:function(){
                        var left=targetPosi.left + scrolled.x;
                        if(targetPosi.left + offsetX < 0){
                            left=scrolled.x;
                            offsetX=0;
                        };
                        fbs.left=left + offsetX + 'px';
                    },
                };

                setPosition[floatBarPosi[0]]();
                setPosition[floatBarPosi[1]]();
            },
            show:function(){
                if(this.setPosition())return;
                this.shown=true;
                this.setButton();
                this.floatBar.style.display='block';
                clearTimeout(this.hideTimer);
                window.removeEventListener('scroll',this._scrollHandler,true);
                window.addEventListener('scroll',this._scrollHandler,true);
            },
            hide:function(){
                clearTimeout(this.showTimer);
                this.shown=false;
                this.floatBar.style.display='none';
                window.removeEventListener('scroll',this._scrollHandler,true);
            },
            scrollHandler:function(){//更新坐标
                clearTimeout(this.scrollUpdateTimer);
                var self=this;
                this.scrollUpdateTimer=setTimeout(function(){
                    self.setPosition();
                },100);
            },
            open:function(e,buttonType){
                var waitImgLoad=e.ctrlKey? !prefs.waitImgLoad : prefs.waitImgLoad;//按住ctrl取反向值
                var openInTopWindow=e.shiftKey? !prefs.framesPicOpenInTopWindow : prefs.framesPicOpenInTopWindow;//按住shift取反向值

                if(!waitImgLoad && buttonType=='magnifier' && !envir.chrome){//非chrome的background-image需要全部载入后才能显示出来
                    waitImgLoad=true;
                };
                new LoadingAnimC(this.data,buttonType,waitImgLoad,openInTopWindow);
            },
        };

