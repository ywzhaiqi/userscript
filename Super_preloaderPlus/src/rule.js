// rule.js

if (window.name === 'mynovelreader-iframe') {
    return;
}

// 如果是取出下一页使用的iframe window
if (window.name === 'superpreloader-iframe') { // 搜狗,iframe里面怎么不加载js啊?
    // 去掉了原版的另一种方法，因为新版本 chrome 已经支持。旧版本 chrome iframe里面 无法访问window.parent,返回undefined

    var domloaded = function (){  // 滚动到底部,针对,某些使用滚动事件加载图片的网站.
        window.scroll(window.scrollX, 99999);
        window.parent.postMessage('superpreloader-iframe:DOMLoaded', '*');
    };
    if(window.opera){
        document.addEventListener('DOMContentLoaded', domloaded, false);
    } else {
        domloaded();
    }

    return;
}


// GM 兼容

gmCompatible();

/////////////////////设置(请注意开关的缩进关系..子开关一般在父开关为true的时候才会生效.)//////////////////////
var prefs={
    floatWindow: true,       // 显示悬浮窗
        FW_position: 2,         // 1:出现在左上角;2:出现在右上角;3：出现在右下角;4：出现在左下角;
        FW_offset: [20, 38],    // 偏离版边的垂直和水平方向的数值..(单位:像素)
        FW_RAS: true,           // 点击悬浮窗上的保存按钮..立即刷新页面;
    pauseA: true,            // 快速停止自动翻页(当前模式为翻页模式的时候生效.);
        Pbutton: [2, 0, 0],     // 需要按住的键.....0: 不按住任何键;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同时按3个键.就填 1 2 3)(一个都不按.就填 0 0 0)
        mouseA: true,           // 按住鼠标左键..否则.双击;
            Atimeout: 200,      // 按住左键时..延时.多少生效..(单位:毫秒);
        stop_ipage: true,       // 如果在连续翻页过程中暂停.重新启用后.不在继续..连续翻页..

    Aplus: true,             // 自动翻页模式的时候..提前预读好一页..就是翻完第1页,立马预读第2页,翻完第2页,立马预读第3页..(大幅加快翻页快感-_-!!)(建议开启)..
    sepP: true,              // 翻页模式下.分隔符.在使用上滚一页或下滚一页的时候是否保持相对位置..
    sepT: true,              // 翻页模式下.分隔符.在使用上滚一页或下滚一页的时候使用动画过渡..
        s_method: 3,            // 动画方式 0-10 一种11种动画效果..自己试试吧
        s_ease: 2,              // 淡入淡出效果 0：淡入 1：淡出 2：淡入淡出
        s_FPS: 60,              // 帧速.(单位:帧/秒)
        s_duration: 333,        // 动画持续时长.(单位:毫秒);
    someValue: '',           // 显示在翻页导航最右边的一个小句子..-_-!!..Powered by Super_preloader 隐藏了
    DisableI: true,          // 只在顶层窗口加载JS..提升性能..如果开启了这项,那么DIExclude数组有效,里面的网页即使不在顶层窗口也会加载....
    arrowKeyPage: true,      // 允许使用 左右方向键 翻页..
    sepStartN: 2,            // 翻页导航上的,从几开始计数.(貌似有人在意这个,所以弄个开关出来,反正简单.-_-!!)

    // 新增或修改的
    forceTargetWindow: GM_getValue('forceTargetWindow', true),  // 下一页的链接设置成在新标签页打开
    debug: GM_getValue('debug', false),
    enableHistory: GM_getValue('enableHistory', false),    // 把下一页链接添加到历史记录
    autoGetPreLink: false,   // 一开始不自动查找上一页链接，改为调用时再查找
    excludes: GM_getValue('excludes', ''),
    custom_siteinfo: GM_getValue('custom_siteinfo', '[]'),
    lazyImgSrc: 'zoomfile|file|original|load-src|_src|imgsrc|real_src|src2|data-lazyload-src|data-ks-lazyload|data-lazyload|data-src|data-original|data-thumb|data-imageurl|data-defer-src|data-placeholder',
};

// 黑名单,网站正则..
var blackList=[
    // 例子
    // 'http://*.douban.com/*',
];

blackList = blackList.concat(prefs.excludes.split(/[\n\r]+/).map(function(line) {
    return line.trim();
}));


//在以下网站上允许在非顶层窗口上加载JS..比如猫扑之类的框架集网页.
var DIExclude = [
    ['猫扑帖子', true, /http:\/\/dzh\.mop\.com\/[a-z]{3,6}\/\d{8}\/.*\.shtml$/i],
    ['铁血社区', true, /^http:\/\/bbs\.tiexue\.net\/.*\.html$/i],
    ['铁血社区-2', true, /^http:\/\/bbs\.qichelian\.com\/bbsqcl\.php\?fid/i],
    // 像 http://so.baiduyun.me/ 内嵌的百度、Google 框架
    ['百度网盘搜索引擎-百度', true, /^https?:\/\/www\.baidu\.com\/baidu/i],
    ['百度网盘搜索引擎-Google', true, /^https?:\/\/74\.125\.128\.147\/custom/i],
];

