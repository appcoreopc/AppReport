import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, RAW_MATERIAL_GET, RAW_MATERIAL_GET_OK, RAW_MATERIAL_SAVE } from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { RawMaterialModel } from "../../model/RawMaterialModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-raw-material-component',
  templateUrl: './raw-material-component.component.html',
  styleUrls: ['./raw-material-component.component.css']
})
export class RawMaterialComponentComponent implements OnInit {
  
  private currentModel: RawMaterialModel = new RawMaterialModel();
  private personForm: FormGroup;
  
  formErrors = {
    'rmcode': '' ,
    'rmdesc' : '',
    'uomid' : '', 
    'tariffcode' : '',
    'countrylist' : '',
    'dutyimprate' : '',
    'gstRate' : ''
  };
  
  validationMessages = {    
    'rmcode': {
      'required': 'Code is required.',
      'minlength': 'Code must be at least 4 characters long.',
      'maxlength': 'Code cannot be more than 24 characters long.'
    }, 
    'rmdesc': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    },    
    'uomid': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    },
    
    'tariffcode': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    },
    
    'countrylist': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    },
    
    'dutyimprate': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    },
    'gstRate': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    }
  };
  
  rows = [];
  
  columns = [
    { prop: 'rmid' },
    { name: 'rmcode' },
    { name: 'rmdesc' }         
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  
  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { 
    }
    
    ngOnInit() {   
      this.userSubscription = this.store.subscribe(appData => {           
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, RAW_MATERIAL_GET_OK), RAW_MATERIAL_GET_OK));
      }); 
      
      this.initForm();
    }
    
    ngAfterViewInit() {
      
      this.dispatchIntent(RAW_MATERIAL_GET);
    }
    
    save() {    
      
      var saveJson =  {
        Rmid : this.currentModel.Rmid,
        Rmcode : this.currentModel.Rmcode,
        Rmdesc : this.currentModel.Rmdesc
        
      };
      
      console.log(JSON.stringify(saveJson));
      this.dispatchIntent(RAW_MATERIAL_SAVE, saveJson);
      this.personForm.reset();
      
    }  
    
    componentMessageHandle(message : any) {
      
      if (message && message.type == RAW_MATERIAL_GET_OK)
      {
        this.rows.length = 0;
        for (var idx in message.data)
        {
          var rawMaterialInfo = message.data[idx];    
          this.dataList.push({  
            rmid : rawMaterialInfo.rmid, 
            rmdesc : rawMaterialInfo.rmdesc,
            rmcode : rawMaterialInfo.rmcode
          });
        }
        
        this.rows = this.dataList;
        console.log(this.rows);
      }    
    }
    

    private initForm() {
      this.personForm = this.fb.group({
        'Rmid': [this.currentModel.Rmid, [Validators.required, Validators.minLength(1),
          Validators.maxLength(24)]],
          'rmcode': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]],
            'rmdesc': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
              Validators.maxLength(24)]],
              
              'uomid': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                Validators.maxLength(24)]],
                'tariffcode': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                  Validators.maxLength(24)]],
                  'countrylist': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                    Validators.maxLength(24)]],
                    'dutyimprate': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                      Validators.maxLength(24)]],
                      'gstRate': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                        Validators.maxLength(24)]],
                        
                     
                        
                      });
                      
                      this.personForm.valueChanges.debounceTime(500)
                      .subscribe(data => this.onValueChanged(data));
                    }
                    
                    onValueChanged(data?: RawMaterialModel) {
                      
                      if (!this.personForm) { return; }
                      
                      const form = this.personForm;
                      this.currentModel.Rmid = data.Rmid;
                      this.currentModel.Rmcode = data.Rmcode;
                      this.currentModel.Rmdesc = data.Rmdesc;
                      
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
                    
                    onSubmit() {
                      
                      console.log(this.currentModel.Rmid);
                      console.log(this.currentModel.Rmcode);
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
                    