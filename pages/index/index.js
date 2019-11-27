//Page Object
Page({
  data: {
    // 轮播图图片数组
    swiperList:[],
    // 导航栏数组
    navs:[]
  },
  //options(Object)
  onLoad: function(options) {
    // 获取轮播图图片
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result);
        this.setData({swiperList: result.data.message})
      },
    });

    // 获取导航栏数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
        //  console.log(result);
         this.setData({navs: result.data.message})
      }
    });
      
      
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  