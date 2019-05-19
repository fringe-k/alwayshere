// pages/basicInfo/basicInfo.js
import Request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        genderRange: ['男', '女']
    },


    genderPickerChange(e) {
        let data = this.data;
        let newGender = data.genderRange[e.detail.value];
        if (data.userInfo.gender !== newGender) {
            let newUserInfo = data.userInfo;
            newUserInfo.gender = newGender;
            this.setData({
                userInfo: newUserInfo
            });
            new Request(getApp().globalData)
                .updateUserInfo({
                    gender: newGender
                });
        }
    },
    birthdayPickerChange(e) {
        let data = this.data;
        if (data.userInfo.birthday !== e.detail.value) {
            let newUserInfo = data.userInfo;
            newUserInfo.birthday = e.detail.value;
            this.setData({
                userInfo: newUserInfo
            });
            new Request(getApp().globalData)
                .updateUserInfo({
                    birthday: e.detail.value
                });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: getApp().globalData.userInfo
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