import request from "../../request/request";

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */

   // wxml中只能找到 data 中的变量的数据 __ data中的数据越多页面越卡
   // data中应该只存放要渲染的数据
  data: {
    // 左边数据
    cateLeft: [],
    // 右边数据
    cateRight: []
  },

  // js内部的全局数据, wxml里面找不到 
  CateList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据
    request({ url: "categories" })
      .then(res => {
        // console.log(res);
        this.CateList = res.data.message;
        this.setData({ cateLeft: this.CateList.map(v => v.cat_name), cateRight: this.CateList[0].children })

      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})