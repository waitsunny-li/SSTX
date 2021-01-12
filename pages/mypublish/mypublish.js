/*
 * @Author: liweilong
 * @Date: 2021-01-12 17:05:14
 */
// pages/mypublish/mypublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateTop: 0,
    headerTitle: '',
    cateIndex: 0,
    itemList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      cate,
      title
    } = options
    wx.setNavigationBarTitle({
      title
    })
    this.setData({
      cateIndex: cate,
      headerTitle: title
    })

  },

  onReady: function () {
    this.queryMultipleNodes()
  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.art-content').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.setData({
        cateTop: res[0].top
      })
    })
  },

  // scroll 
  handlescroldl(e) {
    let {
      scrollTop
    } = e.detail
    console.log(scrollTop);
    if (scrollTop > this.data.cateTop) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#970d0d',
      });
        
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      });
    }
  },

  // scroll lower
  handletolower(e) {
    console.log(e);
  }

})