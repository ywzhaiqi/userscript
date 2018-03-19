import { UPLOAD_URL } from '../config'


export function uploadToServer(infos) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: UPLOAD_URL,
      data: JSON.stringify(infos),
      dataType: 'json',
      contentType: 'application/json',
      success(data) {
        if (data.message) {
          reject(data.message)
        } else {
          let allSize = infos.length
          let createdSize = data.length

          console.log(`[${createdSize} / ${allSize}] 已上传到数据库`, data)
          resolve(data)
        }
      },
      error() {
        reject()
      }
    });
  });
}