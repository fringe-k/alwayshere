//app.js
App({
    onLaunch: function () {
        let gbd = this.globalData;
        wx.request({
            method: "GET",
            url: gbd.host + "/sessionId",
            success(res) {
                gbd.sessionId = res.data;
                gbd.cookieHeader = {
                    'Cookie':"JSESSIONID="+res.data
                };
                wx.login({
                    success: res => {
                        wx.request({
                            method: "POST",
                            url: gbd.host + "/user/login",
                            header: gbd.cookieHeader,
                            data:{
                                loginCode:res.code
                            },
                            success(res) {
                                if(res.statusCode === 200){
                                    console.log("登录成功");
                                }
                                wx.request({
                                    method:"GET",
                                    url:gbd.host + "/user",
                                    header:gbd.cookieHeader,
                                    success(res) {
                                        console.log(res);
                                    }
                                })
                            }
                        })
                    }
                });
            }
        });
    },
    globalData: {
        sessionId: null,
        cookieHeader: null,
        userInfo: null,
        host: "https://localhost"
    }
});