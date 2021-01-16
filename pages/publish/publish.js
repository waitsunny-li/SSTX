/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {request} from '../../request/index'
import pop from '../../utils/pop'
// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    needAddress: '',

    // pub connection
    conCates: [{
        id: 0,
        name: '工程类',
      },
      {
        id: 1,
        name: '招商类'
      },
    ],

    poptype: '',
    popmsg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

    // login ?
    if (!wx.getStorageSync('userInfo')) {
      this.setData({
        isShowLogin: false
      })
    }

  },

  needCateRadioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let dataName = e.detail.value
    const needCates = this.data.needCates
    needCates.forEach((v, index) => {
      console.log(v);
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
    const {address} = e.detail
    this.setData({
      needAddress: address.join('/')
    })
  },

  // 表单提交
  async needsubmit(e) {
    let {value} = e.detail
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