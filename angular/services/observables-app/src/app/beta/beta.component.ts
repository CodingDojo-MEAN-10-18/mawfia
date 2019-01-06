import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
  tasks: Task[] = [];
  task: Task = {};
    
  constructor(private _taskService: TaskService) { }

  ngOnInit() {
	//this.getTasksFromService();
	//console.log(this._taskService.getTasks());
	this._taskService.taskObservers.subscribe(
		(tasks: Task[]) => { this.tasks = tasks; }
	);
  }
  
  getTask(task){
	  this._taskService.getTask(task._id).subscribe( t => this.task = t['data'] );
  }
}
