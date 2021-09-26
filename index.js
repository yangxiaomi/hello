const { Socket } = require('dgram');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.get('/',function(req,res){
 res.sendFile(__dirname+"\\index.html");
})

io.on('connection', function(socket){
 console.log("connection:"+socket.id);
 io.emit('news',{id:socket.id,content:'有人加入群聊'});
 socket.on('chat message', msg => {
  console.log("--------->"+socket.id);
  io.emit('chat message', msg);
});

 
 socket.on('sendUser',function(data){
  io.to(data.to).emit('sendClient',data);
 })

});



http.listen(port, (socket) => {
 console.log(`Socket.IO server running at http://localhost:${port}/`);
})