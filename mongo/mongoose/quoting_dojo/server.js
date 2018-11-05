const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 2},
    quote: {type:String, required: true, minlength: 1}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/quoting_dojo');
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
const User = mongoose.model('User')

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'victoriassecrect', resave: true, saveUninitialized: true}));
app.use(flash());

app.get('/', (request, response) => {
    response.render('index');
})

app.get('/quotes', (request, response) => {
    User.find({}, (err, users) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.render('quotes', {users:[]});
        }
        else response.render('quotes', {users:users, moment: moment});
    })
})

app.post('/quotes', (request, response) => {
    let user = new User({name: request.body.name, quote: request.body.quote});
    user.save( err => {
        // if there is an error console.log that something went wrong!
        if(err) {
          //console.log(err);
          for(let key in err.errors) request.flash('test', err.errors[key].message);
          response.redirect('/');
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added the quote!');
          response.redirect('/quotes');
        }
    })
})