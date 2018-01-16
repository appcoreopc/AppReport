import { ActionReducer, Action } from '@ngrx/store';

import {SKIMKHAS_SAVE, SKIMKHAS_CANCEL, SKIMKHAS_SAVE_SUCCESS,
	 SKIMKHAS_MESSAGE_END, SKIMKHAS_SAVE_ERR, SKIMKHAS_CANCEL_OK, SKIMKHAS_GET, SKIMKHAS_GET_ERR,
	  SKIMKHAS_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';


		
		export function EmployeeReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case SKIMKHAS_GET_OK: 
		  return  { status : 1, data : action, type: SKIMKHAS_GET_OK };
		case SKIMKHAS_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: SKIMKHAS_MESSAGE_END };	
		case SKIMKHAS_CANCEL:
			console.log(SKIMKHAS_CANCEL);
			return  { status : 3, type: SKIMKHAS_MESSAGE_END };	
		case SKIMKHAS_SAVE_SUCCESS:
			console.log(SKIMKHAS_SAVE_SUCCESS);
			return { status : 4, type: SKIMKHAS_SAVE_SUCCESS }
		case SKIMKHAS_SAVE_ERR:
			console.log(SKIMKHAS_SAVE_ERR);
			return  { status : 5, type: SKIMKHAS_MESSAGE_END };			
		default:
			return status;						
		}					
	} 