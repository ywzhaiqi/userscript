
function cnNum2ArabNum(cn){
  var arab, parts, cnChars = '零一二三四五六七八九'

  if (!cn) {
      return 0
  }

  if (cn.indexOf('亿') !== -1){
      parts = cn.split('亿')
      return cnNum2ArabNum(parts[0]) * 1e8 + cnNum2ArabNum(parts[1])
  }

  if (cn.indexOf('万') !== -1){
      parts = cn.split('万')
      return cnNum2ArabNum(parts[0]) * 1e4 + cnNum2ArabNum(parts[1])
  }

  if (cn.indexOf('十') === 0){
      cn = '一' + cn
  }

  arab = cn
      .replace(/[零一二三四五六七八九]/g, function (a) {
          return '+' + cnChars.indexOf(a)
      })
      .replace(/(十|百|千)/g, function(a, b){
          return '*' + (
              b == '十' ? 1e1 :
              b == '百' ? 1e2 : 1e3
          )
      })

  return (new Function('return ' + arab))()
}

export default cnNum2ArabNum