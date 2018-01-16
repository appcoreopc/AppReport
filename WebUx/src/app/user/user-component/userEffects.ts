import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {USER_SAVE, USER_CANCEL, USER_SAVE_SUCCESS,
  USER_MESSAGE_END, USER_SAVE_ERR, USER_CANCEL_OK, USER_GET, USER_GET_ERR,
  USER_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST, APP_SERVICE_PATH} from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()  
  export class UserEffects {   
    
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>
    ) { 

     }
    
    @Effect() userSave$ = this.actions$    
    .ofType(USER_SAVE)   
    .map(action => {  
     return JSON.stringify(action.data);   
    })
    .switchMap(payload =>    {
     console.log('posting');
     console.log(payload);
     return this.http.post(APPLICATION_HOST + '/user/save', payload, {headers : headersJson});
    })
    .map(res => ({ type: USER_SAVE_SUCCESS, data: res }))
    .catch(() => Observable.of({ type: USER_SAVE_ERR }));
            
    @Effect() userReset$ = this.actions$  
    .ofType(USER_CANCEL)  
    .map(action => 
      {
        return ({ type: USER_CANCEL_OK});
      }); 
      
  @Effect() userGet$ = this.actions$    
      .ofType(USER_GET)     
      .switchMap(payload => this.http.get(APPLICATION_HOST + '/user/index')  
      .map(res => {   
                
        return { type: USER_GET_OK, data: res};
      }) 
      .catch(() => Observable.of({ type: USER_GET_ERR }))
    ); 

  }
  
  