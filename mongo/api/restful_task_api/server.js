const express = require('express');
const app = express();
const server = app.listen(5000);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 2},
	description: {type: String, default: ""},
	completed: {type: Boolean, default: false}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/restful_task_api');
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'Wolf'
const Task = mongoose.model('Task');

app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(session({secret: 'victoriassecrect', resave: true, saveUninitialized: true}));

app.get(['/', '/tasks'], (request, response) => {
    
	Task.find({}, (err, tasks) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.json({message: 'Error', error : err});
        }
        else response.json({message: 'Success', tasks});
    })
})

app.post('/task', (request, response) => {
    
	let task = new Task({title: request.body.title, description: request.body.description, completed: request.body.completed});
	
	task.save( err => {
		if(err){
            console.log(`Error ${err} occured.`);
            response.json({message: 'Error', error : err});
        }
        else response.json({message: 'Success', task});
	})
})

app.post('/:task_id', (request, response) => {
    
	Task.updateOne({_id: request.params.task_id}, {title: request.body.title, description: request.body.description, completed: request.body.completed}, {runValidators: true}, err => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.json({message: 'Error', error : err});
        }
        else {
            console.log(`${request.body.title} successfully updated!`);
            response.redirect('/');
        }
    })
})

app.get('/:task_id', (request, response) => {
    
	Task.findOne({_id:request.params.task_id}, (err, task) => {
        if(err){
            console.log(`Error ${err} occured.`);
            response.json({message: 'Error', error : err});
        }
        else response.json({message: 'Success', data: task});
    })
})

app.get('/remove/:task_id', (request, response) => {

	 Task.remove({_id:request.params.task_id}, (err, task) => {
        if(err){
            console.log(`Error ${err} occured.`);
			response.json({message: 'Error', error : err});
        }
        else response.redirect('/');
    })
})