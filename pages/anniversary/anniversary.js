// pages/anniversary/anniversary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anniversary: "未填写",
    nextdate: "未填写"
  },

  annibindPickerChange(e) {
    var that = this;
    that.setData({
      anniversary: e.detail.value
    })
  },
  nedabindPickerChange(e) {
    var that = this;
    that.setData({
      nextdate: e.detail.value
    })
  }

  
})