
import { ActionReducer, Action } from '@ngrx/store';

import {GRN_SAVE, GRN_CANCEL, GRN_SAVE_SUCCESS,
	 GRN_MESSAGE_END, GRN_SAVE_ERR, GRN_CANCEL_OK, GRN_GET, GRN_GET_ERR,
	  GRN_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function GrnReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case GRN_GET_OK: 
		  return  { status : 1, data : action, type: GRN_GET_OK };
		case GRN_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: GRN_MESSAGE_END };	
		case GRN_CANCEL:
			console.log(GRN_CANCEL);
			return  { status : 3, type: GRN_MESSAGE_END };	
		case GRN_SAVE_SUCCESS:
			console.log(GRN_SAVE_SUCCESS);
			return { status : 4, type: GRN_SAVE_SUCCESS }
		case GRN_SAVE_ERR:
			console.log(GRN_SAVE_ERR);
			return  { status : 5, type: GRN_MESSAGE_END };			
		default:
			return status;						
		}					
	} 