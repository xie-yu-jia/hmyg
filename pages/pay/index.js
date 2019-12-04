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
    // 用户的收货地址
    address: {},
    // 购物车数组
    carts: [],
    // 商品总价格
    totalPrice: 0,
    // 商品总数量
    nums: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 把收货地址设置到data中
    const address = wx.getStorageSync("address") || {};

    // 获取缓存中的购物车数组数据
    const carts = wx.getStorageSync("carts") || [];

    this.setData({address, carts})

    // 计算总价格 商品总数量
    this.countAll(carts)
  },

  // 计算总价格 商品总数量
  countAll(carts){
    let totalPrice = 0
    let nums = 0
    // 如果有一个商品没选中, 全选的状态就是false
    let allChecked = true
    carts.forEach(e => {
      if(e.isChecked){
        totalPrice += e.goods_price * e.nums;
        nums += e.nums
      }else{
        allChecked = false
      }
    });
    this.setData({totalPrice, nums, allChecked})
  },

})