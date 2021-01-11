/*
 * @Author: liweilong
 * @Date: 2021-01-06 11:27:25
 */
// components/title-tab/title-tab.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['ext-class'],
  properties: {
    tabList: {
      type: Array,
      value: [{
          id: 0,
          name: '优质项目'
        },
        {
          id: 1,
          name: '高端人脉'
        }
      ]
    },
    width: {
      type: String,
      value: "500rpx"
    },
    initLeft: {
      type: String,
      value: "54rpx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    left: ""
  },

  attached() {
    const data = this.data.tabList
    this.setData({
      tabList: data
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTitleTab(e) {
      // let {index} = e.currentTarget.dataset
      let left = e.currentTarget.offsetLeft + 'px'
      let index = e.currentTarget.dataset.index
      console.log(this.data.tabList);
      this.triggerEvent('cateChange', {
        index: index,
        cate: this.data.tabList[index].name
      })
      this.setData({
        left
      })
    }
  }
})