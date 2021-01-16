/*
 * @Author: liweilong
 * @Date: 2020-11-17 15:10:29
 */
const app = getApp();
const baseUrl = app.globalData.baseUrl
const token = wx.getStorageSync('token');
  
export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + '/api' + params.url,
      header: {token},
      success: (result) => {
        resolve(result.data)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}