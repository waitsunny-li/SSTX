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
    currentIndex: 1,
    videoList: [
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

  // handle swiper change
  handleSwiperChange(e) {
    const index = e.detail.current
    this.setData({
      currentIndex: index
    })
  },

  // handle tap click
  handleChangeCurrent(e) {
    const {currentIndex} = e.detail
    this.setData({
      currentIndex
    })
  }
  

})