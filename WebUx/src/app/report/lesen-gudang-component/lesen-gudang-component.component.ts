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
  currentCutOffMonth:number = 1; 
  mfdGoodList:string = "";
  
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
    'appCoName': '',
    'appAdd1': '',
    'appAdd2': '',
    'appAdd3': '',
    'appAdd4': '',
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
    //'mfdGoodY1': '',
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
    'rptSdateY1' : { 'required': 'Current Year - From is required.' }, 
    'rptEdateY1' : { 'required': 'Current Year - To is required.' }, 
    'rptSdateY2' : { 'required': 'Last Year - From is required.' }, 
    'rptEdateY2' : { 'required': 'Last Year - To is required.' }, 
    'rptSdateY3' : { 'required': 'Next Year - From is required.' }, 
    'rptEdateY3' : { 'required': 'Next Year - To is required.' }, 
    'refNo' : { 'required': 'Reference No is required.' }, 
    'ldate' : { 'required': 'Date of Letter is required.' }, 
    'lrcptDept' : { 'required': 'Department is required.' }, 
    'lrcptBr' : { 'required': 'Branch is required.' }, 
    'lrcptAdd1' : { 'required': 'Address is required.' }, 
    'lrcptAdd2' : { 'required': 'Address is required.' }, 
    'lrcptAdd3' : { 'required': 'Address is required.' }, 
    'lrcptAdd4' : { 'required': 'Address is required.' }, 
    'pbbcekNo' : { 'required': 'PBB Cek No. is required.' }, 
    'licenseFee' : { 'required': 'License Fee is required.' },  
    'signedByPos' : { 'required': 'Position is required.' }, 
    'signedByName' : { 'required': 'Name is required.' }, 
    'signedDate' : { 'required': 'Signed Date is required.' }, 
    'appCoName' : { 'required': 'Company Name is required.' },
    'appAdd1' : { 'required': 'Address is required.' },      
    'appAdd2' : { 'required': 'Address is required.' },      
    'appAdd3' : { 'required': 'Address is required.' },      
    'appAdd4' : { 'required': 'Address is required.' },      
    'appByPos' : { 'required': 'Position is required.' }, 
    'appByName' : { 'required': 'Name is required.' }, 
    'appByIdno' : { 'required': 'IC is required.' },  
    'appDate' : { 'required': 'Application Date is required.' }, 
    'brcptDept' : { 'required': 'Department is required.' }, 
    'brcptBr' : { 'required': 'Branch is required.' }, 
    'brcptAdd1' : { 'required': 'Address is required.' }, 
    'brcptAdd2' : { 'required': 'Address is required.' }, 
    'brcptAdd3' : { 'required': 'Address is required.' }, 
    'brcptAdd4' : { 'required': 'Address is required.' }, 
    'rptCoName' : { 'required': 'Company Name is required.' },  
    'rptSignedByPos' : { 'required': 'Position is required.' }, 
    'rptSignedByIdno' : { 'required': 'IC is required.' }, 
    'rptSignedByName' : { 'required': 'Name is required.' },  
    'mfdGoodY2' : { 'required': 'Good list is required.' }, 
    'mfdGoodY3' : { 'required': 'Good list is required.' }, 
    'mfdLicenseSdate' : { 'required': 'License Start Date is required.' }, 
    'mfdLicenseEdate' : { 'required': 'License End Date is required.' }, 
    'isChgCoName' : { 'required': 'required.' }, 
    'isChgCoMember' : { 'required': 'required.' }, 
    'isChgAddress' : { 'required': 'required.' }, 
    'isChgFtyStr' : { 'required': 'required.' }, 
    'isChgEq' : { 'required': 'required.' }, 
    'bgtRmcost' : { 'required': 'required.' },  
    'bgtRdyGoodCost' : { 'required': 'required.' }, 
    'mktExpRate' : { 'required': 'required.' }, 
    'bgtMktExpCost' : { 'required': 'required.' }, 
    'bgtMktExpRate' : { 'required': 'required.' }, 
    'localSalesRate' : { 'required': 'required.' }, 
    'bgtLocSalesCost' : { 'required': 'required.' }, 
    'bgtLocSalesRate' : { 'required': 'required.' }, 
    'ipcRdc' : { 'required': 'required.' }, 
    'valueAdded' : { 'required': 'required.' }, 
    'repairSvc' : { 'required': 'required.' }, 
    'sparePart' : { 'required': 'required.' }, 
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
    
    this.data.appCoName = mainFormModel.appCoName;
    this.data.appAdd1 = mainFormModel.appAdd1;
    this.data.appAdd2 = mainFormModel.appAdd2;
    this.data.appAdd3 = mainFormModel.appAdd3;
    this.data.appAdd4 = mainFormModel.appAdd4;

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
    //this.data.mfdGoodY1 = mainFormModel.mfdGoodY1;
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

  testSave(){
    var json = { "rptId": 6, "rptSdateY1": "2016-12-31T16:00:00.000Z", "rptEdateY1": "2017-12-30T16:00:00.000Z", "rptSdateY2": "2017-12-31T16:00:00.000Z", "rptEdateY2": "2018-09-30T16:00:00.000Z", "rptSdateY3": "2018-12-31T16:00:00.000Z", "rptEdateY3": "2019-12-30T16:00:00.000Z", "refNo": "ABC(1)GHH45435345 (83)", "ldate": "2018-01-08T16:00:00.000Z", "lrcptDept": "Penolong Kanan Pengarah Kastam", "lrcptBr": "Cawangan Gudang Pengilangan Berlesen", "lrcptAdd1": "Tingkat 2, Kompleks Kastam Seberang Jaya,", "lrcptAdd2": "Lot 5492, M.K.1, Jalan Perpustakaan, Lebuh Tenggiri 2,", "lrcptAdd3": "13700 Seberang Perai Tengah,", "lrcptAdd4": "Pulau Pinang.", "pbbcekNo": "39196578", "licenseFee": 4900, "signedByEmpId": 1, "signedByPos": "Pengarah", "signedByName": "Yeoh Paik Sun", "signedDate": "2018-01-09T16:00:00.000Z", "appByEmpId": "1", "appByPos": "Pengurus", "appByName": "Yeoh Phaik Suan", "appByIdno": "600516-07-5038", "appDate": "2018-01-08T16:00:00.000Z", "brcptDept": "dgsgdg gdfgdfgdfg", "brcptBr": "brach 34234", "brcptAdd1": "address 1", "brcptAdd2": "address 2", "brcptAdd3": "address 3", "brcptAdd4": "address 14", "rptCoName": "PTS Industries Sdn. Bhd.", "rptSignedByEmpId": 1, "rptSignedByPos": "Pengarah", "rptSignedByIdno": "5908065-12-9089", "rptSignedByName": "Yeoh Phaik Suan", "mfdGoodY2": "aaa, bbb, ccc, ddd", "mfdGoodY3": "aaa, bbb, ccc, ddd", "mfdLicenseSdate": "2016-12-31T16:00:00.000Z", "mfdLicenseEdate": "2018-12-30T16:00:00.000Z", "isChgCoName": true, "isChgCoMember": true, "isChgAddress": true, "isChgFtyStr": true, "isChgEq": true, "bgtRmcost": 900890, "bgtRdyGoodCost": 234, "mktExpRate": 1.5, "bgtMktExpCost": 678.9, "bgtMktExpRate": 45.95, "localSalesRate": 67.8, "bgtLocSalesCost": 4500, "bgtLocSalesRate": 45.6, "ipcRdc": "testing IPC", "valueAdded": "eqw", "repairSvc": "Light fixing", "sparePart": "eqwe" };
    
    var strJson = JSON.stringify(json); 
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

            if( (configDataInfo.moduleId == 1 && configDataInfo.id == 2) || (configDataInfo.moduleId == 0 && configDataInfo.id == 0)) 
            {
                        configDataList.push({   
                          configId : configDataInfo.configId,
                          configKey : configDataInfo.configKey,
                          configData : configDataInfo.configData 
                        }); 
            }
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

        else if(this.configRows[cRow].configKey == "BRcptAdd1") 
            this.data.brcptAdd1 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "BRcptAdd2") 
            this.data.brcptAdd2 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "BRcptAdd3") 
            this.data.brcptAdd3 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "BRcptAdd4") 
            this.data.brcptAdd4 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "BRcptDept") 
            this.data.brcptDept = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "BRcptBr") 
            this.data.brcptBr = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "CurrentCutOffMonth") 
            this.currentCutOffMonth = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "MfdGoodList") 
            this.mfdGoodList = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "CoName") {
            this.data.rptCoName = this.configRows[cRow].configData;
            this.data.appCoName = this.configRows[cRow].configData;
        }
        else if(this.configRows[cRow].configKey == "CoAdd1") 
            this.data.appAdd1 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "CoAdd2") 
            this.data.appAdd2 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "CoAdd3") 
            this.data.appAdd3 = this.configRows[cRow].configData;
        else if(this.configRows[cRow].configKey == "CoAdd4") 
            this.data.appAdd4 = this.configRows[cRow].configData;
  
      }

     
      this.setReportDate(new Date());
 
      this.dataForm.get("mfdGoodY2").setValue(this.mfdGoodList);
      this.dataForm.get("mfdGoodY3").setValue(this.mfdGoodList);  

      this.dataForm.get("lrcptAdd1").setValue(this.data.lrcptAdd1); 
      this.dataForm.get("lrcptAdd2").setValue(this.data.lrcptAdd2); 
      this.dataForm.get("lrcptAdd3").setValue(this.data.lrcptAdd3); 
      this.dataForm.get("lrcptAdd4").setValue(this.data.lrcptAdd4); 
      this.dataForm.get("lrcptDept").setValue(this.data.lrcptDept);
      this.dataForm.get("lrcptBr").setValue(this.data.lrcptBr);

      this.dataForm.get("brcptAdd1").setValue(this.data.brcptAdd1); 
      this.dataForm.get("brcptAdd2").setValue(this.data.brcptAdd2); 
      this.dataForm.get("brcptAdd3").setValue(this.data.brcptAdd3); 
      this.dataForm.get("brcptAdd4").setValue(this.data.brcptAdd4); 
      this.dataForm.get("brcptDept").setValue(this.data.brcptDept);
      this.dataForm.get("brcptBr").setValue(this.data.brcptBr);

      this.dataForm.get("rptCoName").setValue(this.data.rptCoName);
      this.dataForm.get("appCoName").setValue(this.data.appCoName);
      this.dataForm.get("appAdd1").setValue(this.data.appAdd1);
      this.dataForm.get("appAdd2").setValue(this.data.appAdd2);
      this.dataForm.get("appAdd3").setValue(this.data.appAdd3);
      this.dataForm.get("appAdd4").setValue(this.data.appAdd4);
  }
    
  setReportDate(dt){
      var cDt = dt;
      let cYr = cDt.getFullYear();  
      let pYr = cYr-1; 
      let nYr = cYr+1; 
      let cSDate = new Date(cYr + "-1-1"); 
      let cEDate = new Date(cYr + "-" + this.currentCutOffMonth + "-31"); 
      let pSDate = new Date(pYr + "-1-1"); 
      let pEDate = new Date(pYr + "-12-31"); 
      let nSDate = new Date(nYr + "-1-1"); 
      let nEDate = new Date(nYr + "-12-31");  

      this.dataForm.get("rptSdateY1").setValue(pSDate);
      this.dataForm.get("rptEdateY1").setValue(pEDate);
      this.dataForm.get("rptSdateY2").setValue(cSDate);
      this.dataForm.get("rptEdateY2").setValue(cEDate);
      this.dataForm.get("rptSdateY3").setValue(nSDate);
      this.dataForm.get("rptEdateY3").setValue(nEDate);

  }

  onSelectRptSdateY2(evt) {
        
        debugger; 
        if (evt) {
          this.setReportDate(new Date(evt));
          console.log("onSelectRptSdateY2",evt);
        } 
        
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
      'appCoName': ['', [Validators.required, Validators.minLength(1)]],
      'appAdd1': ['', [Validators.required, Validators.minLength(1)]],
      'appAdd2': ['', [Validators.required, Validators.minLength(1)]],
      'appAdd3': ['', [Validators.required, Validators.minLength(1)]],
      'appAdd4': ['', [Validators.required, Validators.minLength(1)]],
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
      //'mfdGoodY1': ['', [Validators.required, Validators.minLength(1)]],
      'mfdGoodY2': ['', [Validators.required, Validators.minLength(1)]],
      'mfdGoodY3': ['', [Validators.required, Validators.minLength(1)]],
      'mfdLicenseSdate': ['', [Validators.required, Validators.minLength(1)]],
      'mfdLicenseEdate': ['', [Validators.required, Validators.minLength(1)]],
      'isChgCoName': [false],
      'isChgCoMember': [false],
      'isChgAddress': [false],
      'isChgFtyStr': [false],
      'isChgEq': [false],
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
      'appCoName': [this.data.appCoName, [Validators.required, Validators.minLength(1)]],
      'appAdd1': [this.data.appAdd1, [Validators.required, Validators.minLength(1)]],
      'appAdd2': [this.data.appAdd2, [Validators.required, Validators.minLength(1)]],
      'appAdd3': [this.data.appAdd3, [Validators.required, Validators.minLength(1)]],
      'appAdd4': [this.data.appAdd4, [Validators.required, Validators.minLength(1)]],
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
      //'mfdGoodY1': [this.data.mfdGoodY1, [Validators.required, Validators.minLength(1)]],
      'mfdGoodY2': [this.data.mfdGoodY2, [Validators.required, Validators.minLength(1)]],
      'mfdGoodY3': [this.data.mfdGoodY3, [Validators.required, Validators.minLength(1)]],
      'mfdLicenseSdate': ['', [Validators.required, Validators.minLength(1)]],
      'mfdLicenseEdate': ['', [Validators.required, Validators.minLength(1)]],
      'isChgCoName': [this.data.isChgCoName],
      'isChgCoMember': [this.data.isChgCoMember],
      'isChgAddress': [this.data.isChgAddress],
      'isChgFtyStr': [this.data.isChgFtyStr],
      'isChgEq': [this.data.isChgEq],
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
      
      this.formTitle = "New Report Lesen Gudang";
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
      
      this.formTitle = "Edit Report Lesen Gudang - " + this.data.rptId;
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

          this.dataForm.get("appByName").setValue(this.data.appByName); 
          this.dataForm.get("appByIdno").setValue(this.data.appByIdno); 
          this.dataForm.get("appByPos").setValue(this.data.appByPos);  
        }

        onEmpRptChange(id){ 

          this.data.rptSignedByName = "";
          this.data.rptSignedByIdno = "";
          this.data.rptSignedByPos = "";

          for (var cRow in this.empRows)
          { 
            if(this.empRows[cRow].empId == id){
              this.data.rptSignedByName = this.empRows[cRow].empName;
              this.data.rptSignedByIdno = this.empRows[cRow].empIdno;

              for (var jRow in this.jobTitleRows)
              {
                if(this.empRows[cRow].jobTitleId == this.jobTitleRows[jRow].jobTitleId)
                {
                   this.data.rptSignedByPos = this.jobTitleRows[jRow].jobTitleName;
                   break; 
                }

              }
              
              break;
            }
    
          }

          this.dataForm.get("rptSignedByName").setValue(this.data.rptSignedByName); 
          this.dataForm.get("rptSignedByIdno").setValue(this.data.rptSignedByIdno); 
          this.dataForm.get("rptSignedByPos").setValue(this.data.rptSignedByPos);  
        }


        
      }


