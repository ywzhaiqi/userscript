// ==UserScript==
// @name           Video wipe ADs
// @version        20140419
// @namespace      Shuangya
// @author         Shuangya
// @modified       ywzhaiqi
// @description    去除国内视频网站的广告
// @match          http://v.youku.com/v_show/id*
// @match          http://www.letv.com/ptv/vplay*
// @match          http://www.iqiyi.com/v_*
// @match          http://v.ku6.com/show/*
// @match          http://v.qq.com/cover/*
// @match          http://tv.sohu.com/20*
// @grant          GM_xmlhttpRequest
// @icon           http://tb.himg.baidu.com/sys/portrait/item/0b43e3f1d1c4501a
// ==/UserScript==
(function(){

console.log('Video wipe ADs started!');

var sites = [
	//[名称,地址,选择方式,选择]
	['youku', 'http://v.youku.com/v_show', 'id', 'player'],
	['letv', 'http://www.letv.com/ptv/vplay', 'id', 'fla_box'],
	['iqiyi', 'http://www.iqiyi.com/v', 'id', 'flashbox'],
	['ku6', 'http://v.ku6.com/show/', 'id', 'kplayer'],
	['qq', 'http://v.qq.com/cover/', 'id', 'mod_player'],
	['sohu', 'http://tv.sohu.com/20', 'id', 'sohuplayer']
]

var url = window.location.href;
var ele = null;
var videoboxid;
for (var i = 0, len = sites.length, site; i < len; i++) {
	site = sites[i];
	if (url.indexOf(site[1]) >= 0) {
		if (site[2] == 'id') {
			ele = document.getElementById(site[3]);
			videoboxid = site[3];
			break;
		}
		//if (site[2]=='class') ele=document.getElementById(site[3]);
	}
}

if (ele === null) {
	return;
}

var yuanhtml;


var VIDEO_FORMAT = {
	normal: '标清',
	hight: '高清',
	super: '超清',
	super2: '原画'
};

var hasFormat = {
	normal: true,
	high: false,
	super: false,
	super2: false  // 原画，非全部支持
};

var parseHTML = function (html) {
	// firefox and chrome 30+
	var doc = new DOMParser().parseFromString(html, 'text/html');
	if (!doc) {
		doc = document.implementation.createHTMLDocument("");
		doc.querySelector('html').innerHTML = html;
	}
	return doc;
};

var getFlvcd = function(format, callback) {
	GM_xmlhttpRequest({
		method:"GET",
		overrideMimeType: 'text/html; charset=gb2312',
		url:'http://www.flvcd.com/parse.php?format=' + format + '&kw=' + encodeURIComponent(url),
		onload: function (res) {
			var doc = parseHTML(res.responseText);
			var input = doc.querySelector('input[name="inf"]');
			if (!input) {
				console.error('Flvcd 解析错误');
				return;
			}

			var urls = input.getAttribute('value');

			var format = 'normal';
			var name = doc.querySelector('input[name="name"]').getAttribute('value');
			if (name.match(/超清/)) {
				format = 'super';
			} else if (name.match(/高清/)) {
				format = 'high';
			} else if (name.match(/原画/)) {
				format = 'super2';
			}

			callback(urls, format);
		}
	});
};

var addFormatButton = function (urls, format) {
	var qxdiv = document.createElement('div');
	document.getElementsByTagName('body')[0].appendChild(qxdiv);
	qxdiv.style.position = 'fixed';
	qxdiv.style.zIndex = '6000';
	qxdiv.style.top = '50%';
	qxdiv.style.right = '0';
	qxdiv.style.backgroundColor = 'white';
	qxdiv.style.border = '1px solid rgb(221,221,221)';
	qxdiv.style.padding = '2px';
	qxdiv.style.borderRadius = '5px';
	qxdiv.innerHTML = '<input type="button"  onclick="CKobject.getObjectById(\'syplayer\').ckplayer_newaddress(\'{f->' +
		urls.replace(/\|$/gi, '') + '}\');" value="' + VIDEO_FORMAT[format]  + '" style="display:block;border:none;background:none;">';
	
	if (location.host.match(/youku/)) {
		qxdiv.style.paddingRight = '50px';
	}
};

var addPlayer = function (urls) {
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://git.oschina.net/sy/shuangya/raw/master/userjs/wipeads/ckplayer.js',
		onload:function(jdata){
			addScript(null, jdata.responseText);

			addScript(null,
				"var flashvars={f:'" + urls.replace(/\|$/gi, '') +
				"',c:0,v:100};var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always'};" + 
				"CKobject.embedSWF('http://www.ckplayer.com/ckplayer6.3/ckplayer.swf','" + videoboxid +
				"','syplayer','100%','100%',flashvars,params);");
		}
	});
};

