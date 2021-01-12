/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
// pages/good/good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
        id: 0,
        name: '儒家文化',
        icon: ''
      },
      {
        id: 1,
        name: '善商会',
        icon: ''
      },
      {
        id: 2,
        name: '励志人生',
        icon: ''
      },
      {
        id: 3,
        name: '精选文章',
        icon: ''
      },
      {
        id: 4,
        name: '善商榜',
        icon: 'icon-huangguan'
      },
    ],
    currentIndex: 4,
    videoList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],

    // 善商会
    locationList: [{},
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
      {},
    ],
    cateTop: 0,

    // 善商榜
    goodTitleCateList: [{
        id: 0,
        name: '善商榜'
      },
      {
        id: 1,
        name: '善商人物周刊'
      }
    ],
    currentCateIndex: 1,
    goodVideoList: [
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    persionList: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onReady: function () {
    this.queryMultipleNodes()
  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.top-cate-wrap').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.setData({
        cateTop: res[0].top
      })
    })
  },

  // handle swiper change
  handleSwiperChange(e) {
    const index = e.detail.current
    this.setData({
      currentIndex: index
    })
  },

  // handle tap click
  handleChangeCurrent(e) {
    const {
      currentIndex
    } = e.detail
    this.setData({
      currentIndex
    })
  },

  // 善商会
  handleGoodExampleCate(e) {
    const currentCateIndex = e.currentTarget.dataset.index
    this.setData({
      currentCateIndex
    })
  }
})