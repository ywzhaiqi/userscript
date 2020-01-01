// ==UserScript==
// @id             getDoubanTop@ywzhaiqi
// @name           获取豆瓣 TOP 名单
// @version        1.0
// @namespace      
// @author         ywzhaiqi
// @description    
// @include        http://book.douban.com/top250
// @run-at         document-end
// ==/UserScript==


(function($){
	var parse = function(doc) {
		var $d = $(doc);
		var books = [];
		$d.find('.item').each(function(){
			var $this = $(this);
			var authorLine = $this.find('p.pl').text();

			books.push({
				title: $this.find('.pl2 > a').attr('title'),
				url: $this.find('.p12 > a').attr('href'),
				subTitle: $this.find('.pl2 > span').text(),
				author: authorLine.split('/')[0].trim()
			})
		});
		return books;
	};

	var books = parse(document);

	var infos = books.map(function(b) {
		return b.title + ' - ' + b.author;
	});

	console.log(infos.join('\n'))

})(unsafeWindow.jQuery);