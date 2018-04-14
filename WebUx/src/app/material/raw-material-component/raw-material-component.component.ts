import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, RAW_MATERIAL_SAVE, RAW_MATERIAL_GET_OK,
  ADD, UPDATE, RAW_MATERIAL_GET, RAW_MATERIAL_SAVE_SUCCESS, UOM_GET, UOM_GET_OK,
  MATERIAL_CATEGORY_GET, MATERIAL_CATEGORY_GET_OK, COUNTRY_GET, COUNTRY_GET_OK, } from '../../sharedObjects/sharedMessages';
  import { EmployeeModel } from "../../model/EmployeeModel";
  import { RawMaterialModel } from "../../model/RawMaterialModel";
  import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs/Subscription'
  import * as messageUtil from "../../sharedObjects/storeMessageUtil";
  import {DialogModule} from 'primeng/dialog';
  import {MultiSelectModule} from 'primeng/multiselect';
  import {FormUtil} from "../../sharedObjects/formUtil";
  import * as timeUtil from '../../sharedObjects/timeUtil';
  import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
  
  @Component({
    selector: 'app-raw-material-component',
    templateUrl: './raw-material-component.component.html',
    styleUrls: ['./raw-material-component.component.css'] 
  })
  export class RawMaterialComponentComponent implements OnInit {
    
    async getMaterialComponentData() {    
      console.log('sync data loading');
      // Tryin to sync loading of data // 
      this.dispatchIntent(RAW_MATERIAL_GET);
      await timeUtil.delay(2000);
      this.dispatchIntent(MATERIAL_CATEGORY_GET);
      await timeUtil.delay(2000);
      this.dispatchIntent(UOM_GET);
      await timeUtil.delay(2000);
      this.dispatchIntent(COUNTRY_GET);

    }
    private currentModel: RawMaterialModel = new RawMaterialModel(); 
    personForm: FormGroup;
    private intention : number = UPDATE;    
    display: boolean = false;
    
    formTitle: string = "New Raw Material"; 
    dataList : Array<any> = new Array<any>(); 
    uomDataList : Array<any> = new Array<any>(); 
    rmcatDataList : Array<any> = new Array<any>(); 
    countryDataList : Array<any> = new Array<any>();     
    formUtil : FormUtil<RawMaterialModel>;
    
    formValidators = {  
      'rmid': [],
      'rmcode': [Validators.required, Validators.minLength(1)],
      'rmdesc': [Validators.required, Validators.minLength(1)], 
      'gstrate': [Validators.required, Validators.minLength(1)],
      'dutyImpRate': [Validators.required, Validators.minLength(1)],
      'countryList': [Validators.minLength(1)],
      //'tariffCode': [Validators.required, Validators.minLength(1)],
      'rmcatId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'uomid': [Validators.required, Validators.minLength(1), Validators.min(1)]
    }; 
    
    formErrors = { 
      'rmid': '',
      'rmcode': '',
      'rmcatId': '',
      'rmdesc': '',
      'uomid': '',
      //'tariffCode': '',
      'countryList': '',
      'dutyImpRate': '',
      'gstrate': ''    
    };
    
    countries = [];         
    itemSelected : boolean = false;
    
    validationMessages = {    
      'rmcode': {
        'required': 'Code is required.' 
      },
      'rmcatId': {
        'required': 'Category is required.' 
      }, 
      'rmdesc': {
        'required': 'Description is required.' 
      },
      'uomid': {
        'required': 'UOM is required.' 
      },
      /*'tariffCode': {
        'required': 'Tariff Code is required.' 
      },*/
      'countryList': {
        'required': 'Country is required.' 
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
    rmcatRows = [];
    uomRows = [];
    
    columns = [ 
      { prop: 'rmid', name : 'Rmid' },
      { prop: 'rmcode', name : 'Rmcode' },
      { prop: 'rmcatId', name : 'RmcatId' },
      { prop: 'rmdesc', name : 'Rmdesc' },
      { prop: 'uomid', name : 'Uomid' },
      //{ prop: 'tariffCode', name : 'TariffCode' },
      { prop: 'countryList', name : 'CountryList' },
      { prop: 'dutyImpRate', name : 'DutyImpRate' },
      { prop: 'gstrate', name : 'Gstrate' }
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    name : string; 
    description : string; 
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => { 
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData,           
          [ RAW_MATERIAL_GET_OK, RAW_MATERIAL_SAVE_SUCCESS, MATERIAL_CATEGORY_GET_OK, UOM_GET_OK, COUNTRY_GET_OK]));
        }); 
        
        this.setFormValidation('');
      }
      
      ngAfterViewInit() {       
        
        this.getMaterialComponentData();
      }
      
      save()
      {     
        debugger;
        
        let data = this.formUtil.commit();        
        if (this.intention == ADD)
        {
          data.rmid = null;
        }
        else {                   
          data.rmid = this.currentModel.rmid;         
        }
        
        this.currentModel.rmcode = data.rmcode;        
        this.currentModel.rmdesc = data.rmdesc;
        this.currentModel.rmcatId = data.rmcatId;
        this.currentModel.uomid = data.uomid;
        this.currentModel.gstrate = data.gstrate;
        this.currentModel.dutyImpRate = data.dutyImpRate;
       //this.currentModel.tariffCode = data.tariffCode;
        
        let clist = "";
        for(var c of this.countries){ 
          if(c.checked){
            if(clist=="")
            clist = c.value;
            else
            clist = clist + "," + c.value;
          }
        }
        data.countryList = clist;          
        
        this.rows = [...this.rows];
        
        this.dispatchIntent(RAW_MATERIAL_SAVE, data);       
        
        this.display = false; 
      } 
      
      private setFormValidation(id :any) {
        
        this.personForm = this.fb.group({  
          'rmid': [id],
          'rmcode': ['', [Validators.required, Validators.minLength(1)]],
          'rmdesc': ['', [Validators.required, Validators.minLength(1)]], 
          'gstrate': ['', [Validators.required, Validators.minLength(1)]],
          'dutyImpRate': ['', [Validators.required, Validators.minLength(1)]],
          'countryList': [''],
          //'tariffCode': ['', [Validators.required, Validators.minLength(1)]],
          'rmcatId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'uomid': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]]
        });                 
      }      
      
      private  changeCountryCheckbox(i) {
        if (this.countries) {
          this.countries[i].checked = !this.countries[i].checked;
        }        
      }
      
      private ResetForm() {
        if (this.countries) { 
          for(var c of this.countries)
          {
            c.checked = false; 
          }
        }
      }
      
      private configureAddForm()
      {
        this.ResetForm();
        
        this.currentModel = new RawMaterialModel();
        this.currentModel.countryList = '';
        this.currentModel.dutyImpRate = '0';
        this.currentModel.gstrate = 0;
        this.currentModel.rmcatId = 0;
        this.currentModel.rmcode = '';
        this.currentModel.rmdesc = '';
        this.currentModel.rmid = null;
        //this.currentModel.tariffCode = '';
        this.currentModel.uomid = 0;        
        
        this.formUtil = new FormUtil<RawMaterialModel>(this.currentModel, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.personForm = userform;        
        this.personForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));     
      }
      
      private configureEditForm() {           
        this.ResetForm();    
      }
      
      onValueChanged(data?: RawMaterialModel) {
        
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
          
          if (message && message.type == RAW_MATERIAL_GET_OK)
          {            
            this.rows.length = 0;
            this.dataList.length = 0;

            for (var userInfo of message.data.data.data)
            {               
              let model  = new RawMaterialModel();
              model = {...userInfo};
              this.dataList.push(model);
            }        

            this.rows = [...this.dataList];
          }    
          
          if (message && message.type == RAW_MATERIAL_SAVE_SUCCESS)
          {                  
            this.display = false; 
            await timeUtil.delay(TIME_DELAY);
            this.getMaterialList();
          }    
          
          if (message && message.type == MATERIAL_CATEGORY_GET_OK)
          {
            this.rmcatRows.length = 0;
            for (var d of message.data.data.data)
            {    
              this.rmcatDataList.push({   
                rmcatId : d.rmcatId,
                rmcatName : d.rmcatName 
              });
            }

            this.rmcatRows = this.rmcatDataList;
            console.log("MATERIAL_CATEGORY_GET_OK",this.rmcatRows);
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
          
          if (message && message.type == COUNTRY_GET_OK)
          {  
            for (var d of message.data.data.data)
            { 
              this.countries.push({   
                value : d.countryId,
                name : d.countryName,
                checked : false
              });
            } 
            
            console.log("COUNTRY_GET_OK",this.countries);
          } 
        });                
      }
      
      onSelect(evt : any) {
        
        debugger;
        
        if (evt && evt.selected && evt.selected.length > 0)
        {
          this.currentModel = evt.selected[0] as RawMaterialModel;                   
          this.itemSelected = true;   
          
          this.formUtil = new FormUtil<RawMaterialModel>(this.currentModel, this.formValidators);
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
      
      addForm() {        
        
        this.formTitle = "New Raw Material"; 
        this.display = true;                          
        this.intention = ADD;
        this.configureAddForm();  
      }   
      
      edit() {  
        
        this.formTitle = "Edit Raw Material"; 
        this.intention = UPDATE;      
        
        this.configureEditForm();
        
        if (this.currentModel && this.currentModel.countryList)
        {                                                    
          if (this.countries) {
            
            for(var c of this.countries)
            {
              var temp = new Array(); 
              
              temp = this.currentModel.countryList.split(",");
              
              for (var a in temp ) {
                if(c.value == temp[a])
                c.checked = true;
              }
              
            }
          }             
        }       
        
      }                          
      
      cancel() 
      {
        this.display = false;     
        this.itemSelected = false;          
      }    
      
      getMaterialList() {
        this.dispatchIntent(RAW_MATERIAL_GET);
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
      
      