//logs.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({
	data: {
		uid: null,
		id: null,
		info: null,
	},
	onLoad: function(options) {
		var that = this;
		var temp = options.id;
		this.setData({
			id: temp
		});
		this.getInfo();

	},


	getInfo: function() {
		var that = this;
		wx.request({
			url: app.buildUrl("/course/info"),
			header: app.getRequestHeader(),
			data: {
				id: that.data.id
			},
			success: function(res) {
				var resp = res.data;
				if (resp.code != 200) {
					app.alert({
						"content": resp.msg
					});
					wx.navigateTo({
						url: "/pages/signup/signup"
					});
					return;
				}

				that.setData({
					info: resp.data.info
				});

				WxParse.wxParse('article', 'html', resp.data.info.summary, that, 5);
			}
		});
	},
	btnClick: function() {
		var that = this;
		wx.showModal({
			title: '提示',
			content: '确定报名该课程吗？',
			success: function(res) {
				if (res.confirm) {

				}
			}
		})
	},
	calling: function() {
		wx.makePhoneCall({
			phoneNumber: '17693161291',
			success: function() {
				console.log('拨打电话成功！')
			},
			fail: function() {
				console.log('拨打电话失败！')
			}
		})
	},
	onShareAppMessage: function(res) {
		var that = this;
		var my_token = app.getCache('token');
		if (my_token.indexOf('#') == -1) {
			wx.redirectTo({
				url: '/pages/authorize/authorize'
			});
		}

		this.setData({
			uid: my_token.split('#')[1]
		});

		if (res.form == 'button') {
			console.log("button");
		}

		return {
			title: "分享可得佣金",

			path: 'Pages/courseDetail/courseDetail?share_id=' + that.data.uid,
			success: function(res) {
				console.log("转发成功" + res);
				console.log(that.data.uid);
			}
		}
	},
	signup: function() {
		var that = this;
		var myurl = '../../pages/order/order?id=' + that.data.id;
		wx.navigateTo({
			url: myurl
		})

	}


})
