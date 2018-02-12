import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {
  CityAppState,
  headersJson,
  EMPLOYEE_WAIT_OK,
  EMPLOYEE_WAIT_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERR,
  PROGRESS_WAIT_PENDING,
  PROGRESS_WAIT_OK
} from '../sharedObjects/sharedMessages';

import {APPLICATION_HOST} from '../sharedObjects/applicationSetup';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {Subscription} from 'rxjs/Subscription';
import {ISubscription} from "rxjs/Subscription";
import * as messageUtil from "../sharedObjects/storeMessageUtil";
import {Store} from '@ngrx/store';
import {  Router }  from '@angular/router';

@Injectable()
export class AuthService {

  isLogin : boolean = false;

  targetRedirectUrl : string;
  router : Router; 

  constructor(private http : HttpClient, private store : Store < CityAppState >) {}

  login(username : string, password : string)
  {

    messageUtil.dispatchIntent(this.store, EMPLOYEE_WAIT_PENDING);

    this
      .doLogin(username, password)
      .subscribe(res => {
        console.log(res);
        this.isLogin = true;
        messageUtil.dispatchIntent(this.store, EMPLOYEE_WAIT_OK);

        if (this.router && this.targetRedirectUrl)
            this.router.navigateByUrl(this.targetRedirectUrl);

      }, err => {
        console.log(err);
        this.isLogin = false;
        messageUtil.dispatchIntent(this.store, EMPLOYEE_WAIT_OK);

      }, () => {});
  }
  
  setRedirectUrl(router : Router, url : string)
  {
    this.router = router;
    this.targetRedirectUrl = url;
  }

  logout()
  {

  }


  /// Map function for Http Post //
  private doLogin(username : string, password : string)
  {
    let payload = {
      'username': username,
      'password': password
    };

    return this
      .http
      .post(APPLICATION_HOST + '/auth/login', payload, {headers: headersJson})
      .map(res => {
        console.log(res);
        return res;
      });
  }
}
