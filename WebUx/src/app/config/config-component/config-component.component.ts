import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, CONFIG_SAVE,CONFIG_GET_OK,
  ADD, UPDATE, CONFIG_GET, CONFIG_SAVE_SUCCESS  } from '../../sharedObjects/sharedMessages';
import { ConfigModel } from "../../model/ConfigModel"; 
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import {DialogModule} from 'primeng/dialog';  
import {FormUtil} from "../../sharedObjects/formUtil";

  @Component({  
    selector: 'app-config-component',
    templateUrl: './config-component.component.html',
    styleUrls: ['./config-component.component.css']
  })
  
  export class ConfigComponentComponent implements OnInit {
    
    person: ConfigModel = new ConfigModel(); 
    personForm: FormGroup;
    private intention : number = UPDATE;
    private formUtil : FormUtil<ConfigModel>;
    
    display: boolean = false;
    
    formTitle: string = "New Config"; 
    dataList : Array<any> = new Array<any>();  

    formValidators = {
      'configId': [Validators.minLength(1)],
      'configKey': [Validators.required, Validators.minLength(1)],
      'configData': [Validators.required, Validators.minLength(1)] 
    }  
             
    formErrors = {
      'configKey': '',
      'configData': ''     
    };
    
    itemSelected : boolean = false;
    
    validationMessages = {    
      'configKey': {
        'required': 'Key is required.' 
      },
      'configData': {
        'required': 'Content is required.' 
      } 
    };
    
    userSubscription : Subscription;
    
    rows = []; 
    
    columns = [
      { prop: 'configKey', name : 'Key' },
      { prop: 'configData', name : 'Content' }  
    ];
    
    constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
    
    name : string; 
    description : string; 
    
    ngOnInit() {
      
      this.userSubscription = this.store.subscribe(appData => { 
        
        this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
          [ CONFIG_GET_OK, CONFIG_SAVE_SUCCESS]));
        }); 
      
        this.setFormValidation(0);
      }
      
      ngAfterViewInit() {   

        this.dispatchIntent(CONFIG_GET); 

      }
      
      save()
      {                     
        let data = this.formUtil.commit(); 


        if (this.intention == ADD)
        {
          data.configId = null;          
        }
        else {
          data.configId = this.person.configId;          
          
          this.person.configKey = data.configKey;
          this.person.configData = data.configData;
        }
                       
        this.dispatchIntent(CONFIG_SAVE, data);
        this.display = false; 
      } 
  
      private setFormValidation(id :any) {
 
          this.personForm = this.fb.group({ 
                'configId': [id],
                'configKey': ['', [Validators.required, Validators.minLength(1)]],
                'configData': ['', [Validators.required, Validators.minLength(1)]] 
            });         
      }
            
      private configureAddForm()
      {
        this.setFormValidation(''); 
 
        for (const field in this.formErrors) { 
          this.formErrors[field] = ''; 
        } 
      }                
  
        onValueChanged(data?: ConfigModel) {
          
          if (!this.personForm) { return; }              
          
          const form = this.personForm;
          //this.person.configId = data.configId;
          //this.person.configKey = data.configKey;
          //this.person.configData = data.configData;    
          
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
          
          messageAll.map(message => {  
            
            if (message && message.type == CONFIG_GET_OK)
            {
              this.rows.length = 0;
              for (var userInfo of message.data.data.data)
              {                    
                this.dataList.push({  
                  configId : userInfo.configId,
                  configKey : userInfo.configKey, 
                  configData : userInfo.configData 
                });
              }                
              this.rows = this.dataList;
            }    
            
            if (message && message.type == CONFIG_SAVE_SUCCESS)
            {                  
              this.display = false;                
            }    
 
          });                
        }
        
        onSelect(evt : any) {
          
          if (evt && evt.selected && evt.selected.length > 0)
          {
            this.person = evt.selected[0] as ConfigModel;                   
            this.itemSelected = true; 

            this.formUtil = new FormUtil<ConfigModel>(this.person, this.formValidators);
            let userform = this.formUtil.createForm(false);
            this.personForm = userform;
          }
          else 
          this.itemSelected = false;
          
          this.edit();
        }
        
        addForm() {        
          
          this.formTitle = "New Config"; 
          this.display = true;                          
          this.intention = ADD;
          this.configureAddForm();  
        }   
        
        edit() {  
          
          this.formTitle = "Edit Config"; 
          this.intention = UPDATE;  
          this.display = true;   
        }                          
        
        cancel() 
        {
          this.display = false;     
          this.itemSelected = false;
          this.person = this.formUtil.rollback();
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
        