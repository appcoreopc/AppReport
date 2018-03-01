import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'; 
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {MATERIAL_CATEGORY_SAVE, 
  MATERIAL_CATEGORY_CANCEL, MATERIAL_CATEGORY_SAVE_SUCCESS,
  PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE,
  MATERIAL_CATEGORY_MESSAGE_END, MATERIAL_CATEGORY_SAVE_ERR, MATERIAL_CATEGORY_CANCEL_OK, MATERIAL_CATEGORY_GET, MATERIAL_CATEGORY_GET_ERR,
  MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_WAIT_PENDING, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class MaterialCategoryEffects {   
           
   constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>, private store : Store<CityAppState>,
    ) { }
 
     
    @Effect() materialCategorySave$ = this.actions$    
    .ofType(MATERIAL_CATEGORY_SAVE)
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>   
    { 
          return Observable.of(payload)
          .map(action => {
            
            this.http.post(APPLICATION_HOST + '/materialcategory/save', payload, {headers : headersJson})
            .subscribe(res => {                   
              messageUtil.dispatchIntent(this.store, MATERIAL_CATEGORY_SAVE_SUCCESS, null);
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
            },  
            err => {                       
              if (err && err.status == 201)
              {
                messageUtil.dispatchIntent(this.store, MATERIAL_CATEGORY_SAVE_SUCCESS, null);                
                messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
              } 
              else 
              {                    
                 messageUtil.dispatchIntent(this.store, MATERIAL_CATEGORY_SAVE_ERR, null);             
                 messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
              }         
            });  
          });          
            
        })
        .concatMap(res => {         
          return Observable.of({ type: PROGRESS_WAIT_SHOW });
        });       
    
    
    
    @Effect() materialCategoryReset$ = this.actions$  
    .ofType(MATERIAL_CATEGORY_CANCEL)  
    .map(action => 
      {
        return ({ type: MATERIAL_CATEGORY_CANCEL_OK});
      }); 
      


      @Effect() materialCategoryGet$ = this.actions$    
      .ofType(MATERIAL_CATEGORY_GET)     
      .map(action => {  
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/materialcategory/index')  
      .map(res => {       
        return { type: MATERIAL_CATEGORY_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: MATERIAL_CATEGORY_SAVE_ERR }))
    ); 
    
  }
  
  