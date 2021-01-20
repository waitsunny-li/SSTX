/*
 * @Author: liweilong
 * @Date: 2021-01-13 08:59:16
 */
import {request} from '../../request/index'
// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleFormSubmit(e) {
    const {value} = e.detail
    console.log(value);
    const r = await request({
      url: '/user/question',
      data: value
    })
    console.log(r);
    if (r.code == 1) {
      wx.showToast({
        title: '上传成功',
        icon: 'success',
      })
      this.setData({
        question: ''
      })
    } else {
      wx.showToast({
        title: r.msg,
        icon: 'none',
      })
    }
  }
})