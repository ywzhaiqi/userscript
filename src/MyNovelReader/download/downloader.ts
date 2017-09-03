import UI from '../UI.js'

enum SaveType { txt, epub, mobi }

interface InputOptions {
  parsers: any[]
  saveType: SaveType
}

class Downloader {
  saveType: SaveType
  chapters: string[]

  constructor(opt: InputOptions) {
    this.saveType = opt.saveType

    // 先保存已经加载的
    opt.parsers.forEach(this.addChapter)
    this.saveNext()
  }

  addChapter = (parser) => {
    switch(this.saveType) {
      case SaveType.epub:
        // TODO 存为 epub
        break
      case SaveType.mobi:
        break
      default:
        this.toTxt(parser)
    }

    var msg = '已下载 ' + this.chapters.length + ' 章，' +
    (parser.title || '')

    UI.message.loading(msg, 0);
  }

  toTxt(parser) {
    var html = $.nano('{chapterTitle}\n\n{contentTxt}', parser);
    this.chapters.push(html);
  }

  saveNext() {

  }
}