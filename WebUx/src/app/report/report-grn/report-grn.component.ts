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
    dataList : Array<any> = new Array<any>(); 
    //uomDataList : Array<any> = new Array<any>(); 
    componentDataList : Array<any> = new Array<any>(); 
    currencyDataList : Array<any> = new Array<any>(); 
    stncustomDataList : Array<any> = new Array<any>(); 
    supplierDataList : Array<any> = new Array<any>(); 
    rmDataList : Array<any> = new Array<any>(); 
    formUtil : FormUtil<GrnModel>;
        
    formValidators = {   
      'grnid': [],
      'grndate': [Validators.required, Validators.minLength(1)], 
      'lotno': [Validators.required, Validators.minLength(1)], 
      'supplierId': [Validators.required, Validators.minLength(1), Validators.min(1)], 
      'rmid': [Validators.required, Validators.minLength(1), Validators.min(1)],  
      'height': [Validators.required, Validators.minLength(1)],
      'heightUom': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'width': [Validators.required, Validators.minLength(1)],
      'widthUom': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'thick': [Validators.required, Validators.minLength(1)],
      'thickUom': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'wgt': [Validators.required, Validators.minLength(1)],
      'roll': [Validators.required, Validators.minLength(1)],
      'rollUom': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'dom': [Validators.required, Validators.minLength(1)],
      'dono': [Validators.required, Validators.minLength(1)],
      'stncustomId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'componentId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'kaswgt': [Validators.required, Validators.minLength(1)],
      'dutyImp': [Validators.required, Validators.minLength(1)],
      'gst': [Validators.required, Validators.minLength(1)],
      'cif': [Validators.required, Validators.minLength(1)],
      'customDate': [Validators.required, Validators.minLength(1)],
      'customNo': [Validators.required, Validators.minLength(1)],
      'dutyExcise': [],
      'invoiceNo': [Validators.required, Validators.minLength(1)],
      'currencyId': [Validators.required, Validators.minLength(1), Validators.min(1)],
      'amountCurrency': [Validators.required, Validators.minLength(1)],
      'exRate': [Validators.required, Validators.minLength(1)],
      'amount': [Validators.required, Validators.minLength(1)],
      'pono': [Validators.required, Validators.minLength(1)],
      'otdlate': [Validators.required, Validators.minLength(1)],
      'fwdInvNo': [Validators.required, Validators.minLength(1)],
      'amt': [Validators.required, Validators.minLength(1)],
      'forwarder': [Validators.required, Validators.minLength(1)],
      'docRefNo': [Validators.required, Validators.minLength(1)],
      'vcarno': [Validators.required, Validators.minLength(1)],
      'impFreight': [Validators.required, Validators.minLength(1)],
      'currencyAdj': [],
      'termChrg': [Validators.required, Validators.minLength(1)],
      'aprtTxFee': [Validators.required, Validators.minLength(1)],
      'delivery': [Validators.required, Validators.minLength(1)],
      'handFwd': [Validators.required, Validators.minLength(1)],
      'customExamFee': [Validators.required, Validators.minLength(1)],
      'collectFee': [Validators.required, Validators.minLength(1)],
      'cargoPrmt': [Validators.required, Validators.minLength(1)],
      'docFee': [Validators.required, Validators.minLength(1)],
      'breakBulk': [Validators.required, Validators.minLength(1)],
      'edifee': [Validators.required, Validators.minLength(1)],
      'freightGst': [Validators.required, Validators.minLength(1)],
      'totalFreightCost': [Validators.required, Validators.minLength(1)],
      'totalFreightRmcost': [Validators.required, Validators.minLength(1)]
    }    
    
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
        this.data.height = dataModel.height;
        this.data.heightUom = dataModel.heightUom;
        this.data.width = dataModel.width;
        this.data.widthUom = dataModel.widthUom;
        this.data.thick = dataModel.thick;
        this.data.thickUom = dataModel.thickUom;
        this.data.wgt = dataModel.wgt;
        this.data.roll = dataModel.roll;
        this.data.rollUom = dataModel.rollUom;
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
      
      onValueChanged(data?: GrnModel) {
        
        console.log('test1');
        if (!this.dataForm) { return; }
        
        console.log('test');
        const form = this.dataForm; 
                
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
              supplierName : ''
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
              rmdesc : ''
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
        model.grndate = new Date();
        model.lotno = '';
        model.supplierId = 0;
        model.rmid = 0;
        model.height = 0;
        model.heightUom = 0;
        model.width = 0;
        model.heightUom = 0;
        model.thick = 0;
        model.thickUom = 0;
        model.wgt = 0;
        model.roll = 0;
        model.rollUom = 0; 
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
          'dutyExcise': [''],
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
          
          this.dataForm.valueChanges.debounceTime(300)
          .subscribe(data => this.onValueChanged(data));
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
      
      