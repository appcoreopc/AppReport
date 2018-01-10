import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {REPORT_SAVE, REPORT_CANCEL, REPORT_SAVE_SUCCESS,
  REPORT_MESSAGE_END, REPORT_SAVE_ERR, REPORT_CANCEL_OK, REPORT_GET, REPORT_GET_ERR,
  REPORT_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class ReportEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() citySave$ = this.actions$    
    .ofType(REPORT_SAVE)   
    .map(action => {  
      console.log('sending request out!'); 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/report/create', payload, {headers : headersJson})      
    )
    .map(res => ({ type: REPORT_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: REPORT_SAVE_ERR }));
    
    
    @Effect() cityReset$ = this.actions$  
    .ofType(REPORT_CANCEL)  
    .map(action => 
      {
        return ({ type: REPORT_CANCEL_OK});
      }); 
      
      @Effect() cityGet$ = this.actions$    
      .ofType(REPORT_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/report/index')  
      .map(res => {       
        return { type: REPORT_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: REPORT_SAVE_ERR }))
    ); 
    
  }
  
  