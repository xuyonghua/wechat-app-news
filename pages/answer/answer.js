//answer.js
Page({
  data: {
    userInfo: { "nickName": "default", "avatarUrl": "../../image/icon1.jpeg"},
    detail:{}
  },
  onLoad: function (options) {
    var detail = JSON.parse(options.detail);
    this.setData({
      detail: detail
    })
    
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      }
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
