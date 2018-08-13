// pages/chat1/chat1.js
var app = getApp()
var chatFun = require('./chat_function.js')
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
      wx.connectSocket({
        url: 'wss://fangkemi.xyz/wss',
        header: { "content-type": 'application/x-www-form-urlencoded' }
      })
      wx.onSocketOpen(function (res){
        console.log(res)
        let nickName = "kemi"
        chatFun.send('{"type":"login","client_name":"' + nickName + '","room_id":"1000","content":""}');
      })
      //监听聊天内容函数
      wx.onSocketMessage(function(res){
        console.log(res);
        var content = JSON.parse(res.data);
        console.log("内容：" + content);
        
        // console.log(res.data.content)
        var msg = Array()
        msg.push(content)
        console.log(msg);
      })

  },

  sendMessage: function () {
    var nickName = "kemi";
    chatFun.send('{"type":"say","client_name":"' + nickName + '","room_id":"1","content":"哈哈","to_client_id":"all"}') 
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
  
  }
})