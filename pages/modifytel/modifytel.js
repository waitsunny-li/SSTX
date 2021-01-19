/*
 * @Author: liweilong
 * @Date: 2021-01-12 12:12:58
 */

import { request } from "../../request/index"

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
    newmobile: '',

    poptype: '',
    popmsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {mobile} = options
    let start = mobile.substr(0, 3)
    let end = mobile.substr(mobile.length - 4)
    let newmobile = start + '****' + end
    this.setData({
      mobile: newmobile
    })
  },

  // new mobile blur
  handleNewMBlur(e) {
    const {value} = e.detail
    this.setData({
      newmobile: value
    })
  },
  // send code 
  async handleSendCode(e) {
    let newmobile = this.data.newmobile
    if ((/^1[34578]\d{9}$/.test(newmobile))) {
      this.sendCode(60)
      const r = await request({
        url: '/sms/send',
        method: 'post',
        data: {
          mobile,
          event: 'realname'
        }
      })
    } else {
      this.setData({
        poptype: 'error',
        popmsg: '手机号格式错误！'
      })
    }
  },

  // func send
  sendCode(time) {
    let times = time
    if (this.data.timeIndex) return;
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
    let timeIndex = setInterval(() => {
      times--
      if (times < 0) {
        times = '发送验证码'
        clearInterval(this.data.timeIndex)
        this.setData({
          times,
          isSend: false
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
    const {value} = e.detail
    console.log(value);
    const r = await request({
      url: '',
      method: 'post',
      data: value
    })
    if (r.code == 1) {
      wx.showToast({
        title: '修改成功！',
        icon: 'success',
        duration: 1500,
        mask: false,
        success: (result) => {
          console.log('jjjj');
          let vipUserInfo = wx.getStorageSync('vipUserInfo')
          vipUserInfo.mobile = value.newmobile
          wx.setStorageSync('vipUserInfo', vipUserInfo);
            
          wx.navigateBack({
            delta: 1
          })
        },
      })
    } else {
      this.setData({
        poptype: 'error',
        popmsg: r.data.data.msg
      })
    }
  }
})