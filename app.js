//app.js
import Request from "./utils/request.js";

App({
    globalData: {
        cookieHeader: null,
        host: "https://localhost",
        hasLogin: false,
        userInfo: null,
        theOtherUserInfo:null,
        pair: null
    },
    onLaunch: function (options) {
        let req = new Request(this.globalData);
        req.session().then(req.login);
    },
  onShow: function (options) {
    console.log(options);
    
  }
   
});