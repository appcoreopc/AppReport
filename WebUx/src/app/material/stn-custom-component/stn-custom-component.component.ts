import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CityAppState, STN_CUSTOM_GET, STN_CUSTOM_DELETE, DELETE_STNCUSTOM_PROMPT,
  STN_CUSTOM_DELETE_SUCCESS,DELETE_ITEM_DELIMITER, 
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
import "rxjs/add/operator/debounceTime";
import * as timeUtil from '../../sharedObjects/timeUtil';
import { TIME_DELAY } from '../../sharedObjects/applicationSetup';

@Component({
  selector: 'app-stn-custom-component',
  templateUrl: './stn-custom-component.component.html',
  styleUrls: ['./stn-custom-component.component.css']
})
export class StnCustomComponentComponent implements OnInit {
  
  personForm: FormGroup;
  private intention: number = UPDATE;
  formUtil: FormUtil<StncustomModel>;
  isTargetCheckbox : boolean = false;
  selected : any;
  isLoading : boolean = false;
  
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
    'stncustomId': [],
    'stncustomName': [Validators.required, Validators.minLength(1)],
    'isLocal': [Validators.required]
  }
  
  constructor(private store: Store<CityAppState>,
    private fb: FormBuilder) { }
    
    ngOnInit() {
      this.userSubscription = this.store.subscribe(appData => {
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData,
          [STN_CUSTOM_GET_OK, STN_CUSTOM_DELETE_SUCCESS, STN_CUSTOM_SAVE_SUCCESS]));
        });
        
        this.configureUpdateForm();
      }
      
      ngAfterViewInit() {
        this.dispatchIntent(STN_CUSTOM_GET);
      }
      
      componentMessageHandle(messageAll: Array<any>) {
        
        messageAll.map(async message => {
          
          if (message && message.type == STN_CUSTOM_GET_OK) {
            
            this.rows.length = 0;
            this.dataList.length = 0;
            
            for (var stncustomInfo of message.data.data.data) {
              
              let model = new StncustomModel();
              model = {...stncustomInfo};
              this.dataList.push(model);         
            }
            this.rows = [...this.dataList];
          }
          
          if (message && (message.type == STN_CUSTOM_SAVE_SUCCESS || message.type == STN_CUSTOM_DELETE_SUCCESS)) 
          {
            if (this.isLoading == false)
            {
              this.isLoading = true;
              this.display = false;
              await timeUtil.delay(TIME_DELAY);        
              this.getStn();
            }
          }
        });
      }
      
      save() {
        
        this.isLoading = false;
        
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
        
        this.stncustom = new StncustomModel();
        this.stncustom.isLocal = false; 
        this.stncustom.stncustomId = 0;
        this.stncustom.stncustomName = '';
        
        this.formUtil = new FormUtil<StncustomModel>(this.stncustom, this.formValidators);
        let userform = this.formUtil.createForm(false);
        this.personForm = userform;
        
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
        messageUtil.dispatchIntent(this.store, messageType, data);
      }
      
      addForm() {
        
        this.formTitle = "New STN KASTAM";
        this.display = true;
        this.intention = ADD;
        this.configureAddForm();
      }
      
      editForm(evt: any) {
        
        debugger;
        
        if (evt && evt.row && evt.row.stncustomId) {
          
          let targetDataId = evt.row.stncustomId;
          
          if (targetDataId) 
          {
            this.stncustom = this.rows.find(x => x.stncustomId == targetDataId);     
            
            if (this.stncustom)
            {                  
              this.itemSelected = true;
              
              this.formUtil = new FormUtil<StncustomModel>(this.stncustom, this.formValidators);
              let userform = this.formUtil.createForm(false);
              this.personForm = userform;
              
              this.personForm.valueChanges.debounceTime(200)
              .subscribe(data => this.onValueChanged(data));
              
              this.formTitle = "Edit STN KASTAM";
              this.intention = UPDATE;
              this.display = true;
            }
            else
            this.itemSelected = false;
          }
        }
      }
      
      onActivate(evt) {      
        
        debugger;        
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
      
      onSelect(evt: any) {     
        this.selected = evt.selected;      
      }
      
      cancel() {
        this.display = false;
        this.itemSelected = false;
        this.stncustom = this.formUtil.rollback();
      }
      
      getStn(): any {
        this.dispatchIntent(STN_CUSTOM_GET);
      }
      
      deleteForm() 
      {     
        if (confirm(DELETE_STNCUSTOM_PROMPT)) { 
          
          if (this.selected && this.selected.length > 0)
          {       
            let deleItems = this.selected.map( x  => x.stncustomId);
            if (deleItems)
            {
              this.isLoading = false;
              this.dispatchIntent(STN_CUSTOM_DELETE, { 'deleteItems' : deleItems.join(DELETE_ITEM_DELIMITER)});
            }
          }
        }
      }
      
    }