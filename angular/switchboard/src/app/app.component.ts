import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  switches: boolean[] = [false, false, false, false, false, false, false, false, false, false];
  onButtonClick(x){
      this.switches[x] = !this.switches[x];
  };
}
