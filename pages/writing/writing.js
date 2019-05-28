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
    textheight:"",
    writing:{
        value1:"写信开启",
        checked1:false,
    },
    timing:{
        value2:"定时开启", 
        checked2: false
    },
    days: ['1天后','2天后','3天后','4天后','5天后','6天后','7天后'],
    daystosent:"未选择",
    daysToSent:0,
    dayDuration:0,
    needwriting:false,
    chooseSize: false,
    errormessage:false,
    checkBoxValue:[],
    animationData: {}
  },

  hideModal:function(e){
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: false
    })
  },
  chooseSize: function (e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },

daysPickerChange:function(e){
  var that = this;
  that.setData({
    daystosent: that.data.days[e.detail.value],
    daysToSent: parseInt(e.detail.value)+1
  });
  console.log(that.data.daysToSent)
},
  getInputmyheader: function (e) {
    var that = this;
    that.setData({
      header: e.detail.value
    })
  },

  checkboxChange:function(e) {
    var that=this;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    that.setData({
      checkBoxValue: e.detail.value
    })
  },
    onShow: function() {
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
  isWriting: function(e) {
    var that = this;
    that.setData({
      content: e.detail.value,
    });
  },

  sending: function (e) {
    let that = this;
    let gbd = getApp().globalData;
    var box = that.data.checkBoxValue;
    console.log(box);
    if (box.indexOf("1") > -1 && box.indexOf("2") > -1)
    {
      that.setData({
        needwriting: true,
        dayDuration: that.data.daysToSent,
      });
    }
    else if (box.indexOf("1") > -1 && box.indexOf("2") == -1)
    {
      that.setData({
        needwriting: true,
        dayDuration: 0,
     });
    }
   else if (box.indexOf("1") == -1 && box.indexOf("2") >-1)
   {
      that.setData({
        needwriting: false,
        dayDuration: that.data.daysToSent,
      });
   }
   else{
     that.setData({
       errormessage:true
     })
   }
    if (that.data.errormessage)
    {
      wx.showModal({
        title: '提示',
        content: '请选择开启方式',
        cancelText: "取消",
        confirmText: "确定",
        success: function (res) {}   
          });
      that.setData({
        errormessage: false
      })
    }
   else {
      var TIME = util.formatTime(new Date());
      console.log(TIME);
      wx.request({
        method: "Post",
        url: gbd.host + "/pair/letters/new",
        header: gbd.cookieHeader,
        data: {
          time: TIME,
          dayDuration: that.data.dayDuration,
          needReply: that.data.needwriting,
          read: false,
          title: that.data.header,
          text: that.data.content
        },
        success:function(res){
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1000
          })
        }
      });

      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      })
      that.animation = animation
      animation.translateY(200).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }
    wx.redirectTo({
      url: '../words/index',
    })
  },

})