// 页面不刷新的站点
var HashchangeSites = [
    { url: /^https?:\/\/(www|encrypted)\.google(stable)?\..{2,9}\/(webhp|#|$|\?)/, timer: 2000, mutationSelector: '#main' },
    // 运营商可能会在 #wd= 前面添加 ?tn=07084049_pg
    { url: /^https?:\/\/www\.baidu\.com\/($|#wd=)/, timer: 1000, mutationSelector: '#wrapper_wrapper' },
    { url: /^https?:\/\/www\.newsmth\.net/, timer: 1000 },
];

//////////////////////////---------------规则-------////////////////
//翻页所要的站点信息.
//高级规则的一些默认设置..如果你不知道是什么..请务必不要修改(删除)它.此修改会影响到所有高级规则...
var SITEINFO_D={
    enable: true,               // 启用
    useiframe: GM_getValue('SITEINFO_D.useiframe') || false,           // (预读)是否使用iframe..
    viewcontent: false,         // 查看预读的内容,显示在页面的最下方.
    autopager: {
        enable: true,           // 启用自动翻页...
        force_enable: GM_getValue('SITEINFO_D.autopager.force_enable') || false,  //默认启用强制拼接
        manualA: false,         // 手动翻页.
        useiframe: false,       // (翻页)是否使用iframe..
            iloaded: false,     // 是否在iframe完全load后操作..否则在DOM完成后操作
            itimeout: 0,        // 延时多少毫秒后,在操作..
            newIframe: false,
        remain: 1,              // 剩余页面的高度..是显示高度的 remain 倍开始翻页..
        maxpage: 99,            // 最多翻多少页..
        ipages: [false, 2],     // 立即翻页,第一项是控制是否在js加载的时候立即翻第二项(必须小于maxpage)的页数,比如[true,3].就是说JS加载后.立即翻3页.
        separator: true,        // 显示翻页导航..(推荐显示.)
            separatorReal: true,  // 显示真实的页数
    }
};

//高优先级规则,第一个是教程.
var SITEINFO=[
    {name: 'Google搜索',                                                                                                                               //站点名字...(可选)
        url: '^https?://(?:(?:www|encrypted)\\.google(?:stable)?\\..{2,9}|wen\\.lu)/(?:webhp|search|#|$|\\?)',   // 站点正则...(~~必须~~)
        //url:'wildc;http://www.google.com.hk/search*',
        siteExample:'http://www.google.com',                                                                                                //站点实例...(可选)
        enable:true,                                                                                                                                            //启用.(总开关)(可选)
        useiframe:false,                                                                                                                                        //是否用iframe预读...(可选)
        viewcontent:false,

        nextLink: 'id("pnnext") | id("navbar navcnt nav")//td[span]/following-sibling::td[1]/a | id("nn")/parent::a',                                                                                                                           //查看预读的内容,显示在页面的最下方.(可选)
        // nextLink:'auto;',
        //nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',              //下一页链接 xpath 或者 CSS选择器 或者 函数返回值(此函数必须使用第一个传入的参数作为document对象) (~~必选~~)
        //nextLink:'css;table#nav>tbody>tr>td.b:last-child>a',
        //nextLink:function(D,W){return D.evaluate('//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',D,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;},
        // 新增 Array 的格式，依次查找

        // preLink:'auto;',
        preLink: '//a[@id="pnprev"]',
        //preLink:'//table[@id="nav"]/descendant::a[1][parent::td[@class="b"]]',            //上一页链接 xpath 或者 CSS选择器 或者 函数返回值 (可选)
        autopager:{
            enable:true ,                                                                                               //启用(自动翻页)(可选)
            useiframe:false,                                                                                        //是否使用iframe翻页(可选)
                iloaded:false,                                                                                      //是否在iframe完全load之后操作..否则在DOM完成后操作.
                itimeout:0,                                                                                             //延时多少毫秒后,在操作..
                newIframe: false,  // 下一页使用新的 iframe，能解决按钮无法点击的问题
            pageElement: '//div[@id="ires"]',                                          //主体内容 xpath 或 CSS选择器 或函数返回值(~~必须~~)
            // pageElement:'css;div#ires',
            //pageElement:function(doc,win){return doc.getElementById('ires')},
            //filter:'//li[@class="g"]',                                                                        //(此项功能未完成)xpath 或 CSS选择器从匹配到的节点里面过滤掉符合的节点.
            remain: 1/3,                                                                                                 //剩余页面的高度..是显示高度的 remain 倍开始翻页(可选)
                relatedObj: ['css;div#navcnt','bottom'],                                                         //以这个元素当做最底的元素,计算页面总高度的计算.(可选)
            replaceE: '//div[@id="navcnt"]',                 //需要替换的部分 xpat h或 CSS选择器 一般是页面的本来的翻页导航(可选);
            //replaceE:'css;div#navcnt',
            ipages: [false,3],                               //立即翻页,第一项是控制是否在js加载的时候立即翻第二项(必须小于maxpage)的页数,比如[true,3].就是说JS加载后.立即翻3页.(可选)
            separator: true,                                 //是否显示翻页导航(可选)
                separatorReal: true,
            maxpage: 66,                                     //最多翻页数量(可选)
            manualA: false,                                  //是否使用手动翻页.
            HT_insert: ['//div[@id="res"]',2],               //插入方式此项为一个数组: [节点xpath或CSS选择器,插入方式(1：插入到给定节点之前;2：附加到给定节点的里面;)](可选);
            //HT_insert:['css;div#res',2],
            lazyImgSrc: 'imgsrc',
            // 新增的自定义样式。下面这个是调整 Google 下一页可能出现的图片排列问题。
            stylish: 'hr.rgsep{display:none;}' +
                '.rg_meta{display:none}.bili{display:inline-block;margin:0 6px 6px 0;overflow:hidden;position:relative;vertical-align:top}._HG{margin-bottom:2px;margin-right:2px}',
            documentFilter: function(doc){
                // 修正下一页的图片
                var x = doc.evaluate('//script/text()[contains(self::text(), "data:image/")]', doc, null, 9, null).singleNodeValue;
                if (x) {
                    try {
                        new Function('document, window, google', x.nodeValue)(doc, unsafeWindow, unsafeWindow.google);
                    } catch (e) {}
                }

                // 修正可能出现的 小箭头更多按钮 排版不正确的情况（2014-7-29）
                var oClassName = window.document.querySelector('#ires .ab_button').className;
                [].forEach.call(doc.querySelectorAll('#ires .ab_button'), function(elem){
                    if (elem.className != oClassName)
                        elem.className = oClassName;
                });
            },
            filter: function() {  // 在添加内容到页面后运行

            },
            startFilter: function(win, doc) {  // 只作用一次
                // 移除 Google 重定向
                var script = doc.createElement('script');
                script.type = 'text/javascript';
                script.textContent = '\
                    Object.defineProperty(window, "rwt", {\
                        configurable: false,\
                        enumerable: true,\
                        get: function () {\
                            return function() {};\
                        },\
                    });\
                ';
                doc.documentElement.appendChild(script);
                doc.documentElement.removeChild(script);

                // 移动相关搜索到第一页
                var brs = doc.getElementById('brs'),
                    ins = doc.getElementById('ires');
                if (brs && ins) {
                    ins.appendChild(brs);
                }
            }
        }
    },
    {name: '百度搜索',
        // 由于 Super_preloader 默认去掉了 # 后面部分
        // url: "^https?://www\\.baidu\\.com/(s|baidu|#wd=)",
        url: "^https?://www\\.baidu\\.com/",
        enable:true,
        nextLink:'//p[@id="page"]/a[contains(text(),"下一页")][@href]',
        preLink:'//p[@id="page"]/a[contains(text(),"上一页")][@href]',
        autopager: {
            pageElement: 'css;div#content_left > *',
            HT_insert:['css;div#content_left',2],
            replaceE: 'css;#page',
            stylish: '.autopagerize_page_info, div.sp-separator {margin-bottom: 10px !important;}',
            startFilter: function(win) {
                // 设置百度搜索类型为 s?wd=
                try {
                    win.document.cookie = "ISSW=1";
                } catch (ex) {}
            }
        }
    },
    {name: '百度搜索 - baidulocal',
        url: '^https?://www\\.baidu\\.com/s.*&tn=baidulocal',
        nextLink: '//a[font[text()="下一页"]]',
        pageElement: '//table[@width="100%" and @border="0"]/tbody/tr/td/ol',
        exampleUrl: 'http://www.baidu.com/s?wd=firefox&rsv_spt=1&issp=1&rsv_bp=0&ie=utf-8&tn=baidulocal&inputT=1364',
    },
    {name: '360搜索',
        url: "http://www\\.so\\.com/s",
        nextLink:'//div[@id="page"]/a[text()="下一页>"] | id("snext")',
        autopager:{
            pageElement:'//div[@id="container"]',
            stylish: '.autopagerize_page_info, div.sp-separator { margin-bottom: 20px !important; }'
        }
    },
    {name: '搜狗搜索',
        url:/^https?:\/\/www\.sogou\.com\/(?:web|sogou)/i,
        siteExample:'http://www.sogou.com',
        enable:true,
        nextLink:'//div[@id="pagebar_container"]/a[@id="sogou_next"]',
        autopager:{
            pageElement:'//div[@class="results"]',
            replaceE: 'id("pagebar_container")'
        }
    },
    {name: 'Bing网页搜索',
        url:/bing\.com\/search\?q=/i,
        siteExample:'bing.com/search?q=',
        nextLink:'//nav[@aria-label="navigation"]/descendant::a[last()][@class="sb_pagN"]',
        autopager:{
            pageElement: '//ol[@id="b_results"]/li[@class="b_algo"]',
            replaceE: '//nav[@aria-label="navigation"]'
        }
    },
    {name: '有道网页搜索',
        url: /http:\/\/www\.youdao\.com\/search\?/i,
        siteExample: 'http://www.youdao.com/search?',
        nextLink: '//div[@class="c-pages"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//ol[@id="results"]',
            replaceE: 'id("resc")/div[@class="c-pages"]'
        }
    },
    {name: 'SoSo网页搜索',
        url:/http:\/\/www\.soso\.com\/q/i,
        siteExample:'http://www.soso.com/q',
        nextLink:'//div[@class="pg"]/descendant::a[last()][@class="next"]',
        autopager:{
            // useiframe:true,
            pageElement:'//div[@id="result"]/ol/li',
            replaceE: 'id("pager")'
        }
    },
    {name: 'Disconnect Search',
        url: /^https?:\/\/search\.disconnect\.me\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("results")',
            replaceE: '//div[@class="pagination"]',
        }
    },
    {name: 'AOL 搜索',
        url: '^http://(www\\.)aolsearch.com/search\\?.+?[?&]q=',
        siteExample: 'http://www.aolsearch.com/search?q=test',
        nextLink: '//a[span[@class="nextRes"][text()="Next"]]',
        autopager: {
            pageElement: '//*[@id="c"]/div'
        }
    },
    {name: '谷搜客',
       url: /^https?:\/\/gusouk\.com\/search/i,
       siteExample: 'http://gusouk.com/search?q=firefox',
       nextLink: 'auto;',
       autopager: {
           pageElement: '//div[@class="search_result"]'
       }
    },
    {name: 'tmd123搜索',  // www.tmd123.com
       url: /^https?:\/\/54\.64\.24\.234\/search/i,
       siteExample: 'http://54.64.24.234/search/?q=firefox',
       nextLink: 'auto;',
       autopager: {
           pageElement: '//div[@class="search_result"]'
       }
    },
    {name: "Google custom",
        url: /^https?:\/\/74\.125\.128\.147\/custom/i,
        nextLink: 'id("pnnext") | id("navbar navcnt nav")//td[span]/following-sibling::td[1]/a | id("nn")/parent::a',
        autopager: {
            pageElement: '//div[@id="res"]',
        }
    },

    // ====== 目前 Super_preloaderPlus_one 还有问题的 ========
    {name: '水木社区',
        url: '^http://www\\.newsmth\\.net/nForum',
        nextLink: '//a[@title="下一页"]',
        pageElement: '//div[@class="b-content"] | //div[@class="b-content corner"]',
        exampleUrl: 'http://www.newsmth.net/nForum/#!board/TouHou'
    },

    // =============== baidu 其它 ===========
    {name: '百度贴吧列表',
        url: /^http:\/\/tieba\.baidu\.(cn|com)\/f/i,
        nextLink: '//div[@class="pager clearfix"]/descendant::a[@class="next"]',
        preLink: '//div[@class="pager clearfix"]/descendant::a[@class="pre"]',
        autopager: {
            enable: false,
            pageElement: '//ul[@id="thread_list"]/li',
            replaceE: 'css;#frs_list_pager',
            useiframe: true,
                // newIframe: true,
                iloaded: true,
            // lazyImgSrc: "bpic",
        }
    },
    {name: '百度贴吧帖子',
        url:/^http:\/\/tieba\.baidu\.com\/p/i,
        siteExample:'http://tieba.baidu.com/p/918674650',
        nextLink:'//ul[@class="l_posts_num"]/descendant::a[text()="下一页"]',
        preLink:'//ul[@class="l_posts_num"]/descendant::a[text()="上一页"]',
        autopager:{
            enable: false,
            pageElement: "id('j_p_postlist')",  // "css;.l_post"
            replaceE: "css;.l_posts_num > .l_pager",
            useiframe: true,
                // newIframe: true,
                iloaded: true
            // filter: function(pages){
            //     var pb = unsafeWindow.pb;
            //     pb.ForumListV3.initial();
            // }
        }
    },
    {name: '百度吧内搜索',
        url: /^http:\/\/tieba\.baidu\.com\/f\/search/i,
        siteExample: 'http://tieba.baidu.com/f/search/',
        nextLink: 'auto;',
        pageElement: 'css;.s_post'
    },
    {name: '百度新闻搜索',
        url: '^http://news\\.baidu\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/ns',
        nextLink: 'id("page")/a[text()="下一页>"]',
        pageElement: 'id("content_left")',
    },
    {name: '百度知道',
        url:/^https?:\/\/zhidao\.baidu\.com\/search\?/i,
        siteExample:'http://zhidao.baidu.com/search?pn=0&&rn=10&word=%BD%AD%C4%CFstyle',
        nextLink:'auto;',
        pageElement:'css;#wgt-list',
    },
    {name: '百度空间',
        url: '^http://hi\\.baidu\\.com',
        nextLink: 'id("pagerBar")/div/a[@class="next"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="mod-realcontent mod-cs-contentblock"]',
        },
        exampleUrl: 'http://hi.baidu.com/gelida',
    },
    {name: '百度文库搜索',
        url: /^http:\/\/wenku\.baidu\.com\/search\?/i,
        exampleUrl: 'http://wenku.baidu.com/search?word=firefox&lm=0&od=0&fr=top_home',
        nextLink: '//div[@class="page-content"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[@class="search-result"]',
        }
    },

    // ================ news ===========================
    {name: '新浪新闻',
        url: /^http:\/\/[a-z]+\.sina\.com\.cn\//i,
        exampleUrl: 'http://news.sina.com.cn/c/sd/2013-11-08/165728658916.shtml',
        nextLink: '//p[@class="page"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@id="artibody"]',
            relatedObj: true,
        }
    },
    {name: '搜狐新闻',
        url: /^http:\/\/news\.sohu\.com\/.*\.shtml/i,
        exampleUrl: 'http://news.sohu.com/20120901/n352071543.shtml',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("contentText")',
        }
    },
    {name: '新华网新闻页面',
        url:/http:\/\/news\.xinhuanet\.com\/.+\/\d+-/i,
        siteExample:'http://news.xinhuanet.com/politics/2010-07/19/c_12347755.htm',
        nextLink:'//div[@id="div_currpage"]/a[text()="下一页"]',
        autopager:{
            remain:2,
            pageElement:'//table[@id="myTable"] | id("content")'
        }
    },
    {name: '腾讯网-大成网,新闻',
        url: /^http:\/\/[a-z]+\.qq\.com\/.*\.htm/i,
        exampleUrl: 'http://cd.qq.com/a/20131119/002713.htm',
        nextLink: 'id("ArtPLink")/ul/li/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("Cnt-Main-Article-QQ")',
            relatedObj: true,
            replaceE: "css;#ArtPLink"
        }
    },
    {name: '大成社区',
        url: /^http:\/\/[a-z]+\.qq\.com\/(?:forum\.php|.*\.htm)/i,
        exampleUrl: 'http://mycd.qq.com/forum.php?mod=forumdisplay&fid=1001037360&page=',
        nextLink: '//div[@class="pgb"]/a[@class="nxt"]',
        autopager: {
            pageElement: 'id("threadlisttableid") | id("postlist") | id("threadlist")/table',
            replaceE: 'css;.page_box .pgb',
            lazyImgSrc: 'zoomfile'
        }
    },
    {name: '中国新闻网',
        url:/http:\/\/www\.chinanews\.com\/[a-z]+\/.+\.shtml/i,
        siteExample:'http://www.chinanews.com/英文/年/日期/编号.shtml',
        nextLink: '//div[@id="function_code_page"]/a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@class="left_zw"] | //div[@class="hd_photo"]',
            relatedObj: true,
            HT_insert:['//div[@id="function_code_page"]',1],
            filter:'//div[@id="function_code_page"]',
        }
    },
    {name: '人民网新闻',
        url: /^http:\/\/[a-z]+\.people\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://ent.people.com.cn/n/2013/0823/c1012-22672732-2.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="text_img"] | //div[@id="p_content"]',
            relatedObj: true
        }
    },
    {name: '中关村在线新闻页面',
        url:/http:\/\/(?:[^\.]+\.)?zol\.com\.cn\/\d+\/\d+/i,
        siteExample:'http://lcd.zol.com.cn/187/1875145.html',
        nextLink: '//div[@class="page"]/a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="cotent_idd" or @id="article-content"]',
            relatedObj: true,
            replaceE: 'css;.page'
        }
    },
    {name: 'FT中文网',
        url: /^http:\/\/www\.ftchinese\.com\/story\//i,
        exampleUrl: 'http://www.ftchinese.com/story/001053472',
        nextLink: '//div[@class="pagination"]/a[text()="余下全文"]',
        autopager: {
            pageElement: '//div[@id="bodytext"]',
            relatedObj: true,
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: 'Solidot: 奇客的资讯，重要的东西',
        url: /^http:\/\/www\.solidot\.org\//i,
        exampleUrl: 'http://www.solidot.org/?issue=20131205',
        nextLink: 'id("center")/div[@class="page"]/a[last()]',
        autopager: {
            pageElement: 'id("center")/div[@class="block_m"]',
            separatorReal: false
        }
    },
    {name: 'IT 之家',
        url: /^http:\/\/\w+\.ithome\.com\//i,
        nextLink: 'id("Pager")/div[@class="pagenew"]/a[text()=">"]',
        autopager: {
            pageElement: 'id("wrapper")/div[@class="content fl"]/div[@class="cate_list" or @class="post_list"]/ul[@class="ulcl"]',
            replaceE: 'id("Pager")/div[@class="pagenew"]'
        }
    },
    {name: '虎嗅网',
        url: "^http://www\\.huxiu\\.com/",
        nextLink: '//span[@class="next"]/a[text()=">"]',
        pageElement: '//div[@class="center-ctr-box"]'
    },
    {name: '36氪',
        url: "^http://www\\.36kr\\.com/.+",
        nextLink: '//a[@rel="next"]',
        pageElement: 'id("mainContainer")/descendant::div[contains(concat(" ", @class, ""),"krContent")]'
    },
    {name: '爱范儿 · Beats of Bits - 发现创新价值的科技媒体',
        url: "^http://www\\.ifanr\\.com/",
        nextLink: '//div[@class="content-nav"]/a[text()="下一页"]',
        pageElement: 'id("content")/div[contains(concat(" ", @class, ""), "main")]'
    },
    {name: '创业帮',
        url: /^http:\/\/www\.cyzone\.cn\//i,
        exampleUrl: 'http://www.cyzone.cn/',
        nextLink: 'id("pages")/*[@class="current"]/following-sibling::a[1]',
        autopager: {
            pageElement: '//div[@class="left"]/div[starts-with(@class, "intere")]/ul[@class="list clearfix"]',
        }
    },
    {name: '萝卜网',
        url: /^http:\/\/luo\.bo\//i,
        exampleUrl: 'http://luo.bo/',
        nextLink: '//div[@class="pagenavi"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="homeposts"]/ul[contains(@class, "explist homelist")] | //div[@class="container"]/div[@class="content"]',
            replaceE: '//div[@class="pagenavi"]'
        }
    },
    {name: '爱活网 Evolife.cn_科技进化生活',
        url: /^http:\/\/[a-z]+\.evolife\.cn\//i,
        exampleUrl: 'http://go.evolife.cn/category/focus_121_1.html',
        nextLink: '//div[contains(@class, "pages")]/a[text()="下一页" or contains(text(), ">")]',
        autopager: {
            pageElement: '//div[@class="zuijingengxin"]/div[@class="zuijingengxin_box"] | //div[@class="zuijingengxin"]/div[@class="text"]',
            replaceE: 'css;.pages',
            relatedObj: true,
        }
    },
    {name: '凤凰网 - 凤凰汽车',
        url: /^http:\/\/auto\.ifeng\.com\/.*\.shtml/i,
        exampleUrl: 'http://auto.ifeng.com/youji/20131115/1003513.shtml',
        nextLink: '//div[@class="arl-pages"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[starts-with(@class,"arl-mian")]/div/div[@class="arl-cont"]',
            relatedObj: true,
            replaceE: '//div[@class="arl-pages"]'
        }
    },
    {name: '凤凰网 - 新闻、财经',
        url: /^http:\/\/\w+\.ifeng\.com\//i,
        exampleUrl: 'http://finance.ifeng.com/a/20131115/11089994_1.shtml',
        nextLink: '//a[@id="pagenext"] | //div[@class="next" or @class="fy"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@id="artical_real"] | //div[@class="content"]/div[@class="contentL"] | //div[@class="yib_left"]/div[@class="box_list"]',
            relatedObj: true,
            replaceE: 'id("artical")/div[@class="an"]/div[@class="next"] | //div[@class="yib_left"]/div[@class="fy"]'
        }
    },
    {name: '和讯财经微博',
        url: /^http:\/\/t\.hexun\.com\/.*\.html/i,
        exampleUrl: 'http://t.hexun.com/21210301/default.html',
        nextLink: '//li[contains(@class, "nextbtn2")]/a[text()="下一页 >"]',
        autopager: {
            pageElement: '//div[@id="listWeibo"]',
            replaceE: '//div[@id="page2"]'
        }
    },
    {name: '和讯博客',
        url: /^http:\/\/\w+\.blog\.hexun\.com\//i,
        exampleUrl: 'http://23802543.blog.hexun.com/',
        nextLink: function(doc) {
            var url = doc.querySelector('.PageSkip_1 a[title="下一页"]').getAttribute('href');
            url = url.replace(/(\/p\d+\/).*/, '$1default.html');
            return url;
        },
        autopager: {
            pageElement: 'id("DefaultContainer1_ArticleList_Panel1")'
        }
    },
    {name: '汽车之家',
        url: /^http:\/\/www\.autohome\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://www.autohome.com.cn/culture/201310/643479-7.html',
        nextLink: 'id("articlewrap")/div[@class="page"]/a[@class="page-item-next"]',
        autopager: {
            pageElement: 'id("articleContent")',
            relatedObj: true,
            replaceE: 'id("articlewrap")/div[@class="page"]'
        }
    },
    {name: '汽车之家论坛帖子和列表',
        url:/^http:\/\/club\.autohome\.com\.cn\/bbs/i,
        siteExample:'http://club.autohome.com.cn/bbs/forum-c-2313-1.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//dl[@class="list_dl "][@lang] | //div[@class="conmain"]',
        }
    },
    {name: '爱卡汽车',
        url: /^http:\/\/yp\.xcar\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://yp.xcar.com.cn/201311/news_1351064_1.html',
        nextLink: '//div[@class="article_page_bottom"]/a[@class="page_down"]',
        autopager: {
            pageElement: 'id("newsbody")',
            relatedObj: true,
            replaceE: '//div[@class="article_page_bottom"]'
        }
    },
    {name: '爱卡汽车论坛帖子',
        url:/^http:\/\/www\.xcar\.com\.cn\/bbs\/viewthread/i,
        siteExample:'http://www.xcar.com.cn/bbs/viewthread.php?tid=12474760',
        nextLink:'//a[text()="下一页＞"][@href]',
        autopager:{
            pageElement:'//form[@id="delpost"] | //div[@class="maintable"][@id="_img"]',
        }
    },
    {name: '新闻 - 加拿大华人网',
        url: /^http:\/\/www\.sinonet\.org\/.*\.html/i,
        exampleUrl: 'http://www.sinonet.org/news/society/2013-11-15/301940.html',
        nextLink: '//p[@class="pageLink"]/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("zoom")',
            relatedObj: true
        }
    },
    {name: '美国中文网',
        url: /^http:\/\/news\.sinovision\.net\/.*\.htm/i,
        exampleUrl: 'http://news.sinovision.net/politics/201401/00279206.htm',
        nextLink: '//div[@class="pg"]/a[@class="nxt"]',
        autopager: {
            pageElement: '//div[@class="d"]/table[@class="vwtb"]',
            replaceE: '//div[@class="pg"]',
            relatedObj: true
        }
    },
    {name: '火星网－中国领先的数字艺术门户',
        url: /^http:\/\/news\.hxsd\.com\/.*\.html/i,
        exampleUrl: 'http://news.hxsd.com/CG-dynamic/201401/684528.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="news_content_left"]/div[@class="content"]',
        }
    },
    {name: '铁血网',
        url: /^http:\/\/bbs\.tiexue\.net\/post.*\.html/i,
        exampleUrl: 'http://bbs.tiexue.net/post2_7969883_3.html',
        nextLink: '//div[@class="page"]/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("postContent")/div[@class="newconli2"]',
            relatedObj: true
        }
    },
    {name: '看天下',
        url: /^http:\/\/www\.vistastory\.com\/.*\.html/i,
        exampleUrl: 'http://www.vistastory.com/a/201408/5395.html',
        nextLink: '//a[@class="cpnext"]',
        autopager: {
            pageElement: 'css;.arc_body',
        }
    },
    {name: '参政消息',
        url: '^http://china\\.cankaoxiaoxi\\.com/.*\\.shtml',
        nextLink: 'id("next_page")',
        pageElement: 'id("ctrlfscont")',
        exampleUrl: 'http://china.cankaoxiaoxi.com/roll10/2014/0817/464381.shtml',
    },

    {name: '凯迪社区',
        url: '^http://club\\.kdnet\\.net/list\\.asp',
        nextLink: 'auto;',
        pageElement: '//div[@class="lf w840px"]/div[@class="list-table"]/table',
        exampleUrl: 'http://club.kdnet.net/list.asp?t=0&boardid=1&selTimeLimit=0&action=&topicmode=0&s=&page=1',
    },

    //--- 国外新闻
    {name: 'TouringCarTimes',
        url: /^http:\/\/www\.touringcartimes\.com\/category\//i,
        nextLink: '//li[@class="bpn-next-link"]/a',
        autopager: {
            pageElement: '//div[@id="archive_page_wrapper"]',
        }
    },
    {name: 'tomshardware',
        url: /^http:\/\/www\.tomshardware\.com\//i,
        exampleUrl: 'http://www.tomshardware.com/reviews/chrome-27-firefox-21-opera-next,3534-2.html',
        nextLink: '//li[@class="item icon active"]/following::a[1]',
        autopager: {
            pageElement: '//article[@id="news-content"]',
        }
    },

    // ========================= video =====================
    {name: '优酷视频',
        url: /^http:\/\/(?:www|u|i|tv)\.youku\.com\//i,
        nextLink: '//a[@title="下一页"] | //li[@class="next"]/a[text()="下一页"] | //a[em/@class="ico_next"] | //a[span/@class="ico__pagenext"]',
        autopager: {
            pageElement: '//div[@id="list" or @id="listofficial"] | id("getVideoList") | id("imgType") | //div[@class="YK_main" or @class="mainCol"]/descendant::div[@class="items"]',
        }
    },
    {name: "搜库-专找视频",
        url: "^http://www\\.soku\\.com/",
        nextLink: '//li[@class="next"]/a[@title="下一页"]',
        autopager: {
            pageElement: '//div[@class="sk_result"]',
            separatorReal: false,
        }
    },
    {name: '爱奇艺',
        url: /^http:\/\/(list|so)\.iqiyi\.com\//i,
        nextLink: '//div[@class="page"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="list_content"]/div[@class="list0"] | //div[@class="s_main"]/descendant::div[@class="mod_sideright clearfix"]/ul',
        }
    },
    {name: '土豆网 - 全部视频',
        url: /^http:\/\/www\.tudou\.com\/cate\/.*\.html/i,
        exampleUrl: 'http://www.tudou.com/cate/ach30.html',
        nextLink: '//div[@class="page-nav-bar"]/a[text()="下一页>"]',
        autopager: {
            pageElement: '//div[@class="content"]',
        }
    },
    {name: '搜狐视频 搜索',
        url: /^http:\/\/so\.tv\.sohu\.com\/mts\?&wd=/i,
        exampleUrl: 'http://so.tv.sohu.com/mts?&wd=%u6211%u662F%u7279%u79CD%u5175%u4E4B%u706B%u51E4%u51F0',
        nextLink: '//div[@class="page"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="listBox clear"]/div[@class="column picList"]',
        }
    },
    {name: '搜狐视频',
        url: /^http:\/\/so\.tv\.sohu\.com\/list/i,
        exampleUrl: 'http://so.tv.sohu.com/list_p1169_p2_u4E16_u754C_u676F_p3_p4_p5_p6_p7_p8_p9_p10_p11.html',
        nextLink: '//div[@class="page"]/a[@class="next"]',
        autopager: {
            pageElement: 'id("contentList")/div[@class="column-bd clear"]/ul[@class="cfix"]',
            replaceE: 'id("contentList")/div[@class="page"]',
        }
    },
    {name: 'bilibili',
        "url": "^http://(www\\.bilibili\\.tv/search|space\\.bilibili\\.tv/)",
        "nextLink": "//div[@class=\"pagelistbox\"]/a[@class=\"nextPage\"]|//ul[@class=\"page\"]/li[@class=\"current\"]/following-sibling::li[1]/a",
        "pageElement": "//div[@class=\"searchlist\"]/ul[@class=\"search_result\"]/li|//div[@class=\"main_list\"]/ul/li"
    },
    {name: 'youtube 搜索列表',
        url: /^https?:\/\/www\.youtube\.com\/results/i,
        nextLink: '//div[contains(concat(" ", @class, " "), " yt-uix-pager ")]//a[last()][@href]',
        autopager: {
            pageElement: 'id("results")',
            lazyImgSrc: 'data-thumb'
        }
    },
    {name: 'imdb',
        url: /^http:\/\/www\.imdb\.com\/search/i,
        exampleUrl: 'http://www.imdb.com/search/title?count=100&title_type=feature,tv_series&ref_=nv_ch_mm_1',
        nextLink: '//span[@class="pagination"]/a[last()] | id("right")/a[last()]',
        autopager: {
            pageElement: 'id("main")/*',
        }
    },

    // ====================== shopping、生活 ===========================
    {name: '淘宝搜索',
        url: '^http://(?:list|s|search[^.]*)\\.taobao\\.com/search',
        nextLink: '//a[@class="page-next"]',
        autopager: {
            pageElement: '//div[@class="tb-content"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    },
    {name: "淘宝",
        url: /^http:\/\/(?!bbs).*\.taobao\.com\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="J_ShopSearchResult"]/div/div[contains(@class, "shop-hesper-bd")] | id("J_ItemListsContainer")/ul[@class="item-lists"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    },
    {name: '天猫 - 搜索',
        url: '^http://list\\.tmall\\.com//?search_product\\.htm\\?',
        nextLink: '//a[@class="ui-page-next" and (text()="下一页>>")]',
        autopager: {
            pageElement: '//div[@id="J_ItemList"]',
            relatedObj: true,
            replaceE: '//div[@class="ui-page-wrap"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        },
    },
    {name: '店内搜索页-淘宝网',
        url: /^http:\/\/[^.]+\.taobao\.com\/search\.htm\?/i,
        exampleUrl: 'http://jiaqibaihou.taobao.com/search.htm?spm=a1z10.3.w4002-1381691988.18.GgWBry&mid=w-1381691988-0&search=y&keyword=%BC%AA%C1%D0&pageNo=1',
        nextLink: '//a[(text()="下一页")][not(@class="disable")]',
        autopager: {
            pageElement: '//div[@id="J_ShopSearchResult"]/div/div[contains(@class, "shop-hesper-bd")]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    },
    {name: '淘宝论坛 ',
        url: /^http:\/\/bbs\.taobao\.com\//i,
        exampleUrl: 'http://bbs.taobao.com/catalog/thread/647133-264959947.htm?spm=0.0.0.0.Ji1u2u',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("detail")/div[@class="bbd"] | //div[@class="main-wrap"]//div[@class="bd"]/table[@class="posts"]',
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: '京东商城',
        url: /^http:\/\/.*\.jd\.com\//i,
        exampleUrl: 'http://list.jd.com/670-686-690-0-0-0-0-0-0-0-1-1-1-1-18-1574-29455-0.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("plist")',
            useiframe: true,
            lazyImgSrc: 'data-lazyload',
        }
    },
    {name: '京东读书',
        url: /^http:\/\/read\.jd\.com\/.*\/.*\.html/i,
        exampleUrl: 'http://read.jd.com/16171/778043.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="mc clearfix"]',
        }
    },
    {name: '亚马逊',
        url: /^http:\/\/www\.amazon\.cn\/gp\/search\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("mainResults") | id("btfResults")',
        }
    },
    {name: '易迅网',
        url: /^http:\/\/searchex\.yixun\.com\//i,
        exampleUrl: 'http://searchex.yixun.com/705798t706810-1001-/?YTAG=3.706810246020',
        nextLink: '//div[@class="sort_page_num"]/a[@title="下一页"]',
        autopager: {
            pageElement: '//UL[@id="itemList"]',
            lazyImgSrc: 'init_src'
        }
    },
    {name: '前程无忧 - 搜索',
        url: /^http:\/\/search\.51job\.com\/jobsearch\/search_result/i,
        nextLink: '//table[@class="searchPageNav"]//td[@class="currPage"]/following-sibling::td[1]/a',
        autopager: {
            pageElement: 'id("resultList")',
        }
    },
    {name: '抢了个便宜 | 高性价比正品低价商品推荐网',
        url: /^http:\/\/www\.qlgpy\.com\//i,
        nextLink: '//div[@class="wpagenavi"]/a[text()="下页"]',
        autopager: {
            pageElement: 'id("wrapmain")//ul[starts-with(@id, "post-")]',
        }
    },
    {name: '秒便宜论坛',
        url: /^http:\/\/bbs\.miaopy\.com\//i,
        exampleUrl: 'http://bbs.miaopy.com/activity/list-3.aspx',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.forumtopics-list',
            stylish: 'div.sp-separator { width: 800px !important;}'
        }
    },
    {name: '露天拍賣',
        url: /^http:\/\/[a-z]+\.ruten\.com\.tw\//i,
        exampleUrl: 'http://class.ruten.com.tw/category/sub00.php?c=0019000800010001',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="searchResult"]',
        }
    },
    {name: 'Yahoo!奇摩拍賣',
        url: /^https:\/\/tw\.bid\.yahoo\.com\//i,
        exampleUrl: 'https://tw.bid.yahoo.com/tw/2092076277-category-leaf.html?.r=1408853888',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("srp_sl_result")',
        }
    },
    // 手机评测等
    {name: '杀价帮3C导购网—真实 客观 独立 自由',
        url: /^http:\/\/www\.shajia\.cn\/article/i,
        exampleUrl: 'http://www.shajia.cn/article_list.php',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("agreement")',
        }
    },
    {name: '机锋网',
        url: /^http:\/\/www\.gfan\.com\/review\/\w+\.html/,
        exampleUrl: 'http://www.gfan.com/review/2014091557751.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="news-content"]',
            relatedObj: true
        }
    },

    // ========================= 知识、阅读 ============================
    {name: '豆瓣-书影音评论',
        url: '^http://.*\\.douban\\.com/subject',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[contains(text(),"后页>")]',
        autopager: {
            pageElement: '//ul[contains(@class,"topic-reply")] | //div[@class="article"]/table | //div[@id="comments" or @class="post-comments"]'
        }
    },
    {name: '我的小组话题 - 豆瓣',
        url: /^http:\/\/www\.douban\.com\/group\//i,
        exampleUrl: 'http://www.douban.com/group/',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[text()="后页>"]',
        autopager: {
            pageElement: 'id("content")/div/div[@class="article"]',
        }
    },
    {name: '豆瓣全站',
        url: '^http://.*\\.douban\\.com/.*',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[contains(text(),"后页>")]',
        autopager: {
            pageElement: 'id("miniblog") | //*[@class="photolst clearfix" or @class="photolst clearbox" or @class="event-photo-list" or @class="poster-col4 clearfix"] | \
            //div[@id="comment-section"] | //table[@class="olt" or @class="list-b"]/tbody | //div[contains(@class,"clearfix")]/div[@class="article"]'
        }
    },
    {name: '知乎',
        url: /^http:\/\/www\.zhihu\.com\/collection/i,
        exampleUrl: 'http://www.zhihu.com/collection/19561986',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("zh-list-answer-wrap")/div[@class="zm-item"]',
            useiframe: true,
                newIframe: true
        }
    },
    {name: '译言网 | 译文库和原文库',
        url: /^http:\/\/(?:article|source)\.yeeyan\.org\//i,
        nextLink: '//ul[contains(concat(" ",normalize-space(@class)," "), " y_page") ]/li/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[contains(concat(" ",normalize-space(@class)," "), "content_box")] | //div[@class="y_l"]/div[@class="y_s_list"]',
            replaceE: '//ul[contains(concat(" ",normalize-space(@class)," "), " y_page") ]'
        }
    },
    {name: '译言精选',
        url: /^http:\/\/select\.yeeyan\.org\//i,
        nextLink: '//ul[contains(@class, "s_page_n")]/li/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("article_list")',
            replaceE: '//ul[contains(@class, "s_page_n")]'
        }
    },
    {name: ' 译言小组',
        url: /^http:\/\/group\.yeeyan\.org\//i,
        nextLink: '//div[@class="paginator"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[contains(@class, "column-main")]/div[contains(@class, "stream")]',
            replaceE: '//div[@class="paginator"]',
        }
    },
    {name: '主题站 | 果壳网 ',
        url: '^http://www\\.guokr\\.com/(?:site|group|ask|event)/',
        nextLink: '//ul[@class="gpages"]/li/a[contains(.,"下一页")]',
        pageElement: '//div[@class="article-list"] | //ul[@class="titles"] | //ul[@class="ask-list"] | //ul[@class="event_list gclear"]',
    },
    {name: '大众点评网',
        url: '^http://www\\.dianping\\.com/.*',
        nextLink: '//a[@class="NextPage" and @title="下一页" and (text()="下一页")]',
        pageElement: '//div[@id="searchList"]',
    },
    {name: '我们一起成长 | 幸福进化俱乐部共同成长博客圈',
        url: /^http:\/\/upwith\.me\//i,
        exampleUrl: 'http://upwith.me/',
        nextLink: '//div[@class="pagination"]/descendant::a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="content"]',
        }
    },
    {name: '知乎日报',
        url: '^http://zhihudaily\\.jd-app\\.com/',
        nextLink: '//h3/a[text()="<<< 前一天"]',
        autopager: {
            pageElement: 'css;body > *',
            separatorReal: false,
        },
        exampleUrl: 'http://zhihudaily.jd-app.com/',
    },

    // ========================= download ===========================
    {name: 'VeryCD搜索页面',
        url: /http:\/\/www\.verycd\.com\/search\/folders.+/i,
        siteExample: 'http://www.verycd.com/search/folders/',
        nextLink: '//ul[@class="page"]//a[contains(text(),"下一页")][@href]',
        autopager: {
            pageElement: '//ul[@id="resultsContainer"]',
            replaceE: 'id("page_html")/ul[@class="page"]',
            lazyImgSrc: '_src'
        }
    },
    {name: "VeryCD分类资源页",
        url: /^http:\/\/www\.verycd\.com\/sto\/.+/i,
        exampleUrl: "http://www.verycd.com/sto/music/page1",
        nextLink: '//div[@class="pages-nav"]/a[text()="下一页 »"]',
        autopager: {
            pageElement: '//div[@id="content"]/ul',
            lazyImgSrc: 'load-src',
            replaceE: '//div[@class="pages-nav"]'
        }
    },
    {name: 'SimpleCD | 让被墙变得简单',
        url: /^http:\/\/www\.simplecd\.me\//i,
        exampleUrl: 'http://www.simplecd.me/search/entry/?query=%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B',
        nextLink: '//td[@class="next"]/a[@class="enabled"]',
        autopager: {
            pageElement: '//div[@class="result-list" or @class="sub-recommend"]/div[@class="content"]',
        }
    },
    {name: '电驴站 爱磁力 iCiLi - 电驴下载站',
        url: /^http:\/\/www\.icili\.com\/emule/i,
        exampleUrl: 'http://www.icili.com/emule',
        nextLink: 'id("main")/div[@class="pager"]/descendant::a[text()=" > "]',
        autopager: {
            pageElement: 'id("main")/ul',
            replaceE: 'id("main")/div[@class="pager"]'
        }
    },
    {name: '射手网',
        url: /^http:\/\/(?:www\.)?shooter\.cn\/search\//i,
        exampleUrl: 'http://www.shooter.cn/search/Elysium/',
        preLink:{
            startAfter:'?page=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?page=',
            mFails:[/^http:\/\/(?:www\.)?shooter\.cn\/search\/[^\/]+/i,'?page=1'],
            inc:1,
        },
        autopager: {
            pageElement: '//div[@id="resultsdiv"]/div[@class="subitem"]',
        }
    },
    {name: "YYeTs 人人影视",
        url: "^http://www\\.yyets\\.com/",
        nextLink: "//div[starts-with(@class, 'pages')]/descendant::a[text()='下一页'] | //div[@class='pages']//a[@class='cur']/following-sibling::a",
        autopager: {
            pageElement: "//div[@class='box_1 topicList'] | //div[@class='box_4 res_listview' or @class='box_4 bg_eb'] | //ul[@class='u_d_list']/li | //ul[@class='allsearch dashed boxPadd6' or @class='dashed bbs_info_list']",
            replaceE: '//div[@class="pages" or @class="pages clearfix"]',
            separatorReal: false
        }
    },
    {name: 'TTmeiju.Com 您的高清美剧片源下载中心',
        url: /^http:\/\/www\.ttmeiju\.com\//i,
        exampleUrl: 'http://www.ttmeiju.com/meiju/Person.of.Interest.html?page=1',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="seedlistdiv" or @class="contentbox"]/table[@class="seedtable"]',
        }
    },
    {name: '电影天堂',
        url: /^http:\/\/www\.dy2018\.com\//i,
        exampleUrl: 'http://www.dy2018.com/html/gndy/dyzz/index.html',
        nextLink: '//div[@class="x"]/descendant::a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="co_area2"]/div[@class="co_content8"]',
        }
    },
    {name: '最新电影 | 龙部落',
        url: /^http:\/\/www\.longbuluo\.com\//i,
        exampleUrl: 'http://www.longbuluo.com/category/movie',
        nextLink: '//div[@class="pagebar"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="postlist"]',
            replaceE: "css;.pagebar"
        }
    },
    {name: '高清连续剧 | 一起下载吧',
        url: /^http:\/\/17down\.net\/category/i,
        exampleUrl: 'http://17down.net/category/tv',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("content")/div[starts-with(@class, "entry_box")]',
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: 'Go下载',
        url: /^http:\/\/goxiazai\.cc\//i,
        exampleUrl: 'http://goxiazai.cc/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("main")/div[@class="post"]',
            replaceE: 'id("pagenavi")'
        }
    },
    {name: '720P电影下载,1080P电影下载,bt蓝光电影下载,BT原盘电影下载：BT之家老牌电影下载网站，百万用户选择了这里',
        url: /^http:\/\/bbs\.1lou\.com\//i,
        exampleUrl: 'http://bbs.1lou.com/forum-index-fid-1183.htm',
        nextLink: '//div[@class="page"]/a[text()="▶"]',
        autopager: {
            pageElement: 'id("threadlist") | id("body")/div/table[@class="post_table"]',
        }
    },
    {name: '很BT电影联盟',
        url: /^http:\/\/henbt\.com\//i,
        exampleUrl: 'http://henbt.com/',
        nextLink: '//div[@class="pages clear"]/a[@class="nextprev"]',
        autopager: {
            pageElement: 'id("btm")/div[@class="main"]/div[@class="box clear"]',
            separatorReal: false,
        }
    },
    // ================== PT ==============================
    {name: '光华，cmct，chd，皇后，hd86，khdbits，hdsky，hdvnbits，hd-sportbits，tccf，皇后mv，mt，hd4fans，hdhc，发烧友，tlfbits，joyhd，蚂蚁pt，清影pt，北邮人，u2',
        url: /^https?:\/\/(?:bt\.upc\.edu|hdcmct|chdbits|open|hd86|khdbits|hdsky|hdvnbits|hd-sportbits|et8|mv\.open|tp\.m-team|www\.hd4fans|www\.hdhc|www\.pt|pt\.eastgame|www\.joyhd|ipv6\.antsoul|ipv4\.antsoul|pt\.hit\.edu|bt\.byr|u2\.dmhy)\.(net|cn|org|com|cd|cc|me|cm)\//i,
        exampleUrl: 'http://hdcmct.org/torrents.php',
        nextLink: '//b[@title="Alt+Pagedown"]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    },
    {name: '葡萄 :: 种子',
        url: /^https:\/\/pt\.sjtu\.edu\.cn\/torrents\.php/i,
        exampleUrl: 'https://pt.sjtu.edu.cn/torrents.php',
        nextLink: '//b[contains(text(), "下一页")]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    },
    {name: '- HDWinG 高清影音人士的分享乐园',
        url: /^https?:\/\/hdwing\.com\/browse\.php/i,
        exampleUrl: 'http://hdwing.com/browse.php',
        nextLink: '//b[contains(text(), "下页")]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents_list"]',
        }
    },
    {name: 'TTG',
        url: /^http:\/\/ttg\.im\/browse\.php/i,
        exampleUrl: 'http://ttg.im/browse.php',
        nextLink: '//b[contains(text(), "下页")]/parent::a',
        autopager: {
        pageElement: 'id("torrent_table")',
        }
    },
    {name: '麦田',
        url: /^http:\/\/pt\.nwsuaf6\.edu\.cn\/torrents\.php/i,
        exampleUrl: 'http://hdcmct.org/torrents.php',
        nextLink: '//b[contains(text(), "下一页")]/parent::a[@class="next"]',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    },
    {name: '乐乎网-有乐乎！',
        url: '^http://www\\.ulehu\\.com/',
        nextLink: '//a[@class="a1" and (text()="下一页")]',
        pageElement: '//body/div[@class="container mt20"]/div[@class="content"]/div[@class="colMain"]/div',
        exampleUrl: 'http://www.ulehu.com/',
    },
    {name: 'HDRoad - 资源区',
        url: /^http:\/\/hdroad\.org\/browse\.php/i,
        exampleUrl: 'http://hdroad.org/browse.php',
        nextLink: '//a[contains(text(), "下一页")]',
        autopager: {
            pageElement: '//div[@id="torrent-list"]',
        }
    },
    {name: '种子列表-北京交通大学知行PT',
        url: '^http://pt\\.zhixing\\.bjtu\\.edu\\.cn/search/',
        nextLink: '//a[@class="next"]',
        pageElement: '//table[@class="torrenttable"]',
        exampleUrl: 'http://pt.zhixing.bjtu.edu.cn/search/',
    },
    {name: '紫荆站 | ZiJingBT v2 | 种子页',
        url: /^http:\/\/zijingbt\.njuftp\.org\//i,
        exampleUrl: 'http://zijingbt.njuftp.org/index.html',
        nextLink: '//a[contains(text(), "下一页")]',
        autopager: {
            pageElement: '//table[@class="torrent_table"]',
        }
    },

    // ========================= bbs、blog ======================
    {name: '天涯论坛_帖子列表',
        url: '^http://bbs\\.tianya\\.cn/list',
        nextLink: '//a[text()="下一页"]',
        pageElement: '//div[@class="mt5"]',
    },
    {name: '天涯论坛帖子',
        url:/http:\/\/bbs\.tianya\.cn\/.+\.shtml/i,
        siteExample:'http://bbs.tianya.cn/post-feeling-2792523-1.shtml',
        nextLink:'//div[@class="atl-pages"]/descendant::a[text()="下页"][@href]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="atl-main"]',
            lazyImgSrc: 'original',
            filter: function(pages){
                var see_only_uname = unsafeWindow.see_only_uname;
                var setOnlyUser = unsafeWindow.setOnlyUser;
                if(see_only_uname){
                    setOnlyUser(see_only_uname);
                }
            }
        }
    },
    {name: 'mozest社区',
        url: /^https?:\/\/g\.mozest\.com/i,
        nextLink: '//div[@class="pages"]//a[@class="next"]',
        autopager: {
            pageElement: '//div[@id="threadlist"] | //div[@id="postlist"]',
            useiframe: true,
            replaceE: 'css;.pages_btns > .pages'
        }
    },
    {name: 'Firefox中文社区 - 列表',
        url: '^https?://www\\.firefox\\.net\\.cn/thread',
        nextLink: '//div[@class="pages"]/a[contains(text(), "下一页")]',
        autopager: {
            pageElement: 'id("J_posts_list")',
            replaceE: 'css;.pages',
            documentFilter: function(doc) {
                // 头像载入出错的修正
                [].forEach.call(doc.querySelectorAll('img.J_avatar'), function(img){
                    img.setAttribute('onerror', 'this.src="http://www.firefox.net.cn/res/images/face/face_small.jpg";');
                });
            }
        }
    },
    {name: 'Firefox中文社区 - 帖子',
        url: '^https?://www\\.firefox\\.net\\.cn/read',
        nextLink: '//div[@class="pages"]/a[contains(text(), "下一页")]',
        autopager: {
            pageElement: 'id("J_posts_list")/*',
            useiframe: true,
                newIframe: true
        }
    },
    {name: 'Mozilla Addons - 用户信息',
        url: /^https:\/\/addons\.mozilla\.org\/zh-CN\/[^\/]+\/user\//i,
        exampleUrl: 'https://addons.mozilla.org/zh-CN/firefox/user/Vasiliy_Temnikov/',
        nextLink: '//p[@class="rel"]/a[@class="button next"]',
        autopager: {
            pageElement: 'id("my-addons")',
            relatedObj: true,
        }
    },
    {name: 'Mozilla Addons',
        url: /^https?:\/\/addons\.mozilla\.org\/[^\/]+\/firefox/i,
        siteExample: 'https://addons.mozilla.org/zh-CN/firefox/',
        nextLink: '//p[@class="rel"]/a[@class="button next"][@href] | //ol[@class="pagination"]/li/a[@rel="next"][@href]',
        autopager: {

            pageElement: '//div[@id="pjax-results" or @class="separated-listing"]/div[@class="items"] | //section[@class="primary"]/div/div[@class="items"] | //ul[@class="personas-grid"] | //div[@id="my-addons"] | //div[@id="reviews"]',
            relatedObj: true,
            replaceE: 'css;.paginator'
        }
    },
    {name: '搜索 | Mozilla 技术支持',
        url: '^https://support\\.mozilla\\.org/zh-CN/search\\?',
        exampleUrl: 'https://support.mozilla.org/zh-CN/search?esab=a&product=firefox&q=%E7%BE%A4%E7%BB%84',
        nextLink: '//a[@class="btn-page btn-page-next" and contains(text(),"下一个")]',
        autopager: {
            pageElement: '//div[@id="search-results"]/div[@class="grid_9"]/div[@class="content-box"]',
        }
    },
    {name: '傲游浏览器-插件中心',
        url: "^http://extension\\.maxthon\\.cn/",
        nextLink: '//div[@class="pages page-right"]/a[text()=">"]',
        pageElement: '//ul[@id="delegate-all"]'
    },
    {name: "小米手机官方论坛",
        url: "^http://bbs\\.xiaomi\\.cn/",
        nextLink: "//a[@class='nxt' and (text()='下一页')]",
        autopager: {
            pageElement: "id('postlist') | id('threadlist')",
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
            documentFilter: function(doc) {
                var firstDiv = doc.querySelector("div[id^='post_']");
                if (firstDiv) {
                    firstDiv.parentNode.removeChild(firstDiv);
                }
            }
        }
    },
    {name: '棋友家园',
        url: /^http:\/\/www\.weiqitv\.com\/home\/forum/i,
        exampleUrl: 'http://www.weiqitv.com/home/forum.php?mod=viewthread&tid=1623&extra=&page=1',
        nextLink: '//div[@class="pg"]/a[@class="nxt"]',
        autopager: {
            pageElement: 'id("threadlisttableid") | id("postlist")',
            useiframe: true,
        }
    },
    {name: 'Discuz X2.5修复',
        url:/^http?:\/\/(bbs.gfan|bbs.xda|bbs.weiphone|bbs.feng|www.weiqitv|www.diypda|f.ppxclub|bbs.sd001|bbs.itiankong)\.(com|cn)/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="threadlist"] | //div[@id="postlist"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
        }
    },
    {name: '威锋论坛搜索',
        url: /^http:\/\/s\.feng\.com\/f\?srchtxt=/i,
        nextLink: '//div[@class="pages"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@id="searchresult"]',
            replaceE: '//div[@class="pages"]'
        }
    },
    {name: 'Discuz 页面跳转修复',
        url:/^http:\/\/(bbs.pcbeta|bbs.besgold|www.pt80)\.(com|net)/i,
        nextLink:'//div[@class="pg"]/descendant::a[@class="nxt"]',
        autopager:{
            pageElement:'//div[@id="postlist"] | //form[@id="moderate"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
        }
    },
    {name: 'vBulletin论坛 加加/看雪/XDA',
        url:/http:\/\/(bbs|forum)\.(jjol|pediy|xda-developers)\.(cn|com)\/(forumdisplay|showthread)/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="posts"]/div[@align="center"] | //table[@class="tborder"][@id="threadslist"]',
        }
    },
    {name: 'xda-developers',
        url: "^http://forum\\.xda-developers\\.com/",
        nextLink: "//td[@class='alt1']/a[@rel='next']",
        autopager: {
            pageElement: "//table[@id='threadslist'] | //div[@id='posts']",
            replaceE: "//div[@class='pagenav']/table[@class='pagenavControls']",
            separatorReal: false
        }
    },
    {name: '玩机圈',
        url: /^http:\/\/www\.wanjiquan\.com\//i,
        exampleUrl: 'http://www.wanjiquan.com/forum-169-1.html',
        nextLink: 'css;.ma_tiezi_list_page > .next',
        autopager: {
            pageElement: '//form[@id="moderate"] | id("postlist")',
        }
    },
    {name: '极限社区',
        url: '^http://bbs\\.themex\\.net/',
        nextLink: '//a[@rel="next"]',
        pageElement: 'id("threadslist posts")',
    },
    {name: '天坛',
        url:/http:\/\/bbs\.waptw\.com/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]',
        }
    },
    {name: '铁血社区',
        url:/^http:\/\/bbs\.tiexue\.net\/.*\.html$/i,
        nextLink:'//div[@class="pages"]/span/a[text()=">>"]',
        autopager:{
            pageElement:'//div[@class="posts_list"]',
        }
    },
    {name: '铁血网',
        url:/http:\/\/[a-z]+\.tiexue\.net/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="fontListBox"]',
        }
    },
    {name: '霏凡论坛 - 帖子列表',
        url:/http:\/\/bbs\.crsky\.com\/read\.php/i,
        nextLink:'//div[@class="pages"]//a[text()=">"]',
        autopager:{
            // useiframe:true,
            pageElement:'//div[@class="t5 t2"]',
        }
    },
    {name: '虎扑篮球论坛',
        url: /^http:\/\/bbs\.hupu\.com\//i,
        exampleUrl: 'http://bbs.hupu.com/8173461.html',
        nextLink: 'id("j_next")',
        autopager: {
            pageElement: '//div[@id="t_main"]/div[@class="floor"] | //table[@id="pl"]',
            replaceE: 'css;.page'
        }
    },
    {name: '人大经济论坛',
        url:/http:\/\/bbs\.pinggu\.org\/thread/i,
        siteExample:'http://bbs.pinggu.org/thread-1562552-3-1.html',
        nextLink:'//div[@id="pgt"]/descendant::a[@class="nxt"]',
        autopager:{
            pageElement:'//div[@id="postlist"]',
        }
    },
    {name: '九尾网',
        url:/joowii\.com\/arc/i,
        siteExample:'http://www.joowii.com/arc/ysyl/ssgx/2012/0905/125571.html',
        nextLink:'auto;',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="article"]',
        }
    },
    {name: '17173.com中国游戏第一门户站',
        url: '^http://news\\.17173\\.com/content/.*\\.shtml',
        nextLink: '//a[@class="page-next"]',
        pageElement: '//div[@id="matterc"]',
    },
    {name: '游侠网',
        url: /^http:\/\/(?:www|down)\.ali213\.net\//i,
        exampleUrl: 'http://www.ali213.net/news/html/2013-12/91377.html',
        nextLink: 'auto;',
        // nextLink: '//a[@id="after_this_page"][@href] | //div[@class="p_bar"]/a[text()="下页"] | //div[@class="list_body_page"]/a[@title="下一页"]',
        autopager: {
            pageElement: '//div[@id="Content" or @id="game_content" or @id="rqjxhb"]',
            relatedObj: true,
            lazyImgSrc: 'data-original'
        }
    },
    {name: '游民星空',
        url:/http:\/\/www\.gamersky\.com/i,
        siteExample:'http://www.gamersky.com/news/201207/206490.shtml',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="act mid"]',
            relatedObj: true
        }
    },
    {name: '3DMGAME',
        url:/http:\/\/www\.3dmgame\.com\/.*\.html/i,
        siteExample:'http://www.3dmgame.com/news/201312/2310792.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="QZmainL"]/div/div[contains(@class, "con")]',
            relatedObj: true,
        }
    },
    {name: '猴岛论坛',
        url:/^http:\/\/bbs\.houdao\.com/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="z threadCommon"] | //div[@class="mb10 bodd"]',
        }
    },
    {name: '178 魔兽世界、178动漫频道',
        url: /^http:\/\/[a-z]+\.178\.com\/.*\.html/i,
        exampleUrl: 'http://wow.178.com/201308/170546277543.html',
        nextLink: 'id("cms_page_next")',
        autopager: {
            pageElement: '//div[@id="text"]',
            replaceE: '//div[@class="page"]',
            relatedObj: true
        }
    },
    {name: '阡陌居',
        url:/http:\/\/www\.1000qm\.com\/(?:thread\.php\?fid\-\d+|read\.php\?tid\-\d+)\.html/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="z threadCommon"] | //div[@id="pw_content"][@class="mb10"]',
        }
    },
    {name: '煎蛋首页',
        url:/http:\/\/jandan\.net\/(?:page)?/i,
        siteExample:'http://jandan.net/',
        useiframe:true,
        nextLink:'//div[@class="wp-pagenavi"]/child::a[text()=">"] | //p[@class="cp-pagenavi"]/a[text()="»"]',
        autopager:{
           pageElement:'//div[@id="content"] | id("comments")'
        }
    },
    {name: '蜂鸟网',
        url:/http:\/\/qicai\.fengniao\.com\/\d+\/\d+.html/i,
        siteExample:'http://qicai.fengniao.com/370/3705137.html',
        useiframe:true,
        nextLink:'auto;',
        autopager:{
            remain:1/3,
            relatedObj:['css;div.page_num','bottom'],
            pageElement:'//div[@class="article"]',
        }
    },
    {name: '55188论坛',
        url:/http:\/\/www\.55188\.com/i,
        siteExample:'http://www.55188.com/forum-8-1.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="mainbox threadlist"] | //div[@class="mainbox viewthread"]',
        }
    },
    {name: 'PCHOME 社区',
        url:/http:\/\/club\.pchome\.net/i,
        siteExample:'http://club.pchome.net/forum_1_15.html#',
        nextLink:'auto;',
        autopager:{
             pageElement:'//form[@id="mytopics"] | //div[@id="weibo_app"]',
        }
    },
    {name: 'pconline',
        url: '^http://[a-z]+\\.pconline\\.com\\.cn/',
        nextLink: '//div[contains(@class, "pconline_page") or contains(@class, "pager")]/a[@class="next"]',
        autopager: {
            pageElement: '//div[@id="article"]//div[@class="content"] | //ul[@id="ulHoverPic"] | //table[@class="posts"] | id("post_list") | id("topicList")',
            relatedObj: true,
            replaceE: 'css;.pconline_page',
        },
        exampleUrl: 'http://diy.pconline.com.cn/377/3774616.html',
    },
    {name: 'Chiphell',
        url: /^http:\/\/www\.chiphell\.com\/(?!forum)/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("ct")/div[@class="mn"]/div[@class="bm"]/div[@class="bm_c xld"] | id("article_content")/../..',
            replaceE: '//div[@class="pg"]',
        }
    },
    {name: '糗事百科',
        url: '^http://www\\.qiushibaike\\.com/',
        nextLink: '//a[@class="next" and @title="下一页"]',
        autopager: {
            pageElement: '//div[@class="main"]/div[contains(@class, "content-block")]/div[@class="col1"]',
            stylish: '.sp-separator { width: 620px !important; }'
        }
    },
    {name: '抽屉新热榜',
        url: /^http:\/\/dig\.chouti\.com\//i,
        nextLink: '//a[@class="ct_page_edge" and (text()="下一页")]',
        autopager: {
            pageElement: '//div[@id="content-list"]',
            lazyImgSrc: 'original',
            filter: function(pages){
                var chouti = unsafeWindow.chouti;
                var NS_links_comment_top = unsafeWindow.NS_links_comment_top;
                chouti.vote();
                chouti.addCollect();
                chouti.shareweibo();
                chouti.playVido();
                NS_links_comment_top.init();
            }
        }
    },
    {name: '猫扑大杂烩帖子',
        url:/http:\/\/dzh\.mop\.com\/topic\/readSub/i,
        nextLink:'//a[contains(text(),"下一页")][@href]',
        autopager:{
            pageElement:'//div[@class="huitie"]',
        }
    },
    {name: '猫扑数码、猫扑汽车等',
        url: /^http:\/\/(?!dzh).*\.mop\.com\/.*\.shtml/i,
        exampleUrl: 'http://digi.mop.com/sjsj/140522002176016.shtml',
        nextLink: 'id("nextp") | id("page_use")/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@id="article"] | //div[@class="content"]/div[@class="inner"]/div[@class="nr_con"]',
                replaceE: '//div[@class="page"]',
            relatedObj: true,
        }
    },
    {name: '色影无忌帖子',
        url:/http:\/\/forum\.xitek\.com\/showthread/i,
        siteExample:'http://forum.xitek.com/showthread.php?threadid=571986',
        nextLink:'//font[@size="2"]/font[@class="thtcolor"]/following-sibling::a[@href]',
        autopager:{
            pageElement:'//body/table[position()>2 and position()<(last()-2)]',
        }
    },
    {name: '19楼帖子',
        url:/^http:\/\/www\.19lou\.com/i,
        siteExample:'http://www.19lou.com/forum-1502-thread-29762777-1-1.html',
        nextLink:'auto;',
        useiframe:true,
        autopager:{
            useiframe:true,
            pageElement:'//form[@name="postForm"] | //form[@name="manageForm"]',
        }
    },
    {name: 'blogspot',
        url: '^http://[^./]+\\.(blogspot|playpcesor)(?:\\.[^./]{2,3}){1,2}/(?!\\d{4}/)',
        exampleUrl: 'http://program-think.blogspot.com/  http://www.playpcesor.com/',
        nextLink: '//a[contains(concat(" ", @class, " "), " blog-pager-older-link ")]',
        autopager: {
            pageElement: '//div[contains(concat(" ", @class, " "), " hfeed ") or contains(concat(" ", @class, " "), " blog-posts ")] | id("Blog1")/div[contains(concat(" ", @class, " "), " entry ")]',
            relatedObj: true,
            replaceE: "css;#blog-pager"            }
    },
    {name: '北海365网',
        url: /^http:\/\/[a-z]+\.beihai365\.com\//i,
        exampleUrl: 'http://kj.beihai365.com/',
        nextLink: '//div[@class="pages"]/*[contains(concat(" ",normalize-space(@class)," "), " active ")]/following-sibling::a[1]',
        autopager: {
            pageElement: 'id("threadlist")/tr[@class="tr3"] | id("pw_content")//form[@method="post" and @name="delatc"]',
            replaceE: '//div[@class="pages"]',
        }
    },
    {name: 'gelbooru, safebooru etc',
        url: '^http://(?:www\\.)?\\w{3,4}booru\\.(?:com|org)',
        nextLink: 'id("paginator")//b/following-sibling::a[1]',
        pageElement: 'id("post-list")/div[@class="content"]//span[contains(@class,"thumb")]|id("content")/table',
        exampleUrl: 'http://gelbooru.com/index.php?page=post&s=list http://safebooru.org/index.php?page=post&s=list&tags=all http://safebooru.org/index.php?page=tags&s=list'
    },
    {name: '耳机大家坛 全球最大中文耳机论坛',
        url: /^http:\/\/www\.erji\.net\//i,
        exampleUrl: 'http://www.erji.net/thread.php?fid=138',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)]',
        autopager: {
            pageElement: '//table[@id="ajaxtable"] | //div[@id="main"]/form[@method="post"]',
            replaceE: '//div[@class="pages"]'
        }
    },
    {name: '艾泽拉斯国家地理论坛',
        url: /^http:\/\/(?:bbs\.ngacn\.cc|nga\.178\.com)\//i,
        exampleUrl: 'http://bbs.ngacn.cc/thread.php?fid=390&rand=183',
        nextLink: '//a[@title="下一页"][@href]',
        autopager: {
            pageElement: 'id("topicrows") | id("m_posts_c")',
            useiframe: true,
            separatorReal: false,
        }
    },
    {name: 'Final Fantasy Shrine Forums',
        url: /^http:\/\/forums\.ffshrine\.org\//i,
        exampleUrl: 'http://forums.ffshrine.org/general-discussion/',
        nextLink: '//a[@rel="next"][@href]',
        autopager: {
            pageElement: 'id("thread_inlinemod_form") | id("postlist")',
        }
    },
    {name: '天猫魔盒论坛',
        url: '^http://www\\.znds\\.com/*',
        nextLink: '//a[contains(text(), "下一页")]',
        pageElement: 'id("threadlist")/div[@class="bm_c"]',
        exampleUrl: 'http://www.znds.com/bbs-172-3.html',
    },
    {name: 'Mobile01',
        url: /^http:\/\/www\.mobile01\.com\/topicdetail\.php.*$/i,
        exampleUrl: 'http://www.mobile01.com/topicdetail.php?f=254&t=3966939',
        nextLink: '//a[contains(text(), "下一頁")]',
        autopager: {
            pageElement: 'id("section")/div[@class="main"]/div[@class="forum-content"]',
        }
    },
    {name: '昆侖 - 资源/连载',
        url: '^http://bbs\\.ikunlun\\.net/forum\\.php.*$',
        nextLink: '//a[@class="now"]/following-sibling::a[1][not(@class="last") ]',
        pageElement: '//tr[@class="topic_list_row"]',
    },

    // ========================= picture ================================================
    {name: 'Flickr搜索',
        url:/http:\/\/www\.flickr\.com\/search\/\?q=/i,
        siteExample:'http://www.flickr.com/search/?q=opera',
        nextLink:'//div[@class="Paginator"]/a[@class="Next"][@href]',
        autopager:{
            pageElement:'//div[@id="ResultsThumbsDiv"]',
            replaceE:'//div[@class="Paginator"]',
        }
    },
    {name: 'Flickr photos',
        "url": "^http://www\\.flickr\\.com/photos/[^/]+/favorites(?:[/?#]|$)",
        "nextLink": "id(\"paginator-module\")/descendant::a[contains(concat(\" \", @class, \" \"), \" Next \")]",
        "pageElement": "id(\"faves\")",
        "insertBefore": "//div[@class=\"Pages\"]"
    },
    {name: 'pixiv',
        url:/http:\/\/www\.pixiv\.net\//i,
        siteExample:'http://www.pixiv.net/search.php?s_mode=s_tag_full&word=%E8%85%90 or http://www.pixiv.net/novel/ranking.php',
        nextLink:'//*[@class="next"]/a[@rel="next"][@href]',
        autopager:{
            pageElement:'//ul[contains(@class, "autopagerize_page_element")] | //section[contains(@class, "autopagerize-page-element")] | //div[@class="column-content"]/ul[contains(@class, "tag-list")]',
            relatedObj: true,
            replaceE: 'css;.pager-container > .page-list'
        }
    },
    {name: '照片处理网',
        url:/http:\/\/www\.photops\.com\/Article\/.+/i,
        siteExample:'http://www.photops.com/Article/xsjc/20100728172116.html',
        nextLink:'//a[text()="下一页"][@href]',
        autopager:{
            pageElement:'//body/table[last()-2]',
            useiframe:true,
        }
    },
    {name: '扑家汉化平台',
        url:/^http:\/\/www\.pujiahh\.com\/library/i,
        siteExample:'http://www.pujiahh.com/library/',
        nextLink:'//div[@class="pagination"]/ul/li[@class="next-posts"]/a',
        autopager:{
            pageElement:'//div[@class="gametable"]/parent::div',
            replaceE: '//div[@class="pagination"]'
        }
    },
    // === art
    {name: 'deviantART Gallery',
        url: /^https?:\/\/\w+\.deviantart\.com\/gallery\//i,
        exampleUrl: 'https://razielmb.deviantart.com/gallery/',
        nextLink: '//li[@class="next"]/a',
        autopager: {
            pageElement: 'css;#gmi-ResourceStream',
            relatedObj: true
        }
    },
    // === mm ===
    {name: 'Show妹子',
        url:/^http:\/\/www\.showmeizi\.com\/\w+\/\d+/i,
        siteExample:'http://www.showmeizi.com/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="post image"]/div[@class="main-body"]',
        }
    },
    {name: 'Beautyleg腿模写真图片网',
        url:/^http:\/\/www\.beautylegmm\.com\/\w+\/beautyleg-\d+.html/i,
        siteExample:'http://www.beautylegmm.com/x/beautyleg-x.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'id("contents_post")/div[@class="post"]',
        }
    },
    {name: 'Rosi美女图',
        url:/^http:\/\/www\.rosiyy\.com\/.*.html/i,
        siteExample:'http://www.rosiyy.com/x/x.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="clearfix"]/div[@class="grid_10"]/div[@class="post postimg"]/p/a',
        }
    },
    {name: '7160美女图片',
        url: '^http://www\\.7160\\.com/*/*/',
        nextLink: '//a[text()="下一页"]',
        pageElement: 'id("arc")/div/div/div/a/img',
        exampleUrl: 'http://www.7160.com/meinv/11988/',
    },
    {name: '七丽丽图库|7lili.com',
        url: '^http://www\\.7lili\\.com/.+/.+/.+/.+\\.html',
        nextLink: '//a[text()="下一页"]',
        pageElement: '//div/div/div/a/img',
        exampleUrl: 'http://www.7lili.com/p/xinggan/201403/30333.html',
    },
    {name: '极品妹妹吧',
        url: '^http://www\\.jpmm8\\.com/html/*/',
        nextLink: '//a[text()="下一页"]',
        pageElement: '//div/div/div/a/img',
        exampleUrl: 'http://www.jpmm8.com/html/wlmm/12163.html',
    },
    {name: '明星网',
        url: '^http://tuku\\.mingxing\\.com/*',
        nextLink: '//a[@title="下一页"]',
        pageElement: '//div/div/div/div/p/a/img',
        exampleUrl: 'http://tuku.mingxing.com/xiezhen/30820/1.html',
    },
    {name: 'kds模特大本营',
        url: '^http://model\\.kdslife\\.com/show/photo/*',
        nextLink: '//a[contains(text(), "下一张")]',
        pageElement: 'id("mainPic")',
        exampleUrl: 'http://model.kdslife.com/show/photo/20256.html',
    },
    // === 壁纸、素材、icon
    {name: '桌酷壁纸',
        url: /^http:\/\/www\.zhuoku\.com\/.*\.htm/i,
        exampleUrl: 'http://www.zhuoku.com/zhuomianbizhi/computer-kuan/20140107052306.htm',
        nextLink: '//div[@class="turn"]/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("liebiao")',
        }
    },
    {name: '统一壁纸站',
        url: '^http://www\\.3987\\.com/desk/wall/*',
        nextLink: '//a[@hidefocus="true" and @target="_self" and @title="下一页"]',
        pageElement: 'id("Article")/div[@class="big-pic"]',
        exampleUrl: 'http://www.3987.com/desk/wall/31420.html',
    },
    {name: '素材天下',
        url: /^http:\/\/www\.sucaitianxia\.com\//i,
        exampleUrl: 'http://www.sucaitianxia.com/psd/Index.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="home_19"]/div[@class="left"]/div[@class="mid"]',
        }
    },
    {name: '昵图网',
        url: /^http:\/\/[a-z]+\.nipic\.com\//i,
        exampleUrl: 'http://soso.nipic.com/search.aspx?t=tk&q=%B7%E2%C3%E6',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("bd") | //ul[@class="search-result-box clearfix"] | //center/table[@width="900" and @cellspacing="0" and @cellpadding="0" and @border="0"]',
            lazyImgSrc: "data-original",
            stylish: '.lazy { display: block; }'
        }
    },
    {name: 'easyicon.net',
        url: '^http://www\\.easyicon\\.net/iconsearch/',
        nextLink: '//div[@class="pages_all"]/a[text()="下一页>"]',
        pageElement: 'id("result_right_layout")',
        exampleUrl: 'http://www.easyicon.net/iconsearch/feed/&color=black',
    },
    {name: 'iconarchive',
        url: '^http://www\\.iconarchive\\.com/search\\?q=*',
        nextLink: '//div[@class="pagination"]/a[@class="next"]',
        pageElement: 'id("layout-search-content")',
        exampleUrl: 'http://www.iconarchive.com/search?q=pin',
    },
    {name: 'Find Icons',
        url: '^http://findicons\\.com/search/',
        nextLink: '//div[@class="pages"]/a[contains(text(), "Next") or contains(text(), "下一页")]',
        pageElement: 'id("search_con")/div[@class="icon_list icon_list_165"]',
        exampleUrl: 'http://findicons.com/search/earth',
    },

    // ========================= software ================================
    {name: '小众软件',
        url: 'http://www\\.appinn\\.com/',
        nextLink: '//a[@class="nextpostslink"]',
        pageElement: '//div[@id="spost"]',
    },
    {name: '善用佳软',
        url: /^http:\/\/xbeta\.info\/page\//i,
        exampleUrl: 'http://xbeta.info/page/2',
        nextLink: '//div[@class="wp-pagenavi"]/a[@class="nextpostslink"]',
        autopager: {
            pageElement: 'id("entries-in")/div[@class="post"]',
            replaceE: "css;#entries-in > .wp-pagenavi"
        }
    },
    {name: '异次元软件世界',
        url: /^http:\/\/www\.iplaysoft\.com\//i,
        exampleUrl: 'http://www.iplaysoft.com/tag/%E5%90%8C%E6%AD%A5',
        nextLink: '//span[@class="pagenavi_c"]/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("postlist")/div[@class="entry"]',
            replaceE: '//div[@class="pagenavi"]/span[@class="pagenavi_c"]'
        }
    },
    {name: 'PlayNext - 低调的异次元',
        url: '^http://www\\.playnext\\.cn/',
        nextLink: '//div[@class="pagenavi"]/a[contains(text(), "下一页")]',
        pageElement: '//div[@id="container"]/div[@class="content"]/div[@class="post-list"]',
    },
    {name: 'iPc.me - 与你分享互联网的精彩！',
        url: '^http://www\\.ipc\\.me/',
        nextLink: '//div[@class="pagenavi"]/a[contains(text(), "下一页")]',
        pageElement: 'id("posts-list")',
    },
    {name: '独木成林',
        url: '^http://www\\.guofs\\.com/',
        nextLink: '//a[@class="nextpostslink"]',
        pageElement: 'id("content")',
        exampleUrl: 'http://www.guofs.com/',
    },
    {name: '软件淘',
        url: '^http://www\\.65052424\\.com/',
        nextLink: '//a[@class="next"]',
        pageElement: '//div[@id="content"]',
        exampleUrl: 'http://www.65052424.com/page/7',
    },
    {name: 'portableapps',
        url: '^http://portableapps\\.com/(?:forums|node)/',
        nextLink: '//li[@class="pager-next"]/a',
        pageElement: 'id("forum")/table|id("comments")/*[not(@class="item-list")]'
    },
    {name: 'PortableAppC - 有中国特色的便携软件',
        url: /^http:\/\/www\.portableappc\.com\//i,
        exampleUrl: 'http://www.portableappc.com/',
        nextLink: '//a[@class="nextpostslink"]',
        autopager: {
            pageElement: 'id("main")/div[@class="box"]',
            replaceE: '//div[@class="wp-pagenavi"]'
        }
    },
    {name: '精品绿色便携软件',
        url: '^http://www\\.portablesoft\\.org/',
        nextLink: '//div[@class="pagination"]/a[text()="下页 ›"]',
        pageElement: 'id("main")/div[@class="post-entry"]'
    },
    {name: 'zd423',
        url: /^http:\/\/www\.zdfans\.com\//i,
        exampleUrl: 'http://www.zdfans.com/',
        nextLink: '//div[@class="paging"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="wrapper"]/div[@class="content-wrap"]/div[@class="content column2"]/ul[@class="excerpt"]',
        }
    },
    {name: '软件阁 - 原创绿色软件更新,精品软件共享',
        url: /^http:\/\/www\.lite6\.com\//i,
        exampleUrl: 'http://www.lite6.com/',
        nextLink: '//li[@class="next"]/a',
        autopager: {
            pageElement: '//div[@class="main"]/div[@class="left"]',
        }
    },
    {name: 'Yanu | 分享优秀、纯净、绿色、实用的精品软件',
        url: '^http://www\\.ccav1\\.com/*',
        nextLink: 'id("content-list")/div[@class="pagination"]/a[text()="下页"]',
        pageElement: '//div[@id="content-list"]',
        exampleUrl: 'http://www.ccav1.com/',
    },
    {name: '绿软家园(绿色下载站)',
        url: /^http:\/\/www\.downg\.com\/.*\.html/i,
        exampleUrl: 'http://www.downg.com/list/r_1_1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="cp top-list" or @class="cp software-list"]/div[@class="cp-main"]',
        }
    },
    {name: '绿色下载吧',
        url: /^http:\/\/www\.xiazaiba\.com\//,
        exampleUrl: 'http://www.xiazaiba.com/newsoft.html',
        nextLink: '//div[@class="page-num" or @class="ylmf-page"]/a[@class="nextprev"]',
        autopager: {
            pageElement: 'id("j_soft_list") | //ul[@class="list-soft list-soft-title j-hover"]',
        }
    },
    {name: '下载银行',
        url: /^http:\/\/www\.downbank\.cn\/.*\.htm/i,
        exampleUrl: 'http://www.downbank.cn/soft/html/newlist-1.htm',
        nextLink: '//p[@class="list_page"]/a[text()="下一页"] | id("NextPageText")//a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@id="topiclistzone"] | id("content")/div[@class="listitem"]/div[@class="cp-main"]',
        }
    },
    {name: '小路工作室',
        url: /^http:\/\/www\.wzlu\.cc\/.*\.html/i,
        exampleUrl: 'http://www.wzlu.cc/soft/html/newlist-1.html',
        nextLink: '//p[@class="list_page"]/a[text()="下一页"] | id("NextPageText")//a[text()="下一页"]',
        autopager: {
            pageElement: 'id("topiclistzone") | id("listbox")',
        }
    },
    {name: '心海e站',
        url: /^http:\/\/hrtsea\.com\//i,
        exampleUrl: 'http://hrtsea.com/',
        nextLink: 'id("pagenavi")/span[@class="older"]/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("main")',
        }
    },
    {name: '天天资源网',
        url: /^http:\/\/www\.ttrar\.com\//i,
        exampleUrl: 'http://www.ttrar.com/',
        nextLink: '//div[@id="page"]/a[text()="..."] | //div[@class="page"]/a[text()="下一页"]',
        autopager: {
            pageElement: '//ul[@class="articlelist-ul"]',
            replaceE: "css;#page, .page"
        }
    },
    {name: '重灌狂人',
        url: /^http:\/\/briian\.com\//i,
        exampleUrl: 'http://briian.com/category/android/android-photos-draw',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("content")',
        }
    },
    {name: '天天软件',
        url: /^http:\/\/www\.tt7z\.com\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//ul[@class="articlelist-ul"]',
            replaceE: '//div[@id="left_content_list"]/div[@class="page"]'
        }
    },
    {name: 'Sublime text - Packages',
        url: '^https://sublime\\.wbond\\.net/browse',
        nextLink: '//nav[@class="pagination"]/a[@class="selected"]/following::a[1]',
        pageElement: '//div[@id="content"]/div[@class="results"]/ul[@class="packages results"]',
    },

    // ========================= dev =================================
    {name: 'User Scripts',
        url: /^https?:\/\/userscripts\.org/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("review-list") | //tr[starts-with(@id, "scripts-")] | //tr[starts-with(@id, "posts-")]',
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: 'User scripts on Greasy Fork',
        url: /^https:\/\/greasyfork\.org/i,
        nextLink: '//a[@rel="next"]',
        autopager: {
            pageElement: 'id("browse-script-list") | id("Content")/ul',
        }
    },
    {name: 'User Styles',
        url: /^https?:\/\/(?:forum\.)?userstyles\.org\//i,
        nextLink: ['//a[@class="Next" and text()="›"]', 'auto;'],
        autopager: {
            pageElement: '//article[starts-with(@class,"style-brief")] | id("Content")/ul[@class="DataList Discussions"]',
            replaceE: 'css;.pagination'
        }
    },
    {name: '博客园',
        url: '^http://www\\.cnblogs\\.com/.*$',
        nextLink: '//a[(text()="Next >")]',
        pageElement: '//div[@id="post_list"]',
        exampleUrl: 'http://www.cnblogs.com/cate/javascript/',
    },
    {name: '开源中国',
        url: '^http://\\w+\\.oschina\\.net/',
        nextLink: '//li[@class="page next"]/a',
        pageElement: '//div[@class="code_list"]/ul | //div[@class="ProjectList"]/ul[@class="List"] | id("OSC_Content")/div[@class="SpaceList BlogList"]/ul | \
            id("OSC_Content")/div[@class="QuestionList"]/ul/li[@class="question"]',
    },
    {name: 'CSDN博客',
        url:/http:\/\/blog\.csdn\.net/i,
        siteExample:'http://blog.csdn.net/wangjieest?viewmode=list',
        nextLink:'//div[@id="papelist"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="article_list"]'
        }
    },
    {name: 'CSDN论坛',
        url:/^http:\/\/bbs\.csdn\.net\/forums\//i,
        siteExample:'http://bbs.csdn.net/forums/Qt',
        nextLink:'//div[@class="page_nav"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//body/div/div[@class="content"]/table',
            replaceE:'//div[@class="page_nav"]',
        }
    },
    {name: 'CSDN话题',
        url:/^http:\/\/bbs\.csdn\.net\/topics\//i,
        siteExample:'http://bbs.csdn.net/topics/390244325',
        nextLink:'//div[@class="control_area"]/descendant::a[@class="next"]',
        autopager:{
            pageElement:'//div[@class="detailed"]',
            replaceE:'//div[@class="control_area"]',
        }
    },
    {name: '51CTO',
        url:/^http:\/\/\w+\.51cto\.com\/\w+\/\d+\/\w+\.htm/i,
        siteExample:'http://developer.51cto.com/art/201007/214478.htm',
        nextLink:'auto;',
        autopager:{
            useiframe:false,
            relatedObj:['css;#content','bottom'],
            pageElement:'css;#content>p'
        }
    },
    {name: '图灵社区 : 图书',
        url: '^http://www\\.ituring\\.com\\.cn/article/',
        nextLink: 'auto;',
        pageElement: '//div[@id="question-header"]/h1 | //div[@class="post-text"]',
        separatorReal: false
    },
    {name: "Stack Overflow, Super User, Server Fault, Stack Apps",
        url: "^http://(?:meta\\.)?(?:s(?:erverfault|tackoverflow|uperuser|tackapps)|\\w+\\.stackexchange|askubuntu)\\.com/",
        nextLink: '//a[@rel="next"]',
        pageElement: "id(\"mainbar questions\")//div[contains(concat(\" \",@class,\" \"),\" question-summary \")]|id(\"answers\")/div[@class=\"pager-answers\"][1]/following-sibling::*[./following-sibling::div[@class=\"pager-answers\"]]",
    },

    // ========================= novel =============================
    {name: '起点文学',
        url:/^http:\/\/(www|read)\.(qidian|qdmm|qdwenxue)\.com\/BookReader\/\d+,\d+/i,
        siteExample:'http://www.qidian.com/BookReader/1545376,27301383.aspx',
        useiframe:true,
        nextLink:'//a[@id="NextLink"]',
        autopager:{
            enable:true,
            useiframe:true,
            pageElement:'//div[@id="maincontent"]/div[@class="booktitle"] | //div[@id="maincontent"]/div[@id="content"]'
        }
    },
    {name: '逐浪小说',
        url:/^http:\/\/book\.zhulang\.com\/.+\.html/i,
        siteExample:'http://book.zhulang.com/153319/62230.html',
        nextLink:'//div[@class="readpage_leftnfy"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="readpage_leftntxt"]',
        }
    },
    {name: '烟雨红尘',
        url:/^http:\/\/www\.cc222\.com\/chapter\/.+\.html/i,
        siteExample:'http://www.cc222.com/chapter/558139.html',
        nextLink:'//div[@id="paging"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="aContainer"]',
            remain:1/5,
        }
    },
    {name: '17k',
        url:/^http:\/\/(mm.17k|www.17k)\.com\/chapter\/.+\.html/i,
        siteExample:'http://www.17k.com/chapter/143095/3714822.html',
        nextLink:'//div[@class="read_bottom"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="readAreaBox"]'
        }
    },
    {name: '纵横书库',
        url:/^http:\/\/book\.zongheng\.com\/chapter\/.+\.html/i,
        siteExample:'http://book.zongheng.com/chapter/239553/4380340.html',
        nextLink:'//div[@class="tc quickkey"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="readcon"]'
        }
    },
    {name: '纵横女生',
        url:/^http:\/\/www\.mmzh\.com\/chapter\/.+\.html/i,
        siteExample:'http://www.mmzh.com/chapter/182074/3287355.html',
        nextLink:'//div[@class="tc key"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="book_con"]'
        }
    },
    {name: '新小说吧',
        url:/http:\/\/book\.xxs8\.com\/.+\.html/i,
        siteExample:'http://book.xxs8.com/165779/859903.html',
        nextLink:'//div[@class="page"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="midbody"]',
            maxpage:10,
        }
    },
    {name: '书迷楼',
        url:/http:\/\/www\.shumilou\.com\/.+\.html/i,
        siteExample:'http://www.shumilou.com/tiandilonghun/698520.html',
        nextLink:'//div[@class="content"]/div[@id="content"]/div[@class="title"]/a[text()="下一页(→)"]',
        autopager:{
            pageElement:'//div[@class="content"]/div[@id="content"]',
        }
    },
    {name: '玄幻小说网',
        url:/^http:\/\/www\.xhxsw\.com\/books\/.+\.htm/i,
        siteExample:'http://www.xhxsw.com/books/1063/1063066/10579171.htm',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '新浪读书',
        url:/^http:\/\/vip\.book\.sina\.com\.cn\/book\/.+\.html/i,
        siteExample:'http://vip.book.sina.com.cn/book/chapter_212356_210018.html',
        nextLink:'//p[@class="pages"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="mainContent"]'
        }
    },
    {name: '搜狐原创',
        url:/^http:\/\/vip\.book\.sohu\.com\/content/i,
        siteExample:'http://vip.book.sohu.com/content/124852/3902398/',
        nextLink:'//div[@class="artical_btn"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="bgdiv"]'
        }
    },
    {name: '红袖添香',
        url:/^http:\/\/novel\.hongxiu\.com\/a\/.+\.shtml/i,
        siteExample:'http://novel.hongxiu.com/a/303084/3543064.shtml',
        nextLink:'//div[@class="papgbutton"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="wrapper_main"]'
        }
    },
    {name: '言情小说吧',
        url:/^http:\/\/www\.xs8\.cn\/book\/.+\.html/i,
        siteExample:'http://www.xs8.cn/book/132368/86157.html',
        nextLink:'//div[@class="chapter_Turnpage"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="chapter_content"]'
        }
    },
    {name: '来书小说网',
        url:/^http:\/\/www\.laishu\.com\/book\/.+\.shtml/i,
        siteExample:'http://www.laishu.com/book/8/8891/5488036.shtml',
        nextLink:'auto;',
        autopager:{
            pageElement:'//table[@class="tabkuan"]'
        }
    },
    {name: '小说阅读网',
        url:/^http:\/\/www\.readnovel\.com\/novel\/.+/i,
        siteExample:'http://www.readnovel.com/novel/142947.html',
        nextLink:'//div[@class="bottomTools1"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@class="newContentBody "]'
        }
    },
    {name: '凤鸣轩',
        url:/^http:\/\/read\.fmx\.cn\/files\/article\/html\/.+\.html/i,
        siteExample:'http://read.fmx.cn/files/article/html/5/7/0/4/8/5/70485/1339404.html',
        nextLink:'//div[@class="newread_fy"]/descendant::a[text()="下一章>>"]',
        autopager:{
            pageElement:'//div[@class="newbodybox"]'
        }
    },
    {name: '红薯网',
        url:/http:\/\/www\.hongshu\.com\/content\/.+\.html/i,
        siteExample:'http://www.hongshu.com/content/38591/49531-1193339.html',
        nextLink:'//div[@class="ann"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="readtext"]'
        }
    },
    {name: '百书斋',
        url:/^http:\/\/baishuzhai\.com/i,
        siteExample:'http://baishuzhai.com/shancunqirenchuan/683763.html',
        nextLink:'//div[@class="page"]/descendant::a[text()="下一章(快捷键:→)"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="booktext"]'
        }
    },
    {name: '百书库',
        url:/^http:\/\/baishuku\.com\/html\/.+\.html/i,
        siteExample:'http://baishuku.com/html/40/40514/8778339.html',
        nextLink:'//div[@id="footlink"]/a[text()="下一页(快捷键:→)"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '顶点小说',
        url: '^http://www\\.23us\\.com/html/.+\\.html',
        siteExample: 'http://www.23us.com/html/26/26627/16952316.html',
        nextLink: ' //dd[@id="footlink"]/descendant::a[text()="下一页"]',
        pageElement: 'id("amain")/dl/dd/h1 | id("contents")'
    },
    {name: '快眼文学网',
        url:/^http:\/\/www\.kywxw\.com\/.+\.html/i,
        siteExample:'http://www.kywxw.com/0/12/3792643.html',
        nextLink:'//div[@id="thumb"]/descendant::a[text()="下一章"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '就爱文学',
        url:/^http:\/\/www\.92wx\.org\/html\/.+\.html/i,
        siteExample:'http://www.92wx.org/html/0/807/220709.html',
        nextLink:'//div[@id="page_bar"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="chapter_content"]'
        }
    },
    {name: '亲亲小说网',
        url:/^http:\/\/www\.77shu\.com\/view\/.+\.html/i,
        siteExample:'http://www.77shu.com/view/0/20/2062418.html',
        nextLink:'auto;',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="chapter_content"] | //div[@id="content"]'
        }
    },
    {name: '七味书屋',
        url:/^http:\/\/www\.7wsw\.net\/html\/.+\.html/i,
        siteExample:'http://www.7wsw.net/html/shifangtianshi/719412.html',
        nextLink:'//div[@id="chapter_pager"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="book_middle_article"]'
        }
    },
    {name: '天天中文',
        url:/^http:\/\/www\.360118\.com\/html\/.+\.html/i,
        siteExample:'http://www.360118.com/html/21/21951/5416831.html',
        nextLink:'//div[@id="FootLink"]/descendant::a[text()="下一页（快捷键→）"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '言情后花园',
        url:/^http:\/\/www\.yqhhy\.org\/novel\/.+\.html/i,
        siteExample:'http://www.yqhhy.org/novel/0/761/38769.html',
        nextLink:'//div[@id="link"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '平南文学',
        url:/^http:\/\/www\.pnxs\.com\/book\/.+\.html/i,
        siteExample:'http://www.pnxs.com/book/zhongshengyantaizidan/2164438.html',
        nextLink:'//div[@class="book_middle_text_next"]/descendant::a[text()="下一章"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="book_middle_text"]'
        }
    },
    {name: '一流小说',
        url:/^http:\/\/www\.1lxs\.com\/novel\/.+\.html/i,
        siteExample:'http://www.1lxs.com/novel/80341/9055036.html',
        nextLink:'//div[@id="chapter_nav"]/descendant::a[text()="下一章"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '一一小说',
        url:/^http:\/\/www\.11xs\.com\/.+\.htm/i,
        siteExample:'http://www.11xs.com/xs/213/119908.htm',
        nextLink:'//div[@id="LinkMenu"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="Content"]'
        }
    },
    {name: '六九中文',
        url:/^http:\/\/www\.69zw\.com\/xiaoshuo\/.+\.html/i,
        siteExample:'http://www.69zw.com/xiaoshuo/21/21943/4461482.html',
        nextLink:'//div[@class="chapter_Turnpage"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@class="novel_content"]'
        }
    },
    {name: '华夏书库',
        url:/^http:\/\/www\.hxsk\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.hxsk.net/files/article/html/67/67509/12704488.html',
        nextLink:'//td[@class="link_14"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//table[@class="border_l_r"]'
        }
    },
    {name: '书路/3K',
        url:/^http:\/\/www\.(shuluxs|kkkxs)\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.shuluxs.com/files/article/html/22/22306/8727879.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '书山路',
        url:/^http:\/\/www\.shu36\.com\/book\/.+\.html/i,
        siteExample:'http://www.shu36.com/book/0/1/3.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '落秋',
        url:/^http:\/\/www\.luoqiu\.com\/html\/.+\.html/i,
        siteExample:'http://www.luoqiu.com/html/18/18505/1385765.html',
        nextLink:'//div[@id="bgdiv"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//table[@class="border_l_r"]',
        }
    },
    {name: '君子网',
        url:/^http:\/\/www\.junziwang\.com\/.+\.html/i,
        siteExample:'http://www.junziwang.com/0/155/25137.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '哈罗小说网',
        url:/^http:\/\/www\.hellodba\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.hellodba.net/files/article/html/0/46/21565.html',
        nextLink:'//div[@class="papgbutton"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="htmlContent"]'
        }
    },
    {name: '百书楼',
        url:/^http:\/\/baishulou\.com\/read\/.+\.html/i,
        siteExample:'http://baishulou.com/read/10/10647/2536085.html',
        nextLink:'//a[text()="下一页(快捷键:→)"][@href]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '万书楼',
        url:/^http:\/\/www\.wanshulou\.com\/xiaoshuo\/.+\.shtml/i,
        siteExample:'http://www.wanshulou.com/xiaoshuo/29/29091/2062593.shtml',
        nextLink:'//div[@id="LinkMenu"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="BookText"]'
        }
    },
    {name: '万卷书屋',
        url:/^http:\/\/www\.wjsw\.com\/html\/.+\.shtml/i,
        siteExample:'http://www.wjsw.com/html/35/35404/2887335.shtml',
        nextLink:'//div[@id="bookreadbottom"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="maincontent"]'
        }
    },
    {name: '书书网',
        url:/^http:\/\/www\.shushuw\.cn\/shu\/.+\.html/i,
        siteExample:'http://www.shushuw.cn/shu/28560/4509794.html',
        nextLink:'//div[@align="center"]/a[text()="下页"][@href]',
        autopager:{
            pageElement:'//div[@class="cendiv"]'
        }
    },
    {name: '飞卢小说',
        url:/^http:\/\/b\.faloo\.com\/p\/.+\.html/i,
        siteExample:'http://b.faloo.com/p/247559/1.html',
        nextLink:'//div[@id="pager"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@class="main0"]'
        }
    },
    {name: '青帝文学网',
        url:/^http:\/\/www\.qingdi\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.qingdi.com/files/article/html/0/27/13314.html',
        nextLink:'//div[@class="readerFooterPage"]/descendant::a[text()="下一页"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="readerTitle"]'
        }
    },
    {name: '笔下文学',
        url:/^http:\/\/www\.bxwx\.org\/b\/.+\.html/i,
        siteExample:'http://www.bxwx.org/b/56/56907/9020932.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="下一页[→]"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '笔趣阁',
        url:/^http:\/\/www\.biquge\.com\/.+\.html/i,
        siteExample:'http://www.biquge.com/0_67/471472.html',
        nextLink:'//div[@class="bottem2"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '小说客栈',
        url:/^http:\/\/www\.xskz\.com\/xiaoshuo\/.+\.shtml/i,
        siteExample:'http://www.xskz.com/xiaoshuo/29/29091/2062593.shtml',
        nextLink:'//div[@id="LinkMenu"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="BookText"]'
        }
    },
    {name: '翠微居',
        url:/^http:\/\/www\.cuiweiju\.com\/html\/.+\.html/i,
        siteExample:'http://www.cuiweiju.com/html/124/124362/6468025.html',
        nextLink:'//p[@class="cz_bar"]/descendant::a[text()="下一章 》"]',
        autopager:{
            pageElement:'//div[@class="book_wrap"]'
        }
    },
    {name: '在线书吧',
        url:/^http:\/\/www\.bookba\.net\/Html\/Book\/.+\.html/i,
        siteExample:'http://www.bookba.net/Html/Book/15/15995/2030251.html',
        nextLink:'//td[@id="thumb"]/descendant::a[text()="下一章"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '文学迷',
        url:/^http:\/\/www\.wenxuemi\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.wenxuemi.net/files/article/html/10/10884/4852125.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '爱尚文学网',
        url:/^http:\/\/www\.kenshu\.cc\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.kenshu.cc/files/article/html/5/5379/6389640.html',
        nextLink:'//dd[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@class="bdsub"]'
        }
    },
    {name: 'E品中文网',
        url:/^http:\/\/www\.epzw\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.epzw.com/files/article/html/50/50244/3271485.html',
        nextLink:'//div[@id="link"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '大家读书院',
        url:/^http:\/\/www\.dajiadu\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.dajiadu.net/files/article/html/14/14436/3337407.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="center"]'
        }
    },
    {name: '北京爱书',
        url:/^http:\/\/www\.bj-ibook\.cn\/book\/.+\.htm/i,
        siteExample:'http://www.bj-ibook.cn/book/17/t10409k/12.htm',
        nextLink:'//div[@class="zhtop"]/a[text()="下一页（快捷键→）"][@href]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="bmsy_content"]'
        }
    },
    {name: '小说570',
        url:/^http:\/\/www\.xiaoshuo570\.com/i,
        siteExample:'http://www.xiaoshuo570.com/11/11844/2678383.html',
        nextLink:'//div[@id="thumb"]/a[text()="下一页"][@href]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="fonts_big"]',
        }
    },
    {name: '看书',
        url:/^http:\/\/www\.kanshu\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.kanshu.com/files/article/html/30997/935806.html',
        nextLink:'//div[@class="yd_linebot"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//table[@class="yd_table"]'
        }
    },
    {name: '全本小说网',
        url:/^http:\/\/www\.quanben\.com\/xiaoshuo\/.+\.html/i,
        siteExample:'http://www.quanben.com/xiaoshuo/10/10412/2095098.html',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '晋江原创',
        url:/^http:\/\/www\.jjwxc\.net\/onebook\.php\?novelid=/i,
        siteExample:'http://www.jjwxc.net/onebook.php?novelid=862877&chapterid=6',
        nextLink: {
                startAfter:'&chapterid=',
                inc:1,
        },
        autopager:{
            pageElement:'//div[@class="noveltext"]',
        }
    },
    {name: '奇书屋',
        url:/^http:\/\/www\.qishuwu\.com\/.+/i,
        siteExample:'http://www.qishuwu.com/a_zhijian/314815/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="bgdiv"]'
        }
    },
    {name: 'lu5小说网',
        url:/^http:\/\/www\.lu5\.com\/.+\.html/i,
        siteExample:'http://www.lu5.com/b/5/5442/9575830.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '飞库',
        url:/^http:\/\/www\.feiku\.com\/\/html\/book\/.+\.shtm/i,
        siteExample:'http://www.feiku.com//html/book/130/164016/4891625.shtm',
        nextLink:'//div[@class="prenext"]/descendant::a[text()="下一页→"]',
        autopager:{
            pageElement:'//div[@id="chcontent"]'
        }
    },
    {name: '幻侠小说网',
        url:/http:\/\/www\.huanxia\.com\/book\w+\.html/i,
        siteExample:'http://www.huanxia.com/book548761_6041285.html',
        nextLink:'//a[@href][@id="htmlxiazhang"]',
        autopager:{
            pageElement:'//div[@class="h1title"] | //div[@id="htmlContent"][@class="contentbox"]',
            HT_insert:['//div[@id="htmlContent"]',2],
        }
    },
    {name: '潇湘书院',
        url:/^http:\/\/www\.xxsy\.net\/books\/.*\.html/i,
        siteExample:'http://www.xxsy.net/books/485034/5259176.html',
        nextLink:'//div[@id="detailsubsbox"]/span/a[@href][@title="阅读下一章节"]',
        autopager:{
            pageElement:'//div[@id="detail_title"] | //div[@id="zjcontentdiv"]',
            HT_insert:['//div[@id="zjcontentdiv"]',2],
        }
    },
    {name: '书海',
        url:/^http:\/\/www\.shuhai\.com\/read\/.+\.html/i,
        siteExample:'http://www.shuhai.com/read/4014/371553.html',
        nextLink:'//div[@class="page_operate font_blue"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="txt"]'
        }
    },
    {name: 'yi-see',
        url:/^http:\/\/www\.yi-see\.com/i,
        siteExample:'http://www.yi-see.com/read_266768_15501.html',
        nextLink:'//div[@class="B2"]/descendant::a[text()="下一节"]',
        autopager:{
            pageElement:'//table[@width="900px"][@align="CENTER"]',
        }
    },
    {name: '天下书盟',
        url:/^http:\/\/www\.fbook\.net\/book\/.+\.htm/i,
        siteExample:'http://www.fbook.net/book/35793/2656834.htm',
        nextLink:'//div[@id="pages"]/descendant::a[text()="下一章"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="bookbody"]'
        }
    },
    {name: '涂鸦小说网',
        url:/^http:\/\/www\.tooya\.net\/.+\.html/i,
        siteExample:'http://www.tooya.net/tooya/2/2094/820902.html',
        nextLink:'//div[@class="novel_bottom"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '百晓生/谷粒',
        url:/^http:\/\/www\.(bxs|guli)\.cc\/.+/i,
        siteExample:'http://www.bxs.cc/26758/7708992.html',
        enable:true,
        nextLink:'//div[@id="papgbutton"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="main"]/h1 | //div[@id="readbox"]/div[@id="content"] | //div[@id="readbox"]/div[@id="papgbutton"]',
                            HT_insert:['//div[@id="weekhot"]',1],
        }
    },
    {name: '熬夜看书',
        url:/^http:\/\/www\.aoye\.cc\/.+\.html/i,
        siteExample:'http://www.aoye.cc/843/5.html',
        nextLink:'//div[@id="pagebottom"]/descendant::a[@id="nextpage"]',
        autopager:{
            pageElement:'//pre[@id="content"]'
        }
    },
    {name: '塔读文学',
        url:/^http:\/\/www\.tadu\.com\/book\/\d+\/\d+/i,
        siteExample:'http://www.tadu.com/book',
        nextLink:'//div[@class="container_center"]/div[@class="left"]/div[@class="jump"]/a[@href][text()="下一章>>"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="container_center"]/div[@class="left"]/div[@class="content"][@id="partContent"]',
        }
    },
    {name: '无错小说网',
        url:/^http:\/\/www\.wcxiaoshuo\.com\/wcxs\-\d+\-\d+/i,
        siteExample:'http://www.wcxiaoshuo.com/wcxs-*-*/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="wrapper_main"][@id="jsreadbox"]/h1 | //div[@class="wrapper_main"][@id="jsreadbox"]/div[@id="htmlContent"][@class="contentbox"]',
        }
    },
    {name: '燃文',
        url:/^http:\/\/www\.ranwen\.cc\/.+\.html/i,
        siteExample:'http://www.ranwen.cc/A/9/9818/3505060.html',
        nextLink:'//div[@class="pageTools"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="oldtext"]'
        }
    },
    {name: '书河',
        url:/^http:\/\/www\.shuhe\.cc\/.+/i,
        siteExample:'http://www.shuhe.cc/30976/4401025/',
        nextLink:'//div[@class="bottem"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="TXT"]'
        }
    },
    {name: '89文学',
        url:/^http:\/\/89wx\.com\/.+\.htm/i,
        siteExample:'http://89wx.com/html/book/70/70732/6641331.htm',
        nextLink:'//dd[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//dd[@id="contents"]'
        }
    },
    {name: '极速小说网',
        url:/^http:\/\/www\.186s\.cn\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.186s.cn/files/article/html/0/304/4528937.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '手打8',
        url:/^http:\/\/shouda8\.com\/.+\.html/i,
        siteExample:'http://shouda8.com/zhangyuxingchen/85649.html',
        nextLink:'//div[@id="papgbutton"]/descendant::a[text()="下一章（快捷键 →）"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '闪文书库',
        url:/^http:\/\/read\.shanwen\.com\/.+\.html/i,
        siteExample:'http://read.shanwen.com/14/14616/1011063.html',
        nextLink:'//td[@class="tb0"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: 'PaiTxt',
        url:/^http:\/\/paitxt\.com\/.+\.html/i,
        siteExample:'http://paitxt.com/24/24596/4507312.html',
        nextLink:'//div[@class="book_middle_text_next"]/descendant::a[text()="下一章(快捷键:→)"]',
        autopager:{
            pageElement:'//div[@id="booktext"]'
        }
    },
    {name: '好书楼',
        url:/^http:\/\/www\.haoshulou\.com\/.+\.html/i,
        siteExample:'http://www.haoshulou.com/Hao/6/60238.html',
        nextLink:'//div[@class="movenext"]/descendant::a[text()="下一章"]',
        autopager:{
            pageElement:'//div[@id="booktext"]'
        }
    },
    {name: 'BookLink.Me:最有爱的小说搜索引擎',
        url: '^http://booklink\\.me/',
        nextLink: '//a[text()="下一页"] | //a[font[text()="下一页"]]',
        pageElement: '//table[@width="100%"][@cellspacing="0"][@cellpadding="2"]',
        scroll_only: true
    },

    // =============================== manhua ========================
    {name: '天极动漫频道新闻',
        url:/http:\/\/comic\.yesky\.com\/\d+\/.+\.shtml/i,
        siteExample:'http://comic.yesky.com/249/11335749_5.shtml',
        nextLink:'//div[@id="numpage"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@class="article"]',
            remain:1.4,
            replaceE:'//div[@id="numpage"]',
        }
    },
    {name: '暴走漫画',
        url: /^http:\/\/(baozou|baozoumanhua)\.com\//i,
        nextLink: '//div[@class="pagebar"]/a[text()="下一页" or @class="next"] | //a[@class="next" and (text()="下一页")]',
        autopager: {
            pageElement: '//div[@class="main cf"]/div[@class="content-block cf"]/div[1]',
        }
    },
    {name: '动漫之家漫画网',
        url: "^http://(www|manhua)\\.dmzj\\.com/.+/.+shtml|^http://manhua\\.178\\.com/.+/.+shtml",
        siteExample:'http://manhua.178.com/lansechumoshi/15794.shtml',
        nextLink:'//div[@class="pages2"]/descendant::a[text()="下一页"]',
        autopager:{
            pageElement:'//div[@class="inner_img"]',
            useiframe:true,
        }
    },
    {name: '爱漫画',
        url:/^http:\/\/www\.imanhua\.com\/comic\/.+/i,
        siteExample:'http://www.imanhua.com/comic/55/list_39448.html',
        useiframe:true,
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/^http:\/\/www\.imanhua\.com\/comic\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var pageSelect=doc.getElementById('pageSelect');
                if(pageSelect){
                    var s2os=pageSelect.options;
                    var s2osl=s2os.length;
                    //alert(s2.selectedIndex);
                    if(pageSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            useiframe:true,
            remain:1/2,
            pageElement:'//img[@id="comic"]',
        }
    },
    {name: 'CC漫画网',
        url: "^http://www\\.tuku\\.cc/comic/\\d+/\\d+/",
        siteExample:'http://www.tuku.cc/comic/6123/1/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//img[@id="Img"]',
            useiframe:true,
        }
    },
    {name: '新动漫',
        url:/http:\/\/www\.xindm\.cn\/mh\/.+/i,
        siteExample:'http://www.xindm.cn/mh/shishangzuiqiangdizi/58784.html?p=2',
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/http:\/\/www\.xindm\.cn\/mh\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var topSelect=doc.getElementById('topSelect');
                if(topSelect){
                    var s2os=topSelect.options;
                    var s2osl=s2os.length;
                    if(topSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            pageElement:'//div[@class="photo"]',
            useiframe:true,
        }
    },
    {name: '看漫画',
        url:/^http:\/\/www\.kkkmh\.com\/manhua\/\d+\/\d+\/\d+\.html/i,
        siteExample:'http://www.kkkmh.com/manhua/0710/1011/34412.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.kkkmh\.com\/manhua\/\d+\/\d+\/\d+\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, gm_win, lhref) {
                var pic_num = gm_win.pic.length;
                var url_info = lhref.split("?p=");
                var current_page = Number(url_info[1]);
                if (current_page >= pic_num) {
                    return true;
                }
            },
        },
        autopager: {
            pageElement: 'css;img#pic-show-area',
            remain: 1 / 3,
            documentFilter: function(doc, lhref) {
                var current_pic_server = unsafeWindow.current_pic_server,
                    hex2bin = unsafeWindow.hex2bin,
                    pic = unsafeWindow.pic;

                var url_info = lhref.split("?p=");
                var current_page = Number(url_info[1]);
                if (isNaN(current_page)) return;
                var imgSrc = current_pic_server + hex2bin(pic[current_page - 1]);
                doc.getElementById("pic-show-area").setAttribute('src', imgSrc);
            }
        }
    },
    // 已失效
    // {name: 'SF在线漫画',
    //     url:/http:\/\/comic\.sfacg\.com\/HTML\/.+/i,
    //     siteExample:'http://comic.sfacg.com/HTML/ZXCHZ/001/#p=2',
    //     preLink:{
    //         startAfter:'#p=',
    //         inc:-1,
    //         min:1,
    //     },
    //     nextLink:{
    //         startAfter:'#p=',
    //         mFails:[/http:\/\/comic\.sfacg\.com\/HTML\/.+\//i,'#p=1'],
    //         inc:1,
    //         isLast:function(doc,win,lhref){
    //             var pageSel=doc.getElementById('pageSel');
    //             if(pageSel){
    //                 var s2os=pageSel.options;
    //                 var s2osl=s2os.length;
    //                 if(pageSel.selectedIndex==s2osl-1)return true;
    //             }
    //         },
    //     },
    //     autopager:{
    //         pageElement:'//img[@id="curPic"]',
    //         useiframe:true,
    //         replaceE: 'id("Pages")'
    //     }
    // },
    {name: '热血漫画',
        url: /^http:\/\/www\.rexuedongman\.com\/comic\//i,
        siteExample: 'http://www.rexuedongman.com/comic/2957/36463/index.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.rexuedongman\.com\/comic\/.+/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.getElementById('pageSelect');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            useiframe: true,
            pageElement: '//img[@id="mangaFile"]',
        }
    },
    {name: '基德漫画网',
        url: /^http:\/\/www\.jide123\.net\/manhua\/.*\.html/i,
        exampleUrl: 'http://www.jide123.net/manhua/3670/272725.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.jide123\.net\/manhua\/.*\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.getElementById('qTcms_select_i');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            pageElement: 'id("qTcms_pic")',
            useiframe: true,
        }
    },
    {name: '5652在线漫画',
        url: /^http:\/\/mh\.5652\.com\/mh\/.*\.shtml/i,
        exampleUrl: 'http://mh.5652.com/mh/20130124/5484/125907.shtml?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/mh\.5652\.com\/mh\/.*\.shtml/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.querySelector('.Directory_bar select');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            pageElement: 'id("show_img")',
            useiframe: true,
        }
    },
    {name: '汗汗漫画',
        url: /^http:\/\/\w+\.(?:vs20|3gmanhua|hhcomic)\.(?:com|net)\/\w+\/\w+\.htm/i,
        siteExample: 'http://page.vs20.com/1815454/115321.htm?v=2*s=6',
        nextLink: function(doc, win, cplink) {
            // hrefInc 的方式不行因为这个地址最后还有额外的 *s=6
            var m = cplink.match(/\?v=(\d+)/);
            if (!m) {
                // 第一页这种情况 http://page.vs20.com/1815454/115321.htm?s=6
                return cplink.replace('?s=', '?v=2*s=');
            } else {
                var current = Number(m[1]),
                    next = current + 1;

                var select = doc.querySelector('#all select');
                if (!select) return;
                var max = select.options.length;
                if (next > max) return;
                return cplink.replace(m[0], '?v=' + next);
            }
        },
        autopager: {
            useiframe: true,
            pageElement: '//img[@id="ComicPic"]',
        }
    },
    {name: '99漫画old',
        url: /^http:\/\/(cococomic|dm.99manga|99manga|99comic|www.99comic|www.hhcomic)\.(com|cc)\/.+\.htm/i,
        siteExample: 'http://99manga.com/page/168/6481.htm?v=3*s=9',
        nextLink: {
            startAfter: '?v=',
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.querySelector('#all select');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            useiframe: true,
            pageElement: '//img[@id="ComicPic"]',
        }
    },
    {name: '99漫画new',
        url: /^http:\/\/(1mh|99mh|mh.99770|www.jmydm)\.(com|cc)\/.+/i,
        siteExample: 'http://99mh.com/comic/8436/117728/?p=1&s=0',
        nextLink: {
            startAfter: '?p=',
            inc: 1,
        },
        autopager: {
            useiframe: true,
            maxpage: 20,
            pageElement: '//div[@id="iBody"]',
        }
    },
    {name: '动漫Fans',
        url: /http:\/\/www\.dm123\.cn\/bbs\/(thread\.php\?fid=|read\.php\?tid=)/i,
        siteExample: 'http://www.dm123.cn/bbs/read.php?tid=593645',
        nextLink: 'auto;',
        autopager: {
                pageElement: '//tbody[@id="threadlist"]|//div[@id="pw_content"]',
        }
    },
    {name: 'KuKu动漫',
        url:/http:\/\/comic\.kukudm\.com\/comiclist\/\d+\/\d+.*\.htm/i,
        siteExample:'http://comic.kukudm.com/comiclist/4/17099/3.htm',
        useiframe:true,
        nextLink:'//a[img[contains(@src,"images/d.gif")]]',
        autopager:{
            useiframe:true,
            pageElement:'//body/table[2]'
        }
    },
    {name: '52pk漫画',
        url:/http:\/\/(op|sishen|narutocn)\.52pk\.com\/manhua\/\d+\/\d+/i,
        siteExample:'http://op.52pk.com/manhua/2010/921364.html',
        nextLink:'//li[@id="page__next"]/a[1]',
        autopager:{
            relatedObj:['css;li#page__select','bottom'],
            pageElement:'//div[@id="pictureContent"]'
        }
    },
    {name: '有妖气漫画',
        url:/http:\/\/www\.u17\.com\/comic_show\/.+/i,
        siteExample:'http://www.u17.com/comic_show/c28540_m0.html',
        autopager:{
            pageElement:'//div[@class="mg_auto"]',
            useiframe:true,
        }
    },
    {name: '动漫屋',
        url:/http:\/\/(www|tel)\.dm5\.com\/.+/i,
        nextLink:'//span[@id="s_next"]/a[1]',
        autopager:{
            pageElement:'//div[@id="showimage"]',
            useiframe:true,
        }
    },
    {name: '天使漫画网,TSDM漫画组',
        url:/^http:\/\/mh\.tsdm\.net\/comic\/.+/i,
        siteExample:'http://mh.tsdm.net/comic/4697/68059.html',
        useiframe:true,
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/^http:\/\/mh\.tsdm\.net\/comic\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var pageSelect=doc.getElementById('qTcms_select_i');
                if(pageSelect){
                    var s2os=pageSelect.options;
                    var s2osl=s2os.length;
                    //alert(s2.selectedIndex);
                    if(pageSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            useiframe:true,
            remain:1/2,
            pageElement:'//img[@id="qTcms_pic"]',
        }
    },
    {name: '漫画频道_游侠网',
        url: /^http:\/\/manhua\.ali213\.net\/comic\/.*\.html/i,
        exampleUrl: 'http://manhua.ali213.net/comic/5257/141336.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="enjoy_hostcon"]',
            useiframe: true,
            replaceE: "//div[@class='enjoy_center_bottom_page']//*[@class='li_middle' or @class='previouspage' or @class='nextpage']"
        }
    },
    {name: '火影忍者中文网',
        url:/http:\/\/www\.narutom\.com\/comic\/.+/i,
        siteExample:'http://www.narutom.com/comic/11624.html?p=3',
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/http:\/\/www\.narutom\.com\/comic\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var topSelect=doc.getElementById('topSelect');
                if(topSelect){
                    var s2os=topSelect.options;
                    var s2osl=s2os.length;
                    if(topSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            pageElement:'//img[@id="showImg"]',
            useiframe:true,
        }
    },
    {name: '死神中文网',
        url:/http:\/\/(?:\w+\.)?bleachcn\.net\/manhua\/.+/i,
        siteExample:'http://naruto.bleachcn.net/manhua/6759.html',
        nextLink:'//div[@id="comic_pages"]/a[text()="下一页"][@href]',
        autopager:{
            pageElement:'//div[@id="comic_endtext"]',
        }
    },
    {name: 'iiikl论坛',
        url: '^http://bbs\\.iiikl\\.net/forum\\.php\\?forum_id=.*',
        nextLink: '//a[@class="next"]',
        pageElement: '//tr[@class="topic_list_row"]',
        exampleUrl: 'http://bbs.iiikl.net/forum.php?forum_id=82&class_id=0&page=2'
    },
    {name: 'sosg论坛帖子',
        url:/http:\/\/www\.sosg\.net\/read/i,
        siteExample:'http://www.sosg.net/read.php?tid=424833',
        nextLink:'//td[@align="left"]/b/following-sibling::a[@href]',
        autopager:{
            pageElement:'//div[@id="b5"]/form/a/table[1]',
        }
    },
    {name: '澄空贴子内容',
        url:/http:\/\/bbs\.sumisora\.org\/read\.php\?tid=/i,
        siteExample:'http://bbs.sumisora.org/read.php?tid=11015694',
        nextLink:'auto;',
        autopager:{
            pageElement:'css;.t.t2',
        }
    },
    {name: '9gal苍雪论坛',
        url:/http:\/\/bbs\.(9gal|9baka)\.com\/read\.php\?tid=/i,
        siteExample:'http://bbs.9gal.com/read.php?tid=299016',
        nextLink:'auto;',
        autopager:{
            pageElement:'//form[@method="post"]/a[@name]/following-sibling::div',
            replaceE:'//ul[@class="pages"]',
        },
    },
    {name: '和邪社|你的ACG生活 文不在长.内涵则明 图不在色.意淫则灵',
        url: /^http:\/\/www\.hexieshe\.com\//i,
        exampleUrl: 'http://www.hexieshe.com/',
        nextLink: '//div[@class="pagebar"]/a[text()="Next"]',
        autopager: {
            pageElement: 'id("centent")',
        }
    },
    {name: 'haruhichan',
        url: /^http:\/\/haruhichan\.com\//i,
        nextLink: '//a[@rel="next"]',
        autopager: {
            pageElement: '//div[@id="postlist"]',
        }
    },
    {name: 'exhentai',
        url: '^http://exhentai\\.org/s/.*$',
        nextLink: '//img[@src="http://st.exhentai.net/img/n.png"]/..',
        pageElement: '//body/div[@class="sni"]',
        exampleUrl: 'http://exhentai.org/s/0088446283/653117-4',
        useiframe: true
    },
    {name: 'exhentai gallery',
        url: /^http:\/\/exhentai\.org\/g\//i,
        exampleUrl: 'http://exhentai.org/g/514954/d4fcb4973e/?p=1',
        nextLink: '//table[@class="ptt"]//a[text()=">"]',
        autopager: {
            pageElement: '//div[@id="gdt"]',
            relatedObj: true
        }
    },
    {name: 'exhentai frontpage',
        url: /^http:\/\/exhentai\.org\/(\?[^\/]+)?$/i,
        exampleUrl: 'http://exhentai.org/?page=2',
        nextLink: '//table[@class="ptt"]//a[text()=">"]',
        autopager: {
            pageElement: '//table[@class="ptt"]/..',
            relatedObj: true
        }
    },
    {name: 'Hentai Manga|Read free hentai xxx manga online',
        url: /^http:\/\/hentai4manga\.com\//i,
        exampleUrl: 'http://hentai4manga.com/',
        nextLink: '//div[@class="pages"]/a[contains(text(), ">")]',
        autopager: {
            pageElement: 'id("innerContent")',
        }
    },
    {name: '1024社区',
        url: '^http://(www\\.)?t66y\\.com/|^http://cl\\.man\\.lv/',
        nextLink: '//div[@class="pages"]/b/following-sibling::a[1]',
        pageElement: 'id("ajaxtable") | id("main")',
        exampleUrl: 'http://t66y.com/thread0806.php?fid=15',
    },
    {name: 'DLsite 検索結果',
        url: /^http:\/\/(?:[^.]+\.)?dlsite\.com\//i,
        exampleUrl: 'http://www.dlsite.com/home/fsr/=/language/jp/keyword/kon/age_category%5B0%5D/general/per_page/30/show_type/n/page/2',
        nextLink: '//td[@class="page_no"]/ul/li/a[text()="次へ" or text()="Next"]',
        autopager: {
            pageElement: 'id("search_result_list")',
        }
    },
    {name: 'Gyutto.com｜の検索結果',
        url: /^http:\/\/gyutto\.com\/search\/search_list\.php/i,
        exampleUrl: 'http://gyutto.com/search/search_list.php?_adult_check=yes&action=perPage&search_keyword=lol&search_type=&mode=search&perPage=30&pageID=2&ref_path=%2Fsearch%2Fsearch_list.php',
        nextLink: '//a[text()="次の30件へ"]',
        autopager: {
            pageElement: 'id("struct_2ColRightIn")/div[@class="unit_ItemList"]/div[contains(@class, "parts_ItemBox")]',
            relatedObj: true
        }
    },
    {name: 'JAVLibrary',
        url: /^http:\/\/www\.javlibrary\.com\/cn\//i,
        exampleUrl: 'http://www.javlibrary.com/cn/vl_bestrated.php',
        nextLink: '//div[@class="page_selector"]/a[@class="page next"]',
        autopager: {
            pageElement: 'id("rightcolumn")/div[@class="videothumblist"] | id("rightcolumn")/div[@class="starbox"]',
        }
    },
    {name: 'NyaaTorrents',
        url: '^http://(?:(?:www|sukebei?)\\.)?nyaa\\.se/',
        nextLink: '//div[@class="pages"]/b/following-sibling::a[1]',
        pageElement: '//table[@class="tlist"]',
        exampleUrl: 'http://www.nyaa.se/',
    },
    {name: '极影动漫',
        url: 'http://bt.ktxp.com/.+[0-9]+-*',
        nextLink: '//span[@class="current"]/following-sibling::a[1]',
        pageElement: '//div[@class="item-box round-corner" and div/@class="title"]',
    },
    {name: 'BTDigg Search',
        url: '^https?://btdigg.org/search*',
        nextLink: '//a[contains(text(),"→")]',
        pageElement: '//body/div/div/center',
    },


    // ==================== 国外站点 ===================
    {name: 'AnandTech',
        url: '^http://anandtech\\.com/',
        nextLink: '//div[@class="pagination"]/ul/li[@class="arrow"]/a[text()="▶"]',
        pageElement: '//section[@class="content"]/section[@class="main_cont"]/section[@class="main_cont"]',
        exampleUrl: 'http://anandtech.com/tag/mb',
    },
    {name: 'Android Police - Android News, Apps, Games, Phones, Tablets',
        url: '^http://www\\.androidpolice\\.com/',
        nextLink: '//div[@class="wp-pagenavi"]/a[text()="Next»"]',
        pageElement: '//div[@id="content"]',
        exampleUrl: 'http://www.androidpolice.com/',
    },
    {name: 'Anonymous speaks: the inside story of the HBGary hack | Ars Technica',
        url: '^http://arstechnica\\.com/',
        nextLink: '//a[span[contains(concat(" ", @class, " "), " next ")]]',
        pageElement: '//article[contains(concat(" ", @class, " "), " standalone ")]/section[@id="article-guts"]',
        exampleUrl: 'http://arstechnica.com/tech-policy/2011/02/anonymous-speaks-the-inside-story-of-the-hbgary-hack/',
    },
    {name: 'techPowerUp',
        url: '^http://www\\.techpowerup\\.com/',
        nextLink: '//a[@class="nextpage-top"] | //a[contains(text(),"Next")]',
        pageElement: '//div[@class="text"] | //section[@id="list"] | //form[@class="DiscussionList InlineModForm" or @class="InlineModForm section"]',
        exampleUrl: 'http://www.techpowerup.com/reviews/GSkill/F3-1600C7Q-32GTX/',
    },
    {name: 'Digital Photography Review',
        url: '^http://www\\.dpreview\\.com/',
        nextLink: '//a[@rel="nofollow"][contains(text(), "Next")]',
        pageElement: 'id("mainContent")/div[@class="news withDayIcons"]',
        exampleUrl: 'http://www.dpreview.com/previews/sony-cybershot-dsc-rx1r',
    },
    {name: 'Digital Photography Review 2',
        url: '^http://www\\.dpreview\\.com/',
        nextLink: '//div[@class="reviewPagesDropdown"]/a/img[@alt="Next page"]/..',
        insertBefore: 'id("amazonBuyboxContainer")',
        autopager: {
            pageElement: 'id("mainContent")',
            filter: 'css;.reviewNavigatorTop, #amazonBuyboxContainer, .ad, #comments, .buyboxOld.amazon',
                relatedObj: ['css;div.reviewNavigatorBottom','bottom'],
                HT_insert: ['id("amazonBuyboxContainer")',1],
        }
    },

    //-================ 手机网站 ========================
    {name: '手机百度百科',
        url: /^http:\/\/wapbaike\.baidu\.com\//i,
        exampleUrl: 'http://wapbaike.baidu.com/goodlist?uid=F381CCCD6FD2F58151EFFB4A63BFA4FF&ssid=0&pu=sz%401321_1004&bd_page_type=1&from=844b&st=4&step=2&net=1&bk_fr=bk_more_glist',
        nextLink: '//div[@class="pages"]/a[text()="下一页"] | //div[@class="page"]/p[@class="next"]/a[text()="下页"] | //table[@class="table next"]//a[text()="下页"] | //a[@class="m-rm-5" and text()="余下全文"]',
        autopager: {
            pageElement: '//div[@class="bd"] | //div[@class="list"] | id("lemma-content")',
            separatorReal: false,
            replaceE: 'css;.page > .p-num'
        }
    },
    {name: '手机豆瓣',
        url: /^http:\/\/m\.douban\.com\/.*/i,
        exampleUrl: 'http://m.douban.com/book/subject/1088065/reviews?session=c0ea1419',
        nextLink: '//div[@class="pg" or @class="paginator"]/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("bd")/div[@class="itm"] | //div[@class="bd"]/div[@class="list"]',
            separatorReal: false
        }
    },
    {name: '手机新浪新闻',
        url: /^http:\/\/[a-z]+\.sina\.cn\/\?sa=/i,
        exampleUrl: 'http://news.sina.cn/?sa=t124d10608655v71&pos=108&vt=4&clicktime=1386267238910&userid=user138626723891024077253801575993',
        nextLink: 'id("j_loadingBtn")',
        autopager: {
            pageElement: 'id("j_articleContent")',
            relatedObj: true
        }
    },
    {name: '手机网易网',
        url: '^http://3g\\.163\\.com/[a-z]+/.*\\.html',
        exampleUrl: 'http://3g.163.com/news/13/0914/04/98N4CSHI0001124J.html',
        nextLink: ['//a[text()="余下全文"]', '//a[text()="下页"]'],
        autopager: {
            pageElement: '//div[@class="content"]',
            // separator: false,
            replaceE: '//div[@class="reset marTop10 cBlue"][child::a[text()="下页"]] | //div[child::form[@class="reset"]]',
            relatedObj: true,
        }
    },
    {name: '手机凤凰网',
        url: '^http://3g\\.ifeng\\.com/[a-z]+/',
        exampleUrl: 'http://3g.163.com/news/13/0914/04/98N4CSHI0001124J.html',
        nextLink: ['//a[text()="余下全文"]', '//a[text()="下一页"]'],
        autopager: {
            pageElement: '//div[@class="zwword"]',
            // separator: false,
            relatedObj: true,
        }
    },
    {name: '手机环球网',
        url: '^http://wap\\.huanqiu\\.com/',
        nextLink: ['//a[text()="余下全文"]', '//a[text()="下一页"]'],
        autopager: {
            pageElement: '//div[@class="newscont"]',
            // separator: false,
            separatorReal: false,
            relatedObj: true,
        }
    },
    {name: 'cnBeta.COM - 移动版',
        url: /^http:\/\/m\.cnbeta\.com\//i,
        exampleUrl: 'http://m.cnbeta.com/',
        nextLink: 'id("yw0")/a[@class="page-next"]',
        autopager: {
            pageElement: '//div/div/div[@class="list"]',
        }
    },
    {name: '手机版M.BookLink.Me',
        url: /^http:\/\/m\.booklink\.me\//i,
        exampleUrl: 'http://m.booklink.me/charpter.php?site_id=2&book_id=69507',
        nextLink: '//div[@class="sec nav"]/form/a[text()="下一页"]',
        autopager: {
            pageElement: 'id("m_main")/ul[@class="list sec"]',
        }
    },
    {name: '开源中国(OSChina.NET)',
        url: /^http:\/\/m\.oschina\.net\//i,
        exampleUrl: 'http://m.oschina.net/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//ul[@class="ui-listview"]',
            useiframe: true
        }
    },
    {name: '博客园博客手机版',
        url: /^http:\/\/m\.cnblogs\.com\/blog\//i,
        exampleUrl: 'http://m.cnblogs.com/blog/',
        nextLink: '//a[text()="下一页"]',
        autopager: {
            pageElement: '//div[@class="list_item"]',
        }
    },

    // ============== google 其它======================
    {name: "Google Bookmarks",
        "url": "^https?://www\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/bookmarks/",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" kd-buttonbar \")]//tr/td[last()-1 or last]/a[img[contains(@src,\"right.png\")]]",
        "pageElement": "id(\"search\")"
    },
    {name: "Google Code List",
        url: "^https?://code\\.google\\.com/[pr]/(?:[^/]+/){2}list",
        nextLink: "id(\"colcontrol\")//div[contains(concat(\" \", @class, \" \"), \" pagination \")]/a[contains(., \"›\")]",
        pageElement: "id(\"resultstable\")//tr"
    },
    {
        "url": "^https?://code\\.google\\.com/hosting/search\\?",
        "nextLink": "id(\"serp\")/following::a[contains(., \"Next\")][1]",
        "pageElement": "id(\"serp\")/*"
    },
    {
        "url": "^http://[^.]+\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/codesearch",
        "nextLink": "(id(\"navbar\")//td[@class=\"b\"]/a)[last()]",
        "pageElement": "//*[self::div[@class=\"h\"] or self::pre[@class=\"j\"] or self::div[@class=\"f\"]]",
        "insertBefore": "id(\"navbar\")"
    },
    {
        "url": "^https?://groups\\.google(?:\\.[^./]{2,3}){1,2}/groups/search",
        "nextLink": "id(\"navbar\")//td[last()][@class=\"b\"]/a",
        "pageElement": "id(\"res\")/*[self::div or self::br]"
    },
    {
        "url": "^http://scholar\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/scholar",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" n \")]/table/tbody/tr/td[last()]/a|id(\"gs_n\")//table/tbody/tr/td[span and b]/following-sibling::td/a",
        "pageElement": "//form[@name=\"gs\"]/following-sibling::node()[ following::div[contains(concat(\" \", @class, \" \"), \" n \")] ]|id(\"gs_ccl\")/div[@class=\"gs_r\"]"
    },
    {
        "url": "^http://(?:[^.]+\\.)?google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/news",
        "nextLink": "id(\"end-next\")/..",
        "pageElement": "id(\"search-stories story-articles\")"
    },
    {
        "url": "^https?://www\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/history/",
        "nextLink": "//td[@class=\"bl\"][last()-1]/a|//div[@class=\"nn\"]/parent::a",
        "pageElement": "//table[@class=\"res\"]"
    },
    {
        "url": "^http://www\\.google\\.[^./]{2,3}(?:\\.[^./]{2,3})?/logos/",
        "nextLink": "//div[@class=\"base-nav\"]//a[contains(., \"«\")]",
        "pageElement": "id(\"doodles\")|//div[contains(concat(\" \", @class, \" \"), \" title \")]"
    },
    {
        "url": "^http://books\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/books",
        "nextLink": "id(\"navbar\")//span[@class=\"navlink\"]/parent::a",
        "pageElement": "id(\"main_content\")/*"
    },
    {
        "url": "^https?://appengine\\.google\\.com/datastore/explorer\\?.",
        "nextLink": "id(\"ae-datastore-explorer\")//a[@class=\"ae-paginate-next\"]",
        "pageElement": "id(\"ae-datastore-explorer-entities\")"
    },
    {
        "url": "^https?://(?:[^/]+\\.)?google(?:\\.\\w{2,3}){1,2}/movies",
        "nextLink": "id(\"pnnext\")|id(\"navbar navcnt nav\")//td[span]/following-sibling::td[1]/a|id(\"nn\")/parent::a",
        "pageElement": "id(\"movie_results\")/*"
    },
    {
        "url": "^https://chrome\\.google\\.com/webstore/(?:list|search)",
        "nextLink": "//table[@class=\"paginator\"]//td[last()]/a",
        "pageElement": "//div[@class=\"mod-fullpage\"]/div[@class=\"mod-body\"]"
    },
    {
        "url": "^http://www\\.google\\.com/intl/ja/googlebooks/chrome/",
        "nextLink": "id(\"info\")/p[contains(concat(\" \",@class,\" \"),\"nav\")]/a[img[@src=\"images/arrowright.gif\"]]",
        "pageElement": "id(\"page\")/div[a[img] or img]"
    },
    {
        "url": "^http://desktop\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/",
        "nextLink": "id(\"content\")/table[@class=\"header\"]//a[contains(., \"»\")]",
        "pageElement": "id(\"content\")/*[(self::table and @class=\"gadget\") or (self::br and @style=\"clear: both;\")]"
    },
    {
        "url": "^http://sketchup\\.google\\.com/3dwarehouse/search\\?",
        "nextLink": "//div[@class=\"pager_next\"]/parent::a",
        "pageElement": "//div[@class=\"searchresult\"]/ancestor::tr[1]"
    },
    {
        "url": "^https://www\\.google\\.com/a/cpanel/[^/]+/",
        "nextLink": "//tr//ul[@class=\"inlinelist\"]//a[contains(text(),\"›\")]",
        "pageElement": "id(\"list\")"
    },
    {
        "url": "^http://www\\.google\\.com/support/forum/",
        "nextLink": "//div[@class=\"wppkrootCSS\"]/a[contains(text(), \">\")]",
        "pageElement": "//table[@class=\"lctCSS\"]"
    },
    {
        "url": "^http://www\\.google\\.com/products\\?",
        "nextLink": "id(\"nn\")/parent::a",
        "pageElement": "id(\"results\")|id(\"results\")/following-sibling::p[@class=\"clear\"]"
    },
    {
        "url": "^http://www\\.google\\.com/reviews/t",
        "nextLink": "//a[contains(text(), \"Next\")]",
        "pageElement": "id(\"allresults\")/table",
        "insertBefore": "//div[contains(concat(\" \", normalize-space(@class), \" \"), \" t_ftr \")]"
    },
    {
        "url": "^http://www\\.google\\.com/cse\\?cx=",
        "nextLink": "//div[@class='gsc-cursor-page gsc-cursor-current-page']/following-sibling::node()[1]",
        "pageElement": "//div[@class='gsc-webResult gsc-result']",
        "insertBefore": "//div[@class='gsc-cursor-box gs-bidi-start-align']"
    },
    {
        "url": "^http://www\\.google(?:\\.[^./]{2,3}){1,2}/m\\?.",
        "nextLink": "//*[starts-with(text(), \"Next page\") or starts-with(text(), \"次のページ\")]",
        "pageElement": "id(\"universal\")/div[not(@*)]",
        "insertBefore": "id(\"universal\")/*[@class][last()]"
    },
    {
        "url": "^http://followfinder\\.googlelabs\\.com/search",
        "nextLink": "//td[@class=\"more\"]//a[last()]",
        "pageElement": "//table//tr[//div]"
    },
    {
        "url": "^http://www\\.googlelabs\\.com/",
        "nextLink": "id(\"nav\")//td[@class=\"cur\"]/following-sibling::td[1]/a",
        "pageElement": "id(\"nav\")/preceding-sibling::ul"
    },

    // ========================= github ================================
    {name: "github mix",
        "url": "^https?://github\\.com/(?:dashboard|(?:timeline|[^/]+/[^/]+/(?:comments|network/feed)))",
        "nextLink": "//a[@hotkey=\"l\"]|//div[contains(concat(\" \",@class,\" \"),\" pagination \")]/a",
        "pageElement": "//div[@class=\"news\"]/div[contains(@class, \"alert\")]"
    },
    {name: "github 搜索",
        url: "^https?://github\\.com/search",
        nextLink: "//div[@class='pagination']/a[@rel='next']",
        autopager: {
            pageElement: "id('code_search_results issue_search_results')|//div[@class='sort-bar']/following-sibling::*[following-sibling::span[@class='search-foot-note']]",
            insertBefore: "//div[@class='pagination']",
            stylish: 'li.repo-list-item { text-align: left; }'
        }
    },
    {
        "url": "^https?://gist\\.github\\.com/",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" pagination \")]/a[contains(text(),\"Older\")]",
        "pageElement": "//div[contains(concat(\" \", @class, \" \"), \" gist-item \")]"
    },
        // 有点小问题，需要刷新下才有用
    {
        "url": "^https?://github\\.com/(?:changelog|[^/]+/[^/]+/commits)",
        "nextLink": "//a[contains(text(), \"Older\")]",
        "pageElement": "//*[starts-with(@class,\"commit-group\")]"
    },
    {
        "url": "^https?://github\\.com/[^/]+/[^/]+/watchers",
        "nextLink": "//div[@class=\"pagination\"]/span[@class=\"current\"]/following-sibling::a",
        "pageElement": "id(\"watchers\")"
    },
    {
        "url": "^https?://github\\.com/[^/]+/following",
        "nextLink": "//a[hotkey='l']",
        "pageElement": "id(\"watchers\")"
    },
    {
        "url": "^http://learn\\.github\\.com/p/",
        "nextLink": "//a[contains(text(), \"next\")]",
        "pageElement": "//div[@class=\"container\"]/div[@id=\"welcome\" or @class=\"content\"]"
    },
    {
        "url": "^http://github\\.com/blog",
        "nextLink": "//div[contains(concat(\" \",@class,\" \"),\" pagination \")]/a[contains(text(),\"Next\")]",
        "pageElement": "id(\"posts\")/div[contains(concat(\" \",@class,\" \"),\" list \")]/ul/li"
    },

    // ========= 很少用的 ================
    {name: 'bookcool-小说合集',
        url: '^http://www\\.bookcool\\.com/.*\\.htm',
        nextLink: '//div[@id="object1"]/descendant::a[last()][@href]',
        pageElement: '//div[@align="center"]/table[@width !="100%"]',
    },
    {name: 'Hachiya Makoto',
        url: '^http://g\\.e-hentai\\.org/s/.*$',
        nextLink: '//img[@src="http://ehgt.org/g/n.png"]/..',
        pageElement: '//body/div[@class="sni"]',
        exampleUrl: 'http://g.e-hentai.org/s/2221a78fe2/592744-3',
        useiframe: true
    },
];

