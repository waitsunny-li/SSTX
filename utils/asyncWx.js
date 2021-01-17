/*
 * @Author: liweilong
 * @Date: 2021-01-12 14:14:25
 */
const app = getApp();
const baseUrl = app.globalData.baseUrl
//  choose img and upload
export const chooseOneImg = option => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: option.count || 1,
      sizeType: option.sizeType || ['original', 'compressed'],
      sourceType: option.sourceType || ['album', 'camera'],
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    });

  })
}
export const uploadFile = option => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...option,
      url: baseUrl + '/api/common/upload',
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
    
}

// wx-login
export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    });
  })
}

// get location
export const wxLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

// show modal sure
export const showModal = option => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: option.title,
      content: option.content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          resolve()
        } else {
          reject()
        }
      }
    })
  })
}