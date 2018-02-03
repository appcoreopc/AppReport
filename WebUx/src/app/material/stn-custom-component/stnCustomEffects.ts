import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {STN_CUSTOM_SAVE, STN_CUSTOM_CANCEL, STN_CUSTOM_SAVE_SUCCESS,
  STN_CUSTOM_MESSAGE_END, STN_CUSTOM_SAVE_ERR, STN_CUSTOM_CANCEL_OK, STN_CUSTOM_GET, STN_CUSTOM_GET_ERR,
  STN_CUSTOM_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  import { HttpClient } from '@angular/common/http';

  @Injectable()
  export class StnCustomEffects {
            
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() stncustomSave$ = this.actions$    
    .ofType(STN_CUSTOM_SAVE)   
    .map(action => {  
     
        console.log("STN_CUSTOM_SAVE") ; 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>            
      this.http.post(APPLICATION_HOST +  '/stncustom/save', payload, { headers : headersJson})      
    )
    .map(res => ({ type: STN_CUSTOM_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: STN_CUSTOM_SAVE_ERR }));
        
    @Effect() stncustomReset$ = this.actions$  
    .ofType(STN_CUSTOM_CANCEL)  
    .map(action => 
     {
        return ({ type: STN_CUSTOM_CANCEL_OK});
     }); 
      
      @Effect() stncustomGet$ = this.actions$    
      .ofType(STN_CUSTOM_GET)     
      .map(action => {   
        console.log("STN_CUSTOM_GET") ;    
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/stncustom/index')  
      .map(res => {     
        console.log("STN_CUSTOM_GET_OK") ;        
        return { type: STN_CUSTOM_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: STN_CUSTOM_SAVE_ERR }))
    ); 
    
  }
  
  