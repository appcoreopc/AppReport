import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CityAppState, SUPPLIER_GET,
  ADD, UPDATE, SUPPLIER_GET_OK, SUPPLIER_SAVE, SUPPLIER_SAVE_SUCCESS
}
  from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { SupplierModel } from "../../model/SupplierModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormUtil } from "../../sharedObjects/formUtil";
import * as timeUtil from "../../sharedObjects/timeUtil";
import {APPLICATION_HOST, TIME_DELAY } from '../../sharedObjects/applicationSetup';

@Component({
  selector: 'app-supplier-component',
  templateUrl: './supplier-component.component.html',
  styleUrls: ['./supplier-component.component.css']
})
export class SupplierComponentComponent implements OnInit {


  private supplier: SupplierModel = new SupplierModel();
  personForm: FormGroup;
  private intention: number = UPDATE;
  formUtil: FormUtil<SupplierModel>;

  formValidators = {
    'supplierId': [],
    'supplierName': [Validators.required, Validators.minLength(1), Validators.maxLength(24)]
  }

  formErrors = {
    'supplierId': '',
    'supplierName': ''
  };

  validationMessages = {
    'supplierName': {
      'required': 'Supplier Name is required.'
    }
  };

  rows = [];

  columns = [
    { prop: 'supplierId' },
    { name: 'supplierName' },
    { name: 'isLocal' }
  ];

  userSubscription: Subscription;
  dataList: Array<any> = new Array<any>();

  display: boolean = false;
  itemSelected: boolean = false;
  formTitle: string = "New Supplier";

  constructor(private store: Store<CityAppState>,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.userSubscription = this.store.subscribe(appData => {
      this.componentMessageHandle(messageUtil.getMultiMessage(appData,
        [SUPPLIER_GET_OK, SUPPLIER_SAVE_SUCCESS]));
    });

    this.configureUpdateForm();
  }

  ngAfterViewInit() {
    this.dispatchIntent(SUPPLIER_GET);
  }

  componentMessageHandle(messageAll: Array<any>) {

    messageAll.map(async message => {

      if (message && message.type == SUPPLIER_GET_OK) {

        this.rows.length = 0;
        this.dataList.length = 0;

        for (var supplierInfo of message.data.data.data) {
          let model = new SupplierModel();
          model = { ...supplierInfo };
          this.dataList.push(model);          
        }
        this.rows = [...this.dataList];
      }

      if (message && message.type == SUPPLIER_SAVE_SUCCESS) { 

        await timeUtil.delay(TIME_DELAY);
        this.getSupplier();   
        this.display = false;
      }
    });
  }

  save() {

    let data = this.formUtil.commit();

    if (this.intention == ADD) {      
      data.supplierId = null;
    }
    else {
      data.supplierId = this.supplier.supplierId;
      this.supplier.supplierName = data.supplierName;      
    }

    this.rows = [...this.rows]; 
    this.dispatchIntent(SUPPLIER_SAVE, data);
    this.display = false;

  }

  private configureAddForm() {
  
    this.supplier = new SupplierModel();
    this.supplier.supplierId = '';
    this.supplier.supplierName = '';

    this.formUtil = new FormUtil<SupplierModel>(this.supplier, 
      this.formValidators);

    let userform = this.formUtil.createForm(false);
    this.personForm = userform;

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  private configureUpdateForm() {
    this.personForm = this.fb.group({
      'supplierId': [this.supplier.supplierId, [Validators.minLength(1)]],
      'supplierName': [this.supplier.supplierName, [Validators.required, Validators.minLength(1)]]
    });

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: SupplierModel) {

    if (!this.personForm) { return; }

    const form = this.personForm;
    
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

  dispatchIntent(messageType: string, data?: any) {
    this.store.dispatch(
      {
        type: messageType,
        data: data
      });
  }

  addForm() {

    this.formTitle = "New Supplier";
    this.display = true;
    this.intention = ADD;

    this.configureAddForm();
  }

  onSelect(evt: any) {
    
    if (evt && evt.selected && evt.selected.length > 0) {
      this.supplier = evt.selected[0] as SupplierModel;
      this.itemSelected = true;
      this.formUtil = new FormUtil<SupplierModel>(this.supplier, this.formValidators);
      let userform = this.formUtil.createForm(false);
      this.personForm = userform;
    }
    else
      this.itemSelected = false;

    this.edit();
  }

  edit() {
    this.formTitle = "Edit Supplier";
    this.intention = UPDATE; 
    this.display = true;
  }

  cancel() {    
    this.display = false;
    this.supplier = this.formUtil.rollback();
    this.itemSelected = false;
  }

  getSupplier(): void {    
    this.dispatchIntent(SUPPLIER_GET);    
  }
}