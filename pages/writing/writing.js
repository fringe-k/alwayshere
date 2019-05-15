// pages/writing/writing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headercontent: "请输入标题(最多10字)",
    header: "",
    contentcontent: "请写下你的信",
    content: "",
    textheight:"",
    writing:{
        value1:"写信开启",
        checked1:false,
    },
    timing:{
        value2:"定时开启", 
        checked2: false
    },
    days: ['1天后','2天后','3天后','4天后','5天后','6天后','7天后'],
    daystosent:"未选择"
  },

daysPickerChange:function(e){
  var that = this;
  that.setData({
    daystosent: that.data.days[e.detail.value]
  })
},
  getInputmyheader: function (e) {
    var that = this;
    that.setData({
      header: e.detail.value
    })
  },

  checkboxChange:function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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

    onShow: function() {
      var that = this;

      let id = "#textwrap";
      let query = wx.createSelectorQuery();//创建查询对象
      query.select(id).boundingClientRect();//获取view的边界及位置信息
      query.exec(function (res) {
        that.setData({
          textheight: res[0].height + "px"
        });
        console.log(res[0].height);
      });
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