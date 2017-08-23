import './meta'
import style from './index.css'
// import $ from 'zepto'
import { isFirefox, GM_request, $x } from '../common/utils'

GM_addStyle(style)

const config = {
  clickedColor: "666666",
};

// booklink.me 隐藏符合文字的链接
function hideChapterLink(selector, textReg) {
  var links = document.querySelectorAll(selector),
    link;
  for (var i = links.length - 1; i >= 0; i--) {
    link = links[i];
    if (textReg.test(link.innerHTML)) {
      link.style.color = "rgba(128, 128, 128, 0.54)";
    }
  }
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

    console.info('新增功能：一键打开所有未读链接')
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
      $(this).addClass('mclicked')
    }
    const linkBlank = function () {
      $(this).parent().attr('target', '_blank')
    }

    $('span:contains(未读)')
      .on('click', handleClick)
      .each(linkBlank)

    console.info('新增功能："N未读" 链接新标签打开，打开后变色')
  }

  addUnreadButton() {
    var mainElem = $x('//li[text()="主书架"]')[0];
    if (!mainElem) return;

    var unReadLinks = $x('id("m_main")/ul[1]//span[contains(text(), "未读")]');
    if (unReadLinks.length == 0) return;

    var openAllBtn = document.createElement("a");
    openAllBtn.href = "javascript:void(0)"
    openAllBtn.style.color = "red";
    openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
    var openOneLink = function () {
      var link = unReadLinks.pop().parentNode;
      link.setAttribute("target", "_blank");
      link.click()
      link.className = "mclicked";
      if (unReadLinks.length == 0) {
        openAllBtn.parentNode.removeChild(openAllBtn)
      } else {
        openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)"
      }
    };
    openAllBtn.addEventListener("click", function () {
      for (var i = 0; i < 4; i++) {
        openOneLink()
      }

      // openAllBtn.style.color = "#666666";
    }, false);

    mainElem.appendChild(openAllBtn);

    console.info('新增功能：一键打开所有未读链接')
  }
}

class BookPage {
  init() {
    let newUrl;
    switch (location.pathname) {
      case '/book-1-1009272444.html':  // 维秘女模的经纪人：内容错误
        // const newUrl = 'http://www.wangshuge.com/books/109/109265/';
        newUrl = 'http://www.wutuxs.com/html/7/7221/'

        this.insertToFirst(newUrl, '我的补充')
        console.info('新增：我的补充 链接')
        break;
      case '/book-10-3146622.html':  // 重生在跑道上：内容只有乐文是正确的
        newUrl = 'http://www.lwxs520.com/books/74/74985/index.html'

        this.insertToFirst(newUrl, '乐文目录')
        // this.getAndInsertFirst(newUrl)
        console.info('新增：我的补充 链接')
        break;
    }
  }

  insertToFirst(newUrl, text) {
    var firstLink = $x('//font[text()="补充链接"]/..')[0];
    firstLink.insertAdjacentHTML('beforebegin', `
        <a href="${newUrl}" target="_blank" style="margin-right: 3px;">
            <font color="red">${text}</font>
        </a>`)
    return firstLink
  }

  async getAndInsertFirst(url) {
    let html = await GM_request(url);
    var doc = new DOMParser().parseFromString(html, 'text/html')

    if (url.includes('www.lwxs520.com')) {
      var chapters = $x('//div[@class="dccss"]/a', doc);
      var lastChapter = chapters[chapters.length - 1];

      this.insertToFirst(url, lastChapter.textContent)
    }
  }
}

function run() {
  switch (location.hostname) {
    case "booklink.me":
      new PcPage().init();

      new BookPage().init()
      break;
    case "m.booklink.me":
      new MobilePage().init();
      break;
  }
}

run()