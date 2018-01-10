import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {EMPLOYEE_SAVE, EMPLOYEE_CANCEL, EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_MESSAGE_END, EMPLOYEE_SAVE_ERR, EMPLOYEE_CANCEL_OK, EMPLOYEE_GET, EMPLOYEE_GET_ERR,
  EMPLOYEE_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class EmployeeEffects {
    
    //headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    //options = new RequestOptions({ headers: this.headers });
    
    
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() citySave$ = this.actions$    
    .ofType(EMPLOYEE_SAVE)   
    .map(action => {  
      console.log('sending request out!'); 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>      
      
      this.http.post('http://localhost:3001/city/create', payload)      
    )
    .map(res => ({ type: EMPLOYEE_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: EMPLOYEE_SAVE_ERR }));
    
    
    @Effect() cityReset$ = this.actions$  
    .ofType(EMPLOYEE_CANCEL)  
    .map(action => 
      {
        return ({ type: EMPLOYEE_CANCEL_OK});
      }); 
      
      @Effect() cityGet$ = this.actions$    
      .ofType(EMPLOYEE_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get('http://localhost:3001' + '/city')  
      .map(res => {       
        return { type: EMPLOYEE_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: EMPLOYEE_SAVE_ERR }))
    ); 
    
  }
  
  