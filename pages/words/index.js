// pages/words/index.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recvmessages: [
    ],
    sendmessages:[
    ],
    currentTab: 0,
    chooseSize: false,
    animationData: {}
  },

 
  onLoad:function(){
    let that = this;
    let gbd = getApp().globalData;
    wx.request({
      method: "Get",
      url: gbd.host+ "/pair/letters/recv",
      header: gbd.cookieHeader,
      success:function(res){
         for(let i=0;i<res.data.length;i++)
         {
           var l={
             id:res.data[i].id,
             header:res.data[i].title,
             date:res.data[i].time,
             dayDuration:res.data[i].dayDuration,
             notreadflag:!res.data[i].read,
             readable:false,
             needreply: res.data[i].needReply
           };
           if(!l.needreply&&l.dayDuration==0)
           {
             l.readable=true;
           }
           that.data.recvmessages.push(l);
           that.setData({
             recvmessages: that.data.recvmessages
           })
         }
        that.data.recvmessages = util.dateSort(that.data.recvmessages);
        that.setData({
          recvmessages: that.data.recvmessages
        })
        console.log(that.data.recvmessages)
      }
    });
    wx.request({
      method: "Get",
      url: gbd.host + "/pair/letters/send",
      header: gbd.cookieHeader,
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          var l = {
            id: res.data[i].id,
            header: res.data[i].title,
            date: res.data[i].time,
            dayDuration: res.data[i].dayDuration,
            readflag: true
          };
          that.data.sendmessages.push(l);
        }
        that.data.sendmessages=util.dateSort(that.data.sendmessages);
          that.setData({
            sendmessages: that.data.sendmessages
          })
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
  read: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../letters/index?id='+e.currentTarget.id,
    })
  },
  /*write to read*/
  write: function (e) {
    let that=this;
    if(e.currentTarget.dataset.needreply) {
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
          } else {
            wx.navigateTo({
              url: '../writetoopen/writetoopen?id=' + e.currentTarget.id,
            })
          }
        },

      })
    }
    else{
      /*wx.showToast({
        title: '还没到那一天',
        icon: '',
        duration: 1000
      })*/
      if (!this.data.show) {
        let that = this;
        this.setData({
          show: 1
        })
        setTimeout(function () {
          that.setData({
            show: 0
          })
        }, 2000)
      }
      that.setData({
        chooseSize:true
      })
    }
  },
  
  

})