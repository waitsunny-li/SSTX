/*
 * @Author: liweilong
 * @Date: 2021-01-13 10:44:30
 */
// pages/authenticate/authenticate.js
import {chooseOneImg, uploadFile} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: '发送验证码',
    isSend: false,
    timeIndex: 0,

    // IDcard img
    cardImgList: [  
      {
        id: 0,
        url: '',
        text: '正面照'
      },
      {
        id: 0,
        url: '',
        text: '反面照'
      }
    ]
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

  // choose id card
  async handleChooseIdCard(e) {
    let cardImgList = this.data.cardImgList
    const {index} = e.currentTarget.dataset
    const r = await chooseOneImg()
    let tempFilePaths = r.tempFilePaths
    cardImgList[index].url = tempFilePaths[0]
    this.setData({
      cardImgList
    })
  }
})