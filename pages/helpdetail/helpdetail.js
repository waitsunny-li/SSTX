/*
 * @Author: liweilong
 * @Date: 2021-01-14 16:31:41
 */

import { request } from "../../request/index";

//Page Object
Page({
  data: {
    nodes: ''
  },
  //options(Object)
  onLoad: function(options) {
    let {title, id} = options
    wx.setNavigationBarTitle({
      title
    });
    this.requestInit(id)
  },

  // request
  async requestInit(id) {
    const r = await request({
      url: '/help/detail',
      data: {
        id: id
      }
    })
    this.setData({
      nodes: r.data.content
    })
  }
  
});
  