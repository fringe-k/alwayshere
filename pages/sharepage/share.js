// pages/sharepage/share.js
import Request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canGetInfo: wx.canIUse('button.open-type.getUserInfo'),
    hasInfoAccess: false,
  },

  onShow: function () {
    let app = getApp();
    //等待app.js完成登录
    if (!app.globalData.hasLogin) {
      app.loginCallback = this.onLoginCallback;
    } else {
      this.onLoginCallback();
    }
  },

  onLoginCallback: function () {
    let page = this;
    let req = new Request(getApp().globalData);
    req.getUserInfo()
      .then(req.getPair)
      .then(req.getWxUserInfo)
      .then(req.updateUserAvatar)
      .then(this.onDataReadyPromise)
      .catch(r => {
        if (r.code === 0) {
          page.setData({
            hasInfoAccess: false
          });
        }
      });
  },
  getWxUserInfo: function (res) {
    let req = new Request(getApp().globalData);
    req.updateUserAvatar(JSON.parse(res.detail.rawData))
      .then(this.onDataReadyPromise);
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
    that.setData({
      hasInfoAccess: true
    })
  },
  confirmBind:function(e){
    let that = this;
    let gbd = getApp().globalData;
    console.log(gbd.theOtherid);
    console.log(gbd.userInfo.id);
    wx.showModal({
      title: '提示',
      content: '您确定绑定吗',
      cancelText: "取消",
      confirmText: "确定",
      success:function(res){
        if(res.cancel){}
        else {
          wx.request({
            method: "PUT",
            url: gbd.host + "/pair",
            header: gbd.cookieHeader,
            data: {
              leftWeUserId: gbd.userInfo.id,
              rightWeUserId: gbd.theOtherid
            },
          })
        }
      }
  })
  }

})