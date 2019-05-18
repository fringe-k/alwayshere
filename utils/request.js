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
                        success(res){
                            let app = getApp();
                            app.globalData.hasLogin = true;
                            if(app.loginCallback){
                                app.loginCallback();
                            }
                            console.log("Login");
                            resolve();
                        }
                    })
                }
            });
        }))
    };

    getUser = () => {
        console.log("Start to get user.");
        let data = this.appData;
        return new Promise((resolve, reject) => {
            wx.request({
                method: "GET",
                url: data.host + "/user",
                header: data.cookieHeader,
                success(res) {
                    if (res.statusCode === 200) {
                        data.user = res.data;
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
                    }
                    resolve();
                }
            })
        });
    }
}

export default Request;