//统配规则..用来灭掉一些DZ.或者phpwind论坛系统..此组规则..优先级自动降为最低..
var SITEINFO_TP=[
    {name: 'Discuz 论坛 - 搜索',
        url: '^https?://bbs\\.[a-z]+\\.cn/search\\.php\\?mod=forum',
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]',
        autopager: {
            pageElement:'//div[@id="threadlist"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]'
        }
    },
    {name: "Discuz 论坛 - 导读",
        url: /^https?:\/\/(?:bbs|u)\.[^\/]+\/(?:forum\.php\?mod=guide|home\.php\?mod=space)/i,
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]',
        autopager: {
            pageElement: "//div[@id='postlist'] | //form[@method='post'][@name] | //div[@id='threadlist']/div[@class='bm_c'] | //div[@class='xld xlda']",
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]'
        }
    },
    {name: 'Discuz论坛列表',
        url:/^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:2b\/)?(?:(?:forum)|(?:showforum)|(?:viewforum)|(?:forumdisplay))+/i,
        preLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href] | //div[@class="p_bar"]/a[@class="p_curpage"]/following-sibling::a[@class="p_num"]',
        autopager:{
            pageElement:'//form[@method="post"][@name] | //div[@id="postlist"]',
            replaceE: '//div[@class="pages" or @class="pg"][child::a[@class="next" or @class="nxt"][@href]]',
            lazyImgSrc: 'file|pagespeed_lsc_url'
        }
    },
    {name: 'Discuz论坛帖子',
        url:/https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:2b\/)?(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))+/i,
        preLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href] | //div[@class="p_bar"]/descendant::a[text()="››"]',
        autopager:{
            pageElement:'//div[@id="postlist"] | //form[@method="post"][@name]',
            replaceE: '//div[@class="pages" or @class="pg"][child::a[@class="next" or @class="nxt"][@href]]',
            lazyImgSrc: 'zoomfile',
            stylish: '.mbbs_code{font-family:Monaco,Consolas,"Lucida Console","Courier New",serif;font-size:12px;line-height:1.8em;list-style-type:decimal-leading-zero;padding-left:10px;background:none repeat scroll 0 0 #f7f7f7;color:#666;border:1px solid #ccc;overflow:hidden;padding:10px 0 5px 10px}',
            filter: function(pages){
                // 回复后插入到最后一页
                var replays = document.querySelectorAll("#postlistreply");
                if(replays.length > 1){
                    var first = replays[0];
                    first.parentNode.removeChild(first);
                }

                // 在卡饭论坛如果不存在，会提示，所以默认禁用
                // var SyntaxHighlighter = unsafeWindow.SyntaxHighlighter;
                // if (SyntaxHighlighter && SyntaxHighlighter.highlight) {
                //     SyntaxHighlighter.highlight();
                // }
            },
            documentFilter: function(doc) {
                // 卡饭论坛的下一页代码区域可能无法着色，所以手动修改并添加样式
                var pres = doc.querySelectorAll('pre[class^="brush:"]');
                [].forEach.call(pres, function(pre){
                    pre.classList.add('mbbs_code');
                });
            }
        }
    },
    {name: 'phpWind论坛列表',
        url:/^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)?thread/i,
        preLink:'//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink:'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
        autopager:{
            pageElement:'//div[@class="t z"] | //div[@class="z"] | //div[@id="ajaxtable"]',
        }
    },
    {name: 'phpWind论坛帖子',
        url:/^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)?read/i,
        preLink:'//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink:'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
        autopager:{
            pageElement:'//div[@class="t5"] | //div[@class="read_t"] | //div[@id="pw_content"]',
        }
    },
    {name: 'phpBB列表',
        url:/^https?:\/\/[^\/]+(\/[a-z,0-9]+)?\/viewforum/i,
        siteExample:'http://www.firefox.net.cn/forum/viewforum.php?f=4',
        nextLink:'auto;',
        autopager:{
            pageElement:'(//div[@id="page-body"]/div[@class="forumbg"]|//table[@class="forumline"]|//table[@class="tablebg"])',
            //replaceE:'//fildset[@class="display-options")]',
            remain:1/3,
        }
    },
    {name: 'phpBB帖子',
        url:/^https?:\/\/[^\/]+(\/[a-z,0-9]+)?\/viewtopic/i,
        siteExample:'http://www.firefox.net.cn/forum/viewtopic.php?t=34339',
        nextLink:'auto;',
        autopager:{
            //pageElement:'//div[@id="page-body"]',
            pageElement:'(//div[@id="page-body"]/div[contains(@class,"post")]|//table[@class="forumline"]|//table[@class="tablebg"])',
            //replaceE:"//fildset[@class='display-options']",
        }
    },
    {name: 'phpBB Search',
        url: /^https?:\/\/forum\.[^\/]+\/search\.php/i,
        exampleUrl: 'http://forum.everedit.net/search.php?keywords=%E5%A4%A7%E7%BA%B2',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("page-body")/div[starts-with(@class, "search post")]',
            replaceE: 'id("page-body")/ul[@class="linklist"]'
        }
    },
];

