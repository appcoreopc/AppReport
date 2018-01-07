import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, USER_GET, USER_GET_OK } from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})

export class UserComponentComponent implements OnInit {

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

  userSubscription : Subscription;  
  
  constructor(private store : Store<CityAppState>) { 
  }

  ngOnInit() {

    console.log('init subscription');    
    this.userSubscription = this.store.subscribe(appData => {
      
      //this.handleMessage(this.getMessage(appData));  
      console.log(appData);
      messageUtil.handleMessage(messageUtil.getMessage(appData, 'USER_GET_OK'), 'USER_GET_OK');
    }); 
  }

  ngAfterViewInit() {
     this.getEmployeeRecord();
  }
   
  save() {     
  }  

  getEmployeeRecord()
  {   
    this.store.dispatch(
      {     
      type: USER_GET 
    });      
  }
}
