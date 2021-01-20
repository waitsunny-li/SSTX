/*
 * @Author: liweilong
 * @Date: 2021-01-14 15:59:01
 */

import {
  request
} from "../../request/index";

//Page Object
Page({
  data: {
    helpCateList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.requestList()
  },

  // request init
  async requestList() {
    const r = await request({
      url: '/help/list'
    })
    this.setData({
      helpCateList: r.data.data
    })
  }

});