// pages/my_info/my_info.js
import { $wuxToast } from '../../components/wux'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "http://localhost:8080/golearn/user/" + app.globalData.appUserInfo.user.id,
      method: 'GET',
      success: function (res) {
        that.setData({
          appUserInfo: res.data,
          avatar: "http://localhost:8080/golearn/img/avatar/" + app.globalData.appUserInfo.user.id + ".jpg"
        })
        app.globalData.appUserInfo = res.data
        wx.setStorageSync('appUserInfo', res.data)
      },
      fail: function (res) {
        console.log(res)
        that.showToastText_connectionFail()
      }
    })
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
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#fffff",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          }
          else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        wx.uploadFile({
          url: 'http://localhost:8080/golearn/avatarAdd', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'image',
          formData: {
            'id': app.globalData.appUserInfo.user.id
          },
          success: function (res) {
            var data = res.data
            console.log("上传成功")//do something
          }
        })
      }
    })
  },

  showToastText_connectionFail() {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: '连接服务器失败',
      success: () => console.log('连接服务器失败')
    })
  },
})