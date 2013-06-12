// ==UserScript==
// @id             mynovelreader@ywzhaiqi@gmail.com
// @name           My Novel Reader
// @version        2.3.6
// @namespace      ywzhaiqigmail.com
// @author         ywzhaiqi
// @description    小说清爽阅读脚本。
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @updateURL      https://userscripts.org/scripts/source/165951.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165951.user.js
// @require        http://code.jquery.com/jquery-1.9.1.min.js

// @include        http://read.qidian.com/*,*.aspx
// @include        http://www.qdmm.com/BookReader/*.aspx
// @include        http://www.jjwxc.net/onebook.php*
// @include        http://book.zongheng.com/chapter/*/*.html
// @include        http://www.xxsy.net/books/*.html
// @include        http://book.zhulang.com/*.html
// @include        http://www.17k.com/chapter/*.html
// @include        http://www.kanxia.net/k/*.html
// @include        http://www.qingdi.com/files/article/html/*.html
// @include        http://www.xkzw.org/*.html
// @include        http://bbs.chinaunix.net/thread-*.html
// @include        http://www.paoshu8.net/Html/*.shtm
// @include        http://shouda8.com/*.html
// @include        http://novel.hongxiu.com/*.shtml

// booklink.me
// @include        http://www.shumilou.com/*.html
// @include        http://www.wcxiaoshuo.com/wcxs-*-*/
// @include        http://www.ranwen.cc/*.html
// @include        http://www.ranwen.net/files/article/*.html
// @include        http://www.bxs.cc/*.html
// @include        http://www.laishuwu.com/html/*.html
// @include        http://www.taomeier.com/book/*.html
// @include        http://www.binhuo.com/html/*.html
// @include        http://www.haoqi99.com/*.shtml
// @include        http://www.shuhe.cc/*/*/
// @include        http://www.dudukan.net/html/*.html
// @include        http://www.hahawx.com/*.htm
// @include        http://www.zhuzhudao.com/txt/*/*/
// @include        http://www.tadu.com/book/*
// @include        http://www.fkzww.net/thread-*.html
// @include        http://www.aishoucang.com/*.html
// @include        http://www.wanshuba.com/Html/*.html
// @include        http://www.zhuishu.net/files/article/html/*.html
// @include        http://www.sqsxs.com/*/*/*.html
// @include        http://www.6xiaoshuo.com/*.html
// @include        http://www.hotsk.com/Html/Book/*.shtml

// www.sodu.so
// @include        http://www.qishuwu.com/*
// @include        http://www.jiaodu8.com/*.html
// @include        http://www.fktxt.com/book/*.html
// @include        http://www.186s.cn/files/article/html/*.html
// @include        http://www.6xs.cn/xs/*.html
// @include        http://www.chaojiqiangbing.com/book/*.html
// @include        http://book.moka123.com/book/*.html
// @include        http://www.suimeng.com/files/article/html/*.html
// @include        http://www.hao662.com/haoshu/*.html

// 百度搜索网站
// @include        http://www.dixiaoshuo.com/Html/*/*.html
// @include        http://www.nieshu.com/Book/*/*/*.shtml
// @include        http://www.tlxsw.com/files/article/html/*/*/*.html
// @include        http://www.1kanshu.com/files/article/html/*/*/*.html
// @include        http://www.uutxt.org/book/*/*/*.html
// @include        http://www.5800.cc/*/*/*/*.html
// @include        http://www.biquge.com/*.html
// @include        http://www.qududu.com/book/*.html
// @include        http://www.free97.cn/book/*.html
// @include        http://www.122s.com/book/*.html
// @include        http://www.123du.net/*.html
// @include        http://www.hwafa.com/*.html
// @include        http://www.qmshu.com/html/*.html
// @include        http://dlzw.cc/article*.html
// @include        http://www.shushuw.cn/*.html
// @include        http://www.shushu5.com/read/*.html
// @include        http://www.qiuwu.net/html/*.html
// @include        http://www.xiaoyanwenxue.com/files/article/html/*.html
// @include        http://www.3gsc.com.cn/*
// @include        http://www.bj-ibook.cn/book/*.htm
// @include        http://www.baoliny.com/files/article/html/*.html
// @include        http://www.dajiadu.net/files/article/html/*.html
// @include        http://www.yankuai.com/files/article/html/*.html
// @include        http://www.docin.net/*.html
// @include        http://www.dushuge.net/html/*.html
// @include        http://www.xunshu.org/*.html
// @include        http://www.moneyren.com/book/*.shtml
// @include        http://wemaxfilipino.com/*.html
// @include        http://www.85618892.cn/xiaoshuo/*.shtml
// @include        http://www.bookba.net/Html/Book/*.html
// @include        http://www.moksos.com/*.html
// @include        http://dudu8.net/novel/*.html
// @include        http://www.dawenxue.net/html/*.html
// @include        http://www.yanmoxuan.org/book/*.html
// @include        http://www.duyidu.com/xiaoshuo/*.html
// @include        http://www.69zw.com/xiaoshuo/*.html
// @include        http://www.laishu.com/book/*.shtml
// @include        http://www.bxwx.org/*.html
// @include        http://www.360118.com/html/*.html*
// @include        http://www.59to.com/files/article/xiaoshuo/*.html
// @include        http://www.dyzww.com/*.html
// @include        http://www.kanshu.la/book/*.shtml
// @include        http://www.9wh.net/*.html
// @include        http://www.luoqiu.com/html/*.html
// @include        http://www.epzw.com/files/article/html/*.html
// @include        http://www.dashubao.com/book/*.html
// @include        http://*faloo.com/*.html
// @include        http://www.baikv.com/xiaoshuo/*.html
// @include        http://www.66721.com/*.html
// @include        http://www.3dllc.com/html/*.html
// @include        http://www.xstxt.com/*
// @include        http://www.zzzcn.com/*
// @include        http://xs321.net/*
// @include        http://www.nilongdao.com/book/*.html
// @include        http://www.book108.com/*.html
// @include        http://read.guanhuaju.com/files/article/html/*.html
// @include        http://5ycn.com/*.html
// @include        http://www.zhaoxiaoshuo.com/chapter-*
// @include        http://www.zbzw.com/*.html
// @include        http://manghuangji.cc/*.html
// @include        http://www.aiqis.com/*.html
// @include        http://www.fftxt.net/book/*.html
// @include        http://www.5kwx.com/book/*.html
// @include        http://www.uuxiaoshuo.net/html/*.html
// @include        http://www.sanyyo.org/*.html
// @include        http://www.chinaisbn.com/*.html
// @include        http://www.caihongwenxue.com/Html/Book/*.html*
// @include

// @exclude        */List.shtml
// @exclude        */List.html
// @exclude        */index.html

// @run-at         document-start
// ==/UserScript==

/**
支持站点

 - 起点中文网、晋江文学网、纵横中文网、潇湘书院、逐浪
 - 燃文、无错、书迷楼、冰火中文、百晓生、浩奇、书河
 - 手打吧、泡书吧、17k、看下、青帝、侠客、
 - 其它通用小说网站。（没有站点配置的，例如：红袖添香）
*/

