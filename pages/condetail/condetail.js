/*
 * @Author: liweilong
 * @Date: 2021-01-11 10:29:59
 */
//Page Object
Page({
  data: {
    seenAvaList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    detailList: [{},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    currentIdIndex: 0,
    current: 0,
    isUp: false,
    idList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  //options(Object)
  onLoad: function (options) {
    let detailList = this.data.detailList
    let idList = this.data.idList
    let {id} = options
    let currentIdIndex = this.idReturnIndex(id)
    detailList[0] = {id: idList[currentIdIndex]}
    this.setData({
      currentIdIndex,
      detailList
    })
  },

  // swiper animationfinish end
  handleSwiperChange(event) {
    let currentIdIndex = this.data.currentIdIndex
    let detailList = this.data.detailList
    let isUp = this.data.isUp
    const {
      current
    } = event.detail

    if (!isUp) { // 向下滑动
      detailList[current] = {
        id: ++currentIdIndex
      }
      console.log('向下滑动', currentIdIndex);
    } else { // 向上滑动
      --currentIdIndex
      detailList[current] = {
        id: currentIdIndex
      }
      console.log('向上滑动', currentIdIndex);
    }
    this.setData({
      detailList,
      current,
      currentIdIndex
    })

  },

  handleTransiton(event) {
    const {
      dx: dx,
      dy: dy
    } = event.detail
    if (dy > 0) { // 向下滑动
      this.setData({
        isUp: false
      })
    } else { // 向上滑动
      this.setData({
        isUp: true
      })
    }
  },

  // 
  handleAnimationEnd(event) {

  },

  // 根据当前数据id返回对应的下标
  idReturnIndex(id) {
    let currentIdIndex
    let idList = this.data.idList
    idList.some((v, index) => {
      if(v == id) {
        currentIdIndex = index
        return true
      }
    })
    return currentIdIndex
  }

});