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
  
  
  @Component({
    selector: 'app-raw-material-component',
    templateUrl: './raw-material-component.component.html',
    styleUrls: ['./raw-material-component.component.css'] 
  })
  export class RawMaterialComponentComponent implements OnInit {
    
    private currentModel: RawMaterialModel = new RawMaterialModel(); 
    private personForm: FormGroup;
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
      'tariffCode': [Validators.required, Validators.minLength(1)],
      'rmcatId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'uomid': [Validators.required, Validators.minLength(1), Validators.min(1)]
    }; 
    
    formErrors = { 
      'rmid': '',
      'rmcode': '',
      'rmcatId': '',
      'rmdesc': '',
      'uomid': '',
      'tariffCode': '',
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
      'tariffCode': {
        'required': 'Tariff Code is required.' 
      },
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
      { prop: 'tariffCode', name : 'TariffCode' },
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
        this.dispatchIntent(RAW_MATERIAL_GET);
        this.dispatchIntent(MATERIAL_CATEGORY_GET);
        this.dispatchIntent(UOM_GET);
        this.dispatchIntent(COUNTRY_GET);
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
        this.currentModel.tariffCode = data.tariffCode;
        
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
          'tariffCode': ['', [Validators.required, Validators.minLength(1)]],
          'rmcatId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'uomid': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]]
        }); 
        
      }
      
      
      private  changeCountryCheckbox(i) {
        if (this.countries) {
          this.countries[i].checked = !this.countries[i].checked;
        }
        
        console.log("clist",this.countries); 
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
        this.setFormValidation(''); 
        
        for (const field in this.formErrors) { 
          this.formErrors[field] = ''; 
        } 
      }
      
      private configureEditForm() {   
        this.ResetForm();         

      }


      onValueChanged(data?: RawMaterialModel) {
        
        if (!this.personForm) { return; }              
        
        const form = this.personForm;
        
        // this.currentModel.rmid = data.rmid;
        // this.currentModel.rmcode =  data.rmcode;
        // this.currentModel.rmdesc = data.rmdesc;
        // this.currentModel.rmcatId = data.rmcatId;
        // this.currentModel.uomid = data.uomid;
        // this.currentModel.gstrate = data.gstrate;
        // this.currentModel.dutyImpRate = data.dutyImpRate;
        // this.currentModel.countryList = data.countryList;
        // this.currentModel.tariffCode = data.tariffCode; 
        
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
        
        messageAll.map(message => {  
          
          if (message && message.type == RAW_MATERIAL_GET_OK)
          {
            
            this.rows.length = 0;
            for (var userInfo of message.data.data.data)
            {                    
              this.dataList.push({   
                rmid : userInfo.rmid,
                rmcode : userInfo.rmcode,
                rmdesc : userInfo.rmdesc,
                rmcatId : userInfo.rmcatId,
                uomid : userInfo.uomid,
                gstrate : userInfo.gstrate,
                dutyImpRate : userInfo.dutyImpRate,
                countryList : userInfo.countryList,
                tariffCode : userInfo.tariffCode  
              });
            }                
            this.rows = this.dataList;
          }    
          
          if (message && message.type == RAW_MATERIAL_SAVE_SUCCESS)
          {                  
            this.display = false;                
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
        
        if (this.currentModel)
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
        
        /*let confirmList = [2,3];
        this.flightids.forEach(id => {
          if(id[0]) // here, true means that user checked the item 
          confirmList.push(this.flightList.find(x => x.id === id[1]));
        });*/
      }                          
      
      cancel() 
      {
        this.display = false;     
        this.itemSelected = false;          
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
      
      