//兼容 oautopager的规则放在这里,此规则组..优先级最低(比统配规则还低)..
//所以说尽量不要放规则在这个组里面.
var SITEINFO_comp=[
    {name: 'discuz论坛通用搜索',
        url: '^http://[^/]+/f/(?:discuz|search)',
        nextLink: 'auto;',
        pageElement: 'id("result-items")',
    },
    {name: 'View forum - 通用',
        url: '^https?://.+?/viewforum\\.php\\?',
        nextLink: '//span[@class="gensmall"]/b/b/following-sibling::a[1] | (//table/tbody/tr/td[@class="nav"])[last()]/b[last()]/following-sibling::a[1]  | //div[@class="pagination"]/span/strong/following-sibling::a[1] | //a[text()="Next"]',
        pageElement: '//ul[contains(concat(" ",@class," ")," topics ")]|//form[table/@class="forumline"]',
    },
    {name: 'wiki 通用',
        url: '.\\?(?:.+&)?search=',
        nextLink: '//a[@class="mw-nextlink"]',
        pageElement: '//ul[@class="mw-search-results"]',
    },
    {name: '通用 Forum 规则1',
        url: '^https?://.*((showthread\\.php\\?)|(forum|thread))',
        nextLink: '//a[@rel="next"]',
        pageElement: '//div[@id="posts"]|//ol[@id="posts"]/li',
        separatorReal: false
    },
    {name: '通用 Forum 规则2',
        url: '^https?://[^?#]+?/showthread\\.php\\?',
        nextLink: '//tr[@valign="top"]//div[@class="pagenav"]//a[contains(text(), ">")]',
        pageElement: '(//div[@class="pagenav"])[1]|//div[@id="posts"]/node()',
        separatorReal: false
    },
    {name: '通用 Forum 规则3',
        url: '^https?://.*((forumdisplay\\.php\\?)|forum)',
        nextLink: '//a[@rel="next" or (text()=">")]',
        pageElement: '//tbody[starts-with(@id,"threadbits_forum_")]/tr[td[contains(@id,"td_threadtitle")] and not(td/div/text()[contains(.,"Sticky:")])]|//ol[@id="threads" and @class="threads"]/li',
        separatorReal: false
    },
    {name: 'PHPWind 5.3.0 / 6.0.0 / 6.3.2 / 7.0.0 / 7.5.0 - View Thread',
        url: '^https?://.+/read\\.php\\?.*tid((=[0-9]+.*)|(-[0-9]+.*\\.html?))$',
        nextLink: 'auto;',
        pageElement: '//form[@name="delatc"]',
        exampleUrl: 'http://www.yydzh.com/read.php?tid=1584013',
    },
];

