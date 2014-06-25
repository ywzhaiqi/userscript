// ==UserScript==
// @name        txt reader
// @namespace   txt reader
// @include     file://*.txt
// @include     file://*.txt#*
// @exclude     http://www.rfc-editor.org/*
// @version     0.21a
// @grant       none
// ==/UserScript==

/*
 * 暂只支持简体中文,只在firefox下测试过
 */

//是否是开发模式
 var devmode = false;
 var timestamp;

var isRecoverText = false;
var CSS = "\
	p { font-size: 18px; text-indent: 2em; }\
	h2 { font-size: 30px; fontWeight: bold; }\
";

//--------------------------------整体布局--------------------------------
document.body.style.margin = "0";
document.body.style.padding = "0";
var pageLayout = document.createElement("div");
pageLayout.style.margin = "0 auto";
pageLayout.style.padding = "0";
pageLayout.style.height = "100%";
pageLayout.style.width = "1224px";
pageLayout.style.borderLeft = "1px solid #999";
pageLayout.style.borderRight = "1px solid #999";
document.body.appendChild(pageLayout);

//创建索引显示框，向左浮动
var index_containter = document.createElement("div");
var index_box = document.createElement("div");
index_containter.id = "index_containter";
index_containter.style.height = "100%";
index_containter.style.cssFloat = "left";
index_containter.style.overflow = "auto";
index_containter.style.backgroundColor = "#F3F2EE";
index_containter.style.width = "219px";
index_containter.appendChild(index_box);
index_box.id = "index_box";
index_box.style.margin = "0 10px";
index_box.style.paddingTop = "5px";
pageLayout.appendChild(index_containter);

//分割线
var split_line = document.createElement("div");
split_line.style.width = "1px";
split_line.style.height = "100%";
split_line.style.cssFloat = "left";
split_line.style.backgroundColor = "#999";
pageLayout.appendChild(split_line);

//创建正文显示框，外边距浏览器默认
var text_containter = document.createElement("div");
var text_box = document.createElement("div");
text_containter.id = "text_containter";
text_box.id = "text_box";
text_containter.style.cssFloat = "left";
text_containter.style.width = "1002px";
text_containter.style.height = "100%";
text_containter.style.margin = "0 1px";
text_containter.style.overflowY = "auto";
text_containter.style.overflowX = "hidden";
text_box.style.width = "904px";
text_box.style.padding = "24px 50px 24px 48px";
text_box.style.backgroundColor = "#F3F2EE";
//text_box.style.backgroundImage = "url(file:///home/zbfs/Desktop/bg.png)";
text_containter.appendChild(text_box);
pageLayout.appendChild(text_containter);


//--------------------------------文本获取、分段和清理工作开始----------------------
if (devmode) {
	timestamp = new Date();
}
//获取原始文本
var originalText = document.getElementsByTagName("pre")[0].innerHTML;

//清除页面文本
document.body.removeChild(document.getElementsByTagName("pre")[0]);

