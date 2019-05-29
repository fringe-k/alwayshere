
var util = require("../../utils/util.js")

Page({
  data: {
    history: [
    ],
    today: "",
    cameraImg: null,
    noPhotoImg:null,
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
      cameraImg: gbd.host + "/resource/image/camera",
      noPhotoImg: gbd.host + "/resource/image/noPhoto",
      userId: gbd.userInfo.id,
      otherId: gbd.theOtherUserInfo.id
    });

    wx.request({
      method: "Get",
      url: gbd.host + "/pair/records",
      header: gbd.cookieHeader,
      success: function (res) {
        var TIME = util.formatTime(new Date());
        var ll=util.formulaTime(TIME);
        res.data = util.dateSort(res.data)
        let j = 0;
        if (res.data[0].weUserId == that.data.userId && res.data[0].date == ll) {
            that.setData({
              hasNotLoad: false
            });
        }
        if (res.data[1].weUserId == that.data.userId && res.data[1].date == ll) {
          that.setData({
            hasNotLoad: false
          });
        }
        console.log(res.data)
          if(!that.data. hasNotLoad) {       
            for (let i = 0; i < res.data.length; i++) {
              
            
              if (i == 0) {
                if (res.data[i].weUserId == that.data.userId) {
                  var l = {
                    date: util.timeStr(res.data[i].date),
                    img1: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                    text1: res.data[i].attachText,
                    img2: that.data.noPhotoImg,
                    text2: "Ta今天还没上传~"
                  };
                  that.data.history.push(l)
                } else {
                  var l = {
                    date: util.timeStr(res.data[i].date),
                    img2: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                    text2: res.data[i].attachText,
                    img1: that.data.noPhotoImg,
                    text1: "Ta今天还没上传~"
                  };
                  that.data.history.push(l)
                }
              } else {
                if (res.data[i].date == res.data[i - 1].date) {
                  if (res.data[i].weUserId == that.data.userId) {
                    that.data.history[j].img1 = gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f');
                    that.data.history[j].text1 = res.data[i].attachText;
                  } else {
                    that.data.history[j].img2 = gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f');
                    that.data.history[j].text2 = res.data[i].attachText;
                  }

                } else {
                  
                  if (res.data[i].weUserId == that.data.userId) {
                    var l = {
                      date: util.timeStr(res.data[i].date),
                      img1: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                      text1: res.data[i].attachText,
                      img2: that.data.noPhotoImg,
                      text2: "Ta今天还没上传~"
                    };
                    that.data.history.push(l)
                  } else {
                    var l = {
                      date: util.timeStr(res.data[i].date),
                      img2: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                      text2: res.data[i].attachText,
                      img1: that.data.noPhotoImg,
                      text1: "Ta今天还没上传~"
                    };
                    that.data.history.push(l)
                  }
                  j = j + 1;
                }
              }
            }
            that.setData({
              history: that.data.history
            })
            console.log(that.data.history)

          }
          /***** */
          else {
            j=-1;
            var jk=0;
            if (res.data[0].weUserId == that.data.otherId && res.data[0].date == ll) {
            that.setData({
              img2: gbd.host + "/resource/uploaded?path=" + res.data[0].recSrc.split('\\').join('%2f'),
              text2: res.data[0].attachText
            })
             jk = 1;
          } else {
            that.setData({
              img2: that.data.noPhotoImg,
              text2: "Ta今天还没上传~"
            })
             jk = 0;
          }
          for (let i = jk; i < res.data.length; i++) {
            if (i == 0)  {
              if (res.data[i].weUserId == that.data.userId) {
                var l = {
                  date: util.timeStr(res.data[i].date),
                  img1: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                  text1: res.data[i].attachText,
                  img2: that.data.noPhotoImg,
                  text2: "Ta今天还没上传~"
                };
                that.data.history.push(l)
                
              } else {
                var l = {
                  date: util.timeStr(res.data[i].date),
                  img2: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                  text2: res.data[i].attachText,
                  img1: that.data.noPhotoImg,
                  text1: "Ta今天还没上传~"
                };
                that.data.history.push(l)   
              }
            } 
            else {
              if (res.data[i].date == res.data[i-1].date) {
                
                if (res.data[i].weUserId == that.data.userId) {
          that.data.history[j].img1 = gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f');
                  that.data.history[j].text1 = res.data[i].attachText;
                } else {
          that.data.history[j].img2 = gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f');
                  that.data.history[j].text2 = res.data[i].attachText;
                }
                j = j + 1;
              } else {

                if (res.data[i].weUserId == that.data.userId) {
                  var l = {
                    date: util.timeStr(res.data[i].date),
                    img1: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                    text1: res.data[i].attachText,
                    img2: that.data.noPhotoImg,
                    text2: "Ta今天还没上传~"
                  };
                  that.data.history.push(l)

                } else {
                  var l = {
                    date: util.timeStr(res.data[i].date),
                    img2: gbd.host + "/resource/uploaded?path=" + res.data[i].recSrc.split('\\').join('%2f'),
                    text2: res.data[i].attachText,
                    img1: that.data.noPhotoImg,
                    text1: "Ta今天还没上传~"
                  };
                  that.data.history.push(l)
                }
                j=j+1
              }
            }
          }
          that.setData({
            history: that.data.history
          })
          
        }
      }
      
    });

  },

  onShow:function(e){
     let that=this;
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
    console.log(e)
    let that = this;
    let gbd = getApp().globalData;
    gbd.currentImg = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: "../detail/detail?id=" + e.currentTarget.id + "&text=" + e.currentTarget.dataset.text 
    })
  }



});
