import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userObservers: BehaviorSubject<any[]> = new BehaviorSubject([]);
  
  constructor(private _http: HttpClient, private _cookieService: CookieService) {
  }
  
  loginUser(user: User): Observable<any>{
		//return this._http.post<User>(`/login`, user).subscribe( success => console.log(success), err => console.log(err) );
		//console.log("hello service.", user);
		let observable: Observable<any> = this._http.post<any>('/login', user);
		
		observable.subscribe(
			(observer: Observer<any>) => { 
				if(observer['message'] == 'Success') { this.userObservers.next(observer['user']); return null; }
			}
		);
		
		//observable.subscribe( success => { console.log(success);  } );
		return observable;
  }
  
  registerUser(user: User): Observable<User>{
		//return this._http.post<User>(`/login`, user).subscribe( success => console.log(success), err => console.log(err) );
		//console.log("hello service.", user);
		//let observable: Observable = 
		
		return this._http.post<User>('/register', user);
		
		/*observable.subscribe(
			(observer: Observer) => { 
				if(observer['message'] == 'Success') { this.userObservers.next(observer['user']); this.userObservers.complete(); return null; }
			}
		);*/
		
		//return observable;
  }
  
  getLoggedInUser(): Observable<User>{
	  return this._http.post<User>(`/user`, {id: this._cookieService.get('userID')} );
  }
  
  logout(): Observable<{}>{
	  return this._http.delete('/logout');
  }
  
  isAuthenticated(): boolean{
	  const id = this._cookieService.get('userID');
	  const expired = parseInt(this._cookieService.get('expiration'), 10);
	  const session = this._cookieService.get('session');
	  
	  return id && expired && session && expired > Date.now();
  }
  
}
