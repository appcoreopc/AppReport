
import { ActionReducer, Action } from '@ngrx/store';

import {USER_SAVE, USER_CANCEL, USER_SAVE_SUCCESS,
	 USER_MESSAGE_END, USER_SAVE_ERR, USER_CANCEL_OK, USER_GET, USER_GET_ERR,
	  USER_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function UserReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case USER_GET_OK: 
			console.log(action);
			console.log('user get ok')
		  return  { status : 1, data : action, type: USER_GET_OK };
		case USER_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: USER_MESSAGE_END };	
		case USER_CANCEL:
			console.log(USER_CANCEL);
			return  { status : 3, type: USER_MESSAGE_END };	
		case USER_SAVE_SUCCESS:
			console.log(USER_SAVE_SUCCESS);
			return { status : 4, type: USER_SAVE_SUCCESS }
		case USER_SAVE_ERR:
			console.log(USER_SAVE_ERR);
			return  { status : 5, type: USER_MESSAGE_END };			
		case USER_GET_ERR: 
		console.log(action);
		default:
			return status;						
		}					
	} 