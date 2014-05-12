// ==UserScript==
// @id             mynovelreader@ywzhaiqi@gmail.com
// @name           My Novel Reader For Opera Mobile
// @version        2014.5.12
// @namespace
// @author         ywzhaiqi@gmail.com
// @description    小说阅读脚本，实现清爽阅读。2种模式：自定义站点配置和自动站点配置。

// @include        http://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
// @include        http://chuangshi.qq.com/read/bookreader/*.html
// @include        http://book.zongheng.com/chapter/*/*.html
// @include        http://m.zongheng.com/chapter?bookid=*&cid=*
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
// @include        http://www.zhuzhudao.com/txt/*/*/
// @include        http://www.tadu.com/book/*/*/
// @include        http://www.aishoucang.com/*/*.html
// @include        http://www.wanshuba.com/Html/*/*/*.html
// @include        http://www.zhuishu.net/files/article/html/*/*/*.html
// @include        http://www.sqsxs.com/*/*/*.html
// @include        http://www.caiwei.tw/html/*/*.html
// @include        http://www.hotsk.com/Html/Book/*/*/*.shtml
// @include        http://www.dyzww.com/cn/*/*/*.html
// @include        http://www.dawenxue.net/html/*/*/*.html
// @include        http://www.qishuwu.com/*/*/
// @include        http://www.wandoou.com/book/*/*.html
// @include        http://www.6yzw.org/*/*.html
// @include        http://www.daomengren.com/*/*.html
// @include        http://muyuge.com/*/*.html
// @include        http://www.23zw.com/olread/*/*/*.html

// @exclude        */List.html
// @exclude        */List.shtml
// @exclude        */index.html
// @exclude        */index.shtml
// ==/UserScript==


/**
支持站点

 - 起点中文网、晋江文学网、纵横中文网、潇湘书院、逐浪
 - 燃文、无错、书迷楼、冰火中文、百晓生、浩奇、书河
 - 手打吧、泡书吧、17k、看下、青帝、侠客、
 - 其它通用小说网站。（没有站点配置的，例如：红袖添香）
*/


