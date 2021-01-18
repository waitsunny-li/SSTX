/*
 * @Author: liweilong
 * @Date: 2021-01-04 12:26:31
 */
//app.js

App({
  getUserLocation: function (callback) {
    let vm = this
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        // 拒绝授权后再次进入重新授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '善天下高端人脉平台',
            content: '善天下需要获取您的位置，请确认授权',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    // console.log('dataAu:success', dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation(dataAu, callback)
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                      })
                    }
                  }
                })
              } else {
                console.log('ddd');
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none'
                })
              }
            },
            fail: () => {},
            complete: () => {}
          });

        } // 初始化进入，未授权
        else if (res.authSetting['scope.userLocation'] == undefined) {
          // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLocation(res, callback)
        } // 已授权
        else if (res.authSetting['scope.userLocation']) {
          // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLocation(res, callback)
        }
      }
    })
  },

  getLocation: function (userLocation, callback) {
    let vm = this
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        callback && callback({latitude,longitude});
      },
      fail: () => {
        if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
          console.log('wolail')
          // 第一次调用小程序默认的，取消会再次调用getUserLocation
          vm.getUserLocation(callback)
        } else if (userLocation.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '',
            content: '请在系统设置中打开定位服务',
            showCancel: false,
            success: result => {}
          })
        } else {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      }
    })

  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  // set uploadBaseUrl
  setUploadUrl: function(url) {
    this.globalData.uploadBaseUrl = url
  },

  globalData: {
    userInfo: null,
    baseUrl: 'https://stx.gz-isp.com',
    uploadBaseUrl: ''
  }
})