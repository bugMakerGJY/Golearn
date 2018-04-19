// pages/my_info/gender/gender.js
import { $wuxToast } from '../../../components/wux'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { gender: '女', value: '0', checked: false },
      { gender: '男', value: '1', checked: false }
    ],
    disable: true,
    opacity: 0.4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      disable: false,
      opacity: 1
    });
  },
  submit() {
    var that = this
    wx.request({
      url: "http://localhost:8080/golearn/editUser",
      data: {
        id: app.globalData.appUserInfo.user.id,
        gender: that.data.radioItems[0].checked ? 0 : 1,
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          icon:'success'
        })
      },
      fail: function () {
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
  showToastText_connectionFail() {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: '保存失败',
      success: () => console.log('保存服务器失败')
    })
  },
})