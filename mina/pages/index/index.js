//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    a1src:'../../image/a1.png',
    a2src: '../../image/a2.png',
    a3src: '../../image/a3.png',
    a4src: '../../image/a4.png',
    signupimg:'../../image/signup.png',
    iconsrc:'../../image/usercount.png',
    jtsrc:'../../image/icon-jt.png',
    imgUrls:[],
    courseInfo:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 
  },
  onLoad:function () {
    var that=this;
    wx.setNavigationBarTitle({
      title:app.globalData.shopName
    });

  },
  onShow:function () {
    this.getBannerAndCourse();
  },
  getBannerAndCourse:function () {
     var that = this;
        wx.request({
            url: app.buildUrl("/course/index"),
            header: app.getRequestHeader(),
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
                var banner_url=[];
                for(var i=0;i<resp.data.banner_list.length;i++) {
                  banner_url.push(resp.data.banner_list[i]["pic_url"]);
                }

                that.setData({
                    imgUrls: banner_url,
                    courseInfo: resp.data.banner_list
                });
            }
        });
    
  }

})
