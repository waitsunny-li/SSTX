/*
 * @Author: liweilong
 * @Date: 2021-01-11 10:29:59
 */
import {
  request
} from '../../request/index'
//Page Object
Page({
  data: {
    seenAvaList: [],
    detailList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    lookAllList: [],
    currentIdIndex: 0,
    current: 0,
    isUp: false,
    idList: [],
    isShowConnect: false,
    isShowShare: false,

    // 是否点赞或关注
    isGood: false,
    isCollected: false,

    sitInfo: {},
  },
  //options(Object)
  onLoad: function (options) {
    // init value
    const {
      id,
      ids
    } = options
    let idList = ids.split(',')
    let detailList = []
    idList.forEach(v => {
      detailList.push({})
    })
    this.setData({
      detailList
    })
    let currentIdIndex = this.idReturnIndex(id, idList)

    // 发送请求详情
    this.requestConDetail(id)
    this.setData({
      currentIdIndex,
      idList
    })
    
    const sitInfo = wx.getStorageSync('sitInfo');
    this.setData({
      sitInfo
    })
  },

  // get connection detail
  async requestConDetail(id) {
    let detailList = this.data.detailList
    let lookAllList = this.data.lookAllList
    const r = await request({
      url: '/contacts/detail',
      data: {
        id
      }
    })
    const look = await request({
      url: '/contacts/lookList',
      data: {
        id
      }
    })
    if (r.code == 1) {
      detailList[this.data.current] = r.data
      let seenAvaList = look.data
      lookAllList[this.data.current] = look.data
      this.setData({
        detailList,
        lookAllList,
        seenAvaList
      })
      this.requestIscollected(id)
      this.requestIsGood(id)
    } else {
      console.log(r.msg);
    }
  },

   // is good ?
   async requestIsGood(id) {
    const r = await request({
      url: '/contacts/isZan',
      data: {
        id: id
      }
    })
    let isGood = Boolean(r.code)
    this.setData({
      isGood
    })
  },

  // is collected?
  async requestIscollected(id) {
    const r = await request({
      url: '/contacts/isSubscribe',
      data: {
        id: id
      }
    })
    let isCollected = Boolean(r.code)
    this.setData({
      isCollected
    })
  },

  // good event
  async handleGoodTap(e) {
    const {
      id
    } = e.currentTarget.dataset
    const detailList = this.data.detailList
    const current = this.data.current
    let r
    try {
      r = await request({
        url: '/contacts/doZan',
        data: {
          id: id
        }
      })
    } catch (e) {
      console.log(e);
    }
    let {
      status
    } = r.data
    if (status) { // 点赞成功
      detailList[current].zan_num++
      wx.showToast({
        title: r.msg,
        icon: 'success',
      })
      this.setData({
        isGood: true
      })
    } else { // 取消点赞
      detailList[current].zan_num--
      wx.showToast({
        title: r.msg,
        icon: 'none',
      })
      this.setData({
        isGood: false
      })
    }
    this.setData({
      detailList
    })
  },

  // collect event
  async handleCollectTap(e) {
    const {
      id
    } = e.currentTarget.dataset
    let r
    try {
      r = await request({
        url: '/contacts/doSubscribe',
        data: {
          id: id
        }
      })
    } catch (e) {
      console.log(e);
    }
    let {
      status
    } = r.data
    if (status) { // 关注成功
      wx.showToast({
        title: r.msg,
        icon: 'success',
      })
      this.setData({
        isCollected: true
      })
    } else { // 取消关注
      wx.showToast({
        title: r.msg,
        icon: 'none',
      })
      this.setData({
        isCollected: false
      })
    }
  },

  // swiper animationfinish end
  handleSwiperChange(event) {
    let currentIdIndex = this.data.currentIdIndex
    let lookAllList = this.data.lookAllList
    let detailList = this.data.detailList
    let idList = this.data.idList
    let isUp = this.data.isUp
    let seenAvaList
    const {
      current
    } = event.detail
    this.setData({
      current
    })
    if (!isUp) { // 向下滑动
      if (currentIdIndex == (idList.length - 1)) { // 临界点，在此循环
        currentIdIndex = 0
      } else {
        currentIdIndex++
      }
      this.requestConDetail(idList[currentIdIndex])
    } else { // 向上滑动
      --currentIdIndex
      seenAvaList = lookAllList[currentIdIndex]
      this.requestConDetail(idList[currentIdIndex])
    }
    this.setData({
      detailList,
      currentIdIndex,
      seenAvaList
    })

  },

  handleTransiton(event) {
    const {
      dx: dx,
      dy: dy
    } = event.detail
    if (dy > 0) { // 向下滑动
      this.setData({
        isUp: false
      })
    } else { // 向上滑动
      this.setData({
        isUp: true
      })
    }
  },

  // 
  handleAnimationEnd(event) {

  },

  // 根据当前数据id返回对应的下标
  idReturnIndex(id, idList) {
    let currentIdIndex
    idList.some((v, index) => {
      if (v == id) {
        currentIdIndex = index
        return true
      }
    })
    return currentIdIndex
  },

  // 查看联系电话
  handleLookConnect(e) {
    this.setData({
      isShowConnect: true
    })
  },

  // 查看分享
  handleTapShare(e) {
    this.setData({
      isShowShare: true
    })
  },

  handleCallTelTap(e) {
    const {
      tel
    } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  }

});