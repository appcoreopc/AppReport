import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {STN_CUSTOM_SAVE, STN_CUSTOM_CANCEL, STN_CUSTOM_SAVE_SUCCESS,
  STN_CUSTOM_MESSAGE_END, STN_CUSTOM_SAVE_ERR, STN_CUSTOM_CANCEL_OK, STN_CUSTOM_GET, STN_CUSTOM_GET_ERR,
  STN_CUSTOM_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class StnCustomEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() citySave$ = this.actions$    
    .ofType(STN_CUSTOM_SAVE)   
    .map(action => {  
      console.log('sending request out!'); 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/city/create', payload, {headers : headersJson})      
    )
    .map(res => ({ type: STN_CUSTOM_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: STN_CUSTOM_SAVE_ERR }));
    
    
    @Effect() cityReset$ = this.actions$  
    .ofType(STN_CUSTOM_CANCEL)  
    .map(action => 
      {
        return ({ type: STN_CUSTOM_CANCEL_OK});
      }); 
      
      @Effect() cityGet$ = this.actions$    
      .ofType(STN_CUSTOM_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/city/index')  
      .map(res => {       
        return { type: STN_CUSTOM_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: STN_CUSTOM_SAVE_ERR }))
    ); 
    
  }
  
  