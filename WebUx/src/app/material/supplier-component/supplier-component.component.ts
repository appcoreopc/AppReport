import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, SUPPLIER_SAVE, SUPPLIER_GET_OK, DELETE_SUPPLIER_PROMPT,
  SUPPLIER_DELETE, DELETE_ITEM_DELIMITER, SUPPLIER_DELETE_SUCCESS, 
  ADD, UPDATE, SUPPLIER_GET, SUPPLIER_SAVE_SUCCESS, CURRENCY_GET, CURRENCY_GET_OK, 
  FACTORYSTATUS_GET, FACTORYSTATUS_GET_OK  } from '../../sharedObjects/sharedMessages';
  import { SupplierModel } from "../../model/SupplierModel";
  import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs/Subscription'
  import * as messageUtil from "../../sharedObjects/storeMessageUtil";
  import {DialogModule} from 'primeng/dialog';
  import {MultiSelectModule} from 'primeng/multiselect';
  import {FormUtil} from "../../sharedObjects/formUtil";
  import * as timeUtil from '../../sharedObjects/timeUtil';
  import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
  
 

  @Component({ 
    selector: 'app-supplier-component',
    templateUrl: './supplier-component.component.html',
    styleUrls: ['./supplier-component.component.css']
  })
  export class SupplierComponent implements OnInit {
    
    async getSupplierComponentData() {    
      console.log('sync data loading');
      // Tryin to sync loading of data // 
      this.dispatchIntent(SUPPLIER_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(CURRENCY_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(FACTORYSTATUS_GET); 
      await timeUtil.delay(2000);
      
    }
    private currentModel: SupplierModel = new SupplierModel(); 
    personForm: FormGroup;
    private intention : number = UPDATE;    
    display: boolean = false;
    
    isTargetCheckbox : boolean = false;
    selected : any;
    
    formTitle: string = "New Vendor"; 
    dataList : Array<any> = new Array<any>(); 
    currencyDataList : Array<any> = new Array<any>(); 
    factoryStatusDataList : Array<any> = new Array<any>();    
    formUtil : FormUtil<SupplierModel>;
     
    formValidators = {   
      'supplierId': [],
      'supplierName': [Validators.required, Validators.minLength(1)],
      'supplierCode': [Validators.required, Validators.minLength(1)],
      'phoneNo1': [],
      'phoneNo2': [],
      'faxNo': [],
      'supplierAd1': [],
      'supplierAd2': [],
      'supplierAd3': [],
      'bankAccNo': [],
      'bankName': [],
      'bankAddress': [],
      'swift': [],
      'currencyId':[],
      'deliveryTerms': [],
      'paymentTerms': [],
      'forwarder': [],
      'gstno': [], 
      'factoryStatusId':[]
    }; 
      
    formErrors = { 
      'supplierId': '',
      'supplierName': '',
      'supplierCode': '',
      'phoneNo1': '',
      'phoneNo2': '',
      'faxNo': '',
      'supplierAd1': '',
      'supplierAd2': '',
      'supplierAd3': '',
      'bankAccNo': '',
      'bankName': '',
      'bankAddress': '',
      'swift': '',
      'currencyId': '',
      'deliveryTerms': '',
      'paymentTerms': '',
      'forwarder': '',
      'gstno': '', 
      'factoryStatusId':'' 
    };
    
    itemSelected : boolean = false;
    
    validationMessages = {     
      'supplierName': {
        'required': 'Vendor Name is required.' 
      },
      'supplierCode': {
        'required': 'Vendor Code is required.' 
      } 
    };
 
    userSubscription : Subscription;
    
    rows = []; 
    currencyRows = [];
    factoryStatusRows = [];
    
    columns = [ 
	  { prop: 'supplierId', name : 'supplierId' },
      { prop: 'supplierName', name : 'supplierName' },
      { prop: 'supplierCode', name : 'supplierCode' },
      { prop: 'phoneNo1', name : 'phoneNo1' },
      { prop: 'phoneNo2', name : 'phoneNo2' },
      { prop: 'faxNo', name : 'faxNo' },
      { prop: 'supplierAd1', name : 'supplierAd1' },
      { prop: 'supplierAd2', name : 'supplierAd2' },
      { prop: 'supplierAd3', name : 'supplierAd3' },
      { prop: 'bankAccNo', name : 'bankAccNo' },
      { prop: 'bankName', name : 'bankName' },
      { prop: 'bankAddress', name : 'bankAddress' },
      { prop: 'swift', name : 'swift' },
      { prop: 'currencyId', name : 'currencyId' },
      { prop: 'deliveryTerms', name : 'deliveryTerms' },
      { prop: 'paymentTerms', name : 'paymentTerms' },
      { prop: 'forwarder', name : 'forwarder' },
      { prop: 'gstno', name : 'gstno' }, 
      { prop: 'factoryStatusId', name : 'factoryStatusId' }
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    name : string; 
    description : string; 
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => { 
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData,           
          [ SUPPLIER_GET_OK, SUPPLIER_DELETE_SUCCESS,  SUPPLIER_SAVE_SUCCESS,
            CURRENCY_GET_OK, FACTORYSTATUS_GET_OK]));
        }); 
        
        this.setFormValidation('');
      }
      
      ngAfterViewInit() {       
        
        this.getSupplierComponentData();
      }
      
      save()
      {     
        
        let data = this.formUtil.commit();        
        if (this.intention == ADD)
        {
          data.supplierId = null;
        }
        else {                   
          data.supplierId = this.currentModel.supplierId;         
        }
          
		this.currentModel.supplierName = data.supplierName;
		this.currentModel.supplierCode = data.supplierCode;
		this.currentModel.phoneNo1 = data.phoneNo1;
		this.currentModel.phoneNo2 = data.phoneNo2;
		this.currentModel.faxNo = data.faxNo;
		this.currentModel.supplierAd1 = data.supplierAd1;
		this.currentModel.supplierAd2 = data.supplierAd2;
		this.currentModel.supplierAd3 = data.supplierAd3;
		this.currentModel.bankAccNo = data.bankAccNo;
		this.currentModel.bankName = data.bankName;
		this.currentModel.bankAddress = data.bankAddress;
		this.currentModel.swift = data.swift;
		this.currentModel.currencyId = data.currencyId;
		this.currentModel.deliveryTerms = data.deliveryTerms;
		this.currentModel.paymentTerms = data.paymentTerms;
		this.currentModel.forwarder = data.forwarder;
		this.currentModel.gstno = data.gstno; 
		this.currentModel.factoryStatusId = data.factoryStatusId; 
 
        this.rows = [...this.rows];
        
        this.dispatchIntent(SUPPLIER_SAVE, data);       
        
        this.display = false; 
      } 
      
 
      private setFormValidation(id :any) {
        
        this.personForm = this.fb.group({   
        'supplierId': [id], 
        'supplierName': ['', [Validators.required, Validators.minLength(1)]], 
        'supplierCode': ['', [Validators.required, Validators.minLength(1)]],  
        'phoneNo1': [''], 
        'phoneNo2': [''], 
        'faxNo': [''], 
        'supplierAd1': [''], 
        'supplierAd2': [''], 
        'supplierAd3': [''], 
        'bankAccNo': [''], 
        'bankName': [''], 
        'bankAddress': [''], 
        'swift': [''], 
        'currencyId': [''], 
        'deliveryTerms' : [''], 
        'paymentTerms': [''], 
        'forwarder': [''], 
        'gstno': [''],  
        'factoryStatusId': ['']
        });                 
      }      
       
      
      private ResetForm() {
         
      }
      
      private configureAddForm()
      {
        this.ResetForm();
        
        this.currentModel = new SupplierModel(); 
        this.currentModel.supplierId = null; 
        this.currentModel.supplierName = '';
        this.currentModel.supplierCode = '';  
        this.currentModel.phoneNo1 = '';
        this.currentModel.phoneNo2 = '';
        this.currentModel.faxNo = '';
        this.currentModel.supplierAd1 = '';
        this.currentModel.supplierAd2 = '';
        this.currentModel.supplierAd3 = '';
        this.currentModel.bankAccNo = '';
        this.currentModel.bankName = '';
        this.currentModel.bankAddress = '';
        this.currentModel.swift = '';
        this.currentModel.currencyId = 0;
        this.currentModel.deliveryTerms = '';
        this.currentModel.paymentTerms = '';
        this.currentModel.forwarder = '';
        this.currentModel.gstno = ''; 
        this.currentModel.factoryStatusId = 0;   
        
        this.formUtil = new FormUtil<SupplierModel>(this.currentModel, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.personForm = userform;        
        this.personForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));     
      }
      
      private configureEditForm() {           
        this.ResetForm();    
      }
      
      onValueChanged(data?: SupplierModel) {
        
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
        //console.log("messageAll",messageAll);
        messageAll.map(async message => {  
          
          if (message && message.type == SUPPLIER_GET_OK)
          {            
            this.rows.length = 0;
            this.dataList.length = 0;
            
            for (var userInfo of message.data.data.data)
            {               
              let model  = new SupplierModel();
              model = {...userInfo};
              this.dataList.push(model);
            }        
            
            this.rows = [...this.dataList];
          }    
          
          if (message && (message.type == SUPPLIER_SAVE_SUCCESS
            || message.type == SUPPLIER_DELETE_SUCCESS))
            {                  
              this.display = false; 
              await timeUtil.delay(TIME_DELAY);
              this.getSupplierList();
            }    
           
            if (message && message.type == CURRENCY_GET_OK)
            { 
              this.currencyRows.length = 0;
              for (var d of message.data.data.data)
              {     
               // console.log("currency",d);
                this.currencyDataList.push({   
                  currencyId : d.currencyId,
                  currencyCode : d.currencyCode 
                });
              }
              
              this.currencyRows = this.currencyDataList;
             // console.log("CURRENCY_GET_OK",this.currencyRows);
            } 
           
            if (message && message.type == FACTORYSTATUS_GET_OK)
            { 
              this.factoryStatusRows.length = 0; 
              for (var d of message.data.data.data)
              {      
                this.factoryStatusDataList.push({   
                  factoryStatusId : d.factoryStatusId,
                  factoryStatusName : d.factoryStatusName 
                });
              }
              
              this.factoryStatusRows = this.factoryStatusDataList;  
            } 
             
          });                
        }
        
        editForm(evt : any) {
          
          if (evt && evt.row && evt.row.supplierId) {
            
            let targetDataId = evt.row.supplierId;
            
            if (targetDataId) 
            {
              this.currentModel = this.rows.find(x => x.supplierId == targetDataId);     
              
              if (this.currentModel)
              {
                this.itemSelected = true;   
                
                this.formUtil = new FormUtil<SupplierModel>(this.currentModel, this.formValidators);
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
          
          if (confirm(DELETE_SUPPLIER_PROMPT)) {
            
            if (this.selected && this.selected.length > 0)
            {       
              let deleItems = this.selected.map( x  => x.supplierId);
              if (deleItems)
              {
                this.dispatchIntent(SUPPLIER_DELETE, { 'deleteItems' : deleItems.join(DELETE_ITEM_DELIMITER)});
              }
            }
          }
        }
        
        onSelect(evt: any) {     
          this.selected = evt.selected;      
        }
        
        addForm() {        
          
          this.formTitle = "New Vendor"; 
          this.display = true;                          
          this.intention = ADD;
          this.configureAddForm();  
        }   
        
        edit() {  
          
          this.formTitle = "Edit Vendor"; 
          this.intention = UPDATE;      
          
          this.configureEditForm();
           
        }                
         
        cancel() 
        {
          this.display = false;     
          this.itemSelected = false;          
        }    
        
        getSupplierList() {
          this.dispatchIntent(SUPPLIER_GET);
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
        
        