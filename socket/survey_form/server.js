const express = require('express');
const app = express();
app.use(express.static(__dirname + "/static"));
const server = app.listen(8000);
const io = require('socket.io')(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

io.on('connection', socket => { //2

  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server visit:' }); //3
  socket.on('posting_form', data => {
      socket.emit('updated_message', data );
      socket.emit('random_number', 1+Math.floor((Math.random()*1000)));
  });

});

app.get('/', (request, response) => {

    response.render('index');
})