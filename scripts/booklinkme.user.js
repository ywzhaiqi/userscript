// ==UserScript==
// @id             booklinkme@ywzhaiqi@gmail.com
// @name           My booklink.me 增强
// @version        2.3
// @author         ywzhaiqi@gmail.com
// @description    首页一键打开所有未读链接
// @include        *://booklink.me/*
// @include        *://m.booklink.me/*
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_registerMenuCommand
// @connect        www.lwxs520.com
// @run-at         document-end
// @noframes
// @require https://greasyfork.org/scripts/32445-zepto-js-selector/code/Zeptojs%20+%20selector.js?version=212976
// @require https://greasyfork.org/scripts/6158-gm-config-cn/code/GM_config%20CN.js?version=207250
// ==/UserScript==

/* This script build by rollup. */
(function ($$1) {
  'use strict';

  

  function __$styleInject ( css ) {
      if(!css) return ;
  
      if(typeof(window) == 'undefined') return ;
      let style = document.createElement('style');
      style.setAttribute('media', 'screen');
      style.setAttribute('class', 'noRemove');
  
      style.innerHTML = css;
      document.head.appendChild(style);
      return css;
  }

  $$1 = $$1 && Object.prototype.hasOwnProperty.call($$1, 'default') ? $$1['default'] : $$1;

  __$styleInject(".mclicked {\n  color: #666666 !important;\n}\n");

  // 参考 https://github.com/madrobby/zepto/blob/master/src/detect.js

  const ua = navigator.userAgent;
  const platform = navigator.platform;

  const isFirefox = ua.match(/Firefox\/([\d.]+)/);

  const isChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);

  const isWindows = /Win\d{2}|Windows/.test(platform);

  /**
   * 根据 xpath 查找元素
   *
   * @export
   * @param {string} aXPath
   * @param {Node} aContext
   * @returns
   */
  function $x(aXPath, aContext) {
      var nodes = [];
      var doc = document;
      var aContext = aContext || doc;

      try {
          var results = doc.evaluate(aXPath, aContext, null,
              XPathResult.ANY_TYPE, null);
          var node;
          while (node = results.iterateNext()) {
              nodes.push(node);
          }
      } catch (ex) { }

      return nodes;
  }

  const config = {
    newsites: '红楼如此多骄,https://www.xuanshu.com/book/86811/,选书网'
  };

  function loadConfig() {
    Object.keys(GM_config.fields).forEach(function(keyStr) {
      var value = GM_config.get(keyStr);
      if (value) {
        config[keyStr] = value;
      }
    });
  }

  GM_config.init({
    id: 'my-booklink-plus',
    title: 'booklink.me 增强脚本',
    skin: 1,
    frameStyle: {
      width: '652px',
    },
    fields: {
      newsites: {
        label: '新增站点',
        type: 'textarea',
        placeholder: config.newsites
      }
    }
  });

  GM_registerMenuCommand('booklink 增强', function() {
    GM_config.open();
  });

  loadConfig();

  function insertToFirst(newUrl, text) {
    var firstLink = $x('//font[text()="补充链接"]/..')[0];
    firstLink.insertAdjacentHTML('beforebegin', `
      <a href="${newUrl}" target="_blank" style="margin-right: 3px;">
          <font color="red">${text}</font>
      </a>`);
    return firstLink
  }

  function fixErrorBook() {
    const thisPageBookName = $('h1').text().trim();
    const txt = config.newsites;
    txt.split('\n').forEach(line => {
      const [bookName, newUrl, newName] = line.split(/,|，/g);
      if (bookName == thisPageBookName) {
        insertToFirst(newUrl, newName || '我的补充');
      }
    });
  }

  class PcPage {
    init() {
      // MyNovelReader 已经内置
      // this.addUnreadButton()

      // 淡化排版较差的站点（目前用不到）
      // if (location.pathname == "/charpter.php") {
      //     hideChapterLink(
      //         "body > div > table > tbody > tr > td > table > tbody > tr > td > a > font",
      //         new RegExp([
      //             '读读看',  // 比较差
      //         ].join('|')),
      //     );
      // }
    }

    // 添加一键打开所有未读链接
    addUnreadButton() {
      var appendElem = $x("//td[text()='未读']")[0];
      if (!appendElem) return;

      var linkBtn = document.createElement("a");
      linkBtn.href = "javascript:void(0)";
      linkBtn.title = "一键打开所有未读链接";
      linkBtn.addEventListener("click", this._openAllUnreadLinks, false);

      var imgBtn = document.createElement("img");
      imgBtn.src = "me.png";
      imgBtn.style.maxWidth = "20px";

      linkBtn.appendChild(imgBtn);
      appendElem.appendChild(linkBtn);
      appendElem.style.width = "auto";

      console.info('新增功能：一键打开所有未读链接');
    }
    _openAllUnreadLinks(event) {
      event.preventDefault();

      var links = $x('./ancestor::table[@width="100%"]/descendant::a[img[@alt="未读"]]', event.target);
      links.forEach(function (link) {
        // 忽略没有盗版的
        var chapterLink = link.parentNode.nextSibling.nextSibling.querySelector('a');
        if (chapterLink.querySelector('font[color="800000"]')) {
          return;
        }

        if (isFirefox)
          link.click();
        else
          GM_openInTab(link.href);

        // 设置点击后的样式
        // 未读左边的 1x 链接
        link.parentNode.previousSibling.querySelector('font').setAttribute('color', Config.clickedColor);
        chapterLink.classList.add('mclicked');
      });
    }
  }

  class MobilePage {
    init() {
      this.setClickColor();

      this.addUnreadButton();

      // if (location.pathname === "/charpter.php") {
      //     /**
      //      * 手机端隐藏图片、排版较差的站点
      //      */
      //     hideChapterLink(
      //         ".hla a font",
      //         new RegExp([
      //             '啃书\(图\)', '来书屋', '浩奇',  // 可能为图片章节
      //             '读读看', '哈哈', '92to',  // 下一页有问题的
      //         ].join('|')),
      //     );
      // }
    }

    setClickColor() {
      const handleClick = function () {
        $$1(this).addClass('mclicked');
      };
      const linkBlank = function () {
        $$1(this).parent().attr('target', '_blank');
      };

      $$1('span:contains(未读)')
        .on('click', handleClick)
        .each(linkBlank);

      console.info('新增功能："N未读" 链接新标签打开，打开后变色');
    }

    addUnreadButton() {
      var mainElem = $x('//li[text()="主书架"]')[0];
      if (!mainElem) return;

      var unReadLinks = $x('id("m_main")/ul[1]//span[contains(text(), "未读")]');
      if (unReadLinks.length == 0) return;

      var openAllBtn = document.createElement("a");
      openAllBtn.href = "javascript:void(0)";
      openAllBtn.style.color = "red";
      openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
      var openOneLink = function () {
        var link = unReadLinks.pop().parentNode;
        link.setAttribute("target", "_blank");
        link.click();
        link.className = "mclicked";
        if (unReadLinks.length == 0) {
          openAllBtn.parentNode.removeChild(openAllBtn);
        } else {
          openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
        }
      };
      openAllBtn.addEventListener("click", function () {
        for (var i = 0; i < 4; i++) {
          openOneLink();
        }

        // openAllBtn.style.color = "#666666";
      }, false);

      mainElem.appendChild(openAllBtn);

      console.info('新增功能：一键打开所有未读链接');
    }
  }


  function run() {
    switch (location.hostname) {
      case "booklink.me":
        new PcPage().init();

        fixErrorBook();
        break;
      case "m.booklink.me":
        new MobilePage().init();
        break;
    }
  }

  run();

}(Zepto));
