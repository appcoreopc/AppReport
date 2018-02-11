import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {CONFIG_SAVE, CONFIG_CANCEL, CONFIG_SAVE_SUCCESS,
  CONFIG_MESSAGE_END, CONFIG_SAVE_ERR, CONFIG_CANCEL_OK, CONFIG_WAIT_PENDING, CONFIG_GET, CONFIG_GET_ERR,
  CONFIG_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  import { subscribeOn } from 'rxjs/operator/subscribeOn';
  
  @Injectable()
  export class ConfigEffects {   
    
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>, private store : Store<CityAppState>,
    ) { }
    
    @Effect() citySave$ = this.actions$    
    .ofType(CONFIG_SAVE)
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>   
    {
          /////////EXTRA CODE /////////////////////////////
  
          return Observable.of(payload)
          .map(action => {
            
            this.http.post(APPLICATION_HOST + '/config/save', payload, {headers : headersJson})
            .subscribe(res => {                   
              messageUtil.dispatchIntent(this.store, CONFIG_SAVE_ERR, null);
            },  
            err => {                       
              if (err && err.status == 201)
              {
                messageUtil.dispatchIntent(this.store, CONFIG_SAVE_SUCCESS, null);                
              } 
              else 
              {                    
                 messageUtil.dispatchIntent(this.store, CONFIG_SAVE_ERR, null);             
              }         
            });  
          });          
        
          ///////////EXTRA CODE ENDS ///////////////////////////          
        })
        .concatMap(res => {         
          return Observable.of({ type: CONFIG_WAIT_PENDING });
        });       
    
    
    @Effect() cityReset$ = this.actions$  
    .ofType(CONFIG_CANCEL)  
    .map(action => 
    {
        return ({ type: CONFIG_CANCEL_OK});
    }); 
                  
    @Effect() cityGet$ = this.actions$    
      .ofType(CONFIG_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(
        
            payload => this.http.get(APPLICATION_HOST + '/config/index').map(res => {       
              return { type: CONFIG_GET_OK, data: res};
            }).catch(() => Observable.of({ type: CONFIG_GET_ERR }))
            
      ); 
       
    
  }
  
  