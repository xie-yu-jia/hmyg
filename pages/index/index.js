import request from "../../request/request"

Page({
  data: {
    // 轮播图图片数组
    swiperList: [],
    // 导航栏数组
    navs: [],
    // 楼层数组
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // 获取轮播图图片
    request({url: 'home/swiperdata'})
      .then(result => {
        // console.log(result);
        this.setData({ swiperList: result.data.message })
      });

    // 获取导航栏数据
    request({url: 'home/catitems'})
      .then(result => {
        // console.log(result);
        this.setData({ navs: result.data.message })
      });

    // 获取楼层数据
    request({url: 'home/floordata'})
      .then(result => {
        // console.log(result);
        this.setData({ floorList: result.data.message })
      });

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
