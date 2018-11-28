const express = require('express');
const app = express();
const server = app.listen(5000);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const session = require('express-session');
const flash = require('express-flash');

const PersonSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/1955_api');
mongoose.model('Person', PersonSchema); // We are setting this Schema in our Models as 'Wolf'
const Person = mongoose.model('Person');

app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(session({secret: 'victoriassecrect', resave: true, saveUninitialized: true}));
app.use(flash());

app.get(['/', '/people'], (request, response) => {
    
	Person.find({}, (err, people) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.json({message: 'Error', error : err});
        }
        else response.json({message: 'Success', data: people});
    })
})

app.get('/new/:name', (request, response) => {
    
	let person = new Person({name:request.params.name})
	
	person.save( err => {
		if(err){
            console.log(`Error ${err} occured.`);
            response.json({message: 'Error', error : err});
        }
        else response.redirect('/');
	})
})

app.get('/:name', (request, response) => {
    Person.findOne({name:request.params.name}, (err, person) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.redirect('/');
        }
        else response.json({message: 'Success', data: person});
    })
})

app.get('/remove/:name', (request, response) => {

	 Person.remove({name:request.params.name}, (err, person) => {
        if(err){
            console.log(`Error ${err} occured.`);
			response.json({message: 'Error', error : err});
        }
        else response.redirect('/');
    })
})

/*app.get('/wolf/:wolf_id', (request, response) => {
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
})*/