import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CityAppState, ADD, UPDATE, SKIMKHAS_SAVE, SKIMKHAS_GET_OK, SKIMKHAS_GET,
  SKIMKHAS_SAVE_SUCCESS, EMPLOYEE_GET, EMPLOYEE_GET_OK, CONFIG_GET, CONFIG_GET_OK,
  JOBTITLE_GET_OK, JOBTITLE_GET
} from '../../sharedObjects/sharedMessages';
import { APPLICATION_HOST
} from '../../sharedObjects/applicationSetup';
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
import { ConfigModel } from "../../model/ConfigModel";
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SpinnerModule } from 'primeng/spinner';
import { DialogModule } from 'primeng/dialog';
import { RptSkMimpModel } from '../../model/RptSkMimpModel';
import { Data } from '@angular/router/src/config';
import { JobTitleModel } from "../../model/JobTitleModel"; 

import {FormUtil} from "../../sharedObjects/formUtil";
import * as timeUtil from '../../sharedObjects/timeUtil';
import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
import { debug } from 'util';

@Component({
  selector: 'app-skim-khas-component',
  templateUrl: './skim-khas-component.component.html',
  styleUrls: ['./skim-khas-component.component.css']
})

export class SkimKhasComponentComponent implements OnInit {
  
  
  // model 
  data: RptSkModel = new RptSkModel();
  mainItemSelected: RptSkModel;
  itemEntryModel: RptSkMimpModel = new RptSkMimpModel();
  expandSelectedRowItem : RptSkMimpModel; 
  configData: ConfigModel = new ConfigModel();
  
  // forms 
  dataForm: FormGroup; // main entry form 
  entryDetailForm: FormGroup; // for detail entry form 
  expandEditForm : FormGroup;
  
  private intention: number = UPDATE;
  
  displayDataEntry: boolean = false;
  display: boolean = false;
  displayEntryForm: boolean = false;
  displayPrintReport: boolean = false;
  saveDialogDisplay: boolean = false;
  enabledDetailEntry: boolean = false;
  selectedDetailEntry: boolean = false;
  tabIndex:number = 0; 
  applicationHost:string = APPLICATION_HOST;
  
  formTitle: string = "New GRN";
  dataList: Array<RptSkModel> = new Array<RptSkModel>();
  gridEditRow: RptSkMimpModel = new RptSkMimpModel();
  empDataList: Array<any> = new Array<any>();
  configDataList : Array<any> = new Array<any>(); 
  jobTitleDataList : Array<any> = new Array<any>(); 
  
  pCalendarEditEntryValue : Date; 
  
  formUtil : FormUtil<RptSkModel>;
  
  formValidators = { 
    'rptId': [],
    'rptDate': [Validators.required, Validators.minLength(1)],
    'letterDate': [Validators.required, Validators.minLength(1)],
    'refNo': [Validators.required, Validators.minLength(1)],
    'lrcptDept': [Validators.required, Validators.minLength(1)],
    'lrcptBr': [Validators.required, Validators.minLength(1)],
    'lrcptAdd1': [Validators.required, Validators.minLength(1)],
    'lrcptAdd2': [Validators.required, Validators.minLength(1)],
    'lrcptAdd3': [Validators.required, Validators.minLength(1)],
    'lrcptAdd4': [Validators.required, Validators.minLength(1)],
    'signedByEmpId': [],
    'signedByPos': [Validators.required, Validators.minLength(1)],
    'signedByIdno': [Validators.required, Validators.minLength(1)],
    'signedByName': [Validators.required, Validators.minLength(1)],
    'signedByEmpIdImp': [],
    'signedByPosImp': [Validators.required, Validators.minLength(1)],
    'signedByIdnoImp': [Validators.required, Validators.minLength(1)],
    'signedByNameImp': [Validators.required, Validators.minLength(1)]
  };
  
  formErrors = {
    'rptId': '',
    'refNo': '',
    'rptDate': '',
    'letterDate': '',
    'lrcptDept': '',
    'lrcptBr' : '',
    'lrcptAdd1': '',
    'lrcptAdd2': '',
    'lrcptAdd3': '',
    'lrcptAdd4': '',
    'signedByName': '',
    'signedByIdno': '',
    'signedByPos': '',
    'signedByNameImp': '',
    'signedByIdnoImp': '',
    'signedByPosImp': ''
  };
  
