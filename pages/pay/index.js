// 识别es7语法文件
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, login, requestPayment } from "../../utils/wxAsync";
import request from "../../request/request";

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

    // carts 应该要返回用户选择了的商品
    this.setData({address, carts: carts.filter(v => v.isChecked)})

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

  // 点击支付
  async bindGetUserInfo(e){
    // console.log(e);
    // 获取用户信息中的参数
    const { encryptedData, rawData, iv, signature } = e.detail
    // 执行微信小程序的内置登录API
    const { code } = await login()
    
    const loginParams = { encryptedData, rawData, iv, signature, code }

    // 获取用户的token
    const {token} = (await request({
        url: "users/wxlogin",
        method: "post",
        data: loginParams
    })).data.message
    // console.log(token);

    // 获取订单编号  需要参数
    let orderParams = {
      // 订单的总价格
      order_price: this.data.totalPrice,
      // 收货地址
      consignee_addr: this.data.address.provinceName,
      // 商品数组 具体的说明看接口文档
      goods: this.data.carts.map(v => ({
        goods_id: v.goods_id,
        // 购买的数量
        goods_number: v.nums,
        goods_price: v.goods_price
      }))
    }
    // 创建订单 获取订单编号
    const order_number = (await request({url: "my/orders/create", method: "post", data: orderParams, header: { Authorization: token}})).data.message.order_number;

    // 获取支付参数
    const pay = (await request({ url: "my/orders/req_unifiedorder", method: "post", data: { order_number }, header: { Authorization: token } })).data.message.pay;

    // 调起微信支付  手机会出现支付的画面
    const res = (await requestPayment(pay))

    // 还需要查看一下 我们自己后台的订单状态
    const resl = (await request({ url: "my/orders/chkOrder", method: "post", data: { order_number }, header: { Authorization: token } }));

    // 获取缓存中完整的购物车数据
    let carts = wx.getStorageSync("carts")
    // 留下未选中的商品
    carts = carts.filter(v => !v.isChecked)
    wx.setStorageSync("carts", carts);

    // 弹出窗口 提示用户
    wx.showToast({
      title: '支付成功',
      duration: 1500,
      mask: true,
      success: (result) => {
        wx.navigateTo({
          url: '/pages/order/index.js',
        });
                  
      },
    });
      
      
  }
})