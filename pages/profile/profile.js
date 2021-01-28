/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {
  request
} from '../../request/index'
import {
  showModal
} from '../../utils/asyncWx'
import {testLogin} from '../../utils/util'
//Page Object
Page({
  data: {
    isAuth: false,
    userInfo: {},
    isShowLogin: false,
    vipUserInfo: {},
    imageBaseUrl: '',
  },
  //options(Object)
  onLoad: function (options) {
    let imageBaseUrl = wx.getStorageSync('imageBaseUrl');
    if (!imageBaseUrl) {
      request({
        url: '/index/getSite',
      }).then(res => {
        this.setData({
          imageBaseUrl: res.data.file_domain
        })
      })
    } else {
      this.setData({
        imageBaseUrl
      })
    }
    
    this.getVipUserInfo().then(res => {
      this.setData({
        vipUserInfo: res,
        imageBaseUrl
      })
    })
  },
  // 获取会员信息
  async getVipUserInfo() {
    const r = await request({
      url: '/user/userInfo'
    })
    wx.setStorageSync('vipUserInfo', r.data);
    return r.data
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
    // 每次显示都获取最新的状态
    this.getVipUserInfo().then(res => { 
      this.setData({
        vipUserInfo: res
      })
    })

    testLogin(this)
  },

  handleLoginBtn(e) {
    this.setData({
      isShowLogin: true
    })
  },

  // get userInfo
  async handleGetUserInfo(e) {
    
    const r = await this.getVipUserInfo()
    this.setData({
      vipUserInfo: r
    })
  },

  // join shop good
  async handleJoinTap(e) {
    const {
      realname
    } = this.data.vipUserInfo.verification

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

  // is go auth?
  handleGoAuth(e) {
    const {realname} = this.data.vipUserInfo.verification;
    console.log(realname);
    if (realname == 2) {
      wx.showToast({
        title: '您提交的信息正在审核中哦~',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/authenticate/authenticate'
      })
    }
  }

});