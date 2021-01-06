/*
 * @Author: liweilong
 * @Date: 2020-11-17 15:10:29
 */
export const request = (params) => {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://stx.gz-isp.com/api'
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}