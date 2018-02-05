import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, EMPLOYEE_SAVE, EMPLOYEE_GET_OK,
  ADD, UPDATE, EMPLOYEE_GET, EMPLOYEE_SAVE_SUCCESS,
JOBTITLE_GET, JOBTITLE_GET_OK } from '../../sharedObjects/sharedMessages';
import { EmployeeModel } from "../../model/EmployeeModel";
import { JobTitleModel } from "../../model/JobTitleModel"; 
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
    
    person: EmployeeModel = new EmployeeModel();
    private stncustomData: JobTitleModel = new JobTitleModel();
    personForm: FormGroup;
    private intention : number = UPDATE;
    
    display: boolean = false;
    
    formTitle: string = "New Employee"; 
    dataList : Array<any> = new Array<any>(); 
    jobTitleDataList : Array<any> = new Array<any>(); 
    
    formErrors = {
      'empName': '',
      'empIdno': '',    
      'empAd1': '',
      'empAd2': '',
      'empAd3': '',
      'jobTitleId' : ''    
    };
    
    itemSelected : boolean = false;
    
    validationMessages = {    
      'empName': {
        'required': 'Name is required.' 
      },
      'empIdno': {
        'required': 'IC No. is required.' 
      },
      
      'empAd1': {
        'required': 'Address 1 is required.' 
      },
      'empAd2': {
        'required': 'Address 2 is required.' 
      },
      'empAd3': {
        'required': 'Address3 is required.' 
      },
      'jobTitleId': {
        'required': 'Job Title is required.' 
      }
    };
    
    userSubscription : Subscription;
    
    rows = [];
    jobTitleRows = [];
    
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
          [ EMPLOYEE_GET_OK, EMPLOYEE_SAVE_SUCCESS, JOBTITLE_GET_OK]));
        }); 
      
        this.configureEditForm();
      }
      
      ngAfterViewInit() {            
        this.dispatchIntent(EMPLOYEE_GET);
        this.dispatchIntent(JOBTITLE_GET);
      }
      
      save()
      {     
        
        var saveJson = new EmployeeModel();
        if (this.intention == ADD)
        {
          saveJson = this.personForm.value as EmployeeModel;
        }
        else {
          
          saveJson.empId = this.person.empId;
          saveJson.empName = this.person.empName;
          saveJson.empIdno = this.person.empIdno;
          saveJson.empAd1 = this.person.empAd1;
          saveJson.empAd2 = this.person.empAd2;
          saveJson.empAd3 = this.person.empAd3;
          saveJson.jobTitleId = this.person.jobTitleId;
        }
        
        var strJson = JSON.stringify(saveJson);           
        this.dispatchIntent(EMPLOYEE_SAVE, saveJson);
        this.display = false; 
      } 

      private setFormValidation(id :any) {
 
          this.personForm = this.fb.group({ 
                'empId': [id],
                'empName': ['', [Validators.required, Validators.minLength(1)]],
                'empIdno': ['', [Validators.required, Validators.minLength(1)]], 
                'empAd1': ['', [Validators.required, Validators.minLength(1)]],
                'empAd2': ['', [Validators.required, Validators.minLength(1)]],
                'empAd3': ['', [Validators.required, Validators.minLength(1)]],
                'jobTitleId': ['', [Validators.required, Validators.minLength(1), Validators.min(1)]]
            }); 
        
      }
            
      private configureAddForm()
      {
        this.setFormValidation(''); 

        for (const field in this.formErrors) { 
          this.formErrors[field] = ''; 
        } 
      }
                
      private configureEditForm() { 
       
        this.setFormValidation(this.person.empId); 
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
          this.person.jobTitleId = data.jobTitleId;
          
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
                  empAd3 : userInfo.empAd3,
                  jobTitleId : userInfo.jobTitleId
                });
              }                
              this.rows = this.dataList;
            }  
            
            if (message && message.type == EMPLOYEE_SAVE_SUCCESS)
            {
                console.log('save success!!!');
            }
            
            if (message && message.type == EMPLOYEE_SAVE_SUCCESS)
            {                  
              this.display = false;                
            }    

             if (message && message.type == JOBTITLE_GET_OK)
            {
              this.jobTitleRows.length = 0;
              for (var d of message.data.data.data)
              {   
                console.log(d);
                this.jobTitleDataList.push({   
                    jobTitleId : d.jobTitleId,
                    jobTitleName : d.jobTitleName 
                });
              }

              this.jobTitleRows = this.jobTitleDataList;
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
          
            this.edit();
        }
        
        addForm() {        
          
          this.formTitle = "New Employee"; 
          this.display = true;                          
          this.intention = ADD;
          this.configureAddForm();  
        }   
        
        edit() {  
          
          this.formTitle = "Edit Employee"; 
          this.intention = UPDATE;                            
          this.configureEditForm();
          
          if (this.person)
          {                                 
            this.personForm.get("empName").setValue(this.person.empName);
            this.personForm.get("empIdno").setValue(this.person.empIdno);
            this.personForm.get("empId").setValue(this.person.empId);
            this.personForm.get("empAd1").setValue(this.person.empAd1);
            this.personForm.get("empAd2").setValue(this.person.empAd2);
            this.personForm.get("empAd3").setValue(this.person.empAd3);  
            this.personForm.get("jobTitleId").setValue(this.person.jobTitleId);                 
            this.display = true;
          }       
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
        