import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-omega',
  templateUrl: './omega.component.html',
  styleUrls: ['./omega.component.css']
})
export class OmegaComponent implements OnInit {
  numbers1: number[] = [];
  numbers2: number[] = [];
  difference: number[] = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
	 this.numbers1 = this._dataService.getNumbers1(); 
	 this.numbers2 = this._dataService.getNumbers2(); 
	 this.difference = this._dataService.getDifference();
  }
  
  generateDifference(){
	  let a: number = 0;
	  let b: number = 0;
	  
	  this.numbers1.forEach( i=> a+=i );
	  this.numbers2.forEach( i=> b+=i );
	  
	  this._dataService.addDifference(a-b);
 }

}