(function(css){

    if (window.frameElement && window.frameElement.name == "novelreader-iframe") {
        return;
    }

    // 所有的设置
    var config = {
        AUTO_ENABLE: true,       // 自动启用总开关。有问题，一些主页也会自动启用
        booklinkme: true,        // booklink.me 跳转的自动启动
        soduso: false,            // www.sodu.so 跳转
        BASE_REMAIN_HEIGHT: 800,
        DEBUG: false,
        fullHref: true,
        content_replacements: true,      // 小说屏蔽字修复
        fixImageFloats: true
    };

    var READER_AJAX = "reader-ajax";  // 内容中ajax的 className，不能更改

    // 自动尝试的规则
    var rule = {
        // next_text: /[下后][一]?[页张个篇章节步]/,       // 下一页正则，匹配文字
        // prev_text: /[上前][一]?[页张个篇章节步]/,
        nextSelector: "a:contains('下一页'), a:contains('下一章'), a:contains('下页')",
        prevSelector: "a:contains('上一页'), a:contains('上一章'), a:contains('上页')",
        nextUrlIgnore: /index|list|last|end|BuyChapterUnLogin/i,                 // 忽略的下一页链接，匹配链接

        // 按顺序匹配，匹配到则停止。econtains 完全相等
        indexSelectors: ["a:contains('返回书目')", "a:contains('章节目录')", "a:contains('章节列表')",
            "a:econtains('最新章节')", "a:contains('回目录')", "a:contains('目 录')", "a:contains('目录')"],

        contentSelectors: ["#bmsy_content", "#bookpartinfo", "#htmlContent", "#chapter_content", "#chapterContent", "#partbody",
            "#article_content", "#BookTextRead", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td", "#TXT",
            ".novel_content", ".readmain_inner", ".noveltext", 
            "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#content", ".content"],

        contentRemove: "script:not(." + READER_AJAX + "), iframe, a, font[color]",          // 内容移除选择器
        contentReplace: /最新章节|百度搜索|小说章节|全文字手打|“”&nbsp;看|无.弹.窗.小.说.网|追书网/g,

        replaceBrs: /(<br[^>]*>[ \n\r\t]*){2,}/gi,                         // 替换为<p>
    };

    // 自定义站点规则
    rule.specialSite = [
        // 详细版规则示例。时不时没法访问。
        {siteName: "泡书吧",                                               // 站点名字... (可选)
            url: "^http://www\\.paoshu8\\.net/Html/\\S+\\.shtm$",          // // 站点正则... (~~必须~~)
            exampleUrl: "http://www.paoshu8.net",                         // 站点实例... (可选)
            titleReg: /(.*?)最新章节 [-_\\\/](.*?)[-_\/].*/,         // 书籍标题、章节标题正则 (可选)
            titlePos: 0,                                          // 书籍标题位置：0 或 1 (可选，默认为 0)
            indexSelector: "a:contains('回目录')",                    // 首页链接 jQuery 选择器 (不填则尝试自动搜索)
            prevSelector: "a:contains('翻上页')",                      // 上一页链接 jQuery 选择器 (不填则尝试自动搜索)
            nextSelector: "a:contains('翻下页')",                     // 下一页链接 jQuery 选择器  (不填则尝试自动搜索)
            contentSelector: "#BookText",                             // 内容 jQuery 选择器 (不填则尝试自动搜索)
            contentReplace: /(\*W|（w|\(w).{10,25}(吧\*|）|\))|看小说就上|本书首发|泡.{1,6}吧|百度搜索阅读最新最全的小说|http:\/\/www.paoshu8.com\/|无弹窗/g,                                // 需要移除的内容正则 (可选)
            contentPatch: function(fakeStub){                          // 内容补丁。解决翻页是脚本的情况 (可选)
                var $next = fakeStub.find('#LinkMenu');
                $next.html($next.html().replace(/<script>ShowLinkMenu.*?(<a.*?a>).*?(<a.*?a>).*?script>/,'$1$2') +
                    '<a href=\'List.shtm\'>回目录</a>');
            }
        },

        // 特殊站点，需再次获取且跨域。添加 class="reader-ajax"，同时需要 src
        {siteName: "起点中文网",
            url: "^http://read\\.qidian\\.com/\\S+/\\d+,\\d+.aspx$",
            exampleUrl: "http://www.qidian.com/",
            titleReg: /小说:(.*?)独家首发\/(.*?)\/.*/,
            contentReplace: /起点中文网|www.qidian.com|欢迎广大书友.*/g,
            contentPatch: function(fakeStub){
                fakeStub.find('div#content script:first').addClass('reader-ajax');
            }
        },
        // 特殊处理。
        {siteName: "手打吧",
            url: /^http:\/\/shouda8\.com\/\w+\/\d+\.html/,
            exampleUrl: "http://shouda8.com/chaojinengyuanqiangguo/3723291.html",
            contentReplace: /[w\s\[\/\\\(]*.shouda8.com.*|(\/\/)?[全文字]?首发|手打吧|\(w\/w\/w.shouda8.c\/o\/m 手、打。吧更新超快\)|小说 阅读网 www.xiaoshuoyd .com/ig,
            contentPatch: function(fakeStub){
                var scriptSrc = fakeStub.find('body').html().match(/outputContent\('(.*txt)'\)/)[1];
                scriptSrc = "http://shouda8.com/ajax.php?f=http://shouda8.com/read" + scriptSrc;
                fakeStub.find('#content').attr({
                    "class": 'reader-ajax',
                    src: scriptSrc
                });
            }
        },

        // 标题和底部下一页 会到左边
        {siteName: "晋江文学网",
            url: /^http:\/\/www\.jjwxc\.net\/onebook\.php\S*/,
            exampleUrl: "http://www.jjwxc.net",
            titleReg: /《(.*?)》.*ˇ(.*?)ˇ.*/,
            contentPatch: function(fakeStub){
                fakeStub.find('h2').remove();
                fakeStub.find('#six_list, #sendKingTickets').parent().remove();
            }
        },

        {siteName: "纵横中文网",
            url: "^http://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$",
            titleReg: /(.*?)-(.*)/,
            contentPatch: function(fakeStub){
                fakeStub.find('.watermark').remove();
            }
        },

        {siteName: "潇湘书院",
            url: /^http:\/\/www\.xxsy\.net\/books\/.*\.html/,
            exampleUrl: "http://www.xxsy.net/books/479031/5210673.html",
            contentSelector: "#detail_list",
            nextSelector: "a[title='阅读下一章节']"
        },
        {siteName: "逐浪",
            url: /^http:\/\/book\.zhulang\.com\/.*\.html/,
            exampleUrl: "http://book.zhulang.com/234666/606867.html",
            titleReg: /(.*?)-(.*)/,
            contentSelector: "#readpage_leftntxt",
            contentPatch: function(fakeStub){
                var title = fakeStub.find(".readpage_leftnzgx a:first").text() + "-" +
                    fakeStub.find(".readpage_leftntit").text();
                fakeStub.find('title').html(title);
            }
        },
        {siteName: "燃文",
            url: /^http:\/\/www\.ranwen\.cc\/.*\.html$/,
            exampleUrl: "http://www.ranwen.cc/A/3/3428/4446495.html",
            titleReg: /(.*?)-(.*?)-.*/,
            contentSelector: "#oldtext",
            contentReplace: /”娱乐秀”|[“” ]*看|更多精彩小[说說].*/g,
            contentPatch: function(fakeStub) {
                fakeStub.find("#oldtext").find("div[style], script").remove();
            }
        },
        {siteName: "无错小说网",
            url: /^http:\/\/www\.wcxiaoshuo\.com\/wcxs[-\d]+\//,
            exampleUrl: "http://www.wcxiaoshuo.com/wcxs-28021-8803615/",
            titleReg: /(.*?)最新章节.*?-(.*?)-.*/,
            titlePos: 1,
            nextSelector: "a#htmlxiazhang",
            prevSelector: "a#htmlshangzhang",
            indexSelector: "a#htmlmulu",
            contentReplace: /.*ddefr\.jpg.*|无(?:错|.*cuow\.jpg.*)小说网不[少跳]字|w[a-z\.]*om?|.*由[【无*错】].*会员手打[\s\S]*/ig,
        },
        {siteName: "书迷楼",
            url: /^http:\/\/www\.shumilou\.com\/.*html$/,
            exampleUrl: "http://www.shumilou.com/caisewujiang/1146877.html",
            titleReg: /(.*) (.*?) 书迷楼/,
            titlePos: 1,
            contentSelector: "#content",
            contentPatch: function(fakeStub){
                fakeStub.find("#content").find("div.title:last")
                    .appendTo(fakeStub.find('body'));
                fakeStub.find("#content").find("div.title, p > b").remove();
            }
        },
        {siteName: "冰火中文",
            url: /^http:\/\/www\.binhuo\.com\/html\/[\d\/]+\.html$/,
            exampleUrl: "http://www.binhuo.com/",
            titleReg: /(.*?)最新章节,(.*?)-.*/,
            contentReplace: /冰火中文|(www\.)?binhuo\.com/ig
        },
        {siteName: "百晓生",
            url: /^http:\/\/www\.bxs\.cc\/\d+\/\d+\.html$/,
            exampleUrl: "http://www.bxs.cc/22739/8894713.html",
            titleReg: /(.*?)\d*,(.*)/,
            contentReplace: /[\[【].*[\]】]|文字首发|bxs.|[\[\]\(《].*百晓生.*|百晓生.不跳字|百.晓.生.|w[a-z\.]*|关闭.*广告.*|飘天文学|本站域名就是.*|\(.{0,5}小说更快更好.{0,5}\)|(请在)?百度搜索.*/ig,
        },
        {siteName: "浩奇文学网",
            url: /^http:\/\/www\.haoqi99\.com\/.*\.shtml$/,
            exampleUrl: "http://www.haoqi99.com/haoqi99/0/432/3293984.shtml",
            titleReg: /^(.*?)--(.*?)-/,
        },
        {siteName: "书河小说网",
            url: /^http:\/\/www\.shuhe\.cc\/\d+\/\d+/,
            exampleUrl: "http://www.shuhe.cc/12012/4011985/",
            contentSelector: "#TXT",
            contentReplace: /wxs.o|ww.x.om|[\[【\(].{1,20}[\]\)】]|ff37;.*|书河小说网高速首发.*|TXT下载|书河小说网|全文阅读|第一书河小说网|百书斋.*|首发来自书河小说网|Www.Shuhe.Cc|本书最新章节/ig,
        },
        {siteName: "爱收藏",
            url: /http:\/\/www\.aishoucang\.com\/\w+\/\d+\.html/,
            exampleUrl: "http://www.aishoucang.com/manghuangji/379.html",
            contentSelector: "#zhutone",
            contentReplace: /.爱收藏[^<]*/g
        },
        {siteName: "追书网",
            url: "^http://www\\.zhuishu\\.net/files/article/html/.*\\.html",
            exampleUrl: "http://www.zhuishu.net/files/article/html/2/2092/866717.html",
            titleReg: /(?:正文 )?(.*) (\S+) \S+ - .*/,
            titlePos: 1,
            contentReplace: /www.zhuiSHu.net/ig,
            contentPatch: function(fakeStub){
                fakeStub.find("#content").find("div.title").appendTo(fakeStub.find("body"));
                fakeStub.find("#content").find("div[class], center").remove();
            }
        },
        {siteName: "啃书(图)",
            url: /^http:\/\/www\.fkzww\.net\/thread-.*\.html$/,
            exampleUrl: "http://www.fkzww.net/thread-315537-1-1.html",
            titleReg: /(.*?) (.*?)-.*/,
            contentSelector: ".t_msgfontfix",
            contentPatch: function(fakeStub){
                fakeStub.find(".t_msgfontfix").find(".imgtitle, .pstatus").remove();
                fakeStub.find(".next").attr("href", "");
            }
        },
        {siteName: "猪猪岛小说",
            url: "http://www\\.zhuzhudao\\.com/txt/",
            exampleUrl: "http://www.zhuzhudao.com/txt/22948/6686323/",
            contentReplace: /[“"”]?猪猪岛小说.*|[Ｗw]*.ZhuZhuDao.com.*/ig
        },
        {siteName: "17k小说网",
            url: /^http:\/\/\S+\.17k\.com\/chapter\/\S+\/\d+\.html$/,
            exampleUrl: "http://www.17k.com",
            titleReg: /(.*?)-(.*?)-.*/,
            contentPatch: function(fakeStub){
                fakeStub.find('xscript, #hotRecommend, .ct0416, .recent_read').remove();
            }
        },
        {siteName: "看下文学",
            url: /^http:\/\/www\.kanxia\.net\/k\/\d*\/\d+\/\d+\.html$/,
            exampleUrl: "http://www.kanxia.net/",
            titleReg: /(.*?)-.*?\\s(.*)TXT下载_看下文学/,
            contentReplace: /(?:看下文学|www.kanxia.net)/g
        },
        {siteName: "青帝文学网",
            url: /^http:\/\/www\.qingdi\.com\/files\/article\/html\/\d+\/\d+\/\d+\.html$/,
            exampleUrl: "http://www.qingdi.com/files/article/html/0/22/3790055.html",
            titleReg: /(.*?)最新章节_(.*?)_青帝文学网_.*/
        },
        {siteName: "侠客中文网",
            url: /^http:\/\/www\.xkzw\.org\/\w+\/\d+\.html/,
            exampleUrl: "http://www.xkzw.org/xkzw14415/8021095.html",
            // titleReg: /(.*?) (.*)/,
            contentSelector: ".readmain_inner .cont",
            contentPatch: function(fakeStub){
                fakeStub.find('title').html(fakeStub.find('.readmain_inner h2').text());
            }
        },

        {siteName: "ChinaUnix.net",
            url: /^http:\/\/bbs\.chinaunix\.net\/thread-.*\.html/,
            exampleUrl: "http://bbs.chinaunix.net/thread-4065291-1-1.html",
            contentSelector: ".t_f:first"
        },
        {siteName: "123du 小说",
            url: /^http:\/\/www\.123du\.net\/.*\.html/,
            contentSelector: "#content",
            exampleUrl: "http://www.123du.net/dudu-38/1072437/10868906.html",
            contentPatch: function(fakeStub){
                var content = fakeStub.find("#DivContentBG").html().match(/第\d*页([\s\S]*)一秒记住/)[1];
                $('<div id="content"/>').html(content).appendTo(fakeStub.find('body'));
            }
        },
        {siteName: "动力中文",
            url: "^http://dlzw\\.cc/article.*\\.html",
            exampleUrl: "http://dlzw.cc/article-72-1.html",
            nextSelector: "span:contains('下一篇') > a",
            prevSelector: "span:contains('上一篇') > a",
            indexSelector: "#pt a[href^='http']"
        },
        {siteName: "塔读文学",
            url: "^http://www\\.tadu\\.com/book/\\d+/\\d+/",
            exampleUrl: "http://www.tadu.com/book/356496/191/",
            titleReg: /(.*?),(.*?),/,
            contentSelector: "#partContent",
            contentPatch: function(fakeStub){
                var m = fakeStub.find("body").html().match(/\.html\(unescape\("(.*)"\)/);
                if(m){
                    var unescapeContent = m[1];
                    fakeStub.find("#partContent").html(unescape(unescapeContent));
                }
            }
        },

        // {siteName: "燃文中文网",
        //     url: "^http://www\\.ranwenzw\\.com/ranwenzw/.*\\.html",
        //     exampleUrl: "http://www.ranwenzw.com/ranwenzw/24/24423/6939169.html",
        //     contentSelector: ".ucbox~ *:eq(0)",
        //     contentPatch: function(fakeStub){
        //         fakeStub.find(".footer").remove();
        //     }
        // },

        // 内容需要js运行。
        {
            name: "读读看",
            url: "^http://www\\.dudukan\\.net/html/.*\\.html$",
            exampleUrl: "http://www.dudukan.net/html/90/90733/19323854.html",
            contentReplace: "看小说.*|binhuo|www\\.92to\\.com",
            useiframe: true,  
            timeout: 500  // 为0则没法正确加载内容
        },
        // 内容js，地址特殊生成。
        {siteName: "哈哈文学",
            url: /^http:\/\/www.hahawx.com\/.*htm/,
            exampleUrl: "http://www.hahawx.com/jingji/baibianqiushen-161459/13474531.htm",
            titleReg: /(.*?)-(.*?)-.*/,
            contentSelector: "#chapter_content",
            contentReplace: /(ｗｗｗ|ｂｏｏｋ).*(ｃｏｍ|ｎｅｔ)|www[a-z\.]*|全文字阅读|无弹窗广告小说网|哈哈文学\(www.hahawx.com\)|souDU.org/ig,
            contentPatch: function(fakeStub){
                var content = fakeStub.find("#chapter_content");
                var m = content.find("script").text().match(/output\((\d+), "(\d+\.txt)"\);/);
                if(m && m.length == 3){
                    var aid = m[1],
                        files = m[2];
                    var subDir = "/" + (Math.floor(aid / 1000) + 1);
                    var subDir2 = "/" + (aid - Math.floor(aid / 1000) * 1000);
                    var url = "http:\/\/r.xsjob.net\/novel" + subDir + subDir2 + "/" + files;
                    content.attr({
                        class: "reader-ajax",
                        src: url,
                        charset: "gbk"
                    });
                }
            }
        },
    ];

    var db,
        button_css = '';

    window.postMessage("fromeMyNovelReader.post", "*");

    window.addEventListener('message', function(e) {
        if (db) return;
        var data = e.data;
        if (typeof data == 'string' && data.indexOf('MyNovelReader.db') == 0) {
            data = data.slice(16);
            // alert(data);
            try{
                db = eval( "(" + data + ")" );
            }catch(e) {}
            
            window.removeEventListener('message',arguments.callee,false);
            window.postMessage("fromeMyNovelReader.remove", "*");

            for(var key in db.config){
                config[key] = db.config[key];
            }

            if(db.SITE_INFO){
                rule.specialSite = db.SITE_INFO.concat(rule.specialSite);
            }

            if(db.css){
                css = db.css;
                debug("Get css");
            }

            button_css = db.button_css;
        }
    }, false);

    // 小说屏蔽字修复
    var new_replacements = {};

    (function(){
        var replacements = {
            // ===格式整理===
            // "\\(|\\[|\\{|（|【|｛":"（",
            // "\\)|\\]|\\}|）|】|｝":"）",
            "\\*|＊":"*",
            "[wWｗＷ]{3}":"www",
            "w{3}(\u3001|\u3002)":"www.",
            "[cCｃＣ][oOｏＯ][mMｍＭ]":"com",
            "[nNｎＮ][eｅEＥ][tｔTＴ]":"net",
            "[cCｃＣ][nNｎＮ]":"cn",
            "(\\.|\u3001|\u3002)com":".com",
            "(\\.|\u3001|\u3002)net":".net",
            "(\\.|\u3001|\u3002)cn":".cn",
            "[pPｐＰ][sSｓＳ][:：]":"ps:",
            "。{5,7}":"……","~{2,50}":"——","…{3,40}": "……","－{3,20}":"——",
            "。(,|，|。)": "。",
            "？(,|，)": "？",
            "”(,|，|。)": "”",

            // ===星号屏蔽字还原===
            "十有(\\*{2})":"十有八九", "\\*(2)不离十":"八九不离十",
            "G(\\*{2})":"GSM", "感(\\*{2})彩":"感情色彩",
            "强(\\*{2})u5B9D":"强大法宝",

            "one_word_start": "",

            // ===双字替换，需特殊处理？===
            "暧me[iì]":"暧昧", 
            "běijīng":"北京","半shen": "半身", 
            "缠mian": "缠绵", "成shu": "成熟", "赤lu[oǒ]": "赤裸", "春guang": "春光",
            "dang校": "党校", "da子": "鞑子", "diao丝": "屌丝", "dú\\s*lì": "独立",
            "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "fènnù":"愤怒",
            "gao潮": "高潮", "干chai": "干柴", "guochéng":"过程",
            "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "hǎoxiàng":"好像",
            "jinv": "妓女", "jirou": "鸡肉", "ji者": "记者", "ju花": "菊花","jī动": "激动", "肌ròu": "肌肉","ji射": "激射",
            "kěnéng": "可能", "开bao": "开苞",  "kào近": "靠近", "kao近": "靠近",
            "ling辱": "凌辱", "luan蛋": "卵蛋",
            "méiyou":"没有", "mei国": "美国", "迷huan": "迷幻", "mín\\s*zhǔ": "民主", 
            "nàme":"那么", "nénggou":"能够",
            "piáo客":"嫖客", "pángbiān":"旁边",
            "qin兽":"禽兽", 
            "rúguo":"如果",
            "shíjiān":"时间","shíhou": "时候","shi身": "失身", "shu女": "熟女", "上chuang": "上床", "呻yín": "呻吟", "呻yin": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷",
            "双xiu": "双修",
            "tiaojiao": "调教", "推dao": "推倒", "脱guang": "脱光",
            "wēixié":"威胁", "wèizhì":"位置",
            "亵du": "亵渎", "xing福": "性福", "xiu长": "修长",
            "yǐjīng":"已经", "阳wěi": "阳痿", "阳wei": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "you惑": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人","旖ni": "旖旎",
            "zìjǐ": "自己","zì\\s*you": "自由","zhīdào":"知道","zha药": "炸药", "zhan有": "占有", "政f[ǔu]": "政府", "zhèng\\s*f[uǔ]": "政府", "zhōngyāng": "中央", "zuoyou":"左右", "zhouwéi":"周围",

            // ===单字替换，需特殊处理，防止替换图片===
            "b(ā|à)ng":"棒","bào":"爆","b[àa]":"吧","bī":"逼","bō":"波",
            "cāo": "操", "cǎo": "草", "cào": "操", "chāng": "娼", "chang": "娼", "cháo": "潮", "chā": "插", "chéng": "成", "chōu": "抽", "chuáng": "床", "chún": "唇", "ch[ūu]n": "春", "cuō": "搓", "cū": "粗", 
            "dǎng": "党", "dàng": "荡", "dāo": "刀", "dòng": "洞", "diao": "屌", 
            "fǎ": "法", "féi": "肥", "fù": "妇", "fu": "妇", "guān": "官", 
            "hán": "含", "hóu": "喉", "hòu": "厚", "huā": "花", "huá": "华", "huò": "惑", "hùn": "混", "hún": "魂",
            "jiǔ": "九", "j[īi]ng": "精", "jìn": "禁", "jǐng": "警", "jiāng": "江", "jiān": "奸", "jiāo": "交", "jūn": "军", "jū": "拘", "jú": "局", "jī": "激", 
            "kù": "裤", "k[àa]n": "看", 
            "[1l]àng": "浪", "liáo": "撩", "liú": "流", "lì": "莉", "luàn": "乱", "1uàn": "乱", "lún": "伦", "luǒ": "裸", "lòu": "露", "lù": "露", "1ù": "露",
            "mǎi": "买", "mài": "卖", "máo": "毛", "mā": "妈", "méng": "蒙", "mén": "门", "miè": "灭", "mí": "迷", "mì": "蜜", "mō": "摸",
            "nǎi": "奶", "nèn": "嫩", "niào": "尿", "niē": "捏", "nòng": "弄", "nǚ": "女", 
            "pào": "炮", "piàn": "片", 
            "qiāng": "枪", "qíng": "情", "qīn": "亲", "qiú": "求", "quán": "全", 
            "r[ìi]": "日", "rǔ": "乳", 
            "sāo": "骚", "sǎo": "骚", "sè": "色", "shā": "杀", "shēn": "呻", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥", 
            "tān": "贪", "tiǎn": "舔", "tǐng": "挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "wēn": "温", "wěn": "吻", 
            "xiǎo": "小", "x[ìi]ng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴", 
            "yāng": "央", "yàn": "艳", "y[īi]n": "阴", "yào": "药", "yé": "爷", "yòu": "诱", "zàng": "脏", "yù": "欲", "yín": "淫", 
            "zhēn": "针", "zēn": "针", "zhà": "炸", "zhèng": "政", "zǒu": "走", "zuì": "罪", "zuò": "做", "zhong": "中",
            
            "one_word_end": "",

            // ===误替换还原===
            "碧欲": "碧玉","美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉",
            "品性": "品行","德性": "德行",
            "波ok":"book",

            // ===其他修正===
            "弥俩": "你俩",
            "妳": "你",
            "圞|垩|卝|龘":"",

            // ===无措等图片的修复
            // '(<center>)?<?img src..(http://www.wcxiaoshuo.com)?(/sss/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': '$3',
            // "/sss/da.jpg": "打", "/sss/maws.jpg": "吗？", "/sss/baw.jpg": "吧？", "/sss/wuc.jpg": "无", "/sss/maosu.jpg": "：“", "/sss/cuow.jpg": "错", "/sss/ziji.jpg": "自己", "/sss/shenme.jpg": "什么", "/sss/huiqub.jpg": "回去", "/sss/sjian.jpg": "时间", "/sss/zome.jpg": "怎么", "/sss/zhido.jpg": "知道", "/sss/xiaxin.jpg": "相信", "/sss/faxian.jpg": "发现", "/sss/shhua.jpg": "说话", "/sss/dajiex.jpg": "大姐", "/sss/dongxi.jpg": "东西", "/sss/erzib.jpg": "儿子", "/sss/guolair.jpg": "过来", "/sss/xiabang.jpg": "下班", "/sss/zangfl.jpg": "丈夫", "/sss/dianhua.jpg": "电话", "/sss/huilaim.jpg": "回来", "/sss/xiawu.jpg": "下午", "/sss/guoquu.jpg": "过去", "/sss/shangba.jpg": "上班", "/sss/mingtn.jpg": "明天", "/sss/nvrenjj.jpg": "女人", "/sss/shangwo.jpg": "上午", "/sss/shji.jpg": "手机", "/sss/xiaoxinyy.jpg": "小心", "/sss/furene.jpg": "夫人", "/sss/gongzih.jpg": "公子", "/sss/xiansg.jpg": "先生", "/sss/penyouxi.jpg": "朋友", "/sss/xiaoje.jpg": "小姐", "/sss/xifup.jpg": "媳妇", "/sss/nvxudjj.jpg": "女婿", "/sss/xondi.jpg": "兄弟", "/sss/lagong.jpg": "老公", "/sss/lapo.jpg": "老婆", "/sss/meimeid.jpg": "妹妹", "/sss/jiejiev.jpg": "姐姐", "/sss/jiemeiv.jpg": "姐妹", "/sss/xianggx.jpg": "相公", "/sss/6shenumev.jpg": "什么", "/sss/cuoaw.jpg": "错", "/sss/fpefnyoturxi.jpg": "朋友", "/sss/vfsjgigarn.jpg": "时间", "/sss/zzhiedo3.jpg": "知道", "/sss/zibjib.jpg": "自己", "/sss/qdonglxi.jpg": "东西", "/sss/hxiapxint.jpg": "相信", "/sss/fezrormre.jpg": "怎么", "/sss/nvdrfenfjfj.jpg": "女人", "/sss/jhiheejeieev.jpg": "姐姐", "/sss/xdifagojge.jpg": "小姐", "/sss/gggugolgair.jpg": "过来", "/sss/maoashu.jpg": "：“", "/sss/gnxnifawhu.jpg": "下午", "/sss/rgtugoqgugu.jpg": "过去", "/sss/khjukilkaim.jpg": "回来", "/sss/gxhigfadnoxihnyy.jpg": "小心", "/sss/bkbskhhuka.jpg": "说话", "/sss/xeieavnfsg.jpg": "先生", "/sss/yuhhfuiuqub.jpg": "回去", "/sss/pdianphua.jpg": "电话", "/sss/fabxianr.jpg": "发现", "/sss/feilrpto.jpg": "老婆", "/sss/gxronfdri.jpg": "兄弟", "/sss/flfaggofng.jpg": "老公", "/sss/tymyigngtyn.jpg": "明天", "/sss/dfshfhhfjfi.jpg": "手机", "/sss/gstjhranjgwjo.jpg": "上午", "/sss/fmgeyimehid.jpg": "妹妹", "/sss/gxgihftutp.jpg": "媳妇", "/sss/cerztifb.jpg": "儿子", "/sss/gfxgigagbfadng.jpg": "下班", "/sss/hjeirerm6eihv.jpg": "姐妹", "/sss/edajihexr.jpg": "大姐", "/sss/wesfhranrrgba.jpg": "上班", "/sss/gfognggzigh.jpg": "公子", "/sss/frurtefne.jpg": "夫人", "/sss/fzagnggfbl.jpg": "丈夫", "/sss/nvdxfudfjfj.jpg": "女婿", "/sss/xdidafnggx.jpg": "相公", "/sss/zenme.jpg": "怎么", "/sss/gongzi.jpg": "公子", "/sss/ddefr.jpg": "", 
            // '(<center>)?<?img src..(http://www.16kbook.org)?(/tu/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': "$3",

            // ===去广告===
            "全文字无广告": "",
            "uutxt\\.org": "",
            "3vbook\\.cn": "",
            "txt53712/": "",
            "\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
        };

        var key,
            isReplace_one_word = false,
            replace_regex,
            replace_result;

        for (key in replacements) {
            if(key == 'one_word_start'){
                isReplace_one_word = true;
                continue;
            }
            if(key == 'one_word_end'){
                isReplace_one_word = false;
                continue;
            }

            if(isReplace_one_word){
                // 防止误替换图片，需要进一步修正
                replace_key = key + "([^\\.a-z\\d])";
                replace_result = replacements[key] + "$1";
            }else{
                replace_key = key;
                replace_result = replacements[key];
            }
            new_replacements[replace_key] = replace_result;
        }
    })();

    function contentReplacements(s){
        for (key in new_replacements) {
            s = s.replace(new RegExp(key, 'ig'), new_replacements[key]);
        }
        return s;
    }

    /**
     * ------------------- 正式开始 -----------------------------------------
     */
    var isNextPage = false;

    var Parser = function(site, doc, curPageUrl){
        this.site = site;
        doc = doc || document;
        this.doc = doc;
        this.$doc = $(doc);

        // 为了兼容其他浏览器
        this.curPageUrl = this.doc.URL || curPageUrl;
    };
    Parser.prototype = {
        bookTitle: '',
        chapterTitle: '',
        docTitle: '',
        content: '',
        prevUrl: '',
        indexUrl: '',
        nextUrl: '',
        isTheEnd: false,
        theEndColor: '',

        getAll: function(callback, nopatch){
            if(!nopatch){
                this.patch();
            }
            this.getTitles();
            this.getPrevUrl();
            this.getIndexUrl();
            this.getNextUrl();
            this.getContent(callback);

            // this.getBookMark();

            return this;
        },
        // 内容补丁
        patch: function(){
            var contentPatch = this.site && this.site.contentPatch;
            if(contentPatch){
                try{
                     contentPatch(this.$doc);
                     debug("Apply Content Patch Success.");
                }catch(e){
                     debug("Error: Content Patch Error!");
                }
            }
        },
        getTitles: function(){
            debug("Get title: ");
            var docTitle = this.$doc.find("title").text();

            if(this.site && this.site.titleReg){
                var matches = docTitle.match(new RegExp(this.site.titleReg));
                if(matches && matches.length == 3){
                    var titlePos = ( this.site.titlePos || 0 ) + 1,
                        chapterPos = (titlePos == 1) ? 2 : 1;
                    this.bookTitle = matches[titlePos].trim();
                    this.chapterTitle = matches[chapterPos].trim();
                }else if(matches){
                    debug("  Title Matches Length: " + matches.length);
                }
            }

            if(!this.chapterTitle){
                this.chapterTitle = this.autoGetTitleText(this.doc);
            }

            this.bookTitle = this.bookTitle || "";
            this.docTitle = this.bookTitle ?
                    this.bookTitle + ' - ' + this.chapterTitle :
                    docTitle;

            debug("  Book Title: " + this.bookTitle);
            debug("  Chapter Title: " + this.chapterTitle);
            debug("  Document Title: " + this.docTitle);
        },
        // 智能获取标题，需要 window
        autoGetTitleText: function (document) {
            var
                _main_selector = "#TextTitle, #title, .title",
                _second_selector = "h1, h2, h3",
                _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/,
                _negative_regepx = /[上下]一章/,
                _title_remove_regexp = /最新章节/,
                _document_title = document.title ? document.title : document.getElementsByTagName("title")[0].textContent,
                _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' '
            ;

            var _headings = document.querySelectorAll(_main_selector);
            if (_headings.length === 1) {
                return _headings[0].textContent.trim();
            }

            var possibleTitles = {};

            _headings = document.querySelectorAll(_second_selector);

            for (var i = 0; i < _headings.length; i++) {
                var 
                    _heading = _headings[i],
                    // _heading = $(_heading).find('a').remove()[0],
                    _heading_text = _heading.textContent.trim()
                ;

                if (_heading_text in possibleTitles) {
                    continue;
                }

                debug("  开始计算", _heading_text, "的得分");

                // h1 为 1， h2 为 2
                var
                    nodeNum = parseInt(_heading.nodeName.slice(1), 10) || 0,
                    score = 10 / nodeNum,
                    _heading_words = _heading_text.replace(/\s+/g, " ").split(" "),
                    _matched_words = ""
                ;

                debug("  初始得分:" + score);

                if (_positive_regexp.test(_heading_text)) {
                    score += 50;
                }
                if(_negative_regepx.test(_heading_text)){
                    score -= 100;
                }

                debug("  符合正则计算后得分：", score);

                //  count words present in title
                for (var j = 0, _j = _heading_words.length; j < _j; j++) {
                    if (_search_document_title.indexOf(_heading_words[j]) > -1) {
                        _matched_words += _heading_words[j] + ' ';
                    }
                }
                score += _matched_words.length * 1.5;

                // 跳过长度太小的
                if (_matched_words.length < 5) {
                    // continue;
                }

                debug("  跟页面标题比较后得分：", score);

                var  _font_size_text = "",
                    _font_size_add_score = 0,
                    _heading_style = window.getComputedStyle(_heading, null);
                if(_heading_style){
                    _font_size_text = _heading_style.getPropertyValue("font-size") || 0;
                    _font_size_add_score = parseInt(_font_size_text, 10) * 1.5;
                }

                score +=  _font_size_add_score;

                debug("  计算大小后得分", score);

                possibleTitles[_heading_text] = score;
            }

            // 找到分数最高的值
            var topScoreTitle, score_tmp = 0;
            for (var _heading_text in possibleTitles) {
                if (possibleTitles[_heading_text] > score_tmp) {
                    topScoreTitle = _heading_text;
                    score_tmp = possibleTitles[_heading_text];
                }
            }


            var curTitle = topScoreTitle;
            if (!curTitle) {
                // TODO: document.title 的处理？
                curTitle = _document_title;

                // 下面的正则从
                //     Firefox-Firefox浏览器论坛-卡饭论坛 - 互助分享 - 大气谦和!
                // 变为
                //     Firefox-Firefox浏览器论坛-卡饭论坛
                curTitle = curTitle.replace(/\s-\s.*/i, "")
                    .replace(/_[^\[\]【】]+$/, "");
                curTitle = curTitle.trim();
                curTitle = curTitle.replace(_title_remove_regexp, '');
            }

            return curTitle;
        },
        getContent: function(callback){
            debug("Get content:");
            var content, contentValue;
            if(this.site && this.site.contentSelector){
                content = this.$doc.find(this.site.contentSelector);
            }else{
                var selectors = rule.contentSelectors;
                // 按照顺序选取
                for(var i = 0, l = selectors.length; i < l; i++){
                    content = this.$doc.find(selectors[i]);
                    if(content.length === 1){
                        debug("  自动查找内容选择器: " + selectors[i]);
                        break;
                    }
                }
            }

            if(content.length === 0) return;

            // 对页面内容处理
            content.find(rule.contentRemove).remove();
            debug("  内容移除选择器: " + rule.contentRemove);

            // 特殊处理，例如起点
            var self = this;
            var ajaxScript = this.$doc.find('.' + READER_AJAX);
            var siteName = this.site && ( this.site.siteName || this.site.name);
            if( siteName && siteName.match(/手打吧|哈哈文学/)){  // 临时措施
                isNextPage = true;
            }
            if(isNextPage && ajaxScript.length > 0){
                var url = ajaxScript.attr('src');
                if(!url) return;
                var charset = ajaxScript.attr('charset') || 'utf-8';
                var opt = {
                    url: url,
                    method: "GET",
                    overrideMimeType: "text/html;charset=" + charset,
                    onload: function(res){
                        var text = res.responseText.replace(/document.write(ln)?\('/, "");
                        text = text.replace(/[\n\r]/g, '</p><p>');
                        self.content = self.handleContentText(text, self.site);
                        callback && callback(self);
                    }
                };

                debug('  内容特殊处理 Ajax: ' + url +". charset=" + charset);
                GM_xmlhttpRequest(opt);
            }else{
                this.content = this.handleContentText(content.html(), this.site);
                callback && callback(this);
            }
            isNextPage = true;
        },
        handleContentText: function(text, site){

            if(!text) return null;

            /* Turn all double br's into p's */
            text = text.replace(rule.replaceBrs, '</p>\n<p>');

            text = text.replace(rule.contentReplace, '');

            if(site){
                if(site.contentReplace){
                    var replace = site.contentReplace;
                    if(typeof replace == 'string'){
                        replace = new RegExp(replace, "ig");
                    }
                    text = text.replace(replace, '');
                    debug("  Content Replace: " + replace);
                }

                // 去除内容中包含的标题
                var titleRegText = this.chapterTitle.trim()
                        .replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&")
                        .replace(/\s+/g, "(?:\\s|&nbsp;)*");
                debug("  Content replace title: " + titleRegText);
                text = text.replace(new RegExp(titleRegText, "g"), "");
            }
            
            if(config.content_replacements){
                var s = new Date().getTime();
                text = contentReplacements(text);
                debug("  小说屏蔽字修复耗时：" + (new Date().getTime() - s) + 'ms');
            }
            return text;
        },
        getNextUrl: function(){
            var url = '',
                selector;
            if(this.site && this.site.nextSelector){
                selector = this.site.nextSelector;
            }else{
                selector = rule.nextSelector;
            }

            var link = this.$doc.find(selector);
            if(link.length > 0){
                url = config.fullHref ? link[0].href : link.attr('href');
                debug("找到下一页链接: " + url);

            }else{
                debug("无法找到下一页链接.");
            }
            
            this.nextUrl = url;
            this.isTheEnd = !this.checkNextUrl(url);
            if(this.isTheEnd){
                this.theEndColor = "#666666";
            }

            return url;
        },
        checkNextUrl: function(url){
            var endNum_regexp = /\/\d+\.html$|\/wcxs-\d+-\d+\/$/;
            // var num_text = (this.prevUrl || "").replace(/\d+/g, "\\d+");
            // var num_regexp = new RegExp(num_text);
            switch(true){
                case url == '':
                case rule.nextUrlIgnore && rule.nextUrlIgnore.test(url):
                case url == this.indexUrl:
                case url == this.prevUrl:
                case url == this.curPageUrl:
                case endNum_regexp.test(this.prevUrl) && !endNum_regexp.test(url):
                    return false;
                default:
                    return true;
            }
        },
        getPrevUrl: function(){
            var url, selector;
            if(this.site && this.site.prevSelector){
                selector = this.site.prevSelector;
            }else{
                selector = rule.prevSelector;
            }

            var link = this.$doc.find(selector);
            if(link.length > 0){
                url = config.fullHref ? link[0].href: link.attr('href');
                debug("找到上一页链接: " + url);
            }else{
                debug("无法找到上一页链接.");
            }
            this.prevUrl = url || '';
            return url;
        },
        getIndexUrl: function(){
            var url, link;
            if(this.site && this.site.indexSelector){
                link = this.$doc.find(this.site.indexSelector);
            }else{
                var selectors = rule.indexSelectors;
                var _indexLink;
                // 按照顺序选取目录链接
                for(var i = 0, l = selectors.length; i < l; i++){
                    _indexLink = this.$doc.find(selectors[i]);
                    if(_indexLink.length > 0){
                        link = _indexLink;
                        break;
                    }
                }
            }

            if(link && link.length > 0){
                url = config.fullHref ? link[0].href : link.attr('href');
                debug("找到目录链接: " + url);
            }else{
                debug("无法找到目录链接.");
            }

            this.indexUrl = url;
            return url;
        },
        getBookMark: function(){
            var url = this.doc.URL;
            if(url.match(/qidian/)){
                m = url.match(/\d+/g);
                bookid = m[0];
                chapid = m[1];
                this.addBookMark = '<a href="javascript:加入书架书签" onclick="javascript:addBookMark(\'' +
                    bookid + '\',\'' + chapid + '\',null)">书签</a> | ';
            }
        }
    };

    var reader = {
        isEnabled: false,
        site: null,
        parsedPages: {},
        paused: false,
        curPageUrl: "",
        requestUrl: null,
        iframe: null,
        remove: [],
        tpl_content: '\
            <div class="chapter-head">{chapterTitle}</div>\
            <div class="chapter-head-nav">\
                 <a href="{prevUrl}"><<上一页</a> | \
                <a href="{indexUrl}">目录</a> | \
                <a href="{nextUrl}">下一页>></a>\
            </div>\
            <div class="content">{content}</div>\
            <div class="chapter-footer-nav">\
                <a href="{prevUrl}"><<上一页</a> | \
                <a href="{indexUrl}">目录</a> | \
                {addBookMark}\
                <a style="color:{theEndColor}" href="{nextUrl}">下一页>></a>\
            </div>\
        ',

        init: function(site){
            // 只解析一次，防止多次重复解析一个页面
            if(document.body.getAttribute("name") == "MyNovelReader"){
                reader.toggle();
                return;
            }

            reader.site = site;

            var timeout = (site && site.timeout) || 0;
            setTimeout(function(){
               var parser = new Parser(site, document);
               parser.getAll(reader.launch); 
            }, timeout);
        },
        launch: function(parser){
            var tpl_html = '<div id="wrapper">' + reader.tpl_content + '</div>';

            if(parser.content){
                debug("reader launched.");

                reader.parsedPages[window.location.href.replace(/\/$/, '')] = true;

                reader.prepDocument();

                GM_addStyle(css);

                document.title = parser.docTitle;
                document.body.setAttribute("name", "MyNovelReader")
                document.body.innerHTML = reader.nano(tpl_html, parser);
                // 再次移除其它不相关的。主要起点中文有时候有问题
                setTimeout(function(){
                    $('body > *:not("#wrapper, .readerbtn, #reader-notice")').remove();
                }, 3000);

                reader.requestUrl = parser.nextUrl;
                reader.isTheEnd = parser.isTheEnd;

                reader.addListener();

                reader.isEnabled = true;
                reader.addButton();

                setTimeout(function(){
                    reader.fixImageFloats();
                }, 500);

                reader.scroll();
            }else{
            }
        },
        prepDocument: function() {
            /* Before we do anything, remove all scripts that are not readability. */
            window.onload = window.onunload = function() {};
            window.document.onmouseup = function(){};
            window.document.onmousemove = function(){};
            window.document.onmousedown = function(){};
            window.document.onclick = function(){};
            window.document.body.onclick = function(){};
            window.document.oncontextmenu = function(){};
            window.document.body.oncontextmenu = function(){};
            window.document.ondblclick = function(){};

            // // remove body style
            $('link[rel="stylesheet"], style, script').remove();
            // $('link[rel="stylesheet"], style').remove();
            $('*').removeAttr('style');
            $('body').removeAttr('bgcolor');
        },
        addButton: function(){
            if(button_css){
                GM_addStyle(button_css);
            }else{
                // 逐浪网等按钮修复：右边的分享盖住了按钮
                if(window.location.hostname.match(/zhulang|yanmoxuan/)){
                    GM_addStyle(".readerbtn {top: 10% !important;}");
                }
            }

            reader.btnStyle = GM_addStyle(".readerbtn { position: fixed; right: 0; top: 60%; z-index: 597; padding: 5px;\
                width: 12px; border: 1px solid; border-color: #5483D2; background: #4477DE; color: #FFF;\
                font: 12px/1.5 '微软雅黑','宋体',Arial; cursor: pointer; }");

            var btn = document.createElement("div");
            btn.className = "readerbtn";
            btn.innerHTML = reader.isEnabled ? "退出" : "阅读模式";
            btn.onclick = reader.toggle;
            document.body.appendChild(btn);
        },
        toggle: function(){
            if(reader.isEnabled){  // 退出
                GM_setValue("auto_enable", false);
                L_setValue("booklinkme_disable_onetime", true);
                window.location = reader.curPageUrl || window.location.href;
                // window.location.reload();
            }else{
                GM_setValue("auto_enable", true);
                L_removeValue("booklinkme_disable_onetime");
                reader.isEnabled = true;
                launch();
            }
        },
        addListener: function(){
            document.addEventListener("dblclick", reader.pauseHandler, false);

            window.addEventListener("scroll", reader.scroll, false);

            // reader.remove.push(function(){
            //     document.removeEventListener("dblclick", reader.pauseHandler, false);
            //     window.removeEventListener("scroll", reader.scroll, false);
            // });
        },
        removeListener: function(){
            debug("移除各种事件监听");
            reader.remove.forEach(function(_remove){
                _remove();
            });
        },
        pauseHandler: function(e){
            reader.paused = !reader.paused;
            if(reader.paused){
                notice('<b>状态</b>:'+'自动翻页<span style="color:red!important;"><b>暂停</b></span>.');

            }else{
                notice('<b>状态</b>:'+'自动翻页<span style="color:red!important;"><b>启用</b></span>.');
                reader.scroll();
            }
        },
        scroll: function(){
            var scrollHeight = Math.max(document.documentElement.scrollHeight,
                                        document.body.scrollHeight),
                remain = scrollHeight - window.innerHeight - window.scrollY;

            if (!reader.paused && remain < config.BASE_REMAIN_HEIGHT) {
                reader.doRequest();
            }
        },
        doRequest: function(){
            var nextUrl = reader.requestUrl;

            if(nextUrl && !reader.isTheEnd && !(nextUrl in reader.parsedPages)){
                reader.parsedPages[nextUrl] = true;
                reader.curPageUrl = reader.requestUrl;
                reader.requestUrl = null;

                var useiframe = reader.site && reader.site.useiframe;
                if(useiframe){
                    reader.iframeRequest(nextUrl);
                }else{
                    reader.httpRequest(nextUrl);
                }
            }
        },
        httpRequest: function(nextUrl){
            debug("GM_xmlhttpRequest: " + nextUrl);
            GM_xmlhttpRequest({
                url: nextUrl,
                method: "GET",
                overrideMimeType: "text/html;charset=" + document.characterSet,
                onload: function(res){
                    var doc = parseHTML(res.responseText);
                    reader.loaded(doc);
                }
            });
        },
        iframeRequest: function(nextUrl){
            debug("iframeRequest: " + nextUrl);
            if(!reader.iframe){
                var i=document.createElement('iframe');
                reader.iframe=i;
                i.name='novelreader-iframe';
                i.width='100%';
                i.height='0';
                i.frameBorder="0";
                i.style.cssText='\
                    margin:0!important;\
                    padding:0!important;\
                    visibility:hidden!important;\
                ';
                i.src = nextUrl;
                i.addEventListener('load',reader.iframeLoaded,false);
                reader.remove.push(function(){
                    i.removeEventListener('load',reader.iframeLoaded,false)
                });
                document.body.appendChild(i);
            }else{
                reader.iframe.contentDocument.location.replace(nextUrl);
            }
        },
        iframeLoaded: function(){
            var iframe = this;
            var body=iframe.contentDocument.body;
            if(body && body.firstChild){
                var timeout = (reader.site && reader.site.timeout) || 0;

                setTimeout(function(){
                    doc = iframe.contentDocument;
                    win = iframe.contentWindow || doc;

                    reader.loaded(doc);
                }, timeout);
            };
        },
        loaded: function(doc){
            var parser = new Parser(reader.site, doc, reader.curPageUrl);

            parser.getAll(reader.addNextPage);
        },
        addNextPage: function(parser){
            if(parser.content){
                var content = reader.nano(reader.tpl_content, parser);
                $('#wrapper').append(content);

                window.setTimeout(function(){
                    reader.fixImageFloats();
                }, 800);
            }else{
                reader.removeListener();
            }

            reader.requestUrl = parser.nextUrl;
            reader.isTheEnd = parser.isTheEnd;
        },
        fixImageFloats: function (articleContent) {
            if(!config.fixImageFloats) return;

            articleContent = articleContent || $("#wrapper")[0];

            var imageWidthThreshold = Math.min(articleContent.offsetWidth, 800) * 0.55,
                images              = articleContent.getElementsByTagName('img');

            for(var i=0, il = images.length; i < il; i+=1) {
                var image = images[i];

                if(image.offsetWidth > imageWidthThreshold) {
                    image.className += " blockImage";
                }
            }
        },
        _regex: /\{([\w\.]*)\}/g,
        nano: function(template, data) {
            return template.replace(this._regex, function(str, key) {
                var keys = key.split('.'),
                    value = data[keys.shift()];
                keys.forEach(function(key) {
                    value = value[key];
                });
                return (value === null || value === undefined) ? '' : value;
            });
        },
    };

    // 为了防止 Error: Scriptish access violation: unsafeWindow cannot call: GM_getValue
    //     详见 http://wiki.greasespot.net/Greasemonkey_access_violation
    unsafeWindow.readx = function(){
        setTimeout(launch, 0);
    };

    var launch = function(){
        var getCurSiteInfo = function(){
            var sites = rule.specialSite;
            var url_reg;
            for (var i = 0, l = sites.length; i < l; i++) {
                url_reg = new RegExp(sites[i].url);
                if(url_reg.test(window.location.href)){
                    return sites[i];
                }
            };
        };

        var siteinfo = reader.site || getCurSiteInfo();
        reader.init(siteinfo);
    };

    var autoLaunch = function(){
        var isEnabled = function(){
            var locationHref = window.location.href,
                referrer = document.referrer;
            switch(true){
                case L_getValue("booklinkme_disable_onetime") == 'true':
                    L_removeValue("booklinkme_disable_onetime");
                    return false;
                case config.AUTO_ENABLE && GM_getValue("auto_enable"):
                case config.booklinkme && /booklink\.me/.test(referrer):
                case config.soduso && /www\.sodu\.so/.test(referrer):
                    return true;
                default:
                    return false;
            }
        };
        reader.isEnabled = isEnabled();
        if(reader.isEnabled){
            launch();
        }else{
            reader.addButton();
        }
    };

    window.addEventListener("DOMContentLoaded", autoLaunch, false);


    var noticeDiv;
    var noticeDivto;
    var noticeDivto2;
    function notice(html_txt){
        if(!noticeDiv){
            var div=document.createElement('div');
            div.id = "reader-notice";
            noticeDiv=div;
            div.style.cssText='\
                position:fixed!important;\
                z-index:2147483647!important;\
                float:none!important;\
                width:auto!important;\
                height:auto!important;\
                font-size:13px!important;\
                padding:3px 20px 2px 5px!important;\
                background-color:#7f8f9c!important;\
                border:none!important;\
                color:#000!important;\
                text-align:left!important;\
                left:0!important;\
                bottom:0!important;\
                opacity:0;\
                -moz-border-radius:0 6px 0 0!important;\
                border-radius:0 6px 0 0!important;\
                -o-transition:opacity 0.3s ease-in-out;\
                -webkit-transition:opacity 0.3s ease-in-out;\
                -moz-transition:opacity 0.3s ease-in-out;\
            ';
            document.body.appendChild(div);
        };
        clearTimeout(noticeDivto);
        clearTimeout(noticeDivto2);
        noticeDiv.innerHTML=html_txt;
        noticeDiv.style.display='block';
        noticeDiv.style.opacity='0.96';
        noticeDivto2=setTimeout(function(){
            noticeDiv.style.opacity='0';
        },1666);
        noticeDivto=setTimeout(function(){
            noticeDiv.style.display='none';
        },2000);
    }

    function debug(){ if(config.DEBUG) console.log.apply(console, arguments);}
    function $A(arg) { return Array.prototype.slice.call(arg); }
    function L_getValue(key) {
        try{
            return localStorage.getItem(key);
        }catch(e) {}
        
    }
    function L_setValue(key, value) {
        try{
            localStorage.setItem(key, value);
        }catch(e) {}
    }
    function L_removeValue(key){
        try{
            localStorage.removeItem(key);
        }catch(e) {}
    }

    function wildcardToRegExpStr(urlstr) {
        if (urlstr.source) return urlstr.source;
        var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
            return str === "*" ? ".*" : "[^/]*";
        });
        return "^" + reg + "$";
    }

    function measureText__getTextLength(_the_text){
        var _text = _the_text;

            _text = _text.replace(/[\s\n\r]+/gi, '');

        return _text.length;
    }

    // jQuery text 完全匹配. e.g. a:econtains('最新章节')
    $.expr[":"].econtains = function(obj, index, meta, stack){return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();};
     //------------------- 辅助函数 ----------------------------------------
    // DOMParser HTML extension
    (function(DOMParser) {"use strict";var DOMParser_proto = DOMParser.prototype, real_parseFromString = DOMParser_proto.parseFromString;try {if ((new DOMParser).parseFromString("", "text/html")) {return;}} catch (ex) {}DOMParser_proto.parseFromString = function(markup, type) {if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {var doc = document.implementation.createHTMLDocument("");doc.body.innerHTML = markup;return doc;} else {return real_parseFromString.apply(this, arguments);}};}(DOMParser));
    // 自定义 parseHTML, 需要上面的 DOMParser
    var parseHTML = function(data){var parser = parseHTML.parser;if(!parser){parser = new DOMParser();}return parser.parseFromString(data, "text/html");};

})('\
/**\
 * 下面的皮肤根据 defpt 的修改而来\
 */\
body {background:#EEE;}\
.chapter-head {\
    background-image: linear-gradient(#DDD, #CCC);\
    font-family:"Microsoft YaHei UI",微软雅黑,新宋体,宋体,arial;\
    text-align:center;\
    font-size:16pt;\
    color:black;\
    text-shadow: silver 0px 0px 1px;\
    margin-bottom:3px;\
    padding-bottom:3px;\
}\
.content {\
    font-family:"Microsoft YaHei UI",微软雅黑,新宋体,宋体,arial;\
    line-height:1.75;\
    max-width:850px;\
    margin-top:15px;\
    margin-left:auto;\
    margin-right:auto;\
    font-size:16pt;\
}\
.content img.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}\
.chapter-head-nav{\
    display:none;\
}\
.chapter-footer-nav{\
    text-align:center;\
    font-size:12pt;\
    margin:-10px 0px 30px 0px;\
}\
');

