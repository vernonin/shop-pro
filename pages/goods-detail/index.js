import {getGoodsDetail} from '../../api/goodsdetail'

Page({
  data: {
    goodsObj: {}
  },
  // 商品对象
  GoodsObj: {},
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetailData({goods_id})
  },
  getGoodsDetailData(data) {
    getGoodsDetail(data).then(res => {
      this.GoodsObj = res.data.message
      this.setData({
        goodsObj: {
          goods_name: this.GoodsObj.goods_name,
          goods_price: this.GoodsObj.goods_price,
          // ipone部分手机 不支持 webp图片格式   webp --> jpg
          goods_introduce: this.GoodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: this.GoodsObj.pics,
        }
      })
    })
  },
  // 点击轮播图  放大预览
  handlePreViewImage(e) {
    const urls = this.data.goodsObj.pics.map(item => item.pics_mid)
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: urls[index],
      urls: urls
    })
  },
  // 点击加入购物车
  handleCartAdd() {
    // 1.获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart') || []
    // 2.判断商品对象是否存在购物车中
    let index = cart.findIndex(v => v.goods_id === this.GoodsObj.goods_id)
    if(index === -1) {
      this.GoodsObj.num = 1
      this.GoodsObj.checked = true
      cart.push( this.GoodsObj)
    } else {
      cart[index].num++;
    }
    // 把购物车重新添加会缓存中
    wx.setStorageSync('cart', cart)
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true // 防止用户手抖，疯狂点击
    })
  }
})