import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {FormUtil} from "../../sharedObjects/formUtil";

import { CityAppState, MATERIAL_CATEGORY_GET, 
  MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_SAVE, 
  MATERIAL_CATEGORY_SAVE_SUCCESS, MATERIAL_CATEGORY_SAVE_ERR,
  UOM_CANCEL, UOM_CANCEL_OK, UOM_GET, UOM_GET_ERR, UOM_GET_OK, ADD, UPDATE
} from '../../sharedObjects/sharedMessages';

import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { MaterialCategoryModel } from "../../model/MaterialCategoryModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-material-category-component',
  templateUrl: './material-category-component.component.html',
  styleUrls: ['./material-category-component.component.css']
})
export class MaterialCategoryComponentComponent implements OnInit {
  
  person: MaterialCategoryModel = new MaterialCategoryModel();
  personForm: FormGroup;
  private intention : number = UPDATE;
  formUtil : FormUtil<MaterialCategoryModel>;
  
  formValidators = {   
    'rmcatId': [Validators.minLength(1)],
    'rmcatName': [Validators.required, Validators.minLength(1)]
  }
  
  formErrors = {
    'rmcatId': '',
    'rmcatName' : ''
  };
  
  validationMessages = {     
    'rmcatName': {
      'required': 'Material Category Name is required.' 
    }
  };
  
  rows = [];
  
  columns = [
    { prop: 'rmcatId' },
    { name: 'rmcatName' }   
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  
  display: boolean = false;
  itemSelected : boolean = false;
  formTitle: string = "New Material Category"; 
  
  private rmcatModel: MaterialCategoryModel = new MaterialCategoryModel();
  
  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { }
    
    ngOnInit() {
      this.userSubscription = this.store.subscribe(appData => {     
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
          [ MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_SAVE_SUCCESS]));    
        }); 
        
        this.configureUpdateForm();      
      }
      
      ngAfterViewInit() {
        this.dispatchIntent(MATERIAL_CATEGORY_GET);
      }
      
      componentMessageHandle(messageAll : Array<any>) {
        
        messageAll.map(message => { 
          
          if (message && message.type == MATERIAL_CATEGORY_GET_OK)
          {
            this.rows.length = 0;
            for (var rmcatInfo of message.data.data.data)
            {                
              this.dataList.push({                   
                rmcatId : rmcatInfo.rmcatId, 
                rmcatName : rmcatInfo.rmcatName 
              });  
              
              this.rows = this.dataList;
            }
          }
          
          if (message && message.type == MATERIAL_CATEGORY_SAVE_SUCCESS)
          {
            this.display = false;             
          }
        });    
      }
      
      save() {    
        
        let data = this.formUtil.commit();
        
        if (this.intention == ADD)
        {
          data.rmcatId = null;
        }
        else {
          this.rmcatModel.rmcatId = data.rmcatId;
          this.rmcatModel.rmcatName = data.rmcatName;          
        }
        
        this.rows = [...this.rows];
        
        this.dispatchIntent(MATERIAL_CATEGORY_SAVE, data);
        this.display = false; 
      }  
      
      private configureAddForm() {
        
        this.personForm = this.fb.group({
          'rmcatId': ['', [Validators.minLength(1),
            Validators.maxLength(24)]],
            'rmcatName': ['', [Validators.required, Validators.minLength(1)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        private configureUpdateForm() {
          this.personForm = this.fb.group({
            'rmcatId': [this.rmcatModel.rmcatId, [Validators.minLength(1)]],
            'rmcatName': [this.rmcatModel.rmcatName, [Validators.required, Validators.minLength(1)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        onValueChanged(data?: MaterialCategoryModel) {
          
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
        
        dispatchIntent(messageType : string, data? : any)
        {   
          this.store.dispatch(
            {     
              type: messageType,
              data : data
            });      
          }          
          
          addForm() {              
            
            this.formTitle = "New Material Category"; 
            this.display = true;                          
            this.intention = ADD;
            this.configureAddForm();  
          }            
          
          onSelect(evt : any) {
            
            debugger;
            
            if (evt && evt.selected && evt.selected.length > 0)
            {
              
              this.rmcatModel = evt.selected[0] as MaterialCategoryModel; 
              this.itemSelected = true;   
              
              this.formUtil = new FormUtil<MaterialCategoryModel>(this.rmcatModel, 
                this.formValidators);
                
                let form = this.formUtil.createForm(false);
                this.personForm = form;
                
                this.personForm.valueChanges.debounceTime(300)
                .subscribe(data => this.onValueChanged(data));
                
              } 
              else 
              this.itemSelected = false;
              
              this.edit();
            }          
            
            edit() {  
              this.formTitle = "Edit Material Category"; 
              this.intention = UPDATE;                            
              this.display = true;
            }
            
            cancel() 
            {                               
              this.person = this.formUtil.rollback();
              this.itemSelected = false;
              this.display = false;       
            }
          }