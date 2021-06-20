// pages/home/home.js
const dayjs = require("./dayjs");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pic_url: "",

    list1: [],
    list2: [],
    list3: [],
    list4: [],
    list5: [],
    list6: [],
    list7: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.vibrateShort({
      type: "type",
    });
   
    this.getDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  getHourUrl: function (hourUrl) {
    const hour = dayjs().hour();
    let { list7, list1, list2, list3, list4, list5, list6 } = this.data;
    let pic_url = "";
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        hourUrl+
        "_0_" +
        i +
        ".png";
      list1.push(pic_url);
    }
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        hourUrl +
        "_1_" +
        i +
        ".png";
      list2.push(pic_url);
    }
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        hourUrl +
        "_2_" +
        i +
        ".png";
      list3.push(pic_url);
    }
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        dayjs().format("YYYY/MM/DD") +
        "/130000_3_" +
        i +
        ".png";
      list4.push(pic_url);
    }
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        dayjs().format("YYYY/MM/DD") +
        "/130000_4_" +
        i +
        ".png";
      list5.push(pic_url);
    }
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        dayjs().format("YYYY/MM/DD") +
        "/130000_5_" +
        i +
        ".png";
      list6.push(pic_url);
    }
    for (let i = 0; i < 8; i++) {
      pic_url =
        "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
        dayjs().format("YYYY/MM/DD") +
        "/130000_6_" +
        i +
        ".png";
      list7.push(pic_url);
    }

    this.setData({
      list7,
      list1,
      list2,
      list3,
      list4,
      list5,
      list6,
    });
  },
  getDate:function(){
    let that = this;
    wx.request({
      url: 'https://himawari8-dl.nict.go.jp/himawari8/img/D531106/latest.json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res.data.date);
       console.log((dayjs(res.data.date).format("YYYY/MM/DD/hhmmss")));
       that.getHourUrl(dayjs(res.data.date).format("YYYY/MM/DD/hhmmss"));
      }
    })
    
  }
});
