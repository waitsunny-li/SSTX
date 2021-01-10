/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    pubCatesList: [
      {
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

    // pub connection
    conCates: [{
        id: 0,
        name: '工程类',
      },
      {
        id: 1,
        name: '招商类'
      },
    ]
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

  // 表单提交
  needsubmit(e) {
    console.log(e);
  },

  // need date 
  handleNeedDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      needdate: e.detail.value
    })
  },

  // swiper change 
  handleSwiperChange(e) {
    let currentIndex = e.detail.current
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
    let {index, name} = e.currentTarget.dataset.cate
    wx.setNavigationBarTitle({
      title: name,
    });
      
    this.setData({
      currentIndex: index
    })
  },
  handleTapConnection(e) {
    let {index, name} = e.currentTarget.dataset.cate
    wx.setNavigationBarTitle({
      title: name,
    });
    this.setData({
      currentIndex: index
    })
  }

})