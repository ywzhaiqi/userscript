
/**
 * 获取 substring 在 string 所有位置的数组
 *
 * @param {string} substring
 * @param {string} string
 * @returns {number[]}
 */
export function locations(substring, string){
  var a=[],i=-1;
  while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
  return a;
}