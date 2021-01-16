/*
 * @Author: liweilong
 * @Date: 2021-01-16 09:13:05
 */
import {request} from '../../request/index'
import {wxLogin} from '../../utils/asyncWx'
//Component Object
Component({
  properties: {
    isShowClose: {
      type: Boolean,
      value: true
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: '_isShowChange'
    }
  },
  data: {
    animationData: null
  },
  methods: {
    _isShowChange(newVal) {
      if (newVal) {
        this.createScaleAnimation(0.2, 1)
      } else {
        this.setData({
          animationData: null
        })
      }

      console.log('_isShowChange', newVal);
    },

    // 处理关闭事件
    handleClose(e) {
      this.createScaleAnimation(1, 0.2)
      setTimeout(() => {
        this.setData({
          isShow: false,
        })
      }, 200)
    },

    // create scale animation
    createScaleAnimation(start, end) {
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0,
      });
      this.animation = animation
      animation.scale(start).step();
      setTimeout(() => {
        animation.scale(end).step();
        this.setData({
          animationData: animation
        })
      }, 50)
      this.setData({
        animationData: animation.export()
      })
    },

    async handleGetUserInfo(e) {
      const userInfo = e.detail.userInfo
      const {
        avatarUrl,
        gender,
        nickName
      } = e.detail.userInfo
      wx.showLoading({
        title: '登录中',
      })
      const {
        code
      } = await wxLogin();
      const {
        data
      } = await request({
        url: '/user/login',
        data: {
          code,
          gender,
          avatar: avatarUrl,
          nickname: nickName
        }
      })
      console.log(data);
      wx.setStorageSync('token', data.token);
      wx.hideLoading();
      wx.setStorageSync('userInfo', userInfo);
      this.triggerEvent('getUserInfo', {
        userInfo
      })
      this.handleClose()
    }
  },

  attached() {
    let isShow = this.data.isShow
    this.setData({
      isShow
    })
  }

});