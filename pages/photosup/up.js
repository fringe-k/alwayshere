
var util = require("../../utils/util.js")

Page({
  data: {
    contentcontent: "请输入文字",
    contentCount: 0,
    src: ""

  },

  ContentInput: function (e) {
    var that = this
    var value = e.detail.value;
    that.setData({
      contentCount: value.length
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          src: res.tempFilePaths
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  removeImage: function (e) {
    var that = this;
    that.setData({
      src: ""
    })
  },
  handleImagePreview: function (e) {
    var that = this;
    console.log(that.data.src);
    var imgs = [that.data.src];
    console.log(imgs);
    if (that.src != "") {
      wx.previewImage({
        current: that.data.src, //当前预览的图片
        urls: imgs[0]
      })
    }
    else return;
  }





});
