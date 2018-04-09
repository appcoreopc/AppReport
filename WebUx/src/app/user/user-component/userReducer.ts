
import { ActionReducer, Action } from '@ngrx/store';

import {USER_SAVE, USER_CANCEL, USER_SAVE_SUCCESS, USER_DELETE_SUCCESS,
	 USER_MESSAGE_END, USER_SAVE_ERR, USER_CANCEL_OK, USER_GET, USER_GET_ERR,
	  USER_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function UserReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case USER_GET_OK: 		
		  return  { status : 1, data : action, type: USER_GET_OK };
		case USER_SAVE:		
		  return  { status : 2, data : action, type: USER_MESSAGE_END };	
		case USER_CANCEL:
			return  { status : 3, data : action, type: USER_MESSAGE_END };	
		case USER_SAVE_SUCCESS:
			return { status : 4, data : action, type: USER_SAVE_SUCCESS }
		case USER_SAVE_ERR:
			return  { status : 5, data : action, type: USER_MESSAGE_END };			
		case USER_DELETE_SUCCESS:
	    console.log('sending logging');
			return  { status : 6, data : action, type: USER_DELETE_SUCCESS };			
		case USER_GET_ERR: 
		  return  { status : 7, data : action, type: USER_GET_ERR };			
		default:
			return status;						
		}					
	} 