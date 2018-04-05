import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CityAppState, EMPLOYEE_SAVE, EMPLOYEE_GET_OK,
  ADD, UPDATE, EMPLOYEE_GET, EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_DELETE,
  JOBTITLE_GET, JOBTITLE_GET_OK, PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE
} from '../../sharedObjects/sharedMessages';
import { EmployeeModel } from "../../model/EmployeeModel";
import { JobTitleModel } from "../../model/JobTitleModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { DialogModule } from 'primeng/dialog';
import {FormUtil} from "../../sharedObjects/formUtil";
import * as timeUtil from '../../sharedObjects/timeUtil';
import { TIME_DELAY } from '../../sharedObjects/applicationSetup';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})

export class EmployeeComponentComponent implements OnInit {
  
  person: EmployeeModel = new EmployeeModel();
  personForm: FormGroup;
  private intention: number = UPDATE;
  
  display: boolean = false;
  formTitle: string = "New Employee";
  dataList: Array<any> = new Array<any>();
  formUtil : FormUtil<EmployeeModel>;
  
  jobListMap = {};
  
  formErrors = {
    'empName': '',
    'empIdno': '',
    'empAd1': '',
    'empAd2': '',
    'empAd3': '',
    'jobTitleId': ''
  };
  
  itemSelected: boolean = false;
  
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
      'required': 'Address 2 must be more than 1 character long.'
    },
    'empAd3': {
      'required': 'Address 3 must be more than 1 character long.'
    },
    'jobTitleId': {
      'required': 'Job Title is required.'
    }
  };
  
  userSubscription: Subscription;
  rows = [];
  jobTitleRows = [];
  
  constructor(private store: Store<CityAppState>, private fb: FormBuilder) { }
  
  name: string;
  description: string;
  
  ngOnInit() {
    
    this.userSubscription = this.store.subscribe(appData => {
      
      this.componentMessageHandle(messageUtil.getMultiMessage(appData,
        [EMPLOYEE_GET_OK, EMPLOYEE_SAVE_SUCCESS, JOBTITLE_GET_OK]));
      });
      
      this.configureEditForm();
    }
    
    ngAfterViewInit() {
      
      this.dispatchIntent(JOBTITLE_GET);
      
      this.dispatchIntent(EMPLOYEE_GET);

      this.dispatchIntent(EMPLOYEE_DELETE, "{empid : 123}");

    }
    
    save() {
      
      let data = this.formUtil.commit();
      
      if (this.intention == ADD) {
        data.empId = null;   
        this.person.jobTitle = this.mapJobToTitle[data.jobTitleId];
      }
      else {
        this.person.jobTitle = this.mapJobToTitle[data.jobTitleId];
        data.empId = this.person.empId;    
      }
      
      // Updating grid info from reference to this.person 
      // this is the main reason we are keeping track of it. 
      this.person.empName = data.empName;
      this.person.empIdno = data.empIdno;
      this.person.empAd1 = data.empAd1;
      this.person.empAd2 = data.empAd2;
      this.person.empAd3 = data.empAd3;
      this.person.jobTitleId = data.jobTitleId;
      
      this.rows = [...this.rows];
      
      this.dispatchIntent(EMPLOYEE_SAVE, data);
      
    }
    
    formValidators = {   
      'empId' : [],
      'empName': [Validators.required, Validators.minLength(1)],
      'empIdno': [Validators.required, Validators.minLength(1)],
      'empAd1': [Validators.required, Validators.minLength(1)],
      'empAd2': [],
      'empAd3': [],
      'jobTitleId': [Validators.required, Validators.minLength(1), Validators.min(1)]
    }
    
    
    private configureEditForm() {
      
      this.person = new EmployeeModel();
      this.person.empId = -1;
      this.person.empName = "";
      this.person.empAd1 = "";
      this.person.empAd2 = "";
      this.person.empAd3 = "";
      this.person.jobTitleId = -1;
      this.person.empIdno = -1;
      
      this.formUtil = new FormUtil<EmployeeModel>(this.person, this.formValidators);
      let userform = this.formUtil.createForm(true);
      this.personForm = userform;
    } 
    
    onValueChanged(data?: EmployeeModel) {
      
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
    
    componentMessageHandle(messageAll: Array<any>) { 
      
      messageAll.map(async message => {
        
        if (message && message.type == EMPLOYEE_GET_OK) {
          
          this.dataList.length = 0;
          this.rows.length = 0;
          
          for (var userInfo of message.data.data.data) {
            
            let model = new EmployeeModel();
            model = { ...userInfo };
            this.dataList.push(model);
          }
          
          this.rows = this.dataList;
        }
        
        if (message && message.type == EMPLOYEE_SAVE_SUCCESS) {
          
          this.display = false;        
          await timeUtil.delay(TIME_DELAY);        
          this.getEmployee();
        }
        
        if (message && message.type == JOBTITLE_GET_OK) {          
          
          if (message.data && message.data && message.data.data)
          {            
            let msgDataList = message.data.data.data;
            if (msgDataList.length > 0)
            {
              this.jobTitleRows.length = 0;
              let jobTitleDataList = [];
              
              for (var d of msgDataList) {      
                let jobtitlemodel = {...d};
                this.jobTitleRows.push(jobtitlemodel);
              }
              
              this.mapJobToTitle(this.jobTitleRows);
              this.rebindJobTitleToRows();              
            }           
          }
        }
      });      
    }
    
    rebindJobTitleToRows() {
      let dataRows = this.rows;
      if (this.jobListMap && dataRows) {
        
        for (let dataRowItem of dataRows) {
          dataRowItem.jobTitle = this.jobListMap[dataRowItem.jobTitleId];
        }
      }
    }
    
    mapJobToTitle(jobList: Array<JobTitleModel>) {
      for (let item of jobList) {
        this.jobListMap[item.jobTitleId] = item.jobTitleName;
      }
      
    }

    edit(id : any) {
      
      console.log('jser');
      console.log(id);
    }

    onSelect(evt: any) {
      

      if (evt && evt.selected && evt.selected.length > 0) {
        this.person = evt.selected[0] as EmployeeModel;      
        this.itemSelected = true;
        this.formUtil = new FormUtil<EmployeeModel>(this.person, this.formValidators);
        let form = this.formUtil.createForm(false);
        this.personForm = form;
        this.intention = UPDATE;
        
        this.personForm.valueChanges.debounceTime(300)
        .subscribe(data => this.onValueChanged(data));
        
        this.display = true;
        
      }
      else
      this.itemSelected = false;
      
    }
    
    addForm() {
      this.formTitle = "New Employee";
      this.display = true;
      this.intention = ADD;
      
      this.person = new EmployeeModel({ empId: 0, empAd1 : '', empIdno : 0, jobTitleId : 1,
      empAd2 : '',  empAd3 : '', empName : ''});
      
      this.formUtil = new FormUtil<EmployeeModel>(this.person, this.formValidators);
      let userform = this.formUtil.createForm(false);
      this.personForm = userform;
      
      this.personForm.valueChanges.debounceTime(300)
      .subscribe(data => this.onValueChanged(data));
    }
    
    cancel() {
      this.display = false;
      this.itemSelected = false;
    }
    
    dispatchIntent(messageType: string, data?: any) {
      messageUtil.dispatchIntent(this.store, messageType, data);
    }
    
    getEmployee()
    {      
      this.dispatchIntent(EMPLOYEE_GET);
    }     
    
  }
  