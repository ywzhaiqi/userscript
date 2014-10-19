
/**
 * 兼容 Mousever Popup Image Viewer 脚本规则
 * @return {[type]} [description]
 */
var MPIV = (function() {
	// 规则说明地址：http://w9p.co/userscripts/mpiv/host_rules.html

	var hosts = Rule.MPIV;

	var d = document, wn = window;
	var cfg = {
		thumbsonly: true,
	};

	function hasBg(node) {
		return node ? wn.getComputedStyle(node).backgroundImage != 'none' && node.className.indexOf('YTLT-') < 0 : false;
	}

	function rel2abs(rel, abs) {
		if(rel.indexOf('//') === 0) rel = 'http:' + rel;
		var re = /^([a-z]+:)?\/\//;
		if(re.test(rel))  return rel;
		if(!re.exec(abs)) return;
		if(rel[0] == '/') return abs.substr(0, abs.indexOf('/', RegExp.lastMatch.length)) + rel;
		return abs.substr(0, abs.lastIndexOf('/')) + '/' + rel;
	}

	/**
	 *   {"r":"hotimg\\.com/image", "s":"/image/direct/"}
	 *   把 image 替换为 direct ，就是 .replace(/image/, "direct")
	 */
	function replace(s, m) {
		if(!m) return s;
		if(s.indexOf('/') === 0) {
			var mid = /[^\\]\//.exec(s).index+1;
			var end = s.lastIndexOf('/');
			var re = new RegExp(s.substring(1, mid), s.substr(end+1));
			return m.input.replace(re, s.substring(mid+1, end));
		}
		for(var i = m.length; i--;) {
			s = s.replace('$'+i, m[i]);
		}
		return s;
	}

	function rect(node, q) {
		if(q) {
			var n = node;
			while(tag(n = n.parentNode) != 'BODY') {
				if(matches(n, q)) return n.getBoundingClientRect();
			}
		}
		var nodes = node.querySelectorAll('*');
		for(var i = nodes.length; i-- && (n = nodes[i]);) {
			if(n.offsetHeight > node.offsetHeight) node = n;
		}
		return node.getBoundingClientRect();
	}

	function matches(n, q) {
		var p = Element.prototype, m = p.mozMatchesSelector || p.webkitMatchesSelector || p.oMatchesSelector || p.matchesSelector || p.matches;
		if(m) return m.call(n, q);
	}

	function tag(n) {
		return n.tagName.toUpperCase();
	}

	function qs(s, n) {
		return n.querySelector(s);
	}

	function parseNode(node) {
		var a, img, url, info;
		// if(!hosts) hosts = loadHosts();
		if(tag(node) == 'A') {
			a = node;
		} else {
			if(tag(node) == 'IMG') {
				img = node;
				if(img.src.substr(0, 5) != 'data:') url = rel2abs(img.src, location.href);
			}
			info = findInfo(url, node);
			if(info) return info;
			a = tag(node.parentNode) == 'A' ? node.parentNode : (tag(node.parentNode.parentNode) == 'A' ? node.parentNode.parentNode : false);
		}
		if(a) {
			if(cfg.thumbsonly && !(img || qs('i', a) || a.rel == 'theater') && !hasBg(a) && !hasBg(a.parentNode) && !hasBg(a.firstElementChild)) return;
			url = a.getAttribute('data-expanded-url') || a.getAttribute('data-full-url') || a.getAttribute('data-url') || a.href;
			if(url.substr(0, 5) == 'data:') url = false;
			else if(url.indexOf('//t.co/') > -1) url = 'http://' + a.textContent;
			info = findInfo(url, a);
			if(info) return info;
		}
		if(img) return {url:img.src, node:img, rect:rect(img), distinct:true};
	}

	function findInfo(url, node, noHtml, skipHost) {
		for(var i = 0, len = hosts.length, tn = tag(node), h, m, html, urls; i < len && (h = hosts[i]); i++) {
			if(h.e && !matches(node, h.e) || h == skipHost) continue;
			if(h.r) {
				if(h.html && !noHtml && (tn == 'A' || tn == 'IMG' || h.e)) {
					if(!html) html = node.outerHTML;
					m = h.r.exec(html)
				} else if(url) {
					m = h.r.exec(url);
				} else {
					m = null;
				}
			} else {
				m = url ? /.*/.exec(url) : [];
			}
			if(!m || tn == 'IMG' && !('s' in h)) continue;
			if('s' in h) {
				urls = (Array.isArray(h.s) ? h.s : [h.s]).map(function(s) { if(typeof s == 'string') return decodeURIComponent(replace(s, m)); if(typeof s == 'function') return s(m, node); return s; });
				if(Array.isArray(urls[0])) urls = urls[0];
				if(urls[0] === false) continue;
				urls = urls.map(function(u) { return u ? decodeURIComponent(u) : u; });
			} else {
				urls = [m.input];
			}
			if((h.follow === true || typeof h.follow == 'function' && h.follow(urls[0])) && !h.q) return findInfo(urls[0], node, false, h);
			return {
				node: node,
				url: urls.shift(),
				urls: urls,
				r: h.r,
				q: h.q,
				c: h.c,
				// g: h.g ? loadGalleryParser(h.g) : h.g,
				xhr: h.xhr,
				post: typeof h.post == 'function' ? h.post(m) : h.post,
				follow: h.follow,
				css: h.css,
				manual: h.manual,
				distinct: h.distinct,
				// rect: rect(node, h.rect)
			};
		};
	}

	return {
		findInfo: findInfo,
		parseNode: parseNode
	}

})();
