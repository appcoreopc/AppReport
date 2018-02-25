import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {FormUtil} from "../../sharedObjects/formUtil";

import { CityAppState, READYSTOCK_GET, 
  READYSTOCK_GET_OK, READYSTOCK_SAVE, 
  READYSTOCK_SAVE_SUCCESS, READYSTOCK_SAVE_ERR,
  UOM_CANCEL, UOM_CANCEL_OK, UOM_GET, UOM_GET_ERR, UOM_GET_OK, ADD, UPDATE
} from '../../sharedObjects/sharedMessages';

import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { ReadyStockModel } from "../../model/ReadyStockModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-readystock-component',
  templateUrl: './readystock-component.component.html',
  styleUrls: ['./readystock-component.component.css']
})
export class ReadyStockComponent implements OnInit {
  
  person: ReadyStockModel = new ReadyStockModel();
  personForm: FormGroup;
  private intention : number = UPDATE;
  formUtil : FormUtil<ReadyStockModel>;
 
  formValidators = {   
    'readyStockId': [],
    'readyStockDesc': [Validators.required, Validators.minLength(1)],
    'tariffCode': [Validators.required, Validators.minLength(1)],
    'dutyImpRate': [Validators.required, Validators.minLength(1)],
    'gstrate': [Validators.required, Validators.minLength(1)]
    }
    
    formErrors = {
      'readyStockId': '',
      'readyStockDesc' : '',
      'tariffCode' : '',
      'dutyImpRate' : '',
      'gstrate' : ''
    };
    
    validationMessages = {     
      'readyStockDesc': {
        'required': 'Stock Name is required.' 
      },
      'tariffCode': {
        'required': 'Tariff Code is required.' 
      },
      'dutyImpRate': {
        'required': 'Duty Import Rate is required.' 
      },
      'gstrate': {
        'required': 'Gst Rate is required.' 
      }
    };
    
    rows = [];
    
    columns = [
      { prop: 'readyStockId', name : 'readyStockId' },
      { prop: 'readyStockDesc', name : 'readyStockDesc' },
      { prop: 'tariffCode', name : 'tariffCode' }, 
      { prop: 'dutyImpRate', name : 'dutyImpRate' },
      { prop: 'gstrate', name : 'gstrate' }   
    ];
    
    userSubscription : Subscription;
    dataList : Array<any> = new Array<any>(); 
    
    display: boolean = false;
    itemSelected : boolean = false;
    formTitle: string = "New Ready Stock"; 
    
    private rsModel: ReadyStockModel = new ReadyStockModel();
    
    constructor(private store : Store<CityAppState>, 
      private fb: FormBuilder) { }
      
      ngOnInit() {
        this.userSubscription = this.store.subscribe(appData => {     
          
          this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
            [ READYSTOCK_GET_OK, READYSTOCK_SAVE_SUCCESS]));    
          }); 
          
          this.configureUpdateForm();      
        }
        
        ngAfterViewInit() {
          this.dispatchIntent(READYSTOCK_GET);
        }
        
        componentMessageHandle(messageAll : Array<any>) {
                  
          messageAll.map(message => { 
            
            if (message && message.type == READYSTOCK_GET_OK)
            {
              this.rows.length = 0;
              for (var rs of message.data.data.data)
              {             
                this.dataList.push({                   
                  readyStockId : rs.readyStockId, 
                  readyStockDesc : rs.readyStockDesc,
                  tariffCode : rs.tariffCode,
                  dutyImpRate : rs.dutyImpRate,
                  gstrate : rs.gstrate 
                });  

              this.rows = this.dataList;
            }
          }
            
            if (message && message.type == READYSTOCK_SAVE_SUCCESS)
            {
              this.display = false;             
            }
          });    
        }
        
        save() {    
          
           
          let mainFormModel = this.personForm.value as ReadyStockModel;
          
          if (this.intention == ADD)
          {
            mainFormModel.readyStockId = null;
          }
           console.log("mainFormModel",mainFormModel);
          
          this.rows = [...this.rows];

          this.dispatchIntent(READYSTOCK_SAVE, mainFormModel);
          this.display = false; 
        }  
        
        private configureAddForm() {
          this.personForm = this.fb.group({
              'readyStockId': [''],
              'readyStockDesc': ['', [Validators.required, Validators.minLength(1)]],
              'tariffCode': ['', [Validators.required, Validators.minLength(1)]],
              'dutyImpRate': ['', [Validators.required, Validators.minLength(1)]],
              'gstrate': ['', [Validators.required, Validators.minLength(1)]]
              });
              
              this.personForm.valueChanges.debounceTime(500)
              .subscribe(data => this.onValueChanged(data));
            }
            
            private configureUpdateForm() {
              this.personForm = this.fb.group({
                'readyStockId': [this.rsModel.readyStockId],
                  'readyStockDesc': [this.rsModel.readyStockDesc, [Validators.required, Validators.minLength(1)]],
                  'tariffCode': [this.rsModel.tariffCode, [Validators.required, Validators.minLength(1)]],
                  'dutyImpRate': [this.rsModel.dutyImpRate, [Validators.required, Validators.minLength(1)]],
                  'gstrate': [this.rsModel.gstrate, [Validators.required, Validators.minLength(1)]]
                  });
                  
                  this.personForm.valueChanges.debounceTime(500)
                  .subscribe(data => this.onValueChanged(data));
                }
                
                onValueChanged(data?: ReadyStockModel) {
                  
                  if (!this.personForm) { return; }
                  
                  const form = this.personForm;
                  //this.rsModel.rmcatId = data.rmcatId;
                  //this.rsModel.rmcatName = data.rmcatName;
                  
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
                    
                    this.formTitle = "New Ready Stock"; 
                    this.display = true;                          
                    this.intention = ADD;
                    this.configureAddForm();  
                  }            
                  
                  onSelect(evt : any) {
          
                    debugger;

                    if (evt && evt.selected && evt.selected.length > 0)
                    {

                      this.rsModel = evt.selected[0] as ReadyStockModel; 
                      this.itemSelected = true;   
                      
                      this.formUtil = new FormUtil<ReadyStockModel>(this.rsModel, 
                        this.formValidators);

                      let form = this.formUtil.createForm(false);
                      this.personForm = form;

                  this.personForm.valueChanges.debounceTime(300)
                  .subscribe(data => this.onValueChanged(data));
                                  
                    } 
                    else 
                      this.itemSelected = false;
                      
                    this.edit();
                  }          
                  
                  edit() {  
                    this.formTitle = "Edit Ready Stock"; 
                    this.intention = UPDATE;                            
                    // this.configureUpdateForm();
                    this.display = true;
                           
                  }
                  
                  cancel() 
                  {                               
                    this.person = this.formUtil.rollback();
                    this.itemSelected = false;
                    this.display = false;       
                  }
                }