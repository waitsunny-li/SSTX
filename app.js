/*
 * @Author: liweilong
 * @Date: 2021-01-04 12:26:31
 */
//app.js
import {
  Event
} from '/utils/event';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   
  },
  globalData: {
    userInfo: null,
  }
})