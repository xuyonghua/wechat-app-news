Page({
  data: {
    text: '3S跳过',
    count:0,
    interval:null
  },
  onReady:function(){
    this.data.interval = setInterval(()=>{
      console.log(this.data.count)
      if (3-this.data.count == 0){
        clearInterval(this.data.interval);
        this.goHomePage();
        return;
      }
      this.data.count++;
        this.setData({
          text: (3-this.data.count)+'S跳过'
        })
    },1000);
    // setTimeout( ()=>{
    //   this.goHomePage();
    // }, 3000);
  },
  goHomePage:function(){
    clearInterval(this.data.interval);
    wx.switchTab({
      url: '../index/index',
    });
  }
})
