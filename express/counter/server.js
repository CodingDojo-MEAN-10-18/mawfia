var express = require("express");
var session = require('express-session');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'abdcefghi', resave: true, saveUninitialized: true}));

app.get('/', (request, response) => {
    request.session.counter = request.session.counter == null ? 0 : request.session.counter + 1;
    response.render('index', {counter: request.session.counter});
})

app.post('/', (request, response) => {
    request.session.counter += 2;
    response.render('index', {counter: request.session.counter});
})

app.get('/reset', (request, response) => {
    request.session.counter = 0;
    response.redirect('/');
})

app.listen(8000, () => {
  console.log("listening on port 8000");
});
