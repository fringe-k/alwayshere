
var util = require("../../utils/util.js")

Page({
  data: {
    history: [
      {
        date: "2019-07-10 10:21",
        img1: "",
        word1: "你吃了吗",
        img2: "",
        word2: "吃了榴莲",
      },
      {
        date: "2020-07-10 10:21",
        img1: "",
        word1: "你吃了吗",
        img2: "",
        word2: "吃了榴莲dsajdiasjdiasdsadasdasdasjsiad",
      }
    ],
    today: "",
    isload: false

  },
  onLoad: function () {
    var that = this;
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

  tophotoup: function(e){
    wx.navigateTo({
      url: '../photosup/up',
    })
  }



});
