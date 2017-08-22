import { $x, isFirefox } from './lib'

var BookLinkMe = {
  clickedColor: "666666",

  init: function() {

      this.addUnreadButton();

      // if (location.pathname.indexOf("/book-") === 0) {
      //     this.chapterPageAddTiebaLink();
      // }
  },
  addUnreadButton: function(){  // 添加一键打开所有未读链接
      var $parent = $('td[colspan="2"]:contains("未读"):first, td[colspan="2"]:contains("未讀"):first');
      if(!$parent.length) return;

      var openAllUnreadLinks = function(event){
          event.preventDefault();

          var links = $x('./ancestor::table[@width="100%"]/descendant::a[img[@alt="未读"]]', event.target);
          links.forEach(function(link){
              // 忽略没有盗版的
              var chapterLink = link.parentNode.nextSibling.nextSibling.querySelector('a');
              if (chapterLink.querySelector('font[color*="800000"]')) {
                  return;
              }

              if(isFirefox)
                  link.click();
              else
                  GM_openInTab(link.href);

              // 设置点击后的样式
              // 未读左边的 1x 链接
              link.parentNode.previousSibling.querySelector('font')
                  .setAttribute('color', BookLinkMe.clickedColor);
              chapterLink.classList.add('mclicked');
          });
      };


      $('<a>')
          .attr({ href: 'javascript:;', title: '一键打开所有未读链接', style: 'width:auto;' })
          .click(openAllUnreadLinks)
          .append($('<img src="me.png" style="max-width: 20px;">'))
          .appendTo($parent);
  },
  chapterPageAddTiebaLink: function() {
      var link = $('font:contains("贴吧")').parent().get(0);
      if (!link) return;

      var tiebaUrl = 'http://tieba.baidu.com/f?kw=' + $('h1').text();
      console.log('GM_xmlhttpRequest', tiebaUrl);
      GM_xmlhttpRequest({
          method: "GET",
          url: tiebaUrl,
          onload: function(response) {
              var doc = parseHTML(response.responseText);
              BookLinkMe.load(doc);
          }
      });
  },
  load: function(doc) {
      var $data = $(doc).find('.threadlist_text > a').map(function() {
          return {
              title: $(this).text(),
              url: 'http://tieba.baidu.com' + $(this).attr('href')
          }
      });

      var trimTitle = function(title, strict) {
          title = title.trim()
              .replace(/\.\.\.$/, '');

          if (strict) {
              title = title.replace(/第.*?章\s*/, '');
          }

          // if (toNum) {
          //     title = title.replace(/[零一二三四五六七八九十百千万亿]+/, cnNum2ArabNum);
          // }

          return title;
      };

      var findUrl = function(sTitle) {
          if (!sTitle) return;

          var url;
          $data.each(function(i, item) {
              var tiebaTitle = item.title;
              if (tiebaTitle.indexOf(trimTitle(sTitle)) > 0 ||
                  sTitle.indexOf(trimTitle(tiebaTitle, true)) > 0  // 包含贴吧标题的部分
              ) {
                  url = item.url;
                  return true;
              }
          });

          return url;
      };

      $('a:contains("搜索本章节")').each(function(){
          var $this = $(this),
              $thisLine = $this.parent().parent(),
              chapterTitle = $thisLine.prev().find('a[href^="/jump.php"]:first').text();

          var url = findUrl(chapterTitle);
          if (url) {
              $('<a>')
                  .attr({ target: '_blank', href: url })
                  .text('贴吧')
                  .appendTo($this.parent());
          }
      });
  }
};

export default BookLinkMe