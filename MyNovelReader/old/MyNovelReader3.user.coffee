`
// ==UserScript==
// @id             mynovelreader@ywzhaiqi@gmail.com
// @name           My Novel Reader
// @version        3.0
// @namespace      ywzhaiqi@gmail.com
// @author         ywzhaiqi
// @description    小说清爽阅读脚本。
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          unsafeWindow
// @updateURL      https://userscripts.org/scripts/source/165951.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165951.user.js
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @require        http://underscorejs.org/underscore-min.js

// @include        http://read.qidian.com/*,*.aspx
// @include        http://www.qdmm.com/BookReader/*,*.aspx
// @include        http://chuangshi.qq.com/read/bookreader/*.html
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

// 百度搜索等其它网站
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
// @include        http://www.zzzcn.com/modules/article/reader.php*
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

// @run-at         document-end
// ==/UserScript==`

APP_NAME = "MyNovelReader"  # 改了会有问题
READER_AJAX = "novelreader-ajax"  # 为 内容中ajax的 className

if window.name == "#{APP_NAME}-iframe"
    window.scroll window.scrollX, 99999    # 滚动到底部,针对,某些使用滚动事件加载图片的网站.
    window.parent.postMessage "#{APP_NAME}-iframe:DOMLoaded", "*"
    return

prefs =
    debug: true
    booklinkme: true                # booklink.me 跳转的自动启动
    BASE_REMAIN_HEIGHT: 1000        # 距离底部多少 px 开始加载下一页
    content_replacements: true      # 小说屏蔽字修复
    fixImageFloats: true            # 图片居中修正

RULE =
    nextSelector: "a:contains('下一页'), a:contains('下一章'), a:contains('下页')"
    prevSelector: "a:contains('上一页'), a:contains('上一章'), a:contains('上页')"
    nextURL_ignore: /index|list|last|end|BuyChapterUnLogin/i    # 忽略的下一页链接，匹配链接
    endNum_regexp: /\/\d+\.html?$|\/wcxs-\d+-\d+\/$/            # 忽略的下一页链接正则

    # 按顺序匹配，匹配到则停止。econtains 完全相等
    indexSelectors: ["a:contains('返回书目')", "a:contains('章节目录')", "a:contains('章节列表')",
        "a:econtains('最新章节')", "a:contains('回目录')","a:contains('回书目')", "a:contains('目 录')", "a:contains('目录')"]

    contentSelectors: ["#bmsy_content", "#bookpartinfo", "#htmlContent", "#chapter_content", "#chapterContent", "#partbody",
        "#article_content", "#BookTextRead", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td", "#TXT", "#zjneirong",
        ".novel_content", ".readmain_inner", ".noveltext", ".booktext",
        "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#content", ".content"]

    contentRemove: "script:not(." + READER_AJAX + "), iframe, a, font[color]"          # 内容移除选择器

    replaceBrs: /(<br[^>]*>[ \n\r\t]*){2,}/gi    # 替换为<p>

