/*
 * @Author: liweilong
 * @Date: 2021-01-12 14:14:25
 */

//  choose img and upload
export const uploadOneImg = () => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    });

  })
}