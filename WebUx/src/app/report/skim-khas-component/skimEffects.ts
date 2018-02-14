import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as messageUtil from "../../sharedObjects/storeMessageUtil";

import {
  SKIMKHAS_SAVE, SKIMKHAS_CANCEL, SKIMKHAS_SAVE_SUCCESS, SKIMKHAS_PRINT,SKIMKHAS_PRINT_OK, 
  SKIMKHAS_MESSAGE_END, SKIMKHAS_SAVE_ERR, SKIMKHAS_CANCEL_OK, EMPLOYEE_WAIT_PENDING, SKIMKHAS_GET, SKIMKHAS_GET_ERR,
  SKIMKHAS_GET_OK, JOBTITLE_GET, JOBTITLE_GET_OK,
  CityAppState, CityData, headersJson
} from '../../sharedObjects/sharedMessages';
import { APPLICATION_HOST } from '../../sharedObjects/applicationSetup';
import 'rxjs/Rx';

@Injectable()
export class SkimKhasEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions<CityAppState>, private store: Store<CityAppState>
  ) { }

  @Effect() SkimKhasSave$ = this.actions$
    .ofType(SKIMKHAS_SAVE)
    .map(action => {
      console.log('saving skim khas');
      return action.data;
    })
    .switchMap(payload => {

      return Observable.of(payload)
        .map(action => {

          console.log('effect payload');
          console.log(payload);

          this.http.post(APPLICATION_HOST + '/rptsk/save', payload, { headers: headersJson })
            .subscribe
            (res => {
              messageUtil.dispatchIntent(this.store, SKIMKHAS_SAVE_SUCCESS, null);
            },
            err => {
              if (err && err.status == 201) {
                messageUtil.dispatchIntent(this.store, SKIMKHAS_SAVE_SUCCESS, null);
              }
              else {
                messageUtil.dispatchIntent(this.store, SKIMKHAS_SAVE_ERR, null);
              }
            });
        });
    })
    .concatMap(res => {
      return Observable.of({ type: EMPLOYEE_WAIT_PENDING });
    });

  @Effect() SkimKhasReset$ = this.actions$
    .ofType(SKIMKHAS_CANCEL)
    .map(action => {
      return ({ type: SKIMKHAS_CANCEL_OK });
    });

     @Effect() SkimKhasPrint$ = this.actions$
    .ofType(SKIMKHAS_PRINT)
    .map(action => {
      return ({ type: SKIMKHAS_PRINT_OK });
    });

  @Effect() SkimKhasGet$ = this.actions$
    .ofType(SKIMKHAS_GET)
    .map(action => {
      JSON.stringify(action);
    })
    .switchMap(payload => this.http.get(APPLICATION_HOST + '/rptsk/index')
      .map(res => {
        return { type: SKIMKHAS_GET_OK, data: res };
      })
      .catch(() => Observable.of({ type: SKIMKHAS_SAVE_ERR }))
    );

    @Effect() GrnGetJobTitle$ = this.actions$    
      .ofType(JOBTITLE_GET)     
      .map(action => {   
      console.log('GrnGetJobTitle');
        JSON.stringify(action);
      })
      .switchMap(payload => 
        
          this.http.get(APPLICATION_HOST + '/JobTitle/index')  
          .map(res => {       
            return { type: JOBTITLE_GET_OK, data: res};
          }) 
          .catch(() => Observable.of({ type: SKIMKHAS_GET_ERR }))
    ); 
}

