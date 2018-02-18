import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {LESEN_SAVE, LESEN_CANCEL, LESEN_SAVE_SUCCESS,
  LESEN_MESSAGE_END, LESEN_SAVE_ERR, LESEN_CANCEL_OK, LESEN_GET, LESEN_GET_ERR,
  LESEN_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class LesenEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() LesenSave$ = this.actions$    
    .ofType(LESEN_SAVE)   
    .map(action => {  
      
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/rptLg/save', payload, {headers : headersJson})      
    )
    .map(res => ({ type: LESEN_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: LESEN_SAVE_ERR }));
    
    
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
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/rptLg/index')  
      .map(res => {       
        return { type: LESEN_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: LESEN_SAVE_ERR }))
    ); 
    
  }
  
  