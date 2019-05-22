class Request {
    appData;

    constructor(appData) {
        this.appData = appData;
    }

    session = () => {
        console.log("Start to get session.");
        let data = this.appData;
        return new Promise(((resolve, reject) => {
            wx.request({
                method: "GET",
                url: data.host + "/sessionId",
                success(res) {
                    //Set down the cookie
                    data.cookieHeader = {
                        'Cookie': "JSESSIONID=" + res.data
                    };
                    resolve();
                }
            });
        }))
    };

    login = () => {
        console.log("Start to login into system.");
        let data = this.appData;
        return new Promise(((resolve, reject) => {
            wx.login({
                success(res) {
                    wx.request({
                        method: "POST",
                        url: data.host + "/user/login",
                        header: data.cookieHeader,
                        data: {
                            loginCode: res.code
                        },
                        success(res) {
                            let app = getApp();
                            app.globalData.hasLogin = true;
                            if (app.loginCallback) {
                                app.loginCallback();
                            }
                            resolve();
                        }
                    })
                }
            });
        }))
    };

    getUserInfo = () => {
        console.log("Start to get user.");
        let data = this.appData;
        return new Promise((resolve, reject) => {
            wx.request({
                method: "GET",
                url: data.host + "/user",
                header: data.cookieHeader,
                success(res) {
                    if (res.statusCode === 200) {
                        data.userInfo = res.data;
                        resolve();
                    }
                }
            });
        });
    };

    getPair = () => {
        console.log("Start to get pair.");
        let data = this.appData;
        return new Promise((resolve, reject) => {
            wx.request({
                method: "GET",
                url: data.host + "/pair",
                header: data.cookieHeader,
                success(res) {
                    if (res.statusCode === 200) {
                        data.pair = res.data;
                        wx.request({
                            method: "GET",
                            url: data.host + "/user/theOther",
                            header: data.cookieHeader,
                            success(res) {
                                if (res.statusCode === 200) {
                                    data.theOtherUserInfo = res.data;
                                }
                                resolve();
                            }
                        });
                    }
                    resolve();
                }
            });
        });
    };

    getMemorialDayInfo = () => {
        console.log("Start to get memorial day.");
        let data = this.appData;
        return new Promise((resolve, reject) => {
            wx.request({
                method: "GET",
                url: data.host + "/pair/memorialDay",
                header: data.cookieHeader,
                success(res) {
                    if (res.statusCode === 200) {
                        resolve(res.data);
                    }
                }
            });
        });
    };

    getWxUserInfo = () => {
        console.log("Start to get wx user info.");
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success(res) {
                                resolve(JSON.parse(res.rawData));
                            }
                        });
                    } else {
                        reject({reason: "Not authorized with [scope.userInfo].", code: 0});
                    }
                }
            });
        });
    };

    updateUserAvatar = (info) => {
        console.log("Start to update user avatar.");
        return this.updateUserInfo({
            avatarUrl: info.avatarUrl
        });
    };

    updateUserInfo = (info) => {
        console.log("Start to update user info.");
        let data = this.appData;
        return new Promise((resolve, reject) => {
            wx.request({
                method: "POST",
                url: data.host + "/user/update",
                header: data.cookieHeader,
                data: info,
                success(res) {
                    data.userInfo = res.data;
                    resolve(res.data);
                }
            });
        });
    };

    updateMemorialDay = (info) => {
        console.log("Start to update memorial day info.");
        let data = this.appData;
        return new Promise((resolve, reject) => {
            wx.request({
                method: "POST",
                url: data.host + "/pair/memorialDay/update",
                header: data.cookieHeader,
                data: info,
                success(res) {
                    data.memorialDayInfo = res.data;
                    resolve(res.data);
                }
            });
        });
    }
}

export default Request;
