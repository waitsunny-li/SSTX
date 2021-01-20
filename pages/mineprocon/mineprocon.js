/*
 * @Author: liweilong
 * @Date: 2021-01-05 13:45:17
 */
import {
  request
} from '../../request/index'
// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 借此对象根据状态来显示相对应的navigationBarTitleText
    navigationObj: {
      // 审核
      checking: '/user/examineingList',
      uncheck: '/user/unExamineList',
      // 发布成功
      pubsuccess: '/user/successPublishList',
      // 关注
      collect: '/user/mySubscribeList',
      // 足迹
      track: '/user/myHistoryList',
      // 分享
      share: ''
    },
    currentUrl: '',

    cateIndex: 0,
    // project
    proList: [],

    // connection
    conList: [],
    top: 0,
    isNoData: false,
  },
  page: 1,
  isrequest: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let {
      title,
      cb
    } = options
    console.log(cb);
    this.requestProCon(this.data.navigationObj[cb]).catch(err => {
      console.log(err);
    })
    // change navigationBarTitleText
    wx.setNavigationBarTitle({
      title
    })
    this.setData({
      currentUrl: this.data.navigationObj[cb]
    })
  },

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
  },

  // request
  async requestProCon(url) {
    // 防止触发连续两次请求，由于点击tabtitle时，swiper也触发了一次
    if (this.isrequest) {
      return;
    } else {
      this.isrequest = true
      const r = await request({
        url: url,
        data: {
          type: this.data.cateIndex,
          page: this.page
        }
      })
      console.log('我是请求', this.data.cateIndex);
      if (this.data.cateIndex == 0) {
        // let proList = this.data.proList.concat(r.data.data)
        let proList = r.data.data
        if (proList.length == 0 && this.page == 1) {
          this.setData({
            isNoData: true
          })
        } else {
          this.setData({
            proList,
            isNoData: false
          })
        }
      } else {
        let conList = r.data.data
        if (conList.length == 0 && this.page == 1) {
          this.setData({
            isNoData: true
          })
        } else {
          this.setData({
            conList,
            isNoData: false
          })
        }
      }
      this.isrequest = false
    }

  },

  // cate change
  handleCateChange(e) {
    this.page = 1
    const {
      index
    } = e.detail
    this.setData({
      cateIndex: index,
      top: 0
    })
    this.requestProCon(this.data.currentUrl).catch(err => {
      console.log(err);
    })
  },

  // swiper change
  handleSwiperChange(event) {
    this.page = 1
    let {
      current
    } = event.detail
    this.setData({
      cateIndex: current,
      top: 0
    })
    this.requestProCon(this.data.currentUrl).catch(err => {
      console.log(err);
    })
  },

  // project scroll to lower
  async handleProToLower(e) {
    if (this.isrequest) {
      return;
    } else {
      this.isrequest = true
      this.page++
      const r = await request({
        url: this.data.currentUrl,
        data: {
          type: this.data.cateIndex,
          page: this.page
        }
      })
      let list = r.data.data
      if (list.length > 0) {
        let proList = this.data.proList.concat(list)
        this.setData({
          proList
        })
      } else {
        wx.showToast({
          title: '我是有底线的哦~',
          icon: 'none',
        })
      }
      this.isrequest = false

    }

  },

  // connection scroll to lower
  async handleConToLower(e) {
    if (this.isrequest) {
      return;
    } else {
      this.isrequest = true
      this.page++
      const r = await request({
        url: this.data.currentUrl,
        data: {
          type: this.data.cateIndex,
          page: this.page
        }
      })
      let list = r.data.data
      if (list.length > 0) {
        let conList = this.data.conList.concat(list)
        this.setData({
          conList
        })
      } else {
        wx.showToast({
          title: '我是有底线的哦~',
          icon: 'none',
        })
      }
      this.isrequest = false
    }

  }
})