(function(CSS){

    if(window.name == "mynovelreader-iframe"){
        return;
    }

	var config = {
        DEBUG: true,
		AUTO_ENABLE: true,       // 自动启用总开关。有问题，一些主页也会自动启用
        booklinkme: true,        // booklink.me 跳转的自动启动
        soduso: false,            // www.sodu.so 跳转
        BASE_REMAIN_HEIGHT: 1000,
        fullHref: true,
        content_replacements: true,      // 小说屏蔽字修复
        fixImageFloats: true,

        disableScript: true,  // Opera 独有
        disableCSS: true,     // Opera 独有
	};

	var rule = {
    	nextLink: '//a[descendant-or-self::*[contains(text(),"下一页")]][@href] | //a[descendant-or-self::*[contains(text(),"下一章")]][@href] | //a[descendant-or-self::*[contains(text(),"下页")]][@href]',
		prevLink: '//a[contains(text(),"上一页")][@href] | //a[contains(text(),"上一章")][@href] | //a[contains(text(),"上页")][@href]',
		nextUrlIgnore: /index|list|last|end|BuyChapterUnLogin|^javascript:|book\.zongheng\.com\/readmore|\/0\.html$/i,  // 忽略的下一页链接，匹配链接

		// 按顺序匹配，匹配到则停止。
		indexLink: ['//a[contains(text(),"返回书目")][@href]', '//a[contains(text(),"章节目录")][@href]',
			'//a[contains(text(),"章节列表")][@href]', '//a[contains(text(),"回目录")][@href]',
            '//a[text()="书目"][@href]', '//a[contains(text(),"目录")][@href]'],

		 // 同上。
		contentSelector: ["#bmsy_content", "#bookpartinfo", "#htmlContent", "#chapter_content", "#chapterContent", "#partbody",
            "#article_content", ".novel_content", ".noveltext", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td",
            "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#content", ".content"],

		contentRemove: "script, iframe, a, font[color]",
		contentReplace: /最新章节|百度搜索|小说章节|全文字手打|“”&nbsp;看|无.弹.窗.小.说.网|追书网/g,

		replaceBrs: /(<br[^>]*>[ \n\r\t]*){2,}/gi   // 替换为<p>
	};

    // ===================== 自定义站点规则 ======================
    rule.specialSite = [
        {siteName: "手机纵横中文网",
            url: "^http://m\\.zongheng\\.com/",
            contentHandle: false,
            contentSelector: '.yd',
            contentRemove: 'h3',
        },

        // 特殊站点，需再次获取且跨域。添加 class="reader-ajax"，同时需要 src, charset
        {siteName: "起点文学",
            url: "^http://(www|read|readbook)\\.(qidian|qdmm|qdwenxue)\\.com/BookReader/.*",
            // titleReg: "小说:(.*?)(?:独家首发)/(.*?)/.*",
            titleSelector: "#lbChapterName",
            bookTitleSelector: ".page_site > a:last",
            contentReplace: {
                "\\[img=(.*)\\]": "<p><img src='$1'></p><p>",
                "\\[+CP.*(http://file.*\\.jpg)\\]+": "<p><img src='$1'></p><p>",
                "\\[bookid=(\\d+)，bookname=(.*?)\\]": "<a href='http://www.qidian.com/Book/$1.aspx'>$2</a>",
                "www.cmfu.com发布|起点中文网www.qidian.com欢迎广大书友光临阅读.*": "",
                '(<p>\\s+)?<a href="?http://www.(?:qidian|cmfu).com"?>起点中文网.*': ''
            },
            // contentHandle: false,
            contentPatch: function(fakeStub){
                fakeStub.find('div#content script:first').addClass('reader-ajax');
            },
        },
        {siteName: "78小说网",
            url: "^http://www\\.78xs\\.com/article/\\d+/\\d+/\\d+.shtml$",
            contentHandle: false,
            titleReg: "(.*?) (?:正文 )?(.*) 78小说网",
         
            indexSelector: "a:contains('目 录')",
            prevSelector: "a:contains('上一章')",
            nextSelector: "a:contains('下一章')",
         
            // 获取内容
            contentSelector: "#content",
            useiframe: true,

            contentReplace: [
                "//.*?78xs.*?//", 
                "\\(全文字小说更新最快\\)",
            ],
            contentPatch: function(fakeStub){
                fakeStub.find('p.title').empty();                      // 去掉内容中带的章节标题
            }
        },
        {siteName: "纵横中文网",
            url: "^http://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$",
            contentHandle: false,
            // titleReg: "(.*?)-(.*)",
            titleSelector: "em[itemprop='headline']",
            bookTitleSelector: ".nav>a:last",
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
            mutationChildCount: 1,
            contentPatch: function(fakeStub){
                fakeStub.find('.bookreadercontent  > p:last').remove();
            }
        },
        {siteName: "晋江文学网",
            url: /^http:\/\/www\.jjwxc\.net\/onebook\.php\S*/,
            titleReg: /《(.*?)》.*ˇ(.*?)ˇ.*/,
            indexSelector: ".noveltitle > h1 > a",
            contentHandle: false,
            contentPatch: function(fakeStub){
                fakeStub.find('h2').remove();
                fakeStub.find('#six_list, #sendKingTickets').parent().remove();
                fakeStub.find("div.noveltext").find("div:first, h1, div[style]:last").remove();
            }
        },
        {siteName: "潇湘书院",
            url: "^http://www\\.xxsy\\.net/books/.*\\.html",
            titleReg: "(.*?) (.*)",
            contentSelector: "#zjcontentdiv",
            nextSelector: "a[title='阅读下一章节']",
            contentHandle: false,
            contentReplace: "本书由潇湘书院首发，请勿转载！",
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
        {siteName: "小说阅读网",
            url: "http://www\\.readnovel\\.com/novel/.*\\.html",
            titleReg: "(.*)_(.*)免费阅读_小说阅读网",
            contentSelector: "#article",
            contentRemove: "div[style]"
        },
        // {siteName: "天涯在线书库（部分支持）",
        //     url: /www\.tianyabook\.com\/.*\.htm/,
        //     titleSelector: ".max, h1:first",
        //     bookTitleSelector: "td[width='70%'] > a[href$='index.htm']",
        //     contentSelector: "div > span.middle, #texts",
        //     contentHandle: false,
        // },

        // {siteName: "易读",
        //     url: "http://www.yi-see.com/read_\\d+_\\d+.html",
        //     contentSelector: 'table[width="900px"][align="CENTER"]'
        // },
        {siteName: "燃文",
            url: /^http:\/\/www\.ranwen\.cc\/.*\.html$/,
            titleReg: /(.*?)-(.*?)-燃文/,
            contentSelector: "#oldtext",
            contentRemove: "div[style], script",
            contentReplace: [
                /最快更新78小说|\(?百度搜.\)|访问下载tXt小说|百度搜\|索|文\|学|文学全文.字手打|\((&nbsp;)+|牛过中文..hjsm..首发.转载请保留|\[本文来自\]|♠思♥路♣客レ|※五月中文网 5y ※|无错不跳字|最快阅读小说大主宰.*|跟我读Ｈ－u－n 请牢记|非常文学|关闭&lt;广告&gt;|w w.*|”娱乐秀”|更多精彩小[说說].*|高速更新/g,
                /[\(\*◎]*(百度搜)?文.?[學学].?[馆館][\)\*）]*|\(百度搜\)/g,
                /提供无弹窗全文字在线阅读.*|高速首发.*如果你觉的本章节还不错的话.*/g,
                /书网∷更新快∷无弹窗∷纯文字∷.t！。/g,
                /一秒记住，本站为您提供热门小说免费阅读。/g,
                /\(更新速度最快记住即可找到\)|芒果直播网|.mgzhibo .|去 读 读|看小说就到/g,
            ]
        },
        {siteName: "燃文小说网",
            url: "http://www\\.ranwenxiaoshuo\\.com/files/article/html/\\d+/\\d+/\\d+\\.html|http://www\\.ranwenxiaoshuo\\.com/\\w+/\\w+-\\d+-\\d+\\.html",
            titleReg: /(.*?)最新章节(.*?)在线阅读.*/,
            contentSelector: "#fontsize",
            contentReplace: "天才一秒记住[\\s\\S]+为您提供精彩小说阅读。",
        },
        {siteName: "燃文小说",
            url: "http://www\\.ranwen\\.net/files/article/\\d+/\\d+/\\d+\\.html",
            titleReg: "(\\S+) (.*) - 燃文小说",
            contentReplace: "\\(.*燃文小说.*\\)|【 注册会员可获私人书架，看书更方便！永久地址： 】 "
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
                "无错不跳字|无广告看着就是爽!|一秒记住.*|全文免费阅读.*|8 9 阅阅 读 网|看小说最快更新|“小#说看本书无广告更新最快”": "", 
                "【 .{1,10} 】":""
            },
            contentPatch: function(fakeStub){
                // 去除内容开头、结尾的重复标题
                var title = fakeStub.find("#htmltimu").text().replace(/\s+/, "\\s*");
                var content = fakeStub.find("#htmlContent");
                content.find("div[align='center']").remove();
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
            contentReplace: ['div lign="ener"&gt;|.*更多章节请到网址隆重推荐去除广告全文字小说阅读器',
                '起点中文网www.qidian.com欢迎广大书.*',
                '书迷楼最快更新.*'],
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
                "&lt;冰火#中文.*|冰火中文&nbsp;(www.)?binhuo.com|冰.火.中文|绿色小说|lvsexs|冰火中文.": "",
                "([^/])www\\.binhuo\\.com": "$1"
            },
            contentPatch: function(fakeStub){
                fakeStub.find("#BookText").append(fakeStub.find("img.imagecontent"));
            }
        },
        {siteName: "百晓生",
            url: /^http:\/\/www\.bxs\.cc\/\d+\/\d+\.html$/,
            titleReg: /(.*?)\d*,(.*)/,
            contentReplace: [
                /一秒记住【】www.zaidu.cc，本站为您提供热门小说免费阅读。/ig,
                /（文&nbsp;學馆w&nbsp;ww.w&nbsp;xguan.c&nbsp;om）/ig,
                /\[<a.*?首发\[百晓生\] \S+/ig,
                /\/\/(?:&nbsp;|访问下载txt小说|高速更新)+\/\//ig,
                /(www\.)?bxs\.cc/ig,
                /（未完待续&nbsp;http:\/\/www.Bxs.cc&nbsp;89免费小说阅《百晓生文学网》）/g,
                /〖百晓生∷.*〗|《?百晓生文学网》?|最快阅读小说大主宰，尽在百晓生文学网.*|ww.x.om|欢迎大家来到.*?bxs\.cc|百晓生阅读最新最全的小说.*|百晓生网不少字|站长推荐.*|文字首发|百晓生.不跳字|百.晓.生.|关闭.*广告.*|飘天文学|本站域名就是.*|\(.{0,5}小说更快更好.{0,5}\)|(请在)?百度搜索.*|一秒记住.*为您提供精彩小说阅读.|百晓生|全文阅读|¤本站网址：¤|\/\/&nbsp;访问下载txt小说\/\/◎◎|纯站点\\".*值得收藏的/ig,
                /文[学學][馆館]|www\.biquge\.cc|(http:\/\/)?www\.Bxs\.cc|(请牢记)?soudu．org/ig,
                /请搜索，小说更好更新更快!|最快文字更新无弹窗无广|\(即可找到本站\)|无广告看着就是爽!|更多全本txt小说请到下载|∷更新快∷∷纯文字∷/ig,
            ],
        },
        {siteName: "浩奇文学网",
            url: /^http:\/\/www\.haoqi99\.com\/.*\.shtml$/,
            titleReg: /^(.*?)--(.*?)-/,
        },
        {siteName: "书河小说网",
            url: /^http:\/\/www\.shuhe\.cc\/\d+\/\d+/,
            titleReg: "([^\\d]+)\\d*,(.*?)_",
            contentSelector: "#TXT",
            contentReplace: /一秒记住.*为您提供精彩小说阅读.|\{请在百度搜索.*首发阅读\}|（书河小说网.*?无弹窗）|wxs.o|ww.x.om|[\[【\(].{1,30}[\]\)】]|ff37;.*|书河小说网高速首发.*|TXT下载|全文阅读|第一书河小说网|百书斋.*|首发来自书河小说网|本书最新章节|书河小说网/ig,
        },
        {siteName: "爱收藏",
            url: /http:\/\/www\.aishoucang\.com\/\w+\/\d+\.html/,
            titleReg: "(.*?)-(.*?)-爱收藏",
            contentSelector: "#zhutone",
            contentReplace: {
                "<a[^>]*>(.*?)</a>": "$1",
                ".爱收藏[^<]*": ""
            }
        },
        {siteName: "木鱼哥",
            url: /http:\/\/muyuge\.com\/\w+\/\d+\.html/,
            titleReg: "(.*?) (.*)_木鱼哥",
            indexSelector: ".readerFooterPage a[title='(快捷:回车键)']",
            // useiframe: true,
            // mutationSelector: "#content",
            // mutationChildCount: 1,
            contentRemove: ".vote",
            contentReplace: {
                "<a[^>]*>(.*?)</a>": "$1",
                "看更新最快的小说就搜索—— 木鱼哥——无弹窗，全文字": "",
                "<p>.*?无弹窗</p>":"",
                "bb\\.king|【木&nbsp;鱼&nbsp;哥&nbsp;.*?】|【一秒钟记住本站：muyuge.com&nbsp;木鱼哥】":"",
                "——推荐阅读——[\\s\\S]+": "",
            },
        },
        {siteName: "追书网",
            url: "^http://www\\.zhuishu\\.net/files/article/html/.*\\.html",
            titleReg: /(?:正文 )?(.*) (\S+) \S+ - .*/,
            titlePos: 1,
            indexSelector: ".pagebottom>a:contains('目录')",
            nextSelector: ".pagebottom>a:contains('下一页')",
            prevSelector: ".pagebottom>a:contains('上一页')",
            fixImage: true,
            contentSelector: "#content",
            contentReplace: {
                "([^/])www\\.ZhuisHu\\.net": "$1",
            },
            contentPatch: function(fakeStub){
                fakeStub.find("#content > .title, #content > .pagebottom").appendTo(fakeStub.find("body"));

                fakeStub.find("#content").find("center, b:contains('最快更新')").remove();
            }
        },
        {siteName: "猪猪岛小说",
            url: "http://www\\.zhuzhudao\\.(?:com|cc)/txt/",
            titleReg: "(.*?)最新章节-(.*?)-",
            contentReplace: /[“"”]?猪猪岛小说.*|<\/?a[^>]+>|w+\.zhuZhuDao\.com|看更新最快的.*/ig
        },
        {siteName: "逸名文学屋",
            url: "http://(bbs\\.vyming|www\\.9imw)\\.com/novel-read-\\d+-\\d+\\.html",
            contentSelector: "#showcontent",
            bookTitleSelector: ".headinfo a:first",
            contentRemove: "p:contains(精品推荐：), p:contains(，免费小说阅读基地！), a",
            contentReplace: [
                "〖∷更新快∷无弹窗∷纯文字∷ .〗"
            ]
        },
        {siteName: "读零零",
            url: "http://www\\.du00\\.com/read/\\d+/\\d+/[\\d_]+\\.html",
            titleReg: "(.*?)(?:第\\d+段)?,(.*) - 读零零小说网",
            titlePos: 1,
            prevSelector: "#footlink a:first",
            indexSelector: "#footlink a:contains('目录')",
            nextSelector: "#footlink a:last",
            // 内容
            contentSelector: "#pagecontent, .divimage",
            useiframe: true,
            mutationSelector: "#pagecontent",
            mutationChildCount: 2,
            contentRemove: "font",
            contentReplace: [
                "读零零小说网欢迎您的光临.*?txt格式下载服务",
                "，好看的小说:|本书最新免费章节请访问。",
                "\\*文學馆\\*",
                "\\(未完待续请搜索，小说更好更新更快!"
            ],
            checkSection: true
        },
        {siteName: "奇书屋",
            url: "http://www.qishuwu.com/\\w+/\\d+/",
            titleReg: "(.*)_(.*)_.*_奇书屋",
        },
        {siteName: "17k小说网",
            url: /^http:\/\/\S+\.17k\.com\/chapter\/\S+\/\d+\.html$/,
            titleReg: /(.*?)-(.*?)-.*/,
            contentSelector: "#chapterContent",
            contentRemove: "#authorSpenk, .like_box, #hotRecommend, .ct0416, .recent_read, div[style]"
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
            url: /^http:\/\/www\.123du\.(?:net|cc)\//,
            titleReg: "(.*)-(.*) 百家乐",
            titlePos: 1,
            contentSelector: "#content, #contents",
            contentReplace: "一秒记住.www.*|小说最新更新，来123读书www.123du.net",
            contentRemove: "a",
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
            bookTitleSelector: '.title em:first',
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
            url: "^http://www\\.16kbook\\.org/Html/Book/\\d+/\\d+/\\d+\\.shtml$",
            titleReg: '(\\S+) (.*)- 16K小说网',
            useiframe: true,
            contentRemove: '.bdlikebutton',
            contentReplace: {
                '(<center>)?<?img src..(http://www.16kbook.org)?(/tu/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': "$3",
                "/tu/shijie.jpg":"世界", "/tu/xiangdao.jpg":"想到", "/tu/danshi.jpg":"但是", "/tu/huilai.jpg":"回来", "/tu/yijing.jpg":"已经", "/tu/zhende.jpg":"真的", "/tu/liliang.jpg":"力量", "/tu/le.jpg":"了", "/tu/da.jpg":"大", "/tu/shengli.jpg":"胜利", "/tu/xiwang.jpg":"希望", "/tu/wandan.jpg":"完蛋", "/tu/de.jpg":"的",
                "16kbook\\s*(首发更新|小说网)": "",
            }
        },
        {siteName: "来书屋",
            url: "http://www.laishuwu.com/html/\\d+/\\d+/\\d+.html",
            titleSelector: ".chaptertitle h2",
            bookTitleSelector: ".chaptertitle h1",
            contentReplace: "txt\\d+/",
        },
        {siteName: "万书吧",
            url: "http://www\\.wanshuba\\.com/Html/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*?)/(.*?)-万书吧",
            indexSelector: "#mulu",
            prevSelector: "#previewpage",
            nextSelector: "#papgbutton a:contains('手机下一章'), #nextpage",
            contentReplace: [
                "\\[www.*?\\]",
                "提供无弹窗全文字在线阅读，更新速度更快文章质量更好，如果您觉得不错就多多分享本站!谢谢各位读者的支持!",
                "高速首发.*?，本章节是.*?地址为如果你觉的本章节还不错的话请不要忘记向您qq群和微博里的朋友推荐哦！"
            ]
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
            titleReg: "(.*?) 正文 (.*?)- 热点书库 -",
            contentReplace: "\\(热点书库首发:www.hotsk.com\\)|www.zhuZhuDao.com .猪猪岛小说.|小说章节更新最快"
        },
        {siteName: "落秋中文",
            url: "^http://www\\.luoqiu\\.(com|net)/html/\\d+/\\d+/\\d+\\.html",
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
            contentReplace: "访问下载txt小说.百度搜.|免费电子书下载|\\(百度搜\\)|『文學吧x吧.』|¤本站网址：¤"
        },
        {siteName: "六月中文网，盗梦人小说网",
            url: "^http://www\\.(?:6yzw\\.org|daomengren\\.com)/.*\\.html",
            bookTitleSelector: ".con_top>a:last",
            contentRemove: "a[href='http://i./'], a[href='http://www.87xsw.com']",
            contentReplace: [
                "{飘天文学[\\s\\S]*您的支持就是我们最大的动力}",
                "(（未完待续），|精彩推荐：，)?最新最快更新热门小说，享受无弹窗阅读就在：",
                "一秒记住【】，本站为您提供热门小说免费阅读。",
                "百度搜索 本书名.*",
                "\\(?&nbsp;&nbsp; ?提供』。如果您喜欢这部作品，欢迎您来创世中文网[\\s\\S]+",
                "[\\(（]未完待续.{1,2}本文字由.*",
                "//添加开头|会员特权抢先体验",
                "更新最快|更新快纯文字|看最新章节|六月中文网|78小说|h﹒c﹒d|穿越小说吧 sj131|\\*五月中文网5.c om\\*",
                "\\d楼[\\d\\-: ]+(?:&nbsp;)+ \\|(?:&nbsp;)+|吧主\\d+(?:&nbsp;)+|支持威武，嘎嘎！",
                "www，|&nbsp;\\\\|“梦”(&nbsp;| )*“小”(&nbsp;| )*(“说” )?“网”|“岛”(&nbsp;| )+“说”",
                /(百度搜索 )?本书名 \+ 盗梦人 看最快更新/ig,
            ]
        },
        {siteName: "飞卢小说网",
            url: "^http://b\\.faloo\\.com/p/\\d+/\\d+\\.html",
            titleSelector: "#title h1",
            nextSelector: "a#next_page",
            prevSelector: "a#pre_page",
            indexSelector: "a#huimulu",
            contentSelector: "#main > .main0",
            contentRemove: "> *:not(#con_imginfo, #content)",
            contentReplace: "飞卢小说网 b.faloo.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在飞卢小说网！",
            contentPatch: function(fakeStub){
                fakeStub.find("#content").find(".p_gonggao").remove()
                // fakeStub.find("#con_imginfo").prependTo("#content");
            }
        },
        {siteName: "顶点小说",
            url: "^http://www\\.(?:23us|xs222)\\.com/html/\\d+/\\d+/\\d+\\.html$",
            titleReg: "(.*?)-\\S*\\s(.*?)-顶点小说",
            titlePos: 0,
            indexSelector: "#footlink a:contains('返回目录')",
            prevSelector: "#footlink a:contains('上一页')",
            nextSelector: "#footlink a:contains('下一页')",
            contentSelector: "#contents",
            contentReplace: "\\(看小说到顶点小说网.*\\)|\\(\\)|【记住本站只需一秒钟.*】",
            contentPatch: function(fakeStub){
                var temp=fakeStub.find('title').text();
                var realtitle = temp.replace(/第.*卷\s/,'');
                fakeStub.find('title').html(realtitle);
            }
        },
        {siteName: '笔下阁',
            url: "^http://www\\.bixiage\\.com/\\w+/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*)最新章节免费在线阅读_(.*)_笔下阁",
            indexSelector: ".read_tools a:contains('返回目录')",
            prevSelector: ".read_tools a:contains('上一页')",
            nextSelector: ".read_tools a:contains('下一页')",
            contentReplace: [
                "本书最新免费章节请访问|请记住本站的网址|请使用访问本站",
                "看更新最快的.*www.bixiage.com",
                "笔下阁为您提供全文字小说.*",
                "如果你觉得笔下阁不错.*",
                "本篇是小说.*章节内容，如果你发现内容错误.*"
            ]
        },
        {siteName: '双德小说网',
            url: "^http://www\\.shuangde\\.cc/.*\\.html",
            bookTitleSelector: '.title > h2 > a',
            contentRemove: '.title, div[align="center"]',
        },
        {siteName: '爱尚小说网',
            url: 'http://www.a240.com/read/\\d+/\\d+.html',
            titleReg: '(.*) - (.*?) - 爱尚小说网',
            titlePos: 1,
            contentRemove: '.bottem, center',
            contentReplace: '<!--章节内容开始-->'
        },
        {siteName: 'Ｅ度文学网',
            url: 'http://www.173ed.com/read/\\d+/\\d+.html',
            contentRemove: 'a[href*="173e"]',
            contentReplace: [
                '全文字小说W.*?\\.com',
                'E度文学网更新最快',
                'www\\.♀173ed.com♀'
            ]
        },
        
        // 内容需要js运行。
        {siteName: "读读看",
            url: "^http://www\\.dudukan\\.net/html/.*\\.html$",
            contentReplace: "看小说“就爱读书”|binhuo|www\\.92to\\.com",
            useiframe: true,
            mutationSelector: "#main",
            mutationChildCount: 0,
        },
        {siteName: "151看书网",
            url: "^http://www\\.151kan\\.com/kan/.*\\.html",
            contentSelector: "#msg",
            useiframe: true,
            mutationSelector: "#msg",
            contentReplace: [
                /[\/|]?www\.151(?:看|kan)\.com[\/|]?/ig,
                /151看书网(?:纯文字)?/ig,
            ]
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
        {siteName: "ABC小说网",
            url: "^http://www\\.bookabc\\.net/.*\\.html",
            useiframe: true
        },
        // 内容js，地址特殊生成。
        {siteName: "哈哈文学",
            url: /^http:\/\/www\.hahawx\.com\/.*htm/,
            titleReg: /(.*?)-(.*?)-.*/,
            contentSelector: "#chapter_content",
            contentReplace: /(?:好书推荐|书友在看|其他书友正在看|好看的小说|推荐阅读)：。|(?:www|ｗｗｗ|ｂｏｏｋ).*(?:com|net|org|ｃｏｍ|ｎｅｔ)|全文字阅读|无弹窗广告小说网|哈哈文学\(www.hahawx.com\)|souDU.org|Ｓｏｕｄｕ．ｏｒｇ|jīng彩推荐：/ig,
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
        {siteName: "3Z中文网",
            url: "^http://www\\.zzzcn\\.com\\/(3z\\d+/\\d+\\/|modules\\/article\\/App\\.php\\?aid=\\d+&cid=\\d+){1}$",
            // titleReg: "(.*?)-(.*)TXT下载",
            contentSelector: "#content3zcn",
            indexSelector: "a:contains('返回目录')",
            prevSelector: "a:contains('上 一 页')",
            nextSelector: "a:contains('下 一 页'), a:contains('返回书架')",
            contentReplace: [
                /[{(][a-z\/.]+(?:首发文字|更新超快)[})]/ig,
                "手机小说站点（wap.zzzcn.com）",
                "一秒记住.*为您提供精彩小说阅读。", 
            ],
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
                    "class": 'reader-ajax',
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
        },
        {siteName: "飘天文学",
            url: "http://www\\.piaotian\\.net/html/\\d+/\\d+/\\d+\\.html",
            // titleReg: "(.*)最新章节,(.*),飘天文学",
            bookTitleSelector: '#content > h1 > a',
            contentSelector: "#content",
            useiframe: true,  // 否则 content 在 body 下面
            contentRemove: "h1, table",
            contentReplace: [
                /[{〖]请在百度搜索.*[}〗]|.(?:百度搜索飄天|无弹窗小说网).*\.Net.|\[飄天.*无弹窗小说网\]/ig,
                '\\{飘天文学www.piaotian.net感谢各位书友的支持，您的支持就是我们最大的动力\\}'
            ],
        },

        {siteName: "天使小说网",
            url: "http://www\\.tsxs\\.cc/files/article/html/\\d+/\\d+/\\d+\\.html",
            contentSelector: "#content"
        },
        {siteName: "紫雨阁小说网",
            url: "http://www\\.ziyuge\\.com/\\w+/\\w+/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*?)-正文-(.*?)-紫雨阁小说网",
            contentSelector: ".reader_content",
            nextSelector: "#divNext a",
            prevSelector: "#divPrev a",
            contentReplace: "\\(.*www.ziyuge.com.*\\)"
        },
        {siteName: "破风中文网",
            url: "http://www\\.pofeng\\.net/xiaoshuo/\\d+/\\d+\\.html",
            useiframe: true
        },
        {siteName: "读客吧",
            url: "http://dukeba\\.com/book/\\d+/\\d+/\\d+\\.shtml",
            useiframe: true,
            contentSelector: "#content > div[style]",
            contentRemove: "a, div[align]:has(font)",
        },
        {siteName: "一起阅",
            url: "http://www\\.17yue\\.com/\\w+/\\d+/\\d+\\.html",
            useiframe: true,
        },
        {siteName: "诺秋网",
            url: "http://www\\.nuoqiu\\.com/static/\\d+/\\d+\\.html",
            titleReg: "(.*) (.*) 诺秋网",
            titlePos: 1,
            useiframe: true, 
            contentReplace: "┏━━━━━━━━━━━━━━━━━━━━━━━━━┓[\\s\\S]+诺秋网文字更新最快……】@！！"
        },
        {siteName: "言情后花园",
            url: "http://www\\.yqhhy\\.cc/\\d+/\\d+/\\d+\\.html",
            titleReg: "(.*)-(.*)-.*-言情后花园",
            titlePos: 1,
            contentSelector: "#content",
            contentRemove: "a, span[style], script",
            contentReplace: "请记住本站： www.yqhhy.cc|更多，尽在言情后花园。"
        },
        {siteName: "六九中文",
            url: "http://www.69zw.com/\\w+/\\d+/\\d+/\\d+.html",
            titleSelector: ".chapter_title",
            bookTitleSelector: ".readhead h1",
            contentSelector: ".yd_text2",
            // titleReg: "(.*)?_(.*)-六九中文",
            contentReplace: [
                "[\\*]+本章节来源六九中文.*请到六九中文阅读最新章节[\\*]+|－\\\\[wＷ]+.*书友上传/－",
                "\\请到 www，69zw，com 六*九*中*文*阅读/"
            ]
        },
        {siteName: "免费小说阅读网",
            titleReg: "(.*) , (.*) , 免费小说阅读网",
            titlePos: 1,
            url: "^http://book\\.yayacms\\.com/\\w+/book_\\d+_\\d+.html",
            contentRemove: "a, div[style]",
            contentReplace: "http://book.YaYaCMS.com/.*|ｂｏｏｋ．ｙａｙａｃｍｓ．ｃｏｍ",
        },
        {siteName: "书农在线书库",
            url: "http://www\\.shunong\\.com/yuedu/\\d+/\\d+/\\d+.html",
            contentSelector: ".bookcontent",
        },
        {siteName: "努努书坊",
            url: "http://book\\.kanunu\\.org/.*/\\d+/\\d+\\.html",
            contentSelector: "table:eq(4) p",
        },
        {siteName: "五月中文网",
            url: "^http://5ycn\\.com/\\d+/\\d+/\\d+\\.html",
            contentRemove: "div[align='center'], a",
        },
        {siteName: "笔下中文",
            url: "^http://www\\.bxzw\\.org/\\w+/\\d+/\\d+/\\d+\\.shtml",
            contentRemove: "div[align='center'], center, #footlink1",
            contentReplace: "www\\.bxzw\\.org|//无弹窗更新快//|\\(看精品小说请上.*\\)|\\(看.*最新更新章节.*\\)"
        },
        {siteName: "着笔中文网",
            url: "^http://.*zbzw\\.com/\\w+/\\d+\\.html",
            contentReplace: "精彩小说尽在.*"
        },
        {siteName: "D586小说网",
            url: 'http://www\\.d586\\.com/',
            contentRemove: 'a',
            contentReplace: [
                '【www.13800100.com文字首发D5８6小说网】',
                '【☆D5８6小说网☆//文字首发】.*'
            ]
        },
        {siteName: "豌豆文学网",
            url: "^http://www.wandoou.com/book/\\d+/\\d+\\.html",
            titleReg: "(.*?)最新章节-(.*?)-",
            contentRemove: "center",
            contentReplace: [
                /[{（]<a href.*[}）]|网欢迎广大书友光临阅读，.*/ig,
                /[レ★]+.*(?:请支持)?豌(?:.|&amp;)?豆.?文.?学.*[レ★]+/ig,
                /[（(【]豌.?豆.?文.?学.*[）)】]/ig,
                /∷更新快∷∷纯文字∷|http:永久网址，请牢记！/ig,
                /(?:{|\\|\/|\()*豌.?豆.?文.?学.?网.*?(?:高速更新|\\\/|})+/ig,
                /更新最快最稳定|看小说“”/ig,
                /&lt;strng&gt;.*?&lt;\/strng&gt;/ig,
                /\(凤舞文学网\)|\( *\)|「启航文字」/ig,
                /高速首发.*?本章节是.*/ig,
                /百度搜索自从知道用百度搜索，妈妈再也不用担心我追不到最快更新了/ig,
            ]
        },
        {siteName: "都来读小说网",
            url: /^http:\/\/www\.doulaidu\.com\/[^\/]+\/\d+\/\d+\.html/,
            useiframe: true,
            contentReplace: [
                /www．.+．(?:com|net)/ig,
                /都来读小说网首发|www\.[a-z0-9]+\.(?:org|com)/ig,
            ]
        },
        {siteName: "小说TXT",
            url: /^http:\/\/www\.xshuotxt\.com\//,
            contentReplace: "\\(.*无弹窗全文阅读\\)",
            contentPatch: function(fakeStub) {
                fakeStub.find('#title a').remove();
            }
        },
        {siteName: "疯狂中文网",
            url: "http://www\\.fkzww\\.com/",
            contentRemove: ".bottem, a[href='http://www.fkzww.com']",
            contentReplace: [
                /收藏【.*?疯狂中文网\)/ig,
            ]
        },
        {siteName: "看书啦",
            url: "^http://www.kanshu.la/book/\\w+/\\d+\\.shtml",
            titleReg: "(.*)-(.*)-看书啦",
            titlePos: 1,
            nextUrl: function($doc){
                var html = $doc.find('script:contains(next_page = ")').html();
                var m = html.match(/next_page = "(.*?)";/);
                if (m) return m[1];
            },
            prevUrl: function($doc){
                var html = $doc.find('script:contains(preview_page = ")').html();
                var m = html.match(/preview_page = "(.*?)";/);
                if (m) return m[1];
            }
        },
        {siteName: "",
            url: "http://www\\.5du5\\.com/book/.*\\.html",
            contentReplace: '\\(吾读小说网 <a.*无弹窗全文阅读\\)'
        }
    ];

    // ================== 小说拼音字、屏蔽字修复 ==================
    var replaceRuls = {
        // ===格式整理===
        // "\\(|\\[|\\{|（|【|｛":"（",
        // "\\)|\\]|\\}|）|】|｝":"）",
        ",": "，",
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
        //"。(,|，|。)": "。",
        "？(,|，)": "？",
        //"”(,|，|。)": "”",
        "@{3,}": "",

        // === 一些特殊的替换 ===
        "\\[+CP.*(http://file.*\\.jpg)\\]+": "<img src='$1'>",
        "『(.)』": "$1",  // "『色』": "色",
        
        // === 去广告 ===
        "\\[搜索最新更新尽在[a-z\\.]+\\]": "",
        "<a>手机用户请到m.qidian.com阅读。</a>": "",
        ".{2,4}中文网欢迎广大书友": "",
        "访问下载txt小说":"",
        "fqXSw\\.com":"",
        "\\[\\]":"",
        "全文字无广告|\\(看书窝&nbsp;看书窝&nbsp;无弹窗全文阅读\\)": "",
        "uutxt\\.org": "",
        "3vbook\\.cn": "",
        "txt53712/": "",
        "\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0",

        // === 星号屏蔽字还原 ===
        "十有(\\*{2})":"十有八九", "\\*{2}不离十":"八九不离十",
        "G(\\*{2})":"GSM", "感(\\*{2})彩":"感情色彩",
        "强(\\*{2})u5B9D":"强大法宝",

        // === 多字替换 ===
        "cao之过急":"操之过急",
        "大公无si":"大公无私",
        "fu道人家":"妇道人家",
        "空dangdang":"空荡荡",
        "yin奉阳违":"阴奉阳违", "一yin一阳":"一阴一阳",

        // === 双字替换 ===
        "暧m[eè][iì]":"暧昧",
        "b[ěe]i(\\s|&nbsp;)*j[īi]ng":"北京","半shen": "半身", "b[ìi]j[ìi]ng":"毕竟", "报(了?)jing":"报$1警",
        "ch[oō]ngd[oò]ng":"冲动", "cao(练|作)":"操$1", "缠mian": "缠绵", "成shu": "成熟", "(?:赤|chi)\\s*lu[oǒ]": "赤裸", "春guang": "春光", "chun风":"春风", "沉mi":"沉迷", "沉lun":"沉沦", "刺ji":"刺激", "chao红":"潮红", "初chun":"初春", "＂ｃｈｉ　ｌｕｏ＂":"赤裸",
        "dang校": "党校", "da子": "鞑子", "大tui":"大腿", "diao丝": "屌丝", "d[úu](?:\\s|&nbsp;|<br/>)*l[ìi]": "独立", "d[uú]\\s{0,2}c[áa]i":"独裁", "d?[iì]f[āa]ng":"地方", "d[ìi]\\s*d[ūu]":"帝都", "di国":"帝国", "duo落":"堕落",
        "f[ǎa]ngf[óo]":"仿佛", "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "f[èe]nn[ùu]":"愤怒",
        "gao潮": "高潮", "干chai": "干柴", "gu[oò]ch[ée]ng":"过程", "gu[āa]nx[iì]":"关系", "g[ǎa]nji[àa]o":"感觉", "国wu院":"国务院",
        "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "h[ǎa]oxi[àa]ng":"好像", "hu[áa]ngs[èe]":"黄色", "皇d[ìi]":"皇帝", "昏昏yu睡":"昏昏欲睡", "回dang":"回荡",
        "jian(臣|细)":"奸$1", "jian货":"贱货", "jing察":"警察", "j[ìi]nháng":"进行", "ji烈":"激烈", "j[iì](nv|女)": "妓女", "jirou": "鸡肉", "ji者":"记者", "ju花":"菊花","j[īi]动":"激动", "jili[èe]":"激烈", "肌r[òo]u":"肌肉","ji射":"激射", "ji[ēe]ch[uù]":"接触", "j[ùu]li[èe]": "剧烈", "jǐng惕": "警惕", "节cao":"节操", "浸yin":"浸淫",
        "k[ěe]n[ée]ng": "可能", "开bao": "开苞",  "k[àa]o近": "靠近", "口wen":"口吻",
        "ling辱": "凌辱", "luan蛋": "卵蛋", "脸sè": "脸色", "lu出":"露出",
        "m[ǎa]ny[ìi]":"满意", "m[ǎa]sh[àa]ng":"马上", "m[ée]iy[oǒ]u":"没有", "mei国": "美国", "m[íi]ngb[áa]i":"明白", "迷huan": "迷幻", "mi茫":"迷茫", "m[íi]n\\s{0,2}zh[ǔu]": "民主", "迷jian": "迷奸", "mimi糊糊":"迷迷糊糊", "末(?:\\s|<br/?>)*ì":"末日", "面se":"面色", "mengmeng":"蒙蒙", 
        "nàme":"那么", "n[ée]ngg[oò]u":"能够", "nán\\s{0,2}hǎi": "那会", "内jian":"内奸",
        "pi[áa]o客":"嫖客", "p[áa]ngbi[āa]n":"旁边",
        "q[íi]gu[àa]i":"奇怪", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚", "球mi":"球迷", "青chun":"青春", "青lou":"青楼",
        "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易", "ru白色": "乳白色", "rén员":"人员", "rén形":"人形", "人chao":"人潮", 
        "she(门|术|手|程|击)":"射$1", "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u": "时候", "sh[ií]me":"什么", "si人":"私人", "shi女":"侍女", "shi身": "失身", "sh[ūu]j[ìi]":"书记", "shu女": "熟女", "(?:上|shang)chuang": "上床", "呻y[íi]n": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷", "双xiu": "双修", "生r[ìi]": "生日", "si盐":"私盐", "shi卫":"侍卫", "si下":"私下", "sao扰":"骚扰", "ｓｈｕａｎｇ　ｆｅｎｇ":"双峰", 
        "t[uū]r[áa]n":"突然", "tiaojiao": "调教", "推dao": "推倒", "脱guang": "脱光", "t[èe]bi[ée]":"特别", "t[ōo]nggu[òo]":"通过", "tian来tian去":"舔来舔去",
        "w[ēe]ixi[ée]":"威胁", "wèizh[ìi]":"位置", "wei员":"委员",
        "xiu长": "修长", "亵du": "亵渎", "xing福": "幸福", "小bo":"小波", "xiong([^a-z])":"胸$1", "小tui":"小腿",
        "yin(谋|险|沉|沟|癸派|后)":"阴$1", "y[iī]y[àa]ng":"一样", "y[īi]di[ǎa]n":"一点", "y[ǐi]j[īi]ng":"已经", "疑huo":"疑惑", "影mi":"影迷",  "阳w[ěe]i": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "(?:you|诱)(?:惑|huo)": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人","旖ni":"旖旎", "yu念":"欲念", "you敌深入":"诱敌深入", "yin(冷|暗)":"阴$1",
        "z[iì]j[iǐ]": "自己","z[ìi](?:\\s|<br/?>|&nbsp;)*y[oó]u": "自由","zh[iī]d?[àa]u?o":"知道","zha药": "炸药", "zhan有": "占有", "政f[ǔu]": "政府", "zh[èe]ng\\s{0,2}f[uǔ]": "政府", "zong理":"总理", "zh[ōo]ngy[āa]ng": "中央", "中yang":"中央", "zu[oǒ]y[oò]u":"左右", "zh[oō]uw[ée]i":"周围", "中nan海":"中南海", "中j委":"中纪委", "中zu部":"中组部", "政zhi局":"政治局", "(昨|一|时|余)(?:<br/?>|&nbsp;|\\s)*ì":"$1日",

        // === 单字替换 ===
        "b[āà]ng":"棒","bào":"爆","bà":"吧","bī":"逼","bō":"波",
        "cāo": "操", "cǎo": "草", "cào": "操", "chāng": "娼", "chang": "娼", "cháo": "潮", "chā": "插", "chéng": "成", "chōu": "抽", "chuáng": "床", "chún": "唇", "chūn": "春", "cuō": "搓", "cū": "粗",
        "dǎng": "党", "dàng": "荡", "dāo": "刀", "dòng": "洞", "diao": "屌",
        "fǎ": "法", "féi": "肥", "fù": "妇", 
        "guān": "官",
        "hán": "含", "hóu": "喉", "hòu": "厚", "h(u)?ā": "花", "huá": "华", "huò": "惑", "hùn": "混", "hún": "魂",
        "jiǔ": "九", "jīng": "精", "jìn": "禁", "jǐng": "警", "jiāng": "江", "jiān": "奸", "jiāo": "交", "jūn": "军", "jū": "拘", "jú": "局", "jī": "激", "激ān":"奸",
        "kù": "裤", "kàn": "看",
        "[1l]àng": "浪", "liáo": "撩", "liú":"流", "lì":"莉", "liè":"烈", "[1l]uàn":"乱", "lún":"伦", "luǒ":"裸", "lòu":"露", "[l1]ù":"露", "lǜ":"绿",
        "mǎi": "买", "mài": "卖", "máo": "毛", "mā": "妈", "méng": "蒙", "mén": "门", "miè": "灭", "mí": "迷", "mì": "蜜", "mō": "摸",
        "nǎi": "奶", "nèn": "嫩", "niào": "尿", "niē": "捏", "nòng": "弄", "nǚ": "女",
        "pào": "炮", "piàn": "片",
        "qiāng": "枪", "qíng": "情", "qīn": "亲", "qiú": "求", "quán": "全",
        "rén":"人", "rì": "日",  "</p>\\n<p>\\s*ì":"日", "rǔ": "乳",
        "sāo":"骚", "sǎo": "骚", "sè": "色",  "shā": "杀", "shēn":"呻", "shén":"神", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥",
        "tān":"贪", "tiǎn": "舔", "tǐng":"挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "tiáo":"调", "tài":"态",
        "wēn": "温", "wěn": "吻",
        "xiǎo":"小", "xìng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴",  "xuan":"宣",
        "yāng":"央", "yàn":"艳", "yīn":"阴", "yào": "药", "yé": "爷", "yòu": "诱", "zàng": "脏", "yù": "欲", "yín": "淫",
        "zhēn":"针", "zēn":"针", "zhà":"炸", "zhèng":"政", "zǒu": "走", "zuì":"罪", "zuò":"做", "zhōng":"中",

        // === 可能误替换的 ===
        "([^a-z])ri([^a-z])":"$1日$2", "([^a-z])se([^a-z])":"$1色$2", "([^a-z])yu([^a-z])":"$1欲$2", "([^a-z])xing([^a-z])":"$1性$2",
        "([^a-z])jing([^a-z])":"$1精$2", "([^a-z])ting([^a-z])":"$1挺$2",

        // ===误替换还原===
        "碧欲": "碧玉", "美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉",
        "品性": "品行", "德性": "德行",
        "波ok": "book", "波SS": "BOSS",

        // ===其他修正===
        "弥俩": "你俩",
        "妳": "你",
        "圞|垩|卝|龘":""
    };
    var replaceRuls_reg = {};

    // 转换函数
    function contentReplacements(text){
        if(!config.content_replacements) return text;

        var s = new Date().getTime();

        // 转换
        for (var key in replaceRuls) {
            if(!replaceRuls_reg[key]){
                replaceRuls_reg[key] = new RegExp(key, "ig");
            }

            text = text.replace(replaceRuls_reg[key], replaceRuls[key]);
        }

        return text;
    }

	function Parser(site, doc){
		this.site = site || {};
		this.doc = doc || document;

		this.isTheEnd = false;
        this.isSection = false;
	}

	Parser.prototype = {
		getAll: function(){
			this.patch();
			this.getTitles();

			return {
				bookTitle: this.bookTitle,
				chapterTitle: this.chapterTitle,
				docTitle: this.docTitle,
				indexUrl: this.getIndexUrl(),
				prevUrl: this.getPrevUrl(),
				nextUrl: this.getNextUrl(),
				content: this.getContent(),
			}
		},
		patch: function(){
			var contentPatch = this.site.contentPatch;
			if(contentPatch){
			    try{
			         contentPatch(this.doc);
			         debug("  Apply Content Patch Success.");
			    }catch(e){
			         debug("  Error: Content Patch Error!");
			    }
			}
		},
		getTitles: function(){
            var docTitle = this.doc.title;

			if(this.site.titleReg){
				var matches = docTitle.match(this.site.titleReg);
				if(matches && matches.length == 3){
					var titlePos = (this.site.titlePos || 0) + 1,
						chapterPos = (titlePos == 1) ? 2 : 1;
					this.bookTitle = matches[titlePos].trim();
					this.chapterTitle = matches[chapterPos].trim();
				}else if(matches){
					debug("  Title Matches Length: " + matches.length);
				}else{
					debug("  Title RegExp no matches.");
				}
			}

			if(!this.chapterTitle){
				this.chapterTitle = this.autoGetTitleText(this.doc);
			}

			this.docTitle = this.bookTitle
				? this.bookTitle + ' - ' + this.chapterTitle
				: docTitle;
		},
		// 智能获取标题
		autoGetTitleText: function (doc) {
		    debug("AutoGetTitle start");

		    var
		        _main_selector = "#TextTitle, #title, .ChapterName",
		        _second_selector = "h1, h2, h3",
		        _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/,
		        _negative_regepx = /[上下]一章/,
		        _title_remove_regexp = /最新章节/,
		        _document_title = doc.title ? doc.title : doc.getElementsByTagName("title")[0].textContent,
		        _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' '
		    ;

		    var _headings = doc.querySelectorAll(_main_selector);
		    if (_headings.length === 1) {
		        debug("  Main selector:", _headings[0]);
		        return _headings[0].textContent.trim();
		    }

		    var possibleTitles = {};

		    _headings = doc.querySelectorAll(_second_selector);

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
		        debug("  Handle document title");
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

		    curTitle = curTitle.replace(/^章节目录/, "");

		    return curTitle;
		},
		getContent: function(){
			var content = this.getElementTool("contentSelector");

			if(content){
                var removeSelector
                if (this.site.contentRemove) {
                    removeSelector = this.site.contentRemove + ',' + rule.contentRemove
                } else {
                    removeSelector = rule.contentRemove;
                }
				var removes = content.querySelectorAll(removeSelector);
				for (var i = removes.length - 1; i >= 0; i--) {
					removes[i].parentNode.removeChild(removes[i]);
				};
			}

			this.content = this.handleContent(content);
			if(!this.content){
				debug("Cant't find Content.");
			}
			return this.content;
		},
		handleContent: function(content){
			if(!content) return;
			var text = content.innerHTML;

			if(!text) return null;

			// 去除开头的 <br>
			text = text.replace(/<br\/?>/, "");

			/* Turn all double br's into p's */
			text = text.replace(rule.replaceBrs, '</p>\n<p>');

			text = text.replace(rule.contentReplace, '');

			var site = this.site;
			if(site){
			    if(site.contentReplace){
			        var replaceText = function(rep){
			            switch(true) {
			                case _.isRegExp(rep):
			                    text = text.replace(rep, '');
			                    break;
			                case _.isString(rep):
			                    var regexp = new RegExp(rep, 'ig');
			                    text = text.replace(regexp, '');
			                    break
			                case _.isArray(rep):
			                    rep.forEach(function(r){ replaceText(r) });
			                    break;
			                case typeof rep == 'object':
			                    var key;
			                    for(key in rep){
			                        text = text.replace(new RegExp(key, "ig"), rep[key]);
			                    }
			                    break;
			            }
			        };

			        replaceText(site.contentReplace);
			    }

			    // 去除内容中包含的标题
			    var titleRegText = "";
			    if(this.bookTitle){
			        titleRegText += this.bookTitle + "\\d+";
			    }
			    text = text.replace(new RegExp(titleRegText, "g"), "");
			    debug("  Content replace title: " + titleRegText);
			}

			// 小说屏蔽字修复。
			var contentHandle = site.contentHandle === undefined ? true : site.contentHandle;
			if(config.content_replacements && contentHandle){
			    var s = new Date().getTime();

			    // 先提取出 img
			    var imgs = {};
			    var i = 0;
			    text = text.replace(/<img[^>]*>/g, function(img){
			        imgs[i] = img;
			        return "{" + (i++) + "}";
			    });

			    text = contentReplacements(text);

			    // 还原图片
			    text = $.nano(text, imgs);

			    debug("  小说屏蔽字修复耗时：" + (new Date().getTime() - s) + 'ms');
			}

			return text;
		},
		getIndexUrl: function(){
			var indexLink = this.getElementTool("indexLink");

			var indexUrl;
			if(indexLink){
				indexUrl = config.fullHref ? getFullHref(indexLink) : indexLink.href;
				debug("找到首页链接: " + indexUrl);
			}else{
				debug("无法找到首页链接.");
			}

			this.indexUrl = indexUrl;
			return indexUrl;
		},
		getPrevUrl: function(){
			var prevLink = this.getElementTool("prevLink");

			var prevUrl;
			if(prevLink){
				prevUrl = config.fullHref ? getFullHref(prevLink) : prevLink.href;
				debug("找到上一页链接: " + prevUrl);
			}else{
				debug("无法找到上一页链接.");
			}

			this.prevUrl = prevUrl;
			return prevUrl;
		},
		getNextUrl: function(){
			var nextLink = this.getElementTool("nextLink")

			var nextUrl;
			if(nextLink){
				nextUrl = config.fullHref ? getFullHref(nextLink) : nextUrl.href;
				debug("找到下一页链接: " + nextUrl);
			}else{
				debug("无法找到下一页链接.");
			}

			this.nextUrl = nextUrl;
			this.isTheEnd = !this.checkNextUrl(nextUrl);
			if(this.isTheEnd){
			    this.theEndColor = "#666666";
			}

			return nextUrl;
		},
		checkNextUrl: function(url){
			// if (this.site.checkSection) {
			//     if (/\/\d+_\d+\.html$/.test(this.curPageUrl)) {
			//         this.isSection = true;
			//         if(url == this.indexUrl){
			//             return false;
			//         }else{
			//             return true;
			//         }
			//     }
			// }

		    var endNum_regexp = /\/\d+\.html$|\/wcxs-\d+-\d+\/$/;
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
		getElementTool: function(typeName){
			if(this.site[typeName]){
				var selector = this.site[typeName];
				debug("  " + typeName + ": " + selector)
				return $(selector, this.doc);
			}

			var elem;
			var selectors = rule[typeName];

			if(typeof selectors === 'string'){
				elem = $(selectors, this.doc);
				if(!elem)
					debug(selectors, this.doc)
				return elem;
			}

			for(var i = 0, l = selectors.length; i < l; i++){
				elem = $(selectors[i], this.doc);
				if(elem){
					return elem;
				}
			}
		},
	};

	var reader = {
		site: null,
	    parsedPages: {},
	    requestUrl: null,
	    isTheEnd: false,
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
        remove: [],

	    init: function(site){
	        if(!site){
	            reader.getCurSiteInfo();
	        }

	        var parser = new Parser(reader.site);

	        parser.getAll();
	        if(parser.content){
	            reader.parsedPages[window.location.href.replace(/\/$/, '')] = true;

	            reader.prepDocument();
	            addStyle(CSS);

	            // 自适应网页设计
	            var meta = document.createElement("meta");
	            meta.setAttribute("name", "viewport");
	            meta.setAttribute("content", "width=device-width, initial-scale=1");
	            document.head.appendChild(meta);

	            document.title = parser.docTitle;

	            var tpl_html = '<div id="wrapper">' + reader.tpl_content + '</div>';
	            document.body.innerHTML = $.nano(tpl_html, parser);

	            reader.requestUrl = parser.nextUrl;
	            reader.isTheEnd = parser.isTheEnd;

	            if(reader.requestUrl){
	                reader.scroll = function() { reader.onScroll() }
	                window.addEventListener("scroll", reader.scroll, false);
	            }
	        }
	    },

	    getCurSiteInfo: function(){
	        if(reader.site)
	            return reader.site;

	        var sites = rule.specialSite;
	        var url_reg;
	        for (var i = sites.length - 1; i >= 0; i--) {
	            url_reg = new RegExp(sites[i].url);
	            if(location.href.match(url_reg)){
	                this.site = sites[i];
	                return this.site;
	            }
	        }
	    },

	    prepDocument: function() {
	        /* Before we do anything, remove all scripts that are not readability. */
	        window.onload = window.onunload = function() {};

	       	window.onload = window.onunload = function() {};
            window.document.onmouseup = function(){};
            window.document.onmousemove = function(){};
            window.document.onmousedown = function(){};
            window.document.onclick = function(){};
            window.document.body.onclick = function(){};
            window.document.oncontextmenu = function(){};
            window.document.body.oncontextmenu = function(){};
            window.document.ondblclick = function(){};

	        /* Remove all stylesheets */
	        for (var k=0;k < document.styleSheets.length; k+=1) {
	            var style = document.styleSheets[k];
	            if (style && style.href !== null && style.href.lastIndexOf("readability") === -1) {
	                style.disabled = true;
	            }
	        }
	  		document.body.removeAttribute('bgcolor');
	  		document.body.removeAttribute('style');
	    },
	    onScroll: function(){
	        var scrollHeight = Math.max(document.documentElement.scrollHeight,
	                                    document.body.scrollHeight);
	        var remain = scrollHeight - window.innerHeight - window.scrollY;
	        if (remain < config.BASE_REMAIN_HEIGHT) {
                var nextUrl = reader.requestUrl;
                if(nextUrl && !reader.isTheEnd  && !(nextUrl in reader.parsedPages)){
                    reader.addNextPage(nextUrl);
                    reader.parsedPages[nextUrl] = true;
                    reader.requestUrl = null;
                }
	        }
	    },
	    addNextPage: function(nextUrl){
	    	if(this.site && this.site.useiframe){
	    		this.iframeRequest(nextUrl);
	    		return;
	    	}

	        debug("xhttpRequest: " + nextUrl);
	        xhttpRequest(nextUrl, function(){
	        	if(this.readyState != 4) return;
	        	reader.requestLoad(this);
	        });
	    },
        iframeRequest: function(nextUrl){
        	var self = this;

    		if(!this.iframe){
    			var i=document.createElement('iframe');
    			this.iframe=i;
    			i.name='mynovelreader-iframe';
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
	    requestLoad: function(res){
	        var doc = parseHTML(res.responseText);
	        this.loaded(doc);
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
	    	var parser = new Parser(reader.site, doc);
	    	parser.getAll();
	    	if(parser.content){
	    	    var content = $.nano(reader.tpl_content, parser);

	    	    var wrapper = $('#wrapper');
	    	    wrapper.innerHTML = wrapper.innerHTML + content;
	    	    if(parser.nextUrl){
	    	    	reader.requestUrl = parser.nextUrl;
	    	    }
	    	}
	    },
	};

	function launch(){
	    var other_enable = function(){
	        if(config.booklinkme && document.referrer.match(/booklink\.me/)
	            && !window.location.href.match(/read\.qidian\.com\/BookReader\/\d+\.aspx/)){
	            return true;
	        }
	        return false;
	    };

        reader.init();
	}

    function init(){
        window.readx = reader.init;

        var info = reader.getCurSiteInfo();
        if(info && info.useiframe){
            window.addEventListener("load", function(){
                var timeout = info.timeout || 0;
                setTimeout(launch, timeout);
            }, false);
        }else{
            window.addEventListener("DOMContentLoaded", launch, false);
        }

        if(window.opera){
            if(config.disableScript && info && !info.useiframe)
                operaDisableScript();

            if(config.disableCSS)
                window.opera.addEventListener('BeforeCSS', function(e){
                    e.preventDefault();
                }, false);
        }
    }

    init();

    function debug(){ if(config.DEBUG) console.log.apply(console, arguments);}
	function $A(args) { return Array.prototype.slice.call(args)}

	// 获取单个元素,混合。
	function $(selector, doc){
		var ret;
		doc = doc || document;
		try{
			ret = doc.querySelector(selector);
		}catch(e){
			ret = doc.evaluate(selector, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}
		return ret;
	}
	function getElementsByXpath(xpath, contextNode, doc){
		doc = doc || document;
		contextNode = contextNode || doc;
		return doc.evaluate(xpath,contextNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	};
	function xhttpRequest(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = callback;
		xhr.open("GET", url, true);
		xhr.overrideMimeType('text/html; charset=' + document.characterSet);
		xhr.send(null);
	};

	function operaDisableScript(){
		debug("Disable Scripts");
		window.opera.addEventListener('BeforeJavascriptURL', function(e) {
			e.preventDefault();
		}, false);
		window.opera.addEventListener('BeforeScript', function(e) {
			e.preventDefault();
		}, false);
		window.opera.addEventListener("BeforeExternalScript", function (e) {
	    	e.preventDefault();
		}, false);
		// window.opera.addEventListener('BeforeEventListener', function(e) {
		// 	if (!e.listener.toString().match(/^\s*function\s+\w*mwjenabled/i)) {
		// 		e.preventDefault();
		// 	}
		// }, false);

		// document.addEventListener('load', function mwjenabledNoscript() {
		// 	for (var i = 0, j = document.getElementsByTagName('noscript'); j; i++) {
		// 		var nstag = document.createElement('wasnoscript');
		// 		j.parentNode.insertBefore(nstag, j);
		// 		while (j.childNodes[0]) {
		// 			nstag.appendChild(j.childNodes[0]);
		// 		}
		// 	}
		// }, false);
	}

	// 自造简化版 underscroe 库，仅 ECMAScript 5
	(function(){
	    var root = this;

	    var nativeIsArray = Array.isArray;

	    // Create a safe reference to the Underscore object for use below.
	    var _ = function(obj){
	        if(obj instanceof _) return obj;
	        if(!(this instanceof _)) return new _(obj);
	        this._wrapped = obj;
	    };

	    root._ = _;

	    var toString = Object.prototype.toString;

	    _.isArray = nativeIsArray || function(obj) {
	       return toString.call(obj) == '[object Array]';
	    };

	    // Is a given variable an object?
	    _.isObject = function(obj) {
	       return obj === Object(obj);
	    };

	    ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'].forEach(function(name){
	        _['is' + name] = function(obj) {
	            return toString.call(obj) == '[object ' + name + ']';
	        };
	    });

	    // Return the first value which passes a truth test. Aliased as `detect`.
	    _.find = function(obj, iterator, context){
	        var result;
	        obj.some(function(value, index, array){
	            if(iterator.call(context, value, index, array)){
	                result = value;
	                return true;
	            }
	        });
	        return result;
	    };
	}).call(window);

	// jQuery 简易模板，https://github.com/trix/nano
	(function($) {var _regex = /\{([\w\.]*)\}/g;$.nano = function(template, data) {return template.replace(_regex, function(str, key) {var keys = key.split('.'),value = data[keys.shift()];keys.forEach(function(key){value = value[key];});return (value === null || value === undefined) ? '' : value;});};}($));
	function getFullHref(href){if(typeof href == 'undefined')return '';if(typeof href!='string') href=href.getAttribute('href');var a = getFullHref.a;if(!a){getFullHref.a=a=document.createElement('a');}a.href = href;return a.href;}
	function addStyle(css){var heads = document.getElementsByTagName('head');if(heads.length > 0){var node = document.createElement('style');node.type = 'text/css';node.innerHTML = css;heads[0].appendChild(node);}}
	(function(DOMParser) {"use strict";var DOMParser_proto = DOMParser.prototype,real_parseFromString = DOMParser_proto.parseFromString;	try {if ((new DOMParser).parseFromString("", "text/html")) {	return;}	} catch (ex) {}	DOMParser_proto.parseFromString = function(markup, type) {if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {	var doc = document.implementation.createHTMLDocument("");	doc.documentElement.innerHTML = markup;	return doc;} else {	return real_parseFromString.apply(this, arguments);}	};}(DOMParser));
	function parseHTML(data){var parser = parseHTML.parser;if(!parser){parser = new DOMParser();}return parser.parseFromString(data, "text/html");};
})('\
/**\
 * 下面的皮肤根据 defpt 的修改而来\
 */\
body {background:#EEE;}\
.chapter-head {\
    background-image: linear-gradient(#DDD, #CCC);\
    font-family:"Microsoft YaHei UI",微软雅黑,新宋体,宋体,arial;\
    text-align:center;\
    font-size:1.2em;\
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
    font-size:1.2em;\
}\
.content img.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}\
.chapter-head-nav{\
    display:none;\
}\
.chapter-footer-nav{\
    text-align:center;\
    font-size:1em;\
    margin:-10px 0px 30px 0px;\
}\
');

