// pages/basicInfo/basicInfo.js
import Request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            avatarUrl:
                "https://wx.qlogo.cn/mmopen/vi_32/V5Q9iapkWRXb5TibIFnM2ACZgfFnSib1Du6SJYLaNuqoeLzc2dWecCQdYWF3StVrvODpNBvHOtiardM6If33MoICww/132",
            birthday:
                null,
            gender:
                "男"
        },
        genderRange:['男','女']
    },


    genderPickerChange(e) {
        let data = this.data;
        let newUserInfo = data.userInfo;
        let newGender = data.genderRange[e.detail.value];
        newUserInfo.gender = newGender;
        this.setData({
            userInfo: newUserInfo
        });
        let req = new Request(getApp().globalData);
        req.updateUserInfo({
            gender:newGender
        });

    },
    birthdayPickerChange(e){
        let data = this.data;
        let newUserInfo = data.userInfo;
        let newGender = e.detail.value;
        console.log(e.detail.value);
        // newUserInfo.gender = newGender;
        // this.setData({
        //     userInfo: newUserInfo
        // });
        // let req = new Request(getApp().globalData);
        // req.updateUserInfo({
        //     gender:newGender
        // });
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