/* This script build by rollup. */
(function (Vue) {
'use strict';

function __$styleInject( css ) {
    if(!css) return ;

    if(typeof(window) == 'undefined') return ;
    let style = document.createElement('style');
    style.setAttribute('media', 'screen');
    style.setAttribute('class', 'noRemove');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

// ==UserScript==
// @id             mynovelreader@ywzhaiqi@gmail.com
// @name           My Novel Reader
// @name:zh-CN     小说阅读脚本
// @name:zh-TW     小說閱讀腳本
// @version        6.1.6
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @contributor    Roger Au, shyangs, JixunMoe、akiba9527 及其他网友
// @description    小说阅读脚本，统一阅读样式，内容去广告、修正拼音字、段落整理，自动下一页
// @description:zh-CN  小说阅读脚本，统一阅读样式，内容去广告、修正拼音字、段落整理，自动下一页
// @description:zh-TW  小說閱讀腳本，統一閱讀樣式，內容去廣告、修正拼音字、段落整理，自動下一頁
// @license        GPL version 3
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceURL
// @grant          GM_openInTab
// @grant          GM_setClipboard
// @grant          GM_registerMenuCommand
// @grant          GM_info
// @grant          unsafeWindow
// @homepageURL    https://greasyfork.org/scripts/292/
// @require        https://cdn.staticfile.org/vue/2.2.6/vue.min.js
// @require        https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// @require        https://cdn.staticfile.org/underscore.js/1.7.0/underscore-min.js
// @require        https://cdn.staticfile.org/keymaster/1.6.1/keymaster.min.js
// @require        https://greasyfork.org/scripts/2672-meihua-cn2tw/code/Meihua_cn2tw.js?version=7375

// @connect        *
// @connect        *://*.qidian.com/

// @include        *://read.qidian.com/*,*.aspx
// @include        *://readbook.qidian.com/bookreader/*,*.html
// @include        *://read.qidian.com/BookReaderOld/*,*.aspx
// @include        *://read.qidian.com/BookReader/*,*.aspx
// @exclude        http://read.qidian.com/BookReader/vol,*,*.aspx
// @include        *://wwwploy.qidian.com/BookReader/*,*.aspx
// @include        *://free.qidian.com/Free/ReadChapter.aspx?*
// @include        *://vipreader.qidian.com/chapter/*/*
// @include        *://www.qdmm.com/BookReader/*,*.aspx
// @include        *://www.qdwenxue.com/BookReader/*,*.aspx
// @include        *://chuangshi.qq.com/read/bookreader/*.html*
// @include        *://chuangshi.qq.com/*bk/*/*-r-*.html*
// @include        *://yunqi.qq.com/*bk/*/*.html
// @include        *://dushu.qq.com/read.html?bid=*
// @include        *://www.jjwxc.net/onebook.php?novelid=*
// @include        *://my.jjwxc.net/onebook_vip.php?novelid=*&chapterid=*
// @include        *://book.zongheng.com/chapter/*/*.html
// @include        *://www.xxsy.net/books/*/*.html
// @include        *://book.zhulang.com/*/*.html
// @include        *://www.17k.com/chapter/*/*.html
// @include        *://mm.17k.com/chapter/*/*.html
// @include        *://www.kanxia.net/k/*/*/*.html
// @include        *://www.qingdi.com/files/article/html/*/*/*.html
// @include        *://www.xkzw.org/*/*.html
// @include        *://shouda8.com/*/*.html
// @include        *://novel.hongxiu.com/*/*/*.shtml
// @include        *://www.readnovel.com/novel/*.html
// http://www.tianyabook.com/*/*.htm

// @include        *://tieba.baidu.com/p/*
// @include        *://booklink.me/*
// @include        *://2.booklink.me/*

// booklink.me
// @include        *://www.shumil.com/*/*.html
// @include        *://www.wcxiaoshuo.com/wcxs-*-*/
// @include        *://www.xiaoshuoz.com/wcxs-*-*/
// @include        *://www.quledu.com/wcxs-*-*/
// @include        *://www.ranwen.cc/*/*/*/*.html
// @include        *://www.ranwen.net/files/article/*/*/*.html
// @include        *://www.ranwena.com/files/article/*/*/*.html
// @include        *://www.64mi.com/*/*/*/*.html
// @include        *://www.bxs.cc/*/*.html*
// @include        *://www.laishuwu.com/html/*/*/*.html
// @include        *://www.binhuo.com/html/*/*/*.html
// @include        *://www.haoqi99.com/haoqi99/*/*/*.shtml
// @include        *://www.shuhe.cc/*/*/
// @include        *://www.dudukan.net/html/*/*/*.html
// @include        *://www.hahawx.com/*/*/*.htm
// @include        *://www.zhuzhudao.com/txt/*/*/
// @include        *://www.zhuzhudao.cc/txt/*/*/
// @include        *://www.dahaomen.net/txt/*/*/
// @include        *://www.tadu.com/book/*/*/
// @exclude        *://www.tadu.com/book/*/toc/
// @include        *://www.aishoucang.com/*/*.html
// @include        *://www.wanshuba.com/Html/*/*/*.html
// @include        *://www.zhuishu.net/files/article/html/*/*/*.html
// @include        *://www.sqsxs.com/*/*/*.html*
// @include        *://www.caiwei.tw/html/*/*.html
// @include        *://www.hotsk.com/Html/Book/*/*/*.shtml
// @include        *://www.92to.com/*/*/*.html
// @include        *://www.qirexs.com/read-*-chapter-*.html
// @include        *://www.du00.com/read/*/*/*.html
// @include        *://www.qishuwu.com/*/*/
// @include        *://www.wandoou.com/book/*/*.html
// @include        *://www.6yzw.org/*/*.html
// @include        *://www.6yzw.com/*/*.html
// @include        *://www.daomengren.com/*/*.html
// @include        *://muyuge.com/*/*.html
// @include        *://www.muyuge.net/*/*.html
// @include        *://bbs.vyming.com/novel-read-*-*.html
// @include        *://www.9imw.com/novel-read-*-*.html
// @include        *://www.23zw.com/olread/*/*/*.html
// @include        *://www.50zw.com/book_*/*.html
// @include        *://www.xiangcunxiaoshuo.com/shu/*/*.html
// @include        *://www.lwxs520.com/books/*/*/*.html
// @include        *://m.lwxs520.com/books/*/*/*.html
// @include        *://www.zashu.net/books/*/*/*.html
// @include        *://www.yunlaige.com/html/*/*/*.html
// @include        *://www.cfwx.net/files/article/html/*/*/*.html
// @include        *://www.qiuwu.net/html/*/*/*.html
// @include        *://www.fengwu.org/html/*/*/*.html
// @include        *://www.wenxue8.org/html/*/*/*.html

// @include        *://www.xs84.com/*_*/*
// @include        *://www.geiliwx.com/GeiLi/*/*/*.shtml*
// @include        *://www.123yq.com/read/*/*/*.shtml
// @include        *://www.123yq.org/read/*/*/*.shtml
// @include        *://www.dhzw.com/book/*/*/*.html
//         *://www.du00.cc/read/*/*/*.html
// @include        *://www.aszw.com/book/*/*/*.html
// @include        *://www.xsbashi.com/*_*/
// @include        *://www.vodtw.com/Html/Book/*/*/*.html
// @include        *://www.fhxs.com/read/*/*/*.shtml
// @include        *://www.snwx.com/book/*/*/*.html

// www.sodu.so
// @include        *://www.jiaodu8.com/*/*/*/*.html
// @include        *://www.fktxt.com/book/*/*.html
// @include        *://www.186s.cn/files/article/html/*/*/*.html
// @include        *://www.6xs.cn/xs/*/*/*.html
// @include        *://www.chaojiqiangbing.com/book/*/*/*.html
// @include        *://book.moka123.com/book/*/*/*.html
// @include        *://www.suimeng.com/files/article/html/*/*/*.html
// @include        *://www.hao662.com/haoshu/*/*/*.html

//www.verydu.net
//         http://www.yawen8.com/*/*/*.html
// @include        *://www.tsxs.cc/files/article/html/*/*/*.html
// @include        *://www.ziyuge.com/*/*/*/*/*.html

// 其它网站
// @include        *://book.sfacg.com/Novel/*/*/*/
// @include        *://www.7dsw.com/book/*/*/*.html
// @include        *://www.d586.com/*/*/
// @include        *://www.bookgew.com/Html/Book/*/*/*.htm
// @include        *://read.shuhaha.com/Html/Book/*/*/*.html
// @include        *://www.shuhaha.com/Html/Book/*/*/*.html
// @include        *://www.biqi.me/files/article/html/*/*/*.html
// @include        *://www.ttzw.com/book/*/*.html
// @include        *://www.uukanshu.com/*/*/*.html
// @include        *://www.uukanshu.net/*/*/*.html
// @include        *://www.173ed.com/read/*/*.html
// @include        *://www.a240.com/read/*/*.html
// @include        *://www.zhuishu.com/*/*.html
// @include        *://www.shuangde.cc/*/*.html
// @include        *://www.shenmaxiaoshuo.com/ml-*-*/
// @include        *://www.86kankan.com/read/*/*.html
// @include        *://www.fkzww.com/*/*/*.html
// @include        *://www.151kan.com/*/*/*/*.html
// @include        *://www.bookabc.net/*/*/*.html
// @include        *://www.xshuotxt.com/*/*/*/*.html
// @include        *://www.doulaidu.com/*/*/*.html
// @include        *://www.d586.com/*/*/
// @include        *://www.kanshu.la/book/*/*html
// @include        *://www.wtcxs.com/files/article/html/*/*/*.html
// @include        *://www.5du5.com/book/*/*/*.html
// @include        *://book.kanunu.org/*/*/*.html
// @include        *://www.kanunu8.com/book*/*.html
// @include        *://paitxt.com/*/*/*.html
// @include        *://www.shunong.com/yuedu/*/*/*.html
// @include        *://book.yayacms.com/*/book_*_*.html
// @include        *://www.yqhhy.cc/*/*/*.html
// @include        *://www.nuoqiu.com/static/*/*.html
// @include        *://www.17yue.com/*/*/*.html
// @include        *://dukeba.com/book/*/*/*.shtml
// @include        *://www.wenchangshuyuan.com/html/*/*/*.html
// @include        *://www.pofeng.net/xiaoshuo/*/*.html
// @include        *://www.epzww.com/book/*/*
// @include        *://*.xiaoshuokan.com/haokan/*/*.html
// @include        *://www.wobudu.com/*/*.html
// @include        *://www.qb5.com/xiaoshuo/*/*/*.html
// @include        *://www.x23us.com/html/*/*/*.html
// @include        *://www.23us.com/html/*/*/*.html
// @include        *://www.23us.cc/html/*/*/*.html
// @include        *://www.23wx.com/html/*/*/*.html
// @include        *://www.xs222.com/html/*/*/*.html
// @include        *://www.bixiage.com/*/*/*/*.html
// @include        *://www.ranwenxiaoshuo.com/files/article/html/*/*/*.html
// @include        *://www.ranwenxiaoshuo.com/*/*-*-*.html
// @include        *://www.bjxiaoshuo.com/bjxs-*-*/
// @include        *://www.59shuku.com/xiaoshuo/*/*.htm
// @include        *://www.16kbook.org/Html/Book/*/*/*.shtml
// @include        *://www.dixiaoshuo.com/Html/*/*.html
// @include        *://www.nieshu.com/Book/*/*/*.shtml
// @include        *://www.tlxsw.com/files/article/html/*/*/*.html
// @include        *://www.1kanshu.com/files/article/html/*/*/*.html
// @include        *://www.uutxt.org/book/*/*/*.html
// @include        *://www.5800.cc/*/*/*/*.html
// @include        *://www.biquge.com/*/*.html
// @include        *://www.biqudu.com/*/*.html
// @include        *://www.biquge.la/book/*/*.html
// @include        *://www.biquge.com.tw/*/*.html
// @include        *://www.biquge.tw/*_*/*.html
// @include        *://www.biqugezw.com/*/*.html
// @include        *://www.bequgezw.com/*/*/*.html
// @include        *://www.biquzi.com/*_*/*.html
// @include        *://www.qududu.com/book/*/*/*.html
// @include        *://www.free97.cn/book/*/*/*.html
// @include        *://www.122s.com/book/*/*.html
// @include        *://www.123du.net/dudu-*/*/*.html
// @include        *://www.123du.cc/dudu-*/*/*.html
// @include        *://www.123du.net/book/*/*.html
// @include        *://www.hwafa.com/*/*.html
// @include        *://www.qmshu.com/html/*/*/*.html
// @include        *://dlzw.cc/article-*-*.html
// @include        *://www.shushu5.com/read/*/*.html
// @include        *://www.xiaoyanwenxue.com/files/article/html/*/*/*.html
// @include        *://www.3gsc.com.cn/bookcon/*_*_*
// @include        *://www.bj-ibook.cn/book/*/*/*.htm
// @include        *://www.baoliny.com/*/*.html
// @include        *://www.dajiadu.net/files/article/html/*/*/*.html
// @include        *://www.yankuai.com/files/article/html/*/*/*.html
// @include        *://www.docin.net/*/*.html
// @include        *://www.dushuge.net/html/*/*/*.html
// @include        *://www.xunshu.org/xunshu/*/*/*.html
// @include        *://www.moneyren.com/book/*/*/*.shtml
// @include        *://wemaxfilipino.com/*/*/*.html
// @include        *://www.85618892.cn/xiaoshuo/*/*/*.shtml
// @include        *://www.bookba.net/Html/Book/*/*/*.html
// @include        *://www.moksos.com/*/*/*.html
// @include        *://dudu8.net/novel/*/*/*.html
// @include        *://www.dawenxue.net/html/*/*/*.html
// @include        *://www.yanmoxuan.org/book/*/*/*.html
// @include        *://www.duyidu.com/xiaoshuo/*/*/*.html
// @include        *://www.69zw.com/xiaoshuo/*/*/*.html
// @include        *://www.kan7.com/xiaoshuo/*/*/*.html
// @include        *://www.laishu.com/book/*/*/*.shtml
// @include        *://www.bxwx.org/b/*/*/*.html
// @include        *://www.bxzw.org/*/*/*/*.shtml
// @include        *://www.360118.com/html/*/*/*.html
// @include        *://www.59to.com/files/article/xiaoshuo/*/*/*.html
// @include        *://www.dyzww.com/cn/*/*/*.html
// @include        *://www.9wh.net/*/*/*.html
// @include        *://www.luoqiu.net/html/*/*/*.html
// @include        *://www.luoqiu.com/html/*/*/*.html
// @include        *://www.epzw.com/files/article/html/*/*/*.html
// @include        *://www.dashubao.co/book/*/*/*.html
// @include        *://b.faloo.com/p/*/*.html
// @include        *://www.baikv.com/*/*.html
// @include        *://www.66721.com/*/*/*.html
// @include        *://www.3dllc.com/html/*/*/*.html
// @include        *://www.xstxt.com/*/*/
// @include        *://www.zzzcn.com/3z*/*/
// @include        *://www.zzzcn.com/modules/article/App.php*
// @include        *://www.nilongdao.com/book/*/*/*.html
// @include        *://xs321.net/*/*/
// @include        *://read.guanhuaju.com/files/article/html/*/*/*.html
// @include        *://www.book108.com/*/*/*.html
// @include        *://5ycn.com/*/*/*.html
// @include        *://www.zhaoxiaoshuo.com/chapter-*-*-*/
// @include        *://*zbzw.com/*/*.html
// @include        *://manghuangji.cc/*/*.html
// @include        *://www.aiqis.com/*/*.html
// @include        *://www.fftxt.net/book/*/*.html
// @include        *://www.5kwx.com/book/*/*/*.html
// @include        *://www.uuxiaoshuo.net/html/*/*/*.html
// @include        *://www.sanyyo.org/*.html
// @include        *://www.chinaisbn.com/*/*/*.html
// @include        *://www.caihongwenxue.com/Html/Book/*/*/*.html
// @include        *://www.shushuw.cn/shu/*/*.html
// @include        *://www.78xs.com/article/*/*/*.shtml
// @include        *://www.woaixiaoshuo.com/xiaoshuo/*/*/*.html
// @include        *://www.ty2016.com/book/*/*.html
// @include        *://wx.ty2016.com/*/*/*.html
// @include        *://www.my285.com/*/*/*/*.htm
// @include        *://www.5858xs.com/html/*/*/*.html
// @include        *://book.58xs.com/html/*/*/*.html
// @include        *://book.mihua.net/*/*/*/*.html
// @include        *://www.hjwzw.com/Book/Read/*,*
// @include        *://www.hjwzw.com/Book/Read/*_*
// @include        *://www.365essay.com/*/*.htm
// @include        *://www.gengxin8.com/read/*/*.html
// @include        *://www.365xs.org/books/*/*/*.html
// @include        *://www.wuruo.com/files/article/html/*/*/*.html
// @include        *://*.8shuw.net/book/*/*.html
// @include        *://www.pashuw.com/BookReader/*/*.html
// @include        *://read.shanwen.com/html/*/*/*.html
// @include        *://www.qqxs.cc/xs/*/*/*.html
// @include        *://www.69shu.com/txt/*/*
// @include        *://www.e8zw.com/book/*/*/*.html
// @include        *://www.8535.org/*/*/*.html*
// @include        *://www.yfzww.com/books/*/*/*.htm
// @include        *://www.lewen8.com/lw*/*.html
// @include        *://www.pinwenba.com/read/*/*.html
// @include        *://down1.qidian.com/bookall/*.htm*
// @include        *://www.77nt.com/*/*.html
// @include        *://www.quanbenba.com/yuedu/*/*/*.html
// @include        *://www.sto.cc/book-*-*.html
// @include        *://www.151xs.com/wuxiazuoxiong/*/chapter/*/
// @include        *://www.qududu.net/book/*/*/*.html
// @include        *://www.qingdou.cc/chapter*
// @include        *://www.shuyuewu.com/kan*
// @include        *://www.1553.net/*/*
// @include        *://www.269s.com/*/*/*
// @include        *://www.33yq.com/read/*/*/*.shtml
// @include        *://233yq.com/xiaoshuo/*.html
// @include        *://www.50zw.co/book_*/*.html
// @include        *://www.bqg5200.com/xiaoshuo/*/*/*.html
// @include        *://www.50zw.la/book_*/*.html
// @include        *://www.qu.la/book/*/*.html
// @include        *://www.luoqiu.com/read/*/*.html
// @include        *://www.54tushu.com/book_library/chaptershow/theId/*.html
// @include        *://www.snwx8.com/book/*/*/*.html
// @include        *://read.qidian.com/chapter/*
// @include        *://www.23zw.me/olread/*/*/*.html
// @include        *://www.piaotian.com/html/*/*/*.html
// @include        *://www.piaotian.net/html/*/*/*.html
// @include        *://www.dhzw.org/book/*/*/*.html
// @include        *://www.biqiuge.com/book/*/*.html
// @include        *://www.baquge.com/files/article/html/*/*/*.html
// @include        *://www.baquge.tw/files/article/html/*/*/*.html
// @include        *://www.qu.la/book/*/*.html
// @include        *://www.bxwx9.org/b/*/*/*.html
// @include        *://www.miaobige.com/*/*/*.html
// @include        *://www.52dsm.com/chapter/*/*.html
// @include        *://www.banfusheng.com/chapter/*/*.html
// @include        *://www.remenxs.com/du_*/*/
// @include        *://www.shuhai.com/read/*/*.html
// @include        *://www.hbooker.com/chapter/book_chapter_detail/*
// @include        *://www.mht.la/*/*/*.html
// @include        *://www.paomov.com/*/*/*.html
// @include        *://www.moyuanwenxue.com/xiaoshuo/*/*/*.htm
// @include        *://www.ggdown.com/modules/article/reader.php?aid=*
// @include        *://www.daizhuzai.com/*/*.html
// @include        *://www.mywenxue.com/xiaoshuo/*/*/*.htm
// @include        *://www.yueduyue.com/*/*.html
// @include        *://www.67shu.com/*/*/*.html
// @include        *://www.wangshuge.com/books/*/*/*.html
// @include        *://www.23sw.net/*/*/*.html
// @include        *://www.ybdu.com/xiaoshuo/*/*/*.html
// @include        *://www.shudaizi.org/book/*/*.html
// @include        *://www.ymoxuan.com/book/*/*/*.html
// @include        *://www.67shu.com/*/*/*.html
// @include        *://www.bookxuan.com/*/*.html
// @include        *://www.2kxs.com/xiaoshuo/*/*.html
// @include        *://www.88dushu.com/xiaoshuo/*/*/*.html
// @include        *://www.wutuxs.com/html/*/*/*.html
// @include        *://www.23qb.com/book/*/*.html
// @include        *://www.biqu6.com/*/*.html
// @include        *://www.niepo.net/html/*/*/*.html
// @include        *://www.booktxt.net/*/*.html
// @include        *://www.aszw.org/book/*/*/*.html
// @include        *://www.xiashu.cc/*/*.html
// @include        *://www.lewenxiaoshuo.com/books/*/*.html
// @include        *://www.heihei66.com/*/*/*.html
// @include        *://www.111bz.net/*/*.html
// @include        *://www.biquge5200.com/*/*.html
// @include        *://www.biqukan.com/*_*/*.html
// @include        *://www.4xiaoshuo.com/*/*/*.html
// @include        *://www.woquge.com/*/*.html
// @include        *://www.lianzaishu.com/*/*.html

// 移动版
// @include        *://wap.yc.ireader.com.cn/book/*/*/
// @include        *://m.jjwxc.net/book2/*/*

// @exclude        */List.htm
// @exclude        */List.html
// @exclude        */List.shtml
// @exclude        */index.htm
// @exclude        */index.html
// @exclude        */index.shtml
// @exclude        */Default.htm
// @exclude        */Default.html
// @exclude        */Default.shtml

// @run-at         document-end
// ==/UserScript==

// 其它设置
const config = {
  lang: 'zh-CN',

  soduso: false,                  // www.sodu.so 跳转
  // content_replacements: true,     // 小说屏蔽字修复
  fixImageFloats: true,           // 图片居中修正
  paragraphBlank: true,           // 统一段落开头的空格为 2个全角空格
  end_color: "#666666",           // 最后一页的链接颜色
  PRELOADER: true,                // 提前预读下一页

  xhr_time: 15 * 1000,
  download_delay: 0,  // 毫秒。0 毫秒下载起点 vip 限时免费章节会被封
  dumpContentMinLength: 3,        // 检测重复内容的最小行数
};

var uiTrans = {
    "将小说网页文本转换为繁体。\n\n注意：内置的繁简转换表，只收录了简单的单字转换，启用本功能后，如有错误转换的情形，请利用脚本的自订字词取代规则来修正。\n例如：「千里之外」，会错误转换成「千里之外」，你可以加入规则「千里之外=千里之外」来自行修正。": "將小說網頁文字轉換為繁體。\n\n注意：內建的繁簡轉換表，只收錄了簡單的單字轉換，啟用本功能後，如有錯誤轉換的情形，請利用腳本的自訂字詞取代規則來修正。\n例如：「千里之外」，會錯誤轉換成「千裡之外」，你可以加入規則「千裡之外=千里之外」來自行修正。",
    "图片章节用夜间模式没法看，这个选项在启动时会自动切换到缺省皮肤": "圖片章節無法以夜間模式觀看，這個選項在啟動時會自動切換到預設佈景",
    "通过快捷键切换或在 Greasemonkey 用户脚本命令处打开设置窗口": "通過熱鍵切換或在 Greasemonkey 使用者腳本命令處開啟設定視窗",
    "隐藏后通过快捷键或 Greasemonkey 用户脚本命令处调用": "隱藏後通過熱鍵或 Greasemonkey 使用者腳本命令處調用",
    "一行一个，每行第一个 = 为分隔符\n需要刷新页面生效": "一行一條規則，每一行第一個 = 為分隔符\n（需重新載入頁面才能生效）",
    "错误：没有找到下一页的内容，使用右键翻到下一页": "錯誤：沒有找到下一頁的內容，使用右鍵翻到下一頁",
    "左键滚动，中键打开链接（无阅读模式）": "左鍵捲動畫面至該章節，中鍵開啟連結（無閱讀模式）",
    "请输入切换左侧章节列表的快捷键：": "請輸入切換左側章節列表的熱鍵：",
    "详见脚本代码的 Rule.specialSite": "詳見腳本代碼的 Rule.specialSite",
    "booklink.me 点击的网站强制启用": "booklink.me 點擊的網站強制啟用",
    "部分选项需要刷新页面才能生效": "部份選項需重新載入頁面才能生效",
    "取消本次设定，所有选项还原": "取消本次設定，所有選項還原",
    "不影响 booklink.me 的启用": "不影響 booklink.me 的啟用",
    "请输入打开设置的快捷键：": "請輸入開啟設定視窗的熱鍵：",
    "微软雅黑,宋体,黑体,楷体": "Microsoft YaHei,新細明體,PMingLiU,MingLiU,細明體,標楷體",
    "夜间模式的图片章节检测": "夜間模式的圖片章節檢測",
    "点击显示隐藏章节列表": "點此以顯示或隱藏章節列表",
    "添加下一页到历史记录": "加入下一頁到歷史記錄",
    "booklink 自动启用": "booklink 自動啟用",
    "Enter 键打开目录": "Enter 鍵開啟目錄",
    "隐藏左侧章节列表": "隱藏左側章節列表",
    "小说阅读脚本设置":"小說閱讀腳本設定",
    "已到达最后一页": "已到達最後一頁",
    "正在载入下一页": "正在載入下一頁",
    "通过快捷键切换": "通過熱鍵切換",
    "隐藏底部导航栏": "隱藏底部導航列",
    "隐藏左侧导航条": "隱藏左側章節列表彈出鈕",
    "主页链接没有找到": "未找到主頁連結",
    "自定义站点规则": "自訂網站規則",
    "自定义替换规则": "自訂字詞取代規則",
    "网页：转繁体": "網頁：轉繁體",
    "双击暂停翻页": "雙擊暫停翻頁",
    "隐藏设置按钮": "隱藏設定按鈕",
    "强制手动启用": "強制手動啟用",
    "调用阅读器": "調用閱讀器",
    "自定义样式": "自訂樣式",
    "界面语言": "介面語言",
    "打开目录": "開啟本書目錄頁",
    "自动翻页": "自動翻頁",
    "缺省皮肤": "預設佈景",
    "暗色皮肤": "暗色佈景",
    "夜间模式": "夜間模式",
    "夜间模式1": "夜間模式1",
    "夜间模式2": "夜間模式2",
    "橙色背景": "橙色背景",
    "绿色背景": "綠色背景",
    "绿色背景2": "綠色背景2",
    "蓝色背景": "藍色背景",
    "棕黄背景": "棕黃背景",
    "经典皮肤": "經典背景",
    "阅读模式": "閱讀模式",
    "调试模式": "偵錯模式",
    "反馈地址": "反饋與討論",
    "安静模式": "安靜模式",
    "√ 确认": "√ 確定",
    "X 取消": "X 取消",
    "上一页": "上一頁",
    "下一页": "下一頁",
    "状态": "狀態",
    "已经": "已經",
    "暂停": "暫停",
    "启用": "啟用",
    "退出": "離開",
    "测试": "測試",
    "距离": "距離",
    "加载": "載入",
    "字体": "字型",
    "行高": "行距",
    "行宽": "版面寬度",
    "目录": "目錄"
};

if(!String.prototype.uiTrans){
    Object.defineProperty(String.prototype, 'uiTrans', {
        value: function(){
            var _this = this.valueOf(), key, regexp;
            if(config.lang !== 'zh-TW') return _this;

            if(uiTrans.hasOwnProperty(_this)) return uiTrans[_this];

            for (key in uiTrans) {
                regexp = new RegExp(key, 'g');
                _this = _this.replace(regexp, uiTrans[key]);
            }
            return _this;
        },
        enumerable: false
    });
}

// 参考 https://github.com/madrobby/zepto/blob/master/src/detect.js

const ua = navigator.userAgent;
const platform = navigator.platform;

const isFirefox = ua.match(/Firefox\/([\d.]+)/);

const isChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);

const isWindows = /Win\d{2}|Windows/.test(platform);

//------------------- 辅助函数 ----------------------------------------
var nullFn = function() {};

// @require https://greasyfork.org/scripts/2599-gm-2-port-function-override-helper/code/GM%202%20port%20-%20Function%20Override%20Helper.js?version=184155
// Check if is GM 2.x
if (typeof window.exportFunction == 'undefined') {
    // For GM 1.x backward compatibility, should work.
    window.exportFunction = (function(foo, scope, defAs) {
        scope[defAs.defineAs] = foo;
    }).bind(unsafeWindow);
}

var C;

function toggleConsole(debug) {
    if (debug) {
        C = console;
    } else {
        C = {
            log: nullFn,
            debug: nullFn,
            error: nullFn,
            group: nullFn,
            groupCollapsed: nullFn,
            groupEnd: nullFn,
            time: nullFn,
            timeEnd: nullFn,
        };
    }
}

function L_getValue(key) { // 个别用户禁用本地存储会报错
    try {
        return localStorage.getItem(key);
    } catch (e) {}
}

function L_setValue(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {}
}

function L_removeValue(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {}
}


function parseHTML$1(str) {
    var doc;
    try {
        // firefox and chrome 30+，Opera 12 会报错
        doc = new DOMParser().parseFromString(str, "text/html");
    } catch (ex) {}

    if (!doc) {
        doc = document.implementation.createHTMLDocument("");
        doc.querySelector("html").innerHTML = str;
    }
    return doc;
}

function toRE(obj, flag) {
    if (obj instanceof RegExp) {
        return obj;
    } else {
        return new RegExp(obj, (flag || 'ig'));
    }
}

function toReStr(str) {  // 处理字符串，否则可能会无法用正则替换
    return str.replace(/[()\[\]{}|+.,^$?\\*]/g, "\\$&");
}

function wildcardToRegExpStr(urlstr) {
    if (urlstr.source) return urlstr.source;
    var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
        return str === "*" ? ".*" : "[^/]*";
    });
    return "^" + reg + "$";
}

function getUrlHost(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.host;
}

// 模板
$.nano = function(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
        var keys = key.split("."),
            v = data[keys.shift()];
        try {
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        } catch (e) {}
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
};

// jQuery text 完全匹配. e.g. a:econtains('最新章节')
$.expr[":"].econtains = function(obj, index, meta, stack) {
    return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
};

/* jshint ignore: start */

function $x(aXPath, aContext) {
    var nodes = [];
    var doc = document;
    aContext = aContext || doc;

    try {
        var results = doc.evaluate(aXPath, aContext, null,
            XPathResult.ANY_TYPE, null);
        var node;
        while (node = results.iterateNext()) {
            nodes.push(node);
        }
    } catch (ex) {}

    return nodes;
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(str) {
        return this.slice(-str.length) == str;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 */
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;return 0==b?c:1==(b/=e)?c+d:(g||(g=.3*e),h<Math.abs(d)?(h=d,f=g/4):f=g/(2*Math.PI)*Math.asin(d/h),-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c)},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;return 0==b?c:1==(b/=e)?c+d:(g||(g=.3*e),h<Math.abs(d)?(h=d,f=g/4):f=g/(2*Math.PI)*Math.asin(d/h),h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c)},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;return 0==b?c:2==(b/=e/2)?c+d:(g||(g=e*.3*1.5),h<Math.abs(d)?(h=d,f=g/4):f=g/(2*Math.PI)*Math.asin(d/h),1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:.5*h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+d+c)},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});

/* jshint ignore: end */

// ===== 自定义站点规则 =====

