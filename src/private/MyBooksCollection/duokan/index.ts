import * as listPage from './listPage'
import * as bookPage from './bookPage'

function run() {
  if (location.host != 'www.duokan.com') return

  const pathname = location.pathname
  switch(true) {
    case pathname.startsWith('/r/'):  // 榜单、精品免费
    case pathname.startsWith('/list/'):  // 分类页面
      listPage.getAndUpload()
      break;
    case pathname.startsWith('/book/'):
      bookPage.getAndUpload()
      break;
  }
}

run()