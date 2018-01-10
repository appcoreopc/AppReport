import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, SUPPLIER_GET, SUPPLIER_GET_OK, SUPPLIER_SAVE } from '../../sharedObjects/sharedMessages';
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
  
  private supplier: SupplierModel = new SupplierModel();
  private personForm: FormGroup;
  
  formErrors = {
    'name': '',
    'createdByUserId': ''
  };
  
  validationMessages = {    
    'name': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 4 characters long.',
      'maxlength': 'First Name cannot be more than 24 characters long.'
    },
    'createdByUserId': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 4 characters long.',
      'maxlength': 'Last Name cannot be more than 24 characters long.'
    }
  };
  
  rows = [];
  
  columns = [
    { prop: 'id' },
    { name: 'name' }   
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  
  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { }
    
    ngOnInit() {
      this.userSubscription = this.store.subscribe(appData => {           
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SUPPLIER_GET_OK), SUPPLIER_GET_OK));
      }); 
      
      this.initForm();      
    }
        
    ngAfterViewInit() {
      this.dispatchIntent(SUPPLIER_GET);
    }
        
    componentMessageHandle(message : any) {
      
      if (message && message.type == SUPPLIER_GET_OK)
      {
        this.rows.length = 0;
        for (var idx in message.data)
        {
          var userInfo = message.data[idx];    
          this.dataList.push({ 

            id : userInfo.supplierId, 
            name : userInfo.supplierName, 
            username : userInfo.username
          });
          
          console.log(this.rows);
          this.rows = this.dataList;
        }
      }    
    }
    
    private initForm() {
      this.personForm = this.fb.group({
        'name': [this.supplier.supplierName, [Validators.required, Validators.minLength(1),
          Validators.maxLength(24)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        onValueChanged(data?: SupplierModel) {
          
          if (!this.personForm) { return; }
          
          const form = this.personForm;
          this.supplier.id = data.supplierName;
                    
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

          onSelected(event) {
            console.log(event);
          }

        }