const sites = [
  // 详细版规则示例。注：该网站已无法访问。
  {siteName: "泡书吧",                                               // 站点名字... (可选)
      url: "^https?://www\\.paoshu8\\.net/Html/\\S+\\.shtm$",          // // 站点正则... (~~必须~~)

      // 获取标题
      titleReg: /(.*?)最新章节 [-_\\\/](.*?)[-_\/].*/,         // 书籍标题、章节标题正则 (可选)
      titlePos: 0,                                          // 书籍标题位置：0 或 1 (可选，默认为 0)
      titleSelector: "#title h1",

      indexSelector: "a:contains('回目录')",                    // 首页链接 jQuery 选择器 (不填则尝试自动搜索)
      prevSelector: "a:contains('翻上页')",                      // 上一页链接 jQuery 选择器 (不填则尝试自动搜索)
      nextSelector: "a:contains('翻下页')",                     // 下一页链接 jQuery 选择器  (不填则尝试自动搜索)

      // nDelay: 500,  // 延迟0.5秒加载下一页

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
  {siteName: '起点新版-阅文',
       url: '^https?://(?:read|vipreader)\\.qidian\\.com/chapter/.*',
       exclude: ' /lastpage/',
       bookTitleSelector: '#bookImg',
       titleSelector: 'h3.j_chapterName',

       prevSelector: '#j_chapterPrev',
       nextSelector: '#j_chapterNext',
       indexSelector: function(obj) {
           var url = obj.find(".chapter-control a:contains('目录')").attr('href');
           return url;
       },

       contentSelector: '.read-content.j_readContent',
       contentRemove: '',
       contentReplace: [
           '手机用户请到m.qidian.com阅读。',
           '起点中文网www.qidian.com欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在起点原创！.*'
       ],
       isVipChapter: function($doc) {
           if ($doc.find('.vip-limit-wrap').length) {
               return true;
           }
       }
  },
  // 特殊站点，需再次获取且跨域。添加 class="reader-ajax"，同时需要 src, charset
  {siteName: '起点新版',
      url: '^https?://read\\.qidian\\.com/BookReader/.*\\.aspx',
      bookTitleSelector: '.story_title .textinfo a:nth-child(1)',
      titleSelector: '.story_title h1',

      prevSelector: '#pagePrevRightBtn',
      nextSelector: '#pageNextRightBtn',
      indexSelector: function() {
          return location.href.replace(/,.*?\.aspx$/, '.aspx').replace('BookReaderNew', 'BookReader');
      },

      mutationSelector: "#chaptercontainer",  // 内容生成监视器
          mutationChildCount: 1,
      contentSelector: '#content, .bookreadercontent',
      contentRemove: 'a[href="http://www.qidian.com"]',
      contentReplace: [
          '手机用户请到m.qidian.com阅读。'
      ],
      contentPatch: function(fakeStub){
          fakeStub.find('script[src$=".txt"]').addClass('reader-ajax');
      },
  },
  {siteName: "起点中文、起点女生、起点文学",
      url: "^https?://(www|read|readbook|wwwploy|cga|big5ploy)\\.(qidian|qdmm|qdwenxue)\\.com/BookReader/.*",
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
      contentRemove: "span[id^='ad_'], .read_ma",
      contentPatch: function(fakeStub){
          fakeStub.find('script[src$=".txt"]').addClass('reader-ajax');
      },
  },
  {siteName: "起点中文网免费频道",
      url: "^https?://free\\.qidian\\.com/Free/ReadChapter\\.aspx",
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
  {siteName: "创世中文网",
      url: "^https?://(?:chuangshi|yunqi)\\.qq\\.com/|^http://dushu\\.qq\\.com/read.html\\?bid=",
      bookTitleSelector: '.bookNav > a:last()',
      titleSelector: '.story_title > h1',

      nextSelector: '#rightFloatBar_nextChapterBtn',
      prevSelector: '#rightFloatBar_preChapterBtn',
      indexSelector: function() {
          var m = location.href.match(/\/bk\/\w+\/(.*?)-r-\d+.html/);
          if (m) {
              return 'http://chuangshi.qq.com/bk/ls/' + m[1] + '-l.html';
          } else {
              return 'http://chuangshi.qq.com/bk/ls/' + unsafeWindow.bid + '-l.html';
          }
      },

      contentSelector: ".bookreadercontent",
      contentHandle: false,
      mutationSelector: "#chaptercontainer",  // 内容生成监视器，第一次运行用到，以后用下面的 getContent 函数
          mutationChildCount: 1,
      startFilter: function() {
          // 下一页需要提前加 1
          unsafeWindow.uuid = parseInt(unsafeWindow.uuid) + 1 + '';
      },
      getContent: function($doc, callback) {  // this 指 parser
          function _getReadPageUrl(uuid) {
              if (!uuid) {
                  return 'javascript:void(0);';
              }
              var url = location.href.replace(/[?|#].*/gi, '');
              return url.replace(/(\d)+\.html/, uuid + '.html');
          }

          function getPageUrlHtml(preChapterUUID, nextChapterUUID) {
              var preReadUrl = _getReadPageUrl(preChapterUUID),
                  nextReadUrl = _getReadPageUrl(nextChapterUUID);

              return '<a id="rightFloatBar_preChapterBtn" href="' + preReadUrl + '">上一页</a>' +
                      '<a id="rightFloatBar_nextChapterBtn" href="' + nextReadUrl + '">下一页</a>' + '\n';
          }

          var done = function (data) {
              unsafeWindow.uuid = data.nextuuid;  // 给下一页用

              callback({
                  html: getPageUrlHtml(data.preuuid, data.nextuuid) + data.Content
              });
          };
          exportFunction(done, unsafeWindow, { defineAs: "gm_mnr_cs_callback" });

          unsafeWindow.CS.page.read.main.getChapterContent(unsafeWindow.bid, unsafeWindow.uuid,
              unsafeWindow.gm_mnr_cs_callback);
      },
  },
  {siteName: "纵横中文网",
      url: "^https?://book\\.zongheng\\.com/\\S+\\/\\d+\\.html$",
      contentHandle: false,
      // titleReg: "(.*?)-(.*)",
      titleSelector: "em[itemprop='headline']",
      bookTitleSelector: ".tc h2",
      contentSelector: '#readerFt',
      contentPatch: function(fakeStub){
          fakeStub.find('.watermark').remove();
          // 给第几章添加空格
          var chapterTitle = fakeStub.find(".tc > h2").text();
          var chapterTitle1 = fakeStub.find(".tc > h2 em").text();
          if(chapterTitle1) {
              chapterTitle = chapterTitle.replace(chapterTitle1, " ") + chapterTitle1;
          }
          fakeStub.find("title").text(
              fakeStub.find(".tc > h1").text() + "-" + chapterTitle
          );
      }
  },
  {siteName: "晋江文学网",
      url: /^https?:\/\/(www|my)\.jjwxc\.net\/onebook(|_vip)\.php\S*/,
      titleReg: /《(.*?)》.*[ˇ^](.*?)[ˇ^].*/,
      titlePos: 0,
    //   titleSelector: 'h2',
      titleSelector: '#chapter_list > option:first',
      // bookTitleSelector: 'h1 .bigtext',
      indexSelector: ".noveltitle > h1 > a",
      contentSelector: '.noveltext',
      contentHandle: false,
      contentRemove: 'font[color], hr',
      contentPatch: function (fakeStub) {
          // 移除 h2 的标题
          fakeStub.find('div:has(>h2)').remove();

          fakeStub.find('#six_list, #sendKingTickets').parent().remove();
          fakeStub.find("div.noveltext").find("div:first, h1").remove();
      },
      contentReplace: [
          '@无限好文，尽在晋江文学城'
      ]
  },
  {siteName: '晋江文学城_手机版',
      url: '^http://m\\.jjwxc\\.net/book2/\\d+/\\d+',
      titleReg: /《(.*?)》.*[ˇ^](.*?)[ˇ^].*/,
      titlePos: 0,
      titleSelector: 'h2',
      contentSelector: 'div.grid-c > div > .b.module > div:first',
  },
  {siteName: "潇湘书院",
      url: "^https?://www\\.xxsy\\.net/books/.*\\.html",
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
      url: /^https?:\/\/book\.zhulang\.com\/.*\.html/,
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
      url: "^https?://www\\.readnovel\\.com/novel/.*\\.html",
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
  // 	url: '^https?://www.motie.com/book/\\d+_\\d+',
  // 	contentSelector: '.page-content'
  // },

  {siteName: "百度贴吧（手动启用）",
      enable: false,
      url: /^https?:\/\/tieba\.baidu.com\/p\//,
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
  {siteName: "天涯书库",
      url: /www\.ty2016\.com\/.+\.html$/,
      titleSelector: "h1",
      bookTitleSelector: ".crumb a[href='./']",

      indexSelector: "td a[href='./']",

      contentSelector: "#main",
      contentRemove: '.crumb, table',
      contentHandle: false,
  },

  // {siteName: "易读",
  //     url: "^https?://www.yi-see.com/read_\\d+_\\d+.html",
  //     contentSelector: 'table[width="900px"][align="CENTER"]'
  // },
  {siteName: "燃文",
      url: /^https?:\/\/www\.(?:ranwena?\.(cc|net|com)|64mi\.com)\/.*\.html$/,
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
          '火然\\?\\?\\? \\?文&nbsp;&nbsp;ｗ\\?ｗｗ.ｒａｎｗｅｎａ.com',
      ]
  },
  {siteName: "燃文小说网",
      url: "^https?://www\\.ranwenxiaoshuo\\.com/files/article/html/\\d+/\\d+/\\d+\\.html|http://www\\.ranwenxiaoshuo\\.com/\\w+/\\w+-\\d+-\\d+\\.html",
      titleReg: /(.*?)最新章节(.*?)在线阅读.*/,
      contentSelector: "#fontsize",
      contentReplace: "天才一秒记住[\\s\\S]+为您提供精彩小说阅读。",
  },
  {siteName: "燃文小说",
      url: "^https?://www\\.ranwen\\.net/files/article/\\d+/\\d+/\\d+\\.html",
      titleReg: "(\\S+) (.*) - 燃文小说",
      contentReplace: "\\(.*燃文小说.*\\)|【 注册会员可获私人书架，看书更方便！永久地址： 】 "
  },
  {siteName: "无错小说网",
      url: /^https?:\/\/www\.(?:wcxiaoshuo|xiaoshuoz|quledu)\.com\/wcxs[-\d]+\//,
      titleReg: /(.*?)最新章节.*?-(.*?)-.*/,
      titlePos: 1,
      nextSelector: "a#htmlxiazhang",
      prevSelector: "a#htmlshangzhang",
      indexSelector: "a#htmlmulu",
      contentReplace: [
          'ilo-full-src="\\S+\\.jpg" ',
          {
              '(<center>)?<?img src..(http://www.wcxiaoshuo.com)?(/sss/\\S+\\.jpg).(>| alt."\\d+_\\d+_\\d*\\.jpg" />)(</center>)?': '$3',
              "/sss/da.jpg": "打", "/sss/maws.jpg": "吗？", "/sss/baw.jpg": "吧？", "/sss/wuc.jpg": "无", "/sss/maosu.jpg": "：“", "/sss/cuow.jpg": "错", "/sss/ziji.jpg": "自己", "/sss/shenme.jpg": "什么", "/sss/huiqub.jpg": "回去", "/sss/sjian.jpg": "时间", "/sss/zome.jpg": "怎么", "/sss/zhido.jpg": "知道", "/sss/xiaxin.jpg": "相信", "/sss/faxian.jpg": "发现", "/sss/shhua.jpg": "说话", "/sss/dajiex.jpg": "大姐", "/sss/dongxi.jpg": "东西", "/sss/erzib.jpg": "儿子", "/sss/guolair.jpg": "过来", "/sss/xiabang.jpg": "下班", "/sss/zangfl.jpg": "丈夫", "/sss/dianhua.jpg": "电话", "/sss/huilaim.jpg": "回来", "/sss/xiawu.jpg": "下午", "/sss/guoquu.jpg": "过去", "/sss/shangba.jpg": "上班", "/sss/mingtn.jpg": "明天", "/sss/nvrenjj.jpg": "女人", "/sss/shangwo.jpg": "上午", "/sss/shji.jpg": "手机", "/sss/xiaoxinyy.jpg": "小心", "/sss/furene.jpg": "夫人", "/sss/gongzih.jpg": "公子", "/sss/xiansg.jpg": "先生", "/sss/penyouxi.jpg": "朋友", "/sss/xiaoje.jpg": "小姐", "/sss/xifup.jpg": "媳妇", "/sss/nvxudjj.jpg": "女婿", "/sss/xondi.jpg": "兄弟", "/sss/lagong.jpg": "老公", "/sss/lapo.jpg": "老婆", "/sss/meimeid.jpg": "妹妹", "/sss/jiejiev.jpg": "姐姐", "/sss/jiemeiv.jpg": "姐妹", "/sss/xianggx.jpg": "相公", "/sss/6shenumev.jpg": "什么", "/sss/cuoaw.jpg": "错", "/sss/fpefnyoturxi.jpg": "朋友", "/sss/vfsjgigarn.jpg": "时间", "/sss/zzhiedo3.jpg": "知道", "/sss/zibjib.jpg": "自己", "/sss/qdonglxi.jpg": "东西", "/sss/hxiapxint.jpg": "相信", "/sss/fezrormre.jpg": "怎么", "/sss/nvdrfenfjfj.jpg": "女人", "/sss/jhiheejeieev.jpg": "姐姐", "/sss/xdifagojge.jpg": "小姐", "/sss/gggugolgair.jpg": "过来", "/sss/maoashu.jpg": "：“", "/sss/gnxnifawhu.jpg": "下午", "/sss/rgtugoqgugu.jpg": "过去", "/sss/khjukilkaim.jpg": "回来", "/sss/gxhigfadnoxihnyy.jpg": "小心", "/sss/bkbskhhuka.jpg": "说话", "/sss/xeieavnfsg.jpg": "先生", "/sss/yuhhfuiuqub.jpg": "回去", "/sss/pdianphua.jpg": "电话", "/sss/fabxianr.jpg": "发现", "/sss/feilrpto.jpg": "老婆", "/sss/gxronfdri.jpg": "兄弟", "/sss/flfaggofng.jpg": "老公", "/sss/tymyigngtyn.jpg": "明天", "/sss/dfshfhhfjfi.jpg": "手机", "/sss/gstjhranjgwjo.jpg": "上午", "/sss/fmgeyimehid.jpg": "妹妹", "/sss/gxgihftutp.jpg": "媳妇", "/sss/cerztifb.jpg": "儿子", "/sss/gfxgigagbfadng.jpg":"下班", "/sss/gstjhranjg.jpg":"下午", "/sss/hjeirerm6eihv.jpg": "姐妹", "/sss/edajihexr.jpg": "大姐", "/sss/wesfhranrrgba.jpg": "上班", "/sss/gfognggzigh.jpg": "公子", "/sss/frurtefne.jpg": "夫人", "/sss/fzagnggfbl.jpg": "丈夫", "/sss/nvdxfudfjfj.jpg": "女婿", "/sss/xdidafnggx.jpg": "相公", "/sss/zenme.jpg": "怎么", "/sss/gongzi.jpg": "公子", "/sss/ddefr.jpg": "",
          },
          ".*ddefr\\.jpg.*|无(?:错|.*cuoa?w\\.jpg.*)小说网不[少跳]字|w[a-z\\.]*om?|.*由[【无*错】].*会员手打[\\s\\S]*",
          "是 由",
          "无错不跳字|无广告看着就是爽!|一秒记住.*|全文免费阅读.*|8 9 阅阅 读 网|看小说最快更新|“小#说看本书无广告更新最快”",
          "[\\x20-\\x7e》]?无(?:.|&gt;)错.小说.{1,2}[Ｗw]+.*?[cＣ][oＯ][mＭ]",
          "<无-错>",
          "—无—错—小说",
          "\\+无\\+错\\+",
          "&amp;无&amp;错&amp;小说",
          "无错小说 www.quled[Ｕu].com",
      ],
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
  {siteName: '凤舞文学网',
      url: '^https?://www\\.wenxue8\\.org/html/\\d+/\\d+/\\d+\\.html',
      contentReplace: [
          {
              '<img src="/keywd/R43.gif">':'爱', '<img src="/keywd/A13.gif">': '情', '<img src="/keywd/D10.gif">': '床',
              '<img src="/keywd/Y19.gif">': '奸', '<img src="/keywd/H21.gif">': '屁', '<img src="/keywd/Z23.gif">': '逼',
              '<img src="/keywd/G42.gif">': '身', '<img src="/keywd/Y2.gif">':'性', '<img src="/keywd/D32.gif">':'热',
              '<img src="/keywd/I44.gif">':'挺', '<img src="/keywd/H30.gif">':'贱', '<img src="/keywd/H25.gif">':'荡',
              '<img src="/keywd/V7.gif">':'肉', '<img src="/keywd/O22.gif">':'吮', '<img src="/keywd/H9.gif">':'春',
              '<img src="/keywd/K36.gif">':'日', '<img src="/keywd/O15.gif">':'胸', '<img src="/keywd/S31.gif">':'欲',
              '<img src="/keywd/F20.gif">':'射', '<img src="/keywd/N12.gif">':'禁', '<img src="/keywd/R26.gif">':'殿',
              '<img src="/keywd/X6.gif">':'诱', '<img src="/keywd/U46.gif">': '娇',
              '<img src="/keywd/M24.gif">': '操', '<img src="/keywd/B4.gif">':'骚', '<img src="/keywd/O3.gif">':'阴',
          }
      ]
  },
  {siteName: "书迷楼",
      url: /^https?:\/\/www\.shumil\.(?:co|us|com)\/.*html$/,
      titleReg: /(.*) (.*?) 书迷楼/,
      titlePos: 1,
      contentSelector: "#content",
      contentRemove: 'a, center',
      contentReplace: [
          'div lign="ener"&gt;|.*更多章节请到网址隆重推荐去除广告全文字小说阅读器',
          '起点中文网www.qidian.com欢迎广大书.*',
          '书迷楼最快更新.*',
          '更新最快最稳定',
          '\\(\\.\\)R?U',
          {'<p>\\?\\?': '<p>'},
          '\\(www.\\)',
          '章节更新最快',
          '-乐-读-小-说--乐读x-',
          '《乐》《读》小说.乐读.Com',
          '纯文字在线阅读本站域名手机同步阅读请访问',
          '-优－优－小－说－更－新－最－快-www.uuxs.cc-',
          '\\(本章免费\\)',
          '请大家搜索（书迷楼）看最全！更新最快的小说',
          '书迷楼www.shumilou.co',
          'shumil.com',
          '书迷楼 （）',
          '书迷楼',
      ],
      fixImage: true,
      contentPatch: function(fakeStub){
          fakeStub.find("#content").find("div.title:last")
              .appendTo(fakeStub.find('body'));
          fakeStub.find("#content").find("div.title, p > b, div[style]").remove();
      }
  },
  {siteName: "冰火中文",
      url: /^https?:\/\/www\.binhuo\.com\/html\/[\d\/]+\.html$/,
      titleReg: /(.*?)最新章节,(.*?)-.*/,
      fixImage: true,
      contentRemove: 'font[color="red"]',
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
      url: /^https?:\/\/www\.bxs\.cc\/\d+\/\d+\.html/,
      titleReg: /(.*?)\d*,(.*)/,
      contentRemove: 'a, #txtright',
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
          /&nbsp;&gt;<\/p>/ig,
      ],
  },
  {siteName: "浩奇文学网",
      url: /^https?:\/\/www\.haoqi99\.com\/.*\.shtml$/,
      titleReg: /^(.*?)--(.*?)-/,
  },
  {siteName: "书河小说网",
      url: /^https?:\/\/www\.shuhe\.cc\/\d+\/\d+/,
      titleReg: "([^\\d]+)\\d*,(.*?)_",
      contentSelector: "#TXT",
      contentReplace: /一秒记住.*为您提供精彩小说阅读.|\{请在百度搜索.*首发阅读\}|（书河小说网.*?无弹窗）|wxs.o|ww.x.om|[\[【\(].{1,30}[\]\)】]|ff37;.*|书河小说网高速首发.*|TXT下载|全文阅读|第一书河小说网|百书斋.*|首发来自书河小说网|本书最新章节|书河小说网/ig,
  },
  {siteName: "爱收藏",
      url: /^https?:\/\/www\.aishoucang\.com\/\w+\/\d+\.html/,
      titleReg: "(.*?)-(.*?)-爱收藏",
      contentSelector: "#zhutone",
      contentReplace: {
          "<a[^>]*>(.*?)</a>": "$1",
          ".爱收藏[^<]*": ""
      }
  },
  {siteName: "木鱼哥",
      url: /^https?:\/\/(www\.)?muyuge\.(com|net)\/\w+\/\d+\.html/,
      titleSelector: "#yueduye h1",
      bookTitleSelector: ".readerNav > li > a:last",
      indexSelector: ".readerFooterPage a[title='(快捷:回车键)']",
      // useiframe: true,
      // mutationSelector: "#content",
      // mutationChildCount: 1,
      nextSelector: 'a:contains(下章)',
      prevSelector: 'a:contains(上章)',
      indexSelector: 'a:contains(目录)',
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
      url: "^https?://www\\.zhuishu\\.net/files/article/html/.*\\.html",
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
      url: "^https?://www\\.zhuzhudao\\.(?:com|cc)/txt/",
      titleReg: "(.*?)最新章节-(.*?)-",
      contentReplace: /[“"”]?猪猪岛小说.*|<\/?a[^>]+>|w+\.zhuZhuDao\.com|看更新最快的.*/ig
  },
  {siteName: "逸名文学屋",
      url: "^https?://(bbs\\.vyming|www\\.9imw)\\.com/novel-read-\\d+-\\d+\\.html",
      contentSelector: "#showcontent",
      bookTitleSelector: ".headinfo a:first",
      contentRemove: "p:contains(精品推荐：), p:contains(，免费小说阅读基地！), a",
      contentReplace: [
          "逸名文学屋："
      ]
  },
  {siteName: "奇书屋",
      url: "^https?://www.qishuwu.com/\\w+/\\d+/",
      titleReg: "(.*)_(.*)_.*_奇书屋",
  },
  {siteName: "17k小说网",
      url: /^https?:\/\/\S+\.17k\.com\/chapter\/\S+\/\d+\.html$/,
      titleReg: /(.*?)-(.*?)-.*/,
      contentSelector: "#chapterContent",
      contentRemove: ".chapter_update_time, h1, .qrcode, #authorSpenk, .like_box, #hotRecommend, .ct0416, .recent_read, #miniVoteBox",
      contentReplace: [
          '本书首发来自17K小说网，第一时间看正版内容！'
      ],
      contentPatchAsync: function($doc, callback) {
          if (unsafeWindow.console.clear) {
              unsafeWindow.console.clear = null;
          }

          function waitFor(condition, callback, timeout, timeoutFn) {timeout = timeout || 30 * 1000;timeoutFn = timeoutFn || function() {};var startTime = Date.now();var timeId = setInterval(function() {    if (condition()) {        callback();        clearInterval(timeId);    } else if ((Date.now() - startTime) > timeout) {        timeoutFn();        clearInterval(timeId);    }}, 500);}

          var Q = unsafeWindow.Q;

          // 计算上一章节下一章节
          function calPages() {
              var json = Q.bookBigData.json;
              var bookId = Q.bookid;

              for (var i=0, c; c = json.list[i]; i++) {
                  if (c == Q.chapterid) {
                      var prevChapter = (0 === i ? null : json.list[i - 1]);
                      var nextChapter = (i + 1 < json.list.length ? json.list[i + 1] : null);

                      if (nextChapter) {
                          var nextUrl = '/chapter/' + bookId + '/' + nextChapter + '.html';
                          $doc.find('a:contains(下一章)')
                              .attr('href', nextUrl);

                          Q.chapterid = nextChapter;
                      }
                      if (prevChapter) {
                          var prevUrl = '/chapter/' + bookId + '/' + prevChapter + '.html';
                          $doc.find('a:contains(上一章)')
                              .attr('href', prevUrl);
                      }

                      break;
                  }
              }
          }

          if (!Q.bookBigData.json) {
              waitFor(function() {
                  return !!Q.bookBigData.json;
              }, function() {
                  calPages();
                  callback();
              });
          } else {
              calPages();
              callback();
          }
      }
  },
  {siteName: "看下文学",
      url: "^https?://www\\.kanxia\\.net/k/\\d*/\\d+/\\d+\\.html$",
      titleReg: /(.*?)-(.*)TXT下载_看下文学/,
      contentReplace: /看下文学/g
  },
  {siteName: "青帝文学网",
      url: /^https?:\/\/www\.qingdi\.com\/files\/article\/html\/\d+\/\d+\/\d+\.html$/,
      titleReg: /(.*?)最新章节_(.*?)_青帝文学网_.*/
  },
  {siteName: "侠客中文网",
      url: /^https?:\/\/www\.xkzw\.org\/\w+\/\d+\.html/,
      contentSelector: ".readmain_inner .cont",
      contentPatch: function(fakeStub){
          fakeStub.find('title').html(fakeStub.find('.readmain_inner h2').text());
      }
  },
  {siteName: "ChinaUnix.net",
      url: /^https?:\/\/bbs\.chinaunix\.net\/thread-.*\.html/,
      contentSelector: ".t_f:first"
  },
  {siteName: "123du 小说",
      url: /^https?:\/\/www\.123du\.(?:net|cc)\//,
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
      url: "^https?://dlzw\\.cc/article.*\\.html",
      nextSelector: "span:contains('下一篇') > a",
      prevSelector: "span:contains('上一篇') > a",
      indexSelector: "#pt a[href^='http']"
  },
  {siteName: "塔读文学",
      url: "^https?://www\\.tadu\\.com/book/\\d+/\\d+/",
      bookTitleSelector: '.book-name_ a:first',
      nDelay: 2000,  // 延迟2秒加载下一页
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
      url: "^https?://www\\.dyzww\\.com/cn/\\d+/\\d+/\\d+\\.html$" ,
      contentReplace: {
          '<img.*?ait="(.*?)".*?>': "$1",
          'www\\.dyzww\\.com.*|♂|шШщ.*': ""
      }
  },
  {siteName: "来书屋",
      url: "^https?://www.laishuwu.com/html/\\d+/\\d+/\\d+.html",
      titleSelector: ".chaptertitle h2",
      bookTitleSelector: ".chaptertitle h1",
      contentReplace: "txt\\d+/",
  },
  {siteName: "万书吧",
      url: "^https?://www\\.wanshuba\\.com/Html/\\d+/\\d+/\\d+\\.html",
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
      url: "^https?://www\\.dawenxue\\.net/html/\\d+/\\d+/\\d+\\.html",
      titleReg: "(.*?)-(.*)-大文学",
      contentSelector: "#clickeye_content",
      contentReplace: "\\(?大文学\\s*www\\.dawenxue\\.net\\)?|\\(\\)",
  },
  {siteName: "奇热",
      url: "^https?://www\\.qirexs\\.com/read-\\d+-chapter-\\d+\\.html",
      titleReg: "(.*?)-(.*?)-",
      titlePos: 1,
      contentSelector: "div.page-content .note",
      contentRemove: "a",
      contentReplace: "”奇热小说小说“更新最快|首发,/.奇热小说网阅读网!|奇热小说网提供.*|\\(手机用户请直接访问.*"
  },
  {siteName: "热点",
      url: "^https?://www\\.hotsk\\.com/Html/Book/\\d+/\\d+/\\d+\\.shtml",
      titleReg: "(.*?) 正文 (.*?)- 热点书库 -",
      contentReplace: "\\(热点书库首发:www.hotsk.com\\)|www.zhuZhuDao.com .猪猪岛小说."
  },
  {siteName: "落秋中文",
      url: "^https?://www\\.luoqiu\\.(com|net)/html/\\d+/\\d+/\\d+\\.html",
      titleReg: "(.*?)-(.*?)-",
      contentReplace: "&lt;/p&gt;"
  },
  {siteName: "全本小说网",
      url: "^https?://www\\.qb5\\.com/xiaoshuo/\\d+/\\d+/\\d+\\.html",
      titleReg: "(.*)_(.*)_",
      contentRemove: "div[class]",
      contentReplace: "全.{0,2}本.{0,2}小.{0,2}说.{0,2}网.{0,2}|[ｗWw ]+.{1,10}[CｃcǒOｍMМ ]+",
  },
  {siteName: "手牵手小说网",
      url: "^https?://www\\.sqsxs\\.com/.*\\d+/\\d+/\\d+\\.html",
      bookTitleSelector: '#sitebar a:last',
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
          '=长=风',
          '-优－优－小－说－更－新－最－快-\\.',
          '发现一家非常好吃的手工曲奇店铺，可搜索淘宝.*',
          '强烈推荐一家手工曲奇店，在淘宝搜索.*',
          { "。\\.": "。" },
      ]
  },
  {siteName: "六月中文网，盗梦人小说网",
      url: "^https?://www\\.(?:6yzw\\.org|6yzw\\.com|daomengren\\.com)/.*\\.html",
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
          "看最新最全小说|最快更新，(?:无弹窗)?阅读请。",
          "纯文字在线阅读本站域名  手机同步阅读请访问",
          "本文由　……　首发",
          "（首发）|【首发】",
          "&amp;nbsp",
      ]
  },
  {siteName: "飞卢小说网",
      url: "^https?://b\\.faloo\\.com/p/\\d+/\\d+\\.html",
      titleSelector: "#title h1",
      bookTitleSelector: "div.nav > a:last",
      bookTitleReplace: '小说$',

      nextSelector: "a#next_page",
      prevSelector: "a#pre_page",
      indexSelector: "a#huimulu",

      contentSelector: "#main > .main0",
      contentRemove: "> *:not(#con_imginfo, #content), .p_content_bottom",
      contentReplace: [
          "飞卢小说网 b.faloo.com 欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在飞卢小说网！",
      ],
      contentPatch: function(fakeStub){
          fakeStub.find("#content").find(".p_gonggao").remove();
          // fakeStub.find("#con_imginfo").prependTo("#content");
      }
  },
  {siteName: "顶点小说",
      url: "^https?://www\\.(?:23us|x23us|23wx|xs222)\\.(?:com|cc)/html/\\d+/\\d+/\\d+\\.html$",
      bookTitleSelector: '.crumbs > div > a:last, #amain > dl > dt > a:last',
      indexSelector: "#footlink a:contains('返回目录')",
      prevSelector: "#footlink a:contains('上一页')",
      nextSelector: "#footlink a:contains('下一页')",
      contentSelector: "#contents",
      contentReplace: [
          "\\(看小说到顶点小说网.*\\)|\\(\\)|【记住本站只需一秒钟.*】",
          '一秒记住【.*读及下载。',
          'www.xstxt.org',
          'wenxuemi.com',
          '23us．com',
          '顶点小说 Ｘ２３ＵＳ．com更新最快',
          'www．23us．cc更新最快',
          '免费小说门户',
          '\\|顶\\|点\\|小\\|說\\|網更新最快',
          '\\\\\\|顶\\\\\\|点\\\\\\|小\\\\\\|说\\\\\\|2\\|3\\|u\\|s\\|.\\|c\\|c\\|',
      ],
      contentPatch: function(fakeStub){
          var temp=fakeStub.find('title').text();
          var realtitle = temp.replace(/第.*卷\s/,'');
          fakeStub.find('title').html(realtitle);
      }
  },
  {siteName: '23中文',
      url: '^https?://www\\.23zw\\.(com|me)/.*\\.html',
      contentSelector: '#chapter_content',
      contentRemove: 'h1',
      contentReplace: [
          '的朋友，你可以即可第一时间找到本站哦。',
          '手机看小说哪家强\\?手机阅读网',
          '，最快更新.*?最新章节！',
          '看.*?最新章节到长风文学',
          '本文由首发',
          '章节更新最快',
          '顶点小说.23us.。',
          '\\(顶点小说\\)',
          '看最新最全',
          'R1152',
          '\\.n√et',
          '中文网',
          '更新最快',
      ]
  },
  {siteName: '笔下阁',
      url: "^https?://www\\.bixiage\\.com/\\w+/\\d+/\\d+/\\d+\\.html",
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
      url: "^https?://www\\.shuangde\\.cc/.*\\.html",
      bookTitleSelector: '.title > h2 > a',
      contentRemove: '.title, div[align="center"]',
  },
  {siteName: '爱尚小说网',
      url: '^https?://www.a240.com/read/\\d+/\\d+.html',
      titleReg: '(.*) - (.*?) - 爱尚小说网',
      titlePos: 1,
      contentRemove: '.bottem, center',
      contentReplace: '<!--章节内容开始-->'
  },
  {siteName: 'Ｅ度文学网',
      url: '^https?://www.173ed.com/read/\\d+/\\d+.html',
      contentRemove: 'a[href*="173e"]',
      contentReplace: [
          '全文字小说W.*?\\.com',
          'E度文学网更新最快',
          'www\\.♀173ed.com♀'
      ]
  },
  {siteName: "3Z中文网",
      url: "^https?://www\\.zzzcn\\.com\\/(3z\\d+/\\d+\\/|modules\\/article\\/App\\.php\\?aid=\\d+&cid=\\d+){1}$",
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
      url: "^https?://www\\.biqi\\.me/files/article/html/\\d+/\\d+/\\d+\\.html",
      titleSelector: "#lbChapterName",
      bookTitleSelector: "#TOPNAV td:first > a:last",
      contentReplace: [
          "http://www.biqi.me比奇中文网永久网址，请牢记！",
          "www.biqi.me比奇中文网一直在为提高阅读体验而努力，喜欢请与好友分享！",
          "[｛【]比奇中文网首发www.biqi.me[｝】]",
      ]
  },
  {siteName: "书哈哈小说网",
      url: "^https?://(?:read|www)\\.shuhaha\\.com/Html/Book/\\d+/\\d+/\\d+\\.html",
      titleSelector: "#htmltimu",
      bookTitleSelector: [".srcbox > a:nth-child(2)", /目录$/],
      contentSelector: "#BookText",
      contentRemove: 'a[href*="www.shuhaha.com"]',
      contentReplace: [
          '‘‘', '’’',
          '（\\.shuh&amp;n）',
          /<p[^>]*>(&nbsp;){4}网<\/p>/gi
      ]
  },
  {siteName: "SF 轻小说",
      url: '^https?://book.sfacg.com/Novel/\\d+/\\d+/\\d+/',
      titleReg: '(.*?)-(.*?)-.*',
      contentSelector: '#ChapterBody',
  },
  {siteName: "武林中文网",
      url: '^https?://www\\.50zw\\.(com|co|la)/book_\\d+/\\d+\\.html',
      bookTitleSelector: '.srcbox > a:last',
      contentReplace: [
          '更新最快【】',
          '&lt;/dd&gt;',
          '&lt;center&gt; &lt;fon color=red&gt;',
          '一秒记住【武林中文网.*',
          '武林中文网 www.*',
      ]
  },
  {siteName: "乡村小说网",
      url: '^https?://www\\.xiangcunxiaoshuo\\.com/shu/\\d+/\\d+\\.html',
      // bookTitleSelector: '.read_m > .list',
      titleReg: '(.*?)_(.*?)_.*_.*',
      contentSelector: '.yd_text2',
      contentReplace: [
          '[ｗＷw]+．２３ｕＳ．(?:ｃｏＭ|com)',
          '乡&amp;村&amp;.*?\\.co[mＭ]',
      ]
  },
  {siteName: "杂书网",
      url: "^https?://www\\.zashu\\.net/books/\\d+/\\d+/\\d+\\.html",
      contentReplace: [
          "吋煜牝咱.*?杂书网(?:杠杠的)?",
          "吋煜牝咱看书神器",
          "(?:吋煜牝咱|飝现洅咱|茇阺畱匝).*?[Ｃc]om",
          "吋煜牝咱",
          "飝现洅咱", "殢萾嘎匝",
          "看小说“杂书网zashu.net”",
          "手机站：m.zashu.net 电脑站：www.zashu.net",
      ]
  },
  {siteName: "小说巴士",
      url: "^https?://www\\.xs84\\.com/\\d+_\\d+/",
      bookTitleSelector: ".con_top a:last",
      contentReplace: [
          "§推荐一个无广告的小说站.*? §",
          "☆本站最快更新.*?☆",
          "纯文字在线阅读.*?</br>",
          "www.X S 8 4.com",
          "《》 www.obr />",
          "。。 w.2.obr",
          "\\[w w w.x s.*?.c o m 小说.*?\\]",
          "╂上.*?╂",
          "\\*\\*顶\\*\\*点.{0,3}小说",
          "___小.说.巴.士 www.xS84.com___",
      ],
      contentPatch: function() {
          $('<script>')
              .text('clearInterval(show);')
              .appendTo('body')
              .remove();
      }
  },
  {siteName: "123言情",
      url: '^https?://www\\.123yq\\.(com|org)/read/\\d+/\\d+/\\d+\\.shtml',
      bookTitleSelector: '.con_top > a:last',
      contentSelector: "#TXT",
      contentRemove: '.bottem, .red, .contads, a',
  },
  {siteName: "热门小说网",
      url: '^https?://www.remenxs.com/du_\\d+/\\d+/',
      bookTitleSelector: 'section.readhead > div.read_t > div.lf > a:nth-child(2)',
      nextSelector: '.pagego > font:contains("下一章") + a',
      prevSelector: '.pagego > font:contains("上一章") + a',
      contentSelector: ".yd_text2",
      contentRemove: '.adrs, .con_w, a',
      contentReplace: [
          '您可以在百度里搜索“.*',
          '为了方便下次阅读，你可以点击下方的.*'
      ]
  },

  // === 内容补丁
  {siteName: "给力文学小说阅读网",
      url: "^https?://www\\.geiliwx\\.com/.*\\.shtml",
      titleReg: "-?(.*)_(.*)最新章节_给力",
      titlePos: 1,
      contentRemove: 'h1, font[color], center',
      contentReplace: [
          "网站升级完毕！感谢对给力文学网的支持！",
          "（百度搜索给力文学网更新最快最稳定\\)",
          "【sogou,360,soso搜免费下载小说】",
          "\\[乐\\]\\[读\\]小说.２3.[Ｃc]m",
          "给力文学网",
          "看最快更新",
          "小说网不跳字",
          "\\.com",
          "BAIDU_CLB_fillSlot\\(.*",
          "--小-说-www-23wx-com",
          "&nbsp;&nbsp;，请",
          '\\.www\\.GEILIWX开心阅读每一天',
      ],
      contentPatch: function(d) {
          if (!d.find('#content').length) {
              var html = d.find('body').html();
              var content = html.match(/<!--go-->([\s\S]*?)<!--over-->/i)[1];

              content = $('<div id="content">').html(content);
              if (content.find('#adright').size()) {
                  content = content.find('#adright');
              }
              content.appendTo(d.find('body'));
          }
      }
  },

  // ================== 采用 iframe 方式获取的 ====================
  {siteName: "16K小说网",
      url: "^https?://www\\.16kbook\\.org/Html/Book/\\d+/\\d+/\\d+\\.shtml$",
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
      url: "^https?://www\\.dudukan\\.net/html/.*\\.html$",
      contentReplace: "看小说“就爱读书”|binhuo|www\\.92to\\.com",
      useiframe: true,
      mutationSelector: "#main",
      mutationChildCount: 0,
  },
  {siteName: "读零零（有问题，只显示一半内容）",
      url: "https?://www\\.du00\\.(?:com|cc)/read/\\d+/\\d+/[\\d_]+\\.html",
      titleReg: "(.*?)(?:第\\d+段)?,(.*) - 读零零小说网",
      titlePos: 1,
      // prevSelector: "#footlink a:first",
      // indexSelector: "#footlink a:contains('目录')",
      // nextSelector: "#footlink a:last",
      // 内容
      contentSelector: "#pagecontent, .divimage",
      // useiframe: true,
      // mutationSelector: "#pagecontent",
      // mutationChildCount: 2,
      contentRemove: "font",
      contentReplace: [
          "读零零小说网欢迎您的光临.*?txt格式下载服务",
          "，好看的小说:|本书最新免费章节请访问。",
          "\\*文學馆\\*",
          "\\(未完待续请搜索，小说更好更新更快!",
          "www\\.DU00\\.com",
      ],
      checkSection: true
  },
  {siteName: "78小说网",
      url: "^https?://www\\.78xs\\.com/article/\\d+/\\d+/\\d+.shtml$",
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
      url: "^https?://www\\.151kan\\.com/kan/.*\\.html",
      contentSelector: "#msg",
      useiframe: true,
      mutationSelector: "#msg",
      contentReplace: [
          /[\/|]?www\.151(?:看|kan)\.com[\/|]?/ig,
          /151看书网(?:纯文字)?/ig,
      ]
  },
  {siteName: "就爱读书",
      url: "^https?://www\\.92to\\.com/\\w+/\\w+/\\d+\\.html$",
      titleReg: "(.*?)-(.*?)-",
      useiframe: true,
      timeout: 500,
      contentReplace: "看小说.就爱.*"
  },
  {siteName: "书书网",
      url: "^https?://www\\.shushuw\\.cn/shu/\\d+/\\d+\\.html",
      titleReg: "(.*) (.*?) 书书网",
      titlePos: 1,
      useiframe: true,
      timeout: 500,
      contentReplace: "！~！[\\s\\S]*"
  },
  {siteName: "找小说网",
      url: "^https?://www\\.zhaoxiaoshuo\\.com/chapter-\\d+-\\d+-\\w+/",
      titleReg: "(.*) - (.*) - 找小说网",
      titlePos: 1,
      useiframe: true,
          timeout: 500,
      contentRemove: "div[style]"
  },
  {siteName: "ABC小说网",
      url: "^https?://www\\.bookabc\\.net/.*\\.html",
      useiframe: true
  },

  // ============== 内容需要2次获取的 =========================
  {siteName: "手打吧",
      url: /^https?:\/\/shouda8\.com\/\w+\/\d+\.html/,
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
      url: /^https?:\/\/www\.hahawx\.com\/.*htm/,
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
      url: "^https?://www\\.ttzw\\.com/book/\\d+/\\d+\\.html",
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
      url: "^https?://tw\\.xiaoshuokan\\.com/haokan/\\d+/\\d+\\.html",
      contentSelector: ".bookcontent",
      prevSelector: "a.redbutt:contains('上一頁')",
      indexSelector: "a.redbutt:contains('返回章節目錄')",
      nextSelector: "a.redbutt:contains('下一頁')",
      contentReplace: "[a-z;&]*w.[xｘ]iaoshuokan.com 好看小說網[a-z;&族】）]*"
  },
  {siteName: "E品中文网",
      url: "^https?://www\\.epzww\\.com/book/\\d+/\\d+",
      titleReg: "(.*?),(.*?),",
      contentSelector: "#showcontent",
  },
  {siteName: "飘天文学",
      url: "^https?://www\\.piaotian\\.(net|com)/html/\\d+/\\d+/\\d+\\.html",
      // titleReg: "(.*)最新章节,(.*),飘天文学",
      bookTitleSelector: '#content > h1 > a',
      contentSelector: "#content",
      useiframe: true,  // 否则 content 在 body 下面
      contentRemove: "h1, table, .toplink",
      contentReplace: [
          /[{〖]请在百度搜索.*[}〗]|.(?:百度搜索飄天|无弹窗小说网).*\.Net.|\[飄天.*无弹窗小说网\]/ig,
          '\\{飘天文学www.piaotian.net感谢各位书友的支持，您的支持就是我们最大的动力\\}',
          '章节更新最快',
          '支持网站发展，逛淘宝买东西.*',
          '天才壹秒記住，為您提供精彩閱讀。.*'
      ],
  },
  {siteName: "天使小说网",
      url: "^https?://www\\.tsxs\\.cc/files/article/html/\\d+/\\d+/\\d+\\.html",
      contentSelector: "#content"
  },
  {siteName: "紫雨阁小说网",
      url: "^https?://www\\.ziyuge\\.com/\\w+/\\w+/\\d+/\\d+/\\d+\\.html",
      titleReg: "(.*?)-正文-(.*?)-紫雨阁小说网",
      contentSelector: ".reader_content",
      nextSelector: "#divNext a",
      prevSelector: "#divPrev a",
      contentReplace: "\\(.*www.ziyuge.com.*\\)"
  },
  {siteName: "破风中文网",
      url: "^https?://www\\.pofeng\\.net/xiaoshuo/\\d+/\\d+\\.html",
      useiframe: true
  },
  {siteName: "读客吧",
      url: "^https?://dukeba\\.com/book/\\d+/\\d+/\\d+\\.shtml",
      useiframe: true,
      contentSelector: "#content > div[style]",
      contentRemove: "a, div[align]:has(font)",
  },
  {siteName: "一起阅",
      url: "^https?://www\\.17yue\\.com/\\w+/\\d+/\\d+\\.html",
      useiframe: true,
  },
  {siteName: "诺秋网",
      url: "^https?://www\\.nuoqiu\\.com/static/\\d+/\\d+\\.html",
      titleReg: "(.*) (.*) 诺秋网",
      titlePos: 1,
      useiframe: true,
      contentReplace: "┏━━━━━━━━━━━━━━━━━━━━━━━━━┓[\\s\\S]+诺秋网文字更新最快……】@！！"
  },
  {siteName: "言情后花园",
      url: "^https?://www\\.yqhhy\\.cc/\\d+/\\d+/\\d+\\.html",
      titleReg: "(.*)-(.*)-.*-言情后花园",
      titlePos: 1,
      contentSelector: "#content",
      contentRemove: "a, span[style], script",
      contentReplace: "请记住本站： www.yqhhy.cc|更多，尽在言情后花园。"
  },
  {siteName: "六九中文",
      url: "^https?://www.(?:69zw|kan7).com/\\w+/\\d+/\\d+/\\d+.html",
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
      url: "^https?://book\\.yayacms\\.com/\\w+/book_\\d+_\\d+.html",
      contentRemove: "a, div[style]",
      contentReplace: "http://book.YaYaCMS.com/.*|ｂｏｏｋ．ｙａｙａｃｍｓ．ｃｏｍ",
  },
  {siteName: "书农在线书库",
      url: "^https?://www\\.shunong\\.com/yuedu/\\d+/\\d+/\\d+.html",
      contentSelector: ".bookcontent",
  },
  {siteName: "努努书坊",
      url: "^https?://(?:book\\.kanunu\\.org|www\\.kanunu8\\.com)/.*/\\d+\\.html",
      titleReg: /(.*) - (.*) - 小说在线阅读 - .* - 努努书坊/,
      titlePos: 1,
      contentSelector: "table:eq(4) p",
      indexSelector: "a[href^='./']",
  },
  {siteName: "五月中文网",
      url: "^https?://5ycn\\.com/\\d+/\\d+/\\d+\\.html",
      contentRemove: "div[align='center'], a",
  },
  {siteName: "笔下中文",
      url: "^https?://www\\.bxzw\\.org/\\w+/\\d+/\\d+/\\d+\\.shtml",
      contentRemove: "div[align='center'], center, #footlink1",
      contentReplace: "www\\.bxzw\\.org|//无弹窗更新快//|\\(看精品小说请上.*\\)|\\(看.*最新更新章节.*\\)"
  },
  {siteName: "着笔中文网",
      url: "^https?://.*zbzw\\.com/\\w+/\\d+\\.html",
      contentReplace: "精彩小说尽在.*"
  },
  {siteName: "D586小说网",
      url: '^https?://www\\.d586\\.com/',
      contentSelector: ".yd_text2",
      contentRemove: 'a',
      contentReplace: [
          '【www.13800100.com文字首发D5８6小说网】',
          '【☆D5８6小说网☆//文字首发】.*'
      ]
  },
  {siteName: "豌豆文学网",
      url: "^https?://www.wandoou.com/book/\\d+/\\d+\\.html",
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
      url: /^https?:\/\/www\.doulaidu\.com\/[^\/]+\/\d+\/\d+\.html/,
      useiframe: true,
      contentReplace: [
          /www．.+．(?:com|net)/ig,
          /都来读小说网首发|www\.[a-z0-9]+\.(?:org|com)/ig,
      ]
  },
  {siteName: "小说TXT",
      url: /^https?:\/\/www\.xshuotxt\.com\//,
      contentReplace: "\\(.*无弹窗全文阅读\\)",
      contentPatch: function(fakeStub) {
          fakeStub.find('#title a').remove();
      }
  },
  {siteName: "疯狂中文网",
      url: "^https?://www\\.fkzww\\.com/",
      contentRemove: ".bottem, a[href='http://www.fkzww.com']",
      contentReplace: [
          /收藏【.*?疯狂中文网\)/ig,
      ]
  },
  {siteName: "吾读小说网",
      url: "^https?://www\\.5du5\\.com/book/.*\\.html",
      contentReplace: '\\(吾读小说网 <a.*无弹窗全文阅读\\)'
  },
  {siteName: "UU看书",
      url: "^https?://www\\.uukanshu\\.(?:com|net)/.*/\\d+/\\d+.html",
      contentReplace: [
          /* 替换以下
              ＵU看书 www.uukanｓhｕ.net
              'UU看书 www.uｕkanshu.net '
              'UU看书 www.uuｋanshu．net'
              'ＵU看书 www.ｕuｋanｓhu.net'
              'UU看书 www.uuｋanshu.net '
              'ＵU看书www．uukansｈu.net '
              'UU看书 www.uukanshu.net'
              'ＵU看书 www.uukanshu.net'
              'ＵU看书 www.ｕukanshu.net '
              'UU看书 www.uukａnshu.net '
              ‘UU看书 www.uukanshu．net ’
              ‘UU看书 www.uukａnｓhu．net ’
              ‘UU看书 www.uｕkansｈu．net ’
              UU看书 www.ｕukaｎshu.net
          */
          /[ＵｕUu]+看书\s*www.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[nｎ][eｅ][tｔ]/g,
          '[UＵ]*看书[（\\(].*?[）\\)]文字首发。',
          '请记住本书首发域名：。笔趣阁手机版阅读网址：',
          '\\(\\)',
      ]
  },
  {siteName: "长风文学网",
      url: "^https?://www\\.cfwx\\.net/files/article/html/\\d+/\\d+/\\d+\\.html",
      titleSelector: '.title',
      bookTitleSelector: '.linkleft > a:last',
      contentReplace: [
          '([^\\u4E00-\\u9FFF]+)长\\1风\\1文\\1学[^\\n]+t',
      ]
  },
  {siteName: "云来阁",
      url: "^https?://www\\.yunlaige\\.com/html/\\d+/\\d+/\\d+\\.html",
      titleSelector: '.ctitle',
      bookTitleSelector: '#hlBookName',
      contentSelector: '#content',
      contentRemove: '.bottomlink, a, .cad, .footer, .adbottom',
      contentReplace: [
          '[☆★◆〓『【◎◇].*?(?:yunlaige|云 来 阁|ｙｕｎｌａｉｇｅ).*?[☆◆★〓』】◎◇]',
          '《更新最快小说网站：雲来阁http://WWW.YunLaiGe.COM》',
          '【當你閱讀到此章節，請您移步到雲來閣閱讀最新章節，或者，雲來閣】',
          '【看恐怖小说、玄幻小说、请大家登陆黑岩居http://www.heiyanju.com万本小说免费看】',
          '【本书作者推荐：(?:百度搜索)?云来閣，免费观看本书最快的VIP章节】',
          '搜索引擎搜索关键词\\s*云.来.阁，各种小说任你观看，破防盗章节',
          '搜索关键词 云.来.阁，各种小说任你观看，破防盗章节',
          '◢百度搜索雲来阁，最新最快的小说更新◣',
          '\\(云来阁小说文学网www.yunlaige.com\\)',
          '如您已阅读到此章节，请移步到.*',
          '《想看本书最新章节的书友们，百度搜索一下.*',
          '===百!?度搜索.*?新章节===',
          '【最新更新】',
          '值得您收藏。。',
          '小说“小说章节',
          '纯文字在线阅读本站域名',
          '手机同步阅读请访问',
          '±顶±点±小±说，ww',
          '■dingddian小说，ww∨23w→■m',
          'w∨23w',
          'ｗwｗ23ｗｘｃｏｍ',
          '￥℉頂￥℉点￥℉小￥℉',
          '￡∝頂￡∝点￡∝小￡∝',
          '篮。色。书。巴,',
          '<!--\\?[\\(<]',   // 提取内容后出现的注释标志，造成后面的内容没了
          '看书&nbsp;&nbsp; 要?',
          '喜欢网就上。',
          '无弹窗小说，.*',
          '本书最快更新网站请：.*',
      ]
  },
  {siteName: "乐文小说网",
      url: /^https?:\/\/(www|m)\.lwxs520\.com\/books\/\d+\/\d+\/\d+.html/,
      siteExample: 'http://www.lwxs520.com/books/2/2329/473426.html',
      bookTitleSelector: 'h2',
      chapterTitleReplace: 'WwW.lwxs520.Com|乐文小说网',

      contentRemove: '#content>:not(p)',
      contentReplace: [
          '看小说到乐文小说网www.lwxs520.com',
          '喜欢乐文小说网就上www.*(?:ＣＯＭ|com)',
          '爱玩爱看就来乐文小说网.*',
          '\\(LＷXＳ５２０。\\)',
          'Ｍ.LＷxＳ520.com&nbsp;乐文移动网',
          /乐文小说网值得.+/g,
          '乐\\+文\\+小说&nbsp;Ｗww.しwＸs520.Ｃom',
          '乐文\s*小说 www.lwxs520.com',
          '&乐&文&小说 \\{www\\}.\\{lw\\}\\{xs520\\}.\\{com\\}',
          '<乐-文>小说www.しＷＸS520.com',
          '-乐-文-小-说-www-lwxs520-com',
          '？乐？文？小说 wwＷ.lＷＸs520. ＣＯＭ',
          ';乐;文;小说 www.lw＋xs520.com',
          '小说&nbsp;wＷw.Lwxs520.cＯm',
          'www.LＷＸＳ５２０.com',
          'www.lwxs520.com 首发哦亲',
          '[wＷｗ]+.[lし]w[xχＸ][sS]520.[cｃ][oｏＯ][mＭ]',
          'lwxs520.com\\|?',
          '[しlL][ωＷw][χＸXx][ｓsS]520',
          /\(未完待续.+/g,
          '\\P?[樂乐]\\P文\\P小\\P?说',
          '》乐>文》小说',
          '乐+文+小说',
          '《乐<文《小说',
          '樂文小說',
          ':乐:文:小说',
          '`乐`文`小说`',
          '=乐=文=小说',
          '＠樂＠文＠小＠说|',
          ';乐;文;小说',
          '︾樂︾文︾小︾说\\|',
          '｀乐｀文｀小说｀',
          '@乐@文@小说',
          'lw＋xs520',
          '♂！',
          '3w.',
          '\\(\\)',
      ]
  },
  {siteName: '我爱小说',
      url: '^https?://www\\.woaixiaoshuo\\.com/xiaoshuo/\\d+/\\d+/\\d+\\.html',
      bookTitleSelector: '#lbox > b',
      contentSelector: '#readbox',
      contentRemove: '#papgbutton, #content',
  },
  {siteName: "米花在线书库",
      url: /book\.mihua\.net\/\w+\/\d+\/\d+\/.+\.html/,
      titleSelector: "#title",
      contentSelector: "#viewbook"
  },
  {siteName: "58小说网",
      url: /^https?:\/\/(www|book)\.(58)?58xs\.com\/html\/\d+\/\d+\/\d+\.html/,
      titleSelector: "h1",
      indexSelector: "#footlink > a:eq(1)",
      prevSelector: "#footlink > a:eq(0)",
      nextSelector: "#footlink > a:eq(2)",
      contentSelector: "#content",
      contentRemove: ".f1, .c1"
  },
  {siteName: "天天美文网",
      url: /www\.365essay\.com\/\w+\/.+.htm/,
      titleSelector: ".title > h1",
      contentSelector: "#zoomc td",
      contentRemove: ".page-bottomc"
  },
  {siteName: "天涯武库",
      url: /wx\.ty2016\.com\/.+\.html$/,
      bookTitleSelector: "td[width='800'][height='25']>a[href='./']",
      titleSelector: "strong>font",
      indexSelector: "td a[href='./']",
      nextSelector: "td[width='28%'] a",

      contentSelector: "td[width='760'] p",
      contentHandle: false,
  },
  {siteName: "黄金屋中文网",
      url: /www\.hjwzw\.com\/Book\/Read\/\d+[,_]\d+$/,
      titleSelector: "h1",
      indexSelector: "td a[href='./']",
      contentSelector: "#AllySite+div",
      contentRemove: "b, b+p",
      contentReplace: [
          "请记住本站域名:"
      ]
  },
  {siteName: "梦远书城",
      url: /www\.my285\.com(?:\/\w+){3,5}\/\d+\.htm$/,
      useiframe: true,
      contentSelector: "table:eq(2) tr:eq(3)",
  },
  {siteName: "更新吧",
      url: "^https?://www\\.gengxin8\\.com/read/\\d+/\\d+.html$",
      bookTitleSelector: '.left a:last',
      contentSelector: "#chaptertxt",
      useiframe: true,
  },
  {siteName: "乐文小说网",
      url: "^https?://www\\.365xs\\.org/books/\\d+/\\d+/\\d+\\.html",
      titleSelector: ".kfyd h1",
      bookTitleSelector: "ul.bread-crumbs a:last",
      contentSelector: "#content",
      // contentReplace: []
  },
  {siteName: "舞若小说网",
      url: "^https?://www\\.wuruo\\.com/files/article/html/\\d+/\\d+/\\d+\\.html",
      bookTitleSelector: ".text a:eq(1)",
      contentSelector: "#zhengwen",
      contentReplace: [
          '【更多精彩小说请访问www.wuruo.com】',
          '（www.wuruo.com舞若小说网首发）',
          '【舞若小说网首发】',
      ]
  },
  {siteName: "大书包小说网",
      url: "^https?://www\\.dashubao\\.com?/book/\\d+/\\d+/\\d+\\.html",
      bookTitleSelector: ".read_t > .lf > a:nth-child(3)",
      contentSelector: ".yd_text2",
      contentReplace: [
      ]
  },
  {siteName: "爬书网",
      url: "^https?://www\\.pashuw\\.com/BookReader/\\d+-\\d+/\\d+\\.html",
      bookTitleSelector: "#paihangbang_select > a:last()",
      nextSelector: "#next2 a",
      prevSelector: "#prev2 a",
      indexSelector: "#fhml2 a",
      contentRemove: '.novel_bot',
  },
  {siteName: "闪文书库",
      url: "^https?://read\\.shanwen\\.com/html/\\d+/\\d+/\\d+\\.html",
      titleSelector: '.newstitle',
      contentRemove: '#titlebottom',
      contentReplace: [
          '闪文网址中的.*?注册会员</a>'
      ]
  },
  {siteName: "品书网",
      url: "^https?://www\\.vodtw\\.com/Html/Book/\\d+/\\d+/\\d+\\.html",
      bookTitleSelector: '.srcbox > a:last()',
      contentRemove: 'a',
      contentReplace: [
          '品书网 www.voDtw.com◇↓',
          '品书网 www.vodtW.com',
          '品 书 网 （w W W  . V o Dtw . c o M）',
          '复制网址访问\\s*http://[%\\d\\w]+'
      ]
  },
  {siteName: "凤凰小说网",
      url: "^https?://www\\.fhxs\\.com/read/\\d+/\\d+/\\d+\\.shtml",
      bookTitleSelector: '.con_top > a:last()',
      contentRemove: '.bottem',
      contentReplace: [
      ]
  },
  {siteName: "小说巴士",
      url: "^https?://www\\.xsbashi\\.com/\\d+_\\d+/",
      contentReplace: [
          '全文阅读如您已阅读到此章[節节].*?，，，，',
          '看小说首发推荐去眼快看书',
          '最快更新，阅读请。___小/说/巴/士 Www.XSBASHI.coM___',
          '___小/说/巴/士 www.XSBASHI.com___',
          'lala如您已阅读到此章節，請移步到.*?速记方法：，\\]',
          'lala如您已阅读到此章節.*?敬請記住我們新的網址筆-趣-閣',
          '起舞电子书访问:. 。',
          '≧哈，m\\.',
          '\\[\\s*超多好看\\]',
          '热门【首发】',
          '===百度搜索.*?===',
          '===\\*\\*小说巴士.*?===',
      ]
  },
  {siteName: "思兔阅读",
      url: "^https?://\\w+\\.sto\\.cc/book-\\d+-\\d+.html",
      titleReg: "(.*?)_(.*?)_全文在線閱讀_思兔",
      titlePos: 0,
      //bookTitleSelector: "h1",
      prevSelector: "a:contains('上壹頁'), a:contains('上壹页')",
      nextSelector: "a:contains('下壹頁'), a:contains('下壹页')",
      contentSelector: "div#BookContent",
      contentRemove: 'span',
  },
  {siteName: "去读读",
      url: "^https?://www\\.qududu\\.net/book/\\d+/\\d+/\\d+\\.html",
      contentSelector: "#kui-page-read-txt",
  },
  {siteName: "33言情",
      url: "^https?://www\\.33yq\\.com/read/\\d+/\\d+/\\d+\\.shtml",
      contentRemove: 'a, .bottem, .red',
  },
  {siteName: "巫师图书馆.",
      url: "^https?://www\\.54tushu\\.com/book_library/chaptershow/theId/\\d+\\.html",
      bookTitleSelector: "#m-book-title",
      titleSelector: "div.title",
      prevSelector: "div.pageInfo a:first",
      nextSelector: "div.pageInfo a:last",
      indexSelector: "a[title='返回书页']",
      useiframe: true,
      timeout: 1000,
      contentSelector: "div#ChapterContent",
      contentPatch: function(fakeStub){
        var bookTitle = fakeStub.find('meta[name="keywords"]').attr('content');
        fakeStub.find('body').append('<div id="m-book-title">' + bookTitle + '</div>');
      }
  },

  // ===== 特殊的获取下一页链接
  {siteName: "看书啦",
      url: "^https?://www.kanshu.la/book/\\w+/\\d+\\.shtml",
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
      url: "^https?://www\\.bookgew\\.com/Html/Book/\\d+/\\d+/\\d+\\.htm",
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
  //     url: "^https?://www\\.yawen8\\.com/\\w+/\\d+/\\d+\\.html",
  //     contentSelector: "#content .txtc"
  // }

    {siteName:'妙笔阁',
        url: /^https?:\/\/www\.miaobige\.com\/.*\.html|^https?:\/\/www.(?:52dsm|banfusheng).com\/chapter\/\d+\/\d+.html/i,
        siteExample:'http://www.miaobige.com/book/5_1586/1006320.html',
            // 有的会提示防采集章节
            fInit: function () {
                $('<script>')
                    .text('$(document).unbind("contextmenu selectstart")')
                    .appendTo(document.body);
            },

            useiframe: true,
            mutationSelector: '#content',
            mutationChildCount: 1,
            startLaunch: function($doc){
                var $content = $doc.find('#content');

                if ($content.text().match(/妙笔阁防盗模式：|小说阅读模式：/)) {
                    // 清空不完全的内容节点，通过 mutationSelector 等待内容 完全加载
                    $content.html('');
                }
            },
            contentReplace: '妙笔阁，无弹窗，更新快，记住www.miaobige.com',
            // contentPatch: function($doc){
            //     var $content = $doc.find('#content');
            //     var txt = $content.text();

            //     if (0 === txt.trim().indexOf('防采集章节，')) {
            //         var mNewLink = $content.html().match(/http:\/\/www\.miaobige\.com\/book\/(\d)_(\d+)\/(\d+)\.html/i);
            //         if (mNewLink) {
            //             $content .addClass(READER_AJAX)
            //                 .attr({
            //                     src: '/js/ajaxtxt.asp',
            //                     charset: 'gbk'
            //                 })
            //                 .data('post', {
            //                     sid: mNewLink[2],
            //                     zid: mNewLink[3],
            //                     cid: mNewLink[1]
            //                 })
            //                 .text('请等待加载…');
            //         }
            //     }
            // },
            // http://www.miaobige.com/read/11180/5216676.html 章节内容缺失（下面方式过于复杂，无效）
            // contentPatchAsync: function($doc, callback) {
            //     var $content = $doc.find('#content');
            //     var txt = $content.text();

            //     if (txt.indexOf('妙笔阁防盗模式：') > -1) {
            //         // 很复杂。一串看不懂的 js 生成 $.post('/ajax/content/',{sid:11180,zid:15662893,cid:3},function(data){$('#content').html(data);});
            //         var $script = $doc.find('script:contains(H=~[])');
            //         if (!$script.length) {
            //             console.error('查找 script 失败');
            //             return
            //         }

            //         // 临时劫持
            //         var $ = {
            //             post: function(url, data, mCallback) {
            //                 console.log('222222')
            //                 $content.addClass(READER_AJAX)
            //                     .attr({
            //                         src: url,
            //                         charset: 'UTF-8'
            //                     })
            //                     .data('post', data)
            //                     .text('请等待加载…');

            //                 callback()
            //             }
            //         };

            //         console.log('will eval script')
            //         debugger
            //         eval($script.text());

            //         // var funcStr = ''
            //         // var scriptFn = $script.text().trim().replace(/\(\);$/, '');
            //         // eval('funcStr = ' + scriptFn + '.toString()')
            //     } else {
            //         callback()
            //     }
            // }
    },

  {siteName: '书海小说',
     url: '^https?://www\\.shuhai\\.com/read/\\d+/\\d+\\.html',
     bookTitleSelector: '.path2 a:nth-of-type(3)',
     titleSelector: '.read_top h1',
     prevSelector: '.read .read_dwn p a:nth-of-type(1)',
     indexSelector: '.read .read_dwn p a:nth-of-type(2)',
     nextSelector: '.read .read_dwn p a:nth-of-type(3)',
     contentSelector: '.read .txt',
  },
  {siteName: "欢乐书客",
       url: "^https?://www\\.hbooker\\.com/chapter/book_chapter_detail/\\d+",
       bookTitleSelector: ".breakcrumb > a:last",
       titleSelector: ".book-read-box .read-hd h3",
       useiframe: true,
       timeout: 500,
       contentSelector: ".book-read-box .read-bd",
       contentRemove: ".book-read-box .barrage, #J_BtnGuide, .book-read-box .read-bd i.num, .chapter i, .J_Num, .num, .book-read-box .read-hd p:nth-of-type(1) span",

       indexSelector: ".book-read-page a.btn-list",
       nextUrl: function ($doc){
          return $doc.find('#J_BtnPageNext').attr('data-href');
       },
       prevUrl: function ($doc){
          return $doc.find('#J_BtnPagePrev').attr('data-href');
       },
  },
  {siteName: '棉花糖小说网',
       url: '^https?://www\\.mht\\.la/\\d+/\\d+/\\d+\\.html',
       bookTitleSelector: '.nav > a:nth-of-type(3)',
       titleSelector: '.read_title h1',
       prevSelector: '.pagego a:nth-of-type(1)',
       indexSelector: '.pagego a:nth-of-type(2)',
       nextSelector: '.pagego a:nth-of-type(3)',
       contentSelector: '.content',
       contentRemove: 'a, .contads',
       contentReplace: [
           '下载本书最新的txt电子书请点击：',
           '本书手机阅读：',
           '发表书评：',
           '为了方便下次阅读，你可以在点击下方的.*谢谢您的支持！！',
           '手机用户可访问wap.mianhuatang.la观看小说，跟官网同步更新.*',
       ],
  },
  {siteName: '墨缘文学网',
      url: '^https?://www\\.moyuanwenxue\\.com/xiaoshuo/\\d+/\\d+/\\d+\\.htm',
      contentSelector: '#chapterContent',
      contentReplace: [
         {"ＺＨＡＮ":"战"},
         {"LU":"路"},
         {"ＳＨＯＵ　　ＱＩＡＮＧ":"手枪"},
         {"ｓｉ　ｗａｎｇ":"死亡"},
     ],
  },
  // 必须先用键盘箭头翻页后变成 article\reader 的url后才不会有断章现象
  {siteName: "格格党",
      url: 'http://www\\.ggdown\\.com/modules/article/reader\\.php\\?aid=.*',
      siteExample: 'http://www.ggdown.com/modules/article/reader.php?aid=41490&cid=13833393',
      indexSelector: '.link.xb a:contains("返回列表")',
      contentSelector: "#BookText",
      contentReplace: [
          '记住我们的网址噢。百度搜;格！！格！！党.或者直接输域名/g/g/d/o/w/n/./c/o/m',
      ]
  },
  {siteName: "233言情",
      url: 'http://233yq\\.com/xiaoshuo/.*/.*\\.html',
      siteExample: 'http://233yq.com/xiaoshuo/UsRA_mfLLcU/cwsM8t2ibWE.html',
      titleSelector: '.bname h1',
      bookTitleSelector: '.b21 h3:first()',
      contentSelector: ".cn",
      contentRemove: '.bottem',
  },
  {siteName: "笔趣阁",
      url: /^https?:\/\/www\.biquge\.com\.tw\/\d+_\d+\/\d+.html/,
      siteExample: 'http://www.biquge.com.tw/17_17768/8280656.html',
      contentSelector: "#content"
  },
  {siteName: "笔趣看",
    url: /^https?:\/\/www\.biqukan\.com\/\d+_\d+\/\d+.html/,
    bookTitleSelector: '.path .p > a:last',
    contentReplace: [
      'http://www.biqukan.com/.*',
      '请记住本书首发域名：www.biqukan.com.*',
    ]
  },
  {siteName: '大主宰小说网',
      url: 'www\\.daizhuzai\\.com/\\d+/\\d+\\.html',
      bookTitleSelector: '.readbox article .info span:nth-of-type(1) a',
      titleSelector: '.readbox article .title h1 a',
      prevSelector: '.readbox .operate li:nth-of-type(1) a',
      indexSelector: '.readbox .operate li:nth-of-type(2) a',
      nextSelector: '.readbox .operate li:nth-of-type(3) a',
      useiframe: true,
      mutationSelector: "#chaptercontent",
      mutationChildCount: 2,
      timeout: 500,
      contentSelector: '.readbox article .content',
      contentRemove: '',
      contentReplace: [
          { '。&': '。' },
          '△番茄小說○網☆',
          '☆ 番茄○△小說網',
          '番茄小說網☆',
      ],
  },
  {siteName: "墨缘文学网",
      url: "^http://www\\.mywenxue\\.com/xiaoshuo/\\d+/\\d+/\\d+\\.htm",
      bookTitleSelector: '#htmltimu h1 a',
      titleSelector: "#htmltimu h2 span",
      prevSelector: ".papgbutton a:nth-of-type(1)",
      indexSelector: ".papgbutton a:nth-of-type(2)",
      nextSelector: ".papgbutton a:nth-of-type(3)",
      useiframe: true,
      contentSelector: '.contentbox > .contentbox',
      contentRemove: "strong, a",
      contentReplace: [
          { 'ＺＨＡＮ': '战' },
          { 'SI议': '思议' },
          { '意SI': '意思' },
          { 'ｓｉ　ｗａｎｇ': '死亡' },
          { 'ＤＩＮＧ好': '定好' },
          { '夺舍ＳＨＩ': '夺舍式' },
          { '招ＳＨＩ': '招式' },
          { '制ＳＨＩ': '制式' },
          { '正ＳＨＩ': '正式' },
          { '菜ＳＨＩ': '菜式' },
          { 'LU上': '路上' },
          { '条LU': '条路' },
          { '马LU': '马路' },
          '更多请登录墨缘文学网.*欢迎您的来访 &gt;&gt;&gt;',
          '更多请登录墨缘文学网.*欢迎您的来访\\[ .* \\]',
          '\\( http.*墨缘文学网 \\)',
      ],
  },
  {siteName: '大海中文',
      url: 'http://www\\.dhzw\\.org/book/\\d+/\\d+/\\d+\\.html',
      contentReplace: [
          '恋上你看书网 630bookla.*',
          '\\(\\)',
      ]
  },
  {siteName: '爱上书屋',
      url: 'https?://www.23sw.net/\\d+/\\d+/\\d+.html',
      titleReg: /(.*?) (.*?),/,
      contentReplace: [
          '\\[www.23sw.net\\]',
      ]
  },
  {siteName: '书轩网',
      url: '^https?://www.bookxuan.com/\\d+_\\d+/\\d+.html',
      bookTitleSelector: '.con_top a:last',
      contentReplace: [
          { '&amp;quot;': '"', },
          'getreadset;',
          // '&lt;div class=&quot;divimage&quot;&gt;&lt;img src=&quot;',
          '&lt;div class="divimage"&gt;&lt;img src="',
      ],
      contentPatch: function($doc) {
          $doc.find('#content[title="书，轩，网"]').remove();
      }
  },
  {siteName: '大家读书院',
      url: '^https?://www.dajiadu.net/files/article/html/\\d+/\\d+/\\d+.html',
      contentSelector: '#content, #content1',
      contentRemove: '.copy',
  },
  {siteName: '2k小说阅读网',
      url: 'https?://www.2kxs.com/xiaoshuo/\\d+/\\d+/\\d+.html',
      exampleUrl: 'http://www.2kxs.com/xiaoshuo/106/106185/23622820.html',
      contentSelector: '.Text',
      contentRemove: 'a, font, strong',
      contentReplace: [
          '2k小说阅读网',
      ]
  },
  {siteName: "新笔趣阁",
      url: "^http:\/\/www.biqu6.com\/[0-9_]+\/[0-9]+.html$",

      titleReg: /(.*?)章节目录 [-_\\\/](.*?)[-_\/].*/,
      titlePos: 0,
      titleSelector: "#title h1",

      indexSelector: "a:contains('章节目录')",
      prevSelector: "a:contains('上一章')",
      nextSelector: "a:contains('下一章')",

      contentSelector: "#content",
      contentReplace: [
          /\*/g
      ],
  },
  {siteName: "涅破小说网",
      url: "^http://www.niepo.net/html/\\d+/\\d+/\\d+.html",
      contentReplace: [
          '.*最新章节.*http://www.niepo.net/.*'
      ],
  },
  {siteName: '全本小说网',
    url: 'http://www.ybdu.com/xiaoshuo/\\d+/\\d+/\\d+.html',
    contentRemove: '.infos, .chapter_Turnpage',
  },
  {siteName: '连载书',
    exampleUrl: 'http://www.lianzaishu.com/4_4017/2172985.html',
    url: '^https?://www.lianzaishu.com/\\d+_\\d+/\\d+.html',
    bookTitleSelector: '.read-top h2 a',
    contentRemove: 'h1, h2, .textinfo, .adbox, .read-page',
    contentReplace: [
        '&lt;html&gt;', '&lt;/html&gt;',
        '&lt;head&gt;&lt;/head&gt;',
        '&lt;body&gt;', '&lt;/body&gt;',
        '&lt;div&gt;',
    ]
  },

  // 这网站为了防抓取，内容顺序都是不对的，只好采用 iframe 方式
  {siteName: '和图书',
    exampleUrl: 'http://www.hetushu.com/book/1421/964983.html',
    url: '^https?://www.hetushu.com/book/\\d+/\\d+.html',
    bookTitleSelector: '#left h3',
    nextSelector: 'a#next',
    prevSelector: 'a#pre',
    indexSelector: '#left h3 a',
    useiframe: true,
    // 后面的是 和图书 的干扰码
    contentRemove: 'h2, acronym, bdo, big, cite, code, dfn, kbd, q, s, samp, strike, tt, u, var',
    contentPatch: function($doc) {
        // 转换 div 到 p
        $doc.find('#content div').each(function() {
            let html = $(this).html();
            $(this).replaceWith(
                $('<p>').html(html)
            );
        });
    }
  },

  // 移动版
  {siteName: "掌阅手机网",
      url: "https?://wap\\.yc\\.ireader\\.com\\.cn/book/\\d+/\\d+/",
      titleReg: "(.*?),.*?作品 - 掌阅小说网",
      titlePos: 0,
      titleSelector: "h4",
      contentSelector: "div.text",
  },

];

// ===== 小说拼音字、屏蔽字修复 =====
// 运行在未替换 <br> 之前，.* 可能会造成全部替换
const replace = {
  // ===格式整理===
  // "\\(|\\[|\\{|（|【|｛":"（",
  // "\\)|\\]|\\}|）|】|｝":"）",

  // 需要？
  ",": "，",
  // ":": "：", "\\?":"？",  // 会造成起点的图片无法替换

  "\\*|＊": "*",
  "[wWｗＷ]{3}": "www",
  "w{3}(\u3001|\u3002)": "www.",
  "[cCｃＣ][oOｏＯ][mMｍＭ]": "com",
  "[nNｎＮ][eｅEＥ][tｔTＴ]": "net",
  "[cCｃＣ][nNｎＮ]": "cn",
  "(\\.|\u3001|\u3002)com": ".com",
  "(\\.|\u3001|\u3002)net": ".net",
  "(\\.|\u3001|\u3002)cn": ".cn",
  "[pPｐＰ][sSｓＳ][:：]": "ps:",
  "。{5,7}": "……", "~{2,50}": "——", "…{3,40}": "……", "－{3,20}": "——",
  //"。(,|，|。)": "。",
  // "？(,|，)": "？",
  //"”(,|，|。)": "”",
  "@{3,}": "",

  // === 段末的多余的r ===
  "\\\\r<br>": "<br>",

  // === 一些特殊的替换 ===
  "\\[+CP.*(http://file.*\\.jpg)\\]+": "<img src='$1'>",
  "『(.)』": "$1",  // "『色』": "色",

  // === 去广告 ===
  "\\[搜索最新更新尽在[a-z\\.]+\\]": "",
  "<a>手机用户请到m.qidian.com阅读。</a>": "",
  ".{2,4}中文网欢迎广大书友": "",
  "访问下载txt小说|◎雲來閣免费万本m.yunlaige.com◎": "",
  "〖∷更新快∷无弹窗∷纯文字∷.*?〗": "",
  '超快稳定更新小说[,，]': '', "本文由　。。　首发": "",
  '”小说“小说章节更新最快': '',
  '如果觉得好看，请把本站网址推荐给您的朋友吧！': '',
  '本站手机网址：&nbsp;&nbsp;请互相通知向您QQ群【微博/微信】论坛贴吧推荐宣传介绍!': '',
  "fqXSw\\.com": "", "\\.5ｄｕ|\\.５du５\\.": "",
  "\\[\\]": "",
  "如果您觉得网不错就多多分享本站谢谢各位读者的支持": "",
  "全文字无广告|\\(看书窝&nbsp;看书窝&nbsp;无弹窗全文阅读\\)": "",
  "。。+[\\s　]*看最新最全小说": "",
  "水印广告测试": "",
  "\\(平南文学网\\)": "", "讀蕶蕶尐說網": "",
  "比奇提示：如何快速搜自己要找的书籍": "", "《百度书名\\+比奇》即可快速直达": "",
  "~无~错~小~说": "",

  "\\(一秒记住小说界\\）|\\*一秒记住\\*": "",
  "uutxt\\.org|3vbook\\.cn|www\\.qbwx\\.com|WWw\\.YaNkuai\\.com|www\\.btzw\\.com|www\\.23uS\\.com": "",
  "txt53712/": "",
  "\xa0{4,12}": "\xa0\xa0\xa0\xa0\xa0\xa0\xa0",

  // === 通用去广告
  "[wｗＷ]{1,3}[．\\.]２３ｕＳ[．\\.](?:ｃｏＭ|com)": "",

  // === 星号屏蔽字还原 ===
  // === 八九 ===
  "十有(\\*{2})": "十有八九",
  "十有bā'九": "十有八九",
  "(\\*{2})不离十": "八九不离十",
  "(\\*{2})点": "八九点",
  "(\\*{2})个": "八九个",
  "(\\*{2})岁": "八九岁",
  "(\\*{2})成": "八九成",
  "(\\*{2})年": "八九年",
  "一八(\\*{2})": "一八八九",

  // === SM ===
  "G(\\*{2})": "GSM",

  // === 情色 ===
  "感(\\*{2})彩": "感情色彩",

  // === 大法 ===
  "强(\\*{2})u5B9D": "强大法宝",
  "强(\\*{2})宝": "强大法宝",
  "种魔(\\*{2})": "种魔大法",
  "巨(\\*{2})": "巨大法",
  "强(\\*{2})术": "强大法术",
  "(\\*{2})师": "大法师",

  // === 肉体 ===
  "(\\*{2})凡胎": "肉体凡胎",
  "夺取她的(\\*{2})": "夺取她的肉体",
  "夺取他的(\\*{2})": "夺取他的肉体",
  "(\\*{2})与精神": "肉体与精神",
  "(\\*{2})素材": "肉体素材",
  "(\\*{2})材料": "肉体材料",
  "在(\\*{2})上": "在肉体上",

  // === 赤裸 ===
  "(\\*{4})着": "赤裸着",
  "(\\*{2})裸": "赤裸裸",
  "浑身(\\*{2})": "浑身赤裸",

  // === 射 ===
  "枪(\\*{4})": "枪发射",
  "(\\*{4})而出": "喷射而出",
  "光(\\*{2})": "光四射",

  // === 鱼水 ===
  "(\\*{2})之欢": "鱼水之欢",

  // === 国军 ===
  "(\\*{2})队": "国军队",
  "(\\*{2})舰": "国军舰",
  "(\\*{2})方": "国军方",

  // === 露阴 ===
  "暴(\\*{2})谋": "暴露阴谋",

  // === 欲望 ===
  "的(\\*{2})是无止境的": "的欲望是无止境的",
  "邪恶的(\\*{2})": "邪恶的欲望",
  "被(\\*{2})支配": "被欲望支配",
  "掀桌的(\\*{2})": "掀桌的欲望",
  "控制不住(\\*{2})": "控制不住欲望",
  "求生的(\\*{2})": "求生的欲望",
  "求生(\\*{2})": "求生欲望",
  "购买(\\*{2})": "购买欲望",
  "永无止境的(\\*{2})": "永无止境的欲望",
  "(\\*{2})的发泄": "欲望的发泄",
  "发泄(\\*{2})": "发泄欲望",
  "杀戮(\\*{2})": "杀戮欲望",
  "(\\*{2})和本能": "欲望和本能",

  // === 呻吟 ===
  "不堪重负的(\\*{2})": "不堪重负的呻吟",
  "(\\*{2})声": "呻吟声",
  "颤抖(\\*{2})": "颤抖呻吟",
  "(\\*{2})颤抖": "呻吟颤抖",

  // === 独立 ===
  "宣布(\\*{2})": "宣布独立",
  "(\\*{2})空间": "独立空间",

  // === 荡漾 ===
  "波纹(\\*{2})": "波纹荡漾",

  // === 喘息 ===
  "(\\*{2})之机": "喘息之机",

  // === 大波 ===
  "一(\\*{2})": "一大波",

  // === 上供 ===
  "(\\*{2})奉": "上供奉",

  // === 奸淫 ===
  "(\\*{2})掳掠": "奸淫掳掠",

  // === 失身 ===
  "有(\\*{2})份": "有失身份",

  // === 六合 ===
  "(\\*{2})八荒": "六合八荒",

  // === 人祸 ===
  "天灾(\\*{2})": "天灾人祸",

  // === 轮红 ===
  "一(\\*{2})日": "一轮红日",

  // === 西藏 ===
  "东躲(\\*{2})": "东躲西藏",

  // === 被操 ===
  "(\\*{2})纵": "被操纵",

  // === 穷屌 ===
  "(\\*{2})丝": "穷屌丝",

  // === 销魂 ===
  "(\\*{2})滋味": "销魂滋味",

  // === 色水 ===
  "血(\\*{2})晶": "血色水晶",

  // === 偷用 ===
  "偷(\\*{2})": "偷偷用",

  // === 乳交 ===
  "水(\\*{2})融": "水乳交融",


  // === 多字替换 ===
  "cao之过急": "操之过急", "chunguang大泄": "春光大泄",
  "大公无si": "大公无私",
  "fu道人家": "妇道人家", "放sōng'xià来": "放松下来",
  "奸yin掳掠": "奸淫掳掠",
  "空dangdang": "空荡荡",
  "突发qing况": "突发情况",
  "yin奉阳违": "阴奉阳违", "一yin一阳": "一阴一阳",

  // === 双字替换 ===
  "暧m[eè][iì]":"暧昧",
  "bàn\\s*fǎ":"办法", "bucuo":"不错", "不liáng":"不良", "b[ěe]i(\\s|&nbsp;)*j[īi]ng":"北京", "bǐ\\s*shǒu":"匕首", "半shen":"半身", "b[ìi]j[ìi]ng":"毕竟", "报(了?)jing":"报$1警", "bèi'pò":"被迫", "包yǎng":"包养", "(?:biǎo|婊\\\\?)子":"婊子", "biǎo\\s*xiàn\\s*":"表现",
  "chifan":"吃饭", "ch[oō]ngd[oò]ng":"冲动", "chong物":"宠物", "cao(练|作)":"操$1", "出gui":"出轨", "chu\\s*xian":"出现", "缠mian":"缠绵", "成shu":"成熟", "(?:赤|chi)\\s*lu[oǒ]":"赤裸", "春guang":"春光", "chun风":"春风", "chuang伴":"床伴", "沉mi":"沉迷", "沉lun":"沉沦", "刺ji":"刺激", "chao红":"潮红", "初chun":"初春", "＂ｃｈｉ\\s*ｌｕｏ＂":"赤裸", "cí\\s*zhí":"辞职",
  "dān\\s*xīn":"当心", "dang校":"党校", "da子":"鞑子", "大tui":"大腿", "dǎ\\s*suàn":"打算", "dá\\s*àn":"答案", "dài\\s*lǐ":"代理", "dengdai":"等待", "电huà":"电话", "diàn\\s*huà":"电话", "diàn\\s*yǐng":"电影", "diao丝":"屌丝", "d[úu](?:\\s|&nbsp;|<br/>)*l[ìi]":"独立", "d[uú]\\s{0,2}c[áa]i":"独裁", "d?[iì]f[āa]ng":"地方", "d[ìi]\\s*d[ūu]":"帝都", "di国|帝guo":"帝国", "du[oò]落":"堕落", "坠luò":"坠落",
  "f[ǎa]ngf[óo]":"仿佛", "fei踢":"飞踢", "fēi\\s*wén":"飞吻", "feng流":"风流", "风liu":"风流", "f[èe]nn[ùu]":"愤怒", "fǎn\\s*yīng":"反应", "fú\\s*wù":"服务", "fù\\s*chóu":"复仇",
  "gao潮":"高潮", "高氵朝":"高潮", "gāo\\s*xìng\\s*":"高兴", "干chai":"干柴", "勾yin":"勾引", "gu[oò]ch[ée]ng":"过程", "gu[āa]n\\s*x[iì]":"关系", "官\\s*fāng":"官方", "g[ǎa]nji[àa]o":"感觉", "国wu院":"国务院", "gù\\s*yì\\s*":"故意", "guofen":"过分", "guān\\s*fāng":"官方",
  "hā\\s*hā\\s*":"哈哈", "h[aǎ]ode":"好的", "hù士":"护士", "火qiang":"火枪", "huó\\s*dòng":"活动", "há'guó":"韩国", "han住":"含住", "hai洛因":"海洛因", "红fen":"红粉", "火yao":"火药", "h[ǎa]oxi[àa]ng":"好像", "hu[áa]ngs[èe]":"黄色", "皇d[ìi]":"皇帝", "昏昏yu睡":"昏昏欲睡", "回dang":"回荡", "huí\\s*qù\\s*":"回去", "hé\\s*shì\\s*":"合适", "hàn\\s*jiān":"汉奸",
  "jian(臣|细)":"奸$1", "奸yin":"奸淫", "jiànmiàn":"见面", "jian货":"贱货", "jing察":"警察", "jǐng\\s*chá":"警察", "j[ìi]nháng":"进行", "jīng\\s*guò":"经过", "ji烈":"激烈", "j[iì](nv|女)":"妓女", "jirou":"鸡肉", "ji者":"记者", "jì\\s*xù\\s*":"继续", "ju花":"菊花", "j[īi]动":"激动", "jili[èe]":"激烈", "肌r[òo]u":"肌肉", "ji射":"激射", "ji[ēe]ch[uù]":"接触", "jiù\\s*shì":"就是", "j[ùu]li[èe]":"剧烈", "jǐng惕":"警惕", "节cao":"节操", "浸yin":"浸淫", "jù\\s*jué\\s*":"拒绝", "jue色":"角色",
  "k[ěe]n[ée]ng":"可能", "开bao":"开苞", "k[àa]o近":"靠近", "口wen":"口吻", "kankan":"看看",
  "ling辱":"凌辱", "luan蛋":"卵蛋", "脸sè":"脸色", "lu出":"露出", "流máng":"流氓", "lun理":"伦理", "lì\\s*qì":"力气", "lán\\s*jié":"拦截", "lìng\\s*lèi":"另类", "lè\\s*suǒ":"勒索", "lòudòng":"漏洞",
  "m[ǎa]ny[ìi]":"满意", "m[ǎa]sh[àa]ng":"马上", "m[ée]iy[oǒ]u":"没有", "mei国":"美国", "měi\\s*nǚ":"美女", "m[íi]ngb[áa]i":"明白", "迷huan":"迷幻", "mi茫":"迷茫", "mó\\s*yàng":"模样", "m[íi]n\\s{0,2}zh[ǔu]":"民主", "迷jian":"迷奸", "mimi糊糊":"迷迷糊糊", "mì\\s*shū":"秘书", "末(?:\\s|<br/?>)*ì":"末日", "面se":"面色", "mengmeng":"蒙蒙", "màn\\s*huà":"漫画",
  "nàme":"那么", "n[ǎa]o\\s*d[àa]i":"脑袋", "n[ée]ngg[oò]u":"能够", "nán\\s{0,2}hǎi":"那会", "内jian":"内奸", "[内內]y[iī]":"内衣", "内ku":"内裤",
  "pi[áa]o客":"嫖客", "p[áa]ngbi[āa]n":"旁边",
  "q[íi]gu[àa]i":"奇怪", "qì\\s*chē":"汽车", "qing\\s*(ren|人)":"情人", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚", "què\\s*dìng":"确定", "球mi":"球迷", "青chun":"青春", "青lou":"青楼", "qingkuang":"情况", "qiang[　\\s]*jian":"强奸",
  "re\\s*nao":"热闹", "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易", "ru(房|白色)":"乳$1", "rén员":"人员", "rén形":"人形", "人chao":"人潮", "renmen":"人名", "ruǎn\\s*jiàn":"软件", "rì\\s*běn":"日本", "日\\s*běn":"日本",
  "shàng\\s*mén":"上门", "上jiang":"上将", "she(门|术|手|程|击)":"射$1", "sudu":"速度", "shú\\s*nǚ":"熟女", "shuijue":"睡觉", "shide":"是的", "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u":"时候", "sh[ií]me":"什么", "si人":"私人", "shi女":"侍女", "shi身":"失身", "sh[ūu]j[ìi]":"书记", "shu女":"熟女", "shu[　\\s]?xiong":"酥胸", "(?:上|shang)chuang":"上床", "shǒu\\s*jī":"手机", "呻y[íi]n":"呻吟", "sh[ēe]ngzh[íi]":"生殖", "深gu":"深谷", "双xiu":"双修", "生r[ìi]":"生日", "si盐":"私盐", "shi卫":"侍卫", "si下":"私下", "sao扰":"骚扰", "ｓｈｕａｎｇ\\s*ｆｅｎｇ":"双峰", "shǎo\\s*fù":"少妇", "shì\\s*pín":"视频", "shè\\s*xiàng":"摄像",
  "t[uū]r[áa]n":"突然", "tiaojiao":"调教", "tí\\s*gòng":"提供", "偷qing":"偷情", "推dao":"推倒", "脱guang":"脱光", "t[èe]bi[ée]":"特别", "t[ōo]nggu[òo]":"通过", "同ju":"同居", "tian来tian去":"舔来舔去",
  "w[ēe]ixi[ée]":"威胁", "wèizh[ìi]":"位置", "wei员":"委员", "w[èe]nti":"问题", "wèi\\s*dào\\s*":"味道", "wú\\s*nài":"无奈", "wǔ\\s*qì":"武器",  "weilai":"未来",
  "xiu长":"修长", "亵du":"亵渎", "xing福":"幸福", "xìng\\s*yùn":"幸运", "小bo":"小波", "小niū":"小妞", "xiong([^a-z])":"胸$1", "小tui":"小腿", "xiang港":"香港", "xiàohuà":"笑话", "xiāo\\s*shòu":"销售", "xiàn\\'zhì":"限制", "xiàn\\s*jīn":"现金", "xiāng\\s*zǐ":"箱子", "xiōng\\s*dì":"兄弟", "选zé":"选择", "xìn\\s*hào":"信号", "xìng\\s*gǎn":"性感", "xiǎo\\s*jiě":"小姐", "xìn\\s*hào":"信号", "xià\\s*zhù":"下注",
  "yì\\s*wài\\s*":"意外", "yin(冷|暗|谋|险|沉|沟|癸派|后)":"阴$1", "y[iī]y[àa]ng":"一样", "y[īi]di[ǎa]n":"一点", "yī\\s*zhèn":"一阵", "y[ǐi]j[īi]ng":"已经", "疑huo":"疑惑", "yí\\s*huò":"疑惑", "影mi":"影迷", "yin荡":"淫荡", "yin贼":"淫贼", "阳w[ěe]i":"阳痿", "yao头":"摇头", "yaotou":"摇头", "摇tou":"摇头", "yezhan":"野战", "you饵":"诱饵", "(?:you|诱)(?:惑|huo)":"诱惑", "you导":"诱导", "引you":"引诱", "you人":"诱人", "youshi":"有事", "you\\s*xiu":"优秀", "御yòng":"御用", "旖ni":"旖旎", "yu念":"欲念", "you敌深入":"诱敌深入", "影she":"影射", "牙qian":"牙签", "一yè情":"一夜情", "yīng\\s*yǔ":"英语",
  "z[iì]j[iǐ]":"自己", "z[ìi](?:\\s|<br/?>|&nbsp;)*y[oó]u":"自由", "zh[iī]d?[àa]u?o":"知道", "zixin":"自信", "zhì'fú":"制服", "zhì\\s*fú":"制服", "zha药":"炸药", "zhan有":"占有", "zhào\\s*piàn":"照片", "zhè\\s*gè":"这个", "政f[ǔu]|zheng府":"政府", "zh[èe]ng\\s{0,2}f[uǔ]":"政府", "zong理":"总理", "zh[ōo]ngy[āa]ng":"中央", "中yang":"中央", "zu[oǒ]\\s*y[oò]u":"左右", "zhǔ\\s*dòng":"主动", "zh[oō]uw[ée]i":"周围", "zhōu\\s*nián":"周年", "中nan海":"中南海", "中j委":"中纪委", "中zu部":"中组部", "政zhi局":"政治局", "(昨|一|时|余)(?:<br/?>|&nbsp;|\\s)*ì":"$1日", "照she":"照射", "zhǔn\\s*bèi\\s*":"准备", "zhu义":"主义",

  "</p>\\n<p>\\s*ì":"日",

  '曹艹': '曹操',
  'JI昂': '激昂',
  '□□无暇': '自顾无暇',
  '法律/界': '法律界',
  '人/类': '人类',
  '恐怖/主义': '恐怖主义',
  '颠/覆': '颠覆',
  '民.事.司.法.裁.判': '民事司法裁判',
  '南海/问题': '南海问题',
  '圈圈/功': '法轮功',
  '镇/压': '镇压',
  '赤.裸': '赤裸',
  '欲·望': '欲望',
  'nv真': '女真',
  '土gai': '土改',
  '狗·屎': '狗屎',
  'du立': '独立',
  '发sao': '发骚',
  '奸/夫/淫/妇': '奸夫淫妇',
  '爱qing': '爱情',
  '抚mo': '抚摸',
  '神qing': '神情',
  '公~务~员': '公务员',
  '原着': '原著',
  '□□部分': '高潮部分',
  '角□□面': '角色情面',
  '艹': '操',
  '淫/靡/香/艳': '淫靡香艳',
  '毒丨药': '毒药',
  '登6': '登陆',
  '天□□美': '天性爱美',
  '双丨飞': '双飞',
  '高chao': '高潮',
  'pi股': '屁股',
  '情/趣': '情趣',
  '情/欲': '情欲',
  '炸/弹': '炸弹',
  '赤/身': '赤身',
  '果/体': '裸体',
  'zhong国': '中国',
  '帝国#主义': '帝国主义',
  '形形□□': '形形色色',
  'yuwang': '欲望',
  'shuangtui': '双腿',
  '城／管': '城管',
  '调丨教': '调教',
  '银/行/卡': '银行卡',
  '裸/体': '裸体',
  '光/裸': '光裸',
  '嫩/女': '嫩女',
  '维/谷': '维谷',
  '开□□谈': '开始交谈',
  '破碎的□□': '破碎的呻吟',
  'pi霜': '砒霜',
  'ma醉': '麻醉',
  '麻zui': '麻醉',
  'nue杀': '虐杀',
  '后gong': '后宫',
  '林荫dao': '林荫道',
  '分/身': '分身',
  '克/隆': '克隆',
  '性/需要': '性需要',
  '黑/帮': '黑帮',
  '政-府': '政府',
  '八/九': '八九',
  '不～着~寸～缕': '不着寸缕',
  '肉~体': '肉体',
  '蹲□子': '蹲下身子',
  'ji情': '激情',
  'xie恶': '邪恶',
  'Z国': '中国',
  '创/世': '创世',
  '紫jin城': '紫禁城',
  '□□在外': '裸露在外',
  '光怪6离': '光怪陆离',
  '邪/教': '邪教',
  '粗bao': '粗暴',
  'yin邪': '淫邪',
  '小biao砸': '小婊砸',

  '牛1b': '牛b', '微1博': '微博', '内1衣': '内衣',
};

const replaceAll = [
  // 长文字替换
  // 排序代码：newArr = arr.sort((a, b) => { var diff = a.charCodeAt(1) - b.charCodeAt(1); if (diff == 0) return b.length - a.length; return diff; })
  '本站域名已经更换为，老域名已经停用，请大家重新收藏，并使用新域名访问。',
  "\\(跪求订阅、打赏、催更票、月票、鲜花的支持!\\)",
  "\\(?未完待续请搜索飄天文學，小说更好更新更快!",
  "\\(跪求订阅、打赏、催更票、月票、鲜花的支持!",
  "\\(看小说到网\\)",
  "\\(未完待续。\\)",
  "\\(本章完\\)",
  "16977小游戏每天更新好玩的小游戏，等你来发现！",
  "（800小说网 www.800Book.net 提供Txt免费下载）最新章节全文阅读-..-",
  "（800小说网 www.800Book.net 提供Txt免费下载）",
  "\\[800\\]\\[站页面清爽，广告少，",
  "\\[看本书最新章节请到求书 .\\]",
  "（\\s*君子聚义堂）",
  "readx;",
  "txt电子书下载/",
  "txt全集下载",
  "txt小说下载",
  "\\|优\\|优\\|小\\|说\\|更\\|新\\|最\\|快\\|www.uuxs.cc\\|",
  "\\|每两个看言情的人当中，就有一个注册过可°乐°小°说°网的账号。",
  "思ˊ路ˋ客，更新最快的！",
  "恋上你看书网 630bookla ，最快更新.*",
  "，举报后维护人员会在两分钟内校正章节内容，请耐心等待，并刷新页面。",
  "追书必备",
  "-优－优－小－说－更－新－最－快-www.ＵＵＸＳ.ＣＣ-",
  "-优－优－小－说－更－新－最－快x",
  "来可乐网看小说",
  "纯文字在线阅读本站域名手机同步阅读请访问",
  "本文由　　首发",
  "樂文小说",
  '最快更新无错小说阅读，请访问 请收藏本站阅读最新小说!',
  "最新章节全文阅读看书神器\\.yankuai\\.",
  "最新章节全文阅读（..首发）",
  "最新章节全文阅读【首发】",
  "最新章节全文阅读",
  "看本书最新章节请到800小说网（www.800book.net）",
  "（本章未完，请翻页）",
  "手机用户请浏览m.biqugezw.com阅读，更优质的阅读体验。",
  "手机用户请浏览阅读，更优质的阅读体验。",
  "阅读，更优质的阅读体验。",
  "手机最省流量无广告的站点。",
  "手机看小说哪家强手机阅",
  "如果你喜欢本站[〖]?一定要记住[】]?(?:网址|地址)哦",
  "看清爽的小说就到",
  "请用搜索引擎(?:搜索关键词)?.*?完美破防盗章节，各种小说任你观看",
  "完美破防盗章节，请用搜索引擎各种小说任你观看",
  "破防盗章节，请用搜索引擎各种小说任你观看",
  "(?:搜索引擎)?各种小说任你观看，破防盗章节",
  "章节错误，点此举报\\(免注册\\)",
  "热门小说最新章节全文阅读.。 更新好快。",
  "【阅读本书最新章节，请搜索800】",
  "亲，百度搜索眼&amp;快，大量小说免费看。",
  "亲，眼&快，大量小说免费看。",
  '下载免费阅读器!!',
  '笔趣阁&nbsp;.，最快更新.*最新章节！',
  '请大家搜索（书迷楼）看最全！更新最快的小说',
  '更新快无广告。',
  '【鳳.{1,2}凰.{1,2}小说网 更新快 无弹窗 请搜索f.h.xiao.shuo.c.o.m】',
  '【可换源APP看书软件：书掌柜APP或直接访问官方网站shuzh.net】',
  '[●★▲]手机下载APP看书神器.*',
  "m.?手机最省流量的站点。",
  'm.?手机最省流量.无广告的站点。',
  '底部字链推广位',
  'us最快',
  'APPapp',
  '久看中文网首发',

  // 复杂规则的替换
  '(看小说到|爱玩爱看就来|就爱上|喜欢)?(\\s|<|>|&| |[+@＠=:;｀`%？》《〈︾-])?[乐樂](\\s|&lt;|&gt;|&amp;|&nbsp;|[+@＠=:;｀`%？》《〈︾-])?[文].*?[说說][网]?[|]?(.*(3w|[ｗωＷw]{1,3}|[Ｍm]).*[ｍＭm])?[}。\\s]?(乐文小说)?',
  '(本文由|小说)?(\\s| )?((3w|[wＷｗ]{1,3}|[Ｍm]).)?\\s?[lしｌL][ｗωＷw][ｘχＸx][ｓＳs][５5][２2][０0].*[ｍＭm][|\\s]?(首发(哦亲)?)?',
  '([『【↑△↓＠︾]+[\u4E00-\u9FA5]){2,6}[】|]',

  // 包含 \P 的替换
  '\\P{1,2}[顶頂].{1,3}[点小].*?o?[mw，]',
  '\\P.?长.{1,2}风.{1,2}文.{1,2}学.*?[tx]',
  '\\P无.错.*?[cＣ][oＯ][mＭ]',
  '[;\\(]顶.{0,2}点.小说',
  '2长2风2文2学，w￠＄',
  '》长>风》',

  // 包含 .* 的，可能有多余的替换
  '看无防盗章节的小说，请用搜索引擎搜索关键词.*',
  '(?:完美)?破防盗章节，请用搜索引擎搜索关键词.*',
  '搜索引擎搜索关键词，各种任你观看，破防盗章节',
  '破防盗完美章节，请用搜索引擎.*各种小说任你观看',
  '如您已(?:閱讀|阅读)到此章节.*?敬请记住我们新的网址\\s*。',
  '↗百度搜：.*?直达网址.*?↖',
  "[:《〈｜~∨∟∑]{1,2}长.{1,2}风.*?et",
  '\\[限时抢购\\].*',
  '支持网站发展.逛淘宝买东西就从这里进.*',
  'ps[：:]想听到更多你们的声音，想收到更多你们的建议，现在就搜索微信公众号“qdread”并加关注，给.*?更多支持！',
  '(?:ps[:：])?看《.*?》背后的独家故事.*?告诉我吧！',
  '（?天上掉馅饼的好活动.*?微信公众号！）?',
  '（微信添加.*qdread微信公众号！）',
  'jiemei如您已阅读到此章节，请移步到.*?\\[ads:本站换新网址啦，速记方法：，.\\]',
  '.*关注微信公众号.*',
  '一秒记住.*',

  // 短文字替换
  '\\[txt全集下载\\]',
  '\\[\\s*超多好看小说\\]',
  '⊙四⊙五⊙中⊙文☆→',
  '\\[ads:本站换新网址啦，速记方法：.*?\\]',
  '[》《｜～]无(?:.|&gt;)错(?:.|&gt;)小说',
  '`无`错`小说`www.``com', '＋无＋错＋小说＋3w＋＋',
  '\\|优\\|优\\|小\\|说\\|更\\|新\\|最\\|快Ｘ',
  '▲∴', '8，ww←',
  /www.23＋?[Ｗw][Ｘx].[Ｃc]om/ig,
  /热门推荐:、+/g,
  /h2&gt;/g,
  '[《〈》>\\+｜～［\\]]无\\1错\\1', '》无>错》',

  '女凤免费小说抢先看', '女凤小说网全文字 无广告',
  '乐文小说网?', '《乐〈文《小说', '乐文移动网', '頂点小说', '頂點小說',
  '追小说哪里快去眼快',
  '\\[书库\\].\\[774\\]\\[buy\\].kuai',
  'www.938xs.com',

  /'ads_wz_txt;',|百度搜索|无弹窗小说网|更新快无弹窗纯文字|高品质更新|小说章节更新最快|\(百度搜.\)|全文字手打|“”&nbsp;看|无.弹.窗.小.说.网|追书网|〖∷∷无弹窗∷纯文字∷ 〗/g,
];

// import _ from 'underscore'

// 单字替换，可能会误替换，所以需要特殊处理
var oneWordReplace = {
  "b[āà]ng":"棒","bào":"爆","bà":"吧","bī":"逼","bō":"波", "biàn":"便",
  "cāo":"操", "cǎo":"草", "cào":"操", "chāng":"娼", "chang":"娼", "cháo":"潮", "chā":"插", "chéng":"成", "chōu":"抽", "chuáng":"床", "chún":"唇", "chūn":"春", "cuō":"搓", "cū":"粗",
  "dǎng":"党", "dàng":"荡", "dāo":"刀", "dòng":"洞", "diao":"屌", "diǎn":"点",
  "fǎ":"法", "féi":"肥", "fù":"妇",
  "guān":"官",
  "hán":"含", "hóu":"喉", "hòu":"后", "h(u)?ā":"花", "huá":"华", "huì":"会", "huò":"惑", "hùn":"混", "hún":"魂",
  "jiǔ":"九", "j[īi]ng":"精", "jìn":"禁", "jǐng":"警", "jiāng":"江", "jiān":"奸", "jiāo":"交", "jūn":"军", "jū":"拘", "jú":"局", "jī":"激", "激ān":"奸",
  "kù":"裤", "kàn":"看",
  "[1l]àng":"浪", "liáo":"撩", "liú":"流", "lì":"莉", "liè":"烈", "[1l]uàn":"乱", "lún":"伦", "luǒ":"裸", "lòu":"露", "[l1]ù":"露", "lǜ":"绿", "liàn":"练",
  "mǎi":"买", "mài":"卖", "máo":"毛", "mā":"妈", "méng":"蒙", "mén":"门", "miè":"灭", "mí":"迷", "mì":"蜜", "mō":"摸", "miàn":"面",
  "nǎi":"奶", "nèn":"嫩", "niào":"尿", "niē":"捏", "nòng":"弄", "nǚ":"女",
  "pào":"炮", "piàn":"片", "pò":"破",
  "qi[āa]ng":"枪", "qíng":"情", "qīn":"亲", "qiú":"求", "quán":"全", "qù":"去",
  "rén":"人", "r[ìi]":"日", "rǔ":"乳",

  // s
  "sǎ":"洒", "sāo":"骚", "sǎo":"骚", "sè":"色", "se":"色", "shā":"杀",
  "shēn":"身", "shēn":"呻",   // 2个重复的，误替换且是单字怎么办
  "shén":"神", "shè":"射", "shǐ":"屎", "shì":"侍", "sǐ":"死", "sī":"私", "shǔn":"吮", "sǔn":"吮", "sū":"酥", "shào":"绍",

  "tān":"贪", "tiǎn":"舔", "t[ǐi]ng":"挺", "tǐ":"体", "tǒng":"捅", "tōu":"偷", "tou":"偷", "tuǐ":"腿", "tūn":"吞", "tún":"臀", "tiáo":"调", "tài":"态", "tào":"套",
  "wēn":"温", "wěn":"吻",
  "xiǎo":"小", "xiào":"笑", "xìng":"性", "xing":"性", "xiōng":"胸", "xī":"吸", "xí":"习", "xì":"系", "xìn":"信", "xué":"穴", "xuè":"穴", "xùe":"穴",  "xuan":"宣", "xiàng":"象",
  "yāng":"央", "yàn":"艳", "yīn":"阴", "yào":"药", "yé":"爷", "yòu":"诱", "zàng":"脏", "y[ùu]":"欲", "yín":"淫", "yì":"意", "yà":"讶",
  "zhēn":"针", "zēn":"针", "zhà":"炸", "zhèng":"政", "zǒu":"走", "zuì":"罪", "zuò":"做", "zhōng":"中",
};

var replaceFix = {
  // ===误替换还原===
  "碧欲":"碧玉", "美欲":"美玉","欲石":"玉石","惜欲":"惜玉","宝欲":"宝玉",
  "品性":"品行", "德性":"德行",
  "波ok":"book", "波SS":"BOSS",

  // ===其他修正===
  "弥俩":"你俩",
  "妳":"你",
  "圞|垩|卝|龘":"",
  "大6":"大陆",
};

function extendRule(replaceRule) {
  _.each(oneWordReplace, function(value, key) {
    // 这个替换会把 yùn 替换为 yù
    // replace['\\b' + key + '(?:\\b|\\s*)'] = value;

    // 这个不会替换 rén： shā rén偿命 => 杀 rén偿命
    // replaceRule['([^a-z\\s])' + key + '(?![a-z])'] = '$1' + value;

    replaceRule['\\b' + key + '(?![a-z])'] = value;
  });

  _.extend(replaceRule, replaceFix);
}



// test()

// Unicode/2000-2FFF：http://zh.wikibooks.org/wiki/Unicode/2000-2FFF
// Unicode/F000-FFFF：https://zh.wikibooks.org/wiki/Unicode/F000-FFFF

// replace 中的简写
var CHAR_ALIAS = {
  '\\P': '[\\u2000-\\u2FFF\\u3004-\\u303F\\uFE00-\\uFF60\\uFFC0-\\uFFFF]',  // 小说中添加的特殊符号
};

// ===== 自动尝试的规则 =====
var Rule = {
  titleRegExp: /第?\s*[一二两三四五六七八九十○零百千万亿0-9１２３４５６７８９０]{1,6}\s*[章回卷节折篇幕集话話]/i,
  titleReplace: /^章节目录|^文章正文|^正文|全文免费阅读|最新章节|\(文\)/,

  // nextRegExp: /[上前下后][一]?[页张个篇章节步]/,
  nextSelector: "a[rel='next'], a:contains('下一页'), a:contains('下一章'), a:contains('下一节'), a:contains('下页')",
  prevSelector: "a[rel='prev'], a:contains('上一页'), a:contains('上一章'), a:contains('上一节'), a:contains('上页')",
  // 忽略的下一页链接，匹配 href
  nextUrlIgnore: [
      /(?:(?:index|list|last|LastPage|end)\.)|BuyChapterUnLogin|^javascript:/i,

      // qidian
      /BookReader\/LastPageNew\.aspx/i,
      /read\.qidian\.com\/BookReader\/\d+,0\.aspx$/i,
      /read\.qidian\.com\/$/i,
      /free\.qidian\.com\/Free\/ShowBook\.aspx\?bookid=/i,

      /book\.zongheng\.com\/readmore/i,
      /www\.shumilou\.com\/to-n-[a-z]+-\d+\.html/i,
      /\/0\.html$/i,
  ],
  nextUrlCompare: /\/\d+(_\d+)?\.html?$|\/wcxs-\d+-\d+\/$|chapter-\d+\.html$|\/\d+_\d+\/$/i,  // 忽略的下一页链接（特殊），跟上一页比较

  // 按顺序匹配，匹配到则停止。econtains 完全相等
  indexSelectors: ["a[href='index.html']", "a:contains('返回书目')", "a:contains('章节目录')", "a:contains('章节列表')",
      "a:econtains('最新章节')", "a:contains('回目录')","a:contains('回书目')", "a:contains('目 录')", "a:contains('目录')"],

  contentSelectors: ["#pagecontent", "#contentbox", "#bmsy_content", "#bookpartinfo", "#htmlContent",
      "#text_area", "#chapter_content", "#chapterContent", "#partbody", "#BookContent", "#read-content",
      "#article_content", "#BookTextRead", "#booktext", "#book_text", "#BookText", "#readtext", "#readcon",
      "#TextContent", "#text_c", "#txt_td", "#TXT", "#txt", "#zjneirong",
      ".novel_content", ".readmain_inner", ".noveltext", ".booktext", ".yd_text2",
      "#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#contentts", "#content1", "#content", ".content"
  ],

  // 尝试查找书名。顶部章节导航的最后一个链接可能是书名。
  bookTitleSelector: [
    '.h1title > .shuming > a[title]',
    '.chapter_nav > div:first > a:last',
    '#header > .readNav > span > a:last',
    'div[align="center"] > .border_b > a:last',
    '.ydselect > .weizhi > a:last',
    '.bdsub > .bdsite > a:last',
    '#sitebar > a:last',
    '.con_top > a:last',
    '.breadCrumb > a:last',
  ],
  bookTitleReplace: [
      '全文阅读$',
  ],

  contentRemove: "script, iframe",          // 内容移除选择器
  removeLineRegExp: /<p>[　\s。;，！\.∷〖]*<\/p>/g,  // 移除只有一个字符的行

  // 以下不常改
  replaceBrs: /(<br[^>]*>[ \n\r\t]*){1,}/gi,    // 替换为<p>
};

Rule.specialSite = sites;

Rule.replace = replace;

extendRule(Rule.replace);

// ===== 全局移除，在替换 <br> 为 \n 之后 =====
Rule.replaceAll = replaceAll;


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

// 内容需要 ajax 的 className
const READER_AJAX = "reader-ajax";

const autoBookTitleSelector = Rule.bookTitleSelector;

function autoGetBookTitle($doc) {
    let bookTitle = '';
    // 依次获取
    for (let s of autoBookTitleSelector) {
        let $node = $doc.find(s);
        if ($node.length === 1) {
            bookTitle = $node.text();
            break
        }
    }

    // 排除一些无效的？
    C.log('autoGetBookTitle', bookTitle);

    return bookTitle
}

function getElemFontSize(_heading) {
    var fontSize = 0;
    var _heading_style = window.getComputedStyle(_heading, null);
    if (_heading_style) {
        // firefox57 2017年9月10日 会错误
        try {
            var str = _heading_style.getPropertyValue("font-size") || 0;
            fontSize = parseInt(str, 10);
        } catch(e) { }
    }

    return fontSize
}

function Parser(){
    this.init.apply(this, arguments);
}

Parser.prototype = {
    constructor: Parser,
    get contentTxt() {  // callback 才有用
        var text = $('<div>').html(this.content).text().trim();

        // 解决第二个段落和第一个锻炼合在一起的问题
        text = text.replace(/([^\n])　　/, '$1\n　　');

        return text;
    },

    init: function (info, doc, curPageUrl) {
        this.info = info || {};
        this.doc = doc;
        this.$doc = $(doc);
        this.curPageUrl = curPageUrl || doc.URL;
        this._curPageHost = getUrlHost(this.curPageUrl);  // 当前页的 host，后面用到

        // 设置初始值
        this.isTheEnd = false;
        this.isSection = false;
    },
    applyPatch: function(){
        var contentPatch = this.info.contentPatch;
        if(contentPatch){
            try {
                contentPatch.call(this, this.$doc);
                C.log("Apply Content Patch Success.");
            } catch (e) {
                C.log("Error: Content Patch Error!", e);
            }
        }
    },
    applyAsyncPatch: function(callback) {
        var contentPatch = this.info.contentPatchAsync;
        if(contentPatch){
            try {
                contentPatch.call(this, this.$doc, callback.bind(this));
                C.log("Apply Content Patch[Async] Success.");
            } catch (e) {
                C.log("Error: Content Patch[Async] Error!", e);
            }
        } else {
            callback();
        }
    },
    getAll: function(callback){
        var self = this;

        C.debug('开始解析页面');

        this.applyPatch();

        this.applyAsyncPatch(function() {
            self.preProcessDoc(callback);
        });

        return this;
    },
    preProcessDoc: function(callback) {
        var self = this;
        var endFn = function(data) {
            if (data) {
                var div;
                if (data.content) {
                    div = $('<div id="content"></div>').html(data.content);
                } else if (data.html) {
                    div = $('<div></div>').html(data.html);
                }

                self.$doc.find('body').prepend(div);
            }

            self.parse();
            callback(self);
        };

        if (!this.hasContent() && this.info.getContent) {
            C.log('开始 info.getContent');
            this.info.getContent.call(this, this.$doc, endFn);
        } else {
            // 特殊处理，例如起点
            var ajaxScript = this.$doc.find('.' + READER_AJAX);
            if (ajaxScript.length > 0) {
                var url = ajaxScript.attr('src');
                if(!url) return;
                var charset = ajaxScript.attr('charset') || 'utf-8';

                C.log('Ajax 获取内容: ', url, ". charset=" + charset);

                var reqObj = {
                    url: url,
                    method: "GET",
                    overrideMimeType: "text/html;charset=" + charset,
                    headers: {},
                    onload: function(res){
                        var text = res.responseText;
                        text = text.replace(/document.write(ln)?\('/, "")
                                .replace("');", "")
                                .replace(/[\n\r]+/g, '</p><p>');

                        endFn({
                            content: text
                        });
                    }
                };

                // Jixun: Allow post data
                var postData = ajaxScript.data('post');

                if (postData) {
                    reqObj.method = 'POST';
                    reqObj.data = $.param(postData);
                    reqObj.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }

                GM_xmlhttpRequest(reqObj);
            } else {
                endFn();
            }
        }
    },
    parse: function() {
        C.group('开始获取链接');
        this.getPrevUrl();
        this.getIndexUrl();
        this.getNextUrl();
        C.groupEnd();

        C.group('开始获取标题');
        this.getTitles();
        C.groupEnd();

        this.getContent();
    },

    hasContent: function() {
        var $content;

        // var $ajaxScript = this.$doc.find('.' + READER_AJAX);
        // if ($ajaxScript.length > 0) {
        //     return true;
        // }

        // 排除 qidian 需付费的页面
        if (this.info.isVipChapter) {
            if (this.info.isVipChapter(this.$doc)) {
                this.isTheEnd = 'vip';
                return false;
            }
        }

        if(this.info.contentSelector){
            $content = this.$doc.find(this.info.contentSelector);
        }

        if (!$content || !$content.length) {
            // 按照顺序选取
            var selectors = Rule.contentSelectors;
            for(var i = 0, l = selectors.length; i < l; i++){
                $content = this.$doc.find(selectors[i]);
                if($content.length){
                    C.log("自动查找内容选择器: " + selectors[i]);
                    break;
                }
            }
        }

        this.$content = $content;
        // C.debug($content);

        return $content.size() > 0;
    },
    // 获取书名和章节标题
    getTitles: function(){
        var info = this.info,
            chapterTitle,
            bookTitle,
            docTitle = this.$doc.find("title").text();

        // 获取章节标题
        if (info.titleReg){
            var matches = docTitle.match(toRE(info.titleReg, 'i'));
            if(matches && matches.length >= 2){
                var titlePos = ( info.titlePos || 0 ) + 1;
                var chapterPos = (titlePos == 1) ? 2 : 1;

                bookTitle = matches[titlePos];
                chapterTitle = matches[chapterPos];
            }

            C.log("TitleReg:", info.titleReg, matches);
        }

        // 如果有 titleSelector 则覆盖从 titleReg 中获取的
        var tmpChapterTitle = this.getTitleFromRule(info.titleSelector);
        if (tmpChapterTitle) {
            chapterTitle = tmpChapterTitle;
        }

        if(!chapterTitle){
            chapterTitle = this.autoGetChapterTitle(this.doc);
        }
        if (info.chapterTitleReplace) {
            chapterTitle = chapterTitle.replace(toRE(info.chapterTitleReplace), '');
        }

        // get bookTitle
        if (!bookTitle && info.bookTitleSelector) {
            bookTitle = this.getTitleFromRule(info.bookTitleSelector);
        }
        if (!bookTitle) {
            bookTitle = autoGetBookTitle(this.$doc);
            bookTitle = this.replaceText(bookTitle, Rule.bookTitleReplace);
        }
        if (info.bookTitleReplace) {
            bookTitle = bookTitle.replace(toRE(info.bookTitleReplace), '');
        }

        // 标题间增加一个空格，不准确，已注释
        chapterTitle = chapterTitle
                .replace(Rule.titleReplace, "")
                .trim();
                // .replace(/(第?\S+?[章节卷回])(.*)/, "$1 $2");

        if (chapterTitle.startsWith(bookTitle)) {
            chapterTitle = chapterTitle.replace(bookTitle, '').trim();
        }

        bookTitle = bookTitle.replace(/(?:最新章节|章节目录)$/, '');

        docTitle = bookTitle ?
                bookTitle + ' - ' + chapterTitle :
                docTitle;

        if (Setting.cn2tw) {
            bookTitle = this.convert2tw(bookTitle);
            chapterTitle = this.convert2tw(chapterTitle);
            docTitle = this.convert2tw(docTitle);
        }

        this.bookTitle = (bookTitle || '目录').trim();
        this.chapterTitle = chapterTitle;
        this.docTitle = docTitle;

        C.log("Book Title: " + this.bookTitle);
        C.log("Chapter Title: " + this.chapterTitle);
        C.log("Document Title: " + this.docTitle);
    },
    getTitleFromRule: function(selectorOrArray) {
        var title = '';
        if (!selectorOrArray) {
            return '';
        }

        var selector,
            replace;

        if (_.isArray(selectorOrArray)) {
            selector = selectorOrArray[0];
            replace = selectorOrArray[1];
        } else {
            selector = selectorOrArray;
        }

        var $title = this.$doc.find(selector);
        if (!$title.length) {
            C.error('无法找到标题', selector, this.doc);
            return '';
        }

        title = $title.remove().text().trim();

        if (replace) {
            title = title.replace(toRE(replace), '');
        }

        return title;
    },
    // 智能获取章节标题
    autoGetChapterTitle: function (document) {
        var
            _main_selector = "h1, h2, h3",
            _second_selector = "#TextTitle, #title, .ChapterName, #lbChapterName, div.h1",
            _positive_regexp = Rule.titleRegExp,
            // _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/,
            // _negative_regexp = /[上前下后][一]?[页张个篇章节步]/,
            _title_remove_regexp = /最新章节|书书网/,
            $doc = $(document),
            _document_title = document.title || $doc.find("title").text(),
            _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' ';

        var _headings = $doc.find(_main_selector);
        // 加上 second selector 并去除包含的
        $doc.find(_second_selector).each(function(){
            if($(this).find(_main_selector).length === 0){
                _headings.push(this);
            }
        });

        var possibleTitles = {},
            _heading_text;

        C.groupCollapsed('自动查找章节标题');

        $(_headings).each(function(){
            var _heading = this,
                _heading_text = _heading.textContent.trim();

            if (!_heading_text || _heading_text in possibleTitles) {
                return;
            }

            C.group('开始计算 "' + _heading_text + '" 的得分');

            // h1 为 1， h2 为 2
            var
                nodeNum = parseInt(_heading.nodeName.slice(1), 10) || 10,
                score = 10 / nodeNum,
                _heading_words = _heading_text.replace(/\s+/g, " ").split(" "),
                _matched_words = "";

            C.log("初始得分：" + score);

            // 后面这种是特殊的判断
            if (_positive_regexp.test(_heading_text) || /\d{2,4}/.test(_heading_text)) {
                score += 50;
            }
            // if(_negative_regexp.test(_heading_text)){
            //     score -= 100;
            // }

            C.log("符合正则计算后得分：" + score);

            //  count words present in title
            for (var j = 0, _j = _heading_words.length; j < _j; j++) {
                if (_search_document_title.indexOf(_heading_words[j]) > -1) {
                    _matched_words += _heading_words[j] + ' ';
                }
            }
            score += _matched_words.length * 1.5;

            C.log("跟页面标题比较后得分：" + score);

            var _font_size_add_score = getElemFontSize(_heading) * 1.5;
            score +=  _font_size_add_score;

            C.log("计算大小后得分：" + score);

            possibleTitles[_heading_text] = score;

            C.groupEnd();
        });

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

        curTitle = curTitle.replace(Rule.titleReplace, "");

        C.groupEnd();

        return curTitle;
    },

    // 获取和处理内容
    getContent: function(){
        var self = this;

        this.hasContent();

        if (!this.$content || this.$content.size() <= 0) {
            // callback(this);
            console.error('没有找到内容', this.$doc);
            return;
        }

        this.content = this.handleContentText(this.$content.html(), this.info);
    },
    handleContentText: function(text, info){
        if(!text) return null;

        // 贴吧的内容处理比较耗时间
        C.group('开始内容处理');
        C.time('内容处理');

        var contentHandle = (typeof(info.contentHandle) == 'undefined') ? true : info.contentHandle;

        // 拼音字、屏蔽字修复
        if(contentHandle){
            text = this.replaceHtml(text, Rule.replace);
        }

        /* Turn all double br's into p's */
        text = text.replace(Rule.replaceBrs, '</p>\n<p>');
        text = text.replace(/<\/p><p>/g, "</p>\n<p>");

        text = this.normalizeContent(text);

        // GM_setClipboard(text);

        text = this.removeDump(text);

        // 规则替换
        if (info.contentReplace) {
            text = this.replaceText(text, info.contentReplace);
        }

        // 移除文字广告等
        text = this.replaceText(text, Rule.replaceAll);

        // 去除内容中的标题
        if(this.chapterTitle && Rule.titleRegExp.test(this.chapterTitle)){
            try {
                var reg = toReStr(this.chapterTitle).replace(/\s+/g, '\\s*');
                reg = new RegExp(reg, 'ig');
                text = text.replace(reg, "");
                C.log('去除内容中的标题', reg);
            } catch(e) {
                console.error(e);
            }
        }

        if (this.bookTitle) {
            var regStr = '（' + toReStr(this.bookTitle) + '\\d*章）';
            text = text.replace(new RegExp(regStr, 'ig'), "");
        }

        if (Setting.cn2tw) {
            text = this.convert2tw(text);
        }

        try {
            text = this.contentCustomReplace(text);
        } catch(ex) {
            console.error('自定义替换错误', ex);
        }

        // 采用 DOM 方式进行处理
        var $div = $("<div>").html(text);

        // contentRemove
        $div.find(Rule.contentRemove).remove();
        if(info.contentRemove){
            $div.find(info.contentRemove).remove();
        }

        // 给独立的文本加上 p
        var $contents = $div.contents();
        if ($contents.length === 1) {   // 可能里面还包裹着一个 div
            $contents = $contents.contents();
        }
        $contents.filter(function() {
            return this.nodeType == 3 &&
                this.textContent != '\n' &&
                (!this.nextElementSibling || this.nextElementSibling.nodeName != 'A') &&
                (!this.previousElementSibling || this.previousElementSibling.nodeName != 'A');
        }).wrap('<p>');

        // 删除无效的 p，排除对大块文本的判断
        $div.find('p, h1').filter(function() {
            var $this = $(this);
            if ($this.find('img').size())  // 排除有图片的
                return false;

            // 有效文本（排除注释、换行符、空白）个数为 0
            return $this.contents().filter(function() {
                return this.nodeType != 8 &&
                        !this.textContent.match(/^\s*$/);
            }).size() == 0;
        }).remove();

        // 把一大块的文本分段
        if (Setting.split_content) {
            var $p = $div.find('p'),
                $newP;
            if ($p.length == 0 ) {
                $newP = $div;
            } else if ($p.length == 1) {
                $newP = $p;
            }

            if ($newP) {
                $newP.replaceWith('<p>' + this.splitContent($newP.html()).join('</p>\n<p>') + '</p>');
            }
        }

        if(contentHandle){
            $div.filter('br').remove();

            $div.find('*').removeAttr('style');
        }

        $div.find('p').removeAttr('class');

        // 图片居中，所有图像？
        // if(info.fixImage){
        //     $div.find("img").each(function(){
        //         this.className += " blockImage";
        //     });
        // }

        text = $div.html();

        // 修复第一行可能是空的情况
        text = text.replace(/(?:\s|&nbsp;)+<p>/, "<p>");

        // 修复当行就一个字符的
        text = text.replace(/<\/p><p>([。])/, "$1");

        if(config.paragraphBlank){
            text = text.replace(/<p>(?:\s|&nbsp;)+/g, "<p>")
                    .replace(/<p>/g, "<p>　　");
        }

        // 删除空白的、单个字符的 p
        text = text.replace(Rule.removeLineRegExp, "");

        C.timeEnd('内容处理');
        C.groupEnd();

        return text;
    },
    normalizeContent: function(text) {
        text = text.trim();

        if (text.startsWith('<')) return text;

        // 修正 </p> 在另一行的情况
        text = text.replace(/\n<\/p>/g, '</p>');

        var lines = text.split('\n');
        var firstLine = lines[0];
        var lastLine = lines[lines.length - 1];

        // 修正 p 不完整的情况
        if (!firstLine.includes('<p>') && firstLine.includes('</p>')) {
            text = '<p>' + text;
        }
        if (lastLine.includes('<p>') && !lastLine.includes('</p>')) {
            text = text + '</p>';
        }

        return text;
    },
    /**
     * 移除内容中大块的重复。
     * 例如：http://www.wangshuge.com/books/109/109265/28265316.html
     *
     * @param  {string} text 内容
     * @return {string}      处理后的内容
     */
    removeDump: function(text) {
        var newContent = text;

        var lines = text.split('\n');
        var firstLine = lines[0];
        // 有重复
        if (firstLine.length > 10) {
            // 因为 indexOf 只查找第一个
            var dumpIndex = lines.slice(1).indexOf(firstLine) + 1;
            if (dumpIndex >= config.dumpContentMinLength) {
                var firstPart = lines.slice(0, dumpIndex).join('\n');
                var restPart = lines.slice(dumpIndex).join('\n')
                    .replace(/^<\/p>\n/, '');
                if (restPart.startsWith(firstPart)) {
                    newContent = restPart;
                }
            }
        }

        return newContent;
    },
    replaceHtml: function(text, replaceRule) {  // replaceRule 给“自定义替换规则直接生效”用
        if (!replaceRule) {
            replaceRule = Rule.replace;
        }

        // 先提取出 img
        var imgs = {};
        var i = 0;
        text = text.replace(/<(img|a)[^>]*>/g, function(img){
            imgs[i] = img;
            return "{" + (i++) + "}";
        });

        // 修正拼音字等
        text = this.contentReplacements(text, replaceRule);

        // 还原图片
        text = $.nano(text, imgs);

        return text;
    },
    contentReplacements: function (text, rule) {
        if (!text) return text;

        for (var key in rule) {
            text = text.replace(toRE(key, "ig"), rule[key]);
        }
        return text;
    },
    replaceText: function(text, rule){
        var self = this;
        switch(true) {
            case _.isRegExp(rule):
                text = text.replace(rule, '');
                break;
            case _.isString(rule):
                // 还原简写
                _.each(CHAR_ALIAS, function(value, key) {
                    rule = rule.replace(key, value);
                });
                var regexp = new RegExp(rule, 'ig');
                text = text.replace(regexp, '');
                break;
            case _.isArray(rule):
                rule.forEach(function(r){
                    text = self.replaceText(text, r);
                });
                break;
            case _.isObject(rule):
                var key;
                for(key in rule){
                    text = text.replace(new RegExp(key, "ig"), rule[key]);
                }
                break;
        }
        return text;
    },
    convert2tw: function (text) {
        if (!text) return text;

        var ii, len, str;
        str = text.split("");
        len = str.length;
        for (ii = 0; ii < len; ii++) {
            str[ii] = cn2tw[str[ii]] || str[ii];
        }

        str = str.join("");

        return str;
    },
    contentCustomReplace: function (text) {
        if (!text) return text;

        for (var key in Rule.customReplace) {
            text = text.replace(new RegExp(key, 'ig'), Rule.customReplace[key]);
        }
        return text;
    },
    splitContent: function (text) {  // 有些章节整个都集中在一起，没有分段，这个函数用于简易分段
        if (text.indexOf('。') == -1) {
            return [text];
        }

        var hasMark = false,
            lines = [],
            charCotainer = [];

        text.split('').forEach(function(c) {
            charCotainer.push(c);

            if (c == '“') {
                hasMark = true;
            } else if (c == '”') {
                hasMark = false;
            } else if (c == '。' && !hasMark) {
                lines.push(charCotainer.join(''));
                charCotainer = [];
            }
        });

        return lines;
    },

    getIndexUrl: function(){
        var url = '',
            selector = this.info.indexSelector || this.info.indexUrl;

        if (selector === false) {
            this.indexUrl = url;
            return url;
        }

        // 先尝试站点规则
        if (selector && _.isFunction(selector)) {
            url = selector(this.$doc);
        } else if(this.info.indexSelector){
            url = this.$doc.find(this.info.indexSelector);
        }

        // 再尝试通用规则
        if (!url || !url.length) {
            var selectors = Rule.indexSelectors;
            var _indexLink;
            // 按照顺序选取目录链接
            for(var i = 0, l = selectors.length; i < l; i++){
                _indexLink = this.$doc.find(selectors[i]);
                if(_indexLink.length > 0){
                    url = _indexLink;
                    break;
                }
            }
        }

        if(url){
            url = this.checkLinks(url);
            C.log("找到目录链接: " + url);
        }

        if (!url) {
            C.log("无法找到目录链接.");
        }

        this.indexUrl = url;
        return url;
    },
    getNextUrl: function(){
        var url = '',
            selector = this.info.nextSelector || this.info.nextUrl;

        if (selector === false) {
            this.nextUrl = url;
            return url;
        }

        // 先尝试站点规则
        if (selector) {
            if (_.isFunction(selector)) {
                url = selector(this.$doc);
            } else {
                url = this.$doc.find(selector);
            }

            url = this.checkLinks(url);
        }

        // 再尝试通用规则
        if (!url) {
            url = this.$doc.find(Rule.nextSelector);
            url = this.checkLinks(url);
        }

        if (url) {
            C.log("找到下一页链接: " + url);
        } else {
            C.log("无法找到下一页链接");
        }

        this.nextUrl = url || '';
        this.isTheEnd = !this.checkNextUrl(url);
        if(this.isTheEnd){
            C.log('已到达最后一页');
            this.theEndColor = config.end_color;
        }

        return url;
    },
    // 获取上下页及目录页链接
    getPrevUrl: function(){
        var url = '',
            selector = this.info.prevSelector || this.info.prevUrl;

        if (selector === false) {
            this.prevUrl = url;
            return url;
        }

        // 先尝试站点规则
        if (selector) {
            if (_.isFunction(selector)) {
                url = selector(this.$doc);
            } else {
                url = this.$doc.find(selector);
            }

            url = this.checkLinks(url);
        }

        // 再尝试通用规则
        if (!url) {
            url = this.$doc.find(Rule.prevSelector);
            url = this.checkLinks(url);
        }

        if (url) {
            C.log("找到上一页链接: " + url);
        } else {
            C.log("无法找到上一页链接");
        }

        this.prevUrl = url || '';
        return url;
    },
    checkNextUrl: function(url){
        if (this.info.checkSection) {
            if (/\/\d+_\d+\.html$/.test(this.curPageUrl)) {
                this.isSection = true;
                if(url == this.indexUrl){
                    return false;
                }else{
                    return true;
                }
            }
        }

        // 跟 include 比较
        var includeUrl = this.info.includeUrl || this.getIncludeUrl();
        if (!toRE(includeUrl).test(url))
            return false;

        switch(true){
            case url === '':
                return false
            case this.info.exclude && toRE(this.info.exclude).test(url):
                return false
            case Rule.nextUrlIgnore.some(function(re) { return toRE(re).test(url) }):
                return false
            case url === this.indexUrl:
                return false
            case url === this.prevUrl:
                return false
            case url === this.curPageUrl:
                return false
            case Rule.nextUrlCompare.test(this.prevUrl) && !Rule.nextUrlCompare.test(url):
                return false
            default:
                return true
        }
    },
    getIncludeUrl: function() {
        var includeUrl = this.info.url;

        if (!includeUrl && typeof GM_info !== 'undefined') {
            var locationHref = location.href;
            GM_info.script.includes.some(function(includeStr) {
                var iUrl = wildcardToRegExpStr(includeStr);
                if (toRE(iUrl).test(locationHref)) {
                    includeUrl = iUrl;
                    return true;
                }
            });
        }

        this.info.includeUrl = includeUrl;
        return includeUrl;
    },
    checkLinks: function(links){
        var self = this;
        var url = '';

        if (!links) return ''

        if (_.isString(links)) {
            return this.getFullHref(links);
        }

        links && links.each(function(){
            url = $(this).attr("href");
            if(!url || url.indexOf("#") === 0 || url.indexOf("javascript:") === 0)
                return;

            url = self.getFullHref(this);
            return false;
        });

        return url;
    },
    getLinkUrl: function(linkOrUrl) {
        // if (linkOrUrl && )
        return linkOrUrl;
    },
    getFullHref: function(href) {
        if(!href) return '';

        if (!_.isString(href)) {
            href = href.getAttribute('href');
        }

        if (href.indexOf('http://') === 0) {
            return href;
        }

        var a = this.a;
        if (!a) {
            this.a = a = document.createElement('a');
        }
        a.href = href;

        // // 检测 host 是否和 当前页的一致
        // if (a.host != this._curPageHost) {
        //     a.host = this._curPageHost;
        // }

        return a.href;
    },
};

var tpl_mainCss = "@font-face {\r\n    font-family: 'FontAwesome';\r\n    src: url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0');\r\n    src: url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n  }\r\n\r\nbody > a { display:none !important; }\r\n.hidden {\r\n    display: none;\r\n}\r\n.quiet-mode {\r\n    display: none;\r\n}\r\nbody {\r\n    background: #F3F2EE;\r\n    color: #1F0909;\r\n    padding: 0px;\r\n    margin: 0px;\r\n    font-family: \"Microsoft YaHei UI\", 微软雅黑, 新宋体, 宋体, arial;\r\n}\r\na { color: #065488; }\r\na:link { text-decoration: none; }\r\n\r\n#mynovelreader-content {\r\n    width: {content_width};\r\n    font-size: {font_size};\r\n    font-family: {font_family};\r\n    line-height: {text_line_height};\r\n    margin-left:auto;\r\n    margin-right:auto;\r\n    padding-bottom: 15px;\r\n}\r\n#mynovelreader-content img{\r\n    max-width: 100%;\r\n}\r\n\r\narticle {\r\n    margin-top: 55px;\r\n    word-wrap: break-word;\r\n}\r\n\r\narticle h1 {\r\n    clear: both;\r\n    line-height: 50px;\r\n    font-size: {title_font_size};\r\n    font-weight: normal;\r\n    margin: 25px -20px;\r\n    padding: 0 20px 10px;\r\n    border-bottom: 1px solid rgba(0,0,0,.25);\r\n    font-weight: normal;\r\n    text-transform: none;\r\n}\r\n\r\narticle li {\r\n    list-style: none;\r\n}\r\n\r\n.chapter-footer-nav {\r\n    text-align:center;\r\n    font-size:0.9em;\r\n    margin:-10px 0px 30px 0px;\r\n}\r\n#loading {\r\n    color: white;\r\n    text-align: center;\r\n    font: 12px \"微软雅黑\", \"宋体\", \"Times New Roman\", \"Verdana\";\r\n    margin-top: 20px;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    width: 376px;\r\n    height: 32px;\r\n    line-height: 32px;\r\n    border-radius: 20px;\r\n    border: 1px solid #666;\r\n    background-color: #333;\r\n}\r\n#loading img {\r\n    vertical-align: middle;\r\n}\r\n#loading a {\r\n    color: white;\r\n}\r\n#preferencesBtn{\r\n    position: fixed;\r\n    top: 10px;\r\n    right: 10px;\r\n    z-index: 1597;\r\n}\r\n\r\n#alert {\r\n    position: fixed;\r\n    z-index: 100;\r\n    float: auto;\r\n    width: auto;\r\n    height: auto;\r\n    top: 10px;\r\n    left: 500px;\r\n    background: rgba(215, 240, 253, 0.65);\r\n    color: #2d7091;\r\n    border: 1px solid rgba(45,112,145,0.3);\r\n    border-radius: 4px;\r\n}\r\n#alert p {\r\n    font-size: 15px;\r\n    margin: 6px;\r\n}\r\n\r\n#message {\r\n    position: fixed;\r\n    z-index: 1010;\r\n    width: auto;\r\n    height: auto;\r\n    top: 10px;\r\n    left: 500px;\r\n\r\n    padding: 8px 16px;\r\n    border-radius: 4px;\r\n    box-shadow: 0 2px 8px rgba(0,0,0,.2);\r\n    background: #fff;\r\n    display: inline-block;\r\n    pointer-events: all;\r\n\r\n    font-size: 12px;\r\n}\r\n#message .fa-spinner {\r\n    font-size: 13px;\r\n    margin-right: 4px;\r\n}\r\n#message p {\r\n    margin: 0;\r\n}\r\n\r\nimg.blockImage {clear: both;float: none;display: block;margin-left: auto;margin-right: auto;}\r\n\r\n#menu-bar {\r\n    border: solid rgba(0, 100, 255, .9);\r\n    border-width: 3px 2px 3px 0px;\r\n    position: fixed;\r\n    left: 0px;\r\n    top: 40%;\r\n    height: 100px;\r\n    width: 2px;\r\n    z-index: 199;\r\n    {menu-bar-hidden}\r\n}\r\n#menu-bar {\r\n    top: 0px;\r\n    height: 100%;\r\n    width: 1px;\r\n    background: transparent;\r\n    border: none;\r\n}\r\n#menu {\r\n    position: fixed;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index: 100;\r\n    width: 270px;\r\n    max-width: 100%;\r\n    background: #333;\r\n    overflow-y: auto;\r\n}\r\n#menu:after {\r\n    content: \"\";\r\n    display: block;\r\n    position: absolute;\r\n    top: 46px;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: 1px;\r\n    background: rgba(0,0,0,0.6);\r\n    box-shadow: 0 0 5px 2px rgba(0,0,0,0.6);\r\n}\r\n#header{\r\n    color: #777;\r\n    margin-top: 0;\r\n    border-top: 1px solid rgba(0,0,0,0.3);\r\n    background: #404040;\r\n    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);\r\n    text-shadow: 0 1px 0 rgba(0,0,0,0.5);\r\n    padding: 10px 12px;\r\n    text-transform: uppercase;\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n}\r\n#header a {\r\n    color: #777777;\r\n}\r\n#divider {\r\n    position: relative;\r\n    z-index: 300;\r\n    border-top: 1px solid rgba(255,255,255,0.01);\r\n    border-bottom: 1px solid rgba(0,0,0,0.3);\r\n    margin: 0;\r\n    height: 4px;\r\n    background: rgba(0,0,0,0.2);\r\n    box-shadow: 0 1px 0 rgba(255,255,255,0.05), inset 0 1px 3px rgba(0,0,0,0.3);\r\n}\r\n#chapter-list {\r\n    position: relative;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 200;\r\n    margin: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    list-style: none;\r\n    overflow-y: auto;\r\n}\r\n.chapter {\r\n    list-style: none;\r\n}\r\n.chapter:last-child {\r\n    border-bottom: 1px solid rgba(0,0,0,0.3);\r\n    box-shadow: 0 1px 0 rgba(255,255,255,0.05);\r\n}\r\n.chapter div {\r\n    color: #ccc;\r\n    font-size: 15px;\r\n    padding: 8px 20px;\r\n    border-top: 1px solid rgba(0,0,0,0.3);\r\n    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);\r\n    text-shadow: 0 1px 0 rgba(0,0,0,0.5);\r\n    display: block;\r\n    text-decoration: none;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n}\r\n.chapter div:before {\r\n    content: \"\\f105\";\r\n    width: 20px;\r\n    margin-left: -10px;\r\n    float: left;\r\n    font-family: \"FontAwesome\" !important;\r\n    text-align: center;\r\n}\r\n.chapter div:hover {\r\n    background: #404040;\r\n    color: #fff;\r\n    outline: 0;\r\n}\r\n.chapter.active div {\r\n    background: #1a1a1a;\r\n    color: #fff;\r\n    font-size: 16px;\r\n    box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);\r\n}\r\n::-webkit-scrollbar {\r\n    height: 9px !important;\r\n    width: 9px !important;\r\n}\r\n::-webkit-scrollbar-thumb {\r\n    background-color: #7D7D7D !important;\r\n    border-radius: 3px !important;\r\n}\r\n::-webkit-scrollbar-track-piece {\r\n    background-color: rgba(0,0,0,.25) !important;\r\n}\r\n";

var tpl_preferencesHTML = "<form id=\"preferences\" name=\"preferences\">\n    <div id=\"setting_table1\">\n        <span id=\"top-buttons\">\n            <input title=\"部分选项需要刷新页面才能生效\" id=\"save_button\" value=\"√ 确认\" type=\"button\">\n            <input title=\"取消本次设定，所有选项还原\" id=\"close_button\" value=\"X 取消\" type=\"button\">\n        </span>\n        <div class=\"form-row\">\n            <label>\n                界面语言<select id=\"lang\">\n                </select>\n            </label>\n            <label title=\"将小说网页文本转换为繁体。\\n\\n注意：内置的繁简转换表，只收录了简单的单字转换，启用本功能后，如有错误转换的情形，请利用脚本的自订字词取代规则来修正。\\n例如：「千里之外」，会错误转换成「千里之外」，你可以加入规则「千里之外=千里之外」来自行修正。\">\n                <input type=\"checkbox\" id=\"enable-cn2tw\" name=\"enable-cn2tw\"/>网页：转繁体\n            </label>\n            <label id=\"quietMode\" class=\"right\" title=\"隐藏其他，只保留正文，适用于全屏状态下\">\n                <input class=\"key\" type=\"button\" id=\"quietModeKey\"/>安静模式\n            </label>\n        </div>\n        <div class=\"form-row\">\n            <label title=\"不影响 booklink.me 的启用\">\n                <input type=\"checkbox\" id=\"disable-auto-launch\" name=\"disable-auto-launch\"/>强制手动启用\n            </label>\n            <label title=\"booklink.me 点击的网站强制启用\">\n                <input type=\"checkbox\" id=\"booklink-enable\" name=\"booklink-enable\"/>booklink 自动启用\n            </label>\n            <label>\n                <input type=\"checkbox\" id=\"debug\" name=\"debug\"/>调试模式\n            </label>\n            <a href=\"https://greasyfork.org/scripts/292-my-novel-reader/feedback\" target=\"_blank\">反馈地址</a>\n        </div>\n        <div class=\"form-row\">\n            <label title=\"图片章节用夜间模式没法看，这个选项在启动时会自动切换到缺省皮肤\">\n                <input type=\"checkbox\" id=\"pic-nightmode-check\" name=\"pic-nightmode-check\"/>\n                夜间模式的图片章节检测\n            </label>\n            <label>\n                <input type=\"checkbox\" id=\"copyCurTitle\"/>\n                打开目录复制当前标题\n            </label>\n        </div>\n        <div class=\"form-row\">\n            <label title=\"通过快捷键切换\">\n                <input type=\"checkbox\" id=\"hide-menu-list\"/>隐藏左侧章节列表\n            </label>\n            <label>\n                <input type=\"checkbox\" id=\"hide-footer-nav\"/>隐藏底部导航栏\n            </label>\n            <label class=\"right\" title=\"导出之后的所有章节\">\n                <input type=\"button\" id=\"saveAsTxt\" value=\"存为 txt（测试）\" />\n                <input type=\"button\" id=\"speech\" value=\"朗读\" />\n            </label>\n        </div>\n        <div class=\"form-row\">\n            <label>\n                左侧导航栏切换快捷键：\n            </label>\n            <input class=\"key\" type=\"button\" id=\"setHideMenuListKey\" />\n            <label title=\"通过快捷键切换或在 Greasemonkey 用户脚本命令处打开设置窗口\">\n                <input type=\"checkbox\" id=\"hide-preferences-button\"/>隐藏设置按钮\n            </label>\n            <input class=\"key\" type=\"button\" id=\"openPreferencesKey\"/>\n        </div>\n        <div class=\"form-row\">\n            <label>\n                距离底部\n                <input type=\"textbox\" id=\"remain-height\" name=\"remain-height\" size=\"5\"/>\n                px 加载下一页\n            </label>\n            <label>\n                <input type=\"checkbox\" id=\"add-nextpage-to-history\"/>添加下一页到历史记录\n            </label>\n            <label>\n                <input type=\"checkbox\" id=\"enable-dblclick-pause\"/>双击暂停翻页\n            </label>\n        </div>\n        <div class=\"form-row\">\n            <label>\n                <select id=\"skin\">\n                </select>\n            </label>\n            <label>\n                字体\n                <input type=\"textbox\" id=\"font-family\" style=\"min-width:200px;\"/>\n            </label>\n            <br/><br/>\n            <label>\n                字体大小\n                <input type=\"textbox\" id=\"font-size\" name=\"font-size\" size=\"6\"/>\n            </label>\n            <label>\n                行高\n                <input type=\"textbox\" id=\"text_line_height\" size=\"6\"/>\n            </label>\n            <label>\n                行宽\n                <input type=\"textbox\" id=\"content_width\" size=\"6\"/>\n            </label>\n        </div>\n        <div class=\"form-row\">\n            <label title=\"把一大块未分段的内容文本按照句号分段\">\n                <input type=\"checkbox\" id=\"split_content\"/>对一坨内容进行强制分段\n            </label>\n            <label>\n                <input type=\"checkbox\" id=\"scroll_animate\"/>章节滚动效果\n            </label>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"prefs_title\">自定义样式</div>\n            <textarea id=\"extra_css\" class=\"prefs_textarea\" placeholder=\"自定义样式\"></textarea>\n        </div>\n    </div>\n    <div id=\"setting_table2\">\n        <div class=\"form-row\" title=\"详见脚本代码的 Rule.specialSite\">\n            <div class=\"prefs_title\">自定义站点规则</div>\n            <textarea id=\"custom_siteinfo\" class=\"prefs_textarea\" placeholder=\"自定义站点规则\" />\n        </div>\n        <div class=\"form-row\" title=\"一行一个，每行的第一个 = 为分隔符。\\n保存后生效\">\n            <div class=\"prefs_title\">自定义替换规则</div>\n            <textarea id=\"custom_replace_rules\" class=\"prefs_textarea\" placeholder=\"b[āà]ng=棒\" />\n        </div>\n    </div>\n</form>";

var tpl_preferencesCSS = ".body {\r\n     color:#333;\r\n     margin: 0 auto;\r\n     background: white;\r\n     padding: 10px;\r\n     height: 420px;\r\n     overflow-y: auto;\r\n }\r\n #top-buttons {\r\n     background: none repeat scroll 0% 0% rgb(255, 255, 255);\r\n     display: block;\r\n     position: absolute;\r\n     top: -35px;\r\n     border-right: 12px solid rgb(224, 224, 224);\r\n     border-top: 12px solid rgb(224, 224, 224);\r\n     border-left: 12px solid rgb(224, 224, 224);\r\n     text-align: center;\r\n }\r\n input {\r\n     font-size: 12px;\r\n     margin-right: 3px;\r\n     vertical-align: middle;\r\n }\r\n .form-row {\r\n     overflow: hidden;\r\n     padding: 8px 12px;\r\n     margin-top: 3px;\r\n     font-size: 11px;\r\n }\r\n .form-row label {\r\n     padding-right: 10px;\r\n }\r\n .form-row input {\r\n     vertical-align: middle;\r\n     margin-top: 0px;\r\n }\r\n textarea, .form-row input {\r\n     padding: 2px 4px;\r\n     border: 1px solid #e5e5e5;\r\n     background: #fff;\r\n     border-radius: 4px;\r\n     color: #666;\r\n     -webkit-transition: all linear .2s;\r\n     transition: all linear .2s;\r\n }\r\n textarea {\r\n     width: 100%;\r\n     overflow: auto;\r\n     vertical-align: top;\r\n }\r\n textarea:focus, input:focus {\r\n     border-color: #99baca;\r\n     outline: 0;\r\n     background: #f5fbfe;\r\n     color: #666;\r\n }\r\n .prefs_title {\r\n     font-size: 12px;\r\n     font-weight: bold;\r\n }\r\n .prefs_textarea {\r\n     font-size: 12px;\r\n     margin-top: 5px;\r\n     height: 100px;\r\n }\r\n .right {\r\n    float: right;\r\n }";

var Res = {
  CSS_MAIN: tpl_mainCss,

  preferencesHTML: tpl_preferencesHTML
      .uiTrans().replace(/\\n/g, '\n'),

  preferencesCSS: tpl_preferencesCSS,
};

var tpl_mainHtml = "<div id=\"container\">\r\n    <div id=\"menu-bar\" title=\"点击显示隐藏章节列表\"></div>\r\n    <div id=\"menu\">\r\n        <div id=\"header\" title=\"打开目录\">\r\n            <a href=\"{indexUrl}\" target=\"_blank\">{bookTitle}</a>\r\n        </div>\r\n        <div id=\"divider\"></div>\r\n        <ul id=\"chapter-list\" title=\"左键滚动，中键打开链接（无阅读模式）\">\r\n        </ul>\r\n    </div>\r\n    <div id=\"mynovelreader-content\"></div>\r\n    <div id=\"loading\" style=\"display:none\"></div>\r\n    <div id=\"preferencesBtn\">\r\n        <img style=\"width:16px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABwklEQVRIibVVzWrCQBAeQk/bdk+bm0aWDQEPHtwVahdavLU9aw6KAQ+SQ86Sa19Aqu0T9NafSw8ttOgr1CewUB9CBL3Yy26x1qRp0A8GhsnO9yUzmxmAhKjX68cAMAeAufK3C875FQAsAWCp/O3CsqyhFlB+Oti2/cAYewrD8FDHarXahWEYUy1gGMbUdd1z/TwMw0PG2JNt2/ex5IyxR02CEJpIKbuEkJGOrRshZCSl7CKEJjrGGHuIFMjlcs9RZElNcWxGEAQHGONxWnKM8TgIgoPYMkkpL9MKqNx4xNX8LyOEvMeSq5uxMZlz3vN9v+D7foFz3os6V61Wz36QNhqNUyHENaV0CACLTUnFYvF6/WVUbJPIglI6FELctFqtMiT59Ha7TdcFVCxJ6XYs0Gw2T1SJBlsq0ZxSOhBC3Hied/QjSTUoqsn9lSb3o879avI61FXbzTUFACiXy7v70Tqdzj7G+COtwJ+jIpPJvKYl12ZZ1kucwJs+iBD6lFJ2TdOMHB2mab7/a1xXKpW9fD5/6zjO3erCcV33PMnCcRwnfuHEYXVlZrPZQWqiKJRKpe8Bt5Ol73leCQBmADBTfiJ8AebTYCRbI3BUAAAAAElFTkSuQmCC\"/>\r\n    </div>\r\n    <div id=\"alert\" style=\"display: none;\">\r\n        <p id=\"App-notice\"></p>\r\n    </div>\r\n\r\n    <div id=\"app\">\r\n\r\n    </div>\r\n</div>";

let $messageDiv;
let _messageTimeId;

function notice(html, duration, noticeType, onClose) {
  if (typeof duration === 'undefined')
      duration = 2000;

  var closeMessage = function() {
      $messageDiv.remove();
      $messageDiv = null;

      if (typeof onClose === 'function') {
          onClose();
      }
  };

  if (!$messageDiv) {
      var iconHtml = '';
      if (noticeType === 'loading') {
          iconHtml = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
      }

      $messageDiv = $('<div id="message" class="noRemove">' + iconHtml + '<span id="content"></span></div>')
          .appendTo('body');

      if (duration == 0) {
          $messageDiv.on('click', closeMessage);
      }
  }

  $messageDiv.find('#content').html(html);

  if (duration > 0) {
      clearTimeout(_messageTimeId);
      _messageTimeId = setTimeout(closeMessage, duration);
  }
}

function loading(html, duration, onClose) {
  notice(html, duration, 'loading', onClose);
}

function saveAs(data, filename) {
  if(!filename) filename = 'console.json';

  if (typeof data == 'object') {
      data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], { type: 'application/octet-stream' });
  var blobUrl = window.URL.createObjectURL(blob);
  var tmpLink = document.createElement('a');
  tmpLink.href = blobUrl;
  tmpLink.style.display = 'none';
  tmpLink.setAttribute('download', filename);
  tmpLink.setAttribute('target', '_blank');
  document.body.appendChild(tmpLink);

  tmpLink.click();
  document.body.removeChild(tmpLink);
  window.URL.revokeObjectURL(blobUrl);
}

function cnNum2ArabNum(cn){
  var arab, parts, cnChars = '零一二三四五六七八九';

  if (!cn) {
      return 0
  }

  if (cn.indexOf('亿') !== -1){
      parts = cn.split('亿');
      return cnNum2ArabNum(parts[0]) * 1e8 + cnNum2ArabNum(parts[1])
  }

  if (cn.indexOf('万') !== -1){
      parts = cn.split('万');
      return cnNum2ArabNum(parts[0]) * 1e4 + cnNum2ArabNum(parts[1])
  }

  if (cn.indexOf('十') === 0){
      cn = '一' + cn;
  }

  arab = cn
      .replace(/[零一二三四五六七八九]/g, function (a) {
          return '+' + cnChars.indexOf(a)
      })
      .replace(/(十|百|千)/g, function(a, b){
          return '*' + (
              b == '十' ? 1e1 :
              b == '百' ? 1e2 : 1e3
          )
      });

  return (new Function('return ' + arab))()
}

function getNumFromChapterTitle(title) {
  if (!title) return;

  var m = title.match(/第(\d+)章|^(\d+)、/);
  if (m) {
    return parseInt(m[1], 10)
  }

  // 第二十二章
  m = title.match(/(?:第|^)([一二两三四五六七八九十○零百千万亿\d]+){1,6}章/);
  if (m) {
    return cnNum2ArabNum(m[1])
  }

  // 九十二 休想套路我
  m = title.match(/^([一二两三四五六七八九十○零百千万亿\d]+){1,6} /);
  if (m) {
    return cnNum2ArabNum(m[1])
  }
}

const chapters = [];

const fileName = {
  bookTitle: '',
  ext: '.txt',
  start: 0,
  end: 0,

  setBookTitle(bookTitle) {
    this.bookTitle = bookTitle;
  },
  setStart(chapterTitle) {
    let num = getNumFromChapterTitle(chapterTitle);
    if (num) {
      this.start = num;
    }
  },
  setEnd(chapterTitle) {
    let num = getNumFromChapterTitle(chapterTitle);
    if (num) {
      this.end = num;
    }
  },

  toString() {
    let start = this.start || '';
    let end = this.end || '';
    let count = chapters.length;

    return `${this.bookTitle || '未知名称'}(${start} - ${end},共${count}章)${this.ext}`
  }
};

function toTxt(parser) {
  var html = $.nano('{chapterTitle}\n\n{contentTxt}', parser);
  chapters.push(html);

  var msg = '已下载 ' + chapters.length + ' 章，' +
      (parser.chapterTitle || '');

  loading(msg, 0);
}

function finish(parser) {
  var allTxt = chapters.join('\n\n');
  if (isWindows) {
      allTxt = allTxt.replace(/\n/g, '\r\n');
  }

  fileName.setEnd(parser.chapterTitle);

  saveAs(allTxt, fileName.toString());
}

function getOnePage(parser, nextUrl, endFn) {
  var isEnd = false;
  if (parser) {
      toTxt(parser);
      nextUrl = parser.nextUrl;
      isEnd = parser.isTheEnd;
  }

  if (!nextUrl || isEnd) {
      console.log('全部获取完毕');
      finish(parser);
      endFn();
      return;
  }

  if (App.site.useiframe) {
      // App.iframeRequest(nextUrl);
      return;
  }

  setTimeout(function() {
    console.log('[存为txt]正在获取：', nextUrl);
    App.httpRequest(nextUrl, function(doc) {
        if (doc) {
            var par = new Parser(App.site, doc, nextUrl);
            par.getAll(getOnePage);
        } else {
            console.error('超时或连接出错');
            finish();
            endFn();
        }
    });
  }, config.download_delay);
}

function run(cachedParsers=[], endFn) {
  console.log(`[存为txt]每章下载延时 ${config.download_delay} 毫秒`);

  cachedParsers.forEach(toTxt);

  var firstParser = cachedParsers[0];
  fileName.setBookTitle(firstParser.bookTitle);
  fileName.setStart(firstParser.chapterTitle);

  var lastParser = cachedParsers[cachedParsers.length - 1];
  getOnePage(null, lastParser.nextUrl, endFn);
}

__$styleInject(".speech {\n  position: fixed;\n  z-index: 100;\n  background-color: white;\n  top: 10px;\n  right: 35px;\n}\n");

const bus = new Vue();

// 显示 语音朗读 对话框
const SHOW_SPEECH = 'show-speech';

const APPEND_NEXT_PAGE = 'appended_next_page';

__$styleInject(".speech .close-btn {\n  position: absolute;\n  top: 2px;\n  right: 4px;\n}\n.speech .loader {\n  text-align: center;\n}\n.speech .auto-stop-input {\n  width: 30px;\n}\n");

__$styleInject("/*.v-spinner\n{\n    margin: 100px auto;\n    text-align: center;\n}\n*/\n@-webkit-keyframes v-pulseStretchDelay {\n  0%,\n  80% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    -webkit-opacity: 1;\n    opacity: 1;\n  }\n  45% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    -webkit-opacity: 0.7;\n    opacity: 0.7;\n  }\n}\n@keyframes v-pulseStretchDelay {\n  0%,\n  80% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    -webkit-opacity: 1;\n    opacity: 1;\n  }\n  45% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    -webkit-opacity: 0.7;\n    opacity: 0.7;\n  }\n}\n");

var PulseLoader = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading),expression:"loading"}],staticClass:"v-spinner"},[_c('div',{staticClass:"v-pulse v-pulse1",style:([_vm.spinnerStyle,_vm.spinnerDelay1])}),_c('div',{staticClass:"v-pulse v-pulse2",style:([_vm.spinnerStyle,_vm.spinnerDelay2])}),_c('div',{staticClass:"v-pulse v-pulse3",style:([_vm.spinnerStyle,_vm.spinnerDelay3])})])},
staticRenderFns: [],

  name: 'PulseLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '15px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      spinnerStyle: {
      	backgroundColor: this.color,
      	width: this.size,
        height: this.size,
      	margin: this.margin,
      	borderRadius: this.radius,
        display: 'inline-block',
        animationName: 'v-pulseStretchDelay',
        animationDuration: '0.75s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both'
      },
      spinnerDelay1: {
        animationDelay: '0.12s'
      },
      spinnerDelay2: {
        animationDelay: '0.24s'
      },
      spinnerDelay3: {
        animationDelay: '0.36s'
      }
    }
  }
};

