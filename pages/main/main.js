// pages/main/main.js
let app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    togetherdate: 360,
    nextdate: 360
  },
  toPageInfo: function () {
    wx.navigateTo({
      url: '../pairInfo/pairInfo',
    })
  },
  toPageHeSpeak: function () {
    wx.navigateTo({
      url: '../words/index',
    })
  },
  toPageWithYou: function () {
    wx.navigateTo({
      url: '../photos/photos',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app=getApp();
  },
})