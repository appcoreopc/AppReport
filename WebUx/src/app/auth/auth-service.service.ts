import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  headersJson , LOGIN_SUCCESS, LOGIN_ERR } from '../sharedObjects/sharedMessages';
import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from "rxjs/Subscription";

@Injectable()
export class AuthService {
  
  isLogin:boolean = false;   
  
  constructor(private http: HttpClient) {     
    
  }
  
  login(username : string, password : string)
  {   

    this.doLogin(username, password).subscribe(res => {      
        //return true;
        console.log(res);
        this.isLogin = true;      
      },  
      err => {
        //return false; 
        console.log(err);  
        this.isLogin = false;    
      }, () => {            
      });

    
    // return new Promise<boolean>(function(val) { 
    //   console.log(val);
    //   this.doLogin(username, password);
    // });    
  }
  
  
  logout()
  {    
    
    
  }
  
  private doLogin(username : string, password : string)
  {  
    let payload = { 'username' : username , 'password' : password};
    
    // var result =  this.http.post(APPLICATION_HOST + '/auth/login', payload, 
    // { 
    //   headers : headersJson
    // })
    // .subscribe(res => {      
    //   return true;
    //   this.isLogin = true;      
    // },  
    // err => {
    //   return false; 
    //   //console.log(err);  
    //   this.isLogin = false;    
    // }, () => {            
    // });
    
    return this.http.post(APPLICATION_HOST + '/auth/login', payload, 
    { 
      headers : headersJson
    }).map(res => 
      {
        console.log(res);
        return res;
      });    
    }
  }
  