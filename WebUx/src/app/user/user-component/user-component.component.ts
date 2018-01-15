import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, USER_GET, USER_GET_OK, USER_SAVE } from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { UserModel } from "../../model/UserModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
  encapsulation : ViewEncapsulation.None
})

export class UserComponentComponent implements OnInit {
 
  private person: UserModel = new UserModel();

  private personForm: FormGroup;

  formErrors = {
    'name': '',
    'username': ''
  };

  validationMessages = {   

    'name': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 4 characters long.',
      'maxlength': 'First Name cannot be more than 24 characters long.'
    },
    'username': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 4 characters long.',
      'maxlength': 'Last Name cannot be more than 24 characters long.'
    }
  };

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'username' }   
  ];

  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 

  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder, private http:HttpClient) { 
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

     var saveJson = {
      Name : this.person.name,
      Username : this.person.username
    };

    var strJson = JSON.stringify(saveJson);           
    this.dispatchIntent(USER_SAVE, saveJson);
    this.personForm.reset();
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

    if (!this.personForm) { return; }

    const form = this.personForm;
    this.person.name = data.name;
    this.person.username = data.username;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }   
  }

  onSubmit() {
    
    console.log(this.person.name);
    console.log(this.person.username);
  }

  dispatchIntent(messageType : string, data? : any)
  {   
    this.store.dispatch(
      {     
        type: messageType,
        data : data
      });      
  }
}
