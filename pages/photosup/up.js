var util = require("../../utils/util.js")

Page({
    data: {
        contentcontent: "请输入文字",
        contentCount: 0,
        src: "",
        content: ""

    },

    onLoad: function (e) {
        let that = this;
        that.setData({
            src: e.src
        })
    },

    ContentInput: function (e) {
        var that = this
        var value = e.detail.value;
        that.setData({
            contentCount: value.length,
            content: value
        })
    },

    removeImage: function (e) {
        var that = this;
        that.setData({
            src: ""
        })
    },
    handleImagePreview: function (e) {
        var that = this;
        var imgs = [that.data.src];
        console.log(imgs);
        if (that.src != "") {
            wx.previewImage({
                current: that.data.src, //当前预览的图片
                urls: imgs
            })
        } else return;
    },
    send: function (e) {
        let that = this;
        let gbd = getApp().globalData;
        var TIME = util.formatDate(new Date());
        console.log(that.data.src);
        wx.showModal({
            title: '提示',
            content: '确认发送?',
            cancelText: "取消",
            confirmText: "确定",
            success: function (res) {
                wx.uploadFile({
                    url: gbd.host + "/pair/record",
                    header: gbd.cookieHeader,
                    filePath: that.data.src,
                    name: 'file',
                    formData: {
                        date: TIME,
                        recType: ".jpg",
                        attachText: that.data.content
                    },
                });
            }
        })
    }


});
