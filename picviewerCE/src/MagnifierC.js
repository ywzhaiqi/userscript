
        //放大镜
        function MagnifierC(img,data){
            this.img=img;
            this.data=data;
            this.init();
        };

        MagnifierC.all=[];
        MagnifierC.styleZIndex=900000000;//全局z-index;
        MagnifierC.zoomRange=prefs.magnifier.wheelZoom.range.slice(0).sort();//升序
        MagnifierC.zoomRangeR=MagnifierC.zoomRange.slice(0).reverse();//降序

        MagnifierC.prototype={
            init:function(){
                this.addStyle();
                MagnifierC.all.push(this);
                var container=document.createElement('span');

                container.className='pv-magnifier-container';
                document.body.appendChild(container);

                this.magnifier=container;

                var imgNaturalSize={
                    h:this.img.naturalHeight,
                    w:this.img.naturalWidth,
                };

                this.imgNaturalSize=imgNaturalSize;

                var cs=container.style;
                cs.zIndex=MagnifierC.styleZIndex++;



                var maxDia=Math.ceil(Math.sqrt(Math.pow(1/2*imgNaturalSize.w,2) + Math.pow(1/2*imgNaturalSize.h,2)) * 2);
                this.maxDia=maxDia;

                var radius=prefs.magnifier.radius;
                radius=Math.min(maxDia/2,radius);
                this.radius=radius;
                var diameter=radius * 2;
                this.diameter=diameter;

                cs.width=diameter + 'px';
                cs.height=diameter + 'px';
                cs.borderRadius=radius+1 + 'px';
                cs.backgroundImage='url("'+ this.img.src +'")';
                cs.marginLeft= -radius +'px';
                cs.marginTop= -radius +'px';

                var imgPos=getContentClientRect(this.data.img);
                var wScrolled=getScrolled();
                var imgRange={//图片所在范围
                    x:[imgPos.left + wScrolled.x , imgPos.right + wScrolled.x],
                    y:[imgPos.top + wScrolled.y, imgPos.bottom + wScrolled.y],
                };
                var imgW=imgRange.x[1] - imgRange.x[0];
                var imgH=imgRange.y[1] - imgRange.y[0];
                //如果图片太小的话，进行范围扩大。
                var minSize=60;
                if(imgW < minSize){
                    imgRange.x[1] +=(minSize - imgW)/2;
                    imgRange.x[0] -=(minSize - imgW)/2;
                    imgW=minSize;
                };
                if(imgH < minSize){
                    imgRange.y[1] +=(minSize - imgH)/2;
                    imgRange.y[0] -=(minSize - imgH)/2;
                    imgH=minSize;
                };
                this.imgSize={
                    w:imgW,
                    h:imgH,
                };
                this.imgRange=imgRange;
                //console.log(this.imgRange,this.imgSize);

                this.setMouseRange();


                this.move({
                    pageX:imgRange.x[0],
                    pageY:imgRange.y[0],
                });

                this._focus=this.focus.bind(this);
                this._blur=this.blur.bind(this);
                this._move=this.move.bind(this);
                this._remove=this.remove.bind(this);
                this._pause=this.pause.bind(this);
                this._zoom=this.zoom.bind(this);

                if(prefs.magnifier.wheelZoom.enabled){
                    this.zoomLevel=1;
                    this.defaultDia=diameter;
                    addWheelEvent(container,this._zoom,false);
                };

                container.addEventListener('mouseover',this._focus,false);
                container.addEventListener('mouseout',this._blur,false);
                container.addEventListener('dblclick',this._remove,false);
                container.addEventListener('click',this._pause,false);


                document.addEventListener('mousemove',this._move,true);
            },
            addStyle:function(){
                if(MagnifierC.style)return;
                var style=document.createElement('style');
                style.type='text/css';
                MagnifierC.style=style;
                style.textContent='\
                    .pv-magnifier-container{\
                        position:absolute;\
                        padding:0;\
                        margin:0;\
                        background-origin:border-box;\
                        -moz-box-sizing:border-box;\
                        box-sizing:border-box;\
                        border:3px solid #CCCCCC;\
                        background:rgba(40, 40, 40, 0.9) no-repeat;\
                    }\
                    .pv-magnifier-container_focus{\
                        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);\
                    }\
                    .pv-magnifier-container_pause{\
                        border-color:red;\
                    }\
                ';
                document.head.appendChild(style);
            },
            focus:function(){
                this.magnifier.classList.add('pv-magnifier-container_focus');
                this.magnifier.style.zIndex=MagnifierC.styleZIndex++;
            },
            blur:function(){
                this.magnifier.classList.remove('pv-magnifier-container_focus');
            },
            move:function(e){
                var mouseCoor={
                    x:e.pageX,
                    y:e.pageY,
                };
                var mouseRange=this.mouseRange;
                var imgRange=this.imgRange;

                if( !(mouseCoor.x >= mouseRange.x[0] && mouseCoor.x <= mouseRange.x[1] && mouseCoor.y >= mouseRange.y[0] && mouseCoor.y <= mouseRange.y[1]))return;//如果不再鼠标范围
                if(mouseCoor.x > imgRange.x[1]){
                    mouseCoor.x = imgRange.x[1];
                }else if(mouseCoor.x < imgRange.x[0]){
                    mouseCoor.x = imgRange.x[0];
                };
                if(mouseCoor.y > imgRange.y[1]){
                    mouseCoor.y = imgRange.y[1];
                }else if(mouseCoor.y < imgRange.y[0]){
                    mouseCoor.y = imgRange.y[0];
                };

                var ms=this.magnifier.style;
                ms.top= mouseCoor.y + 'px';
                ms.left= mouseCoor.x + 'px';

                var radius=this.radius;
                var imgSize=this.imgSize;
                var imgNaturalSize=this.imgNaturalSize;
                var px=-((mouseCoor.x-imgRange.x[0])/imgSize.w * imgNaturalSize.w) + radius +'px';
                var py=-((mouseCoor.y-imgRange.y[0])/imgSize.h * imgNaturalSize.h) + radius +'px';
                //console.log(px,py);
                ms.backgroundPosition=px + ' ' + py;
            },
            getNextZoomLevel:function(){
                var level;
                var self=this;
                if(this.zoomOut){//缩小
                    MagnifierC.zoomRangeR._find(function(value){
                        if(value < self.zoomLevel){
                            level=value;
                            return true;
                        }
                    })
                }else{
                    MagnifierC.zoomRange._find(function(value){
                        if(value > self.zoomLevel){
                            level=value;
                            return true;
                        };
                    });
                }
                return level;
            },
            zoom:function(e){
                if(e.deltaY===0)return;//非Y轴的滚动
                if(prefs.magnifier.wheelZoom.pauseFirst && !this.paused)return;
                e.preventDefault();
                if(e.deltaY < 0){//向上滚，放大；
                    if(this.diameter >= this.maxDia)return;
                    this.zoomOut=false;
                }else{
                    this.zoomOut=true;
                };
                var level=this.getNextZoomLevel();
                if(!level)return;

                this.zoomLevel=level;
                var diameter=this.defaultDia * level;
                if(diameter > this.maxDia){
                    diameter = this.maxDia;
                };

                var radius=diameter/2
                this.diameter=diameter;
                var bRadius=this.radius;
                this.radius=radius;
                this.setMouseRange();
                var ms=this.magnifier.style;
                ms.width=diameter+'px';
                ms.height=diameter+'px';
                ms.borderRadius=radius+1 + 'px';
                ms.marginLeft=-radius+'px';
                ms.marginTop=-radius+'px';
                var bBP=ms.backgroundPosition.split(' ');
                ms.backgroundPosition=parseFloat(bBP[0]) + (radius - bRadius) + 'px' + ' ' + (parseFloat(bBP[1]) + ( radius - bRadius) + 'px');

            },
            pause:function(){
                if(this.paused){
                    this.magnifier.classList.remove('pv-magnifier-container_pause');
                    document.addEventListener('mousemove',this._move,true);
                }else{
                    this.magnifier.classList.add('pv-magnifier-container_pause');
                    document.removeEventListener('mousemove',this._move,true);
                };
                this.paused=!this.paused;
            },
            setMouseRange:function(){
                var imgRange=this.imgRange;
                var radius=this.radius;
                this.mouseRange={//鼠标活动范围
                    x:[imgRange.x[0]-radius , imgRange.x[1] + radius],
                    y:[imgRange.y[0]-radius , imgRange.y[1] + radius],
                };
            },
            remove:function(){
                this.magnifier.parentNode.removeChild(this.magnifier);
                document.removeEventListener('mousemove',this._move,true);
                MagnifierC.all.splice(MagnifierC.all.indexOf(this),1);
            },
        };

