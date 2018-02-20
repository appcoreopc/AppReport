import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CityAppState, STN_CUSTOM_GET,
  ADD, UPDATE, STN_CUSTOM_GET_OK, STN_CUSTOM_SAVE, STN_CUSTOM_SAVE_SUCCESS
}
  from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { UserModel } from "../../model/UserModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StncustomModel } from '../../model/StncustomModel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormUtil } from "../../sharedObjects/formUtil";

@Component({
  selector: 'app-stn-custom-component',
  templateUrl: './stn-custom-component.component.html',
  styleUrls: ['./stn-custom-component.component.css']
})
export class StnCustomComponentComponent implements OnInit {

  personForm: FormGroup;
  private intention: number = UPDATE;
  formUtil: FormUtil<StncustomModel>;

  formErrors = {
    'stncustomId': '',
    'stncustomName': '',
    'isLocal': ''
  };

  validationMessages = {
    'stncustomName': {
      'required': 'STN KASTAM Name is required.'
    }
  };

  rows = [];

  columns = [
    { prop: 'stncustomId' },
    { name: 'stncustomName' },
    { name: 'isLocal' }
  ];

  userSubscription: Subscription;
  dataList: Array<any> = new Array<any>();

  display: boolean = false;
  itemSelected: boolean = false;
  formTitle: string = "New STN KASTAM";

  private stncustom: StncustomModel = new StncustomModel();

  formValidators = {
    'stncustomName': [Validators.required, Validators.minLength(1)],
    'isLocal': [Validators.required]
  }

  constructor(private store: Store<CityAppState>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.userSubscription = this.store.subscribe(appData => {

      this.componentMessageHandle(messageUtil.getMultiMessage(appData,
        [STN_CUSTOM_GET_OK, STN_CUSTOM_SAVE_SUCCESS]));
    });

    this.configureUpdateForm();
  }

  ngAfterViewInit() {
    this.dispatchIntent(STN_CUSTOM_GET);
  }

  componentMessageHandle(messageAll: Array<any>) {

    messageAll.map(message => {

      if (message && message.type == STN_CUSTOM_GET_OK) {
        this.rows.length = 0;
        for (var stncustomInfo of message.data.data.data) {
          this.dataList.push({
            stncustomId: stncustomInfo.stncustomId,
            stncustomName: stncustomInfo.stncustomName,
            isLocal: stncustomInfo.isLocal
          });

          this.rows = this.dataList;
        }
      }

      if (message && message.type == STN_CUSTOM_SAVE_SUCCESS) {
        this.display = false;
      }
    });
  }

  save() {

    let data = this.formUtil.commit();

    if (this.intention == ADD) {
      data.stncustomId = null;
    }
    else {

      data.stncustomId = this.stncustom.stncustomId;
      this.stncustom.stncustomName = data.stncustomName;
      this.stncustom.isLocal = data.isLocal;
    }

    this.rows = [...this.rows];
    this.dispatchIntent(STN_CUSTOM_SAVE, data);
    this.display = false;

  }

  private configureAddForm() {

    this.personForm = this.fb.group({
      'stncustomId': ['', [Validators.minLength(1)]],
      'stncustomName': ['', [Validators.required, Validators.minLength(1)]],
      'isLocal': [true]
    });

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));

  }

  private configureUpdateForm() {
    this.personForm = this.fb.group({
      'stncustomId': [this.stncustom.stncustomId, [Validators.minLength(1)]],
      'stncustomName': [this.stncustom.stncustomName, [Validators.required, Validators.minLength(1)]],
      'isLocal': ['']
    });

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: StncustomModel) {

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

    this.formTitle = "New STN KASTAM";
    this.display = true;
    this.intention = ADD;
    this.configureAddForm();
  }

  onSelect(evt: any) {

    debugger;
    if (evt && evt.selected && evt.selected.length > 0) {
      this.stncustom = evt.selected[0] as StncustomModel;
      this.itemSelected = true;

      this.formUtil = new FormUtil<StncustomModel>(this.stncustom, this.formValidators);
      let userform = this.formUtil.createForm(false);
      this.personForm = userform;

      this.personForm.valueChanges.debounceTime(500)
        .subscribe(data => this.onValueChanged(data));

      this.formTitle = "Edit STN KASTAM";
      this.intention = UPDATE;
      this.display = true;
    }
    else
      this.itemSelected = false;

  }

  cancel() {
    this.display = false;
    this.itemSelected = false;
    this.stncustom = this.formUtil.rollback();
  }
}