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
    { prop: 'username', 'Name': 'Name' },
    { prop: 'password', 'Name': 'Password' }   
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  
  private display: boolean = false;
  private itemSelected : boolean = false; 
  
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
      
      var saveJson = new UserModel();
      saveJson.userId = this.person.userId;
      saveJson.username = this.person.username;
      saveJson.password = this.person.password;
      saveJson.userTypeId = this.person.userTypeId;
      
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
            username : userInfo.username,
            password : userInfo.password
            
          });              
        }
        
        this.rows = this.dataList;
      }    
    }
    
    private initForm() {
      this.personForm = this.fb.group({
        'username': [this.person.username, [Validators.required, Validators.minLength(1),
          Validators.maxLength(24)]],
          'password': [this.person.password, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        onValueChanged(data?: UserModel) {
          
          if (!this.personForm) { return; }
          
          const form = this.personForm;
          this.person.userId = data.userId;
          this.person.username = data.username;
          this.person.password = data.password;   
          
          
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
                
        onSelect(evt : any) {
          
          if (evt && evt.selected && evt.selected.length > 0)
          {
            this.person = evt.selected[0] as UserModel; 
            this.itemSelected = true;   
            console.log(this.person);
          }
        }
        
        showDialog() {              
          this.display = true;
        }   
        
        edit() {  
          
          if (this.person)
          {            
            this.personForm.get("username").setValue(this.person.username);
            this.personForm.get("password").setValue(this.person.password);            
            this.display = true;
          }       
        }
        
        resetForm() {
          
          let emptySpace = "";
          this.personForm.get("password").setValue(emptySpace);
          this.personForm.get("username").setValue(emptySpace);      
        }
        
        cancel() 
        {
          this.display = false;
          this.itemSelected = false;
        }
        
        addForm() {              
          this.display = true;
          this.resetForm();
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
        