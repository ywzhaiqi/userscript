    };

    function init2(){
        init(topObject,window,document,arrayFn,envir,storage,unsafeWindow);
    };


    //大致检测运行环境
    var envir={
        ie:typeof document.documentMode == 'number',
        firefox:typeof XPCNativeWrapper == 'function',
        opera:!!window.opera,
        chrome:!!window.chrome,
    };

    //ie的话，不支持 < ie9的版本
    if(envir.ie && document.documentMode < 9){
        return;
    };


    var arrayFn=(function(){
        //Array的某些方法对所有的类数组都有效，比如HTMLCollection,NodeList,DOMStringList.....

        //添加一个当函数返回true时，返回[array[index],index]，并且跳出循环的方法
        //类似做到 for 循环，在满足条件的时候直接break跳出的效果。
        if(typeof Array.prototype['_find']!='function'){
            Object.defineProperty(Array.prototype,'_find',{
                value:function(callback , thisArg){
                    if (this == null){
                        throw new TypeError( "this is null or not defined" );
                    };

                    if(typeof callback != 'function') {
                        throw new TypeError( callback + " is not a function" );
                    };

                    var i = 0,
                        l = this.length,
                        value,
                        hasOwnProperty=Object.prototype.hasOwnProperty
                    ;


                    while(i<l){
                        if(hasOwnProperty.call(this,i)){
                            value = this[i];
                            if(callback.call( thisArg, value, i, this )===true){
                                return [value,i,this];
                            };
                        };
                        i++;
                    };
                },
                writable:true,
                enumerable:false,//与原生方法一样不可枚举，维护网页和谐。。。
                configurable:true,
            });
        };

        var arrayProto=Array.prototype;
        return {
            _find:arrayProto._find,
            slice:arrayProto.slice,
            forEach:arrayProto.forEach,
            some:arrayProto.some,
            every:arrayProto.every,
            map:arrayProto.map,
            filter:arrayProto.filter,
            indexOf:arrayProto.indexOf,
            lastIndexOf:arrayProto.lastIndexOf,
        };

    })();


    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',//chrome的gm函数式空函数
        mxAppStorage:(function(){//傲游扩展储存接口
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            };
        })(),
        operaUJSStorage:(function(){//opera userjs全局存储接口
            try{
                return window.opera.scriptStorage;
            }catch(e){
            };
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            };
        },
        getItem:function(key){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            return value;
        },
    };


    //DOMContentLoaded
    if(document.readyState=='complete'){
        init2();
    }else{
        document.addEventListener('DOMContentLoaded',function(){
            window.removeEventListener('load',init2,true);
            init2();
        },true);
        window.addEventListener('load',init2,true);
    };

})(this,window,document,(typeof unsafeWindow=='undefined'? window : unsafeWindow));