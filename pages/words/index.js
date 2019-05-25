// pages/words/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recvmessages: [
    ],
    sendmessagaes:[],
    currentTab: 0
  },

  onLoad:function(){
    let that = this;
    let gbd = getApp().globalData;
    wx.request({
      method: "Get",
      url: gbd.host + "/pair/letters/recv",
      header: gbd.cookieHeader,
      success:function(res){
    console.log(res);
      }
    })
 },
  tabClick: function (e) {
    var that = this;
    if (that.data.currentTab == e.currentTarget.id) {
      return false;
    }
    else {
      that.setData({
        currentTab: e.currentTarget.id
      });
    }
  },
  bindChange: function (e) {
    var that = this;

    that.setData({
      currentTab: e.detail.current
    });
  },

  /*to writing*/
  toWriting: function () {
    wx.navigateTo({
      url: '../writing/writing',
    })
  },
  /*read*/
  read: function () {
    wx.navigateTo({
      url: '../letters/index',
    })
  },
  /*write to read*/
  write: function () {
    wx.showModal({
      title: '提示',
      content: '请写一封信以交换本信',
      showCancel: true,
      cancelText: "取消",
      cancelColor: 'black',
      confirmText: "写信",
      confirmColor: 'green',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.navigateTo({
            url: '../writetoopen/writetoopen',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})