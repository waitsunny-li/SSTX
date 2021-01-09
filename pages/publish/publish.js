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
    ],
    currentIndex: 1
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
  }

})