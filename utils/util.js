/*
 * @Author: liweilong
 * @Date: 2021-01-04 12:26:31
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// const procity = ['北京', '北京市']
export const addressTransIndexArray = (provinceList, cityList, procity) => {
  let proIndex, cityIndex, cityArry, proName, cityName
  let objectCityArray = []
  objectCityArray[0] = provinceList
  // get index of province
  provinceList.some((v, index) => {
    if (procity[0].includes(v.name)) {
      cityArry = cityList[v.id]
      objectCityArray[1] = cityArry
      proIndex = index
      proName = v.name
      return true
    }
  })
  // get index of cityList
  cityArry.some((v, index) => {
    if (v.name.includes(procity[1])) {
      cityIndex = index
      cityName = v.name
      return true
    }
  })

  return {
    procityIndex: [proIndex, cityIndex],
    procityName: [proName, cityName],
    objectCityArray,
  }
}

// 获取缓存中的procityObj，如果有
export const getCacheLocationInfo = function () {
  const procityObj = wx.getStorageSync('procityObj');
  if (procityObj) {
    this.setData({
      procityIndex: procityObj.procityIndex,
      provinceName: procityObj.procityName[0],
      cityName: procityObj.procityName[1],
      objectCityArray: procityObj.objectCityArray
    })
  }
}


// 获取数组数据，并返回只含有id的数组
export const returnIdArry = arryList => {
  let newarry = []
  arryList.forEach(v => {
    newarry.push(v.id)
  })
  return newarry
}

// 只截取数组中的10个
export const sliceArrayTen = (arry, value) => {
  let index
  let len = arry.length
  if (len <= 10) return arry;
  // > 10
  // 获取value在数组arry的下标
  arry.some((v, i) => {
    if (v == value) {
      index = i
      return true
    }
  })
  // 切割index后面的
  let rightSlice = arry.slice(index, index + 10)
  let rightLen = rightSlice.length
  if (rightLen == 10) return rightSlice;
  // 切割index前面的
  let leftArry = arry.slice(index - (10 - rightLen), index)
  let newArr = rightSlice.concat(leftArry)
  return newArr
}

// 倒计时天时分钟秒
export const countDown = (endTime, that) => { //倒计时函数
  let newTime = new Date().getTime();
  let remainTime = endTime * 1000 - newTime;
  let obj = null;
  let t = '';
  // 如果活动未结束，对时间进行处理
  if (remainTime > 0) {
    let time = remainTime / 1000;
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    obj = formatNumber(day) + '天' + formatNumber(hou) + ':' + formatNumber(min) + ':' + formatNumber(sec)
  }
  t = setTimeout(function () {
    that.setData({
      residueTime: obj
    });
    countDown(endTime, that)
  }, 1000)
  if (remainTime <= 0) {
    clearTimeout(t);
  }
}