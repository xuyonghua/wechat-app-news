# wechat-app-news
A wechat app include news，videos and beautiful girls。
### 项目截图
![image](https://github.com/xuyonghua/wechat-app-news/blob/master/screenshots/Screenshot_splash.jpg?raw=true)
![image](https://github.com/xuyonghua/wechat-app-news/blob/master/screenshots/Screenshot_头条.jpg?raw=true)
![image](https://github.com/xuyonghua/wechat-app-news/blob/master/screenshots/Screenshot_社会.jpg?raw=true)
![image](https://github.com/xuyonghua/wechat-app-news/blob/master/screenshots/Screenshot_detail.jpg?raw=true)
![image](https://github.com/xuyonghua/wechat-app-news/blob/master/screenshots/Screenshot_video.jpg?raw=true)
![image](https://github.com/xuyonghua/wechat-app-news/blob/master/screenshots/Screenshot_girl.jpg?raw=true)

### 使用api
首页和视频（网易）
首页
http://c.3g.163.com/nc/article/list/T1348647909107/10-10.html
- 头条 T1348647909107
- 社会 T1348648037603
- 娱乐 T1348648517839
- 旅游 T1348654204705

视频
http://c.3g.163.com/nc/video/list/V9LG4E6VR/n/10-10.html

妹子（gankio）
https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/30

### 欢迎广告页实现，定时跳过
```
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

```


### 请求封装
```
var getData = function (url, success, fail, complete,method, data){
    wx.request({
      url: url,
      method:method ? method : 'GET',
      data: data,
      header: { "Content-Type": "application/json" },
      success: (res)=>success(res),
      fail: (error)=>fail(error),
      complete: () => complete()
    })
}
```
### 下拉刷新，上拉加载
```
//在.json文件配置
"enablePullDownRefresh": true,
"backgroundColor": "#298DE5"

//下拉刷新
onPullDownRefresh:function(){
    this.data.pageNum = 1;
    this.data.video = [];
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  },
  //上拉加载
  onReachBottom:function(){
    this.data.pageNum++;
    this.setData({
      isHideLoadMore: ''
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
  }
```
### 妹子瀑布流实现
### video 
```
//标题
<cover-view class="title">{{item.title}}</cover-view>
```
### License
Copyright (C) 2017 xuyonghua

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.



