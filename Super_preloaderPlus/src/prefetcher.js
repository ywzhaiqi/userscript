
function prefetcher(SSS, floatWO, nextlink) {

	function cContainer() {
		var div = document.createElement('div');
		var div2 = div.cloneNode(false);
		var hr = document.createElement('hr');
		div.style.cssText = '\
			margin:3px!important;\
			padding:5px!important;\
			border-radius:8px!important;\
			-moz-border-radius:8px!important;\
			border-bottom:1px solid #E30005!important;\
			border-top:1px solid #E30005!important;\
			background-color:#F5F5F5!important;\
			float:none!important;\
		';
		div.title = '预读的内容';
		div2.style.cssText = '\
			text-align:left!important;\
			color:red!important;\
			font-size:13px!important;\
			display:block!important;\
			float:none!important;\
			position:static!important;\
		';
		hr.style.cssText = '\
			display:block!important;\
			border:1px inset #000!important;\
		';
		div.appendChild(div2);
		div.appendChild(hr);
		document.body.appendChild(div);
		return {
			div: div,
			div2: div2
		};
	}

	floatWO.updateColor('prefetcher');

	floatWO.updateColor('loading');
	floatWO.CmodeIcon('show');

	if (SSS.useiframe) {
		var iframe = document.createElement('iframe');
		iframe.name = 'superpreloader-iframe';
		iframe.src = nextlink;
		iframe.width = '100%';
		iframe.height = '0';
		iframe.frameBorder = "0";
		iframe.style.cssText = '\
			margin:0!important;\
			padding:0!important;\
		';
		iframe.addEventListener('load', function() {
			var body = this.contentDocument.body;
			if (body && body.firstChild) {
				floatWO.updateColor('prefetcher');
				floatWO.CmodeIcon('hide');
				floatWO.loadedIcon('show');
				this.removeEventListener('load', arguments.callee, false);

				if (SSS.lazyImgSrc) {
					handleLazyImgSrc(SSS.lazyImgSrc, body);
				}
			}
		}, false);
		if (SSS.viewcontent) {
			var container = cContainer();
			container.div2.innerHTML = 'iframe全预读: ' + '<br />' + '预读网址: ' + '<b>' + nextlink + '</b>';
			iframe.height = '300px';
			container.div.appendChild(iframe);
		} else {
			document.body.appendChild(iframe);
		}
	} else {
		GM_xmlhttpRequest({
			method: "GET",
			url: nextlink,
			overrideMimeType: 'text/html; charset=' + document.characterSet,
			onload: function(req) {
				var str = req.responseText;
				var doc = createDocumentByString(str, nextlink);
				if (!doc) {
					console.error('文档对象创建失败!');
					return;
				}

				if (SSS.lazyImgSrc) {
					handleLazyImgSrc(SSS.lazyImgSrc, doc);
				}

				var images = doc.images;
				var isl = images.length;
				var img;
				var iarray = [];
				var i;
				var existSRC = {};
				var isrc;
				for (i = isl - 1; i >= 0; i--) {
					isrc = images[i].getAttribute('src');
					if (!isrc || existSRC[isrc]) {
						continue;
					} else {
						existSRC[isrc] = true;
					}
					img = document.createElement('img');
					img.src = isrc;
					iarray.push(img);
				}
				if (SSS.viewcontent) {
					var containter = cContainer();
					var div = containter.div;
					i = iarray.length;
					containter.div2.innerHTML = '预读取图片张数: ' + '<b>' + i + '</b>' + '<br />' + '预读网址: ' + '<b>' + nextlink + '</b>';
					for (i -= 1; i >= 0; i--) {
						div.appendChild(iarray[i]);
					}
				}
				floatWO.updateColor('prefetcher');
				floatWO.loadedIcon('show');
				floatWO.CmodeIcon('hide');
			}
		});
	}
}
