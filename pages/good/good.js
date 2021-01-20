/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {showModal} from '../../utils/asyncWx'
import {
  request
} from "../../request/index";

// pages/good/good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取的位置信息的列下标
    procityIndex: [0, 0],
    provinceName: '北京',
    cityName: '北京市',
    objectCityArray: [],

    sitInfo: {},
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
    currentIndex: 0,
    videoList: [],

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
    goodVideoList: [{},
      {},
      {},
      {},
      {},
      {}
    ],
    persionList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  },
  page: 1,
  isRequest: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取小程序基本信息
    const sitInfo = wx.getStorageSync('sitInfo')
    this.setData({
      sitInfo
    })
    this.requestVideo().catch(err => {
      console.log(err);
    })
    // 获取定位的信息
    let procityObj = wx.getStorageSync('procityObj')
    if (procityObj) {
      this.setData({
        procityIndex: procityObj.procityIndex,
        provinceName: procityObj.procityName[0],
        cityName: procityObj.procityName[1],
        objectCityArray: procityObj.objectCityArray
      })
    }

    // 获取善商会的banner图
    this.getBanners().catch(err => {
      console.log(err);
    })
  },

  // 获取善商会的banner图
  async getBanners() {
    const r = await request({
      url: '/index/getBanner',
      data: {
        static: 1
      }
    })
    console.log(r);
    this.setData({
      bannerList: r.data
    })
  },

  // video request list
  async requestVideo() {
    if (this.isRequest) {
      return;
    } else {
      this.isRequest = true
      let indexArr = [0, 2, 3]
      let current = this.data.currentIndex
      if (indexArr.includes(current)) {
        const r = await request({
          url: '/school/list',
          data: {
            status: current,
            page: this.page
          }
        })
        console.log(r.data.data);
        this.setData({
          videoList: r.data.data
        })
      }
      this.isRequest = false
    }

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
    this.page = 0
    const index = e.detail.current
    this.setData({
      currentIndex: index
    })
    this.requestVideo().catch(err => {
      console.log(err);
    })
  },

  // handle tap click
  handleChangeCurrent(e) {
    this.page = 1
    const {
      currentIndex
    } = e.detail
    this.setData({
      currentIndex
    })
    this.requestVideo().catch(err => {
      console.log(err);
    })
  },

  // 善商会
  handleGoodExampleCate(e) {
    const currentCateIndex = e.currentTarget.dataset.index
    this.setData({
      currentCateIndex
    })
  },
  // join shop good
  async handleJoinTap(e) {
    const r = await request({
      url: '/user/userInfo'
    })
    const {
      realname
    } = r.data.verification

    if (realname) {
      wx.navigateTo({
        url: '/pages/join/join',
      })
    } else {
      const r = await showModal({
        title: '申请加入商会',
        content: '您还没有通过认证，赶紧去认证吧',
        confirmText: '去认证'
      })
      if (r) {
        wx.navigateTo({
          url: '/pages/authenticate/authenticate',
        })
      }
    }
  },
  // listen location event
  listenLocation(e) {
    const address = e.detail.address.join('/')

    this.setData({
      provinceName: address[0],
      cityName: address[1]
    })
  },

  // video list to lower
  async handleVideotolower(e) {
    console.log('滚到底');
    if (this.isRequest) {
      return;
    } else {
      this.isRequest = true
      this.page++
      const r = await request({
        url: '/school/list',
        data: {
          page: this.page,
          status: this.data.currentIndex
        }
      })
      let list = r.data.data
      if (list.length == 0) {
        wx.showToast({
          title: '我是有底线的哦~',
          icon: 'none',
        })
      } else {
        this.setData({
          videoList: r.data.data
        })
      }
      this.isRequest = false
    }

  }
})