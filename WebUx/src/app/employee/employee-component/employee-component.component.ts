import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, EMPLOYEE_SAVE, EMPLOYEE_GET_OK, EMPLOYEE_GET } from '../../sharedObjects/sharedMessages';
import { EmployeeModel } from "../../model/EmployeeModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";


@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})

export class EmployeeComponentComponent implements OnInit {

  private person: EmployeeModel = new EmployeeModel();
  private personForm: FormGroup;

  dataList : Array<any> = new Array<any>(); 

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

  userSubscription : Subscription;
  
  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'username' }   
  ];


  constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }

  name : string; 
  description : string; 

  ngOnInit() {

    this.userSubscription = this.store.subscribe(appData => {           
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, EMPLOYEE_GET_OK), EMPLOYEE_GET_OK));
    }); 

    this.initForm();

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

    onValueChanged(data?: EmployeeModel) {

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

    componentMessageHandle(message : any) {

      if (message && message.type == EMPLOYEE_GET_OK)
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
  
  
}
