import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CityAppState, RAW_MATERIAL_GET, RAW_MATERIAL_GET_OK, RAW_MATERIAL_SAVE , UOM_GET, UOM_GET_OK} from '../../sharedObjects/sharedMessages';
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

  countries : string[] = ['malaysia', 'new zeland', 'australia'];
    
  formErrors = {
    'Rmcode': '' ,
    'Rmdesc' : '',
    'Uomid' : '', 
    'TariffCode' : '',
    'CountryList' : '',
    'DutyImpRate' : '',
    'Gstrate' : ''
  };
  
  validationMessages = {    
    'Rmcode': {
      'required': 'Code is required.',
      'minlength': 'Code must be at least 4 characters long.',
      'maxlength': 'Code cannot be more than 24 characters long.'
    }, 
    'Rmdesc': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 4 characters long.',
      'maxlength': 'Description cannot be more than 24 characters long.'
    },    
    'Uomid': {
      'required': 'Uom Id is required.',
      'minlength': 'Uom Id  must be at least 4 characters long.',
      'maxlength': 'Uom Id  cannot be more than 24 characters long.'
    },
    
    'TariffCode': {
      'required': 'Tariff Code is required.',
      'minlength': 'Tariff Code must be at least 4 characters long.',
      'maxlength': 'Tariff Code cannot be more than 24 characters long.'
    },
    
    'CountryList': {
      'required': 'Country List is required.',
      'minlength': 'Country List must be at least 4 characters long.',
      'maxlength': 'Country List cannot be more than 24 characters long.'
    },
    
    'DutyImpRate': {
      'required': 'Duty Imp Rate is required.',
      'minlength': 'Duty Imp Rate must be at least 4 characters long.',
      'maxlength': 'Duty Imp Rate cannot be more than 24 characters long.'
    },
    'Gstrate': {
      'required': 'Gst Rate is required.',
      'minlength': 'Gst Rate must be at least 4 characters long.',
      'maxlength': 'Gst Rate cannot be more than 24 characters long.'
    }
  };  


  rows = [];
    
  columns = [
    { prop: 'rmid' , name : 'Id'},
    { prop: 'rmcode', name : 'Code' },
    { prop: 'rmdesc', name : 'Description', width : 350 }         
  ];
  
  userSubscription : Subscription;
  dataList : Array<any> = new Array<any>(); 
  uomlist : Array<any> = new Array<any>();
    
  constructor(private store : Store<CityAppState>, 
    private fb: FormBuilder) { 
    }
    
    ngOnInit() {   

      this.userSubscription = this.store.subscribe(appData => {           
        this.componentMessageHandle(messageUtil.getMultiMessage(appData, ["RAW_MATERIAL_GET_OK", "UOM_GET_OK"]));
      }); 
      
      this.initForm();
    }
    
    ngAfterViewInit() {
      
      this.dispatchIntent(RAW_MATERIAL_GET);
      this.dispatchIntent(UOM_GET);
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
    
    componentMessageHandle(messageAll : Array<any>) {
         
      messageAll.map(message => {       
        
        if (message && message.type == RAW_MATERIAL_GET_OK)
        {
          let materialList : Array<any> = new Array<any>();  
          this.rows.length = 0;

          for (var uomInfo of message.data.data.data)
          {           
            materialList.push({  
              rmid : uomInfo.rmid, 
              rmdesc : uomInfo.rmdesc,
              rmcode : uomInfo.rmcode
            });
          }
          this.rows = materialList;       
        }    
  
        if (message && message.type == UOM_GET_OK)
        {      
          let uomTempList : Array<any> = new Array<any>();  
          this.uomlist.length = 0;

          for (var uomInfo of message.data.data.data)
          {          
            uomTempList.push({  
              uomId : uomInfo.uomId, 
              uomCode : uomInfo.uomCode,
              uomName : uomInfo.uomName, 
              uomTypeId : uomInfo.uomTypeId
            });
          }          
          this.uomlist = uomTempList;        
        }    
      });     
    }
    

    private initForm() {
      this.personForm = this.fb.group({    
          'Rmcode': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
            Validators.maxLength(24)]],
            'Rmdesc': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
              Validators.maxLength(24)]],
              
              'Uomid': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                Validators.maxLength(24)]],
                'TariffCode': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                  Validators.maxLength(24)]],
                  'CountryList': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                    Validators.maxLength(24)]],
                    'DutyImpRate': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                      Validators.maxLength(24)]],
                      'Gstrate': [this.currentModel.Rmcode, [Validators.required, Validators.minLength(1),
                        Validators.maxLength(24)]]
                        
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
                      this.currentModel.Uomid = data.Uomid;
                      this.currentModel.TariffCode = data.TariffCode;
                      this.currentModel.CountryList = data.CountryList;
                      this.currentModel.DutyImpRate = data.DutyImpRate;
                      this.currentModel.Gstrate = data.Gstrate;
                      this.currentModel.RmcatId = data.RmcatId;
                     
                     
                      
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
                    