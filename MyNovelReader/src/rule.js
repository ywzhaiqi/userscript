
// ===== 自动尝试的规则 =====
var Rule = {
    titleRegExp: /第?\s*[一二两三四五六七八九十○零百千万亿0-9１２３４５６７８９０]{1,6}\s*[章回卷节折篇幕集]/i,
    titleReplace: /^章节目录|^文章正文|^正文|全文免费阅读|最新章节|\(文\)/,

    // nextRegExp: /[上前下后][一]?[页张个篇章节步]/,
    nextSelector: "a[rel='next'], a:contains('下一页'), a:contains('下一章'), a:contains('下一节'), a:contains('下页')",
    prevSelector: "a[rel='prev'], a:contains('上一页'), a:contains('上一章'), a:contains('上一节'), a:contains('上页')",
    // 忽略的下一页链接，匹配 href
    nextUrlIgnore: /(?:(?:index|list|last|LastPage|end)\.)|BuyChapterUnLogin|BookReader\/vip,|^javascript:|book\.zongheng\.com\/readmore|\/0\.html$|www\.shumilou\.com\/to-n-[a-z]+-\d+\.html/i,
    nextUrlCompare: /\/\d+(_\d+)?\.html?$|\/wcxs-\d+-\d+\/$|chapter-\d+\.html$/i,  // 忽略的下一页链接（特殊），跟上一页比较

    // 按顺序匹配，匹配到则停止。econtains 完全相等
    indexSelectors: ["a[href='index.html']", "a:contains('返回书目')", "a:contains('章节目录')", "a:contains('章节列表')",
        "a:econtains('最新章节')", "a:contains('回目录')","a:contains('回书目')", "a:contains('目 录')", "a:contains('目录')"],

    contentSelectors: ["#pagecontent", "#contentbox", "#bmsy_content", "#bookpartinfo", "#htmlContent",
        "#text_area", "#chapter_content", "#chapterContent", "#partbody",
        "#article_content", "#BookTextRead", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td", "#TXT", "#txt", "#zjneirong",
        ".novel_content", ".readmain_inner", ".noveltext", ".booktext",
        "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#content", ".content"],

    // (测试)尝试查找书名。顶部章节导航的最后一个链接可能是书名。
    bookTitleSelector: ".h1title > .shuming > a[title], .chapter_nav > div:first > a:last",

    contentRemove: "script, iframe",          // 内容移除选择器
    contentReplace: /'ads_wz_txt;',|最新.?章节|百度搜索|无弹窗小说网|更新快无弹窗纯文字|高品质更新|小说章节更新最快|\(百度搜.\)|全文字手打|“”&nbsp;看|无.弹.窗.小.说.网|追书网|〖∷∷无弹窗∷纯文字∷ 〗/g,
    removeLineRegExp: /<p>[　\s。;，！\.∷〖]*<\/p>/g,  // 移除只有一个字符的行

    // 以下不常改
    replaceBrs: /(<br[^>]*>[ \n\r\t]*){1,}/gi,    // 替换为<p>
};

