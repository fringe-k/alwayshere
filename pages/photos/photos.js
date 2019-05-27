
var util = require("../../utils/util.js")

Page({
  data: {
    history: [
    ],
    today: "",
    addImg: null,
    isload: false,
    choose:false,
    chooseSize:false,
    tapToChoose:false,
  },
  onLoad: function () {
    let that = this;
    let gbd = getApp().globalData;
    that.setData({
      addImg: gbd.host + "/resource/image/add"
    });
    wx.request({
      method: "Get",
      url: gbd.host + "/pair/records" ,
      header: gbd.cookieHeader,
      success: function (res) {
        console.log(res);
      }
    });
    for (let i = 0; i < that.data.history.length; i++) {
      /*var stringTime = that.data.history[i].date;*/
      var stringTime = "2019-07-10 10:21"
      var timestamp2 = Date.parse(new Date(stringTime));
      var newDate = new Date();
      newDate.setTime(timestamp2);
      var myyear = "history[" + i + "].year";
      var mymonth = "history[" + i + "].month";
      var myday = "history[" + i + "].day";
      that.setData({
        [myyear]: newDate.getFullYear(),
        [mymonth]: newDate.getMonth() + 1,
        [myday]: newDate.getDate()
      });
      console.log(that.data.history[i].year + "年" + that.data.history[i].month + "月" + that.data.history[i].day + "日");
    }
    /*below is today*/
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var string = Y + '年' + M + '月' + D + '日'
    that.setData({
      today: string
    })


  },
  chooseWays:function(e){
     
  },

  toPhotoUp: function(e){
    var that=this;
    that.setData({
      chooseSize: true,
      tapToChoose: true
    })
  },
  hideModal:function(e){
    var that = this;
    that.setData({
      chooseSize: false,
      tapToChoose: false
    })
  },
  album:function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        wx.navigateTo({
          url: '../photosup/up?src=' + res.tempFilePaths,
        });
      },
    })
  },
  camera:function(e){
    var that=this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['camera'], 
      success: function (res) {
        wx.navigateTo({
          url: '../photosup/up?src=' + res.tempFilePaths,
        });
      }
    })
  }



});
