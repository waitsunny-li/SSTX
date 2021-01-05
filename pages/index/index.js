/*
 * @Author: liweilong
 * @Date: 2021-01-04 12:26:31
 */
//index.js
//获取应用实例
const app = getApp()

//Page Object
Page({
  data: {
    titleList: [{
        title: 'jjjdddDdddfsdfsdfsdfsdfssdfsdfjjj'
      },
      {
        title: 'jjjjjj'
      },
      {
        title: 'jjjjjj'
      },
    ],
    province: '北京',
    city: '北京市',
    multiIndex: [0,0],
    objectMultiArray: [
      [
        {
          id: 28,
          name: '无脊柱动物'
        },
        {
          id: 36,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ]
    ],
  },
  //options(Object)
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange(e) {
    console.log(e, 'jjjj');
  }
});