const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 name: {type:String},
 age: {type:Number}
})

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User')

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//app.use(session({secret: 'victoriassecrect', resave: true, saveUninitialized: true}));

app.get('/', (request, response) => {

    User.find({}, (err, users) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.render('index', {users:[]});
        }
        else response.render('index', {users:users});
    })
})

app.post('/users', (request, response) => {
    //console.log(request.body);
    var user = new User({name: request.body.name, age: request.body.age});
    user.save( err => {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a user!');
          response.redirect('/');
        }
    })
    //response.redirect('/');
})