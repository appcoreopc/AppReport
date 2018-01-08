import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, USER_GET, USER_GET_OK, USER_SAVE } from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { UserModel } from "../../model/UserModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
  encapsulation : ViewEncapsulation.None
})

export class UserComponentComponent implements OnInit {
 
  private person: UserModel = new UserModel();

  private personForm: FormGroup;

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'username' }   
  ];

  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 

  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { 
  }

  ngOnInit() {   
    this.userSubscription = this.store.subscribe(appData => {           
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, USER_GET_OK), USER_GET_OK));
    }); 

    this.initForm();
  }

  ngAfterViewInit() {
     this.dispatchIntent(USER_GET);
  }
   
  save() {    
    //this.dispatchIntent(USER_SAVE);
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

  private initForm() {
    this.personForm = this.fb.group({
      'name': [this.person.name, [Validators.required, Validators.minLength(1),
      Validators.maxLength(24)]],
      'username': [this.person.username, [Validators.required, Validators.minLength(1),
      Validators.maxLength(24)]]
    });

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: UserModel) {
  }


  dispatchIntent(messageType : string, data? : any)
  {   
    this.store.dispatch(
      {     
        type: messageType 
      });      
  }
}
