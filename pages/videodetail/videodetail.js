/*
 * @Author: liweilong
 * @Date: 2021-01-13 14:23:37
 */
import {
  request
} from '../../request/index'
import {
  downLoadFile,
  saveImgToPhoto
} from '../../utils/asyncWx'
const app = getApp();
//Page Object
Page({
  data: {
    navigationTitle: '',
    imageBaseUrl: '',
    currentVideo: {},
    requestCate: '',
    status: 0,
    recommendvideoList: [],

    isShowShare: false,
    isGood: false,
    // 显示保存二维码图片
    isShowImgCode: false,
  },
  page: 0,
  currentId: '',
  cateTop: 0,
  //options(Object)
  onLoad: function (options) {
    // 获取七牛云地址
    let imageBaseUrl = wx.getStorageSync('imageBaseUrl');

    let {
      id,
      cate,
      status
    } = options
    this.setData({
      requestCate: cate,
      imageBaseUrl,
      status
    })
    this.initRequestDetail(id)
    this.initRequestReconmmed()
  },

  // init request Detail
  async initRequestDetail(id) {
    let requestCate = this.data.requestCate
    const r = await request({
      url: '/' + requestCate + '/detail',
      data: {
        id: id
      }
    })
    let currentVideo = r.data
    this.setData({
      currentVideo
    })
    this.requestIsGood(id)
  },

  // is good?
  async requestIsGood(id) {
    let requestCate = this.data.requestCate
    let r
    try {
      r = await request({
        url: '/' + requestCate + '/isZan',
        data: {
          id: id
        }
      })
    } catch (e) {
      console.log(e);
    }
    let isGood = Boolean(r.code)
    this.setData({
      isGood
    })
  },

  // good event
  async handleGoodTap(e) {
    const currentVideo = this.data.currentVideo
    let requestCate = this.data.requestCate
    const {
      id
    } = e.currentTarget.dataset
    let r
    try {
      r = await request({
        url: '/' + requestCate + '/doZan',
        data: {
          id: id
        }
      })
    } catch (e) {
      console.log(e);
    }
    const {
      status
    } = r.data
    if (status) { // 点赞成功
      currentVideo.zan++
      wx.showToast({
        title: r.msg,
        icon: 'success',
      })
      this.setData({
        isGood: true
      })
    } else { // 取消点赞
      currentVideo.zan--
      wx.showToast({
        title: r.msg,
        icon: 'none',
      })
      this.setData({
        isGood: false
      })
    }
    this.setData({
      currentVideo
    })
  },

  // init recommend video
  async initRequestReconmmed() {
    let requestCate = this.data.requestCate
    const r = await request({
      url: '/' + requestCate + '/list',
      data: {
        status: this.data.status,
        page: this.page
      }
    })
    let recommendvideoList = r.data.data
    console.log(r);
    this.setData({
      recommendvideoList
    })
  },

  onReady: function () {
    this.queryMultipleNodes()
  },

  onUnLoad: function () {

  },

  onHide: function () {

  },

  //声明节点查询的方法
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('.recommend-title').boundingClientRect() // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.cateTop = res[0].top
    })
  },

  // scroll event
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    if (scrollTop > this.cateTop) {
      wx.setNavigationBarTitle({
        title: '其他推荐',
      });

    } else {
      wx.setNavigationBarTitle({
        title: '视频详情',
      });
    }
  },

  // scroll to lower
  handletolower(e) {
    wx.showToast({
      title: '没有更多内容了呦~',
      icon: 'none',
    })
  },

  // 查看分享
  handleTapShare(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.currentId = id
    this.setData({
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
        url: '/user/shareQrcode',
        data: {
          type: 2,
          status: this.data.status,
          request_cate: this.data.requestCate,
          id: this.currentId
        }
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

});