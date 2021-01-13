/*
 * @Author: liweilong
 * @Date: 2021-01-07 10:04:50
 */
// components/star/star.js
Component({
  lifetimes: {
    attached() {
      let imgList = []
      let number = this.data.number
      let total = this.data.total
      let ex = number % 2
      console.log(ex);

      if (ex == 0) {
        let active = number / 2
        for(let i=0; i<total; i++) {
          if (i < active) {
            imgList.push(this.data.totalxing)
          } else {
            imgList.push(this.data.noxing)
          }
        }
      } else {
        let active = (number- 1) / 2 
        let ext = active
        for(let i=0; i<total; i++) {
          if (i < active) {
            imgList.push(this.data.totalxing)
          } else if(i == ext) {
            imgList.push(this.data.banxing)
          } else {
            imgList.push(this.data.noxing)
          }
        }
      }

      this.setData({
        imgList
      })
      console.log(imgList);
      
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    number: {
      type: Number,
      value: 0
    },
    total: {
      type: Number,
      value: 5
    },
    color: {
      type: String,
      value: '#e1211f'
    },
    size: {
      type: Number,
      value: 30
    },
    width: {
      type: Number,
      value: 170
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalxing: '/icons/activequanxing.png',
    banxing: '/icons/banxing.png',
    noxing: '/icons/morenquanxing.png',
    imgList: []
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})