// ===== 自定义站点规则 =====
Rule.specialSite = [
    // 详细版规则示例。注：该网站已无法访问。
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
        useiframe: false,                                          // (可选)下一页加载是否使用 iframe
        // mutationSelector: "#chaptercontainer",                    // (可选)内容生成监视器
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
    // 特殊站点，需再次获取且跨域。添加 class="reader-ajax"，同时需要 src, charset
    {siteName: "起点中文、起点女生、起点文学",
        url: "^http://(www|read|readbook)\\.(qidian|qdmm|qdwenxue)\\.com/BookReader/.*",
        // titleReg: "小说:(.*?)(?:独家首发)/(.*?)/.*",
        titleSelector: "#lbChapterName",
        bookTitleSelector: ".page_site > a:last",
        // contentSelector: "#hdContent",
        nextUrl: function($doc){  // 为了避免起点某次改版后把1页拆成2页，然后造成重复载入第一页的情况
            var html = $doc.find('script:contains(nextpage=)').html();
            if (!html) return;
            var m = html.match(/nextpage='(.*?)'/);
            if (m) return m[1];
        },
        prevUrl: function($doc){
            var html = $doc.find('script:contains(prevpage=)').html();
            if (!html) return;
            var m = html.match(/prevpage='(.*?)'/);
            if (m) return m[1];
        },
        contentReplace: {
            "\\[img=(.*)\\]": "<p><img src='$1'></p><p>",
            "\\[+CP.*(http://file.*\\.jpg)\\]+": "<p><img src='$1'></p><p>",
            "\\[bookid=(\\d+)，bookname=(.*?)\\]": "<a href='http://www.qidian.com/Book/$1.aspx'>$2</a>",
            "www.cmfu.com发布|起点中文网www.qidian.com欢迎广大书友光临阅读.*": "",
            '(<p>\\s+)?<a href="?http://www.(?:qidian|cmfu).com"?>起点中文网.*': '',

            '([\\u4e00-\\u9fa5])[%￥]+([\\u4e00-\\u9fa5])': '$1$2',  // 屏蔽词修正，例如：风%%骚
        },
        contentRemove: "span[id^='ad_']",
        contentPatch: function(fakeStub){
            fakeStub.find('#maincontent  script[src$=".txt"]').addClass('reader-ajax');
        },
    },
    {siteName: "起点中文网免费频道",
        url: "^http://free\\.qidian\\.com/Free/ReadChapter\\.aspx",
        titleSelector: ".title > h3",
        bookTitleSelector: ".site_rect > a:last",
        contentSelector: "#chapter_cont, #content",
        contentRemove: ".nice_books",
        contentReplace: {
            "\\[img=(.*)\\]": "<p><img src='$1'></p><p>",
            "\\[+CP.*(http://file.*\\.jpg)\\]+": "<p><img src='$1'></p><p>",
            "\\[bookid=(\\d+)，bookname=(.*?)\\]": "<a href='http://www.qidian.com/Book/$1.aspx'>$2</a>",
            "www.cmfu.com发布|起点中文网www.qidian.com欢迎广大书友光临阅读.*": "",
            '(<p>\\s+)?<a href="?http://www.(?:qidian|cmfu).com"?>起点中文网.*': ''
        },
        contentPatch: function(fakeStub) {
            fakeStub.find('#chapter_cont, #content > script:first').addClass('reader-ajax');
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
        url: "^http://chuangshi\\.qq\\.com/",
        titleReg: "(.*?)_(.*)_创世中文",
        contentSelector: ".bookreadercontent",
        // contentSelector: "#chaptercontainer",
        contentHandle: false,
        useiframe: true,
        mutationSelector: "#chaptercontainer",  // 内容生成监视器
        mutationChildCount: 1,
        timeout: 500,
        contentRemove: '> p:last',
        // contentPatch: function(fakeStub){
        //     var $body = fakeStub.find('body');
        //         html = $body.html(),
        //         novel_showid = unsafeWindow.novel_showid,
        //         _main = unsafeWindow.CS.page.bookReader.main;

        //     var m = html.match(/uuid\s*=\s*["'](\d+)["']/i);
        //     if (!m) {
        //         console.error('无法找到 uuid', html);
        //         return;
        //     }
        //     var uuid = m[1];

        //     var preChapterInfo = _main.getPreChapterInfo(uuid),
        //         nextChapterInfo = _main.getNextChapterInfo(uuid);
        //         _pre_uuid = preChapterInfo ? preChapterInfo['uuid'] : 0;
        //         _next_uuid = nextChapterInfo ? nextChapterInfo['uuid'] : 0;

        //     上下页
        //     $('<a rel="prev">').attr('href', _getReadPageUrl(_pre_uuid)).prependTo($body);
        //     $('<a rel="next">').attr('href', _getReadPageUrl(_next_uuid)).prependTo($body);

        //     // 内容
        //     var durl = 'http://chuangshi.qq.com/index.php/Bookreader/' + novel_showid +'/' + uuid;
        //     fakeStub.find('body').append('<div id="content"></div>');
        //     fakeStub.find('div#content').attr({
        //         class: 'reader-ajax',
        //         src: durl,
        //         charset: 'GB2312'
        //     });

        //     function _getReadPageUrl(uuid) {
        //         if (!uuid) return 'javascript:;';
        //         return window.location.href.replace(/(\d)+\.html/, uuid + '.html');
        //     }
        // },
    },
    {siteName: "晋江文学网",
        url: /^http:\/\/www\.jjwxc\.net\/onebook\.php\S*/,
        titleReg: /《(.*?)》.*ˇ(.*?)ˇ.*/,
        indexSelector: ".noveltitle > h1 > a",
        contentSelector: '.noveltext',
        contentHandle: false,
        contentRemove: 'font[color], hr',
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
        titleSelector: ".bgtop > h1",
        bookTitleSelector: ".nownav > a:eq(4)",
        contentSelector: "#article, .zhangjie",
        contentRemove: "div[style], .miaoshu, .zhichi, .bottomAdbanner",
        contentPatch: function(fakeStub) {
            // 删除标题不需要的部分
            fakeStub.find(".bgtop > h1 > span").remove();
        }
    },
    // {siteName: "磨铁",
    // 	url: 'http://www.motie.com/book/\\d+_\\d+',
    // 	contentSelector: '.page-content'
    // },

    {siteName: "百度贴吧（手动启用）",
        enable: false,
        url: /^http:\/\/tieba\.baidu.com\/p\//,
        titleSelector: "h1.core_title_txt",
        bookTitleSelector: ".card_title_fname",
        nextSelector: false,
        indexSelector: 'a.card_title_fname',
        prevSelector: false,

        contentSelector: "#j_p_postlist",
        contentRemove: "#sofa_post, .d_author, .share_btn_wrapper, .core_reply, .j_user_sign",
        style: ".clear { border-top:1px solid #cccccc; margin-bottom: 50px; visibility: visible !important;}",  // 显示楼层的分割线
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
        url: /^http:\/\/www\.(?:ranwen\.cc|64mi\.com)\/.*\.html$/,
        titleReg: /(.*?)-(.*?)-燃文/,
        contentSelector: "#oldtext, #contents",
        contentRemove: "div[style], script",
        contentReplace: [
            /\((&nbsp;)*\)/g,
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
        contentRemove: 'a',
        contentReplace: [
            'div lign="ener"&gt;|.*更多章节请到网址隆重推荐去除广告全文字小说阅读器',
            '起点中文网www.qidian.com欢迎广大书.*',
            '书迷楼最快更新.*',
            '更新最快最稳定',
            '\\(\\.\\)R?U',
            {'<p>\\?\\?': '<p>'},
            '\\(www.\\)',
        ],
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
            "&lt;冰火#中文.*|冰火中文&nbsp;(www.)?binhuo.com(?:【首发】|)|冰.火.中文|绿色小说|lvsexs|冰火中文": "",
            "LU5.ｃｏM|lU５.com|LU5.com":"",
            "([^/])www\\.binhuo\\.com(?:\\.com|)": "$1",
            "\\(.*?平南文学网\\)": "",
        },
        contentPatch: function(fakeStub){
            fakeStub.find("#BookText").append(fakeStub.find("img.imagecontent"));
        }
    },
    {siteName: "百晓生",
        url: /^http:\/\/www\.bxs\.cc\/\d+\/\d+\.html/,
        titleReg: /(.*?)\d*,(.*)/,
        contentRemove: 'a',
        contentReplace: [
            /一秒记住【】www.zaidu.cc，本站为您提供热门小说免费阅读。/ig,
            /（文&nbsp;學馆w&nbsp;ww.w&nbsp;xguan.c&nbsp;om）/ig,
            /（百晓生更新最快最稳定\)/g,
            /\((?:&nbsp;)*(?:无弹窗)?全文阅读\)/ig,
            /\[<a.*?首发\[百晓生\] \S+/ig,
            /高速首发.*本章节是地址为/ig,
            /\/\/(?:&nbsp;|访问下载txt小说|高速更新)+\/\//ig,
            /(www\.)?bxs\.cc|www\.bxs(\.com)?/ig,
            /百晓生.不跳字|不跳字。|更新快纯文字/ig,
            /\.\[，！\]/ig,
            /（未完待续&nbsp;http:\/\/www.Bxs.cc&nbsp;89免费小说阅《百晓生文学网》）/g,
            /〖百晓生∷.*〗|《?百晓生文学网》?|最快阅读小说大主宰，尽在百晓生文学网.*|ww.x.om|欢迎大家来到.*?bxs\.cc|百晓生阅读最新最全的小说.*|百晓生网不少字|站长推荐.*|文字首发|百.晓.生.|关闭.*广告.*|飘天文学|本站域名就是.*|\(.{0,5}小说更快更好.{0,5}\)|(请在)?百度搜索.*|一秒记住.*为您提供精彩小说阅读.|百晓生|¤本站网址：¤|\/\/&nbsp;访问下载txt小说\/\/◎◎|纯站点\\".*值得收藏的/ig,
            /文[学學][馆館]|www\.biquge\.cc|(http:\/\/)?www\.Bxs\.cc|(请牢记)?soudu．org/ig,
            /请搜索，小说更好更新更快!|最快文字更新无弹窗无广|\(即可找到本站\)|无广告看着就是爽!|更多全本txt小说请到下载|∷更新快∷∷纯文字∷/ig,
            /永久网址，请牢记！/ig,
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
        url: /http:\/\/(www\.)?muyuge\.(com|net)\/\w+\/\d+\.html/,
        titleSelector: "#yueduye h1",
        bookTitleSelector: ".readerNav > li > a:last",
        indexSelector: ".readerFooterPage a[title='(快捷:回车键)']",
        // useiframe: true,
        // mutationSelector: "#content",
        // mutationChildCount: 1,
        contentRemove: ".vote",
        contentReplace: {
            "<a[^>]*>(.*?)</a>": "$1",
            "看更新最快的小说就搜索—— 木鱼哥——无弹窗，全文字": "",
            "【看最新小说就搜索.*全文字首发】": "",
            "<p>.*?无弹窗</p>":"",
            "bb\\.king|【木&nbsp;鱼&nbsp;哥&nbsp;.*?】|【一秒钟记住本站：muyuge.com.*木鱼哥】":"",
            "——推荐阅读——[\\s\\S]+": "",
            "【\\s*木\\s*鱼\\s*哥.*?】":"",
            "div&gt;|&lt;－》": "",
            "\\(.pn. 平南\\)": "",
        },
        startFilter: function() {
            clearInterval(unsafeWindow.show);
        }
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
            "逸名文学屋："
        ]
    },
    {siteName: "奇书屋",
        url: "http://www.qishuwu.com/\\w+/\\d+/",
        titleReg: "(.*)_(.*)_.*_奇书屋",
    },
    {siteName: "17k小说网",
        url: /^http:\/\/\S+\.17k\.com\/chapter\/\S+\/\d+\.html$/,
        titleReg: /(.*?)-(.*?)-.*/,
        contentSelector: "#chapterContent",
        contentRemove: "#authorSpenk, .like_box, #hotRecommend, .ct0416, .recent_read, div[style], #miniVoteBox"
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
    {siteName: "来书屋",
        url: "http://www.laishuwu.com/html/\\d+/\\d+/\\d+.html",
        titleSelector: ".chaptertitle h2",
        bookTitleSelector: ".chaptertitle h1",
        contentReplace: "txt\\d+/",
    },
    {siteName: "万书吧",
        url: "http://www\\.wanshuba\\.com/Html/\\d+/\\d+/\\d+\\.html",
        titleReg: "(.*?),(.*?)-万书吧",
        titlePos: 1,
        contentSelector: ".yd_text2",
        contentReplace: [
            "\\[www.*?\\]",
            "\\(&nbsp;&nbsp;\\)",
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
        contentReplace: "\\(热点书库首发:www.hotsk.com\\)|www.zhuZhuDao.com .猪猪岛小说."
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
        contentReplace: [
            "◆免费◆",
            "★百度搜索，免费阅读万本★|访问下载txt小说.百度搜.|免费电子书下载|\\(百度搜\\)|『文學吧x吧.』|¤本站网址：¤",
            "[☆★◆〓『【◎◇].*?(?:yunlaige|云 来 阁|ｙｕｎｌａｉｇｅ|免费看).*?[☆◆★〓』】◎◇]",
            "【手机小说阅读&nbsp;m.】",
            "BAIDU_CLB_fillSlot.*",
            "&nbsp;关闭</p>",
            "&nbsp;&nbsp;&nbsp;&nbsp;\\?",
            "\\[☆更.新.最.快☆无.弹.窗☆全.免.费\\]",
            '\\(.*?平南文学网\\)',
            '｛首发｝|【首发】',
            { "。\\.": "。" },
        ]
    },
    {siteName: "六月中文网，盗梦人小说网",
        url: "^http://www\\.(?:6yzw\\.org|6yzw\\.com|daomengren\\.com)/.*\\.html",
        bookTitleSelector: ".con_top>a:last",
        contentRemove: "a[href]",
        contentReplace: [
            "纯文字在线阅读本站域名 520xs.Com 手机同步阅读请访问 M.520xs.Com",
            "{飘天文学[\\s\\S]*您的支持就是我们最大的动力}",
            "(（未完待续），|精彩推荐：，)?最新最快更新热门小说，享受无弹窗阅读就在：",
            "一秒记住【】，本站为您提供热门小说免费阅读。",
            "百度搜索 本书名.*",
            "欢迎您的光临，任何搜索引擎搜索.*给大家带来的不便深感抱歉!！",
            "\\(?&nbsp;&nbsp; ?提供』。如果您喜欢这部作品，欢迎您来创世中文网[\\s\\S]+",
            "[\\(（]未完待续.{1,2}本文字由.*",
            "//添加开头|会员特权抢先体验",
            "更新最快|更新快纯文字|看最新章节|六月中文网|78小说|h﹒c﹒d|穿越小说吧 sj131|\\*五月中文网5.c om\\*",
            "\\d楼[\\d\\-: ]+(?:&nbsp;)+ \\|(?:&nbsp;)+|吧主\\d+(?:&nbsp;)+|支持威武，嘎嘎！",
            "www，|&nbsp;\\\\|“梦”(&nbsp;| )*“小”(&nbsp;| )*(“说” )?“网”|“岛”(&nbsp;| )+“说”",
            /(百度搜索 )?本书名 \+ 盗梦人 看最快更新/ig,
            "520xs.com ”520小说“小说章节更新最快",
            "本文由　……　首发",
            "看最新最全小说",
            "（首发）",
            "&amp;nbsp",
        ]
    },
    {siteName: "飞卢小说网",
        url: "^http://b\\.faloo\\.com/p/\\d+/\\d+\\.html",
        titleSelector: "#title h1",
        bookTitleSelector: "div.nav > a:last",
        nextSelector: "a#next_page",
        prevSelector: "a#pre_page",
        indexSelector: "a#huimulu",
        contentSelector: "#main > .main0",
        contentRemove: "> *:not(#con_imginfo, #content)",
        contentReplace: "飞卢小说网 b.faloo.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在飞卢小说网！",
        contentPatch: function(fakeStub){
            fakeStub.find("#content").find(".p_gonggao").remove();
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
    {siteName: '23中文',
        url: '^http://www\\.23zw\\.com/.*\\.html',
        contentReplace: [
            '本文由首发',
            '章节更新最快',
            '顶点小说.23us.。',
            '\\(顶点小说\\)',
            "看最新最全",
        ]
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
    {siteName: "比奇中文网",
        url: "http://www\\.biqi\\.me/files/article/html/\\d+/\\d+/\\d+\\.html",
        titleSelector: "#lbChapterName",
        bookTitleSelector: "#TOPNAV td:first > a:last",
        contentReplace: [
            "http://www.biqi.me比奇中文网永久网址，请牢记！",
            "www.biqi.me比奇中文网一直在为提高阅读体验而努力，喜欢请与好友分享！",
            "[｛【]比奇中文网首发www.biqi.me[｝】]",
        ]
    },
    {siteName: "书哈哈小说网",
        url: "http://read\\.shuhaha\\.com/Html/Book/\\d+/\\d+/\\d+\\.html",
        titleSelector: "#htmltimu",
        bookTitleSelector: [".srcbox > a:nth-child(2)", /目录$/],
    },
    {siteName: "SF 轻小说",
        url: '^http://book.sfacg.com/Novel/\\d+/\\d+/\\d+/',
        titleReg: '(.*?)-(.*?)-.*',
        contentSelector: '#ChapterBody',
    },
    {siteName: "武林中文网",
        url: '^http://www\\.50zw\\.com/book_\\d+/\\d+\\.html',
        bookTitleSelector: '.srcbox > a:last',
        contentReplace: [
            '更新最快【】',
            '&lt;/dd&gt;',
            '&lt;center&gt; &lt;fon color=red&gt;'
        ]
    },
    {siteName: "乡村小说网",
        url: '^http://www\\.xiangcunxiaoshuo\\.com/shu/\\d+/\\d+\\.html',
        bookTitleSelector: '.read_m > .list',
        contentSelector: '.yd_text2',
        contentReplace: [
        ]
    },

    // ================== 采用 iframe 方式获取的 ====================
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
    {siteName: "读读看",
        url: "^http://www\\.dudukan\\.net/html/.*\\.html$",
        contentReplace: "看小说“就爱读书”|binhuo|www\\.92to\\.com",
        useiframe: true,
        mutationSelector: "#main",
        mutationChildCount: 0,
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
            "\\(未完待续请搜索，小说更好更新更快!",
            "www\\.DU00\\.com"
        ],
        checkSection: true
    },
    {siteName: "78小说网",
        url: "^http://www\\.78xs\\.com/article/\\d+/\\d+/\\d+.shtml$",
        contentHandle: false,
        titleReg: "(.*?) (?:正文 )?(.*) 78小说网",
        indexSelector: "a:contains('目 录')",
        prevSelector: "a:contains('上一章')",
        nextSelector: "a:contains('下一章')",
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
    {siteName: "给力文学小说阅读网",
        url: "^http://www\\.geiliwx\\.com/.*\\.shtml",
        titleReg: "-?(.*)_(.*)最新章节_给力",
        titlePos: 1,
        // titleSelector: 'h1',
        // bookTitleSelector: '#breadCrumb>a:eq(1)',
        useiframe: true,
        contentRemove: 'h1, font[color="blue"]',
        contentReplace: [
            "网站升级完毕！感谢对给力文学网的支持！",
            "（百度搜索给力文学网更新最快最稳定\\)",
            "【sogou,360,soso搜免费下载小说】",
            "给力文学网",
            "看最快更新",
            "小说网不跳字",
            "\\.com",
            "BAIDU_CLB_fillSlot\\(.*",
        ]
    },
    // ============== 内容需要2次获取的 =========================
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
    {siteName: "哈哈文学",
        url: /^http:\/\/www\.hahawx\.com\/.*htm/,
        titleReg: /(.*?)-(.*?)-.*/,
        contentSelector: "#chapter_content",
        contentReplace: /(?:好书推荐|书友在看|其他书友正在看|好看的小说|推荐阅读)：。|(?:www|ｗｗｗ|ｂｏｏｋ).*(?:com|net|org|ｃｏｍ|ｎｅｔ)|全文字阅读|无弹窗广告小说网|哈哈文学\(www.hahawx.com\)|souDU.org|Ｓｏｕｄｕ．ｏｒｇ|jīng彩推荐：/ig,
        contentPatch: function(fakeStub){
            var $content = fakeStub.find("#chapter_content");
            var m = $content.find("script").text().match(/output\((\d+), "(\d+\.txt)"\);/);
            if(m && m.length == 3){
                var aid = m[1],
                    files = m[2];
                var subDir = "/" + (Math.floor(aid / 1000) + 1),
                    subDir2 = "/" + (aid - Math.floor(aid / 1000) * 1000);
                $content.attr({
                    class: "reader-ajax",
                    src: "http://r.xsjob.net/novel" + subDir + subDir2 + "/" + files,
                    charset: "gbk"
                });
            }
        }
    },
    {siteName: "天天中文",
        url: "http://www\\.ttzw\\.com/book/\\d+/\\d+\\.html",
        titleSelector: "#chapter_title",
        bookTitleSelector: ".fl.pl20 a:last",
        contentSelector: "#text_area",
        contentReplace: /www.ttzw.com|www.c66c.com|手机用户请到阅读。|<p>\s*a<\/p>/ig,
        contentPatch: function(fakeStub) {
            var m = fakeStub.find('#text_area script').text().match(/outputTxt\("(.*)"\);/);
            if (m) {
                fakeStub.find('#text_area').attr({
                    class: "reader-ajax",
                    src: unsafeWindow.getServer() + m[1],
                    charset: "gbk"
                });
            }
        }
    },

    // ===========================================================
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
        contentRemove: "h1, table, .toplink",
        contentReplace: [
            /[{〖]请在百度搜索.*[}〗]|.(?:百度搜索飄天|无弹窗小说网).*\.Net.|\[飄天.*无弹窗小说网\]/ig,
            '\\{飘天文学www.piaotian.net感谢各位书友的支持，您的支持就是我们最大的动力\\}',
            '章节更新最快'
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
        url: "http://www.(?:69zw|kan7).com/\\w+/\\d+/\\d+/\\d+.html",
        titleSelector: ".chapter_title",
        bookTitleSelector: ".readhead h1",
        contentSelector: ".yd_text2",
        // titleReg: "(.*)?_(.*)-六九中文",
        contentReplace: [
            "[\\*]+本章节来源六九中文.*请到六九中文阅读最新章节[\\*]+|－\\\\[wＷ]+.*书友上传/－",
            "\\\\请到 www.69zw.com 六\\*九.*?/",
            "【 注册会员可获私人书架，看书更方便！：】",
            "首发<br />",
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
        titleReg: /(.*) - (.*) - 小说在线阅读 - .* - 努努书坊/,
        titlePos: 1,
        contentSelector: "table:eq(4) p",
        indexSelector: "a[href^='./']",
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
        contentSelector: ".yd_text2",
        contentRemove: 'a',
        contentReplace: [
            '【www.13800100.com文字首发D5８6小说网】',
            '【☆D5８6小说网☆//文字首发】.*'
        ]
    },
    {siteName: "豌豆文学网",
        url: "^http://www.wandoou.com/book/\\d+/\\d+\\.html",
        titleReg: '(.*?)最新章节-(.*)-.*无弹窗广告_豌豆文学网',
        contentRemove: "center",
        contentReplace: [
            /[{（]<a href.*[}）]|网欢迎广大书友光临阅读，.*/ig,
            /[レ★]+.*(?:请支持)?豌(?:.|&amp;)?豆.?文.?学.*[レ★]+/ig,
            /[（(【]豌.?豆.?文.?学.*[）)】]/ig,
            /∷更新快∷∷纯文字∷|http:永久网址，请牢记！/ig,
            /(?:{|\\|\/|\()*豌.?豆.?文.?学.?网.*?(?:高速更新|\\\/|})+/ig,
            /更新最快最稳定|看小说“”/ig,
            /&lt;strng&gt;.*?&lt;\/strng&gt;/ig,
            /\(凤舞文学网\)|\( *\)|「启航文字」|79阅.读.网/ig,
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
    {siteName: "吾读小说网",
        url: "http://www\\.5du5\\.com/book/.*\\.html",
        contentReplace: '\\(吾读小说网 <a.*无弹窗全文阅读\\)'
    },
    {siteName: "UU看书",
        url: "http://www\\.uukanshu\\.com/.*/\\d+/\\d+.html",
        contentReplace: "[UＵ]*看书[（\\(].*?[）\\)]文字首发。"
    },
    {siteName: "长风文学网",
        url: "http://www\\.cfwx\\.net/files/article/html/\\d+/\\d+/\\d+\\.html",
        titleSelector: '.title',
        bookTitleSelector: '.linkleft > a:last',
    },
    {siteName: "云来阁",
        url: "http://www\\.yunlaige\\.com/html/\\d+/\\d+/\\d+\\.html",
        titleSelector: '.ctitle',
        bookTitleSelector: '#hlBookName',
        contentSelector: '#content',
        contentRemove: '.bottomlink, a',
        contentReplace: [
            '[☆★◆〓『【◎◇].*?(?:yunlaige|云 来 阁|ｙｕｎｌａｉｇｅ).*?[☆◆★〓』】◎◇]',
            '《更新最快小说网站：雲来阁http://WWW.YunLaiGe.COM》',
            '◢百度搜索雲来阁，最新最快的小说更新◣',
            '【最新更新】',
        ]
    },

    // ===== 特殊的获取下一页链接
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
    {siteName: "书阁网",
        url: "^http://www\\.bookgew\\.com/Html/Book/\\d+/\\d+/\\d+\\.htm",
        titleReg: "(.*)-(.*?)-书阁网",
        titlePos: 1,
        // titleSelector: ".newstitle",
        nextUrl: function($doc){
            var html = $doc.find('script:contains(nextpage=)').html();
            var m = html.match(/nextpage="(.*?)";/);
            if (m) return m[1];
        },
        prevUrl: function($doc) {
            var html = $doc.find('script:contains(prevpage=)').html();
            var m = html.match(/prevpage="(.*?)";/);
            if (m) return m[1];
        }
    },

    // {siteName: "雅文言情小说吧",  // 一章分段
    //     url: "http://www\\.yawen8\\.com/\\w+/\\d+/\\d+\\.html",
    //     contentSelector: "#content .txtc"
    // }
];

// ===== 小说拼音字、屏蔽字修复 =====
Rule.replace = {
    // ===格式整理===
    // "\\(|\\[|\\{|（|【|｛":"（",
    // "\\)|\\]|\\}|）|】|｝":"）",

    // 需要？
    ",": "，",
    // ":": "：", "\\?":"？",  // 会造成起点的图片无法替换

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
    // "？(,|，)": "？",
    //"”(,|，|。)": "”",
    "@{3,}": "",

    // === 一些特殊的替换 ===
    "\\[+CP.*(http://file.*\\.jpg)\\]+": "<img src='$1'>",
    "『(.)』": "$1",  // "『色』": "色",

    // === 去广告 ===
    "\\[搜索最新更新尽在[a-z\\.]+\\]": "",
    "<a>手机用户请到m.qidian.com阅读。</a>": "",
    ".{2,4}中文网欢迎广大书友": "",
    "访问下载txt小说|◎雲來閣免费万本m.yunlaige.com◎":"",
    "〖∷更新快∷无弹窗∷纯文字∷.*?〗": "",
    "本文由　。。　首发":"",
    '”小说“小说章节更新最快': '',
    '如果觉得好看，请把本站网址推荐给您的朋友吧！': '',
    '本站手机网址：&nbsp;&nbsp;请互相通知向您QQ群【微博/微信】论坛贴吧推荐宣传介绍!': '',
    "fqXSw\\.com":"", "\\.5ｄｕ|\\.５du５\\.":"",
    "\\[\\]":"",
    "如果您觉得网不错就多多分享本站谢谢各位读者的支持": "",
    "全文字无广告|\\(看书窝&nbsp;看书窝&nbsp;无弹窗全文阅读\\)": "",
    "水印广告测试": "",
    "\\(平南文学网\\)":"",  "讀蕶蕶尐說網":"",
    "比奇提示：如何快速搜自己要找的书籍":"",  "《百度书名\\+比奇》即可快速直达":"",

    "\\(一秒记住小说界\\）|\\*一秒记住\\*":"",
    "uutxt\\.org|3vbook\\.cn|www\\.qbwx\\.com|WWw\\.YaNkuai\\.com|www\\.btzw\\.com|www\\.23uS\\.com": "",
    "txt53712/": "",
    "\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0",

    // === 星号屏蔽字还原 ===
    "十有(\\*{2})":"十有八九","十有bā'九":"十有八九",  "\\*{2}不离十":"八九不离十",
    "G(\\*{2})":"GSM", "感(\\*{2})彩":"感情色彩",
    "强(\\*{2})u5B9D":"强大法宝",

    // === 多字替换 ===
    "cao之过急":"操之过急", "chunguang大泄":"春光大泄",
    "大公无si":"大公无私",
    "fu道人家":"妇道人家", "放sōng'xià来":"放松下来",
    "奸yin掳掠":"奸淫掳掠",
    "空dangdang":"空荡荡",
    "yin奉阳违":"阴奉阳违", "一yin一阳":"一阴一阳",

    // === 双字替换 ===
    "暧m[eè][iì]":"暧昧",
    "bàn\\s*fǎ":"办法", "bucuo":"不错", "不liáng":"不良", "b[ěe]i(\\s|&nbsp;)*j[īi]ng":"北京","半shen": "半身", "b[ìi]j[ìi]ng":"毕竟", "报(了?)jing":"报$1警", "bèi'pò":"被迫", "包yǎng":"包养", "(?:biǎo|婊\\\\?)子":"婊子", "biǎo\\s*xiàn\\s*":"表现",
    "chifan":"吃饭", "ch[oō]ngd[oò]ng":"冲动", "chong物":"宠物", "cao(练|作)":"操$1", "出gui":"出轨", "chu\\s*xian":"出现", "缠mian": "缠绵", "成shu": "成熟", "(?:赤|chi)\\s*lu[oǒ]": "赤裸", "春guang": "春光", "chun风":"春风", "chuang伴":"床伴", "沉mi":"沉迷", "沉lun":"沉沦", "刺ji":"刺激", "chao红":"潮红", "初chun":"初春", "＂ｃｈｉ　ｌｕｏ＂":"赤裸",
    "dān\\s*xīn":"当心", "dang校": "党校", "da子": "鞑子", "大tui":"大腿", "dǎ\\s*suàn":"打算", "dengdai":"等待", "diao丝": "屌丝", "d[úu](?:\\s|&nbsp;|<br/>)*l[ìi]": "独立", "d[uú]\\s{0,2}c[áa]i":"独裁",  "d?[iì]f[āa]ng":"地方", "d[ìi]\\s*d[ūu]":"帝都", "di国":"帝国", "du[oò]落":"堕落", "坠luò":"坠落",
    "f[ǎa]ngf[óo]":"仿佛", "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "f[èe]nn[ùu]":"愤怒", "fǎn\\s*yīng":"反应",
    "gao潮": "高潮", "高氵朝":"高潮", "gāo\\s*xìng\\s*":"高兴", "干chai": "干柴", "勾yin":"勾引", "gu[oò]ch[ée]ng":"过程", "gu[āa]n\\s*x[iì]":"关系", "g[ǎa]nji[àa]o":"感觉", "国wu院":"国务院", "gù\\s*yì\\s*":"故意", "guofen":"过分",
    "hā\\s*hā\\s*":"哈哈", "h[aǎ]ode":"好的", "hù士":"护士", "há'guó":"韩国", "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "h[ǎa]oxi[àa]ng":"好像", "hu[áa]ngs[èe]":"黄色", "皇d[ìi]":"皇帝", "昏昏yu睡":"昏昏欲睡", "回dang":"回荡", "huí\\s*qù\\s*":"回去", "hé\\s*shì\\s*":"合适",
    "jian(臣|细)":"奸$1", "jiànmiàn":"见面", "jian货":"贱货", "jing察":"警察", "j[ìi]nháng":"进行", "jīng\\s*guò":"经过", "ji烈":"激烈", "j[iì](nv|女)": "妓女", "jirou": "鸡肉", "ji者":"记者", "jì\\s*xù\\s*":"继续", "ju花":"菊花","j[īi]动":"激动", "jili[èe]":"激烈", "肌r[òo]u":"肌肉","ji射":"激射", "ji[ēe]ch[uù]":"接触", "jiù\\s*shì":"就是", "j[ùu]li[èe]": "剧烈", "jǐng惕": "警惕", "节cao":"节操", "浸yin":"浸淫", "jù\\s*jué\\s*":"拒绝",
    "k[ěe]n[ée]ng": "可能", "开bao": "开苞",  "k[àa]o近": "靠近", "口wen":"口吻", "kankan":"看看",
    "ling辱": "凌辱", "luan蛋": "卵蛋", "脸sè": "脸色", "lu出":"露出", "流máng":"流氓", "lun理":"伦理", "lì\\s*qì":"力气",
    "m[ǎa]ny[ìi]":"满意", "m[ǎa]sh[àa]ng":"马上", "m[ée]iy[oǒ]u":"没有", "mei国": "美国", "m[íi]ngb[áa]i":"明白", "迷huan": "迷幻", "mi茫":"迷茫", "mó\\s*yàng":"模样", "m[íi]n\\s{0,2}zh[ǔu]": "民主", "迷jian": "迷奸", "mimi糊糊":"迷迷糊糊", "末(?:\\s|<br/?>)*ì":"末日", "面se":"面色", "mengmeng":"蒙蒙",
    "nàme":"那么", "n[ǎa]o\\s*d[àa]i":"脑袋", "n[ée]ngg[oò]u":"能够", "nán\\s{0,2}hǎi": "那会", "内jian":"内奸", "[内內]y[iī]":"内衣", "内ku":"内裤",
    "pi[áa]o客":"嫖客", "p[áa]ngbi[āa]n":"旁边",
    "q[íi]gu[àa]i":"奇怪", "qing\\s*(ren|人)":"情人", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚", "què\\s*dìng":"确定", "球mi":"球迷", "青chun":"青春", "青lou":"青楼", "qingkuang":"情况", "qiang[　\\s]*jian":"强奸",
    "re\\s*nao":"热闹", "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易", "ru(房|白色)": "乳$1", "rén员":"人员", "rén形":"人形", "人chao":"人潮",  "renmen":"人名",
    "she(门|术|手|程|击)":"射$1", "sudu":"速度", "shuijue":"睡觉", "shide":"是的", "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u": "时候", "sh[ií]me":"什么", "si人":"私人", "shi女":"侍女", "shi身": "失身", "sh[ūu]j[ìi]":"书记", "shu女": "熟女", "shu[　\\s]?xiong":"酥胸", "(?:上|shang)chuang": "上床", "呻y[íi]n": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷", "双xiu": "双修", "生r[ìi]": "生日", "si盐":"私盐", "shi卫":"侍卫", "si下":"私下", "sao扰":"骚扰", "ｓｈｕａｎｇ　ｆｅｎｇ":"双峰",
    "t[uū]r[áa]n":"突然", "tiaojiao": "调教", "偷qing":"偷情", "推dao": "推倒", "脱guang": "脱光", "t[èe]bi[ée]":"特别", "t[ōo]nggu[òo]":"通过", "同ju":"同居", "tian来tian去":"舔来舔去",
    "w[ēe]ixi[ée]":"威胁", "wèizh[ìi]":"位置", "wei员":"委员", "w[èe]nti":"问题", "wèi\\s*dào\\s*":"味道", "wú\\s*nài":"无奈", "weilai":"未来",
    "xiu长": "修长", "亵du": "亵渎", "xing福": "幸福", "小bo":"小波", "小niū":"小妞", "xiong([^a-z])":"胸$1", "小tui":"小腿", "xiàohuà":"笑话", "xiàn\\'zhì":"限制", "xiōng\\s*dì":"兄弟",
    "yì\\s*wài\\s*":"意外", "yin(冷|暗|谋|险|沉|沟|癸派|后)":"阴$1", "y[iī]y[àa]ng":"一样", "y[īi]di[ǎa]n":"一点", "yī\\s*zhèn":"一阵", "y[ǐi]j[īi]ng":"已经", "疑huo":"疑惑", "yí\\s*huò":"疑惑", "影mi":"影迷", "yin荡":"淫荡", "yin贼":"淫贼", "阳w[ěe]i": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "(?:you|诱)(?:惑|huo)": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人", "youshi":"有事", "you\\s*xiu":"优秀", "御yòng":"御用", "旖ni":"旖旎", "yu念":"欲念", "you敌深入":"诱敌深入", "影she":"影射", "牙qian":"牙签", "一yè情":"一夜情",
    "z[iì]j[iǐ]": "自己","z[ìi](?:\\s|<br/?>|&nbsp;)*y[oó]u": "自由","zh[iī]d?[àa]u?o":"知道", "zixin":"自信", "zhì'fú":"制服", "zha药": "炸药", "zhan有": "占有", "zhè\\s*gè":"这个", "政f[ǔu]": "政府", "zh[èe]ng\\s{0,2}f[uǔ]": "政府", "zong理":"总理", "zh[ōo]ngy[āa]ng": "中央", "中yang":"中央", "zu[oǒ]\\s*y[oò]u":"左右", "zhǔ\\s*dòng":"主动", "zh[oō]uw[ée]i":"周围", "中nan海":"中南海", "中j委":"中纪委", "中zu部":"中组部", "政zhi局":"政治局", "(昨|一|时|余)(?:<br/?>|&nbsp;|\\s)*ì":"$1日", "照she":"照射", "zhǔn\\s*bèi\\s*":"准备",

    "</p>\\n<p>\\s*ì":"日",
};

// 单字替换，可能会误替换，所以需要特殊处理
(function(){
    var oneWordReplace = {
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
        "rén":"人", "rì": "日", "rǔ": "乳",
        "sāo":"骚", "sǎo": "骚", "sè": "色",  "shā": "杀", "shēn":"呻", "shén":"神", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥",
        "tān":"贪", "tiǎn": "舔", "tǐng":"挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "tiáo":"调", "tài":"态",
        "wēn": "温", "wěn": "吻",
        "xiǎo":"小", "xìng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴",  "xuan":"宣",
        "yāng":"央", "yàn":"艳", "yīn":"阴", "yào": "药", "yé": "爷", "yòu": "诱", "zàng": "脏", "yù": "欲", "yín": "淫",
        "zhēn":"针", "zēn":"针", "zhà":"炸", "zhèng":"政", "zǒu": "走", "zuì":"罪", "zuò":"做", "zhōng":"中",

        "ri":"日", "se":"色", "yu":"欲", "xing":"性",
        "jing":"精", "ting":"挺",
    };

    for (var prop in oneWordReplace) {
        Rule.replace['([^a-z\\s])' + prop + '(?![a-z\\s])'] = '$1' + oneWordReplace[prop];
    }

    var replaceOthers = {
        // ===误替换还原===
        "碧欲": "碧玉", "美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉",
        "品性": "品行", "德性": "德行",
        "波ok": "book", "波SS": "BOSS",

        // ===其他修正===
        "弥俩": "你俩",
        "妳": "你",
        "圞|垩|卝|龘":""
    };

    $.extend(Rule.replace, replaceOthers);
})();


// 自定义的
Rule.customRules = [];
Rule.customReplace = {};

Rule.parseCustomReplaceRules = function(str) {
    var arr = str.split(/\n/);
    var rules = {};
    _.each(arr, function(b) {
        var pos = b.indexOf('=');
        if (pos === -1) return;

        var key = b.substring(0, pos),
            value = b.substring(pos + 1, b.length);
        rules[key] = value;
    });
    return rules;
};
