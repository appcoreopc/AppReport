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
    'supplierName': '',
    'createdByUserId' : ''
  };
  
  validationMessages = {    
    'supplierName': {
      'required': 'Supplier Name is required.',
      'minlength': 'Supplier Name must be at least 4 characters long.',
      'maxlength': 'Supplier Name cannot be more than 24 characters long.'
    },
    'createdByUserId': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 4 characters long.',
      'maxlength': 'Last Name cannot be more than 24 characters long.'
    }
  };
  
  rows = [];
  
  columns = [
    { prop: 'supplierId' },
    { name: 'supplierName' }   
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  
  display: boolean = false;
  itemSelected : boolean = false;
  
  private supplierModel: SupplierModel = new SupplierModel();
  
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
          var supplierInfo = message.data[idx];    
          this.dataList.push({ 
            
            supplierId : supplierInfo.supplierId, 
            supplierName : supplierInfo.supplierName, 
            createdByUserId : supplierInfo.createdByUserId,
            editedByUserId : supplierInfo.editedByUserId, 
            editedDt  : supplierInfo.editedDt 
          });        
        }
        this.rows = this.dataList;
      }    
    }
    
    save() {    
      
      var saveJson = {
        supplierName : this.supplier.supplierName,
        createdDT : this.supplier.createdDT,
        editedByUserId : this.supplier.editedByUserId,
        editedDT : this.supplier.editedDT,
        id : this.supplier.supplierId
      };
      console.log(saveJson);
      var strJson = JSON.stringify(saveJson);           
      this.dispatchIntent(SUPPLIER_SAVE, saveJson);
      this.personForm.reset();
    }  
    
    private initForm() {
      this.personForm = this.fb.group({
        'supplierName': [this.supplier.supplierName, [Validators.required, Validators.minLength(1),
          Validators.maxLength(24)]],
          'supplierId': [this.supplier.supplierName, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        onValueChanged(data?: SupplierModel) {
          
          if (!this.personForm) { return; }
          
          const form = this.personForm;
          this.supplier.supplierId = data.supplierId;
          this.supplier.supplierName = data.supplierName;
          
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
          
          addForm() {              
            this.display = true;
            this.resetForm();
          }            
          
          onSelect(evt : any) {
            
            if (evt && evt.selected && evt.selected.length > 0)
            {
              this.supplierModel = evt.selected[0] as SupplierModel; 
              this.itemSelected = true;   
            }
          }
          
          showDialog() {              
            this.display = true;
          }   
          
          edit() {  
            if (this.supplierModel)
            {
              this.personForm.get("supplierId").setValue(this.supplierModel.supplierId);
              this.personForm.get("supplierName").setValue(this.supplierModel.supplierName);         
              this.display = true;
            }       
          }
          
          resetForm() {                      
            let emptySpace = "";
            this.personForm.get("supplierId").setValue(emptySpace);
            this.personForm.get("supplierName").setValue(emptySpace);
          }
          
          cancel() 
          {
            this.display = false;
            this.itemSelected = false;
          }
        }