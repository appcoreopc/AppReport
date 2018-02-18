import { Component, OnInit } from '@angular/core'; 
import { Store } from '@ngrx/store';
import {
  CityAppState, ADD, UPDATE, LESEN_SAVE, LESEN_GET_OK, LESEN_GET,
  LESEN_SAVE_SUCCESS, EMPLOYEE_GET, EMPLOYEE_GET_OK, CONFIG_GET, CONFIG_GET_OK,
  JOBTITLE_GET_OK, JOBTITLE_GET
} from '../../sharedObjects/sharedMessages';
import { APPLICATION_HOST
} from '../../sharedObjects/applicationSetup';
import { RptLgModel } from "../../model/RptLgModel";
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
import { RptLgYexpModel } from '../../model/RptLgYexpModel';
import { Data } from '@angular/router/src/config';
import { JobTitleModel } from "../../model/JobTitleModel"; 

@Component({
  selector: 'app-lesen-gudang-component',
  templateUrl: './lesen-gudang-component.component.html',
  styleUrls: ['./lesen-gudang-component.component.css']
})
export class LesenGudangComponentComponent implements OnInit {

   // model 
  data: RptLgModel = new RptLgModel();
  mainItemSelected: RptLgModel;
  itemEntryModel: RptLgYexpModel = new RptLgYexpModel();
  expandSelectedRowItem : RptLgYexpModel; 
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
  
  formTitle: string = "New Lesen Gudang";
  dataList: Array<RptLgModel> = new Array<RptLgModel>();
  gridEditRow: RptLgYexpModel = new RptLgYexpModel();
  empDataList: Array<any> = new Array<any>();
  configDataList : Array<any> = new Array<any>(); 
  jobTitleDataList : Array<any> = new Array<any>(); 
  
  pCalendarEditEntryValue : Date; 
 
  formErrors = {
    'rptId': '',
    'rptSdateY1': '',
    'rptEdateY1': '',
    'rptSdateY2': '',
    'rptEdateY2': '',
    'rptSdateY3': '',
    'rptEdateY3': '',
    'refNo': '',
    'ldate': '',
    'lrcptDept': '',
    'lrcptBr': '',
    'lrcptAdd1': '',
    'lrcptAdd2': '',
    'lrcptAdd3': '',
    'lrcptAdd4': '',
    'pbbcekNo': '',
    'licenseFee': '',
    'signedByEmpId': '',
    'signedByPos': '',
    'signedByName': '',
    'signedDate': '',
    'appByEmpId': '',
    'appByPos': '',
    'appByName': '',
    'appByIdno': '',
    //'appCoName': '',
    //'appAdd1': '',
    //'appAdd2': '',
    //'appAdd3': '',
    //'appAdd4': '',
    'appDate': '',
    'brcptDept': '',
    'brcptBr': '',
    'brcptAdd1': '',
    'brcptAdd2': '',
    'brcptAdd3': '',
    'brcptAdd4': '',
    'rptCoName': '',
    'rptSignedByEmpId': '',
    'rptSignedByPos': '',
    'rptSignedByIdno': '',
    'rptSignedByName': '',
    'mfdGoodY1': '',
    'mfdGoodY2': '',
    'mfdGoodY3': '',
    'mfdLicenseSdate': '',
    'mfdLicenseEdate': '',
    'isChgCoName': '',
    'isChgCoMember': '',
    'isChgAddress': '',
    'isChgFtyStr': '',
    'isChgEq': '',
    'bgtRmcost': '', 
    'bgtRdyGoodCost': '',
    'mktExpRate': '',
    'bgtMktExpCost': '',
    'bgtMktExpRate': '',
    'localSalesRate': '',
    'bgtLocSalesCost': '',
    'bgtLocSalesRate': '',
    'ipcRdc': '',
    'valueAdded': '',
    'repairSvc': '',
    'sparePart': '',
  };

    detailFormError = {
    'txnId': '' 
  }
  
  detailEntryValidationMessages = {
   
  };

