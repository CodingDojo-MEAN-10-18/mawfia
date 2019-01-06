import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
	taskObservers: BehaviorSubject<Observerable[]> = new BehaviorSubject<Observerable[]>;	

	constructor(private _http: HttpClient) {
		this.getTasks();
	}

	getTasks(){
		// our http response is an Observable, store it in a variable
		this._http.get('/tasks').subscribe(
			(observer: Observerable) => { this.taskObservers.next(observer['tasks']); }
		);
	}

	getTask(id: String): Observable<Task>{
		return this._http.get<Task>(`/${id}`);
	}
 
	createTask(task: Task): Observable<Task>{
		return this._http.post<Task>(`/task`, task).subscribe( success => this.getTasks(), err => console.log(err); );
	}
 
	updateTask(task: Task): Observable<Task>{
		return this._http.put<Task>(`/${task._id}`, task).subscribe( success => this.getTasks(), err => console.log(err) );
	}
	
	deleteTask(id: String): Observable<Task>{
		return this._http.delete<Task>(`/${id}`).subscribe( success => this.getTasks(), err => console.log(err) );
	}
 
}