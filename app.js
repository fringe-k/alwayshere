//app.js
import Request from "./utils/request.js";

// host: "https://gravity.xmu.edu.cn",
App({
    globalData: {
        cookieHeader: null,
        host: "https://localhost",

        hasLogin: false,
        userInfo: null,
        theOtherUserInfo:null,
        theOtherid:"",
        pair: null,
        memorialDayInfo: null
    },
    onLaunch: function (options) {
        let req = new Request(this.globalData);
        req.session().then(req.login);
  
    },
  onShow: function (options) {
    let app = getApp();
    var that = this;
    if(options.scene==1007)
    {
      console.log(options);
      var that=this;
      that.globalData.theOtherid = options.query.id;
    }
  },
});