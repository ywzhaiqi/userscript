// ==UserScript==
// @id             ttmeiju@ywzhaiqi
// @name           ttmeiju  天天美剧直接链接
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://www.ttmeiju.com/*
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('a[title="磁力链"][href^="http://www.ttmeiju.com/download.php"]').each(function(){
	var $this = $(this);
	var url = $this.attr('href');
	$.get(url, function(data){
		var m = data.match(/replace\('(.*)'\)/);
		if (m)
			$this.attr('href', m[1]);
		else
			console.log(url, data);
	})
});

// $(document).on('mouseover', 'a[title="磁力链"]', function(e){
// 	var $this = $(this);
// 	// if ($this.attr('title') == 'BT') return;

// 	$.ajax({
// 		type: "get",
// 		url: $this.attr('href'),
// 		success: function(data, textStatus){
// 			var m = data.match(/replace\('(.*)'\)/);
// 			if (m)
// 				$this.attr('href', m[1]);
// 		},
// 		// error: function(xhr){
// 		// 	console.log("error", xhr);
// 		// }
// 	})
// });

