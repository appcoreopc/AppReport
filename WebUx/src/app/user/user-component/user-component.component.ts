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
 
  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'username' }   
  ];

  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 

  constructor(private store : Store<CityAppState>) { 
  }

  ngOnInit() {   
    this.userSubscription = this.store.subscribe(appData => {           
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, USER_GET_OK), USER_GET_OK));
    }); 
  }

  ngAfterViewInit() {
     this.getEmployeeRecord();
  }
   
  save() {    
  }  

  componentMessageHandle(message : any) {

    if (message && message.type == USER_GET_OK)
    {
      this.rows.length = 0;
      for (var idx in message.data)
      {
        var userInfo = message.data[idx];    
        this.dataList.push({  
            name : userInfo.name, 
            username : userInfo.username
        });

        console.log(this.rows);
        this.rows = this.dataList;
      }
    }    
  }

  getEmployeeRecord()
  {   
    this.store.dispatch(
      {     
        type: USER_GET 
      });      
  }
}
