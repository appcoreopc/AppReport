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
  
  import {FormUtil} from "../../sharedObjects/formUtil";
  import * as timeUtil from '../../sharedObjects/timeUtil';
  import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
  import * as util from '../../sharedObjects/util';
    
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
    dataForm: FormGroup;
    private intention : number = UPDATE;
    
    display: boolean = false; 
    formTitle: string = "New GRN"; 
    rmCurrency: string = "-";
    newSizeCount: number = 1;
    dataList : Array<any> = new Array<any>(); 
    //uomDataList : Array<any> = new Array<any>(); 
    componentDataList : Array<any> = new Array<any>(); 
    currencyDataList : Array<any> = new Array<any>(); 
    stncustomDataList : Array<any> = new Array<any>(); 
    supplierDataList : Array<any> = new Array<any>(); 
    rmDataList : Array<any> = new Array<any>(); 
    formUtil : FormUtil<GrnModel>;
    RMAmount : number = 0;
    TotalFreightCost : number = 0;
    TotalFreightRMCost : number = 0;
        
    formValidators = {   
      'grnid': [],
      'grndate': [Validators.required, Validators.minLength(1)], 
      'lotno': [Validators.required, Validators.minLength(1)], 
      'supplierId': [Validators.required, Validators.minLength(1), Validators.min(1)], 
      'rmid': [Validators.required, Validators.minLength(1), Validators.min(1)],   
      'sizeCount': [Validators.required],

      'height1': [Validators.required],
      'heightUom1': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'width1': [Validators.required],
      'widthUom1': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'thick1': [Validators.required],
      'thickUom1': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'wgt1': [Validators.required],
      'roll1': [Validators.required],
      'rollUom1': [Validators.required, Validators.minLength(1), Validators.min(1)],

      'height2': [],
      'heightUom2': [],
      'width2': [],
      'widthUom2': [],
      'thick2': [],
      'thickUom2': [],
      'wgt2': [],
      'roll2': [],
      'rollUom2': [],

      'height3': [],
      'heightUom3': [],
      'width3': [],
      'widthUom3': [],
      'thick3': [],
      'thickUom3': [],
      'wgt3': [],
      'roll3': [],
      'rollUom3': [],

      'height4': [],
      'heightUom4': [],
      'width4': [],
      'widthUom4': [],
      'thick4': [],
      'thickUom4': [],
      'wgt4': [],
      'roll4': [],
      'rollUom4': [],

      'height5': [],
      'heightUom5': [],
      'width5': [],
      'widthUom5': [],
      'thick5': [],
      'thickUom5': [],
      'wgt5': [],
      'roll5': [],
      'rollUom5': [],

      'height6': [],
      'heightUom6': [],
      'width6': [],
      'widthUom6': [],
      'thick6': [],
      'thickUom6': [],
      'wgt6': [],
      'roll6': [],
      'rollUom6': [],

      'height7': [],
      'heightUom7': [],
      'width7': [],
      'widthUom7': [],
      'thick7': [],
      'thickUom7': [],
      'wgt7': [],
      'roll7': [],
      'rollUom7': [],

      'height8': [],
      'heightUom8': [],
      'width8': [],
      'widthUom8': [],
      'thick8': [],
      'thickUom8': [],
      'wgt8': [],
      'roll8': [],
      'rollUom8': [],

      'height9': [],
      'heightUom9': [],
      'width9': [],
      'widthUom9': [],
      'thick9': [],
      'thickUom9': [],
      'wgt9': [],
      'roll9': [],
      'rollUom9': [],

      'height10': [],
      'heightUom10': [],
      'width10': [],
      'widthUom10': [],
      'thick10': [],
      'thickUom10': [],
      'wgt10': [],
      'roll10': [],
      'rollUom10': [],

      'height11': [],
      'heightUom11': [],
      'width11': [],
      'widthUom11': [],
      'thick11': [],
      'thickUom11': [],
      'wgt11': [],
      'roll11': [],
      'rollUom11': [],

      'height12': [],
      'heightUom12': [],
      'width12': [],
      'widthUom12': [],
      'thick12': [],
      'thickUom12': [],
      'wgt12': [],
      'roll12': [],
      'rollUom12': [],

      'height13': [],
      'heightUom13': [],
      'width13': [],
      'widthUom13': [],
      'thick13': [],
      'thickUom13': [],
      'wgt13': [],
      'roll13': [],
      'rollUom13': [],

      'height14': [],
      'heightUom14': [],
      'width14': [],
      'widthUom14': [],
      'thick14': [],
      'thickUom14': [],
      'wgt14': [],
      'roll14': [],
      'rollUom14': [],
 
      'height15': [],
      'heightUom15': [],
      'width15': [],
      'widthUom15': [],
      'thick15': [],
      'thickUom15': [],
      'wgt15': [],
      'roll15': [],
      'rollUom15': [],

      'dom': [Validators.required, Validators.minLength(1)],
      'dono': [Validators.required, Validators.minLength(1)],
      'stncustomId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'componentId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'kaswgt': [Validators.required],
      'dutyImp': [Validators.required],
      'gst': [Validators.required],
      'cif': [Validators.required],
      'customDate': [Validators.required, Validators.minLength(1)],
      'customNo': [Validators.required, Validators.minLength(1)],
      'dutyExcise': [],
      'invoiceNo': [Validators.required, Validators.minLength(1)],
      'currencyId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'amountCurrency': [Validators.required],
      'exRate': [Validators.required],
      'amount': [Validators.required],
      'pono': [Validators.required, Validators.minLength(1)],
      'otdlate': [Validators.required, Validators.minLength(1)],
      'fwdInvNo': [Validators.required, Validators.minLength(1)],
      'amt': [Validators.required],
      'forwarder': [Validators.required, Validators.minLength(1)],
      'docRefNo': [Validators.required, Validators.minLength(1)],
      'vcarno': [Validators.required, Validators.minLength(1)],
      'impFreight': [Validators.required],
      'currencyAdj': [],
      'termChrg': [Validators.required],
      'aprtTxFee': [Validators.required],
      'delivery': [Validators.required],
      'handFwd': [Validators.required],
      'customExamFee': [Validators.required],
      'collectFee': [Validators.required],
      'cargoPrmt': [Validators.required],
      'docFee': [Validators.required],
      'breakBulk': [Validators.required],
      'edifee': [Validators.required],
      'freightGst': [Validators.required],
      'totalFreightCost': [Validators.required],
      'totalFreightRmcost': [Validators.required]
    }    
    
    formErrors = {
      'grnid': '',
      'grndate': '',
      'lotno': '', 
      'supplierId':'', 
      'rmid':'',  
      'sizeCount':'',

      'height1':'',
      'heightUom1':'',
      'width1':'',
      'widthUom1':'',
      'thick1':'',
      'thickUom1':'',
      'wgt1':'',
      'roll1':'',
      'rollUom1':'',

      'height2':'',
      'heightUom2':'',
      'width2':'',
      'widthUom2':'',
      'thick2':'',
      'thickUom2':'',
      'wgt2':'',
      'roll2':'',
      'rollUom2':'',
      
      'height3':'',
      'heightUom3':'',
      'width3':'',
      'widthUom3':'',
      'thick3':'',
      'thickUom3':'',
      'wgt3':'',
      'roll3':'',
      'rollUom3':'',
      
      'height4':'',
      'heightUom4':'',
      'width4':'',
      'widthUom4':'',
      'thick4':'',
      'thickUom4':'',
      'wgt4':'',
      'roll4':'',
      'rollUom4':'',
      
      'height5':'',
      'heightUom5':'',
      'width5':'',
      'widthUom5':'',
      'thick5':'',
      'thickUom5':'',
      'wgt5':'',
      'roll5':'',
      'rollUom5':'',
      
      'height6':'',
      'heightUom6':'',
      'width6':'',
      'widthUom6':'',
      'thick6':'',
      'thickUom6':'',
      'wgt6':'',
      'roll6':'',
      'rollUom6':'',
      
      'height7':'',
      'heightUom7':'',
      'width7':'',
      'widthUom7':'',
      'thick7':'',
      'thickUom7':'',
      'wgt7':'',
      'roll7':'',
      'rollUom7':'',
      
      'height8':'',
      'heightUom8':'',
      'width8':'',
      'widthUom8':'',
      'thick8':'',
      'thickUom8':'',
      'wgt8':'',
      'roll8':'',
      'rollUom8':'',
      
      'height9':'',
      'heightUom9':'',
      'width9':'',
      'widthUom9':'',
      'thick9':'',
      'thickUom9':'',
      'wgt9':'',
      'roll9':'',
      'rollUom9':'',
      
      'height10':'',
      'heightUom10':'',
      'width10':'',
      'widthUom10':'',
      'thick10':'',
      'thickUom10':'',
      'wgt10':'',
      'roll10':'',
      'rollUom10':'',
      
      'height11':'',
      'heightUom11':'',
      'width11':'',
      'widthUom11':'',
      'thick11':'',
      'thickUom11':'',
      'wgt11':'',
      'roll11':'',
      'rollUom11':'',
      
      'height12':'',
      'heightUom12':'',
      'width12':'',
      'widthUom12':'',
      'thick12':'',
      'thickUom12':'',
      'wgt12':'',
      'roll12':'',
      'rollUom12':'',
      
      'height13':'',
      'heightUom13':'',
      'width13':'',
      'widthUom13':'',
      'thick13':'',
      'thickUom13':'',
      'wgt13':'',
      'roll13':'',
      'rollUom13':'',
 
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
      'dutyExcise':'',
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
        'required': 'Vendor is required.' ,
        'min': 'Vendor is required.'
      },
      'rmid': {
        'required': 'Raw Material is required.',
        'min': 'Raw Material is required.'  
      }, 
      'sizeCount': {
        'required': 'Total Material Size is required.' 
      },
      'height1': {
        'required': 'Height is required.' 
      },
      'heightUom1': {
        'required': 'Height\'s UOM is required.',
        'min': 'Height\'s UOM is required.' 
      },
      'width1': {
        'required': 'Width is required.' 
      },
      'widthUom1': {
        'required': 'Width\'s UOM is required.',
        'min': 'Width\'s UOM is required.' 
      },
      'thick1': {
        'required': 'Thickness is required.' 
      },
      'thickUom1': {
        'required': 'Thickness\'s UOM is required.',
        'min': 'Thickness\'s UOM is required.' 
      },
      'wgt1': {
        'required': 'WT is required.' 
      },
      'roll1': {
        'required': 'Qty (Roll) is required.' 
      },
      'rollUom1': {
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
      { prop: 'grncode', name : 'Code' },
      { prop: 'grndate', name : 'Date' },
      { prop: 'lotno', name : 'LOT No' },
      { prop: 'customNo', name : 'KASTAM No' },
      { prop: 'amount', name : 'Raw Mat. Amt' },
      { prop: 'totalFreightCost', name : 'Freight Cost' },
      { prop: 'totalFreightRmcost', name : 'Total Freight  & Raw Mat. Cost' }      
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    
    name : string; 
    description : string; 
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => {   
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData,
          [GRN_SAVE_SUCCESS, GRN_GET_OK, UOM_GET_OK, COMPONENT_GET_OK, CURRENCY_GET_OK, STNCUSTOM_GET_OK, SUPPLIER_GET_OK, RAW_MATERIAL_GET_OK]));
          
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, GRN_SAVE_SUCCESS), GRN_SAVE_SUCCESS));
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, GRN_GET_OK), GRN_GET_OK));
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, UOM_GET_OK), UOM_GET_OK)); 
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, COMPONENT_GET_OK), COMPONENT_GET_OK));
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, CURRENCY_GET_OK), CURRENCY_GET_OK));
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, STNCUSTOM_GET_OK), STNCUSTOM_GET_OK));
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, SUPPLIER_GET_OK), SUPPLIER_GET_OK));
          // this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, RAW_MATERIAL_GET_OK), RAW_MATERIAL_GET_OK));
          
        }); 
        
        this.setFormValidation(null);
        //this.configureEditForm();
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
        debugger;

        let dataModel = this.formUtil.commit(); 
              
        if (this.intention == ADD)
        {
          dataModel = this.dataForm.value as GrnModel;
          dataModel.grnid = 0;
        }
        else {
          dataModel.grnid = this.data.grnid;
        }
        
        this.data.grndate =  new Date(dataModel.grndate);
        this.data.lotno = dataModel.lotno;
        this.data.supplierId = dataModel.supplierId; 
        this.data.rmid = dataModel.rmid;  
        this.data.sizeCount = dataModel.sizeCount;  

        this.data.height1 = dataModel.height1;
        this.data.heightUom1 = dataModel.heightUom1;
        this.data.width1 = dataModel.width1;
        this.data.widthUom1 = dataModel.widthUom1;
        this.data.thick1 = dataModel.thick1;
        this.data.thickUom1 = dataModel.thickUom1;
        this.data.wgt1 = dataModel.wgt1;
        this.data.roll1 = dataModel.roll1;
        this.data.rollUom1 = dataModel.rollUom1;

        this.data.height2 = dataModel.height2;
        this.data.heightUom2 = dataModel.heightUom2;
        this.data.width2 = dataModel.width2;
        this.data.widthUom2 = dataModel.widthUom2;
        this.data.thick2 = dataModel.thick2;
        this.data.thickUom2 = dataModel.thickUom2;
        this.data.wgt2 = dataModel.wgt2;
        this.data.roll2 = dataModel.roll2;
        this.data.rollUom2 = dataModel.rollUom2;

        this.data.height3 = dataModel.height3;
        this.data.heightUom3 = dataModel.heightUom3;
        this.data.width3 = dataModel.width3;
        this.data.widthUom3 = dataModel.widthUom3;
        this.data.thick3 = dataModel.thick3;
        this.data.thickUom3 = dataModel.thickUom3;
        this.data.wgt3 = dataModel.wgt3;
        this.data.roll3 = dataModel.roll3;
        this.data.rollUom3 = dataModel.rollUom3;

        this.data.height4 = dataModel.height4;
        this.data.heightUom4 = dataModel.heightUom4;
        this.data.width4 = dataModel.width4;
        this.data.widthUom4 = dataModel.widthUom4;
        this.data.thick4 = dataModel.thick4;
        this.data.thickUom4 = dataModel.thickUom4;
        this.data.wgt4 = dataModel.wgt4;
        this.data.roll4 = dataModel.roll4;
        this.data.rollUom4 = dataModel.rollUom4;

        this.data.height5 = dataModel.height5;
        this.data.heightUom5 = dataModel.heightUom5;
        this.data.width5 = dataModel.width5;
        this.data.widthUom5 = dataModel.widthUom5;
        this.data.thick5 = dataModel.thick5;
        this.data.thickUom5 = dataModel.thickUom5;
        this.data.wgt5 = dataModel.wgt5;
        this.data.roll5 = dataModel.roll5;
        this.data.rollUom5 = dataModel.rollUom5;

        this.data.height6 = dataModel.height6;
        this.data.heightUom6 = dataModel.heightUom6;
        this.data.width6 = dataModel.width6;
        this.data.widthUom6 = dataModel.widthUom6;
        this.data.thick6 = dataModel.thick6;
        this.data.thickUom6 = dataModel.thickUom6;
        this.data.wgt6 = dataModel.wgt6;
        this.data.roll6 = dataModel.roll6;
        this.data.rollUom6 = dataModel.rollUom6;

        this.data.height7 = dataModel.height7;
        this.data.heightUom7 = dataModel.heightUom7;
        this.data.width7 = dataModel.width7;
        this.data.widthUom7 = dataModel.widthUom7;
        this.data.thick7 = dataModel.thick7;
        this.data.thickUom7 = dataModel.thickUom7;
        this.data.wgt7 = dataModel.wgt7;
        this.data.roll7 = dataModel.roll7;
        this.data.rollUom7 = dataModel.rollUom7;

        this.data.height8 = dataModel.height8;
        this.data.heightUom8 = dataModel.heightUom8;
        this.data.width8 = dataModel.width8;
        this.data.widthUom8 = dataModel.widthUom8;
        this.data.thick8 = dataModel.thick8;
        this.data.thickUom8 = dataModel.thickUom8;
        this.data.wgt8 = dataModel.wgt8;
        this.data.roll8 = dataModel.roll8;
        this.data.rollUom8 = dataModel.rollUom8;

        this.data.height9 = dataModel.height9;
        this.data.heightUom9 = dataModel.heightUom9;
        this.data.width9 = dataModel.width9;
        this.data.widthUom9 = dataModel.widthUom9;
        this.data.thick9 = dataModel.thick9;
        this.data.thickUom9 = dataModel.thickUom9;
        this.data.wgt9 = dataModel.wgt9;
        this.data.roll9 = dataModel.roll9;
        this.data.rollUom9 = dataModel.rollUom9;

        this.data.height10 = dataModel.height10;
        this.data.heightUom10 = dataModel.heightUom10;
        this.data.width10 = dataModel.width10;
        this.data.widthUom10 = dataModel.widthUom10;
        this.data.thick10 = dataModel.thick10;
        this.data.thickUom10 = dataModel.thickUom10;
        this.data.wgt10 = dataModel.wgt10;
        this.data.roll10 = dataModel.roll10;
        this.data.rollUom10 = dataModel.rollUom10;

        this.data.height11 = dataModel.height11;
        this.data.heightUom11 = dataModel.heightUom11;
        this.data.width11 = dataModel.width11;
        this.data.widthUom11 = dataModel.widthUom11;
        this.data.thick11 = dataModel.thick11;
        this.data.thickUom11 = dataModel.thickUom11;
        this.data.wgt11 = dataModel.wgt11;
        this.data.roll11 = dataModel.roll11;
        this.data.rollUom11 = dataModel.rollUom11;

        this.data.height12 = dataModel.height12;
        this.data.heightUom12 = dataModel.heightUom12;
        this.data.width12 = dataModel.width12;
        this.data.widthUom12 = dataModel.widthUom12;
        this.data.thick12 = dataModel.thick12;
        this.data.thickUom12 = dataModel.thickUom12;
        this.data.wgt12 = dataModel.wgt12;
        this.data.roll12 = dataModel.roll12;
        this.data.rollUom12 = dataModel.rollUom12;

        this.data.height13 = dataModel.height13;
        this.data.heightUom13 = dataModel.heightUom13;
        this.data.width13 = dataModel.width13;
        this.data.widthUom13 = dataModel.widthUom13;
        this.data.thick13 = dataModel.thick13;
        this.data.thickUom13 = dataModel.thickUom13;
        this.data.wgt13 = dataModel.wgt13;
        this.data.roll13 = dataModel.roll13;
        this.data.rollUom13 = dataModel.rollUom13;

        this.data.height14 = dataModel.height14;
        this.data.heightUom14 = dataModel.heightUom14;
        this.data.width14 = dataModel.width14;
        this.data.widthUom14 = dataModel.widthUom14;
        this.data.thick14 = dataModel.thick14;
        this.data.thickUom14 = dataModel.thickUom14;
        this.data.wgt14 = dataModel.wgt14;
        this.data.roll14 = dataModel.roll14;
        this.data.rollUom14 = dataModel.rollUom14;

        this.data.height15 = dataModel.height15;
        this.data.heightUom15 = dataModel.heightUom15;
        this.data.width15 = dataModel.width15;
        this.data.widthUom15 = dataModel.widthUom15;
        this.data.thick15 = dataModel.thick15;
        this.data.thickUom15 = dataModel.thickUom15;
        this.data.wgt15 = dataModel.wgt15;
        this.data.roll15 = dataModel.roll15;
        this.data.rollUom15 = dataModel.rollUom15;


        this.data.dom = dataModel.dom;
        this.data.dono = dataModel.dono;
        this.data.stncustomId = dataModel.stncustomId;
        this.data.componentId = dataModel.componentId;
        this.data.kaswgt = dataModel.kaswgt;
        this.data.dutyImp = dataModel.dutyImp;
        this.data.gst = dataModel.gst;
        this.data.cif = dataModel.cif;
        this.data.customDate = new Date(dataModel.customDate);
        this.data.customNo = dataModel.customNo;
        this.data.dutyExcise = dataModel.dutyExcise;
        this.data.invoiceNo = dataModel.invoiceNo;
        this.data.currencyId = dataModel.currencyId;
        this.data.amountCurrency = dataModel.amountCurrency;
        this.data.exRate = dataModel.exRate;
        this.data.amount = dataModel.amount;
        this.data.pono = dataModel.pono;
        this.data.otdlate = dataModel.otdlate;
        this.data.fwdInvNo = dataModel.fwdInvNo;
        this.data.amt = dataModel.amt;
        this.data.forwarder = dataModel.forwarder;
        this.data.docRefNo = dataModel.docRefNo;
        this.data.vcarno = dataModel.vcarno;
        this.data.impFreight = dataModel.impFreight;
        this.data.currencyAdj = dataModel.currencyAdj;
        this.data.termChrg = dataModel.termChrg;
        this.data.aprtTxFee = dataModel.aprtTxFee;
        this.data.delivery = dataModel.delivery;
        this.data.handFwd = dataModel.handFwd;
        this.data.customExamFee = dataModel.customExamFee;
        this.data.collectFee = dataModel.collectFee;
        this.data.cargoPrmt = dataModel.cargoPrmt;
        this.data.docFee = dataModel.docFee;
        this.data.breakBulk = dataModel.breakBulk;
        this.data.edifee = dataModel.edifee;
        this.data.freightGst = dataModel.freightGst;
        this.data.totalFreightCost = dataModel.totalFreightCost;
        this.data.totalFreightRmcost = dataModel.totalFreightRmcost;
                
        this.dispatchIntent(GRN_SAVE, dataModel);          
        this.display = false; 
        
      } 
      
      testsave(){
        var j= {"grnid":"0","grndate":"2018-02-15T16:00:00.000Z",
        "lotno":"4","supplierId":"1","rmid":"1","height":4,
        "heightUom":"1","width":4,"widthUom":"1","thick":4,
        "thickUom":"1","wgt":4,"roll":4,"rollUom":"1",
        "dom":"2018-02-21T16:00:00.000Z","dono":"4","stncustomId":"1","componentId":"1","kaswgt":14,"dutyImp":4,"gst":4,"cif":4,"customDate":"2018-02-01T16:00:00.000Z","customNo":"4","dutyExcise":4,"invoiceNo":"4","currencyId":"1","amountCurrency":4,"exRate":4,"amount":16,"pono":"4","otdlate":"4","fwdInvNo":"4","amt":4,"forwarder":"4","docRefNo":"4","vcarno":"4","impFreight":4,"currencyAdj":"NA","termChrg":4,"aprtTxFee":4,"delivery":4,"handFwd":4,"customExamFee":4,"collectFee":4,"cargoPrmt":"4","docFee":4,"breakBulk":4,"edifee":4,"freightGst":4,"totalFreightCost":44,"totalFreightRmcost":60};
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

      recalculateAmount(){
        
        if (!this.dataForm) { return; }
        console.log(this.dataForm); 
        this.RMAmount =  this.dataForm.value.amountCurrency * this.dataForm.value.exRate;
        this.TotalFreightCost = this.dataForm.value.impFreight +    
        this.dataForm.value.termChrg + 
        this.dataForm.value.aprtTxFee + 
        this.dataForm.value.delivery + 
        this.dataForm.value.handFwd + 
        this.dataForm.value.customExamFee + 
        this.dataForm.value.collectFee +  
        this.dataForm.value.docFee + 
        this.dataForm.value.breakBulk + 
        this.dataForm.value.edifee + 
        this.dataForm.value.freightGst;

        this.TotalFreightRMCost = this.RMAmount + this.TotalFreightCost;
      }
      
      onValueChanged(data?: GrnModel) {
        
        console.log('test1');
        if (!this.dataForm) { return; }
        
        console.log('test');
        const form = this.dataForm; 

        this.recalculateAmount();
                
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
     
          if (message && message.type == GRN_GET_OK)
          {
            this.rows.length = 0;
            this.dataList.length = 0;
            let dataSource = message.data.data.data;
            
            for (var idx of dataSource)
            {
              var dataInfo = {...idx};    
              this.dataList.push(dataInfo);       
            }        
            this.rows = [...this.dataList];
          } 
          else if (message && message.type == GRN_SAVE_SUCCESS)
          {                  
            await timeUtil.delay(TIME_DELAY);  
            this.getGrnData();   
            
            this.display = false;                
          } 
          else if (message && message.type == SUPPLIER_GET_OK)
          {
            this.supplierRows.length = 0;
            this.supplierDataList.length = 0;
            
            this.supplierDataList.push({   
              supplierId : 0,
              supplierCode : ''
            });
            
            let supplierDataSource = message.data.data.data;        
            for (var supplierDataItem of supplierDataSource)
            {
              var supplierDataInfo = {...supplierDataItem};            
              this.supplierDataList.push(supplierDataInfo);
            }
            
            this.supplierRows = [...this.supplierDataList];
          }   
          
          else if (message && message.type == RAW_MATERIAL_GET_OK)
          {
            this.rmRows.length = 0;
            this.rmDataList.length = 0;
            
            this.rmDataList.push({   
              rmid : 0,
              rmcode : ''
            });
            
            let rmaterialDataSource = message.data.data.data;
            
            for (var rmItem of rmaterialDataSource)
            {
              var rmDataInfo = {...rmItem};  
              this.rmDataList.push(rmDataInfo);
            }
            
            this.rmRows = [...this.rmDataList];
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
            
            let uomDataSource = message.data.data.data;
            
            for (var oumDataItem of uomDataSource)
            {
              var uomDataInfo = {...oumDataItem};              
              if(uomDataInfo.uomTypeId != 1) continue;
              
              uomDataList.push(uomDataInfo);   
            }           
            
            this.uomRows = [...uomDataList];
            //this.uomRow = uomDataList;
            //console.log("uomRows",this.uomRows);
          }   
          
          else if (message && message.type == COMPONENT_GET_OK)
          {
            this.componentRows.length = 0;
            this.componentDataList.length = 0;
            
            let componentDataSource = message.data.data.data;
            for (var componentItem of componentDataSource)
            {
              var componentDataInfo = {...componentItem};    
              this.componentDataList.push(componentDataInfo);
            }        
            this.componentRows = [...this.componentDataList];
          }   
          
          else if (message && message.type == CURRENCY_GET_OK)
          {
            this.currencyRows.length = 0;
            this.currencyDataList.length = 0;
            
            let currencyDataSource = message.data.data.data;
            
            for (var currencyItem of currencyDataSource)
            {
              var currencyDataInfo = {...currencyItem};    
              this.currencyDataList.push(currencyDataInfo);
            }
            
            this.currencyRows = [...this.currencyDataList];
          } 
          
          else if (message && message.type == STNCUSTOM_GET_OK)
          {
            this.stncustomRows.length = 0;
            this.stncustomDataList.length = 0;
            
            let stnCustomDataList = message.data.data.data;
            
            for (var stnItem of stnCustomDataList)
            {
              var stncustomDataInfo = {...stnItem};    
              this.stncustomDataList.push(stncustomDataInfo);
            }        
            this.stncustomRows = [...this.stncustomDataList];
          } 
          
        });
      }    
      
      private configureAddForm()
      {         
        let model  = new GrnModel();
        model.grnid = null; 
        model.grncode = '';
        model.grndate = new Date();
        model.lotno = '';
        model.supplierId = 0;
        model.rmid = 0;
        model.sizeCount = 1;

        model.height1 = 0;
        model.heightUom1 = 1;
        model.width1 = 0; 
        model.widthUom1 = 5; 
        model.thick1 = 0;
        model.thickUom1 = 0;
        model.wgt1 = 0;
        model.roll1 = 0;
        model.rollUom1 = 0; 

        model.height2 = 0;
        model.heightUom2 = 1;
        model.width2 = 0; 
        model.widthUom2 = 5; 
        model.thick2 = 0;
        model.thickUom2 = 0;
        model.wgt2 = 0;
        model.roll2 = 0;
        model.rollUom2 = 0; 
        
        model.height3 = 0;
        model.heightUom3 = 1;
        model.width3 = 0; 
        model.widthUom3 = 5; 
        model.thick3 = 0;
        model.thickUom3 = 0;
        model.wgt3 = 0;
        model.roll3 = 0;
        model.rollUom3 = 0; 
        
        model.height4 = 0;
        model.heightUom4 = 1;
        model.width4 = 0; 
        model.widthUom4 = 5; 
        model.thick4 = 0;
        model.thickUom4 = 0;
        model.wgt4 = 0;
        model.roll4 = 0;
        model.rollUom4 = 0; 
        
        model.height5 = 0;
        model.heightUom5 = 1;
        model.width5 = 0; 
        model.widthUom5 = 5; 
        model.thick5 = 0;
        model.thickUom5 = 0;
        model.wgt5 = 0;
        model.roll5 = 0;
        model.rollUom5 = 0; 
        
        model.height6 = 0;
        model.heightUom6 = 1;
        model.width6 = 0; 
        model.widthUom6 = 5; 
        model.thick6 = 0;
        model.thickUom6 = 0;
        model.wgt6 = 0;
        model.roll6 = 0;
        model.rollUom6 = 0; 
        
        model.height7 = 0;
        model.heightUom7 = 1;
        model.width7 = 0; 
        model.widthUom7 = 5; 
        model.thick7 = 0;
        model.thickUom7 = 0;
        model.wgt7 = 0;
        model.roll7 = 0;
        model.rollUom7 = 0; 
        
        model.height8 = 0;
        model.heightUom8 = 1;
        model.width8 = 0; 
        model.widthUom8 = 5; 
        model.thick8 = 0;
        model.thickUom8 = 0;
        model.wgt8 = 0;
        model.roll8 = 0;
        model.rollUom8 = 0; 
        
        model.height9 = 0;
        model.heightUom9 = 1;
        model.width9 = 0; 
        model.widthUom9 = 5; 
        model.thick9 = 0;
        model.thickUom9 = 0;
        model.wgt9 = 0;
        model.roll9 = 0;
        model.rollUom9 = 0; 
        
        model.height10 = 0;
        model.heightUom10 = 1;
        model.width10 = 0; 
        model.widthUom10 = 5; 
        model.thick10 = 0;
        model.thickUom10 = 0;
        model.wgt10 = 0;
        model.roll10 = 0;
        model.rollUom10 = 0; 
        
        model.height11 = 0;
        model.heightUom11 = 1;
        model.width11 = 0; 
        model.widthUom11 = 5; 
        model.thick11 = 0;
        model.thickUom11 = 0;
        model.wgt11 = 0;
        model.roll11 = 0;
        model.rollUom11 = 0; 
        
        model.height12 = 0;
        model.heightUom12 = 1;
        model.width12 = 0; 
        model.widthUom12 = 5; 
        model.thick12 = 0;
        model.thickUom12 = 0;
        model.wgt12 = 0;
        model.roll12 = 0;
        model.rollUom12 = 0; 
        
        model.height13 = 0;
        model.heightUom13 = 1;
        model.width13 = 0; 
        model.widthUom13 = 5; 
        model.thick13 = 0;
        model.thickUom13 = 0;
        model.wgt13 = 0;
        model.roll13 = 0;
        model.rollUom13 = 0; 
        
        model.height14 = 0;
        model.heightUom14 = 1;
        model.width14 = 0; 
        model.widthUom14 = 5; 
        model.thick14 = 0;
        model.thickUom14 = 0;
        model.wgt14 = 0;
        model.roll14 = 0;
        model.rollUom14 = 0; 
        
        model.height15 = 0;
        model.heightUom15 = 1;
        model.width15 = 0; 
        model.widthUom15 = 5; 
        model.thick15 = 0;
        model.thickUom15 = 0;
        model.wgt15 = 0;
        model.roll15 = 0;
        model.rollUom15 = 0; 
         
        
        model.dom = new Date();
        model.dono = '';
        model.stncustomId = 0;
        model.componentId = 0;
        model.kaswgt = 0;
        model.dutyImp = 0;
        model.gst = 0;
        model.cif = 0;
        model.customDate = new Date();
        model.dutyExcise = 0;
        model.invoiceNo = '';    
        model.currencyId = 0;
        model.amountCurrency = 0;
        model.exRate = 0;
        model.amount = 0;
        model.pono = '';
        model.otdlate = '';
        model.fwdInvNo = ''; 
        model.amt = 0;
        model.forwarder = '';
        model.docRefNo = '';
        model.vcarno = '';
        model.impFreight = 0;
        model.currencyAdj = '';
        model.termChrg = 0;
        model.aprtTxFee = 0;
        model.delivery = 0;
        model.handFwd = 0;
        model.customExamFee = 0;
        model.collectFee = 0;
        model.cargoPrmt = '';
        model.docFee = 0;
        model.breakBulk = 0;
        model.freightGst = 0;
        model.totalFreightCost = 0;
        model.totalFreightRmcost = 0;
        model.edifee = 0;
        model.customNo = '';
        
        this.formUtil = new FormUtil<GrnModel>(model, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.dataForm = userform;
        
        this.dataForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));          
      }    
      
      private setFormValidation(id :any) {
        
        this.dataForm = this.fb.group({
          'grnid': [null],
          'grndate': ['', [Validators.required, Validators.minLength(1)]], 
          'lotno': ['', [Validators.required, Validators.minLength(1)]], 
          'supplierId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]], 
          'rmid': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],  
          'sizeCount': ['', [Validators.required]],
         
          'height1': ['', [Validators.required]],
          'heightUom1': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'width1': ['', [Validators.required]],
          'widthUom1': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'thick1': ['', [Validators.required]],
          'thickUom1': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'wgt1': ['', [Validators.required]],
          'roll1': ['', [Validators.required]],
          'rollUom1': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
 
          'height2': [''],
          'heightUom2': [''],
          'width2': [''],
          'widthUom2': [''],
          'thick2': [''],
          'thickUom2': [''],
          'wgt2': [''],
          'roll2': [''],
          'rollUom2': [''],
          
          'height3': [''],
          'heightUom3': [''],
          'width3': [''],
          'widthUom3': [''],
          'thick3': [''],
          'thickUom3': [''],
          'wgt3': [''],
          'roll3': [''],
          'rollUom3': [''],
          
          'height4': [''],
          'heightUom4': [''],
          'width4': [''],
          'widthUom4': [''],
          'thick4': [''],
          'thickUom4': [''],
          'wgt4': [''],
          'roll4': [''],
          'rollUom4': [''],
          
          'height5': [''],
          'heightUom5': [''],
          'width5': [''],
          'widthUom5': [''],
          'thick5': [''],
          'thickUom5': [''],
          'wgt5': [''],
          'roll5': [''],
          'rollUom5': [''],
          
          'height6': [''],
          'heightUom6': [''],
          'width6': [''],
          'widthUom6': [''],
          'thick6': [''],
          'thickUom6': [''],
          'wgt6': [''],
          'roll6': [''],
          'rollUom6': [''],
          
          'height7': [''],
          'heightUom7': [''],
          'width7': [''],
          'widthUom7': [''],
          'thick7': [''],
          'thickUom7': [''],
          'wgt7': [''],
          'roll7': [''],
          'rollUom7': [''],
          
          'height8': [''],
          'heightUom8': [''],
          'width8': [''],
          'widthUom8': [''],
          'thick8': [''],
          'thickUom8': [''],
          'wgt8': [''],
          'roll8': [''],
          'rollUom8': [''],
          
          'height9': [''],
          'heightUom9': [''],
          'width9': [''],
          'widthUom9': [''],
          'thick9': [''],
          'thickUom9': [''],
          'wgt9': [''],
          'roll9': [''],
          'rollUom9': [''],
          
          'height10': [''],
          'heightUom10': [''],
          'width10': [''],
          'widthUom10': [''],
          'thick10': [''],
          'thickUom10': [''],
          'wgt10': [''],
          'roll10': [''],
          'rollUom10': [''],
          
          'height11': [''],
          'heightUom11': [''],
          'width11': [''],
          'widthUom11': [''],
          'thick11': [''],
          'thickUom11': [''],
          'wgt11': [''],
          'roll11': [''],
          'rollUom11': [''],
          
          'height12': [''],
          'heightUom12': [''],
          'width12': [''],
          'widthUom12': [''],
          'thick12': [''],
          'thickUom12': [''],
          'wgt12': [''],
          'roll12': [''],
          'rollUom12': [''],
          
          'height13': [''],
          'heightUom13': [''],
          'width13': [''],
          'widthUom13': [''],
          'thick13': [''],
          'thickUom13': [''],
          'wgt13': [''],
          'roll13': [''],
          'rollUom13': [''],
          
          'height14': [''],
          'heightUom14': [''],
          'width14': [''],
          'widthUom14': [''],
          'thick14': [''],
          'thickUom14': [''],
          'wgt14': [''],
          'roll14': [''],
          'rollUom14': [''],
          
          'height15': [''],
          'heightUom15': [''],
          'width15': [''],
          'widthUom15': [''],
          'thick15': [''],
          'thickUom15': [''],
          'wgt15': [''],
          'roll15': [''],
          'rollUom15': [''],

          'dom': ['', [Validators.required, Validators.minLength(1)]],
          'dono': ['', [Validators.required, Validators.minLength(1)]],
          'stncustomId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'componentId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'kaswgt': ['', [Validators.required]],
          'dutyImp': ['', [Validators.required]],
          'gst': ['', [Validators.required]],
          'cif': ['', [Validators.required]],
          'customDate': ['', [Validators.required, Validators.minLength(1)]],
          'customNo': ['', [Validators.required, Validators.minLength(1)]],
          'dutyExcise': [''],
          'invoiceNo': ['', [Validators.required, Validators.minLength(1)]],
          'currencyId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
          'amountCurrency': ['', [Validators.required]],
          'exRate': ['', [Validators.required]],
          'amount': ['', [Validators.required]],
          'pono': ['', [Validators.required, Validators.minLength(1)]],
          'otdlate': ['', [Validators.required, Validators.minLength(1)]],
          'fwdInvNo': ['', [Validators.required, Validators.minLength(1)]],
          'amt': ['', [Validators.required]],
          'forwarder': ['', [Validators.required, Validators.minLength(1)]],
          'docRefNo': ['', [Validators.required, Validators.minLength(1)]],
          'vcarno': ['', [Validators.required, Validators.minLength(1)]],
          'impFreight': ['', [Validators.required]],
          'currencyAdj': [''],
          'termChrg': ['', [Validators.required]],
          'aprtTxFee': ['', [Validators.required]],
          'delivery': ['', [Validators.required]],
          'handFwd': ['', [Validators.required]],
          'customExamFee': ['', [Validators.required]],
          'collectFee': ['', [Validators.required]],
          'cargoPrmt': ['', [Validators.required]],
          'docFee': ['', [Validators.required]],
          'breakBulk': ['', [Validators.required]],
          'edifee': ['', [Validators.required]],
          'freightGst': ['', [Validators.required]],
          'totalFreightCost': ['', [Validators.required]],
          'totalFreightRmcost': ['', [Validators.required]]
        }); 
        
      }
      private configureEditForm() {
       
      }  
      
      onSizeCountChange(selectedValue: number) { 
         this.newSizeCount = selectedValue; 
      }


      onCurrencyChange(selectedValue: string) {
          
        console.log("currencyRows",this.currencyRows);
 
        for (let i = 0; i < this.currencyRows.length; i++) {
          console.log(this.currencyRows[i].currencyId,this.currencyRows[i].currencyCode,selectedValue);
          if(String(this.currencyRows[i].currencyId) == selectedValue){ 
            this.rmCurrency = this.currencyRows[i].currencyCode;
            break;
          }

        }
        
      }
      
      onSelect(evt : any) {
        
        if (evt && evt.selected && evt.selected.length > 0)
        {
          
          this.data = evt.selected[0] as GrnModel;                   
          this.itemSelected = true;   
          
          // Force a date - otherwise throw exception in the form //

          if (this.data.grndate)
              this.data.grndate = new Date(this.data.grndate);
          if (this.data.customDate)
              this.data.customDate = new Date(this.data.customDate);
          if (this.data.dom)
              this.data.dom = new Date(this.data.dom)

          this.formUtil = new FormUtil<GrnModel>(this.data, this.formValidators);
          let form = this.formUtil.createForm(false);
          this.dataForm = form;
          this.intention = UPDATE;
          this.display = true;      
          
          this.recalculateAmount();

          this.onCurrencyChange(String(this.data.currencyId));
          this.newSizeCount = this.data.sizeCount;
          
          this.dataForm.valueChanges.debounceTime(300)
          .subscribe(data => this.onValueChanged(data));
        }
        else 
        this.itemSelected = false;
        
        this.edit(this.data.grncode);      
      }
      
      addForm() {        
        
        this.formTitle = "New GRN"; 
        this.display = true;                          
        this.intention = ADD;
        this.configureAddForm();  
      }   
      
      edit(id) {  
        
        this.formTitle = "Edit GRN (" + id + ")"; 
        this.intention = UPDATE;                            
        this.configureEditForm();
                
        // if (this.data)
        // {                                  
        //  this.dataForm.get("grnid").setValue(this.data.grnid);
        //  this.dataForm.get("grndate").setValue(new Date(this.data.grndate));
        //  this.dataForm.get("lotno").setValue(this.data.lotno);
        //  this.dataForm.get("supplierId").setValue(this.data.supplierId);
        //  this.dataForm.get("rmid").setValue(this.data.rmid); 
        //  this.dataForm.get("height").setValue(this.data.height);
        //  this.dataForm.get("heightUom").setValue(this.data.heightUom);
        //  this.dataForm.get("width").setValue(this.data.width);
        //  this.dataForm.get("widthUom").setValue(this.data.widthUom);
        //  this.dataForm.get("thick").setValue(this.data.thick);
        //  this.dataForm.get("thickUom").setValue(this.data.thickUom);
        //  this.dataForm.get("wgt").setValue(this.data.wgt);
        //  this.dataForm.get("roll").setValue(this.data.roll);
        //  this.dataForm.get("rollUom").setValue(this.data.rollUom);
        //  this.dataForm.get("dom").setValue(new Date(this.data.dom));
        //  this.dataForm.get("dono").setValue(this.data.dono);
        //  this.dataForm.get("stncustomId").setValue(this.data.stncustomId);
        //  this.dataForm.get("componentId").setValue(this.data.componentId);
        //  this.dataForm.get("kaswgt").setValue(this.data.kaswgt);
        //  this.dataForm.get("dutyImp").setValue(this.data.dutyImp);
        //  this.dataForm.get("gst").setValue(this.data.gst);
        //  this.dataForm.get("cif").setValue(this.data.cif);
        //  this.dataForm.get("customDate").setValue(new Date(this.data.customDate));
        //  this.dataForm.get("customNo").setValue(this.data.customNo);
        //  this.dataForm.get("dutyExcise").setValue(this.data.dutyExcise);
        //  this.dataForm.get("invoiceNo").setValue(this.data.invoiceNo);
        //  this.dataForm.get("currencyId").setValue(this.data.currencyId);
        //  this.dataForm.get("amountCurrency").setValue(this.data.amountCurrency);
        //  this.dataForm.get("exRate").setValue(this.data.exRate);
        //  this.dataForm.get("amount").setValue(this.data.amount);
        //  this.dataForm.get("pono").setValue(this.data.pono);
        //  this.dataForm.get("otdlate").setValue(this.data.otdlate);
        //  this.dataForm.get("fwdInvNo").setValue(this.data.fwdInvNo);
        //  this.dataForm.get("amt").setValue(this.data.amt);
        //  this.dataForm.get("forwarder").setValue(this.data.forwarder);
        //  this.dataForm.get("docRefNo").setValue(this.data.docRefNo);
        //  this.dataForm.get("vcarno").setValue(this.data.vcarno);
        //  this.dataForm.get("impFreight").setValue(this.data.impFreight);
        //  this.dataForm.get("currencyAdj").setValue(this.data.currencyAdj);
        //  this.dataForm.get("termChrg").setValue(this.data.termChrg);
        //  this.dataForm.get("aprtTxFee").setValue(this.data.aprtTxFee);
        //  this.dataForm.get("delivery").setValue(this.data.delivery);
        //  this.dataForm.get("handFwd").setValue(this.data.handFwd);
        //  this.dataForm.get("customExamFee").setValue(this.data.customExamFee);
        //  this.dataForm.get("collectFee").setValue(this.data.collectFee);
        //  this.dataForm.get("cargoPrmt").setValue(this.data.cargoPrmt);
        //  this.dataForm.get("docFee").setValue(this.data.docFee);
        //  this.dataForm.get("breakBulk").setValue(this.data.breakBulk);
        //  this.dataForm.get("edifee").setValue(this.data.edifee);
        //  this.dataForm.get("freightGst").setValue(this.data.freightGst);
        //  this.dataForm.get("totalFreightCost").setValue(this.data.totalFreightCost);
        //  this.dataForm.get("totalFreightRmcost").setValue(this.data.totalFreightRmcost);
        
        //   this.display = true;
        // }       
      }                          
      
      cancel() 
      {
        this.data = this.formUtil.rollback();
        this.display = false;     
        this.itemSelected = false;          
      }    

      getGrnData(): any {      
        this.dispatchIntent(GRN_GET);        
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
      
      