import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {M1LAMPIRAN_SAVE, M1LAMPIRAN_CANCEL, M1LAMPIRAN_SAVE_SUCCESS,
  M1LAMPIRAN_MESSAGE_END, M1LAMPIRAN_SAVE_ERR, M1LAMPIRAN_CANCEL_OK, M1LAMPIRAN_GET, M1LAMPIRAN_GET_ERR,
  M1LAMPIRAN_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class M1LampiranEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() M1LampiranSave$ = this.actions$    
    .ofType(M1LAMPIRAN_SAVE)   
    .map(action => {  
      
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/employee/save', payload, {headers : headersJson})      
    )
    .map(res => ({ type: M1LAMPIRAN_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: M1LAMPIRAN_SAVE_ERR }));
    
    
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
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/employee/index')  
      .map(res => {       
        return { type: M1LAMPIRAN_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: M1LAMPIRAN_SAVE_ERR }))
    ); 
    
  }
  
  