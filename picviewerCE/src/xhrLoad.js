/**
 * 提取自 Mouseover Popup Image Viewer 脚本，用于 xhr 方式的获取
 */
var xhrLoad = function() {
	var _ = {};

	var caches = {};
	var handleError;

	/**
	 * @param  q  图片的选择器或函数
	 * @param  c  图片说明的选择器或函数
	 */
	function parsePage(url, q, c, post, cb) {
		downloadPage(url, post, function(html) {
			var iurl, cap, doc = createDoc(html);
			if(typeof q == 'function') {
				iurl = q(html, doc);
			} else {
				var inode = findNode(q, doc);
				iurl = inode ? findFile(inode, url) : false;
			}
			if(typeof c == 'function') {
				cap = c(html, doc);
			} else {
				var cnode = findNode(c, doc);
				cap = cnode ? findCaption(cnode) : false;
			}

			// 缓存
			if (iurl) {
				caches[url] = {
					iurl: iurl,
					cap: cap
				};
			}

			cb(iurl, cap);
		});
	}

	function downloadPage(url, post, cb) {
		var opts = {
			method: 'GET',
			url: url,
			onload: function(req) {
				try {
					if(req.status > 399) throw 'Server error: ' + req.status;
					cb(req.responseText, req.finalUrl || url);
				} catch(ex) {
					handleError(ex);
				}
			},
			onerror: handleError
		};
		if(post) {
			opts.method = 'POST';
			opts.data = post;
			opts.headers = {'Content-Type':'application/x-www-form-urlencoded','Referer':url};
		}

		GM_xmlhttpRequest(opts);
	}

	function createDoc(text) {
		var doc = document.implementation.createHTMLDocument('picViewerCE');
		doc.documentElement.innerHTML = text;
		return doc;
	}

	function findNode(q, doc) {
		var node;
		if (!Array.isArray(q)) q = [q];
		for (var i = 0, len = q.length; i < len; i++) {
			node = qs(q[i], doc);
			if (node) break;
		}
		return node;
	}

	function findFile(n, url) {
		var path = n.src || n.href;
		return path ? path.trim() : false;
	}

	function findCaption(n) {
		return n.getAttribute('content') || n.getAttribute('title') || n.textContent;
	}

	function qs(s, n) {
		return n.querySelector(s);
	}

	_.load = function(opt) {
		var info = caches[opt.url];
		if (info) {
			opt.cb(info.iurl, info.cap);
			return;
		}

		handleError = opt.onerror || function() {};

		parsePage(opt.url, opt.xhr.q, opt.xhr.c, opt.post, opt.cb);
	};

	return _;
}();
