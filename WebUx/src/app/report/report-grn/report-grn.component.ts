import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState,  ADD, UPDATE, GRN_SAVE, GRN_GET_OK, GRN_GET,  
UOM_GET, UOM_GET_OK, GRN_SAVE_SUCCESS,
COMPONENT_GET, COMPONENT_GET_OK, 
CURRENCY_GET, CURRENCY_GET_OK, 
RAW_MATERIAL_GET, RAW_MATERIAL_GET_OK,
SUPPLIER_GET, SUPPLIER_GET_OK,
STNCUSTOM_GET, STNCUSTOM_GET_OK } from '../../sharedObjects/sharedMessages';
import { GrnModel } from "../../model/GrnModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
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
  

@Component({
  selector: 'app-report-grn',
  templateUrl: './report-grn.component.html',
  styleUrls: ['./report-grn.component.css']
})



export class ReportGrnComponent implements OnInit {

  private data: GrnModel = new GrnModel();
  private uomData: UomModel = new UomModel();
  private componentData: ComponentModel = new ComponentModel();
  private currencyData: CurrencyModel = new CurrencyModel();
  private stncustomData: StncustomModel = new StncustomModel();
  private supplierData: SupplierModel = new SupplierModel();
  private rmData: RawMaterialModel = new RawMaterialModel();
  private dataForm: FormGroup;
  private intention : number = UPDATE;
  
  display: boolean = false; 
  formTitle: string = "New GRN"; 
  dataList : Array<any> = new Array<any>(); 
  //uomDataList : Array<any> = new Array<any>(); 
  componentDataList : Array<any> = new Array<any>(); 
  currencyDataList : Array<any> = new Array<any>(); 
  stncustomDataList : Array<any> = new Array<any>(); 
  supplierDataList : Array<any> = new Array<any>(); 
  rmDataList : Array<any> = new Array<any>(); 


  formErrors = {
    'grnid': '',
    'grndate': '',
    'lotno': '', 
    'supplierId':'', 
    'rmid':'',  
    'height':'',
    'heightUom':'',
    'width':'',
    'widthUom':'',
    'thick':'',
    'thickUom':'',
    'wgt':'',
    'roll':'',
    'rollUom':'',
    'dom':'',
    'dono':'',
    'stncustomId':'',
    'componentId':'',
    'kaswgt':'',
    'dutyImp':'',
    'gst':'',
    'cif':'',
    'customDate':'',
    'customNo':'',
    'invoiceNo':'',
    'currencyId':'',
    'amountCurrency':'',
    'exRate':'',
    'amount':'',
    'pono':'',
    'otdlate':'',
    'fwdInvNo':'',
    'amt':'',
    'forwarder':'',
    'docRefNo':'',
    'vcarno':'',
    'impFreight':'',
    'currencyAdj':'',
    'termChrg':'',
    'aprtTxFee':'',
    'delivery':'',
    'handFwd':'',
    'customExamFee':'',
    'collectFee':'',
    'cargoPrmt':'',
    'docFee':'',
    'breakBulk':'',
    'edifee':'',
    'freightGst':'',
    'totalFreightCost': '', 
    'totalFreightRmcost': ''
  };

  
   
  itemSelected : boolean = false;
    
 
  
