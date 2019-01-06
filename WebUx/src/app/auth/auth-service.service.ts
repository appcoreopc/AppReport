import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  CityAppState,
  headersJson,
  LOGIN_SUCCESS,
  LOGIN_ERR,
  PROGRESS_WAIT_SHOW,
  PROGRESS_WAIT_HIDE
} from '../sharedObjects/sharedMessages';

import {APPLICATION_HOST} from '../sharedObjects/applicationSetup';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {Subscription} from 'rxjs/Subscription';
import {ISubscription} from "rxjs/Subscription";
import * as messageUtil from "../sharedObjects/storeMessageUtil";
import {Store} from '@ngrx/store';
import {  Router }  from '@angular/router';
import "rxjs/add/operator/map";


@Injectable()
export class AuthService {

  private  _isLogin : boolean = false;
  targetRedirectUrl : string;

  constructor(private http : HttpClient, private store : Store <CityAppState>, private router : Router) {
  }

  public get isLogin():boolean {
    return this._isLogin;    
  }

  login(username : string, password : string)
  {

    messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_SHOW);

    this
      .doLogin(username, password)
      .subscribe(res => {
        console.log(res);
        this._isLogin = true;
        messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE);
      
       if (!this.targetRedirectUrl || this.targetRedirectUrl == "/login")
         this.targetRedirectUrl = "/user";
    
        if (this.router && this.targetRedirectUrl)
            this.router.navigateByUrl(this.targetRedirectUrl);

      }, err => {
        console.log(err);
        this._isLogin = false;
        messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE);

      }, () => {});
  }
  
  setRedirectUrl(router : Router, url : string)
  {
    this.router = router;
    this.targetRedirectUrl = url;
  }

  logout()
  {
    this._isLogin = false;
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
