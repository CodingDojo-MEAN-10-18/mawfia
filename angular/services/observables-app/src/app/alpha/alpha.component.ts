import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {
  tasks: Task[] = [];
  
  task: Task = new Task();
  
  constructor(private _taskService: TaskService) { }

  ngOnInit() {
	  this._taskService.taskObservers.subscribe(
		(tasks: Task[]) => { this.tasks = tasks; }
	);
  }
  
  onSubmit(){
	  
	  //console.log(`${this.task.title} added to task list.`);
	  this._taskService.createTask(this.task);
	  
	  //observable.subscribe( response => this._taskService.task, err => console.log(err) );
	  this.task = new Task();
  }

}
