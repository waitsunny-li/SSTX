/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: ['高端人脉协助', '项目合作', '其他'],
    currentCateIndex: 0,
    cateIndex: 0,
    cateTop: 0,

    // project
    proCateList: ['高端人脉协助', '项目合作', '其他'],
    proCateIndex: 0,
    proList: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],

    // connection
    conCateList: ['工程类', '招商类', '其他'],
    conCateIndex: 0,
    conList: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryMultipleNodes()
  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.top-position').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.setData({
        cateTop: res[0].top
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }

    // 获取首页点击项目库或人才库跳转该页面固定位置
    const cateIndex = wx.getStorageSync('proConCateIndex');
    this.setData({
      cateIndex
    })
  },

  // handle cate change
  handlePickerCateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    if (this.data.cateIndex == 0) { // project
      this.setData({
        proCateIndex: index
      })
    } else { // connection
      this.setData({
        conCateIndex: index
      })
    }
    this.setData({
      currentCateIndex: index,
    })
  },

  // handle cate change
  handleCateChange(e) {
    const {index, cate} = e.detail
    wx.setStorageSync('proConCateIndex', index)
    if (index == 0) { // change project cate
      this.setData({
        cateList: this.data.proCateList
      })
    } else {

      this.setData({
        cateList: this.data.conCateList
      })
    }
    this.setData({
      cateIndex: index
    })
  },


  // swiper change
  handleSwiperChange(event) {
    let {current} = event.detail
    wx.setStorageSync('proConCateIndex', current)
    this.setData({
      cateIndex: current
    })
  },

  // scroll lower
  handleSwiperLower(e) {
    console.log('滚动到底部');
  },

  // scroll event
  handleSwiperscroll(e) {
    let {
      scrollTop
    } = e.detail
   
  }
})