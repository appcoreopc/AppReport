import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {RAW_MATERIAL_SAVE, RAW_MATERIAL_CANCEL, RAW_MATERIAL_SAVE_SUCCESS,
  PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE, RAW_MATERIAL_DELETE_SUCCESS, 
  RAW_MATERIAL_DELETE, RAW_MATERIAL_DELETE_ERR, 
  RAW_MATERIAL_MESSAGE_END, RAW_MATERIAL_SAVE_ERR, RAW_MATERIAL_CANCEL_OK, 
  RAW_MATERIAL_GET, RAW_MATERIAL_GET_ERR, RAW_MATERIAL_WAIT_PENDING, 
  RAW_MATERIAL_GET_OK, UOM_GET, UOM_GET_OK, COUNTRY_GET,  COUNTRY_GET_OK,
  CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  
  @Injectable()
  export class RawMaterialEffects {   
           
   constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>, private store : Store<CityAppState>,
    ) { }
    

    @Effect() rawMaterialSave$ = this.actions$    
    .ofType(RAW_MATERIAL_SAVE)
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>   
    { 
          return Observable.of(payload)
          .map(action => {
            debugger;
            this.http.post(APPLICATION_HOST + '/rawmaterial/save', payload, {headers : headersJson})
            .subscribe(res => {                   
              messageUtil.dispatchIntent(this.store, RAW_MATERIAL_SAVE_SUCCESS);
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
            },  
            err => {                       
              if (err && err.status == 201)
              {
                messageUtil.dispatchIntent(this.store, RAW_MATERIAL_SAVE_SUCCESS); 
                messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);               
              } 
              else 
              {                    
                 messageUtil.dispatchIntent(this.store, RAW_MATERIAL_SAVE_ERR, null);   
                 messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);          
              }         
            });  
          });          
            
        })
        .concatMap(res => {         
          return Observable.of({ type: PROGRESS_WAIT_SHOW });
        });       
    
    
    @Effect() rawMaterialReset$ = this.actions$  
    .ofType(RAW_MATERIAL_CANCEL)  
    .map(action => 
      {
        return ({ type: RAW_MATERIAL_CANCEL_OK});
      }); 
      
      @Effect() rawMaterialGet$ = this.actions$    
      .ofType(RAW_MATERIAL_GET)     
      .map(action => {   
        console.log('getting raw material data');
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/rawmaterial/index')  
      .map(res => {       
        return { type: RAW_MATERIAL_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: RAW_MATERIAL_SAVE_ERR }))
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
      .catch(() => Observable.of({ type: RAW_MATERIAL_SAVE_ERR }))
    ); 
    
      @Effect() GrnGetCountry$ = this.actions$    
      .ofType(COUNTRY_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/country/index')  
      .map(res => {       
        return { type: COUNTRY_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: RAW_MATERIAL_SAVE_ERR }))
    ); 



    @Effect() rawMaterialDelete$ = this.actions$
    .ofType(RAW_MATERIAL_DELETE)
    .map(action => {    
  
      return JSON.stringify(action.data);
    }).switchMap(payload => {
      
      /////////EXTRA CODE /////////////////////////////
      
      return Observable.of(payload)
      
      .map(action => {
        
        this.http.request("delete", APPLICATION_HOST + '/rawmaterial/delete/', 
        { 
          headers : headersJson,
          body : action
        })
        .subscribe(res => {
          messageUtil.dispatchIntent(this.store, RAW_MATERIAL_DELETE_SUCCESS, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          
        },
        err => {
          if (err && err.status == 204) {
            messageUtil.dispatchIntent(this.store, RAW_MATERIAL_DELETE_SUCCESS, null);
            messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          }
          else {
            messageUtil.dispatchIntent(this.store, RAW_MATERIAL_DELETE_ERR, null);
            messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          }            
        });
        
        ///////////EXTRA CODE ENDS ///////////////////////////          
      })
      .concatMap(res => {
        return Observable.of({ type: PROGRESS_WAIT_SHOW });
      });
      
    }); 
  
    

  }
  
  