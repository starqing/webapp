var app = getApp();

Page({
  	data: {
  		userInfo:{},
      mode: ['我的订单','提取现金','我的课表','课程续费']
  	},
  	onLoad: function() {
  		var that = this;
  		app.console(app.globalData.userInfo);
  		that.setData({
			userInfo: app.globalData.userInfo
  		});
  	}
})