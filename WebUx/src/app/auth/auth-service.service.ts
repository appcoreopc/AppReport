import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  headersJson , LOGIN_SUCCESS, LOGIN_ERR } from '../sharedObjects/sharedMessages';
import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  
  isLogin:boolean = false;   

  constructor(private http: HttpClient) {     
    this.login("miki", "lai");
  }

  login(username : string, password : string): boolean
  {
    this.doLogin(username, password);
    this.isLogin = true;    
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
      console.log('getting some response from server');
      console.log(res)
      //return Observable.of({ type: LOGIN_SUCCESS, data: res});
    },  
    err => {
        console.log(err);      
    }, () => {
       console.log('completed!!');
    });
    //.catch(() => { console.log('test');});
    //.catch(() => { return Observable.of({ type: LOGIN_ERR })});

    //return Observable.of({ type: LOGIN_ERR });
  }

}
