import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {GRN_SAVE, GRN_CANCEL, GRN_SAVE_SUCCESS,
  GRN_MESSAGE_END, GRN_SAVE_ERR, GRN_CANCEL_OK, GRN_GET, GRN_GET_ERR,
  GRN_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class GrnEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() GrnSave$ = this.actions$    
    .ofType(GRN_SAVE)   
    .map(action => {  
      
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/employee/save', payload, {headers : headersJson})      
    )
    .map(res => ({ type: GRN_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: GRN_SAVE_ERR }));
    
    
    @Effect() GrnReset$ = this.actions$  
    .ofType(GRN_CANCEL)  
    .map(action => 
      {
        return ({ type: GRN_CANCEL_OK});
      }); 
      
      @Effect() GrnGet$ = this.actions$    
      .ofType(GRN_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/employee/index')  
      .map(res => {       
        return { type: GRN_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: GRN_SAVE_ERR }))
    ); 
    
  }
  
  