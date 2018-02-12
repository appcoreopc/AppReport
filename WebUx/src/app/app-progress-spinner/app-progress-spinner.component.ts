import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, EMPLOYEE_WAIT_PENDING,  EMPLOYEE_WAIT_OK } from '../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../sharedObjects/storeMessageUtil";
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-app-progress-spinner',
  templateUrl: './app-progress-spinner.component.html',
  styleUrls: ['./app-progress-spinner.component.css']
})
export class AppProgressSpinnerComponent implements OnInit {

  display : boolean = false; 
  userSubscription : Subscription;

  
  constructor(private store : Store<CityAppState>) { }
  
  ngOnInit() {

    this.userSubscription = this.store.subscribe(appData => { 
        
      this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
        [ EMPLOYEE_WAIT_PENDING, EMPLOYEE_WAIT_OK]));
      }); 
  }

  componentMessageHandle(messageAll : Array<any>) {
          
    messageAll.map(message => {  
      
      if (message && message.type == EMPLOYEE_WAIT_PENDING)
      {                  
        console.log('employee wait pending');
        this.display = true;                
      }
      
      if (message && message.type == EMPLOYEE_WAIT_OK)
      {                  
        this.display = false;                
      }
    });                
  }
  

}
