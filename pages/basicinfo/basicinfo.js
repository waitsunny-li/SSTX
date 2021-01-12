/*
 * @Author: liweilong
 * @Date: 2021-01-12 16:08:47
 */
// pages/basicinfo/basicinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: '发送验证码',
    isSend: false,
    timeIndex: 0,
    sexList: ['女', '男', '未选择'],
    sexIndex: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // send code 
  handleSendCode(e) {
    this.sendCode(60)
  },

  // sex change
  PickerSexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
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
  }

})