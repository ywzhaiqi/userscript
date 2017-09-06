import $ from 'jquery'
import { uploadToServer } from './upload'
import { getMidCover } from './utils/fixCover'

function getBookInfo() {
  let url = location.pathname
  const $img = $('#cover-img img'),
    $desc = $('.m-bookdata .desc'),
    $detail = $('.m-bookdetail')

  return {
    url: url,
    sid: parseInt(url.match(/book\/(\d+)/)![1], 10),
    cover: $img.attr('src')!.replace(/!e$/, '!t'),  // 把大图换成小图
    title: $img.attr('alt'),
    rating: $desc.find('.u-stargrade .icon').attr('class')!.match(/grade(\d+)/)![1],
    authors: $detail.find('.u-author').text(),

    // 这些分类页面没有的
    isbn: $detail.find('.isbn').text().replace(/-/g, ''),
    wordCount: $detail.find('.size').text(),
    pubDate: $detail.find('.datePublished').text(),
    updated: $detail.find('.updated .data').text(),
  }
}

function getBookInfo2() {
  const dk_data = unsafeWindow.dk_data
  if (!dk_data) {
    console.error('windows 不存在 dk_data')
    return {}
  }

  let book = Object.assign({}, dk_data.book)

  // 改 _id
  book._id = book.id
  delete book.id

  // 统一 cover
  book.cover = getMidCover(book.cover)
  // 删除不需要的
  delete book['limited_time']
  delete book['uuid']
  // 转为数字
  book.sid = parseInt(book.sid, 10);
  ['price', 'new_price', 'old_price'].forEach(k => {
    book[k] = parseFloat(book[k])
  })

  return book
}

export async function getAndUpload() {
  let bookInfo = getBookInfo()
  let bookInfo2 = getBookInfo2()

  bookInfo = Object.assign(bookInfo, bookInfo2)

  try {
    await uploadToServer([bookInfo])
  } catch (e) {
    console.error('上传服务器失败', e)
    throw e
  }
}