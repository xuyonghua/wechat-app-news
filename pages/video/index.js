//index.js
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const PAGE_SIZE = 10;
Page({
  data: {
    video: [],
    video_length: 0,
    pageNum:1,
    isHideLoadMore:true
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onLoad: function () {
    console.log('onLoad')
    this.loadData();
  },
  loadData:function(){
    var url = "https://c.3g.163.com/nc/video/list/V9LG4E6VR/n/"+this.data.pageNum*10+"-10.html";
    util.getData(url,(res)=>{
      this.setData({
        video: this.data.video.concat(res.data.V9LG4E6VR)
      });
    },(error)=>{
      wx.showToast({
        title: error.errMsg,
      })
    },()=>{
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      this.setData({
        isHideLoadMore: true
      })
    })
  },
  onPullDownRefresh:function(){
    this.data.pageNum = 1;
    this.data.video = [];
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  },
  onReachBottom:function(){
    this.data.pageNum++;
    this.setData({
      isHideLoadMore: ''
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  }
})
