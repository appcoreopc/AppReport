import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, MATERIAL_CATEGORY_SAVE, MATERIAL_CATEGORY_GET_OK, DELETE_MATERIALCATEGORY_PROMPT,
  MATERIAL_CATEGORY_DELETE, DELETE_ITEM_DELIMITER, MATERIAL_CATEGORY_DELETE_SUCCESS, 
  ADD, UPDATE, MATERIAL_CATEGORY_GET, MATERIAL_CATEGORY_SAVE_SUCCESS, UOM_GET, UOM_GET_OK
  } from '../../sharedObjects/sharedMessages';
  import { EmployeeModel } from "../../model/EmployeeModel";
  import { MaterialCategoryModel } from "../../model/MaterialCategoryModel";
  import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs/Subscription'
  import * as messageUtil from "../../sharedObjects/storeMessageUtil";
  import {DialogModule} from 'primeng/dialog';
  import {MultiSelectModule} from 'primeng/multiselect';
  import {FormUtil} from "../../sharedObjects/formUtil";
  import * as timeUtil from '../../sharedObjects/timeUtil';
  import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
  
@Component({
  selector: 'app-material-category-component',
  templateUrl: './material-category-component.component.html',
  styleUrls: ['./material-category-component.component.css']
})
  export class MaterialCategoryComponentComponent implements OnInit {
    
    async getMaterialCategoryComponentData() {    
      console.log('sync data loading');
      // Tryin to sync loading of data // 
      this.dispatchIntent(MATERIAL_CATEGORY_GET);
      await timeUtil.delay(2000); 
      this.dispatchIntent(UOM_GET);
      await timeUtil.delay(2000);  
    }
    private currentModel: MaterialCategoryModel = new MaterialCategoryModel(); 
    personForm: FormGroup;
    private intention : number = UPDATE;    
    display: boolean = false;
    
    isTargetCheckbox : boolean = false;
    selected : any;
    
    formTitle: string = "New Raw Material"; 
    dataList : Array<any> = new Array<any>(); 
    uomDataList : Array<any> = new Array<any>();     
    formUtil : FormUtil<MaterialCategoryModel>;
    
    formValidators = {  
      'rmcatId': [],
      'rmcatName': [Validators.required, Validators.minLength(1)],
      'tariffCode': [Validators.required, Validators.minLength(1)],
      'isLocal': [Validators.required],
      'gstrate': [Validators.required, Validators.minLength(1)],
      'dutyImpRate': [Validators.required, Validators.minLength(1)], 
      'uomid': [Validators.required, Validators.minLength(1), Validators.min(1)]
    }; 
    
    formErrors = { 
      'rmcatId': '',
      'rmcatName' : '',
      'tariffCode' : '',
      'isLocal': '',
      'uomid': '', 
      'dutyImpRate': '',
      'gstrate': ''    
    };
            
    itemSelected : boolean = false;
    
    validationMessages = {    
       'rmcatName': {
		  'required': 'RM Category Name is required.' 
		}, 
		'tariffCode': {
		  'required': 'Tariff Code is required.' 
		},
		'uomid': {
		  'required': 'UOM is required.' 
		}, 
		'dutyImpRate': {
		  'required': 'Duty Import Rate is required.' 
		},
		'gstrate': {
		  'required': 'Gst Rate is required.' 
		}
    };
    
    userSubscription : Subscription;
    
    rows = []; 
    uomRows = [];
    
    columns = [  
        { prop: 'rmcatId' },
        { name: 'rmcatName' },
        { name: 'tariffCode' },
        { name: 'isLocal' } ,
        { prop: 'uomid', name : 'Uomid' }, 
        { prop: 'dutyImpRate', name : 'DutyImpRate' },
        { prop: 'gstrate', name : 'Gstrate' } 
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    name : string; 
    description : string; 
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => { 
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData,           
          [ MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_DELETE_SUCCESS,  MATERIAL_CATEGORY_SAVE_SUCCESS, UOM_GET_OK ]));
        }); 
        
        this.setFormValidation('');
      }
      
      ngAfterViewInit() {       
        
        this.getMaterialCategoryComponentData();
      }
      
      save()
      {     
        
        let data = this.formUtil.commit();        
        if (this.intention == ADD)
        {
          data.rmcatId = null;
        }
        else {                   
          data.rmcatId = this.currentModel.rmcatId;         
        }
         
          this.currentModel.rmcatName = data.rmcatName;  
          this.currentModel.tariffCode = data.tariffCode;   
          this.currentModel.isLocal = data.isLocal;  
          this.currentModel.uomid = data.uomid;
          this.currentModel.gstrate = data.gstrate;
          this.currentModel.dutyImpRate = data.dutyImpRate;  
		   
         
        this.rows = [...this.rows];
        
        this.dispatchIntent(MATERIAL_CATEGORY_SAVE, data);       
        
        this.display = false; 
      } 
      
      private setFormValidation(id :any) {
         
        this.personForm = this.fb.group({  
          'rmcatId': [id],
          'rmcatName': ['', [Validators.required, Validators.minLength(1)]],
          'tariffCode': ['', [Validators.required, Validators.minLength(1)]], 
          'isLocal': [''],
          'gstrate': ['', [Validators.required, Validators.minLength(1)]],
          'dutyImpRate': ['', [Validators.required, Validators.minLength(1)]], 
          'uomid': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]]
        });                 
      }      
      
      
      private ResetForm() { 
      }
      
      private configureAddForm()
      {
        this.ResetForm();
        
		this.currentModel = new MaterialCategoryModel();
        this.currentModel.rmcatId = 0;
        this.currentModel.rmcatName = '';
        this.currentModel.tariffCode = '';  
        this.currentModel.isLocal = false;     
        this.currentModel.dutyImpRate = '0';
        this.currentModel.gstrate = 0; 
        this.currentModel.uomid = 0;    
        this.formUtil = new FormUtil<MaterialCategoryModel>(this.currentModel, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.personForm = userform;
		          
        this.personForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));     
      }
      
      private configureEditForm() {           
        this.ResetForm();    
      }
      
      onValueChanged(data?: MaterialCategoryModel) {
        
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
          
          if (message && message.type == MATERIAL_CATEGORY_GET_OK)
          {            
            this.rows.length = 0;
            this.dataList.length = 0;
            
            for (var userInfo of message.data.data.data)
            {               
              let model  = new MaterialCategoryModel();
              model = {...userInfo};
              this.dataList.push(model);
            }        
            
            this.rows = [...this.dataList];
          }    
          
          if (message && (message.type == MATERIAL_CATEGORY_SAVE_SUCCESS
            || message.type == MATERIAL_CATEGORY_DELETE_SUCCESS))
            {                  
              this.display = false; 
              await timeUtil.delay(TIME_DELAY);
              this.getMaterialCategoryList();
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
          
          if (evt && evt.row && evt.row.rmcatId) {
            
            let targetDataId = evt.row.rmcatId;
            
            if (targetDataId) 
            {
              this.currentModel = this.rows.find(x => x.rmcatId == targetDataId);     
              
              if (this.currentModel)
              {
                this.itemSelected = true;   
                
                this.formUtil = new FormUtil<MaterialCategoryModel>(this.currentModel, this.formValidators);
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
          
          if (confirm(DELETE_MATERIALCATEGORY_PROMPT)) {
            
            if (this.selected && this.selected.length > 0)
            {       
              let deleItems = this.selected.map( x  => x.rmcatId);
              if (deleItems)
              {
                this.dispatchIntent(MATERIAL_CATEGORY_DELETE, { 'deleteItems' : deleItems.join(DELETE_ITEM_DELIMITER)});
              }
            }
          }
        }
        
        
        onSelect(evt: any) {     
          this.selected = evt.selected;      
        }
        
        addForm() {        
          
          this.formTitle = "New RM Category"; 
          this.display = true;                          
          this.intention = ADD;
          this.configureAddForm();  
        }   
        
        edit() {  
          
          this.formTitle = "Edit RM Category"; 
          this.intention = UPDATE;      
          
          this.configureEditForm(); 
        }                
        
        
        
        cancel() 
        {
          this.display = false;     
          this.itemSelected = false;          
        }    
        
        getMaterialCategoryList() {
          this.dispatchIntent(MATERIAL_CATEGORY_GET);
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
        
        