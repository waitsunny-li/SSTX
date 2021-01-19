/*
 * @Author: liweilong
 * @Date: 2020-11-17 15:10:29
 */
const app = getApp();
const baseUrl = app.globalData.baseUrl

export const request = (params) => {
  const token = wx.getStorageSync('token');
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + '/api' + params.url,
      header: {
        token
      },
      success: (result) => {
        if (result.data.code == 401) {
          reject(result.data.code)
        } else {
          resolve(result.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}