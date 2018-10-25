const express = require("express");
//var session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

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

app.get('/people/:page', function(req, res){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
	
	var page = req.params.page != 0 ? `https://swapi.co/api/people/?page=${req.params.page}` : 'https://swapi.co/api/people/';

    axios.get(page)
    .then(data => { 
		
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!

        console.log(error);
        res.json(error);
    })
});

app.get('/planets/:page', function(req, res){
	
	var page = req.params.page != 0 ? `https://swapi.co/api/planets/?page=${req.params.page}` : 'https://swapi.co/api/planets/';

    axios.get(page)
    .then(data => { 
		
        // rather than rendering, just send back the json data!
        res.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!

        console.log(error);
        res.json(error);
    })
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});