import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, GRN_SAVE, GRN_GET_OK, GRN_GET,  
UOM_GET, UOM_GET_OK, 
COMPONENT_GET, COMPONENT_GET_OK, 
CURRENCY_GET, CURRENCY_GET_OK, 
STNCUSTOM_GET, STNCUSTOM_GET_OK } from '../../sharedObjects/sharedMessages';
import { GrnModel } from "../../model/GrnModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { UomModel } from "../../model/UomModel";
import { StncustomModel } from "../../model/StncustomModel"; 
import { CurrencyModel } from "../../model/CurrencyModel";  
import { ComponentModel } from "../../model/ComponentModel";  
import { CalendarModule } from 'primeng/calendar';


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
  private dataForm: FormGroup;

  dataList : Array<any> = new Array<any>(); 
  uomDataList : Array<any> = new Array<any>(); 
  componentDataList : Array<any> = new Array<any>(); 
  currencyDataList : Array<any> = new Array<any>(); 
  stncustomDataList : Array<any> = new Array<any>(); 

  formErrors = {
    'grnid': '',
    'grndate': '', 
    'lotno': '',
    'supplierId': '' ,
    'rmid': ''

  };
 
  
  validationMessages = {    
    'grndate': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 4 characters long.',
      'maxlength': 'First Name cannot be more than 24 characters long.'
    },
    'lotno': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 4 characters long.',
      'maxlength': 'Last Name cannot be more than 24 characters long.'
    }  
  };

  userSubscription : Subscription;
  
  rows = [];
  uomRows = [];
  componentRows = [];
  stncustomRows = [];
  currencyRows = [];

  columns = [
    { prop: 'grnid', name : 'Id' },
    { prop: 'grndate', name : 'Date' },
    { prop: 'lotno', name : 'LOT No' },
    { prop: 'amount', name : 'Raw Mat. Amt' },
    { prop: 'totalFreightCost', name : 'Freight Cost' },
    { prop: 'totalFreightRmcost', name : 'Total Freight  & Raw Mat. Cost' }      
  ];

  constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }

  name : string; 
  description : string; 

  ngOnInit() {

    this.userSubscription = this.store.subscribe(appData => {           
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, GRN_GET_OK), GRN_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, UOM_GET_OK), UOM_GET_OK)); 
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, COMPONENT_GET_OK), COMPONENT_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, CURRENCY_GET_OK), CURRENCY_GET_OK));
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, STNCUSTOM_GET_OK), STNCUSTOM_GET_OK));
    }); 

    this.initForm();
  }
  
  ngAfterViewInit() {

    this.dispatchIntent(GRN_GET);
    this.dispatchIntent(UOM_GET);
    this.dispatchIntent(COMPONENT_GET);
    this.dispatchIntent(CURRENCY_GET);
    this.dispatchIntent(STNCUSTOM_GET);
 }
  
  save()
  {
      var saveJson = new GrnModel();
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

    var strJson = JSON.stringify(saveJson);           
    this.dispatchIntent(GRN_SAVE, saveJson);
    this.dataForm.reset();
       
  } 

    private initForm() {
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
      this.dataForm.valueChanges.debounceTime(500)
        .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: GrnModel) {

      console.log('test1');
      if (!this.dataForm) { return; }
  
      console.log('test');
      const form = this.dataForm; 
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
      this.data.amount = data.amount;
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
      this.data.totalFreightCost = data.totalFreightCost;
      this.data.totalFreightRmcost = data.totalFreightRmcost;

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
            grndate : dataInfo.grndate,
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
            dom : dataInfo.dom,
            dono : dataInfo.dono,
            stncustomId : dataInfo.stncustomId,
            componentId : dataInfo.componentId,
            kaswgt : dataInfo.kaswgt,
            dutyImp : dataInfo.dutyImp,
            gst : dataInfo.gst,
            cif : dataInfo.cif,
            customDate : dataInfo.customDate,
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
      
      else if (message && message.type == UOM_GET_OK)
      {
        this.uomRows.length = 0;
        for (var idx in message.data)
        {
          var uomDataInfo = message.data[idx] as UomModel;    
          this.uomDataList.push({   
            uomId : uomDataInfo.uomId,
            uomCode : uomDataInfo.uomCode,
            uomName : uomDataInfo.uomName,
            uomTypeId : uomDataInfo.uomTypeId  
          });
        }

        this.uomRows = this.uomDataList;
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

