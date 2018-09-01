import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, READYSTOCK_SAVE, READYSTOCK_GET_OK, DELETE_READYSTOCK_PROMPT,
  READYSTOCK_DELETE, DELETE_ITEM_DELIMITER, READYSTOCK_DELETE_SUCCESS, 
  ADD, UPDATE, READYSTOCK_GET, READYSTOCK_SAVE_SUCCESS, UOM_GET, UOM_GET_OK  } from '../../sharedObjects/sharedMessages';
  import { ReadyStockModel } from "../../model/ReadyStockModel";
  import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs/Subscription'
  import * as messageUtil from "../../sharedObjects/storeMessageUtil";
  import {DialogModule} from 'primeng/dialog';
  import {MultiSelectModule} from 'primeng/multiselect';
  import {FormUtil} from "../../sharedObjects/formUtil";
  import * as timeUtil from '../../sharedObjects/timeUtil';
  import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
  
 

  @Component({ 
    selector: 'app-readystock-component',
    templateUrl: './readystock-component.component.html',
    styleUrls: ['./readystock-component.component.css']
  })
  export class ReadyStockComponent implements OnInit {
    
    async getReadyStockComponentData() {    
      console.log('sync data loading');
      // Tryin to sync loading of data // 
      this.dispatchIntent(READYSTOCK_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(UOM_GET); 
      
    }
    private currentModel: ReadyStockModel = new ReadyStockModel(); 
    personForm: FormGroup;
    private intention : number = UPDATE;    
    display: boolean = false;
    
    isTargetCheckbox : boolean = false;
    selected : any;
    
    formTitle: string = "New FG Category"; 
    dataList : Array<any> = new Array<any>(); 
    uomDataList : Array<any> = new Array<any>();    
    formUtil : FormUtil<ReadyStockModel>;
     
    formValidators = {   
      'readyStockId': [],
      'readyStockDesc': [Validators.required, Validators.minLength(1)],
      'tariffCode': [Validators.required, Validators.minLength(1)],
      'dutyImpRate': [Validators.required],
      'gstrate': [Validators.required],
      'uomid':[Validators.required, Validators.minLength(1), Validators.min(1)]
    }; 
      
    formErrors = {
      'readyStockId': '',
      'readyStockDesc' : '',
      'tariffCode' : '',
      'dutyImpRate' : '',
      'gstrate' : '',
      'uomid': ''
    };
    
    itemSelected : boolean = false;
    
    validationMessages = {     
      'readyStockDesc': {
        'required': 'Product Type is required.' 
      },
      'tariffCode': {
        'required': 'Tariff Code is required.' 
      },
      'dutyImpRate': {
        'required': 'Duty Import Rate is required.' 
      },
      'gstrate': {
        'required': 'Gst Rate is required.' 
      }, 
      'uomid': {
        'required': 'UOM is required.' 
      }
    };
 
    userSubscription : Subscription;
    
    rows = []; 
    uomRows = [];
    
    columns = [
      { prop: 'readyStockId', name : 'readyStockId' },
      { prop: 'readyStockDesc', name : 'readyStockDesc' },
      { prop: 'tariffCode', name : 'tariffCode' }, 
      { prop: 'dutyImpRate', name : 'dutyImpRate' },
      { prop: 'gstrate', name : 'gstrate' },   
      { prop: 'uomid', name : 'Uomid' }
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    name : string; 
    description : string; 
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => { 
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData,           
          [ READYSTOCK_GET_OK, READYSTOCK_DELETE_SUCCESS,  READYSTOCK_SAVE_SUCCESS,
            UOM_GET_OK]));
        }); 
        
        this.setFormValidation('');
      }
      
      ngAfterViewInit() {       
        
        this.getReadyStockComponentData();
      }
      
      save()
      {     
        
        let data = this.formUtil.commit();        
        if (this.intention == ADD)
        {
          data.readyStockId = null;
        }
        else {                   
          data.readyStockId = this.currentModel.readyStockId;         
        }
         
        this.currentModel.readyStockDesc = data.readyStockDesc;
        this.currentModel.tariffCode = data.tariffCode; 
        this.currentModel.dutyImpRate = data.dutyImpRate;
        this.currentModel.gstrate = data.gstrate;
        this.currentModel.uomid = data.uomid;
 
        this.rows = [...this.rows];
        
        this.dispatchIntent(READYSTOCK_SAVE, data);       
        
        this.display = false; 
      } 
      
 
      private setFormValidation(id :any) {
        
        this.personForm = this.fb.group({  
          'readyStockId': [id], 
          'readyStockDesc': ['', [Validators.required, Validators.minLength(1)]], 
          'tariffCode': ['', [Validators.required, Validators.minLength(1)]],
          'dutyImpRate': ['', [Validators.required, Validators.minLength(1)]], 
          'gstrate': ['', [Validators.required, Validators.minLength(1)]], 
          'uomid': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]]
        });                 
      }      
       
      
      private ResetForm() {
         
      }
      
      private configureAddForm()
      {
        this.ResetForm();
        
        this.currentModel = new ReadyStockModel();

        this.currentModel.readyStockId = null; 
        this.currentModel.readyStockDesc = '';
        this.currentModel.tariffCode = ''; 
        this.currentModel.dutyImpRate = 0;
        this.currentModel.gstrate = 0;
        this.currentModel.uomid = 0;
 
        
        this.formUtil = new FormUtil<ReadyStockModel>(this.currentModel, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.personForm = userform;        
        this.personForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));     
      }
      
      private configureEditForm() {           
        this.ResetForm();    
      }
      
      onValueChanged(data?: ReadyStockModel) {
        
        if (!this.personForm) { return; }              
        
        const form = this.personForm;
        
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
      
      componentMessageHandle(messageAll : Array<any>) {
        
        messageAll.map(async message => {  
          
          if (message && message.type == READYSTOCK_GET_OK)
          {            
            this.rows.length = 0;
            this.dataList.length = 0;
            
            for (var userInfo of message.data.data.data)
            {               
              let model  = new ReadyStockModel();
              model = {...userInfo};
              this.dataList.push(model);
            }        
            
            this.rows = [...this.dataList];
          }    
          
          if (message && (message.type == READYSTOCK_SAVE_SUCCESS
            || message.type == READYSTOCK_DELETE_SUCCESS))
            {                  
              this.display = false; 
              await timeUtil.delay(TIME_DELAY);
              this.getReadyStockList();
            }    
           
            if (message && message.type == UOM_GET_OK)
            { 
              this.uomRows.length = 0;
              for (var d of message.data.data.data)
              {    
                if(d.uomTypeId != 2) continue;
                this.uomDataList.push({   
                  uomId : d.uomId,
                  uomCode : d.uomCode 
                });
              }
              
              this.uomRows = this.uomDataList;
              console.log("UOM_GET_OK",this.uomRows);
            } 
             
          });                
        }
        
        editForm(evt : any) {
          
          if (evt && evt.row && evt.row.readyStockId) {
            
            let targetDataId = evt.row.readyStockId;
            
            if (targetDataId) 
            {
              this.currentModel = this.rows.find(x => x.readyStockId == targetDataId);     
              
              if (this.currentModel)
              {
                this.itemSelected = true;   
                
                this.formUtil = new FormUtil<ReadyStockModel>(this.currentModel, this.formValidators);
                let userform = this.formUtil.createForm(false);
                this.personForm = userform;
                
                this.personForm.valueChanges.debounceTime(300)
                .subscribe(data => this.onValueChanged(data));
                
              }
              else 
              this.itemSelected = false;
              
              this.edit();         
              this.display = true; 
            }
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
        
        deleteForm() 
        {
          
          if (confirm(DELETE_READYSTOCK_PROMPT)) {
            
            if (this.selected && this.selected.length > 0)
            {       
              let deleItems = this.selected.map( x  => x.readyStockId);
              if (deleItems)
              {
                this.dispatchIntent(READYSTOCK_DELETE, { 'deleteItems' : deleItems.join(DELETE_ITEM_DELIMITER)});
              }
            }
          }
        }
        
        onSelect(evt: any) {     
          this.selected = evt.selected;      
        }
        
        addForm() {        
          
          this.formTitle = "New FG Category"; 
          this.display = true;                          
          this.intention = ADD;
          this.configureAddForm();  
        }   
        
        edit() {  
          
          this.formTitle = "Edit FG Category"; 
          this.intention = UPDATE;      
          
          this.configureEditForm();
           
        }                
         
        cancel() 
        {
          this.display = false;     
          this.itemSelected = false;          
        }    
        
        getReadyStockList() {
          this.dispatchIntent(READYSTOCK_GET);
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
        
        