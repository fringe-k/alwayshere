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
    avatarUrl:"",
    res:""
  },
  onShow: function (options) {
    let that = this;
    let gbd = getApp().globalData;
    that.setData({
      addImg: gbd.host + "/resource/image/add",
      avatarUrl: gbd.userInfo.avatarUrl,
      res: gbd.memorialDayInfo
    })
    var TIME = util.formatTime(new Date());
    var mem = new Date((that.data.res.memorialDay).replace(/-/g, "/"));
    var nex = new Date((that.data.res.nextMeetDay).replace(/-/g, "/"));
    var time = new Date(TIME);
    that.setData({
      togetherdate: (time - mem) > 0 ? parseInt( (time - mem)/(1000 * 3600 * 24)): 0,
      nextdate: (nex - time) > 0 ? parseInt((nex - time) / (1000 * 3600 * 24) ): 0,
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