import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {EMPLOYEE_SAVE, EMPLOYEE_CANCEL, EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_MESSAGE_END, EMPLOYEE_SAVE_ERR, EMPLOYEE_CANCEL_OK, EMPLOYEE_WAIT_PENDING, EMPLOYEE_GET, EMPLOYEE_GET_ERR,
  EMPLOYEE_GET_OK, JOBTITLE_GET, JOBTITLE_GET_OK,  CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  import { subscribeOn } from 'rxjs/operator/subscribeOn';
  
  @Injectable()
  export class EmployeeEffects {   
    
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>, private store : Store<CityAppState>,
    ) { }
    
    @Effect() citySave$ = this.actions$    
    .ofType(EMPLOYEE_SAVE)
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>   
    {
          /////////EXTRA CODE /////////////////////////////
  
          return Observable.of(payload)
          .map(action => {
            
            this.http.post(APPLICATION_HOST + '/employee/save', payload, {headers : headersJson})
            .subscribe(res => {                   
              messageUtil.dispatchIntent(this.store, EMPLOYEE_SAVE_ERR, null);
            },  
            err => {                       
              if (err && err.status == 201)
              {
                messageUtil.dispatchIntent(this.store, EMPLOYEE_SAVE_SUCCESS, null);                
              } 
              else 
              {                    
                 messageUtil.dispatchIntent(this.store, EMPLOYEE_SAVE_ERR, null);             
              }         
            });  
          });          
          //return Observable.of({ type: EMPLOYEE_SAVE_ERR });
          ///////////EXTRA CODE ENDS ///////////////////////////          
        })
        .concatMap(res => {         
          return Observable.of({ type: EMPLOYEE_WAIT_PENDING });
        });       
    
    
    @Effect() cityReset$ = this.actions$  
    .ofType(EMPLOYEE_CANCEL)  
    .map(action => 
      {
        return ({ type: EMPLOYEE_CANCEL_OK});
      }); 
      
      
      
      @Effect() cityGet$ = this.actions$    
      .ofType(EMPLOYEE_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(
        
        payload => this.http.get(APPLICATION_HOST + '/employee/index').map(res => {       
          return { type: EMPLOYEE_GET_OK, data: res};
        }).catch(() => Observable.of({ type: EMPLOYEE_GET_ERR }))
        
      ); 
      
      @Effect() GrnGetJobTitle$ = this.actions$    
      .ofType(JOBTITLE_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/JobTitle/index')  
      .map(res => {       
        return { type: JOBTITLE_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: EMPLOYEE_GET_ERR }))
    ); 
    
  }
  
  