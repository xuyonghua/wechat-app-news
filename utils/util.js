const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getGrils = function (data = '', callback, method = "get", header = {}) {
  wx.request({
    url: 'https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + data,
    method: method ? method : 'get',
    data: {},
    header: header ? header : { "Content-Type": "application/json" },
    success: function (res) {
      callback(res);
    }
  });
}

var getData = function (url, success, fail, complete,method, data){
    wx.request({
      url: url,
      method:'GET',
      data: data,
      header: { "Content-Type": "application/json" },
      success: (res)=>success(res),
      fail: (error)=>fail(error),
      complete: () => complete()
    })
}

module.exports = {
  formatTime: formatTime,
  getGrils: getGrils,
  getData: getData
}
