
import { ActionReducer, Action } from '@ngrx/store';

import {NAVIGATION_SAVE, NAVIGATION_CANCEL, NAVIGATION_SAVE_SUCCESS,
	 NAVIGATION_MESSAGE_END, NAVIGATION_SAVE_ERR, NAVIGATION_CANCEL_OK, NAVIGATION_GET, NAVIGATION_GET_ERR,
	  NAVIGATION_GET_OK, CityAppState, CityData } from '../sharedObjects/sharedMessages';
	  
		export function ReportReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case NAVIGATION_GET_OK: 
		  return  { status : 1, data : action, type: NAVIGATION_GET_OK };
		case NAVIGATION_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: NAVIGATION_MESSAGE_END };	
		case NAVIGATION_CANCEL:
			console.log(NAVIGATION_CANCEL);
			return  { status : 3, type: NAVIGATION_MESSAGE_END };	
		case NAVIGATION_SAVE_SUCCESS:
			console.log(NAVIGATION_SAVE_SUCCESS);
			return { status : 4, type: NAVIGATION_SAVE_SUCCESS }
		case NAVIGATION_SAVE_ERR:
			console.log(NAVIGATION_SAVE_ERR);
			return  { status : 5, type: NAVIGATION_MESSAGE_END };			
		default:
			return status;						
		}					
	} 