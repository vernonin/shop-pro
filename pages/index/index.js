
import { getSwiperData,
         getNavData,
         getFloorData
        } from '../../api/home'
Page({
  data: {
    swiperList: [], // 轮播图数据
    catesList: [], // 导航数据
    floorList: [] // 楼层数据
  },
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    getSwiperData().then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
  },
  // 获取导航数据
  getNavList() {
    getNavData().then(res => {
      this.setData({
        catesList: res.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList() {
    getFloorData().then(res => {
      this.setData({
        floorList: res.data.message
      })
    })
  } 
})