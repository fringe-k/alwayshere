// pages/main/main.js
var util = require("../../utils/util.js")
let app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    togetherdate: 0,
    nextdate: 0,
    addImg:"",
    avatarUrl:""
  },
  onLoad: function (options) {
    let that = this;
    let gbd = getApp().globalData;
    that.setData({
      addImg: gbd.host + "/resource/image/add",
      avatarUrl: gbd.userInfo.avatarUrl
    })
    wx.request({
      method: "Get",
      url: gbd.host + "/pair/memorialDay",
      header: gbd.cookieHeader,
      success:function(res){
        var TIME = util.formatTime(new Date());
        that.setData({
          togetherdate: (TIME - res.memorialDay) > 0 ? (TIME - res.memorialDay > 0):0,
          nextdate: ( res.nextMeetDay-TIME > 0) ? (TIME - res.memorialDay > 0) : 0,
        })
      }
    })
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
 
})