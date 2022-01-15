import {getSearch} from '../../api/search'
Page({
  data: {
    goods: [],
    isFocus: false,
    inputValue: ''
  },
  TimeId: null,
  hanldeInput(e) {
    const {value} = e.detail
    clearTimeout(this.TimeId)
    if(!value.trim()) {
      this.setData({
        isFocus: false,
        goods: []
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    // 防抖
    // clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 500)
  },
  qsearch(value) {
    getSearch(value).then(res => {
      console.log(res);
      this.setData({
        goods: res.data.message.goods
      })
    })
  },
  handleCancel() {
    this.setData({
      isFocus: false,
      inputValue: '',
      goods: []
    })
  }
})