import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, USER_GET, USER_GET_OK, USER_SAVE } from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { SupplierModel } from "../../model/SupplierModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier-component',
  templateUrl: './supplier-component.component.html',
  styleUrls: ['./supplier-component.component.css']
})
export class SupplierComponentComponent implements OnInit {
  
  private person: SupplierModel = new SupplierModel();
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
    private fb: FormBuilder) { }
    
    ngOnInit() {
      this.userSubscription = this.store.subscribe(appData => {           
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, USER_GET_OK), USER_GET_OK));
      }); 
      
      this.initForm();
      
    }
    
    ngAfterViewInit() {
      this.dispatchIntent(USER_GET);
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
        'name': [this.person.supplierId, [Validators.required, Validators.minLength(1),
          Validators.maxLength(24)]],
          'username': [this.person.supplierName, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        onValueChanged(data?: SupplierModel) {
          
          if (!this.personForm) { return; }
          
          const form = this.personForm;
          this.person.supplierId = data.supplierId;
          this.person.supplierName = data.supplierName;
          
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
        
        dispatchIntent(messageType : string, data? : any)
        {   
          this.store.dispatch(
            {     
              type: messageType,
              data : data
            });      
          }
        }