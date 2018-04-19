// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { name: "待付款", pic: "../../icon/pay.png" },
      { name: "待使用", pic: "../../icon/use.png" },
      { name: "待评价", pic: "../../icon/comment.png" },
      { name: "售后/退款", pic: "../../icon/repay.png" }],
    // isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      isLogin: app.globalData.isLogin,
    })
    if (that.data.isLogin) {
      that.setData({
        appUserInfo: app.globalData.appUserInfo,
        avatar: "http://localhost:8080/golearn/img/avatar/" + app.globalData.appUserInfo.user.id + ".jpg"
      })
    } else {
      that.setData({
        avatar: "http://localhost:8080/golearn/img/avatar/default.jpg"
      })
    }
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
    this.onLoad()
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
  quit() {
    var that = this
    that.setData({
      isLogin: false,
      avatar: "http://localhost:8080/golearn/img/avatar/default.jpg"
    })
    app.globalData.isLogin = false
    try {
      wx.clearStorageSync()
    } catch (e) {
      console.log('缓存清理失败')
    }
  }
})