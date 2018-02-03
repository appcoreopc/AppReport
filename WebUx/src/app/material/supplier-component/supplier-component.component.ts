import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, SUPPLIER_GET,
  ADD, UPDATE, SUPPLIER_GET_OK, SUPPLIER_SAVE, SUPPLIER_SAVE_SUCCESS } 
  from '../../sharedObjects/sharedMessages';
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
    private intention : number = UPDATE;
    
    formErrors = {
      'supplierId': '',
      'supplierName' : ''
    };
    
    validationMessages = {     
      'supplierName': {
        'required': 'Supplier Name is required.' 
      }
    };
    
    rows = [];
    
    columns = [
      { prop: 'supplierId' },
      { name: 'supplierName' } ,
      { name: 'isLocal' }   
    ];
    
    userSubscription : Subscription;
    dataList : Array<any> = new Array<any>(); 
    
    display: boolean = false;
    itemSelected : boolean = false;
    formTitle: string = "New Supplier"; 
    
    private supplierModel: SupplierModel = new SupplierModel();
    
    constructor(private store : Store<CityAppState>, 
      private fb: FormBuilder) { }
      
      ngOnInit() {
        this.userSubscription = this.store.subscribe(appData => {     
          
          this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
            [ SUPPLIER_GET_OK, SUPPLIER_SAVE_SUCCESS]));    
          }); 
          
          this.configureUpdateForm();      
        }
        
        ngAfterViewInit() {
          this.dispatchIntent(SUPPLIER_GET);
        }
        
        componentMessageHandle(messageAll : Array<any>) {
                  
          messageAll.map(message => { 
            
            if (message && message.type == SUPPLIER_GET_OK)
            {
              this.rows.length = 0;
              for (var supplierInfo of message.data.data.data)
              {                
                this.dataList.push({                   
                  supplierId : supplierInfo.supplierId, 
                  supplierName : supplierInfo.supplierName, 
                  createdByUserId : supplierInfo.createdByUserId,
                  editedByUserId : supplierInfo.editedByUserId, 
                  editedDt  : supplierInfo.editedDt 
                });  

              this.rows = this.dataList;
            }
          }
            
            if (message && message.type == SUPPLIER_SAVE_SUCCESS)
            {
              this.display = false;             
            }
          });    
        }
        
        save() {    
          
          var saveJson = new SupplierModel();
          if (this.intention == ADD)
          {
            saveJson = this.personForm.value as SupplierModel;
          }
          else {
            
            saveJson.supplierName = this.supplier.supplierName;
            saveJson.createdDT = this.supplier.createdDT;
            saveJson.editedByUserId = this.supplier.editedByUserId;
            saveJson.editedDT = this.supplier.editedDT;
            saveJson.supplierId = this.supplier.supplierId;        
          }
          
          var strJson = JSON.stringify(saveJson);           
          this.dispatchIntent(SUPPLIER_SAVE, saveJson);
          this.display = false; 
          
        }  
        
        private configureAddForm() {
          this.personForm = this.fb.group({
            'supplierId': ['', [Validators.minLength(1)]],
              'supplierName': ['', [Validators.required, Validators.minLength(1)]]
              });
              
              this.personForm.valueChanges.debounceTime(500)
              .subscribe(data => this.onValueChanged(data));
            }
            
            private configureUpdateForm() {
              this.personForm = this.fb.group({
                'supplierId': [this.supplier.supplierId, [Validators.minLength(1)]],
                  'supplierName': [this.supplier.supplierName, [Validators.required, Validators.minLength(1)]]
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
                    
                    this.formTitle = "New Supplier"; 
                    this.display = true;                          
                    this.intention = ADD;
                    this.configureAddForm();  
                  }            
                  
                  onSelect(evt : any) {
                    
                    if (evt && evt.selected && evt.selected.length > 0)
                    {
                      this.supplierModel = evt.selected[0] as SupplierModel; 
                      this.itemSelected = true;   
                    } 
                    else 
                      this.itemSelected = false;
                      
                    this.edit();
                  }          
                  
                  edit() {  
                    this.formTitle = "Edit Supplier"; 
                    this.intention = UPDATE;                            
                    this.configureUpdateForm();
                    
                    if (this.supplierModel)
                    {
                      this.personForm.get("supplierId").setValue(this.supplierModel.supplierId);
                      this.personForm.get("supplierName").setValue(this.supplierModel.supplierName);         
                      this.display = true;
                    }       
                  }
                  
                  cancel() 
                  {
                    this.display = false;
                    this.itemSelected = false;
                  }
                }