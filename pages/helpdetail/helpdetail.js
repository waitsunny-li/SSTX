/*
 * @Author: liweilong
 * @Date: 2021-01-14 16:31:41
 */
//Page Object
Page({
  data: {

  },
  //options(Object)
  onLoad: function(options) {
    let {title, id} = options
    wx.setNavigationBarTitle({
      title
    });
      
  },
  
});
  