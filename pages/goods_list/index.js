// pages/goods_list/index.js
import request from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 要显示的商品列表
    goods: []
  },
  // 全局的接口参数
  Params:{
    query	:	"",  // 查询关键字
    cid	:	0,    // 分类id
    pagenum	:	1,  // 页码数
    pagesize	: 10,   // 页容量
  },
  // 总页数
  TotalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.Params.cid = options.cid
    this.getList()
  },

  // 获取商品列表数据
  getList(){
    request({
      url: "goods/search",
      data: this.Params
    }).then(res=>{
      // console.log(res);
      // 最开始的空数组
      const {goods} = this.data;
      // 分页的时候把新的数据数组追加进去
      this.setData({
        goods: [...goods,...res.data.message.goods]
      })

      // 计算总页数
      this.TotalPages = Math.ceil( res.data.message.total / this.Params.pagesize );
      // console.log(this.TotalPages);
      
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
      // 判断还有没有下一页数据
      if(this.Params.pagenum >= this.TotalPages){
        console.log('没有下一页数据');
      }else{
        // 有下一页数据
        this.Params.pagenum++; 
        this.getList()        
      }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
      // 数据重置
      this.Params.pagenum = 1;
      this.setData({ goods: [] });      
      // 发送请求
      this.getList();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})