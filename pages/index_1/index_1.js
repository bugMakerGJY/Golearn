// pages/index_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [1, 1, 1],
    classes_line1: [{ name: "奥数", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "英语", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "一对一", color: "black", background_color: "white", border_style: "solid", status: 0 },],
    classes_line1: [{ name: "奥数", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "英语", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "一对一", color: "black", background_color: "white", border_style: "solid", status: 0 },],
    classes_line2: [{ name: "书法", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "精品小班", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "作文", color: "black", background_color: "white", border_style: "solid", status: 0 },],
    classes_line3: [{ name: "晚托班", color: "black", background_color: "white", border_style: "solid", status: 0 }, { name: "语文", color: "black", background_color: "white", border_style: "solid", status: 0 },],
    opacity: 0.2,
    disabled: true,
    search_content: "",
    keyword: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      keyword: wx.getStorageSync("keyword")
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
  //获得选中标签数
  get_tags: function () {
    var that = this
    var count = 0;
    for (var i = 0; i < that.data.classes_line1.length; i++) {
      if (that.data.classes_line1[i].status == 1) {
        count++
      }
    }
    for (var i = 0; i < that.data.classes_line2.length; i++) {
      if (that.data.classes_line2[i].status == 1) {
        count++
      }
    }
    for (var i = 0; i < that.data.classes_line3.length; i++) {
      if (that.data.classes_line3[i].status == 1) {
        count++
      }
    }
    return count
  },
  //检查按钮是否启用
  check_button: function () {
    var that = this
    if (that.data.search_content != "") {
      that.setData({
        opacity: 1,
        disabled: false,
      })
    } else if (that.get_tags() == 0) {
      that.setData({
        opacity: 0.2,
        disabled: true,
      })
    } else {
      that.setData({
        opacity: 1,
        disabled: false,
      })
    }
  },
  // 获得输入
  getInput: function (e) {
    var that = this
    that.data.search_content = e.detail.value
    that.check_button()
  },

  // 选择标签第一行
  choose_line1: function (e) {
    var that = this
    var id = e.currentTarget.id;
    if (that.data.classes_line1[id].status == 0) {
      that.data.classes_line1[id].status = 1
      that.data.classes_line1[id].color = "white"
      that.data.classes_line1[id].background_color = "#F56E66"
      that.data.classes_line1[id].border_style = "none"
      that.setData({
        opacity: 1,
        disabled: false,
      })
    } else {
      that.data.classes_line1[id].status = 0
      that.data.classes_line1[id].color = "black"
      that.data.classes_line1[id].background_color = "white"
      that.data.classes_line1[id].border_style = "solid"
      that.check_button()
    }
    that.setData({
      classes_line1: that.data.classes_line1
    })
  },
  // 选择标签第二行
  choose_line2: function (e) {
    var that = this
    var id = e.currentTarget.id;
    if (that.data.classes_line2[id].status == 0) {
      that.data.classes_line2[id].status = 1
      that.data.classes_line2[id].color = "white"
      that.data.classes_line2[id].background_color = "#F56E66"
      that.data.classes_line2[id].border_style = "none"
      that.setData({
        opacity: 1,
        disabled: false,
      })
    } else {
      that.data.classes_line2[id].status = 0
      that.data.classes_line2[id].color = "black"
      that.data.classes_line2[id].background_color = "white"
      that.data.classes_line2[id].border_style = "solid"
      that.check_button()
    }
    that.setData({
      classes_line2: that.data.classes_line2
    })
  },
  // 选择标签第三行
  choose_line3: function (e) {
    var that = this
    var id = e.currentTarget.id;
    if (that.data.classes_line3[id].status == 0) {
      that.data.classes_line3[id].status = 1
      that.data.classes_line3[id].color = "white"
      that.data.classes_line3[id].background_color = "#F56E66"
      that.data.classes_line3[id].border_style = "none"
      that.setData({
        opacity: 1,
        disabled: false,
      })
    } else {
      that.data.classes_line3[id].status = 0
      that.data.classes_line3[id].color = "black"
      that.data.classes_line3[id].background_color = "white"
      that.data.classes_line3[id].border_style = "solid"
      that.check_button()
    }
    that.setData({
      classes_line3: that.data.classes_line3
    })
  },
  //提交
  submit: function () {
    var that = this
    var keyword = []
    if (that.data.search_content != "")
      keyword.push(that.data.search_content)
    for (var i = 0; i < that.data.classes_line1.length; i++) {
      if (that.data.classes_line1[i].status == 1) {
        keyword.push(that.data.classes_line1[i].name)
      }
    }
    for (var i = 0; i < that.data.classes_line2.length; i++) {
      if (that.data.classes_line2[i].status == 1) {
        keyword.push(that.data.classes_line2[i].name)
      }
    }
    for (var i = 0; i < that.data.classes_line3.length; i++) {
      if (that.data.classes_line3[i].status == 1) {
        keyword.push(that.data.classes_line3[i].name)
      }
    }
    wx.setStorageSync('keyword', keyword)
    // wx.setStorageSync('state', that.data.state)
    // wx.setStorageSync('base', that.data.state == 0 ? 1 : 0)
    that.setData({
      keyword: keyword
    })
  }
})