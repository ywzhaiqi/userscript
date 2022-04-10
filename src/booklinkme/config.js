
const config = {
  newsites: '红楼如此多骄,https://www.xuanshu.com/book/86811/,选书网'
}

function loadConfig() {
  Object.keys(GM_config.fields).forEach(function(keyStr) {
    var value = GM_config.get(keyStr);
    if (value) {
      config[keyStr] = value
    }
  })
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
})

GM_registerMenuCommand('booklink 增强', function() {
  GM_config.open()
})

loadConfig()

export default config