/*
 * @Author: liweilong
 * @Date: 2021-01-07 14:57:47
 */
// components/tab/tab.js
Component({
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTab(e) {
      console.log(e);
      let {index} = e.currentTarget.dataset
      this.setData({
        currentIndex: index
      })
    }
  }
})