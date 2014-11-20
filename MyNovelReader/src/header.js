
var isChrome = !!window.chrome;
var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

// 其它设置
var config = {
    soduso: false,                  // www.sodu.so 跳转
    content_replacements: true,     // 小说屏蔽字修复
    fixImageFloats: true,           // 图片居中修正
    paragraphBlank: true,           // 统一段落开头的空格为 2个全角空格
    end_color: "#666666",           // 最后一页的链接颜色
    PRELOADER: true,                // 提前预读下一页
};

var READER_AJAX = "reader-ajax";   // 内容需要 ajax 的 className
