// pages/goods_detail/index.js
import request from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情页数据
    goodsInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    this.getDetail(options.goods_id);
  },

  // 获取详情页数据
  getDetail(goods_id){
    request({
      url: 'goods/detail',
      data: { goods_id }
    }).then(res=>{
      // console.log(res.data.message);
      this.setData({ goodsInfo: res.data.message })
    })
  },

  // 点击轮播图图片放大预览
  handlePreviewImage(e){
    // console.log(e);

    // 当前显示图片的http链接
    const current = e.currentTarget.dataset.src;
    // 需要预览的图片http链接列表
    const urls = this.data.goodsInfo.pics.map(v=>v.pics_big);
    // 预览图片---内置API 
    wx.previewImage({
      current,
      urls
    });
  },

  // 点击加入购物车
  handleGoodsAdd(){
    // 1. 获取购物车的数组 此时缓存中没有
    let carts = wx.getStorageSync("carts") || [];
      // console.log(carts);
    // 2. 判断当前商品是否已经存在
    const index = carts.findIndex(v => v.goods_id === this.data.goodsInfo.goods_id)
    // 3. 判断逻辑
    if(index === -1){
      // 如果不存在 就添加到购物车里面, 顺便添加一个购买数量属性
      carts.unshift({...this.data.goodsInfo,nums: 1});
    }else{
      // 如果存在了, 当前商品的数量 +1
      carts[index].nums++;
    }
    // 4. 重新添加到缓存中
    wx.setStorageSync("carts", carts);
    
    // 提示加入购物车成功
    wx.showToast({
      title: '加入购物车成功',
      mask: true
    });
      
    
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