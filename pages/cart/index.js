
import {
  getSetting,
  chooseAddress,
  openSetting} from '../../utils/asyncWx.js'
Page({

  data: {
    address: {},
    cart: [],
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
    // const allChecked = cart.length ? cart.every(v => v.checked) : false
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
    this.setData({address, cart, allChecked, totalPrice, totalNum})
  },
  // 点击收货地址按钮
  async handleChooseAddress() {
    try{
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address']
      // 判断权限状态
      if(!scopeAddress) {
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  handleItemChange(e) {
    const goodsId = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v => v.goods_id === goodsId)
    cart[index].checked = !cart[index].checked
    this.setData({cart})
    wx.setStorageSync('cart', cart)
    this.computedCart()
  },
  handleAllCheck(e) {
    const {allChecked, cart} = this.data
    if(allChecked) {
      cart.forEach(v => {
        v.checked = false
      })
    } else {
      cart.forEach(v => {
        v.checked = true
      })
    }
    this.setData({
      cart,
      allChecked: !allChecked
    })
    wx.setStorageSync('cart', cart)
    this.computedCart()
  },
  handleAddGoods(e) {
    const goodsId = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v => v.goods_id === goodsId)
    cart[index].num ++;
    this.setData({cart})
    wx.setStorageSync('cart', cart)
    this.computedCart()
  },
  handleReduceGoods(e) {
    const goodsId = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v => v.goods_id === goodsId)
    cart[index].num --;
    if(cart[index].num === 0) {
      wx.showModal({
        title: '是否要删除该商品？',
        success: (res) => {
          if(res.confirm) {
            cart.splice(index, 1)
          } else {
            cart[index].num = 1
          }
          this.setData({cart})
          wx.setStorageSync('cart', cart)
          this.computedCart()
        }
      })
    }
    this.setData({cart})
    wx.setStorageSync('cart', cart)
    this.computedCart()
  },
  handleToCategory() {
    wx.switchTab({
      url: '/pages/category/index',
    })
  },
  handleSettlement() {
    const {address, totalNum} = this.data
    if(!address.userName) {
      wx.showToast({
        title: '您还没有填写收货地址',
        icon: 'error'
      })
      return;
    }
    if(totalNum === 0) {
        wx.showToast({
          title: '您还没有选购商品',
          icon: 'error'
        })
        return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})