import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CityAppState, ADD, UPDATE, M1LAMPIRAN_SAVE, M1LAMPIRAN_GET_OK, M1LAMPIRAN_GET,
  M1LAMPIRAN_SAVE_SUCCESS, EMPLOYEE_GET, EMPLOYEE_GET_OK, CONFIG_GET, CONFIG_GET_OK,
  JOBTITLE_GET_OK, JOBTITLE_GET
} from '../../sharedObjects/sharedMessages';
import { APPLICATION_HOST
} from '../../sharedObjects/applicationSetup';
import { RptM1Model } from "../../model/RptM1Model";
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
import { RptM1MstkModel } from '../../model/RptM1MstkModel';
import { Data } from '@angular/router/src/config';
import { JobTitleModel } from "../../model/JobTitleModel"; 

@Component({
  selector: 'app-lampiran-m1-component',
  templateUrl: './lampiran-m1-component.component.html',
  styleUrls: ['./lampiran-m1-component.component.css']
})
export class LampiranM1ComponentComponent implements OnInit {

  // model 
  data: RptM1Model = new RptM1Model();
  mainItemSelected: RptM1Model;
  itemEntryModel: RptM1MstkModel = new RptM1MstkModel();
  expandSelectedRowItem : RptM1MstkModel; 
  configData: ConfigModel = new ConfigModel();

  // forms 
  dataForm: FormGroup; // main entry form 
  entryDetailForm: FormGroup; // for detail entry form 
  expandEditForm : FormGroup;
  
  private intention: number = UPDATE;
  
  displayDataEntry: boolean = false;
  displayEntryForm: boolean = false;
  displayPrintReport: boolean = false;
  enabledDetailEntry: boolean = false;
  display: boolean = false;
  selectedDetailEntry: boolean = false;
  tabIndex:number = 0; 
  applicationHost:string = APPLICATION_HOST;
  
  formTitle: string = "New Lampian M1";
  dataList: Array<RptM1Model> = new Array<RptM1Model>();
  gridEditRow: RptM1MstkModel = new RptM1MstkModel();
  empDataList: Array<any> = new Array<any>();
  configDataList : Array<any> = new Array<any>(); 
  jobTitleDataList : Array<any> = new Array<any>(); 
  
