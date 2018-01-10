import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {SUPPLIER_SAVE, SUPPLIER_CANCEL, SUPPLIER_SAVE_SUCCESS,
  SUPPLIER_MESSAGE_END, SUPPLIER_SAVE_ERR, SUPPLIER_CANCEL_OK, SUPPLIER_GET, SUPPLIER_GET_ERR,
  SUPPLIER_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class SupplierEffects {
    
    headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });
    
    
    constructor(
      private http: Http,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() supplierSave$ = this.actions$    
    .ofType(SUPPLIER_SAVE)   
    .map(action => {  
      console.log('sending request out!'); 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>      
      
      this.http.post(APPLICATION_HOST +  'supplier/create', payload, this.options)      
    )
    .map(res => ({ type: SUPPLIER_SAVE_SUCCESS, data: res.json() }))
    .catch(() => Observable.of({ type: SUPPLIER_SAVE_ERR }));
    
    
    @Effect() supplierReset$ = this.actions$  
    .ofType(SUPPLIER_CANCEL)  
    .map(action => 
     {
        return ({ type: SUPPLIER_CANCEL_OK});
     }); 

      
      @Effect() supplierGet$ = this.actions$    
      .ofType(SUPPLIER_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/supplier/index')  
      .map(res => {       
        return { type: SUPPLIER_GET_OK, data: res.json()};
      }) 
      .catch(() => Observable.of({ type: SUPPLIER_SAVE_ERR }))
    ); 
    
  }
  
  