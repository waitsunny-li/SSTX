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
    // 借此对象根据状态来显示相对应的navigationBarTitleText
    navigationObj: {
      // 审核
      check: '',
      // 发布成功
      pubsuccess: '',
      // 关注
      collect: '',
      // 足迹
      track: '',
      // 分享
      share: ''
    },

    cateIndex: 0,
    itemList: [{},
      {},
      {},
      {},
      {},
      {}
    ],
    cateTop: 0,

    // project
    proList: [{},
      {},
      {},
      {},
      {},
      {}
    ],

    // connection
    conList: [{},
      {},
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
    console.log(options);
    let {
      status,
      title,
      cb
    } = options
    
    // change navigationBarTitleText
    wx.setNavigationBarTitle({
      title
    })

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
  },

  // handle cate change
  handleCateChange(e) {
    const {
      index,
      cate
    } = e.detail
    if (index == 1) { // connection
      // change cateList
      console.log("connection");
      this.setData({
        cateList: this.data.conCateList,
        itemList: this.data.conList
      })
    } else { // project
      this.setData({
        cateList: this.data.proCateList,
        itemList: this.data.proList
      })
    }
    this.setData({
      cateIndex: index
    })
  },

  // scroll 
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    console.log(scrollTop);
    if (scrollTop > this.data.cateTop) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#970d0d',
        animation: {
          duration: 0,
          timingFunc: 'linear'
        }
      });

      this.setData({
        ishowcateps: true
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
        animation: {
          duration: 300,
          timingFunc: 'linear'
        }
      });
      this.setData({
        ishowcateps: false
      })
    }
  }
})