// pages/home/home.js
const dayjs = require("./dayjs");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic_url: '',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.vibrateShort({
      type: 'type',
    })
    this.getHourUrl()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getHourUrl: function () {
    const hour = dayjs().hour();
    console.log(hour);
    let {list} = this.data;
    let hour_url = ''
    let pic_url = ''

    if (hour <= 8) {
      hour_url = (hour + 24 - 8) * 10000
    } else {
      hour_url = (hour - 8) * 10000
    }
    hour_url =hour_url + 2000
    if (hour_url < 100000) {
      hour_url = "0" + String(hour_url)
    } else {
      hour_url = String(hour_url)
    }

    // pic_url = 'http://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/' + dayjs().format("YYYY/MM/DD") + "/" + hour_url + "_0_1.png"

    for(let i = 0;i<4;i++){
      pic_url = 'http://himawari8-dl.nict.go.jp/himawari8/img/D531106/8d/550/' + dayjs().format("YYYY/MM/DD") + "/" + hour_url + "_0_"+i+".png"
      list.push(pic_url)
    }

    console.log(pic_url);
    this.setData({
      list
    })
  }
})