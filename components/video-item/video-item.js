/*
 * @Author: liweilong
 * @Date: 2021-01-07 15:47:38
 */
// components/video-item/video-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoDetail: {
      type: Object,
      value: {}
    },
    imageBaseUrl: {
      type: String,
      value: ''
    },
    requestCate: {
      type: String,
      value: ''
    },
    status: {
      type: Number,
      value: 0
    }
  },  

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})