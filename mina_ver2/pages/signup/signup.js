//signup.js
//获取应用实例
var app = getApp()
Page({
	current: 'tab1',
	tabs: [{
			key: 'tab1',
			title: 'Tab 1',
			content: 'Content of tab 1',
		},
		{
			key: 'tab2',
			title: 'Tab 2',
			content: 'Content of tab 2',
		},
		{
			key: 'tab3',
			title: 'Tab 3',
			content: 'Content of tab 3',
		},
	],
	data: {
		signupimg: '../../image/signup.png',
		imgsrc: [],
		goods: [],
		processing: false,
		loadingMoreHidden: true,
		iconsrc: '../../image/usercount.png',
		p: 1,
	},
	onLoad: function() {
		var that = this;
		wx.setNavigationBarTitle({
			title: app.globalData.shopName
		});

		this.getFoodList();

	},
	onShow: function() {

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
	onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.key,
        })
    },
    onTabsChange(e) {
        console.log('onTabsChange', e)
        const { key } = e.detail
        const index = this.data.tabs.map((n) => n.key).indexOf(key)

        this.setData({
            key,
            index,
        })
    },
    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        const { current: index, source } = e.detail
        const { key } = this.data.tabs[index]

        if (!!source) {
            this.setData({
                key,
                index,
            })
        }
    },

})
