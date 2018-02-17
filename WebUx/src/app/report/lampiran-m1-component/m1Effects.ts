import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {M1LAMPIRAN_SAVE, M1LAMPIRAN_CANCEL, M1LAMPIRAN_SAVE_SUCCESS,
	JOBTITLE_GET, JOBTITLE_GET_OK, M1LAMPIRAN_PRINT, M1LAMPIRAN_PRINT_OK, EMPLOYEE_WAIT_PENDING, 
  M1LAMPIRAN_MESSAGE_END, M1LAMPIRAN_SAVE_ERR, M1LAMPIRAN_CANCEL_OK, M1LAMPIRAN_GET, M1LAMPIRAN_GET_ERR,
  M1LAMPIRAN_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class M1LampiranEffects {   
           
   constructor(
    private http: HttpClient,
    private actions$: Actions<CityAppState>, private store: Store<CityAppState>
  ) { }
     

     @Effect() M1LampiranSave$ = this.actions$
    .ofType(M1LAMPIRAN_SAVE)
    .map(action => {
      console.log('saving m1');
      return action.data;
    })
    .switchMap(payload => {

      return Observable.of(payload)
        .map(action => {

          console.log('effect payload');
          console.log(payload);

          this.http.post(APPLICATION_HOST + '/rptm1/save', payload, { headers: headersJson })
            .subscribe
            (res => {
              messageUtil.dispatchIntent(this.store, M1LAMPIRAN_SAVE_SUCCESS, null);
            },
            err => {
              if (err && err.status == 201) {
                messageUtil.dispatchIntent(this.store, M1LAMPIRAN_SAVE_SUCCESS, null);
              }
              else {
                messageUtil.dispatchIntent(this.store, M1LAMPIRAN_SAVE_ERR, null);
              }
            });
        });
    })
    .concatMap(res => {
      return Observable.of({ type: EMPLOYEE_WAIT_PENDING });
    });
    
    
    @Effect() M1LampiranReset$ = this.actions$  
    .ofType(M1LAMPIRAN_CANCEL)  
    .map(action => 
      {
        return ({ type: M1LAMPIRAN_CANCEL_OK});
      }); 
      
      @Effect() M1LampiranGet$ = this.actions$    
      .ofType(M1LAMPIRAN_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/rptm1/index')  
      .map(res => {       
        return { type: M1LAMPIRAN_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: M1LAMPIRAN_SAVE_ERR }))
    ); 
    
    
    @Effect() GrnGetJobTitle$ = this.actions$    
      .ofType(JOBTITLE_GET)     
      .map(action => {   
      console.log('GrnGetJobTitle');
        JSON.stringify(action);
      })
      .switchMap(payload => 
        
          this.http.get(APPLICATION_HOST + '/JobTitle/index')  
          .map(res => {       
            return { type: JOBTITLE_GET_OK, data: res};
          }) 
          .catch(() => Observable.of({ type: M1LAMPIRAN_GET_ERR }))
    );
  }
  
  