const STATE = {
  playing: 1,
  pausing: 2,
  stoping: 0,
};

var Speech = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"speech"},[(_vm.playState == _vm.STATE.playing)?_c('span',[_c('button',{on:{"click":_vm.pause}},[_vm._v("暂停朗读")]),_vm._v(" "),_c('button',{on:{"click":_vm.stop}},[_vm._v("停止朗读")])]):_c('span',[(_vm.playState == _vm.STATE.stoping)?_c('button',{on:{"click":_vm.start}},[_vm._v("开始朗读")]):_vm._e(),_vm._v(" "),(_vm.playState == _vm.STATE.pausing)?_c('button',{on:{"click":_vm.resume}},[_vm._v("继续朗读")]):_vm._e(),_vm._v(" "),(_vm.elapsedTime)?_c('span',[_vm._v("已朗读 "+_vm._s(_vm.elapsedTime / 1000)+" 秒")]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"close-btn",on:{"click":_vm.closeSpeech}},[_vm._v("X")])]),_vm._v(" "),(_vm.playState == _vm.STATE.playing)?_c('div',{staticClass:"loader"},[_c('pulse-loader')],1):_c('div',[_c('div',[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.autoStop),expression:"autoStop"}],attrs:{"type":"radio","value":"time"},domProps:{"checked":_vm._q(_vm.autoStop,"time")},on:{"__c":function($event){_vm.autoStop="time";}}}),_vm._v("\n        定时朗读：\n        "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.autoStopTime),expression:"autoStopTime"}],staticClass:"auto-stop-input",attrs:{"type":"text"},domProps:{"value":(_vm.autoStopTime)},on:{"input":function($event){if($event.target.composing){ return; }_vm.autoStopTime=$event.target.value;}}}),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.autoStopTimeUnit),expression:"autoStopTimeUnit"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.autoStopTimeUnit=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},[_c('option',{attrs:{"value":"minute"}},[_vm._v("分钟")]),_vm._v(" "),_c('option',{attrs:{"value":"hour"}},[_vm._v("小时")])]),_vm._v("\n        后停止\n      ")]),_c('br'),_vm._v(" "),_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.autoStop),expression:"autoStop"}],attrs:{"type":"radio","value":"chapter"},domProps:{"checked":_vm._q(_vm.autoStop,"chapter")},on:{"__c":function($event){_vm.autoStop="chapter";}}}),_vm._v("\n        定章朗读：\n        "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.autoStopChapter),expression:"autoStopChapter"}],staticClass:"auto-stop-input",attrs:{"type":"text"},domProps:{"value":(_vm.autoStopChapter)},on:{"input":function($event){if($event.target.composing){ return; }_vm.autoStopChapter=$event.target.value;}}}),_vm._v("章后停止\n      ")]),_c('br'),_vm._v(" "),_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.autoStop),expression:"autoStop"}],attrs:{"type":"radio","value":""},domProps:{"checked":_vm._q(_vm.autoStop,"")},on:{"__c":function($event){_vm.autoStop="";}}}),_vm._v("一直朗读")])]),_vm._v(" "),_c('div',[_c('label',{attrs:{"for":"speech-dialog-rate"}},[_vm._v("语速")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.rate),expression:"rate"}],attrs:{"type":"range","min":"0.5","max":"2","value":"1","step":"0.1","id":"speech-dialog-rate"},domProps:{"value":(_vm.rate)},on:{"__r":function($event){_vm.rate=$event.target.value;}}}),_vm._v(" "),_c('span',{staticClass:"rate-value"},[_vm._v(_vm._s(_vm.rate))])]),_vm._v(" "),_c('div',[_c('label',{attrs:{"for":"speech-dialog-pitch"}},[_vm._v("音高")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pitch),expression:"pitch"}],attrs:{"type":"range","min":"0","max":"2","value":"1","step":"0.1","id":"speech-dialog-pitch"},domProps:{"value":(_vm.pitch)},on:{"__r":function($event){_vm.pitch=$event.target.value;}}}),_vm._v(" "),_c('span',{staticClass:"pitch-value"},[_vm._v(_vm._s(_vm.pitch))])]),_vm._v(" "),_c('div',[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedVoice),expression:"selectedVoice"}],staticClass:"voices",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedVoice=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.voiceList),function(voice,index){return _c('option',{key:index,domProps:{"value":index}},[_vm._v("\n          "+_vm._s(voice.name)+" "+_vm._s(voice.lang)+"\n        ")])}))])])])},
staticRenderFns: [],
  name: 'speech',
  data() {
    return {
      text: '',
      // 播放状态
      STATE,
      playState: STATE.stoping,  // 监控朗读的状态
      isPlaying: false,  // 按钮的状态
      elapsedTime: 0,

      voiceList: [],
      selectedVoice: 0,
      rate: 1,
      pitch: 1,

      autoStop: '',
      autoStopTime: 2,  // 2 小时
      autoStopTimeUnit: 'hour',
      autoStopChapter: 5,  // 5章

      synth: speechSynthesis,
      utterance: new SpeechSynthesisUtterance(),
    }
  },
  components: {
    PulseLoader
  },
  mounted() {
    // 载入语音列表
    this.voiceList = this.synth.getVoices();
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices();
    };

    this.loadSetting();
  },
  beforeDestory() {
    clearTimeout(this.autoStopTimeId);
  },
  methods: {
    closeSpeech() {
      this.$emit('closeSpeech');
      this.saveSetting();
    },
    loadSetting() {
      this.rate = GM_getValue('speech.rate', 1);
      this.pitch = GM_getValue('speech.pitch', 1);
      this.selectedVoice = GM_getValue('speech.selectedVoice', 0);

      this.autoStop = GM_getValue('speech.autoStop', '');
      this.autoStopTime = GM_getValue('speech.autoStopTime', 2);
      this.autoStopTimeUnit = GM_getValue('speech.autoStopTimeUnit', 'hour');
      this.autoStopChapter = GM_getValue('speech.autoStopChapter', 5);
    },
    saveSetting() {
      GM_setValue('speech.rate', this.rate);
      GM_setValue('speech.pitch', this.pitch);
      GM_setValue('speech.selectedVoice', this.selectedVoice);

      GM_setValue('speech.autoStop', this.autoStop);
      GM_setValue('speech.autoStopTime', this.autoStopTime);
      GM_setValue('speech.autoStopTimeUnit', this.autoStopTimeUnit);
      GM_setValue('speech.autoStopChapter', this.autoStopChapter);
    },
    start() {
      this.isPlaying = true;

      // 获取当前所在的章节
      this.speakIndex = App.curFocusIndex;
      this.startSpeakIndex = App.curFocusIndex;
      let toSpeekText = this.getToSpeekText();

      bus.$off(APPEND_NEXT_PAGE, this.waitForNext);
      bus.$on(APPEND_NEXT_PAGE, this.waitForNext);

      this.speak(toSpeekText, this.checkNext);

      if (this.autoStop == 'time') {
        clearTimeout(this.autoStopTimeId);
        this.autoStopTimeId = setTimeout(this.stop, this.getAutoStopMillisecond());
      }
    },
    getAutoStopMillisecond() {
      if (this.autoStopTimeUnit == 'minute') {
        return this.autoStopTime * 60 * 1000
      } else {
        return this.autoStopTime * 3600 * 1000
      }
    },
    checkNext() {
      this.speakIndex += 1;
      this.checkAgin();
    },
    checkAgin() {
      let speakedChapters = this.speakIndex - this.startSpeakIndex;
      if (this.autoStop == 'chapter' && speakedChapters >= this.autoStopChapter) {
        this.stop();
        return
      }

      // 是否有新章节
      let nextText = this.getToSpeekText();
      if (nextText) {
        this.speak(nextText, this.checkNext);
        this.isFindingNext = false;

        this.scrollToNext();
      } else {
        this.isFindingNext = true;
        // 加载下一章
        App.scrollForce();
      }
    },
    waitForNext() {
      if (this.isFindingNext && this.isPlaying) {
        this.checkAgin();
      }
    },
    scrollToNext() {
      let elem = App.scrollItems.get(this.speakIndex);
      if (elem) {
        App.scrollToArticle(elem);
      }
    },
    getToSpeekText() {
      let startIndex = this.speakIndex;

      // 这是 jQuery 对象
      let text = App.scrollItems
        .toArray()
        .filter((elem, i) => {
          return i == startIndex
        })
        .map(elem => elem.textContent)
        .join('\n');

      // // 设置到最后一章
      // this.speakIndex = oldApp.scrollItems.length - 1

      return text
    },
    speak(text, endFn) {
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.voice = this.voiceList[this.selectedVoice];
      this.utterance.pitch = this.pitch;
      this.utterance.rate = this.rate;

      this.listenForSpeechEvents(endFn);

      this.synth.speak(this.utterance);
    },
    listenForSpeechEvents (endFn) {
      this.utterance.onstart = () => {
        this.playState = STATE.playing;
      };
      this.utterance.onpause = (event) => {
        this.playState = STATE.pausing;
        this.elapsedTime = event.elapsedTime;
      };
      this.utterance.onresume = (e) => {
        this.playState = STATE.playing;
      };
      this.utterance.onend = (event) => {
        this.playState = STATE.stoping;
        this.elapsedTime = event.elapsedTime;

        if (endFn) {
          endFn();
        }
      };
    },
    pause() {
      this.isPlaying = false;

      this.synth.pause();
    },
    resume() {
      this.isPlaying = true;

      this.synth.resume();
    },
    stop() {
      this.isPlaying = false;

      this.synth.cancel();
    }
  }
};

