import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, USER_GET, USER_GET_OK, USER_SAVE } from '../../sharedObjects/sharedMessages';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { UserModel } from "../../model/UserModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StncustomModel } from '../../model/StncustomModel';

@Component({
  selector: 'app-stn-custom-component',
  templateUrl: './stn-custom-component.component.html',
  styleUrls: ['./stn-custom-component.component.css']
})
export class StnCustomComponentComponent implements OnInit {
  
  private person: StncustomModel = new StncustomModel();
  private personForm: FormGroup;
  
  formErrors = {
    'name': '',
    'username': ''
  };
  
  validationMessages = {    
    'name': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 4 characters long.',
      'maxlength': 'First Name cannot be more than 24 characters long.'
    },
    'username': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 4 characters long.',
      'maxlength': 'Last Name cannot be more than 24 characters long.'
    }
  };
  
  rows = [];
  
  columns = [
    { prop: 'name' },
    { name: 'username' }   
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
        this.componentMessageHandle(messageUtil.handleMessage(messageUtil.getMessage(appData, USER_GET_OK), USER_GET_OK));
      }); 
      
      this.initForm();
    }
    
    ngAfterViewInit() {
      this.dispatchIntent(USER_GET);
    }
    
    save() {    
      
      var saveJson = {
        stncustomId : this.person.stncustomId,
        stncustomName : this.person.stncustomName
      };
      
      console.log(JSON.stringify(saveJson));
      
      this.dispatchIntent(USER_SAVE, saveJson);
      
      this.personForm.reset();
      
    }  
    
    componentMessageHandle(message : any) {
      
      if (message && message.type == USER_GET_OK)
      {
        this.rows.length = 0;
        for (var idx in message.data)
        {
          var userInfo = message.data[idx];    
          this.dataList.push({  
            name : userInfo.name, 
            username : userInfo.username
          });
          
          console.log(this.rows);
          this.rows = this.dataList;
        }
      }    
    }
    
    private initForm() {
      this.personForm = this.fb.group({
        'stncustomId': [this.person.stncustomId, [Validators.required, Validators.minLength(1),
          Validators.maxLength(24)]],
          'stncustomName': [this.person.stncustomName, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]]
          });
          
          this.personForm.valueChanges.debounceTime(500)
          .subscribe(data => this.onValueChanged(data));
        }
        
        onValueChanged(data?: UserModel) {
          
          if (!this.personForm) { return; }
          
          const form = this.personForm;
          
          this.person.stncustomName = data.username;
          
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
            this.person = evt.selected[0] as StncustomModel; 
            this.itemSelected = true;   
          }
        }
        
        showDialog() {              
          this.display = true;
        }   
        
        edit() {  
          if (this.person)
          {
            
            this.personForm.get("stncustomId").setValue(this.person.stncustomId);
            this.personForm.get("emstncustomNamepIdno").setValue(this.person.stncustomName);
            
            this.display = true;
          }       
        }
        
        resetForm() {
          
          let emptySpace = "";
          this.personForm.get("stncustomId").setValue(emptySpace);
          this.personForm.get("emstncustomNamepIdno").setValue(emptySpace);  
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
        