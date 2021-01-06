/*
 * @Author: liweilong
 * @Date: 2021-01-06 11:27:25
 */
// components/title-tab/title-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: [{
          id: 0,
          name: '优质项目'
        },
        {
          id: 1,
          name: '高端项目'
        }
      ]
    },
    width: {
      type: Number,
      value: 500
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
    handleTitleTab(e) {
      console.log(e);
      let {index} = e.currentTarget.dataset
      
      this.setData({
        currentIndex: index
      })
    }
  }
})