//分页导航的6个图标:
var sep_icons={
    top:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjM3NkQ2MTFFOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjM3NkQ2MTFGOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc2RDYxMUM5NTI2MTFERkE2REY4  RUZDQkM2QzRENTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc2RDYxMUQ5NTI2MTFERkE2  REY4RUZDQkM2QzRENTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz7bso/VAAACxElEQVR42rSUS0iUURTH//d+j9EppSRtCjEi  w0EhjR6kIyUpWilFpbUTei1auMoellAQZFSbVrkQilplhZC9IKyNQg8CXVQKZigaOgojNdg3j++7  nTtjAzPqTI50Zu7ce+ec87vnnPtgQghIcZ3VxiGwGksRhomemwGHHKqRPwl6+ujFJXHvPLwWCUyN  VT7qvZ4UtK7oQtQ8CizLUlt4fr4U6ctmExPyZ478LelcMMNIa3vL2nkrR7KnvEaR/auuZ2akeHMt  f0SGsSvFSuk5rWOzs2RvXm6+zRJBDAx+8fUNfHjZfSNwMJ4fj6ekk9KU49hYuaXAZfs4/BzvhztR  6Nxmy85aXyl1SYFdjVrViuWrmqtLj9h7R18jKPwImD6CP0V5cY09fdnKZmmzKDA55Kqqrb2u4oR9  yNOHXz4PVEWDbtPhNSfR7+lGze46u6bp7dL2n8BkmMY4umrLj6XNCA8mfn4PQ3UdNgJzGzA28xnT  1giqdh4I2UqfuGAyYGTYUbH90JrMDAcbmuqFwlWCaiGoxQwomoCmc3z1vEV6RgrbUVTmkD7Sd+GI  GVo25Ra7tjp3af3ud1C5Dk3VQ9FazI+gYkAlqKqzUP/J3Yn8vAI9N8dZIn2jUJG3olE7nJ214cGp  /U2pMnVTmLCsIN4M3UMAXrj9g1B0AUXloAixb90Z0gtYpoBh+PD4xf2ZqemJ+p5bgSdRF4SMG0bd  31Ivt50MzxUYV463pchF3L/HaE5QjVNj4JzuocJw++5Vw/SLlFmEXTKojwbTgS+LqbfgZGmKAAzL  S+Xg4ARTCc5VFhpLKEXIFn1B5E5OG+PUy4wkDCGorDHj8R+lBGAGI+iN2t3QIowlfO3ig+kjb1v4  9aI2u1lBv0Xj+GA1nlKel+q8BnANdBrCdZVNBiwXSRY8eam1PjNBxlMLZpvo2UxWOP6T/BFgAOBe  8h+hfm64AAAAAElFTkSuQmCC',
    bottom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg2RjU3NUQzOTUyNjExREY4M0U4RDZGQThBMjcwMEIzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg2RjU3NUQ0OTUyNjExREY4M0U4RDZGQThBMjcwMEIzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZGNTc1RDE5NTI2MTFERjgzRThE  NkZBOEEyNzAwQjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZGNTc1RDI5NTI2MTFERjgz  RThENkZBOEEyNzAwQjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bp+ZPAAAC0UlEQVR42rRVXUhUQRT+5t67uzdZwwX/0FKS  CCMiwcwi6QfpwcAgKHvzpR6EoKeQpIcIJCOCIB8SooIgKK2gssBwQ0PXsB8s8KdSIhFzXbHS2vbe  ufdOM3fd1mx3zRUPezgzzDnfnP3mm7mEMYaVMAkrZEq8hZ0nHQEe0hepD3RfpJlLAhagtcfPgBBA  sGWZzHbT4JEC2e4NON1UnbHkjoURiaDdf8kGpCELOncaMkF0FceKG5PnmPBVxSlBkom9iehemEN2  gYEt7/CEasLCiQKpihuLqSkhMLMAQ+ecCl5NMQ9vkqZm82glVkVZrSMy7uC5uyMT2UlCnFvV0CxY  Fps7PN6t5IZMHLB4MpER4uph86jr5GFP1wUKZd7GjelpWSWH9lenqKpL8KoyDmbolt25afBoEnic  uTBMand89uh1VeboYn71YcOvscmRxliquDf13V/i9T06sWtH+aqu8VuwJO2P3ITMUuUMPiagBoX3  w02oDje2rq3AE9/t0Fhg5LLAiM0xQ93w6JBv4H2/XpxZaXcrOBZRMVVIzAld1zmwDsPSUZi5Ha+G  Oum74Z5uUZvo8MQ/PPiir2NiZjrENnr2gnJQkxIOqkLTdA5MYVoGCtKLEJieYO2997+Imr9kE0cV  szyxvO35g9k0KQ+5KZtgaZgD1W0+s1avQwrx4K73hp0rav6VmxB9xKM2TKle1fqsJVjoKYObc6tr  YdBUlwcFni1oab8WNAytSuRGb1QUJ5GO22Z+fq339rQGS/MP2LdNIU4UrdmHx13NwW8/pupFTlJv  BbeGsclP294OvawoXV/pkoiC1/3d2ujEx6di7X+fzc/ccxaoREiN9A32Ijsn/Dq+GfCJmkruNAbe  OPf8MHD0LPNqqurivEbiFyav5shmOd7709TckBeTCsJvQ0vf+aS+GIeLTiXmeGFC8p+mqMz8V+6c  y1oWGoE/MvwtwABuklC1izbNcAAAAABJRU5ErkJggg==',
    pre:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkUzRDUyNEQ5OTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkUzRDUyNERBOTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTNENTI0RDc5MEUyMTFERkIyM0VG  NDM2QzAyN0U1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTNENTI0RDg5MEUyMTFERkIy  M0VGNDM2QzAyN0U1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I8cyJAAAC20lEQVR42tRVW0hUURTd+5xz550PVMwcUksJ  JY2wrMHpoxQzQrFRxF5iGn1EERGEZCBI9OFPUR9ZkNRX0a9fkeBPEhFBP1mDFj0xdVTSqXnce8/p  3Gtjvh+IH53LZu6Bc9dZe+2196AQAtZjEVinxWIv3stsqXM3ATG+16E1iVbBVwUsOC525pI7dfNp  gRApDnxulvvrq5KCoFgoKhLjktsOeWud5d7qhHhX0lnPBaVqVcA6J3Njp9224ZGvtMHhD7yE/vFe  UlN+PM0V52jPr6WFKwbmTJ0ZbsZYt6+k0RkIfYLByX74HvTDYLSP1FQe25KYpTzYtJel25LQ1A+T  ERcFtgenw8U47anaX5+AFh0+BN6AwizAKAX/2HPQ7OPEV+HLzSyGu1YH2JOyFSICQmi6RhYEThkx  g6oO1lXuqctIS0kn74deACOKGZwIQCn62/GnkJaZggdLDpdlVyo3RgdU0yU4x7nTu8EsasQdT36Z  Jz9nt9L3oxcoMqASFOQvF5p0HKDOBbwaeUJ2FBTQosI9ddtPWq4Z30vGuCCwEORiXkbRiZJdR6zv  JFMBXILSKXAkQlWjgmuyFrqA4K/f0PO1E0u9B5w52zaecleQRkZm9wHGWvpoe17oTFWLjVKZtkTQ  JcNu/0NQ9bAIa5M4HBkAq5MKi41gdW6L5A1E6MgnJkbVjse3hz6+Dp379ox3zWuQL8P9tqv3GqbS  YBhua+qUEER6maIajchUZQZRQwyZi4bYeqs59DMobPKI1UrRHZcB5+Wn84FN/WPW04RsNDSl0KSn  VflwWSNNFo8LRF0Thoa2gfucLNvScxdKKkalDdbGnbLluRrhhArCNVUnBNcw3fCv7xVqMc8a40eL  cIxGVHkhrn1s2hWXwdkQybAP6sYNywAvOSv3ba2VM0OTOqswGR4DlUdiXjL4rxB4NvehKx31qf+2  YmZtwXQo4siSMv53f03rBvxHgAEAqLoqsgGSMo4AAAAASUVORK5CYII=',
    next:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkY3M0ZDRTgzOTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkY3M0ZDRTg0OTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjczRkNFODE5MEUyMTFERkI2OUVB  RjVBQjI2NDU3MTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjczRkNFODI5MEUyMTFERkI2  OUVBRjVBQjI2NDU3MTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Q0swTAAAC50lEQVR42tRVXUhUQRQ+M/dnd0sN/1gtAimW  LXsoiAixFyGIHnqNioioh36ghyh6sCAijAgiIoLowSRMBG1b1n5s0XxRtiyRlIpQ1M1sKxV1XffH  e2emM+u6qG11EXzoXM6de2fOfPeb8x3OJUIIWAmjsEKmzj+UndeWrv0kAgoJWTglT0cW0vqB96L5  144bxu/Ac5sWWeHpQxfT0xq1QbY9D1SqgUJVHHWovHfE+U/GU5Mc1uQoi1cFgYbua8mPErxK8reC  Q8sGm+qACtdh6zmejnLEEGlXCC4TTAiGSeiYEVm+eGMRDhxBpes2DVQbFWQuihtsdu4gFiopY1WM  T0tgEKqmCFUnVEuCCypTwgWXdwTnloH96CylIsdtcUUloNspqDpFdAoaXhKQcYZBAqhK4ql4sVT9  tHjhINzZsN3uPnngjDMnJ18jinAQEFy3KXIQzBBE023ImOEbJ5L51eM1dooVwpgB971V8YyMgy/M  5wMfYlcantaNJ8yI8H+7LXzDVRSrSlAFiKJRITVk3ERQA9r6auF10AfRRBjqW+7Ghsf6KzMCm9yU  Q3Xf5+8PWtpfzVSsPyayVq8CioSRFGiaTpAruplMBc7CZmcZtL57kvgY7KzFvbcyAquKKoLeJPil  zq439e97etiOwv1coURWnqAE0ZOgBkjw0qJy6O17awR6/YHiQXZq7ZCRWTyptOpUIBQQtN9nnH3Z  +swfGhoVW3L3yBQTygmeykj6JmQaGh3hzYH6oBY196VE/2NV8FQj4IkoxIY64ISnyfNJjeVyd94u  MBkDw5yFjQXbQMwq4G17OGlSVoHxESt1LBaMIxODxtFGX91AsV7K12W5oTjbBQWOEvC0Vs+Yprkb  Y74ut212RcLRC43Nj0Ku3HLuLtgJnpaaaCw+fRDXui21zb+YdyoyXtrc/vgcdg3bRHjsMurZZLkf  L7XQXgahdOrhevnoFxeWxxTKcNNKEyL/3a9pxYB/CTAALMFZuEnI1jsAAAAASUVORK5CYII=',
    next_gray:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg1RDA5RjFGOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg1RDA5RjIwOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODVEMDlGMUQ5NTIyMTFERkIyQzhB  RkQ4RjhDODYwNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODVEMDlGMUU5NTIyMTFERkIy  QzhBRkQ4RjhDODYwNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz62tt8rAAACiUlEQVR42tRVS6tSURTe5/hWFAderhoIKqmI  U2eCBg2a9AOaBQ4iZxE0yCCcNYkGDYWaNEh8ICQpoYg4CJQIFA0chKGpBb7A9+Oc1jp4LnK12+GC  gxYs1j7stb79rcfeh2JZlpxCaHIiEfMLj8dzee836NlVwRRF/QKj57+LxeIh8BE5CwQChC+VRCIh  arWaiEQiTsViMQkGg+f/ZDyfz4lcLj9wiEajF2uz2UwUCgWRyWTE5/MJr/FqteIY8gqporI7SxaL  xfWbt1wuL4ClUimWgAMGYdbrNecjZJKOTgWCYzzUkYV60mh53/2MhAJ/At1iLLIDXWCTsGkATGGz  aJomDMOQ7XbLAcP+YufP62HzRqPRa5PJZPf7/edarVYC6SvwAADGOrAARmHTABgwWQqBQ6GQHA/f  bDYkHA4vjjJuNBofO51OKB6P96FJbDabZVOpFA2BLDBFxlhr7gBknM/nSalUIrPZjEQikXm73X56  FBhPBXnTbDbfFgqFqdfrZVUqFZc+KjIHthRfCmyow+EguVxuWavV3kHsq6PAyKher+PyWblcfl+p  VLZut5tBUMwdU0ZQJIDW6XSSarW6/gwyGAwe9vv94xcEa6bRaIhSqaRhrB4B0A24aXdcLhcFKXM1  RVA8AJn2ej0mnU7/gNm/u2v6X6cCJ4Hazeu81Wo9SCaT3yATxm63c+njHFssFo4x7I3A9xboRMgc  s3v2J6R3PxaLfdfr9YzRaCQGg4HodDqSSCSmwP42+LSv+2x+mUwmTwCoa7PZGFAEnU2n03uw91XQ  s3mFJMfjsTOTyTyGtWw4HD4H+0Hwe3xZrFbr/ueLbrd7Exo4hvVLIY8Q9d/9mk4G/EeAAQCBEkva  rHrRPgAAAABJRU5ErkJggg==',
    pre_gray:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjc0MTI5MDY4OTUyMjExREZCODVDREYyM0U0QjMzQkQzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjc0MTI5MDY5OTUyMjExREZCODVDREYyM0U0QjMzQkQzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzQxMjkwNjY5NTIyMTFERkI4NUNE  RjIzRTRCMzNCRDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzQxMjkwNjc5NTIyMTFERkI4  NUNERjIzRTRCMzNCRDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz5D2F5XAAACZklEQVR42tSVz6sSURTH7x0VJxX8CampSQtF  /AESConiQkhdlKKCLdr0YxW0iDaBSBLZok3tol27/oC3TcS14EpEBV24UOO5EETLn9M5g4KoPXu9  XHTgMNc7537me7/3zEg5jiOnCIacKISbQSAQuKjuI6VULhAInhSLxdWlFKMlv8mXer3+qU6nu79c  Ll/9KyvuKZXKN9FoVBqJRBRyufyZz+eLXxXslkqlXxOJhKTZbBJIBsY6mUz23uFw3P5bsEEoFH4D  kHQwGJBer0e63S7p9/tMKpW6pVarv5hMphsSiYRi8eZ6EDybzTYpg5/FeDyuYBiGtNttIhKJCBwc  aTQaZLFYMHDPZjQaP8P8NY1Gw0wmEw7nD4LH4zGmQCwWn4GnN7VaLVOv13kgqCfQFZhctVolcJg0  HA7ftdlsH2BHfJfg/YNglUqF+ekOhNPpFNVqNYKKEYpX6AhcTFerFSmXy4zL5RJ4PJ4Hbrf7La4H  xfQgGNa8sNvtD0OhkBiVYquhWoRCcvP5nEMoJu6uVCrRYDAoNZvNj6xW62MUcPAFMRgM79LpNIsF  Xq+XBxQKBYQjlIIifgzKaSwWw+0z8HCaTCbVw+HwtcViOW+1Wmd74E6nw2azWX4MgJ+5XI5F30At  nU6n/IM220VgPp//AfNYI4Yag0KheA639sHoxmYAqjiEohXo7RrKHx5CcQ6CrVQqzNFvxW6su2D7  tFfrllrtttalX+kNFPt47SlBv7Hfd9vrjxVvB8uyZOu7jX5cDez3+3mPMUejEard281R8E7h90wm  c/3IRs4vtPG/+2s6GfiXAAMAq3cXTADTBMIAAAAASUVORK5CYII=',
};

