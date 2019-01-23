import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState,  ADD, UPDATE, GRN_SAVE, GRN_GET_OK, GRN_GET,  
  UOM_GET, UOM_GET_OK, GRN_SAVE_SUCCESS,
  COMPONENT_GET, COMPONENT_GET_OK, 
  CURRENCY_GET, CURRENCY_GET_OK, 
  RAW_MATERIAL_GET, RAW_MATERIAL_GET_OK,
  SUPPLIER_GET, SUPPLIER_GET_OK,
  STNCUSTOM_GET, STNCUSTOM_GET_OK, DELETE_GRN_PROMPT,
  GRN_DELETE, DELETE_ITEM_DELIMITER, GRN_DELETE_SUCCESS  } from '../../sharedObjects/sharedMessages';
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
  import {MultiSelectModule} from 'primeng/multiselect';
  import {FormUtil} from "../../sharedObjects/formUtil";
  import * as timeUtil from '../../sharedObjects/timeUtil';
  import { TIME_DELAY } from '../../sharedObjects/applicationSetup';
  
 

  @Component({ 
    selector: 'app-report-grn',
    templateUrl: './report-grn.component.html',
    styleUrls: ['./report-grn.component.css']
  })
  export class ReportGrnComponent implements OnInit {
    
    async getGrnComponentData() {    
      console.log('sync data loading');
      // Tryin to sync loading of data // 
      this.dispatchIntent(GRN_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(UOM_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(COMPONENT_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(CURRENCY_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(STNCUSTOM_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(SUPPLIER_GET); 
      await timeUtil.delay(2000);
      this.dispatchIntent(RAW_MATERIAL_GET); 
      await timeUtil.delay(2000);
      
    }
    private currentModel: GrnModel = new GrnModel(); 
    private uomData: UomModel = new UomModel();
    private componentData: ComponentModel = new ComponentModel();
    private currencyData: CurrencyModel = new CurrencyModel();
    private stncustomData: StncustomModel = new StncustomModel();
    private supplierData: SupplierModel = new SupplierModel();
    private rmData: RawMaterialModel = new RawMaterialModel(); 
    personForm: FormGroup;
    private intention : number = UPDATE;    
    display: boolean = false;
    
    isTargetCheckbox : boolean = false;
    selected : any;
    
    formTitle: string = "New GRN"; 
    rmCurrency: string = "-";
    newSizeCount: number = 1;
    dataList : Array<any> = new Array<any>(); 
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
    }; 
      
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
        'required': 'SST is required.' 
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
    uomRows2 = [];
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
           [GRN_DELETE_SUCCESS, GRN_SAVE_SUCCESS, GRN_GET_OK, UOM_GET_OK, COMPONENT_GET_OK, CURRENCY_GET_OK, STNCUSTOM_GET_OK, SUPPLIER_GET_OK, RAW_MATERIAL_GET_OK]));
        }); 
        
        this.setFormValidation('');
      }
      
      ngAfterViewInit() {       
        
        this.getGrnComponentData();
      }
      
      save()
      {     
        
        let data = this.formUtil.commit();        
        if (this.intention == ADD)
        {
          data.grnid = 0;
        }
        else {                   
          data.grnid = this.currentModel.grnid;         
        }
          
		//this.currentModel.supplierName = data.supplierName; 
	    	this.currentModel.grndate =  new Date(data.grndate);
        this.currentModel.lotno = data.lotno;
        this.currentModel.supplierId = data.supplierId; 
        this.currentModel.rmid = data.rmid;  
        this.currentModel.sizeCount = data.sizeCount;  

        this.currentModel.height1 = data.height1;
        this.currentModel.heightUom1 = data.heightUom1;
        this.currentModel.width1 = data.width1;
        this.currentModel.widthUom1 = data.widthUom1;
        this.currentModel.thick1 = data.thick1;
        this.currentModel.thickUom1 = data.thickUom1;
        this.currentModel.wgt1 = data.wgt1;
        this.currentModel.roll1 = data.roll1;
        this.currentModel.rollUom1 = data.rollUom1;

        this.currentModel.height2 = data.height2;
        this.currentModel.heightUom2 = data.heightUom2;
        this.currentModel.width2 = data.width2;
        this.currentModel.widthUom2 = data.widthUom2;
        this.currentModel.thick2 = data.thick2;
        this.currentModel.thickUom2 = data.thickUom2;
        this.currentModel.wgt2 = data.wgt2;
        this.currentModel.roll2 = data.roll2;
        this.currentModel.rollUom2 = data.rollUom2;

        this.currentModel.height3 = data.height3;
        this.currentModel.heightUom3 = data.heightUom3;
        this.currentModel.width3 = data.width3;
        this.currentModel.widthUom3 = data.widthUom3;
        this.currentModel.thick3 = data.thick3;
        this.currentModel.thickUom3 = data.thickUom3;
        this.currentModel.wgt3 = data.wgt3;
        this.currentModel.roll3 = data.roll3;
        this.currentModel.rollUom3 = data.rollUom3;

        this.currentModel.height4 = data.height4;
        this.currentModel.heightUom4 = data.heightUom4;
        this.currentModel.width4 = data.width4;
        this.currentModel.widthUom4 = data.widthUom4;
        this.currentModel.thick4 = data.thick4;
        this.currentModel.thickUom4 = data.thickUom4;
        this.currentModel.wgt4 = data.wgt4;
        this.currentModel.roll4 = data.roll4;
        this.currentModel.rollUom4 = data.rollUom4;

        this.currentModel.height5 = data.height5;
        this.currentModel.heightUom5 = data.heightUom5;
        this.currentModel.width5 = data.width5;
        this.currentModel.widthUom5 = data.widthUom5;
        this.currentModel.thick5 = data.thick5;
        this.currentModel.thickUom5 = data.thickUom5;
        this.currentModel.wgt5 = data.wgt5;
        this.currentModel.roll5 = data.roll5;
        this.currentModel.rollUom5 = data.rollUom5;

        this.currentModel.height6 = data.height6;
        this.currentModel.heightUom6 = data.heightUom6;
        this.currentModel.width6 = data.width6;
        this.currentModel.widthUom6 = data.widthUom6;
        this.currentModel.thick6 = data.thick6;
        this.currentModel.thickUom6 = data.thickUom6;
        this.currentModel.wgt6 = data.wgt6;
        this.currentModel.roll6 = data.roll6;
        this.currentModel.rollUom6 = data.rollUom6;

        this.currentModel.height7 = data.height7;
        this.currentModel.heightUom7 = data.heightUom7;
        this.currentModel.width7 = data.width7;
        this.currentModel.widthUom7 = data.widthUom7;
        this.currentModel.thick7 = data.thick7;
        this.currentModel.thickUom7 = data.thickUom7;
        this.currentModel.wgt7 = data.wgt7;
        this.currentModel.roll7 = data.roll7;
        this.currentModel.rollUom7 = data.rollUom7;

        this.currentModel.height8 = data.height8;
        this.currentModel.heightUom8 = data.heightUom8;
        this.currentModel.width8 = data.width8;
        this.currentModel.widthUom8 = data.widthUom8;
        this.currentModel.thick8 = data.thick8;
        this.currentModel.thickUom8 = data.thickUom8;
        this.currentModel.wgt8 = data.wgt8;
        this.currentModel.roll8 = data.roll8;
        this.currentModel.rollUom8 = data.rollUom8;

        this.currentModel.height9 = data.height9;
        this.currentModel.heightUom9 = data.heightUom9;
        this.currentModel.width9 = data.width9;
        this.currentModel.widthUom9 = data.widthUom9;
        this.currentModel.thick9 = data.thick9;
        this.currentModel.thickUom9 = data.thickUom9;
        this.currentModel.wgt9 = data.wgt9;
        this.currentModel.roll9 = data.roll9;
        this.currentModel.rollUom9 = data.rollUom9;

        this.currentModel.height10 = data.height10;
        this.currentModel.heightUom10 = data.heightUom10;
        this.currentModel.width10 = data.width10;
        this.currentModel.widthUom10 = data.widthUom10;
        this.currentModel.thick10 = data.thick10;
        this.currentModel.thickUom10 = data.thickUom10;
        this.currentModel.wgt10 = data.wgt10;
        this.currentModel.roll10 = data.roll10;
        this.currentModel.rollUom10 = data.rollUom10;

        this.currentModel.height11 = data.height11;
        this.currentModel.heightUom11 = data.heightUom11;
        this.currentModel.width11 = data.width11;
        this.currentModel.widthUom11 = data.widthUom11;
        this.currentModel.thick11 = data.thick11;
        this.currentModel.thickUom11 = data.thickUom11;
        this.currentModel.wgt11 = data.wgt11;
        this.currentModel.roll11 = data.roll11;
        this.currentModel.rollUom11 = data.rollUom11;

        this.currentModel.height12 = data.height12;
        this.currentModel.heightUom12 = data.heightUom12;
        this.currentModel.width12 = data.width12;
        this.currentModel.widthUom12 = data.widthUom12;
        this.currentModel.thick12 = data.thick12;
        this.currentModel.thickUom12 = data.thickUom12;
        this.currentModel.wgt12 = data.wgt12;
        this.currentModel.roll12 = data.roll12;
        this.currentModel.rollUom12 = data.rollUom12;

        this.currentModel.height13 = data.height13;
        this.currentModel.heightUom13 = data.heightUom13;
        this.currentModel.width13 = data.width13;
        this.currentModel.widthUom13 = data.widthUom13;
        this.currentModel.thick13 = data.thick13;
        this.currentModel.thickUom13 = data.thickUom13;
        this.currentModel.wgt13 = data.wgt13;
        this.currentModel.roll13 = data.roll13;
        this.currentModel.rollUom13 = data.rollUom13;

        this.currentModel.height14 = data.height14;
        this.currentModel.heightUom14 = data.heightUom14;
        this.currentModel.width14 = data.width14;
        this.currentModel.widthUom14 = data.widthUom14;
        this.currentModel.thick14 = data.thick14;
        this.currentModel.thickUom14 = data.thickUom14;
        this.currentModel.wgt14 = data.wgt14;
        this.currentModel.roll14 = data.roll14;
        this.currentModel.rollUom14 = data.rollUom14;

        this.currentModel.height15 = data.height15;
        this.currentModel.heightUom15 = data.heightUom15;
        this.currentModel.width15 = data.width15;
        this.currentModel.widthUom15 = data.widthUom15;
        this.currentModel.thick15 = data.thick15;
        this.currentModel.thickUom15 = data.thickUom15;
        this.currentModel.wgt15 = data.wgt15;
        this.currentModel.roll15 = data.roll15;
        this.currentModel.rollUom15 = data.rollUom15;


        this.currentModel.dom = data.dom;
        this.currentModel.dono = data.dono;
        this.currentModel.stncustomId = data.stncustomId;
        this.currentModel.componentId = data.componentId;
        this.currentModel.kaswgt = data.kaswgt;
        this.currentModel.dutyImp = data.dutyImp;
        this.currentModel.gst = data.gst;
        this.currentModel.cif = data.cif;
        this.currentModel.customDate = new Date(data.customDate);
        this.currentModel.customNo = data.customNo;
        this.currentModel.dutyExcise = data.dutyExcise;
        this.currentModel.invoiceNo = data.invoiceNo;
        this.currentModel.currencyId = data.currencyId;
        this.currentModel.amountCurrency = data.amountCurrency;
        this.currentModel.exRate = data.exRate;
        this.currentModel.amount = data.amount;
        this.currentModel.pono = data.pono;
        this.currentModel.otdlate = data.otdlate;
        this.currentModel.fwdInvNo = data.fwdInvNo;
        this.currentModel.amt = data.amt;
        this.currentModel.forwarder = data.forwarder;
        this.currentModel.docRefNo = data.docRefNo;
        this.currentModel.vcarno = data.vcarno;
        this.currentModel.impFreight = data.impFreight;
        this.currentModel.currencyAdj = data.currencyAdj;
        this.currentModel.termChrg = data.termChrg;
        this.currentModel.aprtTxFee = data.aprtTxFee;
        this.currentModel.delivery = data.delivery;
        this.currentModel.handFwd = data.handFwd;
        this.currentModel.customExamFee = data.customExamFee;
        this.currentModel.collectFee = data.collectFee;
        this.currentModel.cargoPrmt = data.cargoPrmt;
        this.currentModel.docFee = data.docFee;
        this.currentModel.breakBulk = data.breakBulk;
        this.currentModel.edifee = data.edifee;
        this.currentModel.freightGst = data.freightGst;
        this.currentModel.totalFreightCost = data.totalFreightCost;
        this.currentModel.totalFreightRmcost = data.totalFreightRmcost;
        
        console.log(data);
        this.dispatchIntent(GRN_SAVE, data);       
        
        this.display = false; 
      } 

      testsave(){
        let a =  {"randomUniqueId":null,"grnid":0,"grndate":"2019-01-23T15:42:19.942Z","lotno":"weqwe","supplierId":"2","rmid":"1","sizeCount":1,"height1":4,"heightUom1":1,"width1":3,"widthUom1":5,"thick1":3,"thickUom1":"2","wgt1":3,"roll1":3,"rollUom1":"8","height2":0,"heightUom2":1,"width2":0,"widthUom2":5,"thick2":0,"thickUom2":0,"wgt2":0,"roll2":0,"rollUom2":0,"height3":0,"heightUom3":1,"width3":0,"widthUom3":5,"thick3":0,"thickUom3":0,"wgt3":0,"roll3":0,"rollUom3":0,"height4":0,"heightUom4":1,"width4":0,"widthUom4":5,"thick4":0,"thickUom4":0,"wgt4":0,"roll4":0,"rollUom4":0,"height5":0,"heightUom5":1,"width5":0,"widthUom5":5,"thick5":0,"thickUom5":0,"wgt5":0,"roll5":0,"rollUom5":0,"height6":0,"heightUom6":1,"width6":0,"widthUom6":5,"thick6":0,"thickUom6":0,"wgt6":0,"roll6":0,"rollUom6":0,"height7":0,"heightUom7":1,"width7":0,"widthUom7":5,"thick7":0,"thickUom7":0,"wgt7":0,"roll7":0,"rollUom7":0,"height8":0,"heightUom8":1,"width8":0,"widthUom8":5,"thick8":0,"thickUom8":0,"wgt8":0,"roll8":0,"rollUom8":0,"height9":0,"heightUom9":1,"width9":0,"widthUom9":5,"thick9":0,"thickUom9":0,"wgt9":0,"roll9":0,"rollUom9":0,"height10":0,"heightUom10":1,"width10":0,"widthUom10":5,"thick10":0,"thickUom10":0,"wgt10":0,"roll10":0,"rollUom10":0,"height11":0,"heightUom11":1,"width11":0,"widthUom11":5,"thick11":0,"thickUom11":0,"wgt11":0,"roll11":0,"rollUom11":0,"height12":0,"heightUom12":1,"width12":0,"widthUom12":5,"thick12":0,"thickUom12":0,"wgt12":0,"roll12":0,"rollUom12":0,"height13":0,"heightUom13":1,"width13":0,"widthUom13":5,"thick13":0,"thickUom13":0,"wgt13":0,"roll13":0,"rollUom13":0,"height14":0,"heightUom14":1,"width14":0,"widthUom14":5,"thick14":0,"thickUom14":0,"wgt14":0,"roll14":0,"rollUom14":0,"height15":0,"heightUom15":1,"width15":0,"widthUom15":5,"thick15":0,"thickUom15":0,"wgt15":0,"roll15":0,"rollUom15":0,"dom":"2019-01-23T15:42:19.943Z","dono":"243234","stncustomId":"4","componentId":"2","kaswgt":4,"dutyImp":4,"gst":4,"cif":4,"customDate":"2019-01-23T15:42:19.943Z","dutyExcise":324,"invoiceNo":"324234234","currencyId":"2","amountCurrency":423,"exRate":4,"amount":0,"pono":"23423","otdlate":"234234","fwdInvNo":"234","amt":4,"forwarder":"234","docRefNo":"234234","vcarno":"234","impFreight":4,"currencyAdj":"","termChrg":4,"aprtTxFee":4,"delivery":4,"handFwd":4,"customExamFee":4,"collectFee":4,"cargoPrmt":"234234","docFee":4,"breakBulk":4,"freightGst":4,"totalFreightCost":0,"totalFreightRmcost":0,"edifee":4,"customNo":"324"};

        this.dispatchIntent(GRN_SAVE, a);
      }
	  
	  recalculateAmount(){
        
        if (!this.personForm) { return; }
        console.log(this.personForm); 
        this.RMAmount =  this.personForm.value.amountCurrency * this.personForm.value.exRate;
        this.TotalFreightCost = this.personForm.value.impFreight +    
        this.personForm.value.termChrg + 
        this.personForm.value.aprtTxFee + 
        this.personForm.value.delivery + 
        this.personForm.value.handFwd + 
        this.personForm.value.customExamFee + 
        this.personForm.value.collectFee +  
        this.personForm.value.docFee + 
        this.personForm.value.breakBulk + 
        this.personForm.value.edifee + 
        this.personForm.value.freightGst;

        this.TotalFreightRMCost = this.RMAmount + this.TotalFreightCost;
      }
      
 
      private setFormValidation(id :any) {
        
        this.personForm = this.fb.group({   
        'grnid': [id], 
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
       
      
      private ResetForm() {
         
      }
      
      private configureAddForm()
      {
        this.ResetForm();
        
        this.currentModel = new GrnModel(); 
        this.currentModel.grnid = null; 
        this.currentModel.grncode = '';
        this.currentModel.grndate = new Date();
        this.currentModel.lotno = '';
        this.currentModel.supplierId = 0;
        this.currentModel.rmid = 0;
        this.currentModel.sizeCount = 1;

        this.currentModel.height1 = 0;
        this.currentModel.heightUom1 = 1;
        this.currentModel.width1 = 0; 
        this.currentModel.widthUom1 = 5; 
        this.currentModel.thick1 = 0;
        this.currentModel.thickUom1 = 0;
        this.currentModel.wgt1 = 0;
        this.currentModel.roll1 = 0;
        this.currentModel.rollUom1 = 0; 

        this.currentModel.height2 = 0;
        this.currentModel.heightUom2 = 1;
        this.currentModel.width2 = 0; 
        this.currentModel.widthUom2 = 5; 
        this.currentModel.thick2 = 0;
        this.currentModel.thickUom2 = 0;
        this.currentModel.wgt2 = 0;
        this.currentModel.roll2 = 0;
        this.currentModel.rollUom2 = 0; 
        
        this.currentModel.height3 = 0;
        this.currentModel.heightUom3 = 1;
        this.currentModel.width3 = 0; 
        this.currentModel.widthUom3 = 5; 
        this.currentModel.thick3 = 0;
        this.currentModel.thickUom3 = 0;
        this.currentModel.wgt3 = 0;
        this.currentModel.roll3 = 0;
        this.currentModel.rollUom3 = 0; 
        
        this.currentModel.height4 = 0;
        this.currentModel.heightUom4 = 1;
        this.currentModel.width4 = 0; 
        this.currentModel.widthUom4 = 5; 
        this.currentModel.thick4 = 0;
        this.currentModel.thickUom4 = 0;
        this.currentModel.wgt4 = 0;
        this.currentModel.roll4 = 0;
        this.currentModel.rollUom4 = 0; 
        
        this.currentModel.height5 = 0;
        this.currentModel.heightUom5 = 1;
        this.currentModel.width5 = 0; 
        this.currentModel.widthUom5 = 5; 
        this.currentModel.thick5 = 0;
        this.currentModel.thickUom5 = 0;
        this.currentModel.wgt5 = 0;
        this.currentModel.roll5 = 0;
        this.currentModel.rollUom5 = 0; 
        
        this.currentModel.height6 = 0;
        this.currentModel.heightUom6 = 1;
        this.currentModel.width6 = 0; 
        this.currentModel.widthUom6 = 5; 
        this.currentModel.thick6 = 0;
        this.currentModel.thickUom6 = 0;
        this.currentModel.wgt6 = 0;
        this.currentModel.roll6 = 0;
        this.currentModel.rollUom6 = 0; 
        
        this.currentModel.height7 = 0;
        this.currentModel.heightUom7 = 1;
        this.currentModel.width7 = 0; 
        this.currentModel.widthUom7 = 5; 
        this.currentModel.thick7 = 0;
        this.currentModel.thickUom7 = 0;
        this.currentModel.wgt7 = 0;
        this.currentModel.roll7 = 0;
        this.currentModel.rollUom7 = 0; 
        
        this.currentModel.height8 = 0;
        this.currentModel.heightUom8 = 1;
        this.currentModel.width8 = 0; 
        this.currentModel.widthUom8 = 5; 
        this.currentModel.thick8 = 0;
        this.currentModel.thickUom8 = 0;
        this.currentModel.wgt8 = 0;
        this.currentModel.roll8 = 0;
        this.currentModel.rollUom8 = 0; 
        
        this.currentModel.height9 = 0;
        this.currentModel.heightUom9 = 1;
        this.currentModel.width9 = 0; 
        this.currentModel.widthUom9 = 5; 
        this.currentModel.thick9 = 0;
        this.currentModel.thickUom9 = 0;
        this.currentModel.wgt9 = 0;
        this.currentModel.roll9 = 0;
        this.currentModel.rollUom9 = 0; 
        
        this.currentModel.height10 = 0;
        this.currentModel.heightUom10 = 1;
        this.currentModel.width10 = 0; 
        this.currentModel.widthUom10 = 5; 
        this.currentModel.thick10 = 0;
        this.currentModel.thickUom10 = 0;
        this.currentModel.wgt10 = 0;
        this.currentModel.roll10 = 0;
        this.currentModel.rollUom10 = 0; 
        
        this.currentModel.height11 = 0;
        this.currentModel.heightUom11 = 1;
        this.currentModel.width11 = 0; 
        this.currentModel.widthUom11 = 5; 
        this.currentModel.thick11 = 0;
        this.currentModel.thickUom11 = 0;
        this.currentModel.wgt11 = 0;
        this.currentModel.roll11 = 0;
        this.currentModel.rollUom11 = 0; 
        
        this.currentModel.height12 = 0;
        this.currentModel.heightUom12 = 1;
        this.currentModel.width12 = 0; 
        this.currentModel.widthUom12 = 5; 
        this.currentModel.thick12 = 0;
        this.currentModel.thickUom12 = 0;
        this.currentModel.wgt12 = 0;
        this.currentModel.roll12 = 0;
        this.currentModel.rollUom12 = 0; 
        
        this.currentModel.height13 = 0;
        this.currentModel.heightUom13 = 1;
        this.currentModel.width13 = 0; 
        this.currentModel.widthUom13 = 5; 
        this.currentModel.thick13 = 0;
        this.currentModel.thickUom13 = 0;
        this.currentModel.wgt13 = 0;
        this.currentModel.roll13 = 0;
        this.currentModel.rollUom13 = 0; 
        
        this.currentModel.height14 = 0;
        this.currentModel.heightUom14 = 1;
        this.currentModel.width14 = 0; 
        this.currentModel.widthUom14 = 5; 
        this.currentModel.thick14 = 0;
        this.currentModel.thickUom14 = 0;
        this.currentModel.wgt14 = 0;
        this.currentModel.roll14 = 0;
        this.currentModel.rollUom14 = 0; 
        
        this.currentModel.height15 = 0;
        this.currentModel.heightUom15 = 1;
        this.currentModel.width15 = 0; 
        this.currentModel.widthUom15 = 5; 
        this.currentModel.thick15 = 0;
        this.currentModel.thickUom15 = 0;
        this.currentModel.wgt15 = 0;
        this.currentModel.roll15 = 0;
        this.currentModel.rollUom15 = 0; 
         
        
        this.currentModel.dom = new Date();
        this.currentModel.dono = '';
        this.currentModel.stncustomId = 0;
        this.currentModel.componentId = 0;
        this.currentModel.kaswgt = 0;
        this.currentModel.dutyImp = 0;
        this.currentModel.gst = 0;
        this.currentModel.cif = 0;
        this.currentModel.customDate = new Date();
        this.currentModel.dutyExcise = 0;
        this.currentModel.invoiceNo = '';    
        this.currentModel.currencyId = 1;
        this.currentModel.amountCurrency = 0;
        this.currentModel.exRate = 0;
        this.currentModel.amount = 0;
        this.currentModel.pono = '';
        this.currentModel.otdlate = '';
        this.currentModel.fwdInvNo = ''; 
        this.currentModel.amt = 0;
        this.currentModel.forwarder = '';
        this.currentModel.docRefNo = '';
        this.currentModel.vcarno = '';
        this.currentModel.impFreight = 0;
        this.currentModel.currencyAdj = '';
        this.currentModel.termChrg = 0;
        this.currentModel.aprtTxFee = 0;
        this.currentModel.delivery = 0;
        this.currentModel.handFwd = 0;
        this.currentModel.customExamFee = 0;
        this.currentModel.collectFee = 0;
        this.currentModel.cargoPrmt = '';
        this.currentModel.docFee = 0;
        this.currentModel.breakBulk = 0;
        this.currentModel.freightGst = 0;
        this.currentModel.totalFreightCost = 0;
        this.currentModel.totalFreightRmcost = 0;
        this.currentModel.edifee = 0;
        this.currentModel.customNo = '';

        this.rmCurrency = "MYR";
        
        this.formUtil = new FormUtil<GrnModel>(this.currentModel, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.personForm = userform;        
        this.personForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));     
      }
      
      private configureEditForm() {           
        this.ResetForm();    
      }
      
      onValueChanged(data?: GrnModel) {
        
        if (!this.personForm) { return; }              
        
        const form = this.personForm;
        
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
      
      componentMessageHandle(messageAll : Array<any>) {
        //console.log("messageAll",messageAll);
        messageAll.map(async message => {  
          
          if (message && message.type == GRN_GET_OK)
          {            
            this.rows.length = 0;
            this.dataList.length = 0;
            
            for (var userInfo of message.data.data.data)
            {               
              let model  = new GrnModel();
              model = {...userInfo};
              this.dataList.push(model);
            }        
            
            this.rows = [...this.dataList];
          }    
          
          if (message && (message.type == GRN_SAVE_SUCCESS
            || message.type == GRN_DELETE_SUCCESS))
            {                  
              this.display = false; 
              await timeUtil.delay(TIME_DELAY);
              this.getGrnList();
            }    
           
            if (message && message.type == SUPPLIER_GET_OK)
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
           
            if (message && message.type == RAW_MATERIAL_GET_OK)
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
			
			if (message && message.type == UOM_GET_OK)
            { 
                this.uomRows.length = 0;
                this.uomRows2.length = 0;
				this.uomRow.length = 0;
				let uomDataList = new Array<any>(); 
				let uomDataList2 = new Array<any>(); 
				
				uomDataList.push({   
				  uomId : 0,
				  uomCode : '',
				  uomName : '',
				  uomTypeId : null 
        });
        
        uomDataList2.push({   
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
        
        
				for (var oumDataItem of uomDataSource)
				{
				  var uomDataInfo = {...oumDataItem};              
				  if(uomDataInfo.uomTypeId != 2) continue;
				  
				  uomDataList2.push(uomDataInfo);   
				}  
				
				this.uomRows = [...uomDataList];
				this.uomRows2 = [...uomDataList2];
            } 
			
			if (message && message.type == COMPONENT_GET_OK)
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
			
			if (message && message.type == CURRENCY_GET_OK)
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
			if (message && message.type == STNCUSTOM_GET_OK)
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
        
        editForm(evt : any) {
          
          if (evt && evt.row && evt.row.grnid) {
            
            let targetDataId = evt.row.grnid;
            
            if (targetDataId) 
            {
              this.currentModel = this.rows.find(x => x.grnid == targetDataId);     
              
              if (this.currentModel)
              {
                this.itemSelected = true;   

                 // Force a date - otherwise throw exception in the form //

                if (this.currentModel.grndate)
                    this.currentModel.grndate = new Date(this.currentModel.grndate);
                if (this.currentModel.customDate)
                    this.currentModel.customDate = new Date(this.currentModel.customDate);
                if (this.currentModel.dom)
                    this.currentModel.dom = new Date(this.currentModel.dom)
                
                this.formUtil = new FormUtil<GrnModel>(this.currentModel, this.formValidators);
                let userform = this.formUtil.createForm(false);
                this.personForm = userform;
                
          
                this.recalculateAmount();

                this.onCurrencyChange(String(this.currentModel.currencyId));
                this.newSizeCount = this.currentModel.sizeCount;

                this.personForm.valueChanges.debounceTime(300)
                .subscribe(data => this.onValueChanged(data));
                
              }
              else 
              this.itemSelected = false;
              
              this.edit(this.currentModel.grncode);         
              this.display = true; 
            }
          }
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
          
          if (confirm(DELETE_GRN_PROMPT)) {
             
            if (this.selected && this.selected.length > 0)
            {       
              console.log("this.selected",this.selected);
              let deleItems = this.selected.map( x  => x.grnid);
              console.log("deleItems",deleItems);
              if (deleItems)
              {
                this.dispatchIntent(GRN_DELETE, { 'deleteItems' : deleItems.join(DELETE_ITEM_DELIMITER)});
              }
            }
          }
        }
        
        onSelect(evt: any) {     
          this.selected = evt.selected;      
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
           
        }                
         
        cancel() 
        {
          this.display = false;     
          this.itemSelected = false;          
        }    
        
        getGrnList() {
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
        
        