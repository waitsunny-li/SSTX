/*
 * @Author: liweilong
 * @Date: 2021-01-12 10:20:07
 */
// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexList: ['女', '男', '未选择'],
    sexIndex: 2,

    // id card img
    cardImgList: [
      {
        id: 0,
        url: '',
        text: '上传身份证正面'
      },
      {
        id: 0,
        url: '',
        text: '上传身份证反面'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  PickerSexChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },

  // upload img
  handleUploadImg(e) {
    console.log(e);
  }

})