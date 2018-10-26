const express = require('express');
const app = express();
const server = app.listen(6789);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var counter = 0;

io.on('connection', socket => { //2

  socket.emit('initialize', ++counter); //3
  socket.broadcast.emit('update', counter);

  socket.on('visit', () => {
      io.emit('update', ++counter);
      socket.broadcast.emit('update', counter); // must be used for incognito mode
  });

  socket.on('reset', () => {
      //counter = 0;
      io.emit('update', counter=0);
      socket.broadcast.emit('update', counter); // must be used for incognito mode
  })

});



app.get('/', (request, response) => {

    response.render('index');
})