import { ActionReducer, Action } from '@ngrx/store';

import {READYSTOCK_SAVE, READYSTOCK_CANCEL, READYSTOCK_SAVE_SUCCESS,
	 READYSTOCK_MESSAGE_END, READYSTOCK_SAVE_ERR, READYSTOCK_CANCEL_OK, READYSTOCK_GET, READYSTOCK_GET_ERR,
	  READYSTOCK_GET_OK, READYSTOCK_WAIT_PENDING, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function ReadyStockReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case READYSTOCK_GET_OK: 
		  return  { status : 1, data : action, type: READYSTOCK_GET_OK };
		case READYSTOCK_SAVE:			 
		  return  { status : 2, data : action, type: READYSTOCK_SAVE };	
		case READYSTOCK_CANCEL:
			console.log(READYSTOCK_CANCEL);
			return  { status : 3, type: READYSTOCK_MESSAGE_END };	
		case READYSTOCK_SAVE_SUCCESS:
			console.log(READYSTOCK_SAVE_SUCCESS);
			return { status : 4, type: READYSTOCK_SAVE_SUCCESS }
		case READYSTOCK_SAVE_ERR:
			console.log(READYSTOCK_SAVE_ERR);
			return  { status : 5, type: READYSTOCK_MESSAGE_END };		
		case READYSTOCK_WAIT_PENDING:	
		  console.log('READYSTOCK pending');	  
			return  { status : 6, data : action, type: READYSTOCK_WAIT_PENDING };	 
		default:
			return status;						
		}					
	} 