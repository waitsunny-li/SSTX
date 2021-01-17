/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */

import {
  request
} from '../../request/index'
import pop from '../../utils/pop'
import {
  chooseOneImg,
  uploadFile,
  showModal
} from '../../utils/asyncWx'
import {
  getCacheLocationInfo
} from '../../utils/util'
// pages/publish/publish.js
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

    isShowLogin: false,
    currentIndex: 0,
    pubCatesList: [{
        index: 0,
        name: '发布需求'
      },
      {
        index: 1,
        name: '发布人脉'
      },
    ],
    needCates: [{
        id: 0,
        name: '高端人脉协助',
      },
      {
        id: 1,
        name: '项目合作'
      },
      {
        id: 2,
        name: '其他'
      }
    ],
    needdate: "",
    needcate: "",
    needAddress: [],
    connectionAddress: [],

    // pub connection
    conCates: [{
        id: 0,
        name: '工程类',
      },
      {
        id: 1,
        name: '招商类'
      },
      {
        id: 2,
        name: '其他'
      }
    ],
    group_image: '',

    poptype: '',
    popmsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果有 获取缓存中的procityObj, 填充到地区中
    getCacheLocationInfo.apply(this, null)


    // 保存当前位置信息到地区选择表单中
    const addressArray = [this.data.provinceName, this.data.cityName]
    this.setData({
      needAddress: addressArray,
      connectionAddress: addressArray
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    // get current Index 
    const currentIndex = wx.getStorageSync('pubCateIndex');
    console.log(currentIndex);
    this.setData({
      currentIndex
    })

  },

  needCateRadioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let dataName = e.detail.value
    const needCates = this.data.needCates
    needCates.forEach((v, index) => {
      v.checked = false
      if (v.name == dataName) {
        v.checked = true
      }
    })
    this.setData({
      needCates
    })
  },

  // need location
  handleNeedLocation(e) {
    const {
      address
    } = e.detail
    this.setData({
      needAddress: address.join('/')
    })
  },

  // 表单提交
  async needsubmit(e) {
    let {
      value
    } = e.detail
    value.address = this.data.needAddress
    console.log(value);
    const result = await request({
      url: '/project/add',
      method: 'post',
      data: value
    })
    if (result.code == 1) {
      pop.success(result.msg)
    } else {
      this.setData({
        popmsg: result.msg,
        poptype: 'error'
      })
    }
  },

  // need date 
  handleNeedDateChange(e) {
    this.setData({
      needdate: e.detail.value
    })
  },

  // 人脉表单提交
  handleConAddress(e) {
    const {
      address
    } = e.detail
    this.setData({
      connectionAddress: address.join('/')
    })
  },
  // upload img
  async handleUploadImg(e) {
    // choose img
    const r = await chooseOneImg({
      sourceType: ['album']
    })
    let tempFilePaths = r.tempFilePaths
    wx.showLoading({
      title: '上传中',
      mask: true,
    })
    // upload img
    let result = await uploadFile({
      filePath: tempFilePaths[0],
      name: 'file',
      header: {
        'token': wx.getStorageSync('token')
      }
    })
    wx.hideLoading()
    this.setData({
      group_image: tempFilePaths[0]
    })
    console.log(result, '暂时性文件group_image是本地地址')
    if (result.data.code == 1) {// success
      pop.success(result.data.msg)
      this.setData({
        group_image: tempFilePaths[0]
      })
    } else { // error
      this.setData({
        popmsg: result.data.msg,
        poptype: 'error'
      })
    }
  },
  // look img
  handleLookImg(e) {
    let urls = []
    urls[0] = this.data.group_image
    wx.previewImage({
      current: urls[0],
      urls,
    })
  },
  // del img
  handleDelImg(e) {
    showModal({
      title: '提醒',
      content: '是否要删除合影？'
    }).then(() => {
      this.setData({
        group_image: ''
      })
    })
  },

  async connecsubmit(e) {
    let {
      value
    } = e.detail
    value.address = this.data.connectionAddress
    console.log(value)
  },

  // swiper change 
  handleSwiperChange(e) {
    let currentIndex = e.detail.current
    // 改变缓存中的pubCateIndex的值
    wx.setStorageSync('pubCateIndex', currentIndex);
    if (currentIndex == 0) {
      wx.setNavigationBarTitle({
        title: '发布需求',
      });
    } else {
      wx.setNavigationBarTitle({
        title: '发布人脉',
      });
    }
    this.setData({
      currentIndex
    })
  },
  // top cates tap
  handleTapNeed(e) {
    let {
      index,
      name
    } = e.currentTarget.dataset.cate
    wx.setStorageSync('pubCateIndex', index);
    wx.setNavigationBarTitle({
      title: name,
    });

    this.setData({
      currentIndex: index
    })
  },
  handleTapConnection(e) {
    let {
      index,
      name
    } = e.currentTarget.dataset.cate
    wx.setStorageSync('pubCateIndex', index);
    wx.setNavigationBarTitle({
      title: name,
    });
    this.setData({
      currentIndex: index
    })
  }

})