//定义段落文本替换规则
var replacerules = {

	// ===特殊字符===
	"[◎♂]": "",

	// ===去网页代码===
	"&gt;": ">",
	"&lt;": "<",
	"<[a-z/\u0021\u0025\u002D][\u0000-\u003D\u003F-\uFFFF]{0,200}>": "",
	"^//": "",

	// ===去无关段落===
	".*(求收藏|求推荐|求订阅|ps：|由“.*”提供|最新、最快、最火的连载作品尽在).*": "",

	// ===括号内容过滤===
	"\u0028.*(祝大家|未完待续|百度搜|WW|精品小说|章节|小说更快更好|网网|138看网|本站|即可找到).*\u0029": "",

	// ===大括号内容过滤===
	"\u007B.*(首发全文字网).*\u007D": "",

	// ===去网址===
	"(bxwx.org|Qisuu.сom)": "",

	// ===提示性文字过滤===
	"正文 ": "",

	// 屏蔽字还原，长度优先策略
	// ===四字还原===
	"十之\\*{2}": "十之八九",
	"十有\\*{2}": "十有八九",
	"\\*{2}不离十": "八九不离十",
	"感\\*{2}彩": "感情色彩",
	"赤身\\*{2}": "赤身裸体",
	"dang然无存": "荡然无存",

	// ===三字还原===
	"\\*{2}分": "八九分",
	"shou不了": "受不了",
	"笑mimi": "笑眯眯",

	// ===双字还原===
	"仈ji[ǔu]": "八九",
	"z[iì]\\s*y[oó]u": "自由",
	"j[īi]ng神": "精神",
	"软j[iì]n": "软禁",
	"j[ǐi]ng觉": "警觉",
	"j[ǐi]ng告": "警告",
	"j[iì]女": "妓女",
	"j[iì]院": "妓院",
	"j[ǐi]ng惕": "警惕",
	"激ān": "奸",
	"j[īi]ng美": "精美",
	"j[īi]ng力": "精力",
	"z[iì]ji": "自己",
	"yiy[aà]ng": "一样",
	"y[ǐi]j[īi]ng": "已经",
	"专j[īi]ng": "专精",
	"yidi[aǎ]n": "一点",
	"zhid[aà]o": "知道",
	"dif[aā]ng": "地方",
	"sh[ìi]ji[eè]": "世界",
	"jiēchu": "接触",
	"shime": "什么",
	"ruguo": "如果",
	"gu[aā]nxi": "关系",
	"mingb[aá]i": "明白",
	"shihou": "时候",
	"j[īi]ngyàn": "经验",
	"j[īi]liè": "激烈",
	"赤luo": "赤裸",
	"q[īi]ngch[ǔu]": "清楚",
	"tur[aá]n": "突然",
	"qigu[aà]i": "奇怪",
	"残ren": "残忍",
	"不ren": "不忍",
	"xiu炼": "修炼",
	"shiji[aā]n": "时间",
	"rongyi": "容易",
	"t[eè]bi[eé]": "特别",
	"p[aá]ngbi[aā]n": "旁边",
	"w[èe]izh[ìi]": "位置",
	"m[aǎ]ny[ìi]": "满意",
	"hou宫": "后宫",
	"f[eè]nnu": "愤怒",
	"(政|Z|zh[eè]ng)(f[uǔ]|府)": "政府",
	"ji合": "集合",
	"k[àa]ngy[ìi]": "抗议",
	"暴[l1][uù]": "暴露",
	"hún[1l]uan": "混乱",
	"míhuo": "迷惑",
	"动dang": "动荡",
	"疑huo": "疑惑",
	"困huo": "困惑",

	// ===单字还原===
	"c[aā]o": "操",
	"ch[āa]": "插",
	"chou": "抽",
	"dàng": "荡",
	"féi": "肥",
	"g[aāà]n": "干",
	"gu[àa]": "挂",
	"hu[aá]ng": "黄",
	"hu[aā]": "花",
	"ji[aā]n": "奸",
	"ji[āa]o": "交",
	"jīng": "精",
	"jǐng": "警",
	"jì": "妓",
	"mo": "摸",
	"n[ǎa]i": "奶",
	"nong": "弄",
	"pi[aá]o": "嫖",
	"r[ìi]": "日",
	"rou": "肉",
	"s[āa]o": "骚",
	"s[èe]": "色",
	"xi[ǎa]o": "小",
	"x[ìi]ng": "性",
	"y[īi]n": "阴"

};
    
//文本替换函数
function recoverText(text) {
    for (var key in replacerules) {
        text = text.replace(new RegExp(key, "ig"), replacerules[key]);
    }
    return text;
}

if (isRecoverText) {
	originalText = recoverText(originalText);
}

//分割段落
var parags = originalText.split(new RegExp("[\n\r]+"));

//去首尾空格和文本替换
for (var i = 0; i < parags.length; i++) {
	// parags[i] = recoverText(parags[i].replace(/^\s+|\s+$/g, ""));
	parags[i] = parags[i].replace(/^\s+|\s+$/g, "");
}

if (devmode) {
	alert("文本获取、分段和清理工作完成，耗时：" + (new Date().getTime() - timestamp.getTime()));
}
//--------------------------------文本获取、分段和清理工作结束----------------------

//--------------------------------文本排版工作开始---------------------------
if (devmode) {
	timestamp = new Date();
}
//定义前言关键字
var prefaceTags = ["序","序章","序言","前言", "前章", "引言","摘要","楔子","背景简介"];

//定义章节关键字
var sectionTags = ["章","节","回","卷","折","篇","幕","集"];

//定义后记关键字
var postscriptTags = ["后记","附言","结语"];

//是否为标题
var titleRex = new RegExp("^[<《].+[>》]$");
function isTitle(str) {
	return str.match(titleRex);
}

//是否为前言
var prefaceRex0 = new RegExp("^("+prefaceTags.join("|")+")$");
var prefaceRex1 = new RegExp("^("+prefaceTags.join("|")+")\\s");
function isPrefaceStr(str) {
	if (str.match(prefaceRex0)) {
		return true;
	}
	if (str.match(prefaceRex1)) {
		return true;
	}
	return false;
}

