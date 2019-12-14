import request from "../../request/request";

//  定时器的id的默认值
let timeId = -1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  // 输入框的输入事件  小米
  handleInput(e) {
    /* 
    
    1 当用户第一次输入的时候 开始一个定时器    id= 0  1s后执行 
    2 当用户 在 1s 之内 有了第二次的输入   
      先执行 clearTimeout(timeId); 
      也开启了一个新的定时器 id=1 
    3 重复 步骤2 
      。。。。。
    
    */
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      const value = e.detail.value;

      request({ url: "goods/qsearch", data: { query: value } }).then(res => { this.setData({ list: res.data.message }) })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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