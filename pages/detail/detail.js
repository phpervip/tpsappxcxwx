var server = require('../../utils/server');
Page({

  data: {



  },

  formSubmit: function (e) {

    if (e.detail.value.mobile.length == 0) {

      wx.showToast({

        title: '手机号码不得为空!',

        icon: 'loading',

        duration: 1000

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.mobile.length != 11) {

      wx.showToast({

        title: '请输入11位手机号码!',

        icon: 'loading',

        duration: 1000

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } 
    else {
      var mobile = e.detail.value.mobile;
      var user_id = getApp().globalData.userInfo.user_id;
      var name=e.detail.value.name;
      var leibie=e.detail.value.leibie;
      var title=e.detail.value.title;
      server.postJSON('/User/addruzhu/user_id/' + user_id, { user_id: user_id, mobile: mobile, user_name: name,lbtype: leibie,title:title}, function (res) 
      {

        if (res.data.status == 1) {
          wx.showToast({
            title: '您的申请提交成功，工作人员会尽快的联系您！',
            duration: 2000
          });
      
          wx.navigateBack();
          
          
        }
        else
        {
          wx.showToast({
            title: res.data.msg,
            duration: 2000
          });
        }


      });
      

    }

  },

})