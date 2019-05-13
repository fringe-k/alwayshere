// pages/letters/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readflag: false,
    header: "我今天",
    neirong: "  爱你三千遍",
    //信的内容   
    tabs: ["来信", "回复"],
    currentTab: 0,
    historynews: [{
      ismine: false,
      touxiang: '',
      text: '我爱你'
    }, {
      ismine: true,
      touxiang: '',
      text: '我爱你'
    }, {
      ismine: false,
      touxiang: '',
      text: '我爱你'
    }]



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


})