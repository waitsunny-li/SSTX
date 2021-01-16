/*
 * @Author: liweilong
 * @Date: 2021-01-04 12:26:31
 */
import {
  request
} from '../../request/index'
import QQMapWX from '../../utils/qqmap-wx-jssdk.min'
import {
  wxLocation
} from '../../utils/asyncWx'
//获取应用实例
let app =  getApp();
let qqmapsdk = new QQMapWX({
  key: '56DBZ-5BAHI-GE3G7-5AZUO-3DRJF-F7FXU'
})
//Page Object
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    cateTop: 0,
    ishowcateps: false,
    bannerList: [],
    noticeList: [],
    animationData: {},
    // swiperpang
    swiperVideoList: [{},
      {},
      {},
      {},
      {}
    ],
    currentIndex: 0,
    proconList: [{},
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
      {}
    ],
    goodList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],

    isShowLogin: false
  },
  //options(Object)
  onLoad: function (options) {
    // 缓存中不存在procity时要获取定位的位置信息
    if (!wx.getStorageSync('procity')) {
      app.getUserLocation(function(res) {
        // 获取精确的地理位置
        qqmapsdk.reverseGeocoder({
          //获取输入框值并设置keyword参数
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (resLoc) => {//搜索成功后的回调
            let {province, city} = resLoc.result.address_component
            console.log(province, city)
            wx.setStorageSync('procity', [province, city]);
          }
        });
      })
    }
    
    console.log(app);
    let thems = async () => {
      let bannerDataPromise = request({
        url: '/index/getBanner',
        data: {
          static: 0
        }
      })
      let noticeDataPromise = request({
        url: '/index/getNotice'
      })
      let bannerData = await bannerDataPromise
      let noticeData = await noticeDataPromise

      this.setData({
        bannerList: bannerData.data,
        noticeList: noticeData.data
      })
    }

    thems().catch(error => {
      console.log(error);
    })
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

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    const userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    console.log('userInfo');
  },

  // handle Cate change
  handleCateChange(e) {
    const {
      index,
      cate
    } = e.detail
    console.log(index);

    this.setData({
      currentIndex: index
    })
  },

  // listen location event
  listenLocation(e) {
    console.log(e.detail.procity);
  },

  // scroll event
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    if (scrollTop > this.data.cateTop) {
      this.setData({
        ishowcateps: true
      })
    } else {
      this.setData({
        ishowcateps: false
      })
    }
  },

  // scroll bottom
  handletolower(e) {

  },

  handleClickPub(e) {
    console.log('点击发布');
  },

  /**
   * 点击首页响应的链接进行跳转响应的位置
   * click skip publist
   */
  handlePubProPage(e) {
    wx.setStorageSync('pubCateIndex', 0);
    wx.switchTab({
      url: '/pages/publish/publish',
    })
  },
  handlePubConPage(e) {
    wx.setStorageSync('pubCateIndex', 1);
    wx.switchTab({
      url: '/pages/publish/publish',
    })
  },
  handleTapProCate(e) {
    wx.setStorageSync('proConCateIndex', 0);
    wx.switchTab({
      url: '/pages/proconnection/proconnection',
    })
  },
  handleTapConCate(e) {
    wx.setStorageSync('proConCateIndex', 1);
    wx.switchTab({
      url: '/pages/proconnection/proconnection',
    })
  }

});