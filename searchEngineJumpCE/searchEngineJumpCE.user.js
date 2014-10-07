(function(){
// ==UserScript==
// @name           searchEngineJump 简化改进版
// @author         NLF && ywzhaiqi
// @contributor    ted423
// @description    方便的在各个引擎之间跳转。NLF 修改版，仅适用于 Greasemonkey 或 Tampermonkey 或暴力猴。
// @version        4.1.1.1
// version        4.0.1.0
// @created        2011-7-2
// @namespace      http://userscripts.org/users/NLF
// @homepage       https://github.com/ywzhaiqi/userscript
// homepage       http://userscripts.org/scripts/show/84970
// downloadURL    https://userscripts.org/scripts/source/84970.user.js
// updateURL      https://userscripts.org/scripts/source/84970.meta.js
// include        *
// match          *://*/*

// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @noframes

// @include        /^https?:\/\/(www|encrypted)\.google(stable)?\..{2,9}\/(webhp|search|#|$|\?)(?:.(?!&tbm=))*$/
// @include        /^https?:\/\/wen\.lu\//
// @include        /^https?:\/\/www\.baidu\.com\/(?:s|baidu|)/
// @include        /^https?:\/\/[^.]*\.bing\.com\/search/
// @include        /^https?:\/\/www\.so\.com\/s\?/
// @include        /^https?:\/\/www\.sogou\.com\/(?:web|sogou)/
// @include        /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
// @include        /^https?:\/\/baike\.baidu\.com\/(?:sub)?view\//
// @include        /^https?:\/\/[a-z]{2,3}\.baike\.com\/[a-z]/
// @include        /^https?:\/\/..\.wikipedia\.org\/w\/index\.php(?!.*\?search=%s)/
// @include        /^https?:\/\/(?:en|zh|ja)\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=%s)/
// @include        /^https?:\/\/zhidao\.baidu\.com\/(search|question)/
// @include        /^https?:\/\/www\.zhihu\.com\/search\?/
// @include        /^https?:\/\/wenku\.baidu\.com\/search\?/
// @include        /^https?:\/\/www\.docin\.com\/search\.do/
// @include        /^https?:\/\/www\.soku\.com\/[a-z]/
// @include        /^https?:\/\/www\.bilibili\.com\/search\?/
// @include        /^https?:\/\/www\.acfun\.tv\/search/
// @include        /^https?:\/\/www\.youtube\.com\/results/
// @include        /^https?:\/\/www\.nicovideo\.jp\/search\//
// @include        /^https?:\/\/v\.baidu\.com\/(v|#)/
// @include        /^https?:\/\/video\.so\.com\//
// @include        /^https?:\/\/v\.qq\.com\/search\.html\?/
// @include        /^https?:\/\/.*\.bing\.com\/video/
// @include        /^https?:\/\/so\.iqiyi\.com\/so\/q/
// @include        /^https?:\/\/so\.letv\.com\/s\?/
// @include        /^https?:\/\/so\.tv\.sohu\.com\/mts\?/
// @include        /^https?:\/\/so\.56\.com\/video\//
// @include        /^https?:\/\/so\.ku6\.com\/search/
// @include        /^https?:\/\/www\.dongting\.com\/#/
// @include        /^https?:\/\/music\.baidu\.com\/search/
// @include        /^https?:\/\/cgi\.music\.soso\.com/
// @include        /^https?:\/\/mp3\.sogou\.com\/music\.so/
// @include        /^https?:\/\/so\.yinyuetai\.com\/mv\?/
// @include        /^https?:\/\/so\.1ting\.com\//
// @include        /^https?:\/\/www\.songtaste\.com\/search/
// @include        /^https?:\/\/www\.xiami\.com\/search/
// @include        /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/search\?(.*tbs=sbi)|(.*tbm=isch)/
// @include        /^https?:\/\/image\.baidu\.c(om|n)\/i/
// @include        /^https?:\/\/\image\.so\.com\/i\?/
// @include        /^https?:\/\/.*\.bing\.com\/images\/search/
// @include        /^https?:\/\/pic\.sogou\.com\/pic/
// @include        /^https?:\/\/image\.youdao\.com\/search/
// @include        /^https?:\/\/huaban\.com\/search\/\?/
// @include        /^https?:\/\/www\.flickr\.com\/search/
// @include        /^http:\/\/(..|...)\.picsearch\.com\/index\.cgi/
// @include        /^http:\/\/www\.pixiv\.net\/search\.php/
// @include        /^http:\/\/www\.deviantart\.com\/\?q/
// @include        /^http:\/\/img\.jpger\.info\//
// @include        /^https?:\/\/www\.yyets\.com\/search\//
// @include        /^https?:\/\/bt\.ktxp\.com\/search\.php\?/
// @include        /^http:\/\/oabt\.org\/\?topic_title=/
// @include        /^https?:\/\/share\.dmhy\.org\/topics\/list/
// @include        /^https?:\/\/kickass\.to\/usearch\//
// @include        /^https?:\/\/www\.nyaa\.se\/\?page/
// @include        /^https?:\/\/www\.ed2000\.com\/FileList\.asp/
// @include        /^https?:\/\/search\.t\.qq\.com\/index\.php\?(.*QQ%E6%97)/
// @include        /^https?:\/\/www\.btspread\.com\/search\//
// @include        /^https?:\/\/(www\.)?torrentkitty\.(com|org)\/search\//
// @include        /^https?:\/\/btdigg\.org\/search\?/
// @include        /^https?:\/\/s8?\.etao\.com\/search/
// @include        /^https?:\/\/search\.jd\.com\/Search\?/
// @include        /^https?:\/\/s\.taobao\.com\/search/
// @include        /^https?:\/\/searchex\.yixun\.com\/html\?/
// @include        /^https?:\/\/(search)\.suning\.com\//
// @include        /^https?:\/\/list\.tmall\.com\/\/?search/
// @include        /^https?:\/\/www\.amazon\.cn\/s\/ref/
// @include        /^https?:\/\/search\.dangdang\.com\/\?key/
// @include        /^https?:\/\/s\.paipai\.com\/[a-z]/
// @include        /^https?:\/\/se?\.wanggou\.com\/[a-z]/
// @include        /^https?:\/\/s\.mall\.360\.cn\/search/
// @include        /^https?:\/\/dict\.youdao\.com\/search/
// @include        /^https?:\/\/www\.iciba\.com/
// @include        /^https?:\/\/dict\.cn\/./
// @include        /^https?:\/\/dict\.hjenglish\.com\/(en|w)/
// @include        /^https?:\/\/dict\.hjenglish\.com\/(404\/)?jp/
// @include        /^https?:\/\/www\.zdic\.net\/sousuo/
// @include        /^https?:\/\/translate\.google\./
// @include        /^https?:\/\/fanyi\.baidu\.com/
// @include        /^https?:\/\/fanyi\.youdao\.com/
// @include        /^https?:\/\/(cn|www)\.bing\.com\/dict\/search\?/
// @include        /^https?:\/\/www\.bing\.com\/translator/
// @include        /^https?:\/\/fy\.iciba\.com/
// @include        /^https?:\/\/search\.t\.qq\.com\/index|user\.php\?(?!.*QQ%E6%97)/
// @include        /^https?:\/\/s\.weibo\.com\/weibo|user\//
// @include        /^https?:\/\/shooter\.cn\/search/

// ==/UserScript==


'use strict';

var prefs = {
    openInNewTab: false,  // 是否在新页面打开.
    hideEnglineLabel: 2,  // 是否隐藏前几个搜索的文字部分。0：不隐藏，1：根据高度自行判断，2：隐藏

    debug: false,
};

var engineListIntroduce = getMStr(function() {/*
<div>
	<h2>分类规则：</h2>
    <i>【最好不要修改，类别跟站点规则会有个对应】</i>
	<p>1、"音乐-5" 或 "音乐-音悦Tai"，代表类别是 "音乐"，图标使用下面的第5个，即音悦台的图标，否则使用默认的第1个。</p>
	<p>2、"dev--百度百科"，代表插入到 "百度百科" 搜索的前面</p>
	<p>3、"其它--购物"，代表插入到 "购物" 类别的最后一个</p>
</div>
<div>
	<h2>搜索引擎规则：</h2>
    <code>名称，地址（%s 关键字）， 编码（特殊的填gbk），站点图标</code>
	<p>1、"//" 开头会被忽略</p>
	<p>2、中间分隔符：中文逗号（，） 或 英文逗号 + 空格（, ）</p>
	<p>3、编码可省略，直接填站点图标</p>
	<p>4、站点图标也可省略</p>
	<p>5、POST 方式</p>
</div>
 */});

function introduceToHtml() {
	return engineListIntroduce.replace(/(（.*?）)/g, '<span>$1</span>')
			.replace(/"(.*?)"/g, '<span>$1</span>')
}


var engineListDataStr = getMStr(function(){/*
网页
    Google, https://www.google.com.hk/search?q=%s&ie=utf-8&safe=off
    // wen.lu, https://wen.lu/search?q=%s&hl=zh-CN&safe=off&ie=utf-8, www.google.com.hk
    百度, http://www.baidu.com/s?wd=%s&ie=utf-8
    必应, http://cn.bing.com/search?q=%s
    360, http://www.so.com/s?ie=utf-8&q=%s
    搜狗, http://www.sogou.com/web?query=%s
    // 搜搜, http://www.soso.com/q?query=%s&utf-8=ie
    // 有道, http://www.youdao.com/search?q=%s&ue=utf8
    // DuckDuckGo, https://duckduckgo.com/?q=%s&kl=cn-zh
    // Wolfram, http://www.wolframalpha.com/input/?i=%s
图片-pixiv
    Google, https://www.google.com.hk/search?q=%s&tbm=isch
    百度, http://image.baidu.cn/i?ie=utf-8&word=%s
    // 360, http://image.so.com/i?ie=utf-8&q=%s&src=tab_web
    // 必应, http://cn.bing.com/images/search?q=%s
    花瓣, http://huaban.com/search/?q=%s
    有道, http://image.youdao.com/search?q=%s
    pixiv, http://www.pixiv.net/search.php?word=%s
    flickr, http://www.flickr.com/search/?q=%s
    picsearch, http://cn.picsearch.com/index.cgi?q=%s
    deviantART, http://www.deviantart.com/?q=%s
    jpg4, http://img.jpg4.info/index.php?feed=%s
音乐-音悦Tai
    Songtaste, http://www.songtaste.com/search.php?keyword=%s, gbk
    百度音乐, http://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s
    360音乐, http://s.music.so.com/s?ie=utf-8&q=%s, http://www.so.com/favicon.ico
    // 搜狗音乐, http://mp3.sogou.com/music.so?query=%s, gbk
    天天动听, http://www.dongting.com/#a=searchlist&q=%s
    一听, http://so.1ting.com/all.do?q=%s
    音悦Tai, http://so.yinyuetai.com/mv?keyword=%s
    虾米音乐, http://www.xiami.com/search?key=%s
    酷我音乐, http://sou.kuwo.cn/ws/NSearch?key=%s
    雷电音乐, http://www.leidian.com/s?q=%s&ie=utf-8&t=music
    网易云音乐, http://music.163.com/#/search/m/?s=%s
    百度歌词, http://music.baidu.com/search/lrc?key=%s
视频-搜库
    豆瓣电影, http://movie.douban.com/subject_search?search_text=%s&cat=1002, www.douban.com
    搜库, http://www.soku.com/v?keyword=%s
    // google视频, https://www.google.com/search?q=%s&safe=off&hl=zh-CN&tbm=vid
    百度视频, http://v.baidu.com/v?word=%s&ie=utf-8
    bilibili, http://www.bilibili.tv/search?keyword=%s
    acfan, http://www.acfun.tv/search.aspx#query=%s
    人人影视, http://www.yyets.com/search/index?keyword=%s
    youtube, http://www.youtube.com/results?search_query=%s
    vimeo, http://vimeo.com/search?q=%s
    时光网, http://search.mtime.com/search/?q=%s
    视频站--豆瓣电影
        优酷, http://www.soku.com/search_video/q_%s, www.youku.com
        奇艺, http://so.iqiyi.com/so/q_%s
        乐视, http://so.letv.com/s?wd=%s
        腾讯, http://v.qq.com/search.html?ms_key=%s
        搜狐, http://so.tv.sohu.com/mts?wd=%s
        网易, http://so.v.163.com/search/000-0-0000-1-1-0-%s/
        新浪, http://video.sina.com.cn/search/noresult.php?k=%s
        56 视频, http://so.56.com/video/%s/?
        ku6 视频, http://so.ku6.com/search?q=%s&ie=utf-8&oe=utf-8
        迅雷看看, http://search.kankan.com/search.php?keyword=%s
        niconico, http://www.nicovideo.jp/search/%s
知识-2
    百度百科, http://baike.baidu.com/search/word?pic=1&sug=1&word=%s
    维基(zh), http://zh.wikipedia.org/wiki/%s
    维基(en), http://en.wikipedia.org/wiki/%s
    知乎, http://www.zhihu.com/search?q=%s
    互动百科, http://so.baike.com/s/doc/%s
    萌娘百科, http://zh.moegirl.org/index.php?search=%s
    百度文库, http://wenku.baidu.com/search?word=%s&ie=utf-8
    豆丁文档, http://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s
    // 爱问共享, http://ishare.iask.sina.com.cn/search.php?key=%s, gbk
    百度知道, http://zhidao.baidu.com/search?word=%s
    网易公开课, http://c.open.163.com/search/search.htm?query=%s#/search/all
    Google 学术, https://scholar.google.com/scholar?hl=zh-CN&q=%s&btnG=&lr=%s
    维普，http://lib.cqvip.com/zk/search.aspx
        - E: (Keyword_C=%s+Title_C=%s), H: 题名或关键词=%s 与 范围=全部期刊
    开发--百度百科
        stackoverflow, http://stackoverflow.com/search?q=%s
        MDN, https://developer.mozilla.org/en-US/search?q=%s
        MDN（Google）, https://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q=%s&sitesearch=developer.mozilla.org, developer.mozilla.org
        github, https://github.com/search?q=%s
        krugle, http://opensearch.krugle.org/document/search/#query=%s
        npm, https://www.npmjs.org/search?q=%s
社交
    新浪微博, http://s.weibo.com/weibo/%s
    豆瓣, http://www.douban.com/search?source=suggest&q=%s
    百度贴吧, http://tieba.baidu.com/f?kw=%s&ie=utf-8
    腾讯微博, http://search.t.qq.com/index.php?k=%s
    Twitter, https://twitter.com/search/%s
    Facebook, https://www.facebook.com/search/results.php?q=%s
    Google+, https://plus.google.com/s/%s
购物
    一淘, http://s.etao.com/search?q=%s
    惠惠, http://www.huihui.cn/search?q=%s
    易迅, http://searchex.yixun.com/html?charset=utf-8&as=1&key=%s
    360购物, http://s.mall.360.cn/search.html?query=%s
    淘宝, http://s.taobao.com/search?q=%s
    天猫, http://list.tmall.com/search_product.htm?q=%s&type=p
    京东, http://search.jd.com/Search?keyword=%s&enc=utf-8
    苏宁, http://search.suning.com/%s/
    国美, http://www.gome.com.cn/search?question=%s
    当当, http://search.dangdang.com/search.php?key=%s, gbk
    亚马逊, http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s
    其它--购物
        ebay, http://www.ebay.com/sch/i.html?_nkw=%s
        QQ网购, http://se.wanggou.com/comm_search?KeyWord=%s, gbk
下载-种子快搜
    下载搜索, https://www.google.com/cse?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q
    网盘搜索, http://so.baiduyun.me/search.php?wd=%s
    我乐盘, http://www.56pan.com/s.php?q=%s&wp=0
    种子快搜, http://www.searchbt.net/btsearch.php?query=%s
    bt 天堂, http://www.bttiantang.com/s.php?q=%s
    我爱P2P, http://oabt.org/?topic_title=%s
    VeryCD, http://www.verycd.com/search/folders/%s
    射手字幕, http://www.shooter.cn/search/%s
    影视--下载搜索
        丫丫下载站, http://www.yayaxz.com/search/%s
        天天美剧, http://www.ttmeiju.com/search.php?keyword=%s&range=0&mozcharset=gbk
        极影动漫, http://bt.ktxp.com/search.php?keyword=%s
        动漫花园, http://share.dmhy.org/topics/list?keyword=%s
    电驴-ed2000-下载搜索
        simpledCD, http://simplecd.me/search/entry/?query=%s
        ed2000, http://www.ed2000.com/FileList.asp?SearchWord=%s
        海盗湾, https://kickass.to/usearch/%s/
        btspread, http://www.btspread.com/search/%s
        torrentkitty, http://www.torrentkitty.org/search/%s
        BTDigg, https://btdigg.org/search?q=%s   
软件
    Firefox 附加组件, https://addons.mozilla.org/zh-cn/firefox/search/?q=%s
    Chrome 应用商店, https://chrome.google.com/webstore/search-extensions/%s?hl=zh-CN
    greasyfork, https://greasyfork.org/scripts/search?q=%s
    userscripts, http://www.google.com.hk/search?q=site:userscripts-mirror.org+inurl:scripts+inurl:show+%s, userscripts.org
    华彩软件, http://www.huacolor.com/search.asp?word=%s, gbk
    绿软联盟, http://www.xdowns.com/i.asp?q=%s, gbk
    绿软家园, http://www.downg.com/search.asp?action=s&sType=ResName&catalog=&keyword=%s, gbk
    创e下载园, http://www.7edown.com/query.asp?q=%s, gbk
    西西软件, http://so.cr173.com/?keyword=%s, gbk, http://www.cr173.com/favicon.ico
    pc6下载站, http://so.pc6.com/?keyword=%s, gbk, http://www.pc6.com/favicon.ico
    卡饭论坛, http://bds.kafan.cn/cse/search?q=%s&s=15563968344970452529
翻译
    google翻译, http://translate.google.com.hk/?q=%s
    百度翻译, http://fanyi.baidu.com/#auto/zh/%s
    有道翻译, http://fanyi.youdao.com/translate?i=%s
    bing 翻译, http://www.bing.com/translator/?&text=%s&from=&to=zh-chs
    抓鸟翻译, http://dict.zhuaniao.com/collab/translate.php?translation_query=%s
    有道词典, http://dict.youdao.com/search?q=%s
    爱词霸, http://www.iciba.com/%s
    海词, http://dict.cn/%s
    沪江EN, http://dict.hjenglish.com/w/%s
    必应词典, http://www.bing.com/dict/search?q=%s&go=&qs=bs&form=CM
    大耳朵, http://dict.bigear.cn/w/%s/
    汉典, http://www.zdic.net/sousuo/?q=%s
    nciku, http://www.nciku.com/search/all/%s
// 小说
//     booklink, http://booklink.me/after_search.php
//         - name: %s, search_type: book
//     起点中文, http://sosu.qidian.com/searchresult.aspx?keyword=%s
//     创世中文, http://chuangshi.qq.com/search/searchindex?type=all&value=%s
//     纵横中文, http://search.zongheng.com/search/all/%s/1.html
*/});


// rules 和 engineList 的对应
var categoryMap = {
    'web': '网页',
    'video': '视频',
    'music': '音乐',
    'image': '图片',
    'knowledge': '知识',
    'sociality': '社交',
    'shopping': '购物',
    'download': '下载',
    'translate': '翻译',
};

function isTheSameCategory(c1, c2) {
    return (categoryMap[c1] || c1) == (categoryMap[c2] || c2);
}

// 根据规则把搜索引擎列表插入到指定网站
// 以下数据来自原版和 ted423 的版本
var rules = [
    // 网页
    // /////////////第一个可以当模板看
    {name: "google网页搜索",// 你要加载的网站的名字(方便自己查找)
        // 是否启用.
        enabled: true,
        // 在哪个网站上加载,正则.
        // url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        url: /^https?:\/\/(www|encrypted)\.google(stable)?\..{2,9}\/(webhp|search|#|$|\?)(?:.(?!&tbm=))*$/,
        // 是否要监视标题的变化
        mutationTitle: true,
        // 加载哪个类型的列表:
        // ['web'|'music'|'video'|'image'|'download'|'shopping'|'translate'|'knowledge'|'sociality']
        engineList: 'web',
        // 给引擎列表的样式
        style: '\
           border-bottom: 1px solid #E5E5E5;\
           border-top: 1px solid #E5E5E5;\
           padding-left: 135px;\
        ',

        // 插入文档,相关
        // target 将引擎跳转工具栏插入到文档的某个元素
           // (请使用xpath匹配,比如: '//*[@id="subform_ctrl"]'  或者 css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
        // keyword 使用 xpath 或者 css选中一个form input元素 或者 该项是一个函数，使用返回值
        // where 四种:
           // 'beforeBegin'(插入到给定元素的前面) ;
           // 'afterBegin'(作为给定元素的第一个子元素) ;
           // 'beforeEnd' (作为给定元素的最后一个子元素) ;
           // 'afterEnd'(插入到给定元素的后面);.
        insertIntoDoc: {
               /*keyword: function () {
               var input = document.getElementById('lst-ib');
               if (input) return input.value;
           }, */
           keyword: '//input[@name="q"]',
           target: 'css;#rcnt',
           where: 'beforeBegin',
        },
        // 自定义样式，我新增的
        stylish: '',
    },
    {name: "wen.lu网页搜索",
        enabled: true,
        url: /^https?:\/\/wen\.lu\//i,
        engineList: 'web',
        style: '\
            border-bottom: 1px solid #E5E5E5;\
            border-top: 1px solid #E5E5E5;\
            padding-left: 135px;\
            ',
        insertIntoDoc: {
            keyword: '//input[@name="q"]',
            target: 'css;#rcnt',
            where: 'beforeBegin',
        },
    },
    {name: "baidu 网页搜索",
        // 新增了百度简洁搜索：http://www.baidu.com/s?wd=firefox&ie=utf-8&tn=baidulocal
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu|)/,
        mutationTitle: true,
        enabled: true,
        engineList: 'web',
        style: '\
           border-top:1px solid #D9E1F7;\
           border-bottom:1px solid #D9E1F7;\
           padding-left: 138px;\
        ',
        insertIntoDoc: {
           keyword: function() {
               var input = document.querySelector('input#kw') || document.querySelector('input[name="wd"]');
               if (input) return input.value;
           },
           target: 'id("container") | html/body/table[2]',
           where: 'beforeBegin',
        },
    },
    {name: "必应网页搜索",
        url: /^https?:\/\/[^.]*\.bing\.com\/search/,
        enabled: true,
        engineList: 'web',
        style: '\
           border-top: 1px solid #E6E6E6;\
           border-bottom: 1px solid #E6E6E6;\
           margin-top:5px;\
           margin-left: 100px;\
        ',
        insertIntoDoc: {
           keyword: 'css;#sb_form_q',
           target: 'css;#b_header',
           where: 'beforeEnd',
        },
    },
    {name: "360搜索",
        url: /^https?:\/\/www\.so\.com\/s\?/,
        engineList: 'web',
        enabled: true,
        style: '\
           border-bottom: 1px solid #E0E0E0;\
           border-top: 1px solid #E0E0E0;\
           margin-bottom: 10px;\
        ',
        insertIntoDoc: {
           keyword: 'css;#keyword',
           target: 'css;#container',
           where: 'beforeBegin',
        },
        stylish: '#head{ margin-bottom: 0; }'
    },
    {name: "搜狗网页搜索",
        url: /^https?:\/\/www\.sogou\.com\/(?:web|sogou)/,
        enabled: true,
        engineList: 'web',
        style: "\
           border-top: 1px solid #ccc;\
           border-bottom: 1px solid #ccc;\
           margin-bottom: 10px;\
           padding-left: 35px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#upquery',
           target: 'css;#wrapper',
           where: 'beforeBegin',
        },
        stylish: '.header{ margin-bottom: 5px; }'
    },
    // {name: "雅虎网页搜索",
    //     url: /^https?:\/\/search\.yahoo\.com\/search/,
    //     engineList: '网页',
    //     enabled: true,
    //     style: "\
    //     text-align:left;\
    //     border-top:1px solid #D4E9F7;\
    //     border-bottom:1px solid #D4E9F7;\
    //     ",
    //     insertIntoDoc: {
    //     keyword: 'css;#yschsp',
    //     target: 'css;#hd',
    //     where: 'afterEnd'
    //     }
    // },

    // 知识
    {name: "谷歌学术",
        enabled: true,
        url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
        engineList: "知识",
        style: '\
             border-bottom:1px solid #E5E5E5;\
             border-top:1px solid #E5E5E5;\
             z-index:999;\
             position:relative;\
             ',
        insertIntoDoc: {
           target: 'css;#gs_ab',
           keyword: '//input[@name="q"]',
           where: 'beforeBegin'
        }
    },
    {name: "百度百科",
        url: /^https?:\/\/baike\.baidu\.com\/(?:sub)?view\//,
        engineList: "知识",
        enabled: true,
        style: "\
            border-top: 1px solid #2B6DAE;\
            text-align: center;\
            z-index: 999999;\
        ",
        insertIntoDoc: {
            keyword: 'css;input#word',
            target: 'css;#nav',
            // where: 'beforeBegin',
            where: 'afterEnd',
        },
    },
    {name: "互知识",
        url: /^https?:\/\/[a-z]{2,3}\.baike\.com\/[a-z]/,
        enabled: true,
        engineList: "知识",
        style: '\
            z-index:99;\
            margin:0 auto;\
        ',
        insertIntoDoc: {
            keyword: function() {
                var input;
                if (document.getElementsByClassName('ac_input')[0] != undefined) {
                    if (document.getElementsByClassName('ac_input')[0].value != "")
                        input = document.getElementsByClassName('ac_input')[0].value;
                    else if (document.getElementsByClassName('blue')[0].innerHTML != "") input = document.getElementsByClassName('blue')[0].innerHTML;
                    else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
                } else if (document.getElementsByClassName('blue')[0].innerHTML != "") input = document.getElementsByClassName('blue')[0].innerHTML;
                else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
                return input;
            },
            target: 'css;.wraper',
            where: 'beforeBegin'
        }
    },
    {name: "wiki",
        url: /^https?:\/\/..\.wikipedia\.org\/w\/index\.php(?!.*\?search=%s)/,
        enabled: true,
        engineList: "知识",
        style: '\
              border-top:1px solid #D9E1F7;\
              border-bottom:1px solid #D9E1F7;\
              margin-top:5px;\
        ',
        insertIntoDoc: {
            keyword: 'css;#searchInput',
            target: 'css;#siteNotice',
            where: 'beforeBegin'
        }
    },
    {name: "wiki",
        url: /^https?:\/\/(?:en|zh|ja)\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=%s)/,
        enabled: true,
        engineList: "知识",
        style: '\
              border-top:1px solid #D9E1F7;\
              border-bottom:1px solid #D9E1F7;\
              padding-left: 0;\
        ',
        insertIntoDoc: {
            keyword: function() {
                return document.evaluate("//span[@dir='auto']", document, null, 9, null).singleNodeValue.innerHTML;
            },
            target: 'css;#siteNotice',
            where: 'beforeBegin'
        }
    },
    {name: "百度知道",
        url: /^https?:\/\/zhidao\.baidu\.com\/(search|question)/,
        enabled: true,
        engineList: "知识",
        style: '\
              position:absolute;\
              width:90px;\
              top:180px;\
              right: 2%;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#kw',
            target: 'css;body',
            where: 'beforeBegin'
        }
    },
    {name: "知乎",
        url: /^https?:\/\/www\.zhihu\.com\/search\?/,
        enabled: true,
        engineList: "知识",
        style: '\
              text-align;center;\
              border-bottom:1px solid #D9E1F7;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#q',
            target: 'css;.zu-top',
            where: 'afterEnd'
        },
        stylish: '.sej-engine > img {padding-bottom: 3px;}'
    },
    {name: "百度文库",
        url: /^https?:\/\/wenku\.baidu\.com\/search\?/,
        enabled: true,
        engineList: "知识",
        style: '\
              border-top:1px solid #D9E1F7;\
              border-bottom:1px solid #D9E1F7;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#kw',
            target: 'css;#hd',
            where: 'afterEnd'
        }
    },
    {name: "豆丁",
        url: /^https?:\/\/www\.docin\.com\/search\.do/,
        enabled: true,
        engineList: "知识",
        style: '\
            margin:0 auto;\
            padding-top:65px;\
            border-top:1px solid #00000;\
            border-bottom:1px solid #D9E1F7;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#topsearch',
            target: 'css;.nav',
            where: 'beforeBegin'
        }
    },

    // 视频
    {name: "soku",
        url: /^https?:\/\/www\.soku\.com\/[a-z]/,
        engineList: "视频",
        enabled: true,
        style: "\
           border-bottom: 1px solid #EEEEEE;\
           border-top: 1px solid #EEEEEE;\
           text-align: center;\
        ",
        insertIntoDoc: {
           keyword: 'css;#headq',
           target: 'css;.sk_header',
           where: 'afterEnd'
        },
    },
    {name: "bilibili",
        url: /^https?:\/\/www\.bilibili\.com\/search\?/,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #E7E7E7;\
           border-bottom: 1px solid #E7E7E7;\
           width: 980px;\
           margin: 0 auto;\
        ",
        insertIntoDoc: {
           keyword: 'css;#search-keyword',
           target: 'css;body > .z',
           where: 'beforeBegin',
        },
    },
    {name: "acfan",
        url: /^https?:\/\/www\.acfun\.tv\/search/,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #FFFFFF;\
           border-bottom: 1px solid #FFFFFF;\
           margin-bottom: 5px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#input-search-mainer',
           target: 'css;#mainer',
           where: 'beforeBegin',
        },
    },
    {name: "youtube",
        url: /^https?:\/\/www\.youtube\.com\/results/,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #E8E8E8;\
           border-bottom: 1px solid #E8E8E8;\
        ",
        insertIntoDoc: {
           keyword: 'css;#masthead-search-term',
           target: 'css;#page-container',
           where: 'beforeBegin',
        },
    },
    {name: "niconico",
        url: /^https?:\/\/www\.nicovideo\.jp\/search\//,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #E8E8E8;\
           border-bottom: 1px solid #E8E8E8;\
           text-align: center;\
        ",
        insertIntoDoc: {
           keyword: 'css;#search_united',
           target: 'css;.tagListBox',
           where: 'beforeBegin',
        },
    },
    {name: "百度视频",
        url: /^https?:\/\/v\.baidu\.com\/(v|#)/,
        enabled: true,
        engineList: "video",
        style: "\
        	margin:0 auto;\
        	width: 984px;\
		",
        insertIntoDoc: {
           keyword: 'css;#kw',
           target: 'css;#navbar',
           where: 'beforeBegin'
        }
    },
    {name: "360视频",
        url: /^https?:\/\/video\.so\.com\//,
        engineList: "video",
        enabled: true,
        style: "\
               text-align:left;\
               top:-20px;\
               margin-left:5px;\
               ",
        insertIntoDoc: {
           keyword: 'css;#kw',
           target: 'css;#head',
           where: 'afterEnd'
        }
    },
    {name: "腾讯视频",
        url: /^https?:\/\/v\.qq\.com\/search\.html\?/,
        engineList: "video",
        enabled: true,
        style: "",
        insertIntoDoc: {
           keyword: 'css;#iWordMid',
           target: 'css;.mod_big_search',
           where: 'afterEnd'
        }
    },
    // {name: "sogou视频",
    //     url: /^https?:\/\/v\.sogou\.com\/v\?/,
    //     engineList: "video",
    //     enabled: true,
    //     style: "\
    //            top:-10px;\
    //            border-top:1px solid #D9E1F7;\
    //            border-bottom:1px solid #D9E1F7;\
    //            ",
    //     insertIntoDoc: {
    //        keyword: 'css; #form_query',
    //        target: 'css;.header',
    //        where: 'afterEnd'
    //     }
    // },
    // {name: "soso视频",
    //     url: /^https?:\/\/video\.soso\.com\/v\?/,
    //     engineList: "video",
    //     enabled: true,
    //     style: "\
    //            top:-10px;\
    //            margin:0 auto;\
    //            border-top:1px solid #D9E1F7;\
    //            border-bottom:1px solid #D9E1F7;\
    //            ",
    //     insertIntoDoc: {
    //        keyword: 'css; #form_query',
    //        target: 'css;#s_search',
    //        where: 'afterEnd'
    //     }
    // },
    {name: "bing视频",
        url: /^https?:\/\/.*\.bing\.com\/video/,
        enabled: true,
        engineList: "video",
        style: '\
            left: 5px;\
            border-collapse:separate;\
        ',
        insertIntoDoc: {
           keyword: 'css;#sb_form_q',
           target: 'css;#rfPane',
           where: 'afterBegin'
        },
        stylish: '#vm_res { position: relative; top: 54px; }',
    },
    {name: "iqiyi",
        url: /^https?:\/\/so\.iqiyi\.com\/so\/q/,
        enabled: true,
        engineList: "video",
        style: '\
               margin:0 auto;\
               ',
        insertIntoDoc: {
           keyword: 'css;#data-widget-searchword',
           target: 'css;#destinationBox',
           where: 'afterEnd'
        },
    },
    {name: "Letv",
        url: /^https?:\/\/so\.letv\.com\/s\?/,
        enabled: true,
        engineList: "video",
        style: "\
               margin:0 auto;\
               border-top: 1px solid #FFFFFF;\
               border-bottom: 1px solid #FFFFFF;\
               ",
        insertIntoDoc: {
           keyword: function() {
               var input = document.getElementsByClassName("i-t")[1].value;
               if (input) return input;
           },
           target: 'css;.So-search',
           where: 'afterEnd',
        },
    },
    {name: "搜狐",
        url: /^https?:\/\/so\.tv\.sohu\.com\/mts\?/,
        enabled: true,
        engineList: "video",
        style: "\
               margin:0 auto;\
               border-top: 1px solid #FFFFFF;\
               border-bottom: 1px solid #FFFFFF;\
               ",
        insertIntoDoc: {
           keyword: 'css;#gNewSearch2',
           target: 'css;.ss-head',
           where: 'beforeEnd',
        },
    },
    {name: "56视频",
        url: /^https?:\/\/so\.56\.com\/video\//,
        enabled: true,
        engineList: "video",
        style: "\
               position:relative;\
               top:-20px;\
               margin:0 auto;\
               ",
        insertIntoDoc: {
           keyword: 'css;.search_keyword',
           target: 'css;.header_wrap',
           where: 'beforeEnd'
        }
    },
    {name: "ku6",
        url: /^https?:\/\/so\.ku6\.com\/search/,
        engineList: "video",
        enabled: true,
        style: "\
               word-break:keep-all;\
               white-space:nowrap;\
               position:relative;\
               left:-70px;\
               ",
        insertIntoDoc: {
           keyword: 'css;#bdvSearvhInput',
           target: 'css;.ckl_header',
           where: 'beforeEnd'
        }
    },

    // 音乐
    {name: "天天动听",
        url: /^https?:\/\/www\.dongting\.com\/#/,
        enabled: true,
        engineList: "music",
        style: "\
            margin-left:23%;\
            background-color:#E2E2E2;\
            position: fixed;\
            right:0;\
        ",
        insertIntoDoc: {
            keyword: 'css;.searchBox',
            target: 'css;.head',
            where: 'beforeEnd'
        }
    },
    {name: "百度音乐",
        url: /^https?:\/\/music\.baidu\.com\/search/,
        enabled: true,
        engineList: "music",
        style: "\
            border-top:1px solid #CDEAF6;\
            padding-left: 80px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#ww',
            target: 'css;.nav',
            where: 'beforeBegin'
        }
    },
    {name: "qq音乐",
        url: /^https?:\/\/cgi\.music\.soso\.com/,
        enabled: true,
        engineList: "music",
        style: "\
            margin:2px auto;\
        ",
        insertIntoDoc: {
            keyword: 'css;#search_input',
            target: 'css;#search_result',
            where: 'beforeBegin'
        }
    },
    {name: "搜狗音乐",
        url: /^https?:\/\/mp3\.sogou\.com\/music\.so/,
        enabled: true,
        engineList: "music",
        style: "\
            text-align:left;\
            margin-left:30px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#queryinput',
            target: 'css;#header_sogou',
            where: 'afterEnd'
        }
    },
    {name: "音悦台",
        url: /^https?:\/\/so\.yinyuetai\.com\/mv\?/,
        enabled: true,
        engineList: "music",
        style: "\
            margin:0 auto;\
        ",
        insertIntoDoc: {
            keyword: '//input[@name="keyword"]',
            target: 'css;.search_title',
            where: 'beforeBegin'
        },
    },
    {name: "一听音乐",
        url: /^https?:\/\/so\.1ting\.com\//,
        enabled: true,
        engineList: "music",
        style: "\
            margin:0 auto;\
            width: 960px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#keyword',
            target: 'css;.nav',
            where: 'beforeBegin'
        }
    },
    {name: "songtaste",
        url: /^https?:\/\/www\.songtaste\.com\/search/,
        enabled: true,
        engineList: "music",
        style: "\
            margin:0 auto;\
            word-break:keep-all;\
            white-space:nowrap;\
            background-color:#E6E6E6;\
        ",
        insertIntoDoc: {
            keyword: 'css;#sb',
            target: 'css;head',
            where: 'beforeBegin'
        }
    },
    {name: "xiami",
        url: /^https?:\/\/www\.xiami\.com\/search/,
        enabled: true,
        engineList: "music",
        style: "\
            word-break:keep-all;\
            margin-right: 205px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#search_text',
            target: 'css;.more_cols_left_inner',
            where: 'beforeBegin'
        }
    },

    // 图片
    {name: "谷歌图片",
        url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/search\?(.*tbs=sbi)|(.*tbm=isch)/,
        enabled: true,
        engineList: "image",
        style: '\
            border-top:1px solid #ccc;\
            border-bottom:1px solid #ccc;\
            ',
        insertIntoDoc: {
            keyword: 'css;input[name=q]',
            target: 'css;#top_nav',
            where: 'beforeBegin'
        }
    },
    {name: "百度图片",
        url: /^https?:\/\/image\.baidu\.c(om|n)\/i/,
        enabled: true,
        engineList: "image",
        style: '\
            margin-left:40px;\
            ',
        insertIntoDoc: {
            keyword: 'css;input#kw',
            target: 'css;#search',
            where: 'afterEnd'
        }
    },
    {name: "360图片",
        url: /^https?:\/\/\image\.so\.com\/i\?/,
        enabled: true,
        engineList: "image",
        style: '\
            word-break:keep-all;\
            white-space:nowrap;\
            position:relative;\
            z-index:50;\
            text-align:left;\
            ',
        insertIntoDoc: {
            keyword: 'css;input#search_kw',
            target: 'css;#searchBox',
            where: 'afterBegin'
        },
        etc: function() {
            document.getElementById("searchBox").style.height = '80px';
        }
    },
    {name: "bing图片",
        url: /^https?:\/\/.*\.bing\.com\/images\/search/,
        enabled: true,
        engineList: "image",
        style: '\
            top:-5px;\
            margin-left:5px;\
            border-collapse:separate;\
            ',
        insertIntoDoc: {
            keyword: 'css;#sb_form_q',
            target: 'css;#rfPane',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementById("rf_hold").style.height = '120px';
        }
    },
    {name: "搜狗图片",
        url: /^https?:\/\/pic\.sogou\.com\/pic/,
        engineList: "image",
        enabled: true,
        style: "\
            top:-9px;\
            border-top:1px solid #BFBDEA;\
            border-bottom:1px solid #BFBDEA;\
            ",
        insertIntoDoc: {
            keyword: 'css;#form_querytext',
            target: 'css;.fix_area',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementsByClassName("hd_fix")[0].style.height = '130px';
            document.getElementsByClassName("hd_fix")[0].nextElementSibling.style.height = '130px';
        }
    },
    {name: "有道图片",
        url: /^https?:\/\/image\.youdao\.com\/search/,
        engineList: "image",
        enabled: true,
        style: "\
            border-top:1px solid #EBF1FF;\
            border-bottom:1px solid #EBF1FF;\
            ",
        insertIntoDoc: {
            keyword: 'css;#query',
            target: 'css;#w',
            where: 'beforeBegin'
        }
    },
    {name: "花瓣",
        url: /^https?:\/\/huaban\.com\/search\/\?/,
        engineList: "image",
        enabled: true,
        style: "\
            border-top:1px solid #EBF1FF;\
            ",
        insertIntoDoc: {
            keyword: 'css;#query',
            target: 'css;#search_switch',
            where: 'afterEnd'
        }
    },
    {name: "flickr",
        url: /^https?:\/\/www\.flickr\.com\/search/,
        engineList: "image",
        enabled: true,
        style: "\
            position:fixed;\
            top:80px;\
            z-index:1999;\
            background-color:#FFFFFF;\
            width:100%;\
            border-top:1px solid #EBF1FF;\
            border-bottom:1px solid #EBF1FF;\
            ",
        insertIntoDoc: {
            keyword: function() {
            if (document.getElementById("autosuggest-input"))
                var input = document.getElementById("autosuggest-input").value;
            else input = "";
            return input;
            },
            target: 'css;#content',
            where: 'afterBegin'
        },
        etc: function() {
            setTimeout(function() {
            document.getElementsByTagName("section")[0].style.setProperty("top", "31px", "important");
            }, 1500);
        }
    },
    {name: "picsearch",
        url: /^http:\/\/(..|...)\.picsearch\.com\/index\.cgi/,
        engineList: "image",
        enabled: true,
        style: "\
            margin-top:80px;\
            ",
        insertIntoDoc: {
            keyword: 'css;input[name=q]',
            target: 'css;#header',
            where: 'beforeEnd'
        }
    },
    {name: "pixiv",
        url: /^http:\/\/www\.pixiv\.net\/search\.php/,
        engineList: "image",
        enabled: true,
        style: "\
            margin: 0 auto;\
            width: 970px;\
            font-family: 微软雅黑;\
        ",
        insertIntoDoc: {
            keyword: 'css;input[name=word]',
            target: 'css;body',
            where: 'beforeBegin'
        }
    },
    {name: "deviantart",
        url: /^http:\/\/www\.deviantart\.com\/\?q/,
        engineList: "image",
        enabled: true,
        style: "\
            margin-bottom:10px;\
            ",
        insertIntoDoc: {
            keyword: 'css;#searchInput',
            target: 'css;.browse-top-bar',
            where: 'afterEnd'
        }
    },
    {name: "jpg4",
        url: /^http:\/\/img\.jpger\.info\//,
        engineList: "image",
        enabled: true,
        style: "\
            margin-top:300px;\
            ",
        insertIntoDoc: {
            keyword: 'css;input[name=feed]',
            target: '//div[@align="center"]',
            where: 'beforeEnd'
        }
    },

    // 下载
    {name: "人人影视",
        url: /^https?:\/\/www\.yyets\.com\/search\//,
        engineList: "下载",
        enabled: true,
        style: '\
            border-bottom: 1px solid #00AFFF;\
            text-align: center;\
        ',
        insertIntoDoc: {
            keyword: 'css;#keyword',
            target: 'css;.topBox',
            where: 'afterEnd',
        },
    },
    {name: "极影",
        url: /^https?:\/\/bt\.ktxp\.com\/search\.php\?/,
        engineList: "下载",
        enabled: true,
        style: "\
            border-bottom: 1px solid #CAD9EA;\
            border-top: 1px solid #CAD9EA;\
            background-color: white;\
            text-align: center;\
        ",
        insertIntoDoc: {
            keyword: 'css;#top-search-wd',
            target: 'css;head',
            where: 'beforeBegin',
        },
    },
    {name: "我爱p2p",
        url: /^http:\/\/oabt\.org\/\?topic_title=/,
        engineList: "下载",
        enabled: true,
        style: "\
            border-bottom: 1px solid #3BA1DC;\
            border-top: 1px solid #3BA1DC;\
            text-align: center;\
        ",
        insertIntoDoc: {
            keyword: 'css;#username',
            target: 'css;#seamain',
            where: 'afterEnd',
        },
    },
    {name: "dmhy",
        url: /^https?:\/\/share\.dmhy\.org\/topics\/list/,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               ",
        insertIntoDoc: {
           keyword: 'css;#keyword',
           target: 'css;.quick_search',
           where: 'afterEnd'
        }
    },
    {name: "kickass",
        url: /^https?:\/\/kickass\.to\/usearch\//,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               ",
        insertIntoDoc: {
           keyword: 'css;#search_box',
           target: 'css;.headmainpart',
           where: 'afterEnd'
        }
    },
    {name: "nyaa",
        url: /^https?:\/\/www\.nyaa\.se\/\?page/,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               top:44px;\
               ",
        insertIntoDoc: {
           keyword: 'css;.inputsearchterm',
           target: 'css;#topbar',
           where: 'afterEnd'
        }
    },
    {name: "ed2000",
        url: /^https?:\/\/www\.ed2000\.com\/FileList\.asp/,
        engineList: "download",
        enabled: true,
        style: "\
               border: 1px solid #E5E5E5;\
               ",
        insertIntoDoc: {
           keyword: 'css;input[name=SearchWord]',
           target: 'css;.topsearch',
           where: 'afterEnd'
        },
    },
    {name: "旋风分享",
        url: /^https?:\/\/search\.t\.qq\.com\/index\.php\?(.*QQ%E6%97)/,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               border-top:1px solid #D4E9F7;\
               border-bottom:1px solid #D4E9F7;\
               ",
        insertIntoDoc: {
           keyword: function() {
               return getElement('css;#k2').value.substring(9)
           },
           target: 'css;.soso',
           where: 'beforeEnd'
        }
    },
    {name: "btspread",
        url: /^https?:\/\/www\.btspread\.com\/search\//,
        enabled: true,
        engineList: "download",
        style: '\
               word-break:keep-all;\
               white-space:nowrap;\
               ',
        insertIntoDoc: {
           keyword: 'css;input#search-keyword',
           target: 'css;.form-search',
           where: 'afterEnd'
        }
    },
    {name: "torrentkitty",
        url: /^https?:\/\/(www\.)?torrentkitty\.(com|org)\/search\//,
        enabled: true,
        engineList: "download",
        style: '\
               border-top:1px solid #FFFFFF;\
               border-bottom:1px solid #FFFFFF;\
               margin:0 auto;\
               margin-top:50px;\
               ',
        insertIntoDoc: {
           keyword: function() {
               return document.getElementsByTagName("h2")[0].innerHTML.slice(19, -1);
           },
           target: 'css;.wrapper',
           where: 'afterEnd'
        }
    },
    {name: "BTDigg",
        url: /^https?:\/\/btdigg\.org\/search\?/,
        enabled: true,
        engineList: "download",
        style: '\
               margin:0 auto;\
               border-top:1px solid #D4E9F7;\
               border-bottom:1px solid #D4E9F7;\
               ',
        insertIntoDoc: {
           keyword: 'css;input#searchq',
           target: 'css;.pager',
           where: 'beforeBegin'
        }
    },

    // 购物
    {name: "一淘",
        url: /^https?:\/\/s8?\.etao\.com\/search/,
        enabled: true,
        engineList: "shopping",
        style: "\
           border-top:1px solid #D4E9F7;\
           border-bottom:1px solid #D4E9F7;\
           margin:0 auto;\
           word-break:keep-all;\
           white-space:nowrap;\
        ",
        insertIntoDoc: {
           keyword: 'css;#J_searchIpt',
           target: 'css;#etao-header-bd',
           where: 'beforeBegin'
        }
    },
    {name: "京东",
        url: /^https?:\/\/search\.jd\.com\/Search\?/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#key',
           target: 'css;#nav-2013',
           where: 'beforeBegin'
        }
    },
    {name: "淘宝搜索",
        url: /^https?:\/\/s\.taobao\.com\/search/,
        enabled: true,
        engineList: "购物",
        style: "\
           border-bottom: 1px solid #E5E5E5;\
           border-top: 1px solid #E5E5E5;\
        ",
        insertIntoDoc: {
           keyword: 'css;#q',
           target: 'css;.tb-container',
           where: 'beforeBegin',
        },
    },
    {name: "易迅",
        url: /^https?:\/\/searchex\.yixun\.com\/html\?/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           background-color:#FFFFFF;\
        ",
        insertIntoDoc: {
           keyword: 'css;#q_show',
           target: 'css;.ic_header',
           where: 'beforeEnd'
        }
    },
    {name: "苏宁",
        url: /^https?:\/\/(search)\.suning\.com\//,
        enabled: true,
        engineList: "shopping",
        style: "\
           border-top:1px solid #E5E5E5;\
           margin:0 auto;\
        ",
        insertIntoDoc: {
           keyword: 'css;#searchKeywords',
           target: 'css;.g-header',
           where: 'afterEnd'
        }
    },
    {name: "天猫",
        url: /^https?:\/\/list\.tmall\.com\/\/?search/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#mq',
           target: 'css;#mallNav',
           where: 'beforeBegin'
        }
    },
    {name: "亚马逊",
        url: /^https?:\/\/www\.amazon\.cn\/s\/ref/,
        enabled: true,
        engineList: "shopping",
        style: "\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#twotabsearchtextbox',
           target: 'css;#navbar',
           where: 'beforeEnd'
        }
    },
    {name: "当当",
        url: /^https?:\/\/search\.dangdang\.com\/\?key/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#key_S',
           target: 'css;#bd',
           where: 'beforeBegin'
        }
    },
    {name: "拍拍",
        url: /^https?:\/\/s\.paipai\.com\/[a-z]/,
        enabled: true,
        engineList: "shopping",
        style: "\
           text-align:left;\
        ",
        insertIntoDoc: {
           keyword: 'css;#KeyWord',
           target: 'css;.mod_s',
           where: 'beforeEnd'
        }
    },
    {name: "QQ网购",
        url: /^https?:\/\/se?\.wanggou\.com\/[a-z]/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           background-color:#C8C8C8;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#KeyWord',
           target: 'css;.wg_header',
           where: 'afterEnd'
        }
    },
    {name: "360购物",
        url: /^https?:\/\/s\.mall\.360\.cn\/search/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           word-break:keep-all;\
           white-space:nowrap;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
        ",
        insertIntoDoc: {
           keyword: 'css;#mall_keyword',
           target: 'css;.header',
           where: 'afterEnd'
        }
    },

    // 词典
    {name: "有道词典",
        url: /^https?:\/\/dict\.youdao\.com\/search/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            position:absolut;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#query',
            target: 'css;#scontainer',
            where: 'beforeBegin'
        }
    },
    {name: "爱词霸",
        url: /^https?:\/\/www\.iciba\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin-top:85px;\
            ",
        insertIntoDoc: {
            keyword: 'css;#s',
            target: 'css;.header',
            where: 'beforeEnd'
        }
    },
    {name: "海词",
        url: /^https?:\/\/dict\.cn\/./,
        enabled: true,
        engineList: "translate",
        style: "\
            position:relative;\
            left:-150px;\
            top:-410px;\
            width:90px;\
            border:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#q',
            target: 'css;.floatsidenav',
            where: 'beforeEnd'
        }
    },
    {name: "沪江英语",
        url: /^https?:\/\/dict\.hjenglish\.com\/(en|w)/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#w',
            target: 'css;#xd_search',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementById("xd_search").style.height = "130px";
            document.getElementById("wrapper").style.top = "20px";
        }
    },
    {name: "沪江日语",
        url: /^https?:\/\/dict\.hjenglish\.com\/(404\/)?jp/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#w',
            target: 'css;#xd_search',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementById("xd_search").style.height = "120px";
            document.getElementById("wrapper").style.top = "10px";
        }
    },
    {name: "汉典",
        url: /^https?:\/\/www\.zdic\.net\/sousuo/,
        enabled: true,
        engineList: "translate",
        style: "\
            word-break:keep-all;\
            white-space:nowrap;\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#q',
            target: 'css;.secpan',
            where: 'afterEnd'
        }
    },

    // 翻译
    {name: "google翻译",
        url: /^https?:\/\/translate\.google\./,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#source',
            target: 'css;#gt-c',
            where: 'beforeBegin'
        }
    },
    {name: "百度翻译",
        url: /^https?:\/\/fanyi\.baidu\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            text-align:left;\
            margin-bottom:10px;\
            margin-top:0px;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#baidu_translate_input',
            target: 'css;.header',
            where: 'beforeBegin'
        }
    },
    {name: "有道翻译",
        url: /^https?:\/\/fanyi\.youdao\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin: 0 auto;\
            max-width: 1000px;\
            ",
        insertIntoDoc: {
            keyword: 'css;#inputText',
            target: '//body/*[1]',
            where: 'beforeBegin'
        }
    },
    {name: "bing词典",
        url: /^https?:\/\/(cn|www)\.bing\.com\/dict\/search\?/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin-top:80px;\
            border-top:1px solid #D4E9F7;\
            border-bottom:1px solid #D4E9F7;\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;#sb_form_q',
            target: 'css;#sb_form',
            where: 'afterEnd'
        }
    },
    {name: "bing翻译",
        url: /^https?:\/\/www\.bing\.com\/translator/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:5px auto;\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;#InputText',
            target: 'css;#Wrapper',
            where: 'afterBegin'
            // target: 'css;body',
            // where: 'beforeBegin'
        }
    },
    {name: "爱词霸翻译",
        url: /^https?:\/\/fy\.iciba\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            position:fixed;\
            width:90px;\
            top:100px;\
            left:40px;\
            border:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#inputC',
            target: 'css;body',
            where: 'beforeBegin'
        }
    },
    {name: "QQweibo",
        url: /^https?:\/\/search\.t\.qq\.com\/index|user\.php\?(?!.*QQ%E6%97)/,
        engineList: "sociality",
        enabled: true,
        style: "\
            margin:0 auto;\
            border-top:1px solid #D4E9F7;\
            border-bottom:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#k2',
            target: 'css;.soso',
            where: 'beforeEnd'
        }
    },
    {name: "weibo",
        url: /^https?:\/\/s\.weibo\.com\/weibo|user\//,
        engineList: "sociality",
        enabled: true,
        style: "\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;.searchInp_form',
            target: 'css;#pl_common_searchTop',
            where: 'afterEnd'
        }
    },
    {name: "射手字幕",
        url: /^https?:\/\/shooter\.cn\/search/,
        engineList: "web",
        enabled: true,
        style: "\
            margin:0 auto;\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;#key',
            target: 'css;#site_header',
            where: 'afterEnd'
        }
    },
];

var rule_default = {
	name: "通用规则",
    url: /.*/,
    enabled: true,
    style: "\
        margin: 0 auto;\
        max-width: 970px;\
    ",
    insertIntoDoc: {
        keyword: 'css;input[name="q"], input[name=word]',
        target: 'css;body',
        where: 'beforeBegin'
    }
};


if (typeof exports !== 'undefined') {
    exports.rules = rules;
}


var ICON_DATA = {
	"vimeo.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/0lEQVQ4jaWTvw2CQBTGGYQQF2ACJsAFmMAJmMAJnMAJ7LQgFBQ0mlDYEGJjYSLxggLhMKIBzWd15E7+RPQlr3n5vt/7czlJXhJdsaLTyL5gSCpWdJKXRJd+MfMQaYhBc5NGTQCoToxNUgIA5oeirpt+Dlq+AAC0fMHwsiZAX6c4Fk/wwbp+xmx/EwGam9Qd+DC8DKafI6BVP4CNaXiZIDT9vBZ21RtH5LuxO5h+XteOxbP7iCP7gunuKohVJxbWm2xpP0Bfp8K4vNmOHv3PyLLtoAGtoDrxd4BFeBfMbJU2bSuAf9ZNUnaaOwFD8t/PRCR5RcaKFZHh5nMor8j4DUIXDtllgAeRAAAAAElFTkSuQmCC",
	"addons.mozilla.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAq5JREFUOI19k09sVFUUxn/nvvtmOjOGNsCj5U9baqKJRtMaFkLbGMBEDWFDWLA0YeEOWFTdmLhzZVIICxNYsDNBNyw0lMRFcdGxlhZKEKVAO8Up0jZtsS3zZt68efewmEoJNT05q5Pv++XLvecIm9T7Z9jrpcwFnOxHcIgOVhN3ZrSf4ma+F/Xx11tv5O//pNOLd3RibkTPDZxKer/wh1/W2M0ApXCleSH8m3zxR8J4hbbGTgOy52WNtxlg9360kpQOehlnnasxOT1ZmZkvfDXzm47+p5FXTd2fe4eBS6i0AzRvbwk/7DmadeoYzF8N5xZms3WnPgJO/h9g6ujBEx07trVQczGxi/jjyXWcU95q7sFIPfT8wizXh68VNr6BSkcQBFx78N1aQF2bw1DxMuoUVehuPw4qHbbnNG002CuvpRpbV8pPvwGIJcRPm3VAvVEHW9IBQXYv1q8nsZI25/pOnH3vnbYDMvpw8NvLv/aHVV3N2rRB1gCqdU7WNtFi39abY+Ph4uJQSkSfWady6HF0W/66P4Cj6ncf2ucXno1uTKAQ5PZwe2i8tLg0dzpadT8sp0ksYMpumenSGEGuDd+zeCmwxiCynkAdGB9K5VBc4u6OXSQEkN4v7UDnu50fBTu3mcmpQvnp0pL2ftKVLYa3EBEytpGc2YpTpRqX+fexxPfGCrVqNTIYZm2lVvts/M7493JXWmux6zeY82piPN+QSzUR/ZNNhoYnKgj6ZtfuzJZd4u/b0eprbBm+OtFu64eRfPBiD/rM+dhVAEiZDDfyDyurYXQM4M+R6StdR3bmVqIlMtJU/4VX18D4TBUn51/f3h4QR45SKcr+3p/8AnCgj4ZqHONLA/PFZYzVqQ2AOK59em9k5lKS5w0AY9dP13jM3fp5dheAeDyoJcnJ56T9NnCniYbJAAAAAElFTkSuQmCC",
	"baike.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAitJREFUOI2FkU1I03EYxz//v5ubpm6WZB7KWUFMaIcdKorKxC4SQUVoQXYJAiG6dakO1aWOQUHRKSiKIvMQWdTZW0nhS4fcf0uXL/kyc+h/m9u3g7qXtug5Pb+H5/k83+/zMwL79OHrcLiNJLmogE0eg9l5QQIwARewnNdTDoFm30eosVQq3r5bLHivpIt7qLEE7mJA5/kJQUhXrk5LkjrOTQhGNfDFLgS4/wGgLqydgYj2toxraCQhvJYam8O60D1ZBDDXLcXjGV72/Aago93F929pWg+Wk0oJYiIyJtqOVFAcawo6uyZEtaXjp6NKpqSnz2NKr/m+e39ODx7Na3pmRc9exDQfSxdbgJD8wYgglJXY07ugvve5Y+4K/pCj3lLwwFgxoP1kVHgs7Tk8Lkk6eiwqd4MlNlrqvjy1tsQqWEJlHmDZzuhN3+q2azd+afP2sPzBiPzBiJxbLL3qXVRn10/hDKm1PZpVYOC2pGVf9iS3bs9y594i2+rNglONjGZ4/aSO3c0utjc5MQwwKsIUdF2/WXoYwL/D5MTZGT4N2BhGrp5VEFvIUOuN4A+WlfiqPCWf0ySTTTidfynIp/4v7EQmmzvWE0+NycVLG3j4eAmv18BOCdsGDKiuBJfTYHZJnDrjproqZ9HAY0kxX7YwOJwkHk/T0OCkcesqf3AoweRUCofDpOVQZW7YG8YR8Pv6DW94PwmgDKpqwWGWVpARzM0JkoALAn5f/x8SGsh2ARqUqwAAAABJRU5ErkJggg==",
	"bds.kafan.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADQ0lEQVQ4ja3M/U/UBRzA8c+l5UhL0yRcOlMc8nTxYF0UKiiHHjCZTzN0rZZIOCdzroYYWyrkzDXi5I674+F46DiQ4+kUAckElAcD8QYejzaSBgxSlLX0B2v17oev6y/ovb1/fYn8H3VuSGT4TBG2ee9RKH7YRYNdFYZNFUb5/PexL/iAMpWGMlXYf9tEg1PCERGRai8dT6Ye0JKUSUNsCoVLIjCpQjCJGvv63bgtNZjlbfIklLwX3sEoAeRKMDbRKECpaJi4cYeH3YOM2pso8ozCIL7kyBraU7N5+vgPipZGYhR/ckVNXUQikzddtOiOK0CxBDFa2YzdOx6rZySOoA+xr4qhdLWO2eH7uPRlzI1N0nbkHE26o0x09vMPcG3LEQUYsziZ7nEzYmvgXuUPPOwd4dncUx7dn2Kw6DLGeYHUbT3E9X0nMb6opkdvZ9Y9RrEqVAGGjZU8co3yvVc0elmLQfzp+spC80cncFtqaE06S5asJEdWczFgD7N99xgodjKQWaIAFYsieHBnhGufnubG4bNciUwmR3zRizfjDV00xKSgl3WYFoQw0djFpejPuLo/jd87hxSg9s0dTLb1Uh64l4m2Xv5+9if1uqMUvhzOVJsLy0saLEs13E63cDujgCxZx/QtN/0nTM+BlTuY6ejD6hGGyUODbf0uSry2Uht+ELfFQbnfTu7mVmFbu52mXV/w29AvALTvS38OrIpnuqOPgsWbMYkak6gxiA/1GxOZueVmpv9nnNpkqiMSGLI6+bXdxU9nTPw1+0QBanz28nhonMKFGzFJIGbZQJ4EYV22hbnhcTrTDFwQX+o2HcIZlYxZFcp38hZ1wQcUoHxxJD1fF2Ce/y7WN6Iwihqj+KMXX4wSiEH8MUswF8SbbFmDQfwwSABW8VGA7o8zcMal0JpynoGsCq4fSKdx/0l+/OQ0TQlpVIUkUOKlpXlPKvVxx2iMP07LwQy6D59XgPH8y7jzaxk0OGhNymTQ4GCgwEn7l0aGS65w8/NsrsYdo+9cCb3flHL3WxuuU/kMnipUAOerWjp2plK5fDtlHptwrIjF8Xo0Za9sxuGpo2pFLBdf01LtFUPF8m1ULtFSsTCCS4u0/AupiSiXVgwZtgAAAABJRU5ErkJggg==",
	"booklink.me": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAoNJREFUOI2FUl1Ik2EYPe/3zb+5ypw1oawu0vxLK9KYJppmN7Ec/VBBd911EWFJElaWhiIiBF0E0U0YdKMJZaVmEKvNJDWKNdGmk8if6ZbCmtv3vd/3dDGcfwPP5Xvec97zPOcFIoCGHc2z7W02EEWiN4azpZksx0vI+bK9Yy3XKa02FSIZiFrtPx4VDe+H9xVjT5+8ox/fH14kArlc9alNdeSxWJ4t3WXr4rvGm/rr71ctut3hF5jCkZCdgwWHHTwoQVdcIh2+VRMDAJrVYldj/41rVX5JBhNC4VQAEKIx99MOxhh0KbswdcRYGU5AIyMN4x3t1UyrDbqHhmL8M9MhQrPKG6QoYAAS8vJx4E5tOLkw57AbJ3u64ep8HeOfmUbsjp3QFxSCOIcqSyBFgRoMYFNmFlTO4fvSh0m7vW7JQLPtlLnkl0bzwtvTfd7ncCDx4CFodDr4xsewNSsbC04n4pOToUoy9MYCLPTZ4B34un+5Bcaw96TpQlJO7iuRMZAURGDWje1Hi8CDQSTsSwcxBl1qKsTYWHAiBPtsFXNv33R+lCg+PAuNjjZarl65KeiTwEQRkscDJoqAIIA4B4ggREeDZBlMVRHFZWhPn+tdrtFPsDfeJvfgQEjI1jUMyDLi0jMUZjDMMEnevJiXfy+8avL+vvv521CoPkUB1rQAWUZiWhrGioqrzWZz8/IOALQSwfm8tZYHAtAZDNhiLKQoziGqKqCqgKogLiNTnSgtv75SHP5IlxiDx2p9PK/i8p/8vMqKsvJHUyPDNfMDg7l+m/WszzkK6JNmTSZTy/q5NsDfD71t1hNlNNjwYDESr4l0uBKfjpWe2TPh6vKm7O6KxP8HwH4ZNGgYNI4AAAAASUVORK5CYII=",
	"bt.ktxp.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAATJJREFUOI2lk7FuwjAQhj9XXTLlAXAr1gx0RAp7HsF5B4+BV+iKGf0O4RGyE8TKkBVVYa3IlNEdEmhKAkXiFutOvu9+3/kE5rThKXsGYE6b117QOgmEQI4W5X+Ml15Ei5IiSwH1iIi+AoDxNAfyjiJFXSkOu5AgitFifR/Q2BvWhYAESjx/zXhKN/nvE6yTWLfEnDYcdk2iFitgC0BdKTx/fl3lF6BFiRaLzqW8PRWQ8/0lGehLv4l1ZQA47lOsSygyhRZbRpMVdRXeB1iX4PnN6D4/3gFJEBmsWwIhnp/fBlgnOe4TYN7xFVosgDVFpi79uKFAtlXPZhhNZlgnqStDEBmKLG3VDAC0ONPD1o8vvufHaLEgiGKa8aadOle70IwzuZY6aIO70Pz/1UMAQDy7zj8aNHFPVHD7/gAAAABJRU5ErkJggg==",
	"btdigg.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAexJREFUOI2Vk09I03EYxj9fZyHOP4dodqohhnnYyEAIoj+LgrIo6FzUoaBL0Dk97OC8FS6idohOQoegbGSprCRsEF7CnxQLXVsm5JbiXPuBTH48HVyyVqF74L09n+f9fuF9kET55JQ6aStLSrGDEfGiKJuwGJbEir5S6a+hpBXSFFhgmeSJB3nP5wyTl5YszgziflWw6I7Ty0Bqz+Is0f2UyUgCIMa18Gzx4fG67aQz0+asI+EyZsPolHwBf9DYzA900XOzGe96wCzRph98yI9bQZVD/5Ij0dxG4nL9944GdlGbZ47Hc+dnXDk8m8EALmNw1yu5yMf7DqtPjCTi9PLWCm26vVzbWpW47s521N7FvClYBKqBHYlj7v54FqvLFGUziHs4O226t5xQCtnhZ9RExMsli9PVvADA49PoRexTJqXYgQyTN15bt65U+40GP2PGVpbIT09iLW3aq4GP+nvMIfqoWcM+fKEx9rTFp6GtBhiDxr+FFvLMUduMd8JF3YRtk6i8vv9tD/iDNTvp9Daxe70LDqu0u6+OBPxB40gbZ1sOAbT4NNS4l08283faOJcG+KNZM3re2pch/U49hKbQI/EsNIXeq//e7TyJLxoJSmJZyQ3mr3r+nrAYK8omIqIpxfbZypJT6kil7xfWVjgCwbJmkAAAAABJRU5ErkJggg==",
	"c.open.163.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAHBJREFUOI2tUUEOwDAIYkv//2V3cjGIrMvGyRKKqMBHHIoMIAZx0zeifs4PipMGLMx3rdlkqaguMsMaTLvYMgggagKz2HddeazTCdQOuIGMyOfbOWcDd6rvWq9JNKVg3AZK6LjH+Cnk6OMSpxEc/wsuqQI6C+HzarEAAAAASUVORK5CYII=",
	"chrome.google.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAitJREFUOI29kr1rFEEYh5+Znd3bvSRE0NgaxGChlWBjEQiCTUwUo4mtgiJa+FEKksbCf0CCoOAXAVEkoBAQUkQRtRRsglgkJpdcTIi522zudufmtdjg+XGd4FtM8fK+DzPPb+AfS7Vqjsoo+57ufwGSurwVjHWdGpju+3tctwKcK11IKpXqqrWNmrW2Vo3j1Ud7FpJWswZgYWnpknKuV5RYcdTa2opR/0D/hoNQOwBX84Mwmp2bvyfOhU6JQeT17u7u2wZAOdcbFYvDaZoiGqrVGD8wF5WAKAGBOI7xfXNWxMP4hmQzAcgBosSmaUqapltahCzNEPLlrYMsyxABQVAi9ucTxGlE504FBb6P+9NXwyFZBrjf7BtyAuAhSoM47JPH6KkJvMhHCdikjjt8HHViBNEaEER+SUF5Gm08TBxTHxmC8QdIw8OlCpsqxHrI+H3s6SH0RoJnDMozzRtEUUTU3sH7qyfpmVtBujrQC8t4WYJk0MiKuLpPo7SKDJwn/PgKoytNQEEHfCi95ebRhDsP65ivy/g3LjPTN0yhq85e+4x08RZ+cRuh/wVXfknaeaQJCFTA9OIU2c52Js90MhwNcuXgNaRUISxrwvA6YwdWoHI3VybPWXeDTQdO0NUsppjBxLFO3u06xJuZCuX1BvNrlsnP3/lU7cvTFKDxDZF81wB4Wq8FpoApeKhigfIOy8YUzDofrRSzm5qe7ZsQ5/mpIATlrbX62v+/fgAefAFi66hmrwAAAABJRU5ErkJggg==",
	"chuangshi.qq.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAiBJREFUOI19kr1OVFEUhb99uAwDAgXC8GeIIqJoZ0VhYmlM7H0AWwtfwQexs/ExTExsCIYoQfEnkvA3BoiGmcDcc89eFvfOgGhcyc5pdvZZ39rb9PTZQy4NvziUT1sIYMZ/JSF3LlvYo916YsWDR7s7zeZ0GB6G/v5e0z/VHR4j3moxOzm5Z6vTcxoqEv2jIxAC85vrvf6vC0vYRUdmzG+u87Exy0mWkZ10OmBG/ddPbv3Y5cNYA6n87GZzh28zcxiGEDeaO3xqzOLutFJBnhIhSuRyFve3eT82hWNgAcfYaFxhYX+bQiK6cHfylDg+PqbjIkqEiLi7v83q+BRuwgK9chNr41Ms7G4RlYgxEnHyPCchEiIr3Hk9McXy9haSCCEQQqhwjdPTU9YmZwAoioIklS8iCTIHXNBut/m8uMT5yATMvFvBq6WklCi6AyQSkCHhlHwCwrnUXaJer5PQXw4KCQeyJFV/lQrnPCRESolU3UWMkULlIO86SAgE7k6SMMSd719KB+4cHR31BtRqNRJCKvmTicwRVvE5UMhZmbtWNZb3MGBlqKtXryNEjLHE7iK4IM9zJt++oVarEUIgz3NijEji4N59bm9uEGOk3W7T6XSIEgLs5dCIvMLoR3+ECNAHZGYUFbNLRAyszCurw0ELxh2RrLu8MwUgVHYdwCjvBWMQDvtejU2cbHQ6ywU2CMbFEobLqqTOagA7eDw6+vw35qFgAXs/rFQAAAAASUVORK5CYII=",
	"cn.bing.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABF0lEQVQokWP8v5OBJMAEZ/34zUyMBhYI9Z+BIXKOr4zgZ3vVJyHGN4mygYGB4cl73l3X5Yl1EgS8/sxFmgYIKF9nv+K0xr03/JhSLFg1yAl9WnlGY+UZDRGe76YKz80VX+jLvMJnQ7bDeU7WPwwMDG++cG6/otSw2eo/ficxMDDMidtpofSMsJNkBT8zMDDce8O/7KTW2UfiBDSI831NsbnUu9vk6B0ZuBuEeb4nWF5lxNQgJ/RJWfRj4xarf/+hssxM//z174Ya3+Bg/YtuAyMDg4Lwx/03ZeEShrKvkm0uSQt8QXMSI3LiO3RbduYhfW6230nWl7H6GF0DAwPD77/MzEz/mBj/Y1WN7mkGBgZW5r9Y1cEBAGO4WQnBHqV2AAAAAElFTkSuQmCC",
	"cn.picsearch.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAlVJREFUOI1Fk72OHEUUhb9zq3tmdke7wgHCgAjWYBHxY8lIBAgkeIWNic1LkPAUhBZyTEBsmcCIALBAliBzYMTPwhphze56erpuHYJu7EqqknOq6p7vSDcdYaDQMoAd0mLaQ7QUpTMtxbPVARVFQBfCrWE3pDaLGtDjTKRG1phFW6ACAgq0JeqYxKXryVqhiSgJBJC4FcBIjcuvHvL69cuM28r9uydsHiUtskdakjWR/PSRLUXLgiKQFthn3Ph4/5fbt97z3S8/4PjGayhGFHqCohLFQGB3uAmYDFvugBEIVstFjcAA64M93Hro2KNlJUqgSJwVG168esBqv+NiAycPTgHx3W8Hb9z58R9UzP17pyhGmrjpfinGQfOAzOFzf3z/zQ+fvH300mH35+PK9be+4t+TM6JUWq6QRuwKrFEnqLucowNbBJu/j17YZ70q7WgRsVp3SKLlAhB2j1SwG+5sUGBPLMDIdjx69+ufN92Vl83vf11w/ng7x1ywB6QVMAArQuULkyNQiVJoaaBDMou9nt2TETuQKvZiNjFRBtwKjqxceXN9dvveMXd+OubTz98HGjYMF5MYCooeaMBAlIEo3WTcacErl3799sNrlz4CoqX5TGAXQEgNO2nJfA5EUHcxDT2As/NWhtGxG82jzQ57JEpDqiiSxV5DAsX/oCUAURKLW+6XydV3nidkTh5uOX14jm0kP/3/dFWZYZvAipITB9OAhJTYS8BzeUCaWunWz9kn/dKMQ0HqUVcCUXAWSt9Rd0aC0ic5TqWaav4M97oTUoed+D+5m0iQNdfFwwAAAABJRU5ErkJggg==",
	"developer.mozilla.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAmpJREFUOI2tkkuIjWEYx3/v933nnO8ccwyNaZKUGQskpUZKbiklZUNIclmIUjSLoaYsJAuXNKJckpGyMlhgQZLIQslolLBRGhIzMWac+S7v7bGYRp2w818+T8/v+T8X+N8qXH6985+5C/2b6ZW6mAKITz9bqpw7FMLarHkG1uRfENXL7jkdAOVTT48qpbaquNI2NrkJsuQJgepm19w7Kj7x5G4QN6zDZCiTk1WbcFEBDGCtkH+3RHGh7A2IJ21sHu9bjCGrPQ7QJpbaKJKmYAyulsPXUXraG7m2rEUtNK6wPnak32pgLWgDaQq1UchNIUIbJBQQz9hQjYNLpnNy24LfM25btByIOHfvLftuv4M5U8ZBTsA5ibxx4EEnmmOrZtO1cUHdkn6Mpihgz+rZVMKAvY8GyUsKygLOEqAt3lgwlmolAuq3DKCUIklztq9qJTu+gg1NRcgMaEsg1mK1pUV5hr+nWPkTMAEZyzQAS2dWIclBm3EHBWP5muT0vx9k+KeuK4xCxaRJZSqlEo3VKh+HEjrvvwclYDyROIvyggoUt14M0Pl5hObJ8W/Az0Sorr8EpYj21qn0ffIwswFyA+IIfG4RYwm1gWqBnt7+Ogc9t1/ClCJqWom+kQSmV8aLtYXcEqp563YgtOEcIULfiOLIxeeUrSYVOHvjJV8QQicoCZCwCNaACDg7EIl1QAAqxOv0NaF7RUt5U9eDD0Wuv4GGjCAqIU57gZuoeBZRcTHOgzMqEm2UaH2DxB/gYcfAxP+w8eoOpkadKnWxN8l57uw/Uzfblms9eNcKa7rn//VuE1p5OP5nbsOVtl/P3CxSS89FqwAAAABJRU5ErkJggg==",
	"dict.bigear.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAhpJREFUOI19kz9oU1EUxn/vpUkTWxqJaWxFjNrENljFFixuulkwIDgIFqQ6dHEVF5XOOhUHMdCl6mCliw5BRRdBocVSMwmmiSViaBJDmjz7Xv6+dx1CXt+D6AffcM4933c4954rAcwupsVvpYnX46BS1bFibNiD2ymR+KnZ8oMDTp7OjUjS5UdJsV1uALA2f5JkrsbCuxwbGRWA93fGGPA4mImlSBfqNpPh/S7kVHYHVVUZH3IAcGLIzZPZo8hGjamgiwFPO3/74kFUVbUxld1BRuggdPz9DoTFPXrGx59qw4xHh/fRqbVS7hRs5jWsDlfOBtgqVM1YqbboBtMgua2RKe4JAl4X58JeM17/oXQ3aCp59LqGMHTuvdw0Dw70O3l4LWzG8a8FhKEjDANh6Oh1jaaSp6ellkAtAbCah8VjEnOXTtm6bOUqfPi49v8ROniw/IWNzYItV96tMxkOdDcQRosOO5Ake9FEKMDKfJSV+SgyOlaN3J6rTaNV58XdaSZC9m6K1uBbpsRkOMDN6XGsGtn6pof9fUxFDgHw+HWC+OoWANniLq8+pwA4fdxv24MeYeztvlbbW9WrF0Zx9bSvKHLER2RmCoDUrxJWjSz0Jh0WSxWevU0AMOj14O3rtY0iBCzF17Fq5F5f0Ja4H3vDwvInGk37r9z4nuX8rRilsmLW9vqCSAAjN56LWiHV9Zn+BXcgRHrpuvQXfrwoITm0R3oAAAAASUVORK5CYII=",
	"dict.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAnBJREFUOI1tk8FrVFcUxn/3vTedZDJpknFSK7RosIppigkVi1AFu2ilCN2J3XYt4q4ENy7j3rV/QKGlm0LBRat0UxCqItjSSCK1aWPGyTjJOJOXvPMdF+/NGNELl8s593znnu+e8wWAs0/8C2De0q3Z7Vaz5nLc+1u4HBVnVB1bL01O3pNz9da+cCOcfeKfp0/XflaWxewCqZ9Eym3r+4VLKEQ2fGj6y8QDl5XtxHnwm1+VaRfYizOL5cwntpV+lAOFu3OODifemWBT8G51mPpQmXa3x0/LK3zfga6DJOSi98/S0ShtrtWlPPtcr82Fj2eoVYbprySOOTi5h0ufHOX6zD5GLUUyZEbabNQTV5+vODIcAxCHwA9/LVEplRgpJcyMj3B66n0O753kylSHi4uN/B9kJK/wihyAKMDv5Ymc97b4cbXLYvM+Zz7Yz2eHpjjw9788tAiXiGQalJSZ2MqMNMt9ZrnfTPyykUJS4sHqGtPlOL+XkcgspyCxYSmrnec0ul1yvwZ3EVCvDIE7EU4fl8hUtEu0t1MebzynsdnFrOh3wfWr+ii1oTIAt9s9pIAkEpMNAnccVtZb9LKMU3GKR06Mc3JvjfOzHwLw28NHLGfgMuRFBf0EB8erfD2XB37D62ul1ebbO4svp9KdJKq+3dxuNfe4BJ68AQadNOW7e39ybanBetE1dxFGx56GE//5r527t09LoqodKm7IgSJoy5ymGZlT6MIHc1M+/unNRLBgzim3LH4mp1V8ziuzP9CJXqo0BAtjEwsB4Nj/fsbFfOf+H3PZZnvctVtMBaiwQ2Xk2VvTs3fDRG1h+b1w4wXrDym+dya4ZgAAAABJRU5ErkJggg==",
	"dict.hjenglish.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAASFJREFUOI2dk72KwkAURs9kIg6oAWGxWHvB3sZO8C18CGtfwJ9ii3Q2PoCtlZWwjXa+wKKIdop2URM2OFu4G8zGQOIdBu53+eZcZoYrhBZvQAeokC6+gIEJdHBppDwM8I4C87FzURbJy3zEefg+4GnvGaRiPKpRZsTW2Ea2k3WYqzk1VYsQjEjlSUgkderMmFFV1WSAJUtatOjRw8EBoECBPv2Qz4wD7NkzdscAnNWZLl0AGv/eO9EVFiyC3MKilCmlA1y5hrQSKh2gTDnINZqjf0wOyBk52rQDvWLF5XYJdOwjNmlyUicsLCQyqNvYIV8sIPu7/sLHx8Zm6A7jARMm7NiFDDdubNgw1VPW3jrSSAgtPl4cJlB8msCA+6+8NM4/TNlSzRktZZcAAAAASUVORK5CYII=",
	"dict.youdao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAQBJREFUOI3NkrFqwzAQhn/JgSylOBgypdAgKGhzHiEvkTV5gz5KyBO0a+nUNUuTJ6gzBGUReE8MXjNY6mLBb4V4bW/67k736+444K9NsOOVXlWueQOAVMo6gZgJa0qv9KJyzUeID+xpFGpkR82a98C1cymltnfiXQGv9CRwJpNSWFO27gPH7woAGBPviJ+IewWGxAfiCfGeCwaRwCPx0itdALhGHRR9AucAlWtyAN+4tY5APMIxk8mCA7y0TCYFLfa2A2HNFcAn2vvwSqcAfujJJm4nPqQ1gK/WzQG8Vq55pt9nvQKX6YuPH4RiAHNhTR3nOiOkUtZ8aW3hhi/0/9kvWWFQQDml5pQAAAAASUVORK5CYII=",
	"dict.zhuaniao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC",
	"duckduckgo.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxVJREFUOI1tk09sVGUUxX/f996bmb43w7TTqZNOK+2kjRYUNyyMDSlJNS5EEhpjoLghRjck/omGiAu3xEZN3EhcSqQYEhFDqgs3RCLUhEQqtUhpEWo72NYOdNqZzpt5733XBQZRvMtzzz05yblH8Z+Rl7bsAA4BeZDoLqos4BbwgRr99Yf7+erfx499jwQJ/PI0VmwzsWTX36s5hN9R8ihYvhqd2vmAQHVv3w1Xm29XnMwLzjP7cvWpi9TOj6JbutG2A4BrqaWWuD61EfKcd/JqAUADyP6t51xLjRUrwcGK15rzO3ppe/84+ZM3UekcQeVPIgPrgeSK1eiga6kx2b/1HICW4b4BBGepJsNhGKI3tZEb3IUCnHwXnZ//SGrPW5jaGkYUoVEs1WQYwZHhvgFdCTiMqGt+ZFqj6jzJV9/h5+kSUSQArFcDakNvQriEiGAE/Mi0IupaJeCwTtpWthKaXhEQA4ETx7YCJq4uAJDyHI4cHye9+z2isk9UUUikqISmN2lbWb3sh45nWZ2RAXQTG8V5Ms1JvLh9L52jh55Eb66SfWWR7g/n0fkAV1mdy37o2CKIETCAslNUpyYoPDVAezaJ+Ncxs72EJWhqh8pUO3NHkpiKRtIgguhc3GmUG1FRCYjdRG1i/J8nkQYKWDpVoPhpD41lG2+7DwLlRlTMxZ2GXqmHq5mYnhXAaIf4jUusN4K7Ck1bmHmjGydXJ/10Fe0Z1sYTYEEmpmdX6uGqznp6BKV7bNQdQeMsT1Ne/OOeC69/N+tnFKWjKUpnkpiGwlbcQemerKdHtDpx5Ww9QBXcxDGNhliaxuwM38x9yeXSJRYHn+DC8xm+eC2PExm00hTcxLF6gFInrpy1ARJfTfY3hh5feCQV/3jGdw/Upy43z7ZVGbn4Os3JNImdeQq3FY5htSsV/ywIoxcTp3/pfKBM1T3bLrimHrF9128/vfvyPrfuxFoSHeSu3yrxyY4x5tt7NhDL+3qy/3/bCCBD256dL99+++GYl4kG9z605teSLdPnF4uLywsdm9yP1OnJ7+7n/wVUUVTTSR0H+QAAAABJRU5ErkJggg==",
	"en.wikipedia.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXdJREFUOI2lk7GKIkEQhv9eDhNBxDP0BXwKQZDBXEERQfABxFjFfDAyXRMTwWg1NTUUAxMDMRgTE1t0QAMTv01u59DZOw6voq6/+/+KoqsECHgHLP8e9pdHX+ZX490AVtJPvRZHA/CiWZL0Zq1VpVKRMUapVEqr1UqtVkvGGOVyOa3Xa1WrVRljNBwONZ/PZYxRsVjU+XyWvppxHIdmsxk0VyqVgnwymTCbzYK7bDYbnAPAYrFAEpfLBQDP85DE4XCgUCgEhuVyyXg8DgMAkskkvV4vyMvlMpLYbreBVqvVHr7hATCdTtHvrthsNkhiv98DYK3Fdd0/AwAkMRqNAHBdF8dxqNfrAHQ6Ha7X698Bg8EASfi+T7/fZ7fbIQnP82i328/Pw4Db7YYk0ul0oOXzeSRxPB5DgB/PgxGJRNRoNJTJZAKt2+0qGo0qkUiEJ4lvlsj3fe73+4N2Op1C1QH7JunjGRqLxWSMedDi8fh3k/wh/nOdPwFzSo2/XSRfAgAAAABJRU5ErkJggg==",
	"fanyi.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAgFJREFUOI2Nk7FrFFEQxn/zbt/eGT3ibTQhECu7iEWaaEBIY8BWEEUSO3t7GzsRG8FGsBbB/AEinKCXUmxTxnTnIV5yl0tyt/t231js3bJJCjPw8R7DfMPMNzOiOgKqzX6/v+qcs5zDrLVuenq6BayJqjZV9a5z7jzcchJE5Kv0er2kVrtgVRUAGQdo6V82Hb8iwmg0dCZJEpu7FUFzlgERBcNJCHnMGEmS2ABANUetKsiLDvQ9n9Yv82izBzUDmXLRCkdO0ZfzDGMtKgryynPHKFEOn8+iClOhYVM9O38c925OsfGxy7vHDVyqRTOaF6njCvIWdjsJv/ccg+OMpQXL1s4xS2/arC+GzNUN3iuqOQcUU5aqag2337d5+qHDwdDz6nOXWwuWH8/miV3G6y9dbMWUJBVMni1H7DzNJ1fRLAU8i7OGg6OY5be7zF6CG3OGzHvKnOD0mEbOk6YpVWtYiAJc5mlUPNciy9Apeio+mEyggFesZuwfOr5t9+gPPZUs5ft2jziD+8sRk50pRJxAUaoBbP3c51dnyMadK6xcn+JvN+bhygwPlhtk3lPmSLvd0Xq9XmQNKgIieK+YQl8pxpZ5LTZxMBgQhGHogOKI0mySHfyZBT5pYWidiaJGKwjOaPlfC4KAKIpaojpCtdrsdvdWnUvOec6hm5mJWiLx2j8C6h0I4+zCfgAAAABJRU5ErkJggg==",
	"fanyi.youdao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAQBJREFUOI3NkrFqwzAQhn/JgSylOBgypdAgKGhzHiEvkTV5gz5KyBO0a+nUNUuTJ6gzBGUReE8MXjNY6mLBb4V4bW/67k736+444K9NsOOVXlWueQOAVMo6gZgJa0qv9KJyzUeID+xpFGpkR82a98C1cymltnfiXQGv9CRwJpNSWFO27gPH7woAGBPviJ+IewWGxAfiCfGeCwaRwCPx0itdALhGHRR9AucAlWtyAN+4tY5APMIxk8mCA7y0TCYFLfa2A2HNFcAn2vvwSqcAfujJJm4nPqQ1gK/WzQG8Vq55pt9nvQKX6YuPH4RiAHNhTR3nOiOkUtZ8aW3hhi/0/9kvWWFQQDml5pQAAAAASUVORK5CYII=",
	"github.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAgRJREFUOI2Fk79rU1EUx7/nPrEOpVNy33v3vSQkTUAJCO0bMhfqoCBIwMElf0W7WHBwzlwQXJSiCJ21g5A5WiyIwaGt1T4IJTVTW2mF3K9D8pr01dIz3R/n873nfDlXkIparXY33t9/RmvnBoNBEQAcx9kTpbZy+fzzdrv9dTJfkkWLRCOXe//37Ox+WnQybk5NfXgdxw8WRMYCLRJPPO8HrC1CBCT/C4sIQAJK7b09OCgtiEABQCMMN2BtUTlOB0otQyQeEX2I9EfrGEotK8fpwNpiIww3AABRFM17WtPNZhkasw4A2+SFKkhie7TPGbPuZrP0tGYURfM3unG8kiQrEQcAKnJuzbj08UYlot04XhFX658gCwCw1euJScHp6JKY05ojsV+K1hYAgMDpdTAAGBEQOAUAWltQQxYQ4Na1dNLFOJdKOc5u0melVKpfB1dKpXriiXKcXaXITWBoytHx8ZtqtTp7FVytVmePTk5enZtObqrFen1JRDA9M/MU5Mf+4eFO6Pvfy+XywwS8Uyg8Cjzv2+9eb4fWTifni/X60tAYY9Z8rdlsNjNBELwzvv8pPQfJrCQzYIxZu1Ce8bwvrtZ/blcq9x43GsHk3aSApzWN73++1F+LRC4IXnpa03ddTlbQJeFrTVdr5o150brirwxf63SgM5nV9LnOZFbZ6VzK/wdC3dHy5PPGZwAAAABJRU5ErkJggg==",
	"greasyfork.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAZiS0dEAP8A/wD/oL2nkwAAAVlJREFUOI2Vkz/KwkAUxCckaApDEgwKWgTZyjsEPJSQA3iFFHaW3sAbeABbIaD4p1ARiZEUFjtf8cVFiYk68Jpl97fzZt8CRQkAYwBLAPe8lvmaeLP/RZMgCGiaJgGU1aTs8AIA+/0+t9stDcOogiwKNwNgHMes1+sUQnwDUU7EYDCg7/tst9tcrVYKstlsPkEEAIxd1+XxeGSn02Gr1eJ6vaau6xyNRtzv96zVamWAMfKEaVmWgjSbTe52Oz40m83KAEsDQA8A0jSFEAJxHCOKInS7XRXQ6XQqC74H/L+zolqWxSRJKKVUDg6HAxuNxjsHd9XCc9m2zfl8zul0yvP5TCklL5cLXdcttIA8iNKkHcfh7XajlJLX65WO41DTtJcQRRUAAD3PY5ZlCvLUjhrtSRVA0zR6nsc0TUmSw+Hw7UgvPjmxbZthGFLX9cIof+UEHz7TQz995z+tLSOuavpeRQAAAABJRU5ErkJggg==",
	"huaban.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAU9JREFUOI19001rFEEUheGne3qmFYOJGgTBhZqMGl26E7fi//WnCIK6URCEKEEXJiYmM+2iTpFmnMmF6o/bp95z+1ZVM9h9jRtoMc2A3zjED9zFXu4zDNGfdEn0mIwAHe7gDR7iAl8Cm8SgrZcBy9FYJPcMj2Owhed4ENgi2qH1fywjfoTziBdoAnwSAzhfBVzgHvYzeRxDQHsZA07qL1TBJC7NKL8OMlcaetjieDRhB7cj2hSD0uh9fGzxS2nmMoDpBvdVSI/jFt9cdr5PNVdFE7PvOGhxpGyYqbJkV0UbwGdlT8xrE98rK7BuWZvkO2VlPuBrvm13eTjCO7yKsLrV3pziZyo9w7UYb1UxfMJb5QxU50lc/wbUj35zQNcMdldLnuMltvNeezNzeU6mqeJ0HQBu4QWeBjRLNd0IcB1/NgFq7Cjb9n6gN0dV9Dj7B8VNVpBJb3UkAAAAAElFTkSuQmCC",
	"image.baidu.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI2dU89LlFEUPXfmm09HyaCsTDOLNrqLtNwVSC4K2tRKBAtqU5hhUS2KChSKqH+gaBHVRqSCIKpdi6ggXIQ/spmx0tEcHacxa3Le9947LcZvZtRWXXhwz73vXc47915BzzABAJYALWABGJPDxgLW5rD2/SJsNBwA4OUG/I9J+0sEYLkqEY0oXu9JcmgwSwCIRRW/xLzVF41GANYuiylF3LuTlocPfuLWjRTGogonjk6j61QCY1G1ooBdziD9w8B1BdYAa8sD4jqQ1JxB5rcRz7OSmjPLC2gDBybHYPybh54rSZaGA2hpDUs6ZbCzsQRNzWEcO742/2Zi3EPt1lCeAXBxgCTZ9yjN7VURu7f5qyXJWCTLxT+WvsUiWbYdibPtcNx+n/JIkjjQR8fXYNsOFzVbHKncEMTzZ79Q3+Ciu3MapWFB55l1eNy/gLGYwtyMkckJzarNjsBaOLC5f+1qCqP7wnrOJDTqG1w52znDTyNZhFyR5Kzltd5Kefc2g+rqECs3Bos00DkGwSBw8FC5TMU1zp1OYHREwVMUTxFvXmfk0vlZ3ry9SSbjGnV1ISl0QReUjUU8dJ1MYHhQQSlKseAjQ1npvZpETa0j8DPGIOB3gQSe9C1w6KOi94+ZmZ8nP7xfRHxcF5LWwoEpMAi5gmyWECEEQmsJCCTkCAkikyGmJnXRILGggQjQ1lEh8QkPn0cVKtYEZN/+MgDA0/4FmU9bNO4uQUtrmRQzEHS8Iu+3+iECGACwYmbz5gJo9IHsuQtB+wtC68KaGru0qku+NYBmbpXzh/n1/wuHC2lVjJEkmAAAAABJRU5ErkJggg==",
	"image.so.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAepJREFUOI2dks1LVGEUxn/nvffONaEJnRKTsSCipFWMlS2GmaJNGLRrIcJUuOkfqFzULlq4GNpoyzZKizahJEg0MKvCIQgMXTRQRuCMZAghjs3ce1pc7zQfQuiBB14O53nOx/PKiMbS3g4Tvwq1S+wjui/ai5bLA7mxfGRt56f27occhntUSnZl/WBkgMq69tr4zcljbpx7p5+S6EoBsLT5nsniOOXK6p4iRj0I0e8O8PxCnq+bK4zlU4zlUyxvfGRyMEe/O0BjbQi5uhBVAFV4cv4lnzcWmf6SRUzQQX3InLnPue5BHn0aQaRlAhTQQC0RSzP/fQbLBsuRADbMfntBIpZGvaC2Ebbu3kA9xVMPABEJCsK3QNX/g3qKtoxgGtUK5RzDJ0bbutw8eZdCOdeWR8EOO4EwtfSYqSsLWGLxbu0VANeO3+L22Yds17b+EZtc0OCACJQqq9x5m6Tv0CmyQ3Nkh+Zw6MAxEaKRLt4M/8D3g/oQkp6N1jXVB9/TwKIwq+DVlA+jvwHYrm1xfb6v7kbTDUTAWIKxg+uHbtgR4fL0YXz1mFl51uSGpF5HW7ZqD1Xwq4pXVcQItiv1f2IiMSn9T0AEjCPYHSYg744fiUnJ9CSdTGfcFPeyqGk9wBjq5M64KfYkncxfsy7Xo0OJblsAAAAASUVORK5CYII=",
	"image.youdao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAQBJREFUOI3NkrFqwzAQhn/JgSylOBgypdAgKGhzHiEvkTV5gz5KyBO0a+nUNUuTJ6gzBGUReE8MXjNY6mLBb4V4bW/67k736+444K9NsOOVXlWueQOAVMo6gZgJa0qv9KJyzUeID+xpFGpkR82a98C1cymltnfiXQGv9CRwJpNSWFO27gPH7woAGBPviJ+IewWGxAfiCfGeCwaRwCPx0itdALhGHRR9AucAlWtyAN+4tY5APMIxk8mCA7y0TCYFLfa2A2HNFcAn2vvwSqcAfujJJm4nPqQ1gK/WzQG8Vq55pt9nvQKX6YuPH4RiAHNhTR3nOiOkUtZ8aW3hhi/0/9kvWWFQQDml5pQAAAAASUVORK5CYII=",
	"img.jpg4.info": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAIAAACHs/j/AAAAB3RJTUUH3QUZBA8bjXFPywAAA+xJREFUeJyVlFtsVFUYhde/9z5z2jPDtNNSCx1LLySKESu3YBQjYqIGI9EoYGpMMCFq0ERMAKMmEk3kwQDqq4lGTUgEQ0KIcrEgWlTAsVasaIEibaVDa+lcmDkz58ycffbvA5fok3E9rof1sPKtRdpogBlSEgEIjSYi/B8xsxIKgDZagA1DCM5fPvdeLjMqSDAbZv7vFDAYho0SKu2mxwpjgoQwJgRgvD92fLT1x74BAhkDw8zMxrD5RzJf1VWXQIaNIpUJshu+2LC3Z68goUgoQFB00YoXBm3pgUxECQYbhhIC4CBkImJmEBFJAFe6MEYLEiVdOj58LMbRSrHCYEUkQn8MpZ8bTU7UPeD6yBYqiXgkastfRrzpdTKZsLXRJBSxDsaGRa2jyy5bttXUrKTqHeq9USYTdkIZBYYAa5Zx33NP7NuUSvVXA2zbnV656eCer85s/yQ198mjn345qIQMslOjOz4YHzp9/qU1x9avHc/lFcnR/GhmIjO35bZitWjDJiLBDKHi8dbVMnar65Ybp8n25shfwyfnt5sPX+5avqTplXcPVwI/vevjkxNTjcuWtzy/KX/m97znkxCpidSsplbt6Ihj+1E/7+cVERk24DLBCAFm9iu6tdmZObNZ1Ta89nTsiR8OZ4t5nTqqo9NrAXXnssuJG3Ljk5P+5L4T+8q58s6fdp2VZ/sH+9sb2hQAIrrWL4go0KExbFuCAK9cnj87FotNU4895a5fd7G3x9ZB/OFVs+d1JSL1W+7fUsgVIlFr89ebl7TfvWzufQrMADP9iyhSdjprsqXit33nn1m1wDKIrli9dP5dlZ3vn/l8z7ydPW0zZjBzS7IlmUwCCHq1rtHxhrhgUgYCQKBhWAAIDTJF3n3o9LG+Uw8urFs0b46qicG93HhhSCbbq2MXLz3X7RWLAAc60KH2Qm9xYrHne1P5KSVMVqkoUJnIoPPmVmYueZWO6ZUXV97EymFIIS1RKhzf/pbpnNO25J5b9n9/Yc2jR95+86Et7whTZbAt7I2PbPQ9n4lVcWjbb6dSkYaljZ3dszs7iChX1BC1qjYemAiFVSGk+82BkSOH7n19a1IAQOTVNw4c7Kkw20JcWZtmbdUoEKlI2wYz+V1VOncsWByf5vgBO5QvlMvnRqY6Zs0IATZGzbm9zi38ufFZ5/FuHVQm0umFa9dJXWUpBMmBXwfcouu6bjQapZBZAAZg1swAKAy8qUzOrnHq6+tAxMZIaV2aHD+1+zOLw/qOzoauBQ1NTRHLIlCpXBoZHnFd13GcarVKQVhlY0jIa6AA18+KQ2YmIhNqS9kAKgAAi0MAhvnKlUmS16H4G/RUIZBbMjsmAAAAAElFTkSuQmCC",
	"ishare.iask.sina.com.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC",
	"kickass.to": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAApFJREFUOI11kl9IU2EYxn/n7GzTLXNuNsPMUstS0grCSo3KiKKLIoMuukilughKgxICI8uruomwUAojoSi9saCSCpLQoosoCgJJCofK/Lc2zbYz/c4566JOOLUHPvie53l53u/jfeEvYiO301obKyenh5qrTe3p/VMP7zcdU2drL9prWu9er+w3uWRe7t2seuNNXVwCMDw6GbZaLbZU9yKr6Y8Hp2bsVquyOClBBlifn3F+aWHtVRkg5m9yJ9gtxbquoesa3lSnMyU5wWpyXddwJyfanA5FNvmTl5+qARQA39D4CbvNImmaxmxsKKlgec5WJgI+ejqvxHmeFEd6zH/DrQC86u7d40lxAiDLCilLstD1GdIyCgHw+z6gzwmXAGLGPgtAWemqWqfD6jUMg0Snh13ll1m5ZjsWxQbAkvR81m7cz0RwiNCPAQzDwDAMQpPhXhnA0DRZEwJNCKLqL96/bmHM3/uvm+9rD8HxfoJj/Zh1mhCoqqooALIlNiI0kQcgfo7T+/kFnqW5eNPzCE8F6H7eyELYtnnFFxlgTba7e3ayJgSJDtef8Q33MdfThCASiZKgxDplgL3bs+5EIlGEEP+OYnMAMB2NIITA5VkR548GpkakzPqgDCBlNgyOBab6ZncIBQYAyC0oo+JMG7vL6+JeULDafQtANv/TcG7LkYgajQlNIDTBu65WxIyKJMmo4Qmetddjev6xydChk48uxa0ywLW60hbD4JjJXZ4MXJ5lDH7/iK4LAMKqMC6eLtop5dzonhcAUF+zqcNusxyUpXkWvyJCrz5acNhb1NoRt1Bz8bbtQNXjLl+zK8lmN7VAKPrt2oXiMin71uCCM10ID67vOFt7Yl1XrO944f9qfgPzlVRSGGdqnwAAAABJRU5ErkJggg==",
	"lib.cqvip.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAclJREFUOI2dk71rU1EYxn/n9ralH7EfptQIGjOYjJYiLqVbcTKrkzoIInUQHMRNtBT/gkIoldAtIsXWStNAJ4VQp+iapZrWqIkXWts0Nwm55zjccJNDex36TOfwPuf3nPd8CICjxJziDArMPhfmUWJOGedG+HH95glDpH7A3xcPMIaDWM8SAFy9OI5TKuKUiySngsoEsDdTjE7HCV4Ka4DD+UcA9N9+CEA0GgXAHByitvkGAANAVSv0f85oi5vf8jS+ZOm6cJndyAShUMirOb93qX380AYA1NIprL2CZ7LfL7vpdx67/QYC7drKa5BSB8jDfQa+fnLH1i/q2Qxm7BqF82E9/ed3L10DANhry1h7BezMW5CSgbtPGO3r1dPfJb10ABNA1iUgkKUyzN7iuFXcf3oPgLJnF4B+4yaAU5Uo5Za7xkP0La1ympyFV9hb6xrIBVQcdyoEzZ0ijZkbqBNPS7UWdqinBWhWVYdJ0X0lwlBqRfPW5l9yvLHesgmE6AC4Z9BWPb/Dn8nJU9toB7ky/Cw9sRhjuRxjuRyD8bgvyhfQyOcxtrfpLZWopNO+APM/++RgcZHucBgcx9cjAJJTwTN95/tZS/wDqtSnKoXyohQAAAAASUVORK5CYII=",
	"list.tmall.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAGZJREFUOI3tk7sNgDAMRN9FQazFAkybBVgroggVyKaIwGkouMqydR/LsgAKNAJYQSrQJmB+Sa7ADiQCZMvJtrm0Z5ts0lWngLmDS2CVbaJ732I4wS/wBYHcG/bu7xLUgPPJEYy98wFzzBFa8D+TTAAAAABJRU5ErkJggg==",
	"mp3.sogou.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqBJREFUOI1tk12IVWUUhp93fXv2OQ2p0e40plGRqZVJYF3a4YyG0o9F4BiJ1kWSBXWRCP1BF12kNyJdxCihiEigRCCJ1QieHCFvRCIwlEDnD2uUE+NQjM3e+1tduEdkaF2un4f3XawlZoU3s5XAm4hehx4AwThOG9ivwc7p2/t12+A8oB+jBfQD3wHDVflBYB3wDpFTwNsa7Fy/BfBmdhdwEuMiYqvancnZygC8N5uLs5fIUmCVBjsTM4AjGAViM0FLMG0k6AlM3cA/uI8QOUcZT1D6VSKHiAQNdjbIm1kL4xDicUwvFKaDRWKJEqPWpRtAnM79Di+ilMeYun9G9N04vxHZZMAWYI/anUlMW4vEEqWBWnf4gZotILX5ad0eq6X2VpraAEF3Vhb7gS2GaFULg0SXlBhKDephNd3pF8xJn2ZOellH//hKx8efI7EPqpUcQ7SsdBo4owAE217r0jchsVgE6yrrYXOZhpOYhnzTAzu8b2FDx8djBRgtnYYJHDAAHfvzL317pS/In0rElwFGcSii35cXfEjpF/zFnlUVwARuJkYQSwF8beMNf77nHn09+ov2XX6XqXxRmMrXJkW86GXk39zvpvCdFeBRE8OG8yPQB0Dp7wND/tL8A/7KgteYnH6Sv/MJpooxny7xPELpMxbW4wzIm9kyxGnECoyXCfbejWCLlOimSIDoeOHUyzhO9PVEH8M5R+SZmUP6HONZxBq1OxO+prGMoBVI9wNzcZ8k+nmcExq4NuW92U4iUac6HyeVnE+JPIzxk7ey1zVw7Vfg/P+dMwBpGKGIZ279QqXCgG2IjxA/A0dxfudm12LgEWphF/fWPyGPr3J9ep2+v3pWs+HezBrABqAX8VCVHgLaGMuZl2bUwnYdHhsG+A9Izgq2ecXgSgAAAABJRU5ErkJggg==",
	"music.163.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjxJREFUOI2NU79LI0EYfRMzY4yJlwuIokhAtLJPGlvFRv+BeIoQxMLC5jobO8+zOBCthdN0NgoSUmhlCtFWLSz8AaK7m9WYeEk2u/uu8LIaY3EPBmb45r1vvu/NJwgoSPmzBkw+CRHFf+AL+aiA36jVvoNS/tKU4qcrGOSfjQ26pRLtqys+z801xKnUsrCkzH/MrEZHEUilYGWzCK+vw8pk4OvpQUssBqO7G3BdAECENP0NZCkRXltDYGYGNE04Z2cAgNLCApzra4hQyCMDwJMQUd/7zHVyZXMT+cFB0LYBAKHVVQSSSeDfuQH1eh5HRkiSlXSamlI0YjF+hHN7SzMeb+iDJ1DZ2aFbLtPo7aWmFKv7+6Rts3pwQLdYZGFyko5h0DVNGv39noBXghweRi2Xg6vrEOEw1NgYKtvbsPb2IEIhuA8PKExMQHR0oH1x0avAE/B1doK6DgAQgQAgBGDbXiNbBgZgn5ygdnQENT7uCfjrG/f+Hr6+vte9rsM+PUVgagr+eBxwHNRyOS8mo2/GeS+wslnIRMITeU4mAb8fvq4uFFMpOOfngBDwDw3BubxsdsGMx0nHYTWTodbWRk0p6pFIQ8cL09MkydLSUrMLmlJ8WV5+tXJ3l0Ys9kZub2dxfp6sVmlfXFCPRt8ELCnz3sXWVr6srJCuS7dcpn1zw0o6TefujiRZOz72bNaUoiVl/tNhMhMJlre2SJKuadI6POTz7Cy1YPDjMP0Q9XG2gG8FIb42/9VmvB/nv3oNoTLXs7TMAAAAAElFTkSuQmCC",
	"music.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAf9JREFUOI2lk01PU0EYhZ873N60SqgIiUgrAZGPmGgQCEk3JpCov8BEd25duHfhv3Dj0oTEBdGYmBhjgi7BRGgtKIpIb1sUXIi0BOjHbXtc8CHX6oJ4VjOZOc+cd94ZKza6Ep+erV2iXONIcgyxIZOwaMpI+Y6jmfdkhbOYv52cSBaxLJdnz7cAeDm5zeOnm/WEcg0IuvpTN2+tqb03rdjoV31JlQUpQUpTbwq+fQRdmcPA9Z+7aSJtDazmxOk2w0rWg1MWGAiFrLoQ9v7g22qFaCRL/2CA6dcRtrbFvbvNtLbaXBlxuDoW5EzUZnHJo68ncAixV8LEk7yaO9OixdX7hZIkaSNX1U6hJknK5auCZUFKM/FCfQlnuxw20jVYF73nHB5NbNJ8IsOxUIb5DyU+LZYJRQwtXYalpVJ9AkmKvyvqx3pVHxdLgpT6BzPqHcjIaU/LzXii0RUsKzlXPEhgEXSlQucB7+1skZGx7/R1G6y9O6tUwHEspl5FaWiAxuO7C1Yoja8Lc/NFRobXfGYA24ZSWUQvZvE8+brgA9x/kKfjvN+8r4ANIRsejuf+DejptsltiWoVPA+2C2KnsDsHKJZFuMln+f0OAO7cPslMwmPhc4WOiGHggoMkXkyWSE5XuHwtwI3rYR/g/z5TUxY7NmQSVjh79O8cMMSGTeIXkOIf821WbFwAAAAASUVORK5CYII=",
	"oabt.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsElEQVQ4jX2Qz0/TZxzH36uZxihgpiMmtqtdBNt+C6hxMiYmHrzs4C7uuOxP2NEDiSg6UXBB+20b6ui3VWelhHwrymWSaLeMaqKcNHrz98UDVWmxVVr62qHoIEOf5JXnyfv9fF558shvB3iP1zZotv002368i3K/HWCr7aPZ9uK1jSW53h98tkFbajt7RvbSkdpNW2onPrsFv23gH21l1/C3fDfcSVtqB77lBK6km/5sP7OlAoVCnr7JPlxJN1ttH99caudp7hmFUoG+f/pxJd3/F2y66CI6FYUS8BaCWRNn0kWz7aV9uIPiuyIA0amzOC9uJpBuJZBuXSqI3Ikw/2aearHKwORpnAsv6EjtJl/KAxC6HWbD+Ua+GvHgGnF/TDDP6ewZnEkP7lEPTQkvr4uvAej5+yQKCcXrkLV2eQFF6Ln+K45BB7JWsjrYyMybGQC6M73IFErUI6u+JjDsFlzJzYRvhyjPVijNlBi7ewWdEp8NfM5vN02q1SoARzK96JhQ2IHiDchIb8ef3sbaWD09fx2nnC+Ty+Uo5Auk749x41GGxeth7hFHbpxg74Xv0eAq1DTawpoLjSgoDmWOU8mXmZ6eplyc+zD07OVzJh9nl4jO3BxEQaEV8XW1zzBF94Lg1ctX/PlggrF7V0hM/cGWs200RtwMTZ3j3ov7ZJ/cYt/wDyi6Esn6AsXXI9NBd6aXSr5MpVDml/GD6KQDmXXo9wYUa0DmalZFNrIisgFF61D8SyTLg+JfI7Oew5lTVPJzMFuha+IECq1DiS3IaqJ2z4MsN7I2IcuFLCdSzEBxAwWdHM2E4B0wB4cmBpDprHWxFhQzFhH4L1OiE53rREO72Hb+Z7omwnRdC9Ma/wkNtde6xHLsqe26egBdPYDGf0Tp/Si1r8bl/Wh8ofsE/wKkk2wuOwlZkQAAAABJRU5ErkJggg==",
	"opensearch.krugle.org": "data:image/x-icon;base64,AAABAAIAEBAAAAEACABoBQAAJgAAABAQAAABACAAaAQAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAAAAABAAAAAAAAAAAAAAABAAAAAQAAAAAAAANNFwAPRBgACFwfABhMIQAtRTQAA2InAAN7NgASdDYAOmdBAENDQwBOTk4ATGtXAGVlZQBxcXEAfX19ABCILgAEkUYAIJRTAASlUwArqFkAE7dmACepaAAjvHEALLt4AEDFhABIxIYAYt6uAGjnvQCJiYkAlJSUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAHgoKAAAADwoKDQAAAAAAAAsKCgAAAAoKCgAAAAAAAAAKCgoAAAsKCh4AAAAAAAAACgoKAA0KCg0AAAAAAAAAAAoKCg4KCgsAAAAAAAAAAAAKCgoKCgoAAAAAAAAAAAAACgoKCgoKHQAAAAAAAAAAAAoKCgAKCgoAAAAAAAAAAAAKCgoAAAoKCgQCAgICAgkACgoKAAAdCgUDEBAQEBABAAoKCgAAAA8MCBQUFBQUBgAKCgoAAAAAABIaGhoaGgcACgoKAAAAAAAWGxsbGxsRAAoKCwAAAAAAGBwcHBwcEwAAAAAAAAAAABcVFRUVFRn//wAAjh8AAI4/AACMPwAAiH8AAID/AACB/wAAgP8AAIj/AACMAAAAjAAAAI4AAACPgAAAj4AAAI+AAAD/gAAAKAAAABAAAAAgAAAAAQAgAAAAAABABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ0NDkENDQ/9DQ0P/Q0NDMAAAAAAAAAAAQ0NDsENDQ/9DQ0P/Q0ND0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENDQ/BDQ0P/Q0ND/0NDQ0AAAAAAQ0NDcENDQ/9DQ0P/Q0ND/0NDQ1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQ0P/Q0ND/0NDQ/9DQ0NAQ0NDIENDQ/BDQ0P/Q0ND/0NDQ5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ0ND/0NDQ/9DQ0P/Q0NDQENDQ9BDQ0P/Q0ND/0NDQ9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENDQ/9DQ0P/Q0ND/0NDQ8BDQ0P/Q0ND/0NDQ/BDQ0MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQ0P/Q0ND/0NDQ/9DQ0P/Q0ND/0NDQ/9DQ0NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ0ND/0NDQ/9DQ0P/Q0ND/0NDQ/9DQ0P/Q0NDoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENDQ/9DQ0P/Q0ND/0NDQ3BDQ0P/Q0ND/0NDQ/9DQ0NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQ0P/Q0ND/0NDQ/9DQ0NAQ0NDYENDQ/9DQ0P/Q0ND/wI7C+gAOQrwADkK8AA5CvAAOQrwADkK8AA7CsUAAAAAQ0ND/0NDQ/9DQ0P/Q0NDQAAAAABDQ0OgQ0ND/y1FNP8IXB/+EIgu/xCILv8QiC7/EIgu/xCILv8ASxX8AAAAAENDQ/9DQ0P/Q0ND/0NDQ0AAAAAAQ0NDEENDQ7ApTjfVD3Iz+yuoWf8rqFn/K6hZ/yuoWf8rqFn/AWEl/AAAAABDQ0P/Q0ND/0NDQ/9DQ0NAAAAAAAAAAAAAAAAAAHkzUxSOSvFIxIb/SMSG/0jEhv9IxIb/SMSG/wF6NPwAAAAAQ0ND/0NDQ/9DQ0P/Q0NDQAAAAAAAAAAAAAAAAACPQlMbpWDxYt6u/2Lerv9i3q7/Yt6u/2Lerv8CkET8AAAAAENDQ/9DQ0P/Q0ND8AAAAAAAAAAAAAAAAAAAAAAAo09TILhx8Wjnvf9o573/aOe9/2jnvf9o573/AqRR/AAAAABDQ0MwQ0NDQENDQzAAAAAAAAAAAAAAAAAAAAAAAAAAAAe0X+IFs13wBbNd8AWzXfAFs13wBbNd8Am1YMX//wAAhh8AAIQfAACAPwAAgH8AAIB/AACA/wAAgP8AAIB/AACAAAAAhAAAAIQAAACHAAAAhwAAAI8AAACPgAAA",
	"plus.google.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACEklEQVQokZWRS2hTURCG/zk3j+ZlcvvQpBprjBFBqlEu2gpuqzTRihWRrgSFLgRXuhCpO6GrCoKICxdFpW4UadG6EqSIIKVScWGJMU2bmhtpXo1pTHLvuS5uGmuCC2dzZob/Y+b8Q9FQL/4nDH9SVeFrGQgGVEqaUgFANhdziP8AVEVod3c9eVWOf7MeOqL3fn2eT1y50MAw/eGria5Hk7mXL1Yuhb/2eAGsf5pbOh9snsAAaNWKrX8IQPX7MmvbDrMjN/XMeuCwad9xcA5AlWN/TyDiP/MAWvYf1Ip5IlLyeQBKKgHGVDkWmE3WGQaADMb1mdeV5bgrfNbadw5qWewf+HHnNlmcqhzjURkAj8o6Q3VbeSruGr5hCUo2qSfzdDw9dhNcDcwmN38gInlYvSBne2bsanb8PgBnX9jo72atnojkWRAJwIJIEckjuH01QJUXtwwN73m/uvXarcLMG6G1bdfEtHGHT+jwMr8bAPO7BbevthJfy3TefWzeHYidDIIEaNzUfXTng4nih3fJ65eZQ1TlmK7esLVUsAal3PQkNDBXBxO3lefeZqeek8msi+rqDZeYAEA8PWg7MchzKZ6V7WcuiqGB9MN7ZLE3HI6ioV5NqRp9ez0jo8ZOr96tJpbk0ZHKl3lqsTYCi6eOAYCi8EJGK5cADURktpHdSQYjmsLwcUXeVNaWhqKgmG5WA/gN0x/ITLhc4AYAAAAASUVORK5CYII=",
	"s.etao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAIdJREFUOI21UrENwCAMcxBThz7DD9zDKdzDD/zSD9opiEZBgVZ4I4oT2wHYgZjrHXO9Z3qJCQBQUni9LZQUyH1VyYvoDxkAnOZ31gIA+J7EGVhD+j5XUiB/nNfsRgkzA3khWVcHWBmUFKiFyISV4Hp4raiFKS0w1I+0dMZRs1bX1DQFI4nb8QCzyUofF6/fJwAAAABJRU5ErkJggg==",
	"s.mall.360.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAArlJREFUOI1d00uIlnUUBvDf//1u8804jYaRNUJOiaW0ECLFUCPHVS4qDFqIi1ICQ6LbQomictEiaCGBuRAlKGwXBJHoaBfyRkWiuDEtQ2smEkd0fH3f7/ve02LKwrM6i+dcnnOeJ7klfgrLJnn+u+PW/PK7O8qgPmR80Spfjsh2rE3V8f/j07/JoTCjYPeJg56+s79tfLLjr8tdxy4ydDeXprgxxZqXfDIsbdyUIr/ZYCzMaE6lb+d1Zi6eO3MmSlymyo3/Gd7/jP05ecW584w+6YfHV1nxYpKDycj2RsyPiPUR8XpEbIyqWhqdckZ0clHl4sAhMXeLaL4irBOPnPQROBGWRwxFxLqIOBARP0fE51EWz8XKN9qxckuK8qqIa+Kbr8S9W4U1ov2yyCMtqS9iE20MYwTzcFXVG3T0fK7sUl1BixUPMjbA2EJm99H3R9pcr/c8qlbggohTup0JVe+kovhNo07ZoyiQk5XcM4sNS5CB5Sk6umrNmjRft7PA6LYjDv86oVEjZeQFUeAGK4cZ20C9gUEMZGVdhVQSZynGNXvXdQu6jekXRQ8VajQb6E5vI9BPiusu6BlWEhndKlNVFFOVodemNXLlTVpB1qFekorpYgPNXzKXHDx3il37uXGZRq/Sikor0Jue2EIr0ahI3X/4t9CofZ1dmWvH5qN832Ppxxz88b+Drb6P1SNkXRTooJdoZ7TqygXZBwmWHbP3tqOeKXFhnA8f5rEH6BWJXlKLTOpm0wLtqzHUdO3+2XsG09lnE7wX2lvfdrh/wuLb55CCtYNsW9rQ16oTLVKb/gGGBuy7q3vki2xydHu6mN8007uh/dYuO4t91hvELBqJtXMaRkcGZX39Tha5008N7hmWv7A7TeS3OhlsD0sWn7YzveOMV+thazv6P511ZmHM2flEzH7oVvzf1nM6nTuV3nYAAAAASUVORK5CYII=",
	"s.music.so.com": "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAOrz5FDq8+2w6vPv8Orz7/Dq8+/w6vPv8Orz7/Dq8+/w6vPv8Orz7/Dq8+/w6vPv8Orz7/Dq8+/w6vPtsOrz5FDrA+5w6wPv8OsD7/DrA+/w6wPv8OsD7/DrA+/w6wPv8OsD7/DrA+/w6vPf8OrTz/Dq49/w6vPv8OsD7/DrA+5w6wPv8OsD7/DrA+/w6wPv8OsD7/DrA+/w6wPv8OsD7/DrA+/w6vPf8Nqjv/DKU4/w2nOf8Orj3/DrA+/w6wPv8OsT//DrE//w6xP/8OsT//DrA+/w6uPf8NrT3/Da09/w6tPf8Nqjv/DKM3//z+/f+E0pv/Dq49/w6xP/8OsT//DrI//w6yP/8Osj//DrA+/w2tPP8Nqjv/Dak6/w2pOv8NqDr/DKQ3////////////9Pv2/w6xPv8Osj//DrI//w6zP/8Osz//DrI+/w2uPP8hsUr/pN+1/+D05v/g9Ob/itag////////////8frz/w6yPv8Osz//DrM//w6zP/8OtED/DrRA/w6xPv8stlT/5fbq/4LWm/8tvVj/Lb1Y/4LWm//5/fr/7vnx/w2wPv8OtED/DrRA/w60QP8OtED/DrVA/w61QP8NsT7/r+O+/3/VmP8OtED/DrVA/w61QP8OtED/gtaa/6zivP8NsT7/DrVA/w61QP8OtUD/DrVA/w62QP8OtkD/DbI+//H68/8kt07/DrVA/w62QP8OtkD/DrVA/yG3TP/u+fH/DbI+/w62QP8OtkD/DrZA/w62QP8OuEH/DrhB/w61P//0+/b/JLdO/w20P/8Ot0D/DrdA/w20P/8htkz/9Pv2/w61P/8OuEH/DrhB/w64Qf8OuEH/DrlB/w65Qf8OuED/tejE/3/VmP8NsDz/DbI9/w2yPf8NsDz/gtaa/7XoxP8OuED/DrlB/w65Qf8OuUH/DrlB/w67Qv8Ou0L/DrtC/zbFYP/r+e//h9mf/yy7Vf8su1X/gteb/+v57/82xWD/DrtC/w67Qv8Ou0L/DrtC/w67Qv8OvkP/Dr5D/w6+Q/8OvkP/KsVY/7DpwP/u+vL/7vry/7Xqxf8txlr/Dr5D/w6+Q/8OvkP/Dr5D/w6+Q/8OvkP/DsBD/w7AQ/8OwEP/DsBD/w7AQ/8OwEP/DsBD/w7AQ/8OwEP/DsBD/w7AQ/8OwEP/DsBD/w7AQ/8OwEP/DsBD/w7CROcOwkT/DsJE/w7CRP8OwkT/DsJE/w7CRP8OwkT/DsJE/w7CRP8OwkT/DsJE/w7CRP8OwkT/DsJE/w7CROcPw0Q/D8NEyQ/DRP8Pw0T/D8NE/w/DRP8Pw0T/D8NE/w/DRP8Pw0T/D8NE/w/DRP8Pw0T/D8NE/w/DRMkPw0Q/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
	"s.taobao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAS9JREFUOI2Vk71Kw1AUx39X0tkla6Fv0A7GqfgA4lh9goC0YNaCu0PWDC2BvIDEzRKcq1sWV7dC3czgrnAcbm8+b0T/cLiX8/E/H/dcJSLw8iBsU/6Fs0uYzpRTBt/ea8NiAqvX6t6DIvRxQRy2Kby/AQIocAaVlzOAKG9GZjE8JbjDEUXo45SG4FSfUa6dzq/1PfCaBIZws9an3F2JzMdS4uZEiw11/XwsHxfHcmRtsJ058LqVHFARLCa6dFNivfco787CjMmqNdlMUE/2ZgWgBxd49mw9FVQE5u1t6AkG00I9+PurOQuoFsr4ZXGLoO24WVfv3E6QxQ2bkudUitDHHY76W7Cg2O9wlwnKfKYi9AFKomK/+5XAXSYwnSlEpCmHDevoe8S6ie7jp/prKz9mycYrcJcFPQAAAABJRU5ErkJggg==",
	"s.weibo.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAkRJREFUOI21kklI1HEUxz+/WWxRUStT1ApyYsacii6WC50KuuipbjlgdQwKD22HCIIEwTwUQZlODEgbCHUpJOwi0SIImmRJ2VChZuYyrsz8f98OLih1EKIvvMvjvc/7Pt6Df5RZbaEaKcVQgejDcMccn8+7Vj1qDdWIyrhDAxapkSN/daCCIMicBQ6AHpredxEAhQFRhOUNhjorql0utq8AyB885KBHg4lEmowhz+3+ZT70bATQDWA93+MJcrxuCoAmxOgSQIHgqaFE4np8GTDP43kP3EJUYEmn31yloXs/ln3AU+CEWZhcOeQkInFrpfGY0ci4YMYIN56UNOyGdIzXS17c+5n67ovE2ItDJqLIKFDIsGM1OzkFA4OkXqsltawE96ZMnKlJpj/2EaupxfnUz5aszFf0JhcbXqMmjiLWIX/wfnRzrgaPhSRrrZX0oKXFNoTD6uvvt5qX/Xn+gqKZORrdUeDIHzy4tGcs3z/6zV8oSZqenRWwIrq6urSoKB59zfdLgWD3Yr9rbCKWlnyySgD3mptVXl5Oa2urQqEQgNrb21mA4UpKlQCkuSVAXkpq28zzNgOQnJJiiouL8fl8JhKJAJjSsjIAM/X4CdbIJLlcgKlZdvtClJE1MnLpsiTpSl2dALurtEQvOzutJE2E79ovoB++gBQInl7+O/NnDBTCWOz25PRsZdK5M2uT9uyGhMP02w5i9TeR25Cdm/0CVGV6e6J/AJbcbPXBwPBO4uOHgQy8aXNsy+nA43pmenv4L/oNMx4gOdtWhgoAAAAASUVORK5CYII=",
	"scholar.google.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjpJREFUOI2Vk01IVFEYhp9zzp07P3fESkw0JCtBU6RFkBAk/RG0mhZt06DFFCUt2pnbIBKhVSRFQRlBEFnRogLpZxNlUIYLy4VFSZciqZnxMvfeM6fFHcdBlOhbnQPned/3fN85YvihydyfYsTShQbK5WsoalYtISCecNxDnWRFz3nzvRrO+9CzRbKn3SIsrQADSsHQEx+tHNeqhnM+7NoiGTqSXN0euPc6oOBDjV1okMvh4X/AJ695pGNgynv5P/CZmx5PP2lilkCpSESuBk/MaPZfKPAzF3n9yBnGpjRKwu4ui4EDNoUA5MEOtaLz48kA94/h1gsfgPoaQUNaoM3SGWNAjk9rtp7N0z6QR5zOEZQ731ovSSgY+xBWgNIKU5G2giZHsCEt2LFW8mgiAGBnh4Xrwcx8ZPlt3rAQGBa7rsoLq1otbcPggyKb1ku2tSiGMnFqU5DzDH0jC9QlBDnfMPlF83ZWE1cg9p7LG5bVXN7Q1SS5cyoFQKCh99ICs78MqRj8LhqSlsBWVBJFB0swVzBsb1a01kkWrxxTcLs/RfdGSTGE2ngEQ5VAoKGtXvBq0GH0RJLD3TH6r3uMvvQrBhePJonbUKrKbEH0IDwNV7JR5PefNZnLHi01guczmqIPx/bZUXM3K55N66UEoXJcY6CpVlRUE7ZACFAC1sQFd98tjXL8oyZWzh0qx5WZTrIly3G/zpcYexONsK1RcqM3QfM6QUejZKQvQTGE41c9hIm+c6gcN9NJ9i9w7NfmSrS+SwAAAABJRU5ErkJggg==",
	"se.wanggou.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAB70lEQVQokZWRv2tTURTHv+fcd/Nem6SEmjSRSIVYRRQstlhxtENAoShS0MF/wMW/oItCBycXERERxEEcxEEHEeygCHFyUSLysDS0GgxNW9Mmr+/HPQ4vbYiQwe907hc+l/P9HqrkSvgfWX0vEQAg6g6xiAYCpDUxG99n2943TccTEVIck3uACDvO8KmTeiy79e7D6FyZHBvEMMZbXvHcH0G9AREQ7QHGqJF0dv5yemaq8/nr+K0FiAmbG6Q1K7X1sVJ/8Lhd/Q6R/pUUw7JAQBQ2nr34dfe+Hi/mrl89MHdBpVO123c8d/mf0L3wEgQm8NtfqqsLiwRk5y/ZpcNe1eWB/RGBmZhNGG6+XYpa20PHJlQmPRjoYgBz+KclUURKgYj3d4hL6F1AYl9gTKKQJ62j7baEIcc2BREnk/ahg6bd6f1thAKjUqnstSuAdFzX7HgWiHR+LDU1mSnPDp043nz1RiCkWBfyqelJ5+iRTHk2fXb699Pn3jeXNFvs2Jny+eLNGxIEm0vv64+eiAjrxOjF8si5M+w4uyu1n/cerr98HTY3oBR9yk/oYsGeKJmddrBW92urZCeSM6dJazDDmLCx7tfWolYrro4quZKEEXYDMEFbpBQg0vFhpJvEUqQVuFuPBYAsBUv1nWDYxgD9Ba2py+DGJDtQAAAAAElFTkSuQmCC",
	"search.dangdang.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqRJREFUOI1Nks1vVWUQxn8z73vu6T33K9AmCoobITXVBFCDMeZqGgjiR4hbcGFIjCtCTYxx5caEv4JUWejGleu6YYOxtOrGoEgk6SUopUU0YHvPec/7jotzwc5m5sls5vc8IwuXv7H9g1303RSKUKbAX1VFrsquvEWIkbtVaHSrBXjKWHIvF36+eu1zP9vfzQfPDlnZHGFm7G53me1OMybxw50RM0Wv0Rb56e4tzIw9nQHdosvC1V/w3azN8uZNXvnqM4gVL+8/wncnz7K6PmK4+BEvzb3K9+8ssLq+xvDr8xAq3pp7jS/eOINzGV4sEi1BGEMIjOuapgx8QVs9AMEMygrqkioGDEMJ+O0UeLzd492Dx7AYeHHPAQB6WRtU6WY5AAf6M5w+eBRS4MgTs0RqoiX8Vqh5sjPg3OGjGGAmXF5fY2VjDXLP7fIfLt2+gRfPuReOkWLksaJHHSMhKX4mL1jeuMn8xY/BTYHLINagBlmf1dGvzN/4FGiB85Aq3p4bsvj6e0xlit+KFXuLPqcOn8BJhgqYCCKCkmFEzCIK/DF+wNJvK2SqAKSY8P/WgX2dAQuHjpNU8CYYRhLQiZeigiJc2RyxdP0KaooAKoqfyTs7ENogDszA2SQNgSQgBlkGrkBVMSDh8GUK7O30OfX8CbxkiCiPyhKGIAhOHLe2/2bp9x8xSZMYI/5BqNhXDPjw0HEQefgBjRdmzQyoelbujFi6vgzJaCASfjovWN4YMX/xE/BT/yM8umSCItbsQsX9qpwgKD4aPN2b5uRz82Su1SAIJDHEwBIIiohhCrEcM3zqGXI8Zgn/Z9pG2zkX3nyfHfCNeYBMIIwdppK4lu6RLHk58+2Xi+NyTGZKBJwDIigOUJLUJCKKkiw1PYHr5p6t8tJ/92gp0/nKl64AAAAASUVORK5CYII=",
	"search.jd.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAB70lEQVQokZWRv2tTURTHv+fcd/Nem6SEmjSRSIVYRRQstlhxtENAoShS0MF/wMW/oItCBycXERERxEEcxEEHEeygCHFyUSLysDS0GgxNW9Mmr+/HPQ4vbYiQwe907hc+l/P9HqrkSvgfWX0vEQAg6g6xiAYCpDUxG99n2943TccTEVIck3uACDvO8KmTeiy79e7D6FyZHBvEMMZbXvHcH0G9AREQ7QHGqJF0dv5yemaq8/nr+K0FiAmbG6Q1K7X1sVJ/8Lhd/Q6R/pUUw7JAQBQ2nr34dfe+Hi/mrl89MHdBpVO123c8d/mf0L3wEgQm8NtfqqsLiwRk5y/ZpcNe1eWB/RGBmZhNGG6+XYpa20PHJlQmPRjoYgBz+KclUURKgYj3d4hL6F1AYl9gTKKQJ62j7baEIcc2BREnk/ahg6bd6f1thAKjUqnstSuAdFzX7HgWiHR+LDU1mSnPDp043nz1RiCkWBfyqelJ5+iRTHk2fXb699Pn3jeXNFvs2Jny+eLNGxIEm0vv64+eiAjrxOjF8si5M+w4uyu1n/cerr98HTY3oBR9yk/oYsGeKJmddrBW92urZCeSM6dJazDDmLCx7tfWolYrro4quZKEEXYDMEFbpBQg0vFhpJvEUqQVuFuPBYAsBUv1nWDYxgD9Ba2py+DGJDtQAAAAAElFTkSuQmCC",
	"search.kankan.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADIUlEQVQ4jX2SfUyUBRzHvyBBjHMneKbNzpTUZtOyLXUFIW3h3MzcKqZttbFenZWzNTcHMpGXkztwolYovqAoWDjf1jHSIHChYrwccIfPPc/g4HY8z3N3wJ0ded0d6Lc/KDaT/P7/+fxeAQAfNcxNNnS+dXC/7b3TxjsfmPZ1bNpc3rh0PmozZ2h7nMlp0tiyPCWgy2tqisF/s+7q3IRDwmdWs1LIBkcKLdJa2mxvULy9+L7YmPijoXnL67pOYW2SwLxMOWw6MRbZWtzv004J3r298f0Cxy7mCCk8J8zhyW4dd/0W2553bWblxSuaFucPGGw5vyj/1cbq1egY/0krRUJb3BHrF9LImklB545TWdI2bhPW87j4AnMtTwc+aYp/5t8C504m6cWCWENfaZwxs974PFrHW2EPcblr3P+hK7gGb/cY2jZIOdxs38p8KYPbOxZ3PTIngDvZsct7K55YucpsTsb1yCiEEOfYghZkCCeG0vrKmSqW8WPpK2ZZ0lunEzyUS8Gq6BsB4lYwgNeEy+5XHGYuFBuYIlbzza5sa2YtZjxWUOWpR72PuHB3FCuERvuKwR5qxAHOkwTqb173La2p0f0vXCbvjTrrIc6MEIc9d7Gwt61umcvLaPEeY8U/GPermzHfOjIeAUsVHUqUM1FH/oGLVGoOyF2YbbEWLVHCjBMjhC3MqOY/idIh8xRY4k7AATULJrUfR4eJ0z6iQCUMClfXDH8ObauUkSxPUCdFiI4wcStMVAwTRrkF+9VamNR+HPYSZ/1ExSixRyH2uTmzTLWmVw48CVztTtAP/DXw0uDEJNwcIa7cI773EuVeospHnPITRg+RIxNFKmFUJvSFjrSpLp+1+r/Z6LnPBe0Roi5MXAoR1WPEUT9R4iVylUm4UGF0sULtbmnnQ/v5+qYrfpMz2LZDecCnfg4RlWPEIR9R5CF2y0TOEGMKFcaXyNRk2/OnvU6B3b3onb6A+KXzAVN/CXL+sVEmmtycVaxydpmbiaVOn26v8Olj/yO97vd5L17rLU+94fW8fHmE+iMyk0x9Lk1u93fane3PTcf8DU66zKoIw+cZAAAAAElFTkSuQmCC",
	"search.suning.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABZUlEQVQokbWSvUtCYRTGn9d7Tc1EuWVuugTWUAQaaf0JrkZrQbW6KU5abc5NgRAELrW61NKWUkpkUFFoghBo3tKLXvXe69uQnxR9DJ3tnOf8OM85HILwJX4fgqj6QzcAYBioSahJ31fYvgDQiAsA8Sd68lBFrwZAPnagIcePZsh2CoLI9pPuaKOWiXhsAPzxfKWpQMOCIZ8sdacPxtbiZKkmrR/n4k/CF0uTQJIEEoadVKWhAFiK3gVPCma9enWOQ11CQx4CmDbNB+eF3QWfy2LUMlfP9fNCrSOpSDnkPNucGQK8dpPVpDlIl9ccEwD2LkqD3nhRNuvVA0Cb+pYtSpveF+tT41pelGMZHhQjBABabcrXZW6U7QNu65jbZog/VDx2E4Bo+kWsNs0E3lkOQOzmtSQqPYAFkHtrOfdvGRVJbkwrlB5e8+Wwk9OxmaK4cpQ9zVYf+SanYzq3+ffnYyGIfwLeARKUkv/QvgXRAAAAAElFTkSuQmCC",
	"search.t.qq.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAs9JREFUOI19k8trnVUUxX/7nPM97k3uI2nMbZpEsDWmlFSoNKKCdCCtDyjprLU4yMyBAzMQhP4DDjSjYsGBgw5sOxGplCqKiEJLqXJ9FaSNqfhIor2Nyb239/V953zHwdUmo67R3uy1F4vN2rL3S//yjk7tXd+qDwGAB4St+n/Itl6Q3GCzMbhzQQ5+vLpRT7IyfovsgU3n2fAe72FICWUtKLbrCUVxPdOpb5R9MHBf/V7maXvP4kyZ2UqMIHxX63LqxiZpBiUt9110bSdSvdThModzjlpiOTJkqJ/czdyjRW6sd/m+1uHQZJ6VE49wvBKw0rM41+f3rMMk1oK1JJlnf05x9oVJFq//xRvVddCq7+wKLEwVOP3cJLc/WubbuiVWgkstMnbmuldRjpXEUT22h/V2yuFPfgMlvPX4CPlA8Xr1DmTwwbNjPDlRYOrCLXZFGpIeJu12EOugnXBg5yBz53+AdpPLR6d5ce8oAM+M55k99xOvft2h+dpT0GqSWI1Yi/FpD2dTSC0An639A60uM2MFnPOIeA6Ol6DV5F6jf+hQEtKOR5OhPKBEwPWH8w+XITIUQ4PWglKKc9XfwWieGC8CkLRStBIEMEopRGuIQz6/+TfaGH6cn+W9a79y4dZdKnHAp6sN8IrFw9N89UsNwgCtNR4wWhkkCKkYOHJ5iVcmClQKhjevrYFR0HCgAj48NsWhPQ9ROX2VkXyMFsFLitGBRoLwv3BkLDw9wjtX/2CmUuTi3GN0bca+SoHVZsK+96tYE5JX/TBliceIMpgwwnsPPmN6tM3blxKeH85xaakOAqeurHJxrc2uOKAYbf2Gcw6jTV8gyTwvDTuW1/+EaIKfexnf3GwAkFPC7tLA9k9ARPAuxaiBUlOHUUE7z3DcZWmzx44oJtaOmAdAKVyaWhn/ws8P310+o5zNJR7aTlEy2YNWESATlWyOTi38C7dMLjj/5npVAAAAAElFTkSuQmCC",
	"search.zongheng.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVQ4jU2T20+TURDEZ89XtYpaxNYoFVEuBlBjJDFKNBr/aaGlgmIoGK0VVIpGbiriDUW8le9yfj58lPiwL5PZObsze1TrEHMnA16ddaz1i/UhI9reZGtYbA2LH8Pi82VHtL3Jar/jdbeYP2k8OW5UDwvVC+Jl0bHcI9YHHF8uGwA/R8SvEcfv62L7qvDA+oBYPmc0io5aXswcEZrLi8YZ8aZPfLggtoYdJNC8KaLbIrwpflwXeNgYEit9xosuMV9wzLQLeQAPHoCQBI/3EN9y+Dsiuu34c81aBCCh1YMHPTthLHSJlX7xadAB4JMd4hsivCWiG+LniEjiv3hgtTdgoUs8PSGm24VqedEoiqWegPeDIvYJxAk++kPrIf42IQrBxyz1GM+L4mnLg1pH6urrbrF6XpDEfL2kvRQ2rxhfroiNIQdRzGK3MXdK1HNKU6jmjHo+YKFTvOk2IOLdoOPDBcfHi2JjSLwdEGt9GSDhRVHUC6KaM6YOCU23idljRq0gFjoFwHKvWOs1ls87VvqMpZ50QjzMF8Rsh3jYZkwdEJrMpqM8zgXU80YchzSKjsYZsdglFk8bjaKY7xRxHPO4PeU/zBqVjEOVfWLqgJhuE7NHlcbUbO5FBpDsNPHhDj6B6mFxPysmnCgFQhWJSsZxP5uqAhCFzLSL2aNGNSceHTGSOAQSJvcbE0HaPC6hVlbex7sHlYCHyayYOiQeHBST+1uH9N8RpTRUlnFXRsmMsoyypWaNZ8S9jO1VQkxFYlSOkhljEiUzNC5RNlHSbpnhvae0i5cVMK70M5UVpBwnKtpdIVVzjP0nEn77RtnEqIkxl2I737cYlajIUlyOksQ/495yz1qygQQAAAAASUVORK5CYII=",
	"searchex.yixun.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkklEQVQ4jY1Sz0dEURQ+76VW0Wpo1SIxNM17d5M2s4qIaFWifYtaDhnTnHMpERER/QfRqn8grSJq02pIqfTj3UNEtEt8Ld57M+/VyDvczT3f/e53vu8QFSgsUh+aNF4E25tAqI4GjfwLGmtqyYjCiKIqL1XD7s2IYklOcWVrSHtGFKGohuJ2cgQBR/Nx072PNu6HjCim5BH3toxd2coRGFEY1o8C0v0DWB9Z+Yaj9YTkrgMMJdrsynN7RERgmoX1AeudZ0nDlqvHCtxR53JiI5oxrB/x/G4ZTSrBegrrA0L1HAHrsRFF2HLd+8paezBVEHBUhngn8e+/DtNsyPoQ416ns7JqibufX9y/0vOx9Xcr64/DiYHflbX2YCYBXTWiCNnl5oX19+MxvAss0kAnKXY3ObcNu8PEmP08gfcE672nKQTsthOC64CjcsYYd54a2I2Qqsnc8xkDz7peZTxIEwhYFzLytyH+HhWpUPTz96ad2GVMyvPfDUy2NU/QipaMuHYKqMkt5uSy5+PkXBRSVqR+ANUmTj8l7J3rAAAAAElFTkSuQmCC",
	"share.dmhy.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACkklEQVQokQXByW8bVRwA4Pd72+yLHU+8UUpC2iJAigCxCIG4IHHgv+QPQOoVceDCCYkWoaY9RLh1FMdOvM543sy8le+D5zMrAVnr1nuNDc8yFAUOE7QTcHcvf77Eu5X77BGVyv36nztaRCVxxuHFqhoPw9Cil+9q5gdS1NvWfTJOz33jTclt5XoB+ukp+eWFprsGiwOa3xrn5OWHcjThm0M3HUXPPMyRuynRRabzyDlE/not1iWnN8vaKvzB4zjN8O0Ox8gWRaAt0kY2hLw+GOkgIkS3ugxD2zVUS+7j47joaaOPAjFQGwty7yoD7wW45ngh0XZR9vIITCcaRf2UbVbk+e/zj588GiagwP/tz63rCAv04+9OQuuu3jRXcxx5dX4a5KOUtkrFWdJoerOW4z5fr2tM2s+/HoUKr3btciEXG3R2xgLPPByOMaSYWaAEcdYZOFoEeRoOwnToqclE14LM1p3F7adn3uWFlzDSB4qtZ2uh92t5cZonfst8uKvL6xUA0CK3gwB/+0XhE1CoHY+ynVC021N5ePjxmwIT5Byb3xmn/ZQhsZU+Yj98dQJMCUOdiGezKj9PaHusvv9yKIUqW2wwiMYCkH7CnLVAoT6i2nZv58fpaaJtF6qINsg77GUcgHKEGRMOqFuWDBIawKvr6nqJDVFeg549RVObNlLT3gn/42oT82QyUlESoqqT4DMOugHPJ1EoCInOz+gkxjEj/1y3lFM3KbLbmxKNY8J03uP+W7ItUTFAT4Lwo/dD45xHnOoUUI9Sgn2KexkPAkI5zvpIVHWRBH+/ur8vO6DAqAuJ6yw0zpu9q4MQ05ghi02/SJYPMtCsquxkyM209++bhvJuMuBKWW2I6Gwew/SE/A+znmA1RQ8eXQAAAABJRU5ErkJggg==",
	"simplecd.me": "data:image/x-icon;base64,R0lGODlhEAAQAPcAAAtDfdfZ157SGiNswn2Qqv///+L77XioqE+ATNX2WV6RuLToY0uFmqXTwyhhln6uTUWEwKDJjFGV6CVkrczMzLPoDHyrd0h6dOr7bChZi6issleNvoq/2G6GoFGR2oO3MTZheit0zH6shLbj3mKVaxRPjp+0yu/9jPf39z1srF16mjZztT2D3W2q6iJZna3hjTdjn+Pl4oulwVmX2JXMRqOko57P+2OVT5zWIVOQy7ftLWaEsF6Wf2Oh31iSqj6G2WWg6PDw8Jyioz54rTNqth1OgbS7xIK7N8vxabDlDBlVm1yVwjl6xLe3t0JzhzJZgjNjooOtrUyEiuD4YzR6zUF1rlGEV/v+n1aLrUqN3tje4XSLqzRnkzFyv0qCzWCKmmCb4Gqia7TsDb3wb2KQZV+V0SVZlmGGspeswPX87BhRkxpXoWOk76fbEqnQzSxhoIKxU16e67Cyr3a08kRqlzt80TBorc/X2OTk5CpsvClfpbPjj0eL2GSbxUZ3ed7f3e/371t6p+L5b7btCjl0qStalTN2zTNmmVmFV22l4TR609LZ32GUsUWEwp3Jl+v7bXKGmxpTjT16uEKH3Y6oxGOMrWOk6i5sviFSnLW1vU52sDB0x2OJth9doQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAQABAAAAj4AAsIFBgEj0E8QVAMXBjkTqAMAAAUOqNFIUM0Rb64MZBmxAYzJoIMRCGjRJQrJyLsaWCDwxpKFhepqeLokaAxGF4kmrNEzaICKDhNODRmypQFSA4AAQKB0BkUQd50iUQjgVURZSz9GODjTZAgSjZ1QqADjgUFM/goCtHIxVcXhvI4OGLlghQGkphQqeM26iYqTIbwCOPnBiIuK5hASRjoEossHnIw+CBGjAASdgKhQGFEzyQJcXpgEVA5iZNCRghuIZKFTYs+ZNpUQJShg0iBfwik8AImEaMHIJ5ACrCwAB4NOzSlgEFHhZA/xQWioNCkRg05FCwKDAgAOw==",
	"so.1ting.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAcZJREFUOI2FkbFuE0EQhr9d+05nJzImGAQhQEQKJEuJREdLg2iokxLlBZB4AnqkyxsEUVFRIwo3UUQqJJKYUCCRM2CRBPlsbCd3Pnt3KeAiX+4sT7ezM9/8/4xgQrieMgftMJGrXnZ4vpgT4zlxsQmg7odEBpq//xDpEb3BiEd3ygR2kaVZKwGR482fOxF1P6TV6XB0fEykI32l32etYumP9Z9cGnQ5OBMJWfnxx4+Ao0LQua6GQzCSaKTkyrUZ7t8qSado8e7kFCzjrO9F0eaKbacsvDg0p7tfvxd7Ct2PRrLs5PWze2X58HZJ+8FQ3ihaOla9/oVfr6pi/hzgespULMVdMeBkoImUZnWpnFjinh9S69nsnsnW66qopCxsNdqohRmeLpb+TzIahASjDULWejYAcXMKAPDBa7N6sygLUgBC7vgjbGHkVjeXOmEmAKAghQbkRuPcMqWKzCpNA9b++ZYbDZ058WIksNX5Cp2hntaTDYinNZhNFLieMq6nzEvPvMkCpCS6njL7fsjynAPAdrPLt1z5/acH4vFUC7GS5TmHfT+kdtjCD4Y8ucrbSRYyrxDbcT1ltptd8oJgEmBqxDuY9P8X5C3Fm03V9t4AAAAASUVORK5CYII=",
	"so.56.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAJdJREFUOI3tkMENwjAUQ9+vUCboKYtkjb9OJug6XcOL9MQEXMoBBUL4pXeEpUhR7O9vB/6wdrkuy35b1w9Bcmeu1SJNlswAtlL2yL0fHjVZMoDLONQIACS+DQNMo8FWyt5Oix1p2nvY7QhZsj5Ncn99YrQlMui55P6o0Ec+w6g7rZAlO+KzZBPAXKsl9zcyuT8jj3zP/QDuy7haePMLdCMAAAAASUVORK5CYII=",
	"so.baiduyun.me": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAZiS0dEAP8A/wD/oL2nkwAAAkZJREFUOI2dkktIVWEUhb99jucmappaaoWhVpoOnAimkFQUVERQNGjSQEdNmlhUowY1CCwIykE1aRRhL8ogEgwKoUF60RLBiY8oMXvce339nnOunrMbmMjNjOiHNfhZa6+9YS06OztzjDFtnuf5vu/rv8DzPN8Y0xaNRnPEGNNm2/YJ/uMFQfBAXNf1RSTyPwaqmkwDiaimEvMhvPxoMRCziNjQsClgZ5H+wUIi4rpuCqMK13ug75tQnC3MzUPcU05WKQdKV1pYqotDSxhNhHQMutRtSHKlIeDanoAcfO72eKgqv+stUJagiQTm7TuyhwYoW7sAgGNBoeMzFk/S/0NIBst6UMSYOQXoGA54+N7l4pPzbJ4cY3JHNXNnL/Bd07nZJ3ihBUBuOpyrhe25i38xxuhIPKCxfY6KfIurhUOs6e3G3H/EneLDtO9uJC/T5nRtOo4Frd0+GY7SdjwT2xLSVOHNiMd43HDrUB7rCquhtprhrl5el9VjXI8bB3Op32ID8DkBLV2zjMTT2ZafRpqqYmlAbNrjUyJJZYGDvxDSXN5EnxRwe28mdcUOS1HvK3MYnHDYmCWoKjIzM6sxE1DTOkYyVI5WZfLhi0//xDyX9udypiEnJbaYC69GlWMVQsQWLFUlL8PieVMRlVuzuDcW8NVxaDmynuZd2StiG5zwufxinJgJFi+YmppOqXIYKiIgIn+rMCKCqiatMAyeLhZEfxHLotWwxIdh8MyuqanpLCkpLRWRchGxV12bekFSNXwcjUZP/QSDYmz/rzanVgAAAABJRU5ErkJggg==",
	"so.baike.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABXUlEQVQokY3ST4iOURQG8N+9943FpFEyISVZqFnYIAspSklZWWgUalJfdl/Jjo1iMdnOQtkNwoIpY4GFyEJKyoKFhckoi9GkGeze97sW7+v7Y4zm6dnc0/Oc53TuCTlnd4etEmOLId9ev1o1KHTif1vOKYbkUijc2oCoswK3n3RqQShMbXRzM+p6VNVMAxxt2z/pzRVT21TJmW+olYUqQe4bY3iHPZc8OGzhg62HHL0DN7YICV1D6BlOvPT5mfmPzn2FJy2zjymEjKhMA2x9gpmzjt2TO5a+OHjN8UddwWBCWisWru9WJfdPN4Hjz43sUqU6oVD2Gdrv4ddPUqNuvbBuk5m28p8GTB5oKuPTRnbCxCjoGpqRoguvYGmRAp5O+DHv+1zzROgMbmnNkHcPVX8+fvYt6LuDEGpDhL1jMH25N/1yNAn1LR05j1775YhRLhFyzi7uW1H3F66+/g3vPINrw3y1XQAAAABJRU5ErkJggg==",
	"so.cr173.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB9klEQVQ4jWNgGAUooGC/gUDNfiOf2j16EWXb9dQZGBgYHBoYWHK32WoR1Nxz1K545ln3D9nb1X44Ljfc67tWd1ftPuUzVVsUt1RvdF+GV/OUk55Vt9/v/h+6ye6W5XxLDZi4w1IDg7I9Kq+T1joswam5Zqe64rmXy391H3P7E7TC2Ahd3maFQaj9AqvFDAwMDGmb1UTKdyr11++RX5yzUTHGoYGBhaH1kHrpupsF/2MXKp7AZoFDAwOLQwMDi8N8BY6MzWpmpTtUUhr3KQVX71S4F7lSLYCh6YDKwpaDGv+DuhRmYDOgdLtiaNgm/ffOqw2fOK40sI7borXSeaHO+eDlWoYMDAwMDLX7lDeW71H7Hz5RcTYOXzKGbTR4k7Zd+3/qZvVo67nqvCqTVNjhsoV71Dtydmr+j12i9sx4JgMrNgMydmi9Kd6t/itlo6I4hmzsJnXFuK06P8PX6/4PWqReg6GggYGpYq/au+Ldau9DVzEwY3VjyHqd4tBNBv9DVmr/DV+iMSlhtZZtyjpVzfytmq5N+5W3tx1S/l+1T+V70kZ1XhzeZGAwX2ji779O71LGFrV/RZuU/xdsVPqfslnlacQGrRL3FQb+7isM/H1X6BkxMDAw4jSEgYGBQW+2uYzVElNT0wXW2iWLSrhDV4VidzYUAADa9LS0UGU18wAAAABJRU5ErkJggg==",
	"so.iqiyi.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA10lEQVQ4jbWTwQqDMAyG+ygehea2kycfQrYHEbbWnsRXGFiDnjwNxvDibYed9wB7Dh8hO2yRThSUskBoS8KXnzQRwte0DQNTQ5410BVtREUbkWlg1jmeNdCZGnJtw0CYBoZpQtFGpBB6190Y52e1fIjvY9iqnAt7t0BoBFKVTE8oa41A7AqhV5VMNQIdyzDm071rBBoBCqHX+JG0BOB+/ACOZRivAahKXh2F9+0KrExGgJXJIoCIdnMABnOR/wHOt8PsLywCpvZ8XfbcqFVz4D2J3rvgu41vsG9tMDaoIaoAAAAASUVORK5CYII=",
	"so.ku6.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAMlJREFUOI21k70NwjAQhR8/JcWNkB28gEfICKGh9gYxPVLSUiUlHWtEQpHoaNmAMAB6NIlFSDAJP09yc/L7dHd+BjyKoogAGAQBffd6VZsez+dmrfVwwE/NY2d/npkiMqoDAqC1lrt90oGFYfgW5AAFwTMNN4ntgOI4fglqAQqCBwpPF0tjTAuilHKQqa+lGypcxWKVHJFlmauXZdmEDHMfYAbBojLYriuk6dLVlVLI83zyvx30vULTsk8dE8YkUUS+SqH7ujVosO5GSKCASFkQvgAAAABJRU5ErkJggg==",
	"so.letv.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAATBJREFUOI3Vkk1OwkAUx3/TCNONigcw1BA3zRixF5AjwA3kBMAJjCdATyA3gCPgBWoNTePGhMgBhLCZgWTqwtaQ8rHnrebl/T9e3n/g6Et8X6ufhbUVgGqpPD37jK6KoNQP6kATuAemwJtIwgGAmNT8dBN885WIArkfG90tiirpjoGWc2i91A+6OVlJd6Ske6eke6GkO4iNbgDDgwJLazsZORJJ2ALmwOPS2gZAbHTj5IC7FxvtAczWKy/1g/fY6Ho+r5bK01PHedorAHj5Y2FtZWF0/dxx5pel8gh4EUkYAewVEEk4ntT8/15J91kkYa+wZWUrBSXdEfCRtbex0U2AzL2Xx5dF298SKIi1ZuvVa/5PdszbIvWDIbATALT5u3w/NvphgxgBPZGE433mR1S/q3t0ftQUGjgAAAAASUVORK5CYII=",
	"so.pc6.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVQ4ja2RX2hSURzHf+BTMHraYg89xR6CvQQHosZkDBn4oA9BKxhjWNlg65+RDyExgmoIyYhGsJMs7KEFNza3iUM0uk5nThku3JwtEy3lOu7SXe9Vr9vL6elczAx62BcOh9/v/Pj8zu/7AzgOpYqH3d68bPDmZUNkv67LletdzTWcyLXrPSbn/ZDN9hdgLl2dGAoIJUtM9I+HxeQlViC+vDxC33meb7u4aFgDjEiP0xBoCbDERD+NX+9Wph7FJB+N9R6TEzAiHQ5NIf5r92xLwL1IeTO2L/dF+br2TkTcer4lvQcAwNvzRsCInLD3SOtcHLX0YC5dnRhkBdkYErLGkJC1xqUPfKXSyTCMqsOhKQBGZDnN6v5pYvMIVMtpVgcYEcCInHJo9ug9uTH78L8Ad9esUxTQfP6AJEpy7ydOHmoGDLjGVgAjol68wbozQe2XQqL75uqTGeVHjUoKR8j5o2ZKlORemlMvGf2AEfHmPvfRHMMwqpNv1CXAiHAi1w4AAIHC4eVBVpCfxaWFK/4D6dvB0TkAgH7XqA8wIu5MUNvYjPqRKuZPAwCAeaO8vpCtmQEAVvdqV5PCEQIAGA9MTgNGxBx+YVXG5b930bUqxNsRcduTk40AADvF2gUKcGeCWlr89uvSsDsT1J6fHwkDRuQa+9iuAF4lqzMPouXoR04evh4Scq6f9VsNRnqaN3DmnT6V4flOBcDzfNvLHcluiYn+2VTNxjCMqtE066bDPOAaW+l3jfoskemninnHod9asVv3rmSJ4QAAAABJRU5ErkJggg==",
	"so.tv.sohu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAmZJREFUOI1tk12IjGEUx/+7tWHt+MrXLrbIR+yUC7JZLjbN1ZZ8zYUi5IISUpLEha8SWTfbTkhqyLLWsPkWkRLCbFHG7NovZt73ndlhmVmzjY+dn4vZ2d3XOHVuzvM/v/M8zzknD5DNEt8n6P6tGj1/VKq+XqnbKtWk4l653C9VWbVZhY4/Nj0w6OdOV3P+jJdYdLgtboXLuOjxmTMEdTW+oWeDopPVHsLhY2+CzVeCH1tvkE67bRAQ8e6SHveCJPvWtdsB1xs9kn5JQhJLFld0/AYHTe8qciCpXlnlgsu1DRlAIqFsYr/HAZH4oU8SVLha6fo6wgZ58XSXOVvwLTZDwGlJFCgPSZBObwJE9ItCEoYcmBLUNRweCrHmCRovXNKaFSubJJGfqZ4eEHVlAWMxC4uxVALzl7ZjRuYC4ujeJ+xZG8zv6OwcK0npTFMiyrE80ZtSWkkZb59N/1wyOSBJmuWMRl+/mJP/S9KUQfWoXEA/RHEhqfTew92SpLY2Bz/7pO2rVvs9Ejs1gmESKZhjf8IYQhKs3dhEomfgD5JzpyXY4g6KN35vROK2RhGWCGzd4QdEpEufJcISPHi8zdaFO3f3GxJ4z/pErFshiYjGYWoclgRHTngBcfWalx9J+xy8Dy4zJAwJjJAzEzx8vD4sYRZMxNCYTNXKqmZe+TcQ7xGpn+JDyyL2HboVyiYfPHDPPsqVVS2mhDV+JoZGEu6/fmiIZ2OsXtOSuwsgDh2vNyViC11Ey8oxi6ZiFEzE0OgBGHsP3Pz/MmXdsKZzqtbH8vWByDQnZtFUWOQKcKrGR1uH81/9X2z+NiZq2fggAAAAAElFTkSuQmCC",
	"so.v.163.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAHBJREFUOI2tUUEOwDAIYkv//2V3cjGIrMvGyRKKqMBHHIoMIAZx0zeifs4PipMGLMx3rdlkqaguMsMaTLvYMgggagKz2HddeazTCdQOuIGMyOfbOWcDd6rvWq9JNKVg3AZK6LjH+Cnk6OMSpxEc/wsuqQI6C+HzarEAAAAASUVORK5CYII=",
	"so.yinyuetai.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAA1FJREFUOI01y91Pm2UYwOHf/TzP+/alpUBLKbQVGLAsjsncHEbMjGYSd2YWjItH+g/4Z+zMxBM925kx0ajZptGoiQZ1OlmMMDbHtm7sg4EyVlZKP+nn7YHx9Eou+XT79Pn7C8zdfPCnxnszRMM9ZNcWOHJglvWtu6gqI0P7Wb4zz4HhGaq1ErnCQybHXpCx41xwa5fN3GvH50glM/RFk/RF+yUc9vTkzGm5eW8RpaOT49MSChk9dvBVCqUd2co/0OnJE/y48OWcy24safzGABevfUa6/xCJ3pQuZb8i3p3WW2vLKB2qtapeXvmcVlvIFx/p37nrGDy9vb6EvPl+VGvNEgPdw3o4fYpCZUtubH+rzWZFnA2DoK1WVYxFpzNvMxo/Kovr3+id7XkJvKg649o61vccH7yzSL1T4utL7+lTsUF+uHtWrQkAaGhVz5xaYGpihuz6rxoOCpTrG1psbWHUVDmUmkUcLK3O0zJlhhJJUtFnQFqo7LEvdpSp8RkqlRLfXfmQoNsjGc2A6WCMQZzxBKBSL3Pr8aKEIvDsyLT4LhAxVU4fOyMIfL/8EXudXQnCBi/kxFqDMRY1VhTAGstmJav1TpHMUEL7o2lNRV/i6eEjWq4WufbPz4TDgfoB+D5qjMU4zwcRATAi7NYfy3p+lb54lxwePyjHJ95iIJaRv+7/zuruOUKBJ10RcL6I9QzGWPv/BwOeByubV3Fem/2jaV6efB2AS/c/QYzg+YIfAueBMRZjrcM6o/AfeB5aa5ZZfXRbY7GINiJXWMtd0eUnHxN4SUKB0SAi+CGj1hqcs12yU92gs4fuVnJYGxHPBLryMCsjqSE0sqgX75yViJ9WEPKlghSKO5ov58U6p/LuF6Odtpapt57gTIBvk6DQ0SbNdgtBMAacCRCBZrtBs90g8LoQsbhEdJwj+2a5/vAnBnr20R3EWNmY5/mJN1jLXUW1w1jyKH/cO89k5gTVvSJbxVWmRma5tjaPS/SkZbBvlHJ9SrtD/fSE45Kv7teh2IjstYoIqoOxERlOTGoqPk6ptiOe73Swb1T682ncxIvehd9+OTeXK2Xp8hOEbITtyir1Rl0LtU1UlfXt22wWr7NTztFo1ag2cjwpbnLold4L/wL2H274oi0GggAAAABJRU5ErkJggg==",
	"sosu.qidian.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAp5JREFUOI11k8tLlFEYxn/nMjpOjRRO5kxZaVZWRhHYsmjdBYoWBdWiCCoJofsFFSuSVlFuosuu/o0ggoiIVhlhiVLOp6NTyZTN5fvO97aY0SmoszlwXt6X9/ec51HCQqB2E6i7IElwIRhA8Z+jAQ+kG4rvlNCwCXjsUexUGHRDI+HXKSAEbKUnAGR+gqBIUfMaOK6EhmcT6J2meSmmtYUFZ04we+8BbmwM93kSANOyDCKR8gwRyBdw6QxJwmcWXNI0JojfuIZd14bd2I5JJQmGP5E71wtKEe+/ikklIXQQrYWSz8yRUzCRTiI0DHkkZDK5XrI79kjxxSvJbt8tk8n14pEQj4Rkmjsk07JFMs0dkt25V4rPX0pm9VYR4u/0HJdSqqqbAqWqxPhB5V3/WYCySg7T2ER8oBe7ZjV2w1rqB3oJhkfIne1B1daw6Ml9sBYKRaiLQqkE+QKgsWBwU1lyV/qx7Wupv36F3NWbBB9HCL9NY9rawFp+9A3gRkbBGCRfJMxMA4Z5BH4WcGPjSMkH/Q8PKFVGMAZVG5n3iQUfs6qVeP9l8o+eopuWUH+rh+D9MLmLfTCbB98n3nepjGA0Lj1B7kIfTE9hQcAabFsrkc7NSKHE7OBDSs9fEn6bAYSZI6cxrStRNRFQCvmVR7K5OQ0U5AtIoUD04H5UXZTovl0EQx9w3mjZu01LiHUdwyQSALgvaXIj/XMbRLRLZ5g5fBKiNVAK0CtSxE4c5dfTGCiIHTrA7OBDwswUaA2+Tzj9HdDagvIE1+4mxiv+F1x6nHwsxsLzXeAcP2/fxX/75q88CQYwnhIWd4B57BFuq2ovKAy6ZTmgcKNjVYdVYpVCvwZ3TJXjHOkAcwdYVlmjcgWVJgPVH6/E2XWDG/oN4DwRs+MYb7cAAAAASUVORK5CYII=",
	"sou.kuwo.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAohJREFUOI19kkloU2EQgL957+U1r62mUdugVosbqEFxwbpvICLiSXFB8KwXpSJWvCrqVRGPglDcUERxQaVKEYp1gUi1oOC+dDFqkzZJm+T9bzwUlVrtnIZh5mOG+WCYmNeikQUPdftwPc7fhRnNWuEKyxSeF3J9CSvsXQLO/Q9g/V0oBiwtKjssmN/veBeyhmPDbfAbsKpFR5/6oIcqHZZmfbY9WyJX4uXUibJn+XMNDwcBIHZPVy66+DJY+ERvAei7vRMae/XkxjsfzaEXj5/qmemPtJ7jWs8q3Y/9a05+Jdq5b102Nre+LNlWSfvb8YVMX7QudYDmVIQt2bPsSp4m3/4VRIhNrvluT4tf4MOr3QKgLzasR+SaCRxHjYf50Y//5R2fe1w+5cqoLUsjIyJYsbGUTJmKPaoCert9OXV4m2jbhvkgTcZo+Z+DBD9diUkJVrmF5pLY46rBN/Q9aMJbsRo30v6KW/dXO0ASuC3CJtWBk7QYIteYwFtRixZ+UGhtxU52U3zzniCVIZh5B8QvSl1PhyXxGx8lfn2zpboG3xgNHLKPugh6U4jnIbaL35GmvzlB8XUP4VklOFUhcMcNfqPMvnnf7sx8y7R2YjIp8BykNIy4HuaLwXwug8JInOrRSEk1uGP/IVLI7lCCgeGwDb1NBF1X0VwECZegRUif7iGfAEIDgMEqW7zGc+ZI3qCeAZPB8sqxKgLCtaMITYnR19KBeGMgVKVDAaI7o1F3ZHferCVvwIlgV0VxJidxp9fgzphGeN5yn4C7+OkTg0T6LVTjSptCcDTVmdtfGq8RJ1qKOBUq4iXAaQDrvEw60jXExCGgy4u3UjPxIKWh2wTSILMa2v7V9xMBAgjjowQMpAAAAABJRU5ErkJggg==",
	"stackoverflow.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAcxJREFUOI2Vkk1IVHEUxX//aV45r/eMwiKhj0VDEDpgLQw3CbaJEgKh2lUSOWALC8tNQRS50uhrCII0oqBVUKumwIiCDHIjThOIuZEmnNJiyvea3sdt08C8ZvThgf/m3HMP597/RURY1rvaVJCbe/bK+DNEhChhuKQuYLAZSCKA0Z7DKRwGRgAioQYGY3a0sYtYogO9AWACqC+Vww2EdExTF21HHv9jpoHmUnnxEVIqjUEMM9GKy+WYpo6ATIGK/yp6fUZoghr6FlTjlomfjrA2mkRo+O2obfzJXDfczzO4RQCUiAQb7Tws5OBbFqYfQtE6nf2Uu7Z90+oP0cJsP80pm6aOJyV5pUF+jJcPemX9ho35RLx+hMiK+9g/njM/9Yavr32S0lour7qDtp3rFCvXDOK7u1+9n0yDYle87l3toWxLhbj8SI4ePyni2Ij1/Y7MvG2X0fPI/EdkLrND5jJD8mWUYye6pbwnkMA0TRCfp7fO7Cs4WpeKaLgvBlAKqauRyQPnhtFXPQoECBj4nguazsHkla1EAh/Uhu/vrzZu1R109vZLrWkEOM/zSN0YPKvrerjBvbu3VTUewLKspQ26T/XI/9xSqLyDZeIvIoDgsnAkj5oAAAAASUVORK5CYII=",
	"tieba.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI2dU89LlFEUPXfmm09HyaCsTDOLNrqLtNwVSC4K2tRKBAtqU5hhUS2KChSKqH+gaBHVRqSCIKpdi6ggXIQ/spmx0tEcHacxa3Le9947LcZvZtRWXXhwz73vXc47915BzzABAJYALWABGJPDxgLW5rD2/SJsNBwA4OUG/I9J+0sEYLkqEY0oXu9JcmgwSwCIRRW/xLzVF41GANYuiylF3LuTlocPfuLWjRTGogonjk6j61QCY1G1ooBdziD9w8B1BdYAa8sD4jqQ1JxB5rcRz7OSmjPLC2gDBybHYPybh54rSZaGA2hpDUs6ZbCzsQRNzWEcO742/2Zi3EPt1lCeAXBxgCTZ9yjN7VURu7f5qyXJWCTLxT+WvsUiWbYdibPtcNx+n/JIkjjQR8fXYNsOFzVbHKncEMTzZ79Q3+Ciu3MapWFB55l1eNy/gLGYwtyMkckJzarNjsBaOLC5f+1qCqP7wnrOJDTqG1w52znDTyNZhFyR5Kzltd5Kefc2g+rqECs3Bos00DkGwSBw8FC5TMU1zp1OYHREwVMUTxFvXmfk0vlZ3ry9SSbjGnV1ISl0QReUjUU8dJ1MYHhQQSlKseAjQ1npvZpETa0j8DPGIOB3gQSe9C1w6KOi94+ZmZ8nP7xfRHxcF5LWwoEpMAi5gmyWECEEQmsJCCTkCAkikyGmJnXRILGggQjQ1lEh8QkPn0cVKtYEZN/+MgDA0/4FmU9bNO4uQUtrmRQzEHS8Iu+3+iECGACwYmbz5gJo9IHsuQtB+wtC68KaGru0qku+NYBmbpXzh/n1/wuHC2lVjJEkmAAAAABJRU5ErkJggg==",
	"translate.google.com.hk": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqpJREFUOI11001onFUUxvH/ve/XkMaxRTsNbTJdKK0REhRtxEAEIQitgq0gRUVddyMShXbnQtBGQXBba1RQQa1SpaUgaktpukhUaKQG+0UqJkrVTOJk3nfeufee4yK0q+Tsz4+Hh3OMarO2uNh4x1pbanCkaYpooNVsIXh8x0X1eu+siWvjrDFGw/KnedF+JktjrDV8/c0pJAh7dj+Kc448b1OpJGy8426zFhDPz/9Z9PRsZuC+Ufp6e4iiCAU++OgYV679wdnvP6Ys3Vq7q0BXd0ae5/w0fZIzpyd58IFBVIVXD77B1OQxGo0lsixdHxAvhMjjOiXtsuSLL08AsP/px/mvuYKIEETXBayEgAQhBM9joyNMTc8wNT3DI8MDJKZNGjmyqLN+ghACcWy5+Osljk58ztCuQTTkjLzbS4iqBBFEhJHDqsFDEBAVFIsIh2LBAwkXZmZ55aXn2dZXx1Dy/pEqd2YOCYoX5fqip8sK3YmgQVCTEFzeb33HRc51eOHZ3fyyfC/imoROgRdBghJU8apcH+/w1l5hqQ2qoAAmCrZe3zZr4oyx4zt47XSNl4/vQKMKiCCqtErlwHDg3EXL6KCy7JXVThWwWBNvGa/V7jLfnpmc2JwKPy/EE1v77jebumJEhL8KZd9DwsGv4MIcjA0rub8ZQbC36vSt6uXZ81yeXwDgnh5oFMJT/cJtFTjwMGQWnhwy/F2CqiLArfP8bEp3dlWZaTVJjYXg4OgPBW/u8xQlTF6CoqO8/pzhicPCXCPCqpuIbwL7h8xvH57T7dXb+d2VJCIQG2HhH+Xt7+DGipJ72JAoA1uUK/8KiQprPgjAi++p/ng1px0MG2IlMquxW06xCGkU44qlT+L1gOk5DiVS9HfbKCAWQRCgYhQVwRUrWdS9dex/jz5vVhnOMvMAAAAASUVORK5CYII=",
	"twitter.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZhJREFUOI2lk7Frk1EUxX/n5n2fTdJAUxDpInTsJjiIg1ulWAQ7OnRQF7eu/RcKncTJpS6C4FKIIIgg/g0WFOxQxEFqbJpam6Rf0ncdmoSYNFromd67955zL+fdJ3fnIgi3K+eoEgBPgQRYwcm68SthpgBENoBHZ3LF0tHP75uWpADETva4MD3zAnEDuGZEZpv16kPE626nv9A63H9paR5kIMOSCVq/asvu1N25b4gd5XI0D2p3O9nxD4kHqD920d0nYMgnCXd2gA0TkJam30lGp9W43NivPm8d1Bpy3iCejbVFPJEgAHMCyRQ9uikXAPLNw9od/LRyFI7BJ3cI7nxuN3/f8hhtxPqzuIBk0aEOYABJfnLRQpqNG3cY6eTU2564AZh4H/LFTQtJ+zwCEqs9Xw2gu4xf40k7+W/3UrmCs9W728Bh9VKxvJCWyh/+Qf5mcG8w1hfQ6WgL2VH95hjyR8HV4XgA5l2sNfZ2rysEpNxAWqSlqSqwbmJ9eJ8ANF/xwddakZjDKTh8AV5JbLv3fRoVuOh3/gMl6IU0jgqB8AAAAABJRU5ErkJggg==",
	"userscripts.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaUlEQVQ4jY3STUjTcRzH8a+mLozoUNTFQ3qQXYygQ6cO4aEyUlY6lz3L/g5WUOJDGatTRBhWsHSKa2o+pCKtgnmIWBPx6b/Z2oObc1v778nU9vD/WyCdPh0yW6Lm7/x7vX/w/X2JNj9pp8vkR2rvN3JqbQ+qbqlGCiWSvVvc/xeXyOSl6vZu3jhmxhcujEAoAkmF4jYRpf8XF0sZ5mlrF0xjZvgCYcTiPITlH7iirB8moswtsUTKMM26XnwcN8PHhRCL80jwAroG9DhVLKskItHmWMYwbS8HYRqfhp8LIZZIIsELmJnzoazyxhQR7SOijA3xuQsMo+nsB2udQSAY+Y2TAtzeALyBEEanplEhr+4loh0bBTLvPGjitX16PFLrwIWjSCQFfJ7xwO7yggt/RSzBwznrw0VFbfdGg8y++/AZmjsGoH7xChabC6zVCdbqhMfPYX5xCbywjJWVn7DYnCi9pKwnorTUwC7pteu6IcMH9AwZ8HrYiJHJaTjcXgQj86u/8B28sIxYksfjFh1PRFmpAdHB/AJxVc09t3GMxXvTBCYtdjjcXvi5CCLzC1iKxbH4LQ6PP4gnLZ0CEWWnBtKJaHdOnrhAUa2atdhcsLvm4PFzCEVX8VIcsz4OA2+GcbK4vG59gFanuycnN/cQU6OKsp8cf1/+g/UGFBaVNhDRftpkoTJOnCkvadJ0wThpg9XhXsP9egOOF51tIKIDRLRz/RDXAtLLSoMrsIC3RhbPOwfh9vrR1jO0LUxEJJKcl7ePmu1o7X0HtbYPTZqObWMioqy8PHH+VWUd26jWgrmpih4+eqxkK/wLdLSQIruD/tMAAAAASUVORK5CYII=",
	"v.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI2dU89LlFEUPXfmm09HyaCsTDOLNrqLtNwVSC4K2tRKBAtqU5hhUS2KChSKqH+gaBHVRqSCIKpdi6ggXIQ/spmx0tEcHacxa3Le9947LcZvZtRWXXhwz73vXc47915BzzABAJYALWABGJPDxgLW5rD2/SJsNBwA4OUG/I9J+0sEYLkqEY0oXu9JcmgwSwCIRRW/xLzVF41GANYuiylF3LuTlocPfuLWjRTGogonjk6j61QCY1G1ooBdziD9w8B1BdYAa8sD4jqQ1JxB5rcRz7OSmjPLC2gDBybHYPybh54rSZaGA2hpDUs6ZbCzsQRNzWEcO742/2Zi3EPt1lCeAXBxgCTZ9yjN7VURu7f5qyXJWCTLxT+WvsUiWbYdibPtcNx+n/JIkjjQR8fXYNsOFzVbHKncEMTzZ79Q3+Ciu3MapWFB55l1eNy/gLGYwtyMkckJzarNjsBaOLC5f+1qCqP7wnrOJDTqG1w52znDTyNZhFyR5Kzltd5Kefc2g+rqECs3Bos00DkGwSBw8FC5TMU1zp1OYHREwVMUTxFvXmfk0vlZ3ry9SSbjGnV1ISl0QReUjUU8dJ1MYHhQQSlKseAjQ1npvZpETa0j8DPGIOB3gQSe9C1w6KOi94+ZmZ8nP7xfRHxcF5LWwoEpMAi5gmyWECEEQmsJCCTkCAkikyGmJnXRILGggQjQ1lEh8QkPn0cVKtYEZN/+MgDA0/4FmU9bNO4uQUtrmRQzEHS8Iu+3+iECGACwYmbz5gJo9IHsuQtB+wtC68KaGru0qku+NYBmbpXzh/n1/wuHC2lVjJEkmAAAAABJRU5ErkJggg==",
	"v.qq.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAs9JREFUOI2Nk12IVGUAhp/v/M05O+fMjOvuuJqF/VmWoKbCmmKLEkQ3/chSXnTlhRclBAqxCJEk5YVeSIUghWZgF2G7dGEiWAZZragsBiWtse2P6+46szM7Z86cc+Y7Zz5volb60ffqfW+eq/cRzMvWcYXS2WoZnDtTFNxLjPnDF4xoIctkBp6tqWEVcMIz2d/f8d8wob5ZAm79R1zX2K3eXXet0cOo+RBZBywbDI+4PebQdo+9ve4/QUJ9sfQt5MSBn7rgUgfkJYRiNUPqbb43X8K0wbYh5+EvbvL6sUXis/kAjTk2U8sSzGUYn4Tp8krKs0Ns1F5mn16kp3GS2SqUSni/NjmxW6ofzoRqHkBSJDC4WneZnIFtq4+xY/0EY2WPCR82mW+y33ycFf4F6nNwfowNX0pae2bUc38CZDuNlKtxEd+HsFmnmLuPvi01uqxeRiu3kEnKa7lNbI93ks7BzzdTcSXl66d/Uy9oaSQXRvUWQRzQDKFcmyVo+kgV0bvmI9Z3HWGqep2xagePOUdZFx1Hq0lalQjbZI8RhYkK/JREBjQl3Jye4nd9lLybQ1Lj7C/vo1k6cVJFpVCttaMbPobpkSoGDClbsR9IdBWRJJCxsrTpC7h4bYCB4TfozIHrQAb4auY4N5KnyBciLKPz8OknxSEDQ4WxamGIFCEg7zlcGPmY/qF36MgCEUyGPVxsvIeWWUjWbRC7y/u+XSkOABiFgj51K8eyNi2h4BocPP0KpoCCBfXGgwyW+pjSu1ngRFhmGN6wVz0//ow4//eVl9ev2zN0P6EnXPbAs6BS3cJ3Ey/yR7qGghPS5pRo5h8eHD73QDcn73yjUJd0GEk/Hezc9ejm/kc2NMuLQbPBSWnzbAzbLuurenZVesXn/+rCX22HQl9badjBtKMpiei8f0hlC5/4FT5k5//IdMf6QFFYwrZ6iVMiD/LVuyt9G7VHLU/p9/aUAAAAAElFTkSuQmCC",
	"video.sina.com.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAkdJREFUOI3Fk0tIlAEURo+jYuGjppzxkVZOVpapWFi6SIM0ihyCMAhBUAkzctOiRYuQIJHETasIMymIWqUo2cPArBAKUSm1siyifOT4GicbJ+f3a+ELIaJNdODu7rncC9+Ff42SYtGlsl49akz/eylrX5YaalsAlBxXom+D0pvuqwDaGY/8lnpNi9LhA+j8ubPyBbLtt0hIShJAflEpww6YmloPgMt5heaW2gVvaZaPz2WO5iTz/KmblFQLPT0fKL94E5stlO7XEBgUJ4DCU/lMuaYXNQBtj4GSMyIo+DEeTwZerz8eN5j8wOMBw4CZnxAQMI6vrxmHAzbG+PgUn57fICyygoAV0N6WyegIfP4EJl8IDmG26SGaBtb6gzXarMBg/Kxh8N1VClyYu7/k5BflHtPs7iTpSbMkqW9wUP3j45IkOYZlVJRrEjQRZdFwWIiUntY3J+9KREUFMhK3SpLKKisFLKuunh5JkvHyhQZAX6PDNBBulooLQPGxW3Rov3S/Uc2trQJ0vbpaR+x2GYahlSaTAC0wlJ6m99ZV+hixRsrNwYR7upexMZh0MuV2c62qioLCQurq64m0WMjIzGSzzYbX6wXgx8Q4biA0ZPUwEVHzGYiy5mmDVXJOqPr2HRmSOjo7Zc/OVrbdrgdNTZIk540atYFeRVmlvXuylqcv2nJQMKqaar2ru6tnra3q6O3VjMslb3ub+gry1AYa2bZpSMk7Un8f4dAQBCcUzD3BWwc4+8E5C11aF9qglITjCjf/6Qv+A78AuIw+c7Rme+YAAAAASUVORK5CYII=",
	"wen.lu": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAfhJREFUOI2Vkz1oU1EUx3/nvXvfS15jqnVwcHHwA4UqdNAWKoomBcGhWNGpk8XFxUEUcRaFqKtTEQyC7urgUBoQtNRNFCsIbSF0qI3WNk1y38d1SJDmQ8S7HDic/4/zP+ceyRfsODAdm+oA//Fcr68CXJF8wa71EtfCVowttQgyGtJK8Nx2iOolXqvDzTFNmAi5QcXeXcL7rxGlzxEvP8Z/ILGpDjid4g0DhYse2oGHbxocv1elXEkQgeJ81NYBQBdgM7Tkj2oWVhJ2eMK+jFAsGU4cUMQ9ZtEFkFYc3u/yy1gcgcWKpR6Bls7qHoCsJ0zPGHLHNOODitWGZXJUc+NpjZ2pboLqTAQaHpcMc99iRg+6fLmc4c7zOnNLMVm/G9DVAUBKCfPLMbdfGwCunvVwXCFKumvlzN1Nuz1RqVkuDWmGD7ksf7cEynJhxCOxcP5BFROCI38BVEO4ntOcPKwYe7RFVgtRYhFXmLkV8Gkp5tqzOv3brLRZqIaWiRGPVx9CAiUEGrK+IAkUZw3pf83Ac2ChnDB52iebgtUty3rDsm4s54Y0T2YNgWqHtFmwFmoJ3J/wOXVEUf5hWfmZECfw4q3h3WJCoDuG2HlM1sKGsdRiUALKaX6utBZ0x85cr6/iAFOt02wSpel7TyDsTgv9vpD1e4uBqd8JecJJIf0F1wAAAABJRU5ErkJggg==",
	"wenku.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI2dU89LlFEUPXfmm09HyaCsTDOLNrqLtNwVSC4K2tRKBAtqU5hhUS2KChSKqH+gaBHVRqSCIKpdi6ggXIQ/spmx0tEcHacxa3Le9947LcZvZtRWXXhwz73vXc47915BzzABAJYALWABGJPDxgLW5rD2/SJsNBwA4OUG/I9J+0sEYLkqEY0oXu9JcmgwSwCIRRW/xLzVF41GANYuiylF3LuTlocPfuLWjRTGogonjk6j61QCY1G1ooBdziD9w8B1BdYAa8sD4jqQ1JxB5rcRz7OSmjPLC2gDBybHYPybh54rSZaGA2hpDUs6ZbCzsQRNzWEcO742/2Zi3EPt1lCeAXBxgCTZ9yjN7VURu7f5qyXJWCTLxT+WvsUiWbYdibPtcNx+n/JIkjjQR8fXYNsOFzVbHKncEMTzZ79Q3+Ciu3MapWFB55l1eNy/gLGYwtyMkckJzarNjsBaOLC5f+1qCqP7wnrOJDTqG1w52znDTyNZhFyR5Kzltd5Kefc2g+rqECs3Bos00DkGwSBw8FC5TMU1zp1OYHREwVMUTxFvXmfk0vlZ3ry9SSbjGnV1ISl0QReUjUU8dJ1MYHhQQSlKseAjQ1npvZpETa0j8DPGIOB3gQSe9C1w6KOi94+ZmZ8nP7xfRHxcF5LWwoEpMAi5gmyWECEEQmsJCCTkCAkikyGmJnXRILGggQjQ1lEh8QkPn0cVKtYEZN/+MgDA0/4FmU9bNO4uQUtrmRQzEHS8Iu+3+iECGACwYmbz5gJo9IHsuQtB+wtC68KaGru0qku+NYBmbpXzh/n1/wuHC2lVjJEkmAAAAABJRU5ErkJggg==",
	"www.56pan.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAi9JREFUOI11k89rE1EUhb87M+mUoAihi/ojplBKa1oFE7AoCF2k6FZwUbKVrPpfuBJXXShIFTfu3Y6LQqmLQqiCCAnUxk0IVIqjhYnTzGRmros6MjXxbO6Dx7nne+++J2SkqgCICKp6G6gCIbANHERA7nQPETlrTM1hGG4kSfJLR3UYx3EjDDWbiZUuRIQ4jr+IyFy/309TVFXFMAy1LGt6cnLy2DDO+JEUZzAYtOI4LgdBwL/K5XK4rrtXLJVumVn0lKDb7T5W1bLv+6qqkiaLiKYhpSulJyOdAQE4OjrqqmoxSZKx6Z7n7RRnZlasTLqqEkWnBNdyuVyx3++TTU7P7vu+2ra9IQkkiSLoZU1kSqHICZ+s5eXluSiKiKLoL1G2ikhycXr6JcKbOI4ngiCYMAwTieD5y9dXrWazGQ+Hw7SB/jFnq3nQ6Uyl2OnEgNBx3ooFHLquG1qWNaGqIwTjLs40TVzX7W1tbYUWcNzpdD7Mzs7eGQ6HI1MYV/P5PM1m8z0QClAAHuzu7r7KYv5Ppmnied7P1dXVuqruGKr6A/i4ubn5Io5jwjAkCAIdDAYjNYoiPM9L1tbWngJfgRNRVRYXF8+12+1KrVZ7uL6+/qhQKOSzL1JEsG2bXq/3rV6vPwPeqepnYCgp9sLCwvn9/f0lYKnRaNQqlcoN27YvJEmivu9/dxxnz3GcbaDVarXa5XI5HPsj5+fnLwE3gRXgPnAPuAtcr1arU9mfC/AbrgFrpQjzRVIAAAAASUVORK5CYII=",
	"www.7edown.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAA1NJREFUOI1tk0toXGUAhb//vuZ1M7Ex5lU7TcnDJgRLmoomJU1bULTtQqUUi+JCRAgVXWgjaksWtSBWCCI1IogU1IUm0GqgKrWtKU3oIzZp0lASM5PGTMxjZpKZzGQe9879XZoWD5zFgXM4Z3MED2BwUvq+G6D57zit0dBgo0GOurodt17Y5Lvyq+DyqWeFvd4v1os/JmX7x5/98EHDFvPRA21b2VjqRxGC+GqG/qFpLt9Vr6z4njp26X3R/2Ax31+TJ7a/1O1cvBGS03MrMhhelsHZ/xiaW5F3Q4vy0NGeZMkRufu+Bb1Dsr2949TpY6/vEdWBYhACAWiqQBGgYoNQsPISQ5W82tmX2tj01r6BE6JfW1iRlQffPfOJ1Dwi47gYCyWoLVdp2FKI21DQdI2c5TAVXmV4KoWh6WwOlPjujP780Y5OuVe5MM7h0b+WTUc1GZuO4SSnccsoAzdHSCQSpFNrxJbmMewlAt4ow8EI0ZSKkwi1Fgh2K1dH55tRDRxFJzgTpkDP8PvNexR6dd77ZpxXusYYuD2Doev4XTlSsRkWVvM4qhfdvnNQuTgyj6IZaIaBqTucvRblyZoCkslVdta4eb7Rg0uTmKZJ5eYAteVuFFVHMVxMhtcqtErvUn1E09BdLsZjKm+3WJg+L4aVp7rQj8djomklzCVACBXz4QpUPYJjq1iqFy1Q9djE0MR8laJpNBSnqK8qx+fzMjMV5tOhPI4LnjCC7N3qQ9V0RibSqG4/TjZFfVE8r+1pCkye+4Xn8rbFvm0mWemmpqyMbDbLyUdUljN5ioVJ0YYNKJqLr65HEEKAlFglLT3KgUZ+rCnTceWTlBZ5ON4X4XY4Q1PTdpofr+bpxgBtu3ZRUVnL6cEsi7YfJ2dheApmkxZnhXQs5WpI++nlo1/v73qjno7eKF6/i7ayLKWbypESgosZbv3jkLZ0cvEk6diSbNh5+MiFd0S3AJC25f/8t1hf77nzrXWVxcxmDYKZQhRvAUIIpG1jp9Pk4qtY8RXpqXvx5ESnOH7fmWTe9p+5oXZ98W3fa5GcC93jQdENBJC3LKzUGuRl8qHqZzr+/FB0/+8bpW0r1++pLSPzvNkz7HgX0gpSglfAtgAhAV1fHhLT6zP/AnPybtjVBXzzAAAAAElFTkSuQmCC",
	"www.acfun.tv": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAA09JREFUOI1twVtoHFUAgOH/nJnd2clmJ5ts3KabbNKkGzXVFEntRbDUGjVNxGJ9URHEUsWKoiCCSoMIIi0IvihFhIj0QaJgjZe09hqxpQSLGJtojMZeYtpkc9lLupnMTmbm+OSb3yfGcyr/2uBUpDaqY+gSpRQohQLm9TqaVv/EVQaujKIJHyEErh+wWPI40NXoiJ6+CYUQGJpg3vaoNnXWRFwuiRZ2219ieHmGok9SI29SXFkl7/ikYjquD0XHR9YlYo6z6hM3dTrXWwjf45yznhf9Pp4uHeRz61mSYZv8cpmwJunMWMyWfBZWPFrXxB19dsnl3haLXbdauIFi391VdJ0wGHK30B46TllqXFBpoirHwMMRcmXBMx0J+i/lODpRQm5LWygFIzdWyNs+ieooJzcMsnXqEKbuc6x4P+/9tYNP7zjP9bDJlfkV1tUYvHHfWrY0VCJ/nS2hAkVTPMw3I3PYgOVcY3/pKBl/jIbVUXaXfiTjXGBaCqbyLv9pjIeRycowvZ0pem6voimd4WoZ/r74FV59BYsqQVbL4K6N8dvQEXaGobm5jnfPTPPFaAEBSEMXGJriZgBOiyR8/CAt06cpqDghKTBUmYJxG+lSlpmPu+hIQTLVQHsNlD2FtN2AH24EqKUsj/ffw8bsAazt21kw2pH+ErI4ScExqX1znPbkL4y/nOK5xutUJeJMF8vIJktHxnXOfnuYu/LDvHIENr8dYG57i0qKCK2Cms5ennq9jz39D/FAcoZTH+xhxIOO+gr0nrY4wwWYHv2dR59oZODEg0yNnaO+vg7Zto/AbKO2dRNnBp+n4KUQHw1w9vBpqidXeSxjob9/foafsibdrXthwzs8sneK7z6LonmXYeMLRB0bnFHu7N6PLX2IdWBv2sHA0DV+/sNA6ppGOrTIlfRO+OcyH2pfM3FoK6IihJi5iJ4bA09x6qVmhjcXYPJ7tJBNdczADGvoAJFIhJiTY27OpjrRiIxHmZ8XqOUwyveRWYEVjSGSt1DKmbheQDQEmhCI7k8mVEQDU5PkZCWqphIKy8jSMrIigkTiOSsEEQOZsAgKNvHyEkITLCz7iOFZle89djVSHw/jBhKlAMH/8xVoAkMGZJdcXu1c5/wLGTNe85wEljwAAAAASUVORK5CYII=",
	"www.amazon.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAcxJREFUOI2NkbFvUmEUxX+vQlCRGJc6NTV5gG4ORsJUiLuLDtpBmhg3krfYCUdLQgKjIyak8JLa/gGODIwsmGhSKomjEgTso7QEzTsONs8HVOJJvuT7zr333PPdiyQk7Uka6f/hSLIlgaT9+aht20okEgIE6OnmpjqdzkVCNpLO/MzL7W2vcP70er15gRH+17du10t+vbMjSdo/OPC4arW6YGFGYDKZqF6vq1aryXXdv0nnAqVSaUFgBR9CoRDpdJpoNEoulyOVTmMYhhd3XZd5rMwTzzIZkskkhUKBcDhMPp9fKJqB306j0fDsVioVSdJ4PPa4YrG4/AvNZtO7b6RSABy22x43nU6XO9itVr1u2WxWrVZLsXh8ZpXD4fDfW3Ac58L9W5YlQLF4XM7JeEYgAMCvMQTCRCIR+v0+5XKZwWBANBZjK5MhGAximiaWZcFxBw6bsPYAwjcxJInP72DYhsQr4NLyqR/ZMD2GK2tgPsSQdAZcptuE9wlYfw63HsMNE0LX/xSd9uH7Bzh6A9fuwOp9uL0FgasnhqQ94InX4dNb+PgCHMDwdV5/BHdzsHrP76fG+SBtST9mpvNzJDlfpNOvC7uXNJS0K4nfcq4NSx5xdUIAAAAASUVORK5CYII=",
	"www.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAitJREFUOI2FkU1I03EYxz//v5ubpm6WZB7KWUFMaIcdKorKxC4SQUVoQXYJAiG6dakO1aWOQUHRKSiKIvMQWdTZW0nhS4fcf0uXL/kyc+h/m9u3g7qXtug5Pb+H5/k83+/zMwL79OHrcLiNJLmogE0eg9l5QQIwARewnNdTDoFm30eosVQq3r5bLHivpIt7qLEE7mJA5/kJQUhXrk5LkjrOTQhGNfDFLgS4/wGgLqydgYj2toxraCQhvJYam8O60D1ZBDDXLcXjGV72/Aago93F929pWg+Wk0oJYiIyJtqOVFAcawo6uyZEtaXjp6NKpqSnz2NKr/m+e39ODx7Na3pmRc9exDQfSxdbgJD8wYgglJXY07ugvve5Y+4K/pCj3lLwwFgxoP1kVHgs7Tk8Lkk6eiwqd4MlNlrqvjy1tsQqWEJlHmDZzuhN3+q2azd+afP2sPzBiPzBiJxbLL3qXVRn10/hDKm1PZpVYOC2pGVf9iS3bs9y594i2+rNglONjGZ4/aSO3c0utjc5MQwwKsIUdF2/WXoYwL/D5MTZGT4N2BhGrp5VEFvIUOuN4A+WlfiqPCWf0ySTTTidfynIp/4v7EQmmzvWE0+NycVLG3j4eAmv18BOCdsGDKiuBJfTYHZJnDrjproqZ9HAY0kxX7YwOJwkHk/T0OCkcesqf3AoweRUCofDpOVQZW7YG8YR8Pv6DW94PwmgDKpqwWGWVpARzM0JkoALAn5f/x8SGsh2ARqUqwAAAABJRU5ErkJggg==",
	"www.bilibili.tv": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAsVJREFUOI1tkrFLcm0Yxn+PnpN50ogsTE0SDIMKw2iIloYg15ZaGnKPoMaW+L6WxubGQBPClv6FOkEUQWhTNhhYg5pZctI8x+cd5KuPeu/x4r6v+3fBBT8mnU5Lv98vDw8P5f/1QCAgJycn5c998VMYGhqSuq6TSqVYX1/H4/GIxcVFOTc3h8/n4+Pjg83NzV93X7O6uiqPj49lPp+XiURCPjw8yHg8LpvNptzd3f1FYP8pZLPZfxVF+cftdpPL5VAUhf7+fnRdZ2dn59dn5W8U6XRaDAwMyL6+PrLZLDabjYmJib8SfzlmMhl5cHDA6+srn5+fjI2NMTo6is/no9ls0m63KRaL5HI5HA4HmqaRyWSEADg7O5MrKytEo1ESiQTBYLCDpyg4HA5arRZCCJ6enri8vKRer2OaJkKIToSrqys8Hg9bW1ssLCyQz+cJh8OoqkqtVsPlcnF7e0ssFiMSiXBycvIVwfbfp3A4zPDwMLqus7y8zM3NDbVaja6uLiqVCktLSySTSUKhENlsFiEEg4ODHQJN06hUKnR3dzM+Ps7+/j6xWAxFUTAMA5fLxdHRESMjIwghqFQqlEolvF5vx6Ber+N0OjEMg1AoxMzMDOVymVKpRDAYpFgsMj09jd1up9VqUSqVUFUVy7I6Bu12G6fTSbPZ5P39HbfbTTKZZG9vj2g0is1mI5VKoWkalmVRLpcxTfO7B4qi0Gg0KBQKRKNRDMNgbW2N+fl5qtUqU1NTCCGQUnJxcYHX68VutyOl/CawLItcLsf9/T2maeL3++np6aHRaHB3d8fb2xvPz8/ous7s7Czb29uk0+lOkQqFgkwkEsTjcUzT5PHxkZeXF6rVKpqm4XA4kFIihKC3t5dIJEIkEuH8/Py7idfX1/L09JRAIIBhGLRaLRqNBna7HUVRUFUVRVGwLAspJaqqsrGxIf4ABcw0OXfDRmoAAAAASUVORK5CYII=",
	"www.bing.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABF0lEQVQokWP8v5OBJMAEZ/34zUyMBhYI9Z+BIXKOr4zgZ3vVJyHGN4mygYGB4cl73l3X5Yl1EgS8/sxFmgYIKF9nv+K0xr03/JhSLFg1yAl9WnlGY+UZDRGe76YKz80VX+jLvMJnQ7bDeU7WPwwMDG++cG6/otSw2eo/ficxMDDMidtpofSMsJNkBT8zMDDce8O/7KTW2UfiBDSI831NsbnUu9vk6B0ZuBuEeb4nWF5lxNQgJ/RJWfRj4xarf/+hssxM//z174Ya3+Bg/YtuAyMDg4Lwx/03ZeEShrKvkm0uSQt8QXMSI3LiO3RbduYhfW6230nWl7H6GF0DAwPD77/MzEz/mBj/Y1WN7mkGBgZW5r9Y1cEBAGO4WQnBHqV2AAAAAElFTkSuQmCC",
	"www.btspread.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAUtJREFUOI3Vkr0vg1EUxn/3vh/eaLUpiZixMlitFZqwIRIJi0VitmIwWkQiMVo7CYlB/AOExCIh2s0i0VZ81vs6x6ChFGlq8iRnuPfcPPc5vxz4F1pW0mtK+ruercegFfKHq+wtKX0NGcwa8sl4nPMVjhZC5qt7pvows89Fx0OiKxJBI0NYBg0FEVAxRM9QuL0j1UN2PcN4TYKnEq0ARirxDBgLxn78k4o1I2exsdFFtCbBVI6L5GWyS8qChhCGBg0FIngJgUewL4obQVSGYum+HgK/y2wNoYl2hwAhoUqgELMQ+NDsgucAfqU84Iqc2aD7E8TdEbSlzRL4gmMtTS54juA5Bt8BzwXfgu8pQZ6i2Xxj9Q4xs43pL0v28bpyKyBV9UWFH+fRQeYPJtDTOasNQ9Fh+k4mUZ2ms573NZtodjjudRngpj6DP+sVT5By7krjiF8AAAAASUVORK5CYII=",
	"www.bttiantang.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAc1JREFUOI3Fk71rE3EYxz93SZAa1EsXX5CYwYKY5WoLtZqSi8EIEqpIuqndBIciIog4ZfM/cNREo9CpvoJQJSd0yXZFxQwpqJM0am7QX+7Scj+H9C5pOlTo4DM+z/P9fp9XRUrJTkzdERoIA1hNjNoq6f7A8WGWpw7y7J8Iaquk7zytFQeD540J88lZMtsSKBLk+hoxLWafHkta9a/fE41GI/H67ZKxMpHSF1aYtZrog+BKjkwYQFVBrrmkxpLW4xyZP+sHtEO3P7UAfnfQlpvoL9+8M7bI57LdCkKA7LRp/mhpH3/GjPovdNlpo8Vi9tF9WJePUT5zOGveuP+qCHDrSr4U38OXoAUV8FzBUnVRP1ml6gs8uJa/GY1gn4tTAphzRRGgMEI5OYzpYwkBniPYO7TLvpTPm5MnRi3PEUzfLT383CIo3XMEniNQlV4XXQIVpCvITp2yHl3YnVm8PjI6Oa5b0hW8aDDrJ0tXIF2x6XjUoAVHIJ12EPDVPtS/JbZUMLjG0MYM5islY77Cptu+moo/Dwhc0VPtJ4io3S0M2kxhxkxvDBB6OUrfDMIAxhHKjYV77/vBQxHs/VGsfl/h4rQJEI1g+z7lv3/jX+6Xt3yF+XD+AAAAAElFTkSuQmCC",
	"www.cr173.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAkpJREFUOI3t0sFLk3Ecx/H373me6TbdmhObppiOMBNCs3IaFtEhSi2z0LDoYKc8SnWpcxGkWUQdREShEilECKFAyigqI0kbFlE6OlTocqnzmfPZHn+dBDX/hL6n7+nFh+/3A/9HLC8dEpwUeDW0GoF0gHwFyoBJDEnJfgulg0dF4z+ABnBf2sjgZMfE6FTD0HRgYaE490WKFivbweR1ocdNl8ce1JkfXC+B1ikhj4s9jpndde2228MPDlTsAxkBlUImfdVjrwfcafPBESUGwCNZCJiEUWkQo2hOtle4ZkvruieuzvmLXZWIlsiyPjomh7J9J857wsbhTkcJvTI/ZQmzGWRqEuZws9xzTUkk89Tor36im4LPckicXBmvtuAI25htw6HX1HKHL2zcaqBOqCj3fo8bZzREkxaVUzmffn4jIz/zo0kqj1cA1fzAymL90zfWm1Ez0Xhf7jkGMjswslgfLsq54iXcpYVCRvJ8HDyYeJlYdaDTZR9oeVPebahGi2c2nLWTWFUjey9RhETcCIFAkanWoC4tBMbmD84QXf3jt7CESpotLl2WGAqiF9E6jWgNLTdAmcHarkuNwNe4L4JaXyWrViHp6LgVQ7HaReQ7Sf61b1QWsPRkHPL0S1UTn/tCbeXMNd2VZZu75C4eyqLiZGLd6kwkXY2bdheGYy0gAM7JSqax3towOH7WpuvJdosZUxXTNB2LEdXnfu4nz5+ATIiivLQgn/SJvtUAAPIymfxxp7FU6iKc5SQ3fIHj77w4x7PElvVKCMBf11nlDF7Ku3YAAAAASUVORK5CYII=",
	"www.deviantart.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAmZJREFUOI2Nk01PU1EQhp9zzr29tLe3UeoHRKKtjR+JLtSoiUJ0g1GIC5fGnWt/ia78BbAw6M74A9yo0YUGiR9FBXoLalDQgtjSSm/vGRctYmKITDKzO8/MnPcddfv+yMhC6eF1xxUQthYKWpFid2Fw1Jw47T8oFOrUai6OEYzhv6mUIpdr8Ln86bjjusLnT0nevU/+aaA1KLX5AHEMCLiu4AAoLXie5fChOtYqyuUka802QTpFqb+hCqUFsaoNAKhWDRcufiUIIsbHs9wd6yWbjfB9i1LC2ppmZcVBOv9kbZvmAIgompHm5Xg3Z/q/c+TID27eWiKRsIgoQNCm3bFS6WJuNs3qqsNsOYUjAp5nuXFjjny+StQyKAUfPmyj+DYgk2nRaBiKxRQHD/zi5Klljh2vADA9vR+n2dRcvTaLWMXERJafKy79A4vkclXCks+loXlQ8PHjASZe+Tx5mmF4qMLQ8PzGCkh7tHt3e0inLWf7F0l4Fte1LC97+H6Ly5cXmJ9PUijU2NVT31BsXYXSTIAxUK1pXjzfAQL9A9948ngnxlhy+Srnzi8QZJq8ed3Ns6e7cJ2OjGIVvb0NrlxZJJ+v0Z1dQ0QRZCJSqZgwDJib9Zmc9PnyxUNr4ejROtqsAwT29K2yd18NrYWlikcYBkxN+YRhkkePtmOMYIyQTsfEsUJrwVqFozpmKYcBpVKaYtFnacnBdddtLXR12U1d6SQ8y9idHJPvUngJ6TzYuKo4/tfTcdxeG8BpRYpCoY7nCVpt7RytKPr6GpTDFDqbHxwtzaSIY4gitaWMYyjNpMjmB0d/A7FZFBJXwP6nAAAAAElFTkSuQmCC",
	"www.docin.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAnNJREFUOI2d0k1sTGEUxvH/vfftHTOtzrRDptrQBhVK2kZpuqkQViRIhZU9G0EiEonESmIhiMTCTuhCfGza2BCVxkIiUkVESaimVdPvMTN37td739eq0sGGZ3cW55cnJwf+M3266xaA+J/la3rnsRKi65+BC7qDWladKo64V1Mb6wf/CvTrA+SY2ZWbGjsyP0Uyl4vplTs22QY6E3yY7VbGGEkzwKZt4g/ggd63Z8Zx78bnqtLrY12Q0QQrHMY/TDJW8AiNGNoWaKEokbhXBvTrjqPON/dOe2I1VGlsUYtWikj71IoqkvYob3IuQ84ympP1ZGjtA7AAHuv1sWDSHmpN7WVz9RUqrFp8OYawKhCWwDZsDGM5UsOP0GFL69bPB62z1381qCTda1opvjsjhKWnOOYzhDlOJEOUkgizEi+aIG7GyQhN2mr6sthcAEjMTkNJ6pZ3sKFqN18KC9Qs209NRSeKH5gkcZNT3PzYjrBWIsnnFgETYCGr1kil8FQRgGJQpCTnAHg9M4AbLRC3Mkx6WfxQYjEaLwNcP6AQFnDDPAC+0vg6AOD5bA+hMQ3AfAmCyMbCC8uA6kb9ds6dx1EFALQWaGUAUJIAMQCyBbDMauIUXpbdIMK8veCZl9/PvMUr9pINnhDLpRmx8hT9Rh6+v02NWItNhkyqEpvg0iJgAOT0cR75rz4NDxWbpXAQJAi1wo8kYZDEDQMCGdCUbqBr+4qTh4yH18sAgBd6G5NO4uvgu6gx70V40iKIFJGUxISiua6BjrbV53uMGxeXfq+xdLivT5CieC4Ph98NT7fJ0DUTlWGhpWXLQJp1p7uNM6P8lp8RURnH4KHKrAAAAABJRU5ErkJggg==",
	"www.dongting.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAttJREFUOI1tk0toXGUYhp//zJhpzkyS6XghZCZNp4toJXQmUIMQQyMKXYhQXLS1F61BcKtbu1FxJw0RpOIF66qKRjPZCA2kbbRYQelFzaVidSa0BTVpztQ5x/P/85/zuUgiafBdfrzPy7d4X9gkETkmIhNyt1bWbsOb/RvB7SJyeZ2YWzEye1vLT8uhXK/rjWETIpJd59QaXAbOAdmpmyHjvzVYCS3aWsJmRGAjsinFy6X7eLLQBnAFeFwp5a0HXAbK7y38zdkbwX9g9GcNP9HCnVQHgY34x0acGMxzqPdegDGl1CtKRI4Bp75aDPhw3kPbCPvjDPd8/QmJZghA6Gb55dGD/JEroq1let9O9uTbUUoVlYicA4YPTN1kObSYK2fpujTJcyMj5AsFAC798D1ffPY5M0Mv0WjrZE9Xhun9JRKOM5YEhq8uhdzyNYGNSH87wZvvjOK6Lo7jYIzhmQMH2dH7INfe+oBfh0aYuf4XiABSdgBmb4esaIOnDVknIp1Ok8lk+ObCBRbm50mnXfKFAk71ZzBNMIbzvy8BajXAxBGebuJpw+zcHOPj46RSKYo9PRSLRTyvzrsnTxKk2sAYME0kigG8JMDuB1zq2qBtxJbunYydGGVgYIBPT5/mTr1Oqb+fypcT6OIjqx9Elsd6ciBSdYBKX66V+1OKpjYsDT5L3OJitAEgFsFog8l2sbzrKWgajpbyIDHApAO8DTA6uA2MwbR3cmPfq9hMjsVajUOHD+N3PcytoReJSdKRgONPPLRWQ1VxlFLnBSpP78jx0d5eME1sSxs2k2NXqcRirYZp7ySWBB0JeH//brq3umxpbX1dKVVNrvX5hYTjbD/a11nelk7yxvQCxPHqRgCiiCP93Rzf20f3VhfXdT9WSr22eUxZETmltZYwDCUIApk6c0a+u3hRGo2G+L4vvu+LiNwFqv9ZZRmR51GqDJQBT5CqQk0CFaVUdaP/X+UDjgZGc8x2AAAAAElFTkSuQmCC",
	"www.douban.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAYhJREFUOI2dkjtLA0EUhb/Z3ez6iJFVsIhgobUKahH9BQr6D8QfoFhbaGEj2FmIKWwiiIWNFgraWIkvBAuFdC4+IIXNomajcV82E5OVJEQPDMzcmXPn3MMRbHadce+O8R/0xc4FC2YIwLsNYYNEAbSZAGglcrjRKFv2mBPQZsoGBmyf7uB7PkEY1CUqQkHVVDDkGQDdZGZ3GscroAoFXY1VXapQcLwCM7vToJtympIHeZuP9SJNQucmd4umqJGfvcBnKDnAZ/hF87wB8UoPJHzf48l5YXhpEOK/tOfhce2ZztaO6EgNelYTEQWqqtGdSHKxfE2L3hx5WPj6oDuRxMWroUCHzEkGN3BJ9YyQfchi5SysnEX2IUuqZwQ3cMmcZEAvNyibCPBqczB7xGT/OGJRQF7W4xCuhBzeHTOVnoB2s4qCNxt82LraBmBldBUcwJF75J0v30YUvNmE6T8mcVZAoiKJe5f7fLrFhshNMeMniWUPinYdShUYpSD1ahdY3mip8Cf0xc6/AVR5hQh5iqk1AAAAAElFTkSuQmCC",
	"www.downg.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAAAoUlEQVQokaWSQQoDIQxFowTcT/EGHsRjdGXxaN31GB7EG0jdBwJ2McXKNNWBvl1Mfr4fomKM3ntmhhWImFJC730IYTnd0Wd2d5gZe6HuCswmD1Jtt/Z2+LyazRq3NMGxKJTb9TkX6Hl74dA55pEz/MAaN4plh74PANTjMrb+y2CNO+zbHwtlSUC1QIYvCmWgKgjGf0/QiHJuEdwvFgDOn/cLNeY4LB6GOCcAAAAASUVORK5CYII=",
	"www.ebay.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAHdJREFUOI1jYMAO1BkYGLYzMDB8huLtUDGigAoDA8MrBgaGTAYGBh4ozoSKqRBjwDoGBoYcLOL5UDmC4DPUVnQgAZVDAYwMDAz/iTEVF2CiRDMDAwMDy1MjCxQBaaNZKPyv3gYo/ImcotR1wagBVDBg4BMSxQYAAPuSEVVY94jLAAAAAElFTkSuQmCC",
	"www.ed2000.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAfdJREFUOI2lkUtoE0Ech79dJWYjSau2qcW0jZDSLoZYRfFRsLYHEcWD9OCh14AgiIg30YOCJzGHetNcLZ681GcPFgMaPTT1AaZK0NAmbvPYWBOy26YJ66EkkF2bi38YGGbm++Y/vwFTBWXJMK+1KvF/YICtZrjHLUFcbykLx3XBIgCYOOUj8jFNUJaM0PQUupJEU37ye+EzyaTC8+hiE9wQBGXJ6HFLLBd0lrI6oekp1NgsWuYX2cQ3Hs0kLDdbOnButzPQ7+HouTOkZx7z+tU75r/nNwUtgmP+LtScykLiJUmlzI9UoSXYENTDKmo1RAFezC9z6+YVvn76gudt1Ehlii1FQj2Di+NDlEpl9o5cwHv+OoIgcP/SaTq0Re7GOxpA7EOkSSbWO9jm2sGefQEq+Tiqmmf05Cj7nX/oP+Dj6cMbzL1/w+S92xw8cqLpe8V6e06vj+6xcWztO1GfXOXaYI4aa5TXJe48eMburk6Gh0f+nYHDvoXKSgE1NgvA2koBgIxSoluWmTg+xuFDQ+TzWaugPpmLRPEHBgAoqwr6amXjwK4+ens3RrVatYYYlCXD43aQymqWTdfZywT8gzgcdirrVUKTYUuIQlCWDNnbTp/Hha5VSCwVSec0wnFdMAdmhhtPEEWBzjYbtNnQV2ukc9qmgLn+AvHN01FbrhfwAAAAAElFTkSuQmCC",
	"www.facebook.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAPZJREFUOI1jYKAQMDIwMDC4pa44/OXlLRtSNPKIqx3ZNTvCloWBgYHh34/PNnwiiiTZ/OfHZxsGBgYGFgYGBgYWVg6cCvm42RkKEi0YTHSlGL5++83w8s0XhoLWHXA9LIRsyow2YbA0lGVgYGBgEOBjZhDgQ7WMoAFmetIMDAwMDAX1SxlOX7gHcRWSdwkawMXJxsDAwMBw9f43BmzhhNOA7XNjUPi7F6UyMDAwMDx58YkhtXoTXJyJkAvQwcHj14hzgbV/MwMDAwPD0Y21KHw2LgEGDi5Bwgag+xdXOiHZC4PUACEZ/SOkahSRNjhKqeUMDAwMDABFgzKv9kFMnQAAAABJRU5ErkJggg==",
	"www.flickr.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8klEQVQ4jWNgGAUIkHDVgCH9ZhFD2u1MhrS7cujS/wXLdf+L1Rb9F63N+c9foogqm36riyHr7n84zrzzjSH1Zixcs1h943/Jxv9wLFH/869YXSZENvVmIIpmZENiLyr+F6pyRdGMZMh/wXJdBob02yuwGpB19z9D+q38/+J1c7AaINn4/79YbR0DQ8bt1bgNuFn0X7x+KU4DROtaGBjSbyRj1Zxx5w9DwlWD/yK1UTgNEKy2gYRDxq11mAbcqoYHonjdCkzn13WhxkTKjRCGzDszGTJuT2ZIvW6PEY3C1YH/Jetn/hevn/xfqMqV/PQy/AAAuXrkMa1I5jkAAAAASUVORK5CYII=",
	"www.gome.com.cn": "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAJA+T/EQDn/xUA5/8XAOj/GwDk/xEA8v8MAPD/DwDi/xUA6/8aAN//CADi/y4h7/9TPuf/Cw/k/xIA7v8NAuT/EwTi/woA8v8MAOP/EwTo/wAC3f8ABOT/Agve/wcG6v8AAd3/AAH2/wAC6v98cvv/3eDo/ykq5v8TAPD/DwTd/w0B5/8CAOD/AgDo/wAA3v8PEej/Zmrn/6ag7/+qovn/bGz0/yQe6f8DAuH/jI7t//L28P8uLtr/DQDj/xIC4/8VCe//Zlry/0tE6P8bGuD/j478///3+v/m293/wr3w/9nY///V2/j/eWvp/52N8v/i5uv/NTPj/w8A5/8RAO3/MzDk/+33/v/x7Pv/x8by//Hz/f/Nx9L/NyPC/wAG3P8uKer/hoPw/+Dk9//28fr/8uzx/zc22f8PAPP/EQPd/xUI8P9ubOj/9Pf1////6f///v//2t3y/4mP2P80NeP/CQDl/w4D5f88M+f/uMP9//r/+/9UVdv/DwbZ/xUA6/8DAOb/BgPp/0hA5//Jw/z//f/+/+Hd4v/bzOf/5974/7rA7/9tdeD/GxLX/0c/8P/p9vT/fHnV/xgA5v8JAt//FADn/wkB4v8DAuL/Pzjn/+Ll///29/P/w8Te/62q2/+5uOr/3937/+Dg+P+/xPH///j//83K6v8hAOb/AAHs/w4A6v8MAt7/BADs/wwH5P+iof3////1/6+mx/9gW+D/bm3l/0k42/+imfP/8vj///X1+///////trbm/zw64P8IAuP/FgTh/xAB3/8EAef/TUrt/+3v///s7eP/XE60/wYA4f8FAOv/MS7o/2Zk7P97dPP/mJnp/42S5/8lGub/BwHi/xYA5/8ZBOL/AADl/wIA4/99fe//+P///+Xj4/9YVL3/CQDl/wAB7v8AAOL/AADm/w8G4/8MAPH/AADu/xEA6/8RAOf/FgHq/xED6/8DAOn/Dgvd/4aG8P/9//X/9PXh/3h/yP8tJNL/HRTW/xgV4P8MAev/CwDm/xIG6P8SAOr/EAXj/woA4v8QAeX/CQjg/wAA5f8cEeP/d2zw//D1/v/y/Ov/59Pm/97O5f9naNj/BgDl/xID4P8YAN//CgDj/xQC6f8VAej/DQDk/wsG5f8NBOf/BwDm/woA8P9ANd//mJL//+Ld/f/Nx/j/Pz/f/wAA4/8FAuj/DwLq/xAD5/8TAOn/FQDr/wgA4v8OAOj/EADh/xIC6f8GAO3/BADp/wUB7f8ZFOH/HRXr/wIA6/8NA+n/EADi/woC4v8RAOT/EAXd/w4B5/8UAO3/EwHe/xgE5v8QAOj/EgTe/xEB6P8OAef/EwDj/xEA6v8NAef/GADk/xkA7v8OA+b/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
	"www.google.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAfhJREFUOI2Vkz1oU1EUx3/nvXvfS15jqnVwcHHwA4UqdNAWKoomBcGhWNGpk8XFxUEUcRaFqKtTEQyC7urgUBoQtNRNFCsIbSF0qI3WNk1y38d1SJDmQ8S7HDic/4/zP+ceyRfsODAdm+oA//Fcr68CXJF8wa71EtfCVowttQgyGtJK8Nx2iOolXqvDzTFNmAi5QcXeXcL7rxGlzxEvP8Z/ILGpDjid4g0DhYse2oGHbxocv1elXEkQgeJ81NYBQBdgM7Tkj2oWVhJ2eMK+jFAsGU4cUMQ9ZtEFkFYc3u/yy1gcgcWKpR6Bls7qHoCsJ0zPGHLHNOODitWGZXJUc+NpjZ2pboLqTAQaHpcMc99iRg+6fLmc4c7zOnNLMVm/G9DVAUBKCfPLMbdfGwCunvVwXCFKumvlzN1Nuz1RqVkuDWmGD7ksf7cEynJhxCOxcP5BFROCI38BVEO4ntOcPKwYe7RFVgtRYhFXmLkV8Gkp5tqzOv3brLRZqIaWiRGPVx9CAiUEGrK+IAkUZw3pf83Ac2ChnDB52iebgtUty3rDsm4s54Y0T2YNgWqHtFmwFmoJ3J/wOXVEUf5hWfmZECfw4q3h3WJCoDuG2HlM1sKGsdRiUALKaX6utBZ0x85cr6/iAFOt02wSpel7TyDsTgv9vpD1e4uBqd8JecJJIf0F1wAAAABJRU5ErkJggg==",
	"www.google.com.hk": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAfhJREFUOI2Vkz1oU1EUx3/nvXvfS15jqnVwcHHwA4UqdNAWKoomBcGhWNGpk8XFxUEUcRaFqKtTEQyC7urgUBoQtNRNFCsIbSF0qI3WNk1y38d1SJDmQ8S7HDic/4/zP+ceyRfsODAdm+oA//Fcr68CXJF8wa71EtfCVowttQgyGtJK8Nx2iOolXqvDzTFNmAi5QcXeXcL7rxGlzxEvP8Z/ILGpDjid4g0DhYse2oGHbxocv1elXEkQgeJ81NYBQBdgM7Tkj2oWVhJ2eMK+jFAsGU4cUMQ9ZtEFkFYc3u/yy1gcgcWKpR6Bls7qHoCsJ0zPGHLHNOODitWGZXJUc+NpjZ2pboLqTAQaHpcMc99iRg+6fLmc4c7zOnNLMVm/G9DVAUBKCfPLMbdfGwCunvVwXCFKumvlzN1Nuz1RqVkuDWmGD7ksf7cEynJhxCOxcP5BFROCI38BVEO4ntOcPKwYe7RFVgtRYhFXmLkV8Gkp5tqzOv3brLRZqIaWiRGPVx9CAiUEGrK+IAkUZw3pf83Ac2ChnDB52iebgtUty3rDsm4s54Y0T2YNgWqHtFmwFmoJ3J/wOXVEUf5hWfmZECfw4q3h3WJCoDuG2HlM1sKGsdRiUALKaX6utBZ0x85cr6/iAFOt02wSpel7TyDsTgv9vpD1e4uBqd8JecJJIf0F1wAAAABJRU5ErkJggg==",
	"www.huacolor.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAwRJREFUOI1dkltoXGUUhb///GfOnJlJM0kMuQyWUkVQSU0L+pCaqqApSBSpomhbUrFqHqx5KEL1RQiKNyLViq1XsAglRWJpFcU+CsW2VivGEpKqaR/aNCQ5M8k4l3P5z/Zh7JBxP+/1sfbaS/G/OTQlbksTu33Y7lK9ybKV5SeTntb8mIDP53zOjXSo+Pq+Wi0e/UVuaE8zcWnm/L0LQURJKxLpBC3NLm3pJK6l43Tn2k+ulHnl3fWq0ADo+VLcu7o4ODX9xwNerucrleavdIZsU4YBa+73LY4d2xnLohlF280bTs4V2XG0Vy0qgOyYKGBdewt3H9h9YXxQ9ZjVzvrOyDbXeO/H1y6ulVDQfkTm9v6Dix57G06Qn5sUyAaUeQghh0SzOGtOqI35i6fk2MPDJ7Z82rR0oTOohISlgPSmBzfbdfFPaRcYI3KeE5RzPSLlmzfkLC8rtW3/PaflqHfZjKggIKpGhFV2KQA52ZomwaFYGKpnK1LP2bLLK1QZPLy1HL16YOrrVGG6O6wYSHXN1Bz8w7NonogjUAhaBx6W9QHKPovIYxj7GRLWfTlmPxLchcpK1B0HIXHVy9YAeXkyNLgWQmS5FX1r/2uq/9v3/rPwnXzW6pPNbx5YHpuyCzuc5aLBMQHGNsYCYEk64iVBexGTV9dV1PFvfmto1yX/HPOWS9Dbu+KVXFP2CSohcaprtgbI44snGE/4db5To2lrAITlKxTXv/70qWFVmF/qxq8QViNUd99EDVCS81YZQwlUqbIGzdbVevU2P2TMn/7ExLHtrl9ImjCGVPtlYLyWQczHjmIwilRLn/23lZv+cOfVUfFakxzOV8gAj0ST48OO73XWiqMkecfje4FrtTfuadbAC4GR/ZrI+qLcx/OFp4jFjlPaFyWxjkQTYZF0nOXMnUMvAkcW9ylTb6LsaVbACBKPmthkj1d7eas4wEzUgUK40S6w87bU996ml/a986iarJ/XUOUa5BZEhojD+7GT7TTlimjnDOWFI2zcdVoNvRmu1vwLOjhUdh48IqoAAAAASUVORK5CYII=",
	"www.huihui.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAoRJREFUOI1tk01vlVUUhZ91zvu29N5SYsViQylCcgPGEcWohWCNDkhMTElMNIY4QsEQxzpxQH8BQ6clIfwBPxIdGI0f4QdQQw1YSa9CRGkp7b3t+3GWg4v9MJ7Jc5J1kr322mermMGAAf2Xirkdd0mu7GJdyDv0dAdnAChKQ/uxkcQmdWRa2cmPSe3rqr68jMpFaWBLtxaVAaj5lMObn0uSbW8yDI2Y3fsUDr3m/Nxxsd61q2rr3c0TVjGDXYOXGmh0gu0nTJ4le+UD0u2v8MI31PM3YGUFr/0JS7dxt0bFDFbMzOHTyt75zK42tiqEzIRMpMpOW5Vp/+Ty6tvywl+9DJw1FY9O42JNvnOdun1TCML4cYXDk6RbPyj9cQNAYewIOnhSXm5g8ziDmJnBUQk7dZZFe85GYs+BXurL9+zFnyVsnhjpEYQfT8GKUnMfXl2W27dg+KDiaAs9O6U0/y3p/m/S8DiAdOAE5E31pvevg9BzQFnbGw8lYVddBcmpWhfFQ9so9DUNFmXHOG1zgERfEw30K3/jk96cYwaxX/Hoq7h1ShIQ+0WqwbXQNgd0llzOXpDAKFevO/6fdSliZq8+EMaBvEE8c0VhEFibU3j+DNqdywvX8K/XNqmRJwkvvCU6c2hXofz9WehvKEOBsLdlXnxX6bsZh9ZLUmvS6di09Oh3O/ZJQ2Pm6QmxetduSPHli9b4lKr4nlVcCnY+Qfb6Rcwg6cdZstMfovFTve+ogKsu/uULqq8/JZs6j8aeo7z6EWn+e1RcwpTB9coehYE+Ex7InSFrdL/ioWdc3/tbbi/aGyuKjUdOaViUwWrel+8mq3sOby40O5YZQgAbUtqpbbv/A3y1VkWI39QYAAAAAElFTkSuQmCC",
	"www.iciba.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOI2NkiF02zAURa92BjKWsQV6zGWGoR5zmM06WOiwQgcadsxmxWUOc1gMHeawmC0wYSlr2BtQl9qb1+Wd84/+15GunvQFHSUh2u12l0hCxLVKQiSVsiq1TrgeMLRZ9ZerACYJUVoACFixiGZ88kua7RmAQx2xaTHvnp6m6KWwluPHRsVJyg7Wz92DFIbhv51Y+zZAaiTVegNI0t39SWmaDkI+dAs33OMBU2AyPpMfYfOfN+gB2uXTJXdGIybjM80R6v3pOkASLriJ9gB4wGQ0YvvwjOd8xnGcQcDHbuG7QPsVY9IuFgmMuUV8771DNf0D8FuP3gJna/Mf7pibKKCRgzFCrx2tpuDXZb8LSgOtQYLeGLiZ3PCnXYW0nnL5dD0H1cvKJlmGv7K5f2jwSZm1QBTQyuGbEQIqMxu+AvP5X1Mlc2ZkEAV4twsq88Qyjl8Bzz60O+B46fsG+x+64307Z9PaehnH5HluTFEUqqpq0Mh7yvPcAPwCPY31TFrAi+8AAAAASUVORK5CYII=",
	"www.leidian.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABoUlEQVQ4jZWTMU/bQBiG8698n0sb23cWEQKhAqnYmkhUbKVNGdsFCfojqMSA2BFDO/IP2pGtvhShS9yzc+c0OFYqvR1QUF07iA7vcp/u0em5721ERC3JSPXJRSVLTzHs9arn5EIyUhFRqyEZKdPeRt59VcptZwfF6Rmmn05w29mpzE17G5KRavTJRbbcQibCUuzzDfy2Fvb9BxguKvNsuYU+ubgD/HuZC0wuLjCbzTB6vVcPEOEDgN1dFNMpiqJA8rIL+z8AI0L8+voNeZ4jz3Pojc3HA6wIYY8+YjKZLMz48vIeWAGYzS1kSmE8Htcm0xq6/eLeSQlgucDo8xcYYxYmPj6Gbnr1LzBc4GfTw82TJVyTi2ty8YMR0sEAaZpCX11hIEKMAl7vwHKBUcCR+AESz0fi+RiurkFrDa011N4bJJ5fErrwG+dCdaeLOI6hzs8RP2tW9uFhABeI3/YwiCKotXWkfvD4RZo7GR4cQB0elcRVAJKRSmrohgvE7/ah/QDmL3HzJH5wVybpOCt1dZaM8N1hiBwGWVd1cm+k46z8AR1jqQDjb6yiAAAAAElFTkSuQmCC",
	"www.nciku.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZtJREFUOI2lkzFrWlEUx3/33UAz5YkQCy7F5Y4vKHQS6iBOHarfoCjEKeQrvH6EjAaUfgKrQyfJ4NCpoCgufUNCFqENhJjJEG5Ph+Zdn9ZKIH+4cC73/s4599xzEBG2rZk0u61JxrYmGTuTZvd/95SIAHAvvBlZ6lnF2Gh659PXloSOg586slTnQr6g6RworgH2Yvj0+2S8uL3zAcJKqaHUAyKvnIOp5WM4GLYB/HTq5OztUf5Ace0BjCz1GAYIB8P2j1/i4OhmSQwDLG7v/JGl7jLIKsbiKdTvFXQRWWDp7FyONWUVYwAPwGh6n8rvGmzoIrJPjlYSTxFWSg2j6QGomTS736ZfPsSpbgKbKhuNOdwHoBjU+qo1yawRu5wk4VjeznDPkFcMav3nRIe/NYlulm5fDGp910jJfwa4unq/BudyX50dVkqNQPPZPSGyVJNwrLLRlI3+J5NwMGxHlio89cFcyG+DVwVbcvm4fj4X8gZ6HkBB0/HTqUUyxWS1zeE+YaXk+sRPpxYFTQd4+TBtHdHkOJ9P/Z3j/AdFWwuwC2+ebwAAAABJRU5ErkJggg==",
	"www.nicovideo.jp": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAATVJREFUOI2lksFKAlEUhv9znSOoly4jQQwpouAi2nmDwbU9QTBu3IrRpm0tegCXQm/Rfl4imUcYd62KBkzH0JFa1MTQSIzTDxcO/z3/dy/33AJ+ybYsfVAsnr6sVrMsfkpNpZwK86ttWTr2LtrtlmT2j8rlmz/DCY0ks29blo7Dh6XSeFcjJWqdqAMAY8msAaBANOs1GpdPi4UZN1x3OrOB6wYEALbWD/1+36nV6z+E+8kkeJxOTTaMGGgmDoAg8t7W6zMAwNVw6FeYP/ZdACAAgJmzvk1KIncyCQiXy9wAAgCllB+FYWvf8HKzIQEAq/kcmyjKdQMBAMWvUeWCCAAwhPDYMPA982xBIg9I/MSTavX8fbs1n8NwTERBTcrbeG+Xf9ftegPXDVLkYylHTaWcrP6/9Qny+mYKT/VKrQAAAABJRU5ErkJggg==",
	"www.npmjs.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVdJREFUOI3tkbtOAlEQhr89yx4uCxENMaAr3iOFJDTKA/gIvoGFT0DsNPogWnp5AUutNBFs0QIrY+SyxEKUXcNZjgXeYqmlftWfyUz++Wfgn19jlAuFG9W4/yiYwyNo36fvdQEQ0RhiKMnXnndCzgSh+PLS7Oz2DlopRDjM/dERiXye2MwMIdvmsVqlvrfL/PExWuuBq2liCMH12hqCmI3MZOh5Hq2TE6zxMaTjEMlmuUylsHM5iESRmQzu6SkPFxfUtjYJlIJoFPGxjxAY0hrofh+AZKmEDoLPvJaFYVmImA1CvI15XYJmE3V3h3bbqEYTISUA0xsbvNRqmL5P4LrodhvtthBel97tLabqEeqcne+X02nEUAKSwwrfK0opFzzHoV4q0alW96zFxUh5dBRzanLgGk9wdXiAOTeH8f2ylWJxvd9qrOinZyWmpiPLlcrqz5/8N3gFC1x34s3beGUAAAAASUVORK5CYII=",
	"www.pc6.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAmxJREFUOI2lkVtIlGEQhh93jV1/DQsMNaqL1lAQOrB0lWRJgaBBWRd5ICu8CBRUFNIiQ6S8qyAL1xKyyAoKySiVLhRzocwsK/OU58wf00VtzdX8d7qIzySjGweGme/9Xl7emfEREVYSvgAjHiL7frATYLUv46EWOoMtfF5KdOMJyqfyRjjrezOIzV38EBEejkpBaqu4CrukIeuDdByqn5TGCTkmIogIHpkPiBspaMJhl3j9fKPCReSPQGGXNCiwYkguFXXLc/XOkPIqHHYJqY4b/SquiKUCvsrJzAKBnW6i57z4vZ9m/yaNjwB1tKWVlF0/qPlrbueB8vhQ1nYu2wHA0NRcREm/pQLA5s/r1I1ke/Gajz85WwTQmHwrcTPBb5Zt8V8jqGyR3ngcdsFhl5DHcbqqldKUpzim/53oBR0xqtd1PVjVpLLM4ns48xYddLslyumSpL8dnDSuPcNhl8MTF+vfSn/ssIxHFktVqXKyeAURoW9G7DVjktXtliiFJXy70IDDLu0yFK0wQwxz4IMYFw67fJfZIBNA8yRHzrTNNbVPs7uww6gZmmU7gFWz/gSYx/BTo5gwGX5Wv3mABQyrCaBaJzfFZjmXYyMhw2ZOMwQzwA4trBPgJT17lMAY02G6rgdr/pp7Df5fTAAegwDNzCTAOguDiryPrU8Bcu4WpTfQnvKOgdiUgeI7APnJmfcXl3hzUErzP0mz0yUpp9pkuG5M0tXMJ+av1qpTqgxvTO6ZkpkQEcFHRPB4Cbg9zGV9ji02jZbEDZw2gQHgxWt+RHN2rbc1xuPxrNqrbXt1lF1XArCOA78FVhK/AJ/ZkgMppt/hAAAAAElFTkSuQmCC",
	"www.pixiv.net": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAiFJREFUOI2Vk89LVFEUxz/3zpt5j/mhMyZDqE01FKGLTLMQqk3gIsvatAwKAokW9QcoUyAStKr/oE0FbhpSqBaBi8AgjCRMYyDSgtIGmXEcZ57z3r0tnkwzNUZ94Wzu5fs953zPOYIJ5zzz0w8orsX4HwSb12nvHBakXuTZzDfVfWpAay+EACkai1iRolFHrrhQdiAUYCgRo9kymFvd4P3XPJg+MI16gXIh5L1UFNgOdwe7uHK6C6U080tZKq5ivKOFxK4wD1995NKjWQgaXlUACG1QsLnev4/7l0+ilKJ7bJLFb+sQ2M625XIsEeX1yDnO9u4nNvoEJFURMTGT0QOH9+AoTa5oczA1CU1mfakVRWfU4sPtC7xbytJz5zlETEBoebH/ALFrj7FdhZQ7GOaXLKwUmMl858jeVro7oqA0AHIsPQs+gRQ7OF0VMZhbygIwdCgOrvIEbk1nIOD7O/k3yJoqJf5/JNsV+pJxAKYWV8AntwVqoDXV3upQdhjq2k1fMs6bT6u8/ZKreiVryS0hk0Q8DPkybGx5kSszcirJ05sDfM4WOH7vJYR/Tam6Whovc/rqCdrjUbTj4CpNWzTIjw2b8fQso88WvPHV+F0VkEKwVrTpTU1B0A/NFgnTz3KuBFsOWMaf+4EWEitcRGuvf/DIERNczfKm7d1AxKSh2WaoJOk5M9zaFi+GLT/RoImIWN41Cmp2vgHMUImjgzd+AvqgvLCaXs8fAAAAAElFTkSuQmCC",
	"www.searchbt.net": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAn9JREFUOI1lkk1IVFEUx3/nvvE56kxMI0VWqFn0oRamFS2KXFRIH0RFkgjRPqQW7UrcuG1RSFBbE2zdolUQERVoIkNSC6NaZNHHNIPjzHvOe/e0mHGc7L88997f/Z//OcIaqaoL9APngK5yeRZ4AkyKyHL1fVnzuB14XPw+3bn8fpwwPQeAk+zA3T1ITdOhDwoDRmT2P4Cq7kTt69zzW0k/9WAtG1Dc9ivEj9/JIc4xEZmpAFTVAFOLz0a6/bdja7v6R27HIPHT9+ZR9hojninXLxS+proLr+5jfcF64LScInpyjOiJMZzmPqwH1he8txMU5l/sQLgKYErmuORNjaMeqCe4B4ZI9I8vxLoGhmP7B4YTlycW3J5rqCeob/CmHyFwvgIADhQ/TmN9sMUItUdvWBFOi8ioiIwCZ2uOXMcWHawPxS8pVOkEjAGMKskwm0V9Qeo2E40lMiKSWunbiKTq1jVmqG1CfUELAYBbcSCQwUmU+iyE6KqzisIwjGghwHqgznpEyKwALPCZ+FbUF8LMIkv5fExVI1UjNgWvUB9mc6gvUL8JhQXARsrb8ME5eLHXtPZg6iMUfS9CQ30MSJdDTgTLvolevIldCpDGLaDMA0RKPzBn4kWYGgUbYPccRZPJthUASpvNfkHe3cYxLmy7CzBXncGMxrYR/LaEfxzsr8+gtFVFsMP+/ESQdgh+Btj4dhCmV/dAmXU37sqH/gaCtCH88RWE1koG0Br++EaYNoTSQrSpPae2BIgAOI7kQ6svl/pGTpLPYjr6rCozKwCBN2bfGatOg5HGZmINDZOOkXz5rCSr2gwMoeQRnhqRN9VjtKqHUXoRlhUeOiI5gL9UHBpNTYdv7wAAAABJRU5ErkJggg==",
	"www.shooter.cn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAA2NJREFUOI1lkl9IW3cUx7/nd3Nzr0RvonHpZq1ojUuL69IVxoKZ6KBjwz5sqKWFUshTCxmUUWggrBQKE0oprLiVKBbaB/tSafpQkPZhXZ3VERi6UlllLUr8R2Oi8UZM9Obee/Zg94ftwHk73+/hy/cDZsb/9vr1g3zs2Cfc0fEpAwn2+T5mZomZwcDhf9868N8ZGPgaz593we+XU/39VWkgsDeb/Sh8504eJ08yUqlKNDXNIZf7Hsy//PP1zJkOBn74qbV1JTM5ya+fPuXbssy3AR4C+Nd4nJmZX4+P87DbzSNAjisrvxEAgObmNr27O/nH0NBX+Xy+RphmeU84bB65eNGyAdsBmM6KijIAc2542CzpurEF1Iy2tn67G2Furjs9NVXzfjy+beq6PJNI4AOvl5bGxoQAbBNwWMwMABACWkODZGYyJhuGEAAwDRzeePbMBrPU0NtLB6NRyk5MYOnxY7YAsgGWVJUA8HuxGPXMzvKRK1fINk3bAQBvARvZbJZAhFcDAyxpGoSiCMXlov29vby3q4veOXqUGaCqxkYuvHxJqxMTJLlcDgeIPApgmltbxNvb0A4coPLmJte2t+PzUAi+tjYGQDu6TgTwi0SCpi9dsndyOfFuKLQmUFv7tg5UEGCapRLtrK/DEwySXSwidf48Rjs7acTvx6tbtwAAq+PjvJXL2ZrPx+HTpxMCur5n3eOpC8bjtpBlqmppodpQSCw/egRrZwfuQIAswwBbFgDAqWkAIKmKUkI02idQLu/fF4m4qgOBcurcOXJqGhv5PDeeOIHPHj5EeHCQgxcuAG9KkDWNARCKRRMrK2UBVV2w791bXIpG51vOnqVSNovfr12DVSziRX8/j3Z20m99fRCyDPxtA/bW1RUwMwOBUunHysXFNSUSaZZl2XwSiRAkiQqzs1wuFEjIMtYyGbwRkqwoNgEI+f3TiMUsBwC4gftPLl/+cmthwYJpctPx41JxeRnpBw/s9ps3qfnUKao+dAgAWNU0i3fB8kgAdlFmHvnC77+v1terrKrO+bt3pcL8vKSn0+LnSIQcLheqg0FYhiE2V1eVClU1pEDgO/h8oL8IxdSUGxsbMdy44Sklk0pBVX1zhlG/7fXWZp3OfY09PfjQ45mkdDqNmpoxXL06iGRS/An/xqswUdmomwAAAABJRU5ErkJggg==",
	"www.so.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAepJREFUOI2dks1LVGEUxn/nvffONaEJnRKTsSCipFWMlS2GmaJNGLRrIcJUuOkfqFzULlq4GNpoyzZKizahJEg0MKvCIQgMXTRQRuCMZAghjs3ce1pc7zQfQuiBB14O53nOx/PKiMbS3g4Tvwq1S+wjui/ai5bLA7mxfGRt56f27occhntUSnZl/WBkgMq69tr4zcljbpx7p5+S6EoBsLT5nsniOOXK6p4iRj0I0e8O8PxCnq+bK4zlU4zlUyxvfGRyMEe/O0BjbQi5uhBVAFV4cv4lnzcWmf6SRUzQQX3InLnPue5BHn0aQaRlAhTQQC0RSzP/fQbLBsuRADbMfntBIpZGvaC2Ebbu3kA9xVMPABEJCsK3QNX/g3qKtoxgGtUK5RzDJ0bbutw8eZdCOdeWR8EOO4EwtfSYqSsLWGLxbu0VANeO3+L22Yds17b+EZtc0OCACJQqq9x5m6Tv0CmyQ3Nkh+Zw6MAxEaKRLt4M/8D3g/oQkp6N1jXVB9/TwKIwq+DVlA+jvwHYrm1xfb6v7kbTDUTAWIKxg+uHbtgR4fL0YXz1mFl51uSGpF5HW7ZqD1Xwq4pXVcQItiv1f2IiMSn9T0AEjCPYHSYg744fiUnJ9CSdTGfcFPeyqGk9wBjq5M64KfYkncxfsy7Xo0OJblsAAAAASUVORK5CYII=",
	"www.sogou.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAqBJREFUOI1tk12IVWUUhp93fXv2OQ2p0e40plGRqZVJYF3a4YyG0o9F4BiJ1kWSBXWRCP1BF12kNyJdxCihiEigRCCJ1QieHCFvRCIwlEDnD2uUE+NQjM3e+1tduEdkaF2un4f3XawlZoU3s5XAm4hehx4AwThOG9ivwc7p2/t12+A8oB+jBfQD3wHDVflBYB3wDpFTwNsa7Fy/BfBmdhdwEuMiYqvancnZygC8N5uLs5fIUmCVBjsTM4AjGAViM0FLMG0k6AlM3cA/uI8QOUcZT1D6VSKHiAQNdjbIm1kL4xDicUwvFKaDRWKJEqPWpRtAnM79Di+ilMeYun9G9N04vxHZZMAWYI/anUlMW4vEEqWBWnf4gZotILX5ad0eq6X2VpraAEF3Vhb7gS2GaFULg0SXlBhKDephNd3pF8xJn2ZOellH//hKx8efI7EPqpUcQ7SsdBo4owAE217r0jchsVgE6yrrYXOZhpOYhnzTAzu8b2FDx8djBRgtnYYJHDAAHfvzL317pS/In0rElwFGcSii35cXfEjpF/zFnlUVwARuJkYQSwF8beMNf77nHn09+ov2XX6XqXxRmMrXJkW86GXk39zvpvCdFeBRE8OG8yPQB0Dp7wND/tL8A/7KgteYnH6Sv/MJpooxny7xPELpMxbW4wzIm9kyxGnECoyXCfbejWCLlOimSIDoeOHUyzhO9PVEH8M5R+SZmUP6HONZxBq1OxO+prGMoBVI9wNzcZ8k+nmcExq4NuW92U4iUac6HyeVnE+JPIzxk7ey1zVw7Vfg/P+dMwBpGKGIZ279QqXCgG2IjxA/A0dxfudm12LgEWphF/fWPyGPr3J9ep2+v3pWs+HezBrABqAX8VCVHgLaGMuZl2bUwnYdHhsG+A9Izgq2ecXgSgAAAABJRU5ErkJggg==",
	"www.soku.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAb1JREFUOI2Nkj2S2kAQhb9WCZVrFZhga4MNgAnJ8AlWZMqMTmD2BF5CRRSRQuwTwA1QqIz1DcgIpSJw5AAHciBc1Q6YqZr1T607mpnX73W/VyNamD6waTudYSuOpAEWktclgBZmBqzbTkcW31r8HABLnwxgGz86ctvpzpEtPgf2ACEw8aaubM8IONjz2uIHYArM2k43bacTLcw8AD67qRbYtJ0ugQdvG4CV5PVZ8nprxQBGgeR1GUcyjSPxAdpOn7QwCa9UoIVZt53ugTOQxZFkfoO1BrDUwiRamKe204l9a0QLs/s9REs8A++ASdvp7i/4s+T1NAAe40hWcSTPjhhHUgJTyevGs1i6MONIVkAGIKbSkU26qVNZAJhK58AHYAEkwHtgUafXjEx13ahOJQuB0eV0dBYWptL55XTcAPQG4xnwcDkdE3s+ALh+U2kS+L58sty8PQPlv9J39ULAJ4e391O38n8LuApv7xugeY38h0BvMC7tJhNgbyrte/AQrr69t/MLgTqVrDcYbz2RDfDF3uem0v3Pb193AOHdsKlTOQRcf6ALjTqVRydibXzyRBP98b0f3g0beXOTAfwChGHZ065URU0AAAAASUVORK5CYII=",
	"www.songtaste.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAY1JREFUOI2V07trU3EcBfDPvbmxaYfUQJXiYyhVEAdBLEIFEerkA6FSsIL9B4rg4qqD4OQopCAuOlUdikhFdHAQKojdLLQoFpUuhlajYF9Jfg5XTRUx1zOeL+fB+fGLwnVtcm4KBhHLhprILXUXEjmXBecyCpsIzovNJYIRUNpD/zW6DxEnVF9zf4DTU383eH6R949GEuwQxZx4SLGHhacsf2TbEZICoZEKOneRtPN5jvoaAcHOBJFCKRXXV3l8huUK+Q4aNe7sSw2GXrL1AJPHqb79VSQdbWWRyjS5Ns7OcvAKcT5NaoH4xyBMnuTNXTYV6bvE0DSFUkaDOGalktYf38vSDJ299Ay2NEhAvpiOODPGWpVQT6+1b5kM1oV63pY+jt5uXj48YX6ilX49CmVTgn7tXXTtJ1fg6zxLr9JtfmLz7vQZP802x41MRGHMMcEDQa5l39+xKnY4glA2gFPCP/5CBIbxDs8wHo168V+RoWwhlPVu5DLXDjd0a+iIRt3byCeZ47cr+eLqn/R3nWZ11BgY+5AAAAAASUVORK5CYII=",
	"www.soso.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxtJREFUOI1tk2tolmUYx3/3/dzP8x62dzU3j5uH6VApN5Vi9CHCVhEdqMD80DKtJGZmILjwmyX1ISWSoEK/GJGCsKAoEdbIlvphKKN3a2woq7Zqzrnju/fwvIf70AdhbNX19fe//nBd/P+Cf427EWvCc28haQo1G6XvXKRc9hMXPxNRp4SaG1yoF4uWB+In80V5IJVXQd5JtBU4H6wCETiCChdWrfaPJsSdjxYZuMFoDK26p1OyMVUMCEUdZcueJH5PAxZLOv0rY1Md2GAcETOs2eJ3FPGe2yT+KN416It/O5NWz0/nIvgrD7JqYxvSiy46TZscyZsnGJ49jyrXrN8a/Xi7GDws3LXy5rAgOqdLgZS1x1ha1wrA75M53jmb5M5MnjAsUnBw4cgjTKXP0zvxCV65Nesa442K0DuYD6UsBQ2sXPM61lpmcyXe/CJJLp1j76MbSEQV4zMhyysCaiv38Mv4D8zlhrwlRPcpsvIhm/OIbd6NtQCGgVtzzIQGOxey9+HahW/GWlhX9TSXx08TnVBPyUJKLrUZDxmtR2uN1prNy2JU+ZaCkDx+9BLXhybnmdaa6lg9c9rnz7/sKukyHiLt4UoWYwzGGKIKvtq/jV1NNYxOZWk5fpWOntF5rq1kthBhOhtRMlrwbnsZMGM35wXGGHwJh55Zz4cvb0H7irOdQ/NsJH2LjFXYexN/K3LiJy90r3i936HvewEhBPs+66GmMkpl3Oeb7lGs9ahfUYYxBuccXWPdZIseNQ01VxR5PlVF1xIZ7vHC6+24B1+kbyTF5eRtrHFUJwJ2PlDNkZcaMbrEpbFuktO/4QllQuKn7wapbfmZTNa8ZouOsPkQPPYGSimCIIJzFmsd1houjnTx+cA5dMmwdnfDl1/7H7yqAMjZ/eWOukzR7IhdOIHt/xH9xAHKduyiUNLcmBjmTLKDa7Od2BIk7l9xFUXrf8u0p+Kw1u79rBGxvJUsOTdOqpRj5/dtFOwkzsn82pZtx9vFu+/9bxsBXEtiE0K0ImRz6mTv1me73iayobK/cvvqKwLvVLs41rdQ/w80eIjDBkn6LwAAAABJRU5ErkJggg==",
	"www.torrentkitty.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAARlJREFUOI2lkr1KA0EUhb/ZZElq2a0sUwhWPkBgHUE2hcgiqGgjVr6QpaWVjVu6QlgFX0FIaRNMZB8g44aMhU6M4/64eLqZe883l3tGaK35j9r2RTarNnjdGsCXehdnp5fTyesAwPP9h6vrm3PgxW4U84VuB9syB3BdN8vz3KuaoNPpjJVS6wBPj6lwWoK5KdaZAYzZyDGkOqMt43HMRZykrabmHwCvyyJO0q0mZgBh/4NsBkqpneP9wXDZJBx1ezfsAWM7xkKAURRKDRAn36/aAIdyre5kraypDLARhXIZ7+FeOAI2/wyIQjlaPef5ux+F8hmgH0h9cHRyXzdBlfTbdLLbDz73UwgQwlFFRlN2XTczcf5Koak+ADGRZZaTy6bRAAAAAElFTkSuQmCC",
	"www.ttmeiju.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACWUlEQVQokX3ST0iTcRzH8c/39/zVualk6dRACIwiSFCykA4dgk5djKJTHrIiLwZeukoEQafoD5REJBQUHcw0JIiIpMHECmzO6bLNTbe1v65nPs+e5/n9OlS38n38HD6nF72M5IWiPs54bFcw/DsCKi4u+4uldEq+sSyFy8jR7327FnNoiaVoNlZa28KVJR/4nzMu4Ag4HETQJRAgAJfz14eNSHxDnsp601XyM0ACAY6AJuxWzfH7NObacyW1KogAIeh+yivHo3Lpp1moML+mCQFXoE01R7ucXR5FUUk4uDRbTVgaIwiQsVmptR0Kpc2sKe5GdIXBdAHbYlwM7IOussEZx9Fq2r20Q4fO+PUeJxJPys+/a0ULzEW0gC8/YBjKoRbrYLNasKXRI3xypfx02afqqFPYiqXqiym5r8naMOhqSE3k0NNcuX1S6m1TQZIo2U0q1osEF9Ut5E3RnwmK2rJcMimSZYkMwNEgYyFZ9chUr1onxq1Q2gtFhwa4ABfHuvcn4jHqvlX6miSzxgsABjpbtuaH5OEJY+SoMrMq3QuwcFYCk6CgQdnsKAbpXSgfK2BgulGY2LvTfjPojAXl0SnpbK/z8BR0jd6GrZFp6dO69vHi5tLqOp0ZF7EiAlHsabTGTtsPAsqTOQU6gw1/vXW8U3S1imefeSBW23eAGjJBOncn+i3HPuQ6WutsAhJZBdpfDC7gAFxAJcjob19glRS9mi/HCzT0wiNcAMD/AHI+ecGIx9eo55pYSMJ0t4cHEOp92F1+TxOBfHhD3JwBbY+Vu4/Os2gs/Qu6sSTGBZ/2sAAAAABJRU5ErkJggg==",
	"www.verycd.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAppJREFUOI2lk0toU2kYhp//XHKSnJy06bEXbQe0EUFFBK120VUVVFA6dRhRxAvozrUuXIk3ZuHOheBQZqYXFe1aZkRQ8UKrLrQzMhaxttUmnqZNYtqeJCfJyT8LcbDoRnzX3/PwfosXvjeyr2NE/t526Nu5jbtlb/szIQe2Hcxmx/tilvkPQu8Uh5+mAeSp43GS0zsoeh7hYI+43PcRHOgA3x3OzrntMbv1mACQV3Y+nnZeb5ZaiaZY9y/Eu49gGI3MzFCamGD+yRB2yhlhg3cu15wdLLg+TY0rX4gDN9cpAGhme10sRkALk/jw58myTqOXSJKfnMR1pvF0g5cf3PVOJDXoS5VaOwLRJXsAFACx9wZ6Y/O1UL0gGJTMDp+ATI5qOoufTlH8dxxzewbdNjCaJMGmpTdFV+/o/wIA5n5q8I0I4eU6gZosC/IqldQCxbEpwl1ZzFaNcFygmxFSZ9V3nzANQP7cRTVf2Jr3t2CZ1zFXWRRzGfz8Q7SYJLheJ2QrCK/EyB2F0KzTvkiAaVKZz+JN1WDYSzFEmlCzTblBx6CMHopAMUW1Wsejs0nWrAn/8Enw8YVChuLUO0LlHBN/NaAqQCVNICIIRMMIfxoVweNBiWp5mIbhLhKIG7eIvn874b6fonQvQeaNjfRUqnMOci6BLCi4qTqeX0yiRxU6Wpa9WNwAYCH3R+75MOVigr9/LaJVNaquir+goFYED34ro9aViAY0qK09/6WgPn7aUqOj4wUYe+gwNmShFCQiL3FGa3h1PYFlaezfvOma6O8f+kIgenpYsa5tdWfLiifBesHdCw54FmpJ535PnpblGvvWru7HYP/nmxBfHcquH7sqyfmjbrfcZNqarl1yb9MWPyN6+0e/dv9d+Q9ylAtjs8becAAAAABJRU5ErkJggg==",
	"www.wolframalpha.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAe5JREFUOI1100+ITVEcB/DPuXPfe/fNPBJ3wmoWJBsbmpLGVpKVppTMwp+NIhZSVlbCSmJlPTUhKxssUKMkIWEjamzkz2PB8GbePPdYzJ26hvnW6Zzf75zf7/y+3/M7IW4dUiLBAKYRS1/ANjRwz2I8mpJUzAJjOF7xRZzDkCWQLLI/ff9dXMAJZNgz/TsO42u538BOrF4ISEvnMrRxc3lfcrvdKy7mabK53SvGArEljJVndmAd9lcT1HGq5PtZCBtjd9aXmWJMCGKM4UsIoyFrjopRniZHMFVN8BOT3RjHvxeWx5lfpXzhrznOdAy2Bh6IcbzKOS3Fu1UP4WSc7VyF/OGbf8Rqj2xQzHQ2JY3sLO6jiYm03K+hP9TqYndWe2TDfxX/ltRWJb3i6Io02Z9wZyHBKE63e8Xm/0Ytwso0mcQhvF+gsA8hT5PX0925dR2ypSjEbpda8zLeVTXYU66brXrtemdubvdSFEKWMd9sd/GDvxtpLdaHrDmvfFHMe+N8Vw+2Bj7kfeEKtmACa6oJmtiLV3lfODDY33wSmv1CIzPYGvgYGhkxTuIYduEpVi5QgB5u4BJ+lYeG8zQ5iGd5mhzG9vKil+WoVyuYw9syGHp5mjzHOF7gDG6i+lLdagWL8RjXysrgG8779/P5Ay59lINxHm9cAAAAAElFTkSuQmCC",
	"www.xdowns.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACzElEQVQokT3Sy2tUZwCG8fe7nJNz5kxmcpmQSSaTBHTQVk2thiSi9dKiIqgtlUJpF0UoVNGFhhTERQUXipeoCxVaJFhUFEELdeUuRhOC0YlJR4wao9KhSZ3cJnM/57u4kPY/eB74kQndI5ClKKMwCAwKBlAhFaMERCoIDU+hJFFSKJqo4AI5gRyD1LoskXlbbQQjVjWlVBEXAIDkQl6zuZADiTwAzmBpKA77ejL+x7shACbh9MLJWrdpacvcjz/HowH/SGqeyIrqgKYo457gnNlKWbf+HubEWsiAO8VpZ6i/Zz1ow6WzS85fH2jdQCbSkxQWhUktZk9lvem8cLXY2dB+f/PpNrLWbh1Y8fnrE8PnYoe6f/iqY2Sw3mK+D5+cETNdULGKStfF4HzCT4OnOn56GkuGd/1b43yxysjsuBLv2r3mzpPJvDsXNA1KwObS1Md9YVY75c5cnfrz3uxwW80nESfCYHf+woqPPns1Foj3RSk4AaMEdGV9be+rf9YEPtUaAEazzznKOWwKs2njKMpnADU2Wmlzk4BQABWO8XYm+/2iDZl5Wq6qvwx+TcDGcuMPeq3u3cvPPbyMmqTPLzilADigAeUpr8pytldu6ZV3iVlIi9S+xOF45/G92xZnZIhkQuu2PtbQGpprSAWxtqHxzvhIZ8v2h/cSe8YOCghwOB39Z461A+HvOuPR5qyA0OBUwVNwP2rkvc+TlqF+7dgvp0OlErJZNK4fWdd188Ct346eeKHhKXgagrzR1xSKDM6R2+OtK8xvYm0FT/ZPvvy4qi7s+BQpSRSEzqWKswWVCdtVZEL3COQ5fC/+Cu3sTmz69ll7XVNJynTKl3oTbIwIfxlpihaba0i4yjWIn7zUFwWyDDaDNdQXuXGtLhh9t7Tet3L1QmzZLOWuREmiIFGQyBkIktf69/94mxScgBNQABpaQ35I/5+3gcB7FOpBaElE6lQAAAAASUVORK5CYII=",
	"www.xiami.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAitJREFUOI2Vkz1sTlEYx3/Puee+X1p906BiaZdKjF2aUGE0GIRoShuDGE06mahRIsQkJiEp2slMQiJB0sVQpFNjEClCm3pb997z8Rju7ceAxEme5Tzn+Z//Rx7Rm3J1vWDKRf7rpAZaNabsSocxmwAVgDoFQCyo+ztArMNKIWNWg3gFNIK6SPP4A1Ale36R5slpCL4CzpC0UU4nFvfsErq+6I2JCgH0V0RXAWogNXS1g+Y5RNA8o3FwHM2zkulGBbDRC7hI6/Qs6eAI0uopNe7/hFt4wdr0OTSHxsg4a/cnMDsrEnVADZYA5GAHD5O9fowdGALAf3xL/dAZUBBTCc+AHkASCIAqRp1UZilucY6wvERYXsItzgGKetDSBtrXF1AFzQLqBXWCwQMO0FLTdn1o2dtIo/jwit4bSjJwAs09eLAapPpBSPqHMe29pcb+YaDsbQD8vH2BYv4p8cdnJICKYNmG3jwyhtlRmmj3DVK8e1myqCRIA9z8DGIgSVKIilVvwNbo3BlFV6Br8iGo0rk5gR0aAdlioA5Ea2ig9CIKFg8qoOtg+sC0d2O6eui+PEvz6CjfTgkUVQpuy1A1AlExGoT4vWDPE2XXPU/af2Az6OL9G1rn76KdasgDQcryoEGwBMR01/l6TMpXZlsl5U5IL3RmbiHNKp3Sc1DENkWyqCDtxh9WRis2gns0SVpvbF0BNSGzXZKc/VL4K/9eZwWpQ6GbN6mBvjS59huwbQhRE3LwWwAAAABJRU5ErkJggg==",
	"www.yayaxz.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAApFJREFUOI2Nkk1olFcUhp/7+81MRNSu3AlWXJi58/m3iTGggRZ0o1jbTSnpqkjBiiYgumy7KLgtQkWQLEQluiviQhm1QVwYk8mipEEEJcjEkEhmYma+mfmOi4kTwfpzdvfA83DOPS98RiUL4v6+da9vYODHR4cOHX5eb7ROiCyaT4KNhsQnB4du7t/XXw3dhXR8YkyOfvudzM3N3xKR3P9CS69k00/Hfv51567ds/39X6WTpQn5+sBB6dnTOzM19eS36rJseA8SkQ1//H5uqGfP3qchxK3S5KR8/8OAFArby+fP/3U2bUrXh6ZUl69d7H04OnHfWMeWLzdz4eKll0eOfHP5zOmhP5VS0wALUlfrUu8qNZT16FaKMYLORFSRimz95fhxOXVqMM13xzIyMjIR8gV58GC0ui2fl3x3LMVisRJCLCHEcvvO7aUQYrlbLM7Xm7KRhbJ05UNBQijI2OMxCflYhoeHJYSChO6C3Lh+Qzpw8a6EEMuVq9clhFiSRL5QACHEktlxhjRaQzOp0ZXLkiQJxmi8szSaCd47FILSCtOaZ7Z4jlJpXNm3n2HWb6SvrxdnUrQRvFVYp7AavFNYB96B9zB6/yGzxTbXEXi1RORTDA2sURgDTmu8A2MVT+aE+ddCTSxLlQ62KjC6QeQ1BoUzChcplILZKvxbTmmkYAxks+Bza9rnn55eXSHSCV05oKlpAjOLMFUWWgLOQS5SWAuZLKR+JcXl8qqgutzkn2dCvaZpAVq1d846sFbhLDgLURbqTrUh53RHsPzyP169mCHyishrrDPYlsFpTWQtOQfeG7KZDBWpt6E01Z0zfiiqH6tSaXytehtp4F2JBtxK3wNm5W0AF4FXmUyjVqs9fwMizAwlZW3d5QAAAABJRU5ErkJggg==",
	"www.youdao.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAQBJREFUOI3NkrFqwzAQhn/JgSylOBgypdAgKGhzHiEvkTV5gz5KyBO0a+nUNUuTJ6gzBGUReE8MXjNY6mLBb4V4bW/67k736+444K9NsOOVXlWueQOAVMo6gZgJa0qv9KJyzUeID+xpFGpkR82a98C1cymltnfiXQGv9CRwJpNSWFO27gPH7woAGBPviJ+IewWGxAfiCfGeCwaRwCPx0itdALhGHRR9AucAlWtyAN+4tY5APMIxk8mCA7y0TCYFLfa2A2HNFcAn2vvwSqcAfujJJm4nPqQ1gK/WzQG8Vq55pt9nvQKX6YuPH4RiAHNhTR3nOiOkUtZ8aW3hhi/0/9kvWWFQQDml5pQAAAAASUVORK5CYII=",
	"www.youku.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAvdJREFUOI1dk19ok2cUh5/vS9p+a1jE1qhfqyxdzdrGKsg2xZFqp+KUURGkaAYDWdmW9kZEGd4JioMNQbywDQ5RqINdDUUYjqp0JZIl0ulF80Wbpk1pm7TGqElbE/vv7CJqUs/VC+e8v/ec8z4/hfejTVpYjHm+tEVcTTWaFcA/Ppfpidf6MNm9XFFuFZcr707HBZ4bgfMH2dq0z0lchfG5fEovAX0J7v9t8NMNglQ4t3FBKRI4LpC4nfrz1+YKw6LxXzhNxBdm5KmaAKixLekbXA1saViBYyaH+1Tvc/R9lW9F4GgocGUoK9+PiDSe8wut0UsckkKfhwRahzobf/ZL27DI5UhWOBoK5JMeafFcD8mPUZHGs37hmOwQoOh6IY5Jc+NZv3w3KPLD9ZDgkRaVxZhn1edORh6nGQjburio9EV27nwY+61LUpTdFNDeCVxUegfCtq7xwTSVnzphMeZR68ojruEsPO0Pg6m2A0CzlC3YrULFtXMH4u3u7Ji9+r7AbgBMtR3J/jBPZqGuPOJS163WrOPT8OKlmqA7vxTJpBR6b8GdG1S9SrBuV90Xmd31dx6utUzSrfBy2pSYmoEqm2Y1v14EdQnUwodS9aI/SR8wC5gAFVLTsHGS3yFf+4EZ0gugjiVzmZJS+GQNOt/kV2deYJ5VwFoYExiI8EfNJEopnKBVqF8tuloCyVQuo47OOXyVZvh4Wz3MRzsB4nG0ZClkw/y1fhhlE7gLDUY7N2xvYKUZYnMOn0qZ3TvxwGBJt3LY9aydDtlRNc1eWw8rytN8XTQZeKT5iOtZ+7z+IRMPDCize9/wHwq4/83KmQmRE5cDwv7oJTYVkVAvsH+o8/TVoFyYEnEHs0JbHqQCypO3U9+ebK7Y/JHGZ69mMXxPuDuqJgT4yi76RlcdQUs5j0ZzdP9SQHm5mdJGYFcTWxv2OLFbwaHlXxh8DaMZMHoM7v1DkJXvm2n5nC3MxzxrLBFXdXXezhPxXGZqxuGjxO7Fu9zO/wOrvEc0UeiiOwAAAABJRU5ErkJggg==",
	"www.youtube.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAY9JREFUOI3Fkr1qVFEUhb997nFmnGEisYxiDCJ5goCNldj5ACm1TJsHyBOYSsRC0SqlWEiwFG0sFMTGQkEhkDYTMnN/zv05y2JMmLncWjesZp9vncXZ+8D/LgP4vDrajqZNh64LGxmoCxaYoTSKYye93zotPtinq8P9sbndgOauTutypAF9jFmjx/ZxdfjLYRuxlRUnGW7swfc773FARL9dKa0FRLWgMMlYf/WSelqTT1LKOl86rxABUUprrsL6peBcoYkUwPrDR9yV2HzzmiaN5JOMRa4UVFjfFcCigkEOTIuCs5MTVu7d506acfPpE7LTjDbvK7WmJlEBs1lKk2ck3kOS8D0EBFiL96Fj8DVQVhVN0/D18JBvOztsAL0rl5dYA3yIKsxsoIumowHevXjO0d4e14Bbw4ToewQtm5Fye7Yy+OGw2+016qwgGXmUXOr8Gn/X+NOVkQMHSEISUSIKNB5QO09z0ZvrnHNAGTkwgP1x74FF2wIGOG4gYkfo/H2RI6DA6cvutHzbyf3T+gMlIenGuFkxUwAAAABJRU5ErkJggg==",
	"www.yyets.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAACfklEQVQokSXKPYxUVRgG4Pc759w7d2Z2V0aWhUF2g+BGIRYmJooUJBqxMsZaYmFjLKysLWxsrY2NrbG01cSYUJgogWJB0I2SDbtj2GGX+btz7znn+14Ln/qRz3bm3++3lzvu04vdE0H25loI+kFKJwC8w+muexr50yiOor05LCX8MD7fcZcr99ap4up6MShlErlIrLwMOtIL0ijvPMm7c33U2DgzGOAFQbBf62pR7i/0wlpwPXgBgKPGusEtMv8/RjgSSiight1pPrfip9EqL0FkkTjouFGtRhihhJGBxJJsjI1hlrBWuJ7n09a8SNeLEfPExtgql8aGcDBOFeLkynpxYdXVmQLZm9tBrQQaxUbXbfZ9BKaZE2XwhmuDcGNYnixcNIxbWwmyXokXqTMXmcnwTClX1sOU2DlO8vnt2fZaKDz6TgDcPEzvni3Pdj2Bg1pvH+VXBiGTjaFW7Cxy2Oo6VYrIWO27g5gTt1f9sPIEHsz01iT/tdS3N8pELg3PFRLUKIIm4auHzV60l/r+dOWi0YiNyo0Sf1/ovcZunCmFyIZg5CLx63/a3YW5Qt5/vmjJ42QGKPjqyfDLw+Z+bbOGH50rzeii2jcPpvePlsj5nUHY7vqkeBI5btkqXu7513oejd06jN/+XavRP7r28b3jFuSw8p9c7DsBiT9nusysHMzwYt//+rhpYhrN2kmb3d3HU6ToNX94vitgVma1H/frn0d1NmZjKfxgsyM5Iae7h3NXWEaK189UW72QlUlt0upv/85vHsyXSZNaVru0Fq4+GxBjRXVfvDG8dKK8vrmiZtksq905rAuNuW3/OFrmbFlN1d7bWnmhL1++fuo/DtWmykdY6qEAAAAASUVORK5CYII=",
	"www.zdic.net": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABb0lEQVQokYWSsU4CQRCGZwkmVprssUdCQ6GREyI2VjaEMxZAfXsmUFzvA5iYK1Qo0Ccw1lhaajBBkmttMGc8rjgLCkgU38DEtRgyOa7Qv/pmdv/ZzM6wKAxO9yuwrOODBvFm2QCAyA8XsWc5kgsV0+3VRQJInuWAZzmJrK3pURgopSQXCKRxtZaip1+eHok3CtsAwBhDoKMz/z2lf31QytZ0W9OVUi2jFJp1Arrg5tahWSgqpUaDPnVCgGaE0aCPR6nv+Rz+k1KKOE3EGGsZpZ/sKgC0jBLeC816ZzaJm9PxoBe+AcBRJktgDB96ALamLxnoE/4AYia5KDdM/36I2RUhsCsEChlji05sbSs+migMHu6ukaftbmJwkgt43TmkGD83vimSCzuvkU1ysZhDFAbNQnFcrVF50rTdlVzgXkkuAEt6lpN4PeHBupILJrnAds939wCgM5u4ufyaWcm5J7POJW71jf/s5vIA8JnJ/gJ06FxSDmeI3QAAAABJRU5ErkJggg==",
	"www.zhihu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAslJREFUOI1dk01oFVcUx3/nzsz7yMt7mZpMNAQSv6BUJI2tYpus0oVIRdGCaNVV6aaiRcxSuih+gLQoLbSL0l1LoY1QLDEbsQtto27U+NFiVwrGVw2GF/Ne3sybmXtcTJpAz92ce7n/c+6P+z/S/43+GVfvDwGEFmKFsiNkoYAsZyKgFsSAWryejZMmqf41BEIjtgz35jkyWGYuTkE1U6GgiqiCzc40taAQVx8MuapKai1zYcxvhwfY/MVdGmFKwxNAWZUz/BtZ/h89eYMALijPWgkn31sBwLG3KhSGi3iugxX44IfH/HqwbwnlP7Q9Y9P05B0MAPWIw9v6uHz7CcNv+GxeWyRuvqSgEUiT3VsDwoU5iOuEC3Ps3hpAfQEAt9FKObTFZz6M2fbZVcZGt4AY9n73N5RL0IgA+PCrKQhKMNNg/8g6aEVgy7htjnDx7iw/XnkMficYDzEGChUoFKGZZq8ut9Pd8RrPw0UUVRBwsTCvHj99MkBOLINrKojA2EcebcUcO769lwmMh5g8GC/bWwELxqKs6XDxcxZNQkQsUSuGZAHiJoV2u9xRF78XQC2K4hqE+XrC+9//Ay9q/H5qmPFbTzl34RF0tkM9WvKUqix6A1ABq7hqwTEeQanMTKyMbOhmZEM3vV0+o79Mg7OoaCQ8jyy8aC0VFAUDAuIwEwlfH1jPdC2k/+gljm9fzZf7+jN/AxdPvMnHm0roxPYlLyiCrByd0npsWefD1OeD7DxzjfF7s7yztsL10yPIwcvwrEb1wi7yRllxYAIKDsGqAKdYxk2tsrpD+PnT1zl0/ibjD5sEnV3cqDZ5+8Qf+OU8NSqUPKjsnaCrz0fcPMbLo1aRlcfvaNxqMvuyDp4haCshbg5NE+I0wXMcsCkztXkCv4S4BTAOINnqPauTSfXWu2pTEIMYJ2NbpsxGWFMUJ7sjAILbOzD5Ck2gKxGz7mB8AAAAAElFTkSuQmCC",
	"zh.moegirl.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAdlJREFUOI2N08tLlVEUBfDf5ys1u2WFoQZW9qAMwTCjhAKbFAYSBM3Kxx8gTRxHk4gaNMkgjKhGRUlUEA10II2KIMqKhCCozEeKeg3Uq54GXutDHbhmZ62119lnn3NYiiAhyF/GL2j5gmhFLWa6IegQlC3h9+kwJSiI01FarEcVis1pkikPw755a9xaSfQrMWC7PXrNKlCvR6QpKx10RJ8au+UYk2ce+TbZZhRPEbnrskadEl5iCCMrtV8p6DLvmaA1xkee6xecERQuP8KCKQPHUIwekR+C46j3U7knTpqWLQOndNvptMjEYvEuL3zWIemVN26bFBwStLouJeW+oE6wWVDlnmHBechI739Y0notdqhVo9ktr11FUsKELF3YgDK8U6EPa2BxiKUKjaIQ4+j0XpMaY5I26nbBiDw55jU4YVQ2Qjwg1yd79frioI9qnTMrICXLlDpVIvP/5vVAKQbjATR5bJ3mNFctYRaDpuX66pF+M4r9xkXtivArHjBrSIGEyfRQq1XoRRBQ7kPaO4MtpmVhIH7/R92UElwRtLljXHBWsNU1QbA/5q3VLiXI/N9BpEfQoF+LPyo1asVDlKRfSvxzlSjyXWTOqhC0CYpi6wOCS6srXgX+ArZToIsJ4WQ4AAAAAElFTkSuQmCC",
	"zh.wikipedia.org": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAXdJREFUOI2lk7GKIkEQhv9eDhNBxDP0BXwKQZDBXEERQfABxFjFfDAyXRMTwWg1NTUUAxMDMRgTE1t0QAMTv01u59DZOw6voq6/+/+KoqsECHgHLP8e9pdHX+ZX490AVtJPvRZHA/CiWZL0Zq1VpVKRMUapVEqr1UqtVkvGGOVyOa3Xa1WrVRljNBwONZ/PZYxRsVjU+XyWvppxHIdmsxk0VyqVgnwymTCbzYK7bDYbnAPAYrFAEpfLBQDP85DE4XCgUCgEhuVyyXg8DgMAkskkvV4vyMvlMpLYbreBVqvVHr7hATCdTtHvrthsNkhiv98DYK3Fdd0/AwAkMRqNAHBdF8dxqNfrAHQ6Ha7X698Bg8EASfi+T7/fZ7fbIQnP82i328/Pw4Db7YYk0ul0oOXzeSRxPB5DgB/PgxGJRNRoNJTJZAKt2+0qGo0qkUiEJ4lvlsj3fe73+4N2Op1C1QH7JunjGRqLxWSMedDi8fh3k/wh/nOdPwFzSo2/XSRfAgAAAABJRU5ErkJggg==",
	"zhidao.baidu.com": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAl5JREFUOI2dU89LlFEUPXfmm09HyaCsTDOLNrqLtNwVSC4K2tRKBAtqU5hhUS2KChSKqH+gaBHVRqSCIKpdi6ggXIQ/spmx0tEcHacxa3Le9947LcZvZtRWXXhwz73vXc47915BzzABAJYALWABGJPDxgLW5rD2/SJsNBwA4OUG/I9J+0sEYLkqEY0oXu9JcmgwSwCIRRW/xLzVF41GANYuiylF3LuTlocPfuLWjRTGogonjk6j61QCY1G1ooBdziD9w8B1BdYAa8sD4jqQ1JxB5rcRz7OSmjPLC2gDBybHYPybh54rSZaGA2hpDUs6ZbCzsQRNzWEcO742/2Zi3EPt1lCeAXBxgCTZ9yjN7VURu7f5qyXJWCTLxT+WvsUiWbYdibPtcNx+n/JIkjjQR8fXYNsOFzVbHKncEMTzZ79Q3+Ciu3MapWFB55l1eNy/gLGYwtyMkckJzarNjsBaOLC5f+1qCqP7wnrOJDTqG1w52znDTyNZhFyR5Kzltd5Kefc2g+rqECs3Bos00DkGwSBw8FC5TMU1zp1OYHREwVMUTxFvXmfk0vlZ3ry9SSbjGnV1ISl0QReUjUU8dJ1MYHhQQSlKseAjQ1npvZpETa0j8DPGIOB3gQSe9C1w6KOi94+ZmZ8nP7xfRHxcF5LWwoEpMAi5gmyWECEEQmsJCCTkCAkikyGmJnXRILGggQjQ1lEh8QkPn0cVKtYEZN/+MgDA0/4FmU9bNO4uQUtrmRQzEHS8Iu+3+iECGACwYmbz5gJo9IHsuQtB+wtC68KaGru0qku+NYBmbpXzh/n1/wuHC2lVjJEkmAAAAABJRU5ErkJggg=="
};

// GM_getResourceText('css') 
var MAIN_CSS = getMStr(function(){/*
    #sej-container {
        display: block;
        position: relative;
        z-index: auto;
        padding: 1px 0 1px 10px;
        line-height: 1.5;
        font-size: 13px;
    }


    #sej-expanded-category {
        font-weight: bold;
    }
    #sej-expanded-category::after {
        content:"：";
    }


    .sej-engine {
        line-height: 2;
        display: inline-block;
        margin: 0;
        border: none;
        padding: 0 4px;
        text-decoration: none;
        color: #120886 !important;
        transition: background-color 0.15s ease-in-out;
    }
    a.sej-engine.only-icon {
	    margin-left: 3px;
	    margin-right: 3px;
    }
    a.sej-engine.only-icon > span {
    	display: none;
    }
    a.sej-engine:visited, a.sej-engine:visited *, a.sej-engine:active, a.sej-engine:active *{
        color: #120886 !important;
    }
    .sej-drop-list-trigger {

    }
    .sej-drop-list-trigger-shown {
        background-color: #DEEDFF !important;
    }
    .sej-drop-list-trigger::after {
        content: '';
        display: inline-block;
        margin: 0 0 0 3px;
        padding: 0;
        width: 0;
        height: 0;
        border-top: 6px solid #BCBCBC;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 0px solid transparent;
        vertical-align: middle;
        transition: -webkit-transform 0.3s ease-in-out;
        transition: transform 0.3s ease-in-out;
    }
    .sej-drop-list-trigger-shown::after {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .sej-engine:hover {
        background-color: #EAEAEA;
    }
    .sej-drop-list > .sej-engine {
        display: block;
        padding-top: 4px;
        padding-bottom: 4px;
    }
    .sej-drop-list > .sej-engine:hover {
        background-color: #DEEDFF;
    }

    .sej-engine-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: none;
        padding: 0;
        margin: 0 3px 0 0;
        vertical-align: text-bottom;
    }


    .sej-drop-list {
        position: absolute;
        display: none;
        opacity: 0.3;
        top: -10000px;
        left: 0;
        min-width: 120px;
        border: 1px solid #FAFAFA;
        padding: 5px 0;
        text-align: left;
        font-size: 13px;
        -moz-box-shadow: 2px 2px 5px #ccc;
        -webkit-box-shadow: 2px 2px 5px #ccc;
        box-shadow: 2px 2px 5px #ccc;
        background-color: white;
        transition: opacity 0.2s ease-in-out,
            top 0.2s ease-in-out;
    }
*/});


loadPrefs();

function loadPrefs() {
    prefs.openInNewTab = GM_getValue('openInNewTab', prefs.openInNewTab);
    prefs.debug = GM_getValue('debug', prefs.debug);
    prefs.hideEnglineLabel = GM_getValue('hideEnglineLabel', prefs.hideEnglineLabel);
    engineListDataStr = GM_getValue('engineList') || engineListDataStr;
}

function openPrefs(){
    var d = document;
    var on = function(node, e, f) {
        node.addEventListener(e, f, false);
    };

    var $ = function(s) { return d.getElementById('sej-prefs-'+s); };
    if($('setup')) return;

    var styleNode = GM_addStyle('\
        #sej-prefs-setup { position:fixed;z-index:2147483647;top:38px;right:60px;padding:20px 30px;background:#eee;width:500px;border:1px solid black; }\
        #sej-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
        #sej-prefs-setup i { font-family: "微软雅黑", arial; }\
        #sej-prefs-setup a { color:black;text-decoration:underline; }\
        #sej-prefs-setup div { text-align:center;font-size:14px; }\
        #sej-prefs-title { font-weight:bold; }\
        #sej-prefs-setup ul { margin:15px 0 0 0;padding:0;list-style:none;background:#eee;border:0; }\
        #sej-prefs-setup input, #sej-prefs-setup select { border:1px solid gray;padding:2px;background:white; }\
        #sej-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
        #sej-prefs-setup textarea { width:98%; height:60px; margin:3px 0; }\
        #sej-prefs-setup button { padding: 1px 6px; font-size: 12px; margin-right: 3px; }\
        #sej-prefs-setup #top-buttons{background:none repeat scroll 0 0 #fff;display:block;position:absolute;top:-35px;border-right:12px solid #e0e0e0;border-top:12px solid #e0e0e0;border-left:12px solid #e0e0e0;text-align:center}\
        #sej-prefs-setup img { display: initial; }\
        #sej-prefs-minitip { position: absolute; background: #ff9; border: 1px solid #F96; padding: 10px; left: -400px; top: 160px; right: 570px; }\
        #sej-prefs-minitip p { margin: 5px 5px; }\
        #sej-prefs-minitip span { color: green; }\
    ');

    var div = d.createElement('div');
    div.id = 'sej-prefs-setup';
    d.body.appendChild(div);
    div.innerHTML = '\
        <div id="top-buttons">\
            <button id="sej-prefs-ok" title="需要刷新页面才能生效">√ 确定</button>\
            <button id="sej-prefs-cancel" title="取消本次设定，所有选项还原">X 取消</button>\
        </div>\
        <div id="sej-prefs-title">SearchEngineJumpCE 设置</div>\
        <ul>\
            <li><input type="checkbox" id="sej-prefs-openInNewTab" /> 在新页面打开</li>\
            <li><input type="checkbox" id="sej-prefs-debug" /> 调试模式</li>\
            <li>\
                是否隐藏前几个搜索的文字部分\
                <select id="sej-prefs-hideEnglineLabel" >\
                    <option value="0">不隐藏</option>\
                    <option value="1">根据高度自行判断</option>\
                    <option value="2">隐藏</option>\
                </select>\
            </li>\
            <li>自定义搜索列表：\
                <img id="sej-prefs-engineList-tip" class="minitipicon" src="data:image/gif;base64,R0lGODlhDAAMAKIAALGXVv////7+/dPGn+zm1bqjadHDm/r49CH5BAAAAAAALAAAAAAMAAwAQAM1GCFkVYYIRYC9uFm1gzXC0HHAIBQYaRXBIQLkcCguZslBBXu7RaApHgCSsoFevdtk0XhElgkAOw==" />\
                <div>\
                    <textarea id="sej-prefs-engineList" style="height: 400px;"></textarea>\
                </div>\
            </li>\
        </ul>\
        <div id="sej-prefs-minitip" style="display: none;">' +
            introduceToHtml() + '\
        </div>\
    ';
    div = null;

    var close = function() {
        if (styleNode) {
            styleNode.parentNode.removeChild(styleNode);
        }
        var div = $('setup');
        div.parentNode.removeChild(div);
    };

    on($('ok'), 'click', function(){
        GM_setValue('openInNewTab', prefs.openInNewTab = !!$('openInNewTab').checked);
        GM_setValue('debug', prefs.debug = !!$('debug').checked);
        GM_setValue('hideEnglineLabel', prefs.hideEnglineLabel = $('hideEnglineLabel').value);
        GM_setValue('engineList', engineListDataStr = $('engineList').value);

        // 刷新工具条
        remove();
        run();

        close();
    });

    on($('cancel'), 'click', close);

    $('engineList-tip').onclick = function() {
        var minitip = $('minitip');
        minitip.style.display = (minitip.style.display == 'block') ? 'none' : 'block';
    };

    $('debug').checked = prefs.debug;
    $('openInNewTab').checked = prefs.openInNewTab;
    $('hideEnglineLabel').value = prefs.hideEnglineLabel;
    $('engineList').value = engineListDataStr.trim();
};

// --------------------可设置项结束------------------------

var debug = prefs.debug ? console.debug.bind(console) : function() {};


function getFaviconUrl(url) {
    return 'http://api.byi.pw/favicon?url=' + url;
 
    // return 'http://g.etfv.co/' + url;

    // var uri = parseUri(url);
    // return uri.protocol + '://' + uri.host + '/favicons.ico';
}

function getFaviconUrl2(url) {
    return 'http://www.google.com/s2/favicons?domain=' + parseUri(url).host;
}

// var iconUrl = 'http://www.google.com/s2/favicons?domain=www.google.com';
// getImageBase64(iconUrl);
function imageUrlToBase64(iconUrl, callback) {
    GM_xmlhttpRequest({
        method: "GET",
        url: iconUrl,
        overrideMimeType: "text/plain; charset=x-user-defined",
        onload: function(xhr) {
            var r = xhr.responseText;
            var data = new Uint8Array(r.length);
            var i = 0;
            while (i < r.length) {
                data[i] = r.charCodeAt(i);
                i++;
            }

            var blob = new Blob([data], { type: "image/png" });

            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                var base64data = reader.result;
                callback(base64data);
            }
        }
    });
}

// 获取 method 为 POST 的表单的 HTML
function getPostFormHTML(url, args, newTab) {
    var form = '<form method="post"' +
        ' action="' + url + '"' +
        (newTab ? ' target="_blank"' : '') +
        '>';
    for (var arg in args) {
        var input = '<input type="hidden"' +
            ' name="' + arg + '"' +
            ' value="' + args[arg] + '"' +
            ' />';
        form += input;
    }
    form += '</form>';
    return form;
}

// 包装 HTML 元素代码以隐藏该元素
function wrapToHide(html) {
    return '<span style="display:none;">' + html + '</span>';
}

function toRE(obj) {
    if (obj instanceof RegExp) {
        return obj;
    } else if (obj instanceof Array) {
        return new RegExp(obj[0], obj[1]);
    } else {
        return new RegExp(obj);
    }
}

function getMStr(func) {
    var lines = func.toString();
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}

//xpath 获取单个元素
function getElementByXPath(xPath, contextNode, doc) {
    doc = doc || document;
    contextNode = contextNode || doc;
    return doc.evaluate(xPath, contextNode, null, 9, null).singleNodeValue;
};


// 事件支持检测.
// 比如 eventSupported('fullscreenchange', document);
function eventSupported(eventName, elem) {
    elem = elem || document.createElement('div');
    var prefix = ['o', 'ms', 'moz', 'webkit', ''];

    var l = prefix.length;
    var pEventName;
    var isFunction;
    var setAttr;

    while(l --) {
        pEventName = 'on' + prefix[l] + eventName;

        if (pEventName in elem) {
            return pEventName.slice(2);
        } else if (typeof elem.setAttribute == 'function') { // setAttribute 是元素节点的方法
            setAttr = false;
            if (!elem.hasAttribute(pEventName)) {
                setAttr = true;
                elem.setAttribute(pEventName, 'return;');
            };

            isFunction = typeof elem[pEventName] == 'function';

            if (setAttr) elem.removeAttribute(pEventName);

            if (isFunction) {
                return pEventName.slice(2);
            };
        };
    };

    return false;
};

// 保存指定对象相关数据
var data = (function () {
    'use strict';

    var cache = {
        objs: [],
        data: {},
    };


    function data(obj, key, value) {
        var id = cache.objs.indexOf(obj);
        if (id == -1) {
            id = cache.objs.push(obj) - 1;
        };
        if (!cache.data[id]) {//初始化
            cache.data[id] = {};
        };
        if (typeof value == 'undefined') {// 取值
            return typeof key == 'undefined' ? cache.data[id] : cache.data[id][key];
        } else {
            return cache.data[id][key] = value;
        };
    };

    return data;
})();

// 为mouseleave mouseenter事件做个兼容
// 需要 eventSupported， data函数支持
var mouseEventListener = (function () {

    var support = {
        mouseleave : eventSupported('mouseleave'),
        mouseenter : eventSupported('mouseenter'),
    };

    var map = {
        mouseleave : 'mouseout',
        mouseenter : 'mouseover',
    };

    return {
        add : function (type, ele, callback) { //事件类型，元素，监听函数
            if (support[type]) {
                ele.addEventListener(type, callback, false); //mouseleave,enter不冒泡，所以在冒泡阶段监听事件，不要担心子孙元素进出发生的事件冒泡上来。
            } else {
                var listener = data(callback, 'mouseELListener');
                if (!listener) {
                    listener = function (e) {
                        var relatedTarget = e.relatedTarget; //mouseout，去往的元素；mouseover，来自的元素
                        // 当mouseout（离开ele）去往的元素不是自己的子孙元素
                        // 当mouseover（进入ele）来自的元素不是自己的子孙元素
                        if (!ele.contains(relatedTarget)) { // contains函数，自己.contains(自己) 返回true
                            callback.call(ele, e);
                        };
                    };
                    data(callback, 'mouseELListener', listener);
                };

                ele.addEventListener(map[type], listener, true);
            };
        },
        remove : function (type, ele, callback) {
            if (support[type]) {
                ele.removeEventListener(type, callback, false);
            } else {
                ele.removeEventListener(map[type], data(callback, 'mouseELListener'), true);
            };
        },
    };
})();

//获取已滚动的距离
function getScrolled(container) {
    if (container) {
        return {
            x:container.scrollLeft,
            y:container.scrollTop,
        };
    };
    return {
        x: 'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || document.body.scrollLeft),
        y: 'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset :  document.documentElement.scrollTop || document.body.scrollTop),
    };
};

function getElement(selector) {
    if (selector.indexOf('css;') == 0) {
        return document.querySelector(selector.slice(4));
    } else {
        return getElementByXPath(selector);
    };
};

// unicode转成gbk编码函数
function toGBK(str) {
    //编码对照 unicode(10进制) : gb2312(16进制)
    var map={12288:"A1A1",12289:"A1A2",12290:"A1A3",183:"A1A4",713:"A1A5",711:"A1A6",168:"A1A7",12291:"A1A8",12293:"A1A9",8212:"A1AA",65374:"A1AB",8214:"A1AC",8230:"A1AD",8216:"A1AE",8217:"A1AF",8220:"A1B0",8221:"A1B1",12308:"A1B2",12309:"A1B3",12296:"A1B4",12297:"A1B5",12298:"A1B6",12299:"A1B7",12300:"A1B8",12301:"A1B9",12302:"A1BA",12303:"A1BB",12310:"A1BC",12311:"A1BD",12304:"A1BE",12305:"A1BF",177:"A1C0",215:"A1C1",247:"A1C2",8758:"A1C3",8743:"A1C4",8744:"A1C5",8721:"A1C6",8719:"A1C7",8746:"A1C8",8745:"A1C9",8712:"A1CA",8759:"A1CB",8730:"A1CC",8869:"A1CD",8741:"A1CE",8736:"A1CF",8978:"A1D0",8857:"A1D1",8747:"A1D2",8750:"A1D3",8801:"A1D4",8780:"A1D5",8776:"A1D6",8765:"A1D7",8733:"A1D8",8800:"A1D9",8814:"A1DA",8815:"A1DB",8804:"A1DC",8805:"A1DD",8734:"A1DE",8757:"A1DF",8756:"A1E0",9794:"A1E1",9792:"A1E2",176:"A1E3",8242:"A1E4",8243:"A1E5",8451:"A1E6",65284:"A1E7",164:"A1E8",65504:"A1E9",65505:"A1EA",8240:"A1EB",167:"A1EC",8470:"A1ED",9734:"A1EE",9733:"A1EF",9675:"A1F0",9679:"A1F1",9678:"A1F2",9671:"A1F3",9670:"A1F4",9633:"A1F5",9632:"A1F6",9651:"A1F7",9650:"A1F8",8251:"A1F9",8594:"A1FA",8592:"A1FB",8593:"A1FC",8595:"A1FD",12307:"A1FE",8560:"A2A1",8561:"A2A2",8562:"A2A3",8563:"A2A4",8564:"A2A5",8565:"A2A6",8566:"A2A7",8567:"A2A8",8568:"A2A9",8569:"A2AA",9352:"A2B1",9353:"A2B2",9354:"A2B3",9355:"A2B4",9356:"A2B5",9357:"A2B6",9358:"A2B7",9359:"A2B8",9360:"A2B9",9361:"A2BA",9362:"A2BB",9363:"A2BC",9364:"A2BD",9365:"A2BE",9366:"A2BF",9367:"A2C0",9368:"A2C1",9369:"A2C2",9370:"A2C3",9371:"A2C4",9332:"A2C5",9333:"A2C6",9334:"A2C7",9335:"A2C8",9336:"A2C9",9337:"A2CA",9338:"A2CB",9339:"A2CC",9340:"A2CD",9341:"A2CE",9342:"A2CF",9343:"A2D0",9344:"A2D1",9345:"A2D2",9346:"A2D3",9347:"A2D4",9348:"A2D5",9349:"A2D6",9350:"A2D7",9351:"A2D8",9312:"A2D9",9313:"A2DA",9314:"A2DB",9315:"A2DC",9316:"A2DD",9317:"A2DE",9318:"A2DF",9319:"A2E0",9320:"A2E1",9321:"A2E2",12832:"A2E5",12833:"A2E6",12834:"A2E7",12835:"A2E8",12836:"A2E9",12837:"A2EA",12838:"A2EB",12839:"A2EC",12840:"A2ED",12841:"A2EE",8544:"A2F1",8545:"A2F2",8546:"A2F3",8547:"A2F4",8548:"A2F5",8549:"A2F6",8550:"A2F7",8551:"A2F8",8552:"A2F9",8553:"A2FA",8554:"A2FB",8555:"A2FC",65281:"A3A1",65282:"A3A2",65283:"A3A3",65509:"A3A4",65285:"A3A5",65286:"A3A6",65287:"A3A7",65288:"A3A8",65289:"A3A9",65290:"A3AA",65291:"A3AB",65292:"A3AC",65293:"A3AD",65294:"A3AE",65295:"A3AF",65296:"A3B0",65297:"A3B1",65298:"A3B2",65299:"A3B3",65300:"A3B4",65301:"A3B5",65302:"A3B6",65303:"A3B7",65304:"A3B8",65305:"A3B9",65306:"A3BA",65307:"A3BB",65308:"A3BC",65309:"A3BD",65310:"A3BE",65311:"A3BF",65312:"A3C0",65313:"A3C1",65314:"A3C2",65315:"A3C3",65316:"A3C4",65317:"A3C5",65318:"A3C6",65319:"A3C7",65320:"A3C8",65321:"A3C9",65322:"A3CA",65323:"A3CB",65324:"A3CC",65325:"A3CD",65326:"A3CE",65327:"A3CF",65328:"A3D0",65329:"A3D1",65330:"A3D2",65331:"A3D3",65332:"A3D4",65333:"A3D5",65334:"A3D6",65335:"A3D7",65336:"A3D8",65337:"A3D9",65338:"A3DA",65339:"A3DB",65340:"A3DC",65341:"A3DD",65342:"A3DE",65343:"A3DF",65344:"A3E0",65345:"A3E1",65346:"A3E2",65347:"A3E3",65348:"A3E4",65349:"A3E5",65350:"A3E6",65351:"A3E7",65352:"A3E8",65353:"A3E9",65354:"A3EA",65355:"A3EB",65356:"A3EC",65357:"A3ED",65358:"A3EE",65359:"A3EF",65360:"A3F0",65361:"A3F1",65362:"A3F2",65363:"A3F3",65364:"A3F4",65365:"A3F5",65366:"A3F6",65367:"A3F7",65368:"A3F8",65369:"A3F9",65370:"A3FA",65371:"A3FB",65372:"A3FC",65373:"A3FD",65507:"A3FE",12353:"A4A1",12354:"A4A2",12355:"A4A3",12356:"A4A4",12357:"A4A5",12358:"A4A6",12359:"A4A7",12360:"A4A8",12361:"A4A9",12362:"A4AA",12363:"A4AB",12364:"A4AC",12365:"A4AD",12366:"A4AE",12367:"A4AF",12368:"A4B0",12369:"A4B1",12370:"A4B2",12371:"A4B3",12372:"A4B4",12373:"A4B5",12374:"A4B6",12375:"A4B7",12376:"A4B8",12377:"A4B9",12378:"A4BA",12379:"A4BB",12380:"A4BC",12381:"A4BD",12382:"A4BE",12383:"A4BF",12384:"A4C0",12385:"A4C1",12386:"A4C2",12387:"A4C3",12388:"A4C4",12389:"A4C5",12390:"A4C6",12391:"A4C7",12392:"A4C8",12393:"A4C9",12394:"A4CA",12395:"A4CB",12396:"A4CC",12397:"A4CD",12398:"A4CE",12399:"A4CF",12400:"A4D0",12401:"A4D1",12402:"A4D2",12403:"A4D3",12404:"A4D4",12405:"A4D5",12406:"A4D6",12407:"A4D7",12408:"A4D8",12409:"A4D9",12410:"A4DA",12411:"A4DB",12412:"A4DC",12413:"A4DD",12414:"A4DE",12415:"A4DF",12416:"A4E0",12417:"A4E1",12418:"A4E2",12419:"A4E3",12420:"A4E4",12421:"A4E5",12422:"A4E6",12423:"A4E7",12424:"A4E8",12425:"A4E9",12426:"A4EA",12427:"A4EB",12428:"A4EC",12429:"A4ED",12430:"A4EE",12431:"A4EF",12432:"A4F0",12433:"A4F1",12434:"A4F2",12435:"A4F3",12449:"A5A1",12450:"A5A2",12451:"A5A3",12452:"A5A4",12453:"A5A5",12454:"A5A6",12455:"A5A7",12456:"A5A8",12457:"A5A9",12458:"A5AA",12459:"A5AB",12460:"A5AC",12461:"A5AD",12462:"A5AE",12463:"A5AF",12464:"A5B0",12465:"A5B1",12466:"A5B2",12467:"A5B3",12468:"A5B4",12469:"A5B5",12470:"A5B6",12471:"A5B7",12472:"A5B8",12473:"A5B9",12474:"A5BA",12475:"A5BB",12476:"A5BC",12477:"A5BD",12478:"A5BE",12479:"A5BF",12480:"A5C0",12481:"A5C1",12482:"A5C2",12483:"A5C3",12484:"A5C4",12485:"A5C5",12486:"A5C6",12487:"A5C7",12488:"A5C8",12489:"A5C9",12490:"A5CA",12491:"A5CB",12492:"A5CC",12493:"A5CD",12494:"A5CE",12495:"A5CF",12496:"A5D0",12497:"A5D1",12498:"A5D2",12499:"A5D3",12500:"A5D4",12501:"A5D5",12502:"A5D6",12503:"A5D7",12504:"A5D8",12505:"A5D9",12506:"A5DA",12507:"A5DB",12508:"A5DC",12509:"A5DD",12510:"A5DE",12511:"A5DF",12512:"A5E0",12513:"A5E1",12514:"A5E2",12515:"A5E3",12516:"A5E4",12517:"A5E5",12518:"A5E6",12519:"A5E7",12520:"A5E8",12521:"A5E9",12522:"A5EA",12523:"A5EB",12524:"A5EC",12525:"A5ED",12526:"A5EE",12527:"A5EF",12528:"A5F0",12529:"A5F1",12530:"A5F2",12531:"A5F3",12532:"A5F4",12533:"A5F5",12534:"A5F6",913:"A6A1",914:"A6A2",915:"A6A3",916:"A6A4",917:"A6A5",918:"A6A6",919:"A6A7",920:"A6A8",921:"A6A9",922:"A6AA",923:"A6AB",924:"A6AC",925:"A6AD",926:"A6AE",927:"A6AF",928:"A6B0",929:"A6B1",931:"A6B2",932:"A6B3",933:"A6B4",934:"A6B5",935:"A6B6",936:"A6B7",937:"A6B8",945:"A6C1",946:"A6C2",947:"A6C3",948:"A6C4",949:"A6C5",950:"A6C6",951:"A6C7",952:"A6C8",953:"A6C9",954:"A6CA",955:"A6CB",956:"A6CC",957:"A6CD",958:"A6CE",959:"A6CF",960:"A6D0",961:"A6D1",963:"A6D2",964:"A6D3",965:"A6D4",966:"A6D5",967:"A6D6",968:"A6D7",969:"A6D8",65077:"A6E0",65078:"A6E1",65081:"A6E2",65082:"A6E3",65087:"A6E4",65088:"A6E5",65085:"A6E6",65086:"A6E7",65089:"A6E8",65090:"A6E9",65091:"A6EA",65092:"A6EB",65083:"A6EE",65084:"A6EF",65079:"A6F0",65080:"A6F1",65073:"A6F2",65075:"A6F4",65076:"A6F5",1040:"A7A1",1041:"A7A2",1042:"A7A3",1043:"A7A4",1044:"A7A5",1045:"A7A6",1025:"A7A7",1046:"A7A8",1047:"A7A9",1048:"A7AA",1049:"A7AB",1050:"A7AC",1051:"A7AD",1052:"A7AE",1053:"A7AF",1054:"A7B0",1055:"A7B1",1056:"A7B2",1057:"A7B3",1058:"A7B4",1059:"A7B5",1060:"A7B6",1061:"A7B7",1062:"A7B8",1063:"A7B9",1064:"A7BA",1065:"A7BB",1066:"A7BC",1067:"A7BD",1068:"A7BE",1069:"A7BF",1070:"A7C0",1071:"A7C1",1072:"A7D1",1073:"A7D2",1074:"A7D3",1075:"A7D4",1076:"A7D5",1077:"A7D6",1105:"A7D7",1078:"A7D8",1079:"A7D9",1080:"A7DA",1081:"A7DB",1082:"A7DC",1083:"A7DD",1084:"A7DE",1085:"A7DF",1086:"A7E0",1087:"A7E1",1088:"A7E2",1089:"A7E3",1090:"A7E4",1091:"A7E5",1092:"A7E6",1093:"A7E7",1094:"A7E8",1095:"A7E9",1096:"A7EA",1097:"A7EB",1098:"A7EC",1099:"A7ED",1100:"A7EE",1101:"A7EF",1102:"A7F0",1103:"A7F1",257:"A8A1",225:"A8A2",462:"A8A3",224:"A8A4",275:"A8A5",233:"A8A6",283:"A8A7",232:"A8A8",299:"A8A9",237:"A8AA",464:"A8AB",236:"A8AC",333:"A8AD",243:"A8AE",466:"A8AF",242:"A8B0",363:"A8B1",250:"A8B2",468:"A8B3",249:"A8B4",470:"A8B5",472:"A8B6",474:"A8B7",476:"A8B8",252:"A8B9",234:"A8BA",593:"A8BB",324:"A8BD",328:"A8BE",609:"A8C0",12549:"A8C5",12550:"A8C6",12551:"A8C7",12552:"A8C8",12553:"A8C9",12554:"A8CA",12555:"A8CB",12556:"A8CC",12557:"A8CD",12558:"A8CE",12559:"A8CF",12560:"A8D0",12561:"A8D1",12562:"A8D2",12563:"A8D3",12564:"A8D4",12565:"A8D5",12566:"A8D6",12567:"A8D7",12568:"A8D8",12569:"A8D9",12570:"A8DA",12571:"A8DB",12572:"A8DC",12573:"A8DD",12574:"A8DE",12575:"A8DF",12576:"A8E0",12577:"A8E1",12578:"A8E2",12579:"A8E3",12580:"A8E4",12581:"A8E5",12582:"A8E6",12583:"A8E7",12584:"A8E8",12585:"A8E9",9472:"A9A4",9473:"A9A5",9474:"A9A6",9475:"A9A7",9476:"A9A8",9477:"A9A9",9478:"A9AA",9479:"A9AB",9480:"A9AC",9481:"A9AD",9482:"A9AE",9483:"A9AF",9484:"A9B0",9485:"A9B1",9486:"A9B2",9487:"A9B3",9488:"A9B4",9489:"A9B5",9490:"A9B6",9491:"A9B7",9492:"A9B8",9493:"A9B9",9494:"A9BA",9495:"A9BB",9496:"A9BC",9497:"A9BD",9498:"A9BE",9499:"A9BF",9500:"A9C0",9501:"A9C1",9502:"A9C2",9503:"A9C3",9504:"A9C4",9505:"A9C5",9506:"A9C6",9507:"A9C7",9508:"A9C8",9509:"A9C9",9510:"A9CA",9511:"A9CB",9512:"A9CC",9513:"A9CD",9514:"A9CE",9515:"A9CF",9516:"A9D0",9517:"A9D1",9518:"A9D2",9519:"A9D3",9520:"A9D4",9521:"A9D5",9522:"A9D6",9523:"A9D7",9524:"A9D8",9525:"A9D9",9526:"A9DA",9527:"A9DB",9528:"A9DC",9529:"A9DD",9530:"A9DE",9531:"A9DF",9532:"A9E0",9533:"A9E1",9534:"A9E2",9535:"A9E3",9536:"A9E4",9537:"A9E5",9538:"A9E6",9539:"A9E7",9540:"A9E8",9541:"A9E9",9542:"A9EA",9543:"A9EB",9544:"A9EC",9545:"A9ED",9546:"A9EE",9547:"A9EF",30403:"B0A0",21834:"B0A1",38463:"B0A2",22467:"B0A3",25384:"B0A4",21710:"B0A5",21769:"B0A6",21696:"B0A7",30353:"B0A8",30284:"B0A9",34108:"B0AA",30702:"B0AB",33406:"B0AC",30861:"B0AD",29233:"B0AE",38552:"B0AF",38797:"B0B0",27688:"B0B1",23433:"B0B2",20474:"B0B3",25353:"B0B4",26263:"B0B5",23736:"B0B6",33018:"B0B7",26696:"B0B8",32942:"B0B9",26114:"B0BA",30414:"B0BB",20985:"B0BC",25942:"B0BD",29100:"B0BE",32753:"B0BF",34948:"B0C0",20658:"B0C1",22885:"B0C2",25034:"B0C3",28595:"B0C4",33453:"B0C5",25420:"B0C6",25170:"B0C7",21485:"B0C8",21543:"B0C9",31494:"B0CA",20843:"B0CB",30116:"B0CC",24052:"B0CD",25300:"B0CE",36299:"B0CF",38774:"B0D0",25226:"B0D1",32793:"B0D2",22365:"B0D3",38712:"B0D4",32610:"B0D5",29240:"B0D6",30333:"B0D7",26575:"B0D8",30334:"B0D9",25670:"B0DA",20336:"B0DB",36133:"B0DC",25308:"B0DD",31255:"B0DE",26001:"B0DF",29677:"B0E0",25644:"B0E1",25203:"B0E2",33324:"B0E3",39041:"B0E4",26495:"B0E5",29256:"B0E6",25198:"B0E7",25292:"B0E8",20276:"B0E9",29923:"B0EA",21322:"B0EB",21150:"B0EC",32458:"B0ED",37030:"B0EE",24110:"B0EF",26758:"B0F0",27036:"B0F1",33152:"B0F2",32465:"B0F3",26834:"B0F4",30917:"B0F5",34444:"B0F6",38225:"B0F7",20621:"B0F8",35876:"B0F9",33502:"B0FA",32990:"B0FB",21253:"B0FC",35090:"B0FD",21093:"B0FE",34180:"B1A1",38649:"B1A2",20445:"B1A3",22561:"B1A4",39281:"B1A5",23453:"B1A6",25265:"B1A7",25253:"B1A8",26292:"B1A9",35961:"B1AA",40077:"B1AB",29190:"B1AC",26479:"B1AD",30865:"B1AE",24754:"B1AF",21329:"B1B0",21271:"B1B1",36744:"B1B2",32972:"B1B3",36125:"B1B4",38049:"B1B5",20493:"B1B6",29384:"B1B7",22791:"B1B8",24811:"B1B9",28953:"B1BA",34987:"B1BB",22868:"B1BC",33519:"B1BD",26412:"B1BE",31528:"B1BF",23849:"B1C0",32503:"B1C1",29997:"B1C2",27893:"B1C3",36454:"B1C4",36856:"B1C5",36924:"B1C6",40763:"B1C7",27604:"B1C8",37145:"B1C9",31508:"B1CA",24444:"B1CB",30887:"B1CC",34006:"B1CD",34109:"B1CE",27605:"B1CF",27609:"B1D0",27606:"B1D1",24065:"B1D2",24199:"B1D3",30201:"B1D4",38381:"B1D5",25949:"B1D6",24330:"B1D7",24517:"B1D8",36767:"B1D9",22721:"B1DA",33218:"B1DB",36991:"B1DC",38491:"B1DD",38829:"B1DE",36793:"B1DF",32534:"B1E0",36140:"B1E1",25153:"B1E2",20415:"B1E3",21464:"B1E4",21342:"B1E5",36776:"B1E6",36777:"B1E7",36779:"B1E8",36941:"B1E9",26631:"B1EA",24426:"B1EB",33176:"B1EC",34920:"B1ED",40150:"B1EE",24971:"B1EF",21035:"B1F0",30250:"B1F1",24428:"B1F2",25996:"B1F3",28626:"B1F4",28392:"B1F5",23486:"B1F6",25672:"B1F7",20853:"B1F8",20912:"B1F9",26564:"B1FA",19993:"B1FB",31177:"B1FC",39292:"B1FD",28851:"B1FE",30149:"B2A1",24182:"B2A2",29627:"B2A3",33760:"B2A4",25773:"B2A5",25320:"B2A6",38069:"B2A7",27874:"B2A8",21338:"B2A9",21187:"B2AA",25615:"B2AB",38082:"B2AC",31636:"B2AD",20271:"B2AE",24091:"B2AF",33334:"B2B0",33046:"B2B1",33162:"B2B2",28196:"B2B3",27850:"B2B4",39539:"B2B5",25429:"B2B6",21340:"B2B7",21754:"B2B8",34917:"B2B9",22496:"B2BA",19981:"B2BB",24067:"B2BC",27493:"B2BD",31807:"B2BE",37096:"B2BF",24598:"B2C0",25830:"B2C1",29468:"B2C2",35009:"B2C3",26448:"B2C4",25165:"B2C5",36130:"B2C6",30572:"B2C7",36393:"B2C8",37319:"B2C9",24425:"B2CA",33756:"B2CB",34081:"B2CC",39184:"B2CD",21442:"B2CE",34453:"B2CF",27531:"B2D0",24813:"B2D1",24808:"B2D2",28799:"B2D3",33485:"B2D4",33329:"B2D5",20179:"B2D6",27815:"B2D7",34255:"B2D8",25805:"B2D9",31961:"B2DA",27133:"B2DB",26361:"B2DC",33609:"B2DD",21397:"B2DE",31574:"B2DF",20391:"B2E0",20876:"B2E1",27979:"B2E2",23618:"B2E3",36461:"B2E4",25554:"B2E5",21449:"B2E6",33580:"B2E7",33590:"B2E8",26597:"B2E9",30900:"B2EA",25661:"B2EB",23519:"B2EC",23700:"B2ED",24046:"B2EE",35815:"B2EF",25286:"B2F0",26612:"B2F1",35962:"B2F2",25600:"B2F3",25530:"B2F4",34633:"B2F5",39307:"B2F6",35863:"B2F7",32544:"B2F8",38130:"B2F9",20135:"B2FA",38416:"B2FB",39076:"B2FC",26124:"B2FD",29462:"B2FE",22330:"B3A1",23581:"B3A2",24120:"B3A3",38271:"B3A4",20607:"B3A5",32928:"B3A6",21378:"B3A7",25950:"B3A8",30021:"B3A9",21809:"B3AA",20513:"B3AB",36229:"B3AC",25220:"B3AD",38046:"B3AE",26397:"B3AF",22066:"B3B0",28526:"B3B1",24034:"B3B2",21557:"B3B3",28818:"B3B4",36710:"B3B5",25199:"B3B6",25764:"B3B7",25507:"B3B8",24443:"B3B9",28552:"B3BA",37108:"B3BB",33251:"B3BC",36784:"B3BD",23576:"B3BE",26216:"B3BF",24561:"B3C0",27785:"B3C1",38472:"B3C2",36225:"B3C3",34924:"B3C4",25745:"B3C5",31216:"B3C6",22478:"B3C7",27225:"B3C8",25104:"B3C9",21576:"B3CA",20056:"B3CB",31243:"B3CC",24809:"B3CD",28548:"B3CE",35802:"B3CF",25215:"B3D0",36894:"B3D1",39563:"B3D2",31204:"B3D3",21507:"B3D4",30196:"B3D5",25345:"B3D6",21273:"B3D7",27744:"B3D8",36831:"B3D9",24347:"B3DA",39536:"B3DB",32827:"B3DC",40831:"B3DD",20360:"B3DE",23610:"B3DF",36196:"B3E0",32709:"B3E1",26021:"B3E2",28861:"B3E3",20805:"B3E4",20914:"B3E5",34411:"B3E6",23815:"B3E7",23456:"B3E8",25277:"B3E9",37228:"B3EA",30068:"B3EB",36364:"B3EC",31264:"B3ED",24833:"B3EE",31609:"B3EF",20167:"B3F0",32504:"B3F1",30597:"B3F2",19985:"B3F3",33261:"B3F4",21021:"B3F5",20986:"B3F6",27249:"B3F7",21416:"B3F8",36487:"B3F9",38148:"B3FA",38607:"B3FB",28353:"B3FC",38500:"B3FD",26970:"B3FE",30784:"B4A1",20648:"B4A2",30679:"B4A3",25616:"B4A4",35302:"B4A5",22788:"B4A6",25571:"B4A7",24029:"B4A8",31359:"B4A9",26941:"B4AA",20256:"B4AB",33337:"B4AC",21912:"B4AD",20018:"B4AE",30126:"B4AF",31383:"B4B0",24162:"B4B1",24202:"B4B2",38383:"B4B3",21019:"B4B4",21561:"B4B5",28810:"B4B6",25462:"B4B7",38180:"B4B8",22402:"B4B9",26149:"B4BA",26943:"B4BB",37255:"B4BC",21767:"B4BD",28147:"B4BE",32431:"B4BF",34850:"B4C0",25139:"B4C1",32496:"B4C2",30133:"B4C3",33576:"B4C4",30913:"B4C5",38604:"B4C6",36766:"B4C7",24904:"B4C8",29943:"B4C9",35789:"B4CA",27492:"B4CB",21050:"B4CC",36176:"B4CD",27425:"B4CE",32874:"B4CF",33905:"B4D0",22257:"B4D1",21254:"B4D2",20174:"B4D3",19995:"B4D4",20945:"B4D5",31895:"B4D6",37259:"B4D7",31751:"B4D8",20419:"B4D9",36479:"B4DA",31713:"B4DB",31388:"B4DC",25703:"B4DD",23828:"B4DE",20652:"B4DF",33030:"B4E0",30209:"B4E1",31929:"B4E2",28140:"B4E3",32736:"B4E4",26449:"B4E5",23384:"B4E6",23544:"B4E7",30923:"B4E8",25774:"B4E9",25619:"B4EA",25514:"B4EB",25387:"B4EC",38169:"B4ED",25645:"B4EE",36798:"B4EF",31572:"B4F0",30249:"B4F1",25171:"B4F2",22823:"B4F3",21574:"B4F4",27513:"B4F5",20643:"B4F6",25140:"B4F7",24102:"B4F8",27526:"B4F9",20195:"B4FA",36151:"B4FB",34955:"B4FC",24453:"B4FD",36910:"B4FE",24608:"B5A1",32829:"B5A2",25285:"B5A3",20025:"B5A4",21333:"B5A5",37112:"B5A6",25528:"B5A7",32966:"B5A8",26086:"B5A9",27694:"B5AA",20294:"B5AB",24814:"B5AC",28129:"B5AD",35806:"B5AE",24377:"B5AF",34507:"B5B0",24403:"B5B1",25377:"B5B2",20826:"B5B3",33633:"B5B4",26723:"B5B5",20992:"B5B6",25443:"B5B7",36424:"B5B8",20498:"B5B9",23707:"B5BA",31095:"B5BB",23548:"B5BC",21040:"B5BD",31291:"B5BE",24764:"B5BF",36947:"B5C0",30423:"B5C1",24503:"B5C2",24471:"B5C3",30340:"B5C4",36460:"B5C5",28783:"B5C6",30331:"B5C7",31561:"B5C8",30634:"B5C9",20979:"B5CA",37011:"B5CB",22564:"B5CC",20302:"B5CD",28404:"B5CE",36842:"B5CF",25932:"B5D0",31515:"B5D1",29380:"B5D2",28068:"B5D3",32735:"B5D4",23265:"B5D5",25269:"B5D6",24213:"B5D7",22320:"B5D8",33922:"B5D9",31532:"B5DA",24093:"B5DB",24351:"B5DC",36882:"B5DD",32532:"B5DE",39072:"B5DF",25474:"B5E0",28359:"B5E1",30872:"B5E2",28857:"B5E3",20856:"B5E4",38747:"B5E5",22443:"B5E6",30005:"B5E7",20291:"B5E8",30008:"B5E9",24215:"B5EA",24806:"B5EB",22880:"B5EC",28096:"B5ED",27583:"B5EE",30857:"B5EF",21500:"B5F0",38613:"B5F1",20939:"B5F2",20993:"B5F3",25481:"B5F4",21514:"B5F5",38035:"B5F6",35843:"B5F7",36300:"B5F8",29241:"B5F9",30879:"B5FA",34678:"B5FB",36845:"B5FC",35853:"B5FD",21472:"B5FE",19969:"B6A1",30447:"B6A2",21486:"B6A3",38025:"B6A4",39030:"B6A5",40718:"B6A6",38189:"B6A7",23450:"B6A8",35746:"B6A9",20002:"B6AA",19996:"B6AB",20908:"B6AC",33891:"B6AD",25026:"B6AE",21160:"B6AF",26635:"B6B0",20375:"B6B1",24683:"B6B2",20923:"B6B3",27934:"B6B4",20828:"B6B5",25238:"B6B6",26007:"B6B7",38497:"B6B8",35910:"B6B9",36887:"B6BA",30168:"B6BB",37117:"B6BC",30563:"B6BD",27602:"B6BE",29322:"B6BF",29420:"B6C0",35835:"B6C1",22581:"B6C2",30585:"B6C3",36172:"B6C4",26460:"B6C5",38208:"B6C6",32922:"B6C7",24230:"B6C8",28193:"B6C9",22930:"B6CA",31471:"B6CB",30701:"B6CC",38203:"B6CD",27573:"B6CE",26029:"B6CF",32526:"B6D0",22534:"B6D1",20817:"B6D2",38431:"B6D3",23545:"B6D4",22697:"B6D5",21544:"B6D6",36466:"B6D7",25958:"B6D8",39039:"B6D9",22244:"B6DA",38045:"B6DB",30462:"B6DC",36929:"B6DD",25479:"B6DE",21702:"B6DF",22810:"B6E0",22842:"B6E1",22427:"B6E2",36530:"B6E3",26421:"B6E4",36346:"B6E5",33333:"B6E6",21057:"B6E7",24816:"B6E8",22549:"B6E9",34558:"B6EA",23784:"B6EB",40517:"B6EC",20420:"B6ED",39069:"B6EE",35769:"B6EF",23077:"B6F0",24694:"B6F1",21380:"B6F2",25212:"B6F3",36943:"B6F4",37122:"B6F5",39295:"B6F6",24681:"B6F7",32780:"B6F8",20799:"B6F9",32819:"B6FA",23572:"B6FB",39285:"B6FC",27953:"B6FD",20108:"B6FE",36144:"B7A1",21457:"B7A2",32602:"B7A3",31567:"B7A4",20240:"B7A5",20047:"B7A6",38400:"B7A7",27861:"B7A8",29648:"B7A9",34281:"B7AA",24070:"B7AB",30058:"B7AC",32763:"B7AD",27146:"B7AE",30718:"B7AF",38034:"B7B0",32321:"B7B1",20961:"B7B2",28902:"B7B3",21453:"B7B4",36820:"B7B5",33539:"B7B6",36137:"B7B7",29359:"B7B8",39277:"B7B9",27867:"B7BA",22346:"B7BB",33459:"B7BC",26041:"B7BD",32938:"B7BE",25151:"B7BF",38450:"B7C0",22952:"B7C1",20223:"B7C2",35775:"B7C3",32442:"B7C4",25918:"B7C5",33778:"B7C6",38750:"B7C7",21857:"B7C8",39134:"B7C9",32933:"B7CA",21290:"B7CB",35837:"B7CC",21536:"B7CD",32954:"B7CE",24223:"B7CF",27832:"B7D0",36153:"B7D1",33452:"B7D2",37210:"B7D3",21545:"B7D4",27675:"B7D5",20998:"B7D6",32439:"B7D7",22367:"B7D8",28954:"B7D9",27774:"B7DA",31881:"B7DB",22859:"B7DC",20221:"B7DD",24575:"B7DE",24868:"B7DF",31914:"B7E0",20016:"B7E1",23553:"B7E2",26539:"B7E3",34562:"B7E4",23792:"B7E5",38155:"B7E6",39118:"B7E7",30127:"B7E8",28925:"B7E9",36898:"B7EA",20911:"B7EB",32541:"B7EC",35773:"B7ED",22857:"B7EE",20964:"B7EF",20315:"B7F0",21542:"B7F1",22827:"B7F2",25975:"B7F3",32932:"B7F4",23413:"B7F5",25206:"B7F6",25282:"B7F7",36752:"B7F8",24133:"B7F9",27679:"B7FA",31526:"B7FB",20239:"B7FC",20440:"B7FD",26381:"B7FE",28014:"B8A1",28074:"B8A2",31119:"B8A3",34993:"B8A4",24343:"B8A5",29995:"B8A6",25242:"B8A7",36741:"B8A8",20463:"B8A9",37340:"B8AA",26023:"B8AB",33071:"B8AC",33105:"B8AD",24220:"B8AE",33104:"B8AF",36212:"B8B0",21103:"B8B1",35206:"B8B2",36171:"B8B3",22797:"B8B4",20613:"B8B5",20184:"B8B6",38428:"B8B7",29238:"B8B8",33145:"B8B9",36127:"B8BA",23500:"B8BB",35747:"B8BC",38468:"B8BD",22919:"B8BE",32538:"B8BF",21648:"B8C0",22134:"B8C1",22030:"B8C2",35813:"B8C3",25913:"B8C4",27010:"B8C5",38041:"B8C6",30422:"B8C7",28297:"B8C8",24178:"B8C9",29976:"B8CA",26438:"B8CB",26577:"B8CC",31487:"B8CD",32925:"B8CE",36214:"B8CF",24863:"B8D0",31174:"B8D1",25954:"B8D2",36195:"B8D3",20872:"B8D4",21018:"B8D5",38050:"B8D6",32568:"B8D7",32923:"B8D8",32434:"B8D9",23703:"B8DA",28207:"B8DB",26464:"B8DC",31705:"B8DD",30347:"B8DE",39640:"B8DF",33167:"B8E0",32660:"B8E1",31957:"B8E2",25630:"B8E3",38224:"B8E4",31295:"B8E5",21578:"B8E6",21733:"B8E7",27468:"B8E8",25601:"B8E9",25096:"B8EA",40509:"B8EB",33011:"B8EC",30105:"B8ED",21106:"B8EE",38761:"B8EF",33883:"B8F0",26684:"B8F1",34532:"B8F2",38401:"B8F3",38548:"B8F4",38124:"B8F5",20010:"B8F6",21508:"B8F7",32473:"B8F8",26681:"B8F9",36319:"B8FA",32789:"B8FB",26356:"B8FC",24218:"B8FD",32697:"B8FE",22466:"B9A1",32831:"B9A2",26775:"B9A3",24037:"B9A4",25915:"B9A5",21151:"B9A6",24685:"B9A7",40858:"B9A8",20379:"B9A9",36524:"B9AA",20844:"B9AB",23467:"B9AC",24339:"B9AD",24041:"B9AE",27742:"B9AF",25329:"B9B0",36129:"B9B1",20849:"B9B2",38057:"B9B3",21246:"B9B4",27807:"B9B5",33503:"B9B6",29399:"B9B7",22434:"B9B8",26500:"B9B9",36141:"B9BA",22815:"B9BB",36764:"B9BC",33735:"B9BD",21653:"B9BE",31629:"B9BF",20272:"B9C0",27837:"B9C1",23396:"B9C2",22993:"B9C3",40723:"B9C4",21476:"B9C5",34506:"B9C6",39592:"B9C7",35895:"B9C8",32929:"B9C9",25925:"B9CA",39038:"B9CB",22266:"B9CC",38599:"B9CD",21038:"B9CE",29916:"B9CF",21072:"B9D0",23521:"B9D1",25346:"B9D2",35074:"B9D3",20054:"B9D4",25296:"B9D5",24618:"B9D6",26874:"B9D7",20851:"B9D8",23448:"B9D9",20896:"B9DA",35266:"B9DB",31649:"B9DC",39302:"B9DD",32592:"B9DE",24815:"B9DF",28748:"B9E0",36143:"B9E1",20809:"B9E2",24191:"B9E3",36891:"B9E4",29808:"B9E5",35268:"B9E6",22317:"B9E7",30789:"B9E8",24402:"B9E9",40863:"B9EA",38394:"B9EB",36712:"B9EC",39740:"B9ED",35809:"B9EE",30328:"B9EF",26690:"B9F0",26588:"B9F1",36330:"B9F2",36149:"B9F3",21053:"B9F4",36746:"B9F5",28378:"B9F6",26829:"B9F7",38149:"B9F8",37101:"B9F9",22269:"B9FA",26524:"B9FB",35065:"B9FC",36807:"B9FD",21704:"B9FE",39608:"BAA1",23401:"BAA2",28023:"BAA3",27686:"BAA4",20133:"BAA5",23475:"BAA6",39559:"BAA7",37219:"BAA8",25e3:"BAA9",37039:"BAAA",38889:"BAAB",21547:"BAAC",28085:"BAAD",23506:"BAAE",20989:"BAAF",21898:"BAB0",32597:"BAB1",32752:"BAB2",25788:"BAB3",25421:"BAB4",26097:"BAB5",25022:"BAB6",24717:"BAB7",28938:"BAB8",27735:"BAB9",27721:"BABA",22831:"BABB",26477:"BABC",33322:"BABD",22741:"BABE",22158:"BABF",35946:"BAC0",27627:"BAC1",37085:"BAC2",22909:"BAC3",32791:"BAC4",21495:"BAC5",28009:"BAC6",21621:"BAC7",21917:"BAC8",33655:"BAC9",33743:"BACA",26680:"BACB",31166:"BACC",21644:"BACD",20309:"BACE",21512:"BACF",30418:"BAD0",35977:"BAD1",38402:"BAD2",27827:"BAD3",28088:"BAD4",36203:"BAD5",35088:"BAD6",40548:"BAD7",36154:"BAD8",22079:"BAD9",40657:"BADA",30165:"BADB",24456:"BADC",29408:"BADD",24680:"BADE",21756:"BADF",20136:"BAE0",27178:"BAE1",34913:"BAE2",24658:"BAE3",36720:"BAE4",21700:"BAE5",28888:"BAE6",34425:"BAE7",40511:"BAE8",27946:"BAE9",23439:"BAEA",24344:"BAEB",32418:"BAEC",21897:"BAED",20399:"BAEE",29492:"BAEF",21564:"BAF0",21402:"BAF1",20505:"BAF2",21518:"BAF3",21628:"BAF4",20046:"BAF5",24573:"BAF6",29786:"BAF7",22774:"BAF8",33899:"BAF9",32993:"BAFA",34676:"BAFB",29392:"BAFC",31946:"BAFD",28246:"BAFE",24359:"BBA1",34382:"BBA2",21804:"BBA3",25252:"BBA4",20114:"BBA5",27818:"BBA6",25143:"BBA7",33457:"BBA8",21719:"BBA9",21326:"BBAA",29502:"BBAB",28369:"BBAC",30011:"BBAD",21010:"BBAE",21270:"BBAF",35805:"BBB0",27088:"BBB1",24458:"BBB2",24576:"BBB3",28142:"BBB4",22351:"BBB5",27426:"BBB6",29615:"BBB7",26707:"BBB8",36824:"BBB9",32531:"BBBA",25442:"BBBB",24739:"BBBC",21796:"BBBD",30186:"BBBE",35938:"BBBF",28949:"BBC0",28067:"BBC1",23462:"BBC2",24187:"BBC3",33618:"BBC4",24908:"BBC5",40644:"BBC6",30970:"BBC7",34647:"BBC8",31783:"BBC9",30343:"BBCA",20976:"BBCB",24822:"BBCC",29004:"BBCD",26179:"BBCE",24140:"BBCF",24653:"BBD0",35854:"BBD1",28784:"BBD2",25381:"BBD3",36745:"BBD4",24509:"BBD5",24674:"BBD6",34516:"BBD7",22238:"BBD8",27585:"BBD9",24724:"BBDA",24935:"BBDB",21321:"BBDC",24800:"BBDD",26214:"BBDE",36159:"BBDF",31229:"BBE0",20250:"BBE1",28905:"BBE2",27719:"BBE3",35763:"BBE4",35826:"BBE5",32472:"BBE6",33636:"BBE7",26127:"BBE8",23130:"BBE9",39746:"BBEA",27985:"BBEB",28151:"BBEC",35905:"BBED",27963:"BBEE",20249:"BBEF",28779:"BBF0",33719:"BBF1",25110:"BBF2",24785:"BBF3",38669:"BBF4",36135:"BBF5",31096:"BBF6",20987:"BBF7",22334:"BBF8",22522:"BBF9",26426:"BBFA",30072:"BBFB",31293:"BBFC",31215:"BBFD",31637:"BBFE",32908:"BCA1",39269:"BCA2",36857:"BCA3",28608:"BCA4",35749:"BCA5",40481:"BCA6",23020:"BCA7",32489:"BCA8",32521:"BCA9",21513:"BCAA",26497:"BCAB",26840:"BCAC",36753:"BCAD",31821:"BCAE",38598:"BCAF",21450:"BCB0",24613:"BCB1",30142:"BCB2",27762:"BCB3",21363:"BCB4",23241:"BCB5",32423:"BCB6",25380:"BCB7",20960:"BCB8",33034:"BCB9",24049:"BCBA",34015:"BCBB",25216:"BCBC",20864:"BCBD",23395:"BCBE",20238:"BCBF",31085:"BCC0",21058:"BCC1",24760:"BCC2",27982:"BCC3",23492:"BCC4",23490:"BCC5",35745:"BCC6",35760:"BCC7",26082:"BCC8",24524:"BCC9",38469:"BCCA",22931:"BCCB",32487:"BCCC",32426:"BCCD",22025:"BCCE",26551:"BCCF",22841:"BCD0",20339:"BCD1",23478:"BCD2",21152:"BCD3",33626:"BCD4",39050:"BCD5",36158:"BCD6",30002:"BCD7",38078:"BCD8",20551:"BCD9",31292:"BCDA",20215:"BCDB",26550:"BCDC",39550:"BCDD",23233:"BCDE",27516:"BCDF",30417:"BCE0",22362:"BCE1",23574:"BCE2",31546:"BCE3",38388:"BCE4",29006:"BCE5",20860:"BCE6",32937:"BCE7",33392:"BCE8",22904:"BCE9",32516:"BCEA",33575:"BCEB",26816:"BCEC",26604:"BCED",30897:"BCEE",30839:"BCEF",25315:"BCF0",25441:"BCF1",31616:"BCF2",20461:"BCF3",21098:"BCF4",20943:"BCF5",33616:"BCF6",27099:"BCF7",37492:"BCF8",36341:"BCF9",36145:"BCFA",35265:"BCFB",38190:"BCFC",31661:"BCFD",20214:"BCFE",20581:"BDA1",33328:"BDA2",21073:"BDA3",39279:"BDA4",28176:"BDA5",28293:"BDA6",28071:"BDA7",24314:"BDA8",20725:"BDA9",23004:"BDAA",23558:"BDAB",27974:"BDAC",27743:"BDAD",30086:"BDAE",33931:"BDAF",26728:"BDB0",22870:"BDB1",35762:"BDB2",21280:"BDB3",37233:"BDB4",38477:"BDB5",34121:"BDB6",26898:"BDB7",30977:"BDB8",28966:"BDB9",33014:"BDBA",20132:"BDBB",37066:"BDBC",27975:"BDBD",39556:"BDBE",23047:"BDBF",22204:"BDC0",25605:"BDC1",38128:"BDC2",30699:"BDC3",20389:"BDC4",33050:"BDC5",29409:"BDC6",35282:"BDC7",39290:"BDC8",32564:"BDC9",32478:"BDCA",21119:"BDCB",25945:"BDCC",37237:"BDCD",36735:"BDCE",36739:"BDCF",21483:"BDD0",31382:"BDD1",25581:"BDD2",25509:"BDD3",30342:"BDD4",31224:"BDD5",34903:"BDD6",38454:"BDD7",25130:"BDD8",21163:"BDD9",33410:"BDDA",26708:"BDDB",26480:"BDDC",25463:"BDDD",30571:"BDDE",31469:"BDDF",27905:"BDE0",32467:"BDE1",35299:"BDE2",22992:"BDE3",25106:"BDE4",34249:"BDE5",33445:"BDE6",30028:"BDE7",20511:"BDE8",20171:"BDE9",30117:"BDEA",35819:"BDEB",23626:"BDEC",24062:"BDED",31563:"BDEE",26020:"BDEF",37329:"BDF0",20170:"BDF1",27941:"BDF2",35167:"BDF3",32039:"BDF4",38182:"BDF5",20165:"BDF6",35880:"BDF7",36827:"BDF8",38771:"BDF9",26187:"BDFA",31105:"BDFB",36817:"BDFC",28908:"BDFD",28024:"BDFE",23613:"BEA1",21170:"BEA2",33606:"BEA3",20834:"BEA4",33550:"BEA5",30555:"BEA6",26230:"BEA7",40120:"BEA8",20140:"BEA9",24778:"BEAA",31934:"BEAB",31923:"BEAC",32463:"BEAD",20117:"BEAE",35686:"BEAF",26223:"BEB0",39048:"BEB1",38745:"BEB2",22659:"BEB3",25964:"BEB4",38236:"BEB5",24452:"BEB6",30153:"BEB7",38742:"BEB8",31455:"BEB9",31454:"BEBA",20928:"BEBB",28847:"BEBC",31384:"BEBD",25578:"BEBE",31350:"BEBF",32416:"BEC0",29590:"BEC1",38893:"BEC2",20037:"BEC3",28792:"BEC4",20061:"BEC5",37202:"BEC6",21417:"BEC7",25937:"BEC8",26087:"BEC9",33276:"BECA",33285:"BECB",21646:"BECC",23601:"BECD",30106:"BECE",38816:"BECF",25304:"BED0",29401:"BED1",30141:"BED2",23621:"BED3",39545:"BED4",33738:"BED5",23616:"BED6",21632:"BED7",30697:"BED8",20030:"BED9",27822:"BEDA",32858:"BEDB",25298:"BEDC",25454:"BEDD",24040:"BEDE",20855:"BEDF",36317:"BEE0",36382:"BEE1",38191:"BEE2",20465:"BEE3",21477:"BEE4",24807:"BEE5",28844:"BEE6",21095:"BEE7",25424:"BEE8",40515:"BEE9",23071:"BEEA",20518:"BEEB",30519:"BEEC",21367:"BEED",32482:"BEEE",25733:"BEEF",25899:"BEF0",25225:"BEF1",25496:"BEF2",20500:"BEF3",29237:"BEF4",35273:"BEF5",20915:"BEF6",35776:"BEF7",32477:"BEF8",22343:"BEF9",33740:"BEFA",38055:"BEFB",20891:"BEFC",21531:"BEFD",23803:"BEFE",20426:"BFA1",31459:"BFA2",27994:"BFA3",37089:"BFA4",39567:"BFA5",21888:"BFA6",21654:"BFA7",21345:"BFA8",21679:"BFA9",24320:"BFAA",25577:"BFAB",26999:"BFAC",20975:"BFAD",24936:"BFAE",21002:"BFAF",22570:"BFB0",21208:"BFB1",22350:"BFB2",30733:"BFB3",30475:"BFB4",24247:"BFB5",24951:"BFB6",31968:"BFB7",25179:"BFB8",25239:"BFB9",20130:"BFBA",28821:"BFBB",32771:"BFBC",25335:"BFBD",28900:"BFBE",38752:"BFBF",22391:"BFC0",33499:"BFC1",26607:"BFC2",26869:"BFC3",30933:"BFC4",39063:"BFC5",31185:"BFC6",22771:"BFC7",21683:"BFC8",21487:"BFC9",28212:"BFCA",20811:"BFCB",21051:"BFCC",23458:"BFCD",35838:"BFCE",32943:"BFCF",21827:"BFD0",22438:"BFD1",24691:"BFD2",22353:"BFD3",21549:"BFD4",31354:"BFD5",24656:"BFD6",23380:"BFD7",25511:"BFD8",25248:"BFD9",21475:"BFDA",25187:"BFDB",23495:"BFDC",26543:"BFDD",21741:"BFDE",31391:"BFDF",33510:"BFE0",37239:"BFE1",24211:"BFE2",35044:"BFE3",22840:"BFE4",22446:"BFE5",25358:"BFE6",36328:"BFE7",33007:"BFE8",22359:"BFE9",31607:"BFEA",20393:"BFEB",24555:"BFEC",23485:"BFED",27454:"BFEE",21281:"BFEF",31568:"BFF0",29378:"BFF1",26694:"BFF2",30719:"BFF3",30518:"BFF4",26103:"BFF5",20917:"BFF6",20111:"BFF7",30420:"BFF8",23743:"BFF9",31397:"BFFA",33909:"BFFB",22862:"BFFC",39745:"BFFD",20608:"BFFE",39304:"C0A1",24871:"C0A2",28291:"C0A3",22372:"C0A4",26118:"C0A5",25414:"C0A6",22256:"C0A7",25324:"C0A8",25193:"C0A9",24275:"C0AA",38420:"C0AB",22403:"C0AC",25289:"C0AD",21895:"C0AE",34593:"C0AF",33098:"C0B0",36771:"C0B1",21862:"C0B2",33713:"C0B3",26469:"C0B4",36182:"C0B5",34013:"C0B6",23146:"C0B7",26639:"C0B8",25318:"C0B9",31726:"C0BA",38417:"C0BB",20848:"C0BC",28572:"C0BD",35888:"C0BE",25597:"C0BF",35272:"C0C0",25042:"C0C1",32518:"C0C2",28866:"C0C3",28389:"C0C4",29701:"C0C5",27028:"C0C6",29436:"C0C7",24266:"C0C8",37070:"C0C9",26391:"C0CA",28010:"C0CB",25438:"C0CC",21171:"C0CD",29282:"C0CE",32769:"C0CF",20332:"C0D0",23013:"C0D1",37226:"C0D2",28889:"C0D3",28061:"C0D4",21202:"C0D5",20048:"C0D6",38647:"C0D7",38253:"C0D8",34174:"C0D9",30922:"C0DA",32047:"C0DB",20769:"C0DC",22418:"C0DD",25794:"C0DE",32907:"C0DF",31867:"C0E0",27882:"C0E1",26865:"C0E2",26974:"C0E3",20919:"C0E4",21400:"C0E5",26792:"C0E6",29313:"C0E7",40654:"C0E8",31729:"C0E9",29432:"C0EA",31163:"C0EB",28435:"C0EC",29702:"C0ED",26446:"C0EE",37324:"C0EF",40100:"C0F0",31036:"C0F1",33673:"C0F2",33620:"C0F3",21519:"C0F4",26647:"C0F5",20029:"C0F6",21385:"C0F7",21169:"C0F8",30782:"C0F9",21382:"C0FA",21033:"C0FB",20616:"C0FC",20363:"C0FD",20432:"C0FE",30178:"C1A1",31435:"C1A2",31890:"C1A3",27813:"C1A4",38582:"C1A5",21147:"C1A6",29827:"C1A7",21737:"C1A8",20457:"C1A9",32852:"C1AA",33714:"C1AB",36830:"C1AC",38256:"C1AD",24265:"C1AE",24604:"C1AF",28063:"C1B0",24088:"C1B1",25947:"C1B2",33080:"C1B3",38142:"C1B4",24651:"C1B5",28860:"C1B6",32451:"C1B7",31918:"C1B8",20937:"C1B9",26753:"C1BA",31921:"C1BB",33391:"C1BC",20004:"C1BD",36742:"C1BE",37327:"C1BF",26238:"C1C0",20142:"C1C1",35845:"C1C2",25769:"C1C3",32842:"C1C4",20698:"C1C5",30103:"C1C6",29134:"C1C7",23525:"C1C8",36797:"C1C9",28518:"C1CA",20102:"C1CB",25730:"C1CC",38243:"C1CD",24278:"C1CE",26009:"C1CF",21015:"C1D0",35010:"C1D1",28872:"C1D2",21155:"C1D3",29454:"C1D4",29747:"C1D5",26519:"C1D6",30967:"C1D7",38678:"C1D8",20020:"C1D9",37051:"C1DA",40158:"C1DB",28107:"C1DC",20955:"C1DD",36161:"C1DE",21533:"C1DF",25294:"C1E0",29618:"C1E1",33777:"C1E2",38646:"C1E3",40836:"C1E4",38083:"C1E5",20278:"C1E6",32666:"C1E7",20940:"C1E8",28789:"C1E9",38517:"C1EA",23725:"C1EB",39046:"C1EC",21478:"C1ED",20196:"C1EE",28316:"C1EF",29705:"C1F0",27060:"C1F1",30827:"C1F2",39311:"C1F3",30041:"C1F4",21016:"C1F5",30244:"C1F6",27969:"C1F7",26611:"C1F8",20845:"C1F9",40857:"C1FA",32843:"C1FB",21657:"C1FC",31548:"C1FD",31423:"C1FE",38534:"C2A1",22404:"C2A2",25314:"C2A3",38471:"C2A4",27004:"C2A5",23044:"C2A6",25602:"C2A7",31699:"C2A8",28431:"C2A9",38475:"C2AA",33446:"C2AB",21346:"C2AC",39045:"C2AD",24208:"C2AE",28809:"C2AF",25523:"C2B0",21348:"C2B1",34383:"C2B2",40065:"C2B3",40595:"C2B4",30860:"C2B5",38706:"C2B6",36335:"C2B7",36162:"C2B8",40575:"C2B9",28510:"C2BA",31108:"C2BB",24405:"C2BC",38470:"C2BD",25134:"C2BE",39540:"C2BF",21525:"C2C0",38109:"C2C1",20387:"C2C2",26053:"C2C3",23653:"C2C4",23649:"C2C5",32533:"C2C6",34385:"C2C7",27695:"C2C8",24459:"C2C9",29575:"C2CA",28388:"C2CB",32511:"C2CC",23782:"C2CD",25371:"C2CE",23402:"C2CF",28390:"C2D0",21365:"C2D1",20081:"C2D2",25504:"C2D3",30053:"C2D4",25249:"C2D5",36718:"C2D6",20262:"C2D7",20177:"C2D8",27814:"C2D9",32438:"C2DA",35770:"C2DB",33821:"C2DC",34746:"C2DD",32599:"C2DE",36923:"C2DF",38179:"C2E0",31657:"C2E1",39585:"C2E2",35064:"C2E3",33853:"C2E4",27931:"C2E5",39558:"C2E6",32476:"C2E7",22920:"C2E8",40635:"C2E9",29595:"C2EA",30721:"C2EB",34434:"C2EC",39532:"C2ED",39554:"C2EE",22043:"C2EF",21527:"C2F0",22475:"C2F1",20080:"C2F2",40614:"C2F3",21334:"C2F4",36808:"C2F5",33033:"C2F6",30610:"C2F7",39314:"C2F8",34542:"C2F9",28385:"C2FA",34067:"C2FB",26364:"C2FC",24930:"C2FD",28459:"C2FE",35881:"C3A1",33426:"C3A2",33579:"C3A3",30450:"C3A4",27667:"C3A5",24537:"C3A6",33725:"C3A7",29483:"C3A8",33541:"C3A9",38170:"C3AA",27611:"C3AB",30683:"C3AC",38086:"C3AD",21359:"C3AE",33538:"C3AF",20882:"C3B0",24125:"C3B1",35980:"C3B2",36152:"C3B3",20040:"C3B4",29611:"C3B5",26522:"C3B6",26757:"C3B7",37238:"C3B8",38665:"C3B9",29028:"C3BA",27809:"C3BB",30473:"C3BC",23186:"C3BD",38209:"C3BE",27599:"C3BF",32654:"C3C0",26151:"C3C1",23504:"C3C2",22969:"C3C3",23194:"C3C4",38376:"C3C5",38391:"C3C6",20204:"C3C7",33804:"C3C8",33945:"C3C9",27308:"C3CA",30431:"C3CB",38192:"C3CC",29467:"C3CD",26790:"C3CE",23391:"C3CF",30511:"C3D0",37274:"C3D1",38753:"C3D2",31964:"C3D3",36855:"C3D4",35868:"C3D5",24357:"C3D6",31859:"C3D7",31192:"C3D8",35269:"C3D9",27852:"C3DA",34588:"C3DB",23494:"C3DC",24130:"C3DD",26825:"C3DE",30496:"C3DF",32501:"C3E0",20885:"C3E1",20813:"C3E2",21193:"C3E3",23081:"C3E4",32517:"C3E5",38754:"C3E6",33495:"C3E7",25551:"C3E8",30596:"C3E9",34256:"C3EA",31186:"C3EB",28218:"C3EC",24217:"C3ED",22937:"C3EE",34065:"C3EF",28781:"C3F0",27665:"C3F1",25279:"C3F2",30399:"C3F3",25935:"C3F4",24751:"C3F5",38397:"C3F6",26126:"C3F7",34719:"C3F8",40483:"C3F9",38125:"C3FA",21517:"C3FB",21629:"C3FC",35884:"C3FD",25720:"C3FE",25721:"C4A1",34321:"C4A2",27169:"C4A3",33180:"C4A4",30952:"C4A5",25705:"C4A6",39764:"C4A7",25273:"C4A8",26411:"C4A9",33707:"C4AA",22696:"C4AB",40664:"C4AC",27819:"C4AD",28448:"C4AE",23518:"C4AF",38476:"C4B0",35851:"C4B1",29279:"C4B2",26576:"C4B3",25287:"C4B4",29281:"C4B5",20137:"C4B6",22982:"C4B7",27597:"C4B8",22675:"C4B9",26286:"C4BA",24149:"C4BB",21215:"C4BC",24917:"C4BD",26408:"C4BE",30446:"C4BF",30566:"C4C0",29287:"C4C1",31302:"C4C2",25343:"C4C3",21738:"C4C4",21584:"C4C5",38048:"C4C6",37027:"C4C7",23068:"C4C8",32435:"C4C9",27670:"C4CA",20035:"C4CB",22902:"C4CC",32784:"C4CD",22856:"C4CE",21335:"C4CF",30007:"C4D0",38590:"C4D1",22218:"C4D2",25376:"C4D3",33041:"C4D4",24700:"C4D5",38393:"C4D6",28118:"C4D7",21602:"C4D8",39297:"C4D9",20869:"C4DA",23273:"C4DB",33021:"C4DC",22958:"C4DD",38675:"C4DE",20522:"C4DF",27877:"C4E0",23612:"C4E1",25311:"C4E2",20320:"C4E3",21311:"C4E4",33147:"C4E5",36870:"C4E6",28346:"C4E7",34091:"C4E8",25288:"C4E9",24180:"C4EA",30910:"C4EB",25781:"C4EC",25467:"C4ED",24565:"C4EE",23064:"C4EF",37247:"C4F0",40479:"C4F1",23615:"C4F2",25423:"C4F3",32834:"C4F4",23421:"C4F5",21870:"C4F6",38218:"C4F7",38221:"C4F8",28037:"C4F9",24744:"C4FA",26592:"C4FB",29406:"C4FC",20957:"C4FD",23425:"C4FE",25319:"C5A1",27870:"C5A2",29275:"C5A3",25197:"C5A4",38062:"C5A5",32445:"C5A6",33043:"C5A7",27987:"C5A8",20892:"C5A9",24324:"C5AA",22900:"C5AB",21162:"C5AC",24594:"C5AD",22899:"C5AE",26262:"C5AF",34384:"C5B0",30111:"C5B1",25386:"C5B2",25062:"C5B3",31983:"C5B4",35834:"C5B5",21734:"C5B6",27431:"C5B7",40485:"C5B8",27572:"C5B9",34261:"C5BA",21589:"C5BB",20598:"C5BC",27812:"C5BD",21866:"C5BE",36276:"C5BF",29228:"C5C0",24085:"C5C1",24597:"C5C2",29750:"C5C3",25293:"C5C4",25490:"C5C5",29260:"C5C6",24472:"C5C7",28227:"C5C8",27966:"C5C9",25856:"C5CA",28504:"C5CB",30424:"C5CC",30928:"C5CD",30460:"C5CE",30036:"C5CF",21028:"C5D0",21467:"C5D1",20051:"C5D2",24222:"C5D3",26049:"C5D4",32810:"C5D5",32982:"C5D6",25243:"C5D7",21638:"C5D8",21032:"C5D9",28846:"C5DA",34957:"C5DB",36305:"C5DC",27873:"C5DD",21624:"C5DE",32986:"C5DF",22521:"C5E0",35060:"C5E1",36180:"C5E2",38506:"C5E3",37197:"C5E4",20329:"C5E5",27803:"C5E6",21943:"C5E7",30406:"C5E8",30768:"C5E9",25256:"C5EA",28921:"C5EB",28558:"C5EC",24429:"C5ED",34028:"C5EE",26842:"C5EF",30844:"C5F0",31735:"C5F1",33192:"C5F2",26379:"C5F3",40527:"C5F4",25447:"C5F5",30896:"C5F6",22383:"C5F7",30738:"C5F8",38713:"C5F9",25209:"C5FA",25259:"C5FB",21128:"C5FC",29749:"C5FD",27607:"C5FE",21860:"C6A1",33086:"C6A2",30130:"C6A3",30382:"C6A4",21305:"C6A5",30174:"C6A6",20731:"C6A7",23617:"C6A8",35692:"C6A9",31687:"C6AA",20559:"C6AB",29255:"C6AC",39575:"C6AD",39128:"C6AE",28418:"C6AF",29922:"C6B0",31080:"C6B1",25735:"C6B2",30629:"C6B3",25340:"C6B4",39057:"C6B5",36139:"C6B6",21697:"C6B7",32856:"C6B8",20050:"C6B9",22378:"C6BA",33529:"C6BB",33805:"C6BC",24179:"C6BD",20973:"C6BE",29942:"C6BF",35780:"C6C0",23631:"C6C1",22369:"C6C2",27900:"C6C3",39047:"C6C4",23110:"C6C5",30772:"C6C6",39748:"C6C7",36843:"C6C8",31893:"C6C9",21078:"C6CA",25169:"C6CB",38138:"C6CC",20166:"C6CD",33670:"C6CE",33889:"C6CF",33769:"C6D0",33970:"C6D1",22484:"C6D2",26420:"C6D3",22275:"C6D4",26222:"C6D5",28006:"C6D6",35889:"C6D7",26333:"C6D8",28689:"C6D9",26399:"C6DA",27450:"C6DB",26646:"C6DC",25114:"C6DD",22971:"C6DE",19971:"C6DF",20932:"C6E0",28422:"C6E1",26578:"C6E2",27791:"C6E3",20854:"C6E4",26827:"C6E5",22855:"C6E6",27495:"C6E7",30054:"C6E8",23822:"C6E9",33040:"C6EA",40784:"C6EB",26071:"C6EC",31048:"C6ED",31041:"C6EE",39569:"C6EF",36215:"C6F0",23682:"C6F1",20062:"C6F2",20225:"C6F3",21551:"C6F4",22865:"C6F5",30732:"C6F6",22120:"C6F7",27668:"C6F8",36804:"C6F9",24323:"C6FA",27773:"C6FB",27875:"C6FC",35755:"C6FD",25488:"C6FE",24688:"C7A1",27965:"C7A2",29301:"C7A3",25190:"C7A4",38030:"C7A5",38085:"C7A6",21315:"C7A7",36801:"C7A8",31614:"C7A9",20191:"C7AA",35878:"C7AB",20094:"C7AC",40660:"C7AD",38065:"C7AE",38067:"C7AF",21069:"C7B0",28508:"C7B1",36963:"C7B2",27973:"C7B3",35892:"C7B4",22545:"C7B5",23884:"C7B6",27424:"C7B7",27465:"C7B8",26538:"C7B9",21595:"C7BA",33108:"C7BB",32652:"C7BC",22681:"C7BD",34103:"C7BE",24378:"C7BF",25250:"C7C0",27207:"C7C1",38201:"C7C2",25970:"C7C3",24708:"C7C4",26725:"C7C5",30631:"C7C6",20052:"C7C7",20392:"C7C8",24039:"C7C9",38808:"C7CA",25772:"C7CB",32728:"C7CC",23789:"C7CD",20431:"C7CE",31373:"C7CF",20999:"C7D0",33540:"C7D1",19988:"C7D2",24623:"C7D3",31363:"C7D4",38054:"C7D5",20405:"C7D6",20146:"C7D7",31206:"C7D8",29748:"C7D9",21220:"C7DA",33465:"C7DB",25810:"C7DC",31165:"C7DD",23517:"C7DE",27777:"C7DF",38738:"C7E0",36731:"C7E1",27682:"C7E2",20542:"C7E3",21375:"C7E4",28165:"C7E5",25806:"C7E6",26228:"C7E7",27696:"C7E8",24773:"C7E9",39031:"C7EA",35831:"C7EB",24198:"C7EC",29756:"C7ED",31351:"C7EE",31179:"C7EF",19992:"C7F0",37041:"C7F1",29699:"C7F2",27714:"C7F3",22234:"C7F4",37195:"C7F5",27845:"C7F6",36235:"C7F7",21306:"C7F8",34502:"C7F9",26354:"C7FA",36527:"C7FB",23624:"C7FC",39537:"C7FD",28192:"C7FE",21462:"C8A1",23094:"C8A2",40843:"C8A3",36259:"C8A4",21435:"C8A5",22280:"C8A6",39079:"C8A7",26435:"C8A8",37275:"C8A9",27849:"C8AA",20840:"C8AB",30154:"C8AC",25331:"C8AD",29356:"C8AE",21048:"C8AF",21149:"C8B0",32570:"C8B1",28820:"C8B2",30264:"C8B3",21364:"C8B4",40522:"C8B5",27063:"C8B6",30830:"C8B7",38592:"C8B8",35033:"C8B9",32676:"C8BA",28982:"C8BB",29123:"C8BC",20873:"C8BD",26579:"C8BE",29924:"C8BF",22756:"C8C0",25880:"C8C1",22199:"C8C2",35753:"C8C3",39286:"C8C4",25200:"C8C5",32469:"C8C6",24825:"C8C7",28909:"C8C8",22764:"C8C9",20161:"C8CA",20154:"C8CB",24525:"C8CC",38887:"C8CD",20219:"C8CE",35748:"C8CF",20995:"C8D0",22922:"C8D1",32427:"C8D2",25172:"C8D3",20173:"C8D4",26085:"C8D5",25102:"C8D6",33592:"C8D7",33993:"C8D8",33635:"C8D9",34701:"C8DA",29076:"C8DB",28342:"C8DC",23481:"C8DD",32466:"C8DE",20887:"C8DF",25545:"C8E0",26580:"C8E1",32905:"C8E2",33593:"C8E3",34837:"C8E4",20754:"C8E5",23418:"C8E6",22914:"C8E7",36785:"C8E8",20083:"C8E9",27741:"C8EA",20837:"C8EB",35109:"C8EC",36719:"C8ED",38446:"C8EE",34122:"C8EF",29790:"C8F0",38160:"C8F1",38384:"C8F2",28070:"C8F3",33509:"C8F4",24369:"C8F5",25746:"C8F6",27922:"C8F7",33832:"C8F8",33134:"C8F9",40131:"C8FA",22622:"C8FB",36187:"C8FC",19977:"C8FD",21441:"C8FE",20254:"C9A1",25955:"C9A2",26705:"C9A3",21971:"C9A4",20007:"C9A5",25620:"C9A6",39578:"C9A7",25195:"C9A8",23234:"C9A9",29791:"C9AA",33394:"C9AB",28073:"C9AC",26862:"C9AD",20711:"C9AE",33678:"C9AF",30722:"C9B0",26432:"C9B1",21049:"C9B2",27801:"C9B3",32433:"C9B4",20667:"C9B5",21861:"C9B6",29022:"C9B7",31579:"C9B8",26194:"C9B9",29642:"C9BA",33515:"C9BB",26441:"C9BC",23665:"C9BD",21024:"C9BE",29053:"C9BF",34923:"C9C0",38378:"C9C1",38485:"C9C2",25797:"C9C3",36193:"C9C4",33203:"C9C5",21892:"C9C6",27733:"C9C7",25159:"C9C8",32558:"C9C9",22674:"C9CA",20260:"C9CB",21830:"C9CC",36175:"C9CD",26188:"C9CE",19978:"C9CF",23578:"C9D0",35059:"C9D1",26786:"C9D2",25422:"C9D3",31245:"C9D4",28903:"C9D5",33421:"C9D6",21242:"C9D7",38902:"C9D8",23569:"C9D9",21736:"C9DA",37045:"C9DB",32461:"C9DC",22882:"C9DD",36170:"C9DE",34503:"C9DF",33292:"C9E0",33293:"C9E1",36198:"C9E2",25668:"C9E3",23556:"C9E4",24913:"C9E5",28041:"C9E6",31038:"C9E7",35774:"C9E8",30775:"C9E9",30003:"C9EA",21627:"C9EB",20280:"C9EC",36523:"C9ED",28145:"C9EE",23072:"C9EF",32453:"C9F0",31070:"C9F1",27784:"C9F2",23457:"C9F3",23158:"C9F4",29978:"C9F5",32958:"C9F6",24910:"C9F7",28183:"C9F8",22768:"C9F9",29983:"C9FA",29989:"C9FB",29298:"C9FC",21319:"C9FD",32499:"C9FE",30465:"CAA1",30427:"CAA2",21097:"CAA3",32988:"CAA4",22307:"CAA5",24072:"CAA6",22833:"CAA7",29422:"CAA8",26045:"CAA9",28287:"CAAA",35799:"CAAB",23608:"CAAC",34417:"CAAD",21313:"CAAE",30707:"CAAF",25342:"CAB0",26102:"CAB1",20160:"CAB2",39135:"CAB3",34432:"CAB4",23454:"CAB5",35782:"CAB6",21490:"CAB7",30690:"CAB8",20351:"CAB9",23630:"CABA",39542:"CABB",22987:"CABC",24335:"CABD",31034:"CABE",22763:"CABF",19990:"CAC0",26623:"CAC1",20107:"CAC2",25325:"CAC3",35475:"CAC4",36893:"CAC5",21183:"CAC6",26159:"CAC7",21980:"CAC8",22124:"CAC9",36866:"CACA",20181:"CACB",20365:"CACC",37322:"CACD",39280:"CACE",27663:"CACF",24066:"CAD0",24643:"CAD1",23460:"CAD2",35270:"CAD3",35797:"CAD4",25910:"CAD5",25163:"CAD6",39318:"CAD7",23432:"CAD8",23551:"CAD9",25480:"CADA",21806:"CADB",21463:"CADC",30246:"CADD",20861:"CADE",34092:"CADF",26530:"CAE0",26803:"CAE1",27530:"CAE2",25234:"CAE3",36755:"CAE4",21460:"CAE5",33298:"CAE6",28113:"CAE7",30095:"CAE8",20070:"CAE9",36174:"CAEA",23408:"CAEB",29087:"CAEC",34223:"CAED",26257:"CAEE",26329:"CAEF",32626:"CAF0",34560:"CAF1",40653:"CAF2",40736:"CAF3",23646:"CAF4",26415:"CAF5",36848:"CAF6",26641:"CAF7",26463:"CAF8",25101:"CAF9",31446:"CAFA",22661:"CAFB",24246:"CAFC",25968:"CAFD",28465:"CAFE",24661:"CBA1",21047:"CBA2",32781:"CBA3",25684:"CBA4",34928:"CBA5",29993:"CBA6",24069:"CBA7",26643:"CBA8",25332:"CBA9",38684:"CBAA",21452:"CBAB",29245:"CBAC",35841:"CBAD",27700:"CBAE",30561:"CBAF",31246:"CBB0",21550:"CBB1",30636:"CBB2",39034:"CBB3",33308:"CBB4",35828:"CBB5",30805:"CBB6",26388:"CBB7",28865:"CBB8",26031:"CBB9",25749:"CBBA",22070:"CBBB",24605:"CBBC",31169:"CBBD",21496:"CBBE",19997:"CBBF",27515:"CBC0",32902:"CBC1",23546:"CBC2",21987:"CBC3",22235:"CBC4",20282:"CBC5",20284:"CBC6",39282:"CBC7",24051:"CBC8",26494:"CBC9",32824:"CBCA",24578:"CBCB",39042:"CBCC",36865:"CBCD",23435:"CBCE",35772:"CBCF",35829:"CBD0",25628:"CBD1",33368:"CBD2",25822:"CBD3",22013:"CBD4",33487:"CBD5",37221:"CBD6",20439:"CBD7",32032:"CBD8",36895:"CBD9",31903:"CBDA",20723:"CBDB",22609:"CBDC",28335:"CBDD",23487:"CBDE",35785:"CBDF",32899:"CBE0",37240:"CBE1",33948:"CBE2",31639:"CBE3",34429:"CBE4",38539:"CBE5",38543:"CBE6",32485:"CBE7",39635:"CBE8",30862:"CBE9",23681:"CBEA",31319:"CBEB",36930:"CBEC",38567:"CBED",31071:"CBEE",23385:"CBEF",25439:"CBF0",31499:"CBF1",34001:"CBF2",26797:"CBF3",21766:"CBF4",32553:"CBF5",29712:"CBF6",32034:"CBF7",38145:"CBF8",25152:"CBF9",22604:"CBFA",20182:"CBFB",23427:"CBFC",22905:"CBFD",22612:"CBFE",29549:"CCA1",25374:"CCA2",36427:"CCA3",36367:"CCA4",32974:"CCA5",33492:"CCA6",25260:"CCA7",21488:"CCA8",27888:"CCA9",37214:"CCAA",22826:"CCAB",24577:"CCAC",27760:"CCAD",22349:"CCAE",25674:"CCAF",36138:"CCB0",30251:"CCB1",28393:"CCB2",22363:"CCB3",27264:"CCB4",30192:"CCB5",28525:"CCB6",35885:"CCB7",35848:"CCB8",22374:"CCB9",27631:"CCBA",34962:"CCBB",30899:"CCBC",25506:"CCBD",21497:"CCBE",28845:"CCBF",27748:"CCC0",22616:"CCC1",25642:"CCC2",22530:"CCC3",26848:"CCC4",33179:"CCC5",21776:"CCC6",31958:"CCC7",20504:"CCC8",36538:"CCC9",28108:"CCCA",36255:"CCCB",28907:"CCCC",25487:"CCCD",28059:"CCCE",28372:"CCCF",32486:"CCD0",33796:"CCD1",26691:"CCD2",36867:"CCD3",28120:"CCD4",38518:"CCD5",35752:"CCD6",22871:"CCD7",29305:"CCD8",34276:"CCD9",33150:"CCDA",30140:"CCDB",35466:"CCDC",26799:"CCDD",21076:"CCDE",36386:"CCDF",38161:"CCE0",25552:"CCE1",39064:"CCE2",36420:"CCE3",21884:"CCE4",20307:"CCE5",26367:"CCE6",22159:"CCE7",24789:"CCE8",28053:"CCE9",21059:"CCEA",23625:"CCEB",22825:"CCEC",28155:"CCED",22635:"CCEE",3e4:"CCEF",29980:"CCF0",24684:"CCF1",33300:"CCF2",33094:"CCF3",25361:"CCF4",26465:"CCF5",36834:"CCF6",30522:"CCF7",36339:"CCF8",36148:"CCF9",38081:"CCFA",24086:"CCFB",21381:"CCFC",21548:"CCFD",28867:"CCFE",27712:"CDA1",24311:"CDA2",20572:"CDA3",20141:"CDA4",24237:"CDA5",25402:"CDA6",33351:"CDA7",36890:"CDA8",26704:"CDA9",37230:"CDAA",30643:"CDAB",21516:"CDAC",38108:"CDAD",24420:"CDAE",31461:"CDAF",26742:"CDB0",25413:"CDB1",31570:"CDB2",32479:"CDB3",30171:"CDB4",20599:"CDB5",25237:"CDB6",22836:"CDB7",36879:"CDB8",20984:"CDB9",31171:"CDBA",31361:"CDBB",22270:"CDBC",24466:"CDBD",36884:"CDBE",28034:"CDBF",23648:"CDC0",22303:"CDC1",21520:"CDC2",20820:"CDC3",28237:"CDC4",22242:"CDC5",25512:"CDC6",39059:"CDC7",33151:"CDC8",34581:"CDC9",35114:"CDCA",36864:"CDCB",21534:"CDCC",23663:"CDCD",33216:"CDCE",25302:"CDCF",25176:"CDD0",33073:"CDD1",40501:"CDD2",38464:"CDD3",39534:"CDD4",39548:"CDD5",26925:"CDD6",22949:"CDD7",25299:"CDD8",21822:"CDD9",25366:"CDDA",21703:"CDDB",34521:"CDDC",27964:"CDDD",23043:"CDDE",29926:"CDDF",34972:"CDE0",27498:"CDE1",22806:"CDE2",35916:"CDE3",24367:"CDE4",28286:"CDE5",29609:"CDE6",39037:"CDE7",20024:"CDE8",28919:"CDE9",23436:"CDEA",30871:"CDEB",25405:"CDEC",26202:"CDED",30358:"CDEE",24779:"CDEF",23451:"CDF0",23113:"CDF1",19975:"CDF2",33109:"CDF3",27754:"CDF4",29579:"CDF5",20129:"CDF6",26505:"CDF7",32593:"CDF8",24448:"CDF9",26106:"CDFA",26395:"CDFB",24536:"CDFC",22916:"CDFD",23041:"CDFE",24013:"CEA1",24494:"CEA2",21361:"CEA3",38886:"CEA4",36829:"CEA5",26693:"CEA6",22260:"CEA7",21807:"CEA8",24799:"CEA9",20026:"CEAA",28493:"CEAB",32500:"CEAC",33479:"CEAD",33806:"CEAE",22996:"CEAF",20255:"CEB0",20266:"CEB1",23614:"CEB2",32428:"CEB3",26410:"CEB4",34074:"CEB5",21619:"CEB6",30031:"CEB7",32963:"CEB8",21890:"CEB9",39759:"CEBA",20301:"CEBB",28205:"CEBC",35859:"CEBD",23561:"CEBE",24944:"CEBF",21355:"CEC0",30239:"CEC1",28201:"CEC2",34442:"CEC3",25991:"CEC4",38395:"CEC5",32441:"CEC6",21563:"CEC7",31283:"CEC8",32010:"CEC9",38382:"CECA",21985:"CECB",32705:"CECC",29934:"CECD",25373:"CECE",34583:"CECF",28065:"CED0",31389:"CED1",25105:"CED2",26017:"CED3",21351:"CED4",25569:"CED5",27779:"CED6",24043:"CED7",21596:"CED8",38056:"CED9",20044:"CEDA",27745:"CEDB",35820:"CEDC",23627:"CEDD",26080:"CEDE",33436:"CEDF",26791:"CEE0",21566:"CEE1",21556:"CEE2",27595:"CEE3",27494:"CEE4",20116:"CEE5",25410:"CEE6",21320:"CEE7",33310:"CEE8",20237:"CEE9",20398:"CEEA",22366:"CEEB",25098:"CEEC",38654:"CEED",26212:"CEEE",29289:"CEEF",21247:"CEF0",21153:"CEF1",24735:"CEF2",35823:"CEF3",26132:"CEF4",29081:"CEF5",26512:"CEF6",35199:"CEF7",30802:"CEF8",30717:"CEF9",26224:"CEFA",22075:"CEFB",21560:"CEFC",38177:"CEFD",29306:"CEFE",31232:"CFA1",24687:"CFA2",24076:"CFA3",24713:"CFA4",33181:"CFA5",22805:"CFA6",24796:"CFA7",29060:"CFA8",28911:"CFA9",28330:"CFAA",27728:"CFAB",29312:"CFAC",27268:"CFAD",34989:"CFAE",24109:"CFAF",20064:"CFB0",23219:"CFB1",21916:"CFB2",38115:"CFB3",27927:"CFB4",31995:"CFB5",38553:"CFB6",25103:"CFB7",32454:"CFB8",30606:"CFB9",34430:"CFBA",21283:"CFBB",38686:"CFBC",36758:"CFBD",26247:"CFBE",23777:"CFBF",20384:"CFC0",29421:"CFC1",19979:"CFC2",21414:"CFC3",22799:"CFC4",21523:"CFC5",25472:"CFC6",38184:"CFC7",20808:"CFC8",20185:"CFC9",40092:"CFCA",32420:"CFCB",21688:"CFCC",36132:"CFCD",34900:"CFCE",33335:"CFCF",38386:"CFD0",28046:"CFD1",24358:"CFD2",23244:"CFD3",26174:"CFD4",38505:"CFD5",29616:"CFD6",29486:"CFD7",21439:"CFD8",33146:"CFD9",39301:"CFDA",32673:"CFDB",23466:"CFDC",38519:"CFDD",38480:"CFDE",32447:"CFDF",30456:"CFE0",21410:"CFE1",38262:"CFE2",39321:"CFE3",31665:"CFE4",35140:"CFE5",28248:"CFE6",20065:"CFE7",32724:"CFE8",31077:"CFE9",35814:"CFEA",24819:"CFEB",21709:"CFEC",20139:"CFED",39033:"CFEE",24055:"CFEF",27233:"CFF0",20687:"CFF1",21521:"CFF2",35937:"CFF3",33831:"CFF4",30813:"CFF5",38660:"CFF6",21066:"CFF7",21742:"CFF8",22179:"CFF9",38144:"CFFA",28040:"CFFB",23477:"CFFC",28102:"CFFD",26195:"CFFE",23567:"D0A1",23389:"D0A2",26657:"D0A3",32918:"D0A4",21880:"D0A5",31505:"D0A6",25928:"D0A7",26964:"D0A8",20123:"D0A9",27463:"D0AA",34638:"D0AB",38795:"D0AC",21327:"D0AD",25375:"D0AE",25658:"D0AF",37034:"D0B0",26012:"D0B1",32961:"D0B2",35856:"D0B3",20889:"D0B4",26800:"D0B5",21368:"D0B6",34809:"D0B7",25032:"D0B8",27844:"D0B9",27899:"D0BA",35874:"D0BB",23633:"D0BC",34218:"D0BD",33455:"D0BE",38156:"D0BF",27427:"D0C0",36763:"D0C1",26032:"D0C2",24571:"D0C3",24515:"D0C4",20449:"D0C5",34885:"D0C6",26143:"D0C7",33125:"D0C8",29481:"D0C9",24826:"D0CA",20852:"D0CB",21009:"D0CC",22411:"D0CD",24418:"D0CE",37026:"D0CF",34892:"D0D0",37266:"D0D1",24184:"D0D2",26447:"D0D3",24615:"D0D4",22995:"D0D5",20804:"D0D6",20982:"D0D7",33016:"D0D8",21256:"D0D9",27769:"D0DA",38596:"D0DB",29066:"D0DC",20241:"D0DD",20462:"D0DE",32670:"D0DF",26429:"D0E0",21957:"D0E1",38152:"D0E2",31168:"D0E3",34966:"D0E4",32483:"D0E5",22687:"D0E6",25100:"D0E7",38656:"D0E8",34394:"D0E9",22040:"D0EA",39035:"D0EB",24464:"D0EC",35768:"D0ED",33988:"D0EE",37207:"D0EF",21465:"D0F0",26093:"D0F1",24207:"D0F2",30044:"D0F3",24676:"D0F4",32110:"D0F5",23167:"D0F6",32490:"D0F7",32493:"D0F8",36713:"D0F9",21927:"D0FA",23459:"D0FB",24748:"D0FC",26059:"D0FD",29572:"D0FE",36873:"D1A1",30307:"D1A2",30505:"D1A3",32474:"D1A4",38772:"D1A5",34203:"D1A6",23398:"D1A7",31348:"D1A8",38634:"D1A9",34880:"D1AA",21195:"D1AB",29071:"D1AC",24490:"D1AD",26092:"D1AE",35810:"D1AF",23547:"D1B0",39535:"D1B1",24033:"D1B2",27529:"D1B3",27739:"D1B4",35757:"D1B5",35759:"D1B6",36874:"D1B7",36805:"D1B8",21387:"D1B9",25276:"D1BA",40486:"D1BB",40493:"D1BC",21568:"D1BD",20011:"D1BE",33469:"D1BF",29273:"D1C0",34460:"D1C1",23830:"D1C2",34905:"D1C3",28079:"D1C4",38597:"D1C5",21713:"D1C6",20122:"D1C7",35766:"D1C8",28937:"D1C9",21693:"D1CA",38409:"D1CB",28895:"D1CC",28153:"D1CD",30416:"D1CE",20005:"D1CF",30740:"D1D0",34578:"D1D1",23721:"D1D2",24310:"D1D3",35328:"D1D4",39068:"D1D5",38414:"D1D6",28814:"D1D7",27839:"D1D8",22852:"D1D9",25513:"D1DA",30524:"D1DB",34893:"D1DC",28436:"D1DD",33395:"D1DE",22576:"D1DF",29141:"D1E0",21388:"D1E1",30746:"D1E2",38593:"D1E3",21761:"D1E4",24422:"D1E5",28976:"D1E6",23476:"D1E7",35866:"D1E8",39564:"D1E9",27523:"D1EA",22830:"D1EB",40495:"D1EC",31207:"D1ED",26472:"D1EE",25196:"D1EF",20335:"D1F0",30113:"D1F1",32650:"D1F2",27915:"D1F3",38451:"D1F4",27687:"D1F5",20208:"D1F6",30162:"D1F7",20859:"D1F8",26679:"D1F9",28478:"D1FA",36992:"D1FB",33136:"D1FC",22934:"D1FD",29814:"D1FE",25671:"D2A1",23591:"D2A2",36965:"D2A3",31377:"D2A4",35875:"D2A5",23002:"D2A6",21676:"D2A7",33280:"D2A8",33647:"D2A9",35201:"D2AA",32768:"D2AB",26928:"D2AC",22094:"D2AD",32822:"D2AE",29239:"D2AF",37326:"D2B0",20918:"D2B1",20063:"D2B2",39029:"D2B3",25494:"D2B4",19994:"D2B5",21494:"D2B6",26355:"D2B7",33099:"D2B8",22812:"D2B9",28082:"D2BA",19968:"D2BB",22777:"D2BC",21307:"D2BD",25558:"D2BE",38129:"D2BF",20381:"D2C0",20234:"D2C1",34915:"D2C2",39056:"D2C3",22839:"D2C4",36951:"D2C5",31227:"D2C6",20202:"D2C7",33008:"D2C8",30097:"D2C9",27778:"D2CA",23452:"D2CB",23016:"D2CC",24413:"D2CD",26885:"D2CE",34433:"D2CF",20506:"D2D0",24050:"D2D1",20057:"D2D2",30691:"D2D3",20197:"D2D4",33402:"D2D5",25233:"D2D6",26131:"D2D7",37009:"D2D8",23673:"D2D9",20159:"D2DA",24441:"D2DB",33222:"D2DC",36920:"D2DD",32900:"D2DE",30123:"D2DF",20134:"D2E0",35028:"D2E1",24847:"D2E2",27589:"D2E3",24518:"D2E4",20041:"D2E5",30410:"D2E6",28322:"D2E7",35811:"D2E8",35758:"D2E9",35850:"D2EA",35793:"D2EB",24322:"D2EC",32764:"D2ED",32716:"D2EE",32462:"D2EF",33589:"D2F0",33643:"D2F1",22240:"D2F2",27575:"D2F3",38899:"D2F4",38452:"D2F5",23035:"D2F6",21535:"D2F7",38134:"D2F8",28139:"D2F9",23493:"D2FA",39278:"D2FB",23609:"D2FC",24341:"D2FD",38544:"D2FE",21360:"D3A1",33521:"D3A2",27185:"D3A3",23156:"D3A4",40560:"D3A5",24212:"D3A6",32552:"D3A7",33721:"D3A8",33828:"D3A9",33829:"D3AA",33639:"D3AB",34631:"D3AC",36814:"D3AD",36194:"D3AE",30408:"D3AF",24433:"D3B0",39062:"D3B1",30828:"D3B2",26144:"D3B3",21727:"D3B4",25317:"D3B5",20323:"D3B6",33219:"D3B7",30152:"D3B8",24248:"D3B9",38605:"D3BA",36362:"D3BB",34553:"D3BC",21647:"D3BD",27891:"D3BE",28044:"D3BF",27704:"D3C0",24703:"D3C1",21191:"D3C2",29992:"D3C3",24189:"D3C4",20248:"D3C5",24736:"D3C6",24551:"D3C7",23588:"D3C8",30001:"D3C9",37038:"D3CA",38080:"D3CB",29369:"D3CC",27833:"D3CD",28216:"D3CE",37193:"D3CF",26377:"D3D0",21451:"D3D1",21491:"D3D2",20305:"D3D3",37321:"D3D4",35825:"D3D5",21448:"D3D6",24188:"D3D7",36802:"D3D8",28132:"D3D9",20110:"D3DA",30402:"D3DB",27014:"D3DC",34398:"D3DD",24858:"D3DE",33286:"D3DF",20313:"D3E0",20446:"D3E1",36926:"D3E2",40060:"D3E3",24841:"D3E4",28189:"D3E5",28180:"D3E6",38533:"D3E7",20104:"D3E8",23089:"D3E9",38632:"D3EA",19982:"D3EB",23679:"D3EC",31161:"D3ED",23431:"D3EE",35821:"D3EF",32701:"D3F0",29577:"D3F1",22495:"D3F2",33419:"D3F3",37057:"D3F4",21505:"D3F5",36935:"D3F6",21947:"D3F7",23786:"D3F8",24481:"D3F9",24840:"D3FA",27442:"D3FB",29425:"D3FC",32946:"D3FD",35465:"D3FE",28020:"D4A1",23507:"D4A2",35029:"D4A3",39044:"D4A4",35947:"D4A5",39533:"D4A6",40499:"D4A7",28170:"D4A8",20900:"D4A9",20803:"D4AA",22435:"D4AB",34945:"D4AC",21407:"D4AD",25588:"D4AE",36757:"D4AF",22253:"D4B0",21592:"D4B1",22278:"D4B2",29503:"D4B3",28304:"D4B4",32536:"D4B5",36828:"D4B6",33489:"D4B7",24895:"D4B8",24616:"D4B9",38498:"D4BA",26352:"D4BB",32422:"D4BC",36234:"D4BD",36291:"D4BE",38053:"D4BF",23731:"D4C0",31908:"D4C1",26376:"D4C2",24742:"D4C3",38405:"D4C4",32792:"D4C5",20113:"D4C6",37095:"D4C7",21248:"D4C8",38504:"D4C9",20801:"D4CA",36816:"D4CB",34164:"D4CC",37213:"D4CD",26197:"D4CE",38901:"D4CF",23381:"D4D0",21277:"D4D1",30776:"D4D2",26434:"D4D3",26685:"D4D4",21705:"D4D5",28798:"D4D6",23472:"D4D7",36733:"D4D8",20877:"D4D9",22312:"D4DA",21681:"D4DB",25874:"D4DC",26242:"D4DD",36190:"D4DE",36163:"D4DF",33039:"D4E0",33900:"D4E1",36973:"D4E2",31967:"D4E3",20991:"D4E4",34299:"D4E5",26531:"D4E6",26089:"D4E7",28577:"D4E8",34468:"D4E9",36481:"D4EA",22122:"D4EB",36896:"D4EC",30338:"D4ED",28790:"D4EE",29157:"D4EF",36131:"D4F0",25321:"D4F1",21017:"D4F2",27901:"D4F3",36156:"D4F4",24590:"D4F5",22686:"D4F6",24974:"D4F7",26366:"D4F8",36192:"D4F9",25166:"D4FA",21939:"D4FB",28195:"D4FC",26413:"D4FD",36711:"D4FE",38113:"D5A1",38392:"D5A2",30504:"D5A3",26629:"D5A4",27048:"D5A5",21643:"D5A6",20045:"D5A7",28856:"D5A8",35784:"D5A9",25688:"D5AA",25995:"D5AB",23429:"D5AC",31364:"D5AD",20538:"D5AE",23528:"D5AF",30651:"D5B0",27617:"D5B1",35449:"D5B2",31896:"D5B3",27838:"D5B4",30415:"D5B5",26025:"D5B6",36759:"D5B7",23853:"D5B8",23637:"D5B9",34360:"D5BA",26632:"D5BB",21344:"D5BC",25112:"D5BD",31449:"D5BE",28251:"D5BF",32509:"D5C0",27167:"D5C1",31456:"D5C2",24432:"D5C3",28467:"D5C4",24352:"D5C5",25484:"D5C6",28072:"D5C7",26454:"D5C8",19976:"D5C9",24080:"D5CA",36134:"D5CB",20183:"D5CC",32960:"D5CD",30260:"D5CE",38556:"D5CF",25307:"D5D0",26157:"D5D1",25214:"D5D2",27836:"D5D3",36213:"D5D4",29031:"D5D5",32617:"D5D6",20806:"D5D7",32903:"D5D8",21484:"D5D9",36974:"D5DA",25240:"D5DB",21746:"D5DC",34544:"D5DD",36761:"D5DE",32773:"D5DF",38167:"D5E0",34071:"D5E1",36825:"D5E2",27993:"D5E3",29645:"D5E4",26015:"D5E5",30495:"D5E6",29956:"D5E7",30759:"D5E8",33275:"D5E9",36126:"D5EA",38024:"D5EB",20390:"D5EC",26517:"D5ED",30137:"D5EE",35786:"D5EF",38663:"D5F0",25391:"D5F1",38215:"D5F2",38453:"D5F3",33976:"D5F4",25379:"D5F5",30529:"D5F6",24449:"D5F7",29424:"D5F8",20105:"D5F9",24596:"D5FA",25972:"D5FB",25327:"D5FC",27491:"D5FD",25919:"D5FE",24103:"D6A1",30151:"D6A2",37073:"D6A3",35777:"D6A4",33437:"D6A5",26525:"D6A6",25903:"D6A7",21553:"D6A8",34584:"D6A9",30693:"D6AA",32930:"D6AB",33026:"D6AC",27713:"D6AD",20043:"D6AE",32455:"D6AF",32844:"D6B0",30452:"D6B1",26893:"D6B2",27542:"D6B3",25191:"D6B4",20540:"D6B5",20356:"D6B6",22336:"D6B7",25351:"D6B8",27490:"D6B9",36286:"D6BA",21482:"D6BB",26088:"D6BC",32440:"D6BD",24535:"D6BE",25370:"D6BF",25527:"D6C0",33267:"D6C1",33268:"D6C2",32622:"D6C3",24092:"D6C4",23769:"D6C5",21046:"D6C6",26234:"D6C7",31209:"D6C8",31258:"D6C9",36136:"D6CA",28825:"D6CB",30164:"D6CC",28382:"D6CD",27835:"D6CE",31378:"D6CF",20013:"D6D0",30405:"D6D1",24544:"D6D2",38047:"D6D3",34935:"D6D4",32456:"D6D5",31181:"D6D6",32959:"D6D7",37325:"D6D8",20210:"D6D9",20247:"D6DA",33311:"D6DB",21608:"D6DC",24030:"D6DD",27954:"D6DE",35788:"D6DF",31909:"D6E0",36724:"D6E1",32920:"D6E2",24090:"D6E3",21650:"D6E4",30385:"D6E5",23449:"D6E6",26172:"D6E7",39588:"D6E8",29664:"D6E9",26666:"D6EA",34523:"D6EB",26417:"D6EC",29482:"D6ED",35832:"D6EE",35803:"D6EF",36880:"D6F0",31481:"D6F1",28891:"D6F2",29038:"D6F3",25284:"D6F4",30633:"D6F5",22065:"D6F6",20027:"D6F7",33879:"D6F8",26609:"D6F9",21161:"D6FA",34496:"D6FB",36142:"D6FC",38136:"D6FD",31569:"D6FE",20303:"D7A1",27880:"D7A2",31069:"D7A3",39547:"D7A4",25235:"D7A5",29226:"D7A6",25341:"D7A7",19987:"D7A8",30742:"D7A9",36716:"D7AA",25776:"D7AB",36186:"D7AC",31686:"D7AD",26729:"D7AE",24196:"D7AF",35013:"D7B0",22918:"D7B1",25758:"D7B2",22766:"D7B3",29366:"D7B4",26894:"D7B5",38181:"D7B6",36861:"D7B7",36184:"D7B8",22368:"D7B9",32512:"D7BA",35846:"D7BB",20934:"D7BC",25417:"D7BD",25305:"D7BE",21331:"D7BF",26700:"D7C0",29730:"D7C1",33537:"D7C2",37196:"D7C3",21828:"D7C4",30528:"D7C5",28796:"D7C6",27978:"D7C7",20857:"D7C8",21672:"D7C9",36164:"D7CA",23039:"D7CB",28363:"D7CC",28100:"D7CD",23388:"D7CE",32043:"D7CF",20180:"D7D0",31869:"D7D1",28371:"D7D2",23376:"D7D3",33258:"D7D4",28173:"D7D5",23383:"D7D6",39683:"D7D7",26837:"D7D8",36394:"D7D9",23447:"D7DA",32508:"D7DB",24635:"D7DC",32437:"D7DD",37049:"D7DE",36208:"D7DF",22863:"D7E0",25549:"D7E1",31199:"D7E2",36275:"D7E3",21330:"D7E4",26063:"D7E5",31062:"D7E6",35781:"D7E7",38459:"D7E8",32452:"D7E9",38075:"D7EA",32386:"D7EB",22068:"D7EC",37257:"D7ED",26368:"D7EE",32618:"D7EF",23562:"D7F0",36981:"D7F1",26152:"D7F2",24038:"D7F3",20304:"D7F4",26590:"D7F5",20570:"D7F6",20316:"D7F7",22352:"D7F8",24231:"D7F9",20109:"D8A1",19980:"D8A2",20800:"D8A3",19984:"D8A4",24319:"D8A5",21317:"D8A6",19989:"D8A7",20120:"D8A8",19998:"D8A9",39730:"D8AA",23404:"D8AB",22121:"D8AC",20008:"D8AD",31162:"D8AE",20031:"D8AF",21269:"D8B0",20039:"D8B1",22829:"D8B2",29243:"D8B3",21358:"D8B4",27664:"D8B5",22239:"D8B6",32996:"D8B7",39319:"D8B8",27603:"D8B9",30590:"D8BA",40727:"D8BB",20022:"D8BC",20127:"D8BD",40720:"D8BE",20060:"D8BF",20073:"D8C0",20115:"D8C1",33416:"D8C2",23387:"D8C3",21868:"D8C4",22031:"D8C5",20164:"D8C6",21389:"D8C7",21405:"D8C8",21411:"D8C9",21413:"D8CA",21422:"D8CB",38757:"D8CC",36189:"D8CD",21274:"D8CE",21493:"D8CF",21286:"D8D0",21294:"D8D1",21310:"D8D2",36188:"D8D3",21350:"D8D4",21347:"D8D5",20994:"D8D6",21e3:"D8D7",21006:"D8D8",21037:"D8D9",21043:"D8DA",21055:"D8DB",21056:"D8DC",21068:"D8DD",21086:"D8DE",21089:"D8DF",21084:"D8E0",33967:"D8E1",21117:"D8E2",21122:"D8E3",21121:"D8E4",21136:"D8E5",21139:"D8E6",20866:"D8E7",32596:"D8E8",20155:"D8E9",20163:"D8EA",20169:"D8EB",20162:"D8EC",20200:"D8ED",20193:"D8EE",20203:"D8EF",20190:"D8F0",20251:"D8F1",20211:"D8F2",20258:"D8F3",20324:"D8F4",20213:"D8F5",20261:"D8F6",20263:"D8F7",20233:"D8F8",20267:"D8F9",20318:"D8FA",20327:"D8FB",25912:"D8FC",20314:"D8FD",20317:"D8FE",20319:"D9A1",20311:"D9A2",20274:"D9A3",20285:"D9A4",20342:"D9A5",20340:"D9A6",20369:"D9A7",20361:"D9A8",20355:"D9A9",20367:"D9AA",20350:"D9AB",20347:"D9AC",20394:"D9AD",20348:"D9AE",20396:"D9AF",20372:"D9B0",20454:"D9B1",20456:"D9B2",20458:"D9B3",20421:"D9B4",20442:"D9B5",20451:"D9B6",20444:"D9B7",20433:"D9B8",20447:"D9B9",20472:"D9BA",20521:"D9BB",20556:"D9BC",20467:"D9BD",20524:"D9BE",20495:"D9BF",20526:"D9C0",20525:"D9C1",20478:"D9C2",20508:"D9C3",20492:"D9C4",20517:"D9C5",20520:"D9C6",20606:"D9C7",20547:"D9C8",20565:"D9C9",20552:"D9CA",20558:"D9CB",20588:"D9CC",20603:"D9CD",20645:"D9CE",20647:"D9CF",20649:"D9D0",20666:"D9D1",20694:"D9D2",20742:"D9D3",20717:"D9D4",20716:"D9D5",20710:"D9D6",20718:"D9D7",20743:"D9D8",20747:"D9D9",20189:"D9DA",27709:"D9DB",20312:"D9DC",20325:"D9DD",20430:"D9DE",40864:"D9DF",27718:"D9E0",31860:"D9E1",20846:"D9E2",24061:"D9E3",40649:"D9E4",39320:"D9E5",20865:"D9E6",22804:"D9E7",21241:"D9E8",21261:"D9E9",35335:"D9EA",21264:"D9EB",20971:"D9EC",22809:"D9ED",20821:"D9EE",20128:"D9EF",20822:"D9F0",20147:"D9F1",34926:"D9F2",34980:"D9F3",20149:"D9F4",33044:"D9F5",35026:"D9F6",31104:"D9F7",23348:"D9F8",34819:"D9F9",32696:"D9FA",20907:"D9FB",20913:"D9FC",20925:"D9FD",20924:"D9FE",20935:"DAA1",20886:"DAA2",20898:"DAA3",20901:"DAA4",35744:"DAA5",35750:"DAA6",35751:"DAA7",35754:"DAA8",35764:"DAA9",35765:"DAAA",35767:"DAAB",35778:"DAAC",35779:"DAAD",35787:"DAAE",35791:"DAAF",35790:"DAB0",35794:"DAB1",35795:"DAB2",35796:"DAB3",35798:"DAB4",35800:"DAB5",35801:"DAB6",35804:"DAB7",35807:"DAB8",35808:"DAB9",35812:"DABA",35816:"DABB",35817:"DABC",35822:"DABD",35824:"DABE",35827:"DABF",35830:"DAC0",35833:"DAC1",35836:"DAC2",35839:"DAC3",35840:"DAC4",35842:"DAC5",35844:"DAC6",35847:"DAC7",35852:"DAC8",35855:"DAC9",35857:"DACA",35858:"DACB",35860:"DACC",35861:"DACD",35862:"DACE",35865:"DACF",35867:"DAD0",35864:"DAD1",35869:"DAD2",35871:"DAD3",35872:"DAD4",35873:"DAD5",35877:"DAD6",35879:"DAD7",35882:"DAD8",35883:"DAD9",35886:"DADA",35887:"DADB",35890:"DADC",35891:"DADD",35893:"DADE",35894:"DADF",21353:"DAE0",21370:"DAE1",38429:"DAE2",38434:"DAE3",38433:"DAE4",38449:"DAE5",38442:"DAE6",38461:"DAE7",38460:"DAE8",38466:"DAE9",38473:"DAEA",38484:"DAEB",38495:"DAEC",38503:"DAED",38508:"DAEE",38514:"DAEF",38516:"DAF0",38536:"DAF1",38541:"DAF2",38551:"DAF3",38576:"DAF4",37015:"DAF5",37019:"DAF6",37021:"DAF7",37017:"DAF8",37036:"DAF9",37025:"DAFA",37044:"DAFB",37043:"DAFC",37046:"DAFD",37050:"DAFE",37048:"DBA1",37040:"DBA2",37071:"DBA3",37061:"DBA4",37054:"DBA5",37072:"DBA6",37060:"DBA7",37063:"DBA8",37075:"DBA9",37094:"DBAA",37090:"DBAB",37084:"DBAC",37079:"DBAD",37083:"DBAE",37099:"DBAF",37103:"DBB0",37118:"DBB1",37124:"DBB2",37154:"DBB3",37150:"DBB4",37155:"DBB5",37169:"DBB6",37167:"DBB7",37177:"DBB8",37187:"DBB9",37190:"DBBA",21005:"DBBB",22850:"DBBC",21154:"DBBD",21164:"DBBE",21165:"DBBF",21182:"DBC0",21759:"DBC1",21200:"DBC2",21206:"DBC3",21232:"DBC4",21471:"DBC5",29166:"DBC6",30669:"DBC7",24308:"DBC8",20981:"DBC9",20988:"DBCA",39727:"DBCB",21430:"DBCC",24321:"DBCD",30042:"DBCE",24047:"DBCF",22348:"DBD0",22441:"DBD1",22433:"DBD2",22654:"DBD3",22716:"DBD4",22725:"DBD5",22737:"DBD6",22313:"DBD7",22316:"DBD8",22314:"DBD9",22323:"DBDA",22329:"DBDB",22318:"DBDC",22319:"DBDD",22364:"DBDE",22331:"DBDF",22338:"DBE0",22377:"DBE1",22405:"DBE2",22379:"DBE3",22406:"DBE4",22396:"DBE5",22395:"DBE6",22376:"DBE7",22381:"DBE8",22390:"DBE9",22387:"DBEA",22445:"DBEB",22436:"DBEC",22412:"DBED",22450:"DBEE",22479:"DBEF",22439:"DBF0",22452:"DBF1",22419:"DBF2",22432:"DBF3",22485:"DBF4",22488:"DBF5",22490:"DBF6",22489:"DBF7",22482:"DBF8",22456:"DBF9",22516:"DBFA",22511:"DBFB",22520:"DBFC",22500:"DBFD",22493:"DBFE",22539:"DCA1",22541:"DCA2",22525:"DCA3",22509:"DCA4",22528:"DCA5",22558:"DCA6",22553:"DCA7",22596:"DCA8",22560:"DCA9",22629:"DCAA",22636:"DCAB",22657:"DCAC",22665:"DCAD",22682:"DCAE",22656:"DCAF",39336:"DCB0",40729:"DCB1",25087:"DCB2",33401:"DCB3",33405:"DCB4",33407:"DCB5",33423:"DCB6",33418:"DCB7",33448:"DCB8",33412:"DCB9",33422:"DCBA",33425:"DCBB",33431:"DCBC",33433:"DCBD",33451:"DCBE",33464:"DCBF",33470:"DCC0",33456:"DCC1",33480:"DCC2",33482:"DCC3",33507:"DCC4",33432:"DCC5",33463:"DCC6",33454:"DCC7",33483:"DCC8",33484:"DCC9",33473:"DCCA",33449:"DCCB",33460:"DCCC",33441:"DCCD",33450:"DCCE",33439:"DCCF",33476:"DCD0",33486:"DCD1",33444:"DCD2",33505:"DCD3",33545:"DCD4",33527:"DCD5",33508:"DCD6",33551:"DCD7",33543:"DCD8",33500:"DCD9",33524:"DCDA",33490:"DCDB",33496:"DCDC",33548:"DCDD",33531:"DCDE",33491:"DCDF",33553:"DCE0",33562:"DCE1",33542:"DCE2",33556:"DCE3",33557:"DCE4",33504:"DCE5",33493:"DCE6",33564:"DCE7",33617:"DCE8",33627:"DCE9",33628:"DCEA",33544:"DCEB",33682:"DCEC",33596:"DCED",33588:"DCEE",33585:"DCEF",33691:"DCF0",33630:"DCF1",33583:"DCF2",33615:"DCF3",33607:"DCF4",33603:"DCF5",33631:"DCF6",33600:"DCF7",33559:"DCF8",33632:"DCF9",33581:"DCFA",33594:"DCFB",33587:"DCFC",33638:"DCFD",33637:"DCFE",33640:"DDA1",33563:"DDA2",33641:"DDA3",33644:"DDA4",33642:"DDA5",33645:"DDA6",33646:"DDA7",33712:"DDA8",33656:"DDA9",33715:"DDAA",33716:"DDAB",33696:"DDAC",33706:"DDAD",33683:"DDAE",33692:"DDAF",33669:"DDB0",33660:"DDB1",33718:"DDB2",33705:"DDB3",33661:"DDB4",33720:"DDB5",33659:"DDB6",33688:"DDB7",33694:"DDB8",33704:"DDB9",33722:"DDBA",33724:"DDBB",33729:"DDBC",33793:"DDBD",33765:"DDBE",33752:"DDBF",22535:"DDC0",33816:"DDC1",33803:"DDC2",33757:"DDC3",33789:"DDC4",33750:"DDC5",33820:"DDC6",33848:"DDC7",33809:"DDC8",33798:"DDC9",33748:"DDCA",33759:"DDCB",33807:"DDCC",33795:"DDCD",33784:"DDCE",33785:"DDCF",33770:"DDD0",33733:"DDD1",33728:"DDD2",33830:"DDD3",33776:"DDD4",33761:"DDD5",33884:"DDD6",33873:"DDD7",33882:"DDD8",33881:"DDD9",33907:"DDDA",33927:"DDDB",33928:"DDDC",33914:"DDDD",33929:"DDDE",33912:"DDDF",33852:"DDE0",33862:"DDE1",33897:"DDE2",33910:"DDE3",33932:"DDE4",33934:"DDE5",33841:"DDE6",33901:"DDE7",33985:"DDE8",33997:"DDE9",34e3:"DDEA",34022:"DDEB",33981:"DDEC",34003:"DDED",33994:"DDEE",33983:"DDEF",33978:"DDF0",34016:"DDF1",33953:"DDF2",33977:"DDF3",33972:"DDF4",33943:"DDF5",34021:"DDF6",34019:"DDF7",34060:"DDF8",29965:"DDF9",34104:"DDFA",34032:"DDFB",34105:"DDFC",34079:"DDFD",34106:"DDFE",34134:"DEA1",34107:"DEA2",34047:"DEA3",34044:"DEA4",34137:"DEA5",34120:"DEA6",34152:"DEA7",34148:"DEA8",34142:"DEA9",34170:"DEAA",30626:"DEAB",34115:"DEAC",34162:"DEAD",34171:"DEAE",34212:"DEAF",34216:"DEB0",34183:"DEB1",34191:"DEB2",34169:"DEB3",34222:"DEB4",34204:"DEB5",34181:"DEB6",34233:"DEB7",34231:"DEB8",34224:"DEB9",34259:"DEBA",34241:"DEBB",34268:"DEBC",34303:"DEBD",34343:"DEBE",34309:"DEBF",34345:"DEC0",34326:"DEC1",34364:"DEC2",24318:"DEC3",24328:"DEC4",22844:"DEC5",22849:"DEC6",32823:"DEC7",22869:"DEC8",22874:"DEC9",22872:"DECA",21263:"DECB",23586:"DECC",23589:"DECD",23596:"DECE",23604:"DECF",25164:"DED0",25194:"DED1",25247:"DED2",25275:"DED3",25290:"DED4",25306:"DED5",25303:"DED6",25326:"DED7",25378:"DED8",25334:"DED9",25401:"DEDA",25419:"DEDB",25411:"DEDC",25517:"DEDD",25590:"DEDE",25457:"DEDF",25466:"DEE0",25486:"DEE1",25524:"DEE2",25453:"DEE3",25516:"DEE4",25482:"DEE5",25449:"DEE6",25518:"DEE7",25532:"DEE8",25586:"DEE9",25592:"DEEA",25568:"DEEB",25599:"DEEC",25540:"DEED",25566:"DEEE",25550:"DEEF",25682:"DEF0",25542:"DEF1",25534:"DEF2",25669:"DEF3",25665:"DEF4",25611:"DEF5",25627:"DEF6",25632:"DEF7",25612:"DEF8",25638:"DEF9",25633:"DEFA",25694:"DEFB",25732:"DEFC",25709:"DEFD",25750:"DEFE",25722:"DFA1",25783:"DFA2",25784:"DFA3",25753:"DFA4",25786:"DFA5",25792:"DFA6",25808:"DFA7",25815:"DFA8",25828:"DFA9",25826:"DFAA",25865:"DFAB",25893:"DFAC",25902:"DFAD",24331:"DFAE",24530:"DFAF",29977:"DFB0",24337:"DFB1",21343:"DFB2",21489:"DFB3",21501:"DFB4",21481:"DFB5",21480:"DFB6",21499:"DFB7",21522:"DFB8",21526:"DFB9",21510:"DFBA",21579:"DFBB",21586:"DFBC",21587:"DFBD",21588:"DFBE",21590:"DFBF",21571:"DFC0",21537:"DFC1",21591:"DFC2",21593:"DFC3",21539:"DFC4",21554:"DFC5",21634:"DFC6",21652:"DFC7",21623:"DFC8",21617:"DFC9",21604:"DFCA",21658:"DFCB",21659:"DFCC",21636:"DFCD",21622:"DFCE",21606:"DFCF",21661:"DFD0",21712:"DFD1",21677:"DFD2",21698:"DFD3",21684:"DFD4",21714:"DFD5",21671:"DFD6",21670:"DFD7",21715:"DFD8",21716:"DFD9",21618:"DFDA",21667:"DFDB",21717:"DFDC",21691:"DFDD",21695:"DFDE",21708:"DFDF",21721:"DFE0",21722:"DFE1",21724:"DFE2",21673:"DFE3",21674:"DFE4",21668:"DFE5",21725:"DFE6",21711:"DFE7",21726:"DFE8",21787:"DFE9",21735:"DFEA",21792:"DFEB",21757:"DFEC",21780:"DFED",21747:"DFEE",21794:"DFEF",21795:"DFF0",21775:"DFF1",21777:"DFF2",21799:"DFF3",21802:"DFF4",21863:"DFF5",21903:"DFF6",21941:"DFF7",21833:"DFF8",21869:"DFF9",21825:"DFFA",21845:"DFFB",21823:"DFFC",21840:"DFFD",21820:"DFFE",21815:"E0A1",21846:"E0A2",21877:"E0A3",21878:"E0A4",21879:"E0A5",21811:"E0A6",21808:"E0A7",21852:"E0A8",21899:"E0A9",21970:"E0AA",21891:"E0AB",21937:"E0AC",21945:"E0AD",21896:"E0AE",21889:"E0AF",21919:"E0B0",21886:"E0B1",21974:"E0B2",21905:"E0B3",21883:"E0B4",21983:"E0B5",21949:"E0B6",21950:"E0B7",21908:"E0B8",21913:"E0B9",21994:"E0BA",22007:"E0BB",21961:"E0BC",22047:"E0BD",21969:"E0BE",21995:"E0BF",21996:"E0C0",21972:"E0C1",21990:"E0C2",21981:"E0C3",21956:"E0C4",21999:"E0C5",21989:"E0C6",22002:"E0C7",22003:"E0C8",21964:"E0C9",21965:"E0CA",21992:"E0CB",22005:"E0CC",21988:"E0CD",36756:"E0CE",22046:"E0CF",22024:"E0D0",22028:"E0D1",22017:"E0D2",22052:"E0D3",22051:"E0D4",22014:"E0D5",22016:"E0D6",22055:"E0D7",22061:"E0D8",22104:"E0D9",22073:"E0DA",22103:"E0DB",22060:"E0DC",22093:"E0DD",22114:"E0DE",22105:"E0DF",22108:"E0E0",22092:"E0E1",22100:"E0E2",22150:"E0E3",22116:"E0E4",22129:"E0E5",22123:"E0E6",22139:"E0E7",22140:"E0E8",22149:"E0E9",22163:"E0EA",22191:"E0EB",22228:"E0EC",22231:"E0ED",22237:"E0EE",22241:"E0EF",22261:"E0F0",22251:"E0F1",22265:"E0F2",22271:"E0F3",22276:"E0F4",22282:"E0F5",22281:"E0F6",22300:"E0F7",24079:"E0F8",24089:"E0F9",24084:"E0FA",24081:"E0FB",24113:"E0FC",24123:"E0FD",24124:"E0FE",24119:"E1A1",24132:"E1A2",24148:"E1A3",24155:"E1A4",24158:"E1A5",24161:"E1A6",23692:"E1A7",23674:"E1A8",23693:"E1A9",23696:"E1AA",23702:"E1AB",23688:"E1AC",23704:"E1AD",23705:"E1AE",23697:"E1AF",23706:"E1B0",23708:"E1B1",23733:"E1B2",23714:"E1B3",23741:"E1B4",23724:"E1B5",23723:"E1B6",23729:"E1B7",23715:"E1B8",23745:"E1B9",23735:"E1BA",23748:"E1BB",23762:"E1BC",23780:"E1BD",23755:"E1BE",23781:"E1BF",23810:"E1C0",23811:"E1C1",23847:"E1C2",23846:"E1C3",23854:"E1C4",23844:"E1C5",23838:"E1C6",23814:"E1C7",23835:"E1C8",23896:"E1C9",23870:"E1CA",23860:"E1CB",23869:"E1CC",23916:"E1CD",23899:"E1CE",23919:"E1CF",23901:"E1D0",23915:"E1D1",23883:"E1D2",23882:"E1D3",23913:"E1D4",23924:"E1D5",23938:"E1D6",23961:"E1D7",23965:"E1D8",35955:"E1D9",23991:"E1DA",24005:"E1DB",24435:"E1DC",24439:"E1DD",24450:"E1DE",24455:"E1DF",24457:"E1E0",24460:"E1E1",24469:"E1E2",24473:"E1E3",24476:"E1E4",24488:"E1E5",24493:"E1E6",24501:"E1E7",24508:"E1E8",34914:"E1E9",24417:"E1EA",29357:"E1EB",29360:"E1EC",29364:"E1ED",29367:"E1EE",29368:"E1EF",29379:"E1F0",29377:"E1F1",29390:"E1F2",29389:"E1F3",29394:"E1F4",29416:"E1F5",29423:"E1F6",29417:"E1F7",29426:"E1F8",29428:"E1F9",29431:"E1FA",29441:"E1FB",29427:"E1FC",29443:"E1FD",29434:"E1FE",29435:"E2A1",29463:"E2A2",29459:"E2A3",29473:"E2A4",29450:"E2A5",29470:"E2A6",29469:"E2A7",29461:"E2A8",29474:"E2A9",29497:"E2AA",29477:"E2AB",29484:"E2AC",29496:"E2AD",29489:"E2AE",29520:"E2AF",29517:"E2B0",29527:"E2B1",29536:"E2B2",29548:"E2B3",29551:"E2B4",29566:"E2B5",33307:"E2B6",22821:"E2B7",39143:"E2B8",22820:"E2B9",22786:"E2BA",39267:"E2BB",39271:"E2BC",39272:"E2BD",39273:"E2BE",39274:"E2BF",39275:"E2C0",39276:"E2C1",39284:"E2C2",39287:"E2C3",39293:"E2C4",39296:"E2C5",39300:"E2C6",39303:"E2C7",39306:"E2C8",39309:"E2C9",39312:"E2CA",39313:"E2CB",39315:"E2CC",39316:"E2CD",39317:"E2CE",24192:"E2CF",24209:"E2D0",24203:"E2D1",24214:"E2D2",24229:"E2D3",24224:"E2D4",24249:"E2D5",24245:"E2D6",24254:"E2D7",24243:"E2D8",36179:"E2D9",24274:"E2DA",24273:"E2DB",24283:"E2DC",24296:"E2DD",24298:"E2DE",33210:"E2DF",24516:"E2E0",24521:"E2E1",24534:"E2E2",24527:"E2E3",24579:"E2E4",24558:"E2E5",24580:"E2E6",24545:"E2E7",24548:"E2E8",24574:"E2E9",24581:"E2EA",24582:"E2EB",24554:"E2EC",24557:"E2ED",24568:"E2EE",24601:"E2EF",24629:"E2F0",24614:"E2F1",24603:"E2F2",24591:"E2F3",24589:"E2F4",24617:"E2F5",24619:"E2F6",24586:"E2F7",24639:"E2F8",24609:"E2F9",24696:"E2FA",24697:"E2FB",24699:"E2FC",24698:"E2FD",24642:"E2FE",24682:"E3A1",24701:"E3A2",24726:"E3A3",24730:"E3A4",24749:"E3A5",24733:"E3A6",24707:"E3A7",24722:"E3A8",24716:"E3A9",24731:"E3AA",24812:"E3AB",24763:"E3AC",24753:"E3AD",24797:"E3AE",24792:"E3AF",24774:"E3B0",24794:"E3B1",24756:"E3B2",24864:"E3B3",24870:"E3B4",24853:"E3B5",24867:"E3B6",24820:"E3B7",24832:"E3B8",24846:"E3B9",24875:"E3BA",24906:"E3BB",24949:"E3BC",25004:"E3BD",24980:"E3BE",24999:"E3BF",25015:"E3C0",25044:"E3C1",25077:"E3C2",24541:"E3C3",38579:"E3C4",38377:"E3C5",38379:"E3C6",38385:"E3C7",38387:"E3C8",38389:"E3C9",38390:"E3CA",38396:"E3CB",38398:"E3CC",38403:"E3CD",38404:"E3CE",38406:"E3CF",38408:"E3D0",38410:"E3D1",38411:"E3D2",38412:"E3D3",38413:"E3D4",38415:"E3D5",38418:"E3D6",38421:"E3D7",38422:"E3D8",38423:"E3D9",38425:"E3DA",38426:"E3DB",20012:"E3DC",29247:"E3DD",25109:"E3DE",27701:"E3DF",27732:"E3E0",27740:"E3E1",27722:"E3E2",27811:"E3E3",27781:"E3E4",27792:"E3E5",27796:"E3E6",27788:"E3E7",27752:"E3E8",27753:"E3E9",27764:"E3EA",27766:"E3EB",27782:"E3EC",27817:"E3ED",27856:"E3EE",27860:"E3EF",27821:"E3F0",27895:"E3F1",27896:"E3F2",27889:"E3F3",27863:"E3F4",27826:"E3F5",27872:"E3F6",27862:"E3F7",27898:"E3F8",27883:"E3F9",27886:"E3FA",27825:"E3FB",27859:"E3FC",27887:"E3FD",27902:"E3FE",27961:"E4A1",27943:"E4A2",27916:"E4A3",27971:"E4A4",27976:"E4A5",27911:"E4A6",27908:"E4A7",27929:"E4A8",27918:"E4A9",27947:"E4AA",27981:"E4AB",27950:"E4AC",27957:"E4AD",27930:"E4AE",27983:"E4AF",27986:"E4B0",27988:"E4B1",27955:"E4B2",28049:"E4B3",28015:"E4B4",28062:"E4B5",28064:"E4B6",27998:"E4B7",28051:"E4B8",28052:"E4B9",27996:"E4BA",28e3:"E4BB",28028:"E4BC",28003:"E4BD",28186:"E4BE",28103:"E4BF",28101:"E4C0",28126:"E4C1",28174:"E4C2",28095:"E4C3",28128:"E4C4",28177:"E4C5",28134:"E4C6",28125:"E4C7",28121:"E4C8",28182:"E4C9",28075:"E4CA",28172:"E4CB",28078:"E4CC",28203:"E4CD",28270:"E4CE",28238:"E4CF",28267:"E4D0",28338:"E4D1",28255:"E4D2",28294:"E4D3",28243:"E4D4",28244:"E4D5",28210:"E4D6",28197:"E4D7",28228:"E4D8",28383:"E4D9",28337:"E4DA",28312:"E4DB",28384:"E4DC",28461:"E4DD",28386:"E4DE",28325:"E4DF",28327:"E4E0",28349:"E4E1",28347:"E4E2",28343:"E4E3",28375:"E4E4",28340:"E4E5",28367:"E4E6",28303:"E4E7",28354:"E4E8",28319:"E4E9",28514:"E4EA",28486:"E4EB",28487:"E4EC",28452:"E4ED",28437:"E4EE",28409:"E4EF",28463:"E4F0",28470:"E4F1",28491:"E4F2",28532:"E4F3",28458:"E4F4",28425:"E4F5",28457:"E4F6",28553:"E4F7",28557:"E4F8",28556:"E4F9",28536:"E4FA",28530:"E4FB",28540:"E4FC",28538:"E4FD",28625:"E4FE",28617:"E5A1",28583:"E5A2",28601:"E5A3",28598:"E5A4",28610:"E5A5",28641:"E5A6",28654:"E5A7",28638:"E5A8",28640:"E5A9",28655:"E5AA",28698:"E5AB",28707:"E5AC",28699:"E5AD",28729:"E5AE",28725:"E5AF",28751:"E5B0",28766:"E5B1",23424:"E5B2",23428:"E5B3",23445:"E5B4",23443:"E5B5",23461:"E5B6",23480:"E5B7",29999:"E5B8",39582:"E5B9",25652:"E5BA",23524:"E5BB",23534:"E5BC",35120:"E5BD",23536:"E5BE",36423:"E5BF",35591:"E5C0",36790:"E5C1",36819:"E5C2",36821:"E5C3",36837:"E5C4",36846:"E5C5",36836:"E5C6",36841:"E5C7",36838:"E5C8",36851:"E5C9",36840:"E5CA",36869:"E5CB",36868:"E5CC",36875:"E5CD",36902:"E5CE",36881:"E5CF",36877:"E5D0",36886:"E5D1",36897:"E5D2",36917:"E5D3",36918:"E5D4",36909:"E5D5",36911:"E5D6",36932:"E5D7",36945:"E5D8",36946:"E5D9",36944:"E5DA",36968:"E5DB",36952:"E5DC",36962:"E5DD",36955:"E5DE",26297:"E5DF",36980:"E5E0",36989:"E5E1",36994:"E5E2",37e3:"E5E3",36995:"E5E4",37003:"E5E5",24400:"E5E6",24407:"E5E7",24406:"E5E8",24408:"E5E9",23611:"E5EA",21675:"E5EB",23632:"E5EC",23641:"E5ED",23409:"E5EE",23651:"E5EF",23654:"E5F0",32700:"E5F1",24362:"E5F2",24361:"E5F3",24365:"E5F4",33396:"E5F5",24380:"E5F6",39739:"E5F7",23662:"E5F8",22913:"E5F9",22915:"E5FA",22925:"E5FB",22953:"E5FC",22954:"E5FD",22947:"E5FE",22935:"E6A1",22986:"E6A2",22955:"E6A3",22942:"E6A4",22948:"E6A5",22994:"E6A6",22962:"E6A7",22959:"E6A8",22999:"E6A9",22974:"E6AA",23045:"E6AB",23046:"E6AC",23005:"E6AD",23048:"E6AE",23011:"E6AF",23e3:"E6B0",23033:"E6B1",23052:"E6B2",23049:"E6B3",23090:"E6B4",23092:"E6B5",23057:"E6B6",23075:"E6B7",23059:"E6B8",23104:"E6B9",23143:"E6BA",23114:"E6BB",23125:"E6BC",23100:"E6BD",23138:"E6BE",23157:"E6BF",33004:"E6C0",23210:"E6C1",23195:"E6C2",23159:"E6C3",23162:"E6C4",23230:"E6C5",23275:"E6C6",23218:"E6C7",23250:"E6C8",23252:"E6C9",23224:"E6CA",23264:"E6CB",23267:"E6CC",23281:"E6CD",23254:"E6CE",23270:"E6CF",23256:"E6D0",23260:"E6D1",23305:"E6D2",23319:"E6D3",23318:"E6D4",23346:"E6D5",23351:"E6D6",23360:"E6D7",23573:"E6D8",23580:"E6D9",23386:"E6DA",23397:"E6DB",23411:"E6DC",23377:"E6DD",23379:"E6DE",23394:"E6DF",39541:"E6E0",39543:"E6E1",39544:"E6E2",39546:"E6E3",39551:"E6E4",39549:"E6E5",39552:"E6E6",39553:"E6E7",39557:"E6E8",39560:"E6E9",39562:"E6EA",39568:"E6EB",39570:"E6EC",39571:"E6ED",39574:"E6EE",39576:"E6EF",39579:"E6F0",39580:"E6F1",39581:"E6F2",39583:"E6F3",39584:"E6F4",39586:"E6F5",39587:"E6F6",39589:"E6F7",39591:"E6F8",32415:"E6F9",32417:"E6FA",32419:"E6FB",32421:"E6FC",32424:"E6FD",32425:"E6FE",32429:"E7A1",32432:"E7A2",32446:"E7A3",32448:"E7A4",32449:"E7A5",32450:"E7A6",32457:"E7A7",32459:"E7A8",32460:"E7A9",32464:"E7AA",32468:"E7AB",32471:"E7AC",32475:"E7AD",32480:"E7AE",32481:"E7AF",32488:"E7B0",32491:"E7B1",32494:"E7B2",32495:"E7B3",32497:"E7B4",32498:"E7B5",32525:"E7B6",32502:"E7B7",32506:"E7B8",32507:"E7B9",32510:"E7BA",32513:"E7BB",32514:"E7BC",32515:"E7BD",32519:"E7BE",32520:"E7BF",32523:"E7C0",32524:"E7C1",32527:"E7C2",32529:"E7C3",32530:"E7C4",32535:"E7C5",32537:"E7C6",32540:"E7C7",32539:"E7C8",32543:"E7C9",32545:"E7CA",32546:"E7CB",32547:"E7CC",32548:"E7CD",32549:"E7CE",32550:"E7CF",32551:"E7D0",32554:"E7D1",32555:"E7D2",32556:"E7D3",32557:"E7D4",32559:"E7D5",32560:"E7D6",32561:"E7D7",32562:"E7D8",32563:"E7D9",32565:"E7DA",24186:"E7DB",30079:"E7DC",24027:"E7DD",30014:"E7DE",37013:"E7DF",29582:"E7E0",29585:"E7E1",29614:"E7E2",29602:"E7E3",29599:"E7E4",29647:"E7E5",29634:"E7E6",29649:"E7E7",29623:"E7E8",29619:"E7E9",29632:"E7EA",29641:"E7EB",29640:"E7EC",29669:"E7ED",29657:"E7EE",39036:"E7EF",29706:"E7F0",29673:"E7F1",29671:"E7F2",29662:"E7F3",29626:"E7F4",29682:"E7F5",29711:"E7F6",29738:"E7F7",29787:"E7F8",29734:"E7F9",29733:"E7FA",29736:"E7FB",29744:"E7FC",29742:"E7FD",29740:"E7FE",29723:"E8A1",29722:"E8A2",29761:"E8A3",29788:"E8A4",29783:"E8A5",29781:"E8A6",29785:"E8A7",29815:"E8A8",29805:"E8A9",29822:"E8AA",29852:"E8AB",29838:"E8AC",29824:"E8AD",29825:"E8AE",29831:"E8AF",29835:"E8B0",29854:"E8B1",29864:"E8B2",29865:"E8B3",29840:"E8B4",29863:"E8B5",29906:"E8B6",29882:"E8B7",38890:"E8B8",38891:"E8B9",38892:"E8BA",26444:"E8BB",26451:"E8BC",26462:"E8BD",26440:"E8BE",26473:"E8BF",26533:"E8C0",26503:"E8C1",26474:"E8C2",26483:"E8C3",26520:"E8C4",26535:"E8C5",26485:"E8C6",26536:"E8C7",26526:"E8C8",26541:"E8C9",26507:"E8CA",26487:"E8CB",26492:"E8CC",26608:"E8CD",26633:"E8CE",26584:"E8CF",26634:"E8D0",26601:"E8D1",26544:"E8D2",26636:"E8D3",26585:"E8D4",26549:"E8D5",26586:"E8D6",26547:"E8D7",26589:"E8D8",26624:"E8D9",26563:"E8DA",26552:"E8DB",26594:"E8DC",26638:"E8DD",26561:"E8DE",26621:"E8DF",26674:"E8E0",26675:"E8E1",26720:"E8E2",26721:"E8E3",26702:"E8E4",26722:"E8E5",26692:"E8E6",26724:"E8E7",26755:"E8E8",26653:"E8E9",26709:"E8EA",26726:"E8EB",26689:"E8EC",26727:"E8ED",26688:"E8EE",26686:"E8EF",26698:"E8F0",26697:"E8F1",26665:"E8F2",26805:"E8F3",26767:"E8F4",26740:"E8F5",26743:"E8F6",26771:"E8F7",26731:"E8F8",26818:"E8F9",26990:"E8FA",26876:"E8FB",26911:"E8FC",26912:"E8FD",26873:"E8FE",26916:"E9A1",26864:"E9A2",26891:"E9A3",26881:"E9A4",26967:"E9A5",26851:"E9A6",26896:"E9A7",26993:"E9A8",26937:"E9A9",26976:"E9AA",26946:"E9AB",26973:"E9AC",27012:"E9AD",26987:"E9AE",27008:"E9AF",27032:"E9B0",27e3:"E9B1",26932:"E9B2",27084:"E9B3",27015:"E9B4",27016:"E9B5",27086:"E9B6",27017:"E9B7",26982:"E9B8",26979:"E9B9",27001:"E9BA",27035:"E9BB",27047:"E9BC",27067:"E9BD",27051:"E9BE",27053:"E9BF",27092:"E9C0",27057:"E9C1",27073:"E9C2",27082:"E9C3",27103:"E9C4",27029:"E9C5",27104:"E9C6",27021:"E9C7",27135:"E9C8",27183:"E9C9",27117:"E9CA",27159:"E9CB",27160:"E9CC",27237:"E9CD",27122:"E9CE",27204:"E9CF",27198:"E9D0",27296:"E9D1",27216:"E9D2",27227:"E9D3",27189:"E9D4",27278:"E9D5",27257:"E9D6",27197:"E9D7",27176:"E9D8",27224:"E9D9",27260:"E9DA",27281:"E9DB",27280:"E9DC",27305:"E9DD",27287:"E9DE",27307:"E9DF",29495:"E9E0",29522:"E9E1",27521:"E9E2",27522:"E9E3",27527:"E9E4",27524:"E9E5",27538:"E9E6",27539:"E9E7",27533:"E9E8",27546:"E9E9",27547:"E9EA",27553:"E9EB",27562:"E9EC",36715:"E9ED",36717:"E9EE",36721:"E9EF",36722:"E9F0",36723:"E9F1",36725:"E9F2",36726:"E9F3",36728:"E9F4",36727:"E9F5",36729:"E9F6",36730:"E9F7",36732:"E9F8",36734:"E9F9",36737:"E9FA",36738:"E9FB",36740:"E9FC",36743:"E9FD",36747:"E9FE",36749:"EAA1",36750:"EAA2",36751:"EAA3",36760:"EAA4",36762:"EAA5",36558:"EAA6",25099:"EAA7",25111:"EAA8",25115:"EAA9",25119:"EAAA",25122:"EAAB",25121:"EAAC",25125:"EAAD",25124:"EAAE",25132:"EAAF",33255:"EAB0",29935:"EAB1",29940:"EAB2",29951:"EAB3",29967:"EAB4",29969:"EAB5",29971:"EAB6",25908:"EAB7",26094:"EAB8",26095:"EAB9",26096:"EABA",26122:"EABB",26137:"EABC",26482:"EABD",26115:"EABE",26133:"EABF",26112:"EAC0",28805:"EAC1",26359:"EAC2",26141:"EAC3",26164:"EAC4",26161:"EAC5",26166:"EAC6",26165:"EAC7",32774:"EAC8",26207:"EAC9",26196:"EACA",26177:"EACB",26191:"EACC",26198:"EACD",26209:"EACE",26199:"EACF",26231:"EAD0",26244:"EAD1",26252:"EAD2",26279:"EAD3",26269:"EAD4",26302:"EAD5",26331:"EAD6",26332:"EAD7",26342:"EAD8",26345:"EAD9",36146:"EADA",36147:"EADB",36150:"EADC",36155:"EADD",36157:"EADE",36160:"EADF",36165:"EAE0",36166:"EAE1",36168:"EAE2",36169:"EAE3",36167:"EAE4",36173:"EAE5",36181:"EAE6",36185:"EAE7",35271:"EAE8",35274:"EAE9",35275:"EAEA",35276:"EAEB",35278:"EAEC",35279:"EAED",35280:"EAEE",35281:"EAEF",29294:"EAF0",29343:"EAF1",29277:"EAF2",29286:"EAF3",29295:"EAF4",29310:"EAF5",29311:"EAF6",29316:"EAF7",29323:"EAF8",29325:"EAF9",29327:"EAFA",29330:"EAFB",25352:"EAFC",25394:"EAFD",25520:"EAFE",25663:"EBA1",25816:"EBA2",32772:"EBA3",27626:"EBA4",27635:"EBA5",27645:"EBA6",27637:"EBA7",27641:"EBA8",27653:"EBA9",27655:"EBAA",27654:"EBAB",27661:"EBAC",27669:"EBAD",27672:"EBAE",27673:"EBAF",27674:"EBB0",27681:"EBB1",27689:"EBB2",27684:"EBB3",27690:"EBB4",27698:"EBB5",25909:"EBB6",25941:"EBB7",25963:"EBB8",29261:"EBB9",29266:"EBBA",29270:"EBBB",29232:"EBBC",34402:"EBBD",21014:"EBBE",32927:"EBBF",32924:"EBC0",32915:"EBC1",32956:"EBC2",26378:"EBC3",32957:"EBC4",32945:"EBC5",32939:"EBC6",32941:"EBC7",32948:"EBC8",32951:"EBC9",32999:"EBCA",33e3:"EBCB",33001:"EBCC",33002:"EBCD",32987:"EBCE",32962:"EBCF",32964:"EBD0",32985:"EBD1",32973:"EBD2",32983:"EBD3",26384:"EBD4",32989:"EBD5",33003:"EBD6",33009:"EBD7",33012:"EBD8",33005:"EBD9",33037:"EBDA",33038:"EBDB",33010:"EBDC",33020:"EBDD",26389:"EBDE",33042:"EBDF",35930:"EBE0",33078:"EBE1",33054:"EBE2",33068:"EBE3",33048:"EBE4",33074:"EBE5",33096:"EBE6",33100:"EBE7",33107:"EBE8",33140:"EBE9",33113:"EBEA",33114:"EBEB",33137:"EBEC",33120:"EBED",33129:"EBEE",33148:"EBEF",33149:"EBF0",33133:"EBF1",33127:"EBF2",22605:"EBF3",23221:"EBF4",33160:"EBF5",33154:"EBF6",33169:"EBF7",28373:"EBF8",33187:"EBF9",33194:"EBFA",33228:"EBFB",26406:"EBFC",33226:"EBFD",33211:"EBFE",33217:"ECA1",33190:"ECA2",27428:"ECA3",27447:"ECA4",27449:"ECA5",27459:"ECA6",27462:"ECA7",27481:"ECA8",39121:"ECA9",39122:"ECAA",39123:"ECAB",39125:"ECAC",39129:"ECAD",39130:"ECAE",27571:"ECAF",24384:"ECB0",27586:"ECB1",35315:"ECB2",26e3:"ECB3",40785:"ECB4",26003:"ECB5",26044:"ECB6",26054:"ECB7",26052:"ECB8",26051:"ECB9",26060:"ECBA",26062:"ECBB",26066:"ECBC",26070:"ECBD",28800:"ECBE",28828:"ECBF",28822:"ECC0",28829:"ECC1",28859:"ECC2",28864:"ECC3",28855:"ECC4",28843:"ECC5",28849:"ECC6",28904:"ECC7",28874:"ECC8",28944:"ECC9",28947:"ECCA",28950:"ECCB",28975:"ECCC",28977:"ECCD",29043:"ECCE",29020:"ECCF",29032:"ECD0",28997:"ECD1",29042:"ECD2",29002:"ECD3",29048:"ECD4",29050:"ECD5",29080:"ECD6",29107:"ECD7",29109:"ECD8",29096:"ECD9",29088:"ECDA",29152:"ECDB",29140:"ECDC",29159:"ECDD",29177:"ECDE",29213:"ECDF",29224:"ECE0",28780:"ECE1",28952:"ECE2",29030:"ECE3",29113:"ECE4",25150:"ECE5",25149:"ECE6",25155:"ECE7",25160:"ECE8",25161:"ECE9",31035:"ECEA",31040:"ECEB",31046:"ECEC",31049:"ECED",31067:"ECEE",31068:"ECEF",31059:"ECF0",31066:"ECF1",31074:"ECF2",31063:"ECF3",31072:"ECF4",31087:"ECF5",31079:"ECF6",31098:"ECF7",31109:"ECF8",31114:"ECF9",31130:"ECFA",31143:"ECFB",31155:"ECFC",24529:"ECFD",24528:"ECFE",24636:"EDA1",24669:"EDA2",24666:"EDA3",24679:"EDA4",24641:"EDA5",24665:"EDA6",24675:"EDA7",24747:"EDA8",24838:"EDA9",24845:"EDAA",24925:"EDAB",25001:"EDAC",24989:"EDAD",25035:"EDAE",25041:"EDAF",25094:"EDB0",32896:"EDB1",32895:"EDB2",27795:"EDB3",27894:"EDB4",28156:"EDB5",30710:"EDB6",30712:"EDB7",30720:"EDB8",30729:"EDB9",30743:"EDBA",30744:"EDBB",30737:"EDBC",26027:"EDBD",30765:"EDBE",30748:"EDBF",30749:"EDC0",30777:"EDC1",30778:"EDC2",30779:"EDC3",30751:"EDC4",30780:"EDC5",30757:"EDC6",30764:"EDC7",30755:"EDC8",30761:"EDC9",30798:"EDCA",30829:"EDCB",30806:"EDCC",30807:"EDCD",30758:"EDCE",30800:"EDCF",30791:"EDD0",30796:"EDD1",30826:"EDD2",30875:"EDD3",30867:"EDD4",30874:"EDD5",30855:"EDD6",30876:"EDD7",30881:"EDD8",30883:"EDD9",30898:"EDDA",30905:"EDDB",30885:"EDDC",30932:"EDDD",30937:"EDDE",30921:"EDDF",30956:"EDE0",30962:"EDE1",30981:"EDE2",30964:"EDE3",30995:"EDE4",31012:"EDE5",31006:"EDE6",31028:"EDE7",40859:"EDE8",40697:"EDE9",40699:"EDEA",40700:"EDEB",30449:"EDEC",30468:"EDED",30477:"EDEE",30457:"EDEF",30471:"EDF0",30472:"EDF1",30490:"EDF2",30498:"EDF3",30489:"EDF4",30509:"EDF5",30502:"EDF6",30517:"EDF7",30520:"EDF8",30544:"EDF9",30545:"EDFA",30535:"EDFB",30531:"EDFC",30554:"EDFD",30568:"EDFE",30562:"EEA1",30565:"EEA2",30591:"EEA3",30605:"EEA4",30589:"EEA5",30592:"EEA6",30604:"EEA7",30609:"EEA8",30623:"EEA9",30624:"EEAA",30640:"EEAB",30645:"EEAC",30653:"EEAD",30010:"EEAE",30016:"EEAF",30030:"EEB0",30027:"EEB1",30024:"EEB2",30043:"EEB3",30066:"EEB4",30073:"EEB5",30083:"EEB6",32600:"EEB7",32609:"EEB8",32607:"EEB9",35400:"EEBA",32616:"EEBB",32628:"EEBC",32625:"EEBD",32633:"EEBE",32641:"EEBF",32638:"EEC0",30413:"EEC1",30437:"EEC2",34866:"EEC3",38021:"EEC4",38022:"EEC5",38023:"EEC6",38027:"EEC7",38026:"EEC8",38028:"EEC9",38029:"EECA",38031:"EECB",38032:"EECC",38036:"EECD",38039:"EECE",38037:"EECF",38042:"EED0",38043:"EED1",38044:"EED2",38051:"EED3",38052:"EED4",38059:"EED5",38058:"EED6",38061:"EED7",38060:"EED8",38063:"EED9",38064:"EEDA",38066:"EEDB",38068:"EEDC",38070:"EEDD",38071:"EEDE",38072:"EEDF",38073:"EEE0",38074:"EEE1",38076:"EEE2",38077:"EEE3",38079:"EEE4",38084:"EEE5",38088:"EEE6",38089:"EEE7",38090:"EEE8",38091:"EEE9",38092:"EEEA",38093:"EEEB",38094:"EEEC",38096:"EEED",38097:"EEEE",38098:"EEEF",38101:"EEF0",38102:"EEF1",38103:"EEF2",38105:"EEF3",38104:"EEF4",38107:"EEF5",38110:"EEF6",38111:"EEF7",38112:"EEF8",38114:"EEF9",38116:"EEFA",38117:"EEFB",38119:"EEFC",38120:"EEFD",38122:"EEFE",38121:"EFA1",38123:"EFA2",38126:"EFA3",38127:"EFA4",38131:"EFA5",38132:"EFA6",38133:"EFA7",38135:"EFA8",38137:"EFA9",38140:"EFAA",38141:"EFAB",38143:"EFAC",38147:"EFAD",38146:"EFAE",38150:"EFAF",38151:"EFB0",38153:"EFB1",38154:"EFB2",38157:"EFB3",38158:"EFB4",38159:"EFB5",38162:"EFB6",38163:"EFB7",38164:"EFB8",38165:"EFB9",38166:"EFBA",38168:"EFBB",38171:"EFBC",38173:"EFBD",38174:"EFBE",38175:"EFBF",38178:"EFC0",38186:"EFC1",38187:"EFC2",38185:"EFC3",38188:"EFC4",38193:"EFC5",38194:"EFC6",38196:"EFC7",38198:"EFC8",38199:"EFC9",38200:"EFCA",38204:"EFCB",38206:"EFCC",38207:"EFCD",38210:"EFCE",38197:"EFCF",38212:"EFD0",38213:"EFD1",38214:"EFD2",38217:"EFD3",38220:"EFD4",38222:"EFD5",38223:"EFD6",38226:"EFD7",38227:"EFD8",38228:"EFD9",38230:"EFDA",38231:"EFDB",38232:"EFDC",38233:"EFDD",38235:"EFDE",38238:"EFDF",38239:"EFE0",38237:"EFE1",38241:"EFE2",38242:"EFE3",38244:"EFE4",38245:"EFE5",38246:"EFE6",38247:"EFE7",38248:"EFE8",38249:"EFE9",38250:"EFEA",38251:"EFEB",38252:"EFEC",38255:"EFED",38257:"EFEE",38258:"EFEF",38259:"EFF0",38202:"EFF1",30695:"EFF2",30700:"EFF3",38601:"EFF4",31189:"EFF5",31213:"EFF6",31203:"EFF7",31211:"EFF8",31238:"EFF9",23879:"EFFA",31235:"EFFB",31234:"EFFC",31262:"EFFD",31252:"EFFE",31289:"F0A1",31287:"F0A2",31313:"F0A3",40655:"F0A4",39333:"F0A5",31344:"F0A6",30344:"F0A7",30350:"F0A8",30355:"F0A9",30361:"F0AA",30372:"F0AB",29918:"F0AC",29920:"F0AD",29996:"F0AE",40480:"F0AF",40482:"F0B0",40488:"F0B1",40489:"F0B2",40490:"F0B3",40491:"F0B4",40492:"F0B5",40498:"F0B6",40497:"F0B7",40502:"F0B8",40504:"F0B9",40503:"F0BA",40505:"F0BB",40506:"F0BC",40510:"F0BD",40513:"F0BE",40514:"F0BF",40516:"F0C0",40518:"F0C1",40519:"F0C2",40520:"F0C3",40521:"F0C4",40523:"F0C5",40524:"F0C6",40526:"F0C7",40529:"F0C8",40533:"F0C9",40535:"F0CA",40538:"F0CB",40539:"F0CC",40540:"F0CD",40542:"F0CE",40547:"F0CF",40550:"F0D0",40551:"F0D1",40552:"F0D2",40553:"F0D3",40554:"F0D4",40555:"F0D5",40556:"F0D6",40561:"F0D7",40557:"F0D8",40563:"F0D9",30098:"F0DA",30100:"F0DB",30102:"F0DC",30112:"F0DD",30109:"F0DE",30124:"F0DF",30115:"F0E0",30131:"F0E1",30132:"F0E2",30136:"F0E3",30148:"F0E4",30129:"F0E5",30128:"F0E6",30147:"F0E7",30146:"F0E8",30166:"F0E9",30157:"F0EA",30179:"F0EB",30184:"F0EC",30182:"F0ED",30180:"F0EE",30187:"F0EF",30183:"F0F0",30211:"F0F1",30193:"F0F2",30204:"F0F3",30207:"F0F4",30224:"F0F5",30208:"F0F6",30213:"F0F7",30220:"F0F8",30231:"F0F9",30218:"F0FA",30245:"F0FB",30232:"F0FC",30229:"F0FD",30233:"F0FE",30235:"F1A1",30268:"F1A2",30242:"F1A3",30240:"F1A4",30272:"F1A5",30253:"F1A6",30256:"F1A7",30271:"F1A8",30261:"F1A9",30275:"F1AA",30270:"F1AB",30259:"F1AC",30285:"F1AD",30302:"F1AE",30292:"F1AF",30300:"F1B0",30294:"F1B1",30315:"F1B2",30319:"F1B3",32714:"F1B4",31462:"F1B5",31352:"F1B6",31353:"F1B7",31360:"F1B8",31366:"F1B9",31368:"F1BA",31381:"F1BB",31398:"F1BC",31392:"F1BD",31404:"F1BE",31400:"F1BF",31405:"F1C0",31411:"F1C1",34916:"F1C2",34921:"F1C3",34930:"F1C4",34941:"F1C5",34943:"F1C6",34946:"F1C7",34978:"F1C8",35014:"F1C9",34999:"F1CA",35004:"F1CB",35017:"F1CC",35042:"F1CD",35022:"F1CE",35043:"F1CF",35045:"F1D0",35057:"F1D1",35098:"F1D2",35068:"F1D3",35048:"F1D4",35070:"F1D5",35056:"F1D6",35105:"F1D7",35097:"F1D8",35091:"F1D9",35099:"F1DA",35082:"F1DB",35124:"F1DC",35115:"F1DD",35126:"F1DE",35137:"F1DF",35174:"F1E0",35195:"F1E1",30091:"F1E2",32997:"F1E3",30386:"F1E4",30388:"F1E5",30684:"F1E6",32786:"F1E7",32788:"F1E8",32790:"F1E9",32796:"F1EA",32800:"F1EB",32802:"F1EC",32805:"F1ED",32806:"F1EE",32807:"F1EF",32809:"F1F0",32808:"F1F1",32817:"F1F2",32779:"F1F3",32821:"F1F4",32835:"F1F5",32838:"F1F6",32845:"F1F7",32850:"F1F8",32873:"F1F9",32881:"F1FA",35203:"F1FB",39032:"F1FC",39040:"F1FD",39043:"F1FE",39049:"F2A1",39052:"F2A2",39053:"F2A3",39055:"F2A4",39060:"F2A5",39066:"F2A6",39067:"F2A7",39070:"F2A8",39071:"F2A9",39073:"F2AA",39074:"F2AB",39077:"F2AC",39078:"F2AD",34381:"F2AE",34388:"F2AF",34412:"F2B0",34414:"F2B1",34431:"F2B2",34426:"F2B3",34428:"F2B4",34427:"F2B5",34472:"F2B6",34445:"F2B7",34443:"F2B8",34476:"F2B9",34461:"F2BA",34471:"F2BB",34467:"F2BC",34474:"F2BD",34451:"F2BE",34473:"F2BF",34486:"F2C0",34500:"F2C1",34485:"F2C2",34510:"F2C3",34480:"F2C4",34490:"F2C5",34481:"F2C6",34479:"F2C7",34505:"F2C8",34511:"F2C9",34484:"F2CA",34537:"F2CB",34545:"F2CC",34546:"F2CD",34541:"F2CE",34547:"F2CF",34512:"F2D0",34579:"F2D1",34526:"F2D2",34548:"F2D3",34527:"F2D4",34520:"F2D5",34513:"F2D6",34563:"F2D7",34567:"F2D8",34552:"F2D9",34568:"F2DA",34570:"F2DB",34573:"F2DC",34569:"F2DD",34595:"F2DE",34619:"F2DF",34590:"F2E0",34597:"F2E1",34606:"F2E2",34586:"F2E3",34622:"F2E4",34632:"F2E5",34612:"F2E6",34609:"F2E7",34601:"F2E8",34615:"F2E9",34623:"F2EA",34690:"F2EB",34594:"F2EC",34685:"F2ED",34686:"F2EE",34683:"F2EF",34656:"F2F0",34672:"F2F1",34636:"F2F2",34670:"F2F3",34699:"F2F4",34643:"F2F5",34659:"F2F6",34684:"F2F7",34660:"F2F8",34649:"F2F9",34661:"F2FA",34707:"F2FB",34735:"F2FC",34728:"F2FD",34770:"F2FE",34758:"F3A1",34696:"F3A2",34693:"F3A3",34733:"F3A4",34711:"F3A5",34691:"F3A6",34731:"F3A7",34789:"F3A8",34732:"F3A9",34741:"F3AA",34739:"F3AB",34763:"F3AC",34771:"F3AD",34749:"F3AE",34769:"F3AF",34752:"F3B0",34762:"F3B1",34779:"F3B2",34794:"F3B3",34784:"F3B4",34798:"F3B5",34838:"F3B6",34835:"F3B7",34814:"F3B8",34826:"F3B9",34843:"F3BA",34849:"F3BB",34873:"F3BC",34876:"F3BD",32566:"F3BE",32578:"F3BF",32580:"F3C0",32581:"F3C1",33296:"F3C2",31482:"F3C3",31485:"F3C4",31496:"F3C5",31491:"F3C6",31492:"F3C7",31509:"F3C8",31498:"F3C9",31531:"F3CA",31503:"F3CB",31559:"F3CC",31544:"F3CD",31530:"F3CE",31513:"F3CF",31534:"F3D0",31537:"F3D1",31520:"F3D2",31525:"F3D3",31524:"F3D4",31539:"F3D5",31550:"F3D6",31518:"F3D7",31576:"F3D8",31578:"F3D9",31557:"F3DA",31605:"F3DB",31564:"F3DC",31581:"F3DD",31584:"F3DE",31598:"F3DF",31611:"F3E0",31586:"F3E1",31602:"F3E2",31601:"F3E3",31632:"F3E4",31654:"F3E5",31655:"F3E6",31672:"F3E7",31660:"F3E8",31645:"F3E9",31656:"F3EA",31621:"F3EB",31658:"F3EC",31644:"F3ED",31650:"F3EE",31659:"F3EF",31668:"F3F0",31697:"F3F1",31681:"F3F2",31692:"F3F3",31709:"F3F4",31706:"F3F5",31717:"F3F6",31718:"F3F7",31722:"F3F8",31756:"F3F9",31742:"F3FA",31740:"F3FB",31759:"F3FC",31766:"F3FD",31755:"F3FE",31775:"F4A1",31786:"F4A2",31782:"F4A3",31800:"F4A4",31809:"F4A5",31808:"F4A6",33278:"F4A7",33281:"F4A8",33282:"F4A9",33284:"F4AA",33260:"F4AB",34884:"F4AC",33313:"F4AD",33314:"F4AE",33315:"F4AF",33325:"F4B0",33327:"F4B1",33320:"F4B2",33323:"F4B3",33336:"F4B4",33339:"F4B5",33331:"F4B6",33332:"F4B7",33342:"F4B8",33348:"F4B9",33353:"F4BA",33355:"F4BB",33359:"F4BC",33370:"F4BD",33375:"F4BE",33384:"F4BF",34942:"F4C0",34949:"F4C1",34952:"F4C2",35032:"F4C3",35039:"F4C4",35166:"F4C5",32669:"F4C6",32671:"F4C7",32679:"F4C8",32687:"F4C9",32688:"F4CA",32690:"F4CB",31868:"F4CC",25929:"F4CD",31889:"F4CE",31901:"F4CF",31900:"F4D0",31902:"F4D1",31906:"F4D2",31922:"F4D3",31932:"F4D4",31933:"F4D5",31937:"F4D6",31943:"F4D7",31948:"F4D8",31949:"F4D9",31944:"F4DA",31941:"F4DB",31959:"F4DC",31976:"F4DD",33390:"F4DE",26280:"F4DF",32703:"F4E0",32718:"F4E1",32725:"F4E2",32741:"F4E3",32737:"F4E4",32742:"F4E5",32745:"F4E6",32750:"F4E7",32755:"F4E8",31992:"F4E9",32119:"F4EA",32166:"F4EB",32174:"F4EC",32327:"F4ED",32411:"F4EE",40632:"F4EF",40628:"F4F0",36211:"F4F1",36228:"F4F2",36244:"F4F3",36241:"F4F4",36273:"F4F5",36199:"F4F6",36205:"F4F7",35911:"F4F8",35913:"F4F9",37194:"F4FA",37200:"F4FB",37198:"F4FC",37199:"F4FD",37220:"F4FE",37218:"F5A1",37217:"F5A2",37232:"F5A3",37225:"F5A4",37231:"F5A5",37245:"F5A6",37246:"F5A7",37234:"F5A8",37236:"F5A9",37241:"F5AA",37260:"F5AB",37253:"F5AC",37264:"F5AD",37261:"F5AE",37265:"F5AF",37282:"F5B0",37283:"F5B1",37290:"F5B2",37293:"F5B3",37294:"F5B4",37295:"F5B5",37301:"F5B6",37300:"F5B7",37306:"F5B8",35925:"F5B9",40574:"F5BA",36280:"F5BB",36331:"F5BC",36357:"F5BD",36441:"F5BE",36457:"F5BF",36277:"F5C0",36287:"F5C1",36284:"F5C2",36282:"F5C3",36292:"F5C4",36310:"F5C5",36311:"F5C6",36314:"F5C7",36318:"F5C8",36302:"F5C9",36303:"F5CA",36315:"F5CB",36294:"F5CC",36332:"F5CD",36343:"F5CE",36344:"F5CF",36323:"F5D0",36345:"F5D1",36347:"F5D2",36324:"F5D3",36361:"F5D4",36349:"F5D5",36372:"F5D6",36381:"F5D7",36383:"F5D8",36396:"F5D9",36398:"F5DA",36387:"F5DB",36399:"F5DC",36410:"F5DD",36416:"F5DE",36409:"F5DF",36405:"F5E0",36413:"F5E1",36401:"F5E2",36425:"F5E3",36417:"F5E4",36418:"F5E5",36433:"F5E6",36434:"F5E7",36426:"F5E8",36464:"F5E9",36470:"F5EA",36476:"F5EB",36463:"F5EC",36468:"F5ED",36485:"F5EE",36495:"F5EF",36500:"F5F0",36496:"F5F1",36508:"F5F2",36510:"F5F3",35960:"F5F4",35970:"F5F5",35978:"F5F6",35973:"F5F7",35992:"F5F8",35988:"F5F9",26011:"F5FA",35286:"F5FB",35294:"F5FC",35290:"F5FD",35292:"F5FE",35301:"F6A1",35307:"F6A2",35311:"F6A3",35390:"F6A4",35622:"F6A5",38739:"F6A6",38633:"F6A7",38643:"F6A8",38639:"F6A9",38662:"F6AA",38657:"F6AB",38664:"F6AC",38671:"F6AD",38670:"F6AE",38698:"F6AF",38701:"F6B0",38704:"F6B1",38718:"F6B2",40832:"F6B3",40835:"F6B4",40837:"F6B5",40838:"F6B6",40839:"F6B7",40840:"F6B8",40841:"F6B9",40842:"F6BA",40844:"F6BB",40702:"F6BC",40715:"F6BD",40717:"F6BE",38585:"F6BF",38588:"F6C0",38589:"F6C1",38606:"F6C2",38610:"F6C3",30655:"F6C4",38624:"F6C5",37518:"F6C6",37550:"F6C7",37576:"F6C8",37694:"F6C9",37738:"F6CA",37834:"F6CB",37775:"F6CC",37950:"F6CD",37995:"F6CE",40063:"F6CF",40066:"F6D0",40069:"F6D1",40070:"F6D2",40071:"F6D3",40072:"F6D4",31267:"F6D5",40075:"F6D6",40078:"F6D7",40080:"F6D8",40081:"F6D9",40082:"F6DA",40084:"F6DB",40085:"F6DC",40090:"F6DD",40091:"F6DE",40094:"F6DF",40095:"F6E0",40096:"F6E1",40097:"F6E2",40098:"F6E3",40099:"F6E4",40101:"F6E5",40102:"F6E6",40103:"F6E7",40104:"F6E8",40105:"F6E9",40107:"F6EA",40109:"F6EB",40110:"F6EC",40112:"F6ED",40113:"F6EE",40114:"F6EF",40115:"F6F0",40116:"F6F1",40117:"F6F2",40118:"F6F3",40119:"F6F4",40122:"F6F5",40123:"F6F6",40124:"F6F7",40125:"F6F8",40132:"F6F9",40133:"F6FA",40134:"F6FB",40135:"F6FC",40138:"F6FD",40139:"F6FE",40140:"F7A1",40141:"F7A2",40142:"F7A3",40143:"F7A4",40144:"F7A5",40147:"F7A6",40148:"F7A7",40149:"F7A8",40151:"F7A9",40152:"F7AA",40153:"F7AB",40156:"F7AC",40157:"F7AD",40159:"F7AE",40162:"F7AF",38780:"F7B0",38789:"F7B1",38801:"F7B2",38802:"F7B3",38804:"F7B4",38831:"F7B5",38827:"F7B6",38819:"F7B7",38834:"F7B8",38836:"F7B9",39601:"F7BA",39600:"F7BB",39607:"F7BC",40536:"F7BD",39606:"F7BE",39610:"F7BF",39612:"F7C0",39617:"F7C1",39616:"F7C2",39621:"F7C3",39618:"F7C4",39627:"F7C5",39628:"F7C6",39633:"F7C7",39749:"F7C8",39747:"F7C9",39751:"F7CA",39753:"F7CB",39752:"F7CC",39757:"F7CD",39761:"F7CE",39144:"F7CF",39181:"F7D0",39214:"F7D1",39253:"F7D2",39252:"F7D3",39647:"F7D4",39649:"F7D5",39654:"F7D6",39663:"F7D7",39659:"F7D8",39675:"F7D9",39661:"F7DA",39673:"F7DB",39688:"F7DC",39695:"F7DD",39699:"F7DE",39711:"F7DF",39715:"F7E0",40637:"F7E1",40638:"F7E2",32315:"F7E3",40578:"F7E4",40583:"F7E5",40584:"F7E6",40587:"F7E7",40594:"F7E8",37846:"F7E9",40605:"F7EA",40607:"F7EB",40667:"F7EC",40668:"F7ED",40669:"F7EE",40672:"F7EF",40671:"F7F0",40674:"F7F1",40681:"F7F2",40679:"F7F3",40677:"F7F4",40682:"F7F5",40687:"F7F6",40738:"F7F7",40748:"F7F8",40751:"F7F9",40761:"F7FA",40759:"F7FB",40765:"F7FC",40766:"F7FD",40772:"F7FE"};

    var i = 0;
    var l = str.length;

    var ret = [];
    var charCode;
    var gCode;

    for (i = 0; i < l; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 127) {
            ret.push('%' + charCode.toString(16));
        } else {
            gCode = map.hasOwnProperty(charCode) && map[charCode];
            if (gCode) {
                while (gCode.length < 4) {
                    gCode = '0' + gCode;
                };
                ret.push('%' + gCode.slice(0, 2) + '%' + gCode.slice(2, 4));
            } else {
                //字库里面没有.
            };
        };
    };

    return ret.join('');
}


// 转换文本数据为 englineList 对象
function parseDataStr(str, skipCommentLine) {
    if (typeof skipCommentLine == 'undefined') {
        skipCommentLine = true;
    }

    // 提前处理下特殊的 post 方式
    str = str.replace(/[\n\r]+[\s\/]*-/g, '_POST_');

    var parseArgs = function(str) {
        var arr = str.replace(/，/g, ', ').split(/\s*, \s*/);
        var args = {};
        arr.forEach(function(s){
            var argArr = s.split(/\s*: \s*/);
            args[argArr[0]] = argArr[1];
        });
        return args;
    };

    var isEncoding = function(str) {
        return ['utf-8', 'gbk'].indexOf(str.toLowerCase()) != -1;
    };

    var parseLine = function (line) {
        line = line.trim();

        if (!line) {
            return;
        }

        if (line.indexOf('//') == 0) {  // 注释行
            if (skipCommentLine) {
                return;
            } else {
                line = line.replace(/^\/\/\s*/, '');
            }
        }

        var engline = {};

        if (line.indexOf('_POST_') != -1) {
            engline.method = 'POST';
            var two = line.split(/\s*_POST_\s*/);
            line = two[0];
            engline.args = parseArgs(two[1]);
        }

        var arr = line.replace(/，/g, ', ').split(/\s*, \s*/);
        if (arr.length === 1) {  // 分类
            return line;
        }

        engline.name = arr[0];
        engline.url = arr[1];
        engline.host = parseUri(engline.url).host;

        // 处理编码和图标
        if (arr[2] && isEncoding(arr[2])) {
            engline.encoding = arr[2];
            engline.favicon = arr[3];
        } else {
            engline.favicon = arr[2];
        }

        if (typeof ICON_DATA != 'undefined') {
            // engline.favicon 可能为几种情况：base64 图标、在线图标、域名
            engline.favicon = ICON_DATA[engline.favicon] || engline.favicon || ICON_DATA[engline.host] || getFaviconUrl(engline.url);
        }

        return engline;
    };

    var list = {},
        type;

    str.split(/[\n\r]+/).forEach(function(line){
        var engline = parseLine(line);
        if (!engline) {
            return;
        }

        if (typeof engline === 'string') {
            type = line.trim();
            list[type] = [];
        } else {
            // engline.type = type;
            list[type].push(engline);
        }
    });

    return list;
}


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
var parseUri = function(str) {
    var o = parseUri.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.ds.name] = {};
    uri[o.ds.name][0] = {};
    uri[o.ds.name][0]['key'] = (uri.protocol ? uri.protocol : 'http') + '://' + uri.host + (uri.port ? ':' + uri.port : '') + '/';
    uri[o.ds.name][0]['val'] = '/';
    var i = 0,
        tempsub = '/',
        subs = uri[o.key[10]].substr(1).split('/');
    for (var j = 1; j < (subs.length + 1); j++, i++) {
        tempsub += tempsub === '/' ? subs[i] : '/' + subs[i];
        if (subs[i]) {
            uri[o.ds.name][j] = {};
            uri[o.ds.name][j]['key'] = subs[i];
            uri[o.ds.name][j]['val'] = tempsub;
        }
    }

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });
    uri[o.aq.name] = {};
    uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
        if ($1) uri[o.aq.name][$1] = $2;
    });

    return uri;
};
parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    aq: {
        name: "anchorqueryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    ds: {
        name: "directorySub"
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};


if (typeof exports !== 'undefined') {
    exports.parseDataStr = parseDataStr;
    exports.parseUri = parseUri;
}


// --------------------开始运行------------------------

// iframe 禁止加载
if (window.self != window.top) return;

var matchedRule;

rules.some(function (rule) {
    if (toRE(rule.url).test(location.href)) {
        matchedRule = rule;
        if (typeof rule.etc == 'function') {
            try {
                rule.etc();
            } catch(ex) {
                console.error('执行 etc 错误', ex);
            }
        }
        return true;
    };
});


debug('匹配的规则为', matchedRule);
if (!matchedRule || !matchedRule.enabled) return;


// 列表对象
function DropDownList(a, list) {
    this.a = a;
    this.list = list;
    this.init();
};
DropDownList.zIndex = 100000000;

DropDownList.prototype = {
    hidden: true,
    showDelay: 233,
    hideDelay: 266,
    aShownClass: 'sej-drop-list-trigger-shown',

    init: function () {
        var a = this.a;
        var list = this.list;

        var self = this;

        // 进入显示
        mouseEventListener.add('mouseenter', a, function () {
            clearTimeout(self.hideTimerId);

            if (self.hidden) {
                self.showTimerId = setTimeout(function () {
                    self.show();
                }, self.showDelay);
            } else {
                var style = list.style;
                style.zIndex = DropDownList.zIndex ++;
                style.opacity = 0.96;
            };
        });

        // 离开隐藏
        mouseEventListener.add('mouseleave', a, function () {
            clearTimeout(self.showTimerId);

            if (!self.hidden) {
                list.style.opacity = 0.3;
                self.hideTimerId = setTimeout(function () {
                    self.hide();
                }, self.hideDelay);
            };
        });

        mouseEventListener.add('mouseenter', list, function () {
            clearTimeout(self.hideTimerId);

            var style = list.style;
            style.zIndex = DropDownList.zIndex ++;
            style.opacity = 0.96;
        });

        mouseEventListener.add('mouseleave', list, function () {

            list.style.opacity = 0.3;
            self.hideTimerId = setTimeout(function () {
                self.hide();
            }, self.hideDelay);
        });

    },
    show: function () {
        if (!this.hidden) return;
        this.hidden = false;

        var scrolled = getScrolled();
        var aBCRect = this.a.getBoundingClientRect();

        var style = this.list.style;

        var top, left;
        if (this.a.dataset.horizontal) { // 向右展开
            top = scrolled.y + aBCRect.top;
            left = scrolled.x + aBCRect.left + this.a.clientWidth;
        } else { // 默认的向下展开
            top = scrolled.y + aBCRect.bottom;
            left = scrolled.x + aBCRect.left;
        }

        style.top = top + 6 + 'px';
        style.left = left + 'px';
        style.zIndex = DropDownList.zIndex ++;
        style.display = 'block';

        setTimeout(function () {
            style.opacity = 0.96;
            style.top = top + 'px';
        }, 30);

        this.a.classList.add(this.aShownClass);

    },
    hide: function () {
        if (this.hidden) return;
        this.hidden = true;

        var style = this.list.style;
        style.display = 'none';
        style.opacity = 0.3;

        this.a.classList.remove(this.aShownClass);

    },
};


function addGlobalStyle() {
    // 添加全局样式和自定义样式
    var globalStyle = document.getElementById('sej-style');
    if (!globalStyle) {
        globalStyle = document.createElement('style');
        globalStyle.id = 'sej-style';
        globalStyle.type = 'text/css';
        globalStyle.textContent = MAIN_CSS + '\n' + (matchedRule.stylish || '');
        document.head.appendChild(globalStyle);
    }
}

function addContainer(iTarget, iInput) {
    var pageEncoding = (document.characterSet || document.charset).toLowerCase();

    // 创建dom
    var aPattern = '<a href="" class="sej-engine"' + (prefs.openInNewTab ? ' target="_blank" ' : ' ') +
        'encoding="$encoding$" url="$url$" onclick="$onclick$" title="$title$">' + 
        '<img src="$favicon$" class="sej-engine-icon" />$form$<span>$name$</span></a>';

    var container = document.createElement('sejspan');
    container.id = 'sej-container';

    container.addEventListener('mousedown', mousedownhandler, true);
    // container.addEventListener('mouseover', mousedownhandler, true);

    // container.style.cssText = 'margin: 0 auto; max-width: 1100px;';
    if (matchedRule.style) {
        container.style.cssText += matchedRule.style;
    }

    var dropLists = [];
    var AllEngineList = parseDataStr(engineListDataStr);
    var isFirstDropList = true;
    var isMatched = false;  // 当前搜索只匹配一次

    Object.keys(AllEngineList).forEach(function (categoryStr) {
        var categoryArr = categoryStr.split('-');

        var category = {
            str: categoryStr,
            name: categoryArr[0],
            icon: categoryArr[1],
            insert: categoryArr[2]
        };

        var engines = [];

        var engineList = AllEngineList[categoryStr];
        engineList.forEach(function (engine) {
            if (matchedRule.engineList && !isMatched && toRE(matchedRule.url).test(engine.url)) { // 去掉跳转到当前引擎的引擎
                isMatched = true;
                return;
            }

            var a = aPattern.replace('$encoding$', (engine.encoding || 'utf-8').toLowerCase())
                .replace('$url$', engine.url)
                .replace('$name$', engine.name)
                .replace('$title$', engine.name);
            if (engine.favicon) {
                a = a.replace('$favicon$', engine.favicon);
            } else {
                a = a.replace('src="$favicon$"', '');
            }

            if (engine.method && engine.method.toUpperCase() == 'POST') {
                var f = wrapToHide(getPostFormHTML(engine.url, engine.args, prefs.openInNewTab));
                a = a.replace('$form$', f);
                a = a.replace('$onclick$', "this.getElementsByTagName('form')[0].submit();return false;");
            } else {
                a = a.replace('$form$', '');
                a = a.replace('onclick="$onclick$"', '');
            }

            engines.push(a);
        });

        // 非空列表
        if (!engines.length) return;

        // 插入一个节点给 insertBefore 用
        var lastInsertTitle = category.name;
        engines = engines.join('') + '<span class="sej-engine" title="' + lastInsertTitle + '" style="display: none;"></span>';

        if (isTheSameCategory(category.name, matchedRule.engineList)) {
            container.innerHTML = '<sejspan id="sej-expanded-category">'+ category.name +'</sejspan>' + engines;
        } else {
            var dropList = document.createElement('sejspan');
            dropList.className = 'sej-drop-list';
            dropList.innerHTML = engines;

            // 有子 droplist
            var a = dropList.firstElementChild.cloneNode(true);
            a.className = a.className + ' sej-drop-list-trigger';
            a.title = category.name;
            a.lastChild.textContent = category.name;

            // 更改图标
            if (category.icon) {
                var e = engineList[category.icon - 1];
                if (e && e.favicon) {  // 数字匹配
                    a.firstChild.src = e.favicon;
                } else {  // 名称匹配
                    for (var i = 0; i < engineList.length; i++) {
                        if (engineList[i].name == category.icon) {
                            a.firstChild.src = engineList[i].favicon;
                            break;
                        }
                    };
                }
            }

            // 是否为第一个 droplist
            if (isFirstDropList) {
                a.className += ' first';
                isFirstDropList = false;
            }

            // 重新插入的位置
            if (typeof category.insert !== 'undefined') {
                a.dataset.horizontal = true;
                a.dataset.insert = category.insert;
            }

            dropLists.push({
                a: a, 
                dropList: dropList
            });
        };
    });

    dropLists.forEach(function (item, index) {
        var a = item.a,
            dropList = item.dropList;

        // 移到某个类别里面
        var ins;
        var insert = a.dataset.insert;
        if (typeof insert !== 'undefined') {
            ins = document.querySelector('.sej-engine[title="' + insert + '"]:not(.sej-drop-list-trigger)');

            // var prevChilds = document.querySelectorAll('');

            // var prevItem = dropLists[index - 2];
            // if (prevItem) {
            //     var prevChilds = prevItem.dropList.children;

            //     if (insert < prevChilds.length) {
            //         ins = prevChilds[insert];
            //     } else {
            //         ins = document.querySelector('.sej-engine[title="' + a.dataset.insert + '"]:not(.sej-drop-list-trigger)');
            //     }
            // }
        }

        if (ins) {
            ins.parentNode.insertBefore(a, ins);
        } else {
            container.appendChild(a);
        }

        if (a.dataset.horizontal && a.parentNode.id === container.id) {  // 如果是顶层，菜单不需要修正
            a.removeAttribute('data-horizontal');

            // 插入到第一个类别前面
            ins = container.querySelector('a.sej-engine.first');
            ins.parentNode.insertBefore(a, ins);
        }

        document.body.appendChild(dropList);

        dropList.addEventListener('mousedown', mousedownhandler, true);
        // dropList.addEventListener('mouseover', mousedownhandler, true);

        new DropDownList(a, dropList);
    });

	// 添加设置按钮
	var configBtn = document.createElement('a');
	configBtn.innerHTML = '<img class="sej-engine-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbklEQVQ4jZWSu0oDURCGp9BCLcRCAzFGsjvzHwyoWbMzYKWdErBREQQLG/F90qW1y5sEfYGgTyBewBtRiYlFdkPibowOnGrn+883Z5bo95ogKk+O6RkNQ6wFsbbvry38iWAOD5mDIhGRSHjgYF0H64qE50REhUKw7FhPRsC6B9GOE31z0GYM94/YtYM99wL1NBEArC8CepcAk+fF80qSauGgV70m/YRoTURLzEERElYh1nKwLsRuEqDnlWcd6xFEOw7WBewiYShhNbYA9CyfX50b+GhPg5rMtpl8o6A42AOxdiazNhOp28NwgG79DBDR0vBb6Ec2W54mIqJcLjcFhBWIfkWK9eQIWhtY63EfHm6yRqwHaJ053Ga2TcAuHPQzurmZugHPK+cd9H78GvVVZGMlEcBsO9EIjxBrxOP0jLQD6CXEbuMRUi2AsOL7G0xE5Hzd7d8a/b5LS0FWRPdT4ZSacLBniL4zB/N/hf5d3635oJ6ZNLU9AAAAAElFTkSuQmCC" />';
	configBtn.onclick = openPrefs;
	container.appendChild(configBtn);
 
    // 插入到文档中
    switch (matchedRule.insertIntoDoc.where.toLowerCase()) {
        case 'beforebegin' :
            iTarget.parentNode.insertBefore(container, iTarget);
        break;
        case 'afterbegin' :
            if (iTarget.firstChild) {
                iTarget.insertBefore(container, iTarget.firstChild);
            } else {
                iTarget.appendChild(container);
            }
        break;
        case 'beforeend' :
            iTarget.appendChild(container);
        break;
        case 'afterend' :
            if (iTarget.nextSibling) {
                iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
            } else {
                iTarget.parentNode.appendChild(container);
            }
        break;

    };

    // 插入后调整下，如果变成两行，隐藏文字
    if (prefs.hideEnglineLabel == 2 || (prefs.hideEnglineLabel == 1 && container.clientHeight / container.children[1].clientHeight > 2)) {
        [].forEach.call(document.querySelectorAll('#sej-container > a[class="sej-engine"] > span'), function(link) {
        	link.parentNode.classList.add('only-icon');
        });
    }

    function mousedownhandler(e) {
        var target = e.target;

        target = getElementByXPath('ancestor-or-self::a[contains(@class, "sej-engine")]', target);

        // if (!target || target.className.indexOf('sej-engine') == -1) return;
        if (!target || !this.contains(target)) return;

        var value;
        if (typeof iInput == 'function') {
            value = iInput();
        } else {
            if (iInput.nodeName == 'INPUT' || iInput.localName == 'textarea') {
                value = iInput.value;
            } else {
                value = iInput.textContent;
            }
        }

        // 根据后代元素中是否存在 form 元素，判断提交方式并进行处理
        // 如果没有 form 元素，将会使用 GET 方法提交；如果有，将会使用 POST 方法提交
        var forms = target.getElementsByTagName('form');
        if (forms.length == 0) { // 提交方式为 GET
            // 处理编码
            var encoding = target.getAttribute('encoding');
            if (encoding == 'utf-8') {
                value = encodeURIComponent(value);
            } else if (encoding.indexOf('gb') == 0) {// 引擎接受gbk编码
                if (pageEncoding.indexOf('gb') != 0) {// 如果当前页面也使用gbk编码的话，那么不需要再编码
                    value = toGBK(value);
                }
            }

            // console.log(value);
            target.href = target.getAttribute('url').replace(/%s/g, value); // 替换“全部”关键词
        } else { // 提交方式为 POST
            var inputs = target.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = inputs[i].value.replace(/%s/g, value); // // 替换“全部”关键词
            }
        }
    }
}

function run() {
    // 百度搜索插入到顶部搜索条下面就会造成页面部分元素的消失，所以需要每个部分都判断下是否存在

    // 判断插入位置和输入框是否存在
    var iTarget = getElement(matchedRule.insertIntoDoc.target);
    var iInput = typeof matchedRule.insertIntoDoc.keyword == 'function' ? matchedRule.insertIntoDoc.keyword : getElement(matchedRule.insertIntoDoc.keyword);
    debug('插入的位置为 %o', iTarget);
    debug('匹配的输入框为 %o', iInput);

    if (!iTarget || !iInput) {
        debug('不存在插入的位置或匹配的输入框', iTarget, iInput);
        return;
    }

    addGlobalStyle();

    // 判断是否存在
    var container = document.getElementById('sej-container'),
        sejspan = document.querySelector('sejspan.sej-drop-list');
    if (!container || !sejspan) {
        if (container) {
            container.parentNode.removeChild(container);
        }
        addContainer(iTarget, iInput);
    }
}

function remove() {
	var elems = document.querySelectorAll('#sej-container, sejspan.sej-drop-list');
	if (!elems) return;

	[].forEach.call(elems, function(elem) {
		elem.parentNode.removeChild(elem);
	});
}


run();

if (matchedRule.mutationTitle) {
    // 监视标题的变化
    debug('添加节点监视器: title');

    var watch = document.querySelector('title');
    var observer = new MutationObserver(function(mutations){
        debug('标题发生了变化', document.title);
        run();
    });
    observer.observe(watch, {childList: true, subtree: true, characterData: true});
}


})()