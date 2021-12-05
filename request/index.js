
// 同时发送异步代码的次数
let ajaxTiem = 0
export const request = (params) => {
  ajaxTiem++;
  // 显示加载效果 
  wx.showLoading({
    title: '拼命加载数据中',
    mask: true
  })
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
     },
     complete: () =>{
      ajaxTiem--;
      if(ajaxTiem === 0) {
        wx.hideLoading()
      }
     }
    })
  })
}