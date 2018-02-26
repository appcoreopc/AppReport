import { Component, OnInit } from '@angular/core';
import { CityAppState, EMPLOYEE_SAVE, EMPLOYEE_GET_OK,
  ADD, UPDATE, EMPLOYEE_GET, EMPLOYEE_SAVE_SUCCESS } from '../sharedObjects/sharedMessages';
import { UserModel } from "../model/UserModel";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private person:UserModel = new UserModel();
  personForm: FormGroup;
  private intention : number = UPDATE;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {    
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least one character long.',
      'maxlength': 'Username cannot be more than 24 characters long.'
    },
    'password': {
      'required': 'Password is required.'     
    }
  };
  
  constructor(private fb: FormBuilder,  private authService : AuthService) { }
  
  ngOnInit() {

    this.configureEditForm();
  }
  
  private configureEditForm() {
                  
    this.personForm = this.fb.group({
      'username': [this.person.username, [Validators.required, Validators.minLength(1),
        Validators.maxLength(50)]],      
      'password': [this.person.password, [Validators.required]]              
      });

      this.personForm.valueChanges.debounceTime(100)
      .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: UserModel) {
                            
      if (!this.personForm) { return; }              
      
      const form = this.personForm;

      this.person.username = data.username;
      this.person.password = data.password;
   
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

  async login()
  {
    console.log('test');
    if (!this.authService.isLogin)
    {   
      await this.authService.login(this.person.username, this.person.password);    
    }
    // else redirect to requested route url //        
    // console.log('login starts here!');
  }
}
