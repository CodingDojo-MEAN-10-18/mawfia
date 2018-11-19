import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../quote';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  @Input() quotes: Quote[];
  
  @Output() aTaskEventEmitter = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
  
  voteUp(quote: number):void{
       //  3 Emit the Event
    this.aTaskEventEmitter.emit([quote, 1]); //we can pass in any data type
  }
  
  voteDown(quote: number){
	  this.aTaskEventEmitter.emit([quote, -1]); //we can pass in any data type
  }
  
  deleteQuote(quote: number){
	  this.aTaskEventEmitter.emit([quote, 0]); //we can pass in any data type
  }

}
