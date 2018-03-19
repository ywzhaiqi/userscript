import { $x, GM_request } from '../common/utils'
import config from './config'


async function getAndInsertFirst(url) {
  let html = await GM_request(url);
  var doc = new DOMParser().parseFromString(html, 'text/html')

  if (url.includes('www.lwxs520.com')) {
    var chapters = $x('//div[@class="dccss"]/a', doc);
    var lastChapter = chapters[chapters.length - 1];

    insertToFirst(url, lastChapter.textContent)
  }
}

function insertToFirst(newUrl, text) {
  var firstLink = $x('//font[text()="补充链接"]/..')[0];
  firstLink.insertAdjacentHTML('beforebegin', `
      <a href="${newUrl}" target="_blank" style="margin-right: 3px;">
          <font color="red">${text}</font>
      </a>`)
  return firstLink
}

export function fixErrorBook() {
  let newUrl;
  switch (location.pathname) {
    case '/book-1-1009272444.html':  // 维秘女模的经纪人：内容错误
      // const newUrl = 'http://www.wangshuge.com/books/109/109265/';
      newUrl = 'http://www.wutuxs.com/html/7/7221/'

      insertToFirst(newUrl, '我的补充')
      console.info('新增：我的补充 链接')
      break;
    case '/book-10-3146622.html':  // 重生在跑道上：内容只有乐文是正确的
      newUrl = 'http://www.lwxs520.com/books/74/74985/index.html'

      insertToFirst(newUrl, config['重生在跑道上'])
      console.info('新增：我的补充 链接')
      break;
  }
}