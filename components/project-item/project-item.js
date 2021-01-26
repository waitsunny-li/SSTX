/*
 * @Author: liweilong
 * @Date: 2021-01-06 17:09:21
 */
// components/project-item/project-item.js
import {countDown} from '../../utils/util'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowIcon: {
      type: Boolean,
      value: true
    },
    projectItme: {
      type: Object,
      value: {}
    },
    objectThumb: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    residueTime: 0,
  },

  attached: function() {
    countDown(this.data.projectItme.endtime, this)
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})