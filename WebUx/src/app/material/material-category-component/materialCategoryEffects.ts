import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {MATERIAL_CATEGORY_SAVE, MATERIAL_CATEGORY_CANCEL, MATERIAL_CATEGORY_SAVE_SUCCESS,
  MATERIAL_CATEGORY_MESSAGE_END, MATERIAL_CATEGORY_SAVE_ERR, MATERIAL_CATEGORY_CANCEL_OK, MATERIAL_CATEGORY_GET, MATERIAL_CATEGORY_GET_ERR,
  MATERIAL_CATEGORY_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class MaterialCategoryEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() materialCategorySave$ = this.actions$    
    .ofType(MATERIAL_CATEGORY_SAVE)   
    .map(action => {  
      console.log('sending request out!'); 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/materialcategory/save', payload, {headers : headersJson})      
    )
    .map(res => ({ type: MATERIAL_CATEGORY_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: MATERIAL_CATEGORY_SAVE_ERR }));
    
    
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
  
  