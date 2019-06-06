var app = getApp();

Page({
  	data: {
  		userInfo:{},
      mode: ['我的订单','我的地址','我的联系方式','提取现金']
  	},
  	onLoad: function() {
  		var that = this;
  		app.console(app.globalData.userInfo);
  		that.setData({
			userInfo: app.globalData.userInfo
  		});
  	}
})