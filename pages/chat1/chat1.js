// pages/chat1/chat1.js
var app = getApp()
var chatFun = require('./chat_function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:null,
    messages:[
      
    ],
    // lastMessageId:
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
      wx.connectSocket({
        // url: 'wss://fangkemi.xyz/wss',
        url: 'ws://127.0.0.1:7272',
        header: { "content-type": 'application/x-www-form-urlencoded' }
      })
      wx.onSocketOpen(function (res){
        console.log(res)
        let nickName = "kemi"
        chatFun.send('{"type":"login","client_name":"' + nickName + '","room_id":"1000","content":"进入房间","user":""}');
      })
      //监听聊天内容函数
      wx.onSocketMessage(function(res){
        console.log("监听聊天")
        console.log(res);
        var message = JSON.parse(res.data);
        // console.log();
        
        
        that.data.messages.push(message)
        that.data.lastMessageId = that.data.messages.length
        console.log(message.content);
        console.log(that.data.messages)
        // console.log("在socket-message中")
        
        // console.log(res.data)
        var msg = Array()
        // msg.push(chat.type)
        // console.log(msg);
      })

  },
  changeInputContent(e){
    console.log(e)
  },
  getUserInfo: function (e){
      var that = this
    // console.log(that.data.userInfo)    
    if (that.data.nickName != null) { return }      
      console.log("获取用户信息")
      console.log(e.detail.userInfo)
      that.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
      })      
  },

  sendMessage: function (mesage) {
    var that = this
    if (that.data.nickName == null){return}
    console.log(mesage['msg'])
    console.log("在sendMessage函数中")
    console.log(mesage)
    
    var mgs = mesage.msg
    var nickName = "放了吗";
    
    console.log(that.data.nickName)
    chatFun.send('{"type":"say","client_name":"' + nickName + '","room_id":"1","content":"'+mgs+'","to_client_id":"all","nickName":"'+that.data.nickName+'","avatarUrl":"'+that.data.avatarUrl+'"}') 
  },
  onsubmit:function(e){
      console.log(e);
      console.log("在onsubmit中")
      this.sendMessage(e.detail.value);
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