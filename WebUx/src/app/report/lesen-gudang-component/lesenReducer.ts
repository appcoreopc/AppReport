
import { ActionReducer, Action } from '@ngrx/store';

import {LESEN_SAVE, LESEN_CANCEL, LESEN_SAVE_SUCCESS, 
	JOBTITLE_GET, JOBTITLE_GET_OK,  
	 LESEN_MESSAGE_END, LESEN_SAVE_ERR, LESEN_CANCEL_OK, LESEN_GET, LESEN_GET_ERR,
	  LESEN_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function LesenReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case LESEN_GET_OK: 
		  return  { status : 1, data : action, type: LESEN_GET_OK };
		case LESEN_SAVE:		 
		  return  { status : 2, data : action, type: LESEN_MESSAGE_END };	
		case LESEN_CANCEL:
			console.log(LESEN_CANCEL);
			return  { status : 3, type: LESEN_MESSAGE_END };	
		case LESEN_SAVE_SUCCESS:
			console.log(LESEN_SAVE_SUCCESS);
			return { status : 4, type: LESEN_SAVE_SUCCESS }
		case LESEN_SAVE_ERR:
			console.log(LESEN_SAVE_ERR);
			return  { status : 5, type: LESEN_MESSAGE_END };			 
		case JOBTITLE_GET_OK:
			console.log(JOBTITLE_GET_OK);
			return { status : 6, type: JOBTITLE_GET_OK }		
		default:
			return status;						
		}					
	} 