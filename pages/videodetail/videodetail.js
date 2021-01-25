/*
 * @Author: liweilong
 * @Date: 2021-01-13 14:23:37
 */
import {
  request
} from '../../request/index'
//Page Object
Page({
  data: {
    cateTop: 0,
    navigationTitle: '',
    imageBaseUrl: '',
    currentVideo: {},
    requestCate: '',
    status: 0,
    recommendvideoList: [],
    
    isShowShare: false,

    isGood: false
  },
  page: 0,
  //options(Object)
  onLoad: function (options) {
    // 获取七牛云地址
    let imageBaseUrl = wx.getStorageSync('imageBaseUrl');

    let {
      id,
      cate,
      status
    } = options
    console.log(id, cate, status);
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
    console.log(currentVideo);
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
    } catch(e) {
      console.log(e);
    }
    let isGood = Boolean(r.code)
    console.log(isGood);
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
    const {status} = r.data
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
      this.setData({
        cateTop: res[0].top
      })
    })
  },

  // scroll event
  handlescroll(e) {
    let {
      scrollTop
    } = e.detail
    if (scrollTop > this.data.cateTop) {
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
    this.setData({
      isShowShare: true
    })
  },

});