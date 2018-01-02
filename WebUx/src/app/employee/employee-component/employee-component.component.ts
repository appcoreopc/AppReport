import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, EMPLOYEE_SAVE } from '../../sharedObjects/sharedMessages';


@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})

export class EmployeeComponentComponent implements OnInit {


  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
  
  constructor(private store : Store<CityAppState>) { }

  name : string; 
  description : string; 

  ngOnInit() {
  }

  save()
  {
    console.log('save!');
    this.store.dispatch({
      name : this.name, 
      description :  this.description,
      payload : {
        name : this.name, 
        description : this.description
      },
      type: EMPLOYEE_SAVE });          
    } 

}
