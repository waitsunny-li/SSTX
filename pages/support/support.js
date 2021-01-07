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
    tabTop: 0,
    ishowtabs: false
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
    query.select('.tab').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      console.log(res[0].top);
      this.setData({
        tabTop: res[0].top
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
        selected: 1
      })
    }
  },

  handletolower(e) {

  },

  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    if (scrollTop > this.data.tabTop) {
      this.setData({
        ishowtabs: true
      })
    } else {
      this.setData({
        ishowtabs: false
      })
    }
  }


})