// pages/words/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [
      {
        readflag: false,             //是否已读
        header: '请点开回复后查看本信',  //标题
        date: '-2019.2.14-'          //日期
      },
      {
        readflag: true,
        header: '今天你怎么了',
        date: '-2019.2.14-'
      },
      {
        readflag: true,
        header: '亲爱的，今天你说话的....',
        date: '-2019.2.14-'
      },
      {
        readflag: false,
        header: '亲爱的，今天你说话的....',
        date: '-2019.2.14-'
      },
      {
        readflag: false,
        header: '亲爱的，今天你说话的....',
        date: '-2019.2.14-'
      },
    ],
    currentTab: 0

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
  gotowriting: function () {
    wx.navigateTo({
      url: '../writing/writing',
    })
  },
  /*read*/
  read: function () {
    wx.navigateTo({
      url: '../letters/index',
    })
  },
  /*write to read*/
  write: function () {
    wx.showModal({
      title: '提示',
      content: '请写一封信以交换本信',
      showCancel: true,//是否显示取消按钮
      cancelText: "取消",//默认是“取消”
      cancelColor: 'black',//取消文字的颜色
      confirmText: "写信",//默认是“确定”
      confirmColor: 'green',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.navigateTo({
            url: '../writing/writing',
          })
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})