  validationMessages = {    
    'grndate': {
      'required': 'Date is required.' 
    },
    'lotno': {
      'required': 'LOT No is required.' 
    },
    'supplierId': {
      'required': 'Supplier is required.' ,
      'min': 'Supplier is required.'
    },
    'rmid': {
      'required': 'Raw Material is required.',
      'min': 'Raw Material is required.'  
    },
    'height': {
      'required': 'Height is required.' 
    },
    'heightUom': {
      'required': 'Height\'s UOM is required.',
      'min': 'Height\'s UOM is required.' 
    },
    'width': {
      'required': 'Width is required.' 
    },
    'widthUom': {
      'required': 'Width\'s UOM is required.',
      'min': 'Width\'s UOM is required.' 
    },
    'thick': {
      'required': 'Thickness is required.' 
    },
    'thickUom': {
      'required': 'Thickness\'s UOM is required.',
      'min': 'Thickness\'s UOM is required.' 
    },
    'wgt': {
      'required': 'WT is required.' 
    },
    'roll': {
      'required': 'Qty (Roll) is required.' 
    },
    'rollUom': {
      'required': 'Qty (Roll)\'s UOM is required.',
      'min': 'Qty (Roll)\'s UOM is required.' 
    },
    'dom': {
      'required': 'DOM is required.' 
     },
    'dono': {
      'required': 'INV No. / DO No. is required.' 
     },
    'stncustomId': {
      'required': 'STN KASTAM is required.' ,
      'min': 'STN KASTAM is required.' 
     },
    'componentId': {
      'required': 'Material / Component is required.',
      'min': 'Material / Component is required.' 
     },
    'kaswgt': {
      'required': 'KAST WT is required.' 
     },
    'dutyImp': {
      'required': 'Duti Import is required.' 
     },
    'gst': {
      'required': 'GST 6% is required.' 
     },
    'cif': {
      'required': 'CIF Value is required.' 
     },
    'customDate': {
      'required': 'Kastam Date is required.' 
     },
    'customNo': {
      'required': 'Kastam No. is required.'
     },
    'invoiceNo': {
      'required': 'Invoice No is required.' 
     },
    'currencyId': {
      'required': 'Currency  is required.',
      'min': 'Currency is required.'
     },
    'amountCurrency': {
      'required': 'Amount Currency is required.' 
     },
    'exRate': {
      'required': 'ExRate  is required.' 
     },
    'amount': {
      'required': 'Amount is required.' 
    },
    'pono': {
      'required': 'PO No. is required.' 
    },
    'otdlate': {
      'required': 'OTD / LATE is required.'
    },
    'fwdInvNo': {
      'required': 'Forworder Billing Inv. No. is required.'
    },
    'amt': {
      'required': 'AMT is required.'
    },
    'forwarder': {
      'required': 'Forwarder is required.'
    },
    'docRefNo': {
      'required': 'DOC. Ref. No. is required.'
    },
    'vcarno': {
      'required': 'VCAR No. is required.'
    },
    'impFreight': {
      'required': 'Import Freight is required.'
    }, 
    'termChrg': {
      'required': 'Terminal Charge is required.'
    },
    'aprtTxFee': {
      'required': 'Airport Transfer Fee  is required.'
    },
    'delivery': {
      'required': 'Delivery is required.'
    },
    'handFwd': {
      'required': 'Handling / Forwarding is required.'
    },
    'customExamFee': {
      'required': 'Custom Exam.Fee / FCZ is required.'
    },
    'collectFee': {
      'required': 'Collection Fee / Forklift is required.'
    },
    'cargoPrmt': {
      'required': 'Cargo Permit is required.'
    },
    'docFee': {
      'required': 'Doc. Fee is required.'
    },
    'breakBulk': {
      'required': 'Break Bulk is required.'
    },
    'edifee': {
      'required': 'EDI Fee (Road) is required.'
    },
    'freightGst': {
      'required': '6% GST is required.'
    }  

  };

  userSubscription : Subscription;
  
  rows = [];
  uomRows = [];
  uomRow = [];
  componentRows = [];
  stncustomRows = [];
  currencyRows = [];
  rmRows = [];
  supplierRows = []; 

  columns = [
    { prop: 'grnid', name : 'Id' },
    { prop: 'grndate', name : 'Date' },
    { prop: 'lotno', name : 'LOT No' },
    { prop: 'customNo', name : 'KASTAM No' },
    { prop: 'amount', name : 'Raw Mat. Amt' },
    { prop: 'totalFreightCost', name : 'Freight Cost' },
    { prop: 'totalFreightRmcost', name : 'Total Freight  & Raw Mat. Cost' }      
  ];

  constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }

  
  totalRMCost() {
    return this.data.amountCurrency * this.data.exRate;
  }

  name : string; 
  description : string; 

  ngOnInit() {

    this.userSubscription = this.store.subscribe(appData => {   
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, GRN_SAVE_SUCCESS), GRN_SAVE_SUCCESS));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, GRN_GET_OK), GRN_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, UOM_GET_OK), UOM_GET_OK)); 
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, COMPONENT_GET_OK), COMPONENT_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, CURRENCY_GET_OK), CURRENCY_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, STNCUSTOM_GET_OK), STNCUSTOM_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SUPPLIER_GET_OK), SUPPLIER_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, RAW_MATERIAL_GET_OK), RAW_MATERIAL_GET_OK));
    }); 
 
     this.configureEditForm();
  }
  
  ngAfterViewInit() {

    this.dispatchIntent(GRN_GET);
    this.dispatchIntent(UOM_GET);
    this.dispatchIntent(COMPONENT_GET);
    this.dispatchIntent(CURRENCY_GET);
    this.dispatchIntent(STNCUSTOM_GET);
    this.dispatchIntent(SUPPLIER_GET);
    this.dispatchIntent(RAW_MATERIAL_GET);
 }
  
  save()
  {
        var saveJson = new GrnModel();

        if (this.intention == ADD)
        {
             saveJson = this.dataForm.value as GrnModel;
        }
        else {
            saveJson.grnid = this.data.grnid;
            saveJson.grndate = this.data.grndate;
            saveJson.lotno = this.data.lotno;
            saveJson.supplierId = this.data.supplierId; 
            saveJson.rmid = this.data.rmid;  
            saveJson.height = this.data.height;
            saveJson.heightUom = this.data.heightUom;
            saveJson.width = this.data.width;
            saveJson.widthUom = this.data.widthUom;
            saveJson.thick = this.data.thick;
            saveJson.thickUom = this.data.thickUom;
            saveJson.wgt = this.data.wgt;
            saveJson.roll = this.data.roll;
            saveJson.rollUom = this.data.rollUom;
            saveJson.dom = this.data.dom;
            saveJson.dono = this.data.dono;
            saveJson.stncustomId = this.data.stncustomId;
            saveJson.componentId = this.data.componentId;
            saveJson.kaswgt = this.data.kaswgt;
            saveJson.dutyImp = this.data.dutyImp;
            saveJson.gst = this.data.gst;
            saveJson.cif = this.data.cif;
            saveJson.customDate = this.data.customDate;
            saveJson.customNo = this.data.customNo;
            saveJson.invoiceNo = this.data.invoiceNo;
            saveJson.currencyId = this.data.currencyId;
            saveJson.amountCurrency = this.data.amountCurrency;
            saveJson.exRate = this.data.exRate;
            saveJson.amount = this.data.amount;
            saveJson.pono = this.data.pono;
            saveJson.otdlate = this.data.otdlate;
            saveJson.fwdInvNo = this.data.fwdInvNo;
            saveJson.amt = this.data.amt;
            saveJson.forwarder = this.data.forwarder;
            saveJson.docRefNo = this.data.docRefNo;
            saveJson.vcarno = this.data.vcarno;
            saveJson.impFreight = this.data.impFreight;
            saveJson.currencyAdj = this.data.currencyAdj;
            saveJson.termChrg = this.data.termChrg;
            saveJson.aprtTxFee = this.data.aprtTxFee;
            saveJson.delivery = this.data.delivery;
            saveJson.handFwd = this.data.handFwd;
            saveJson.customExamFee = this.data.customExamFee;
            saveJson.collectFee = this.data.collectFee;
            saveJson.cargoPrmt = this.data.cargoPrmt;
            saveJson.docFee = this.data.docFee;
            saveJson.breakBulk = this.data.breakBulk;
            saveJson.edifee = this.data.edifee;
            saveJson.freightGst = this.data.freightGst;
            saveJson.totalFreightCost = this.data.totalFreightCost;
            saveJson.totalFreightRmcost = this.data.totalFreightRmcost;
      }
        
        var strJson = JSON.stringify(saveJson);      
    //this.dispatchIntent(GRN_GET);     
        this.dispatchIntent(GRN_SAVE, saveJson);
        
        console.log("strJson",strJson);
        this.display = false; 
        
  } 

  testsave(){
     var j= { "grnid": "", "grndate": "2018-01-01T16:00:00.000Z", "lotno": "xx4234234", "supplierId": 1, "rmid": 1, "height": 1, "heightUom": 1, "width": 2, "widthUom": 1, "thick": 3, "thickUom": 1, "wgt": 4, "roll": 5, "rollUom": 1, "dom": "2018-01-17T16:00:00.000Z", "dono": "abc11111", "stncustomId": 1, "componentId": 1, "kaswgt": 6, "dutyImp": 7, "gst": 8, "cif": 9, "customDate": "2017-01-18T16:00:00.000Z", "customNo": "23234234", "invoiceNo": "tb45345", "currencyId": 1, "amountCurrency": 10, "exRate": 0.9, "amount": 9, "pono": "po3234234", "otdlate": "late otd", "fwdInvNo": "inv23123123", "amt": 12, "forwarder": "ewrwre", "docRefNo": "doc234234", "vcarno": "d3432423", "impFreight": 13, "currencyAdj": "NA", "termChrg": 15, "aprtTxFee": 16, "delivery": 17, "handFwd": 18, "customExamFee": 19, "collectFee": 20, "cargoPrmt": "21", "docFee": 22, "breakBulk": 2256456, "edifee": 23, "freightGst": 24, "totalFreightCost": 2256643, "totalFreightRmcost": 2256652 };
      this.dispatchIntent(GRN_SAVE, j);
  }


   /* private initForm() {
      this.dataForm = this.fb.group({
        'grndate': [this.data.grndate, [Validators.required, Validators.minLength(1)]], 
        'lotno': [this.data.lotno, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]], 
        'supplierId': [this.data.supplierId, [Validators.required, Validators.minLength(1)]], 
        'rmid': [this.data.rmid, [Validators.required, Validators.minLength(1)]],  
        'height': [this.data.height, [Validators.required, Validators.minLength(1)]],
        'heightUom': [this.data.heightUom, [Validators.required, Validators.minLength(1)]],
        'width': [this.data.width, [Validators.required, Validators.minLength(1)]],
        'widthUom': [this.data.widthUom, [Validators.required, Validators.minLength(1)]],
        'thick': [this.data.thick, [Validators.required, Validators.minLength(1)]],
        'thickUom': [this.data.thickUom, [Validators.required, Validators.minLength(1)]],
        'wgt': [this.data.wgt, [Validators.required, Validators.minLength(1)]],
        'roll': [this.data.roll, [Validators.required, Validators.minLength(1)]],
        'rollUom': [this.data.rollUom, [Validators.required, Validators.minLength(1)]],
        'dom': [this.data.dom, [Validators.required, Validators.minLength(1)]],
        'dono': [this.data.dono, [Validators.required, Validators.minLength(1)]],
        'stncustomId': [this.data.stncustomId, [Validators.required, Validators.minLength(1)]],
        'componentId': [this.data.componentId, [Validators.required, Validators.minLength(1)]],
        'kaswgt': [this.data.kaswgt, [Validators.required, Validators.minLength(1)]],
        'dutyImp': [this.data.dutyImp, [Validators.required, Validators.minLength(1)]],
        'gst': [this.data.gst, [Validators.required, Validators.minLength(1)]],
        'cif': [this.data.cif, [Validators.required, Validators.minLength(1)]],
        'customDate': [this.data.customDate, [Validators.required, Validators.minLength(1)]],
        'customNo': [this.data.customNo, [Validators.required, Validators.minLength(1)]],
        'invoiceNo': [this.data.invoiceNo, [Validators.required, Validators.minLength(1)]],
        'currencyId': [this.data.currencyId, [Validators.required, Validators.minLength(1)]],
        'amountCurrency': [this.data.amountCurrency, [Validators.required, Validators.minLength(1)]],
        'exRate': [this.data.exRate, [Validators.required, Validators.minLength(1)]],
        'amount': [this.data.amount, [Validators.required, Validators.minLength(1)]],
        'pono': [this.data.pono, [Validators.required, Validators.minLength(1)]],
        'otdlate': [this.data.otdlate, [Validators.required, Validators.minLength(1)]],
        'fwdInvNo': [this.data.fwdInvNo, [Validators.required, Validators.minLength(1)]],
        'amt': [this.data.amt, [Validators.required, Validators.minLength(1)]],
        'forwarder': [this.data.forwarder, [Validators.required, Validators.minLength(1)]],
        'docRefNo': [this.data.docRefNo, [Validators.required, Validators.minLength(1)]],
        'vcarno': [this.data.vcarno, [Validators.required, Validators.minLength(1)]],
        'impFreight': [this.data.impFreight, [Validators.required, Validators.minLength(1)]],
        'currencyAdj': [this.data.currencyAdj, [Validators.required, Validators.minLength(1)]],
        'termChrg': [this.data.termChrg, [Validators.required, Validators.minLength(1)]],
        'aprtTxFee': [this.data.aprtTxFee, [Validators.required, Validators.minLength(1)]],
        'delivery': [this.data.delivery, [Validators.required, Validators.minLength(1)]],
        'handFwd': [this.data.handFwd, [Validators.required, Validators.minLength(1)]],
        'customExamFee': [this.data.customExamFee, [Validators.required, Validators.minLength(1)]],
        'collectFee': [this.data.collectFee, [Validators.required, Validators.minLength(1)]],
        'cargoPrmt': [this.data.cargoPrmt, [Validators.required, Validators.minLength(1)]],
        'docFee': [this.data.docFee, [Validators.required, Validators.minLength(1)]],
        'breakBulk': [this.data.breakBulk, [Validators.required, Validators.minLength(1)]],
        'edifee': [this.data.edifee, [Validators.required, Validators.minLength(1)]],
        'freightGst': [this.data.freightGst, [Validators.required, Validators.minLength(1)]],
        'totalFreightCost': [this.data.totalFreightCost, [Validators.required, Validators.minLength(1)]],
        'totalFreightRmcost': [this.data.totalFreightRmcost, [Validators.required, Validators.minLength(1)]]
      });
      console.log( this.dataForm);
      this.dataForm.valueChanges.debounceTime(100)
        .subscribe(data => this.onValueChanged(data));
    }*/

    onValueChanged(data?: GrnModel) {

      console.log('test1');
      if (!this.dataForm) { return; }
  
      console.log('test');
      const form = this.dataForm; 
      this.data.grnid = data.grnid;
      this.data.grndate = data.grndate;
      this.data.lotno = data.lotno;
      this.data.supplierId = data.supplierId; 
      this.data.rmid = data.rmid;  
      this.data.height = data.height;
      this.data.heightUom = data.heightUom;
      this.data.width = data.width;
      this.data.widthUom = data.widthUom;
      this.data.thick = data.thick;
      this.data.thickUom = data.thickUom;
      this.data.wgt = data.wgt;
      this.data.roll = data.roll;
      this.data.rollUom = data.rollUom;
      this.data.dom = data.dom;
      this.data.dono = data.dono;
      this.data.stncustomId = data.stncustomId;
      this.data.componentId = data.componentId;
      this.data.kaswgt = data.kaswgt;
      this.data.dutyImp = data.dutyImp;
      this.data.gst = data.gst;
      this.data.cif = data.cif;
      this.data.customDate = data.customDate;
      this.data.customNo = data.customNo;
      this.data.invoiceNo = data.invoiceNo;
      this.data.currencyId = data.currencyId;
      this.data.amountCurrency = data.amountCurrency;
      this.data.exRate = data.exRate;
      this.data.amount = data.amountCurrency * data.exRate;
      this.data.pono = data.pono;
      this.data.otdlate = data.otdlate;
      this.data.fwdInvNo = data.fwdInvNo;
      this.data.amt = data.amt;
      this.data.forwarder = data.forwarder;
      this.data.docRefNo = data.docRefNo;
      this.data.vcarno = data.vcarno;
      this.data.impFreight = data.impFreight;
      this.data.currencyAdj = data.currencyAdj;
      this.data.termChrg = data.termChrg;
      this.data.aprtTxFee = data.aprtTxFee;
      this.data.delivery = data.delivery;
      this.data.handFwd = data.handFwd;
      this.data.customExamFee = data.customExamFee;
      this.data.collectFee = data.collectFee;
      this.data.cargoPrmt = data.cargoPrmt;
      this.data.docFee = data.docFee;
      this.data.breakBulk = data.breakBulk;
      this.data.edifee = data.edifee;
      this.data.freightGst = data.freightGst;
      this.data.totalFreightCost = data.impFreight + data.termChrg + 
      data.aprtTxFee + data.delivery + data.handFwd + data.customExamFee + data.collectFee + 
      data.docFee + data.breakBulk + data.edifee + data.freightGst;
      this.data.totalFreightRmcost = data.amount + data.totalFreightCost;

      this.dataForm.get("amount").setValue(this.data.amount);
      this.dataForm.get("totalFreightCost").setValue(this.data.totalFreightCost);
      this.dataForm.get("totalFreightRmcost").setValue(this.data.totalFreightRmcost);
      this.dataForm.get("currencyAdj").setValue("NA");

      
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

      if (message && message.type == GRN_GET_OK)
      {
        this.rows.length = 0;
        for (var idx in message.data)
        {
          var dataInfo = message.data[idx] as GrnModel;    
          this.dataList.push({   
            grnid : dataInfo.grnid,
            grndate : new Date(dataInfo.grndate),
            lotno : dataInfo.lotno,
            supplierId : dataInfo.supplierId,
            rmid : dataInfo.rmid,
            height : dataInfo.height,
            heightUom : dataInfo.heightUom,
            width : dataInfo.width,
            widthUom : dataInfo.widthUom,
            thick : dataInfo.thick,
            thickUom : dataInfo.thickUom,
            wgt : dataInfo.wgt,
            roll : dataInfo.roll,
            rollUom : dataInfo.rollUom,
            dom : new Date(dataInfo.dom),
            dono : dataInfo.dono,
            stncustomId : dataInfo.stncustomId,
            componentId : dataInfo.componentId,
            kaswgt : dataInfo.kaswgt,
            dutyImp : dataInfo.dutyImp,
            gst : dataInfo.gst,
            cif : dataInfo.cif,
            customDate : new Date(dataInfo.customDate),
            customNo : dataInfo.customNo,
            invoiceNo : dataInfo.invoiceNo,
            currencyId : dataInfo.currencyId,
            amountCurrency : dataInfo.amountCurrency,
            exRate : dataInfo.exRate,
            amount : dataInfo.amount,
            pono : dataInfo.pono,
            otdlate : dataInfo.otdlate,
            fwdInvNo : dataInfo.fwdInvNo,
            amt : dataInfo.amt,
            forwarder : dataInfo.forwarder,
            docRefNo : dataInfo.docRefNo,
            vcarno : dataInfo.vcarno,
            impFreight : dataInfo.impFreight,
            currencyAdj : dataInfo.currencyAdj,
            termChrg : dataInfo.termChrg,
            aprtTxFee : dataInfo.aprtTxFee,
            delivery : dataInfo.delivery,
            handFwd : dataInfo.handFwd,
            customExamFee : dataInfo.customExamFee,
            collectFee : dataInfo.collectFee,
            cargoPrmt : dataInfo.cargoPrmt,
            docFee : dataInfo.docFee,
            breakBulk : dataInfo.breakBulk,
            edifee : dataInfo.edifee,
            freightGst : dataInfo.freightGst,
            totalFreightCost : dataInfo.totalFreightCost,
            totalFreightRmcost : dataInfo.totalFreightRmcost
          });
        }

        this.rows = this.dataList;
      } 
      else if (message && message.type == GRN_SAVE_SUCCESS)
      {                  
        this.display = false;                
      } 
      else if (message && message.type == SUPPLIER_GET_OK)
      {
        this.supplierRows.length = 0;
        
        this.supplierDataList.push({   
          supplierId : 0,
          supplierName : ''
        });

        for (var idx in message.data)
        {
          var supplierDataInfo = message.data[idx] as SupplierModel;    
 
          this.supplierDataList.push({   
            supplierId : supplierDataInfo.supplierId,
            supplierName : supplierDataInfo.supplierName, 
          });
        }

        this.supplierRows = this.supplierDataList;
      }   

     else if (message && message.type == RAW_MATERIAL_GET_OK)
      {
        this.rmRows.length = 0;
         
        this.rmDataList.push({   
          rmid : 0,
          rmdesc : ''
        });

        for (var idx in message.data)
        {
          var rmDataInfo = message.data[idx];  
          this.rmDataList.push({   
            rmid : rmDataInfo.rmid,
            rmdesc : rmDataInfo.rmdesc
          });
        }

        this.rmRows = this.rmDataList;
      }   

      else if (message && message.type == UOM_GET_OK)
      { 
        this.uomRows.length = 0;
        this.uomRow.length = 0;
        let uomDataList = new Array<any>(); 
        
          uomDataList.push({   
            uomId : 0,
            uomCode : '',
            uomName : '',
            uomTypeId : null 
          });

         
        for (var idx in message.data)
        {
          var uomDataInfo = message.data[idx] as UomModel;    

          if(uomDataInfo.uomTypeId != 1) continue;

          uomDataList.push({   
            uomId : uomDataInfo.uomId,
            uomCode : uomDataInfo.uomCode,
            uomName : uomDataInfo.uomName,
            uomTypeId : uomDataInfo.uomTypeId  
          });
         console.log("uomDataInfo",uomDataInfo);
        }
         console.log("uomDataList", uomDataList);

        this.uomRows = uomDataList;
        //this.uomRow = uomDataList;
         console.log("uomRows",this.uomRows);
      }   

      else if (message && message.type == COMPONENT_GET_OK)
      {
        this.componentRows.length = 0;
        for (var idx in message.data)
        {
          var componentDataInfo = message.data[idx] as ComponentModel;    
          this.componentDataList.push({   
              componentId : componentDataInfo.componentId,
              componentName : componentDataInfo.componentName 
          });
        }

        this.componentRows = this.componentDataList;
      }   

      else if (message && message.type == CURRENCY_GET_OK)
      {
        this.currencyRows.length = 0;
        for (var idx in message.data)
        {
          var currencyDataInfo = message.data[idx] as CurrencyModel;    
          this.currencyDataList.push({   
              currencyId : currencyDataInfo.currencyId,
              currencyCode : currencyDataInfo.currencyCode,
              currencyName : currencyDataInfo.currencyName
          });
        }

        this.currencyRows = this.currencyDataList;
      } 

      else if (message && message.type == STNCUSTOM_GET_OK)
      {
        this.stncustomRows.length = 0;
        for (var idx in message.data)
        {
          var stncustomDataInfo = message.data[idx] as StncustomModel;    
          this.stncustomDataList.push({   
              stncustomId : stncustomDataInfo.stncustomId,
              stncustomName : stncustomDataInfo.stncustomName 
          });
        }

        this.stncustomRows = this.stncustomDataList;
      } 
    }

    onSubmit()
    {

    }

 

  private configureAddForm()
  {

      this.setFormValidation(''); 

      this.dataForm.valueChanges.debounceTime(300)
      .subscribe(data => this.onValueChanged(data));
      
      for (const field in this.formErrors) { 
        this.formErrors[field] = ''; 
      }   
   }


