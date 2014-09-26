
/*
    分类规则：
        【最好不要修改，类别跟站点规则会有个对应】
        1、"音乐-5" 或 "音乐-音悦Tai"，代表类别是 "音乐"，图标使用下面的第5个，即音悦台的图标，否则使用默认的第1个。
        2、"dev--百度百科"，代表插入的位置为 "百度百科" 前面
        3、
    搜索引擎规则：
        名称，地址（关键字变量用%s代替）， 编码（默认utf-8，可填gbk），站点图标
      说明：
        1. "//" 开头会被忽略
        2. 中间分隔符：中文逗号（，） 或 英文逗号 + 空格（, ）
        3. 编码可省略，直接填站点图标
        4. 站点图标也可省略，如果不存在会根据地址的域名生成一个默认图标地址，例如 http://www.baidu.com/favicon.ico。但如果有些站点的站点图标不是这个地址，请手动填写。
        5. POST 方式
 */
var engineListDataStr = getMStr(function(){/*
<%= siteDataStr %>
*/});


// rules 和 englineList 的对应
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
