// ==UserScript==
// @name           BaiduPanHelper
// @version        0.0.3
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @description
// @grunt          none
// @include        http://pan.baidu.com/disk/home*
// @include        http://yun.baidu.com/share/home*
// ==/UserScript==

/*
 参考:
     1、仓库用度盘投稿助手 https://greasyfork.org/zh-CN/scripts/3285/code
 */


// 测试网址  Books(Verycd Share): http://yun.baidu.com/share/home?uk=2214641459&view=share#category/type=0
// 2014年11月12日
var shareHome = {  // 他人分享主页
    manualSave: function() {  // 手动保存当前页的数据
        copy(JSON.stringify(FileUtils.SHARE_DATAS.currentChacheData))
    },

    getAllShareData: function() {  // 保存当前用户分享的所有页 JSON 数据
        var total = $('.page-all').text();  // 共几页

        var allData = [];
        var page = 1;
        var finish = function() {
            var filename = $('.homepagelink').text() + ' 分享的数据.json';
            saveAs(allData, filename);
        };

        shareHome.getData(page, function next(records) {
            if (records) {
                allData = allData.concat(records);
                console.log('已成功获取第 %s 页数据', page);

                page += 1;
                if (page > total) {
                    finish();
                } else {
                    shareHome.getData(page, next);
                }
            } else {
                finish();
            }
        });
    },
    getData: function(currentPage, callback) {
        var url = "http://yun.baidu.com/pcloud/feed/getsharelist",
            pageSize = 60;

        currentPage -= 1;

        var data = {
            category: 0,
            auth_type: 1,
            request_location: 'share_home',
            start: currentPage * 60,
            limit: 60,
            query_uk: FileUtils.SHARE_DATAS.currentUK
        };

        $.get(url, data, function(ret) {
            if (ret.errno == 0) {
                callback(ret.records, ret.total_count);
            } else {
                console.error('获取第 %s 页错误，错误信息：', currentPage, ret);
                callback();
            }
        });
    }
};

var diskHome = {  // 个人网盘主页
    SAVE_TIMEOUT: 3 * 1000,

    init: function() {
        if (location.pathname != '/disk/home') return;

        moveDialog.init();
    },

    getAllList: function(startDir) {  // 保存某个文件夹下的所有文件列表信息（JSON）
        startDir = '/Books/Dev/Books ( Verycd Share )';

        var allData = [];
        var finish = function() {
            clearTimeout(finish.timeoutId);
            finish.timeoutId = setTimeout(function() {
                var filename = '我的 Books(Verycd Share) 数据.json';
                saveAs(allData, filename);
            }, diskHome.SAVE_TIMEOUT);
        };

        diskHome.getList(startDir, function next(list) {
            if (list) {
                allData = allData.concat(list);
                // 获取文件夹里面的数据
                list.forEach(function(item) {
                    if (item.isdir == 1) {
                        diskHome.getList(item.path, next);
                    }
                });

                finish();
            } else {
                finish();
            }
        });
    },
    getList: function (path, callback) {
        if (!path) {
            path = getParam('dir/path') || getParam('path');
        }

        var API_URL = '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1',
            restUrl = API_URL + '&dir=' + path;

        $.get(restUrl, function(result) {
            if (result && result.errno == 0 && result.list) {
                console.log('已成功获取 %s 路径的列表', path);
                callback(result.list);
            } else {
                console.error("获取 %s 路径数据出错", path , restUrl);
                callback();
            }
        });
    },
};

