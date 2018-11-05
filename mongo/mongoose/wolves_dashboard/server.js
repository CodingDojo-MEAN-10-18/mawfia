const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const moment = require('moment');

const WolfSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    age: {type: Number, required: true, min: 1, max: 150},
    weight: {type: Number, required: true, min: 1, max: 225}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/wolves_dashboard');
mongoose.model('Wolf', WolfSchema); // We are setting this Schema in our Models as 'Wolf'
const Wolf = mongoose.model('Wolf')

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'victoriassecrect', resave: true, saveUninitialized: true}));
app.use(flash());

app.get(['/', '/wolves'], (request, response) => {
    Wolf.find({}, (err, wolves) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.render('index', {wolves:[]});
        }
        else response.render('index', {wolves: wolves, moment: moment});
    })
})

app.get('/wolf/new', (request, response) => {
    response.render('new');
})

app.get('/wolf/:wolf_id', (request, response) => {
    Wolf.findOne({_id:request.params.wolf_id}, (err, wolf) => {
        if(err){
            console.log(`Error ${err} occured.`);
            request.flash('errors', "Wolf not found.");
            response.redirect('/');
        }
        else response.render('wolf', {wolf: wolf});
    })
})

app.post('/wolves', (request, response) => {
    let wolf = new Wolf({name: request.body.name, age: request.body.age, weight: request.body.weight});
    wolf.save( err => {
        // if there is an error console.log that something went wrong!
        if(err) {
          //console.log(err);
          for(let key in err.errors) request.flash('errors', err.errors[key].message);
          response.redirect('/wolf/new');
        } else { // else console.log that we did well and then redirect to the root route
          console.log(`${wolf.name} successfully added to the pack!`);
          response.redirect('/wolves');
        }
    })
})

app.post('/wolf/:wolf_id', (request, response) => {
    Wolf.update({_id:request.params.wolf_id}, {name:request.body.name, age:request.body.age, weight:request.body.weight}, {runValidators: true}, err => {
        if(err){
            for(let key in err.errors) request.flash('errors', err.errors[key].message);
            response.redirect(`/wolf/edit/${request.params.wolf_id}`);
        }
        else {
            console.log(`${request.body.name} successfully updated!`);
            response.redirect('/wolves');
        }
    })
})

app.get('/wolf/edit/:wolf_id', (request, response) => {
    Wolf.findOne({_id:request.params.wolf_id}, (err, wolf) => {
        if(err){
            console.log(`Error ${err} occured.`);
            request.flash('errors', "Wolf not found.");
            response.redirect('/');
        }
        else response.render('edit', {wolf: wolf});
    })
})

app.get('/wolf/destroy/:wolf_id', (request, response) => {
    Wolf.remove({_id:request.params.wolf_id}, (err, wolf) => {
        if(err){
            console.log(`Error ${err} occured.`);
            for(let key in err.errors) request.flash('errors', err.errors[key].message);
        }
        else{
            request.flash("errors", `Wolf successfully deleted.`);
        }

        response.redirect('/wolves');
    })
})