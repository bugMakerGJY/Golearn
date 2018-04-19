// pages/my_info/name/name.js
import { $wuxToast } from '../../../components/wux'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    disable: true,
    opacity: 0.4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getname(e) {
    var that = this
    that.setData({
      name: e.detail.value,
    })
    if (that.data.name != '') {
      that.setData({
        disable: false,
        opacity: 1,
      })
    } else {
      that.setData({
        disabled: true,
        opacity: 0.4
      })
    }
  },
  submit() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/golearn/editUser',
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: app.globalData.appUserInfo.user.id,
        nickname: that.data.name
      },
      success: function () {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
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