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
			var iurl, iurls = [], cap, doc = createDoc(html);

			if(typeof q == 'function') {
				iurl = q(html, doc);
			} else {
				var inodes = findNodes(q, doc);
				inodes.forEach(function(node) {
					iurls.push(findFile(node, url));
				});
				iurl = iurls.shift();
			}

			if(typeof c == 'function') {
				cap = c(html, doc);
			} else {
				var cnodes = findNodes(c, doc);
				cap = cnodes.length ? findCaption(cnode[0]) : false;
			}

			// 缓存
			if (iurl) {
				caches[url] = {
					iurl: iurl,
					iurls: iurls,
					cap: cap
				};
			}

			cb(iurl, iurls, cap);
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

	function findNodes(q, doc) {
		var nodes = [],
			node;
		if (!Array.isArray(q)) q = [q];
		for (var i = 0, len = q.length; i < len; i++) {
			node = qs(q[i], doc);
			if (node) {
				nodes.push(node);
			}
		}
		return nodes;
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
			opt.cb(info.iurl, info.iruls, info.cap);
			return;
		}

		handleError = opt.onerror || function() {};

		parsePage(opt.url, opt.xhr.q, opt.xhr.c, opt.post, opt.cb);
	};

	return _;
}();
