import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';

import * as timeUtil from "../../sharedObjects/timeUtil";

import {
  CityAppState,
  ADD,
  UPDATE,
  USER_GET,
  USER_GET_OK,
  USER_SAVE,
  USER_SAVE_SUCCESS,
  PROGRESS_WAIT_SHOW,
  PROGRESS_WAIT_HIDE
} from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import {FormUtil} from "../../sharedObjects/formUtil";
import { UserModel } from "../../model/UserModel";
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import {APPLICATION_HOST, TIME_DELAY } from '../../sharedObjects/applicationSetup';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({selector: 'app-user-component',
 templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'], 
  encapsulation: ViewEncapsulation.None})

export class UserComponentComponent implements OnInit {

  private person : UserModel = new UserModel();
  private intention : number = UPDATE;

  formUtil : FormUtil<UserModel>;
  personForm : FormGroup;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 24 characters long.'
    }
  };

  rows = [];

  columns = [
    {
      prop: 'username',
      'Name': 'Name'
    }, {
      prop: 'password',
      'Name': 'Password'
    }
  ];

  userSubscription : Subscription;

  dataList : Array < any > = new Array <any> ();
  display : boolean = false;
  itemSelected : boolean = false;

  constructor(private store : Store <CityAppState>, private fb : FormBuilder, private http : HttpClient) {}

  ngOnInit() {

    this.userSubscription = this
    .store
    .subscribe(appData => {      
      this.componentMessageHandle(messageUtil.getMultiMessage(appData, [USER_GET_OK, USER_SAVE_SUCCESS]));
     });
    
    this.configureUpdateForm();
  }

  ngAfterViewInit() {

    this.dispatchIntent(USER_GET);
  }

  save() {
          
    debugger;

    let data = this.formUtil.commit();
        
    if (data)
    {
      if (this.intention == ADD)
      {
        // create new row or refresh data 
        data.userId = null;
      }
      else 
      { 
        data.userId = this.person.userId;
      }
      this.person.username = data.username;
      this.person.password = data.password;
      this.person.userTypeId = data.userTypeId;
      
      this.rows = [...this.rows];
     
      this.dispatchIntent(USER_SAVE, data);
    }   
  }
    
  componentMessageHandle(messageAll : Array <any>) {
    
    messageAll.map(async message => {

      if (message && message.type == USER_GET_OK) {

        this.dataList.length = 0;
        this.rows.length = 0;

        for (var userInfo of message.data.data.data) {
          
          let model = new UserModel();
          model = { ...userInfo};
          this.dataList.push(model);

        }
        this.rows = this.dataList;
      }

      if (message && message.type == USER_SAVE_SUCCESS) {
        this.display = false;        
        await timeUtil.delay(TIME_DELAY);
        this.getUserList();   
      }
    });

  }

  private configureAddForm() {
    
    this.person = new UserModel();
    this.person.userId = "0";
    this.person.username = '';
    this.person.password = '';

    this.formUtil = new FormUtil<UserModel>(this.person, this.formValidators);
    let userform = this.formUtil.createForm(false);
    this.personForm = userform;

    this.personForm.valueChanges.debounceTime(200)
    .subscribe(data => this.onValueChanged(data));
  }

  private configureUpdateForm() {
    this.personForm = this
      .fb
      .group({
        'username': [
          this.person.username,
          [
            Validators.required, Validators.minLength(1),
            Validators.maxLength(24)
          ]
        ],
        'password': [
          this.person.password,
          [
            Validators.required, Validators.minLength(1),
            Validators.maxLength(24)
          ]
        ],
      });

    this
      .personForm
      .valueChanges
      .debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: UserModel) {

    if (!this.personForm) {
      return;
    }    
    const form = this.personForm;  
    
    for (const field in this.formErrors) {    
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

  formValidators = {
    'userId' : [],
    'username' : [Validators.required, Validators.minLength(1),
      Validators.maxLength(24)],
      'password' : [Validators.required, Validators.minLength(1),
        Validators.maxLength(24)]
      }  
      
      onSelect(evt : any) {    
        
        debugger;
        
        if (evt && evt.selected && evt.selected.length > 0) {
          this.person = evt.selected[0] as UserModel;          
          this.itemSelected = true;

          this.formUtil = new FormUtil<UserModel>(this.person, this.formValidators);
          let userform = this.formUtil.createForm(false);
          this.personForm = userform;
          this.intention = UPDATE;

          this.personForm.valueChanges.debounceTime(200)
          .subscribe(data => this.onValueChanged(data));          
          this.display = true;         
        }
      }
      
      edit() {
        
        this.intention = UPDATE;
        this.configureUpdateForm();
        
        if (this.person) {
          this
          .personForm
          .get("username")
          .setValue(this.person.username);
          this
          .personForm
          .get("password")
          .setValue(this.person.password);
          this.display = true;
        }
      }
      
      cancel()
      {
        debugger;
        this.display = false;
        this.itemSelected = false;
        this.person = this.formUtil.rollback();
      }
      
      addForm() {
        
        this.intention = ADD;
        this.configureAddForm();
        this.display = true;
      }
      
      dispatchIntent(messageType : string, data?: any)
      {
        this
        .store
        .dispatch({type: messageType, data: data});
      }

      getUserList()
      {
        this.dispatchIntent(USER_GET);
      }
    }
  

 
