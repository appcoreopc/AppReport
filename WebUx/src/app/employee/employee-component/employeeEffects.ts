import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {EMPLOYEE_SAVE, EMPLOYEE_CANCEL, EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_MESSAGE_END, EMPLOYEE_SAVE_ERR, EMPLOYEE_CANCEL_OK, EMPLOYEE_GET, EMPLOYEE_GET_ERR,
  EMPLOYEE_GET_OK, JOBTITLE_GET, JOBTITLE_GET_OK,  CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()
  export class EmployeeEffects {   
    
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() citySave$ = this.actions$    
    .ofType(EMPLOYEE_SAVE)   
    .map(action => {  
      console.log("save action",action);
      return JSON.stringify(action.data);
    }).switchMap(payload =>    

        this.http.post(APPLICATION_HOST +  '/employee/save', payload, 
        { headers : headersJson})        
        .catch(err =>  {
          console.log('internal error taken care!!!')
          return Observable.of({ type: EMPLOYEE_SAVE_ERR });})     
      )
      .map(res => { 
        console.log(res);
        return res;
      })
      .catch(() => Observable.of({ type: EMPLOYEE_SAVE_ERR }));

    // .switchMap(payload =>
    // {     
    //     console.log('switchMap psu');   

    //      return this.http.post(APPLICATION_HOST + '/employee/save', 
    //      payload, {headers : headersJson})
    //       .subscribe(res => {      
    //         console.log('response');
    //         console.log(res);
    //         return Observable.of({ type: EMPLOYEE_SAVE_SUCCESS, data: res });

    //       },  
    //       err => {
    //         console.log(err);  
    //         return Observable.of({ type: EMPLOYEE_SAVE_ERR });
    //       });         
         
    //     // .catch(error => {
    //     //   // You could also return an 'Error' action here instead
    //     //   return Observable.of({ type: EMPLOYEE_SAVE_ERR });
    //     // });
        
    //   })     
    //   .catch(() => Observable.of({ type: EMPLOYEE_SAVE_ERR }));
      
      
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
        .switchMap(payload => 
          this.http.get(APPLICATION_HOST + '/employee/index')
        .map(res => {       
          return { type: EMPLOYEE_GET_OK, data: res};
        }) 
        .catch(() => Observable.of({ type: EMPLOYEE_GET_ERR }))
      ); 
      
      @Effect() GrnGetJobTitle$ = this.actions$    
      .ofType(JOBTITLE_GET)     
      .map(action => {   
        JSON.stringify(action);
      })
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/JobTitle/index')  
      .map(res => {       
        return { type: JOBTITLE_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: EMPLOYEE_GET_ERR }))
    ); 
    
  }
  
  