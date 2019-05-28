
var util = require("../../utils/util.js")

Page({
  data: {
    history: [
    ],
    today: "",
    addImg: null,
    hasNotLoad: true,
    choose: false,
    chooseSize: false,
    tapToChoose: false,
    userId: -1,
    otherId: -1,
    img2: "",
    text2: "",
    today: ""
  },
  onLoad: function () {
    let that = this;
    let gbd = getApp().globalData;
    that.setData({
      addImg: gbd.host + "/resource/image/add",
      userId: gbd.userInfo.id,
      otherId: gbd.theOtherUserInfo.id
    });
    wx.request({
      method: "Get",
      url: gbd.host + "/pair/records",
      header: gbd.cookieHeader,
      success: function (res) {
        var TIME = util.formatTime(new Date());
        res.data = util.dateSort(res.data)
        console.log(res.data);
        let j = 0;
        if (res.data[0].weUserId == that.data.userId || res.data[1].weUserId == that.data.userId) {
          that.setData({
            hasNotLoad: false
          })
          for (let i = 0; i < res.data.length; i++) {
            if (i ==0) {
              if (res.data[i].weUserId == that.data.userId) {
                var l = {
                  date: res.data[i].date,
                  img1: gbd.host + "/uploaded?path=" + res.data[i].recSrc,
                  text1: res.data[i].attachText,
                  img2: that.data.addImg,
                  text2: ""
                };
               that.data. history.push(l)
              } else {
                var l = {
                  date: res.data[i].date,
                  img2: gbd.host + "/uploaded?path=" +  res.data[i].recSrc ,
                  text2: res.data[i].attachText,
                  img1: that.data.addImg,
                  text1: ""
                };
                that.data. history.push(l)
              }
            } else {
              if (res.data[i].date == res.data[i - 1].date) {
                if (res.data[i].weUserId == that.data.userId) {
                  that.data.history[j].img1 = gbd.host + "/uploaded?path=" +  res.data[i].recSrc;
                  that.data. history[j].text1 = res.data[i].attachText;
                } else {
                  that.data.history[j].img2 = gbd.host + "/uploaded?path=" + res.data[i].recSrc ;
                  that.data.history[j].text2 = res.data[i].attachText;
                }
                j = j + 1;
              } else {
                j = j + 1;
                if (res.data[i].weUserId == that.data.userId) {
                  var l = {
                    date: res.data[i].date,
                    img1: gbd.host + "/uploaded?path="+ +res.data[i].recSrc,
                    text1: res.data[i].attachText,
                    img2: that.data.addImg,
                    text2: ""
                  };
                  that.data.history.push(l)
                } else {
                 var l = {
                    date: res.data[i].date,
                   img2: gbd.host + "/uploaded?path=" + res.data[i].recSrc ,
                    text2: res.data[i].attachText,
                    img1: that.data.addImg,
                    text1: ""
                  };
                  that.data.history.push(l)
                }
              }
            }
          }
          that.setData({
            history: that.data.history
          })
        }
      /*  else {
          if (res.data[0].weUserId== that.data.otherId) {
            that.setData({
              img2: res.data[0].recType,
              text2: res.data[0].attachText
            })
          }
          else {
            that.setData({
              img2: that.data.addImg,
              text2: ""
            })
            for (let i = 0; i < res.data.length; i++) {
              if (i = 0) {
                if (res.data[i].weUserId == that.data.userId) {
                  var l = {
                    date: res.data[i].date,
                    img1: res.data[i].recSrc,
                    text1: res.data[i].attachText,
                    img2: that.data.addImg,
                    text2: ""
                  };
                  that.datahistory.push(l)
                } else {
                  var l = {
                    date: res.data[i].date,
                    img2: res.data[i].recSrc,
                    text2: res.data[i].attachText,
                    img1: that.data.addImg,
                    text1: ""
                  };
                  that.datahistory.push(l)
                }
              } else {
                if (res.data[i].date == res.data[i - 1].date) {
                  if (res.data[i].weUserId == that.data.userId) {
                    that.datahistory[j].img1 = res.data[i].recSrc;
                    that.datahistory[j].text1 = res.data[i].attachText;
                  } else {
                    that.datahistory[j].img2 = res.data[i].recSrc;
                    that.datahistory[j].text2 = res.data[i].attachText;
                  }
                  j = j + 1;
                } else {
                  j = j + 1;
                  if (res.data[i].weUserId == that.data.userId) {
                   var l = {
                      date: res.data[i].date,
                      img1: res.data[i].recSrc,
                      text1: res.data[i].attachText,
                      img2: that.data.addImg,
                      text2: ""
                    };
                    that.datahistory.push(l)
                  } else {
                   var l = {
                      date: res.data[i].date,
                      img2: res.data[i].recSrc,
                      text2: res.data[i].attachText,
                      img1: that.data.addImg,
                      text1: ""
                    };
                    that.datahistory.push(l)
                  }
                }
              }
            }
            that.setData({
              history: that.data.history
            })
          }
        }*/
      }
    });

    for (let i = 0; i < that.data.history.length; i++) {
      var stringTime = that.data.history[i].date;
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
  chooseWays: function (e) {

  },

  toPhotoUp: function (e) {
    var that = this;
    that.setData({
      chooseSize: true,
      tapToChoose: true
    })
  },
  hideModal: function (e) {
    var that = this;
    that.setData({
      chooseSize: false,
      tapToChoose: false
    })
  },
  album: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths);
        wx.navigateTo({
          url: '../photosup/up?src=' + res.tempFilePaths,
        });
      },
    })
  },
  camera: function (e) {
    var that = this;
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
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?img=' + e.currentTarget.dataset.img + '&text=' + e.currentTarget.dataset.text + '&id=' + e.currentTarget.id
    })
  }



});
