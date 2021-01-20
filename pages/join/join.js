/*
 * @Author: liweilong
 * @Date: 2021-01-12 10:20:07
 */

import {
  request
} from "../../request/index";

// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取的位置信息的列下标
    procityIndex: [0, 0],
    provinceName: '北京',
    cityName: '北京市',
    objectCityArray: [],

    sexList: ['女', '男'],
    sexIndex: 2,
    // id card img
    cardImgList: [{
        id: 0,
        url: '',
        text: '上传身份证正面'
      },
      {
        id: 0,
        url: '',
        text: '上传身份证反面'
      }
    ],

    shopGood: '',
    realname: '',
    mobile: '',
    idcard: '',
    idcardimage1: '',
    idcardimage2: '',

    poptype: '',
    popmsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRequest()

    // 获取缓存中的当前位置信息，如果有
    let procityObj = wx.getStorageSync('procityObj')
    if (procityObj) {
      this.setData({
        procityIndex: procityObj.procityIndex,
        provinceName: procityObj.procityName[0],
        cityName: procityObj.procityName[1],
        objectCityArray: procityObj.objectCityArray
      })
    }
  },

  onShow: function () {
    const vipUserInfo = wx.getStorageSync('vipUserInfo');
    const imageBaseUrl = wx.getStorageSync('imageBaseUrl');

    let cardImgList = this.data.cardImgList
    cardImgList[0].url = imageBaseUrl + vipUserInfo.idcardimage1
    cardImgList[1].url = imageBaseUrl + vipUserInfo.idcardimage2
    this.setData({
      realname: vipUserInfo.realname,
      mobile: vipUserInfo.mobile,
      idcard: vipUserInfo.idcard,
      idcardimage1: vipUserInfo.idcardimage1,
      idcardimage2: vipUserInfo.idcardimage2,
      sexIndex: vipUserInfo.gender,
      cardImgList
    })
  },

  // init request
  async initRequest() {
    const shopData = await request({
      url: '/club/getClubAdvantage'
    })
    const vipUserInfo = wx.getStorageSync('vipUserInfo');

    this.setData({
      shopGood: shopData.data,
      vipUserInfo
    })
  },

  PickerSexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },

  // location change
  handleNeedLocation(e) {
    const [provinceName, cityName] = e.detail.address
    this.setData({
      provinceName,
      cityName
    })
  },

  // form submit
  async handleFormSubmit(e) {
    const {
      value
    } = e.detail
    value.address = this.data.provinceName + '/' + this.data.cityName
    value.idcardimage1 = this.data.idcardimage1
    value.idcardimage2 = this.data.idcardimage2

    const r = await request({
      url: '/club/joinClub',
      method: 'post',
      data: value
    })
    if (r.code == 1) {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
      })
    } else {
      this.setData({
        poptype: 'error',
        popmsg: r.msg,
      })
    }

  }

})