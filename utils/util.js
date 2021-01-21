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
export const getCacheLocationInfo = function() {
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