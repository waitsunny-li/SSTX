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
    requestList: {
      support: '/support/detail',
      school: '/school/detail'
    },
    requestRecommendList: {
      support: '/support/list',
      school: '/school/list'
    },
    isShowShare: false,
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
    let requestList = this.data.requestList
    let requestCate = this.data.requestCate
    const r = await request({
      url: requestList[requestCate],
      data: {
        id: id
      }
    })
    let currentVideo = r.data
    console.log(currentVideo);
    this.setData({
      currentVideo
    })
  },

  // init recommend video
  async initRequestReconmmed() {
    let requestRecommendList = this.data.requestRecommendList
    let requestCate = this.data.requestCate
    const r = await request({
      url: requestRecommendList[requestCate],
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