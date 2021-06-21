// pages/canvas/canvas.js
const dayjs = require("./dayjs");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    list: [],
    Pindex: 2,
    canvas:null,
    dpr:null,
    ctx:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDev()
    this.init()
  },
  getDev: function () {
    const {
      device
    } = this.data;
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          device: result
        })
      },
    })
  },

  getHourUrl: function (hourUrl) {
    const hour = dayjs().hour();
    let {
      list,
      Pindex,canvas,ctx,device
    } = this.data;
    let pic_url = "";
    let all = []
    for (let i = 0; i < Pindex; i++) {
      list.push([])
      for (let j = 0; j < Pindex; j++) {
        pic_url =
          "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/" + Pindex + "d/550/" +
          hourUrl +
          "_" + i + "_" +
          j +
          ".png";
        list[i].push(pic_url);
        all.push(new Promise(function (resolve, reject) {
          let img = canvas.createImage()
          img.onload = () => {
            resolve(img)
          }
          img.src = pic_url
        }))
      }
    }

    Promise.all(all).then(res => {
      //主要就是计算好各个图文的位置
      ctx.drawImage(res[0], 0, device.windowWidth/2, device.windowWidth/2, device.windowWidth/2)
      ctx.drawImage(res[1], 0, device.windowWidth, device.windowWidth/2, device.windowWidth/2)
      ctx.drawImage(res[2], device.windowWidth/2, device.windowWidth/2, device.windowWidth/2, device.windowWidth/2)
      ctx.drawImage(res[3], device.windowWidth/2, device.windowWidth, device.windowWidth/2, device.windowWidth/2)
    })
  },
  getDate: function () {
    let that = this;
    wx.request({
      url: "https://himawari8-dl.nict.go.jp/himawari8/img/D531106/latest.json",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.getHourUrl(dayjs(res.data.date).format("YYYY/MM/DD/HHmmss"));
      },
    });
  },
  getShareImagePath: function () {
    const {
      device,canvas,dpr
    } = this.data;
    const that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: device.windowWidth,
      height: device.windowHeight,
      destWidth: device.windowWidth*dpr,
      destHeight: device.windowHeight*dpr,
      canvas,
      success: function (res) {
        that.savePhoto(res.tempFilePath)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  savePhoto: function (url) {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  },
  init: function () {
    const query = wx.createSelectorQuery()
    query.select('#earth')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.fillStyle = '#000000'
        ctx.fill()
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.scale(dpr, dpr)
        this.setData({
          canvas,dpr,ctx
        },()=>{
          this.getDate()
        })
      })
  }
})