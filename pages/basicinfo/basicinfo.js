/*
 * @Author: liweilong
 * @Date: 2021-01-12 16:08:47
 */

import {
  request,
  uploadFile,
  getQiNiuToken
} from "../../request/index";
import {
  chooseOneImg,
} from '../../utils/asyncWx'
// pages/basicinfo/basicinfo.js
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

    times: '发送验证码',
    isSend: false,
    timeIndex: 0,
    // form field
    sexList: ['女', '男', '未选择'],
    sexIndex: 2,
    nickname: '',
    mobile: ' ',
    originalAvatar: '',
    avatar: '',
    imageBaseUrl: '',

    poptype: '',
    popmsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存中的当前位置信息，如果有
    let procityObj = wx.getStorageSync('procityObj')
    let imageBaseUrl = wx.getStorageSync('imageBaseUrl');

    if (procityObj) {
      this.setData({
        procityIndex: procityObj.procityIndex,
        provinceName: procityObj.procityName[0],
        cityName: procityObj.procityName[1],
        objectCityArray: procityObj.objectCityArray
      })
    }

    if (imageBaseUrl) {
      this.setData({
        imageBaseUrl
      })
    }

  },

  onShow: function () {
    // 获取缓存中的VIP信息
    const vipUserInfo = wx.getStorageSync('vipUserInfo');
    this.setData({
      nickname: vipUserInfo.nickname,
      mobile: vipUserInfo.mobile,
      sexIndex: vipUserInfo.gender,
      originalAvatar: vipUserInfo.avatar
    })
  },

  // upload avatar
  async handleUploadAvatarTap(e) {
    const {
      token
    } = await getQiNiuToken()
    let r
    try {
      r = await chooseOneImg({
        sourceType: ['album']
      })
    } catch (e) {
      console.log(e);
      return;
    }
    let tempFilePaths = r.tempFilePaths
    let result
    wx.showLoading({
      title: '图片上传中~',
      mask: true,
    })
    try {
      result = await uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'token': token
        },
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (e) {
      console.log(e);
      this.setData({
        poptype: 'error',
        popmsg: e
      })
    }
    wx.hideLoading();
    let data = JSON.parse(result.data)
    this.setData({
      avatar: data.key,
      originalAvatar: tempFilePaths[0]
    })

  },

  // sex change
  PickerSexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },

  // change location
  handleNeedLocation(e) {
    const [provinceName, cityName] = e.detail.address
    this.setData({
      provinceName,
      cityName
    })
  },

  // send code 
  async handleSendCode(e) {
    const r = await request({
      url: '/sms/send',
      data: {
        mobile: this.data.mobile,
        event: 'edituserinfo'
      }
    })
    if (r.code == 1) {
      this.sendCode(60)
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
    value.address = this.data.provinceName + '/' + this.data.cityName
    value.avatar = this.data.avatar
    const r = await request({
      url: '/user/EditUserInfo',
      method: 'post',
      data: value
    })
    if (r.code == 1) {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    } else {
      this.setData({
        poptype: 'error',
        popmsg: r.msg
      })
    }
  }

})