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
    isShowShare: false
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
    console.log(r, look);
    if (r.code == 1) {
      detailList[this.data.current] = r.data
      let seenAvaList = look.data
      lookAllList[this.data.current] = look.data
      this.setData({
        detailList,
        lookAllList,
        seenAvaList
      })
    } else {
      console.log(r.msg);
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
      console.log(currentIdIndex);
      this.requestConDetail(idList[currentIdIndex])
    } else { // 向上滑动
      --currentIdIndex
      seenAvaList = lookAllList[currentIdIndex]
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