// ==UserScript==
// @id             mynovelreader@ywzhaiqi@gmail.com
// @name           My Novel Reader
// @version        3.1.0
// @namespace      ywzhaiqigmail.com
// @author         ywzhaiqi
// @description    小说阅读脚本，统一样式，内容去广告、修正拼音字、段落统一空2格，自动下一页
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceURL
// @grant          GM_openInTab
// @grant          GM_setClipboard
// @grant          GM_registerMenuCommand
// @grant          unsafeWindow
// @homepageURL    https://userscripts.org/scripts/show/165951
// @updateURL      https://userscripts.org/scripts/source/165951.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165951.user.js
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @require        http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js

// @include        http://read.qidian.com/*,*.aspx
// @include        http://www.qdmm.com/BookReader/*,*.aspx
// @include        http://chuangshi.qq.com/read/bookreader/*.html
// @include        http://chuangshi.qq.com/read/bk/*/*-m-*.html
// @include        http://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
// @include        http://book.zongheng.com/chapter/*/*.html
// @include        http://www.xxsy.net/books/*/*.html
// @include        http://book.zhulang.com/*/*.html
// @include        http://www.17k.com/chapter/*/*.html
// @include        http://www.kanxia.net/k/*/*/*.html
// @include        http://www.qingdi.com/files/article/html/*/*/*.html
// @include        http://www.xkzw.org/*/*.html
// @include        http://shouda8.com/*/*.html
// @include        http://novel.hongxiu.com/*/*/*.shtml

// booklink.me
// @include        http://www.shumilou.com/*/*.html
// @include        http://www.wcxiaoshuo.com/wcxs-*-*/
// @include        http://www.ranwen.cc/*/*/*/*.html
// @include        http://www.ranwen.net/files/article/*/*/*.html
// @include        http://www.bxs.cc/*/*.html
// @include        http://www.laishuwu.com/html/*/*/*.html
// @include        http://www.binhuo.com/html/*/*/*.html
// @include        http://www.haoqi99.com/haoqi99/*/*/*.shtml
// @include        http://www.shuhe.cc/*/*/
// @include        http://www.dudukan.net/html/*/*/*.html
// @include        http://www.hahawx.com/*/*/*.htm
// @include        http://www.zhuzhudao.com/txt/*/*/
// @include        http://www.tadu.com/book/*/*/
// @include        http://www.aishoucang.com/*/*.html
// @include        http://www.wanshuba.com/Html/*/*/*.html
// @include        http://www.zhuishu.net/files/article/html/*/*/*.html
// @include        http://www.sqsxs.com/*/*/*.html
// @include        http://www.caiwei.tw/html/*/*.html
// @include        http://www.hotsk.com/Html/Book/*/*/*.shtml
// @include        http://www.92to.com/*/*/*.html
// @include        http://www.qirexs.com/read-*-chapter-*.html
// @include        http://www.du00.com/read/*/*/*.html
// 需特殊处理的论坛
// @include        http://www.fkzww.net/thread-*.html

// www.sodu.so
// @include        http://www.qishuwu.com/*/*/
// @include        http://www.jiaodu8.com/*/*/*/*.html
// @include        http://www.fktxt.com/book/*/*.html
// @include        http://www.186s.cn/files/article/html/*/*/*.html
// @include        http://www.6xs.cn/xs/*/*/*.html
// @include        http://www.chaojiqiangbing.com/book/*/*/*.html
// @include        http://book.moka123.com/book/*/*/*.html
// @include        http://www.suimeng.com/files/article/html/*/*/*.html
// @include        http://www.hao662.com/haoshu/*/*/*.html

// 其它网站
// @include        http://www.epzww.com/book/*/*
// @include        http://tw.xiaoshuokan.com/haokan/*/*.html
// @include        http://www.wobudu.com/*/*.html
// @include        http://www.qb5.com/xiaoshuo/*/*/*.html
// @include        http://www.23us.com/html/*/*/*.html
// @include        http://www.ranwenxiaoshuo.com/files/article/html/*/*/*.html
// @include        http://www.ranwenxiaoshuo.com/*/*-*-*.html
// @include        http://www.bjxiaoshuo.com/bjxs-*-*/
// @include        http://www.59shuku.com/xiaoshuo/*/*.htm
// @include        http://www.16kbook.org/Html/Book/*/*/*.shtml
// @include        http://www.dixiaoshuo.com/Html/*/*.html
// @include        http://www.nieshu.com/Book/*/*/*.shtml
// @include        http://www.tlxsw.com/files/article/html/*/*/*.html
// @include        http://www.1kanshu.com/files/article/html/*/*/*.html
// @include        http://www.uutxt.org/book/*/*/*.html
// @include        http://www.5800.cc/*/*/*/*.html
// @include        http://www.biquge.com/*/*.html
// @include        http://www.qududu.com/book/*/*/*.html
// @include        http://www.free97.cn/book/*/*/*.html
// @include        http://www.122s.com/book/*/*.html
// @include        http://www.123du.net/dudu-*/*/*.html
// @include        http://www.hwafa.com/*/*.html
// @include        http://www.qmshu.com/html/*/*/*.html
// @include        http://dlzw.cc/article-*-*.html
// @include        http://www.shushu5.com/read/*/*.html
// @include        http://www.qiuwu.net/html/*/*/*.html
// @include        http://www.xiaoyanwenxue.com/files/article/html/*/*/*.html
// @include        http://www.3gsc.com.cn/bookcon/*_*_*
// @include        http://www.bj-ibook.cn/book/*/*/*.htm
// @include        http://www.baoliny.com/*/*.html
// @include        http://www.dajiadu.net/files/article/html/*/*/*.html
// @include        http://www.yankuai.com/files/article/html/*/*/*.html
// @include        http://www.docin.net/*/*.html
// @include        http://www.dushuge.net/html/*/*/*.html
// @include        http://www.xunshu.org/xunshu/*/*/*.html
// @include        http://www.moneyren.com/book/*/*/*.shtml
// @include        http://wemaxfilipino.com/*/*/*.html
// @include        http://www.85618892.cn/xiaoshuo/*/*/*.shtml
// @include        http://www.bookba.net/Html/Book/*/*/*.html
// @include        http://www.moksos.com/*/*/*.html
// @include        http://dudu8.net/novel/*/*/*.html
// @include        http://www.dawenxue.net/html/*/*/*.html
// @include        http://www.yanmoxuan.org/book/*/*/*.html
// @include        http://www.duyidu.com/xiaoshuo/*/*/*.html
// @include        http://www.69zw.com/xiaoshuo/*/*/*.html
// @include        http://www.laishu.com/book/*/*/*.shtml
// @include        http://www.bxwx.org/b/*/*/*.html
// @include        http://www.360118.com/html/*/*/*.html
// @include        http://www.59to.com/files/article/xiaoshuo/*/*/*.html
// @include        http://www.dyzww.com/cn/*/*/*.html
// @include        http://www.kanshu.la/book/*/*.shtml
// @include        http://www.9wh.net/*/*/*.html
// @include        http://www.luoqiu.com/html/*/*/*.html
// @include        http://www.epzw.com/files/article/html/*/*/*.html
// @include        http://www.dashubao.com/book/*/*/*.html
// @include        http://b.faloo.com/p/*/*.html
// @include        http://www.baikv.com/*/*.html
// @include        http://www.66721.com/*/*/*.html
// @include        http://www.3dllc.com/html/*/*/*.html
// @include        http://www.xstxt.com/*/*/
// @include        http://www.zzzcn.com/3z*/*/
// @include        http://www.zzzcn.com/modules/article/App.php*
// @include        http://www.nilongdao.com/book/*/*/*.html
// @include        http://xs321.net/*/*/
// @include        http://read.guanhuaju.com/files/article/html/*/*/*.html
// @include        http://www.book108.com/*/*/*.html
// @include        http://5ycn.com/*/*/*.html
// @include        http://www.zhaoxiaoshuo.com/chapter-*-*-*/
// @include        http://www.zbzw.com/*/*.html
// @include        http://manghuangji.cc/*/*.html
// @include        http://www.aiqis.com/*/*.html
// @include        http://www.fftxt.net/book/*/*.html
// @include        http://www.5kwx.com/book/*/*/*.html
// @include        http://www.uuxiaoshuo.net/html/*/*/*.html
// @include        http://www.sanyyo.org/*.html
// @include        http://www.chinaisbn.com/*/*/*.html
// @include        http://www.caihongwenxue.com/Html/Book/*/*/*.html
// @include        http://www.shushuw.cn/shu/*/*.html

// @exclude        */List.shtml
// @exclude        */List.html
// @exclude        */index.html

// @run-at         document-start
// ==/UserScript==

var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

