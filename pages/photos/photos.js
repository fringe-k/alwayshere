
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
        year: "",
        month: "",
        date: ""
      },
      {
        date: "2020-07-10 10:21",
        img1: "",
        word1: "你吃了吗",
        img2: "",
        word2: "吃了榴莲",
        year: "",
        month: "",
        date: ""
      }
    ]

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
  },

  onShow: function () {


  }


});
