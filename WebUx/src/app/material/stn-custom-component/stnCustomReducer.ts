
import { ActionReducer, Action } from '@ngrx/store';

import {STN_CUSTOM_SAVE, STN_CUSTOM_CANCEL, STN_CUSTOM_SAVE_SUCCESS,
	 STN_CUSTOM_MESSAGE_END, STN_CUSTOM_SAVE_ERR, STN_CUSTOM_CANCEL_OK, STN_CUSTOM_GET, STN_CUSTOM_GET_ERR,
	  STN_CUSTOM_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function StnCustomReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case STN_CUSTOM_GET_OK: 
		  return  { status : 1, data : action, type: STN_CUSTOM_GET_OK };
		case STN_CUSTOM_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: STN_CUSTOM_MESSAGE_END };	
		case STN_CUSTOM_CANCEL:
			console.log(STN_CUSTOM_CANCEL);
			return  { status : 3, type: STN_CUSTOM_MESSAGE_END };	
		case STN_CUSTOM_SAVE_SUCCESS:
			console.log(STN_CUSTOM_SAVE_SUCCESS);
			return { status : 4, type: STN_CUSTOM_SAVE_SUCCESS }
		case STN_CUSTOM_SAVE_ERR:
			console.log(STN_CUSTOM_SAVE_ERR);
			return  { status : 5, type: STN_CUSTOM_MESSAGE_END };			
		default:
			return status;						
		}					
	} 