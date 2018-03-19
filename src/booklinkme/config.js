
const config = {
  '重生在跑道上': '乐文目录'
}

// 动态生成
function createField() {
  const fields = {}
  Object.keys(config).forEach(k => {
    fields[k] = {
      label: k,
      type: 'text',
      default: config[k],
    }
  })

  return fields
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
    width: '400px',
  },
  fields: createField(),
})

GM_registerMenuCommand('booklink 增强', function() {
  GM_config.open()
})

loadConfig()

export default config