  itemSelected: boolean = false;

  
validationMessages = { 
    'rptSdateY1' : { 'required': 'Reference No is required.' }, 
    'rptEdateY1' : { 'required': 'Reference No is required.' }, 
    'rptSdateY2' : { 'required': 'Reference No is required.' }, 
    'rptEdateY2' : { 'required': 'Reference No is required.' }, 
    'rptSdateY3' : { 'required': 'Reference No is required.' }, 
    'rptEdateY3' : { 'required': 'Reference No is required.' }, 
    'refNo' : { 'required': 'Reference No is required.' }, 
    'ldate' : { 'required': 'Reference No is required.' }, 
    'lrcptDept' : { 'required': 'Reference No is required.' }, 
    'lrcptBr' : { 'required': 'Reference No is required.' }, 
    'lrcptAdd1' : { 'required': 'Reference No is required.' }, 
    'lrcptAdd2' : { 'required': 'Reference No is required.' }, 
    'lrcptAdd3' : { 'required': 'Reference No is required.' }, 
    'lrcptAdd4' : { 'required': 'Reference No is required.' }, 
    'pbbcekNo' : { 'required': 'Reference No is required.' }, 
    'licenseFee' : { 'required': 'Reference No is required.' }, 
    'signedByEmpId' : { 'required': 'Reference No is required.' }, 
    'signedByPos' : { 'required': 'Reference No is required.' }, 
    'signedByName' : { 'required': 'Reference No is required.' }, 
    'signedDate' : { 'required': 'Reference No is required.' }, 
    'appByEmpId' : { 'required': 'Reference No is required.' }, 
    'appByPos' : { 'required': 'Reference No is required.' }, 
    'appByName' : { 'required': 'Reference No is required.' }, 
    'appByIdno' : { 'required': 'Reference No is required.' }, 
    //'appCoName' : { 'required': 'Reference No is required.' }, 
    //'appAdd1' : { 'required': 'Reference No is required.' }, 
    //'appAdd2' : { 'required': 'Reference No is required.' }, 
    //'appAdd3' : { 'required': 'Reference No is required.' }, 
    //'appAdd4' : { 'required': 'Reference No is required.' }, 
    'appDate' : { 'required': 'Reference No is required.' }, 
    'brcptDept' : { 'required': 'Reference No is required.' }, 
    'brcptBr' : { 'required': 'Reference No is required.' }, 
    'brcptAdd1' : { 'required': 'Reference No is required.' }, 
    'brcptAdd2' : { 'required': 'Reference No is required.' }, 
    'brcptAdd3' : { 'required': 'Reference No is required.' }, 
    'brcptAdd4' : { 'required': 'Reference No is required.' }, 
    'rptCoName' : { 'required': 'Reference No is required.' }, 
    'rptSignedByEmpId' : { 'required': 'Reference No is required.' }, 
    'rptSignedByPos' : { 'required': 'Reference No is required.' }, 
    'rptSignedByIdno' : { 'required': 'Reference No is required.' }, 
    'rptSignedByName' : { 'required': 'Reference No is required.' }, 
    'mfdGoodY1' : { 'required': 'Reference No is required.' }, 
    'mfdGoodY2' : { 'required': 'Reference No is required.' }, 
    'mfdGoodY3' : { 'required': 'Reference No is required.' }, 
    'mfdLicenseSdate' : { 'required': 'Reference No is required.' }, 
    'mfdLicenseEdate' : { 'required': 'Reference No is required.' }, 
    'isChgCoName' : { 'required': 'Reference No is required.' }, 
    'isChgCoMember' : { 'required': 'Reference No is required.' }, 
    'isChgAddress' : { 'required': 'Reference No is required.' }, 
    'isChgFtyStr' : { 'required': 'Reference No is required.' }, 
    'isChgEq' : { 'required': 'Reference No is required.' }, 
    'bgtRmcost' : { 'required': 'Reference No is required.' },  
    'bgtRdyGoodCost' : { 'required': 'Reference No is required.' }, 
    'mktExpRate' : { 'required': 'Reference No is required.' }, 
    'bgtMktExpCost' : { 'required': 'Reference No is required.' }, 
    'bgtMktExpRate' : { 'required': 'Reference No is required.' }, 
    'localSalesRate' : { 'required': 'Reference No is required.' }, 
    'bgtLocSalesCost' : { 'required': 'Reference No is required.' }, 
    'bgtLocSalesRate' : { 'required': 'Reference No is required.' }, 
    'ipcRdc' : { 'required': 'Reference No is required.' }, 
    'valueAdded' : { 'required': 'Reference No is required.' }, 
    'repairSvc' : { 'required': 'Reference No is required.' }, 
    'sparePart' : { 'required': 'Reference No is required.' }, 
  };

  
  userSubscription: Subscription;
  rows = [];
  empRows = [];
  configRows = [];
  jobTitleRows = [];
  
