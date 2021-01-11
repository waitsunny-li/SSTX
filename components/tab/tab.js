/*
 * @Author: liweilong
 * @Date: 2021-01-07 14:57:47
 */
// components/tab/tab.js
Component({
  externalClasses: ['text-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    },
    height: {
      type: Number,
      value: 90
    },
    point: {
      type: Number,
      value: 4
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleTab(e) {
      let {
        index
      } = e.currentTarget.dataset
      this.triggerEvent("listhenTapCurrent", {
        currentIndex: index
      })
    }
  }
})