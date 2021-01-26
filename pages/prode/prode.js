/*
 * @Author: liweilong
 * @Date: 2021-01-11 10:29:59
 */
import {
  request
} from '../../request/index'
import {
  downLoadFile,
  saveImgToPhoto
} from '../../utils/asyncWx'
import {residueTime} from '../../utils/util'
const app = getApp();

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
    currentId: '',
    // 显示保存二维码图片
    isShowImgCode: false,
  },
  isShare: false,
  //options(Object)
  onLoad: function (options) {
    residueTime(1611849600)
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
    this.requestProDetail(id)
    this.requestIscollected(id)
    this.setData({
      currentIdIndex,
      idList
    })

    const sitInfo = wx.getStorageSync('sitInfo');
    this.setData({
      sitInfo
    })

  },

  // get project detail
  async requestProDetail(id) {
    let detailList = this.data.detailList
    let lookAllList = this.data.lookAllList
    const r = await request({
      url: '/project/detail',
      data: {
        id
      }
    })
    const look = await request({
      url: '/project/lookList',
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
      this.requestIscollected(id)
      this.requestIsGood(id)
    } else {
      console.log(r.msg);
    }
  },

  // is good ?
  async requestIsGood(id) {
    const r = await request({
      url: '/project/isZan',
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
      url: '/project/isSubscribe',
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
        url: '/project/doZan',
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
        url: '/project/doSubscribe',
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
    console.log(r);
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
      this.requestProDetail(idList[currentIdIndex])
    } else { // 向上滑动
      --currentIdIndex
      seenAvaList = lookAllList[currentIdIndex]
      this.requestProDetail(idList[currentIdIndex])
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

  // 分享
  onShareAppMessage(e) {
    let currentId = this.data.currentId
    request({
      url: '/user/share',
      data: {
        id: currentId,
        type: 0
      }
    }).then(res => {
      console.log(res);
      let code = res.code
      if (code == 1) {
        // wx.showToast({
        //   title: res.msg,
        //   icon: 'success',
        // })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'error',
        })
      }
    })
  },

  // 查看联系电话
  handleLookConnect(e) {
    this.setData({
      isShowConnect: true
    })
  },

  // 查看分享
  handleTapShare(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.setData({
      currentId: id,
      isShowShare: true
    })
  },

  // listen create img
  async handleImgCodeTap(e) {
    let r
    wx.showLoading({
      title: '图片加载中~',
    })
    try {
      r = await request({
        url: '/user/shareQrcode'
      })
    } catch (e) {
      console.log(e);
      wx.hideLoading()
    }
    wx.hideLoading()
    let imgCodeUrl = app.globalData.baseUrl + r.data
    this.setData({
      imgCodeUrl,
      isShowImgCode: true,
      isShowShare: false
    })
  },

  // listen save img to photo
  async handleSaveImgTap(e) {
    wx.showLoading({
      title: '正在保存~'
    })
    let lp = await downLoadFile({
      url: this.data.imgCodeUrl,
      header: {
        'Content-Type': 'image/jpeg'
      }
    })
    saveImgToPhoto({
      filePath: lp.tempFilePath
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功'
      })
      this.setData({
        isShowImgCode: false
      })
    }).catch(err => {
      wx.showToast({
        title: '保存失败'
      })
      this.setData({
        isShowImgCode: false
      })
    })
  },

  // 拨号
  handleCallTelTap(e) {
    console.log(e)
    const {
      tel
    } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  }

});