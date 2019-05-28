// pages/writing/writing.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headercontent: "请输入标题(最多10字)",
    header: "",         //信的标题
    contentcontent: "请写下你的信",
    content: "",       //信的内容
    textheight: "",
    needwriting: false,
    chooseSize: false,
    letterid:"",
  },

  onLoad:function(options){
    let that = this;
    let gbd = getApp().globalData;
    that.setData({
      letterid: parseInt(options.id)
    })
  },

  getInputmyheader: function (e) {
    var that = this;
    that.setData({
      header: e.detail.value
    })
  },


  onShow: function () {
    var that = this;
    let id = "#textwrap";
    let query = wx.createSelectorQuery();//创建查询对象
    query.select(id).boundingClientRect();//获取view的边界及位置信息
    query.exec(function (res) {
      that.setData({
        textheight: res[0].height + "px"
      });
      console.log(res[0].height);
    });
  },
  isWriting: function (e) {
    var that = this;
    that.setData({
      content: e.detail.value,
    });
  },

  sending: function (e) {
    let that = this;
    let gbd = getApp().globalData;
    var TIME = util.formatTime(new Date());
    wx.showModal({
        title: '提示',
        content: '确定发送?',
        cancelText: "取消",
        confirmText: "确定",
        success: function (res) {
          if(res.cancel){}
          else {
            wx.request({
              method: "Post",
              url: gbd.host + "/pair/letters/reply/" + that.data.letterid,
              header: gbd.cookieHeader,
              data: {
                time: TIME,
                dayDuration: 0,
                needReply: false,
                read: false,
                title: that.data.header,
                text: that.data.content
              },
              success: function (e) {
                wx.showToast({
                  title: '发送成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            });
          }
          wx.redirectTo({
            url: '../words/index',
          })
        }
      })
    }


})