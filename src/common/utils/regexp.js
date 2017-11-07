
export function toReStr(str) {  // 处理字符串，否则可能会无法用正则替换
  return str.replace(/[()\[\]{}|+.,^$?\\*]/g, "\\$&");
}

export function wildcardToRegExpStr(urlstr) {
  if (urlstr.source) return urlstr.source;
  var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
      return str === "*" ? ".*" : "[^/]*";
  });
  return "^" + reg + "$";
}