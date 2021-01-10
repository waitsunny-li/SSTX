/*
 * @Author: liweilong
 * @Date: 2021-01-10 10:55:04
 */
// components/toptips/toptips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    textcontent: {
      type: String,
      value: '出现错误了'
    },
    type: {
      type: String,
      value: 'info',
      observer: '_typeChange'
    },
    show: {
      type: Boolean,
      value: false,
      observer: '_showChange'
    },
    delay: {
      type: Number,
      value: 2000
    },
    msg: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeClassMap: {
      info: 'info',
      success: 'success',
      error: 'error'
    }
  },

  attached() {
    const data = this.data
    this.setData({
      className: data.typeClassMap[data.type] || ''
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _typeChange(newVal) {
      console.log(newVal);
      this.setData({
        className: this.data.typeClassMap[newVal] || ''
      })
      return newVal
    },

    _showChange(newVal) {
      this._showToptips(newVal)
    },

    _showToptips(newVal) {
      if (newVal && this.data.delay) {
        setTimeout(() => {
          this.setData(
            {
            show: false
            },
            () => {
              this.triggerEvent('hide', {}, {})
            }
          )
        }, this.data.delay)
      }

      this.setData({
        show: newVal
      })
    }
  }
})