SITEINFO = [
    {
        name: "起点文学"
        url: "^http://(www|read)\\.(qidian|qdmm|qdwenxue)\\.com/BookReader/\\d+,\\d+.aspx$"
        titleReg: "小说:(.*?)(?:独家首发)/(.*?)/.*"  # 可选
        titleSelector: ""
        contentSelector: ""
        indexSelector: ""
        prevSelector: ""
        nextSelector: ""
        contentReplace: "起点中文网 www.qidian.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在起点原创！"
        fixPinyin: false
        contentPatch: (fakeStub) ->
            fakeStub.find('div#content script:first').addClass('novelreader-ajax')
    }, {
        name: "纵横中文网"
        url: "^http://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$"
        titleReg: /(.*?)-(.*)/
        fixPinyin: false
        contentPatch: (fakeStub) ->
            fakeStub.find('.watermark').remove()
    }, {
        name: "创世中文网"
        url: "^http://chuangshi\\.qq\\.com/read/bookreader/\\d+\\.html$"
        contentSelector: ".bookreadercontent"
        useiframe: true
        fixPinyin: false
        timeout: 1500  # 如果时间太小，翻到后面几页的时候会找不到内容
        contentPatch: (fakeStub) ->
            fakeStub.find('.bookreadercontent  > p:last').remove()
    }, {
        name: "晋江文学网"  # 标题和底部下一页 会到左边
        url: /^http:\/\/www\.jjwxc\.net\/onebook\.php\S*/
        exampleUrl: "http://www.jjwxc.net"
        titleReg: /《(.*?)》.*ˇ(.*?)ˇ.*/
        indexSelector: ".noveltitle > h1 > a"
        fixPinyin: false
        contentPatch: (fakeStub) ->
            fakeStub.find('h2').remove()
            fakeStub.find('#six_list, #sendKingTickets').parent().remove()
            fakeStub.find("div.noveltext").find("div:first, h1").remove()
    }, {
        name: "手打吧",  # 特殊处理
        url: /^http:\/\/shouda8\.com\/\w+\/\d+\.html/
        contentReplace: /[w\s\[\/\\\(]*.shouda8.com.*|(\/\/)?[全文字]?首发|手打吧|www.shou.*|\(w\/w\/w.shouda8.c\/o\/m 手、打。吧更新超快\)|小说 阅读网 www.xiaoshuoyd .com/ig,
        contentPatch: (fakeStub) ->
            scriptSrc = fakeStub.find('body').html().match(/outputContent\('(.*txt)'\)/)[1]
            scriptSrc = "http://shouda8.com/ajax.php?f=http://shouda8.com/read" + scriptSrc
            fakeStub.find('#content').attr
                "class": 'novelreader-ajax',
                src: scriptSrc
    }, {
        name: "潇湘书院"
        url: /^http:\/\/www\.xxsy\.net\/books\/.*\.html/
        contentSelector: "#detail_list"
        nextSelector: "a[title='阅读下一章节']"
    }, {
        name: "逐浪"
        url: /^http:\/\/book\.zhulang\.com\/.*\.html/
        exampleUrl: "http://book.zhulang.com/234666/606867.html"
        titleReg: /(.*?)-(.*)/
        contentSelector: "#readpage_leftntxt"
        contentPatch: (fakeStub) ->
            title = fakeStub.find(".readpage_leftnzgx a:first").text() + "-" +
                fakeStub.find(".readpage_leftntit").text()
            fakeStub.find('title').html(title)
    }, {
        name: "燃文"
        url: /^http:\/\/www\.ranwen\.cc\/.*\.html$/
        titleReg: /(.*?)-(.*?)-.*/
        contentSelector: "#oldtext"
        contentReplace: /无错不跳字|最快阅读小说大主宰.*|跟我读Ｈ－u－n 请牢记|非常文学|关闭&lt;广告&gt;|w w.*|”娱乐秀”|更多精彩小[说說].*/g
        contentPatch: (fakeStub) ->
            fakeStub.find("#oldtext").find("div[style], script").remove()
    }, {
        name: "燃文小说网"
        url: "http://www\\.ranwenxiaoshuo\\.com/files/article/html/\\d+/\\d+/\\d+\\.html|http://www\\.ranwenxiaoshuo\\.com/\\w+/\\w+-\\d+-\\d+\\.html",
        titleReg: /(.*?)最新章节(.*?)在线阅读.*/
        contentSelector: "#fontsize"
    }, {
        name: "无错小说网"
        url: /^http:\/\/www\.wcxiaoshuo\.com\/wcxs[-\d]+\//
        exampleUrl: "http://www.wcxiaoshuo.com/wcxs-28021-8803615/"
        titleReg: /(.*?)最新章节.*?-(.*?)-.*/,
        titlePos: 1
        nextSelector: "a#htmlxiazhang"
        prevSelector: "a#htmlshangzhang"
        indexSelector: "a#htmlmulu",
        contentSelector: "#htmlContent",
        imageReplace: {
            'ilo-full-src="\\S+\\.jpg" ': "",
            '(<center>)?<?img src..(http://www.wcxiaoshuo.com)?(/sss/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': '$3',
            "/sss/da.jpg": "打", "/sss/maws.jpg": "吗？", "/sss/baw.jpg": "吧？", "/sss/wuc.jpg": "无", "/sss/maosu.jpg": "：“", "/sss/cuow.jpg": "错", "/sss/ziji.jpg": "自己", "/sss/shenme.jpg": "什么", "/sss/huiqub.jpg": "回去", "/sss/sjian.jpg": "时间", "/sss/zome.jpg": "怎么", "/sss/zhido.jpg": "知道", "/sss/xiaxin.jpg": "相信", "/sss/faxian.jpg": "发现", "/sss/shhua.jpg": "说话", "/sss/dajiex.jpg": "大姐", "/sss/dongxi.jpg": "东西", "/sss/erzib.jpg": "儿子", "/sss/guolair.jpg": "过来", "/sss/xiabang.jpg": "下班", "/sss/zangfl.jpg": "丈夫", "/sss/dianhua.jpg": "电话", "/sss/huilaim.jpg": "回来", "/sss/xiawu.jpg": "下午", "/sss/guoquu.jpg": "过去", "/sss/shangba.jpg": "上班", "/sss/mingtn.jpg": "明天", "/sss/nvrenjj.jpg": "女人", "/sss/shangwo.jpg": "上午", "/sss/shji.jpg": "手机", "/sss/xiaoxinyy.jpg": "小心", "/sss/furene.jpg": "夫人", "/sss/gongzih.jpg": "公子", "/sss/xiansg.jpg": "先生", "/sss/penyouxi.jpg": "朋友", "/sss/xiaoje.jpg": "小姐", "/sss/xifup.jpg": "媳妇", "/sss/nvxudjj.jpg": "女婿", "/sss/xondi.jpg": "兄弟", "/sss/lagong.jpg": "老公", "/sss/lapo.jpg": "老婆", "/sss/meimeid.jpg": "妹妹", "/sss/jiejiev.jpg": "姐姐", "/sss/jiemeiv.jpg": "姐妹", "/sss/xianggx.jpg": "相公", "/sss/6shenumev.jpg": "什么", "/sss/cuoaw.jpg": "错", "/sss/fpefnyoturxi.jpg": "朋友", "/sss/vfsjgigarn.jpg": "时间", "/sss/zzhiedo3.jpg": "知道", "/sss/zibjib.jpg": "自己", "/sss/qdonglxi.jpg": "东西", "/sss/hxiapxint.jpg": "相信", "/sss/fezrormre.jpg": "怎么", "/sss/nvdrfenfjfj.jpg": "女人", "/sss/jhiheejeieev.jpg": "姐姐", "/sss/xdifagojge.jpg": "小姐", "/sss/gggugolgair.jpg": "过来", "/sss/maoashu.jpg": "：“", "/sss/gnxnifawhu.jpg": "下午", "/sss/rgtugoqgugu.jpg": "过去", "/sss/khjukilkaim.jpg": "回来", "/sss/gxhigfadnoxihnyy.jpg": "小心", "/sss/bkbskhhuka.jpg": "说话", "/sss/xeieavnfsg.jpg": "先生", "/sss/yuhhfuiuqub.jpg": "回去", "/sss/pdianphua.jpg": "电话", "/sss/fabxianr.jpg": "发现", "/sss/feilrpto.jpg": "老婆", "/sss/gxronfdri.jpg": "兄弟", "/sss/flfaggofng.jpg": "老公", "/sss/tymyigngtyn.jpg": "明天", "/sss/dfshfhhfjfi.jpg": "手机", "/sss/gstjhranjgwjo.jpg": "上午", "/sss/fmgeyimehid.jpg": "妹妹", "/sss/gxgihftutp.jpg": "媳妇", "/sss/cerztifb.jpg": "儿子", "/sss/gfxgigagbfadng.jpg":"下班", "/sss/gstjhranjg.jpg":"下午", "/sss/hjeirerm6eihv.jpg": "姐妹", "/sss/edajihexr.jpg": "大姐", "/sss/wesfhranrrgba.jpg": "上班", "/sss/gfognggzigh.jpg": "公子", "/sss/frurtefne.jpg": "夫人", "/sss/fzagnggfbl.jpg": "丈夫", "/sss/nvdxfudfjfj.jpg": "女婿", "/sss/xdidafnggx.jpg": "相公", "/sss/zenme.jpg": "怎么", "/sss/gongzi.jpg": "公子", "/sss/ddefr.jpg": "",
            ".*ddefr\\.jpg.*|无(?:错|.*cuoa?w\\.jpg.*)小说网不[少跳]字|w[a-z\\.]*om?|.*由[【无*错】].*会员手打[\\s\\S]*": "",
        },
        contentReplace: "无错不跳字|一秒记住.*|全文免费阅读.*|列表|8 9 阅阅 读 网|【 .{1,10} 】"
        contentPatch: (fakeStub) ->
            # 去除内容开头、结尾的重复标题
            title = fakeStub.find("#htmltimu").text().replace(/\s+/, "\\s*")
            content = fakeStub.find("#htmlContent")
            content.find("div[align='center']").remove()
            if title.match(/第\S+章/)
                content.html(content.html().replace(new RegExp(title), "").replace(new RegExp(title), ""))
    }, {
        name: "书迷楼"
        url: /^http:\/\/www\.shumilou\.com\/.*html$/
        titleReg: /(.*) (.*?) 书迷楼/,
        titlePos: 1,
        contentSelector: "#content"
        contentPatch: (fakeStub) ->
            fakeStub.find("#content").find("div.title:last").appendTo(fakeStub.find('body'))
            fakeStub.find("#content").find("div.title, p > b").remove()
    }, {
        name: "冰火中文"
        url: /^http:\/\/www\.binhuo\.com\/html\/[\d\/]+\.html$/
        titleReg: /(.*?)最新章节,(.*?)-.*/,
        # |(www\.)?binhuo\.com  误替换图片？
        contentReplace:
            "冰火中文|冰.火.中文|绿色小说|lvsexs ": "",
            "([^/])www\\.binhuo\\.com": "$1"
        contentPatch: (fakeStub) ->
            fakeStub.find("#BookText").append(fakeStub.find("img.imagecontent"))
    }, {
        name: "百晓生"
        url: /^http:\/\/www\.bxs\.cc\/\d+\/\d+\.html$/
        titleReg: /(.*?)\d*,(.*)/,
        contentReplace: /百晓生文学网|最快阅读小说大主宰，尽在百晓生文学网.*|ww.x.om|欢迎大家来到.*?bxs\.cc|百晓生阅读最新最全的小说.*|百晓生网不少字|站长推荐.*|[\[【].*[\]】]|文字首发|[\[\]\(《].*百晓生.*|百晓生.不跳字|百.晓.生.|关闭.*广告.*|飘天文学|本站域名就是.*|\(.{0,5}小说更快更好.{0,5}\)|(请在)?百度搜索.*/ig
    }, {
        name: "浩奇文学网"
        url: /^http:\/\/www\.haoqi99\.com\/.*\.shtml$/
    }, {
        name: "书河小说网",
        url: /^http:\/\/www\.shuhe\.cc\/\d+\/\d+/
        contentSelector: "#TXT"
        contentReplace: /\(书河小说网.*|wxs.o|ww.x.om|[\[【\(].{1,30}[\]\)】]|ff37;.*|书河小说网高速首发.*|TXT下载|书河小说网|全文阅读|第一书河小说网|百书斋.*|首发来自书河小说网|Www.Shuhe.Cc|本书最新章节/ig
    }, {
        name: "爱收藏"
        url: /http:\/\/www\.aishoucang\.com\/\w+\/\d+\.html/
        contentSelector: "#zhutone"
        contentReplace: /.爱收藏[^<]*/g
    }, {
        name: "追书网"
        url: "^http://www\\.zhuishu\\.net/files/article/html/.*\\.html"
        exampleUrl: "http://www.zhuishu.net/files/article/html/2/2092/866717.html"
        contentSelector: "#content"
        # contentReplace: /www.zhuiSHu.net/ig,
        contentPatch: (fakeStub) ->
            fakeStub.find("#content").find("div.title").appendTo(fakeStub.find("body"))
            fakeStub.find("#content").find("div[class]:not('.divimage'), center, b:contains('最快更新')").remove()
    }, {
        name: "啃书(图)"
        url: /^http:\/\/www\.fkzww\.net\/thread-.*\.html$/
        contentSelector: "#content"
        indexSelector: "#nav a:last"
        fixPinyin: false
        contentPatch: (fakeStub) ->
            $("<div id='content'></div>").append(fakeStub.find(".t_msgfontfix").find("img[width]"))
                .appendTo(fakeStub.find("body"))

            fakeStub.find(".next").attr("href", "")
    }, {
        name: "猪猪岛小说"
        url: "http://www\\.zhuzhudao\\.com/txt/"
        contentReplace: /[“"”]?猪猪岛小说.*|[Ｗw]*.ZhuZhuDao.com.*/ig
    }, {
        name: "17k小说网"
        url: /^http:\/\/\S+\.17k\.com\/chapter\/\S+\/\d+\.html$/
        titleReg: /(.*?)-(.*?)-.*/,
        contentPatch: (fakeStub) ->
            fakeStub.find('xscript, #hotRecommend, .ct0416, .recent_read').remove()
    }, {
        name: "看下文学"
        url: "^http://www\\.kanxia\\.net/k/\\d*/\\d+/\\d+\\.html$"
        titleReg: /(.*?)-(.*)TXT下载_看下文学/,
        contentReplace: /(?:看下文学|www.kanxia.net)/g
    }, {
        name: "青帝文学网"
        url: /^http:\/\/www\.qingdi\.com\/files\/article\/html\/\d+\/\d+\/\d+\.html$/
        exampleUrl: "http://www.qingdi.com/files/article/html/0/22/3790055.html"
        titleReg: /(.*?)最新章节_(.*?)_青帝文学网_.*/
    }, {
        name: "侠客中文网"
        url: /^http:\/\/www\.xkzw\.org\/\w+\/\d+\.html/
        exampleUrl: "http://www.xkzw.org/xkzw14415/8021095.html"
        contentSelector: ".readmain_inner .cont"
        contentPatch: (fakeStub) ->
            fakeStub.find('title').html(fakeStub.find('.readmain_inner h2').text())
    }, {
        name: "ChinaUnix.net"
        url: /^http:\/\/bbs\.chinaunix\.net\/thread-.*\.html/
        exampleUrl: "http://bbs.chinaunix.net/thread-4065291-1-1.html"
        contentSelector: ".t_f:first"
    }, {
        name: "123du 小说"
        url: /^http:\/\/www\.123du\.net\/.*\.html/
        contentSelector: "#content"
        contentPatch: (fakeStub) ->
            content = fakeStub.find("#DivContentBG").html().match(/第\d*页([\s\S]*)一秒记住/)[1]
            $('<div id="content"/>').html(content).appendTo(fakeStub.find('body'))
    }, {
        name: "动力中文"
        url: "^http://dlzw\\.cc/article.*\\.html"
        exampleUrl: "http://dlzw.cc/article-72-1.html"
        nextSelector: "span:contains('下一篇') > a"
        prevSelector: "span:contains('上一篇') > a"
        indexSelector: "#pt a[href^='http']"
    }, {
        name: "塔读文学"
        url: "^http://www\\.tadu\\.com/book/\\d+/\\d+/"
        exampleUrl: "http://www.tadu.com/book/356496/191/"
        titleReg: /(.*?),(.*?),/,
        contentSelector: "#partContent"
        contentPatch: (fakeStub) ->
            m = fakeStub.find("body").html().match(/\.html\(unescape\("(.*)"\)/)
            if m and m[1]
                fakeStub.find("#partContent").html(unescape(m[1]))
    }, {
        name: "第一中文"
        url: "^http://www\\.dyzww\\.com/cn/\\d+/\\d+/\\d+\\.html$"
        contentReplace: {
            '<img.*?ait="(.*?)".*?>': "$1"
            'www\\.dyzww\\.com.*|♂|шШщ.*': ""
        }
    }, {
        name: "16K小说网"
        url: "^http://www\\.16kbook\\.org/Html/Book/\\d+/\\d+/\\d+\\.shtml$"
        contentReplace: {
            '(<center>)?<?img src..(http://www.16kbook.org)?(/tu/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': "$3"
            "/tu/shijie.jpg":"世界", "/tu/xiangdao.jpg":"想到", "/tu/danshi.jpg":"但是", "/tu/huilai.jpg":"回来", "/tu/yijing.jpg":"已经", "/tu/zhende.jpg":"真的", "/tu/liliang.jpg":"力量", "/tu/le.jpg":"了", "/tu/da.jpg":"大", "/tu/shengli.jpg":"胜利", "/tu/xiwang.jpg":"希望", "/tu/wandan.jpg":"完蛋", "/tu/de.jpg":"的"
            "16kbook\\s*(首发更新|小说网)": ""
        }
    },
    {
        url: "http://www.laishuwu.com/html/5/5802/2178429.html"
        contentReplace: "txt\\d+/"
    },
    {
        url: "http://www.wanshuba.com/Html/\\d+/\\d+/\\d+\\.html"
        indexSelector: "#mulu"
    }, {
        name: "顶点小说"
        url: "^http://www\\.23us\\.com/html/\\d+/\\d+/\\d+\\.html$"
        titleReg: "(.*?)-\\S*\\s(.*?)-顶点小说",
        indexSelector: "#footlink a:contains('返回目录')"
        prevSelector: "#footlink a:contains('上一页')"
        nextSelector: "#footlink a:contains('下一页')"
        contentSelector: "#contents"
        contentReplace: " \\(看小说到顶点小说网.*\\)"
        contentPatch: (fakeStub) ->
            temp = fakeStub.find('title').text()
            realtitle = temp.replace(/第.*卷\s/,'')
            fakeStub.find('title').html(realtitle)
    }, {
        name: "读读看"
        url: "^http://www\\.dudukan\\.net/html/.*\\.html$"
        contentReplace: "看小说“就爱读书”|binhuo|www\\.92to\\.com"
        useiframe: true
        timeout: 800  # 为0则没法正确加载内容
    }, {
        url: "^http://www\\.92to\\.com/\\w+/\\w+/\\d+\\.html$"
        useiframe: true
        timeout: 500
        contentReplace: "看小说.就爱.*"
    }, {
        url: "http://www\\.shushuw\\.cn/shu/\\d+/\\d+\\.html"
        useiframe: true
        timeout: 500
        contentReplace: "！~！[\\s\\S]*"
    }, {
        url: "http://www\\.zhaoxiaoshuo\\.com/chapter-\\d+-\\d+-\\w+/"
        useiframe: true
        timeout: 500
    }, {
        name: "哈哈文学"
        url: /^http:\/\/www.hahawx.com\/.*htm/
        titleReg: /(.*?)-(.*?)-.*/,
        contentSelector: "#chapter_content"
        contentReplace: /wWw.66c.com|(ｗｗｗ|ｂｏｏｋ).*(ｃｏｍ|ｎｅｔ)|www[a-z\.]*|全文字阅读|无弹窗广告小说网|哈哈文学\(www.hahawx.com\)|souDU.org|Ｓｏｕｄｕ．ｏｒｇ/ig
        contentPatch: (fakeStub) ->
            content = fakeStub.find("#chapter_content")
            m = content.find("script").text().match(/output\((\d+), "(\d+\.txt)"\);/)
            if m && m.length == 3
                aid = m[1]
                files = m[2]
                subDir = "/" + (Math.floor(aid / 1000) + 1)
                subDir2 = "/" + (aid - Math.floor(aid / 1000) * 1000)
                url = "http:\/\/r.xsjob.net\/novel" + subDir + subDir2 + "/" + files
                content.attr({
                    class: "novelreader-ajax",
                    src: url,
                    charset: "gbk"
                })
    }, {
        name: "3Z中文网"
        url: "^http://www\\.zzzcn\\.com\\/(3z\\d+/\\d+\\/|modules\\/article\\/reader\\.php\\?aid=\\d+&cid=\\d+){1}$"
        contentSelector: "#content3zcn"
        indexSelector: "a:contains('返回目录')"
        prevSelector: "a:contains('上 一 页')"
        nextSelector: "a:contains('下 一 页'), a:contains('返回书架')"
        contentPatch: (fakeStub) ->
            fakeStub.find("a:contains('返回书架')").html("下 一 页").attr("href", fakeStub.find("a:contains('返回目录')").attr("href"))
            fakeStub.find("#content3zcn").find(".titlePos, font.tips").remove()
    }
]

CSS = """
    /**
     * 下面的皮肤根据 defpt 的修改而来
     */
    body {background:#EEE;}
    .chapter-head {
        background-image: linear-gradient(#DDD, #CCC);
        font-family:"Microsoft YaHei UI",微软雅黑,新宋体,宋体,arial;
        text-align:center;
        font-size:1.2em;
        color:black;
        text-shadow: silver 0px 0px 1px;
        margin-bottom:3px;
        padding-bottom:3px;
    }
    .content {
        font-family:"Microsoft YaHei UI",微软雅黑,新宋体,宋体,arial;
        line-height:1.75;
        max-width:850px;
        margin-top:15px;
        margin-left:auto;
        margin-right:auto;
        font-size:1.2em;
        text-indent: 2em;
    }
    .content img.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}
    .chapter-head-nav{
        display:none;
    }
    .chapter-footer-nav{
        text-align:center;
        font-size:0.9em;
        margin:-10px 0px 30px 0px;
    }
"""

CSS_BUTTON = """
"""

REPLACEMENTS =  # 小说拼音字、屏蔽字修复
    # ===格式整理===
    # "\\(|\\[|\\{|（|【|｛":"（",
    # "\\)|\\]|\\}|）|】|｝":"）",
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

    # ===星号屏蔽字还原===
    "十有(\\*{2})":"十有八九", "\\*(2)不离十":"八九不离十",
    "G(\\*{2})":"GSM", "感(\\*{2})彩":"感情色彩",
    "强(\\*{2})u5B9D":"强大法宝",

    # ===双字替换，需特殊处理？===
    "暧me[iì]":"暧昧",
    "b[ěe]i(\\s|&nbsp;)*j[īi]ng":"北京","半shen": "半身", "b[ìi]j[ìi]ng":"毕竟",
    "chongdong":"冲动", "缠mian": "缠绵", "成shu": "成熟", "赤lu[oǒ]": "赤裸", "春guang": "春光",
    "dang校": "党校", "da子": "鞑子", "diao丝": "屌丝", "d[úu]\\s{0,2}l[ìi]": "独立", "d?[iì]f[āa]ng":"地方", "d[ìi]d[ūu]":"帝都", "du\\s{0,2}c[áa]i":"独裁",
    "f[ǎa]ngf[óo]":"仿佛", "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "f[èe]nn[ùu]":"愤怒",
    "gao潮": "高潮", "干chai": "干柴", "gu[oò]ch[ée]ng":"过程", "gu[āa]nx[iì]":"关系", "g[ǎa]nji[àa]o":"感觉", "国wu院":"国务院",
    "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "h[ǎa]oxi[àa]ng":"好像", "hu[áa]ngs[èe]":"黄色",
    "j[ìi]nháng":"进行", "jinv": "妓女", "jirou": "鸡肉", "ji者":"记者", "ju花":"菊花","j[īi]动":"激动", "jili[èe]":"激烈", "肌r[òo]u":"肌肉","ji射":"激射", "ji[ēe]ch[uù]":"接触", "j[ùu]li[èe]": "剧烈",
    "k[ěe]n[ée]ng": "可能", "开bao": "开苞",  "k[àa]o近": "靠近",
    "ling辱": "凌辱", "luan蛋": "卵蛋",
    "m[ǎa]ny[ìi]":"满意", "m[ǎa]sh[àa]ng":"马上", "m[ée]iy[oǒ]u":"没有", "mei国": "美国", "m[íi]ngb[áa]i":"明白", "迷huan": "迷幻", "m[íi]n\\s{0,2}zh[ǔu]": "民主",
    "n[àa]me":"那么", "n[ée]ngg[oò]u":"能够",
    "pi[áa]o客":"嫖客", "p[áa]ngbi[āa]n":"旁边",
    "q[íi]gu[àa]i":"奇怪", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚",
    "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易",
    "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u": "时候", "sh[ií]me":"什么", "shi身": "失身", "sh[ūu]j[ìi]":"书记", "shu女": "熟女", "上chuang": "上床", "呻y[íi]n": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷", "双xiu": "双修",
    "t[uū]r[áa]n":"突然", "tiaojiao": "调教", "推dao": "推倒", "脱guang": "脱光", "t[èe]bi[ée]":"特别", "t[ōo]nggu[òo]":"通过",
    "w[ēe]ixi[ée]":"威胁", "wèizh[ìi]":"位置",
    "亵du": "亵渎", "xing福": "性福", "xiu长": "修长",
    "y[iī]y[àa]ng":"一样", "y[īi]di[ǎa]n":"一点", "y[ǐi]j[īi]ng":"已经", "阳w[ěe]i": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "you惑": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人","旖ni":"旖旎", "yu念":"欲念",
    "z[iì]j[iǐ]": "自己","z[ìi]\\s*you": "自由","zh[iī]d?[àa]u?o":"知道","zha药": "炸药", "zhan有": "占有", "政f[ǔu]": "政府", "zh[èe]ng\\s{0,2}f[uǔ]": "政府", "zong理":"总理", "zhōngy[āa]ng": "中央", "中yang":"中央", "zu[oǒ]y[oò]u":"左右", "zh[oō]uw[ée]i":"周围", "中nan海":"中南海", "中j委":"中纪委",

    # ===单字替换，需特殊处理，防止替换图片===
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
    "r[ìi]": "日", "rǔ": "乳",
    "sāo":"骚", "sǎo": "骚", "sè": "色", "shā": "杀", "shēn":"呻", "shén":"神", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥",
    "tān":"贪", "tiǎn": "舔", "tǐng":"挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "wēn": "温", "wěn": "吻",
    "xiǎo":"小", "x[ìi]ng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴",  "xuan":"宣",
    "yāng":"央", "yàn":"艳", "y[īi]n":"阴", "yào": "药", "yé": "爷", "yòu": "诱", "zàng": "脏", "yù": "欲", "yín": "淫",
    "zhēn":"针", "zēn":"针", "zhà":"炸", "zhèng":"政", "zhi":"治", "zǒu": "走", "zuì":"罪", "zuò":"做", "zhong":"中",

    # ===误替换还原===
    "碧欲": "碧玉","美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉"
    "品性": "品行","德性": "德行"
    "波ok":"book"

    # ===其他修正===
    "n吧":"nba"
    "弥俩": "你俩"
    "妳": "你"
    "圞|垩|卝|龘":""

    # ===去广告===
    "全文字无广告": ""
    "全文字手打": ""
    "uutxt\\.org": ""
    "3vbook\\.cn": ""
    "txt53712/": ""
    "\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"

class Parser
    constructor: (@info = {}, doc) ->
        @doc = $(doc)
        @isTheEnd = false

    parsePage: () ->
        if !@content  #
            @applyPatch()

            @content = @getContent()
            if !@content
                return

        @chapterTitle = @getTitle()

        @indexUrl = @getIndexUrl()

        @prevUrl = @getPrevUrl()

        @nextUrl = @getNextUrl()

    applyPatch: ->
        patchFunc = @info.contentPatch
        if not patchFunc
            return

        try
            patchFunc(@doc)
            debug "  补丁应用成功"
        catch e
            debug "  补丁应用出错", e

    getTitle: ->
        docTitle = @doc.find("title").text()

        if @info.titleSelector
            chapterTitle = $doc.find(@info.titleSelector).text()

        # 兼容 Rabbook 的 正则获取标题
        if @info.titleReg
            m = docTitle.match(toRE(@info.titleReg))
            if m and m.length is 3
                titlePos = ( @info.titlePos || 0 ) + 1
                chapterPos = if titlePos is 1 then 2 else 1

                # bookTitle = m[titlePos].trim()
                chapterTitle = m[chapterPos].trim()

        if !chapterTitle
            chapterTitle = @autoGetTitle(@doc[0])

        debug "  找到标题：", chapterTitle

        # 标题间增加一个空格
        return chapterTitle.replace(/^(第?\S+?[章节卷回])(.*)/, "$1 $2")

    autoGetTitle: (doc = document)->  # 智能获取标题
        _main_selector = "#TextTitle, #title, .ChapterName"
        _second_selector = "h1, h2, h3"
        _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/
        _negative_regepx = /[上下]一章/
        _title_remove_regexp = /最新章节/
        _document_title = doc.title
        _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' '

        # 特殊的直接返回
        _headings = doc.querySelectorAll _main_selector
        if _headings.length == 1
            debug("    main selector", _headings[0])
            return _headings.text().trim()

        # 通过得分获取标题
        possibleTitles = {}
        _headings = doc.querySelectorAll _second_selector
        for _heading in _headings
            _heading_text = _heading.textContent.trim()
            continue if _heading_text of possibleTitles

            debug("    开始计算", _heading_text, "的得分")

            # h1 数值为 1， h2 数值为 2
            nodeNum = parseInt(_heading.nodeName.slice(1), 10) || 0
            score = 10 / nodeNum
            _heading_words = _heading_text.replace(/\s+/g, " ").split(" ")

            debug("    节点类型得分:" + score)

            score += 50 if _positive_regexp.test(_heading_text)
            score -= 100 if _negative_regepx.test(_heading_text)

            debug("    符合正则计算后得分：", score);

            # count words present in title
            _matched_words = ""
            for word in _heading_words
                _matched_words += word + " " if _search_document_title.indexOf(word) > -1

            score += _matched_words.length * 1.5
            debug "    跟页面标题比较后得分：", score

            _heading_style = window.getComputedStyle(_heading, null)
            if _heading_style
                _font_size_text = _heading_style.getPropertyValue("font-size") || 0
                _font_size = parseInt(_font_size_text, 10)
            else
                _font_size = 0

            score +=  _font_size * 1
            debug("    计算大小后得分", score)

            possibleTitles[_heading_text] = score

        # 找到分数最高的值
        topScore = 0
        for title, score of possibleTitles
            if score > topScore
                topScore = score
                chapterTitle = title

        if not chapterTitle
            chapterTitle = _document_title.replace(/\s-\s.*/i, "")
                .replace(/_[^\[\]【】]+$/, "")
                .replace(_title_remove_regexp, "")

        chapterTitle = chapterTitle.replace(/^章节目录/, "")

        return chapterTitle

    getIndexUrl: ->
        if @info.indexSelector
            links = @doc.find(@info.indexSelector)
        else
            for selector in RULE.indexSelectors
                links = @doc.find(selector)
                if links.length
                    break

        if links.length
            url = @getLinksHref(links)
            debug "目录链接", url
        else
            debug "无法找到目录链接"
        return url || ""

    getPrevUrl: ->
        selector = @info.prevSelector || RULE.prevSelector

        links = @doc.find(selector)
        if links.length
            url = @getLinksHref(links)
            debug "上一页链接", url
        else
            debug("无法找到上一页链接")

        return url || ""

    getNextUrl: ->
        selector = @info.nextSelector || RULE.nextSelector

        links = @doc.find(selector)
        if links.length
            url = @getLinksHref(links)
            if @isNextUrlValid(url)
                debug "下一页链接", url
            else
                url = null
                @isTheEnd = true
                debug "下一页链接无效，已忽略"
        else
            debug("无法找到下一页链接")

        return url

    getLinksHref: (links) ->  # 检验链接
        for link in links
            if link.textContent.length >= 10
                continue

            href = link.getAttribute("href")
            if href.startsWith("#") || href.startsWith("javascript:")
                continue

            ahref = link.href

            return ahref

    isNextUrlValid: (url) ->
        if url in ["", @indexUrl, @prevUrl, @curPageUrl]
            return false

        if RULE.nextURL_ignore.test(url) || /book\.zongheng\.com\/readmore/.test(url)
            return false

        if RULE.endNum_regexp.test(@prevURL) && !RULE.endNum_regexp.test(url)
            return false

        return true

    getContent: ->
        if @info.contentSelector
            contents = @doc.find(@info.contentSelector)
        else
            for selector in RULE.contentSelectors
                contents = @doc.find(selector)
                if contents.length
                    debug "  自动找到内容选择器：", selector
                    break

        # 新增多内容获取
        if contents.length
            html = @handleContent(contents)
        else
            debug("  内容获取失败", @info.contentSelector, @doc)

        return html

    handleContent: (contents) ->
        if typeof contents == 'string'
            text = contents
        else
            # 全局移除
            contents.find(RULE.contentRemove).remove()
            text = contents.html()

        # 去除开头的 <br>
        # text = text.replace /<br\/?>/, ""

        # 第一段的文字改为 p
        text = text.replace /^(?:\s|&nbsp;)*/, "<p>"

        # 去除段落开头的 &nbsp;
        text = text.replace />(?:\s|&nbsp;)+/g, ">"

        # text = text.replace(/<p>\s+/gi, '<p>');

        # Turn all double br's into p's
        text = text.replace RULE.replaceBrs, "</p>\n<p>"

        # 有替换图片的链接则提前处理
        if @info.imageReplace
            for key, replace of @info.imageReplace
                text = text.replace toRE(key, "ig"), replace

        # 先提取出 img 等 html 元素
        elems = {}
        i = 0
        text = text.replace /<[^>]*>/g, (str) ->
            name = "_" + (i++)
            elems[name] = str
            return "<%= " + name + " %>"

        if @info.fixPinyin or @info.fixPinyin == undefined
            text = @fixPinyin(text)

        if @info.contentReplace
            text = text.replace toRE(@info.contentReplace, "ig"), ""

        # 还原
        text = _.template(text, elems)

        debug "  内容处理成功"

        return text

    fixPinyin: (text) ->
        s = new Date().getTime()

        for replace, result of REPLACEMENTS
                text = text.replace new RegExp(replace, "ig"), result

        debug("  小说屏蔽字修复耗时：" + (new Date().getTime() - s) + 'ms')

        return text

App =
    parsedPages: {}
    tpl_content: """
        <div class="chapter-head"><%= chapterTitle %></div>
        <div class="chapter-head-nav">
                 <a href="<%= prevUrl %>"><<上一页</a> |
                <a href="<%= indexUrl %>">目录</a> |
                <a href="<%= nextUrl %>">下一页>></a>
        </div>
        <div class="content"><%= content %></div>
        <div class="chapter-footer-nav">
                <a class="prev-page" href="<%= prevUrl %>"><<上一页</a> |
                <a class="index-page" href="<%= indexUrl %>">目录</a> |
                <a class="next-page"
                    <% if (nextUrl) { %>
                        href="<%= nextUrl %>"
                    <% } else { %>
                        href="javascript:void(0)"
                        style="color:#666666"
                    <% } %>
                    >下一页>></a>
        </div>
    """,

    init: (MY_SITEINFO = [])->
        debug "开始运行"
        siteinfos = MY_SITEINFO.concat(SITEINFO)
        @info = _.find(siteinfos, (v)-> toRE(v.url).test(location.href))
        if @info
            debug "找到站点规则（共 #{siteinfos.length} 个）", @info
        else
            @info = {}
            debug "没有找到站点规则，共查找规则 #{siteinfos.length} 个。开始自动尝试"

        setting = localStorage.getItem(APP_NAME) || {}
        debug "读取本地设置", setting

        other_enable = true

        if setting.enable or other_enable
            @processPage()
        else
            App.UI.addButton()

    processPage: ->
        debug "开始解析页面"
        @parser = new Parser(@info, document)
        @parser.parsePage()
        if @parser.content
            @parsedPages[window.location.href.replace(/\/$/, '')] = true
            @prepDocument()
            @addListener()

            App.UI.addStyle()
            App.UI.addButton()

            @fixMobile()
            @fixPage()

            @requestUrl = @parser.nextUrl
            @isTheEnd = @parser.isTheEnd

            document.body.innerHTML = _.template("<div id='wrapper'>#{@tpl_content}</div>", @parser)

            window.name = APP_NAME
            document.body.setAttribute("name", APP_NAME)

            @scroll()
        else
            App.UI.notice("内容没有找到，自动退出")
            debug "内容没有找到，自动退出"

    toggle: ->

    # 未完成
    createMainIframe: ->
        $("html").css
            "overflow-y": "hidden"

        @iframe_main = $("<iframe>").attr
                name: "#{APP_NAME}-iframe"
                frameBorder: "0"
                scrolling: "autp"
                allowtransparency: "true"
            .css
                top: "0px"
                left: "0px"
                width: "100%"
                height: "100%"
                "min-height": "100%"
                position: "absolute"
                "z-index": "2147483647 !important"
            .appendTo $("body")

        # setTimeout =>
        #     doc = @iframe_main[0].contentDocument
        #     body = doc.body

        #     _cssElement = doc.createElement "style"
        #     _cssElement.setAttribute "type", "text/css"
        #     _cssElement.style.cssText = CSS

        #     bodyHTML = _.template("<div id='wrapper'>#{@tpl_content}</div>", @parser)

        #     body.appendChild(_cssElement)
        #     body.innerHTML = bodyHTML

    prepDocument: ->
        window.onload = window.onunload = ->

        # 破解右键限制
        doc = document
        bd = doc.body
        bd.onclick = bd.onselectstart = bd.oncopy = bd.onpaste = bd.onkeydown = bd.oncontextmenu = bd.onmousemove = bd.onselectstart = bd.ondragstart = doc.onselectstart = doc.oncopy = doc.onpaste = doc.onkeydown = doc.oncontextmenu = null
        doc.onclick = doc.ondblclick = doc.onselectstart = doc.oncontextmenu = doc.onmousedown = doc.onkeydown = ->
            return true

        wrap = document.wrappedJSObject || document
        wrap.onmouseup = wrap.onmousedown = wrap.oncontextmenu = null

        arAllElements = document.getElementsByTagName('*')
        for elmOne in arAllElements
            wrap = elmOne.wrappedJSObject || elmOne
            wrap.onmouseup = wrap.onmousedown = null

        # remove body style
        $('link[rel="stylesheet"], style').remove()
        $('*').removeAttr('style')
        $('body').removeAttr('bgcolor')

        debug "预处理页面成功"

    addListener: ->
        $(document).bind
            "dblclick": @pauseHander.bind(this)
            "scroll": @scroll.bind(this)

        # document.addEventListener("dblclick", this, false)
        # document.addEventListener("scroll", this, false)
        debug "添加事件成功"

    removeListener: ->
        $(document).unbind()
        @iframe_page.unbind() if @iframe_page

        debug "移除事件成功"

    pauseHander: ->
        @paused = !@paused
        if @paused
            App.UI.notice '<b>状态</b>:自动翻页<span style="color:red;"><b>暂停</b></span>.'
        else
            App.UI.notice '<b>状态</b>:自动翻页<span style="color:red;"><b>启用</b></span>.'
            @scroll()

    scroll: ->
        scrollHeight = Math.max(document.documentElement.scrollHeight,
                                document.body.scrollHeight)
        remain = scrollHeight - window.innerHeight - window.scrollY

        if !@paused && remain < prefs.BASE_REMAIN_HEIGHT
            @doRequest()

        if @isTheEnd
            if @isEndNoticed
                if remain > 50
                    App.UI.noticeDiv.hide()
                    @isEndNoticed = false
            else if remain < 20
                App.UI.notice("已到达最后一页...", false)
                @isEndNoticed = true

    doRequest: ->
        if @requestUrl and @requestUrl not of @parsedPages

            App.UI.notice("正在加载下一页中...", false)

            if @info.useiframe
                @iframeRequest()
            else
                @httpRequest()

            @requestUrl = null
            @parsedPages[@request] = true

    httpRequest: ->
        debug "httpRequest: #{@requestUrl}"

        GM_xmlhttpRequest
            url: App.requestUrl,
            method: "GET",
            overrideMimeType: "text/html;charset=" + document.characterSet,
            onload: (res) ->
                doc = parseHTML res.responseText
                App.httpLoaded.apply App, [doc]

    iframeRequest: ->
        debug "iframeRequest: #{@requestUrl}"
        if not @iframe_page
            @iframe_page = $("<iframe>").attr
                name: "#{APP_NAME}-iframe"
                width: "100%"
                heigth: "0"
                frameBorder: "0"
                src: App.requestUrl
            .css
                cssText: "
                    margin:0!important;
                    padding:0!important;
                    visibility:hidden!important;
                "
            .bind "load", @iframeLoaded
            .appendTo $("body")
        else
            @iframe_page[0].contentDocument.location.replace(@requestUrl)

    iframeLoaded: ->
        iframe = this;
        body= iframe.contentDocument.body
        if body && body.firstChild
            timeout = (reader.site && reader.site.timeout) || 0

            setTimeout =>
                doc = iframe.contentDocument
                win = iframe.contentWindow || doc

                App.loaded(doc)
            , timeout

    httpLoaded: (doc) ->
        # 特殊的r如 qidian 需要二次获取内容
        parser = new Parser(App.info, doc)
        parser.applyPatch()

        $doc = parser.doc
        ajaxScript = $doc.find('.' + READER_AJAX)
        if App.info and ajaxScript.length
            url = ajaxScript.attr('src')
            charset = (ajaxScript.attr('charset') || 'utf-8')
            if !url
                return debug "错误：ajaxScript 没有 src"

            GM_xmlhttpRequest
                url: url,
                method: "GET",
                overrideMimeType: "text/html;charset=" + charset,
                onload: (res) ->
                    text = res.responseText.replace(/document.write(ln)?\('/, "")
                        .replace(/'\);/, "")
                    parser.content = parser.handleContent(text)
                    App.loaded(null, parser)

            debug "  内容特殊处理 Ajax: #{url}. charset: #{charset}"
        else
            App.loaded(doc)

    loaded: (doc, parser)->
        if !parser
            parser = new Parser(@info, doc)

        parser.parsePage()

        if parser.content
            content = _.template(@tpl_content, parser)
            $(content).appendTo($('#wrapper'))

            @requestUrl = parser.nextUrl
            @isTheEnd = parser.isTheEnd

            # history.pushState(null, parser.docTitle, parser.curPageUrl)
        else
             @isTheEnd = true

        App.UI.noticeDiv.hide()

    fixMobile: ->  # 自适应网页设计
        $("<meta name='viewport' content='width=device-width, initial-scale=1'>")
            .appendTo($("head"))

    fixPage: ->
        # 再次移除其它不相关的元素。主要是起点中文有时候有问题
        if window.location.hostname == "read.qidian.com"
            setTimeout ->
                $('body > *:not("#wrapper, .readerbtn, #reader-notice")').remove()
            , 3000

        setTimeout =>
            @fixImageFloats()
        , 500

    fixImageFloats: ->
        return unless prefs.fixImageFloats

App.UI =
    addButton: ->
        @addButtonStyle() unless @buttonStyle
        # App.processPage()

    addStyle: ->
        GM_addStyle(CSS)

    addButtonStyle: ->
        @buttonStyle = GM_addStyle(CSS_BUTTON)

    notice: (html_txt, autoClose)->
        if !@noticeDiv
            @noticeDiv = $("<div>").attr
                id: APP_NAME + "-notice"
            .css
                cssText: '
                    position:fixed!important;
                    z-index:2147483647!important;
                    float:none!important;
                    width:auto!important;
                    height:auto!important;
                    font-size:13px!important;
                    padding:3px 20px 2px 5px!important;
                    background-color:#7f8f9c!important;
                    border:none!important;
                    color:#000!important;
                    text-align:left!important;
                    left:0!important;
                    bottom:0!important;
                    opacity:0;
                    -moz-border-radius:0 6px 0 0!important;
                    border-radius:0 6px 0 0!important;
                    -o-transition:opacity 0.3s ease-in-out;
                    -webkit-transition:opacity 0.3s ease-in-out;
                    -moz-transition:opacity 0.3s ease-in-out;
                    '
            @noticeDiv.appendTo $("body")
                .click (e) =>
                    @noticeDiv.hide()

        clearTimeout(@noticeDivto)
        clearTimeout(@noticeDivto2)

        @noticeDiv.html(html_txt).css
            display: "block"
            opacity: "0.96"

        if autoClose || typeof autoClose == 'undefined'
            @noticeDivto2 = setTimeout =>
                @noticeDiv.css("opacity", "0")
            , 1666
            @noticeDivto = setTimeout =>
                @noticeDiv.css("display", "none")
            , 2000

        return @noticeDivto


########
## utils
########

debug = if prefs.debug then console.log else ->

toRE = (obj, flag = "") ->
    if obj instanceof RegExp
        obj
    else if obj instanceof Array
        new RegExp(obj[0], obj[1])
    else
        new RegExp(obj, flag)

parseHTML = (responseText) ->
    # For Firefox
    doc = new DOMParser().parseFromString(responseText, "text/html")
    # For Chrome
    if !doc
        doc = document.implementation.createHTMLDocument("")
        doc.querySelector("html").innerHTML = responseText
    return doc


# userData = (unsafeWindow || window).novelreaderUserData
# if userData and userData.MY_SITEINFO
#     @MY_SITEINFO = userData.MY_SITEINFO

App.init()
