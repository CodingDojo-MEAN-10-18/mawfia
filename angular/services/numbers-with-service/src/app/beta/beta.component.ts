import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
  numbers2: number[] = [];
  
  constructor(private _dataService: DataService) { }

  ngOnInit() {
	  this.numbers2 = this._dataService.getNumbers2();
  }
  
  addNumber(): void{
	  this._dataService.addNumbers2(Math.floor(Math.random()*11));
  }

}
