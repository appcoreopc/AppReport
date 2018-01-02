import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, EMPLOYEE_SAVE } from '../../sharedObjects/sharedMessages';


@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})

export class EmployeeComponentComponent implements OnInit {

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
