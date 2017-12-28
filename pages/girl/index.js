//index.js
//获取应用实例
//获取应用实例
const util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    /**
         * 页面配置
         */
    winWidth: 0,
    winHeight: 0,
    // 精选数据
    datalist: [],
    showPre:true,
    url:""
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    /**
    * 获取系统信息
    */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    
    this.loadData();
  },
  loadData: function () {
    /**
    * 发送请求数据
    */
    var random = parseInt(Math.random() * (30) + 20);
    var that = this
    util.getGrils(random, function (res) {
      wx.hideLoading();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      var arr = res.data.results;
      // 然后重新写入数据
      that.setData({
        datalist: arr
      });
    });
  },
  previewImage:function(e){
    var imgs = [];
    for (var i= 0; i < this.data.datalist.length;i++){
      imgs.push(this.data.datalist[i].url)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  }
})
