
var server = require('../../utils/server');
var seat;
Page({
	data: {
		banner: [],
		goods: [],
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	showCoupon: function (e) {
		wx.navigateTo({
		  url: '../member/coupon/index',
		  success: function(res){
			// success
		  },
		  fail: function() {
			// fail
		  },
		  complete: function() {
			// complete
		  }
		})
	},
	showOrder: function (e) {
		wx.navigateTo({
		  url: '../order/list/list',
		  success: function(res){
			// success
		  },
		  fail: function() {
			// fail
		  },
		  complete: function() {
			// complete
		  }
		})
	},
	showCollect: function (e) {
		wx.navigateTo({
		  url: '../member/collect/collect',
		  success: function(res){
			// success
		  },
		  fail: function() {
			// fail
		  },
		  complete: function() {
			// complete
		  }
		})
	},
	showMine: function (e) {
		wx.switchTab({
			url: "../member/index/index"
		});
	},
	showSeller: function (e) {
		wx.navigateTo({
		  url: '../seller/index',
		  success: function(res){
			// success
		  },
		  fail: function() {
			// fail
		  },
		  complete: function() {
			// complete
		  }
		})
	},
	search: function (e) {
    wx.navigateTo({
      url: "../search/index"
		});
	},
	showCarts: function (e) {
		wx.switchTab({
			url: "../cart/cart"
		});
	},
	onLoad: function (options) {
		//seat = options.seat;
		//wx.showToast({title:seat+"seat"});
		this.loadBanner();
		//this.loadMainGoods();
		this.getInviteCode(options);

		var app = getApp();
		app.getOpenId(function () {

			var openId = getApp().globalData.openid;

            server.getJSON("/User/validateOpenid",{openid:openId},function(res){

				if (res.data.code == 200) {
						getApp().globalData.userInfo = res.data.data;
						getApp().globalData.login = true;
						//wx.switchTab({
						//url: '/pages/index/index'
						//});
					}
					else{
						if (res.data.code == '400') {
						console.log("need register");

						app.register(function () {

                           getApp().globalData.login = true;
						});
					}
					}

			});

		});	
	},
	getInviteCode: function (options) {
		if (options.uid != undefined) {
			wx.showToast({
				title: '来自用户:' + options.uid + '的分享',
				icon: 'success',
				duration: 2000
			})
		}
	},
	loadBanner: function () {

		var that = this;

        server.getJSON("/Index/home",function(res){
var banner = res.data.result.ad;
				var goods = res.data.result.goods;
				var ad = res.data.ad;
				that.setData({
					banner: banner,
					goods: goods,
					ad: ad
				});
		});

		
		
	},
	loadMainGoods: function () {
		var that = this;
		var query = new AV.Query('Goods');
		query.equalTo('isHot', true);
		query.find().then(function (goodsObjects) {
			that.setData({
				goods: goodsObjects
			});
		});
	},
	onShow:function(){

	},
	clickBanner: function (e) {

		var goodsId = e.currentTarget.dataset.goodsId;
		wx.navigateTo({
			url: "../goods/detail/detail?objectId=" + goodsId
		});
	},
	showDetail: function (e) {
		var goodsId = e.currentTarget.dataset.goodsId;
		wx.navigateTo({
			url: "../goods/detail/detail?objectId=" + goodsId
		});
	},
	showCategories: function () {
		// wx.navigateTo({
		// 	url: "../category/category"
		// });
		wx.switchTab({
			url: "../category/category"
		});
	},
	showGroupList: function () {
		wx.navigateTo({
			url: "../goods/grouplist/list"
		});
	},
	onShareAppMessage: function () {
		return {
      title: '琪琦商城',
      desc: '琪琦商城',
			path: '/pages/index/index?uid=13413011133'
		}
	}
})