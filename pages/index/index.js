/*
 * @Author: liweilong
 * @Date: 2021-01-16 19:24:13
 */
import {
  request
} from '../../request/index'
import QQMapWX from '../../utils/qqmap-wx-jssdk.min'
import {
  addressTransIndexArray,
  returnIdArry,
  testLogin
} from '../../utils/util'
//获取应用实例
let app = getApp();
let qqmapsdk = new QQMapWX({
  key: '56DBZ-5BAHI-GE3G7-5AZUO-3DRJF-F7FXU'
})
//Page Object
Page({
  data: {
    sitInfo: {},
    baseUrl: app.globalData.baseUrl,
    // 获取的位置信息的列下标
    procityIndex: [0, 0],
    provinceName: '北京',
    cityName: '北京市',
    objectCityArray: [],

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
    proconList: [],
    goodList: [],

    isShowLogin: false,
    isRefresher: true,
  },
  start: 0,
  cateTop: 0,
  //options(Object)
  onLoad: function (options) {
    let self = this
    // 缓存中不存在procity时要获取定位的位置信息
    if (!wx.getStorageSync('procity')) {
      app.getUserLocation(function (res) {
        // 获取精确的地理位置
        qqmapsdk.reverseGeocoder({
          //获取输入框值并设置keyword参数
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (resLoc) => { //搜索成功后的回调
            let {
              province,
              city
            } = resLoc.result.address_component
            wx.setStorageSync('procity', [province, city]);
            self.getLocationInfo()
          }
        });
      })
    }
    this.getLocationInfo()
    
    // get content of theme
    this.requestTheme()
  },
  onReady: function () {
    this.queryMultipleNodes()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    testLogin(this)
  },

  // 获取当前的定位信息
  async getLocationInfo() {
    // 获取定位的信息转化为下标列值，方便地址选择,并设置地区选择框的值
    const provinceList = wx.getStorageSync('province');
    const cityList = wx.getStorageSync('city')
    const procity = wx.getStorageSync('procity')
    if (provinceList && cityList && procity) {
      let procityObj = addressTransIndexArray(provinceList, cityList, procity)
      this.setData({
        procityIndex: procityObj.procityIndex,
        provinceName: procityObj.procityName[0],
        cityName: procityObj.procityName[1],
        objectCityArray: procityObj.objectCityArray,
      })
      wx.setStorageSync('procityObj', procityObj);
    }
  },

  // 首页的所有请求
  async requestTheme() {
    let address = [this.data.provinceName, this.data.cityName]
    let getSiteDataPromise = request({
      url: '/index/getSite',
    })
    let bannerDataPromise = request({
      url: '/index/getBanner',
      data: {
        static: 0
      }
    })
    let noticeDataPromise = request({
      url: '/index/getNotice'
    })
    let supportBannerPromise = request({
      url: '/index/list'
    })
    let projectDataPromise = request({
      url: '/project/list',
      data: {
        type: this.data.currentIndex,
        address: address.join('/')
      }
    })
    let goodListDataPromise = request({
      url: '/school/peopleList'
    })
    let siteInfoData = await getSiteDataPromise
    let bannerData = await bannerDataPromise
    let noticeData = await noticeDataPromise
    let supportBannerDataList = await supportBannerPromise
    let goodListDataList = await goodListDataPromise
    let projectDataList = await projectDataPromise
    wx.setStorageSync('imageBaseUrl', siteInfoData.data.file_domain);
    wx.setStorageSync('sitInfo', siteInfoData.data)
    this.setData({
      sitInfo: siteInfoData.data,
      bannerList: bannerData.data,
      noticeList: noticeData.data,
      swiperVideoList: supportBannerDataList.data.data,
      goodList: goodListDataList.data.data,
      proconList: projectDataList.data.data
    })
    return 1
  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.top-cate-wrap').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.cateTop = res[0].top
    })
  },

  // 各界支持
  async handleSwiperTitle(e) {
    const {
      index
    } = e.detail
    const r = await request({
      url: '/support/list',
      data: {
        status: index
      }
    })
    if (r.code == 1) {
      this.setData({
        swiperVideoList: r.data.data
      })
    } else {
      console.log('服务器错误');
    }
  },

  // handle Cate change
  handleCateChange(e) {
    const {
      index,
      cate
    } = e.detail
    let address = [this.data.provinceName, this.data.cityName]
    this.requestProCon(index, {
      address: address.join('/')
    })
    this.setData({
      currentIndex: index
    })
  },

  // listen location event
  listenLocation(e) {
    const address = e.detail.address.join('/')
    const cateIndex = this.data.currentIndex
    this.requestProCon(cateIndex, {
      address
    })
    this.setData({
      provinceName: e.detail.address[0],
      cityName: e.detail.address[1]
    })
  },

  // 请求优质项目或者高端人脉
  async requestProCon(index, option) {
    if (index == 0) {
      let r = await request({
        url: '/project/list',
        data: {
          address: option.address || ''
        }
      })
      if (r.code == 1) {
        this.setData({
          proconList: r.data.data
        })
      } else {
        console.log('服务器错误');
      }
    } else {
      let r = await request({
        url: '/contacts/list',
        data: {
          address: option.address || ''
        }
      })
      if (r.code == 1) {
        this.setData({
          proconList: r.data.data
        })
      } else {
        console.log('服务器错误');
      }
    }
  },

  // scroll event
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    let ishowcateps = this.data.ishowcateps
    if (scrollTop > this.cateTop) {
      // 防止多次调用this.setData（避免性能浪费）
      if(ishowcateps) return;
      this.setData({
        ishowcateps: true
      })
    } else {
      // 防止多次调用this.setData（避免性能浪费）
      if(!ishowcateps) return;
      this.setData({
        ishowcateps: false
      })
    }
  },

  // scroll bottom
  handletolower(e) {

  },

  /**
   * 
   * 项目、人脉跳转 
   */
  handleProConToDetail(e) {
    const {
      id
    } = e.currentTarget.dataset
    let proconList = this.data.proconList
    let idList = returnIdArry(proconList)
    if (this.data.currentIndex == 0) {
      wx.navigateTo({
        url: '/pages/prode/prode?id=' + id + '&ids=' + idList
      })
    } else {
      wx.navigateTo({
        url: '/pages/conde/conde?id=' + id + '&ids=' + idList
      })
    }

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
  },

  // 登录成功回调
  handleUserInfo(e) {
    this.requestTheme()
  },

  async handleRresherPull(e) {
    let address = [this.data.provinceName, this.data.cityName]
    let projectData= await request({
      url: '/project/list',
      data: {
        type: this.data.currentIndex,
        address: address.join('/')
      }
    })
    this.setData({
      isRefresher: false,
      proconList: projectData.data.data
    })
  }
});