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
//Page Object
Page({
  data: {
    isAuth: false,
    userInfo: {},
    isShowLogin: false,
    vipUserInfo: {}
  },
  //options(Object)
  onLoad: function (options) {
    this.getVipUserInfo().catch(err => {
      if (err == 401) {
        console.log('用户请登录');
      }
    })
  },
  // 获取会员信息
  async getVipUserInfo() {
    const r = await request({
      url: '/user/userInfo'
    })
    wx.setStorageSync('vipUserInfo', r.data);
    this.setData({
      vipUserInfo: r.data
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }

    // get userInfo
    const userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    this.setData({
      userInfo
    })

    // 每次显示都获取最新的状态
    this.getVipUserInfo()
  },

  handleLoginBtn(e) {
    this.setData({
      isShowLogin: true
    })
  },

  // get userInfo
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail
    this.setData({
      userInfo
    })
  },

  // join shop good
  async handleJoinTap(e) {
    const {realname} = this.data.vipUserInfo.verification

    if (realname) {
      wx.navigateTo({
        url: '/pages/join/join',
      })
    } else {
      const r = await showModal(
        {
          title: '申请加入商会',
          content: '您还没有通过认证，赶紧去认证吧',
          confirmText: '去认证'
        }
      )
      if (r) {
        wx.navigateTo({
          url: '/pages/authenticate/authenticate',
        })
      }
    }
  }

});