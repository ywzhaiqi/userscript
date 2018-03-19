// ==UserScript==
// @name           WeiPhoneDownloadHelper
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @version        1.3.2
// @description    批量下载威锋论坛的电子书
// @homepageURL    https://greasyfork.org/scripts/668/
// @updateURL      https://greasyfork.org/scripts/668/code.meta.js
// @downloadURL    https://greasyfork.org/scripts/668/code.user.js

// @include        http://bbs.feng.com/read-htm-tid-*.html
// @include        http://bbs.feng.com/thread-htm-fid-*.html
// @include        http://bbs.feng.com/forum.php*
// @run-at         document-end
// @grant          none
// ==/UserScript==

var $ = jQuery;

var RES = getMStr(function(){
	var html;
	/*
	<div>
		<button id="downloadButton">批量下载</button>
		<div id="batchPublish" style="display: none;">
			<div id="batchHeader">
				<a id="closeButton" class="aui_close" href="javascript:;">×</a>
			</div>
			<div id="batchContent">
				<pre id="batchedlink"></pre>
			</div>
		</div>
		<div id="batchNotice" style="display:none">
		</div>
	</div>
	 */
	var cssText;
	/*
		#downloadButton {
			position:fixed;
			top:80px;
			right:8px;
			z-index: 100;
		}
		#batchPublish {
			position:fixed;
			z-index:1001;
			top:40%;
			left:35%;
			width: 530px;
			background:white;
			border: 3px solid #AAA;
		}
		#batchedlink {
			height: 250px;
			overflow: scroll;
		}
		#batchNotice {
			position:fixed;
			z-index:1001;
			top:10%;
			left:35%;
			background: #F9EDBE;
			box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
			border: 1px solid #FBDA91;
			padding: 5px;
		}
		#batchNotice > b {
			margin-left: 5px;
		}
	 */
});


var locationHref = location.href;

locationHref.match(/thread-htm-fid|mod=forumdisplay/) && (function(){

	$('#bbs_top_news, #forum_rules_224').hide();

	var hideText = [
		"网易《迷你西游》手游公测",
		"3D纯正中国风《水浒英雄》",
		"【软件】感恩父母，免费下载：【快速问医生】",
		"【软件】随时随地 移动视频！酷6视频软件介绍",
		"威锋手游控：玩《龙纹三国》",
		"《放开那三国》威锋版火爆上线",
		"《天天爱萌仙》",
		"炉石传说",
		"同步推",
		"苹果手游",
		"苹果助手",
		"兔兔助手",
		"同步推",
		"赢iPad mini",
		"得iPhone",
		"iPad mini2大奖",
        "删档封测火爆开启"
	];

	// 隐藏置顶广告的行
	$('tbody[id^="stickthread_"]').each(function(row){
        if ($(this).find('span[id^="rushtimer_"]').length) {
            $(this).hide();
            return;
        }

		var text = $(this).text();
		for (var i = 0, l = hideText.length; i < l; i++) {
			if (text.indexOf(hideText[i]) != -1) {
				$(this).hide();
				return;
			}
		}
	});
})()

locationHref.match(/read-htm-tid|mod=viewthread/) && (function(){

	var preUrl = location.origin,
		attachSelector = '.attnm > a, span[id^="attach_"] > a',
		$attachs = $(attachSelector);

	if ($attachs.size() == 0) {
		return;
	}

	$('<style>').html(RES.cssText).appendTo('head');

	$(RES.html).appendTo('body');

	$('#closeButton').click(function(){
		$('#batchPublish').hide();
	})

	$('#downloadButton').attr('title', '共 ' + $attachs.size() + ' 个附件').click(function(){
		var links = $.makeArray($(attachSelector))
			$batchNotice = $('#batchNotice');
		var downUrls = [];

		$batchNotice.html('正在获取中...' + '<b>1/' + links.length + '</b>')
			.show();

		function handleResult() {
			if (links.length > 0) {
				$batchNotice.html('正在获取中...' + '<b>' + downUrls.length + '/' + links.length + '</b>');
				getDownloadLink();
			} else {
				var urls = downUrls.join('\n');
				// console.log(urls);

				$batchNotice.hide();
				$('#batchedlink').html(urls);
				$('#batchPublish').show();

				// 高亮选中文本
				var selection = window.getSelection();
				var range = document.createRange();
				range.selectNodeContents($('#batchedlink')[0]);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		}

		function getDownloadLink() {
			var link = links.shift();
			if (!link) return;

			var url = link.href;
			if (url.indexOf('aid=') > 0) {
				downUrls.push(url);
				handleResult();
			} else {
				var m = link.getAttribute('onclick').match(/jQuery.get\('(.*?)',/);
				if (m) {
					var url = m[1];
					$.get(url, {}, function(data){
						var downUrl = $('<div>').html(data).find('a:first').attr('href');
						downUrl = preUrl + downUrl;
						downUrls.push(downUrl)

						handleResult();
					});
				}
			}
		}

		getDownloadLink()
	});

})()



// 从函数中获取多行注释的字符串
function getMStr(fn) {
    var fnSource = fn.toString();
    var ret = {};
    fnSource = fnSource.replace(/^[^{]+/, '');
    // console.log(fnSource);
    var matched;
    var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
    while (matched = reg.exec(fnSource)) {
        // console.log(matched);
        ret[matched[1]] = matched[2];
    };

    return ret;
}
