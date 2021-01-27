/*
 * @Author: liweilong
 * @Date: 2021-01-12 12:12:58
 */

import {
  request
} from "../../request/index"

// pages/modifytel/modifytel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: '发送验证码',
    isSend: false,
    timeIndex: 0,
    mobile: '',
    oldmobile: '',
    sitInfo: {},
    poptype: '',
    popmsg: '',
  },
  newmobile: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sitInfo = wx.getStorageSync('sitInfo');
    let {
      mobile
    } = options
    let start = mobile.substr(0, 3)
    let end = mobile.substr(mobile.length - 4)
    let oldmobile = start + '****' + end
    this.setData({
      sitInfo,
      oldmobile
    })
  },

  // new mobile blur
  handleNewMBlur(e) {
    const {
      value
    } = e.detail
    this.newmobile = value
  },
  // send code 
  async handleSendCode(e) {
    let newmobile = this.newmobile
    const r = await request({
      url: '/sms/send',
      data: {
        mobile: newmobile,
        event: 'changemobile'
      }
    })
    if (r.code == 1) {
      this.sendCode(60)
      wx.showToast({
        title: '发送成功',
        icon: 'success',
      })
    } else {
      this.setData({
        poptype: 'error',
        popmsg: r.msg
      })
    }

  },

  // func send
  sendCode(time) {
    let times = time
    let timeIndex = this.data.timeIndex
    console.log(this.data.timeIndex);
    if (timeIndex) return;
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
    timeIndex = setInterval(() => {
      times--
      if (times < 0) {
        times = '发送验证码'
        clearInterval(timeIndex)
        timeIndex = 0
        this.setData({
          times,
          isSend: false,
          timeIndex
        })
      } else {
        this.setData({
          times,
          isSend: true
        })
      }
    }, 1000)
    this.setData({
      timeIndex
    })
  },

  // form submit
  async handleFormSubmit(e) {
    const {
      value
    } = e.detail
    const r = await request({
      url: '/user/changemobile',
      data: value
    })
    console.log(r);
    if (r.code == 1) {
      wx.showToast({
        title: '修改成功！',
        icon: 'success',
        success: (result) => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        },
      })
    } else {
      this.setData({
        poptype: 'error',
        popmsg: r.msg
      })
    }
  }
})