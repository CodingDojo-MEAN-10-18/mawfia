import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {
  numbers1: number[] = [];
  
  constructor(private _dataService: DataService) { }

  ngOnInit() {
	  this.numbers1 = this._dataService.getNumbers1();
  }

  addNumber(): void{
	  this._dataService.addNumbers1(Math.floor(Math.random()*11));
  }
  
}
