// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     img:"",
     text:"",
    avatarUrl: ""
  },


  onLoad: function (options) {
    let that=this;
    let gbd = getApp().globalData;
    console.log(options)
    if(options.id=="0")
     {
       that.setData({
         img: gbd.currentImg,
       text:options.text,
       avatarUrl: gbd.userInfo.avatarUrl
      
       })
     }
     else{
      that.setData({
        img: gbd.currentImg,
        text: options.text,
        avatarUrl: gbd.theOtherUserInfo.avatarUrl
      })
     }
    
  },
  view:function(e){
    var that = this;
    var imgs = [that.data.img];
    if (that.img != "") {
      wx.previewImage({
        current: that.data.img, //当前预览的图片
        urls: imgs
      })
  }
  }

 
})