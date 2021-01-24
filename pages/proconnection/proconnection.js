/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {
  request
} from '../../request/index'
import {returnIdArry, sliceArrayTen} from '../../utils/util'
// pages/project/project.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    procityIndex: [0, 0],
    provinceName: '北京',
    cityName: '北京市',
    objectCityArray: [],

    cateList: ['高端人脉协助', '项目合作', '其他'],
    currentCateIndex: 0,
    cateIndex: 0,

    // project
    proCateList: ['高端人脉协助', '项目合作', '其他'],
    proCateIndex: 0,
    proList: [],

    // connection
    conCateList: ['工程类', '招商类', '其他'],
    conCateIndex: 0,
    conList: [],
    top: 0
  },
  page: 1,
  // is scroll to lower
  isScrollLower: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let procityObj = wx.getStorageSync('procityObj')
    if (procityObj) {
      this.setData({
        procityIndex: procityObj.procityIndex,
        provinceName: procityObj.procityName[0],
        cityName: procityObj.procityName[1],
        objectCityArray: procityObj.objectCityArray
      })
    }

    // get prolist
    this.initRequest().catch(err => {
      if (err == 401) {
        console.log('请登录');
      }
      console.log(err);
    })
  },

  // init request data
  async initRequest() {
    let address = this.data.provinceName + '/' + this.data.cityName
    wx.showLoading({
      title: '加载中',
      mask: true,
    });

    let proPromiseData = await request({
      url: '/project/list',
      data: {
        type: this.data.proCateIndex,
        address: address
      }
    })
    let conPromiseData = await request({
      url: '/contacts/list',
      data: {
        type: this.data.conCateIndex,
        address: address
      }
    })
    wx.hideLoading();
    this.setData({
      proList: proPromiseData.data.data,
      conList: conPromiseData.data.data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }

    // 获取首页点击项目库或人才库跳转该页面固定位置
    const cateIndex = wx.getStorageSync('proConCateIndex');
    this.setData({
      cateIndex
    })
  },

  // handle cate change
  async handlePickerCateChange(e) {
    this.page = 1
    let index = e.detail.value
    if (this.data.cateIndex == 0) { // project
      this.setData({
        proCateIndex: index
      })
      const r = await this.scrollToLowerRequest(this.data.cateIndex)
      let list = r.data.data
      if (list.length == 0) {
        wx.showToast({
          title: '暂时没有数据哦~',
          icon: 'none',
        })
      }
      this.setData({
        proList: r.data.data
      })

    } else { // connection
      this.setData({
        conCateIndex: index
      })
      const r = await this.scrollToLowerRequest(this.data.cateIndex)
      let list = r.data.data
      if (list.length == 0) {
        wx.showToast({
          title: '暂时没有数据哦~',
          icon: 'none',
        })
      }
      this.setData({
        conList: r.data.data
      })
    }
    this.setData({
      currentCateIndex: index,
    })
  },

  // handle cate change
  async handleCateChange(e) {
    this.page = 1
    const {
      index,
      cate
    } = e.detail
    wx.setStorageSync('proConCateIndex', index)
    if (index == 0) { // change project cate
      const r = await this.scrollToLowerRequest(index)
      this.setData({
        cateList: this.data.proCateList,
        proList: r.data.data
      })
    } else {
      const r = await this.scrollToLowerRequest(index)
      this.setData({
        cateList: this.data.conCateList,
        conList: r.data.data
      })
    }
    this.setData({
      cateIndex: index
    })
  },

  // change address
  async listenLocation(e) {
    this.page = 1
    let index = this.data.cateIndex
    const [provinceName, cityName] = e.detail.address
    this.setData({
      provinceName,
      cityName
    })
    const r = await this.scrollToLowerRequest(index)
    console.log(r.data.data);
    let list = r.data.data
    if (list.length == 0) {
      wx.showToast({
        title: '暂没数据哦~',
        icon: 'none',
      });
    }
    if (index == 0) {
      this.setData({
        proList: list
      })
    } else {
      this.setData({
        conList: list
      })
    }

  },


  // swiper change
  async handleSwiperChange(event) {
    this.page = 1
    let {
      current
    } = event.detail
    wx.setStorageSync('proConCateIndex', current)
    if (current == 0) { // change project cate
      const r = await this.scrollToLowerRequest(current)
      this.setData({
        cateList: this.data.proCateList,
        proList: r.data.data,
        currentCateIndex: this.data.proCateIndex
      })
    } else {
      const r = await this.scrollToLowerRequest(current)
      this.setData({
        cateList: this.data.conCateList,
        conList: r.data.data,
        currentCateIndex: this.data.conCateIndex
      })
    }
    this.setData({
      cateIndex: current
    })
  },

  // scroll to lower request
  async scrollToLowerRequest(index) {
    let r
    if (index == 0) {
      r = await request({
        url: '/project/list',
        data: {
          type: this.data.proCateIndex,
          address: this.data.provinceName + '/' + this.data.cityName,
          page: this.page
        }
      })
    } else {
      r = await request({
        url: '/contacts/list',
        data: {
          type: this.data.conCateIndex,
          address: this.data.provinceName + '/' + this.data.cityName,
          page: this.page
        }
      })
    }
    return r
  },

  // scroll pro lower
  async handleSwiperProLower(e) {
    if(this.isScrollLower) {
      return;
    }
    this.isScrollLower = true
    console.log('项目滚动到底部');
    this.page++
    let r = await this.scrollToLowerRequest(this.data.cateIndex)
    let list = r.data.data
    console.log(list);
    if (list.length == 0) {
      wx.showToast({
        title: '我是有底线的哦~',
        icon: 'none',
      })
    } else {
      let proList = this.data.proList.concat(list)
      this.setData({
        proList
      })
    }
    this.isScrollLower = false
  },

  // scroll con lower
  async handleSwiperConLower(e) {
    if(this.isScrollLower) {
      return;
    }
    this.isScrollLower = true
    this.page++
    console.log('人脉滚到地');
    const r = await this.scrollToLowerRequest(this.data.cateIndex)
    let list = r.data.data
    console.log(list);
    if (list.length == 0) {
      wx.showToast({
        title: '我是有底线的哦~',
        icon: 'none',
      })
    } else {
      let conList = this.data.conList.concat(list)
      this.setData({
        conList
      })
    }
    this.isScrollLower = false
  },

  // 跳转详情
  handleProConToDetail(e) {
    const {id} = e.currentTarget.dataset
    console.log(id);
    
    if (this.data.cateIndex == 0) {
      let proList = this.data.proList
      let idList = sliceArrayTen(returnIdArry(proList))
      
      wx.navigateTo({
        url: '/pages/prode/prode?id=' + id + '&ids=' + idList
      })
    } else {
      let conList = this.data.conList
      let idList = sliceArrayTen(returnIdArry(conList))
      wx.navigateTo({
        url: '/pages/conde/conde?id=' + id + '&ids=' + idList
      })
    }
  },
  
})