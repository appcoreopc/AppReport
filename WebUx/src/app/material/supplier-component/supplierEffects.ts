import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {SUPPLIER_SAVE, SUPPLIER_CANCEL, 
  SUPPLIER_SAVE_SUCCESS, SUPPLIER_WAIT_PENDING, 
  PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE, SUPPLIER_DELETE, 
  SUPPLIER_DELETE_ERR, SUPPLIER_DELETE_SUCCESS, CURRENCY_GET, CURRENCY_GET_OK, FACTORYSTATUS_GET, FACTORYSTATUS_GET_OK,
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
            messageUtil.dispatchIntent(this.store, SUPPLIER_SAVE_SUCCESS, null);
            messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
            
          },  
          err => {                       
            if (err && err.status == 201)
            {               
              messageUtil.dispatchIntent(this.store, SUPPLIER_SAVE_SUCCESS, null);     
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
              
            } 
            else 
            {       
              messageUtil.dispatchIntent(this.store, SUPPLIER_SAVE_ERR, null);     
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
              
            }         
          });  
        });                      
      })
      .concatMap(res => {         
        return Observable.of({ type: PROGRESS_WAIT_SHOW });
      });       
      

      @Effect() supplierDelete$ = this.actions$
  .ofType(SUPPLIER_DELETE)
  .map(action => {    

    return JSON.stringify(action.data);
  }).switchMap(payload => {
    
    /////////EXTRA CODE /////////////////////////////
    
    return Observable.of(payload)
    
    .map(action => {
      
      this.http.request("delete", APPLICATION_HOST + '/supplier/delete/', 
      { 
        headers : headersJson,
        body : action
      })
      .subscribe(res => {
        messageUtil.dispatchIntent(this.store, SUPPLIER_DELETE_SUCCESS, null);
        messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        
      },
      err => {
        if (err && err.status == 204) {
          messageUtil.dispatchIntent(this.store, SUPPLIER_DELETE_SUCCESS, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        }
        else {
          messageUtil.dispatchIntent(this.store, SUPPLIER_DELETE_ERR, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
        }            
      });
      
      ///////////EXTRA CODE ENDS ///////////////////////////          
    })
    .concatMap(res => {
      return Observable.of({ type: PROGRESS_WAIT_SHOW });
    });
    
  }); 
  

    @Effect() GetFactoryStatus$ = this.actions$    
    .ofType(FACTORYSTATUS_GET)     
    .map(action => {   
      JSON.stringify(action);
    })
    .switchMap(payload => this.http.get(APPLICATION_HOST + '/factorystatus/index')  
    .map(res => {       
      return { type: FACTORYSTATUS_GET_OK, data: res};
    }) 
    .catch(() => Observable.of({ type: SUPPLIER_SAVE_ERR }))
  ); 
      
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
    
    