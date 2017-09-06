
interface Window {
  reader: any
  dkbson: any

  // /book/153145 页面才有的
  dk_data: any
}

interface JQueryStatic {
  getBSON(url: string, success?: Function, fail?: Function): any
  getBSONP(url: string, success?: Function, fail?: Function): any
}