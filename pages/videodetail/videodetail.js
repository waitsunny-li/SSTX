/*
 * @Author: liweilong
 * @Date: 2021-01-13 14:23:37
 */
//Page Object
Page({
  data: {
    cateTop: 0,
    navigationTitle: '',
    recommendvideoList: [
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
  //options(Object)
  onLoad: function(options) {
    
  },

  onReady: function () {
    this.queryMultipleNodes()
  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.recommend-title').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.setData({
        cateTop: res[0].top
      })
    })
  },
  
  // scroll event
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    if (scrollTop > this.data.cateTop) {
      wx.setNavigationBarTitle({
        title: '其他推荐',
      });
        
    } else {
      wx.setNavigationBarTitle({
        title: '视频详情',
      });
    }
  }

});
  