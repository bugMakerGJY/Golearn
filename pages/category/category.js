// pages/category/category.js
import { $wuxToast } from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // category: [
    //   { name: "推荐分类", color: "#F56E66", weight: "bold", status: 1, sub_category: [{ name: "一年级" }, { name: "二年级" }, { name: "三年级" }, { name: "四年级" }, { name: "五年级" }, { name: "六年级" }] },
    //   { name: "小学", color: "black", weight: "inherit", status: 0, sub_category: [{ name: "二年级" }] },
    //   { name: "初中", color: "black", weight: "inherit", status: 0, sub_category: [{ name: "一年级" }] },
    //   { name: "高中", color: "black", weight: "inherit", status: 0, sub_category: [{ name: "一年级" }] },
    //   { name: "留学课程", color: "black", weight: "inherit", status: 0, sub_category: [{ name: "一年级" }] },
    //   { name: "兴趣课程", color: "black", weight: "inherit", status: 0, sub_category: [{ name: "一年级" }] },],
    // grids: [{ name: "一年级" }, { name: "二年级" }, { name: "三年级" }, { name: "四年级" }, { name: "五年级" }, { name: "六年级" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "http://localhost:8080/golearn/category_1",
      method: 'GET',
      success: function (res) {
        res.data.category_1[0].color = "#F56E66"
        res.data.category_1[0].weight = "bold"
        res.data.category_1[0].status = 1
        that.data.category = res.data.category_1
        that.getCategory_2(0,res.data.category_1[0].id)
        for (var i = 1; i < res.data.category_1.length; i++) {
          res.data.category_1[i].color = "black"
          res.data.category_1[i].weight = "inherit"
          res.data.category_1[i].status = 0
          that.data.category = res.data.category_1
          that.getCategory_2(i, res.data.category_1[i].id)
        }
        that.setData({
          category: that.data.category
        })
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
  //选择分类
  choose_category: function (e) {
    var that = this
    var id = e.currentTarget.id;
    if (that.data.category[id].status == 0) {
      for (var i = 0; i < that.data.category.length; i++) {
        if (i != id) {
          that.data.category[i].status = 0
          that.data.category[i].color = "black"
          that.data.category[i].weight = "inherit"
        }
      }
      that.data.category[id].status = 1
      that.data.category[id].color = "#F56E66"
      that.data.category[id].weight = "bold"
      that.data.grids = that.data.category[id].sub_category
    }
    that.setData({
      category: that.data.category,
      grids: that.data.grids
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
  getCategory_2: function (index,id) {
    var that=this
    wx.request({
      url: "http://localhost:8080/golearn/category_2/" + id,
      method: 'GET',
      success: function (res) {
        that.data.category[index].sub_category=res.data.category_2
        that.setData({
          category: that.data.category,
          grids: that.data.category[id].sub_category
        })
      },
      fail: function (res) {
        console.log(res)
        that.showToastText_connectionFail()
      }
    })
  }
})