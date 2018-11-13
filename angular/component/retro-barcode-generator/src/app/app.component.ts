import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'retro-barcode-generator';
  colors: string[] = ['AliceBlue','AntiqueWhite','Azure','Tomato','Orange','DodgeBlue','MediumSeaGreen','Gray','SlatedBlue','Violet','LightGray'];
	
	randomColor():number {
		return Math.floor(Math.random()*this.colors.length);
	}
  
}
