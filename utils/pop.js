/*
 * @Author: liweilong
 * @Date: 2021-01-11 10:29:59
 */
const success = (title, cb) => {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 1500,
    mask: false,
    success: (result) => {
      cb && cb(result)
    }
  });
}

const error = (title, cb) => {
  wx.showToast({
    title: title,
    icon: 'error',
    duration: 1500,
    mask: false,
    success: (result) => {
      cb && cb(result)
    }
  });
}

const info = (title, cb) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
    mask: false,
    success: (result) => {
      cb && cb(result)
    }
  });
}

const pop = {
  success,
  error,
  info
}

export default pop