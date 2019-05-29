// pages/letters/index.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //信的内容   
    tabs: ["来信", "回复"],
    currentTab: 0,
    historynews: [],
    content:"",
    textAreaContent:"",
    textheight:"",
    contentcontent:"想说点什么吗",
    scrollTop:"",
    header:"空",
    neirong:"",
    userInfo:"",
    theOtherUserInfo:"",
    letterid:-1,
  },

 onLoad:function(options){
   let that = this;
   let gbd = getApp().globalData;
   var id=parseInt(options.id);
   that.setData({
     userInfo: gbd.userInfo,
     theOtherUserInfo: gbd.theOtherUserInfo,
     letterid:id
   })
   wx.request({
     method: "Get",
     url: gbd.host + "/pair/letter/"+id,
     header: gbd.cookieHeader,
     success: function (res){
       that.setData({
         header:res.data.title,
         neirong:res.data.text
       })
     }
   });
   wx.request({
     method: "Get",
     url: gbd.host + "/pair/letter/" + id+"/replies",
     header: gbd.cookieHeader,
     success: function (res) {
       for (let i = 0; i < res.data.length; i++) {
         var l = {
           date: res.data[i].time,
           id: res.data[i].weUserId,
           text: res.data[i].text,
         };
         if (l.id == gbd.theOtherid) {
           l.ismine = false;
           l.touxiang=that.data.theOtherUserInfo.avataUrl
         } else {
           l.ismine = true;
           l.touxiang = that.data.userInfo.avatarUrl
         }
         that.data.historynews.push(l)
       }
       that.data.historynews = util.replySort(that.data.historynews);
       that.setData({
         historynews: that.data.historynews
       })

     }
     });
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
  inputMyWord: function (e) {
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
 onShow:function(e){
   var that = this;
   let id = "#textwrap";
   let query = wx.createSelectorQuery();//创建查询对象
   query.select(id).boundingClientRect();//获取view的边界及位置信息
   query.exec(function (res) {
     that.setData({
       textheight: res[0].height+ "px"
     });
     console.log(that.data.textheight);
   
 })
 },

 sendMessage:function(e){
   var that=this;
   let gbd = getApp().globalData;
   var TIME = util.formatTime(new Date());
   var newmessage={
     ismine: true,
     id:that.data.userInfo.id,
     touxiang: that.data.userInfo.avatarUrl,
     text: that.data.content,
     date:TIME
   };
   that.data.historynews.push(newmessage);
   console.log(newmessage)
   var length = that.data.historynews.length
   that.setData({
     historynews:that.data.historynews,
     scrollTop: length*1000,
     textAreaContent: ""
   }) 
  wx.request({
     method: "Put",
     url: gbd.host + "/pair/letter/" + that.data.letterid +"/reply",
     header: gbd.cookieHeader,
     data:{
       time: newmessage.date,
       weUserId:that.data.userInfo.id,
       text: newmessage.text
     }

   })
 },

 bindWord:function(e){
   var that=this;
   that.setData({
     content:e.detail.value, 
   });
  
   

 }


})