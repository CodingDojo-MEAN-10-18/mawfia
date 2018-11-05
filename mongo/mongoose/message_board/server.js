const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Missing name.'], minlength: [2, 'Name is too short. (2-25 characters)'], maxlength : [25, 'Name is too long. (2-25 characters)']},
    text : {type: String, required: [true, 'No comment entered.'], minlength : [2, 'Comment length must be greater than 2 charaters'], maxlength : [200, 'Comment must be shorter than 200 characters.']},
}, {timestamps: true })

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Missing name.'], minlength: [2, `Name is too short. (2-25 characters)`], maxlength : [25, 'Name is too long. (2-25 characters)']},
    text : {type: String, required: [true, 'No message entered.'], minlength : [2, 'Message length must be greater than 2 charaters'], maxlength : [200, 'Message must be shorter than 200 characters.']},
    comments : {type: [CommentSchema], required: false}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/message_board');
mongoose.model('Comment', CommentSchema); // We are setting this Schema in our Models as 'Comment'
mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'Message'
const Comment = mongoose.model('Comment');
const Message = mongoose.model('Message');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'victoriassecrect', resave: true, saveUninitialized: true}));
app.use(flash());

app.get('/', (request, response) => {
    Message.find({}, (err, board) => {
        if(err){
            console.log(`Error ${err} occured.`);
            request.flash('errors', `${err} occured`);
            response.render('index', {board:[]});
        }
        else response.render('index', {board: board, moment: moment});
    })
})

app.post('/message/new', (request, response) => {
    let message = new Message({name: request.body.name, text: request.body.text});
    message.save( err => {
        // if there is an error console.log that something went wrong!
        if(err) for(let error in err.errors) request.flash('errors', err.errors[error].message);
        else console.log(`message successfully added to the board!`);

        response.redirect('/');
    })
})

app.post('/comment/new/:message_id', (request, response) => {
    let comment = new Comment({name: request.body.name, text: request.body.text});

    Message.update({_id:request.params.message_id}, {$push : {comments : comment}}, {runValidators: true}, err => {
        if(err){
            for(let error in err.errors.comments.errors) request.flash('errors', err.errors.comments.errors[`${error}`].message);
            response.redirect('/');
        }
        else {
            console.log(`${request.body.name} successfully updated!`);
            response.redirect('/');
        }
    })
})