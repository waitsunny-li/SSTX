/*
 * @Author: liweilong
 * @Date: 2020-11-18 20:43:49
 */
// components/swiper-pane/swiper-pane.js
Component({
  lifetimes: {
    attached() {
     
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    swiperVideoList: {
      type: Array,
      value: []
    },
    uploadBaseUrl: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    rollWidth: 1000,
    catesList: [
      {
        status: 0,
        name: '明星祝词'
      },
      {
        status: 1,
        name: '企业祝词'
      },
      {
        status: 2,
        name: '领导关怀'
      }
    ],
    currentIndex: 0,
    scrollLeft: 0,
  },


  /**
   * 组件的方法列表
   */
  methods: {
    handleTitleTap(e) {
      let {
        index
      } = e.currentTarget.dataset
      this.triggerEvent('changeTitle', {
        index,
      })
      this.setData({
        currentIndex: index,
        scrollLeft: 0
      })
    },

    // // scroll lower
    // handleToLower(e) {
    //   console.log('滚动底部');
    //   let currentIndex = ++this.data.currentIndex
    //   if (currentIndex > 2) {
    //     currentIndex = 0
    //   }
    //   this.triggerEvent('changeTitle', {
    //     index: currentIndex
    //   })
    //   this.setData({
    //     currentIndex,
    //     scrollLeft: 0
    //   })
    // }

  }
})