/*
 * @Author: liweilong
 * @Date: 2021-01-22 10:41:45
 */
// components/bottom-pop/bottom-pop.js
Component({
  // 允许多插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: '_isShowChange'
    }
  },
  attached() {
    let isShow = this.data.isShow
    this.setData({
      isShow
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    animationData: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _isShowChange(newVal) {
      if (newVal) {
        this.createScaleAnimation('0')
      }
    },

    // handle close tap
    handleCloseTap(e) {
      this.createScaleAnimation('-500rpx')
      setTimeout(() => {
        this.setData({
          isShow: false,
        })
      }, 300)
    },

    createScaleAnimation(bottom) {
      let animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear',
        delay: 0,
      });
      console.log(animation)
      this.animation = animation
      setTimeout(() => {
        animation.bottom(bottom).step();
        this.setData({
          animationData: animation
        })
      }, 50)
      this.setData({
        animationData: animation.export()
      })
    },
  },


})