import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date = new Date();
  zone = 3;
  onButtonClick(zone){
      if(zone) {
          this.date = new Date(new Date().setUTCHours(parseInt(zone)));
          this.zone = parseInt(zone);
      }
      else {
          this.date = new Date();
          this.zone = 3;
      }
  };
}