private setFormValidation(id :any) {
 
    this.dataForm = this.fb.group({
        'grnid': [id],
        'grndate': ['', [Validators.required, Validators.minLength(1)]], 
        'lotno': ['', [Validators.required, Validators.minLength(1)]], 
        'supplierId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]], 
        'rmid': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],  
        'height': ['', [Validators.required, Validators.minLength(1)]],
        'heightUom': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'width': ['', [Validators.required, Validators.minLength(1)]],
        'widthUom': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'thick': ['', [Validators.required, Validators.minLength(1)]],
        'thickUom': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'wgt': ['', [Validators.required, Validators.minLength(1)]],
        'roll': ['', [Validators.required, Validators.minLength(1)]],
        'rollUom': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'dom': ['', [Validators.required, Validators.minLength(1)]],
        'dono': ['', [Validators.required, Validators.minLength(1)]],
        'stncustomId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'componentId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'kaswgt': ['', [Validators.required, Validators.minLength(1)]],
        'dutyImp': ['', [Validators.required, Validators.minLength(1)]],
        'gst': ['', [Validators.required, Validators.minLength(1)]],
        'cif': ['', [Validators.required, Validators.minLength(1)]],
        'customDate': ['', [Validators.required, Validators.minLength(1)]],
        'customNo': ['', [Validators.required, Validators.minLength(1)]],
        'invoiceNo': ['', [Validators.required, Validators.minLength(1)]],
        'currencyId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
        'amountCurrency': ['', [Validators.required, Validators.minLength(1)]],
        'exRate': ['', [Validators.required, Validators.minLength(1)]],
        'amount': ['', [Validators.required, Validators.minLength(1)]],
        'pono': ['', [Validators.required, Validators.minLength(1)]],
        'otdlate': ['', [Validators.required, Validators.minLength(1)]],
        'fwdInvNo': ['', [Validators.required, Validators.minLength(1)]],
        'amt': ['', [Validators.required, Validators.minLength(1)]],
        'forwarder': ['', [Validators.required, Validators.minLength(1)]],
        'docRefNo': ['', [Validators.required, Validators.minLength(1)]],
        'vcarno': ['', [Validators.required, Validators.minLength(1)]],
        'impFreight': ['', [Validators.required, Validators.minLength(1)]],
        'currencyAdj': [''],
        'termChrg': ['', [Validators.required, Validators.minLength(1)]],
        'aprtTxFee': ['', [Validators.required, Validators.minLength(1)]],
        'delivery': ['', [Validators.required, Validators.minLength(1)]],
        'handFwd': ['', [Validators.required, Validators.minLength(1)]],
        'customExamFee': ['', [Validators.required, Validators.minLength(1)]],
        'collectFee': ['', [Validators.required, Validators.minLength(1)]],
        'cargoPrmt': ['', [Validators.required, Validators.minLength(1)]],
        'docFee': ['', [Validators.required, Validators.minLength(1)]],
        'breakBulk': ['', [Validators.required, Validators.minLength(1)]],
        'edifee': ['', [Validators.required, Validators.minLength(1)]],
        'freightGst': ['', [Validators.required, Validators.minLength(1)]],
        'totalFreightCost': ['', [Validators.required, Validators.minLength(1)]],
        'totalFreightRmcost': ['', [Validators.required, Validators.minLength(1)]]
      }); 
  
}
private configureEditForm() {

      this.setFormValidation(this.data.grnid); 
      this.dataForm.valueChanges.debounceTime(300)
      .subscribe(data => this.onValueChanged(data));
 }                          
                                         
  onSelect(evt : any) {
    
    if (evt && evt.selected && evt.selected.length > 0)
    {
      this.data = evt.selected[0] as GrnModel;                   
      this.itemSelected = true;   
    }
    else 
    this.itemSelected = false;
      this.edit();
  }
                          
  addForm() {        
     
    this.formTitle = "New GRN"; 
    this.display = true;                          
    this.intention = ADD;
    this.configureAddForm();  
  }   
                          
  edit() {  
    
    this.formTitle = "Edit GRN"; 
    this.intention = UPDATE;                            
    this.configureEditForm();
    
    console.log("edit data",this.data);
    if (this.data)
    {                                  
     this.dataForm.get("grnid").setValue(this.data.grnid);
     this.dataForm.get("grndate").setValue(new Date(this.data.grndate));
     this.dataForm.get("lotno").setValue(this.data.lotno);
     this.dataForm.get("supplierId").setValue(this.data.supplierId);
     this.dataForm.get("rmid").setValue(this.data.rmid); 
     this.dataForm.get("height").setValue(this.data.height);
     this.dataForm.get("heightUom").setValue(this.data.heightUom);
     this.dataForm.get("width").setValue(this.data.width);
     this.dataForm.get("widthUom").setValue(this.data.widthUom);
     this.dataForm.get("thick").setValue(this.data.thick);
     this.dataForm.get("thickUom").setValue(this.data.thickUom);
     this.dataForm.get("wgt").setValue(this.data.wgt);
     this.dataForm.get("roll").setValue(this.data.roll);
     this.dataForm.get("rollUom").setValue(this.data.rollUom);
     this.dataForm.get("dom").setValue(new Date(this.data.dom));
     this.dataForm.get("dono").setValue(this.data.dono);
     this.dataForm.get("stncustomId").setValue(this.data.stncustomId);
     this.dataForm.get("componentId").setValue(this.data.componentId);
     this.dataForm.get("kaswgt").setValue(this.data.kaswgt);
     this.dataForm.get("dutyImp").setValue(this.data.dutyImp);
     this.dataForm.get("gst").setValue(this.data.gst);
     this.dataForm.get("cif").setValue(this.data.cif);
     this.dataForm.get("customDate").setValue(new Date(this.data.customDate));
     this.dataForm.get("customNo").setValue(this.data.customNo);
     this.dataForm.get("invoiceNo").setValue(this.data.invoiceNo);
     this.dataForm.get("currencyId").setValue(this.data.currencyId);
     this.dataForm.get("amountCurrency").setValue(this.data.amountCurrency);
     this.dataForm.get("exRate").setValue(this.data.exRate);
     this.dataForm.get("amount").setValue(this.data.amount);
     this.dataForm.get("pono").setValue(this.data.pono);
     this.dataForm.get("otdlate").setValue(this.data.otdlate);
     this.dataForm.get("fwdInvNo").setValue(this.data.fwdInvNo);
     this.dataForm.get("amt").setValue(this.data.amt);
     this.dataForm.get("forwarder").setValue(this.data.forwarder);
     this.dataForm.get("docRefNo").setValue(this.data.docRefNo);
     this.dataForm.get("vcarno").setValue(this.data.vcarno);
     this.dataForm.get("impFreight").setValue(this.data.impFreight);
     this.dataForm.get("currencyAdj").setValue(this.data.currencyAdj);
     this.dataForm.get("termChrg").setValue(this.data.termChrg);
     this.dataForm.get("aprtTxFee").setValue(this.data.aprtTxFee);
     this.dataForm.get("delivery").setValue(this.data.delivery);
     this.dataForm.get("handFwd").setValue(this.data.handFwd);
     this.dataForm.get("customExamFee").setValue(this.data.customExamFee);
     this.dataForm.get("collectFee").setValue(this.data.collectFee);
     this.dataForm.get("cargoPrmt").setValue(this.data.cargoPrmt);
     this.dataForm.get("docFee").setValue(this.data.docFee);
     this.dataForm.get("breakBulk").setValue(this.data.breakBulk);
     this.dataForm.get("edifee").setValue(this.data.edifee);
     this.dataForm.get("freightGst").setValue(this.data.freightGst);
     this.dataForm.get("totalFreightCost").setValue(this.data.totalFreightCost);
     this.dataForm.get("totalFreightRmcost").setValue(this.data.totalFreightRmcost);
      
      
      this.display = true;
    }       
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
  
}

