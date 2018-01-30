import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';


import {SKIMKHAS_SAVE, SKIMKHAS_CANCEL, SKIMKHAS_SAVE_SUCCESS,
  SKIMKHAS_MESSAGE_END, SKIMKHAS_SAVE_ERR, SKIMKHAS_CANCEL_OK, SKIMKHAS_GET, SKIMKHAS_GET_ERR,
  SKIMKHAS_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
import 'rxjs/Rx';
  
@Injectable()
export class SkimKhasEffects {   
           
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() SkimKhasSave$ = this.actions$    
    .ofType(SKIMKHAS_SAVE)   
    .map(action => {  
      
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>   
      this.http.post(APPLICATION_HOST + '/rptsk/save', payload, {headers : headersJson})      
    )
    .map(res => ({ type: SKIMKHAS_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: SKIMKHAS_SAVE_ERR }));
    
    
    @Effect() SkimKhasReset$ = this.actions$  
    .ofType(SKIMKHAS_CANCEL)  
    .map(action => 
      {
        return ({ type: SKIMKHAS_CANCEL_OK});
      }); 
      
      @Effect() SkimKhasGet$ = this.actions$    
      .ofType(SKIMKHAS_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/rptsk/index')  
      .map(res => {       
        return { type: SKIMKHAS_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: SKIMKHAS_SAVE_ERR }))
    );     
  }
  
  