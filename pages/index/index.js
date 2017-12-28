var util = require('../../utils/util.js')
const PAGE_SIZE = 10;
Page({
  data: {
    navTab: ["头条", "社会", "娱乐", "旅游"],
    navId: ["T1348647909107", "T1348648037603", "T1348648517839", "T1348654204705"],
    currentNavtab: "0",
    imgUrls: [
      // '../../image/1.jpg',
      // '../../image/2.jpg',
      // '../../image/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pageNum: 1,
    dataList: [],
    isHideLoadMore: true
  },
  onLoad: function () {
    console.log('onLoad')
    wx.showLoading({
      title: '加载中...',
    })
    this.loadData();
  },
  switchTab: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      dataList:[]
    });
    this.onPullDownRefresh();
  },

  bindItemTap: function (e) {
    var json = e.currentTarget.dataset.json
    wx.navigateTo({
      url: '../answer/answer?detail=' + JSON.stringify(json)
    })
  },
  loadData: function () {
    var id = this.data.navId[this.data.currentNavtab];
    console.log(id)
    var url = "https://c.3g.163.com/nc/article/list/"+id+"/" + this.data.pageNum * 10 + "-10.html";
    util.getData(url, (res) => {
      var imgs = [];
      var arr=[];
      switch (id){
        case "T1348647909107":
          arr = res.data.T1348647909107;
          break;
        case "T1348648037603":
          arr = res.data.T1348648037603;
          break;
        case "T1348648517839":
          arr = res.data.T1348648517839;
          break;
        case "T1348654204705":
          arr = res.data.T1348654204705;
          break;
      }
      
      if (id == "T1348647909107"){//头条
        var arr2 = arr[0].ads;
        for (var i = 0; i < arr2.length; i++) {
          imgs.push(arr2[i].imgsrc)
        }
      }
      
      this.setData({
        imgUrls: imgs,
        dataList: this.data.dataList.concat(arr),
      });
    }, (error) => {
      wx.showToast({
        title: error.errMsg,
      })
    }, () => {
      wx.hideLoading()
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      this.setData({
        isHideLoadMore: true
      })
    })
  },
  onPullDownRefresh: function () {
    this.data.pageNum = 1;
    this.data.dataList = [];
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  },
  onReachBottom: function () {
    this.data.pageNum++;
    this.setData({
      isHideLoadMore: ''
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  }
});