var App$1 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[(_vm.speechDialogVisible)?_c('speech',{staticClass:"speech",on:{"closeSpeech":_vm.hideSpeech}}):_vm._e()],1)},
staticRenderFns: [],
  data() {
    return {
      speechDialogVisible: false,
    }
  },
  components: {
    Speech,
  },
  created() {
    bus.$on(SHOW_SPEECH, this.showSpeech);
  },
  beforeDestory() {
    bus.$off(SHOW_SPEECH, this.hideSpeech);
  },
  methods: {
    showSpeech() {
      this.speechDialogVisible = true;
    },
    hideSpeech() {
      this.speechDialogVisible = false;
    }
  }
};

function runVue() {
  new Vue({
    el: '#app',
    render: h => h(App$1)
  });
}

var App = {
    isEnabled: false,
    parsedPages: {},
    pageNum: 1,
    paused: false,
    curPageUrl: location.href,
    requestUrl: null,
    iframe: null,
    remove: [],
    // 滚动激活相关
    curFocusElement: null,
    curFocusIndex: 1,

    init: function() {
        if (["mynovelreader-iframe", "superpreloader-iframe"].indexOf(window.name) != -1) { // 用于加载下一页的 iframe
            return;
        }

        // 手动调用
        var readx = function() {
            // 防止 unsafeWindow cannot call: GM_getValue
            setTimeout(function() {
                App.launch();
            }, 0);
        };
        try {
            exportFunction(readx, unsafeWindow, {defineAs: "readx"});
        } catch(ex) {
            console.error('无法定义 readx 函数');
        }


        App.loadCustomSetting();
        App.site = App.getCurSiteInfo();

        if (App.site.startLaunch) {
            App.site.startLaunch($(document));
        }

        var autoLaunch = App.isAutoLaunch();

        if (autoLaunch === -1) {
            return;
        } else if (autoLaunch) {
            if (App.site.mutationSelector) { // 特殊的启动：等待js把内容生成完毕
                App.addMutationObserve(document, App.launch);
            } else if (App.site.timeout) { // 延迟启动
                setTimeout(App.launch, App.site.timeout);
            } else { // NoScript 下 setTimeout 没用？
                App.launch();
            }
        } else {
            UI.addButton();
        }
    },
    loadCustomSetting: function() {
        var customRules;
        try {
            customRules = eval(Setting.customSiteinfo);
        } catch (e) {
            console.error('载入自定义站点配置错误', e);
        }

        if (_.isArray(customRules)) {
            Rule.customRules = customRules;
            C.log('载入自定义站点规则成功', customRules);
        }

        // load custom replace rules
        Rule.customReplace = Rule.parseCustomReplaceRules(Setting.customReplaceRules);

        C.log('载入自定义替换规则成功', Rule.customReplace);
    },
    getCurSiteInfo: function() {
        var rules = Rule.customRules.concat(Rule.specialSite);
        var locationHref = location.href;

        var info = _.find(rules, function(x) {
            return toRE(x.url).test(locationHref);
        });

        if (!info) {
            info = {};
            C.log("没有找到规则，尝试自动模式。");
        } else {
            C.log("找到规则：", info);
        }
        return info;
    },
    isAutoLaunch: function() {
        var locationHref = window.location.href,
            locationHost = location.host,
            referrer = document.referrer;

        switch (true) {
            case L_getValue("mynoverlreader_disable_once") == 'true':
                L_removeValue("mynoverlreader_disable_once");
                return false;
            // case location.hostname == 'www.fkzww.net' && !document.title.match(/网文快讯/):  // 啃书只自动启用一个地方
            //     return false;
            case Setting.booklink_enable && /booklink\.me/.test(referrer):
                return true;
            case locationHost == 'tieba.baidu.com':
                var title = $('.core_title_txt').text();
                if (title.match(Rule.titleRegExp)) {
                    return false;
                } else {
                    return -1;
                }
            case Setting.getDisableAutoLaunch():
                return false;
            case GM_getValue("auto_enable"):
            case config.soduso && /www\.sodu\.so/.test(referrer):
                return true;
            default:
                return false;
        }
    },
    addMutationObserve: function(doc, callback) {
        var shouldAdd = false;
        var $doc = $(doc);

        if ($doc.find(App.site.contentSelector).size()) {
            shouldAdd = false;
        } else {
            var mutationSelector = App.site.mutationSelector;
            var target = $doc.find(mutationSelector)[0];
            if (target) {
                var childCount = App.site.mutationChildCount;
                if (childCount === undefined || target.children.length <= childCount) {
                    shouldAdd = true;
                }
            }
        }

        if (shouldAdd) {
            var observer = new MutationObserver(function(mutations) {
                var nodeAdded = mutations.some(function(x) {
                    return x.addedNodes.length > 0;
                });

                if (nodeAdded) {
                    observer.disconnect();
                    callback();
                }
            });

            observer.observe(target, {
                childList: true
            });

            C.log("添加 MutationObserve 成功：", mutationSelector);
        } else {
            callback();
        }
    },
    launch: function() {
        // 只解析一次，防止多次重复解析一个页面
        if (document.body && document.body.getAttribute("name") == "MyNovelReader") {
            return App.toggle();
        }

        if (!App.site) {
            App.site = App.getCurSiteInfo();
        }

        if (App.site.startFilter) {
            try {
                App.site.startFilter();
                C.log('run startFilter function success');
            } catch (ex) {
                console.error('运行 startFilter function 错误', ex);
            }
        }

        var parser = new Parser(App.site, document);
        var hasContent = !!parser.hasContent();
        if (hasContent) {
            document.body.setAttribute("name", "MyNovelReader");
            App.parsedPages[window.location.href] = true;
            parser.getAll(function(parser) {
                App.processPage(parser);
            });
        } else {
            console.error("当前页面没有找到内容");
        }

        // 初始化, 取消页面限制等
        if (App.site.fInit)
            App.site.fInit();
    },
    processPage: function(parser) {
        // 对 Document 进行处理
        document.body.innerHTML = '';
        App.prepDocument();
        App.initDocument(parser);

        runVue();

        // cache vars
        App.$doc = $(document);
        App.$menuBar = App.$doc.find("#menu-bar");
        App.$menu = App.$doc.find("#menu");
        App.$content = App.$doc.find("#mynovelreader-content");
        App.$loading = App.$doc.find("#loading");
        App.$preferencesBtn = App.$doc.find("#preferencesBtn");

        App.$menuHeader = App.$menu.find("#chapter-list");
        App.$chapterList = App.$menu.find("#chapter-list");

        App.indexUrl = parser.indexUrl;
        App.prevUrl = parser.prevUrl; // 第一个上一页

        App.oArticles = [];  // 原始的内容，用于替换的无需刷新
        App.parsers = [];

        // 加入上一章的链接
        if (parser.prevUrl) {
            $("<li>")
                .addClass('chapter')
                .append(
                    $("<div>")
                    .attr({
                        "realHref": parser.prevUrl,
                        "onclick": "return false;"
                    })
                    .text("上一章".uiTrans())
                )
                .prependTo(App.$chapterList);
        }

        // 插入站点样式
        if (App.site.style) {
            GM_addStyle(App.site.style);
        }

        App.appendPage(parser, true);

        App.registerControls();

        // UI 的初始化
        UI.init();

        App.curFocusElement = $("article:first").get(0); // 初始化当前关注的 element
        App.requestUrl = parser.nextUrl;
        App.isTheEnd = parser.isTheEnd;

        App.isEnabled = true;
        UI.addButton();

        // // 如果已经把当前焦点链接添加到历史记录，则滚动到顶部
        // if (Setting.addToHistory) {
        //     window.scrollTo(0, 0);
        // }

        // 有些图片网站高度随着图片加载而变长
        setTimeout(App.scroll, 1000);

        App.cleanAgain();

        if (config.PRELOADER) {
            App.doRequest();
        }
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

        doc = document.wrappedJSObject || document;
        doc.onmouseup = null;
        doc.onmousedown = null;
        doc.oncontextmenu = null;

        var arAllElements = document.getElementsByTagName('*');
        for (var i = arAllElements.length - 1; i >= 0; i--) {
            var elmOne = arAllElements[i];
            elmOne = elmOne.wrappedJSObject || elmOne;
            elmOne.onmouseup = null;
            elmOne.onmousedown = null;
        }

        $(document).unbind("keypress");
        $(document).unbind("keydown");

        // remove body style
        $('link[rel="stylesheet"], script').remove();
        $('body')
            .removeAttr('style')
            .removeAttr('bgcolor');

        $('style:not(.noRemove)').filter(function() {
            var $style = $(this);
            if($style.text().indexOf('#cVim-link-container') != -1) {  // chrome 的 cVim 扩展
                return false;
            }
            return true;
        }).remove();
    },
    initDocument: function(parser) {
        document.title = parser.docTitle;

        document.body.innerHTML = $.nano(tpl_mainHtml.uiTrans(), parser);
    },
    clean: function() {
        $('body > *:not("#container, .readerbtn, .noRemove, #reader_preferences, #uil_blocker,iframe[name=\'mynovelreader-iframe\']")').remove();
        $('link[rel="stylesheet"]:not(.noRemove)').remove();
        $('body, #container').removeAttr('style').removeAttr('class');

        if (unsafeWindow.jQuery && location.host.indexOf('qidian') > 0) {
            unsafeWindow.jQuery(document).off("selectstart").off("contextmenu");
        }
    },
    cleanAgain: function() {
        // var host = location.host;
        // if (!host.match(/qidian\.com|zongheng\.com/)) {  // 只在起点、纵横等网站运行
        //     return;
        // }

        // 再次移除其它不相关的，起点，纵横中文有时候有问题
        setTimeout(App.clean, 2000);
        setTimeout(App.clean, 5000);
        setTimeout(App.clean, 8000);
        // TM 用 addEventListener('load') 有问题
        window.onload = function() {
            App.clean();
            setTimeout(App.clean, 500);
        };
    },
    toggle: function() {
        if (App.isEnabled) { // 退出
            GM_setValue("auto_enable", false);
            L_setValue("mynoverlreader_disable_once", true);

            location.href = App.activeUrl;
        } else {
            GM_setValue("auto_enable", true);
            L_removeValue("mynoverlreader_disable_once");
            App.isEnabled = true;
            App.launch();
        }
    },
    removeListener: function() {
        C.log("移除各种事件监听");
        App.remove.forEach(function(_remove) {
            _remove();
        });
    },
    appendPage: function(parser, isFirst) {
        var chapter = $("article:last");
        if (chapter.length && parser.isSection) { // 每次获取的不是一章，而是一节
            var lastText = chapter.find("p:last").remove().text().trim();
            var newPage = parser.content.replace(/<p>\s+/, "<p>" + lastText);

            chapter
                .find(".chapter-footer-nav").remove()
                .end()
                .append(newPage);

            if (!Setting.hide_footer_nav) {
                chapter.append($.nano(UI.tpl_footer_nav, parser));
            }

        } else {
            chapter = $("<article>")
                .attr("id", "page-" + App.pageNum)
                .append(
                    $("<h1>").addClass("title").text(parser.chapterTitle)
                )
                .append(parser.content)
                .appendTo(App.$content);

            if (!Setting.hide_footer_nav) {
                chapter.append($.nano(UI.tpl_footer_nav, parser));
            }

            // App.fixImageFloats(chapter.get(0));

            // 添加到章节列表
            var chapterItem = $("<li>")
                .addClass('chapter')
                .append(
                    $("<div>")
                    .attr({
                        href: "#page-" + App.pageNum,
                        "realHref": parser.curPageUrl,
                        onclick: "return false;",
                        title: parser.chapterTitle
                    })
                    .text(parser.chapterTitle)
                )
                .prependTo(App.$chapterList);

            if (isFirst) {
                chapterItem.addClass('active');
            }

            App.pageNum += 1;
            App.resetCache();
        }

        App.oArticles.push(chapter[0].outerHTML);
        App.parsers.push(parser);

        bus.$emit(APPEND_NEXT_PAGE);
    },
    resetCache: function() {  // 更新缓存变量
        App.menuItems = App.$chapterList.find("div");
        App.scrollItems = $("article");
    },
    registerControls: function() {
        // 内容滚动
        var throttled = _.throttle(App.scroll, 200);
        $(window).scroll(throttled);

        App.registerKeys();

        if (Setting.dblclickPause) {
            App.$content.on("dblclick", function() {
                App.pauseHandler();
            });
        }

        // 左侧章节列表
        App.$menuHeader.click(function() {
            App.copyCurTitle();
        });

        App.$menuBar.click(function() {
            UI.hideMenuList();
        });

        App.$doc.on("mousedown", "#chapter-list div", function(event) {
            switch (event.which) {
                case 1:
                    var href = $(this).attr("href");
                    if (href) {
                        App.scrollToArticle($(href));
                    } else {
                        location.href = $(this).attr("realHref");
                    }
                    break;
                case 2: // middle click
                    L_setValue("mynoverlreader_disable_once", true);
                    App.openUrl($(this).attr("realHref"));
                    break;
            }
        });

        $("#preferencesBtn").click(function(event) {
            event.preventDefault();
            UI.preferencesShow();
        });

        GM_registerMenuCommand("小说阅读脚本设置".uiTrans(), UI.preferencesShow.bind(UI));
    },
    registerKeys: function() {
        key('enter', function(event) {
            if (UI.$prefs) {
                return;
            }

            App.openUrl(App.indexUrl, "主页链接没有找到".uiTrans());
            App.copyCurTitle();

            event.stopPropagation();
            event.preventDefault();
        });

        key('left', function(event) {
            var scrollTop = $(window).scrollTop();
            if (scrollTop === 0) {
                location.href = App.prevUrl;
            } else {
                var offsetTop = $(App.curFocusElement).offset().top;
                // 在视野窗口内
                if (offsetTop > scrollTop && offsetTop < (scrollTop + $(window).height())) {
                    App.scrollToArticle(App.curFocusElement.previousSibling || 0);
                } else {
                    App.scrollToArticle(App.curFocusElement);
                }
            }
            return false;
        });

        key('right', function(event) {
            if (App.getRemain() === 0) {
                location.href = App.lastRequestUrl || App.requestUrl;
            } else {
                App.scrollToArticle(App.curFocusElement.nextSibling || App.$doc.height());
            }

            event.preventDefault();
            event.stopPropagation();
            return false;
        });

        key('esc', function(){
            if (UI.$prefs) {
                UI.hide();
                return false;
            }
        });

        key('shift+/', function() {
            UI.openHelp();
            return false;
        });

        key(Setting.quietModeKey, function(){
            UI.toggleQuietMode();
            return false;
        });

        key(Setting.hideMenuListKey, function(){
            UI.hideMenuList();
            return false;
        });

        key(Setting.openPreferencesKey, function(){
            UI.preferencesShow();
            return false;
        });
    },
    copyCurTitle: function() {
        if (Setting.copyCurTitle) {
            var title = $(App.curFocusElement).find(".title").text()
                .replace(/第?\S+章/, "").trim();

            GM_setClipboard(title, "text");
        }
    },
    scrollToArticle: function(elem) {
        var offsetTop;
        if (typeof elem == "number") {
            offsetTop = elem;
        } else {
            offsetTop = $(elem).offset().top - parseInt($(elem).css("margin-top"), 10);
        }

        if (Setting.scrollAnimate) {
            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 750, "easeOutExpo");
        } else {
            $("html, body").stop().scrollTop(offsetTop);
        }
    },
    openUrl: function(url, errorMsg) {
        if (url) {
            // ff30 Greasemonkey 会报错：Greasemonkey 访问违规：unsafeWindow 无法调用 GM_openInTab。新建脚本采用按键调用也这样。
            setTimeout(function() {
                GM_openInTab(url, false);
            }, 0);
        } else if (errorMsg) {
            UI.notice(errorMsg);
        }
    },
    pauseHandler: function() {
        App.paused = !App.paused;
        if (App.paused) {
            UI.notice('<b>状态</b>:自动翻页<span style="color:red!important;"><b>暂停</b></span>'.uiTrans());
            App.$loading.html('自动翻页已经<span style="color:red!important;"><b>暂停</b></span>'.uiTrans()).show();
        } else {
            UI.notice('<b>状态</b>:自动翻页<span style="color:red!important;"><b>启用</b></span>'.uiTrans());
            App.scroll();
        }
    },
    scroll: function() {
        if (!App.paused && !App.working && App.getRemain() < Setting.remain_height) {
            App.scrollForce();
        }

        if (App.isTheEnd) {
            App.$loading.html("已到达最后一页...".uiTrans()).show();
        }

        App.updateCurFocusElement();
    },
    scrollForce: function() {
        if (App.tmpDoc) {
            App.loaded(App.tmpDoc);
        } else {
            App.doRequest();
        }
    },
    updateCurFocusElement: function() { // 滚动激活章节列表
        // Get container scroll position
        var fromTop = $(window).scrollTop() + $(window).height() / 2;

        // Get id of current scroll item
        var cur = App.scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        App.curFocusIndex = cur.length - 1;
        cur = cur[cur.length - 1];
        var id = cur ? cur.id : "";

        if (App.lastId !== id) {
            App.lastId = id;

            var activeItem = App.menuItems.filter("[href=#" + id + "]"),
                activeTitle = activeItem.text(),
                activeUrl = activeItem.attr("realHref");

            // Set/remove active class
            App.menuItems.parent().removeClass("active");
            activeItem.parent().addClass("active");

            App.curFocusElement = cur;
            App.activeUrl = activeUrl;

            if (Setting.addToHistory) {
                var curNum = id.match(/\d+/)[0] - 1;  // 当前是第几个
                var curTitle = App.parsers[curNum].docTitle;
                document.title = curTitle;

                // 有域名的限制，起点过渡到 vip 章节无法生效
                var url = activeUrl.replace('http://read.qidian.com', '');
                try {
                    unsafeWindow.history.pushState(null, curTitle, url);
                } catch (e) {
                    console.error('添加下一页到历史记录失败', e);
                }
            }
        }
    },
    getRemain: function() {
        var scrollHeight = Math.max(document.documentElement.scrollHeight,
            document.body.scrollHeight);
        var remain = scrollHeight - window.innerHeight - window.scrollY;
        return remain;
    },
    doRequest: function() {
        App.working = true;
        var nextUrl = App.requestUrl;
        App.lastRequestUrl = App.requestUrl;

        if (nextUrl && !App.isTheEnd && !(nextUrl in App.parsedPages)) {
            App.parsedPages[nextUrl] = 0;
            App.curPageUrl = App.requestUrl;
            App.requestUrl = null;

            var useiframe = App.site.useiframe;

            App.$loading
                .show()
                .html("")
                .append($("<img>").attr("src", "data:image/gif;base64,R0lGODlhEAAQAMQAAPf39+/v7+bm5t7e3tbW1s7OzsXFxb29vbW1ta2traWlpZycnJSUlIyMjISEhHt7e3Nzc2tra2NjY1paWlJSUkpKSkJCQjo6OjExMSkpKSEhIRkZGRAQEAgICAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAeACwAAAEADwAOAAAFdaAnet20GAUCceN4LQlyFMRATC3GLEqM1gIc6dFgPDCii6I2YF0eDkinxUkMBBAPBfLItESW2sEjiWS/ItqALJGgRZrNRtvWoDlxFqZdmbY0cVMdbRMWcx54eSMZExQVFhcYGBmBfxWPkZQbfi0dGpIYGiwjIQAh+QQJBQAeACwAAAEADwAOAAAFeKAnep0FLQojceOYQU6DIsdhtVoEywptEBRRZyKBQDKii+JHYGEkxE6LkyAMIB6KRKJpJQuDg2cr8Y7AgjHULCoQ0pUJZWO+uBGeDIVikbYyDgRYHRUVFhcsHhwaGhsYfhuHFxgZGYwbHH4iHBiUlhuYmlMbjZktIQAh+QQFBQAeACwAAAEADwAOAAAFe6Aneh1GQU9UdeOoTVIEOQ2zWG0mSVP0ODYF4iLq7HgaEaaRQCA4HsyOwhp1FgdDxFOZTDYt0cVQSHgo6PCIPOBWKmpRgdDGWCzQ8KUwOHg2FxcYYRwJdBAiGRgZGXkcC3MEjhkalZYTfBMtHRudnhsKcGodHKUcHVUeIQAh+QQJBQAeACwAAAEADwAOAAAFbKAnjp4kURiplmYEQemoTZMpuY/TkBVFVRtRJtJgMDoejaViWT0WiokHc2muMIoEY0pdiRCIgyeDia0OhoJnk8l4PemEh6OprxQFQkS02WiCIhd4HmoiHRx9ImkEA14ciISMBFJeSAQIEBwjIQAh+QQJBQAeACwAAAEADwAOAAAFd6Anel1WTRKFdeO4WRWFStKktdwFU3JNZ6MM5nLZiDQTCCTC4ghXrU7k4bB4NpoMpyXKNBqQa5Y7YiwWHg6WLFK4SWoW95JAMOAbI05xOEhEHWoaFyJ0BgYHWyIcHA4Fj48EBFYtGJKSAwMFFGQdEAgCAgcQih4hACH5BAkFAB4ALAAAAQAPAA4AAAV0oCeKG2ZVFtaNY6dh10lNU8Z2WwbLkyRpI85Gk+GQKr7JqiME3mYSjIe5WbE8GkhkMhVeR48HpLv5ihoOB9l4xTAYYw9nomCLOgzFoiJSEAoIFiIXCwkJC1YVAwMEfwUGBgeBLBMEAouOBxdfHA8HlwgRdiEAIfkECQUAHgAsAAABAA8ADgAABXOgJ4rdpmWZ1o0sZ2YYdlka63XuKVsVVZOuzcrDufQoQxzH1rFMJJiba8jaPCnSjW30lHgGhMJWBIl4D2DLNvOATDwPwSCxHHUgjseFOJAn1B4YDgwND0MTAWAFBgcICgsMUVwDigYICQt7NhwQCGELE1QhACH5BAkFAB4ALAAAAQAPAA4AAAV4oCeOHWdyY+p1JbdpWoam7fZmGYZtYoeZm46Ik7kYhZBBQ6PyWSoZj0FAuKg8mwrF4glQryIKZdL9gicTiVQw4Ko2aYrnwUbMehGJBOPhDAYECVYeGA8PEBNCHhOABgcJCgwNh0wjFQaOCAoLk1EqHBILmg8Vih4hACH5BAkFAB4ALAAAAQAPAA4AAAV6oCd6Hdmd5ThWCee+XCpOwTBteL6lnCAMLVFHQ9SIHgHBgaPyZDKYjcfwszQ9HMwl40kOriKLuDsggD2VtOcwKFibGwrFCiEUEjJSZTLhcgwGBwsYIhkUEhITKRYGCAkKDA0PiBJcKwoKCwwODxETRk0dFA8NDhIYMiEAIfkECQUAHgAsAAABAA8ADgAABXmgJ3rcYwhcN66eJATCsHEpOwXwQGw8rZKDGMIi6vBmokcswWFtNBvVQUdkcTJQj67AGmEyGU+hYOiKMGiP4oC4dDmXS1iCSDR+xYvFovF0FAoLDxgiGxYUFRY/FwsMDQ4PEhOTFH0jFw6QEBKcE5YrHRcTERIUGHghACH5BAkFAB4ALAAAAQAPAA4AAAV4oCd63GMAgfF04zgNQixjrVcJQz4QRLNxI06Bh7CILpkf0CMpGBLL0ebHWhwOl5qno/l5EGCtqAtUmMWeTNfzWCxoNU4maWs0Vq0OBpMBdh4ODxEaIhsXhxkjGRAQEhITExQVFhdRHhoTjo8UFBYbWnoUjhUZLCIhACH5BAkFAB4ALAAAAQAPAA4AAAV5oCd6HIQIgfFw42gZBDEMgjBMbXUYRlHINEFF1FEgEIqLyHKQJToeikLBgI44iskG+mAsMC0RR7NhNRqM8IjMejgcahHbM4E8Mupx2YOJSCZWIxlkUB0TEhIUG2IYg4tyiH8UFRaNGoEeGYgTkxYXGZhEGBWTGI8iIQA7"))
                .append("<a href='" + nextUrl + "' title='点击打开下一页链接'>正在载入下一页".uiTrans() + (useiframe ? "(iframe)" : "") + "...</a>");

            setTimeout(function() {
                if (useiframe) {
                    App.iframeRequest(nextUrl);
                } else {
                    App.httpRequest(nextUrl, App.httpRequestDone);
                }
            }, App.site.nDelay || 0);
        } else {
            // App.$loading.html("<a href='" + App.curPageUrl  + "'>无法使用阅读模式，请手动点击下一页</a>").show();
        }
    },
    httpRequest: function(nextUrl, callback) {
        if (!_.isFunction(callback)) {
            callback = function() {};
        }

        C.log("获取下一页: " + nextUrl);
        App.parsedPages[nextUrl] += 1;

        GM_xmlhttpRequest({
            url: nextUrl,
            method: "GET",
            overrideMimeType: "text/html;charset=" + document.characterSet,
            timeout: config.xhr_time,
            onload: function(res) {
                var doc = parseHTML$1(res.responseText);
                callback(doc, nextUrl);
            },
            ontimeout: function() {
                callback(null, nextUrl);
            }
        });
    },
    httpRequestDone: function(doc, nextUrl) {
        if (doc) {
            App.beforeLoad(doc);
            return;
        }

        if (App.parsedPages[nextUrl] >= 3) {
            console.error('同一个链接已获取3次', nextUrl);
            App.$loading.html("<a href='" + nextUrl  + "'>无法获取下一页，请手动点击</a>").show();
            return;
        }

        // 无内容再次尝试获取
        console.error('连接超时, 再次获取');
        App.httpRequest(nextUrl, App.httpRequestDone);
    },
    iframeRequest: function(nextUrl) {
        C.log("iframeRequest: " + nextUrl);
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
    iframeLoaded: function() {
        var iframe = this;
        var body = iframe.contentDocument.body;

        if (body && body.firstChild) {
            var doc = iframe.contentDocument;

            if (App.site.startLaunch) {
                App.site.startLaunch($(doc));
            }

            var mutationSelector = App.site.mutationSelector;
            if (mutationSelector) {
                App.addMutationObserve(doc, function() {
                    App.beforeLoad(doc);
                });
            } else {
                var timeout = App.site.timeout || 0;

                setTimeout(function() {
                    App.beforeLoad(doc);
                }, timeout);
            }
        }
    },
    beforeLoad: function(htmlDoc) {
        if (config.PRELOADER) {
            App.tmpDoc = htmlDoc;
            App.working = false;
            App.scroll();

            // 预读图片
            var existSRC = {};
            $(App.tmpDoc).find('img').each(function() {
                var isrc = $(this).attr('src');
                if (!isrc || existSRC[isrc]) {
                    return;
                } else {
                    existSRC[isrc] = true;
                }
                var img = document.createElement('img');
                img.src = isrc;
            });
        } else {
            App.loaded(htmlDoc);
        }
    },
    loaded: function(doc) {
        var parser = new Parser(App.site, doc, App.curPageUrl);
        parser.getAll(function() {
            App.addNextPage(parser);
        });
        App.tmpDoc = null;
    },
    addNextPage: function(parser) {
        if (parser.content) {
            App.appendPage(parser);

            App.$loading.hide();
            App.requestUrl = parser.nextUrl;
            App.isTheEnd = parser.isTheEnd;

            App.afterLoad();
        } else {
            App.removeListener();

            var msg = (parser.isTheEnd == 'vip') ?
                'vip 章节，需付费。' :
                '错误：没有找到下一页的内容。';
            App.$loading.html(
                '<a href="' + App.curPageUrl + '">' + msg + '点此打开下一页。</a>'.uiTrans())
                .show();
        }

        App.working = false;
    },
    afterLoad: function() {
        App.tmpDoc = null;

        if (config.PRELOADER) {
            setTimeout(function(){
                App.doRequest();
            }, 200);
        }
    },
    fixImageFloats: function(articleContent) {
        if (!config.fixImageFloats) return;

        articleContent = articleContent || document;

        var imageWidthThreshold = Math.min(articleContent.offsetWidth, 800) * 0.55,
            images = articleContent.querySelectorAll('img:not(.blockImage)');

        for (var i = 0, il = images.length; i < il; i += 1) {
            var image = images[i];

            if (image.offsetWidth > imageWidthThreshold) {
                image.className += " blockImage";
            }
        }
    },

    isSaveing: false,
    saveAsTxt: function() {
        if (App.site.useiframe) {
            UI.notice('暂不支持', 3000);
            return;
        }

        if (App.isSaveing) {
            alert('正在保存中，请稍后');
            return;
        }

        App.isSaveing = true;

        run(App.parsers, function() {
            App.isSaveing = false;
        });
    }
};

