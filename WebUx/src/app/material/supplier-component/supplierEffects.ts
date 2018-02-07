import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {SUPPLIER_SAVE, SUPPLIER_CANCEL, SUPPLIER_SAVE_SUCCESS, SUPPLIER_WAIT_PENDING, 
  SUPPLIER_MESSAGE_END, SUPPLIER_SAVE_ERR, SUPPLIER_CANCEL_OK, SUPPLIER_GET, SUPPLIER_GET_ERR,
  SUPPLIER_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  import { HttpClient } from '@angular/common/http';
  import { Store } from '@ngrx/store';
  import * as messageUtil from "../../sharedObjects/storeMessageUtil";

  @Injectable()
  export class SupplierEffects {
            
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>, private store : Store<CityAppState>,
    ) { }
    
   
     @Effect() supplierSave$ = this.actions$    
    .ofType(SUPPLIER_SAVE)
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>   
    { 
          return Observable.of(payload)
          .map(action => {
            
            this.http.post(APPLICATION_HOST + '/supplier/save', payload, {headers : headersJson})
            .subscribe(res => {                   
              messageUtil.dispatchIntent(this.store, SUPPLIER_SAVE_ERR, null);
            },  
            err => {                       
              if (err && err.status == 201)
              {
                messageUtil.dispatchIntent(this.store, SUPPLIER_SAVE_SUCCESS, null);                
              } 
              else 
              {                    
                 messageUtil.dispatchIntent(this.store, SUPPLIER_SAVE_ERR, null);             
              }         
            });  
          });          
            
        })
        .concatMap(res => {         
          return Observable.of({ type: SUPPLIER_WAIT_PENDING });
        });       


        
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
        return { type: SUPPLIER_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: SUPPLIER_SAVE_ERR }))
    ); 
    
  }
  
  