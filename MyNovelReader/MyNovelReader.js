// ==UserScript==
// @id             mynovelreader@ywzhaiqi@gmail.com
// @name           My Novel Reader For Opera Mobile
// @version        2.4.5
// @namespace
// @author         ywzhaiqi@gmail.com
// @description    小说阅读脚本，实现清爽阅读。2种模式：自定义站点配置和自动站点配置。

// @include        http://read.qidian.com/*,*.aspx
// @include        http://www.qdmm.com/BookReader/*,*.aspx
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
// 需特殊处理的论坛
// @include        http://www.fkzww.net/thread-*.html

// @exclude        */List.shtml
// @exclude        */List.html
// @exclude        */index.html
// ==/UserScript==


/**
支持站点

 - 起点中文网、晋江文学网、纵横中文网、潇湘书院、逐浪
 - 燃文、无错、书迷楼、冰火中文、百晓生、浩奇、书河
 - 手打吧、泡书吧、17k、看下、青帝、侠客、
 - 其它通用小说网站。（没有站点配置的，例如：红袖添香）
*/

(function(CSS){

	var config = {
		AUTO_ENABLE: true,       // 自动启用总开关。有问题，一些主页也会自动启用
        booklinkme: true,        // booklink.me 跳转的自动启动
        soduso: false,            // www.sodu.so 跳转
        BASE_REMAIN_HEIGHT: 1000,
        DEBUG: true,
        fullHref: true,
        content_replacements: true,      // 小说屏蔽字修复
        fixImageFloats: true
	};

	var rule = {
    	nextLink: '//a[descendant-or-self::*[contains(text(),":下一页")]][@href] | //a[descendant-or-self::*[contains(text(),"下一章")]][@href]',
		prevLink: '//a[contains(text(),"上一页")][@href] | //a[contains(text(),"上一章")][@href]',
		nextUrlIgnore: /index|list|last|end|BuyChapterUnLogin/i,  // 忽略的下一页链接，匹配链接

		// 按顺序匹配，匹配到则停止。
		indexLink: ['//a[contains(text(),"返回书目")][@href]', '//a[contains(text(),"章节目录")][@href]',
			'//a[contains(text(),"章节列表")][@href]', '//a[contains(text(),"回目录")][@href]',
			'//a[contains(text(),"目录")][@href]'],

		 // 同上。
		contentSelector: ["#bmsy_content", "#bookpartinfo", "#htmlContent", "#chapter_content", "#chapterContent", "#partbody",
            "#article_content", ".novel_content", ".noveltext", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td",
            "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#content", ".content"],

		contentRemove: "script, iframe, a, font[color]",
		contentReplace: /最新章节|百度搜索|小说章节|全文字手打|“”&nbsp;看|无.弹.窗.小.说.网|追书网/g,
		
		replaceBrs: /(<br[^>]*>[ \n\r\t]*){2,}/gi   // 替换为<p>
	};

	rule.specialSite = [
		{
			siteName: "起点中文",
		    url: /^http:\/\/(www|read)\.(qidian|qdmm|qdwenxue)\.com\/BookReader\/\d+,\d+/i,
		    titleReg: /小说:(.*?)独家首发\/(.*?)\/.*/,
		    contentReplace: /起点中文网|www.qidian.com|欢迎广大书友.*/g,
		    useiframe: true
		},
		{
			// 特殊处理。不是很完美，有时有问题。
			siteName: "手打吧"
		    ,url: /^http:\/\/shouda8.com\/\w+\/\d+.html/
		    ,contentSelector: "#content"
		    ,contentReplace: /[w\s\[\/\\\(]*.shouda8.com.*|(\/\/)?[全文字]?首发|手打吧|www.shou.*|\(w\/w\/w.shouda8.c\/o\/m 手、打。吧更新超快\)|小说 阅读网 www.xiaoshuoyd .com/ig
		    ,contentPatch: function(fakeStub){
		        var scriptSrc = fakeStub.find('body').html().match(/outputContent\('(.*txt)'\)/)[1];
		        scriptSrc = "http://shouda8.com/ajax.php?f=http://shouda8.com/read" + scriptSrc;
		        fakeStub.find('#content').attr({
		            "class": 'reader-ajax',
		            src: scriptSrc
		        });
		    }
		},{
			// 标题和底部下一页 会到左边
			siteName: "晋江文学网",
		    url: /^http:\/\/www.jjwxc.net\/onebook.php\S*/,
		    enable: false,
		    titleReg: /《(.*?)》.*ˇ(.*?)ˇ.*/,
		    contentPatch: function(fakeStub){
		        fakeStub.find('h2').remove();
		        fakeStub.find('#six_list, #sendKingTickets').parent().remove();
		    }
		},{
			siteName: "纵横中文网",
		    url: /^http:\/\/book\.zongheng\.com\/\S+\/\d+\.html$/i,
		    enable: false,
		    titleReg: /(.*?)-(.*)/,
		    contentPatch: function(fakeStub){
		        fakeStub.find('.watermark').remove();
		        var realtitle = fakeStub.find('title').text().replace(/(.*?),.*/,'$1');
		        fakeStub.find('title').html(realtitle + '-' + fakeStub.find('div.tc h2 em').text());
		    }
		},{
			siteName: "潇湘书院"
		    ,url: /^http:\/\/www.xxsy.net\/books\/.*.html/
		    ,contentSelector: "#detail_list"
		    ,nextLink: "a[title='阅读下一章节']"
		},{
			siteName: "逐浪"
		    ,url: /^http:\/\/book.zhulang.com\/.*.html/
		    ,titleReg: /(.*?)-(.*)/
		    ,contentSelector: "#readpage_leftntxt"
		    ,contentPatch: function(fakeStub){
		        var title = fakeStub.find(".readpage_leftnzgx a:first").text() + "-" + 
		            fakeStub.find(".readpage_leftntit").text()
		        fakeStub.find('title').html(title);
		    }
		},
		//
		{	
			siteName: "燃文",
		    url: /^http:\/\/www.ranwen.cc\/.*.html$/,
		    titleReg: /(.*?)-(.*?)-.*/,
		    contentSelector: "#oldtext",
		    contentPatch: function(fakeStub) {
		        fakeStub.find("#oldtext").find("div[style], script").remove();
		    }
		},{
			siteName: "无错小说网",
		    url: /^http:\/\/www.wcxiaoshuo.com\/wcxs[-\d]+\//,
		    titleReg: /(.*?)最新章节.*?-(.*?)-.*/,
		    titlePos: 1,
		    nextLink: "a#htmlxiazhang",
		    prevLink: "a#htmlshangzhang",
		    indexLink: "a#htmlmulu",
			contentReplace: {
			    'ilo-full-src="\\S+\\.jpg" ': "",
			    '(<center>)?<?img src..(http://www.wcxiaoshuo.com)?(/sss/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': '$3',
			    "/sss/da.jpg": "打", "/sss/maws.jpg": "吗？", "/sss/baw.jpg": "吧？", "/sss/wuc.jpg": "无", "/sss/maosu.jpg": "：“", "/sss/cuow.jpg": "错", "/sss/ziji.jpg": "自己", "/sss/shenme.jpg": "什么", "/sss/huiqub.jpg": "回去", "/sss/sjian.jpg": "时间", "/sss/zome.jpg": "怎么", "/sss/zhido.jpg": "知道", "/sss/xiaxin.jpg": "相信", "/sss/faxian.jpg": "发现", "/sss/shhua.jpg": "说话", "/sss/dajiex.jpg": "大姐", "/sss/dongxi.jpg": "东西", "/sss/erzib.jpg": "儿子", "/sss/guolair.jpg": "过来", "/sss/xiabang.jpg": "下班", "/sss/zangfl.jpg": "丈夫", "/sss/dianhua.jpg": "电话", "/sss/huilaim.jpg": "回来", "/sss/xiawu.jpg": "下午", "/sss/guoquu.jpg": "过去", "/sss/shangba.jpg": "上班", "/sss/mingtn.jpg": "明天", "/sss/nvrenjj.jpg": "女人", "/sss/shangwo.jpg": "上午", "/sss/shji.jpg": "手机", "/sss/xiaoxinyy.jpg": "小心", "/sss/furene.jpg": "夫人", "/sss/gongzih.jpg": "公子", "/sss/xiansg.jpg": "先生", "/sss/penyouxi.jpg": "朋友", "/sss/xiaoje.jpg": "小姐", "/sss/xifup.jpg": "媳妇", "/sss/nvxudjj.jpg": "女婿", "/sss/xondi.jpg": "兄弟", "/sss/lagong.jpg": "老公", "/sss/lapo.jpg": "老婆", "/sss/meimeid.jpg": "妹妹", "/sss/jiejiev.jpg": "姐姐", "/sss/jiemeiv.jpg": "姐妹", "/sss/xianggx.jpg": "相公", "/sss/6shenumev.jpg": "什么", "/sss/cuoaw.jpg": "错", "/sss/fpefnyoturxi.jpg": "朋友", "/sss/vfsjgigarn.jpg": "时间", "/sss/zzhiedo3.jpg": "知道", "/sss/zibjib.jpg": "自己", "/sss/qdonglxi.jpg": "东西", "/sss/hxiapxint.jpg": "相信", "/sss/fezrormre.jpg": "怎么", "/sss/nvdrfenfjfj.jpg": "女人", "/sss/jhiheejeieev.jpg": "姐姐", "/sss/xdifagojge.jpg": "小姐", "/sss/gggugolgair.jpg": "过来", "/sss/maoashu.jpg": "：“", "/sss/gnxnifawhu.jpg": "下午", "/sss/rgtugoqgugu.jpg": "过去", "/sss/khjukilkaim.jpg": "回来", "/sss/gxhigfadnoxihnyy.jpg": "小心", "/sss/bkbskhhuka.jpg": "说话", "/sss/xeieavnfsg.jpg": "先生", "/sss/yuhhfuiuqub.jpg": "回去", "/sss/pdianphua.jpg": "电话", "/sss/fabxianr.jpg": "发现", "/sss/feilrpto.jpg": "老婆", "/sss/gxronfdri.jpg": "兄弟", "/sss/flfaggofng.jpg": "老公", "/sss/tymyigngtyn.jpg": "明天", "/sss/dfshfhhfjfi.jpg": "手机", "/sss/gstjhranjgwjo.jpg": "上午", "/sss/fmgeyimehid.jpg": "妹妹", "/sss/gxgihftutp.jpg": "媳妇", "/sss/cerztifb.jpg": "儿子", "/sss/gfxgigagbfadng.jpg":"下班", "/sss/gstjhranjg.jpg":"下午", "/sss/hjeirerm6eihv.jpg": "姐妹", "/sss/edajihexr.jpg": "大姐", "/sss/wesfhranrrgba.jpg": "上班", "/sss/gfognggzigh.jpg": "公子", "/sss/frurtefne.jpg": "夫人", "/sss/fzagnggfbl.jpg": "丈夫", "/sss/nvdxfudfjfj.jpg": "女婿", "/sss/xdidafnggx.jpg": "相公", "/sss/zenme.jpg": "怎么", "/sss/gongzi.jpg": "公子", "/sss/ddefr.jpg": "", 
			    ".*ddefr\\.jpg.*|无(?:错|.*cuoa?w\\.jpg.*)小说网不[少跳]字|w[a-z\\.]*om?|.*由[【无*错】].*会员手打[\\s\\S]*": "",
			},
		},
		{
			siteName: "书迷楼",
            url: /^http:\/\/www.shumilou.com\/.*html$/,
            titleReg: /(.*) (.*?) 书迷楼/,
            titlePos: 1,
            contentPatch: function(fakeStub){
                fakeStub.find("#content").find("div.title, p > b").remove();
            }
        },{
        	siteName: "冰火中文",
            url: /^http:\/\/www.binhuo.com\/html\/[\d\/]+.html$/,
            titleReg: /(.*?)最新章节,(.*?)-.*/,
            contentReplace: /冰火中文|www.binhuo.com/ig
        },
        {siteName: "百晓生",
            url: /^http:\/\/www\.bxs\.cc\/\d+\/\d+\.html$/,
            exampleUrl: "http://www.bxs.cc/22739/8894713.html",
            titleReg: /(.*?)\d*,(.*)/,
            contentReplace: /[\[【].*[\]】]|文字首发|bxs.|[\[\]\(《].*百晓生.*|百晓生.不跳字|百.晓.生.|w[a-z\.]*|关闭.*广告.*|飘天文学|本站域名就是.*|\(.{0,5}小说更快更好.{0,5}\)|(请在)?百度搜索.*/ig,
            contentPatch: function(fakeStub){
                var content = fakeStub.find("#content");
                content.html(content.html().replace(/^[\s\S]*?<br><br>/, ""));
            }
        },
        {
        	siteName: "浩奇文学网",
            url: /^http:\/\/www.haoqi99.com\/.*.shtml$/,
            exampleUrl: "http://www.haoqi99.com/haoqi99/0/432/3293984.shtml",
            enable: false,
            titleReg: /^(.*?)--(.*?)-/,
        },
        {siteName: "书河小说网",
            url: /^http:\/\/www\.shuhe\.cc\/\d+\/\d+/,
            exampleUrl: "http://www.shuhe.cc/12012/4011985/",
            contentSelector: "#TXT",
            contentReplace: /\(书河小说网.*|wxs.o|ww.x.om|[\[【\(].{1,30}[\]\)】]|ff37;.*|书河小说网高速首发.*|TXT下载|书河小说网|全文阅读|第一书河小说网|百书斋.*|首发来自书河小说网|Www.Shuhe.Cc|本书最新章节/ig,
        },
        {siteName: "爱收藏",
            url: /http:\/\/www\.aishoucang\.com\/\w+\/\d+\.html/,
            exampleUrl: "http://www.aishoucang.com/manghuangji/379.html",
            contentSelector: "#zhutone",
            contentReplace: /.爱收藏[^<]*/g
        },
        {
        	siteName: "来书屋",
        	url: /^http:\/\/www\.laishuwu\.com\/html\/.*\.html/,
        	titleReg: /(.*?)最新章节-(.*?)/,
        	contentPatch: function(){

        	}
        },{
        	siteName: "啃书(图)",
            url: /^http:\/\/www.fkzww.net\/thread-.*.html$/,
            exampleUrl: "http://www.fkzww.net/thread-315537-1-1.html",
            titleReg: /(.*?) (.*?)-.*/,
            contentSelector: ".t_msgfontfix",
            indexSelector: "#nav a:last",
            contentPatch: function(doc){
            	var content = doc.querySelector(".t_msgfontfix");
            	var elems = content.querySelectorAll("img");
            	for (var i = elems.length - 1; i >= 0; i--) {
            		var elem = elems[i];
            		if(elem.getAttribute("width") == "700"){
            			elem.src = elem.getAttribute("file");
            		}
            	}
            }
        },{
        	siteName: "17k小说网",
            url: /^http:\/\/\S+.17k.com\/chapter\/\S+\/\d+.html$/,
            exampleUrl: "http://www.17k.com",
            enable: false,
            titleReg: /(.*?)-(.*?)-.*/,
            contentPatch: function(fakeStub){
                fakeStub.find('xscript, #hotRecommend, .ct0416, .recent_read').remove();
            }
        },{
        	siteName: "看下文学",
            url: /^http:\/\/www.kanxia.net\/k\/\d*\/\d+\/\d+.html$/,
            exampleUrl: "http://www.kanxia.net/",
            enable: false,
            titleReg: /(.*?)-.*?\\s(.*)TXT下载_看下文学/,
            contentReplace: /(?:看下文学|www.kanxia.net)/g
        },{
        	siteName: "青帝文学网",
            url: /^http:\/\/www.qingdi.com\/files\/article\/html\/\d+\/\d+\/\d+.html$/,
            exampleUrl: "http://www.qingdi.com/files/article/html/0/22/3790055.html",
            enable: false,
            titleReg: /(.*?)最新章节_(.*?)_青帝文学网_.*/
        },{
        	siteName: "侠客中文网"
            ,url: /^http:\/\/www.xkzw.org\/\w+\/\d+.html/
            ,exampleUrl: "http://www.xkzw.org/xkzw14415/8021095.html"
            ,titleReg: /(.*) (.*)/
            ,contentSelector: ".readmain_inner .cont"
            ,contentPatch: function(fakeStub){
                fakeStub.find('title').html(fakeStub.find('.readmain_inner h2').text());
            }
        },{
        	siteName: "ChinaUnix.net"
            ,url: /^http:\/\/bbs.chinaunix.net\/thread-.*.html/
            ,exampleUrl: "http://bbs.chinaunix.net/thread-4065291-1-1.html"
            ,contentSelector: ".t_f:first"
        },
	];

	// 小说屏蔽字修复
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

	    // ===双字替换，需特殊处理？===
	    "暧me[iì]":"暧昧", 
	    "běi(\\s|&nbsp;)*j[īi]ng":"北京","半shen": "半身", "b[ìi]j[ìi]ng":"毕竟",
	    "chongdong":"冲动", "缠mian": "缠绵", "成shu": "成熟", "赤lu[oǒ]": "赤裸", "春guang": "春光",
	    "dang校": "党校", "da子": "鞑子", "diao丝": "屌丝", "dú\\s*lì": "独立", "d[iì]fāng":"地方", 
	    "fǎngfó":"仿佛", "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "fènnù":"愤怒",
	    "gao潮": "高潮", "干chai": "干柴", "gu[oò]chéng":"过程", "guānx[iì]":"关系", "gǎnjiào":"感觉",
	    "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "hǎoxiàng":"好像", "huángsè":"黄色",
	    "j[ìi]nháng":"进行", "jinv": "妓女", "jirou": "鸡肉", "ji者":"记者", "ju花":"菊花","j[īi]动":"激动", "肌r[òo]u":"肌肉","ji射":"激射", "jiēch[uù]":"接触", "juli[èe]": "剧烈",
	    "kěnéng": "可能", "开bao": "开苞",  "kào近": "靠近", "kao近": "靠近",
	    "ling辱": "凌辱", "luan蛋": "卵蛋",
	    "mǎny[ìi]":"满意", "mǎshàng":"马上", "méiy[oǒ]u":"没有", "mei国": "美国", "m[íi]ngbái":"明白", "迷huan": "迷幻", "m[íi]n\\s*zhǔ": "民主", 
	    "nàme":"那么", "néngg[oò]u":"能够",
	    "piáo客":"嫖客", "pángbiān":"旁边",
	    "q[íi]guài":"奇怪", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚",
	    "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易",
	    "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u": "时候", "sh[ií]me":"什么", "shi身": "失身", "shu女": "熟女", "上chuang": "上床", "呻y[íi]n": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷", "双xiu": "双修",
	    "t[uū]rán":"突然", "tiaojiao": "调教", "推dao": "推倒", "脱guang": "脱光", "tèbié":"特别", "t[ōo]ngguò":"通过",
	    "wēixié":"威胁", "wèizh[ìi]":"位置",
	    "亵du": "亵渎", "xing福": "性福", "xiu长": "修长",
	    "y[iī]yàng":"一样", "y[īi]diǎn":"一点", "y[ǐi]j[īi]ng":"已经", "阳wěi": "阳痿", "阳wei": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "you惑": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人","旖ni": "旖旎",
	    "z[iì]j[iǐ]": "自己","zì\\s*you": "自由","zh[iī]dào":"知道","zha药": "炸药", "zhan有": "占有", "政f[ǔu]": "政府", "zhèng\\s*f[uǔ]": "政府", "zhōngyāng": "中央", "zu[oǒ]y[oò]u":"左右", "zh[oō]uwéi":"周围",

	    // ===单字替换，需特殊处理，防止替换图片===
	    "b[āà]ng":"棒","bào":"爆","b[àa]":"吧","bī":"逼","bō":"波",
	    "cāo": "操", "cǎo": "草", "cào": "操", "chāng": "娼", "chang": "娼", "cháo": "潮", "chā": "插", "chéng": "成", "chōu": "抽", "chuáng": "床", "chún": "唇", "ch[ūu]n": "春", "cuō": "搓", "cū": "粗", 
	    "dǎng": "党", "dàng": "荡", "dāo": "刀", "dòng": "洞", "diao": "屌", 
	    "fǎ": "法", "féi": "肥", "fù": "妇", "fu": "妇", "guān": "官", 
	    "hán": "含", "hóu": "喉", "hòu": "厚", "huā": "花", "huá": "华", "huò": "惑", "hùn": "混", "hún": "魂",
	    "jiǔ": "九", "j[īi]ng": "精", "jìn": "禁", "jǐng": "警", "jiāng": "江", "jiān": "奸", "jiāo": "交", "jūn": "军", "jū": "拘", "jú": "局", "jī": "激", "激ān":"奸",
	    "kù": "裤", "k[àa]n": "看", 
	    "[1l]àng": "浪", "liáo": "撩", "liú":"流", "lì":"莉", "liè":"烈", "[1l]uàn":"乱", "lún": "伦", "luǒ": "裸", "lòu": "露", "[l1]ù": "露",
	    "mǎi": "买", "mài": "卖", "máo": "毛", "mā": "妈", "méng": "蒙", "mén": "门", "miè": "灭", "mí": "迷", "mì": "蜜", "mō": "摸",
	    "nǎi": "奶", "nèn": "嫩", "niào": "尿", "niē": "捏", "nòng": "弄", "nǚ": "女", 
	    "pào": "炮", "piàn": "片", 
	    "qiāng": "枪", "qíng": "情", "qīn": "亲", "qiú": "求", "quán": "全", 
	    "r[ìi]": "日", "rǔ": "乳", 
	    "sāo":"骚", "sǎo": "骚", "sè": "色", "shā": "杀", "shēn":"呻", "shén":"神", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥", 
	    "tān":"贪", "tiǎn": "舔", "tǐng":"挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "wēn": "温", "wěn": "吻", 
	    "xiǎo":"小", "x[ìi]ng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴", 
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
	
	function contentReplacements(s){
	    for (var key in replacements) {
	        s = s.replace(new RegExp(key, 'ig'), replacements[key]);
	    }
	    return s;
	}

	function Parser(site, doc){
		this.site = site;
		this.doc = doc || document;
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
			var contentPatch = this.site && this.site.contentPatch;
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
			if(this.site && this.site.titleReg){
				var matches = this.doc.title.match(this.site.titleReg);
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
				this.chapterTitle = this.autoGetTitleText(document);
			}

			this.docTitle = this.bookTitle 
				? this.bookTitle + ' - ' + this.chapterTitle
				: this.doc.title;
		},
		// 智能获取标题
		autoGetTitleText: function (document) {
		    debug("AutoGetTitle: ");

		    var
		        _main_selector = "#TextTitle, #title, .ChapterName",
		        _second_selector = "h1, h2, h3",
		        _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/,
		        _negative_regepx = /[上下]一章/,
		        _title_remove_regexp = /最新章节/,
		        _document_title = document.title ? document.title : document.getElementsByTagName("title")[0].textContent,
		        _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' '
		    ;

		    var _headings = document.querySelectorAll(_main_selector);
		    if (_headings.length === 1) {
		        debug("  main selector");
		        return _headings[0].textContent.trim();
		    }

		    var possibleTitles = {};

		    _headings = document.querySelectorAll(_second_selector);

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
				var removes = content.querySelectorAll(rule.contentRemove);

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
			        var replace = site.contentReplace;
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

			// 小说屏蔽字修复。
			if(config.content_replacements){
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
			if(this.site && this.site[typeName]){
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
	    		this.frameRequest(nextUrl);
	    		return;
	    	}

	        debug("xhttpRequest: " + nextUrl);
	        xhttpRequest(nextUrl, function(){
	        	if(this.readyState != 4) return;
	        	reader.requestLoad(this);
	        });
	    },
        frameRequest: function(nextUrl){
        	var self = this;

    		if(!this.iframe){
    			var i=document.createElement('iframe');
    			this.iframe=i;
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

	    if(reader.site || other_enable()){
	        reader.init();
	    }
	}

	function init () {

		reader.getCurSiteInfo();

		window.addEventListener("DOMContentLoaded", launch, false);
		window.readx = reader.init;

		if(reader.site && window.opera){
			operaDisableScript();

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

	// jQuery 简易模板，https://github.com/trix/nano
	(function($) {var _regex = /\{([\w\.]*)\}/g;$.nano = function(template, data) {return template.replace(_regex, function(str, key) {var keys = key.split('.'),value = data[keys.shift()];keys.forEach(function(key){value = value[key];});return (value === null || value === undefined) ? '' : value;});};}($));
	function getFullHref(href){if(typeof href == 'undefined')return '';if(typeof href!='string') href=href.getAttribute('href');var a = getFullHref.a;if(!a){getFullHref.a=a=document.createElement('a');}a.href = href;return a.href;}
	function addStyle(css){if(typeof GM_addStyle != 'undefined')GM_addStyle(css);else{var heads = document.getElementsByTagName('head');if(heads.length > 0){var node = document.createElement('style');node.type = 'text/css';node.innerHTML = css;heads[0].appendChild(node);}}}
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

