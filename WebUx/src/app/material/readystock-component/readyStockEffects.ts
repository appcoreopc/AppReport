import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'; 
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import { READYSTOCK_SAVE,  READYSTOCK_CANCEL,  READYSTOCK_SAVE_SUCCESS,
  PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE,
   READYSTOCK_MESSAGE_END,  READYSTOCK_SAVE_ERR,  READYSTOCK_CANCEL_OK,  READYSTOCK_GET,  READYSTOCK_GET_ERR,
   READYSTOCK_GET_OK,  READYSTOCK_WAIT_PENDING, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class ReadyStockEffects {   
           
   constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>, private store : Store<CityAppState>,
    ) { }
 
     
    @Effect() readyStockSave$ = this.actions$    
    .ofType( READYSTOCK_SAVE)
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>   
    { 
          return Observable.of(payload)
          .map(action => {
            
            this.http.post(APPLICATION_HOST + '/readystock/save', payload, {headers : headersJson})
            .subscribe(res => {                   
              messageUtil.dispatchIntent(this.store,  READYSTOCK_SAVE_SUCCESS, null);
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
            },  
            err => {                       
              if (err && err.status == 201)
              {
                messageUtil.dispatchIntent(this.store,  READYSTOCK_SAVE_SUCCESS, null);
                messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);               
              } 
              else 
              {                    
                 messageUtil.dispatchIntent(this.store,  READYSTOCK_SAVE_ERR, null);  
                 messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);           
              }         
            });  
          });          
            
        })
        .concatMap(res => {         
          return Observable.of({ type:  PROGRESS_WAIT_SHOW });
        });       
    
    
    
    @Effect()  readyStockReset$ = this.actions$  
    .ofType( READYSTOCK_CANCEL)  
    .map(action => 
      {
        return ({ type:  READYSTOCK_CANCEL_OK});
      }); 
      


      @Effect()  readyStockGet$ = this.actions$    
      .ofType( READYSTOCK_GET)     
      .map(action => {  
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/readystock/index')  
      .map(res => {       
        return { type:  READYSTOCK_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type:  READYSTOCK_SAVE_ERR }))
    ); 
    
  }
  
  