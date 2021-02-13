import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor( private http: HttpClient ) { }
    Repdata;
    currentZone = "Edmonton zone"; 
  
  getEdmontonData() {    
    this.http.get('https://data.edmonton.ca/resource/2h73-35uw.json').subscribe(data => this.Repdata = data)
  }

  setVariable(newVar) {
    this.currentZone = newVar
    this.ngOnInit()

  }

  ngOnInit() {
    this.getEdmontonData()
  }

}
