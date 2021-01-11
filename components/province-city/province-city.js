/*
 * @Author: liweilong
 * @Date: 2021-01-06 10:14:15
 */
import {
  request
} from '../../request/index';
Component({
  externalClasses: ['ext-class'],
  // 生命周期
  lifetimes: {
    async attached() {
      // get province data
      if (wx.getStorageSync('city')) {
        let city = wx.getStorageSync('city')
        let province = wx.getStorageSync('province')
        
        this.setProvinceCity(province, city, 1)
      } else {
        let {
          data
        } = await request({
          url: '/index/getProvinceCity',
        })
        let {
          city,
          province
        } = data
        this.setProvinceCity(province, city, 1)
        wx.setStorageSync('city', city);
        wx.setStorageSync('province', province);
      }
    }
  },
  // 允许多插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShowIcon: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    provinceName: '北京',
    cityName: '北京市',
    city: {},
    province: [],
    multiIndex: [0, 0],
    objectCityArray: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindMultiPickerChange: function (e) {
      let [pro, cit] = e.detail.value
      console.log(this.data.objectCityArray);
      let provinceObj = this.data.objectCityArray[0][pro]
      let cityObj = this.data.objectCityArray[1][cit]
      
      // send event
      this.triggerEvent("locationEvent", {
        procity: [provinceObj.id, cityObj.id]
      })
    
      this.setData({
        provinceName: provinceObj.name,
        cityName: cityObj.name,
        multiIndex: e.detail.value
      })
    },

    bindMultiPickerColumnChange(e) {
      let {
        column,
        value,
      } = e.detail
      if (column == 0) { // first column
        // get province id
        let {id, name} = this.data.province[value]
        let objectCityArray = this.data.objectCityArray
        objectCityArray[1] = this.data.city[id]
        this.setData({
          objectCityArray,
        })

      }
    },

    // 处理省市选择
    setProvinceCity(province, city, pid) {
      let objectCityArray = []
      objectCityArray[0] = province
      objectCityArray[1] = city[pid]

      this.setData({
        objectCityArray,
        city,
        province
      })
      console.log(this.data.objectCityArray);

    }
  }
})