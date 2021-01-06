/*
 * @Author: liweilong
 * @Date: 2021-01-04 12:26:31
 */
import {
  request
} from '../../request/index'
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
    ]
    
  },
  //options(Object)
  onLoad: function (options) {
    let thems = async () => {
      let provinceListDataPromise = request({
        url: '/index/getCity',
        data: {
          level: 0
        }
      })
    
      let provinceData = await provinceListDataPromise
      console.log(provinceData.data);
      

      this.setData({
        objectCityArray
      })
    }

    // thems()
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

  // listen location event
  listenLocation(e) {
    console.log(e.detail.procity);
  }

  
});