  pCalendarEditEntryValue : Date; 
 
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
    'expQuota': '',
    'localSalesQuota': '',
    'gpbdate': '', 
    'salesExpCont': '',
    'salesGpb': '',
    'salesFiz': '',
    'salesLocal': '', 
    'licenseNo': '',
    'signedByName': '',
    'signedByIdno': '',
    'signedByPos': '',
    'signedDate': '',
    'createdByName': '',
    'createdByIdno': '',
    'createdByPos': '',
    'appdByName': '',
    'appdByIdno': '',
    'appdByPos': '',
     'eqDutyImp': '',
     'eqGst': '',
     'eqDutyExcise': '',
     'purchEq': ''
  };

    detailFormError = {
    'mstkId': '',
    'usedCost': '',
    'wastedCost': '' 
  }
  
  detailEntryValidationMessages = {
    'usedCost': {
      'required': 'Jumlah bahan mentah yang digunakan is required.'
    },
    'wastedCost': {
      'required': 'Sisa / rosak is required.'
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

    'expQuota': {
      'required': 'Kuota Eksport is required.'
    },
    'localSalesQuota': {
      'required': 'Kuota Jualan Tempatan is required.'
    }, 
    'gpbdate': {
      'required': 'Tempoh Lesen GPB is required.'
    },
    'salesExpCont': {
      'required': 'Eksport Terus is required.'
    },
    'salesGpb': {
      'required': 'Jualan ke GPB is required.'
    },
    'salesFiz': {
      'required': 'Jualan ke FIZ is required.'
    },
    'salesLocal': {
      'required': 'Jualan tempatan is required.'
    }, 
    'licenseNo': {
      'required': 'License No is required.'
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
    'signedDate': {
      'required': 'Signed Date is required.'
    }, 
    'createdByName': {
      'required': 'Name is required.'
    },
    'createdByIdno': {
      'required': 'IC is required.'
    },
    'createdByPos': {
      'required': 'Position is required.'
    },  
    'appdByName': {
      'required': 'Name is required.'
    },
    'appdByIdno': {
      'required': 'IC is required.'
    },
    'appdByPos': {
      'required': 'Position is required.'
    },  
    /*'eqDutyImp': {
      'required': 'Duti Import is required.'
    },  
    'eqGst': {
      'required': 'GST 6% is required.'
    },  
    'eqDutyExcise': {
      'required': 'Duti Eksais is required.'
    },  
    'purchEq': {
      'required': 'Nilai Barangan Import (CIF) RM is required.'
    }, */ 
  };

  
  userSubscription: Subscription;
  rows = [];
  empRows = [];
  configRows = [];
  jobTitleRows = [];
  
  columns = [
    { prop: 'rptId', name: 'Report ID' },
    { prop: 'rptDate', name: 'Report Month/Year' },
    { prop: 'letterDate', name: 'Letter Date' },
    { prop: 'refNo', name: 'Reference No' },
    { prop: 'salesExpCont'} ,
    { prop: 'salesGpb'} ,
    { prop: 'salesFiz'} ,
    { prop: 'salesLocal'} ,
    { prop: 'licenseNo'} 
  ];
  
  
  dataEntryColumns = [
    { field: 'mstkId' },
    { field: 'fRmdesc' } ,
    { field: 'fUomcode' } ,
    { field: 'fTariffCode' } ,
    { field: 'fOpenBal' } ,
    { field: 'fTotalRm' } ,
    { field: 'usedCost' } ,
    { field: 'wastedCost' } ,
    { field: 'fCloseBal' } 
  ];
  
  basicEntryColumns = [
    { field: 'mstkId', header: 'Bill' },
    { field: 'usedCost', header: 'Jumlah bahan mentah yang digunakan' },
    { field: 'wastedCost', header: 'Sisa / Rosak' } 
  ];
  
  mainColumns = [ 
    { prop: 'rptId', name: 'Report ID' },
    { prop: 'rptDate', name: 'Report Month/Year' } 
  ];
  
  
  constructor(private store: Store<CityAppState>, private fb: FormBuilder) { }

 
  ngOnInit() {
    
    this.userSubscription = this.store.subscribe(appData => {
      
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, M1LAMPIRAN_SAVE_SUCCESS), M1LAMPIRAN_SAVE_SUCCESS));
      
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, M1LAMPIRAN_GET_OK), M1LAMPIRAN_GET_OK));
      
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, EMPLOYEE_GET_OK), EMPLOYEE_GET_OK));

      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, CONFIG_GET_OK), CONFIG_GET_OK));
       
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, JOBTITLE_GET_OK), JOBTITLE_GET_OK));
      
    });
    
    //this.configureEditForm();
    
    this.setupAddForm();
    
    this.setupDetailEntryForm();
  }
  
  
  ngAfterViewInit() {
    console.log("applicationHost",this.applicationHost);
    this.dispatchIntent(M1LAMPIRAN_GET); 
    this.dispatchIntent(EMPLOYEE_GET);
    this.dispatchIntent(CONFIG_GET);
    this.dispatchIntent(JOBTITLE_GET);
  }
  

  save() {
    
    debugger;
    
    let mainFormModel = this.dataForm.value as RptM1Model;
    
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
    
    this.data.createdByEmpId = mainFormModel.createdByEmpId;
    this.data.createdByIdno = mainFormModel.createdByIdno;
    this.data.createdByName = mainFormModel.createdByName;
    this.data.createdByPos = mainFormModel.createdByPos;

    this.data.appdByEmpId = mainFormModel.appdByEmpId;
    this.data.appdByIdno = mainFormModel.appdByIdno;
    this.data.appdByName = mainFormModel.appdByName;
    this.data.appdByPos = mainFormModel.appdByPos;
 
    this.data.expQuota = mainFormModel.expQuota;
    this.data.localSalesQuota = mainFormModel.localSalesQuota; 
    this.data.salesExpCont = mainFormModel.salesExpCont;
    this.data.salesGpb = mainFormModel.salesGpb;
    this.data.salesFiz = mainFormModel.salesFiz;
    this.data.salesLocal = mainFormModel.salesLocal;
    this.data.licenseNo = mainFormModel.licenseNo;
    
    this.data.purchEq = mainFormModel.purchEq;
    this.data.eqDutyImp = mainFormModel.eqDutyImp;
    this.data.eqDutyExcise = mainFormModel.eqDutyExcise;
    this.data.eqGst = mainFormModel.eqGst;
    
    // Dates handling     
    this.data.letterDate = util.getTargetDate(new Date(mainFormModel.letterDate));
    this.data.rptDate = util.getTargetDate(new Date(mainFormModel.rptDate));
    this.data.signedDate = util.getTargetDate(new Date(mainFormModel.signedDate));
    this.data.gpbdate = util.getTargetDate(new Date(mainFormModel.gpbdate));
    
    if (this.intention == ADD) {
      
      //saveJson.rptDate = util.getTargetDate(this.data.rptDate);                
      //saveJson.letterDate = util.getTargetDate(this.data.rptDate);  
      //saveJson.signedDate =util.getTargetDate(this.data.rptDate);  
    }
    else {
      
      mainFormModel.rptId = this.data.rptId;
      mainFormModel.rptDate = this.data.rptDate;
      mainFormModel.letterDate = this.data.letterDate;
      mainFormModel.signedDate = this.data.signedDate;
      mainFormModel.gpbdate = this.data.gpbdate;
    }
    
    var strJson = JSON.stringify(this.data); 
    this.dispatchIntent(M1LAMPIRAN_SAVE, strJson);
    this.display = false;
  }
  
  
  onValueChanged(data?: RptM1Model) {
    
    if (!this.dataForm) { return; }
    
    const form = this.dataForm;
    this.data.rptId = data.rptId;
    this.data.rptDate = data.rptDate;
    this.data.letterDate = data.letterDate;
    this.data.signedDate = data.signedDate;
    this.data.gpbdate = data.gpbdate;
    
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
 
  
  componentMessageHandle(message: any) {
    
    if (message && message.type == M1LAMPIRAN_GET_OK) {
      this.rows.length = 0;
      console.log("M1LAMPIRAN_GET_OK",message.data);
      for (var idx in message.data) {
        var dataInfo = message.data[idx] as RptM1Model;
        this.dataList.push(dataInfo);
      }
      
      this.rows = this.dataList.sort(function(a,b) {return (a.rptId > b.rptId) ? 1 : ((b.rptId > a.rptId) ? -1 : 0);} ); 
    }
    else if (message && message.type == EMPLOYEE_GET_OK) {
      this.empRows.length = 0;
      this.empDataList.push({
        empId: 0,
        empName: '',
        empIdno: '',
        empAd1: '',
        empAd2: '',
        empAd3: '',
        jobTitleId: 0
      });
      
      for (var idx in message.data) {
        var empDataInfo = message.data[idx];
        this.empDataList.push({
          empId: empDataInfo.empId,
          empName: empDataInfo.empName,
          empIdno: empDataInfo.empIdno,
          empAd1: empDataInfo.empAd1,
          empAd2: empDataInfo.empAd2,
          empAd3: empDataInfo.empAd3, 
          jobTitleId: empDataInfo.jobTitleId
        });
      }
      
      this.empRows = this.empDataList;
    }
    else if (message && message.type == M1LAMPIRAN_SAVE_SUCCESS) {
      this.display = false;
    }
     else if (message && message.type == CONFIG_GET_OK)
      { 
        this.configRows.length = 0; 
        let configDataList = new Array<any>(); 
        
       
        for (var idx in message.data)
        {
          var configDataInfo = message.data[idx] as ConfigModel;    

           if(! (configDataInfo.moduleId == 1 && configDataInfo.id == 1)) continue;

          configDataList.push({   
            configId : configDataInfo.configId,
            configKey : configDataInfo.configKey,
            configData : configDataInfo.configData 
          }); 
        } 

        this.configRows = configDataList; 
      }   
      else if (message && message.type == JOBTITLE_GET_OK)
      {
        this.jobTitleRows.length = 0;  
        for (var d of message.data)
        {    
          this.jobTitleDataList.push({   
              jobTitleId : d.jobTitleId,
              jobTitleName : d.jobTitleName 
          });
        }
        

        this.jobTitleRows = this.jobTitleDataList;
      } 
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
      'expQuota': ['', [Validators.required, Validators.minLength(1)]],
      'localSalesQuota': ['', [Validators.required, Validators.minLength(1)]],
      'gpbdate': ['', [Validators.required, Validators.minLength(1)]],
      'salesExpCont': ['', [Validators.required, Validators.minLength(1)]],
      'salesGpb': ['', [Validators.required, Validators.minLength(1)]],
      'salesFiz': ['', [Validators.required, Validators.minLength(1)]],
      'salesLocal': ['', [Validators.required, Validators.minLength(1)]], 
      'licenseNo': ['', [Validators.required, Validators.minLength(1)]],
      'signedByEmpId': [''],
      'signedByPos': ['', [Validators.required, Validators.minLength(1)]],
      'signedByIdno': ['', [Validators.required, Validators.minLength(1)]],
      'signedByName': ['', [Validators.required, Validators.minLength(1)]], 
      'signedDate': ['', [Validators.required, Validators.minLength(1)]], 
      'createdByEmpId': [''],
      'createdByPos': ['', [Validators.required, Validators.minLength(1)]],
      'createdByIdno': ['', [Validators.required, Validators.minLength(1)]],
      'createdByName': ['', [Validators.required, Validators.minLength(1)]], 
      'appdByEmpId': [''],
      'appdByPos': ['', [Validators.required, Validators.minLength(1)]],
      'appdByIdno': ['', [Validators.required, Validators.minLength(1)]],
      'appdByName': ['', [Validators.required, Validators.minLength(1)]],
      'purchEq': [''],
      'eqDutyImp': [''],
      'eqGst': [''],
      'eqDutyExcise': ['']
 
    });
    
  }
  
  private configureEditForm() {
    this.enabledDetailEntry = false;
    this.tabIndex = 0;

    console.log("configureEditForm", this.data);
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
      'expQuota': [this.data.expQuota, [Validators.required, Validators.minLength(1)]],
      'localSalesQuota': [this.data.localSalesQuota, [Validators.required, Validators.minLength(1)]],
      'gpbdate': [this.data.gpbdate, [Validators.required, Validators.minLength(1)]],
      'salesExpCont': [this.data.salesExpCont, [Validators.required, Validators.minLength(1)]],
      'salesGpb': [this.data.salesGpb, [Validators.required, Validators.minLength(1)]],
      'salesFiz': [this.data.salesFiz, [Validators.required, Validators.minLength(1)]],
      'salesLocal': [this.data.salesLocal, [Validators.required, Validators.minLength(1)]], 
      'licenseNo': [this.data.licenseNo, [Validators.required, Validators.minLength(1)]],
      'signedByEmpId': [this.data.signedByEmpId],
      'signedByPos': [this.data.signedByPos, [Validators.required, Validators.minLength(1)]],
      'signedByIdno': [this.data.signedByIdno, [Validators.required, Validators.minLength(1)]],
      'signedByName': [this.data.signedByName, [Validators.required, Validators.minLength(1)]], 
      'signedDate': ['', [Validators.required, Validators.minLength(1)]], 
      'createdByEmpId': [this.data.createdByEmpId],
      'createdByPos': [this.data.createdByPos, [Validators.required, Validators.minLength(1)]],
      'createdByIdno': [this.data.createdByIdno, [Validators.required, Validators.minLength(1)]],
      'createdByName': [this.data.createdByName, [Validators.required, Validators.minLength(1)]], 
      'appdByEmpId': [this.data.appdByEmpId],
      'appdByPos': [this.data.appdByPos, [Validators.required, Validators.minLength(1)]],
      'appdByIdno': [this.data.appdByIdno, [Validators.required, Validators.minLength(1)]],
      'appdByName': [this.data.appdByName, [Validators.required, Validators.minLength(1)]],
      'purchEq': [this.data.purchEq],
      'eqDutyImp': [this.data.eqDutyImp],
      'eqGst': [this.data.eqGst],
      'eqDutyExcise': [this.data.eqDutyExcise]
    });
    
    this.dataForm.valueChanges.debounceTime(300).subscribe(
      data => this.onValueChanged(data));
    }
    
    addForm() {
      
      this.formTitle = "New Report Lampiran M1";
      this.display = true;
      this.intention = ADD;
      
      this.setupAddForm(); 
      // reinit form entires //
      this.data.rptM1Mstk = new Array<RptM1MstkModel>();
      
    }
    
    addDataEntryForm() {
      this.displayDataEntry = true;
    }
    
    setupMainFormForEdit() {
      
      this.formTitle = "Edit Report Lampiran M1 - " + this.data.rptId;
      this.intention = UPDATE;
      
      this.configureEditForm();
      
      let dftDate = new Date(this.data.rptDate);
      let letterDate = new Date(this.data.letterDate);
      let signedDate = new Date(this.data.signedDate);
      let gpbdate = new Date(this.data.gpbdate);
      
      this.dataForm.get("rptDate").setValue(dftDate);
      this.dataForm.get("letterDate").setValue(letterDate);
      this.dataForm.get("signedDate").setValue(signedDate);
      this.dataForm.get("gpbdate").setValue(gpbdate);
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
          this.data = evt.data as RptM1Model;
          this.itemSelected = true;
        }
        else
        this.itemSelected = false;
        
      }
      // adding entries into the main module //
      
      createEntry() {
        
        // init array if prtSkMimp is null 
        /*if (this.data && !this.data.rptM1Mstk) {
          this.data.rptM1Mstk = new Array<RptM1MstkModel>();
        }
        
        if (this.entryDetailForm.valid) {
          
          this.itemEntryModel.fImpDate = util.getTargetDate(new Date(this.itemEntryModel.fImpDate));
          this.data.rptSkMimp.push(this.itemEntryModel);
          this.displayDataEntry = false;
        }*/
        
      }
      
      setupDetailEntryForm() {
        this.itemEntryModel = new RptM1MstkModel();
        
        if (!this.data.rptM1Mstk) {
          this.data.rptM1Mstk = new Array<RptM1MstkModel>();
        }
        
        this.entryDetailForm = this.fb.group({
          'mstkId': [this.itemEntryModel.mstkId],
          'wastedCost': [this.itemEntryModel.wastedCost, [Validators.required, Validators.minLength(1)]],
          'usedCost': [this.itemEntryModel.usedCost, [Validators.required, Validators.minLength(1)]]  
        });
        
        this.entryDetailForm.valueChanges.debounceTime(100).subscribe(
          data => this.onEntryDetailValueChanged(data));
        }
        
        onEntryDetailValueChanged(data?: RptM1MstkModel) {
          
          if (!this.entryDetailForm) { return; }
          
          const form = this.entryDetailForm;
          
          this.itemEntryModel.mstkId = data.mstkId;
          this.itemEntryModel.rptId = this.data.rptId;
          this.itemEntryModel.usedCost = data.usedCost; 
          this.itemEntryModel.wastedCost = data.wastedCost; 
          
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
        
        onGridRowSave(rowData: RptM1MstkModel, dt: any) {
          
          const prevDataRow = { ...rowData };
          const gridEditItem = this.expandEditForm.value as RptM1MstkModel;
          
          if (gridEditItem) { 
            rowData.usedCost = gridEditItem.usedCost;
            rowData.wastedCost = gridEditItem.wastedCost;
            rowData.fCloseBal = rowData.fTotalRm - rowData.usedCost - rowData.wastedCost;
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
          const row = rowdata.data as RptM1MstkModel;
          
          // shorthand copy and then used to display on 
          // grid //
          //this.gridEditRow = new RptSkMimpModel();
          //this.gridEditRow = { ...rowdata.data };
          
          //this.pCalendarEditEntryValue = new Date(rowdata.fImpDate);
          // converting date to a valida Date // 
          // this.gridEditRow.fImpDate = new Date(rowdata.fImpDate);
          
          this.configureExpandGridForm(row)
        }
        
        configureExpandGridForm(itemEntryModel: RptM1MstkModel)
        {
          if (itemEntryModel)
          this.expandSelectedRowItem = itemEntryModel
          
          this.expandEditForm = this.fb.group({
            'rptId': [this.expandSelectedRowItem.rptId],
            'wastedCost': [this.expandSelectedRowItem.wastedCost, [Validators.required, Validators.minLength(1)]] ,
            'usedCost': [this.expandSelectedRowItem.usedCost, [Validators.required, Validators.minLength(1)]]
          });
          
         /* if (itemEntryModel.fImpDate && itemEntryModel.fImpDate.length > 0)
            this.expandEditForm.get("fImpDate").setValue(new Date(itemEntryModel.fImpDate));
          else
            this.expandEditForm.get("fImpDate").setValue(new Date());*/
          
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

          onEmpCreatedChange(id){ 

          this.data.createdByName = "";
          this.data.createdByIdno = "";
          this.data.createdByPos = "";

          for (var cRow in this.empRows)
          { 
            if(this.empRows[cRow].empId == id){
              this.data.createdByName = this.empRows[cRow].empName;
              this.data.createdByIdno = this.empRows[cRow].empIdno;

              for (var jRow in this.jobTitleRows)
              {
                if(this.empRows[cRow].jobTitleId == this.jobTitleRows[jRow].jobTitleId)
                {
                   this.data.createdByPos = this.jobTitleRows[jRow].jobTitleName;
                   break; 
                }

              }
              
              break;
            }
    
          }

          this.dataForm.get("createdByName").setValue(this.data.createdByName); 
          this.dataForm.get("createdByIdno").setValue(this.data.createdByIdno); 
          this.dataForm.get("createdByPos").setValue(this.data.createdByPos);  
        }

          onEmpAppChange(id){ 

          this.data.appdByName = "";
          this.data.appdByIdno = "";
          this.data.appdByPos = "";

          for (var cRow in this.empRows)
          { 
            if(this.empRows[cRow].empId == id){
              this.data.appdByName = this.empRows[cRow].empName;
              this.data.appdByIdno = this.empRows[cRow].empIdno;

              for (var jRow in this.jobTitleRows)
              {
                if(this.empRows[cRow].jobTitleId == this.jobTitleRows[jRow].jobTitleId)
                {
                   this.data.appdByPos = this.jobTitleRows[jRow].jobTitleName;
                   break; 
                }

              }
              
              break;
            }
    
          }

          this.dataForm.get("appdByName").setValue(this.data.appdByName); 
          this.dataForm.get("appdByIdno").setValue(this.data.appdByIdno); 
          this.dataForm.get("appdByPos").setValue(this.data.appdByPos);  
        }
        
      }


