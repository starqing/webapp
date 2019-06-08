//signup.js
//获取应用实例
var app = getApp()
Page({

	data: {
		signupimg: '../../image/signup.png',
		imgsrc: [],
		goods: [],
		processing: false,
		loadingMoreHidden: true,
		iconsrc: '../../image/usercount.png',
		p: 1,
		cats: [],
		current: 0,
	},
	onLoad: function() {
		var that = this;
		wx.setNavigationBarTitle({
			title: app.globalData.shopName
		});
		
		console.log(that.data.cats);
	},
	onShow: function() {
		this.getCatList();
			this.getFoodList();
	},
	onReady:function(){
	},
	getCatList: function() {
		var that = this;
		wx.request({
			url: app.buildUrl("/course/class"),
			header: app.getRequestHeader(),
			success: function(res) {
				var resp = res.data;
				if (resp.code != 200) {
					app.alert({
						"content": resp.msg
					});
					return;
				}
				var cats = resp.data.list;
				// console.log('getcat',cats[0].id);
				var current_id=cats[0].id;
				that.setData({
					cats: cats,
					current:current_id,
				});
			}
		});
		this.getFoodList();
	},
	getFoodList: function() {
		var that = this;
		if (that.data.processing) {
			return;
		}

		if (!that.data.loadingMoreHidden) {
			return;
		}

		that.setData({
			processing: true
		});

		wx.request({
			url: app.buildUrl("/course/search"),
			header: app.getRequestHeader(),
			data: {
				p: that.data.p,
				cat_id:that.data.current,	
			},
			success: function(res) {
				var resp = res.data;
				if (resp.code != 200) {
					app.alert({
						"content": resp.msg
					});
					return;
				}

				var goods = resp.data.list;
				that.setData({
					goods: that.data.goods.concat(goods),
					p: that.data.p + 1,
					processing: false
				});




				if (resp.data.has_more == 0) {
					that.setData({
						loadingMoreHidden: false
					});
				}

			}
		});
	},
	onReachBottom: function() {
		var that = this;
		setTimeout(function() {
			that.getFoodList();
		}, 500);
	},
	
// 	onLoad与onReady、onShow区别：onLoad是页面加载（未渲染）完成时调用，
// onReady是当页面所有组件渲染完成时调用，晚于onLoad,onShow是针对onHide的，
// 页面显示出来或者从隐藏状态到显示状态时调用。
// onHide与onUnload区别：onHide是页面隐藏时调用，页面没有销毁，仍占用内存；onUnload是页面卸载调用，页面会被销毁，内存释放。
// 
	onChange(e) {
		console.log('onChange', e);
		console.log('fuck');
		this.setData({
			current: e.detail.key,
		});
		this.getFoodList();
	},
// onclick(e){
// 	console.log('click',e);
// 	
// 	this.getFoodList();
// },
})
