import { $wuxRater } from '../../components/wux'

Page({
  data: {
    review:"",
    disable: true,
    opacity: 0.4,
  },
  onLoad() {
    $wuxRater.init('star', {
      value: 0,
    })

  },

  getReview:function(e){
    var that=this
    that.data.review=e.detail.value
    if(that.data.review==""){
      that.setData({
        disable: true,
        opacity: 0.4,
      })
    }else{
      that.setData({
        disable: false,
        opacity: 1,
      })
    }
  }
})