  columns = [
    { prop: 'rptId', name: 'Report ID' },
    { prop: 'rptSdateY2', name: 'Current Year (Start)' },
    { prop: 'rptEdateY2', name: 'Current Year (End)' } 
  ];
  
  
  dataEntryColumns = [
    { field: 'txnId' }, 
  ];
  
  basicEntryColumns = [
    { field: 'txnId', header: 'Bill' } 
  ];
  
  mainColumns = [ 
    { prop: 'rptId', name: 'Report ID' },
    { prop: 'rptSdateY2', name: 'Current Year (Start)' },
    { prop: 'rptEdateY2', name: 'Current Year (End)' } 
  ];
  
  
  constructor(private store: Store<CityAppState>, private fb: FormBuilder) { }

 
  ngOnInit() {
    
    this.userSubscription = this.store.subscribe(appData => {
      
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, LESEN_SAVE_SUCCESS), LESEN_SAVE_SUCCESS));
      
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, LESEN_GET_OK), LESEN_GET_OK));
      
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
    this.dispatchIntent(LESEN_GET); 
    this.dispatchIntent(EMPLOYEE_GET);
    this.dispatchIntent(CONFIG_GET);
    this.dispatchIntent(JOBTITLE_GET);
  }
  

  save() {
    
    debugger;
    
    let mainFormModel = this.dataForm.value as RptLgModel;
    
    // bind main form control fields //
    
    this.data.rptId = mainFormModel.rptId;
    this.data.refNo = mainFormModel.refNo;
    
    this.data.lrcptBr = mainFormModel.lrcptBr;
    this.data.lrcptDept = mainFormModel.lrcptDept; 
    this.data.lrcptAdd1 = mainFormModel.lrcptAdd1;
    this.data.lrcptAdd2 = mainFormModel.lrcptAdd2;
    this.data.lrcptAdd3 = mainFormModel.lrcptAdd3;
    this.data.lrcptAdd4 = mainFormModel.lrcptAdd4;
    
    this.data.pbbcekNo = mainFormModel.pbbcekNo;
    this.data.licenseFee = mainFormModel.licenseFee;
    
    this.data.signedByEmpId = mainFormModel.signedByEmpId; 
    this.data.signedByName = mainFormModel.signedByName;
    this.data.signedByPos = mainFormModel.signedByPos;
    
    this.data.appByEmpId = mainFormModel.appByEmpId;
    this.data.appByIdno = mainFormModel.appByIdno;
    this.data.appByName = mainFormModel.appByName;
    this.data.appByPos = mainFormModel.appByPos; 
 
    this.data.brcptDept = mainFormModel.brcptDept;
    this.data.brcptBr = mainFormModel.brcptBr;
    this.data.brcptAdd1 = mainFormModel.brcptAdd1;
    this.data.brcptAdd2 = mainFormModel.brcptAdd2;
    this.data.brcptAdd3 = mainFormModel.brcptAdd3;
    this.data.brcptAdd4 = mainFormModel.brcptAdd4;
    this.data.rptCoName = mainFormModel.rptCoName;
    this.data.rptSignedByEmpId = mainFormModel.rptSignedByEmpId;
    this.data.rptSignedByPos = mainFormModel.rptSignedByPos;
    this.data.rptSignedByIdno = mainFormModel.rptSignedByIdno;
    this.data.rptSignedByName = mainFormModel.rptSignedByName;
    this.data.mfdGoodY1 = mainFormModel.mfdGoodY1;
    this.data.mfdGoodY2 = mainFormModel.mfdGoodY2;
    this.data.mfdGoodY3 = mainFormModel.mfdGoodY3;
    this.data.isChgCoName = mainFormModel.isChgCoName;
    this.data.isChgCoMember = mainFormModel.isChgCoMember;
    this.data.isChgAddress = mainFormModel.isChgAddress;
    this.data.isChgFtyStr = mainFormModel.isChgFtyStr;
    this.data.isChgEq = mainFormModel.isChgEq; 
    this.data.bgtRmcost = mainFormModel.bgtRmcost; 
    this.data.bgtRdyGoodCost = mainFormModel.bgtRdyGoodCost; 
    this.data.mktExpRate = mainFormModel.mktExpRate;
    this.data.bgtMktExpCost = mainFormModel.bgtMktExpCost;
    this.data.bgtMktExpRate = mainFormModel.bgtMktExpRate; 
    this.data.localSalesRate = mainFormModel.localSalesRate;
    this.data.bgtLocSalesCost = mainFormModel.bgtLocSalesCost;
    this.data.bgtLocSalesRate = mainFormModel.bgtLocSalesRate;
    this.data.ipcRdc = mainFormModel.ipcRdc;
    this.data.valueAdded = mainFormModel.valueAdded;
    this.data.repairSvc = mainFormModel.repairSvc;
    this.data.sparePart = mainFormModel.sparePart;
    
    // Dates handling      
    this.data.mfdLicenseSdate = util.getTargetDate(new Date(mainFormModel.mfdLicenseSdate));
    this.data.mfdLicenseEdate = util.getTargetDate(new Date(mainFormModel.mfdLicenseEdate));
    this.data.rptSdateY1 = util.getTargetDate(new Date(mainFormModel.rptSdateY1));
    this.data.rptEdateY1 = util.getTargetDate(new Date(mainFormModel.rptEdateY1));
    this.data.rptSdateY2 = util.getTargetDate(new Date(mainFormModel.rptSdateY2));
    this.data.rptEdateY2 = util.getTargetDate(new Date(mainFormModel.rptEdateY2));
    this.data.rptSdateY3 = util.getTargetDate(new Date(mainFormModel.rptSdateY3));
    this.data.rptEdateY3 = util.getTargetDate(new Date(mainFormModel.rptEdateY3));
    this.data.ldate = util.getTargetDate(new Date(mainFormModel.ldate)); 
    this.data.signedDate = util.getTargetDate(new Date(mainFormModel.signedDate));  
    this.data.appDate = util.getTargetDate(new Date(mainFormModel.appDate));
    
    if (this.intention == ADD) {
      
      //saveJson.rptDate = util.getTargetDate(this.data.rptDate);                
      //saveJson.letterDate = util.getTargetDate(this.data.rptDate);  
      //saveJson.signedDate =util.getTargetDate(this.data.rptDate);  
    }
    else {
      
      mainFormModel.rptId = this.data.rptId; 
      mainFormModel.mfdLicenseSdate =  this.data.mfdLicenseSdate;
      mainFormModel.mfdLicenseEdate =  this.data.mfdLicenseEdate;
      mainFormModel.rptSdateY1 =  this.data.rptSdateY1;
      mainFormModel.rptEdateY1 =  this.data.rptEdateY1;
      mainFormModel.rptSdateY2 =  this.data.rptSdateY2;
      mainFormModel.rptEdateY2 =  this.data.rptEdateY2;
      mainFormModel.rptSdateY3 =  this.data.rptSdateY3;
      mainFormModel.rptEdateY3 =  this.data.rptEdateY3;
      mainFormModel.ldate =  this.data.ldate; 
      mainFormModel.signedDate =  this.data.signedDate;  
      mainFormModel.appDate =  this.data.appDate;
    }
    
    var strJson = JSON.stringify(this.data); 
    this.dispatchIntent(LESEN_SAVE, strJson);
    this.display = false;
  }
  
  
  onValueChanged(data?: RptLgModel) {
    
    if (!this.dataForm) { return; }
    
    const form = this.dataForm;
    this.data.rptId = data.rptId;
    this.data.mfdLicenseSdate =  this.data.mfdLicenseSdate;
    this.data.mfdLicenseEdate =  this.data.mfdLicenseEdate;
    this.data.rptSdateY1 =  this.data.rptSdateY1;
    this.data.rptEdateY1 =  this.data.rptEdateY1;
    this.data.rptSdateY2 =  this.data.rptSdateY2;
    this.data.rptEdateY2 =  this.data.rptEdateY2;
    this.data.rptSdateY3 =  this.data.rptSdateY3;
    this.data.rptEdateY3 =  this.data.rptEdateY3;
    this.data.ldate =  this.data.ldate; 
    this.data.signedDate =  this.data.signedDate;  
    this.data.appDate =  this.data.appDate;
    
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
    
    if (message && message.type == LESEN_GET_OK) {
      this.rows.length = 0;
      console.log("LESEN_GET_OK",message.data);
      for (var idx in message.data) {
        var dataInfo = message.data[idx] as RptLgModel;
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
    else if (message && message.type == LESEN_SAVE_SUCCESS) {
      this.display = false;
    }
     else if (message && message.type == CONFIG_GET_OK)
      { 
        this.configRows.length = 0; 
        let configDataList = new Array<any>(); 
        
       
        for (var idx in message.data)
        {
          var configDataInfo = message.data[idx] as ConfigModel;    

           if(! (configDataInfo.moduleId == 1 && configDataInfo.id == 2)) continue;

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
      'rptSdateY1': ['', [Validators.required, Validators.minLength(1)]], 
      'rptEdateY1': ['', [Validators.required, Validators.minLength(1)]],
      'rptSdateY2': ['', [Validators.required, Validators.minLength(1)]],
      'rptEdateY2': ['', [Validators.required, Validators.minLength(1)]],
      'rptSdateY3': ['', [Validators.required, Validators.minLength(1)]],
      'rptEdateY3': ['', [Validators.required, Validators.minLength(1)]],
      'refNo': ['', [Validators.required, Validators.minLength(1)]],
      'ldate': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptDept': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptBr': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptAdd1': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptAdd2': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptAdd3': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptAdd4': ['', [Validators.required, Validators.minLength(1)]],
      'pbbcekNo': ['', [Validators.required, Validators.minLength(1)]],
      'licenseFee': ['', [Validators.required, Validators.minLength(1)]],
      'signedByEmpId': [''],
      'signedByPos': ['', [Validators.required, Validators.minLength(1)]],
      'signedByName': ['', [Validators.required, Validators.minLength(1)]],
      'signedDate': ['', [Validators.required, Validators.minLength(1)]],
      'appByEmpId': [''],
      'appByPos': ['', [Validators.required, Validators.minLength(1)]],
      'appByName': ['', [Validators.required, Validators.minLength(1)]],
      'appByIdno': ['', [Validators.required, Validators.minLength(1)]], 
      'appDate': ['', [Validators.required, Validators.minLength(1)]],
      'brcptDept': ['', [Validators.required, Validators.minLength(1)]],
      'brcptBr': ['', [Validators.required, Validators.minLength(1)]],
      'brcptAdd1': ['', [Validators.required, Validators.minLength(1)]],
      'brcptAdd2': ['', [Validators.required, Validators.minLength(1)]],
      'brcptAdd3': ['', [Validators.required, Validators.minLength(1)]],
      'brcptAdd4': ['', [Validators.required, Validators.minLength(1)]],
      'rptCoName': ['', [Validators.required, Validators.minLength(1)]],
      'rptSignedByEmpId': [''],
      'rptSignedByPos': ['', [Validators.required, Validators.minLength(1)]],
      'rptSignedByIdno': ['', [Validators.required, Validators.minLength(1)]],
      'rptSignedByName': ['', [Validators.required, Validators.minLength(1)]],
      'mfdGoodY1': ['', [Validators.required, Validators.minLength(1)]],
      'mfdGoodY2': ['', [Validators.required, Validators.minLength(1)]],
      'mfdGoodY3': ['', [Validators.required, Validators.minLength(1)]],
      'mfdLicenseSdate': ['', [Validators.required, Validators.minLength(1)]],
      'mfdLicenseEdate': ['', [Validators.required, Validators.minLength(1)]],
      'isChgCoName': ['', [Validators.required, Validators.minLength(1)]],
      'isChgCoMember': ['', [Validators.required, Validators.minLength(1)]],
      'isChgAddress': ['', [Validators.required, Validators.minLength(1)]],
      'isChgFtyStr': ['', [Validators.required, Validators.minLength(1)]],
      'isChgEq': ['', [Validators.required, Validators.minLength(1)]],
      'bgtRmcost': ['', [Validators.required, Validators.minLength(1)]], 
      'bgtRdyGoodCost': ['', [Validators.required, Validators.minLength(1)]],
      'mktExpRate': ['', [Validators.required, Validators.minLength(1)]],
      'bgtMktExpCost': ['', [Validators.required, Validators.minLength(1)]],
      'bgtMktExpRate': ['', [Validators.required, Validators.minLength(1)]],
      'localSalesRate': ['', [Validators.required, Validators.minLength(1)]],
      'bgtLocSalesCost': ['', [Validators.required, Validators.minLength(1)]],
      'bgtLocSalesRate': ['', [Validators.required, Validators.minLength(1)]],
      'ipcRdc': ['', [Validators.required, Validators.minLength(1)]],
      'valueAdded': ['', [Validators.required, Validators.minLength(1)]],
      'repairSvc': ['', [Validators.required, Validators.minLength(1)]],
      'sparePart': ['', [Validators.required, Validators.minLength(1)]] 
    });
    
  }
  
  private configureEditForm() {
    this.enabledDetailEntry = false;
    this.tabIndex = 0;

    console.log("configureEditForm", this.data);
    this.dataForm = this.fb.group({
      'rptId': [this.data.rptId],
      'rptSdateY1': ['', [Validators.required, Validators.minLength(1)]], 
      'rptEdateY1': ['', [Validators.required, Validators.minLength(1)]],
      'rptSdateY2': ['', [Validators.required, Validators.minLength(1)]],
      'rptEdateY2': ['', [Validators.required, Validators.minLength(1)]],
      'rptSdateY3': ['', [Validators.required, Validators.minLength(1)]],
      'rptEdateY3': ['', [Validators.required, Validators.minLength(1)]],
      'refNo': [this.data.refNo, [Validators.required, Validators.minLength(1)]],
      'ldate': ['', [Validators.required, Validators.minLength(1)]],
      'lrcptDept': [this.data.lrcptDept, [Validators.required, Validators.minLength(1)]],
      'lrcptBr': [this.data.lrcptBr, [Validators.required, Validators.minLength(1)]],
      'lrcptAdd1': [this.data.lrcptAdd1, [Validators.required, Validators.minLength(1)]],
      'lrcptAdd2': [this.data.lrcptAdd2, [Validators.required, Validators.minLength(1)]],
      'lrcptAdd3': [this.data.lrcptAdd3, [Validators.required, Validators.minLength(1)]],
      'lrcptAdd4': [this.data.lrcptAdd4, [Validators.required, Validators.minLength(1)]],
      'pbbcekNo': [this.data.pbbcekNo, [Validators.required, Validators.minLength(1)]],
      'licenseFee': [this.data.licenseFee, [Validators.required, Validators.minLength(1)]],
      'signedByEmpId': [this.data.signedByEmpId],
      'signedByPos': [this.data.signedByPos, [Validators.required, Validators.minLength(1)]],
      'signedByName': [this.data.signedByName, [Validators.required, Validators.minLength(1)]],
      'signedDate': ['', [Validators.required, Validators.minLength(1)]],
      'appByEmpId': [this.data.appByEmpId],
      'appByPos': [this.data.appByPos, [Validators.required, Validators.minLength(1)]],
      'appByName': [this.data.appByName, [Validators.required, Validators.minLength(1)]],
      'appByIdno': [this.data.appByIdno, [Validators.required, Validators.minLength(1)]], 
      'appDate': [this.data.appDate, [Validators.required, Validators.minLength(1)]],
      'brcptDept': [this.data.brcptDept, [Validators.required, Validators.minLength(1)]],
      'brcptBr': [this.data.brcptBr, [Validators.required, Validators.minLength(1)]],
      'brcptAdd1': [this.data.brcptAdd1, [Validators.required, Validators.minLength(1)]],
      'brcptAdd2': [this.data.brcptAdd2, [Validators.required, Validators.minLength(1)]],
      'brcptAdd3': [this.data.brcptAdd3, [Validators.required, Validators.minLength(1)]],
      'brcptAdd4': [this.data.brcptAdd4, [Validators.required, Validators.minLength(1)]],
      'rptCoName': [this.data.rptCoName, [Validators.required, Validators.minLength(1)]],
      'rptSignedByEmpId': [this.data.rptSignedByEmpId],
      'rptSignedByPos': [this.data.rptSignedByPos, [Validators.required, Validators.minLength(1)]],
      'rptSignedByIdno': [this.data.rptSignedByIdno, [Validators.required, Validators.minLength(1)]],
      'rptSignedByName': [this.data.rptSignedByName, [Validators.required, Validators.minLength(1)]],
      'mfdGoodY1': [this.data.mfdGoodY1, [Validators.required, Validators.minLength(1)]],
      'mfdGoodY2': [this.data.mfdGoodY2, [Validators.required, Validators.minLength(1)]],
      'mfdGoodY3': [this.data.mfdGoodY3, [Validators.required, Validators.minLength(1)]],
      'mfdLicenseSdate': ['', [Validators.required, Validators.minLength(1)]],
      'mfdLicenseEdate': ['', [Validators.required, Validators.minLength(1)]],
      'isChgCoName': [this.data.isChgCoName, [Validators.required, Validators.minLength(1)]],
      'isChgCoMember': [this.data.isChgCoMember, [Validators.required, Validators.minLength(1)]],
      'isChgAddress': [this.data.isChgAddress, [Validators.required, Validators.minLength(1)]],
      'isChgFtyStr': [this.data.isChgFtyStr, [Validators.required, Validators.minLength(1)]],
      'isChgEq': [this.data.isChgEq, [Validators.required, Validators.minLength(1)]],
      'bgtRmcost': [this.data.bgtRmcost, [Validators.required, Validators.minLength(1)]], 
      'bgtRdyGoodCost': [this.data.bgtRdyGoodCost, [Validators.required, Validators.minLength(1)]],
      'mktExpRate': [this.data.mktExpRate, [Validators.required, Validators.minLength(1)]],
      'bgtMktExpCost': [this.data.bgtMktExpCost, [Validators.required, Validators.minLength(1)]],
      'bgtMktExpRate': [this.data.bgtMktExpRate, [Validators.required, Validators.minLength(1)]],
      'localSalesRate': [this.data.localSalesRate, [Validators.required, Validators.minLength(1)]],
      'bgtLocSalesCost': [this.data.bgtLocSalesCost, [Validators.required, Validators.minLength(1)]],
      'bgtLocSalesRate': [this.data.bgtLocSalesRate, [Validators.required, Validators.minLength(1)]],
      'ipcRdc': [this.data.ipcRdc, [Validators.required, Validators.minLength(1)]],
      'valueAdded': [this.data.valueAdded, [Validators.required, Validators.minLength(1)]],
      'repairSvc': [this.data.repairSvc, [Validators.required, Validators.minLength(1)]],
      'sparePart': [this.data.sparePart, [Validators.required, Validators.minLength(1)]] 
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
      this.data.rptLgYexpModel = new Array<RptLgYexpModel>(); 
    }
    
    addDataEntryForm() {
      this.displayDataEntry = true;
    }
    
    setupMainFormForEdit() {
      
      this.formTitle = "Edit Report Lampiran M1 - " + this.data.rptId;
      this.intention = UPDATE;
      
      this.configureEditForm();
       
      let mfdLicenseSdate =  new Date(this.data.mfdLicenseSdate);
      let mfdLicenseEdate =  new Date(this.data.mfdLicenseEdate);
      let rptSdateY1 =  new Date(this.data.rptSdateY1);
      let rptEdateY1 =  new Date(this.data.rptEdateY1);
      let rptSdateY2 =  new Date(this.data.rptSdateY2);
      let rptEdateY2 =  new Date(this.data.rptEdateY2);
      let rptSdateY3 =  new Date(this.data.rptSdateY3);
      let rptEdateY3 =  new Date(this.data.rptEdateY3);
      let ldate =  new Date(this.data.ldate); 
      let signedDate =  new Date(this.data.signedDate);  
      let appDate =  new Date(this.data.appDate);
 
      this.dataForm.get("mfdLicenseSdate").setValue(mfdLicenseSdate);
      this.dataForm.get("mfdLicenseEdate").setValue(mfdLicenseEdate);
      this.dataForm.get("rptSdateY1").setValue(rptSdateY1);
      this.dataForm.get("rptEdateY1").setValue(rptEdateY1);
      this.dataForm.get("rptSdateY2").setValue(rptSdateY2);
      this.dataForm.get("rptEdateY2").setValue(rptEdateY2);
      this.dataForm.get("rptSdateY3").setValue(rptSdateY3);
      this.dataForm.get("rptEdateY3").setValue(rptEdateY3);
      this.dataForm.get("ldate").setValue(ldate); 
      this.dataForm.get("signedDate").setValue(signedDate);  
      this.dataForm.get("appDate").setValue(appDate);
       
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
          this.data = evt.data as RptLgModel;
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
        this.itemEntryModel = new RptLgYexpModel();
        
        if (!this.data.rptLgYexpModel) {
          this.data.rptLgYexpModel = new Array<RptLgYexpModel>();
        }
        
        this.entryDetailForm = this.fb.group({
          'txnId': [this.itemEntryModel.txnId],
          //'wastedCost': [this.itemEntryModel.wastedCost, [Validators.required, Validators.minLength(1)]],
          //'usedCost': [this.itemEntryModel.usedCost, [Validators.required, Validators.minLength(1)]]  
        });
        
        this.entryDetailForm.valueChanges.debounceTime(100).subscribe(
          data => this.onEntryDetailValueChanged(data));
        }
        
        onEntryDetailValueChanged(data?: RptLgYexpModel) {
          
          if (!this.entryDetailForm) { return; }
          
          const form = this.entryDetailForm;
          
          this.itemEntryModel.txnId = data.txnId;
          //this.itemEntryModel.rptId = this.data.rptId;
          //this.itemEntryModel.usedCost = data.usedCost; 
          //this.itemEntryModel.wastedCost = data.wastedCost; 
          
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
        
        onGridRowSave(rowData: RptLgYexpModel, dt: any) {
          
          const prevDataRow = { ...rowData };
          const gridEditItem = this.expandEditForm.value as RptLgYexpModel;
          
          if (gridEditItem) {
            /*rowData.txnId = gridEditItem.txnId;
            rowData.rptId = gridEditItem.rptId;
            rowData.fCustomNo = gridEditItem.fCustomNo;
            rowData.fGstcost = gridEditItem.fGstcost;
            rowData.fImpCost = gridEditItem.fImpCost;
            rowData.fImpDate = gridEditItem.fImpDate;
            rowData.fImpWgt = gridEditItem.fImpWgt;*/ 
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
          const row = rowdata.data as RptLgYexpModel;
          
          // shorthand copy and then used to display on 
          // grid //
          //this.gridEditRow = new RptSkMimpModel();
          //this.gridEditRow = { ...rowdata.data };
          
          //this.pCalendarEditEntryValue = new Date(rowdata.fImpDate);
          // converting date to a valida Date // 
          // this.gridEditRow.fImpDate = new Date(rowdata.fImpDate);
          
          this.configureExpandGridForm(row)
        }
        
        configureExpandGridForm(itemEntryModel: RptLgYexpModel)
        {
          if (itemEntryModel)
          this.expandSelectedRowItem = itemEntryModel
          
          this.expandEditForm = this.fb.group({
            //'rptId': [this.expandSelectedRowItem.rptId],
            //'wastedCost': [this.expandSelectedRowItem.wastedCost, [Validators.required, Validators.minLength(1)]] ,
            //'usedCost': [this.expandSelectedRowItem.usedCost, [Validators.required, Validators.minLength(1)]]
          });
          
         /* if (itemEntryModel.fImpDate && itemEntryModel.fImpDate.length > 0)
            this.expandEditForm.get("fImpDate").setValue(new Date(itemEntryModel.fImpDate));
          else
            this.expandEditForm.get("fImpDate").setValue(new Date());*/
          
        }
        
 

        onEmpChange(id){ 

          this.data.signedByName = ""; 
          this.data.signedByPos = "";

          for (var cRow in this.empRows)
          { 
            if(this.empRows[cRow].empId == id){
              this.data.signedByName = this.empRows[cRow].empName; 

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
          this.dataForm.get("signedByPos").setValue(this.data.signedByPos);  
        }

       

         onEmpAppChange(id){ 

          this.data.appByName = "";
          this.data.appByIdno = "";
          this.data.appByPos = "";

          for (var cRow in this.empRows)
          { 
            if(this.empRows[cRow].empId == id){
              this.data.appByName = this.empRows[cRow].empName;
              this.data.appByIdno = this.empRows[cRow].empIdno;

              for (var jRow in this.jobTitleRows)
              {
                if(this.empRows[cRow].jobTitleId == this.jobTitleRows[jRow].jobTitleId)
                {
                   this.data.appByPos = this.jobTitleRows[jRow].jobTitleName;
                   break; 
                }

              }
              
              break;
            }
    
          }

          this.dataForm.get("appdByName").setValue(this.data.appByName); 
          this.dataForm.get("appdByIdno").setValue(this.data.appByIdno); 
          this.dataForm.get("appdByPos").setValue(this.data.appByPos);  
        }
        
      }


