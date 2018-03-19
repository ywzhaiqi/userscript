import config from './config'
import Parser from './parser'
import { loading } from './components/message'
import App from './app'
import {saveAs, isWindows} from './utils'
import getNumFromChapterTitle from './utils/getNumFromChapterTitle'

const chapters = [];

const fileName = {
  bookTitle: '',
  ext: '.txt',
  start: 0,
  end: 0,

  setBookTitle(bookTitle) {
    this.bookTitle = bookTitle
  },
  setStart(chapterTitle) {
    let num = getNumFromChapterTitle(chapterTitle)
    if (num) {
      this.start = num
    }
  },
  setEnd(chapterTitle) {
    let num = getNumFromChapterTitle(chapterTitle)
    if (num) {
      this.end = num
    }
  },

  toString() {
    let start = this.start || ''
    let end = this.end || ''
    let count = chapters.length;

    return `${this.bookTitle || '未知名称'}(${start} - ${end},共${count}章)${this.ext}`
  }
};

function toTxt(parser) {
  var html = $.nano('{chapterTitle}\n\n{contentTxt}', parser);
  chapters.push(html);

  var msg = '已下载 ' + chapters.length + ' 章，' +
      (parser.chapterTitle || '')

  loading(msg, 0);
};

function finish(parser) {
  var allTxt = chapters.join('\n\n');
  if (isWindows) {
      allTxt = allTxt.replace(/\n/g, '\r\n');
  }

  fileName.setEnd(parser.chapterTitle)

  saveAs(allTxt, fileName.toString());
};

function getOnePage(parser, nextUrl, endFn) {
  var isEnd = false;
  if (parser) {
      toTxt(parser);
      nextUrl = parser.nextUrl;
      isEnd = parser.isTheEnd;
  }

  if (!nextUrl || isEnd) {
      console.log('全部获取完毕');
      finish(parser);
      if (typeof endFn == 'functiton') {
        endFn()
      }
      return;
  }

  if (App.site.useiframe) {
      // App.iframeRequest(nextUrl);
      return;
  }

  setTimeout(function() {
    console.log('[存为txt]正在获取：', nextUrl)
    App.httpRequest(nextUrl, function(doc) {
        if (doc) {
            var par = new Parser(App.site, doc, nextUrl);
            par.getAll(getOnePage)
        } else {
            console.error('超时或连接出错');
            finish();
            endFn()
        }
    });
  }, config.download_delay)
};

function run(cachedParsers=[], endFn) {
  console.log(`[存为txt]每章下载延时 ${config.download_delay} 毫秒`)

  cachedParsers.forEach(toTxt);

  var firstParser = cachedParsers[0]
  fileName.setBookTitle(firstParser.bookTitle);
  fileName.setStart(firstParser.chapterTitle)

  var lastParser = cachedParsers[cachedParsers.length - 1];
  getOnePage(null, lastParser.nextUrl, endFn);
}

export default run