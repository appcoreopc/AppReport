import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {LESEN_SAVE, LESEN_CANCEL, LESEN_SAVE_SUCCESS,
  JOBTITLE_GET, JOBTITLE_GET_OK, EMPLOYEE_WAIT_PENDING, 
  PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE,
  LESEN_MESSAGE_END, LESEN_SAVE_ERR, LESEN_CANCEL_OK, LESEN_GET, LESEN_GET_ERR,
  LESEN_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class LesenEffects {   
           
   constructor(
    private http: HttpClient,
    private actions$: Actions<CityAppState>, private store: Store<CityAppState>
  ) { }
     

     @Effect() LesenSave$ = this.actions$
    .ofType(LESEN_SAVE)
    .map(action => {
      console.log('saving LG');
      return action.data;
    })
    .switchMap(payload => {

      return Observable.of(payload)
        .map(action => {

          console.log('effect payload');
          console.log(payload);

          this.http.post(APPLICATION_HOST + '/rptlg/save', payload, { headers: headersJson })
            .subscribe
            (res => {
              messageUtil.dispatchIntent(this.store, LESEN_SAVE_SUCCESS, null);
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
            },
            err => {
              if (err && err.status == 201) {
                messageUtil.dispatchIntent(this.store, LESEN_SAVE_SUCCESS, null);
              }
              else {
                messageUtil.dispatchIntent(this.store, LESEN_SAVE_ERR, null);
              }
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
            });
        });
    })
    .concatMap(res => {
      return Observable.of({ type: PROGRESS_WAIT_SHOW });
    });
    
    
    @Effect() LesenReset$ = this.actions$  
    .ofType(LESEN_CANCEL)  
    .map(action => 
      {
        return ({ type: LESEN_CANCEL_OK});
      }); 
      
      @Effect() LesenGet$ = this.actions$    
      .ofType(LESEN_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/rptlg/index')  
      .map(res => {       
        return { type: LESEN_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: LESEN_SAVE_ERR }))
    ); 
        
    // @Effect() GrnGetJobTitle$ = this.actions$    
    //   .ofType(JOBTITLE_GET)     
    //   .map(action => {   
    //   console.log('GrnGetJobTitle');
    //     JSON.stringify(action);
    //   })
    //   .switchMap(payload => 
        
    //       this.http.get(APPLICATION_HOST + '/JobTitle/index')  
    //       .map(res => {       
    //         return { type: JOBTITLE_GET_OK, data: res};
    //       }) 
    //       .catch(() => Observable.of({ type: LESEN_GET_ERR }))
    // );
  }
  
  