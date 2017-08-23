
import cnNum2ArabNum from './cnNum2ArabNum'

function getNumFromChapterTitle(title) {
  if (!title) return;

  let m = title.match(/第(\d+)章/)
  if (m) {
    return parseInt(m[1], 10)
  }

  // 第二十二章
  m = title.match(/(?:第|^)([一二两三四五六七八九十○零百千万亿]+){1,6}章/)
  if (m) {
    return cnNum2ArabNum(m[1])
  }
}

export default getNumFromChapterTitle