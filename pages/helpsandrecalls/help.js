// pages/helpsandrecalls/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toUseOfTa:function(e){
  wx.navigateTo({
    url: '../useOfTashuo/Ta',
  })
  },
  toUseOfYu: function (e) {
    wx.navigateTo({
      url: '../useOfYuNi/Yu',
    })
  },
  toUseOfUs: function (e) {
    wx.navigateTo({
      url: '../useOfUs/Us',
    })
  },
  toUseOfBye: function (e) {
    wx.navigateTo({
      url: '../useOfBye/Bye',
    })
  }

})