import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import * as timeUtil from "../../sharedObjects/timeUtil";

import {
  CityAppState,
  ADD,
  UPDATE, DELETE_ITEM_DELIMITER,
  USER_GET, DELETE_USER_PROMPT,
  USER_GET_OK, USER_DELETE, USER_DELETE_SUCCESS, USER_DELETE_ERR,
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
  
  private targetItem : UserModel = new UserModel();
  private intention : number = UPDATE;
  selected : any;
  isTargetCheckbox : boolean = false;
  isLoading : boolean = false;
  
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
      this.componentMessageHandle(messageUtil.getMultiMessage(appData, [USER_GET_OK, USER_DELETE_SUCCESS, USER_SAVE_SUCCESS]));
    });
    
    this.configureUpdateForm();
  }
  
  ngAfterViewInit() {    
    this.dispatchIntent(USER_GET);
  }
  
  save() {   
    
    this.isLoading = false;
    
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
        data.userId = this.targetItem.userId;
      }
      this.targetItem.username = data.username;
      this.targetItem.password = data.password;
      this.targetItem.userTypeId = data.userTypeId;
      
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
        this.rows = [...this.dataList];
      }
      
      if (message && (message.type == USER_SAVE_SUCCESS || message.type == USER_DELETE_SUCCESS)) {
        
        if (this.isLoading == false)
        {
          this.isLoading = true;
          this.display = false;        
          await timeUtil.delay(TIME_DELAY);
          this.getUserList();  
        } 
      }
    });
    
  }
  
  private configureAddForm() {
    
    this.targetItem = new UserModel();
    this.targetItem.userId = "0";
    this.targetItem.username = '';
    this.targetItem.password = '';
    
    this.formUtil = new FormUtil<UserModel>(this.targetItem, this.formValidators);
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
        this.targetItem.username,
        [
          Validators.required, Validators.minLength(1),
          Validators.maxLength(24)
        ]
      ],
      'password': [
        this.targetItem.password,
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
      
      editForm(evt : any) {    
        
        if (evt && evt.row && evt.row.userId) {
          
          let userId = evt.row.userId;
          if (userId) 
          {
            this.targetItem = this.rows.find(x => x.userId == userId);     
            
            if (this.targetItem)
            {
              // this.person = evt.selected[0] as UserModel;          
              this.itemSelected = true;
              
              this.formUtil = new FormUtil<UserModel>(this.targetItem, this.formValidators);
              let userform = this.formUtil.createForm(false);
              this.personForm = userform;
              this.intention = UPDATE;
              
              this.personForm.valueChanges.debounceTime(200)
              .subscribe(data => this.onValueChanged(data));          
              this.display = true;     
            }    
          }
        }
      }
      
      edit() {
        
        this.intention = UPDATE;
        this.configureUpdateForm();
        
        if (this.targetItem) {
          this
          .personForm
          .get("username")
          .setValue(this.targetItem.username);
          this
          .personForm
          .get("password")
          .setValue(this.targetItem.password);
          this.display = true;
        }
        
      }
      
      onActivate(evt) {      
        
        if (evt.type && evt.type == 'checkbox')
        {        
          this.isTargetCheckbox = true;
        }
        else if (evt && evt.type && evt.type == 'click')
        {
          if (this.isTargetCheckbox != true)
          {
            this.editForm(evt);
          }
          this.isTargetCheckbox = false;
        }
      }
      
      onSelect(evt: any) {  
        
        this.selected = evt.selected;      
      }
      
      cancel()
      {
        this.display = false;
        this.itemSelected = false;
        this.targetItem = this.formUtil.rollback();
      }
      
      deleteForm() {
        
        if (confirm(DELETE_USER_PROMPT))
        {        
        if (this.selected && this.selected.length > 0)
        {       
          let deleItems = this.selected.map( x  => x.userId);
          if (deleItems)
          {
            this.isLoading = false;
            this.dispatchIntent(USER_DELETE, { 'deleteItems' : deleItems.join(DELETE_ITEM_DELIMITER)});
          }
        }
      }
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
    
    
    
    