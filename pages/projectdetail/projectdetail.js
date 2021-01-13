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
    prodetailList: [{id: 0},
      {id: 1},
      {id: 2}
    ],
    page: 0,
    current: 0
  },
  //options(Object)
  onLoad: function (options) {

  },

  // swiper animationfinish end
  handleSwiperChange(event) {
    let page = this.data.page
    let prodetailList = this.data.prodetailList
    const {
      current
    } = event.detail
    console.log(current);
    if (current == 0 && page != 0) { // 加载上一页数据
      // 向prodetailList数组的头部添加上一页数据
      // 去掉prodetailList末尾的数据，让其永远保持三个数据
      // 然后page减一
      // prodetailList.unshift({id: 0})
      // prodetailList.pop()
      // page--
      console.log('加载上一页数据')
    } else if (current == 2) { // 加载下一页的数据
      prodetailList.shift()
      prodetailList.push({id: 3})
      page++
      console.log('加载下一页数据')
    } else {
      console.log('不加载');
      return false;
    }

    this.setData({
      prodetailList,
      page,
      
    })

  },

  // 
  handleAnimationEnd(event) {
    const {current} = event.detail
    // console.log(current);
    if (current == 2) {
      console.log(2);
      this.setData({
        current: 1
      })
    }
  }

});