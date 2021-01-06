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
    cateTop: 0,
    ishowcateps: false,
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
    this.queryMultipleNodes()
  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.top-cate-wrap').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.setData({
        cateTop: res[0].top
      })
    })
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
  },

  // scroll event
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    if (scrollTop > this.data.cateTop) {
      this.setData({
        ishowcateps: true
      })
    } else {
      this.setData({
        ishowcateps: false
      })
    }
  },

  // scroll bottom
  handletolower(e) {

  }

});