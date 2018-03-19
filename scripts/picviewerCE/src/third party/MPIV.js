
/**
 * 兼容 Mousever Popup Image Viewer 脚本规则
 * 规则说明地址：http://w9p.co/userscripts/mpiv/host_rules.html
 */
var MPIV = (function() {

	var hosts = Rule.MPIV;

	var d = document, wn = window;
	var cfg = {
		thumbsonly: true,
	};
	// 我新加的
	var rgxHTTPs = /^https?:\/\/(?:www\.)?/;

	function loadRule() {
		var rules = Rule.MPIV;

		var isStringFn = function(a) {
			return typeof a == 'string' && a.indexOf('return ') > -1;
		};

		rules.forEach(function(h) {
			try {
				if(h.r) h.r = toRE(h.r, 'i');
				if(isStringFn(h.s)) h.s = new Function('m', 'node', h.s);
				if(isStringFn(h.q)) h.q = new Function('text', 'doc', h.q);
				if(isStringFn(h.c)) h.c = new Function('text', 'doc', h.c);
			} catch(ex) {
				console.error('MPIV 规则无效: %o', h, ex);
			}
		});

		var filter = function(hn, h) {
			return !h.d || hn.indexOf(h.d) > -1;
		};

		hosts = rules.filter(filter.bind(null, location.hostname));

		return hosts;
	}

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
	 * 我新增了特殊的替换模式
	 * 规则：
	 *   {"r":"hotimg\\.com/image", "s":"/image/direct/"}
	 *   把 image 替换为 direct ，就是 .replace(/image/, "direct")
	 */
	function replace(s, m, r, http) {
		if(!m) return s;

		if (r && s.startsWith('r;')) {  // 特殊的替换模式
			s = m.input.replace(r, s.slice(2));
		} else if(s.indexOf('/') === 0) {
			var mid = /[^\\]\//.exec(s).index+1;
			var end = s.lastIndexOf('/');
			var re = new RegExp(s.substring(1, mid), s.substr(end+1));
			s = m.input.replace(re, s.substring(mid+1, end));
		} else {
			for(var i = m.length; i--;) {
				s = s.replace('$'+i, m[i]);
			}
		}

		if (!s.startsWith('http') && http) {
			return http + s;
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
		return n.tagName && n.tagName.toUpperCase();
	}

	function qs(s, n) {
		return n.querySelector(s);
	}

	function parseNode(node) {
		var a, img, url, info;
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
		for(var i = 0, len = hosts.length, tn = tag(node), h, m, html, urls, URL, http; i < len && (h = hosts[i]); i++) {
			if(h.e && !matches(node, h.e) || h == skipHost) continue;
			if(h.r) {
				if(h.html && !noHtml && (tn == 'A' || tn == 'IMG' || h.e)) {
					if(!html) html = node.outerHTML;
					m = h.r.exec(html)
				} else if(url) {
					// 去掉前面的 https://
					URL = url.replace(rgxHTTPs, '');
					http = url.slice(0, url.length - URL.length);
					m = h.r.exec(URL);
				} else {
					m = null;
				}
			} else {
				m = url ? /.*/.exec(url) : [];
			}
			if(!m || tn == 'IMG' && !('s' in h)) continue;
			if('s' in h) {
				urls = (Array.isArray(h.s) ? h.s : [h.s]).map(function(s) { if(typeof s == 'string') return decodeURIComponent(replace(s, m, h.r, http)); if(typeof s == 'function') return s(m, node); return s; });
				if(Array.isArray(urls[0])) urls = urls[0];
				if(urls[0] === false) continue;
				urls = urls.map(function(u) { return u ? decodeURIComponent(u) : u; });
			} else {
				urls = [m.input];
			}
			if((h.follow === true || typeof h.follow == 'function' && h.follow(urls[0])) && !h.q) return findInfo(urls[0], node, false, h);

			// debug('MPIV 找到的规则是 %o', h);
			return {
				node: node,
				url: urls.shift(),
				urls: urls,
				r: h.r,
				s: h.s,
				q: h.q,
				c: h.c,
				// g: h.g ? loadGalleryParser(h.g) : h.g,
				xhr: h.xhr,
				post: typeof h.post == 'function' ? h.post(m) : h.post,
				follow: h.follow,
				css: h.css,
				// manual: h.manual,
				distinct: h.distinct,
				// rect: rect(node, h.rect)
			};
		};
	}

	// TODO
	function rulesToString(rules) {
		var newRules = [];

		rules.forEach(function(h) {
			var newInfo = {}
			Object.keys(h).forEach(function(key) {
				if (key == 'r') {
					newInfo.r = h.r instanceof RegExp ?
							h.r.toString() : null;
				}

			});
		});
	}

	return {
		parseNode: parseNode,
		findInfo: findInfo,
		loadRule: loadRule,
	}

})();
