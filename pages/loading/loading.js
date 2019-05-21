// pages/loading/loading.js
import Request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canGetInfo: wx.canIUse('button.open-type.getUserInfo'),
        hasInfoAccess: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.redirectTo({
        url: '../main/main',
      });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let app = getApp();

        //等待app.js完成登录
        if (!app.globalData.hasLogin) {
            app.loginCallback = this.onLoginCallback;
        } else {
            this.onLoginCallback();
        }
    },

    onLoginCallback: function () {
        let page = this;
        let req = new Request(getApp().globalData);
        req.getUserInfo()
            .then(req.getPair)
            .then(req.getWxUserInfo)
            .then(req.updateUserAvatar)
            .then(this.onDataReadyPromise)
            .catch(r=>{
                if(r.code === 0){
                    page.setData({
                        hasInfoAccess: false
                    });
                }
            });
    },
    getWxUserInfo:function(res){
        let req = new Request(getApp().globalData);
        req.updateUserAvatar(JSON.parse(res.detail.rawData))
            .then(this.onDataReadyPromise);
    },
    onDataReadyPromise: function () {
        return new Promise((resolve => {
            wx.redirectTo({
                url: '../main/main',
            });
        }))
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