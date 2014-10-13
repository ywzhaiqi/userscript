
var engineListData = {
    custom: '',
    my: GM_getResourceText('siteData_my'),
    simple: GM_getResourceText('siteData_simple'),
    wenke: GM_getResourceText('siteData_wenke'),
};

var ICON_DATA = JSON.parse(GM_getResourceText('ICON_DATA'));

var MAIN_CSS = GM_getResourceText('MAIN_CSS');

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

var engineListIntroduce = getMStr(function() {/*
<div>
    <h2>分类规则：</h2>
    <i>【名称最好不要更改，类别跟站点规则有个对应关系】</i>
    <p>1、"音乐-5" 或 "音乐-音悦Tai"，代表类别是 "音乐"，图标使用下面的第5个，即音悦台的图标，否则使用默认的第1个。</p>
    <p>2、"dev--百度百科"，代表插入到 "百度百科" 搜索的前面</p>
    <p>3、"其它--购物"，代表插入到 "购物" 类别的最后一个</p>
</div>
<div>
    <h2>搜索引擎规则：</h2>
    <code>名称，地址（%s 关键字）， 编码（特殊的填gbk），站点图标</code>
    <p>1、"//" 开头会被忽略</p>
    <p>2、中间分隔符：中文逗号（，） 或 英文逗号 + 空格（, ）</p>
    <p>3、编码可省略，可直接填站点图标，站点图标也可省略</p>
    <p>4、POST 方式</p>
</div>
 */});

function introduceToHtml() {
    return engineListIntroduce.replace(/(（.*?）)/g, '<span>$1</span>')
            .replace(/"(.*?)"/g, '<span>$1</span>')
}

function isTheSameCategory(c1, c2) {
    return (categoryMap[c1] || c1) == (categoryMap[c2] || c2);
}
