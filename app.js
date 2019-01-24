
var server = require('./utils/server');
var md5 = require('./utils/md5.js');

// 授权登录 
App({
	onLaunch: function () {
		// auto login via SDK
		var that = this;
		//AV.User.loginWithWeapp();


		// 设备信息
		wx.getSystemInfo({
			success: function (res) {
				that.screenWidth = res.windowWidth;
				that.pixelRatio = res.pixelRatio;
			}
		});
	},
	getOpenId: function (cb) {

		wx.login({
			success: function (res) {
				if (res.code) {
					//发起网络请求
					wx.request({
            url: 'https://www.huyawang.com/index.php/WXAPI/User/sendappid?appid=wx65c878a78fa2fc2a&secret=cc3d0659c6bc97ed461526f26cb4af38&js_code=' + res.code + '&grant_type=authorization_code',
						data: {
							code: res.code
						},
						success: function (response) {
							// 获取openId
							var openId = response.data.openid;
							// TODO 缓存 openId
							var app = getApp();
							var that = app;
							that.globalData.openid = openId;

							//验证是否关联openid

							typeof cb == "function" && cb()

						}
					})
				} else {
					console.log('获取用户登录态失败！' + res.errMsg)
				}
			}
		});



	},

	register:function(cb){
     var app = this;
       this.getUserInfo(function () {
         var openId = app.globalData.openid;
            var userInfo = app.globalData.userInfo;
            var country = userInfo.country;
            var city = userInfo.city;
            var gender = userInfo.gender;
            var nick_name =  userInfo.nickName;
            var province = userInfo.province;
            var avatarUrl = userInfo.avatarUrl;


            server.getJSON('/User/register?open_id=' + openId + "&country=" + country + "&gender=" + gender + "&nick_name=" + nick_name + "&province=" + province + "&city=" + city + "&head_pic=" + avatarUrl,function(res){
app.globalData.userInfo = res.data.res
                
                typeof cb == "function" && cb()
						});

       })
  },
getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

	globalData: {
		'openid': null,
		'userInfo':null,
		'login':false
	}
})
