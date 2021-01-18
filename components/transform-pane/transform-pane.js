/*
 * @Author: liweilong
 * @Date: 2021-01-09 10:53:02
 */
// components/transform-pane/transform-pane.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      videoList: {
        type: Array,
        value: []
      },
      cateList: {
        type: Array,
        value: [{}, {}, {}]
      },
      currentIndex: {
        type: Number,
        value: 0
      },
      imageBaseUrl: {
        type: String,
        value: ''
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
      // 滚动到底部
      handletolower(e) {
        this.triggerEvent("scrolltolover")
      },

      // swiper change
      handleSwiperChange(e) {
        let current = e.detail.current
        this.triggerEvent("swiperChange", {current})
      }
    }
})
