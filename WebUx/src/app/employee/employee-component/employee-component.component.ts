import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, EMPLOYEE_SAVE, EMPLOYEE_GET_OK, EMPLOYEE_GET, EMPLOYEE_SAVE_SUCCESS } from '../../sharedObjects/sharedMessages';
import { EmployeeModel } from "../../model/EmployeeModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import {DialogModule} from 'primeng/dialog';

@Component({  
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})

export class EmployeeComponentComponent implements OnInit {
  
  private person: EmployeeModel = new EmployeeModel();
  private personTemp : EmployeeModel; 

  private personForm: FormGroup;
  
  display: boolean = false;
  
  dataList : Array<any> = new Array<any>(); 
  
  formErrors = {
    'empName': '',
    'empIdno': '',    
    'empAd1': '',
    'empAd2': '',
    'empAd3': ''    
  };
  
  itemSelected : boolean = false;
  
  validationMessages = {    
    'empName': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'empIdno': {
      'required': 'Employee No is required.',
      'minlength': 'Employee No must be at least 4 characters long.',
      'maxlength': 'Employee No cannot be more than 20 characters long.'
    },
    
    'empAd1': {
      'required': 'Address is required.',
      'minlength': 'Address must be at least 4 characters long.',
      'maxlength': 'Address cannot be more than 50 characters long.'
    },
    'empAd2': {
      'required': 'Address2 is required.',
      'minlength': 'Address2 must be at least 4 characters long.',
      'maxlength': 'Address2 cannot be more than 50 characters long.'
    },
    'empAd3': {
      'required': 'Address3 is required.',
      'minlength': 'Address3 must be at least 4 characters long.',
      'maxlength': 'Address3 cannot be more than 50 characters long.'
    }
  };
  
  userSubscription : Subscription;
  
  rows = [];
  
  columns = [
    { prop: 'empName', name : 'Name' },
    { prop: 'empIdno', name : 'Employee No' },      
    { prop: 'empAd1', name : 'Address', width : 350 },
    { prop: 'empAd2', name : 'Address 2', width : 350 },   
    { prop: 'empAd3', name : 'Address 3', width : 350 }   
  ];
  
  constructor(private store : Store<CityAppState>, private fb: FormBuilder) { }
  
  name : string; 
  description : string; 
  
  ngOnInit() {
    
    this.userSubscription = this.store.subscribe(appData => { 
      
      this.componentMessageHandle(messageUtil.getMultiMessage(appData, 
        [ EMPLOYEE_GET_OK, EMPLOYEE_SAVE_SUCCESS]));
      }); 
      
      this.initForm();
    }
    
    ngAfterViewInit() {
      
      this.dispatchIntent(EMPLOYEE_GET);
    }
    
    save()
    {
      var saveJson = new EmployeeModel();
      
      saveJson.empId = this.person.empId;
      saveJson.empName = this.person.empName;
      saveJson.empIdno = this.person.empIdno;
      saveJson.empAd1 = this.person.empAd1;
      saveJson.empAd2 = this.person.empAd2;
      saveJson.empAd3 = this.person.empAd3;
      
      var strJson = JSON.stringify(saveJson);           
      this.dispatchIntent(EMPLOYEE_SAVE, saveJson);
      
    } 
    
    private initForm() {
      
      this.personForm = this.fb.group({
        'empName': [this.person.empName, [Validators.required, Validators.minLength(1),
          Validators.maxLength(50)]],
          'empId': [this.person.empIdno],
          'empIdno': [this.person.empIdno, [Validators.required, Validators.minLength(1),
            Validators.maxLength(20)]], 
            'empAd1': [this.person.empAd1, [Validators.required, Validators.minLength(1),
              Validators.maxLength(50)]],
              'empAd2': [this.person.empAd2, [Validators.minLength(1),
                Validators.maxLength(50)]],
                'empAd3': [this.person.empAd3, [Validators.minLength(1),
                  Validators.maxLength(50)]]
                });
                
                this.personForm.valueChanges.debounceTime(300)
                .subscribe(data => this.onValueChanged(data));
              }
              
              onValueChanged(data?: EmployeeModel) {
                
                if (!this.personForm) { return; }              
                
                const form = this.personForm;
                this.person.empId = data.empId;
                this.person.empName = data.empName;
                this.person.empIdno = data.empIdno;              
                this.person.empAd1 = data.empAd1;
                this.person.empAd2 = data.empAd2;
                this.person.empAd3 = data.empAd3;
                
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
                  
                  if (message && message.type == EMPLOYEE_GET_OK)
                  {
                    this.rows.length = 0;
                    for (var userInfo of message.data.data.data)
                    {                    
                      this.dataList.push({  
                        empId : userInfo.empId,
                        empName : userInfo.empName, 
                        empIdno : userInfo.empIdno,           
                        empAd1 : userInfo.empAd1,
                        empAd2 : userInfo.empAd2,
                        empAd3 : userInfo.empAd3
                      });
                    }                
                    this.rows = this.dataList;
                  }    
                  
                  if (message && message.type == EMPLOYEE_SAVE_SUCCESS)
                  {                  
                    this.display = false;                
                  }    
                });                
              }
              
              onSelect(evt : any) {
                
                if (evt && evt.selected && evt.selected.length > 0)
                {
                  this.person = evt.selected[0] as EmployeeModel;                   
                  this.itemSelected = true;   
                }
                else 
                  this.itemSelected = false;
              }
              
              addForm() {        

                this.display = true;                               
                console.log(this.person);   
                
                if (this.itemSelected)
                {
                  this.personTemp = new EmployeeModel();
                  this.personTemp.empId = this.person.empId;
                  this.personTemp.empName = this.person.empName;
                  this.personTemp.empIdno = this.person.empId;
                  this.personTemp.empId = this.person.empIdno;
                  this.personTemp.empAd1 = this.person.empAd1;
                  this.personTemp.empAd2 = this.person.empAd2;
                  this.personTemp.empAd3 = this.person.empAd3;
                }               
               
                this.personForm.reset();
               
              }   
              
              edit() {  
                
                if (this.person)
                {               
                  this.personForm.get("empName").setValue(this.person.empName);
                  this.personForm.get("empIdno").setValue(this.person.empIdno);
                  this.personForm.get("empId").setValue(this.person.empId);
                  this.personForm.get("empAd1").setValue(this.person.empAd1);
                  this.personForm.get("empAd2").setValue(this.person.empAd2);
                  this.personForm.get("empAd3").setValue(this.person.empAd3);
                  
                  this.display = true;
                }       
              }
              
              resetForm() {

                let emptySpace = "";
                this.personForm.get("empName").setValue(emptySpace);
                this.personForm.get("empIdno").setValue(emptySpace);
                this.personForm.get("empAd1").setValue(emptySpace);
                this.personForm.get("empAd2").setValue(emptySpace);
                this.personForm.get("empAd3").setValue(emptySpace);
              }
              
              cancel() 
              {
                this.display = false;
                console.log(this.person);

                if (this.itemSelected)
                {
                  console.log(this.person);
                  this.person.empId = this.personTemp.empId;
                  this.person.empName = this.personTemp.empName;
                  this.person.empIdno = this.personTemp.empId;
                  this.person.empId = this.personTemp.empIdno;
                  this.person.empAd1 = this.personTemp.empAd1;
                  this.person.empAd2 = this.personTemp.empAd2;
                  this.person.empAd3 = this.personTemp.empAd3;
                }

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
              