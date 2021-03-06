import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";
import { RequestOptions } from '@angular/http';

import {
  EMPLOYEE_SAVE, EMPLOYEE_CANCEL, EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_DELETE, EMPLOYEE_DELETE_SUCCESS, EMPLOYEE_DELETE_ERR,
  EMPLOYEE_MESSAGE_END, EMPLOYEE_SAVE_ERR, EMPLOYEE_CANCEL_OK, EMPLOYEE_WAIT_PENDING,
  EMPLOYEE_GET, EMPLOYEE_GET_ERR, 
  PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE,
  EMPLOYEE_GET_OK, JOBTITLE_GET, JOBTITLE_GET_OK, CityAppState, CityData, headersJson
} from '../../sharedObjects/sharedMessages';
import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
import 'rxjs/Rx';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@Injectable()

export class EmployeeEffects {
  
  constructor(
    private http: HttpClient,
    private actions$: Actions<CityAppState>, private store: Store<CityAppState>,
  ) { }
  
    
  @Effect() employeeSave$ = this.actions$
  .ofType(EMPLOYEE_SAVE)
  .map(action => {
    return JSON.stringify(action.data);
  }).switchMap(payload => {
    
    /////////EXTRA CODE /////////////////////////////
    
    return Observable.of(payload)
    .map(action => {
      
      this.http.post(APPLICATION_HOST + '/employee/save', payload, { headers: headersJson })
      .subscribe(res => {
        messageUtil.dispatchIntent(this.store, EMPLOYEE_SAVE_SUCCESS, null);
        messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        
      },
      err => {
        if (err && err.status == 201) {
          messageUtil.dispatchIntent(this.store, EMPLOYEE_SAVE_SUCCESS, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          
        }
        else {
          messageUtil.dispatchIntent(this.store, EMPLOYEE_SAVE_ERR, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        }
      });
    });
    
    ///////////EXTRA CODE ENDS ///////////////////////////          
  })
  .concatMap(res => {
    return Observable.of({ type: PROGRESS_WAIT_SHOW });
  });
  
  
  @Effect() employeeReset$ = this.actions$
  .ofType(EMPLOYEE_CANCEL)
  .map(action => {
    return ({ type: EMPLOYEE_CANCEL_OK });
  });
  
  @Effect() employeeGet$ = this.actions$
  .ofType(EMPLOYEE_GET)
  .map(action => {
    JSON.stringify(action);
  })
  .switchMap(
    
    payload => this.http.get(APPLICATION_HOST + '/employee/index').map(res => {
      return { type: EMPLOYEE_GET_OK, data: res };
    }).catch(() => Observable.of({ type: EMPLOYEE_GET_ERR }))
    
  );
  
  @Effect() GrnGetJobTitle$ = this.actions$
  .ofType(JOBTITLE_GET)
  .map(action => {
    JSON.stringify(action);
  })
  .switchMap(payload =>
    
    this.http.get(APPLICATION_HOST + '/JobTitle/index')
    .map(res => {
      return { type: JOBTITLE_GET_OK, data: res };
    })
    .catch(() => Observable.of({ type: EMPLOYEE_GET_ERR }))
  );
  
  @Effect() employeeDelete$ = this.actions$
  .ofType(EMPLOYEE_DELETE)
  .map(action => {    

    return JSON.stringify(action.data);
  }).switchMap(payload => {
    
    /////////EXTRA CODE /////////////////////////////
    
    return Observable.of(payload)
    
    .map(action => {
      
      this.http.request("delete", APPLICATION_HOST + '/employee/delete/', 
      { 
        headers : headersJson,
        body : action
      })
      .subscribe(res => {
        messageUtil.dispatchIntent(this.store, EMPLOYEE_DELETE_SUCCESS, null);
        messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        
      },
      err => {
        if (err && err.status == 204) {
          messageUtil.dispatchIntent(this.store, EMPLOYEE_DELETE_SUCCESS, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        }
        else {
          messageUtil.dispatchIntent(this.store, EMPLOYEE_DELETE_ERR, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        }            
      });
      
      ///////////EXTRA CODE ENDS ///////////////////////////          
    })
    .concatMap(res => {
      return Observable.of({ type: PROGRESS_WAIT_SHOW });
    });
    
  }); 
  
}

