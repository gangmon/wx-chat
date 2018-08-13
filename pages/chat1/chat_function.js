module.exports = {
  send:send,
}

function send(msg,that) {
  wx.sendSocketMessage({
    data: msg,
  })
}

function login(client_name,room_id,that){
  this.send('{"type":"login","client_name":"' + client_name + '","room_id":"'+room_id+'"}')
}

function sendMessage(content,client_name,room_id,that){
  this.send('{"type":"say","client_name":"' + client_name + '","room_id":"'+room_id+'","content":"'+content+'","to_client_id":"all"}');
  
  
}