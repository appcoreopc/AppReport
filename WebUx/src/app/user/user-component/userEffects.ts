import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {USER_SAVE, USER_CANCEL, USER_SAVE_SUCCESS,
  USER_MESSAGE_END, USER_SAVE_ERR, USER_CANCEL_OK, USER_GET, 
  USER_GET_ERR, PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE, USER_DELETE_SUCCESS, USER_DELETE, USER_DELETE_ERR,
  USER_GET_OK, CityAppState, CityData, headersJson } from '../../sharedObjects/sharedMessages';
  import { APPLICATION_HOST, APP_SERVICE_PATH} from '../../sharedObjects/applicationSetup';
  import 'rxjs/Rx';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

  @Injectable()  
  export class UserEffects {   
    
    constructor(
      private http: HttpClient,
      private actions$: Actions<CityAppState>,
      private store: Store<CityAppState>,
    ) { 
      
    }
    
    @Effect() userSave$ = this.actions$    
    .ofType(USER_SAVE)   
    .map(action => {  
      return JSON.stringify(action.data);   
    })
    .switchMap(payload =>    {
      
      return Observable.of(payload)
        .map(action => {

          this.http.post(APPLICATION_HOST + '/user/save', payload, {headers : headersJson})
            .subscribe(res => {
              messageUtil.dispatchIntent(this.store, USER_SAVE_SUCCESS, null);
              messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);

            },
            err => {
              if (err && err.status == 201) {
                messageUtil.dispatchIntent(this.store, USER_SAVE_SUCCESS, null);
                messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);

              }
              else {
                messageUtil.dispatchIntent(this.store, USER_SAVE_SUCCESS, null);
                messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
              }
            });
        });
       
    })
    .concatMap(res => {
      return Observable.of({ type: PROGRESS_WAIT_SHOW });
    });
    
    
    @Effect() employeeDelete$ = this.actions$
    .ofType(USER_DELETE)
    .map(action => {    
  
      return JSON.stringify(action.data);
    }).switchMap(payload => {
      
      /////////EXTRA CODE /////////////////////////////
      
      return Observable.of(payload)
      
      .map(action => {
        
        this.http.request("delete", APPLICATION_HOST + '/user/delete/', 
        { 
          headers : headersJson,
          body : action
        })
        .subscribe(res => {
          messageUtil.dispatchIntent(this.store, USER_DELETE_SUCCESS, null);
          messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          
        },
        err => {
          debugger;
          if (err && err.status == 204) {
            messageUtil.dispatchIntent(this.store, USER_DELETE_SUCCESS, null);
            messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          }
          else {
            messageUtil.dispatchIntent(this.store, USER_DELETE_ERR, null);
            messageUtil.dispatchIntent(this.store, PROGRESS_WAIT_HIDE, null);
          }            
        });
        
        ///////////EXTRA CODE ENDS ///////////////////////////          
      })
      .concatMap(res => {
        return Observable.of({ type: PROGRESS_WAIT_SHOW });
      });
      
    }); 



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
  
  