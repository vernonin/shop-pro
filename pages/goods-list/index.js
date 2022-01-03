import {
  getGoodsList
} from '../../api/goodslist.js'

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
    ],
    goodsList: [],
    isShowFooterText: false
  },
  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsListData()
  },
  // 获取综合商品列表数据
  getGoodsListData() {
    
    getGoodsList(this.QueryParams).then(res => {
      // 获取总条数
      const {total} = res.data.message
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
      const {goods} = res.data.message
      const {goodsList} = this.data
      this.setData({
        goodsList: goodsList.concat(goods)
      })
      
      // 关闭下拉效果
      wx.stopPullDownRefresh()
    })
  },
  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    const currentIndex = e.detail
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i === currentIndex ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 滚动条触底事件
  onReachBottom() {
    // 1.判断还有没有下一页数据
    if(this.QueryParams.pagenum >= this.totalPages) {
      this.setData({
        isShowFooterText: true
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsListData()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsListData()
  }
})