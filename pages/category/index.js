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
    cateRight: [],
    // 被激活的索引
    currentIndex: 0,
    // 右侧滚动条的距离
    scrollTop: 0
  },

  // js内部的全局数据, wxml里面找不到 
  CateList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 获取缓存中的数据
    const cates = wx.getStorageSync('cates');
    // 如果没有数据就发送请求
    if(!cates){
      this.getCateList()
    }else{
      // 如果有数据
      // 判断是否过期   10s
      if(Date.now() - cates.time > 10 * 1000){
        // 过期了就重新发起请求
        this.getCateList()
      }else{
        // 如果没有过期
        // 全局总数据
        this.CateList = cates.list;

        this.setData({
          // 左侧菜单栏数据
          cateLeft: this.CateList.map(v=>v.cat_name),
          // 右侧商品列表数据
          cateRight: this.CateList[this.data.currentIndex].children
        })
      }
    }
    
  },

  getCateList(){
    // 获取数据
    request({ url: "categories" })
      .then(res => {
        // console.log(res);
        this.CateList = res.data.message;
        this.setData({ cateLeft: this.CateList.map(v => v.cat_name), cateRight: this.CateList[this.data.currentIndex].children })

        // 把数据存储到缓存中
        wx.setStorageSync("cates", {list: this.CateList, time: Date.now()});
          
      })
  },

  // 左侧的点击事件
  handleTap(e){
    // console.log(e);
    const {index} = e.currentTarget.dataset;
    this.setData({currentIndex: index,cateRight: this.CateList[index].children, scrollTop: 0})
    
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