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
    if(options.id=="0")
     {
       that.setData({
       img:options.img,
       text:options.text,
       avatarUrl: gbd.userInfo.avatarUrl
      
       })
     }
     else{
      that.setData({
        img: options.img,
        text: options.text,
        avatarUrl: gbd.theOtherUserInfo.avatarUrl
      })
     }
    
  },

 
})