var UI = {
    tpl_footer_nav: '\
        <div class="chapter-footer-nav">\
            <a class="prev-page" href="{prevUrl}">上一页</a> | \
            <a class="index-page" href="{indexUrl}" title="Enter 键打开目录">目录</a> | \
            <a class="next-page" style="color:{theEndColor}" href="{nextUrl}">下一页</a>\
        </div>\
        '.uiTrans(),
    skins: {},

    init: function(){
        UI.refreshMainStyle();

        UI.refreshSkinStyle(Setting.skin_name, true);

        UI.refreshExtraStyle(Setting.extra_css);

        UI.fixMobile();

        // 初始变量
        UI.$menu = $('#menu');
        UI.$menuBar = $('#menu-bar');
        UI.$content = $('#mynovelreader-content');
        UI.$preferencesBtn = $('#preferencesBtn');

        // 初始化是否隐藏
        if(Setting.hide_footer_nav){
            UI.hideFooterNavStyle(true);
        }

        // UI.toggleQuietMode();  // 初始化安静模式
        UI.hideMenuList(Setting.menu_list_hiddden);  // 初始化章节列表是否隐藏
        UI.hidePreferencesButton(Setting.hide_preferences_button);  // 初始化设置按钮是否隐藏
    },
    refreshMainStyle: function(){
        var mainCss = Res.CSS_MAIN
                .replace("{font_family}", Setting.font_family)
                .replace("{font_size}", UI.calcContentFontSize(Setting.font_size))
                .replace("{title_font_size}", UI.calcTitleFontSize(Setting.font_size))
                .replace("{content_width}", Setting.content_width)
                .replace("{text_line_height}", Setting.text_line_height)
                .replace("{menu-bar-hidden}", Setting.menu_bar_hidden ? "display:none;" : "");

        if(UI.$mainStyle){
            UI.$mainStyle.text(mainCss);
            return;
        }

        UI.$mainStyle = $('<style id="main">')
            .text(mainCss)
            .appendTo('head');
    },
    hideFooterNavStyle: function(hidden){
        var navStyle = $("#footer_nav_css");
        if(hidden) {
            if(navStyle.length === 0) {
                $('<style>')
                    .attr("id", "footer_nav_css")
                    .text(".chapter-footer-nav { display: none; }")
                    .appendTo('head');
            }
        } else {
            navStyle.remove();
        }
    },
    hideMenuList: function(hidden){
        if(typeof(hidden) === "undefined"){
            hidden = !UI.menu_list_hiddden;
        }

        if(hidden){
            UI.$menu.addClass('hidden');
            UI.$content.css("margin-left", "");
        }else{
            UI.$menu.removeClass('hidden');
            UI.$content.css("margin-left", "320px");
        }
        UI.menu_list_hiddden = hidden;
    },
    hidePreferencesButton: function(hidden) {
        hidden = _.isUndefined(hidden) ? Setting.hide_preferences_button : hidden;

        UI.$preferencesBtn.toggle(!hidden);
    },
    hideMenuBar: function(hidden) {
        hidden = _.isUndefined(hidden) ? Setting.menu_bar_hidden : hidden;

        UI.$menuBar.toggle(!hidden);
    },
    refreshSkinStyle: function(skin_name, isFirst){
        var $style = $("#skin_style");
        if($style.length === 0){
            $style = $('<style id="skin_style">').appendTo('head');
        }

        // 图片章节夜间模式会变的无法看
        if (isFirst && skin_name.indexOf('夜间'.uiTrans()) != -1 && Setting.picNightModeCheck) {
            setTimeout(function(){
                var img = $('#mynovelreader-content img')[0];
                // console.log(img.width, img.height)
                if (img && img.width > 500 && img.height > 1000) {
                    $style.text(UI.skins['缺省皮肤'.uiTrans()]);
                    return;
                }
            }, 200);
        }

        $style.text(UI.skins[skin_name]);
    },
    refreshExtraStyle: function(css){
        var style = $("#extra_style");
        if(style.length === 0){
            style = $('<style id="extra_style">').appendTo('head');
        }

        style.text(css);
    },
    toggleQuietMode: function() {
        this._isQuietMode = !this._isQuietMode;
        var selector = '#menu-bar, #menu, #preferencesBtn, .readerbtn';

        if (this.$_quietStyle) {
            this.$_quietStyle.remove();
            this.$_quietStyle = null;
        }

        if (this._isQuietMode) {
            $(selector).addClass("quiet-mode");

            if (!isChrome) {  // firefox 下隐藏滚动条
                this.$_quietStyle = $('<style>')
                    .text('scrollbar {visibility:collapse !important; } body {overflow: hidden !important; overflow-x: hidden !important;}')
                    .appendTo('head');
            }
        } else {
            $(selector).removeClass("quiet-mode");
        }
    },
    addButton: function(){
        GM_addStyle('\
            .readerbtn {\
                position: fixed;\
                right: 10px;\
                bottom: 10px;\
                z-index: 2247483648;\
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
            .html(App.isEnabled ? "退出".uiTrans() : "阅读模式".uiTrans())
            .mousedown(function(event){
                if(event.which == 1){
                    App.toggle();
                }else if(event.which == 2){
                    event.preventDefault();
                    L_setValue("mynoverlreader_disable_once", true);

                    var url = App.activeUrl || App.curPageUrl;
                    App.openUrl(url);
                }
            })
            .appendTo('body');
    },
    calcContentFontSize: function(fontSizeStr) {
        var m = fontSizeStr.match(/([\d\.]+)(px|r?em|pt)/);
        if(m) {
            var size = m[1],
                type = m[2];
            return parseFloat(size, 10) + type;
        }

        m = fontSizeStr.match(/([\d\.]+)/);
        if (m) {
            return parseFloat(m[1], 10) + 'px';
        }

        return "";
    },
    calcTitleFontSize: function(fontSizeStr){
        var m = fontSizeStr.match(/([\d\.]+)(px|r?em|pt)/);
        if(m) {
            var size = m[1],
                type = m[2];
            return parseFloat(size, 10) * 1.8 + type;
        }

        m = fontSizeStr.match(/([\d\.]+)/);
        if (m) {
            return parseFloat(m[1], 10) * 1.8 + 'px';
        }

        return "";
    },
    fixMobile: function(){  // 自适应网页设计
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1");
        document.head.appendChild(meta);
    },
    preferencesShow: function(event){
        if($("#reader_preferences").length){
            return;
        }

        UI._loadBlocker();

        UI.$prefs = $('<div id="reader_preferences">')
            .css('cssText', 'position:fixed; top:12%; left:30%; width:500px; z-index:300000;')
            .append(
                $('<style>').text(Res.preferencesCSS))
            .append(
                $('<div class="body">').html(Res.preferencesHTML))
            .appendTo('body');

        UI.preferencesLoadHandler();
    },
    _loadBlocker: function() {
        UI.$blocker = $('<div>').attr({
            id: 'uil_blocker',
            style: 'position:fixed;top:0px;left:0px;right:0px;bottom:0px;background-color:#000;opacity:0.5;z-index:100000;'
        }).appendTo('body');
    },
    hide: function(){
        if(UI.$prefs) UI.$prefs.remove();
        if(UI.$blocker) UI.$blocker.remove();
        UI.$prefs = null;
        UI.$blocker = null;
    },
    preferencesLoadHandler: function(){
        var $form = $("#preferences");

        // checkbox
        $form.find("#enable-cn2tw").get(0).checked = Setting.cn2tw;
        $form.find("#disable-auto-launch").get(0).checked = Setting.getDisableAutoLaunch();
        $form.find("#booklink-enable").get(0).checked = Setting.booklink_enable;
        $form.find("#debug").get(0).checked = Setting.debug;
        $form.find("#quietMode").get(0).checked = Setting.isQuietMode;
        $form.find("#pic-nightmode-check").get(0).checked = Setting.picNightModeCheck;
        $form.find("#copyCurTitle").get(0).checked = Setting.copyCurTitle;

        $form.find("#hide-menu-list").get(0).checked = Setting.menu_list_hiddden;
        $form.find("#hide-footer-nav").get(0).checked = Setting.hide_footer_nav;
        $form.find("#hide-preferences-button").get(0).checked = Setting.hide_preferences_button;
        $form.find("#add-nextpage-to-history").get(0).checked = Setting.addToHistory;
        $form.find("#enable-dblclick-pause").get(0).checked = Setting.dblclickPause;

        $form.find("#font-family").get(0).value = Setting.font_family;
        $form.find("#font-size").get(0).value = Setting.font_size;
        $form.find("#content_width").get(0).value = Setting.content_width;
        $form.find("#text_line_height").get(0).value = Setting.text_line_height;
        $form.find("#split_content").get(0).checked = Setting.split_content;
        $form.find("#scroll_animate").get(0).checked = Setting.scrollAnimate;

        $form.find("#remain-height").get(0).value = Setting.remain_height;
        $form.find("#extra_css").get(0).value = Setting.extra_css;
        $form.find("#custom_siteinfo").get(0).value = Setting.customSiteinfo;
        UI._rules = $form.find("#custom_replace_rules").get(0).value = Setting.customReplaceRules;

        // 界面语言
        var $lang = $form.find("#lang");
        $("<option>").text("zh-CN").appendTo($lang);
        $("<option>").text("zh-TW").appendTo($lang);
        $lang.val(Setting.lang).change(function(){
            var key = $(this).find("option:selected").text();
            Setting.lang = key;
        });

        // 皮肤
        var $skin = $form.find("#skin");
        for(var key in UI.skins){
            $("<option>").text(key).appendTo($skin);
        }
        $skin.val(Setting.skin_name).change(function(){
            var key = $(this).find("option:selected").text();
            UI.refreshSkinStyle(key);
            Setting.skin_name = key;
        });

        // 字体大小等预览
        var preview = _.debounce(function(){
            switch(this.id){
                case "font-size":
                    var contentFontSize = UI.calcContentFontSize(this.value);
                    var titleFontSize = UI.calcTitleFontSize(this.value);
                    if(titleFontSize) {
                        UI.$content.css("font-size", contentFontSize);
                        UI.$content.find("h1").css("font-size", titleFontSize);
                    }
                    break;
                case "font-family":
                    UI.$content.css("font-family", this.value);
                    break;
                case "content_width":
                    UI.$content.css("width", this.value);
                    break;
                case "text_line_height":
                    UI.$content.css("line-height", this.value);
                    break;
                default:
                    break;
            }
        }, 300);
        $form.on("input", "input", preview);

        // 初始化设置按键
        $form.find("#quietModeKey").get(0).value = Setting.quietModeKey;
        $form.find("#openPreferencesKey").get(0).value = Setting.openPreferencesKey;
        $form.find("#setHideMenuListKey").get(0).value = Setting.hideMenuListKey;

        // 点击事件
        $form.on('click', 'input:checkbox, input:button', function(event){
            UI.preferencesClickHandler(event.target);
        });
    },
    cleanPreview: function() {
        UI.$content.find("h1").css("font-size", "");

        // 恢复初始设置（有误操作）
        // UI.$content.removeAttr('style');
    },
    preferencesClickHandler: function(target){
        var key;
        switch (target.id) {
            case 'close_button':
                UI.preferencesCloseHandler();
                break;
            case 'save_button':
                UI.preferencesSaveHandler();
                break;
            case 'debug':
                Setting.debug = !Setting.debug;
                toggleConsole(Setting.debug);
                break;
            case 'quietMode':
                UI.toggleQuietMode(target.checked);
                break;
            case 'hide-menu-list':
                UI.hideMenuList(target.checked);
                break;
            case 'hide-preferences-button':
                UI.hidePreferencesButton(target.checked);
                if (target.checked) {
                    alert('隐藏后通过快捷键或 Greasemonkey 用户脚本命令处调用'.uiTrans());
                }
                break;
            case 'hide-footer-nav':
                break;
            case 'quietModeKey':
                key = prompt('请输入打开设置的快捷键：'.uiTrans(), Setting.quietModeKey);
                if (key) {
                    Setting.quietModeKey = key;
                    $(target).val(key);
                }
                break;
            case 'openPreferencesKey':
                key = prompt('请输入打开设置的快捷键：'.uiTrans(), Setting.openPreferencesKey);
                if (key) {
                    Setting.openPreferencesKey = key;
                    $(target).val(key);
                }
                break;
            case 'setHideMenuListKey':
                key = prompt('请输入切换左侧章节列表的快捷键：'.uiTrans(), Setting.hideMenuListKey);
                if (key) {
                    Setting.hideMenuListKey = key;
                    $(target).val(key);
                }
                break;
            case 'saveAsTxt':
                UI.preferencesCloseHandler();
                App.saveAsTxt();
                break;
            case 'speech':
                UI.preferencesCloseHandler();
                bus.$emit(SHOW_SPEECH);
                break;
            default:
                break;
        }
    },
    preferencesCloseHandler: function(){
        UI.cleanPreview();

        UI.hide();
    },
    preferencesSaveHandler: function(){
        var $form = $("#preferences");

        Setting.setDisableAutoLaunch($form.find("#disable-auto-launch").get(0).checked);

        Setting.cn2tw = $form.find("#enable-cn2tw").get(0).checked;
        Setting.booklink_enable = $form.find("#booklink-enable").get(0).checked;
        Setting.isQuietMode = $form.find("#quietMode").get(0).checked;
        Setting.debug = $form.find("#debug").get(0).checked;
        Setting.picNightModeCheck = $form.find("#pic-nightmode-check").get(0).checked;
        Setting.setCopyCurTitle($form.find("#copyCurTitle").get(0).checked);

        Setting.addToHistory = $form.find("#add-nextpage-to-history").get(0).checked;
        Setting.dblclickPause = $form.find("#enable-dblclick-pause").get(0).checked;

        var skinName = $form.find("#skin").find("option:selected").text();
        Setting.skin_name = skinName;
        UI.refreshSkinStyle(skinName);

        Setting.font_family = $form.find("#font-family").get(0).value;
        UI.$content.css("font-family", Setting.font_family);

        Setting.font_size = $form.find("#font-size").get(0).value;
        Setting.text_line_height = $form.find("#text_line_height").get(0).value;
        Setting.content_width = $form.find("#content_width").get(0).value;
        Setting.remain_height = $form.find("#remain-height").get(0).value;
        Setting.split_content = $form.find("#split_content").get(0).checked;
        Setting.scrollAnimate = $form.find("#scroll_animate").get(0).checked;

        Setting.menu_list_hiddden = $form.find("#hide-menu-list").get(0).checked;
        UI.hideMenuList(Setting.menu_list_hiddden);

        Setting.hide_footer_nav = $form.find("#hide-footer-nav").get(0).checked;
        Setting.hide_preferences_button = $form.find("#hide-preferences-button").get(0).checked;

        var css = $form.find("#extra_css").get(0).value;
        UI.refreshExtraStyle(css);
        Setting.extra_css = css;

        Setting.customSiteinfo = $form.find("#custom_siteinfo").get(0).value;

        // 自定义替换规则直接生效
        var rules = $form.find("#custom_replace_rules").get(0).value;
        Setting.customReplaceRules = rules;
        if (rules != UI._rules) {
            var contentHtml = App.oArticles.join('\n');
            if (rules) {
                // 转换规则
                rules = Rule.parseCustomReplaceRules(rules);
                // 替换
                contentHtml = Parser.prototype.replaceHtml(contentHtml, rules);
            }

            UI.$content.html(contentHtml);

            App.resetCache();

            UI._rules = rules;
        }

        // 重新载入样式
        UI.cleanPreview();
        UI.refreshMainStyle();

        UI.hide();
    },
    openHelp: function() {

    },
    notice: function (htmlText, ms){
        var $noticeDiv = $("#alert");
        if (!ms) {
            ms = 1666;
        }

        clearTimeout(UI.noticeDivto);
        $noticeDiv.find("p").html(htmlText);
        $noticeDiv.fadeIn("fast");

        UI.noticeDivto = setTimeout(function(){
            $noticeDiv.fadeOut(500);
        }, ms);

        return $noticeDiv;
    }
};

UI.skins["缺省皮肤".uiTrans()] = "";
UI.skins["暗色皮肤".uiTrans()] = "body { color: #666; background-color: rgba(0;0;0;.1); }\
                .title { color: #222; }";
UI.skins["白底黑字".uiTrans()] = "body { color: black; background-color: white;}\
                .title { font-weight: bold; border-bottom: 0.1em solid; margin-bottom: 1.857em; padding-bottom: 0.857em;}";
UI.skins["夜间模式".uiTrans()] = "body { color: #939392; background: #2d2d2d; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; } .chapter.active div{color: #939392;}";
UI.skins["夜间模式1".uiTrans()] = "body { color: #679; background-color: black; } #preferencesBtn img { background-color: white !important; } .title { color: #3399FF; background-color: #121212; }";
UI.skins["夜间模式2".uiTrans()] = "body { color: #AAAAAA; background-color: #121212; } #preferencesBtn img { background-color: white; } #mynovelreader-content img { background-color: #c0c0c0; } .title { color: #3399FF; background-color: #121212; }   body a { color: #E0BC2D; } body a:link { color: #E0BC2D; } body a:visited { color:#AAAAAA; } body a:hover { color: #3399FF; } body a:active { color: #423F3F; }";
UI.skins["夜间模式（多看）".uiTrans()] = "body { color: #4A4A4A; background: #101819; } #preferencesBtn { background: white; } #mynovelreader-content img { background-color: #c0c0c0; }";

UI.skins["橙色背景".uiTrans()] = "body { color: #24272c; background-color: #FEF0E1; }";
UI.skins["绿色背景".uiTrans()] = "body { color: black; background-color: #d8e2c8; }";
UI.skins["绿色背景2".uiTrans()] = "body { color: black; background-color: #CCE8CF; }";
UI.skins["蓝色背景".uiTrans()] = "body { color: black; background-color: #E7F4FE; }";
UI.skins["棕黄背景".uiTrans()] = "body { color: black; background-color: #C2A886; }";
UI.skins["经典皮肤".uiTrans()] = "body { color: black; background-color: #EAEAEE; } .title { background-color: #f0f0f0; }";

UI.skins["起点牛皮纸（深色）".uiTrans()] = "body { color: black; background: url(\"http://qidian.gtimg.com/qd/images/read.qidian.com/theme/body_theme1_bg_2x.0.3.png\"); }";
UI.skins["起点牛皮纸（浅色）".uiTrans()] = "body { color: black; background: url(\"http://qidian.gtimg.com/qd/images/read.qidian.com/theme/theme_1_bg_2x.0.3.png\"); }";

var getBooleanConfig = function(configName, defaultValue) {
    var config$$1 = GM_getValue(configName);
    if(config$$1 === undefined) {
        GM_setValue(configName, defaultValue);
        config$$1 = defaultValue;
    }
    return config$$1;
};

var Setting = {
    getDisableAutoLaunch: function() {  // 强制手动启用模式
        return getBooleanConfig("disable_auto_launch", false);
    },
    setDisableAutoLaunch: function(bool) {
        GM_setValue("disable_auto_launch", bool);
    },

    // 按键调用会遇到问题： Greasemonkey 访问违规：unsafeWindow 无法调用 GM_getValue
    // 故改成这种形式
    copyCurTitle: getBooleanConfig("copyCurTitle", true),
    setCopyCurTitle: function (bool) {
        this.copyCurTitle = !!bool;
        GM_setValue("copyCurTitle", !!bool);
    },

    get cn2tw() {
        if (_.isUndefined(this._cn2tw)) {
            this._cn2tw = getBooleanConfig('cn2tw', this.lang === 'zh-TW' ? true : false);
        }
        return this._cn2tw;
    },
    set cn2tw(bool) {
        GM_setValue('cn2tw', bool);
        this._cn2tw = bool;
    },

    get booklink_enable() {  // booklink.me 跳转的自动启动
        return getBooleanConfig("booklink_enable", true);
    },
    set booklink_enable(bool) {
        GM_setValue("booklink_enable", bool);
    },

    get debug() {  // 调试
        if (_.isUndefined(this._debug)) {
            this._debug = getBooleanConfig("debug", false);
        }
        return this._debug;
    },
    set debug(bool) {
        this._debug = bool;
        GM_setValue("debug", bool);
        toggleConsole(bool);
    },

    get addToHistory() {
        if (_.isUndefined(this._addToHistory)) {
            this._addToHistory = getBooleanConfig("add_nextpage_to_history", true);
        }
        return this._addToHistory;
    },
    set addToHistory(bool) {
        this._addToHistory = bool;
        GM_setValue("add_nextpage_to_history", bool);
    },

    get dblclickPause() {
        return getBooleanConfig('dblclick_pause', true);
    },
    set dblclickPause(bool) {
        GM_setValue('dblclick_pause', bool);
    },

    get remain_height() {  // 距离底部多少高度（px）开始加载下一页
        if(_.isUndefined(this._remain_height)){
            this._remain_height = parseInt(GM_getValue("remain_height"), 10) || 400;
        }
        return this._remain_height;
    },
    set remain_height(val) {
        this._remain_height = val;
        GM_setValue("remain_height", val);
    },

    get lang() {
        if (_.isUndefined(this._lang)) {
            this._lang = GM_getValue("lang") || ((navigator.language === "zh-TW" || navigator.language === "zh-HK") ? "zh-TW" : "zh-CN");
        }
        return this._lang;
    },
    set lang(val) {
        this._lang = val;
        config.lang = val;
        GM_setValue("lang", val);
    },

    get font_family() {
        return GM_getValue("font_family") || "微软雅黑,宋体,黑体,楷体".uiTrans();
    },
    set font_family(val) {
        GM_setValue("font_family", val);
    },

    get font_size() {  // 字体大小
        return GM_getValue("font_size") || "18px";
    },
    set font_size(val) {
        GM_setValue("font_size", val);
    },

    get text_line_height(){
        return GM_getValue("text_line_height") || "2em";
    },
    set text_line_height(val){
        GM_setValue("text_line_height", val);
    },

    get content_width() {  // 内容宽度
        return GM_getValue("content_width") || "800px";
    },
    set content_width(val) {
        GM_setValue("content_width", val);
    },

    get extra_css() {
        return GM_getValue("extra_css", "");
    },
    set extra_css(val) {
        GM_setValue("extra_css", val);
    },

    get customSiteinfo() {
        return GM_getValue('custom_siteinfo', '[]');
    },
    set customSiteinfo(val) {
        GM_setValue('custom_siteinfo', val);
    },

    get customReplaceRules() {
        var rules = GM_getValue('custom_replace_rules', 'b[āà]ng=棒\n『(.)』=$1');

        return rules;
    },
    set customReplaceRules(val) {
        GM_setValue('custom_replace_rules', val);
    },

    get skin_name() {
        return GM_getValue("skin_name") || "缺省皮肤".uiTrans();
    },
    set skin_name(val) {
        GM_setValue("skin_name", val);
    },

    get menu_list_hiddden() {
        return getBooleanConfig("menu_list_hiddden", false);
    },
    set menu_list_hiddden(bool) {
        GM_setValue("menu_list_hiddden", bool);
    },

    get hide_footer_nav() {
        return getBooleanConfig("hide_footer_nav", true);
    },
    set hide_footer_nav(bool) {
        GM_setValue("hide_footer_nav", bool);
        UI.hideFooterNavStyle(bool);
    },

    get hide_preferences_button() {
        return getBooleanConfig("hide_preferences_button", false);
    },
    set hide_preferences_button(bool) {
        GM_setValue('hide_preferences_button', bool);
    },

    // === 快捷键

    // 安静模式切换快捷键
    get quietModeKey() {
        if (this._quietModeKey) {
            return this._quietModeKey;
        }
        this._quietModeKey = GM_getValue('quietModeKey') || 'q';

        return this._quietModeKey;
    },
    set quietModeKey(keyCode) {
        this._quietModeKey = keyCode;
        GM_setValue('quietModeKey', keyCode);
    },

    // 打开设置窗口的快捷键
    get openPreferencesKey() {
        if (this._openPreferencesKey) {
            return this._openPreferencesKey;
        }
        this._openPreferencesKey = GM_getValue('open_preferences_key') || 's';

        return this._openPreferencesKey;
    },
    set openPreferencesKey(keyCode) {
        this._openPreferencesKey = keyCode;
        GM_setValue('open_preferences_key', keyCode);
    },

    // 隐藏左侧章节列表的快捷键
    get hideMenuListKey() {  // 默认为 c
        // 'C'.charCodeAt(0) = 67
        if (this._hideMenuListKey) {
            return this._hideMenuListKey;
        }
        this._hideMenuListKey = GM_getValue('hide_menulist_key') || 'c';

        return this._hideMenuListKey;
    },
    set hideMenuListKey(key) {
        this._hideMenuListKey = key;
        GM_setValue("hide_menulist_key", key);
    },

    get picNightModeCheck() {
        return getBooleanConfig('picNightModeCheck', true);
    },
    set picNightModeCheck(bool) {
        GM_setValue('picNightModeCheck', bool);
    },

    get split_content() {
        if (_.isUndefined(this._split_content)) {
            this._split_content = GM_getValue('split_content', true);
        }
        return this._split_content;
    },
    set split_content(bool) {
        this._split_content = bool;
        GM_setValue('split_content', bool);
    },

    get scrollAnimate() {
        return GM_getValue('scrollAnimate', false);
    },
    set scrollAnimate(bool) {
        GM_setValue('scrollAnimate', bool);
    },
};

var BookLinkMe = {
  clickedColor: "666666",

  init: function() {

      this.addUnreadButton();

      // if (location.pathname.indexOf("/book-") === 0) {
      //     this.chapterPageAddTiebaLink();
      // }
  },
  addUnreadButton: function(){  // 添加一键打开所有未读链接
      var $parent = $('td[colspan="2"]:contains("未读"):first, td[colspan="2"]:contains("未讀"):first');
      if(!$parent.length) return;

      var openAllUnreadLinks = function(event){
          event.preventDefault();

          var links = $x('./ancestor::table[@width="100%"]/descendant::a[img[@alt="未读"]]', event.target);
          links.forEach(function(link){
              // 忽略没有盗版的
              var chapterLink = link.parentNode.nextSibling.nextSibling.querySelector('a');
              if (chapterLink.querySelector('font[color*="800000"]')) {
                  return;
              }

              if(isFirefox)
                  link.click();
              else
                  GM_openInTab(link.href);

              // 设置点击后的样式
              // 未读左边的 1x 链接
              link.parentNode.previousSibling.querySelector('font')
                  .setAttribute('color', BookLinkMe.clickedColor);
              chapterLink.classList.add('mclicked');
          });
      };


      $('<a>')
          .attr({ href: 'javascript:;', title: '一键打开所有未读链接', style: 'width:auto;' })
          .click(openAllUnreadLinks)
          .append($('<img src="me.png" style="max-width: 20px;">'))
          .appendTo($parent);
  },
  chapterPageAddTiebaLink: function() {
      var link = $('font:contains("贴吧")').parent().get(0);
      if (!link) return;

      var tiebaUrl = 'http://tieba.baidu.com/f?kw=' + $('h1').text();
      console.log('GM_xmlhttpRequest', tiebaUrl);
      GM_xmlhttpRequest({
          method: "GET",
          url: tiebaUrl,
          onload: function(response) {
              var doc = parseHTML(response.responseText);
              BookLinkMe.load(doc);
          }
      });
  },
  load: function(doc) {
      var $data = $(doc).find('.threadlist_text > a').map(function() {
          return {
              title: $(this).text(),
              url: 'http://tieba.baidu.com' + $(this).attr('href')
          }
      });

      var trimTitle = function(title, strict) {
          title = title.trim()
              .replace(/\.\.\.$/, '');

          if (strict) {
              title = title.replace(/第.*?章\s*/, '');
          }

          // if (toNum) {
          //     title = title.replace(/[零一二三四五六七八九十百千万亿]+/, cnNum2ArabNum);
          // }

          return title;
      };

      var findUrl = function(sTitle) {
          if (!sTitle) return;

          var url;
          $data.each(function(i, item) {
              var tiebaTitle = item.title;
              if (tiebaTitle.indexOf(trimTitle(sTitle)) > 0 ||
                  sTitle.indexOf(trimTitle(tiebaTitle, true)) > 0  // 包含贴吧标题的部分
              ) {
                  url = item.url;
                  return true;
              }
          });

          return url;
      };

      $('a:contains("搜索本章节")').each(function(){
          var $this = $(this),
              $thisLine = $this.parent().parent(),
              chapterTitle = $thisLine.prev().find('a[href^="/jump.php"]:first').text();

          var url = findUrl(chapterTitle);
          if (url) {
              $('<a>')
                  .attr({ target: '_blank', href: url })
                  .text('贴吧')
                  .appendTo($this.parent());
          }
      });
  }
};

toggleConsole(Setting.debug);

if (location.host.indexOf('booklink.me') > -1) {
  BookLinkMe.init();
} else {
  App.init();
}

}(Vue));
