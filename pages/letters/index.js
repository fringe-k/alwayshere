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
      touxiang: '../images/1.jpg',
      text: '我爱你'
    }, {
      ismine: true,
        touxiang: '../images/1.jpg',
      text: '我爱你'
    }, {
      ismine: false,
      touxiang: '../images/1.jpg',
      text: '我爱你'
    },
      {
        ismine: false,
        touxiang: '../images/1.jpg',
        text: '我爱你'
      },
      {
        ismine: true,
        touxiang: '../images/1.jpg',
        text: '我爱你'
      }],
    content:"",
    textAreaContent:"",
    textheight:"",
    contentcontent:"想说点什么吗",
    scrollTop:""
 
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
       textheight: res[0].height + "px"
     });
     console.log(that.data.textheight);
 })
 },

 sendMessage:function(e){
   var that=this;
   var newmessage={
     ismine: true,
     touxiang: '../images/1.jpg',
     text: that.data.content
   };
   that.data.historynews.push(newmessage);
   var that=this;
   console.log(that.data.historynews);
   var length = that.data.historynews.length
   that.setData({
     historynews:that.data.historynews,
     scrollTop: length*1000,
     textAreaContent: ""
   }) 
   /*console.log(that.data.historynews);
   console.log(that.data.scrollTop);*/
 },
 bindWord:function(e){
   console.log(e.detail.value);
   var that=this;
   that.setData({
     content:e.detail.value,
   
   });
  
   

 }


})