//定义章节匹配正则
var sectionRex0 = new RegExp("^第\\s*[0-9〇零一二三四五六七八九十百千万亿]+\\s*["+sectionTags.join("")+"]$");
var sectionRex1 = new RegExp("^第\\s*[0-9〇零一二三四五六七八九十百千万亿]+\\s*["+sectionTags.join("")+"]\\s");
function matchSectionStr(str) {
	var headline0 = str.match(sectionRex0);
	if (headline0 != null) {
		return headline0.toString().substr(-1);
	}
	var headline1 = str.match(sectionRex1);
	if (headline1 != null) {
		return headline1.toString().slice(-2, -1);
	}
	return null;
}

//是否为后记
function isPostscriptStr(str) {
	for (var i = 0; i < postscriptTags.length; i++) {
		if (str == postscriptTags[i]) {
			return true;
		}
	}
	return false;
}

//匹配到的章节关键字列表
var sectionTagStack = [];

//依次匹配章节
for (var i in parags) {
	var sectionTag = matchSectionStr(parags[i]);
	if (sectionTag != null) {
		var tagI = sectionTagStack.join("").indexOf(sectionTag);//查找关键字之前出现层
		if (tagI == -1) { //之前未匹配到过该章节关键字
			sectionTagStack.push(sectionTag);
		}
	}
}

// //正文文本样式
// var textStyle = {
// 	textIndent: "2em",
// 	fontSize: "12pt",
// 	color: "#000"
// }

//文章标题样式
// var titleStyle = {
// 	fontSize: "21pt",
// 	fontWeight: "bold"
// }

//统一章节标题样式
var unifromHeadlineStyle = {
	marginBottom: "0",
	marginTop: "1em",
	verticalAlign: "middle",
	color: "#000"
}

//标题样式，从底层往上倒排,覆盖上面样式
var headlineStyles = [
	{
		fontSize: "12pt",
		fontWeight: "bold"
	},{
		fontSize: "13pt",
		fontWeight: "bold"
	},{
		fontSize: "14pt",
		fontWeight: "bold"
	},{
		fontSize: "15pt",
		fontWeight: "bold"
	},{
		fontSize: "16pt",
		fontWeight: "bold"
	},{
		fontSize: "17pt",
		fontWeight: "bold"
	},{
		fontSize: "18pt",
		fontWeight: "bold"
	},{
		fontSize: "19pt",
		fontWeight: "bold"
	},{
		fontSize: "20pt",
		fontWeight: "bold"
	}
];

var style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

//绘制文本
for (var i in parags) {
	if (isTitle(parags[i])) {
		var p = document.createElement("h2");
		// for (var k in titleStyle) {
		// 	p.style[k] = titleStyle[k];
		// }
		p.appendChild(document.createTextNode(parags[i]));
		text_box.appendChild(p);
		continue;
	}
	if (isPrefaceStr(parags[i]) || isPostscriptStr(parags[i])) {//如果前言或结语
		var p = document.createElement("p");
		var iTagI = sectionTagStack.length;
		if (iTagI >= headlineStyles.length) {
			iTagI = headlineStyles.length - 1;
		}
		for (var k in unifromHeadlineStyle) {
			p.style[k] = unifromHeadlineStyle[k];
		}
		for (var k in headlineStyles[iTagI-1]) {
			p.style[k] = headlineStyles[iTagI-1][k];
		}
		p.setAttribute("sectionlevel", "0");
		p.appendChild(document.createTextNode(parags[i]));
		text_box.appendChild(document.createElement("br"));
		text_box.appendChild(p);
		var hr = document.createElement("hr");
		hr.style.margin = "4px -4px";
		text_box.appendChild(hr);
		continue;
	}
	var sectionTag = matchSectionStr(parags[i]);
	if (sectionTag == null) { //不是章节标题
		var p = document.createElement("p");
		// for (var k in textStyle) {
		// 	p.style[k] = textStyle[k];
		// }
		p.appendChild(document.createTextNode(parags[i]));
		text_box.appendChild(p);
	} else {
		var p = document.createElement("p");
		var tagI = sectionTagStack.join("").indexOf(sectionTag); //查找关键字之前出现层
		var iTagI = sectionTagStack.length - tagI; //获取倒排层
		if (iTagI >= headlineStyles.length) {
			iTagI = headlineStyles.length - 1;
		}
		for (var k in unifromHeadlineStyle) {
			p.style[k] = unifromHeadlineStyle[k];
		}
		for (var k in headlineStyles[iTagI-1]) {
			p.style[k] = headlineStyles[iTagI-1][k];
		}
		p.setAttribute("sectionlevel", tagI);
		p.appendChild(document.createTextNode(parags[i]));
		text_box.appendChild(document.createElement("br"));
		text_box.appendChild(p);
		var hr = document.createElement("hr");
		hr.style.margin = "4px -4px";
		text_box.appendChild(hr);
		text_box.appendChild(document.createElement("br"));
	}
}

