import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
  
  private person: MaterialCategoryModel = new MaterialCategoryModel();
  private personForm: FormGroup;
  
  display: boolean = false;
  itemSelected : boolean = false;
  private intention : number = UPDATE;
  
  
  formErrors = {
    'rmCatName': ''
  };
  
  validationMessages = {    
    'rmcatId': {
      'required': 'Material category Id is required.',
      'minlength': 'Material category Id must be at least 4 characters long.',
      'maxlength': 'Material category Id cannot be more than 24 characters long.'
    }, 
    'rmcode': {
      'required': 'Material category code is required.',
      'minlength': 'Material category code must be at least 4 characters long.',
      'maxlength': 'Material category code cannot be more than 24 characters long.'
    },
    'rmdesc': {
      'required': 'Material category description is required.',
      'minlength': 'Material category description must be at least 4 characters long.',
      'maxlength': 'Material category description cannot be more than 24 characters long.'
    }
  };
  
  rows = [];
  
  columns = [
    { prop: 'rmid', name : 'Category Id' },
    { prop: 'rmcode',  name : 'Code', width : 250 },
    { prop: 'rmdesc', name : 'Description',  width : 350 }   
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  
  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { 
    }
    
    ngOnInit() {   
      
      this.userSubscription = this.store.subscribe(appData => {           
        this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
          [MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_SAVE_SUCCESS]));
        }); 
        this.initUpdateForm();  
      }
      
      ngAfterViewInit() {     
        this.dispatchIntent(MATERIAL_CATEGORY_GET);      
      }
      
      save() { 
        
        let saveJson = new MaterialCategoryModel();
        
        if (this.intention == ADD)
        {
          saveJson = this.personForm.value as MaterialCategoryModel;
        }
        else 
        {       
          saveJson.rmid = this.person.rmid;
          saveJson.rmcatid = this.person.rmcatid;
          saveJson.rmcode = this.person.rmcode;
          saveJson.rmdesc = this.person.rmdesc;   
        }  
        
        this.dispatchIntent(MATERIAL_CATEGORY_SAVE, saveJson);
        this.personForm.reset();        
      }  
      
      componentMessageHandle(messageAll : Array<any>) {
        
        messageAll.map(message => { 
          
          if (message && message.type == MATERIAL_CATEGORY_GET_OK)
          {
            this.rows.length = 0;
            for (var materialCategory of message.data.data.data)
            {             
              this.dataList.push({ 
                rmid : materialCategory.rmid,
                rmcatid : materialCategory.rmcatId, 
                rmcode : materialCategory.rmcode,
                rmdesc : materialCategory.rmdesc
              });
            }
            this.rows = this.dataList;
          }
          
          if (message && message.type == MATERIAL_CATEGORY_SAVE_SUCCESS)
          {
            this.display = false;
            this.itemSelected = false;
          }
        });
      }
      
      private initUpdateForm() {
        this.personForm = this.fb.group({
          'rmcatid': [this.person.rmcatid], 
          'rmcode': [this.person.rmcode, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]],
            'rmdesc': [this.person.rmdesc, [Validators.required, Validators.minLength(1),
              Validators.maxLength(24)]]
            });
            
            this.personForm.valueChanges.debounceTime(500)
            .subscribe(data => this.onValueChanged(data));
          }
          
          private initAddForm() {
            this.personForm = this.fb.group({
              'rmcatid': [''], 
              'rmcode': ['', [Validators.required, Validators.minLength(1),
                Validators.maxLength(24)]],
                'rmdesc': ['', [Validators.required, Validators.minLength(1),
                  Validators.maxLength(24)]]
                }); 
                
              }
              
              onValueChanged(data?: MaterialCategoryModel) {
                
                if (!this.personForm) { return; }
                
                const form = this.personForm;
                this.person.rmcatid = data.rmcatid;
                this.person.rmcode = data.rmcode;
                this.person.rmdesc = data.rmdesc;
                
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
              
              addForm() {              
                this.display = true;       
                this.intention = ADD;
                this.initAddForm();      
              }   
              
              onSelect(evt : any) {        
                if (evt && evt.selected && evt.selected.length > 0)
                {
                  this.person = evt.selected[0] as MaterialCategoryModel; 
                  this.itemSelected = true;   
                }
              }
              
              showDialog() { 
                this.display = true;
              }   
              
              edit() {  
                
                this.intention = UPDATE;   
                if (this.person)
                {      
                  this.personForm.get("rmcode").setValue(this.person.rmcode);
                  this.personForm.get("rmdesc").setValue(this.person.rmdesc);    
                  this.display = true;
                }       
              }
              
              resetForm() {        
                let emptySpace = "";
                this.personForm.get("rmcode").setValue(emptySpace);   
                this.personForm.get("rmdesc").setValue(emptySpace);   
              }
              
              cancel() 
              {
                this.display = false;
                this.itemSelected = false;
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
              