import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';


import {NAVIGATION_SAVE, NAVIGATION_CANCEL, NAVIGATION_SAVE_SUCCESS,
  NAVIGATION_MESSAGE_END, NAVIGATION_SAVE_ERR, NAVIGATION_CANCEL_OK, NAVIGATION_GET, NAVIGATION_GET_ERR,
  NAVIGATION_GET_OK, CityAppState, CityData, headersJson } from '../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class ReportEffects {   
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() navigationGet$ = this.actions$    
      .ofType(NAVIGATION_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/report/index')  
      .map(res => {       
        return { type: NAVIGATION_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: NAVIGATION_SAVE_ERR }))
    ); 
    
  }
  