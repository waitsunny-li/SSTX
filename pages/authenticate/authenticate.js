/*
 * @Author: liweilong
 * @Date: 2021-01-13 10:44:30
 */
// pages/authenticate/authenticate.js
import {
  request
} from '../../request/index';
import {
  chooseOneImg,
  uploadFile
} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: '发送验证码',
    isSend: false,
    timeIndex: 0,

    // IDcard img
    cardImgList: [{
        id: 0,
        url: '',
        text: '正面照'
      },
      {
        id: 0,
        url: '',
        text: '反面照'
      }
    ],
    nickname: '',
    mobile: '',
    idcardimage1: '',
    idcardimage2: '',

    poptype: '',
    popmsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const vipUserInfo = wx.getStorageSync('vipUserInfo');
    this.setData({
      nickname: vipUserInfo.nickname
    })
  },
  // 获取会员信息
  async getVipUserInfo() {
    const r = await request({
      url: '/user/userInfo'
    })
    this.setData({
      vipUserInfo: r.data
    })
  },

  // 获取手机号
  handleTelBlur(e) {
    const {
      value
    } = e.detail
    this.setData({
      mobile: value
    })
  },

  // send code 
  async handleSendCode(e) {
    let mobile = this.data.mobile
    console.log(mobile);
    if ((/^1[34578]\d{9}$/.test(mobile))) {
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

  // choose id card
  async handleChooseIdCard(e) {
    let cardImgList = this.data.cardImgList
    const {
      index
    } = e.currentTarget.dataset
    let r
    try {
      r = await chooseOneImg({
        sourceType: ['album']
      })
    } catch (e) {
      return;
    }
    let tempFilePaths = r.tempFilePaths
    cardImgList[index].url = tempFilePaths[0]
    let result = await uploadFile({
      filePath: tempFilePaths[0],
      name: 'file',
      header: {
        'token': wx.getStorageSync('token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    wx.hideLoading()
    let data = JSON.parse(result.data)
    if (data.code == 1) { // success
      if (index == 0) {
        let idcardimage1 = data.data.url
        this.setData({
          idcardimage1
        })
      } else {
        let idcardimage2 = data.data.url
        this.setData({
          idcardimage2
        })
      }
    } else { // error
      console.log(data.data.msg);
    }
    this.setData({
      cardImgList
    })
  },

  // form submit
  async handleSubmit(e) {
    let {
      value
    } = e.detail
    const r = await request({
      url: '/user/realname',
      method: 'post',
      data: value
    })
    console.log(r);
    if (r.code == 1) {
      wx.showToast({
        title: '上传成功！',
        icon: 'none'
      });
      
      wx.navigateBack({
        delta: 1
      });
    } else {
      this.setData({
        poptype: 'error',
        popmsg: '失败！'
      })
    }
  }
})