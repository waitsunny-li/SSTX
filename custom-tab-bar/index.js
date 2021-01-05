/*
 * @Author: liweilong
 * @Date: 2020-11-18 10:37:47
 */
Component({
  data: {
    selected: 0,
    color: "#333333",
    selectedColor: "#aa0100",
    list: [{
        "pagePath": "/pages/index/index",
        "iconPath": "/icons/index.png",
        "selectedIconPath": "/icons/index-active.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/support/support",
        "iconPath": "/icons/dianzan.png",
        "selectedIconPath": "/icons/dianzan-active.png",
        "text": "各界支持"
      },

      {
        "pagePath": "/pages/publish/publish",
        "iconPath": "/icons/fabu.png",
        "selectedIconPath": "/icons/fabu.png",
        "text": "发布"
      },
      {
        "pagePath": "/pages/proconnection/proconnection",
        "iconPath": "/icons/renmai.png",
        "selectedIconPath": "/icons/renmai-active.png",
        "text": "项目人才库"
      },
      {
        "pagePath": "/pages/profile/profile",
        "iconPath": "/icons/profile.png",
        "selectedIconPath": "/icons/profile-active.png",
        "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data.index);
      if (data.index == 2) {

      } else {
        wx.switchTab({
          url
        })
      }
    }
  }
})