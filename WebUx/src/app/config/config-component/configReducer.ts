
import { ActionReducer, Action } from '@ngrx/store';

import {CONFIG_SAVE, CONFIG_CANCEL, CONFIG_SAVE_SUCCESS, CONFIG_WAIT_PENDING,
	 CONFIG_MESSAGE_END, CONFIG_SAVE_ERR, CONFIG_CANCEL_OK, CONFIG_GET, CONFIG_GET_ERR,
	  CONFIG_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function ConfigReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case CONFIG_GET_OK: 
		  return  { status : 1, data : action, type: CONFIG_GET_OK };
		case CONFIG_SAVE:	
		  console.log('CONFIG save');	  
		  return  { status : 2, data : action, type: CONFIG_MESSAGE_END };	
		case CONFIG_CANCEL:
			console.log(CONFIG_CANCEL);
			return  { status : 3, data : action, type: CONFIG_MESSAGE_END };	
		case CONFIG_SAVE_SUCCESS:
			console.log(CONFIG_SAVE_SUCCESS);
			return { status : 4, data : action, type: CONFIG_SAVE_SUCCESS }
		case CONFIG_SAVE_ERR:
			console.log(CONFIG_SAVE_ERR);
			return  { status : 5, data : action, type: CONFIG_MESSAGE_END }; 
		case CONFIG_WAIT_PENDING:	
		  console.log('CONFIG pending');	  
		  return  { status : 6, data : action, type: CONFIG_WAIT_PENDING };	
		default:
			return status;						
		}					
	} 