//悬浮窗的状态颜色.
var FWKG_color={
    loading:'#8B00E8',    // 读取中状态
    prefetcher:'#5564AF', // 预读状态
    autopager:'#038B00',  // 翻页状态
    Apause:'#B7B700',     // 翻页状态(暂停).
    Astop:'#A00000',      // 翻页状态(停止)(翻页完成,或者被异常停止.)(无法再开启)
    dot:'#00FF05',        // 读取完后,会显示一个小点,那么小点的颜色.
};

//当没有找到规则的时候,进入自动搜索模式.
//在没有高级规则的网站上.的一些设置..
var autoMatch={
    keyMatch:true,              //是否启用关键字匹配
        cases:false,            //关键字区分大小写....
        digitalCheck:true,      //对数字连接进行检测,从中找出下一页的链接
        pfwordl:{               //关键字前面的字符限定.
            previous:{          //上一页关键字前面的字符,例如 "上一页" 要匹配 "[上一页" ,那么prefix要的设置要不小于1,并且character要包含字符 "["
                enable:true,
                maxPrefix:3,
                character:[' ','　','[','［','<','＜','‹','«','<<','『','「','【','(','←']
            },
            next:{//下一页关键字前面的字符
                enable:true,
                maxPrefix:2,
                character:[' ','　','[','［','『','「','【','(']
            }
        },
        sfwordl:{               //关键字后面的字符限定.
            previous:{          //上一页关键字后面的字符
                enable:true,
                maxSubfix:2,
                character:[' ','　',']','］','』','」','】',')']
            },
            next:{              //下一页关键字后面的字符
                enable:true,
                maxSubfix:3,
                character:[' ','　',']','］','>','﹥','›','»','>>','』','」','】',')','→']
            }
        },
    useiframe: GM_getValue('SITEINFO_D.useiframe') || false,            //(预读)是否使用iframe..
    viewcontent: false,          //查看预读的内容,显示在页面的最下方.
    FA: {                       //强制拼接 选项 功能设置.
        enable:false,           //默认启用 强制拼接
        manualA:false,          //手动翻页.
        useiframe:false,        //(翻页)是否使用iframe..
            iloaded:false,      //(只在opera有效)如果使用iframe翻页..是否在iframe完全load后操作..否则在DOM完成后操作
            itimeout:0,         //当使用iframe翻页时在完成后继续等待多少毫秒后,在操作..
        remain:1,               //剩余页面的高度..是显示高度的 remain 倍开始翻页..
        maxpage:99,             //最多翻多少页..
        ipages:[false,2],       //立即翻页,第一项是控制是否在js加载的时候立即翻第二项(必须小于maxpage)的页数,比如[true,3].就是说JS加载后.立即翻3页.
        separator:true,         //显示翻页导航..(推荐显示.)..
    }
};

//上一页关键字
var prePageKey=[
    '上一页', '上一頁', '上1页', '上1頁', '上页', '上頁',
    '翻上頁', '翻上页',
    '上一张', '上一張', '上一幅', '上一章', '上一节', '上一節', '上一篇',
    '前一页', '前一頁',
    '后退', '後退', '上篇',
    'previous', 'previous Page', '前へ', '前のページ'
];

//下一页关键字
var nextPageKey=[
    '下一页', '下一頁', '下1页', '下1頁', '下页', '下頁',
    '翻页', '翻頁', '翻下頁', '翻下页',
    '下一张', '下一張', '下一幅', '下一章', '下一节', '下一節', '下一篇',
    '后一页', '後一頁',
    '前进', '下篇', '后页', '往后',
    'Next', 'Next Page', '次へ', '次のページ'
];

// 出在自动翻页信息附加显示真实相对页面信息，一般能智能识别出来。如果还有站点不能识别，可以把地址的特征字符串加到下面
// 最好不要乱加，一些不规律的站点显示出来的数字也没有意义
var REALPAGE_SITE_PATTERN = ['search?', 'search_', 'forum', 'thread'];


//------------------------下面的不要管他-----------------
///////////////////////////////////////////////////////////////////