var moveDialog = (function() {

    var dataCenter = require("common:widget/data-center/data-center.js"),
        fileTreeView = require("common:widget/fileTreeView/fileTreeView.js");

    var $input,
        $checkbox,
        paths = [];

    function refreshPaths() {
        paths.length = 0;

        var isSearchPage = (location.hash.indexOf('key=') > 0) && (location.hash.indexOf('path=') == -1),
            currentDir = dataCenter.get('currentDir');

        if ($input)
            $input.val(currentDir);
        if ($checkbox)
            $checkbox.prop('checked', false);

        if (currentDir == '/')
            currentDir = '';

        // 刷新自动补全的路径
        $('.list > div[data-extname="dir"]').map(function() {
            var $this = $(this),
                dirName = $this.find('.name-text').text();

            var value = isSearchPage ?
                    $this.find('.search-feild').data('path') + '/' + dirName :
                    currentDir + '/' + dirName;

            paths.push({
                value: value,
                // data: dirName
            });
        });
    }

    function getCurDirItems() {
        return $('.list > div[data-extname="dir"]').map(function() {
            return $(this).find('.name').attr('title');
        });
    }

    function createInput() {
        var currentDir = dataCenter.get('currentDir');

        refreshPaths();

        var $input = $('<input>')
                .attr({
                    type: 'text',
                    id: 'bph-custom-path-input',
                })
                .val(currentDir );

        $input.autocomplete({
            lookup: paths,
            onSelect: function (suggestion) {
                $checkbox[0].click();
            }
        });

        return $input;
    }

    function createCheckbox() {

        var checkboxClicked = function() {
            if (this.checked) {
                var path = $input.val();
                if (path) {
                    fileTreeView.obtain.getSelectPath = function() {
                        return path;
                    };
                } else {
                    $input.focus();
                }
            } else {
                delete fileTreeView.obtain.getSelectPath;
            }
        };

        $checkbox = $('<input>')
                .attr({
                    type: 'checkbox',
                    id: 'bhp-enable-custom-path'
                })
                .click(checkboxClicked);
        return $checkbox;
    }

    function initUI() {
        $('<style>')
            .text([
                '#bhp-enable-custom-path { margin-left: 20px; }',
                '#bph-custom-path-input { width: 350px; }',
                '.autocomplete-suggestions { background: #fff; padding-left: 5px;  }',
            ].join('\n'))
            .appendTo('head');

        // 添加路径编辑器
        $input = createInput();

        $('.move-dialog h3')
            .append(createCheckbox())
            .append($input);
    }

    function dialogShow() {
        refreshPaths();
    }

    function init() {
        // 监视移动对话框的插入
        var selector = '.move-dialog';
        if ($(selector).length == 0) {
            var observer = new MutationObserver(function(mutations) {
                var node = mutations[0].addedNodes[0];
                if (node && node.matches(selector)) {
                    observer.disconnect();
                    initUI();

                    // dialog show or hide
                    var obs = new MutationObserver(function() {
                        if (node.style.display == 'block')
                            dialogShow();
                    });
                    obs.observe(node, { attributes: true, attributeFilter: ['style'] });
                }
            });
            observer.observe(document.body, { childList: true });
        }
    }

    return {
        init: init
    }
})()


function getParam(name, url) {
    var regexp = new RegExp("(?:^|\\?|#|&)" + name + "=([^&#]*)(?:$|&|#)", "i"),
        matches = regexp.exec(url || location.href);
    return matches ? decodeURIComponent(matches[1]) : ""
}

