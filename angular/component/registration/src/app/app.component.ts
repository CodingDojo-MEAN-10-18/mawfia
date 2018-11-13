import { Component } from '@angular/core';
import { User } from './user';
import * as $ from "../jquery-3.3.1.min.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  states: string[] = ['Alaska','California','Colorado','Conneticuit','Mississippi','New York','New Hampshire','North Dakota','South Dakota','Texas','Utah','Vermont','Virginia'];
  user: User = new User();
  reg_user: User = new User();
  users: User[] = [];
  onSubmit(status){
      this.users.push(this.user);

      this.reg_user.first_name = this.user.first_name;
      this.reg_user.email = this.user.email;
      this.reg_user.address1 = this.user.address1;
      this.reg_user.city = this.user.city;
      this.reg_user.state = this.user.state;
      $('#results').show();

      this.user = new User();

  }
}
