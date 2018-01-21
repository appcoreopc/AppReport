import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {UOM_SAVE, UOM_CANCEL, UOM_SAVE_SUCCESS,
  UOM_MESSAGE_END, UOM_SAVE_ERR, UOM_CANCEL_OK, UOM_GET, UOM_GET_ERR,
  UOM_GET_OK, CityAppState, CityData, headersJson } from '../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
    
  @Injectable()
  export class UOMEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) {       
      

    }
    
    @Effect() citySave$ = this.actions$    
    .ofType(UOM_SAVE)   
    .map(action => {  
      
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/uom/save', payload, {headers : headersJson})      
    )
    .map(res => ({ type: UOM_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: UOM_SAVE_ERR }));
    
    
    @Effect() cityReset$ = this.actions$  
    .ofType(UOM_CANCEL)  
    .map(action => 
      {
        return ({ type: UOM_CANCEL_OK});
      }); 
      
      @Effect() cityGet$ = this.actions$    
      .ofType(UOM_GET)     
      .map(action => {   
        JSON.stringify(action);
        console.log('getting uom data.')
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/uom/index')  
      .map(res => {       
        return { type: UOM_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: UOM_SAVE_ERR }))
    ); 
    
  }
  
  