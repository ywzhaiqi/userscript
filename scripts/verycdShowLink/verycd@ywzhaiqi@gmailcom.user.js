// ==UserScript==
// @id             verycd@ywzhaiqi@gmail.com
// @name           verycd补全下载链接
// @version        1.5.3
// @author         ywzhaiqi@gmail.com
// @namespace      https://github.com/ywzhaiqi
// @description    在 verycd 页面直接显示下载链接，可通过多个站点获取，防止失效。
// downloadURL     http://userscripts.org/scripts/source/158764.user.js
// updateURL       http://userscripts.org/scripts/source/158764.meta.js

// @homepageURL    https://greasyfork.org/scripts/301/
// @include        http://www.verycd.com/topics/*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

var debug = false;

var xbug = debug ? console.debug.bind(console) : function(){},
    xlog = debug ? console.log.bind(console) : function(){};

//------------------------------------ 一些辅助函数  ---------------------------------------------------
$.extend({
    tmpl: function(template, data){
        return doT.template(template).apply(null,[data]);
    }
});

/* Laura Doktorova https://github.com/olado/doT */
(function(){function o(){var a={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},b=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(b,function(c){return a[c]||c}):this}}function p(a,b,c){return(typeof b==="string"?b:b.toString()).replace(a.define||i,function(l,e,f,g){if(e.indexOf("def.")===0)e=e.substring(4);if(!(e in c))if(f===":"){a.defineParams&&g.replace(a.defineParams,function(n,h,d){c[e]={arg:h,text:d}});e in c||(c[e]=g)}else(new Function("def","def['"+
e+"']="+g))(c);return""}).replace(a.use||i,function(l,e){if(a.useParams)e=e.replace(a.useParams,function(g,n,h,d){if(c[h]&&c[h].arg&&d){g=(h+":"+d).replace(/'|\\/g,"_");c.__exp=c.__exp||{};c.__exp[g]=c[h].text.replace(RegExp("(^|[^\\w$])"+c[h].arg+"([^\\w$])","g"),"$1"+d+"$2");return n+"def.__exp['"+g+"']"}});var f=(new Function("def","return "+e))(c);return f?p(a,f,c):f})}function m(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var j={version:"1.0.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,
interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:true,append:true,selfcontained:false},template:undefined,
compile:undefined},q;if(typeof module!=="undefined"&&module.exports)module.exports=j;else if(typeof define==="function"&&define.amd)define(function(){return j});else{q=function(){return this||(0,eval)("this")}();q.doT=j}String.prototype.encodeHTML=o();var r={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},i=/$^/;j.template=function(a,b,c){b=b||j.templateSettings;var l=b.append?r.append:
r.split,e,f=0,g;a=b.use||b.define?p(b,a,c||{}):a;a=("var out='"+(b.strip?a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):a).replace(/'|\\/g,"\\$&").replace(b.interpolate||i,function(h,d){return l.start+m(d)+l.end}).replace(b.encode||i,function(h,d){e=true;return l.start+m(d)+l.endencode}).replace(b.conditional||i,function(h,d,k){return d?k?"';}else if("+m(k)+"){out+='":"';}else{out+='":k?"';if("+m(k)+"){out+='":"';}out+='"}).replace(b.iterate||i,function(h,
d,k,s){if(!d)return"';} } out+='";f+=1;g=s||"i"+f;d=m(d);return"';var arr"+f+"="+d+";if(arr"+f+"){var "+k+","+g+"=-1,l"+f+"=arr"+f+".length-1;while("+g+"<l"+f+"){"+k+"=arr"+f+"["+g+"+=1];out+='"}).replace(b.evaluate||i,function(h,d){return"';"+m(d)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+=");if(e&&b.selfcontained)a="String.prototype.encodeHTML=("+
o.toString()+"());"+a;try{return new Function(b.varname,a)}catch(n){typeof console!=="undefined"&&console.log("Could not create a template function: "+a);throw n;}};j.compile=function(a,b){return j.template(a,null,b)}})();


Function.prototype.getMultiLine = function() {  // 多行String
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}

function getDoc(url, callback, data){
    GM_xmlhttpRequest({
        method: data ? 'POST' : 'GET',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': (data) ? 'application/x-www-form-urlencoded' : null
        },
        onload: function(responseDetail){
            var doc = '';
            if(responseDetail.status == 200){
                // For Firefox, Chrome 30+ Supported
                doc = new DOMParser().parseFromString(responseDetail.responseText, 'text/html');
                
                if(doc == undefined){
                    doc = document.implementation.createHTMLDocument("");
                    doc.querySelector('html').innerHTML = responseText;
                }
            }
            callback(doc);
        }
    });
}

function byte2Str(inp) {
    var f = parseFloat(inp),
        unit = ['字节', 'KB', 'MB', 'GB', 'TB'],
        fUnit = 0;
    while (f > 1126) {
        f /= 1024;
        fUnit += 1;
    }
    return f.toFixed(2).toString() + ' ' + (unit[fUnit] || '未知单位');
}

function ed2kLink(aHref) {
    var ed2kArr = aHref.substr(0, aHref.length - 2).substr(13).split('|');
    return ({
        url: aHref,
        name: decodeURIComponent(ed2kArr[0]),
        size: parseInt(ed2kArr[1]),
        sizs: byte2Str(ed2kArr[1]),
        hash: ed2kArr[2],
        extr: ed2kArr[3]
    });
}


var VERYCD = {
    root: $('#iptcomED2K'),
    title: $('#topicstitle').text(),
    curSitePos: 0,

    init: function() {
        if(!this.root){
            console.error('root is null');
            return;
        }

        var elem = this.root.find('div');
        if(elem.text().substr(0, 3) == '该内容') {
            elem.text('正在加载，请稍候。。。');

            this.display_sites();

            this.get(VERYCD.curSitePos);
        }

    },

    display_sites: function(){
        // 插入其他站点的链接
        $('#iptcomED2K').before(
            $.tmpl(VERYCD.tpl_sites, VERYCD)
            );
    },

    display_content: function(ed2ks){
        // 添加到 网页中
        $('#iptcomED2K').html(
            $.tmpl(VERYCD.tpl_content, ed2ks)
            );
        // 计算总的大小
        unsafeWindow.em_size('EM4e759f9673554');
    },

    tpl_sites: function(){  // 插入的头部模板
        /*
        <table id="other_links">
            <tr>
                {{ for(var i = 0, l = it.sites.length; i < l; i++){ }}
                <td>
                    <a  id="{{=it.sites[i].id}}" href="{{=it.sites[i].url}}" target="_blank" style="
                        height: 20px; text-align: center; vertical-align: middle; padding: 2px 16px; cursor: pointer;">
                    显示资源: {{=it.sites[i].name}}
                    </a>
                </td>
                {{ } }}
            <tr>
        </table>
        */
    }.getMultiLine(),

    tpl_content: function(){  // 插入的内容模板
        /*
        <div class="emuletop">电驴资源</div>
            <div class="emulemain">
                <table width="100%" cellspacing="1" cellpadding="2">
                    {{ for(var i=0, l=it.length; i<l; i++){ }}
                    <tr>
                        <td>
                            <input value="{{=it[i].url}}" name="EM4e759f9673554" onclick="em_size('EM4e759f9673554');" checked="checked"
                                type="checkbox" style="cursor: pointer;" class="forminput">
                            <a href="{{=it[i].url}}" ed2k="{{=it[i].url}}">{{=it[i].name}}</a>
                        </td>
                        <td align="center">{{=it[i].sizs}}</td>
                    </tr>
                    {{ } }}
                    <tr><td align="left" class="post2"><input type="checkbox" checked="" class="forminput" id="checkall_EM4e759f9673554" onclick="checkAll('EM4e759f9673554',this.checked)"> <label for="checkall_EM4e759f9673554">全选</label> <input type="button" class="button downall" value="下载选中的文件" onclick="download('EM4e759f9673554',0,1)"> <span id="updateflashEM4e759f9673554"><object width="136" height="20" align="middle" class="copyflash" id="ed2kcopy_EM4e759f9673554" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" onload="em_size(&quot;EM4e759f9673554&quot;);"><param value="always" name="allowScriptAccess"><param value="false" name="allowFullScreen"><param value="/cp2flash.swf" name="movie"><param value="high" name="quality"><param value="#ffffff" name="bgcolor"><param value="transparent" name="wmode"><param value="flashID=EM4e759f9673554" name="FlashVars"><embed width="136" height="20" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" flashvars="flashID=EM4e759f9673554" allowfullscreen="false" allowscriptaccess="always" name="ed2kcopy_EM4e759f9673554" bgcolor="#ffffff" quality="high" wmode="transparent" src="/cp2flash.swf"></object></span>' </td><td align="center" id="size_EM4e759f9673554" class="emulesize post2"></td></tr>
                </table>
            </div>
        </div>
         */
    }.getMultiLine(),

    get_real_url: function(site, callback){  // 跳过搜索链接，取得直接链接
        xbug("Start Get Real URL: " + site.url);
        getDoc(site.url, function(doc){
            var find_url = $(site.search_selector, doc).attr('href');
            $site = $('#' + site.id);

            if(find_url){
                site.real_url = site.BASE_URL + find_url;
                $site.attr('href', site.real_url);

                callback(site.real_url);
            }else{   // 如果没找到链接则取下一个站点
                xbug('没有找到 real_url，继续获取下一个站点');
                VERYCD.get(++VERYCD.curSitePos);

                $site.text(site.name + '（无资源）')
                     .css('background', '#77787b');
            }
        });
    },
    get_dlink_page: function(url){
        xbug("Start Get dlink Page: " + url);
        getDoc(url, function(doc){
            if(doc){
                xbug("Current Site Pos: " + VERYCD.curSitePos);
                var site = VERYCD.sites[VERYCD.curSitePos],
                    pageProcessor = site.pageProcessor ? site.pageProcessor : VERYCD.commondPageProcessor;
                pageProcessor(doc, site, url);
            }else{  // 如果不成功则取下一个站点
                VERYCD.get(++VERYCD.curSitePos);
            }
        });
    },
    get: function(sitePos){
        var sites = this.sites;

        if(sitePos >= sites.length) return;

        var site = sites[sitePos];

        if(site.search_selector){  // 如果需要搜索, 则获取真实地址
            this.get_real_url(site, this.get_dlink_page);
        }else{
            this.get_dlink_page(site.url);
        }
    },

    commondPageProcessor: function(doc){  // 通用的页面处理
        var data = [];
        $(doc).find('a[href^="ed2k"]').each(function(i, el){
            var url = $(this).attr('href').replace('[www.ed2kers.com]', '');
            data[i] = ed2kLink(url)
        });

        VERYCD.display_content(data);
    }

};

// 其他站点的配置
VERYCD.sites = [
    {   
        name: 'ed2kers',
        id: 'site_ed2kers',
        BASE_URL: 'http://www.ed2kers.com',
        url: "http://www.ed2kers.com/index.php/search/index?c=0&keyword=" + VERYCD.title.replace(/'/g, " "),
        search_selector: ".techdes a:contains('" + VERYCD.title.replace(/&/g, "&amp;") + "')"
    },
    {
        name: "SimpleCD（默认）",
        id: 'site_simplecd',
        BASE_URL: "http://simplecd.me",
        url: "http://simplecd.me/search/entry/?query=" + VERYCD.title.replace(/\/|-|&/g, " "),
        search_selector: ".entry-list a:contains('" + VERYCD.title + "')",
        pageProcessor: function(doc, site){
            var data = [];
            var ids = [];
            $(doc).find('.emulemain input[name="selectemule"]').each(function(i, el){
                var rid = $(this).attr('value');
                ids[i] = "rid=" + rid;
            });

            var url = site.BASE_URL + '/download/?mode=copy&' + ids.join('&');
            xbug("Get SimpleCD: " + url);
            getDoc(url, function(doc){
                $('td:contains("ed2k://")', doc).each(function(i, el){
                    var url = $.trim($(this).text());
                    data[i] = ed2kLink(url);
                });

                VERYCD.display_content(data);
            });
        }
    },
    {   
        name: '逛大街',
        id: 'site_gdajie',
        BASE_URL: '',
        url: location.href.replace('www.verycd.com', 'www.verycd.gdajie.com'),
        // search_selector: "#emuleFile a[href^='http://www.verycd.gdajie.com']",
        pageProcessor: function(doc, site, url) {  // 解决只有一个的问题
            var data = [];
            var count = 0;
            var getDownloadUrl = function(url, i, total) {
                getDoc(url, function(doc){
                    var url = $(doc).find('a[href^="ed2k://"]').attr('href');
                    data[i] = ed2kLink(url);
                    count += 1;

                    xbug('正在获取第 ', count, ' 个，共 ', total, ' 个');
                    // if (count == total) {
                        VERYCD.display_content(data);
                    // }
                });
            };

            var $links = $(doc).find("#emuleFile a[href^='http://www.verycd.gdajie.com']");
            $links.each(function(i, link){
                var url = $(link).attr('href');
                getDownloadUrl(url, i, $links.size());
            });
        }
    },

    // {   name: 'VeryCD Fetch', host: 'verycdfetch.duapp.com',  //2013-2-10 测试失效
    //     url: location.href.replace('www.verycd.com', 'verycdfetch.duapp.com'),
    //     pageProcessor: function(doc){
    //         GM_addStyle(".needemule {display: none;}");

    //         var $new = $('#iptcomED2K', doc);
    //         $('#iptcomED2K').html($new);
    //     }}
];

var Douban = {
    searchURLs: {
        "图书": "http://book.douban.com/subject_search?search_text=%s&cat=1001"
    },
    init: function(){
        var type = $("#whereru>a:eq(1)").text();
        var searchURL = this.searchURLs[type];
        if(!searchURL) return;

        var title = this.getTitle();
        var url = searchURL.replace("%s", encodeURIComponent(title));

        var link = $("<a>豆瓣" + type + "搜索</a>").attr({
            href: url,
            target: "_blank",
            style: "height: 20px; text-align: center; vertical-align: middle; padding: 2px 16px; cursor: pointer;"
        });

        $("<td>").append(link).appendTo('#other_links tr:eq(0)')
    },
    getTitle: function(){
        var title = $("#topicstitle").text();
        var m = title.match(/《(.*?)》/);

        return m[1] || title;
    }
};



VERYCD.init();

Douban.init();