var addScript = function(src, innerHTML) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if (src) {
		script.src = src;
	} else {
		script.innerHTML = innerHTML;
	}
	
	document.body.appendChild(script);
};

var remove = function() {
	ele.style.background = 'url(https://code.csdn.net/u014469252/shuangya/blob/master/userjs/wipeads/loading.png) no-repeat center center rgb(0,0,0)';
	yuanhtml = ele.innerHTML;
	ele.innerHTML = '';
};

var init = function() {
	getFlvcd('super', function(urls, format) {
		addFormatButton(urls, format);

		remove();

		addPlayer(urls);

		addScript('http://www.ckplayer.com/js6.2/offlights.js');
	});
}

init();


	// onload:function(vdata){
	// 	vdata=;
	// 	if (vdata.match(/<input type="hidden" name="inf"/i)==null) { //解析失败
	// 		ele.innerHTML=yuanhtml;
	// 		return false;
	// 	}
	// 	var burls=vdata.match(/<input type="hidden" name="inf" value="(.*?)"\/>/)[1];
		

	// 	if (vdata.match(/<b>高清版解析/i)!=null) {
	// 		hasgq=true;
	// 		console.log('Video Wipe ADs Log:has gaoqing');
	// 		GM_xmlhttpRequest({
	// 			method:"GET",
	// 			url:'http://www.flvcd.com/parse.php?format=high&kw='+encodeURIComponent(url),
	// 			onload:function(gvdata){
	// 				gvdata=gvdata.responseText;
	// 				var gurls=gvdata.match(/<input type="hidden" name="inf" value="(.*?)"\/>/)[1];
	// 				qxdiv.innerHTML+='<input type="button"  onclick="CKobject.getObjectById(\'syplayer\').ckplayer_newaddress(\'{f->'+gurls.replace(/\|$/gi,'')+'}\');" value="高清" style="display:block;border:none;background:none;">';
					
	// 				if (!hascq) {
	// 					addPlayer(gurls);
	// 				}
	// 			}
	// 		});
	// 	}
	// 	if (vdata.match(/<b>超清版解析/i)!=null) {
	// 		hascq=true;
	// 		console.log('Video wipe ADs Log:has chaoqing');
	// 		GM_xmlhttpRequest({
	// 			method:"GET",
	// 			url:'http://www.flvcd.com/parse.php?format=super&kw='+encodeURIComponent(url),
	// 			onload:function(cvdata){
	// 				cvdata=cvdata.responseText;
	// 				var curls=cvdata.match(/<input type="hidden" name="inf" value="(.*?)"\/>/)[1];
	// 				qxdiv.innerHTML+='<input type="button"  onclick="CKobject.getObjectById(\'syplayer\').ckplayer_newaddress(\'{f->'+curls.replace(/\|$/gi,'')+'}\');" value="超清" style="display:block;border:none;background:none;">';
					
	// 				addPlayer(curls);
	// 			}
	// 		});
	// 	}

	// 	if (!hasgq && !hascq) {
	// 		addPlayer(burls);
	// 	}


})();