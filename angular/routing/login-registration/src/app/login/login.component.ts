import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = null;
  guest: User = new User();
  error: String = null;

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
	  if(this._authenticationService.isAuthenticated()) this._router.navigate(['/dashboard']);
  }
  
  login(guest: User): void{
	let observable: Observable<User> = this._authenticationService.loginUser(this.guest);

	this._authenticationService.userObservers.subscribe(
		(user) => {

			
		
			if(user._id) { this.user = user; this._router.navigate(['/dashboard']);  return; }
			else {
				console.log("no user returned");
				observable.subscribe( success => { this.error = success['error'];  } );
			}			
		}
	)
	this.guest = new User();
	  //this._router.navigateByUrl(['/']);
  }

}
