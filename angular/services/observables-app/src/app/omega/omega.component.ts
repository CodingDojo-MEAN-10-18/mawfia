import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-omega',
  templateUrl: './omega.component.html',
  styleUrls: ['./omega.component.css']
})
export class OmegaComponent implements OnInit {

  @Input() task: Task;
  //editID: string = "";
  
  edit: string = null;

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
	  this.task = null;
  }
  
  editTask(t: Task): void{
	  //console.log("Edit clicked", t);
	  this.edit = t._id;
	  //this.editID = t._id;
  }
  
  updateTask(): void{
	  //console.log("Update selected", this.task);
	  this._taskService.updateTask(this.task);
	  this.edit = null;
  }
  
  cancelEdit(t: Task): void{
	  this.edit = null;
  }
  
  deleteTask(): void{
	  this._taskService.deleteTask(this.task._id);
	  this.task = null;
  }
}
