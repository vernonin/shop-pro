import { getCatesData } from '../../api/category.js'
Page({
  data: {
    leftMenuList: [], // 左侧菜单数据
    rightContent: [], // 右侧商品数据
    currentIndex: 0, // 被点击左侧的菜单索引
    scrollTop: 0 // 右侧商品内容的滚动条距离顶部的距离
  },
  // 接口的返回数据
  Cates: [],
  onLoad: function (options) {
    this.cacheData()
  },
  // 缓存数据方法
  cacheData() {
    // 1.先判断本地存储中有没有旧的数据 ？没有旧的数据 直接发送请求 : 有数据 且 旧数据没有过期 直接使用本地的数据
    // 1 获取本地存储的数据
    const Cates = wx.getStorageSync('cates')
    // 2 判断
    if(!Cates) {
      this.getCatesList()
    } else {
      if(Date.now() - Cates.time > 1000*10) {
        this.getCatesList()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 请求商品分类数据、及构造数据
  getCatesList() {
    getCatesData().then(res => {
      // 把接口返回的数据存入到本地存储中
      wx.setStorageSync('cates', {time: Date.now(), data: res.data.message})
      this.Cates = wx.getStorageSync('cates').data
      // 构造左侧菜单的数据
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 构造右侧的商品数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 点击左侧菜单数据的方法
  handleLeftMenuTap(e) {
    const currentIndex = e.currentTarget.dataset.index
    let rightContent = this.Cates[currentIndex].children
    this.setData({
      currentIndex,
      rightContent,
      scrollTop: 0
    })
  }
})