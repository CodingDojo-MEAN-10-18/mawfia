import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN';
  
  onButtonClick(data) { 
    console.log(`Click event is working, ${data}`);
}
}
