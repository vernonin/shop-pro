export const request = (params) => {
  const baseURl = 'https://api-hmugo-web.itheima.net'
  return new Promise((resolve, reject) => {
    wx.request({
     ...params,
     url: baseURl + params.url,
     success: (reslut) => {
      resolve(reslut)
     },
     fail: (err) => {
      reject(err)
     }
    })
  })
}