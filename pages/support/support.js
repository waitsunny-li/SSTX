/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
// pages/support/support.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
        id: 0,
        name: '艺术家祝福',
        icon: ''
      },
      {
        id: 1,
        name: '企业家支持',
        icon: ''
      },
      {
        id: 2,
        name: '领导关怀',
        icon: ''
      },
    ],
    videoList: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    tabTop: 0,
    ishowtabs: false,
    currentIndex: 0
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  // click tab event
  handleChangeCurrent(e) {
    let {currentIndex} = e.detail
    console.log(currentIndex);
    this.setData({
      currentIndex
    })
  },

  // srcorll lower
  handleVideoToLower(e) {
    console.log('滚到到底');
  },

  // handle swiper change
  handleSwiperChange(e) {
    let {current} = e.detail
    this.setData({
      currentIndex: current
    })
  }

})