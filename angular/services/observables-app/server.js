const express = require('express');
const app = express();
const server = app.listen(5000);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 2},
	description: {type: String, default: ""},
	completed: {type: Boolean, default: false}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/restful_task_api');
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'Wolf'
const Task = mongoose.model('Task');

//kapp.use(express.static(path.join(__dirname, '/my-angular-app/dist')));
app.use(express.static(path.resolve('dist')));

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

app.put('/:task_id', (request, response) => {
    
	Task.updateOne({_id: request.params.task_id}, {title: request.body.title, description: request.body.description, completed: request.body.completed}, {runValidators: true}, err1 => {
        if(err1){
            console.log(`Error ${err} occured.`);
			
			Task.findOne({_id:request.params.task_id}, (err2, task) => {
				
				return response.json({message: 'Error', error : err1, data : task});
			})
        }
        /*else {
            console.log(`${request.body.title} successfully updated!`);
            response.redirect('/');
        }*/
    })
	
	Task.findOne({_id:request.params.task_id}, (err, task) => {
				
			return response.json({message: 'Success', data : task});
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

app.delete('/:task_id', (request, response) => {

	 Task.remove({_id:request.params.task_id}, (err, task) => {
        if(err){
            console.log(`Error ${err} occured.`);
			response.json({message: 'Error', error : err});
        }
        else response.json({message: 'Success', data: task});
    })
})