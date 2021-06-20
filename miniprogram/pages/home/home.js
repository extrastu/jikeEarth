// pages/home/home.js
const dayjs = require("./dayjs");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.vibrateShort({
      type: "type",
    });

    this.getDate();
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
    let { list7, list1, list2, list3, list4, list5, list6, list } = this.data;
    let pic_url = "";
    let arr =[]
    for (let i = 0; i < 8; i++) {
      list.push([])
      for (let j = 0; j < 8; j++) {
        pic_url =
          "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/" +
          hourUrl +
          "_"+ i+"_" +
          j +
          ".png";
        list[i].push(pic_url);
      }
    }

    
    this.setData({
      
      list
    });
  },
  getDate: function () {
    let that = this;
    wx.request({
      url: "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/latest.json",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        console.log(res.data.date);
        console.log(dayjs(res.data.date).format("YYYY/MM/DD/hhmmss"));
        that.getHourUrl(dayjs(res.data.date).format("YYYY/MM/DD/hhmmss"));
      },
    });
  },
});