function saveAs(data, filename) {
    if(!filename) filename = 'console.json'

    if (typeof data == 'object') {
        data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    var saveas = document.createElement('a');
    saveas.href = url;
    saveas.style.display = 'none';
    document.body.appendChild(saveas);
    saveas.download = filename;
    saveas.click();
    setTimeout(function() {
        saveas.parentNode.removeChild(saveas);
    }, 1000)
    document.addEventListener('unload', function() {
        window.URL.revokeObjectURL(url);
    });
}


/**
*  Ajax Autocomplete for jQuery, version 1.2.14
*  (c) 2014 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports&&"function"==typeof require?require("jquery"):jQuery)}(function(a){"use strict";function b(c,d){var e=function(){},f=this,g={ajaxSettings:{},autoSelectFirst:!1,appendTo:document.body,serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:b.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:e,onSearchComplete:e,onSearchError:e,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:function(a,b,c){return-1!==a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(b){return"string"==typeof b?a.parseJSON(b):b},showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1};f.element=c,f.el=a(c),f.suggestions=[],f.badQueries=[],f.selectedIndex=-1,f.currentValue=f.element.value,f.intervalId=0,f.cachedResponse={},f.onChangeInterval=null,f.onChange=null,f.isLocal=!1,f.suggestionsContainer=null,f.noSuggestionsContainer=null,f.options=a.extend({},g,d),f.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},f.hint=null,f.hintValue="",f.selection=null,f.initialize(),f.setOptions(d)}var c=function(){return{escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},createNode:function(a){var b=document.createElement("div");return b.className=a,b.style.position="absolute",b.style.display="none",b}}}(),d={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40};b.utils=c,a.Autocomplete=b,b.formatResult=function(a,b){var d="("+c.escapeRegExChars(b)+")";return a.value.replace(new RegExp(d,"gi"),"<strong>$1</strong>")},b.prototype={killerFn:null,initialize:function(){var c,d=this,e="."+d.classes.suggestion,f=d.classes.selected,g=d.options;d.element.setAttribute("autocomplete","off"),d.killerFn=function(b){0===a(b.target).closest("."+d.options.containerClass).length&&(d.killSuggestions(),d.disableKillerFn())},d.noSuggestionsContainer=a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),d.suggestionsContainer=b.utils.createNode(g.containerClass),c=a(d.suggestionsContainer),c.appendTo(g.appendTo),"auto"!==g.width&&c.width(g.width),c.on("mouseover.autocomplete",e,function(){d.activate(a(this).data("index"))}),c.on("mouseout.autocomplete",function(){d.selectedIndex=-1,c.children("."+f).removeClass(f)}),c.on("click.autocomplete",e,function(){d.select(a(this).data("index"))}),d.fixPositionCapture=function(){d.visible&&d.fixPosition()},a(window).on("resize.autocomplete",d.fixPositionCapture),d.el.on("keydown.autocomplete",function(a){d.onKeyPress(a)}),d.el.on("keyup.autocomplete",function(a){d.onKeyUp(a)}),d.el.on("blur.autocomplete",function(){d.onBlur()}),d.el.on("focus.autocomplete",function(){d.onFocus()}),d.el.on("change.autocomplete",function(a){d.onKeyUp(a)})},onFocus:function(){var a=this;a.fixPosition(),a.options.minChars<=a.el.val().length&&a.onValueChange()},onBlur:function(){this.enableKillerFn()},setOptions:function(b){var c=this,d=c.options;a.extend(d,b),c.isLocal=a.isArray(d.lookup),c.isLocal&&(d.lookup=c.verifySuggestionsFormat(d.lookup)),d.orientation=c.validateOrientation(d.orientation,"bottom"),a(c.suggestionsContainer).css({"max-height":d.maxHeight+"px",width:d.width+"px","z-index":d.zIndex})},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var a=this;a.disabled=!0,clearInterval(a.onChangeInterval),a.currentRequest&&a.currentRequest.abort()},enable:function(){this.disabled=!1},fixPosition:function(){var b=this,c=a(b.suggestionsContainer),d=c.parent().get(0);if(d===document.body||b.options.forceFixPosition){var e=b.options.orientation,f=c.outerHeight(),g=b.el.outerHeight(),h=b.el.offset(),i={top:h.top,left:h.left};if("auto"==e){var j=a(window).height(),k=a(window).scrollTop(),l=-k+h.top-f,m=k+j-(h.top+g+f);e=Math.max(l,m)===l?"top":"bottom"}if(i.top+="top"===e?-f:g,d!==document.body){var n,o=c.css("opacity");b.visible||c.css("opacity",0).show(),n=c.offsetParent().offset(),i.top-=n.top,i.left-=n.left,b.visible||c.css("opacity",o).hide()}"auto"===b.options.width&&(i.width=b.el.outerWidth()-2+"px"),c.css(i)}},enableKillerFn:function(){var b=this;a(document).on("click.autocomplete",b.killerFn)},disableKillerFn:function(){var b=this;a(document).off("click.autocomplete",b.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions(),a.intervalId=window.setInterval(function(){a.hide(),a.stopKillSuggestions()},50)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},isCursorAtEnd:function(){var a,b=this,c=b.el.val().length,d=b.element.selectionStart;return"number"==typeof d?d===c:document.selection?(a=document.selection.createRange(),a.moveStart("character",-c),c===a.text.length):!0},onKeyPress:function(a){var b=this;if(!b.disabled&&!b.visible&&a.which===d.DOWN&&b.currentValue)return void b.suggest();if(!b.disabled&&b.visible){switch(a.which){case d.ESC:b.el.val(b.currentValue),b.hide();break;case d.RIGHT:if(b.hint&&b.options.onHint&&b.isCursorAtEnd()){b.selectHint();break}return;case d.TAB:if(b.hint&&b.options.onHint)return void b.selectHint();case d.RETURN:if(-1===b.selectedIndex)return void b.hide();if(b.select(b.selectedIndex),a.which===d.TAB&&b.options.tabDisabled===!1)return;break;case d.UP:b.moveUp();break;case d.DOWN:b.moveDown();break;default:return}a.stopImmediatePropagation(),a.preventDefault()}},onKeyUp:function(a){var b=this;if(!b.disabled){switch(a.which){case d.UP:case d.DOWN:return}clearInterval(b.onChangeInterval),b.currentValue!==b.el.val()&&(b.findBestHint(),b.options.deferRequestBy>0?b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy):b.onValueChange())}},onValueChange:function(){var b,c=this,d=c.options,e=c.el.val(),f=c.getQuery(e);return c.selection&&c.currentValue!==f&&(c.selection=null,(d.onInvalidateSelection||a.noop).call(c.element)),clearInterval(c.onChangeInterval),c.currentValue=e,c.selectedIndex=-1,d.triggerSelectOnValidInput&&(b=c.findSuggestionIndex(f),-1!==b)?void c.select(b):void(f.length<d.minChars?c.hide():c.getSuggestions(f))},findSuggestionIndex:function(b){var c=this,d=-1,e=b.toLowerCase();return a.each(c.suggestions,function(a,b){return b.value.toLowerCase()===e?(d=a,!1):void 0}),d},getQuery:function(b){var c,d=this.options.delimiter;return d?(c=b.split(d),a.trim(c[c.length-1])):b},getSuggestionsLocal:function(b){var c,d=this,e=d.options,f=b.toLowerCase(),g=e.lookupFilter,h=parseInt(e.lookupLimit,10);return c={suggestions:a.grep(e.lookup,function(a){return g(a,b,f)})},h&&c.suggestions.length>h&&(c.suggestions=c.suggestions.slice(0,h)),c},getSuggestions:function(b){var c,d,e,f,g=this,h=g.options,i=h.serviceUrl;if(h.params[h.paramName]=b,d=h.ignoreParams?null:h.params,h.onSearchStart.call(g.element,h.params)!==!1){if(a.isFunction(g.lookup))return void g.lookup(b,function(a){g.suggestions=a.suggestions,g.suggest(),h.onSearchComplete.call(g.element,b,a.suggestions)});g.isLocal?c=g.getSuggestionsLocal(b):(a.isFunction(i)&&(i=i.call(g.element,b)),e=i+"?"+a.param(d||{}),c=g.cachedResponse[e]),c&&a.isArray(c.suggestions)?(g.suggestions=c.suggestions,g.suggest(),h.onSearchComplete.call(g.element,b,c.suggestions)):g.isBadQuery(b)?h.onSearchComplete.call(g.element,b,[]):(g.currentRequest&&g.currentRequest.abort(),f={url:i,data:d,type:h.type,dataType:h.dataType},a.extend(f,h.ajaxSettings),g.currentRequest=a.ajax(f).done(function(a){var c;g.currentRequest=null,c=h.transformResult(a),g.processResponse(c,b,e),h.onSearchComplete.call(g.element,b,c.suggestions)}).fail(function(a,c,d){h.onSearchError.call(g.element,b,a,c,d)}))}},isBadQuery:function(a){if(!this.options.preventBadQueries)return!1;for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){var b=this;b.visible=!1,b.selectedIndex=-1,clearInterval(b.onChangeInterval),a(b.suggestionsContainer).hide(),b.signalHint(null)},suggest:function(){if(0===this.suggestions.length)return void(this.options.showNoSuggestionNotice?this.noSuggestions():this.hide());var b,c,d=this,e=d.options,f=e.groupBy,g=e.formatResult,h=d.getQuery(d.currentValue),i=d.classes.suggestion,j=d.classes.selected,k=a(d.suggestionsContainer),l=a(d.noSuggestionsContainer),m=e.beforeRender,n="",o=function(a){var c=a.data[f];return b===c?"":(b=c,'<div class="autocomplete-group"><strong>'+b+"</strong></div>")};return e.triggerSelectOnValidInput&&(c=d.findSuggestionIndex(h),-1!==c)?void d.select(c):(a.each(d.suggestions,function(a,b){f&&(n+=o(b,h,a)),n+='<div class="'+i+'" data-index="'+a+'">'+g(b,h)+"</div>"}),this.adjustContainerWidth(),l.detach(),k.html(n),a.isFunction(m)&&m.call(d.element,k),d.fixPosition(),k.show(),e.autoSelectFirst&&(d.selectedIndex=0,k.scrollTop(0),k.children().first().addClass(j)),d.visible=!0,void d.findBestHint())},noSuggestions:function(){var b=this,c=a(b.suggestionsContainer),d=a(b.noSuggestionsContainer);this.adjustContainerWidth(),d.detach(),c.empty(),c.append(d),b.fixPosition(),c.show(),b.visible=!0},adjustContainerWidth:function(){var b,c=this,d=c.options,e=a(c.suggestionsContainer);"auto"===d.width&&(b=c.el.outerWidth()-2,e.width(b>0?b:300))},findBestHint:function(){var b=this,c=b.el.val().toLowerCase(),d=null;c&&(a.each(b.suggestions,function(a,b){var e=0===b.value.toLowerCase().indexOf(c);return e&&(d=b),!e}),b.signalHint(d))},signalHint:function(b){var c="",d=this;b&&(c=d.currentValue+b.value.substr(d.currentValue.length)),d.hintValue!==c&&(d.hintValue=c,d.hint=b,(this.options.onHint||a.noop)(c))},verifySuggestionsFormat:function(b){return b.length&&"string"==typeof b[0]?a.map(b,function(a){return{value:a,data:null}}):b},validateOrientation:function(b,c){return b=a.trim(b||"").toLowerCase(),-1===a.inArray(b,["auto","bottom","top"])&&(b=c),b},processResponse:function(a,b,c){var d=this,e=d.options;a.suggestions=d.verifySuggestionsFormat(a.suggestions),e.noCache||(d.cachedResponse[c]=a,e.preventBadQueries&&0===a.suggestions.length&&d.badQueries.push(b)),b===d.getQuery(d.currentValue)&&(d.suggestions=a.suggestions,d.suggest())},activate:function(b){var c,d=this,e=d.classes.selected,f=a(d.suggestionsContainer),g=f.find("."+d.classes.suggestion);return f.find("."+e).removeClass(e),d.selectedIndex=b,-1!==d.selectedIndex&&g.length>d.selectedIndex?(c=g.get(d.selectedIndex),a(c).addClass(e),c):null},selectHint:function(){var b=this,c=a.inArray(b.hint,b.suggestions);b.select(c)},select:function(a){var b=this;b.hide(),b.onSelect(a)},moveUp:function(){var b=this;if(-1!==b.selectedIndex)return 0===b.selectedIndex?(a(b.suggestionsContainer).children().first().removeClass(b.classes.selected),b.selectedIndex=-1,b.el.val(b.currentValue),void b.findBestHint()):void b.adjustScroll(b.selectedIndex-1)},moveDown:function(){var a=this;a.selectedIndex!==a.suggestions.length-1&&a.adjustScroll(a.selectedIndex+1)},adjustScroll:function(b){var c=this,d=c.activate(b);if(d){var e,f,g,h=a(d).outerHeight();e=d.offsetTop,f=a(c.suggestionsContainer).scrollTop(),g=f+c.options.maxHeight-h,f>e?a(c.suggestionsContainer).scrollTop(e):e>g&&a(c.suggestionsContainer).scrollTop(e-c.options.maxHeight+h),c.el.val(c.getValue(c.suggestions[b].value)),c.signalHint(null)}},onSelect:function(b){var c=this,d=c.options.onSelect,e=c.suggestions[b];c.currentValue=c.getValue(e.value),c.currentValue!==c.el.val()&&c.el.val(c.currentValue),c.signalHint(null),c.suggestions=[],c.selection=e,a.isFunction(d)&&d.call(c.element,e)},getValue:function(a){var b,c,d=this,e=d.options.delimiter;return e?(b=d.currentValue,c=b.split(e),1===c.length?a:b.substr(0,b.length-c[c.length-1].length)+a):a},dispose:function(){var b=this;b.el.off(".autocomplete").removeData("autocomplete"),b.disableKillerFn(),a(window).off("resize.autocomplete",b.fixPositionCapture),a(b.suggestionsContainer).remove()}},a.fn.autocomplete=a.fn.devbridgeAutocomplete=function(c,d){var e="autocomplete";return 0===arguments.length?this.first().data(e):this.each(function(){var f=a(this),g=f.data(e);"string"==typeof c?g&&"function"==typeof g[c]&&g[c](d):(g&&g.dispose&&g.dispose(),g=new b(this,c),f.data(e,g))})}});



diskHome.init();
