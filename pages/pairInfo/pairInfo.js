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
            path: "/pages/sharepage/share?url=''&userInfo=" + that.userInfo,
            success: function (res) {
                // 转发成功
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let gbd = getApp().globalData;
        this.setData({
            userInfo: gbd.userInfo,
            theOtherUserInfo: gbd.theOtherUserInfo,
            addImg: gbd.host + "/resource/image/add"
        });
    }


})