  detailFormError = {
    'txnId': '',
    'fImpDate': '',
    'fCustomNo': '',
    'fImpWgt': '',
    'fImpCost': '',
    'fGstcost': '',
    'note': ''
  }
  
  detailEntryValidationMessages = {
    'txnId': {
      'required': 'Please enter bill no'
    },
    'fImpDate': {
      'required': 'Date is required.'
    },
    'fCustomNo': {
      'required': 'Custom No is required.'
    },
    'fImpWgt': {
      'required': 'Import weight is required.'
    },
    'fImpCost': {
      'required': 'Import cost is required.'
    },
    'fGstcost': {
      'required': 'Gst cost is required.'
    },
    'note': {
      'required': 'Note is required.'
    }
  };
  
  itemSelected: boolean = false;
  
  validationMessages = {
    'refNo': {
      'required': 'Reference No is required.'
    },
    'rptDate': {
      'required': 'Report Month/Year is required.'
    },
    'letterDate': {
      'required': 'Date of Letter is required.'
    },
    'lrcptDept': {
      'required': 'Department is required.'
    },
    'lrcptBr': {
      'required': 'Branch is required.'
    },
    'lrcptAdd1': {
      'required': 'Address is required.'
    },
    'lrcptAdd2': {
      'required': 'Address is required.'
    },
    'lrcptAdd3': {
      'required': 'Address is required.'
    },
    'lrcptAdd4': {
      'required': 'Address is required.'
    }, 
    'signedByName': {
      'required': 'Name is required.'
    },
    'signedByIdno': {
      'required': 'IC is required.'
    },
    'signedByPos': {
      'required': 'Position is required.'
    }, 
    'signedByNameImp': {
      'required': 'Name is required.'
    },
    'signedByIdnoImp': {
      'required': 'IC is required.'
    },
    'signedByPosImp': {
      'required': 'Position is required.'
    },
  };
  
  userSubscription: Subscription;
  rows = [];
  empRows = [];
  configRows = [];
  jobTitleRows = [];
  
  columns = [
    { prop: 'rptId', name: 'Id' },
    { prop: 'rptDate', name: 'Date' },
    { prop: 'letterDate', name: 'Letter Date' },
    { prop: 'refNo', name: 'Reference No' },
    { prop: 'lrcptDept', name: 'Department' },
    { prop: 'lrcptBr', name: 'Branch' },
    { prop: 'lrcptAdd1', name: 'Address' },
    { prop: 'signedByEmpId', name: 'Employee' },
    { prop: 'signedByPos', name: 'Position' },
    { prop: 'signedByName', name: 'Name' }
  ];
  
