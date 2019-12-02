// components/Tabbar/Tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // Tabbar数组
    tabbarList:{
      type: Array,
      value: []
    },
    // 索引
    currentIndex:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabbar(e){
      console.log(e);
      const index = e.currentTarget.dataset.index;

      this.triggerEvent("tabbarChange",{index});
    }
  }
})