(function(mainCss){

    if(window.name == "mynovelreader-iframe"){
        return;
    }

    // 其它设置
    var config = {
        soduso: false,                  // www.sodu.so 跳转
        fullHref: true,
        content_replacements: true,     // 小说屏蔽字修复
        fixImageFloats: true,           // 图片居中修正
        paragraphBlank: true,           // 统一段落开头的空格为 2个全角空格
        end_color: "#666666",           // 最后一页的链接颜色
    };

    var READER_AJAX = "App-ajax";   // 内容中ajax的 className

    // 自动尝试的规则
    var rule = {
        nextSelector: "a:contains('下一页'), a:contains('下一章'), a:contains('下页')",
        prevSelector: "a:contains('上一页'), a:contains('上一章'), a:contains('上页')",
        nextUrlIgnore: /index|list|last|end|BuyChapterUnLogin|^javascript:/i,         // 忽略的下一页链接，匹配 href
        nextUrlCompare: /\/\d+\.html?$|\/wcxs-\d+-\d+\/$|chapter-\d+\.html$/i,        // 忽略的下一页链接（特殊），跟上一页比较

        // 按顺序匹配，匹配到则停止。econtains 完全相等
        indexSelectors: ["a[href='index.html']", "a:contains('返回书目')", "a:contains('章节目录')", "a:contains('章节列表')",
            "a:econtains('最新章节')", "a:contains('回目录')","a:contains('回书目')", "a:contains('目 录')", "a:contains('目录')"],

        titleReplace: /^章节目录|^正文/,

        contentSelectors: ["#pagecontent", "#bmsy_content", "#bookpartinfo", "#htmlContent", "#chapter_content", "#chapterContent", "#partbody",
            "#article_content", "#BookTextRead", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td", "#TXT", "#zjneirong",
            ".novel_content", ".readmain_inner", ".noveltext", ".booktext",
            "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#content", ".content"],

        contentRemove: "script, iframe, font[color]",          // 内容移除选择器
        contentReplace: /最新.?章节|百度搜索|小说章节|全文字手打|“”&nbsp;看|无.弹.窗.小.说.网|追书网/g,
        replaceBrs: /(<br[^>]*>[ \n\r\t]*){1,}/gi,    // 替换为<p>
        mutationMaxTime: 5 * 1000,
    };

    // ===================== 自定义站点规则 ======================
    rule.specialSite = [
        // 详细版规则示例。已经没法访问。
        {siteName: "泡书吧",                                               // 站点名字... (可选)
            url: "^http://www\\.paoshu8\\.net/Html/\\S+\\.shtm$",          // // 站点正则... (~~必须~~)

            // 获取标题
            titleReg: /(.*?)最新章节 [-_\\\/](.*?)[-_\/].*/,         // 书籍标题、章节标题正则 (可选)
            titlePos: 0,                                          // 书籍标题位置：0 或 1 (可选，默认为 0)
            titleSelector: "#title h1",

            indexSelector: "a:contains('回目录')",                    // 首页链接 jQuery 选择器 (不填则尝试自动搜索)
            prevSelector: "a:contains('翻上页')",                      // 上一页链接 jQuery 选择器 (不填则尝试自动搜索)
            nextSelector: "a:contains('翻下页')",                     // 下一页链接 jQuery 选择器  (不填则尝试自动搜索)

            // 获取内容
            contentSelector: "#BookText",                             // 内容 jQuery 选择器 (不填则尝试自动搜索)
            useiframe: true,                                          // (可选)下一页加载是否使用 iframe
            mutationSelector: "#chaptercontainer",                    // (可选)内容生成监视器
            // 对内容的处理
            contentHandle: false,   // (可选)是否对内容进行特殊处理，诸如拼音字修复等，诸如起点等网站可禁用
            fixImage: true,         // (可选)，图片居中，不分大小
            contentReplace: /(\*W|（w|\(w).{10,25}(吧\*|）|\))|看小说就上|本书首发|泡.{1,6}吧|百度搜索阅读最新最全的小说|http:\/\/www.paoshu8.com\/|无弹窗/g,                                // 需要移除的内容正则 (可选)
            contentPatch: function(fakeStub){                          // (可选)内容补丁。解决翻页是脚本的情况
                var $next = fakeStub.find('#LinkMenu');
                $next.html($next.html().replace(/<script>ShowLinkMenu.*?(<a.*?a>).*?(<a.*?a>).*?script>/,'$1$2') +
                    '<a href=\'List.shtm\'>回目录</a>');
            }
        },
        // 特殊站点，需再次获取且跨域。添加 class="App-ajax"，同时需要 src, charset
        {siteName: "起点文学",
            url: "^http://(www|read)\\.(qidian|qdmm|qdwenxue)\\.com/BookReader/\\d+,\\d+.aspx$",
            titleReg: "小说:(.*?)(?:独家首发)/(.*?)/.*",
            contentReplace: /起点中文网|www.qidian.com|欢迎广大书友.*/g,
            contentHandle: false,
            contentPatch: function(fakeStub){
                fakeStub.find('div#content script:first').addClass('App-ajax');
            },
        },
        {siteName: "纵横中文网",
            url: "^http://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$",
            contentHandle: false,
            titleReg: "(.*?)-(.*)",
            contentPatch: function(fakeStub){
                fakeStub.find('.watermark').remove();
                // 给第几章添加空格
                var chapterTitle = fakeStub.find(".tc > h2").text();
                var chapterTitle1 = fakeStub.find(".tc > h2 em").text();
                if(chapterTitle1) {
                    chapterTitle = chapterTitle.replace(chapterTitle1, " ") + chapterTitle1;
                }
                fakeStub.find("title").text(
                    fakeStub.find(".tc > h1").text() + "-" + chapterTitle);
            }
        },
        {siteName: "创世中文网",
            url: "^http://chuangshi\\.qq\\.com/read/",
            titleReg: "(.*?)_(.*)_创世中文",
            contentSelector: ".bookreadercontent",
            contentHandle: false,
            useiframe: true,
            mutationSelector: "#chaptercontainer",  // 内容生成监视器
            contentPatch: function(fakeStub){
                fakeStub.find('.bookreadercontent  > p:last').remove();
            }
        },
        // 标题和底部下一页 会到左边
        {siteName: "晋江文学网",
            url: /^http:\/\/www\.jjwxc\.net\/onebook\.php\S*/,
            titleReg: /《(.*?)》.*ˇ(.*?)ˇ.*/,
            indexSelector: ".noveltitle > h1 > a",
            contentHandle: false,
            contentPatch: function(fakeStub){
                fakeStub.find('h2').remove();
                fakeStub.find('#six_list, #sendKingTickets').parent().remove();
                fakeStub.find("div.noveltext").find("div:first, h1").remove();
            }
        },
        {siteName: "潇湘书院",
            url: "^http://www\\.xxsy\\.net/books/.*\\.html",
            titleReg: "(.*?) (.*)",
            contentSelector: "#zjcontentdiv",
            nextSelector: "a[title='阅读下一章节']",
            contentHandle: false,
            contentReplace: "本书由潇湘书院首发，请勿转载！ ",
            contentPatch: function(fakeStub){
                fakeStub.find("title").text(fakeStub.find('meta[name="keywords"]').attr("content"));
            }
        },
        {siteName: "逐浪",
            url: /^http:\/\/book\.zhulang\.com\/.*\.html/,
            titleReg: /(.*?)-(.*)/,
            contentSelector: "#readpage_leftntxt",
            contentHandle: false,
            contentPatch: function(fakeStub){
                var title = fakeStub.find(".readpage_leftnzgx a:first").text() + "-" +
                    fakeStub.find(".readpage_leftntit").text();
                fakeStub.find('title').html(title);
            }
        },
        {siteName: "燃文",
            url: /^http:\/\/www\.ranwen\.cc\/.*\.html$/,
            titleReg: /(.*?)-(.*?)-.*/,
            contentSelector: "#oldtext",
            contentRemove: "div[style], script",
            contentReplace: /百度搜\|索|文\|学|文学全文.字手打|\((&nbsp;)+|牛过中文..hjsm..首发.转载请保留|\[本文来自\]|♠思♥路♣客レ|※五月中文网 5y ※|无错不跳字|最快阅读小说大主宰.*|跟我读Ｈ－u－n 请牢记|非常文学|关闭&lt;广告&gt;|w w.*|”娱乐秀”|更多精彩小[说說].*/g
        },
        {siteName: "燃文小说网",
            url: "http://www\\.ranwenxiaoshuo\\.com/files/article/html/\\d+/\\d+/\\d+\\.html|http://www\\.ranwenxiaoshuo\\.com/\\w+/\\w+-\\d+-\\d+\\.html",
            titleReg: /(.*?)最新章节(.*?)在线阅读.*/,
            contentSelector: "#fontsize",
            contentReplace: "天才一秒记住[\\s\\S]+为您提供精彩小说阅读。",
        },
        {siteName: "无错小说网",
            url: /^http:\/\/www\.wcxiaoshuo\.com\/wcxs[-\d]+\//,
            titleReg: /(.*?)最新章节.*?-(.*?)-.*/,
            titlePos: 1,
            nextSelector: "a#htmlxiazhang",
            prevSelector: "a#htmlshangzhang",
            indexSelector: "a#htmlmulu",
            contentReplace: {
                'ilo-full-src="\\S+\\.jpg" ': "",
                '(<center>)?<?img src..(http://www.wcxiaoshuo.com)?(/sss/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': '$3',
                "/sss/da.jpg": "打", "/sss/maws.jpg": "吗？", "/sss/baw.jpg": "吧？", "/sss/wuc.jpg": "无", "/sss/maosu.jpg": "：“", "/sss/cuow.jpg": "错", "/sss/ziji.jpg": "自己", "/sss/shenme.jpg": "什么", "/sss/huiqub.jpg": "回去", "/sss/sjian.jpg": "时间", "/sss/zome.jpg": "怎么", "/sss/zhido.jpg": "知道", "/sss/xiaxin.jpg": "相信", "/sss/faxian.jpg": "发现", "/sss/shhua.jpg": "说话", "/sss/dajiex.jpg": "大姐", "/sss/dongxi.jpg": "东西", "/sss/erzib.jpg": "儿子", "/sss/guolair.jpg": "过来", "/sss/xiabang.jpg": "下班", "/sss/zangfl.jpg": "丈夫", "/sss/dianhua.jpg": "电话", "/sss/huilaim.jpg": "回来", "/sss/xiawu.jpg": "下午", "/sss/guoquu.jpg": "过去", "/sss/shangba.jpg": "上班", "/sss/mingtn.jpg": "明天", "/sss/nvrenjj.jpg": "女人", "/sss/shangwo.jpg": "上午", "/sss/shji.jpg": "手机", "/sss/xiaoxinyy.jpg": "小心", "/sss/furene.jpg": "夫人", "/sss/gongzih.jpg": "公子", "/sss/xiansg.jpg": "先生", "/sss/penyouxi.jpg": "朋友", "/sss/xiaoje.jpg": "小姐", "/sss/xifup.jpg": "媳妇", "/sss/nvxudjj.jpg": "女婿", "/sss/xondi.jpg": "兄弟", "/sss/lagong.jpg": "老公", "/sss/lapo.jpg": "老婆", "/sss/meimeid.jpg": "妹妹", "/sss/jiejiev.jpg": "姐姐", "/sss/jiemeiv.jpg": "姐妹", "/sss/xianggx.jpg": "相公", "/sss/6shenumev.jpg": "什么", "/sss/cuoaw.jpg": "错", "/sss/fpefnyoturxi.jpg": "朋友", "/sss/vfsjgigarn.jpg": "时间", "/sss/zzhiedo3.jpg": "知道", "/sss/zibjib.jpg": "自己", "/sss/qdonglxi.jpg": "东西", "/sss/hxiapxint.jpg": "相信", "/sss/fezrormre.jpg": "怎么", "/sss/nvdrfenfjfj.jpg": "女人", "/sss/jhiheejeieev.jpg": "姐姐", "/sss/xdifagojge.jpg": "小姐", "/sss/gggugolgair.jpg": "过来", "/sss/maoashu.jpg": "：“", "/sss/gnxnifawhu.jpg": "下午", "/sss/rgtugoqgugu.jpg": "过去", "/sss/khjukilkaim.jpg": "回来", "/sss/gxhigfadnoxihnyy.jpg": "小心", "/sss/bkbskhhuka.jpg": "说话", "/sss/xeieavnfsg.jpg": "先生", "/sss/yuhhfuiuqub.jpg": "回去", "/sss/pdianphua.jpg": "电话", "/sss/fabxianr.jpg": "发现", "/sss/feilrpto.jpg": "老婆", "/sss/gxronfdri.jpg": "兄弟", "/sss/flfaggofng.jpg": "老公", "/sss/tymyigngtyn.jpg": "明天", "/sss/dfshfhhfjfi.jpg": "手机", "/sss/gstjhranjgwjo.jpg": "上午", "/sss/fmgeyimehid.jpg": "妹妹", "/sss/gxgihftutp.jpg": "媳妇", "/sss/cerztifb.jpg": "儿子", "/sss/gfxgigagbfadng.jpg":"下班", "/sss/gstjhranjg.jpg":"下午", "/sss/hjeirerm6eihv.jpg": "姐妹", "/sss/edajihexr.jpg": "大姐", "/sss/wesfhranrrgba.jpg": "上班", "/sss/gfognggzigh.jpg": "公子", "/sss/frurtefne.jpg": "夫人", "/sss/fzagnggfbl.jpg": "丈夫", "/sss/nvdxfudfjfj.jpg": "女婿", "/sss/xdidafnggx.jpg": "相公", "/sss/zenme.jpg": "怎么", "/sss/gongzi.jpg": "公子", "/sss/ddefr.jpg": "",
                ".*ddefr\\.jpg.*|无(?:错|.*cuoa?w\\.jpg.*)小说网不[少跳]字|w[a-z\\.]*om?|.*由[【无*错】].*会员手打[\\s\\S]*": "",
                "无错不跳字|一秒记住.*|全文免费阅读.*|列表|8 9 阅阅 读 网": "", "【 .{1,10} 】":""
            },
            contentPatch: function(fakeStub){
                // 去除内容开头、结尾的重复标题
                var title = fakeStub.find("#htmltimu").text().replace(/\s+/, "\\s*");
                var content = fakeStub.find("#htmlContent");
                content.find("div[align='center']").remove()
                if(title.match(/第\S+章/)){
                    content.html(content.html().replace(new RegExp(title), "").replace(new RegExp(title), ""));
                }
            }
        },
        {siteName: "书迷楼",
            url: /^http:\/\/www\.shumilou\.com\/.*html$/,
            titleReg: /(.*) (.*?) 书迷楼/,
            titlePos: 1,
            contentSelector: "#content",
            contentReplace: 'div lign="ener"&gt;|.*更多章节请到网址隆重推荐去除广告全文字小说阅读器',
            fixImage: true,
            contentPatch: function(fakeStub){
                fakeStub.find("#content").find("div.title:last")
                    .appendTo(fakeStub.find('body'));
                fakeStub.find("#content").find("div.title, p > b, div[style]").remove();
            }
        },
        {siteName: "冰火中文",
            url: /^http:\/\/www\.binhuo\.com\/html\/[\d\/]+\.html$/,
            titleReg: /(.*?)最新章节,(.*?)-.*/,
            fixImage: true,
            contentReplace: {
                "&lt;冰火#中文.*|冰火中文&nbsp;(www.)?binhuo.com|冰.火.中文|绿色小说|lvsexs ": "",
                "([^/])www\\.binhuo\\.com": "$1"
            },
            contentPatch: function(fakeStub){
                fakeStub.find("#BookText").append(fakeStub.find("img.imagecontent"));
            }
        },
        {siteName: "百晓生",
            url: /^http:\/\/www\.bxs\.cc\/\d+\/\d+\.html$/,
            titleReg: /(.*?)\d*,(.*)/,
            contentReplace: /无弹窗小说网www.bxs.cc|百晓生文学网|最快阅读小说大主宰，尽在百晓生文学网.*|ww.x.om|欢迎大家来到.*?bxs\.cc|百晓生阅读最新最全的小说.*|百晓生网不少字|站长推荐.*|[\[【].*[\]】]|文字首发|[\[\]\(《].*百晓生.*|百晓生.不跳字|百.晓.生.|关闭.*广告.*|飘天文学|本站域名就是.*|\(.{0,5}小说更快更好.{0,5}\)|(请在)?百度搜索.*/ig,
        },
        {siteName: "浩奇文学网",
            url: /^http:\/\/www\.haoqi99\.com\/.*\.shtml$/,
            titleReg: /^(.*?)--(.*?)-/,
        },
        {siteName: "书河小说网",
            url: /^http:\/\/www\.shuhe\.cc\/\d+\/\d+/,
            titleReg: "([^\\d]+)\\d*,(.*?)_",
            contentSelector: "#TXT",
            contentReplace: /（书河小说网.*?无弹窗）|wxs.o|ww.x.om|[\[【\(].{1,30}[\]\)】]|ff37;.*|书河小说网高速首发.*|TXT下载|全文阅读|第一书河小说网|百书斋.*|首发来自书河小说网|本书最新章节/ig,
        },
        {siteName: "爱收藏",
            url: /http:\/\/www\.aishoucang\.com\/\w+\/\d+\.html/,
            titleReg: "(.*?)-(.*?)-爱收藏",
            contentSelector: "#zhutone",
            contentReplace: {
                "<a[^>]*>(.*)</a>": "$1",
                ".爱收藏[^<]*": ""
            }
        },
        {siteName: "追书网",
            url: "^http://www\\.zhuishu\\.net/files/article/html/.*\\.html",
            titleReg: /(?:正文 )?(.*) (\S+) \S+ - .*/,
            titlePos: 1,
            contentSelector: "#content",
            indexSelector: ".pagebottom>a:contains('目录')",
            nextSelector: ".pagebottom>a:contains('下一页')",
            prevSelector: ".pagebottom>a:contains('上一页')",
            fixImage: true,
            contentReplace: {
                "([^/])www\\.ZhuisHu\\.net": "$1",
            },
            contentPatch: function(fakeStub){
                fakeStub.find("#content > .title, #content > .pagebottom").appendTo(fakeStub.find("body"));

                fakeStub.find("#content").find("center, b:contains('最快更新')").remove();
            }
        },
        {siteName: "啃书(图)",
            url: /^http:\/\/www\.fkzww\.net\/thread-.*\.html$/,
            titleReg: /(.*?) (.*?)-.*/,
            contentSelector: "#content",
            indexSelector: "#nav a:last",
            fixImage: true,
            contentPatch: function(fakeStub){
                $("<div id='content'></div>").append(fakeStub.find(".t_msgfontfix").find("img[width]"))
                    .appendTo(fakeStub.find("body"));

                fakeStub.find(".next").attr("href", "");
            }
        },
        {siteName: "猪猪岛小说",
            url: "http://www\\.zhuzhudao\\.com/txt/",
            titleReg: "(.*?)最新章节-(.*?)-",
            contentReplace: /[“"”]?猪猪岛小说.*|<\/?a[^>]+>|www\.zhuZhuDao\.com /ig
        },
        {siteName: "读零零",
            url: "http://www\\.du00\\.com/read/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*),(.*) - 读零零小说网",
            titlePos: 1,
            indexSelector: "#footlink a:contains('目录')",
            nextSelector: "#footlink a:contains('下一段')",
            prevSelector: "#footlink a:contains('下一段')",
            mutationSelector: "#pagecontent",
            contentReplace: "读零零小说网欢迎您的光临.*"
        },
        {siteName: "17k小说网",
            url: /^http:\/\/\S+\.17k\.com\/chapter\/\S+\/\d+\.html$/,
            titleReg: /(.*?)-(.*?)-.*/,
            contentPatch: function(fakeStub){
                fakeStub.find('xscript, #hotRecommend, .ct0416, .recent_read').remove();
            }
        },
        {siteName: "看下文学",
            url: "^http://www\\.kanxia\\.net/k/\\d*/\\d+/\\d+\\.html$",
            titleReg: /(.*?)-(.*)TXT下载_看下文学/,
            contentReplace: /看下文学/g
        },
        {siteName: "青帝文学网",
            url: /^http:\/\/www\.qingdi\.com\/files\/article\/html\/\d+\/\d+\/\d+\.html$/,
            titleReg: /(.*?)最新章节_(.*?)_青帝文学网_.*/
        },
        {siteName: "侠客中文网",
            url: /^http:\/\/www\.xkzw\.org\/\w+\/\d+\.html/,
            contentSelector: ".readmain_inner .cont",
            contentPatch: function(fakeStub){
                fakeStub.find('title').html(fakeStub.find('.readmain_inner h2').text());
            }
        },
        {siteName: "ChinaUnix.net",
            url: /^http:\/\/bbs\.chinaunix\.net\/thread-.*\.html/,
            contentSelector: ".t_f:first"
        },
        {siteName: "123du 小说",
            url: /^http:\/\/www\.123du\.net\/dudu-\d+\/\d+\/\d+\.html/,
            contentSelector: "#content",
            contentPatch: function(fakeStub){
                var content = fakeStub.find("#DivContentBG").html().match(/第\d*页([\s\S]*)一秒记住/)[1];
                $('<div id="content"/>').html(content).appendTo(fakeStub.find('body'));
            }
        },
        {siteName: "动力中文",
            url: "^http://dlzw\\.cc/article.*\\.html",
            nextSelector: "span:contains('下一篇') > a",
            prevSelector: "span:contains('上一篇') > a",
            indexSelector: "#pt a[href^='http']"
        },
        {siteName: "塔读文学",
            url: "^http://www\\.tadu\\.com/book/\\d+/\\d+/",
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
        {siteName: "第一中文",
            url: "^http://www\\.dyzww\\.com/cn/\\d+/\\d+/\\d+\\.html$" ,
            contentReplace: {
                '<img.*?ait="(.*?)".*?>': "$1",
                'www\\.dyzww\\.com.*|♂|шШщ.*': ""
            }
        },
        {siteName: "16K小说网",
            url: "^http://www\\.16kbook\\.org/Html/Book/\\d+/\\d+/\\d+\\.shtml$" ,
            contentReplace: {
                '(<center>)?<?img src..(http://www.16kbook.org)?(/tu/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': "$3",
                "/tu/shijie.jpg":"世界", "/tu/xiangdao.jpg":"想到", "/tu/danshi.jpg":"但是", "/tu/huilai.jpg":"回来", "/tu/yijing.jpg":"已经", "/tu/zhende.jpg":"真的", "/tu/liliang.jpg":"力量", "/tu/le.jpg":"了", "/tu/da.jpg":"大", "/tu/shengli.jpg":"胜利", "/tu/xiwang.jpg":"希望", "/tu/wandan.jpg":"完蛋", "/tu/de.jpg":"的",
                "16kbook\\s*(首发更新|小说网)": "",
            }
        },
        {siteName: "来书屋",
            url: "http://www.laishuwu.com/html/\\d+/\\d+/\\d+.html",
            titleSelector: ".chaptertitle h2",
            bookNameSelector: ".chaptertitle h1",
            contentReplace: "txt\\d+/",
        },
        {siteName: "万书吧",
            url: "http://www\\.wanshuba\\.com/Html/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*?)/(.*?)-万书吧",
            indexSelector: "#mulu",
            prevSelector: "#previewpage",
            nextSelector: "#papgbutton a:contains('手机下一章')",
            contentReplace: "\\[www.*?\\]"
        },
        {siteName: "大文学",
            url: "^http://www\\.dawenxue\\.net/html/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*?)-(.*)-大文学",
            contentSelector: "#clickeye_content",
            contentReplace: "\\(?大文学\\s*www\\.dawenxue\\.net\\)?|\\(\\)",
        },
        {siteName: "奇热",
            url: "^http://www\\.qirexs\\.com/read-\\d+-chapter-\\d+\\.html",
            titleReg: "(.*?)-(.*?)-",
            titlePos: 1,
            contentSelector: "div.page-content .note",
            contentRemove: "a",
            contentReplace: "”奇热小说小说“更新最快|首发,/.奇热小说网阅读网!|奇热小说网提供.*|\\(手机用户请直接访问.*"
        },
        {siteName: "热点",
            url: "^http://www\\.hotsk\\.com/Html/Book/\\d+/\\d+/\\d+\\.shtml",
            titleReg: "(.*?) 正文 (.*?) -",
            contentReplace: "无弹窗小说网"
        },
        {siteName: "落秋中文",
            url: "^http://www\\.luoqiu\\.com/html/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*?)-(.*?)-",
            contentReplace: "&lt;/p&gt;"
        },
        {siteName: "全本小说网",
            url: "^http://www\\.qb5\\.com/xiaoshuo/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*)_(.*)_",
            contentRemove: "div[class]",
            contentReplace: "全.{0,2}本.{0,2}小.{0,2}说.{0,2}网.{0,2}|[ｗWw ]+.{1,10}[CｃcǒOｍMМ ]+",
        },
        {siteName: "手牵手小说网",
            url: "^http://www\\.sqsxs\\.com/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*?)最新章节_\\S* (.*)_手牵手小说网",
            contentReplace: "访问下载txt小说.百度搜."
        },
        {siteName: "飞卢小说网",
            url: "^http://b\\.faloo\\.com/p/\\d+/\\d+\\.html",
            titleSelector: "#title h1",
            nextSelector: "a#next_page",
            prevSelector: "a#pre_page",
            indexSelector: "a#huimulu",
            contentSelector: "#content",
            contentReplace: "飞卢小说网 b.faloo.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在飞卢小说网！",
            contentPatch: function(fakeStub){
                fakeStub.find("#content").find(".p_gonggao").remove()
            }
        },
        {siteName: "顶点小说",
            url: "^http://www\\.23us\\.com/html/\\d+/\\d+/\\d+\\.html$",
            titleReg: "(.*?)-\\S*\\s(.*?)-顶点小说",
            titlePos: 0,
            indexSelector: "#footlink a:contains('返回目录')",
            prevSelector: "#footlink a:contains('上一页')",
            nextSelector: "#footlink a:contains('下一页')",
            contentSelector: "#contents",
            contentReplace: " (看小说到顶点小说网.*)",
            contentPatch: function(fakeStub){
                var temp=fakeStub.find('title').text();
                var realtitle = temp.replace(/第.*卷\s/,'');
                fakeStub.find('title').html(realtitle);
            }
        },
        // 内容需要js运行。
        {siteName: "读读看",
            url: "^http://www\\.dudukan\\.net/html/.*\\.html$",
            contentReplace: "看小说“就爱读书”|binhuo|www\\.92to\\.com",
            useiframe: true,
            mutationSelector: "#main",
            mutationChildCount: 0,
        },
        {siteName: "就爱读书",
            url: "^http://www\\.92to\\.com/\\w+/\\w+/\\d+\\.html$",
            titleReg: "(.*?)-(.*?)-",
            useiframe: true,
            timeout: 500,
            contentReplace: "看小说.就爱.*"
        },
        {siteName: "书书网",
            url: "http://www\\.shushuw\\.cn/shu/\\d+/\\d+\\.html",
            titleReg: "(.*) (.*?) 书书网",
            titlePos: 1,
            useiframe: true,
            timeout: 500,
            contentReplace: "！~！[\\s\\S]*"
        },
        {siteName: "找小说网",
            url: "http://www\\.zhaoxiaoshuo\\.com/chapter-\\d+-\\d+-\\w+/",
            titleReg: "(.*) - (.*) - 找小说网",
            titlePos: 1,
            useiframe: true,
            timeout: 500,
            contentRemove: "div[style]"
        },
        // 内容js，地址特殊生成。
        {siteName: "哈哈文学",
            url: /^http:\/\/www\.hahawx\.com\/.*htm/,
            titleReg: /(.*?)-(.*?)-.*/,
            contentSelector: "#chapter_content",
            contentReplace: /(?:好书推荐|书友在看|其他书友正在看|好看的小说|推荐阅读)：。|(www\.)?66c.com|(ｗｗｗ|ｂｏｏｋ).*(ｃｏｍ|ｎｅｔ)|www[a-z\.]*|全文字阅读|无弹窗广告小说网|哈哈文学\(www.hahawx.com\)|souDU.org|Ｓｏｕｄｕ．ｏｒｇ/ig,
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
                        class: "App-ajax",
                        src: url,
                        charset: "gbk"
                    });
                }
            }
        },
        {siteName: "3Z中文网",
            url: "^http://www\\.zzzcn\\.com\\/(3z\\d+/\\d+\\/|modules\\/article\\/App\\.php\\?aid=\\d+&cid=\\d+){1}$",
            titleReg: "(.*?)-(.*)TXT下载",
            contentSelector: "#content3zcn",
            indexSelector: "a:contains('返回目录')",
            prevSelector: "a:contains('上 一 页')",
            nextSelector: "a:contains('下 一 页'), a:contains('返回书架')",
            contentReplace: "一秒记住.*为您提供精彩小说阅读。",
            contentPatch: function(fakeStub){
                fakeStub.find("a:contains('返回书架')").html("下 一 页").attr("href", fakeStub.find("a:contains('返回目录')").attr("href"));
                fakeStub.find("#content3zcn").find(".titlePos, font.tips, a").remove();
            }
        },
        // 特殊处理。
        {siteName: "手打吧",
            url: /^http:\/\/shouda8\.com\/\w+\/\d+\.html/,
            contentReplace: /[w\s\[\/\\\(]*.shouda8.com.*|(\/\/)?[全文字]?首发|手打吧|www.shou.*|\(w\/w\/w.shouda8.c\/o\/m 手、打。吧更新超快\)|小说 阅读网 www.xiaoshuoyd .com/ig,
            contentPatch: function(fakeStub){
                var scriptSrc = fakeStub.find('body').html().match(/outputContent\('(.*txt)'\)/)[1];
                scriptSrc = "http://shouda8.com/ajax.php?f=http://shouda8.com/read" + scriptSrc;
                fakeStub.find('#content').attr({
                    "class": 'App-ajax',
                    src: scriptSrc
                });
            }
        },
        {siteName: "好看小說網",
            url: "http://tw\\.xiaoshuokan\\.com/haokan/\\d+/\\d+\\.html",
            contentSelector: ".bookcontent",
            prevSelector: "a.redbutt:contains('上一頁')",
            indexSelector: "a.redbutt:contains('返回章節目錄')",
            nextSelector: "a.redbutt:contains('下一頁')",
            contentReplace: "[a-z;&]*w.[xｘ]iaoshuokan.com 好看小說網[a-z;&族】）]*"
        },
        {siteName: "E品中文网",
            url: "http://www\\.epzww\\.com/book/\\d+/\\d+",
            titleReg: "(.*?),(.*?),",
            contentSelector: "#showcontent",
        }
    ];

    // ================== 小说拼音字、屏蔽字修复 ==================
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
        "@{3,}": "",

        // ===星号屏蔽字还原===
        "十有(\\*{2})":"十有八九", "\\*(2)不离十":"八九不离十",
        "G(\\*{2})":"GSM", "感(\\*{2})彩":"感情色彩",
        "强(\\*{2})u5B9D":"强大法宝",

        // === 多字替换 ===
        "暧me[iì]":"暧昧",
        "b[ěe]i(\\s|&nbsp;)*j[īi]ng":"北京","半shen": "半身", "b[ìi]j[ìi]ng":"毕竟",
        "ch[oō]ngd[oò]ng":"冲动", "缠mian": "缠绵", "成shu": "成熟", "赤lu[oǒ]": "赤裸", "春guang": "春光",
        "dang校": "党校", "da子": "鞑子", "diao丝": "屌丝", "d[úu]\\s{0,2}l[ìi]": "独立", "d?[iì]f[āa]ng":"地方", "d[ìi]\\s*d[ūu]":"帝都", "di国":"帝国", "du\\s{0,2}c[áa]i":"独裁",
        "f[ǎa]ngf[óo]":"仿佛", "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "f[èe]nn[ùu]":"愤怒",
        "gao潮": "高潮", "干chai": "干柴", "gu[oò]ch[ée]ng":"过程", "gu[āa]nx[iì]":"关系", "g[ǎa]nji[àa]o":"感觉", "国wu院":"国务院",
        "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "h[ǎa]oxi[àa]ng":"好像", "hu[áa]ngs[èe]":"黄色", "皇d[ìi]":"皇帝", "昏昏yu睡":"昏昏欲睡",
        "j[ìi]nháng":"进行", "jinv": "妓女", "jirou": "鸡肉", "ji者":"记者", "ju花":"菊花","j[īi]动":"激动", "jili[èe]":"激烈", "肌r[òo]u":"肌肉","ji射":"激射", "ji[ēe]ch[uù]":"接触", "j[ùu]li[èe]": "剧烈", "jǐng惕": "警惕",
        "k[ěe]n[ée]ng": "可能", "开bao": "开苞",  "k[àa]o近": "靠近",
        "ling辱": "凌辱", "luan蛋": "卵蛋", "脸sè": "脸色",
        "m[ǎa]ny[ìi]":"满意", "m[ǎa]sh[àa]ng":"马上", "m[ée]iy[oǒ]u":"没有", "mei国": "美国", "m[íi]ngb[áa]i":"明白", "迷huan": "迷幻", "m[íi]n\\s{0,2}zh[ǔu]": "民主", "迷jian": "迷奸",
        "n[àa]me":"那么", "n[ée]ngg[oò]u":"能够", "nán\\s{0,2}hǎi": "那会",
        "pi[áa]o客":"嫖客", "p[áa]ngbi[āa]n":"旁边",
        "q[íi]gu[àa]i":"奇怪", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚",
        "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易", "ru白色": "乳白色",
        "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u": "时候", "sh[ií]me":"什么", "shi身": "失身", "sh[ūu]j[ìi]":"书记", "shu女": "熟女", "上chuang": "上床", "呻y[íi]n": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷", "双xiu": "双修", "生r[ìi]": "生日",
        "t[uū]r[áa]n":"突然", "tiaojiao": "调教", "推dao": "推倒", "脱guang": "脱光", "t[èe]bi[ée]":"特别", "t[ōo]nggu[òo]":"通过", "tian来tian去":"舔来舔去",
        "w[ēe]ixi[ée]":"威胁", "wèizh[ìi]":"位置",
        "亵du": "亵渎", "xing福": "性福", "xiu长": "修长",
        "y[iī]y[àa]ng":"一样", "y[īi]di[ǎa]n":"一点", "y[ǐi]j[īi]ng":"已经", "阳w[ěe]i": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "you惑": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人","旖ni":"旖旎", "yu念":"欲念",
        "z[iì]j[iǐ]": "自己","z[ìi]\\s*you": "自由","zh[iī]d?[àa]u?o":"知道","zha药": "炸药", "zhan有": "占有", "政f[ǔu]": "政府", "zh[èe]ng\\s{0,2}f[uǔ]": "政府", "zong理":"总理", "zhōngy[āa]ng": "中央", "中yang":"中央", "zu[oǒ]y[oò]u":"左右", "zh[oō]uw[ée]i":"周围", "中nan海":"中南海", "中j委":"中纪委",

        // ===单字替换，需特殊处理，防止替换图片===
        "b[āà]ng":"棒","bào":"爆","b[àa]":"吧","bī":"逼","bō":"波",
        "cāo": "操", "cǎo": "草", "cào": "操", "chāng": "娼", "chang": "娼", "cháo": "潮", "chā": "插", "chéng": "成", "chōu": "抽", "chuáng": "床", "chún": "唇", "ch[ūu]n": "春", "cuō": "搓", "cū": "粗",
        "dǎng": "党", "dàng": "荡", "dāo": "刀", "dòng": "洞", "diao": "屌",
        "fǎ": "法", "féi": "肥", "fù": "妇", "fu": "妇", "guān": "官",
        "hán": "含", "hóu": "喉", "hòu": "厚", "huā": "花", "huá": "华", "huò": "惑", "hùn": "混", "hún": "魂",
        "jiǔ": "九", "j[īi]ng": "精", "jìn": "禁", "jǐng": "警", "jiāng": "江", "jiān": "奸", "jiāo": "交", "jūn": "军", "jū": "拘", "jú": "局", "jī": "激", "激ān":"奸",
        "kù": "裤", "k[àa]n": "看",
        "[1l]àng": "浪", "liáo": "撩", "liú":"流", "lì":"莉", "liè":"烈", "[1l]uàn":"乱", "lún":"伦", "luǒ":"裸", "lòu":"露", "[l1]ù":"露", "lǜ":"绿",
        "mǎi": "买", "mài": "卖", "máo": "毛", "mā": "妈", "méng": "蒙", "mén": "门", "miè": "灭", "mí": "迷", "mì": "蜜", "mō": "摸",
        "nǎi": "奶", "nèn": "嫩", "niào": "尿", "niē": "捏", "nòng": "弄", "nǚ": "女",
        "pào": "炮", "piàn": "片",
        "qiāng": "枪", "qíng": "情", "qīn": "亲", "qiú": "求", "quán": "全",
        "rì": "日", "([^a-z])ri":"$1日", "rǔ": "乳",
        "sāo":"骚", "sǎo": "骚", "s[èe]": "色", "shā": "杀", "shēn":"呻", "shén":"神", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥",
        "tān":"贪", "tiǎn": "舔", "tǐng":"挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "wēn": "温", "wěn": "吻",
        "xiǎo":"小", "x[ìi]ng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴",  "xuan":"宣",
        "yāng":"央", "yàn":"艳", "y[īi]n":"阴", "yào": "药", "yé": "爷", "yòu": "诱", "zàng": "脏", "yù": "欲", "yín": "淫",
        "zhēn":"针", "zēn":"针", "zhà":"炸", "zhèng":"政", "zhi":"治", "zǒu": "走", "zuì":"罪", "zuò":"做", "zhong":"中",

        // ===误替换还原===
        "碧欲": "碧玉","美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉",
        "品性": "品行","德性": "德行",
        "波ok":"book",

        // ===其他修正===
        "n吧":"nba",
        "弥俩": "你俩",
        "妳": "你",
        "圞|垩|卝|龘":"",

        // ===去广告===
        "全文字无广告": "",
        "uutxt\\.org": "",
        "3vbook\\.cn": "",
        "txt53712/": "",
        "\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
    };
    var replacements_reg = {};

    // 转换函数
    function contentReplacements(text){
        if(!config.content_replacements) return text;

        var s = new Date().getTime();

        // 转换
        for (var key in replacements) {
            if(!replacements_reg[key]){
                replacements_reg[key] = new RegExp(key, "ig");
            }

            text = text.replace(replacements_reg[key], replacements[key]);
        }

        debug("小说屏蔽字修复耗时：" + (new Date().getTime() - s) + 'ms');
        return text;
    }

    // ====================== Parser ==============================
    function Parser(info, doc, curPageUrl){
        this.info = info || {};
        this.doc = doc;
        this.$doc = $(doc);
        this.curPageUrl = curPageUrl || doc.URL;

        this.isTheEnd = false;
    }
    Parser.prototype = {
        getAll: function(callback){
            this.patch();

            this.getTitles();
            this.getPrevUrl();
            this.getIndexUrl();
            this.getNextUrl();
            this.getContent(callback);

            return this;
        },
        patch: function(){
            var contentPatch = this.info.contentPatch;
            if(contentPatch){
                try {
                    contentPatch(this.$doc);
                    debug("Apply Content Patch Success.");
                } catch (e) {
                    debug("Error: Content Patch Error!", e);
                }
            }
        },
        getTitles: function(){
            debug("Get title: ");
            var docTitle = this.$doc.find("title").text();

            if (this.info.titleReg){
                var matches = docTitle.match(new RegExp(this.info.titleReg));
                if(matches && matches.length == 3){
                    var titlePos = ( this.info.titlePos || 0 ) + 1,
                        chapterPos = (titlePos == 1) ? 2 : 1;
                    this.bookTitle = matches[titlePos].trim();
                    this.chapterTitle = matches[chapterPos].trim();
                }

                debug("  TitleReg:", this.info.titleReg, matches);
            }

            if(this.info.titleSelector){
                this.chapterTitle = this.$doc.find(this.info.titleSelector).text();
            }

            if(this.info.bookNameSelector){
                this.bookTitle = this.$doc.find(this.info.bookNameSelector).text();
            }

            if(!this.chapterTitle){
                this.chapterTitle = this.autoGetChapterTitle(this.doc);
            }

            // 标题间增加一个空格
            this.chapterTitle = this.chapterTitle
                    .replace(rule.titleReplace, "")
                    .trim()
                    .replace(/(第?\S+?[章节卷回])(.*)/, "$1 $2");

            this.docTitle = this.bookTitle ?
                    this.bookTitle + ' - ' + this.chapterTitle :
                    docTitle;

            debug("  Book Title: " + this.bookTitle);
            debug("  Chapter Title: " + this.chapterTitle);
            debug("  Document Title: " + this.docTitle);
        },
        // 智能获取章节标题
        autoGetChapterTitle: function (document) {
            debug("AutoGetTitle start");

            var
                _main_selector = "h1, h2, h3",
                _second_selector = "#TextTitle, #title, .ChapterName",
                _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/,
                _negative_regexp = /[上下]一章/,
                _title_remove_regexp = /最新章节|书书网/,
                _document_title = document.title ? document.title : $(document).find("title").text(),
                _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' '
            ;

            var _headings = document.querySelectorAll(_main_selector);
            // 去除包含的
            var _tmp = document.querySelectorAll(_second_selector);
            for (var i = 0; i < _tmp.length; i++) {
                if(!_tmp[i].querySelector(_main_selector))
                    _headings.push(_tmp[i])
            }

            var possibleTitles = {},
                _heading_text;

            for (var i = 0; i < _headings.length; i++) {
                var
                    _heading = _headings[i],
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
                if(_negative_regexp.test(_heading_text)){
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
                // if (_matched_words.length < 5) {
                    // continue;
                // }

                debug("  跟页面标题比较后得分：", score);

                var _font_size_text = "",
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
            var topScoreTitle,
                score_tmp = 0;
            for (_heading_text in possibleTitles) {
                if (possibleTitles[_heading_text] > score_tmp) {
                    topScoreTitle = _heading_text;
                    score_tmp = possibleTitles[_heading_text];
                }
            }

            var curTitle = topScoreTitle;
            if (!curTitle) {
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

            curTitle = curTitle.replace(rule.titleReplace, "");

            return curTitle;
        },
        getContent: function(callback){
            var content, contentValue;
            if(this.info.contentSelector){
                content = this.$doc.find(this.info.contentSelector);
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

            if(content.length === 0){
                this.isTheEnd = true
                this.nextUrl = null
                debug("没有找到内容")
                callback && callback(this)
                return;
            }

            // 特殊处理，例如起点
            var self = this;
            var ajaxScript = this.$doc.find('.' + READER_AJAX);
            if(ajaxScript.length > 0){
                var url = ajaxScript.attr('src');
                if(!url) return;
                var charset = ajaxScript.attr('charset') || 'utf-8';
                debug('  内容特殊处理 Ajax: ' + url +". charset=" + charset);
                GM_xmlhttpRequest({
                    url: url,
                    method: "GET",
                    overrideMimeType: "text/html;charset=" + charset,
                    onload: function(res){
                        var text = res.responseText.replace(/document.write(ln)?\('/, "")
                                .replace("');", "");
                        text = text.replace(/[\n\r]/g, '</p><p>');
                        self.content = self.handleContentText(text, self.info);
                        callback && callback(self);
                    }
                });
            }else{
                // 对页面内容处理
                content.find(rule.contentRemove).remove();
                if(this.info.contentRemove){
                    content.find(this.info.contentRemove).remove();
                }

                this.content = this.handleContentText(content.html(), this.info);
                callback && callback(this);
            }
        },
        handleContentText: function(text, info){
            if(!text) return null;

            var contentHandle = info.contentHandle == undefined ? true : info.contentHandle;

            /* Turn all double br's into p's */
            text = text.replace(rule.replaceBrs, '</p>\n<p>');

            text = text.replace(rule.contentReplace, '');

            if(info){
                if(info.contentReplace){
                    var replace = info.contentReplace;
                    if(typeof replace == 'string'){
                        text = text.replace(new RegExp(replace, "ig"), '');
                    }else if(replace instanceof RegExp){
                        text = text.replace(replace, '');
                    }else if(typeof replace == 'object'){
                        for(var key in replace){
                            text = text.replace(new RegExp(key, "ig"), replace[key]);
                        }
                    }
                    debug("  Content Replaced");
                }

                // 去除内容中包含的标题
                var titleRegText = "";
                if(this.bookTitle){
                    titleRegText += this.bookTitle + "\\d+";
                }

                text = text.replace(new RegExp(titleRegText, "g"), "");
                debug("  Content replace title: " + titleRegText);
            }

            if(contentHandle){
                // 先提取出 img
                var imgs = {};
                var i = 0;
                text = text.replace(/<img[^>]*>/g, function(img){
                    imgs[i] = img;
                    return "{" + (i++) + "}";
                });

                // 小说屏蔽字修复
                text = contentReplacements(text);

                // 还原图片
                text = App.nano(text, imgs);
            }

            var $div = $("<div>").html(text);

            if(contentHandle){
               // 给独立的文本添加 <p></p>
               $div.contents().filter(function(){
                   return this.nodeType == 3 && this.textContent.trim().length;
               }).wrap("<p></p>")
               .end()
               .filter('br')
                   .remove();
            }

            // 删除空白的 p
            $div.find("p").filter(function(){
                return this.textContent.trim().length == 0;
            }).remove();

            // 图片居中，所有图像？
            if(info.fixImage){
                $div.find("img").each(function(){
                    this.className += " blockImage";
                });
            }

            text = $div.html();

            // 修复第一行可能是空的情况
            text = text.replace(/(?:\s|&nbsp;)+<p>/, "<p>");

            // 修复当行就一个字符的
            text = text.replace(/<\/p><p>([。])/, "$1");

            if(config.paragraphBlank){
                text = text.replace(/<p>(?:\s|&nbsp;)+/g, "<p>")
                        .replace(/<p>/g, "<p>　　");
            }

            return text;
        },
        getNextUrl: function(){
            var url = '',
                selector = this.info.nextSelector || rule.nextSelector;

            var link = this.$doc.find(selector);
            if(link.length > 0){
                url = config.fullHref ? getFullHref(link[0]) : link.attr('href');
                debug("找到下一页链接: " + url);
            }else{
                debug("无法找到下一页链接.", link);
            }

            this.nextUrl = url;
            this.isTheEnd = !this.checkNextUrl(url);
            if(this.isTheEnd){
                this.theEndColor = config.end_color
            }

            return url;
        },
        checkNextUrl: function(url){
            switch(true){
                case url == '':
                case rule.nextUrlIgnore.test(url):
                case url == this.indexUrl:
                case url == this.prevUrl:
                case url == this.curPageUrl:
                case rule.nextUrlCompare.test(this.prevUrl) && !rule.nextUrlCompare.test(url):
                case /book\.zongheng\.com\/readmore/.test(url):
                    return false;
                default:
                    return true;
            }
        },
        getPrevUrl: function(){
            var url, selector;

            selector = this.info.prevSelector || rule.prevSelector;

            var link = this.$doc.find(selector);
            if(link.length > 0){
                url = config.fullHref ? getFullHref(link[0]): link.attr('href');
                debug("找到上一页链接: " + url);
            }else{
                debug("无法找到上一页链接.", link);
            }
            this.prevUrl = url || '';
            return url;
        },
        getIndexUrl: function(){
            var url, link;
            if(this.info.indexSelector){
                link = this.$doc.find(this.info.indexSelector);
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
                url = config.fullHref ? getFullHref(link[0]) : link.attr('href');
                debug("找到目录链接: " + url);
            }else{
                debug("无法找到目录链接.");
            }

            this.indexUrl = url;
            return url;
        }
    };

    // ====================== App ==============================
    var App = {
        isEnabled: false,
        parsedPages: {},
        paused: false,
        curPageUrl: location.href,
        requestUrl: null,
        iframe: null,
        remove: [],

        init: function(){
            if(App.isEnabled) return;

            var isAutoLaunch = App.checkIsAutoLaunch();
            if(isAutoLaunch){
                App.site = App.getCurSiteInfo() || {};

                if(App.site.mutationSelector){  // 特殊的启动：等待js把内容生成完成
                   App.addMutationObserve(document, App.launch);
                }else if(App.site.timeout){  // 延迟启动
                    setTimeout(App.launch, App.site.timeout);
                }else{  // NoScript 下 setTimeout 没用
                    App.launch();
                }
            }else{
                App.UI.addButton();
            }
        },
        getCurSiteInfo: function (){
            var sites = rule.specialSite;
            var url_reg;
            for (var i = 0, l = sites.length; i < l; i++) {
                url_reg = new RegExp(sites[i].url);
                if(url_reg.test(window.location.href)){
                    debug("找到规则：", sites[i]);
                    return sites[i];
                }
            }

            return null;
        },
        checkIsAutoLaunch: function (){
            var locationHref = window.location.href,
                referrer = document.referrer;
            switch(true){
                case App.Config.disable_auto_launch:
                case location.hostname == 'www.fkzww.net' && !document.title.match(/网文快讯/):  // 啃书只自动启用一个地方
                case L_getValue("booklinkme_disable_once") == 'true':
                    L_removeValue("booklinkme_disable_once");
                    return false;

                case GM_getValue("auto_enable"):
                case App.Config.booklink_enable && /booklink\.me/.test(referrer):
                case config.soduso && /www\.sodu\.so/.test(referrer):
                    return true;
                default:
                    return false;
            }
        },
        addMutationObserve: function(doc, callback){
            var shouldAdd = false;
            var selector = this.site.mutationSelector;
            var target = $(doc).find(selector)[0];
            if (target) {
                var mutationChildCount = this.site.mutationChildCount;
                if(mutationChildCount === undefined){
                    shouldAdd = true;
                } else {
                    if(target.children.length == mutationChildCount)
                        shouldAdd = true;
                }
            }

            if (shouldAdd) {
                var observer = new MutationObserver(function(mutations){
                    // console.log(mutations)
                    var mutation = mutations[mutations.length - 1];
                    if(mutation.addedNodes.length){
                        observer.disconnect();
                        callback();
                    }
                });
                observer.observe(target, {childList: true});

                debug("添加 MutationObserve 成功：", selector);
            }else{
                callback();
            }
        },
        launch: function(){
            // 只解析一次，防止多次重复解析一个页面
            if(document.body.getAttribute("name") == "MyNovelReader"){
                return App.toggle();
            }

           if(!App.site){
                App.site = this.getCurSiteInfo() || {};
            }

            var parser = new Parser(App.site, document);
            parser.getAll(function(){
                if(parser.content){
                    debug("App launched.");

                    App.parsedPages[window.location.href.replace(/\/$/, '')] = true;

                    App.prepDocument();

                    App.UI.init();

                    App.fixMobile();

                    document.title = parser.docTitle;
                    window.name = "MyNovelReader";
                    document.body.setAttribute("name", "MyNovelReader");
                    document.body.innerHTML = App.nano(App.UI.tpl_container, parser);

                    // cache vars
                    App.$doc = $(document);
                    App.$content = App.$doc.find("#content");
                    App.$loading = App.$doc.find("#loading");
                    App.indexUrl = parser.indexUrl;

                    // append content
                    App.$content.append(App.nano(App.UI.tpl_content, parser));

                    // 再次移除其它不相关的。起点中文有时候问题比较大
                    if(window.location.hostname == "read.qidian.com"){
                        setTimeout(function(){
                            $('body > *:not("#container, .readerbtn")').remove();
                        }, 3000);
                    }

                    App.requestUrl = parser.nextUrl;
                    App.isTheEnd = parser.isTheEnd;

                    App.registerControls();
                    App.isEnabled = true;
                    App.UI.addButton();

                    // App.fixImageFloats();

                    // 有些图片网站高度随着图片加载而变长
                    setTimeout(function(){
                        App.scroll();
                    }, 1000);
                }else{
                }
            });
        },
        prepDocument: function() {
            window.onload = window.onunload = function() {};

            // 破解右键限制
            var doc = document;
            var bd = doc.body;
            bd.onclick = bd.ondblclick = bd.onselectstart = bd.oncopy = bd.onpaste = bd.onkeydown = bd.oncontextmenu = bd.onmousemove = bd.onselectstart = bd.ondragstart = doc.onselectstart = doc.oncopy = doc.onpaste = doc.onkeydown = doc.oncontextmenu = null;
            doc.onclick = doc.ondblclick = doc.onselectstart = doc.oncontextmenu = doc.onmousedown = doc.onkeydown = function() {
                return true;
            };
            with(document.wrappedJSObject || document) {
                onmouseup = null;
                onmousedown = null;
                oncontextmenu = null;
            }
            var arAllElements = document.getElementsByTagName('*');
            for (var i = arAllElements.length - 1; i >= 0; i--) {
                var elmOne = arAllElements[i];
                with(elmOne.wrappedJSObject || elmOne) {
                    onmouseup = null;
                    onmousedown = null;
                }
            }

            // remove body style
            $('link[rel="stylesheet"], style, script').remove();
            $('*').removeAttr('style');
            $('body').removeAttr('bgcolor');
        },
        fixMobile: function(){  // 自适应网页设计
            var meta = document.createElement("meta");
            meta.setAttribute("name", "viewport");
            meta.setAttribute("content", "width=device-width, initial-scale=1");
            document.head.appendChild(meta);
        },
        toggle: function(){
            if(App.isEnabled){  // 退出
                GM_setValue("auto_enable", false);
                L_setValue("booklinkme_disable_once", "true");

                unsafeWindow.location = App.curPageUrl;
            }else{
                GM_setValue("auto_enable", true);
                L_removeValue("booklinkme_disable_once");
                App.isEnabled = true;
                App.launch();
            }
        },
        removeListener: function(){
            debug("移除各种事件监听");
            App.remove.forEach(function(_remove){
                _remove();
            });
        },
        registerControls: function(){
            $(document).on({
                scroll: App.scroll,
                keyup: App.keyup,
            });

            App.$content.on({
                dblclick: App.pauseHandler,
            });

            $("#preferencesBtn").click(function(event){
                event.preventDefault();
                App.UI.preferencesShow();
            });

            GM_registerMenuCommand("小说阅读脚本设置", App.UI.preferencesShow.bind(App.UI));
        },
        keyup: function(event){
            var tarNN = event.target.nodeName;
            if (tarNN != 'BODY' && tarNN != 'HTML') return;
            switch(event.which){
                case 13:  // Enter
                    App.openUrl(App.indexUrl, "主页链接没有找到");
                    // if(App.indexUrl){
                    //     GM_setClipboard( , "text")
                    // }
                    break;
                case 37:  // left arrow
                    break;
                case 39:  // right arrow
                    break;
            }
        },
        openUrl: function(url, errorMsg){
            if (url) {
                GM_openInTab(url);
            } else {
                App.UI.notice(errorMsg);
            }
        },
        pauseHandler: function(e){
            App.paused = !App.paused;
            if(App.paused){
                App.UI.notice('<b>状态</b>:自动翻页<span style="color:red!important;"><b>暂停</b></span>.');
                App.$loading.html('自动翻页已经<span style="color:red!important;"><b>暂停</b></span>.');
            }else{
                App.UI.notice('<b>状态</b>:自动翻页<span style="color:red!important;"><b>启用</b></span>.');
                App.scroll();
            }
        },
        scroll: function(){
            if (!App.paused && !App.working && App.getRemain() < App.Config.remain_height) {
                App.doRequest();
            }

            if(App.isTheEnd){
                App.$loading.html("已到达最后一页...").show();
            }
        },
        getRemain: function(){
            var scrollHeight = Math.max(document.documentElement.scrollHeight,
                                        document.body.scrollHeight);
            var remain = scrollHeight - window.innerHeight - window.scrollY;
            return remain;
        },
        doRequest: function(){
            App.working = true;
            var nextUrl = App.requestUrl;

            if(nextUrl && !App.isTheEnd && !(nextUrl in App.parsedPages)){
                App.parsedPages[nextUrl] = true;
                App.curPageUrl = App.requestUrl;
                App.requestUrl = null;

                var useiframe = App.site.useiframe;

                App.$loading
                    .show()
                    .html("")
                    .append($("<img>").attr("src", "data:image/gif;base64,R0lGODlhEAAQAMQAAPf39+/v7+bm5t7e3tbW1s7OzsXFxb29vbW1ta2traWlpZycnJSUlIyMjISEhHt7e3Nzc2tra2NjY1paWlJSUkpKSkJCQjo6OjExMSkpKSEhIRkZGRAQEAgICAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAeACwAAAEADwAOAAAFdaAnet20GAUCceN4LQlyFMRATC3GLEqM1gIc6dFgPDCii6I2YF0eDkinxUkMBBAPBfLItESW2sEjiWS/ItqALJGgRZrNRtvWoDlxFqZdmbY0cVMdbRMWcx54eSMZExQVFhcYGBmBfxWPkZQbfi0dGpIYGiwjIQAh+QQJBQAeACwAAAEADwAOAAAFeKAnep0FLQojceOYQU6DIsdhtVoEywptEBRRZyKBQDKii+JHYGEkxE6LkyAMIB6KRKJpJQuDg2cr8Y7AgjHULCoQ0pUJZWO+uBGeDIVikbYyDgRYHRUVFhcsHhwaGhsYfhuHFxgZGYwbHH4iHBiUlhuYmlMbjZktIQAh+QQFBQAeACwAAAEADwAOAAAFe6Aneh1GQU9UdeOoTVIEOQ2zWG0mSVP0ODYF4iLq7HgaEaaRQCA4HsyOwhp1FgdDxFOZTDYt0cVQSHgo6PCIPOBWKmpRgdDGWCzQ8KUwOHg2FxcYYRwJdBAiGRgZGXkcC3MEjhkalZYTfBMtHRudnhsKcGodHKUcHVUeIQAh+QQJBQAeACwAAAEADwAOAAAFbKAnjp4kURiplmYEQemoTZMpuY/TkBVFVRtRJtJgMDoejaViWT0WiokHc2muMIoEY0pdiRCIgyeDia0OhoJnk8l4PemEh6OprxQFQkS02WiCIhd4HmoiHRx9ImkEA14ciISMBFJeSAQIEBwjIQAh+QQJBQAeACwAAAEADwAOAAAFd6Anel1WTRKFdeO4WRWFStKktdwFU3JNZ6MM5nLZiDQTCCTC4ghXrU7k4bB4NpoMpyXKNBqQa5Y7YiwWHg6WLFK4SWoW95JAMOAbI05xOEhEHWoaFyJ0BgYHWyIcHA4Fj48EBFYtGJKSAwMFFGQdEAgCAgcQih4hACH5BAkFAB4ALAAAAQAPAA4AAAV0oCeKG2ZVFtaNY6dh10lNU8Z2WwbLkyRpI85Gk+GQKr7JqiME3mYSjIe5WbE8GkhkMhVeR48HpLv5ihoOB9l4xTAYYw9nomCLOgzFoiJSEAoIFiIXCwkJC1YVAwMEfwUGBgeBLBMEAouOBxdfHA8HlwgRdiEAIfkECQUAHgAsAAABAA8ADgAABXOgJ4rdpmWZ1o0sZ2YYdlka63XuKVsVVZOuzcrDufQoQxzH1rFMJJiba8jaPCnSjW30lHgGhMJWBIl4D2DLNvOATDwPwSCxHHUgjseFOJAn1B4YDgwND0MTAWAFBgcICgsMUVwDigYICQt7NhwQCGELE1QhACH5BAkFAB4ALAAAAQAPAA4AAAV4oCeOHWdyY+p1JbdpWoam7fZmGYZtYoeZm46Ik7kYhZBBQ6PyWSoZj0FAuKg8mwrF4glQryIKZdL9gicTiVQw4Ko2aYrnwUbMehGJBOPhDAYECVYeGA8PEBNCHhOABgcJCgwNh0wjFQaOCAoLk1EqHBILmg8Vih4hACH5BAkFAB4ALAAAAQAPAA4AAAV6oCd6Hdmd5ThWCee+XCpOwTBteL6lnCAMLVFHQ9SIHgHBgaPyZDKYjcfwszQ9HMwl40kOriKLuDsggD2VtOcwKFibGwrFCiEUEjJSZTLhcgwGBwsYIhkUEhITKRYGCAkKDA0PiBJcKwoKCwwODxETRk0dFA8NDhIYMiEAIfkECQUAHgAsAAABAA8ADgAABXmgJ3rcYwhcN66eJATCsHEpOwXwQGw8rZKDGMIi6vBmokcswWFtNBvVQUdkcTJQj67AGmEyGU+hYOiKMGiP4oC4dDmXS1iCSDR+xYvFovF0FAoLDxgiGxYUFRY/FwsMDQ4PEhOTFH0jFw6QEBKcE5YrHRcTERIUGHghACH5BAkFAB4ALAAAAQAPAA4AAAV4oCd63GMAgfF04zgNQixjrVcJQz4QRLNxI06Bh7CILpkf0CMpGBLL0ebHWhwOl5qno/l5EGCtqAtUmMWeTNfzWCxoNU4maWs0Vq0OBpMBdh4ODxEaIhsXhxkjGRAQEhITExQVFhdRHhoTjo8UFBYbWnoUjhUZLCIhACH5BAkFAB4ALAAAAQAPAA4AAAV5oCd6HIQIgfFw42gZBDEMgjBMbXUYRlHINEFF1FEgEIqLyHKQJToeikLBgI44iskG+mAsMC0RR7NhNRqM8IjMejgcahHbM4E8Mupx2YOJSCZWIxlkUB0TEhIUG2IYg4tyiH8UFRaNGoEeGYgTkxYXGZhEGBWTGI8iIQA7"))
                    .append("正在载入下一页" + (useiframe ? "(iframe)" : "") + "...");

                if(useiframe){
                    App.iframeRequest(nextUrl);
                }else{
                    App.httpRequest(nextUrl);
                }
            }else{
                App.$loading.html("无法使用阅读模式，请手动点击下一页（快捷键→）").show();
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
                    App.loaded(doc);
                }
            });
        },
        iframeRequest: function(nextUrl){
            debug("iframeRequest: " + nextUrl);
            if (!App.iframe) {
                var i = document.createElement('iframe');
                App.iframe = i;
                i.name = 'mynovelreader-iframe';
                i.width = '100%';
                i.height = '0';
                i.frameBorder = "0";
                i.style.cssText = '\
                    margin:0!important;\
                    padding:0!important;\
                    visibility:hidden!important;\
                ';
                i.src = nextUrl;
                i.addEventListener('load', App.iframeLoaded, false);
                App.remove.push(function() {
                    i.removeEventListener('load', App.iframeLoaded, false);
                });
                document.body.appendChild(i);
            } else {
                App.iframe.contentDocument.location.replace(nextUrl);
            }
        },
        iframeLoaded: function(){
            var iframe = this;
            var body = iframe.contentDocument.body;

            if(body && body.firstChild){
                doc = iframe.contentDocument;

                var mutationSelector = App.site.mutationSelector;
                if(mutationSelector){
                    App.addMutationObserve(doc, function(){
                        App.loaded(doc);
                    });
                }else{
                    var timeout = App.site.timeout || 0;

                    setTimeout(function(){
                        App.loaded(doc);
                    }, timeout);
                }
            }
        },
        loaded: function(doc){
            var parser = new Parser(App.site, doc, App.curPageUrl);

            parser.getAll(App.addNextPage);
        },
        addNextPage: function(parser){
            if(parser.content){
                App.$content.append(App.nano(App.UI.tpl_content, parser));

                // unsafeWindow.history.pushState(null, parser.docTitle, parser.curPageUrl);
                // document.title = parser.docTitle;
                App.$loading.hide();
                App.requestUrl = parser.nextUrl;
                App.isTheEnd = parser.isTheEnd;
            }else{
                App.removeListener();

                App.$loading.html("错误：没有找到下一页的内容").show();
            }

            App.working = false;
        },
        fixImageFloats: function (articleContent) {
            if(!config.fixImageFloats) return;

            articleContent = articleContent || document.getElementById("wrapper");

            var imageWidthThreshold = Math.min(articleContent.offsetWidth, 800) * 0.55,
                images = articleContent.querySelectorAll('img:not(.blockImage)');

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

    App.Config = {
        get disable_auto_launch() {  // 强制手动启用模式
            return this._getBooleanConfig("disable_auto_launch", false);
        },
        set disable_auto_launch(bool) {
            GM_setValue("disable_auto_launch", bool);
        },

        get booklink_enable() {  // booklink.me 跳转的自动启动
            return this._getBooleanConfig("booklink_enable", true);
        },
        set booklink_enable(bool) {
            GM_setValue("booklink_enable", bool);
        },

        get debug() {  // 调试
            if(!this._debug){
                this._debug = this._getBooleanConfig("debug", false);
            }
            return this._debug;
        },
        set debug(bool) {
            GM_setValue("debug", bool);
        },

        get remain_height() {  // 距离底部多少高度（px）开始加载下一页
            if(!this._remain_height){
                this._remain_height = parseInt(GM_getValue("remain_height"), 10) || 1000;
            }
            return this._remain_height;
        },
        set remain_height(val) {
            GM_setValue("remain_height", val);
        },

        get font_size() {  // 字体大小
            return GM_getValue("font_size") || "18px";
        },
        set font_size(val) {
            GM_setValue("font_size", val);
        },

        get content_width() {  // 内容宽度
            return GM_getValue("content_width") || "60%";
        },
        set content_width(val) {
            GM_setValue("content_width", val);
        },

        get main_css() {
            return GM_getValue("main_css") || "";
        },
        set main_css(val) {
            GM_setValue("main_css", val);
        },

        get skin_name() {
            return GM_getValue("skin_name") || "缺省皮肤";
        },
        set skin_name(val) {
            GM_setValue("skin_name", val);
        },

        get hide_footer_nav() {
            return this._getBooleanConfig("hide_footer_nav", false);
        },
        set hide_footer_nav(bool) {
            GM_setValue("hide_footer_nav", bool);
        },

        _getBooleanConfig: function(configName, defaultValue) {
            var config = GM_getValue(configName);
            if(config === undefined) {
                GM_setValue(configName, defaultValue);
                config = defaultValue;
            }
            return config;
        }
    };

    App.UI = {
        tpl_container: '\
            <div id="container">\
                <div id="content"></div>\
                <div id="loading" style="display:none"></div>\
                <div id="preferencesBtn">\
                    <img style="width:16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABwklEQVRIibVVzWrCQBAeQk/bdk+bm0aWDQEPHtwVahdavLU9aw6KAQ+SQ86Sa19Aqu0T9NafSw8ttOgr1CewUB9CBL3Yy26x1qRp0A8GhsnO9yUzmxmAhKjX68cAMAeAufK3C875FQAsAWCp/O3CsqyhFlB+Oti2/cAYewrD8FDHarXahWEYUy1gGMbUdd1z/TwMw0PG2JNt2/ex5IyxR02CEJpIKbuEkJGOrRshZCSl7CKEJjrGGHuIFMjlcs9RZElNcWxGEAQHGONxWnKM8TgIgoPYMkkpL9MKqNx4xNX8LyOEvMeSq5uxMZlz3vN9v+D7foFz3os6V61Wz36QNhqNUyHENaV0CACLTUnFYvF6/WVUbJPIglI6FELctFqtMiT59Ha7TdcFVCxJ6XYs0Gw2T1SJBlsq0ZxSOhBC3Hied/QjSTUoqsn9lSb3o879avI61FXbzTUFACiXy7v70Tqdzj7G+COtwJ+jIpPJvKYl12ZZ1kucwJs+iBD6lFJ2TdOMHB2mab7/a1xXKpW9fD5/6zjO3erCcV33PMnCcRwnfuHEYXVlZrPZQWqiKJRKpe8Bt5Ol73leCQBmADBTfiJ8AebTYCRbI3BUAAAAAElFTkSuQmCC"/>\
                </div>\
                <div id="alert" style="display: none;">\
                    <p id="App-notice"></p>\
                </div>\
            </div>\
        ',
        tpl_content: '<article>\
                <h1 class="title">{chapterTitle}</h1>\
                {content}\
                <div class="chapter-footer-nav">\
                    <a class="prev-page" href="{prevUrl}">上一页</a> | \
                    <a class="index-page" href="{indexUrl}" title="Enter 键打开目录">目录</a> | \
                    <a class="next-page" style="color:{theEndColor}" href="{nextUrl}">下一页</a>\
                </div>\
            </article>\
        ',
        skins: {
            "缺省皮肤": "",
            "暗色皮肤": "body { color: #666; background: rgba(0,0,0,.1); }\
                .title { color: #222; }",
            "白底黑色": "body { color: #333; background: white;}\
                .title { font-weight: bold; border-bottom: 0.1em solid; margin-bottom: 1.857em; padding-bottom: 0.857em;}",
            "夜间模式": "body { color: #e3e3e3; background: #2d2d2d; }",
            "橙色背景": "body { color: #24272c; background: #FEF0E1; }",
            "绿色背景": "body { color: #333; background: #d8e2c8; }",
            "经典皮肤": "body { color: #333; background-color: #EAEAEE; }\
                .title { background: #f0f0f0; }"
        },
        skin_style: null,

        init: function(){
            App.UI.addMainStyle();

            if(App.Config.hide_footer_nav){
                GM_addStyle(".chapter-footer-nav { display: none; }");
            }

            // 后面需要删除
            App.UI.skin_style = GM_addStyle(App.UI.skins[App.Config.skin_name]);
        },
        addMainStyle: function(){
            App.UI.css = GM_addStyle(
                mainCss
                    .replace("{font_size}", App.Config.font_size)
                    .replace("{title_font_size}", App.UI.calcTitleFontSize(App.Config.font_size))
                    .replace("{content_width}", App.Config.content_width)
                );

            var css = App.Config.main_css;
            if(css){
                GM_addStyle(css);
            }
        },
        calcTitleFontSize: function(contentFontSizeStr){
            var m = contentFontSizeStr.match(/([\d\.]+)(px|em|pt)/);
            if(m) {
                var size = m[1],
                    type = m[2];
                return parseInt(size, 10) * 1.88 + type;
            }

            return "";
        },
        addButton: function(){
            GM_addStyle('\
                .readerbtn {\
                    position: fixed;\
                    right: 10px;\
                    bottom: 10px;\
                    z-index: 1597;\
                    padding: 20px 5px;\
                    width: 50px;\
                    height: 20px;\
                    line-height: 20px;\
                    text-align: center;\
                    border: 1px solid;\
                    border-color: #888;\
                    border-radius: 50%;\
                    background: rgba(0,0,0,.5);\
                    color: #FFF;\
                    font: 12px/1.5 "微软雅黑","宋体",Arial;\
                    cursor: pointer;\
                }\
            ');

            $("<div>")
                .addClass("readerbtn")
                .html(App.isEnabled ? "退出" : "阅读模式")
                .mousedown(function(event){
                    if(event.which == 1){
                        App.toggle();
                    }else if(event.which == 2){
                        event.preventDefault();
                        L_setValue("booklinkme_disable_once", true);
                        GM_openInTab(App.curPageUrl);
                    }
                })
                .appendTo('body');
        },
        preferencesShow: function(event){
            if(event){
                event.preventDefault();
                event.stopPropagation();
            }

            var prefs = $('<div id="reader_preferences">')
                .css({
                    position: "fixed",
                    top: "5%",
                    left: "0",
                    width: "100%",
                    "z-index": "30000"
                });

            $("<style>").text('\
                    .body {\
                        color:#333;\
                        width: 500px;\
                        margin: 0 auto;\
                        background: white;\
                        padding: 10px;\
                    }\
                    .form-row {\
                        overflow: hidden;\
                        padding: 8px 12px;\
                        margin-top: 3px;\
                        font-size: 11px;\
                        border-bottom: 1px solid rgb(238, 238, 238);\
                        border-right: 1px solid rgb(238, 238, 238);\
                    }\
                    .form-row label {\
                        padding-right: 10px;\
                    }\
                    .form-row input {\
                        vertical-align: middle;\
                        margin-top: 0px;\
                    }\
                    textarea, input {\
                        font-size: 14px;\
                        padding: 4px 6px;\
                        border: 1px solid #e5e5e5;\
                        background: #fff;\
                        border-radius: 4px;\
                        color: #666;\
                        -webkit-transition: all linear .2s;\
                        transition: all linear .2s;\
                    }\
                    textarea {\
                        overflow: auto;\
                        vertical-align: top;\
                    }\
                    input {\
                        vertical-align: middle;\
                        line-height: 20px;\
                    }\
                    input[type="textbox"] {\
                        height: 12px;\
                    }\
                    textarea:focus, input:focus {\
                        border-color: #99baca;\
                        outline: 0;\
                        background: #f5fbfe;\
                        color: #666;\
                    }\
                    button {\
                        vertical-align: middle;\
                        border-radius: 4px;\
                        color: #666;\
                        line-height: 20px;\
                        font-size: 14px;\
                        padding: 4px 12px;\
                        background: #f7f7f7;\
                        letter-spacing: normal;\
                        border: 1px solid rgba(0, 0, 0, 0.2);\
                        border-bottom-color: rgba(0, 0, 0, 0.3);\
                        background-origin: border-box;\
                        background-image: -webkit-linear-gradient(top, #fff, #eee);\
                        background-image: linear-gradient(to bottom, #fff, #eee);\
                        text-shadow: 0 1px 0 #fff;\
                    }\
                    button:hover {\
                        background-color: #fafafa;\
                        outline: 0;\
                        background-image: none;\
                    }\
                '.replace(/                    /g, "\n"))
                .appendTo(prefs);

            $('<div class="body">')
                .html('<form id="preferences" class="aligned" name="preferences">\
                        <div class="form-row">\
                            <label>\
                                <input type="checkbox" id="disable-auto-launch" name="disable-auto-launch" title="不自动启用阅读模式，手动点击按钮启用"/>强制手动启用\
                            </label>\
                            <label>\
                                <input type="checkbox" id="booklink-enable" name="booklink-enable" title="booklink.me 点击的网站强制启用"/>booklink 自动启用\
                            </label>\
                            <label>\
                                <input type="checkbox" id="debug" name="debug"/>调试模式\
                            </label>\
                        </div>\
                        <div class="form-row">\
                            <label>\
                                <select id="skin">\
                                </select>\
                            </label>\
                            <label>\
                                字体大小\
                                <input type="textbox" id="font-size" name="font-size" size="2"/>\
                            </label>\
                            <label>\
                                内容宽度\
                                <input type="textbox" id="content-width" name="content-width" size="1"/>\
                            </label>\
                        </div>\
                        <div class="form-row">\
                            <label>\
                                距离底部\
                                <input type="textbox" id="remain-height" name="remain-height" size="2" title="距离底部多少高度（px）开始加载下一页"/>\
                                px 加载下一页\
                            </label>\
                            <label>\
                                <input type="checkbox" id="hide-footer-nav"/>隐藏页面底部导航栏\
                            </label>\
                        </div>\
                        <div style="text-align:center">\
                            <h3>额外的样式</h3>\
                            <textarea id="main_css" name="main_css" cols="60" rows="10"></textarea>\
                            <p>\
                                <button id="close_button" type="button">关闭</button>\
                                <button id="save_button" type="button">保存</button>\
                            </p>\
                        </div>\
                    </form>')
                .appendTo(prefs);

            prefs.appendTo($("body"));
            this.prefs = prefs;

            this.preferencesLoadHandler();
        },
        hide: function(){
            if(this.prefs) this.prefs.remove();
            this.prefs = null;
        },
        preferencesLoadHandler: function(){
            var $form = $("#preferences");

            $form.find("#disable-auto-launch").get(0).checked = App.Config.disable_auto_launch;
            $form.find("#booklink-enable").get(0).checked = App.Config.booklink_enable;
            $form.find("#debug").get(0).checked = App.Config.debug;
            $form.find("#hide-footer-nav").get(0).checked = App.Config.hide_footer_nav;

            $form.find("#font-size").get(0).value = App.Config.font_size;
            $form.find("#content-width").get(0).value = App.Config.content_width;
            $form.find("#remain-height").get(0).value = App.Config.remain_height;
            $form.find("#main_css").get(0).value = App.Config.main_css;

            // skin
            var $skin = $form.find("#skin");
            for(var key in App.UI.skins){
                $("<option>").text(key).appendTo($skin);
            }
            $skin.val(App.Config.skin_name);
            $skin.change(function(){
                if(App.UI.skin_style){
                    $(App.UI.skin_style).remove();
                }

                var key = $(this).find("option:selected").text();
                App.UI.skin_style = GM_addStyle(App.UI.skins[key]);
                App.Config.skin_name = key;
            });

            $form.find("#font-size").keyup(function(){
                var titleFontSize = App.UI.calcTitleFontSize(this.value);
                if(titleFontSize) {
                    App.$content.css("font-size", this.value);
                    App.$content.find("h1").css("font-size", titleFontSize);
                }
            });

            $form.find("#content-width").keyup(function(){
                App.$content.css("width", this.value);
            });

            // button
            $form.find("#close_button").click(this.hide.bind(this));
            $form.find("#save_button").click(this.preferencesSaveHandler.bind(this));
        },
        preferencesSaveHandler: function(){
            var $form = $("#preferences");

            App.Config.disable_auto_launch = $form.find("#disable-auto-launch").get(0).checked;
            App.Config.booklink_enable = $form.find("#booklink-enable").get(0).checked;
            App.Config.debug = $form.find("#debug").get(0).checked;
            App.Config.hide_footer_nav = $form.find("#hide-footer-nav").get(0).checked;

            // App.Config.skin_name = $form.find("#skin").find("option:selected").text();
            App.Config.font_size = $form.find("#font-size").get(0).value;
            App.Config.content_width = $form.find("#content-width").get(0).value;
            App.Config.remain_height = $form.find("#remain-height").get(0).value;
            App.Config.main_css = $form.find("#main_css").get(0).value;

            this.hide();
            window.location.reload();
        },
        notice: function (html_txt){
            var $noticeDiv = $("#alert");

            clearTimeout(App.UI.noticeDivto);
            $noticeDiv.find("p").html(html_txt);
            $noticeDiv.fadeIn("fast");

            App.UI.noticeDivto = setTimeout(function(){
                $noticeDiv.fadeOut(500);
            },1666);

            return $noticeDiv;
        }
    };

    window.addEventListener("DOMContentLoaded", App.init, false);

    var db;
    window.postMessage("fromeMyNovelReader.post", "*");
    window.addEventListener('message', function(e) {
        if (db) return;
        var data = e.data;
        if (typeof data == 'string' && data.indexOf('MyNovelReader.db') == 0) {

            window.removeEventListener('message',arguments.callee,false);
            window.postMessage("fromeMyNovelReader.remove", "*");

            data = data.slice(16);
            try{
                db = eval( "(" + data + ")" );
            }catch(e) {}

            for(var key in db.config){
                config[key] = db.config[key];
            }

            if(db.SITE_INFO)
                rule.specialSite = db.SITE_INFO.concat(rule.specialSite);

            if(db.css)
                css = db.css;

            debug("接收到 MyNovelReader.db 数据");

            window.addEventListener("DOMContentLoaded", App.init, false);
        }
    }, false);


    // 为了防止 Error: Scriptish access violation: unsafeWindow cannot call: GM_getValue
    //     详见 http://wiki.greasespot.net/Greasemonkey_access_violation
    unsafeWindow.readx = function(){
        fakeTimeout(function(){
            App.launch();
        });
    };

    function fakeTimeout(callback) {
      // Register event listener
      window.document.body.addEventListener("timeoutEvent", callback, false);
      // Generate and dispatch synthetic event
      var ev = document.createEvent("HTMLEvents");
      ev.initEvent("timeoutEvent", true, false);
      window.document.body.dispatchEvent(ev);
    }


    //------------------- 辅助函数 ----------------------------------------

    var debug = (function(){
        if(!App.Config.debug) return function() {};

        if(isFirefox){
            return console.log;
        }else{
            return function(){  // chrome 下的写法没法知道输出的是第几行
                    console.log.apply(console, arguments);
                };
        }
    })();

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

    // jQuery text 完全匹配. e.g. a:econtains('最新章节')
    $.expr[":"].econtains = function(obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
    };

    function getFullHref(href) {
        if (typeof href == 'undefined') return '';
        if (typeof href != 'string') href = href.getAttribute('href');

        if(!href) return '';

        var a = getFullHref.a;
        if (!a) {
            getFullHref.a = a = document.createElement('a');
        }
        a.href = href;
        return a.href;
    }

    function parseHTML(responseText) {
        var doc = new DOMParser().parseFromString(responseText, "text/html");
        if (!doc) {
            doc = document.implementation.createHTMLDocument("");
            doc.querySelector("html").innerHTML = responseText;
        }
        return doc;
    }

})('\
    body {\
        background: #F3F2EE;\
        color: #1F0909;\
        padding: 0px;\
        margin: 0px;\
    }\
    a {\
        color: #065488;\
    }\
    #content {\
        width: {content_width};\
        font-size: {font_size};\
        margin-left:auto;\
        margin-right:auto;\
        padding-bottom: 15px;\
    }\
    article {\
        line-height: 2.25em;\
        margin-top: 55px;\
    }\
    article h1 {\
        line-height: 50px;\
        font-size: {title_font_size};\
        font-weight: normal;\
        margin: 25px -20px;\
        padding: 0 20px 10px;\
        border-bottom: 1px solid rgba(0,0,0,.25);\
        font-weight: normal;\
        text-transform: none;\
    }\
    .chapter-footer-nav {\
        text-align:center;\
        font-size:0.9em;\
        margin:-10px 0px 30px 0px;\
    }\
    #loading {\
        color: white;\
        text-align: center;\
        font: 12px "微软雅黑", "宋体", "Times New Roman", "Verdana";\
        margin-top: 20px;\
        margin-left: auto;\
        margin-right: auto;\
        width: 376px;\
        height: 32px;\
        line-height: 32px;\
        border-radius: 20px;\
        border: 1px solid #666;\
        background-color: #333;\
    }\
    #loading img {\
        vertical-align: middle;\
    }\
    #preferencesBtn{\
        position: fixed;\
        top: 10px;\
        right: 10px;\
        z-index: 1597;\
    }\
    #alert {\
        position: fixed;\
        z-index: 100;\
        float: auto;\
        width: auto;\
        height: auto;\
        top: 10px;\
        left: 500px;\
        background: rgba(215, 240, 253, 0.65);\
        color: #2d7091;\
        border: 1px solid rgba(45,112,145,0.3);\
        border-radius: 4px;\
        text-shadow: 0 1px 0 #fff;\
    }\
    #alert p {\
        font-size: 13px;\
        margin: 6px;\
    }\
');