  dataEntryColumns = [
    { field: 'txnId', header: 'Bill' },
    { field: 'fImpDate', header: 'Tarikh' },
    { field: 'fCustomNo', header: 'No Barang Kastam' },
    { field: 'fImpWgt', header: 'Kuantiti Import' },
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
  
  mainColumns = [ 
    { field: 'rptId', header: 'Report Id' },
    { field: 'rptDate', header: 'Report Date' } 
  ];
  
  constructor(private store: Store<CityAppState>, private fb: FormBuilder) { }
  
  ngOnInit() {
    
    this.userSubscription = this.store.subscribe(appData => {
      
      this.componentMessageHandle(messageUtil.getMultiMessage(appData,
        [
          SKIMKHAS_SAVE_SUCCESS, SKIMKHAS_GET_OK, EMPLOYEE_GET_OK,
          CONFIG_GET_OK, JOBTITLE_GET_OK
        ]));
        
        // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SKIMKHAS_SAVE_SUCCESS), SKIMKHAS_SAVE_SUCCESS));
        // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SKIMKHAS_GET_OK), SKIMKHAS_GET_OK));
        // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, EMPLOYEE_GET_OK), EMPLOYEE_GET_OK));
        // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, CONFIG_GET_OK), CONFIG_GET_OK));
        // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, JOBTITLE_GET_OK), JOBTITLE_GET_OK));
        
      });
      
      //this.configureEditForm();
      
      this.setupAddForm();
      
      this.setupDetailEntryForm();
    }
    
    
    ngAfterViewInit() {
      
      this.dispatchIntent(SKIMKHAS_GET); 
      this.dispatchIntent(EMPLOYEE_GET);
      this.dispatchIntent(CONFIG_GET);
      this.dispatchIntent(JOBTITLE_GET);
    }
    
    
    saveValid(m){
      
      let isDataExist = false;
      
      for (var d in this.dataList) { 
        var dataInfo = this.dataList[d] as RptSkModel;
        console.log(dataInfo.rptDate , m.rptDate);
        
        var ddt = new Date(dataInfo.rptDate);
        var dm = ddt.getMonth()+1;
        var dy = ddt.getFullYear();
        var md = m.rptDate.getMonth()+1;
        var y = m.rptDate.getFullYear();
        
        if ((this.intention == ADD && dm == md && dy== y)
        || (this.intention != ADD && dm == md && dy== y && dataInfo.rptId != m.rptId))
        {
          isDataExist = true;
          break;
        } 
      }
      
      if(isDataExist) {
        this.saveDialogDisplay = true;
        return false;
      } 
      return true;
    }
    
    save() {
      
      debugger;
      
      let mainFormModel = this.dataForm.value as RptSkModel;
      
      if(!this.saveValid(mainFormModel)) return; 
      // bind main form control fields //
      
      this.data.rptId = mainFormModel.rptId;
      this.data.refNo = mainFormModel.refNo;
      
      this.data.lrcptBr = mainFormModel.lrcptBr;
      this.data.lrcptDept = mainFormModel.lrcptDept;
      
      this.data.lrcptAdd1 = mainFormModel.lrcptAdd1;
      this.data.lrcptAdd2 = mainFormModel.lrcptAdd2;
      this.data.lrcptAdd3 = mainFormModel.lrcptAdd3;
      this.data.lrcptAdd4 = mainFormModel.lrcptAdd4;
      
      this.data.signedByEmpId = mainFormModel.signedByEmpId;
      this.data.signedByIdno = mainFormModel.signedByIdno;
      this.data.signedByName = mainFormModel.signedByName;
      this.data.signedByPos = mainFormModel.signedByPos;
      
      this.data.signedByEmpIdImp = mainFormModel.signedByEmpIdImp;
      this.data.signedByIdnoImp = mainFormModel.signedByIdnoImp;
      this.data.signedByNameImp = mainFormModel.signedByNameImp;
      this.data.signedByPosImp = mainFormModel.signedByPosImp;
      
      // Dates handling     
      this.data.letterDate = util.getTargetDate(new Date(mainFormModel.letterDate));
      this.data.rptDate = util.getTargetDate(new Date(mainFormModel.rptDate));
      
      if (this.intention == ADD) {
        
        //saveJson.rptDate = util.getTargetDate(this.data.rptDate);                
        //saveJson.letterDate = util.getTargetDate(this.data.rptDate);  
        //saveJson.signedDate =util.getTargetDate(this.data.rptDate);  
      }
      else {
        
        mainFormModel.rptId = this.data.rptId;
        mainFormModel.rptDate = this.data.rptDate;
        mainFormModel.letterDate = this.data.letterDate;
      }
      
      var strJson = JSON.stringify(this.data); 
      this.dispatchIntent(SKIMKHAS_SAVE, strJson);
      this.display = false;
    }
    
    
    onValueChanged(data?: RptSkModel) {
      
      if (!this.dataForm) { return; }
      
      const form = this.dataForm;
      this.data.rptId = data.rptId;
      this.data.rptDate = data.rptDate;
      this.data.letterDate = data.letterDate;

      data.signedByEmpId
      
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
    
    
    componentMessageHandle(messageAll: Array<any>) {
      
      messageAll.map(async message => {
        
        if (message && message.type == SKIMKHAS_GET_OK) {
          
          this.rows.length = 0;
          this.dataList.length = 0;
          
          for (var skitem of message.data.data.data) {
            var dataInfo = {...skitem};
            this.dataList.push(dataInfo);
          }
          
          this.rows = this.dataList.sort(function(a,b) {return (a.rptId > b.rptId) ? 1 : ((b.rptId > a.rptId) ? -1 : 0);} ); 
        }
        else if (message && message.type == EMPLOYEE_GET_OK) {
          
          this.empRows.length = 0;
          this.empDataList.length = 0;
          
          this.empDataList.push({
            empId: 0,
            empName: '',
            empIdno: '',
            empAd1: '',
            empAd2: '',
            empAd3: '',
            jobTitleId: 0
          });
          
          for (var empItem of message.data.data.data) {
            var empDataInfo = {...empItem};
            this.empDataList.push(empDataInfo);
          }
          
          this.empRows = [...this.empDataList];
        }
        else if (message && message.type == SKIMKHAS_SAVE_SUCCESS) {
          debugger;
          console.log('getting ski khas data');
          this.display = false;
          await timeUtil.delay(TIME_DELAY);
          this.getSkimData();
        }
        else if (message && message.type == CONFIG_GET_OK)
        { 
          let configDataList = new Array<any>(); 
          this.configRows.length = 0; 
          this.configDataList.length = 0;
          
          for (var configItem of message.data.data.data)
          {
            var configDataInfo = {...configItem};    
            if(!(configDataInfo.moduleId == 1 && configDataInfo.id == 3)) continue;
            
            configDataList.push(configDataInfo); 
          } 
          
          this.configRows = [...configDataList]; 
        }   
        else if (message && message.type == JOBTITLE_GET_OK)
        {
          
          if (message.data && message.data.data && message.data.data.data)
          {

            this.jobTitleRows.length = 0;  
            this.jobTitleDataList.length = 0;
            
            for (var jobtitleItem of message.data.data.data)
            {    
              console.log(jobtitleItem);
              this.jobTitleDataList.push(jobtitleItem);
            }
            this.jobTitleRows = [...this.jobTitleDataList];
          } 
        }
        
      });
    }
    
    private setupAddForm() {
      
      this.configureAddForms();
      
      for (const field in this.formErrors) {
        this.formErrors[field] = '';
      }
      
      
      for (var cRow in this.configRows)
      { 
        if(this.configRows[cRow].configKey == "LetterRcptAdd1") 
        this.data.lrcptAdd1 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "LetterRcptAdd2") 
        this.data.lrcptAdd2 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "LetterRcptAdd3") 
        this.data.lrcptAdd3 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "LetterRcptAdd4") 
        this.data.lrcptAdd4 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "LetterRcptDept") 
        this.data.lrcptDept = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "LetterRcptBr") 
        this.data.lrcptBr = this.configRows[cRow].configData;
        
      }
      
      this.dataForm.get("lrcptAdd1").setValue(this.data.lrcptAdd1); 
      this.dataForm.get("lrcptAdd2").setValue(this.data.lrcptAdd2); 
      this.dataForm.get("lrcptAdd3").setValue(this.data.lrcptAdd3); 
      this.dataForm.get("lrcptAdd4").setValue(this.data.lrcptAdd4); 
      this.dataForm.get("lrcptDept").setValue(this.data.lrcptDept);
      this.dataForm.get("lrcptBr").setValue(this.data.lrcptBr);
    }
    
    
    changeTab(index: number): void {
      this.tabIndex = index;
    }
    
    private configureAddForms() {
      
      this.enabledDetailEntry = true;
      this.tabIndex = 0;
      
      console.log("configureAddForms");
      
      this.dataForm = this.fb.group({
        'rptId': [],
        'rptDate': ['', [Validators.required, Validators.minLength(1)]],
        'letterDate': ['', [Validators.required, Validators.minLength(1)]],
        'refNo': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptDept': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptBr': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd1': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd2': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd3': ['', [Validators.required, Validators.minLength(1)]],
        'lrcptAdd4': ['', [Validators.required, Validators.minLength(1)]],
        'signedByEmpId': [''],
        'signedByPos': ['', [Validators.required, Validators.minLength(1)]],
        'signedByIdno': ['', [Validators.required, Validators.minLength(1)]],
        'signedByName': ['', [Validators.required, Validators.minLength(1)]],
        'signedByEmpIdImp': [''],
        'signedByPosImp': ['', [Validators.required, Validators.minLength(1)]],
        'signedByIdnoImp': ['', [Validators.required, Validators.minLength(1)]],
        'signedByNameImp': ['', [Validators.required, Validators.minLength(1)]]
      });
      
    }
    
    private configureEditForm() {
      this.enabledDetailEntry = false;
      this.tabIndex = 0;
      
      this.dataForm = this.fb.group({
        'rptId': [this.data.rptId],
        'rptDate': ['', [Validators.required, Validators.minLength(1)]],
        'letterDate': ['', [Validators.required, Validators.minLength(1)]],
        'refNo': [this.data.refNo, [Validators.required, Validators.minLength(1)]],
        'lrcptDept': [this.data.lrcptDept, [Validators.required, Validators.minLength(1)]],
        'lrcptBr': [this.data.lrcptBr, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd1': [this.data.lrcptAdd1, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd2': [this.data.lrcptAdd2, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd3': [this.data.lrcptAdd3, [Validators.required, Validators.minLength(1)]],
        'lrcptAdd4': [this.data.lrcptAdd4, [Validators.required, Validators.minLength(1)]],
        'signedByEmpId': [this.data.signedByEmpId],
        'signedByPos': [this.data.signedByPos, [Validators.required, Validators.minLength(1)]],
        'signedByIdno': [this.data.signedByIdno, [Validators.required, Validators.minLength(1)]],
        'signedByName': [this.data.signedByName, [Validators.required, Validators.minLength(1)]],
        'signedByEmpIdImp': [this.data.signedByEmpIdImp],
        'signedByPosImp': [this.data.signedByPosImp, [Validators.required, Validators.minLength(1)]],
        'signedByIdnoImp': [this.data.signedByIdnoImp, [Validators.required, Validators.minLength(1)]],
        'signedByNameImp': [this.data.signedByNameImp, [Validators.required, Validators.minLength(1)]]
      });
      
      this.dataForm.valueChanges.debounceTime(300).subscribe(
        data => this.onValueChanged(data));
      }
      
      addForm() {
        
        this.formTitle = "New Report SKIM Khas";
        this.display = true;
        this.intention = ADD;
        
        this.data = new RptSkModel(); //invalidSave
        this.itemSelected = false; //invalidSave
        
        this.setupAddForm(); 
        // reinit form entires //
        this.data.rptSkMimp = new Array<RptSkMimpModel>();
        
      }
      
      addDataEntryForm() {
        this.displayDataEntry = true;
      }
      
      setupMainFormForEdit() {
        
        this.formTitle = "Edit Report SKIM Khas - " + this.data.rptId;
        this.intention = UPDATE;
        
        this.configureEditForm();
        
        let dftDate = new Date(this.data.rptDate);
        let letterDate = new Date(this.data.letterDate);
        
        this.dataForm.get("rptDate").setValue(dftDate);
        this.dataForm.get("letterDate").setValue(letterDate);
        this.display = true;
      }
      
      cancel() {
        this.display = false;
        this.itemSelected = false;
      }
      
      dispatchIntent(messageType: string, data?: any) {
        
        this.store.dispatch(
          {
            type: messageType,
            data: data
          });
        }
        
        onEditComplete(evt) {
          console.log(evt);
        }
        
        editForm(){
          
          this.setupMainFormForEdit();
        }
        
        printReport(){
          this.displayPrintReport = true;
        }
        
        onRowSelect(evt) {
          
          debugger;
          
          this.intention = UPDATE;
          
          if (evt && evt.data) {
            this.data = evt.data as RptSkModel;
            this.itemSelected = true;
          }
          else
          this.itemSelected = false;
          
        }
        // adding entries into the main module //
        
        createEntry() {
          
          // init array if prtSkMimp is null 
          if (this.data && !this.data.rptSkMimp) {
            this.data.rptSkMimp = new Array<RptSkMimpModel>();
          }
          
          if (this.entryDetailForm.valid) {
            
            this.itemEntryModel.fImpDate = util.getTargetDate(new Date(this.itemEntryModel.fImpDate));
            this.data.rptSkMimp.push(this.itemEntryModel);
            this.displayDataEntry = false;
          }
          
        }
        
        setupDetailEntryForm() {
          this.itemEntryModel = new RptSkMimpModel();
          
          if (!this.data.rptSkMimp) {
            this.data.rptSkMimp = new Array<RptSkMimpModel>();
          }
          
          this.entryDetailForm = this.fb.group({
            'rptId': [this.itemEntryModel.rptId],
            'fImpDate': [this.itemEntryModel.fImpDate, [Validators.required, Validators.minLength(1)]],
            'fCustomNo': [this.itemEntryModel.fCustomNo, [Validators.required, Validators.minLength(1)]],
            'fImpWgt': [this.itemEntryModel.fImpWgt, [Validators.required, Validators.minLength(1)]],
            'fImpCost': [this.itemEntryModel.fImpCost, [Validators.required, Validators.minLength(1)]],
            'fGstcost': [this.itemEntryModel.fGstcost, [Validators.required, Validators.minLength(1)]],
            'note': [this.itemEntryModel.note, [Validators.required, Validators.minLength(1)]]
          });
          
          this.entryDetailForm.valueChanges.debounceTime(100).subscribe(
            data => this.onEntryDetailValueChanged(data));
          }
          
          onEntryDetailValueChanged(data?: RptSkMimpModel) {
            
            if (!this.entryDetailForm) { return; }
            
            const form = this.entryDetailForm;
            
            this.itemEntryModel.txnId = data.txnId;
            this.itemEntryModel.rptId = this.data.rptId;
            this.itemEntryModel.fImpDate = data.fImpDate;
            this.itemEntryModel.fCustomNo = data.fCustomNo;
            this.itemEntryModel.fImpWgt = data.fImpWgt;
            this.itemEntryModel.fImpCost = data.fImpCost;
            this.itemEntryModel.fGstcost = data.fGstcost;
            this.itemEntryModel.note = data.note;
            
            for (const field in this.detailFormError) {
              // clear previous error message (if any)
              this.detailFormError[field] = '';
              const control = form.get(field);
              
              if (control && control.dirty && !control.valid) {
                const messages = this.detailEntryValidationMessages[field];
                for (const key in control.errors) {
                  this.detailFormError[field] += messages[key] + ' ';
                }
              }
            }
          }
          
          showEntryForm() {
            this.displayDataEntry = true;
          }
          
          onGridRowSave(rowData: RptSkMimpModel, dt: any) {
            
            const prevDataRow = { ...rowData };
            const gridEditItem = this.expandEditForm.value as RptSkMimpModel;
            
            if (gridEditItem) {
              /*rowData.txnId = gridEditItem.txnId;
              rowData.rptId = gridEditItem.rptId;
              rowData.fCustomNo = gridEditItem.fCustomNo;
              rowData.fGstcost = gridEditItem.fGstcost;
              rowData.fImpCost = gridEditItem.fImpCost;
              rowData.fImpDate = gridEditItem.fImpDate;
              rowData.fImpWgt = gridEditItem.fImpWgt;*/
              rowData.note = gridEditItem.note;
            }
            
            // if (rowData) {
            //   rowData.txnId = this.gridEditRow.txnId;
            //   rowData.rptId = this.gridEditRow.rptId;
            //   rowData.fCustomNo = this.gridEditRow.fCustomNo;
            //   rowData.fGstcost = this.gridEditRow.fGstcost;
            //   rowData.fImpCost = this.gridEditRow.fImpCost;
            //   rowData.fImpDate = this.gridEditRow.fImpDate;
            //   rowData.fImpWgt = this.gridEditRow.fImpWgt;
            //   rowData.note = this.gridEditRow.note;
            // }
            
            dt.toggleRow(prevDataRow);   
          }
          
          onGridRowCancel(rowData: any, dt: any) {
            dt.toggleRow(rowData);
          }
          
          // expandEditForm
          onRowExpanded(rowdata) {
            
            debugger; 
            const row = rowdata.data as RptSkMimpModel;
            
            // shorthand copy and then used to display on 
            // grid //
            //this.gridEditRow = new RptSkMimpModel();
            //this.gridEditRow = { ...rowdata.data };
            
            //this.pCalendarEditEntryValue = new Date(rowdata.fImpDate);
            // converting date to a valida Date // 
            // this.gridEditRow.fImpDate = new Date(rowdata.fImpDate);
            
            this.configureExpandGridForm(row)
          }
          
          configureExpandGridForm(itemEntryModel: RptSkMimpModel)
          {
            if (itemEntryModel)
            this.expandSelectedRowItem = itemEntryModel
            
            this.expandEditForm = this.fb.group({
              'rptId': [this.expandSelectedRowItem.rptId],
              'fImpDate': ['', [Validators.required, Validators.minLength(1)]],
              'fCustomNo': [this.expandSelectedRowItem.fCustomNo, [Validators.required, Validators.minLength(1)]],
              'fImpWgt': [this.expandSelectedRowItem.fImpWgt, [Validators.required, Validators.minLength(1)]],
              'fImpCost': [this.expandSelectedRowItem.fImpCost, [Validators.required, Validators.minLength(1)]],
              'fGstcost': [this.expandSelectedRowItem.fGstcost, [Validators.required, Validators.minLength(1)]],
              'note': [this.expandSelectedRowItem.note, [Validators.required, Validators.minLength(1)]]
            });
            
            if (itemEntryModel.fImpDate && itemEntryModel.fImpDate.length > 0)
            this.expandEditForm.get("fImpDate").setValue(new Date(itemEntryModel.fImpDate));
            else
            this.expandEditForm.get("fImpDate").setValue(new Date());
            
          }
          
          
          onEmpImpChange(id) {
            
            debugger;
            
            this.data.signedByNameImp = "";
            this.data.signedByIdnoImp = "";
            this.data.signedByPosImp = "";
            
            for (var cRow in this.empRows)
            { 
              if(this.empRows[cRow].empId == id){
                this.data.signedByNameImp = this.empRows[cRow].empName;
                this.data.signedByIdnoImp = this.empRows[cRow].empIdno;
                
                for (var jRow in this.jobTitleRows)
                {
                  if(this.empRows[cRow].jobTitleId == this.jobTitleRows[jRow].jobTitleId)
                  {
                    this.data.signedByPosImp = this.jobTitleRows[jRow].jobTitleName;
                    break; 
                  }
                  
                }
                
                break;
              }
              
            }
            
            this.dataForm.get("signedByNameImp").setValue(this.data.signedByNameImp); 
            this.dataForm.get("signedByIdnoImp").setValue(this.data.signedByIdnoImp); 
            this.dataForm.get("signedByPosImp").setValue(this.data.signedByPosImp);  
          }
          
          
          
          onEmpChange(id){ 
            
            this.data.signedByName = "";
            this.data.signedByIdno = "";
            this.data.signedByPos = "";
            
            for (var cRow in this.empRows)
            { 
              if(this.empRows[cRow].empId == id){
                this.data.signedByName = this.empRows[cRow].empName;
                this.data.signedByIdno = this.empRows[cRow].empIdno;
                
                for (var jRow in this.jobTitleRows)
                {
                  if(this.empRows[cRow].jobTitleId == this.jobTitleRows[jRow].jobTitleId)
                  {
                    this.data.signedByPos = this.jobTitleRows[jRow].jobTitleName;
                    break; 
                  }                
                }
                
                break;
              }
              
            }
            
            this.dataForm.get("signedByName").setValue(this.data.signedByName); 
            this.dataForm.get("signedByIdno").setValue(this.data.signedByIdno); 
            this.dataForm.get("signedByPos").setValue(this.data.signedByPos);  
          }
          
          getSkimData(): any {
            this.dispatchIntent(SKIMKHAS_GET);     
          }
          
        }
        
        
        
        
        