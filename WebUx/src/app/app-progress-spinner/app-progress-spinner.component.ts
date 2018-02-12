import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, PROGRESS_WAIT_HIDE,  PROGRESS_WAIT_SHOW } from '../sharedObjects/sharedMessages';
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
        [ PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE]));
      }); 
  }

  componentMessageHandle(messageAll : Array<any>) {
          
    messageAll.map(message => {  
      
      if (message && message.type == PROGRESS_WAIT_SHOW)
      {                  
        console.log('employee wait pending');
        this.display = true;                
      }
      
      if (message && message.type == PROGRESS_WAIT_HIDE)
      {                  
        this.display = false;                
      }
    });                
  }
  

}
