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
    itemList: [
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
    ]
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
    if (index == 1) {// connection
      // change cateList
      console.log("connection");
      this.setData({
        cateList: this.data.conCateList,
        currentCateIndex: this.data.conCateIndex,
        itemList: this.data.conList
      })
    } else { // project
      this.setData({
        cateList: this.data.proCateList,
        currentCateIndex: this.data.proCateIndex ,
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
    if (scrollTop >= this.data.cateTop) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#e1211f',
        
      });
        
      this.setData({
        ishowcateps: true
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
       
      });
      this.setData({
        ishowcateps: false
      })
    }
  }
})