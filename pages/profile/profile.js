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
    userInfo: {}
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

  async handleGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    const {avatarUrl, gender, nickName} = e.detail.userInfo
    wx.showLoading({
      title: '登录中',
    })
    const {code} = await wxLogin();
    const {data} = await request(
      {
        url: '/user/login',
        // method: 'post',
        data: {
          code,
          gender,
          avatar: avatarUrl,
          nickname: nickName
        }
      }
    )
    wx.setStorageSync('token', data.token);
    wx.hideLoading();
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      isAuth: true,
      userInfo
    })
      
  }

});
  