if (devmode) {
	alert("文本排版工作完成，耗时：" + (new Date().getTime() - timestamp.getTime()));
}
//--------------------------------文本排版工作结束--------------------------

//--------------------------------索引生成工作开始--------------------------
if (devmode) {
	timestamp = new Date();
}

//索引根节点
var indexRootNode = {
	name: "索引",
	level: -1,
	children: []
};

//索引游标
var cursorIndex

//生成索引树
var pArray = document.getElementsByTagName("p");
var headlines = [];
for (var i = 0; i < pArray.length; i++) {
	if (pArray[i].getAttribute("sectionlevel") != null) {
		headlines.push(pArray[i]);
	}
}
cursorIndex = indexRootNode;
for (var i = 0; i < headlines.length; i++) {
	while (cursorIndex.level >= headlines[i].getAttribute("sectionlevel")) {
		cursorIndex = cursorIndex.parent;
	}
	if (cursorIndex.children.length != 0 && headlines[i].childNodes[0].data == cursorIndex.children[cursorIndex.children.length - 1].name) {
		cursorIndex = cursorIndex.children[cursorIndex.children.length - 1];
	} else {
		var a = document.createElement("a");
		var iNode = cursorIndex;
		while (iNode != indexRootNode) {
			a.name = iNode.dom.childNodes[0].data + " -> " + a.name;
			iNode = iNode.parent;
		}
		a.name = a.name + headlines[i].childNodes[0].data;
		headlines[i].setAttribute("name", a.name);
		headlines[i].appendChild(a);
		var childIndex = {
			name: headlines[i].childNodes[0].data,
			level: headlines[i].getAttribute("sectionlevel"),
			children: [],
			parent: cursorIndex,
			dom: headlines[i]
		}
		cursorIndex.children.push(childIndex);
		cursorIndex = childIndex;
	}
}

//绘制索引节点函数
function drawIndex(indexNode, container) {
	var indexDiv = document.createElement("div");
	var headDiv = document.createElement("div");
	var iconSpan = document.createElement("span");
	var nameSpan = document.createElement("a");
	indexDiv.style.whiteSpace = "nowrap";
	if (indexNode.children.length > 0) {
		iconSpan.appendChild(document.createTextNode("▶ "));
		iconSpan.style.verticalAlign = ".05em";
		iconSpan.style.cursor = "pointer";
		iconSpan.onclick = function () {
			if (childrenDiv.style.display == "none") {
				childrenDiv.style.display = "block";
				iconSpan.childNodes[0].data = "▼ "
			} else {
				childrenDiv.style.display = "none";
				iconSpan.childNodes[0].data = "▶ "
			}
		}
	} else {
		iconSpan.appendChild(document.createTextNode("▶ "));
		iconSpan.style.verticalAlign = ".05em";
		iconSpan.style.visibility = "hidden";
	}
	nameSpan.appendChild(document.createTextNode(indexNode.name));
	nameSpan.style.color = "black";
	nameSpan.style.textDecoration = "none";
	if (indexNode.dom != null) {
		nameSpan.href = "#" + indexNode.dom.getAttribute("name");
	}
	nameSpan.style.whiteSpace = "nowrap";
	nameSpan.style.width = index_box.style.width.slice(0, -2) + "px";
	headDiv.appendChild(iconSpan);
	headDiv.appendChild(nameSpan);
	headDiv.style.textIndent = new Number(indexNode.level) + "em";
	headDiv.style.verticalAlign = "middle";
	indexDiv.appendChild(headDiv);
	var childrenDiv = document.createElement("div");
	childrenDiv.style.display = "none"
	indexDiv.appendChild(childrenDiv);
	container.appendChild(indexDiv);
	for (var i = 0; i < indexNode.children.length; i++) {
		drawIndex(indexNode.children[i], childrenDiv);
	}
}

//绘制索引
for (var i = 0; i < indexRootNode.children.length; i++) {
	drawIndex(indexRootNode.children[i], index_box);
}

if (devmode) {
	alert("索引生成工作完成，耗时：" + (new Date().getTime() - timestamp.getTime()));
}
//--------------------------------索引生成工作完成--------------------------

//--------------------------------关闭后自动恢复功能(HTML5)------------------
var filename = window.location.pathname.split('/').pop();
//保存当前位置
text_containter.onscroll = function () {
	localStorage[filename + "-lastTextPosition"] = this.scrollTop;
}
//滚动到上次位置
if (localStorage[filename + "-lastTextPosition"] != null) {
	text_containter.scrollTop = localStorage[filename + "-lastTextPosition"];
}
//--------------------------------自动恢复功能完成(HTML5)--------------------
