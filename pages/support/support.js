/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {
  request
} from '../../request/index'
let app = getApp();
// pages/support/support.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageBaseUrl: '',
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
    videoList: [],
    tabTop: 0,
    ishowtabs: false,
    currentIndex: 0,

    // 登录显示
    isShowLogin: false,
    top: 0
  },
  page: 1,
  // page_0: 1,
  // page_1: 1,
  // page_2: 1,
  // videoList_0: [],
  // videoList_2: [],
  // videoList_3: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let init = async () => {
      let res = await request({
        url: '/support/list',
        data: {
          status: 0,
          page: 1
        }
      })
      let videoList = res.data.data
      this.setData({
        imageBaseUrl: wx.getStorageSync('imageBaseUrl'),
        videoList,
      }).catch(error => {
        console.log(error);
      })
    }

    init().catch(err => {
      if (err == 401) {
        wx.setStorageSync('userInfo', '');
        this.setData({
          isShowLogin: true
        })
      }
    })

  },

  // 初次获取数据
  // async requestInit() {
  //   const r0promise = request({
  //     url: '/support/list',
  //     data: {
  //       status: 0,
  //       page: 1
  //     }
  //   })
  //   const r1promise = request({
  //     url: '/support/list',
  //     data: {
  //       status: 1,
  //       page: 1
  //     }
  //   })
  //   const r2promise = request({
  //     url: '/support/list',
  //     data: {
  //       status: 2,
  //       page: 1
  //     }
  //   })
  //   let videoList0 = await r0promise
  //   let videoList1 = await r1promise
  //   let videoList2 = await r2promise
  // },

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

  // 重新登录后，重新拉取数据
  async handleUserInfo(e) {
    let r = await request({
      url: '/support/list',
      data: {
        status: this.data.currentIndex,
        page: this.page
      }
    })
    if (r.code == 1) {
      let videoList = r.data.data
      this.setData({
        videoList
      })
    }
  },

  // click tab event
  async handleChangeCurrent(e) {
    let {
      currentIndex
    } = e.detail
    this.page = 1
    let videoList, r
    try {
      r = await request({
        url: '/support/list',
        data: {
          status: currentIndex,
          page: this.page
        }
      })
    } catch (e) {
      console.log(e);
    }
    videoList = r.data.data
    this.setData({
      currentIndex,
      videoList,
      top: 0
    })
  },

  // srcorll lower
  async handleVideoToLower(e) {
    this.page++
    let r = await request({
      url: '/support/list',
        data: {
          status: this.data.currentIndex,
          page: this.page
        }
    })
    console.log(this.page);
    this.setData({
      videoList
    })
  },

  // handle swiper change
  async handleSwiperChange(e) {
    let {
      current
    } = e.detail
    let videoList
    this.page = 1
    let r = await request({
      url: '/support/list',
      data: {
        status: current,
        page: this.page
      }
    })
    if (r.code == 1) {
      videoList = r.data.data
    }
    this.setData({
      currentIndex: current,
      videoList,
      top: 0
    })
  }

})