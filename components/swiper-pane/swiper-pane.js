/*
 * @Author: liweilong
 * @Date: 2020-11-18 20:43:49
 */
// components/swiper-pane/swiper-pane.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
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
    handleTitleTap(e) {
      let {index} = e.currentTarget.dataset
      this.setData({
        currentIndex: index
      })
    }
    
  }
})