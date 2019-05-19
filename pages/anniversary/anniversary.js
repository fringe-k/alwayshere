// pages/anniversary/anniversary.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        theOtherUserInfo: null,
        userInfo: null
    },

    anniPickerChange(e) {
        var that = this;
        that.setData({
            anniversary: e.detail.value
        })
    },
    nextDatePickerChange(e) {
        var that = this;
        that.setData({
            nextdate: e.detail.value
        })
    },
    onLoad: function (options) {
        let gbd = getApp().globalData;
        this.setData({
            userInfo: gbd.userInfo,
            theOtherUserInfo: gbd.theOtherUserInfo,
            addImg: gbd.host + "/resource/image/add"
        });
    }
});