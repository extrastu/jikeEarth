// pages/home/home.js
const dayjs = require("./dayjs");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    Pindex: 2,
    now:dayjs().format("YYYY/MM/DD/ HH:mm:ss")
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
    let {
      list,
      Pindex
    } = this.data;
    let pic_url = "";
    for (let i = 0; i < Pindex; i++) {
      list.push([])
      for (let j = 0; j < Pindex; j++) {
        pic_url =
          "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/"+Pindex+"d/550/" +
          hourUrl +
          "_" + i + "_" +
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
        console.log(dayjs(res.data.date).format("YYYY/MM/DD/HHmmss"));
        that.getHourUrl(dayjs(res.data.date).format("YYYY/MM/DD/HHmmss"));
      },
    });
  },

  createEarthImg: function (IMAGE_URL) {
    // 创建离屏 2D canvas 实例
    const canvas = wx.createOffscreenCanvas({
      type: '2d',
      width: 300,
      height: 150
    })
    // 获取 context。注意这里必须要与创建时的 type 一致
    const context = canvas.getContext('2d')

    // 创建一个图片
    const image = canvas.createImage()
    // 等待图片加载
    image.src = IMAGE_URL
    image.onload = () => {
      console.log('加载完成')
    };
    image.onerror = () => {
      console.log('加载失败')
    }

    // 把图片画到离屏 canvas 上
    context.clearRect(0, 0, 300, 150)
    context.drawImage(image, 0, 0, 300, 150)

    // 获取画完后的数据
    const imgData = context.getImageData(0, 0, 300, 150)

    console.log(imgData);
  }
});