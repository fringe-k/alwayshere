// pages/anniversary/anniversary.js
import Request from "../../utils/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        theOtherUserInfo: null,
        userInfo: null,
        memorialDayInfo: null
    },

    memDayPickerChange(e) {
        this.updateDay("memorialDay", e.detail.value);
    },
    meetDayPickerChange(e) {
        this.updateDay("nextMeetDay", e.detail.value);
    },
    updateDay(attr, value){
        let data = this.data;
        if (data.memorialDayInfo[attr] !== value) {
            let newMemorialDayInfo = data.memorialDayInfo;
            newMemorialDayInfo[attr] = value;
            this.setData({
                memorialDayInfo: newMemorialDayInfo
            });
            getApp().globalData.memorialDayInfo = newMemorialDayInfo;
            new Request(getApp().globalData)
                .updateMemorialDay({
                    [attr]: value
                });
        }
    },
    onLoad: function (options) {
        let gbd = getApp().globalData;
        this.setData({
            userInfo: gbd.userInfo,
            theOtherUserInfo: gbd.theOtherUserInfo,
            memorialDayInfo: gbd.memorialDayInfo
        });
        if(this.data.memorialDayInfo == null){
            this.setData({
                memorialDayInfo: {}
            })
        }
    }
});