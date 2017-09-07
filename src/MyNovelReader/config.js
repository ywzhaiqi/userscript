
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
  download_delay: 100,  // 毫秒。0 毫秒下载起点 vip 限时免费章节会被封
  dumpContentMinLength: 3,        // 检测重复内容的最小行数

  // 实验性的（TODO）
  // TODO: Greasemonkey 无效，unsafeWindow 也不行
  setting_load_by_message: false,
};

export const fontawesomeWoff = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff'

export default config;