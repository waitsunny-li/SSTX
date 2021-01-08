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
    needcate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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