function IsTel(s) {
  if (s != null) {
    var length = s.length;
    if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
      return true;
    } else {
      return false;
    }
  }
}
var app=getApp()
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
import { $wuxCountDown } from '../../components/wux'
import { $wuxToast } from '../../components/wux'

Page({
  data: {
    disable: true,
    opacity: 0.4,
    verifyCode: ""
  },
  onLoad() {
    this.c1 = new $wuxCountDown({
      date: 'June 7, 2087 15:03:25',
      render(date) {
        const years = this.leadingZeros(date.years, 4) + ' 年 '
        const days = this.leadingZeros(date.days, 3) + ' 天 '
        const hours = this.leadingZeros(date.hours, 2) + ' 时 '
        const min = this.leadingZeros(date.min, 2) + ' 分 '
        const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
        this.setData({
          c1: years + days + hours + min + sec,
        })
      },
    })

    this.c3 = new $wuxCountDown({
      date: +(new Date) + 60000 * 20,
      render(date) {
        const min = this.leadingZeros(date.min, 2) + ' 分 '
        const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

        this.setData({
          c3: min + sec,
        })
      },
    })

  },
  sendSms: function () {
    var that = this
    var phone = that.data.phone;
    Bmob.Sms.requestSmsCode({ "mobilePhoneNumber": phone }).then(function (obj) {
      console.log('发送成功');
      common.showTip('发送成功');

    },
      function (err) {
        common.showTip('发送失败' + err);
        console.log('发送失败' + err);
      });

  },
  vcode() {
    var that = this
    var isTel = IsTel(this.data.phone)
    if (!isTel) {
      this.showToastText_wrongPhone()
    } else {
      if (this.c2 && this.c2.interval) return !1
      this.c2 = new $wuxCountDown({
        date: +(new Date) + 60000,
        onEnd() {
          this.setData({
            c2: '重新获取验证码',
          })
        },
        render(date) {
          const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
          date.sec !== 0 && this.setData({
            c2: sec,
          })
        },
      })
      that.sendSms()
    }
  },
  getPhone: function (e) {
    var that = this
    that.setData({ phone: e.detail.value })
  },
  getVerifyCode: function (e) {
    var that = this
    var isTel = IsTel(this.data.phone)
    that.setData({ verifyCode: e.detail.value })
    if (that.data.verifyCode != "" && isTel) {
      that.setData({
        disable: false,
        opacity: 1,
      })
    }
    else {
      that.setData({
        disable: true,
        opacity: 0.4,
      })
    }
  },
  showToastText_wrongPhone() {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: '请输入正确的手机号',
      success: () => console.log('请输入正确的手机号')
    })
  },

  showToastText_wrongVcode() {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: '验证码错误',
      success: () => console.log('验证码错误')
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

  verifySmsCode: function () {
    var that = this
    var phone = this.data.phone;
    var verifyCode = that.data.verifyCode;
    Bmob.Sms.verifySmsCode(phone, verifyCode).then(function (obj) {
      console.log('验证成功');
      wx.request({
        url: "http://localhost:8080/golearn/login",
        data: [{
          "name":that.data.phone,
          "password": "admin"
        },
        {
          "url": getApp().globalData.userInfo.avatarUrl
        }],
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          app.globalData.isLogin=true
          wx.setStorageSync('isLogin', true)
          app.globalData.appUserInfo=res.data
          wx.setStorageSync('appUserInfo', res.data)
          wx.switchTab({
            url: '../index_1/index_1',
            success: function () {
              console.log("跳转成功")
            },
            fail: function () {
              console.log("跳转失败")
            }
          })
        },
        fail: function (res) {
          console.log(res)
          that.showToastText_connectionFail()
        }
      })

    }, function (err) {
      console.log('验证失败' + err);
      that.showToastText_wrongVcode()
    });
  },
  login: function () {
    wx.showLoading({
      title: '登录中',
    })
    this.verifySmsCode()
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  }
})


