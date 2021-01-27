/*
 * @Author: liweilong
 * @Date: 2021-01-12 09:33:15
 */

import {
  request
} from "../../request/index"
const app = getApp();
// pages/persondetail/persondetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    people: {},
    isShowShare: false,
    isShowImgCode: false,
    imgCodeUrl: ''
  },
  currentId: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id
    } = options
    this.requestPeopleDetail(id).catch(err => {
      console.log(err);
    })
  },

  // request
  async requestPeopleDetail(id) {
    const r = await request({
      url: '/school/weeklyDetail',
      data: {
        id: id
      }
    })
    this.setData({
      people: r.data
    })
    console.log(r);
  },

  // 查看分享
  handleTapShare(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.currentId = id
    console.log(this.currentId);
    this.setData({
      isShowShare: true
    })
  },

  // listen create img
  async handleImgCodeTap(e) {
    let r
    wx.showLoading({
      title: '图片加载中~',
    })
    console.log(this.currentId);
    try {
      r = await request({
        url: '/user/shareQrcode',
        data: {
          type: 3,
          id: this.currentId
        }
      })
    } catch (e) {
      wx.hideLoading()
    }
    wx.hideLoading()
    let imgCodeUrl = app.globalData.baseUrl + r.data
    this.setData({
      imgCodeUrl,
      isShowImgCode: true,
      isShowShare: false
    })
  },

  // listen save img to photo
  async handleSaveImgTap(e) {
    wx.showLoading({
      title: '正在保存~'
    })
    let lp = await downLoadFile({
      url: this.data.imgCodeUrl,
      header: {
        'Content-Type': 'image/jpeg'
      }
    })
    saveImgToPhoto({
      filePath: lp.tempFilePath
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功'
      })
      this.setData({
        isShowImgCode: false
      })
    }).catch(err => {
      wx.showToast({
        title: '保存失败'
      })
      this.setData({
        isShowImgCode: false
      })
    })
  },

})