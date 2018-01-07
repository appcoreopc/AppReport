import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {USER_SAVE, USER_CANCEL, USER_SAVE_SUCCESS,
  USER_MESSAGE_END, USER_SAVE_ERR, USER_CANCEL_OK, USER_GET, USER_GET_ERR,
  USER_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST, APP_SERVICE_PATH} from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
  
  @Injectable()  
  export class UserEffects {
    
    headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });
        
    constructor(
      private http: Http,
      private actions$: Actions<CityAppState>
    ) { }
    
    @Effect() userSave$ = this.actions$    
    .ofType(USER_SAVE)   
    .map(action => {  
      console.log('sending request out!'); 
      return JSON.stringify(action.data);
    })
    .switchMap(payload =>      
      
      this.http.post(APPLICATION_HOST + APP_SERVICE_PATH + '/save', payload, this.options)      
    )
    .map(res => ({ type: USER_SAVE_SUCCESS, data: res.json() }))
    .catch(() => Observable.of({ type: USER_SAVE_ERR }));
        
    @Effect() userReset$ = this.actions$  
    .ofType(USER_CANCEL)  
    .map(action => 
      {
        return ({ type: USER_CANCEL_OK});
      }); 
      
  @Effect() userGet$ = this.actions$    
      .ofType(USER_GET)     
      .switchMap(payload => this.http.get(APPLICATION_HOST + APP_SERVICE_PATH + '/user')  
      .map(res => {   
                
        return { type: USER_GET_OK, data: res.json()};
      }) 
      .catch(() => Observable.of({ type: USER_GET_ERR }))
    ); 

  }
  
  