// pages/pairInfo/pairInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        theOtherUserInfo: null,
        userInfo: null,
        addImg: null
    },
  onLoad: function (options) {
    let that=this;
    let gbd = getApp().globalData;
    that.setData({
      userInfo: gbd.userInfo,
      theOtherUserInfo: gbd.theOtherUserInfo,
      addImg: gbd.host + "/resource/image/add"
    });

  },
    toBasicInfo: function () {
        wx.navigateTo({
            url: '../basicInfo/basicInfo',
        })
    },
    toAnniversary: function () {
        wx.navigateTo({
            url: '../anniversary/anniversary',
        })
    },
    toHelps: function () {
        wx.navigateTo({
            url: '../helpsandrecalls/help',
        })
    },

    onShareAppMessage: function (ops) {
        let that = this;
        if (ops.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: "我在",
            desc: "你好，我有一生想和你谈",
            path: "/pages/sharepage/share?url=''&id=" + that.data.userInfo.id
        }
    },
    bye:function(e){
      let that = this;
      let gbd = getApp().globalData;
      wx.showModal({
        title: '',
        content: '非得这样吗?',
        cancelText: "取消",
        confirmText: "确定",
        success: function (res) {
          if (res.cancel) {}
          else{
            wx.request({
              method: "Post",
              url: gbd.host + "/pair/dissolve",
              header: gbd.cookieHeader,
            })
          }
    }
})
}
})