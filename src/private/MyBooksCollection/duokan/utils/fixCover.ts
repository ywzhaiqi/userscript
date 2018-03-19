
/*
多看封面的几种大小

48 * 64：http://cover.read.duokan.com/mfsv2/download/fdsc3/p01yXLTVZ32Q/TO24div2gfVflO.jpg!vt

96：* 128：http://cover.read.duokan.com/mfsv2/download/fdsc3/p01yXLTVZ32Q/TO24div2gfVflO.jpg!t

256 * 341：http://cover.read.duokan.com/mfsv2/download/fdsc3/p01yXLTVZ32Q/TO24div2gfVflO.jpg!e
 */

export function getMidCover(url: string) {
  return url.replace(/!vt$|!e/, '!t')
}