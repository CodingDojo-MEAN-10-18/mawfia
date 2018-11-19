import { Component } from '@angular/core';
import { Quote } from './quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  quote: Quote = new Quote();

  quotes: Quote[] = [];

  onSubmit(status){
      this.quotes.push(this.quote);
	  this.quote = new Quote();
  }
  
  dataFromChild(eventData){
	eventData[1] === 0 ? this.quotes.splice(eventData[0], 1) : this.quotes[eventData[0]].rating += eventData[1];
	
	this.quotes.sort( (a, b)=> { return b.rating - a.rating;});
  }
  
}
