import {
  getSetting,
  chooseAddress,
  openSetting} from '../../utils/asyncWx.js'
Page({

  data: {
    address: {},
    checkedCart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    this.computedCart()
  },
  computedCart() {
    let address = wx.getStorageSync('address')
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || []
    // 计算全选
    let checkedCart = cart.filter(v => v.checked)
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length !== 0 ? allChecked : false
    this.setData({address, checkedCart, allChecked, totalPrice, totalNum})
  },
  handlePay() {
    const {address, totalNum} = this.data
    
  }
})