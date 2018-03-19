import $ from 'jquery'
import { uploadToServer } from './upload'

function getBookInfosFromDom($doc, category='') {
  let $list = $doc.find('.j-list')

  return $list.find('.j-bookitm').map((i, el) => {
    let $this = $(el),
      $cover = $this.find('.cover'),
      $info = $this.find('.info');

    let _id = $this.data('id'),
      url = $cover.find('a').attr('href'),
      fullUrl = 'http://www.duokan.com' + url,
      sid = url!.match(/\/book\/(\d+)/)![1],
      rating = $info.find('.u-stargrade .icon').attr('class')!.match(/grade(\d+)/)![1],
      ratingNum = $info.find('.u-stargrade .num').text().match(/(\d+)/)![1],
      price = $this.find('.u-price em').text().replace('¥ ', '')

    return {
      _id,
      sid: parseInt(sid, 10),
      cover: $cover.find('img').attr('src'),
      url,
      title: $info.find('.title').text(),
      description: $info.find('.desc').text(),

      // http://schema.org/AggregateRating
      rating: parseInt(rating, 10),
      ratingNum: parseInt(ratingNum, 10),
      category,

      // eval 获取里面有的（可能会被覆盖）
      price: parseFloat(price),
      authors: $info.find('.u-author').text().trim(),
    }
  }).toArray()
}

// 只获取二级 category，否则数据库无法识别是哪一级
function tryGetCategory(pathname=location.pathname) {
  let category = ''

  if (pathname == '/list/1-1-1') {  // 排除全部图书
    return category
  }

  category = $('.level2 .checked a span').text()

  return category
}

/**
 * 自动上传书籍信息到服务器
 *
 * @returns
 */
export async function getAndUpload() {
  const $doc = $(document)
  let category = tryGetCategory()
  let infos = getBookInfosFromDom($doc, category)

  if (!infos.length) {
    console.info('没找到 infos')
    return false
  }

  try {
    await uploadToServer(infos)
  } catch (e) {
    console.error('上传服务器失败', e)
    throw e
  }
}