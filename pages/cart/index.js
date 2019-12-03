// 识别es7语法文件
import regeneratorRuntime from '../../lib/runtime/runtime';
// 封装的三个API
import { getSetting, chooseAddress, openSetting } from "../../utils/wxAsync";
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 点击获取收货地址按钮
  async handleAddress(){
    // 获取用户的授权状态
    const auth = (await getSetting()).authSetting["scope.userInfo"];
    // console.log(auth);
    // 如果没有授权就打开授权页面
    if(auth === false){
      await openSetting()
    }
    // 如果授权了就获取收货地址
    const res = await chooseAddress()
    console.log(res);
    
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