import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {GRN_SAVE, GRN_CANCEL, GRN_SAVE_SUCCESS,
  GRN_MESSAGE_END, GRN_SAVE_ERR, GRN_CANCEL_OK, GRN_GET, 
  SUPPLIER_GET, SUPPLIER_GET_OK,  
  RAW_MATERIAL_GET, RAW_MATERIAL_GET_OK,  
  UOM_GET, UOM_GET_OK, 
  COMPONENT_GET, COMPONENT_GET_OK, 
  CURRENCY_GET, CURRENCY_GET_OK, 
  STNCUSTOM_GET, STNCUSTOM_GET_OK,  
  GRN_GET_ERR, GRN_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
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
      this.http.post(APPLICATION_HOST + '/grn/save', payload, {headers : headersJson})      
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
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/grn/index')  
      .map(res => {       
        return { type: GRN_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: GRN_SAVE_ERR }))
    ); 

     @Effect() GrnGetUom$ = this.actions$    
      .ofType(UOM_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/uom/index')  
      .map(res => {       
        return { type: UOM_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: GRN_SAVE_ERR }))
    ); 
    
    
     @Effect() GrnGetComponent$ = this.actions$    
      .ofType(COMPONENT_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/component/index')  
      .map(res => {       
        return { type: COMPONENT_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: GRN_SAVE_ERR }))
    ); 

    
     @Effect() GrnGetCurrency$ = this.actions$    
      .ofType(CURRENCY_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/currency/index')  
      .map(res => {       
        return { type: CURRENCY_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: GRN_SAVE_ERR }))
    ); 

    
     @Effect() GrnGetStncustom$ = this.actions$    
      .ofType(STNCUSTOM_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/stncustom/index')  
      .map(res => {       
        return { type: STNCUSTOM_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: GRN_SAVE_ERR }))
    ); 
 
 

  }
  
  