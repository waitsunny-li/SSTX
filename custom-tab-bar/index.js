/*
 * @Author: liweilong
 * @Date: 2020-11-18 10:37:47
 */
Component({
  data: {
    selected: 0,
    color: "#9595ba",
    selectedColor: "#1a243c",
    list:  [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/icons/home.png",
        "selectedIconPath": "/icons/home_active.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/choiceness/choiceness",
        "iconPath": "/icons/jingxuan.png",
        "selectedIconPath": "/icons/jingxuan_active.png",
        "text": "精选"
      },
      {
        "pagePath": "/pages/weal/weal",
        "iconPath": "/icons/liwu.png",
        "selectedIconPath": "/icons/liwu_active.png",
        "text": "福利社"
      },
      {
        "pagePath": "/pages/profile/profile",
        "iconPath": "/icons/mine.png",
        "selectedIconPath": "/icons/mine_active.png",
        "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data.index);
      wx.switchTab({url})
    }
  }
})