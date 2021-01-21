/*
 * @Author: liweilong
 * @Date: 2021-01-12 09:33:15
 */

import { request } from "../../request/index"

// pages/persondetail/persondetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    this.requestPeopleDetail(id).catch(err => {
      console.log(err);
    })
  },

  // request
  async requestPeopleDetail(id) {
    const r = await request(
      {
        url: '/school/weeklyDetail',
        data: {
          id: id
        }
      }
    )
    this.setData({
      people: r.data
    })
    console.log(r);
  }

})