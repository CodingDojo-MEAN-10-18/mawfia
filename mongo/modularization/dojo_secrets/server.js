const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(session({secret: 'victoriassecrect', resave: false, saveUninitialized: true, cookie: { maxAge: 600000} }));
app.use(flash());

require('./server/config/routes.js')(app);