import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  headersJson , LOGIN_SUCCESS, LOGIN_ERR } from '../sharedObjects/sharedMessages';
import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  
  isLogin:boolean = true;   
  
  constructor(private http: HttpClient) {     
    
  }
  
  login(username : string, password : string): boolean
  {   
    this.doLogin(username, password);
    return true;
  }
  
  logout()
  {    
    
  }
  
  private doLogin(username : string, password : string)
  {  
    let payload = { 'username' : username , 'password' : password};
    
    this.http.post(APPLICATION_HOST + '/auth/login', payload, 
    { 
      headers : headersJson
    })
    .subscribe(res => {      
   
      this.isLogin = true;      
    },  
    err => {
      console.log(err);  
      this.isLogin = false;    
    }, () => {
      
    });
    
  }
  
}
