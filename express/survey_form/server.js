var express = require("express");
//var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/static"));
//app.use(session({secret: 'abdcefghi', resave: true, saveUninitialized: true}));

app.get('/', (request, response) => {
    response.render('index');
})

app.post('/result', (request, response) => {
    //console.log(request.body);
    response.render('result', {result: request.body});
})

app.listen(8111, () => {
  console.log("listening on port 8111");
});
