import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CityAppState, MATERIAL_CATEGORY_GET, 
  MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_SAVE,
  UOM_CANCEL, UOM_CANCEL_OK, UOM_GET, UOM_GET_ERR, UOM_GET_OK
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

  formErrors = {
    'rmCatName': ''
  };

  validationMessages = {    
    'rmCatName': {
      'required': 'Material category name is required.',
      'minlength': 'Material category must be at least 4 characters long.',
      'maxlength': 'Material category cannot be more than 24 characters long.'
    }
  };
  
  rows = [];

  columns = [
    { prop: 'rMCatId', name : 'Category Id' },
    { prop: 'rmcode',  name : 'Code', width : 250 },
    { prop: 'rmdesc', name : 'Description',  width : 350 }   
  ];

  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 

  display: boolean = false;
  itemSelected : boolean = false;

  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { 
  }

  ngOnInit() {   
    this.userSubscription = this.store.subscribe(appData => {           
      this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, MATERIAL_CATEGORY_GET_OK), MATERIAL_CATEGORY_GET_OK));
    }); 
    this.initForm();  
  }

  ngAfterViewInit() {     
    
     this.dispatchIntent(MATERIAL_CATEGORY_GET);
    
      }
   
  save() {    

     var saveJson = {
      rMCatId : this.person.rMCatId,
      rmCatName : this.person.rmCatName
    };

    console.log(JSON.stringify(saveJson));
    this.dispatchIntent(MATERIAL_CATEGORY_SAVE, saveJson);
    this.personForm.reset();

  }  

  componentMessageHandle(message : any) {

    console.log(message);

    if (message && message.type == MATERIAL_CATEGORY_GET_OK)
    {
      this.rows.length = 0;
      for (var idx in message.data)
      {
        var materialCategory = message.data[idx];    
        this.dataList.push({  
          rMCatId : materialCategory.rmcatId, 
          rmcode : materialCategory.rmcode,
          rmdesc : materialCategory.rmdesc
        });
      }
      this.rows = this.dataList;
    }
  }

  private initForm() {
    this.personForm = this.fb.group({
      'rmCatName': [this.person.rmCatName, [Validators.required, Validators.minLength(1),
      Validators.maxLength(24)]]
    });

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: MaterialCategoryModel) {

    if (!this.personForm) { return; }

    const form = this.personForm;
    this.person.rMCatId = data.rMCatId;
    this.person.rmCatName = data.rmCatName;

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
    this.resetForm();
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
    if (this.person)
    {      
      this.personForm.get("rmCatName").setValue(this.person.rmCatName);    
      this.display = true;
    }       
  }

  resetForm() {
                      
    let emptySpace = "";
    this.personForm.get("rmCatName").setValue(emptySpace);   
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
