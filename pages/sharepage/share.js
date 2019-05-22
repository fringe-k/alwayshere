// pages/sharepage/share.js
import Request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canGetInfo: wx.canIUse('button.open-type.getUserInfo'),
    hasInfoAccess: false,
    userInfo:"",
    pairInfo:""
  },
  onShow: function (options) {
    let app = getApp();
    var that=this;
  
  },

  onLoginCallback: function () {
    let page = this;
    let req = new Request(getApp().globalData);
    req.getUserInfo()
      .then(req.getPair)
      .then(req.getWxUserInfo)
      .then(req.updateUserAvatar)
      .catch(r => {
        if (r.code === 0) {
          page.setData({
            hasInfoAccess: false
          });
        }
      });
  },
  getWxUserInfo: function (res) {
    var that=this;
    let req = new Request(getApp().globalData);
    req.updateUserAvatar(JSON.parse(res.detail.rawData))
      .then(this.onDataReadyPromise);
    that.setData({
      hasInfoAccess: true
    });
    wx.request({
      method: "POST",
      url: data.host + "/pair",
      header: data.cookieHeader,
      data: {
        leftUserId:that.userInfo,
        rightUserId:that.pairInfo
        },
      success(res) {
        data.userInfo = res.data;
        resolve(res.data);
      }
  })
 }
})