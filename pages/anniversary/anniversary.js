// pages/anniversary/anniversary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anniversary: "未填写",
    nextdate: "未填写"
  },

  anniPickerChange(e) {
    var that = this;
    that.setData({
      anniversary: e.detail.value
    })
  },
  nextDatePickerChange(e) {
    var that = this;
    that.setData({
      nextdate: e.detail.value
    })
  }

  
})