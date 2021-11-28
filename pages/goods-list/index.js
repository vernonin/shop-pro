// pages/goods-list/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ]
  },
  onLoad: function (options) {
    console.log(options);
  },
  handleTabsItemChange(e) {
    const currentIndex = e.detail
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i === currentIndex ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  }
})