import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState,  ADD, UPDATE, SKIMKHAS_SAVE, SKIMKHAS_GET_OK, SKIMKHAS_GET,  
  SKIMKHAS_SAVE_SUCCESS, EMPLOYEE_GET, EMPLOYEE_GET_OK} from '../../sharedObjects/sharedMessages';
  import { RptSkModel } from "../../model/RptSkModel";
  import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs/Subscription'
  import * as messageUtil from "../../sharedObjects/storeMessageUtil";
  import * as util from "../../sharedObjects/util";
  import { UomModel } from "../../model/UomModel";
  import { StncustomModel } from "../../model/StncustomModel"; 
  import { CurrencyModel } from "../../model/CurrencyModel";  
  import { ComponentModel } from "../../model/ComponentModel";  
  import { SupplierModel } from "../../model/SupplierModel";  
  import { RawMaterialModel } from "../../model/RawMaterialModel";  
  import { CalendarModule } from 'primeng/calendar';
  import {DropdownModule} from 'primeng/dropdown';
  import {SpinnerModule} from 'primeng/spinner';
  import {DialogModule} from 'primeng/dialog';
  import { RptSkMimpModel } from '../../model/RptSkMimpModel';
    
  @Component({
    selector: 'app-skim-khas-component',
    templateUrl: './skim-khas-component.component.html',
    styleUrls: ['./skim-khas-component.component.css']
  })
  
  export class SkimKhasComponentComponent implements OnInit {
    
    data: RptSkModel = new RptSkModel(); 
    dataForm: FormGroup;
    private intention : number = UPDATE;
    
    dateValue = new Date().getDate();
    
    displayDataEntry : boolean = false;
    display: boolean = false; 
    formTitle: string = "New GRN"; 
    dataList : Array<RptSkModel> = new Array<RptSkModel>();  
    empDataList : Array<any> = new Array<any>();
    
    formErrors = {
      'rptId': '',
      'rptDate': '',
      'letterDate': '' 
    };    
    
    itemSelected : boolean = false;
    
    mainItemSelected : RptSkModel; 
    
    validationMessages = {    
      'rptDate': {
        'required': 'Report Month/Year is required.' 
      },
      'letterDate': {
        'required': 'Date of Letter is required.' 
      } 
    };
    
    userSubscription : Subscription;    
    rows = []; 
    empRows = []; 
    
    columns = [
      { prop: 'rptId', name : 'Id' },
      { prop: 'rptDate', name : 'Date' },
      { prop: 'letterDate', name : 'Letter Date' },
      { prop: 'refNo', name : 'Reference No' },
      { prop: 'lrcptDept', name : 'Department' },
      { prop: 'lrcptBr', name : 'Branch' },
      { prop: 'lrcptAdd1', name : 'Address' },
      { prop: 'signedByEmpId', name : 'Employee' },
      { prop: 'signedByPos', name : 'Position' },
      { prop: 'signedByName', name : 'Name' } 
    ];
    
    dataEntryColumns = [
      { field: 'txnId', header: 'Bill' },
      { field: 'fImpDate', header: 'Tarikh' },
      { field: 'fCustomNo', header: 'No Barang Kastam' },
      { field: 'fImpCost', header: 'Kuantiti Import' },
      { field: 'fImpCost', header: 'Nilai Import' },
      { field: 'fGstcost', header: 'GST' },
      { field: 'note', header: 'Catatan' }   
    ];
    
    basicEntryColumns = [
      { field: 'txnId', header: 'Bill' },      
      { field: 'fImpDate', header: 'Tarikh' },
      { field: 'fCustomNo', header: 'No Barang Kastam' },
      { field: 'fImpCost', header: 'Kuantiti Import' }    
    ];
    
    mainColumns  = [
      { field: 'rptId', header: 'Report Id' },      
      { field: 'rptDate', header: 'Report Date' }    
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => {   
        
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SKIMKHAS_SAVE_SUCCESS), SKIMKHAS_SAVE_SUCCESS));
        
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SKIMKHAS_GET_OK), SKIMKHAS_GET_OK));    
        
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, EMPLOYEE_GET_OK), EMPLOYEE_GET_OK));    
        
      }); 
      
      this.configureEditForm();
    }
    
    ngAfterViewInit() { 
      
      this.dispatchIntent(SKIMKHAS_GET); 
      
      this.dispatchIntent(EMPLOYEE_GET);
    }
    
    save()
    {     
      var saveJson = new RptSkModel();
      
      if (this.intention == ADD)
      {
        saveJson = this.dataForm.value as RptSkModel;        
        
        //saveJson.rptDate = util.getTargetDate(this.data.rptDate);                
        //saveJson.letterDate = util.getTargetDate(this.data.rptDate);  
        //saveJson.signedDate =util.getTargetDate(this.data.rptDate);  
        
      }
      else {
        
        saveJson.rptId = this.data.rptId;
        saveJson.rptDate = this.data.rptDate;
        saveJson.letterDate = this.data.letterDate; 
      }
      
      var strJson = JSON.stringify(saveJson);   
      this.dispatchIntent(SKIMKHAS_SAVE, saveJson);
      this.display = false;         
    } 
    
    
    onValueChanged(data?: RptSkModel) {
      
      if (!this.dataForm) { return; }
      
      const form = this.dataForm; 
      this.data.rptId = data.rptId;
      this.data.rptDate = data.rptDate;
      this.data.letterDate = data.letterDate;  
      
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
    
    componentMessageHandle(message : any) {
      
      if (message && message.type == SKIMKHAS_GET_OK)
      {        
        this.rows.length = 0;
        
        for (var idx in message.data)
        {
          var dataInfo = message.data[idx] as RptSkModel;    
          this.dataList.push(dataInfo);
        }
        
        this.rows = this.dataList;
      } 
      else if (message && message.type == EMPLOYEE_GET_OK)
      {
        this.empRows.length = 0; 
        this.empDataList.push({   
          empId : 0,
          empName : '',
          empIdno : '',
          empAd1 : '',
          empAd2 : '',
          empAd3 : '' 
        });
        
        for (var idx in message.data)
        {
          var empDataInfo = message.data[idx];  
          this.empDataList.push({   
            empId : empDataInfo.empId,
            empName : empDataInfo.empName,
            empIdno : empDataInfo.empIdno,
            empAd1 : empDataInfo.empAd1,
            empAd2 : empDataInfo.empAd2,
            empAd3 : empDataInfo.empAd3,
          });
        }
        
        this.empRows = this.empDataList;
      }  
      else if (message && message.type == SKIMKHAS_SAVE_SUCCESS)
      {                  
        this.display = false;                
      }  
    }
    
    onSubmit()
    {
      
    }
    
    private setupAddForm()
    {
      this.configureAddForms(''); 
      for (const field in this.formErrors) { 
        this.formErrors[field] = ''; 
      }   
    }
    
    private configureAddForms(id :any) {
      
      this.dataForm = this.fb.group({
        'rptId': [id],
        'rptDate': ['', [Validators.required, Validators.minLength(1)]], 
        'letterDate': ['', [Validators.required, Validators.minLength(1)]], 
        'refNo': ['', [Validators.required, Validators.minLength(1)]]  , 
        'lrcptDept': ['', [Validators.required, Validators.minLength(1)]]  , 
        'lrcptBr': ['', [Validators.required, Validators.minLength(1)]]  , 
        'lrcptAdd1': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd2': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd3': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd4': ['', [Validators.required, Validators.minLength(1)]],
        'signedByEmpId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]], 
        'signedByPos': ['', [Validators.required, Validators.minLength(1)]], 
        'signedByIdno': ['', [Validators.required, Validators.minLength(1)]],
        'signedByName': ['', [Validators.required, Validators.minLength(1)]]   
      });
      
    }
    
    private configureEditForm() {
      
      this.dataForm = this.fb.group({
        'rptId': [this.data.rptId],
        'rptDate': ['', [Validators.required, Validators.minLength(1)]], 
        'letterDate': ['', [Validators.required, Validators.minLength(1)]], 
        'refNo': [this.data.refNo, [Validators.required, Validators.minLength(1)]]  , 
        'lrcptDept': [this.data.lrcptDept, [Validators.required, Validators.minLength(1)]]  , 
        'lrcptBr': [this.data.lrcptBr, [Validators.required, Validators.minLength(1)]]  , 
        'lrcptAdd1': [this.data.lrcptAdd1, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd2': [this.data.lrcptAdd2, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd3': [this.data.lrcptAdd3, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd4': [this.data.lrcptAdd4, [Validators.required, Validators.minLength(1)]],
        'signedByEmpId': [this.data.signedByEmpId, [Validators.required, Validators.minLength(1), Validators.min(1)]], 
        'signedByPos': [this.data.signedByPos, [Validators.required, Validators.minLength(1)]], 
        'signedByIdno': [this.data.signedByIdno, [Validators.required, Validators.minLength(1)]],
        'signedByName': [this.data.signedByName, [Validators.required, Validators.minLength(1)]]   
      });
      
      
      this.dataForm.valueChanges.debounceTime(300).subscribe(
        data => this.onValueChanged(data));
      }
      
      addForm() {        
        
        this.formTitle = "New Report SKIM Khas"; 
        this.display = true;                          
        this.intention = ADD;
        this.setupAddForm();  
      }   
      
      addDataEntryForm()
      {      
        this.displayDataEntry = true;
      }
      
      edit() {  
        
        this.formTitle = "Edit Report SKIM Khas"; 
        this.intention = UPDATE;  
        this.configureEditForm(); 
        this.display = true;
                
        let dftDate = new Date(this.data.rptDate);   
        let letterDate = new Date(this.data.letterDate);   

        this.dataForm.get("rptDate").setValue(dftDate);
        this.dataForm.get("letterDate").setValue(letterDate);            
      }                          
      
      cancel() 
      {
        this.display = false;     
        this.itemSelected = false;          
      }    
      
      dispatchIntent(messageType : string, data? : any)
      {   
        console.log(messageType);
        
        this.store.dispatch(
          {     
            type: messageType,
            data : data 
          });  
        } 
        
        onEditComplete(evt)
        {
          console.log(evt);
        }
        
        onRowSelect(evt)
        { 
          console.log('onrowselect');
          console.log(evt);
          
          this.intention = UPDATE;
          
          if (evt && evt.data)
          {
            this.data = evt.data as RptSkModel;                   
            this.itemSelected = true;   
          }
          else 
          this.itemSelected = false;
          
          this.edit();
          
        }
      }
      