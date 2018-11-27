import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  numbers1: number[] = [];
  numbers2: number[] = [];
  difference: number[] = [];
  
  constructor() { }
  
  getNumbers1(): number[] {
	  return this.numbers1;
  }
  
  getNumbers2(): number[] {
	  return this.numbers2;
  }
  
  getDifference(): number[] {
	  return this.difference;
  }
  
  addNumbers1(num: number): void {
	  this.numbers1.push(num);
  }
  
  addNumbers2(num: number): void {
	  this.numbers2.push(num);
  }
  
  addDifference(num: number): void {
	  this.difference.push(num);
  }
}
