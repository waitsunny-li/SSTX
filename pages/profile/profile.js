/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {request} from '../../request/index'
import {wxLogin} from '../../utils/asyncWx'
//Page Object
Page({
  data: {
    isAuth: false,
    userInfo: {},
    isShowLogin: false
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
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
  },

  handleLoginBtn(e) {
    this.setData({
      isShowLogin: true
    })
  },

  // get userInfo
  handleGetUserInfo(e) {
    const {userInfo} = e.detail
    this.setData({
      userInfo
    })
  }

});
  