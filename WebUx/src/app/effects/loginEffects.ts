import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {LOGIN_DO, LOGIN_SUCCESS, LOGIN_ERR,  CityAppState, headersJson } from '../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
    
  @Injectable()
  export class LoginEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) {       
      
    }
    
    @Effect() citySave$ = this.actions$    
    .ofType(LOGIN_DO)   
    .map(action => {        
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/auth/login', payload, {headers : headersJson})      
    )
    .map(res => ({ type: LOGIN_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: LOGIN_ERR }));
        
  }
  
  