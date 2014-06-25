// ==UserScript==
// @name           Video wipe ADs
// @version        20140412
// @namespace      Shuangya
// @author         Shuangya
// @modified       ywzhaiqi
// @description    去除国内视频网站的广告
// @include        http://v.youku.com/v_show/id*
// @include        http://www.letv.com/ptv/vplay*
// @include        http://www.iqiyi.com/v_*
// @include        http://v.ku6.com/show/*
// @include        http://v.qq.com/cover/*
// @include        http://tv.sohu.com/20*
// @grant          GM_xmlhttpRequest
// @icon           http://tb.himg.baidu.com/sys/portrait/item/0b43e3f1d1c4501a
// updateURL      http://firefox.sylingd.com/script/source/8.meta.js
// downloadURL    http://firefox.sylingd.com/script/source/8.user.js
// ==/UserScript==

(function(){

console.log('Video wipe ADs started!');

var sites = [
	// [名称,地址,选择方式,选择]
	['youku', 'http://v.youku.com/v_show', 'id', 'player'],
	['letv', 'http://www.letv.com/ptv/vplay', 'id', 'fla_box'],
	['iqiyi', 'http://www.iqiyi.com/v', 'id', 'flashbox'],
	['ku6', 'http://v.ku6.com/show/', 'id', 'kplayer'],
	['qq', 'http://v.qq.com/cover/', 'id', 'mod_player'],
	['sohu', 'http://tv.sohu.com/20', 'id', 'sohuplayer']
]


var locationHref = window.location.href;
var playerElem,
	playerID,
	oPlayerHTML;  // 原始播放器的 innerHTML

for (var i = 0, len = sites.length, site; i < len; i++) {
	site = sites[i];
	if (locationHref.indexOf(site[1]) >= 0) {
		if (site[2] == 'id') {
			playerElem = document.getElementById(site[3]);
			playerID = site[3];
			break;
		}
		//if (site[2]=='class') playerElem=document.getElementById(site[3]);
	}
}

if (!playerElem) {
	return;
}


var VIDEO_FORMAT = {
	normal: '标清',
	high: '高清',
	super: '超清',
	// super2: '原画'
};

var CSS = function() {/*
	.gm-video-selected {
		color: red;
	}
	#gm-video-format-container {
		position: fixed;
		zIndex: 6000;
		top: 40%;
		right: 0;
		backgroundColor: white;
		border: 1px solid rgb(221,221,221);
		padding: 2px;
		borderRadius: 5px;
	}
*/}.toString().match(/\/\*([\s\S]+)\*\//)[1];


var parseHTML = function(html) {
	var doc;
	try {
		// firefox and chrome 30+，Opera 12 会报错
		doc = new DOMParser().parseFromString(html, 'text/html');
	} catch (ex) {}

	if (!doc) {
		doc = document.implementation.createHTMLDocument("");
		doc.querySelector('html').innerHTML = html;
	}
	return doc;
};

var addScript = function(src, text) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if (src) {
		script.src = src;
	} else if (text) {
		script.textContent = text;
	}

	document.body.appendChild(script);
};

var addStyle = function(text) {
	var style = document.createElement('style');
	style.textContent = text;
	document.head.appendChild(style);
};

var addPlayer = function (urls) {
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://git.oschina.net/sy/shuangya/raw/master/userjs/wipeads/ckplayer.js',
		onload:function(jdata){
			addScript(null, jdata.responseText);

			var scriptText = "var flashvars={f:'" + urls.replace(/\|$/gi, '') + "',c:0,v:100};" +
				"var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always'};" + 
				"CKobject.embedSWF('http://www.ckplayer.com/ckplayer6.3/ckplayer.swf','" +
				playerID + "','syplayer','100%','100%',flashvars,params);";

			addScript(null, scriptText);
		}
	});
};

var clean = function() {
	playerElem.style.background = 'url(https://code.csdn.net/u014469252/shuangya/blob/master/userjs/wipeads/loading.png) no-repeat center center rgb(0,0,0)';
	oPlayerHTML = playerElem.innerHTML;
	playerElem.innerHTML = '';
};

var createFormatButton = function(urls, format, isSelected) {
	var button = document.createElement('a');
	button.setAttribute('style', 'display:block;border:none;background:none;');
	button.innerHTML = VIDEO_FORMAT[format];

	if (isSelected) {
		button.classList.add('gm-video-selected');
	}

	var address = '{f->' + urls.replace(/\|$/gi, '') + '}';
	button.setAttribute('onclick',
		'CKobject.getObjectById("syplayer").ckplayer_newaddress("' + address + '");' +
		'jQuery(".gm-video-selected").removeClass("gm-video-selected");' +
		'jQuery(this).addClass("gm-video-selected");'
		);
	return button;
};

var addFormatContainer = function () {
	var qxdiv = document.createElement('div');
	qxdiv.id = 'gm-video-format-container';

	if (location.host.match(/youku/)) {
		qxdiv.style.right = '50px';
	}

	document.body.appendChild(qxdiv);

	return qxdiv;
};

var getFlvcd = function(format, callback) {
	GM_xmlhttpRequest({
		method:"GET",
		overrideMimeType: 'text/html; charset=gb2312',
		url:'http://www.flvcd.com/parse.php?format=' + format + '&kw=' + encodeURIComponent(locationHref),
		onload: function (res) {
			var doc = parseHTML(res.responseText);
			var input = doc.querySelector('input[name="inf"]');
			if (!input) {
				console.error('Flvcd 解析错误');
				return;
			}

			var urls = input.getAttribute('value');

			var newFormat = 'normal';
			var name = doc.querySelector('input[name="name"]').getAttribute('value');
			for (var f in VIDEO_FORMAT) {
				if (name.indexOf(VIDEO_FORMAT[f]) > 0) {
					newFormat = f;
					break;
				}
			}

			callback(urls, newFormat);
		}
	});
};

var init = function() {

	addStyle(CSS);

	getFlvcd('super', function(urls, format) {
		var container = addFormatContainer();
		
		container.appendChild(createFormatButton(urls, format, true));

		clean();

		addPlayer(urls);

		addScript('http://www.ckplayer.com/js6.2/offlights.js');

		// 添加其他清晰度
		var formats = Object.keys(VIDEO_FORMAT);
		formats.reverse();
		var others = formats.slice(formats.indexOf(format) + 1, formats.length);
		others.forEach(function(fom){
			getFlvcd(fom, function(u, f){
				container.appendChild(createFormatButton(u, f));
			});
		});
	});
}

init();


})();