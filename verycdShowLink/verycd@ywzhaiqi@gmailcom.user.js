// ==UserScript==
// @id             verycd@ywzhaiqi@gmail.com
// @name           verycd补全下载链接
// @version        1.5.0
// @author         ywzhaiqi@gmail.com
// @description    在verycd页面直接显示下载链接
// @downloadURL    http://userscripts.org/scripts/source/158764.user.js
// @updateURL      http://userscripts.org/scripts/source/158764.meta.js
// @include        http://www.verycd.com/topics/*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @require        https://raw.github.com/olado/doT/master/doT.min.js
// ==/UserScript==

var debug = false;

var xbug = debug ? console.debug : function(){},
    xlog = debug ? console.log : function(){};

//------------------------------------ 一些辅助函数  ---------------------------------------------------
$.extend({
    tmpl: function(template, data){
        return doT.template(template).apply(null,[data]);
    }
});


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
                // For Firefox
                doc = new DOMParser().parseFromString(responseDetail.responseText, 'text/html');
                // For Chrome
                if(doc == undefined){
                    doc = document.implementation.createHTMLDocument("");
                    doc.querySelector('html').innerHTML = responseText;
                }
            }
            callback(doc);
        }
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
                    <a  id="{{=it.sites[i].id}}" href="{{=it.sites[i].url}}" target="_blank" style="background: #C00000; color: white;
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
                            <a href="{{=it[i].url}}" ed2k="{{=it[i].url}}">{{=it[i].title}}</a>
                        </td>
                        <td align="center">{{=it[i].sizeStr}}</td>
                    </tr>
                    {{ } }}
                    <tr><td align="left" class="post2"><input type="checkbox" checked="" class="forminput" id="checkall_EM4e759f9673554" onclick="checkAll('EM4e759f9673554',this.checked)"> <label for="checkall_EM4e759f9673554">全选</label> <input type="button" class="button downall" value="下载选中的文件" onclick="download('EM4e759f9673554',0,1)"> <span id="updateflashEM4e759f9673554"><object width="136" height="20" align="middle" class="copyflash" id="ed2kcopy_EM4e759f9673554" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" onload="em_size(&quot;EM4e759f9673554&quot;);"><param value="always" name="allowScriptAccess"><param value="false" name="allowFullScreen"><param value="/cp2flash.swf" name="movie"><param value="high" name="quality"><param value="#ffffff" name="bgcolor"><param value="transparent" name="wmode"><param value="flashID=EM4e759f9673554" name="FlashVars"><embed width="136" height="20" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" flashvars="flashID=EM4e759f9673554" allowfullscreen="false" allowscriptaccess="always" name="ed2kcopy_EM4e759f9673554" bgcolor="#ffffff" quality="high" wmode="transparent" src="/cp2flash.swf"></object></span>' </td><td align="center" id="size_EM4e759f9673554" class="emulesize post2"></td></tr>
                </table>
            </div>
        </div>
         */
    }.getMultiLine(),

    get_real_url: function(site, callback){  // 跳过搜索链接，取得直接链接

        xbug("Get Real URL: " + site.url);

        getDoc(site.url, function(doc){
            var find_url = $(site.search_selector, doc).attr('href');

            $site = $('#' + site.id);
            if(find_url){
                site.real_url = site.BASE_URL + find_url;
                $site.attr('href', site.real_url);

                callback(site.real_url);
            }else{   // 如果没找到链接则取下一个站点
                VERYCD.get(++VERYCD.curSitePos);

                $site.text(site.name + '（无资源）')
                    .css('background', '#77787b');
            }

        });
    },

    get_dlink_page: function(url){

        xbug("Get dlink Page: " + url);

        getDoc(url, function(doc){
            if(doc){

                xbug("Current Site Pos: " + VERYCD.curSitePos);

                var site = VERYCD.sites[VERYCD.curSitePos],
                    pageProcessor = site.pageProcessor ? site.pageProcessor : VERYCD.commondPageProcessor;
                pageProcessor(doc, site);
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
            data[i] = {
                url: $(this).attr('href').replace('[www.ed2kers.com]', ''),
                title: $(this).text(),
                sizeStr: $(this).parent().next().text()
            };
        });

        VERYCD.display_content(data);
    }

};

// 其他站点的配置
VERYCD.sites = [

    {
        name: "SimpleCD",
        id: 'site_simplecd',
        BASE_URL: "http://simplecd.me",
        url: "http://simplecd.me/search/entry/?query=" + VERYCD.title.replace(/\/|-|&/g, " "),
        real_url: null,
        search_selector: ".entry-list a:contains('" + VERYCD.title + "')",
        pageProcessor: function(doc, site){
            var data = [];
            var ids = [];
            $(doc).find('.emulemain input[name="selectemule"]').each(function(i, el){
                var rid = $(this).attr('value');
                ids[i] = "rid=" + rid;
                // 获取title、大小
                data[i] = {
                    title: $(this).next().text(),
                    sizeStr: $(this).parent().siblings('td:last').text()
                };
            });
            var url = site.BASE_URL + '/download/?mode=copy&' + ids.join('&');

            xbug("Get SimpleCD: " + url);

            getDoc(url, function(doc){
                $('td:contains("ed2k://")', doc).each(function(i, el){
                    data[i].url = $(this).text();
                });
                VERYCD.display_content(data);
            });
        }
    },

    {   name: 'ed2kers',
        id: 'site_ed2kers',
        BASE_URL: 'http://www.ed2kers.com',
        url: "http://www.ed2kers.com/index.php/search/index?c=0&keyword=" + VERYCD.title.replace(/'/g, " "),
        real_url: null,
        search_selector: ".techdes a:contains('" + VERYCD.title.replace(/&/g, "&amp;") + "')"
    }
    
    /* 2013年4月9日 改版后不能直接获取地址 
    {   name: '逛大街（默认）',
        id: 'site_gdajie',
        BASE_URL: 'http://www.verycd.gdajie.com',
        url: location.href.replace('www.verycd.com', 'www.verycd.gdajie.com'),
        pageProcessor: function(doc, site){
            // #detail a
        }
    },
    */

    // {   name: 'VeryCD Fetch', host: 'verycdfetch.duapp.com',  //2013-2-10 测试失效
    //     url: location.href.replace('www.verycd.com', 'verycdfetch.duapp.com'),
    //     pageProcessor: function(doc){
    //         GM_addStyle(".needemule {display: none;}");

    //         var $new = $('#iptcomED2K', doc);
    //         $('#iptcomED2K').html($new);
    //     }}
];

VERYCD.init();

var debug = false;
if(debug){
    unsafeWindow.VCD = VERYCD;
}
