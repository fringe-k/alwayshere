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
    daystosent:"未选择",
    chooseSize: false,
    animationData: {}
  },

  hideModal:function(e){
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: false
    })
  },
  chooseSezi: function (e) {
    console.log(1);
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  
  sending: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: false
    })
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