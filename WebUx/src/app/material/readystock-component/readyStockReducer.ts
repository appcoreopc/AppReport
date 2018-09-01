import { ActionReducer, Action } from '@ngrx/store';

import {READYSTOCK_SAVE, READYSTOCK_CANCEL, READYSTOCK_SAVE_SUCCESS, 
	 READYSTOCK_MESSAGE_END, READYSTOCK_SAVE_ERR, READYSTOCK_CANCEL_OK, READYSTOCK_GET, READYSTOCK_GET_ERR,
		READYSTOCK_GET_OK, READYSTOCK_WAIT_PENDING, CityAppState, CityData, UOM_GET_OK, 
		READYSTOCK_DELETE_SUCCESS } from '../../sharedObjects/sharedMessages';

		export function ReadyStockReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case READYSTOCK_GET_OK: 
		  return  { status : 1, data : action, type: READYSTOCK_GET_OK };
		case READYSTOCK_SAVE:			 
		  return  { status : 2, data : action, type: READYSTOCK_SAVE };	
		case READYSTOCK_CANCEL:
			return  { status : 3, type: READYSTOCK_MESSAGE_END };	
		case READYSTOCK_SAVE_SUCCESS:
			return { status : 4, type: READYSTOCK_SAVE_SUCCESS }
		case READYSTOCK_SAVE_ERR:
			return  { status : 5, type: READYSTOCK_MESSAGE_END };		
		case READYSTOCK_WAIT_PENDING:	
			return  { status : 6, data : action, type: READYSTOCK_WAIT_PENDING };	 
		case READYSTOCK_DELETE_SUCCESS:	
			return  { status : 7, data : action, type: READYSTOCK_DELETE_SUCCESS };	 
			case UOM_GET_OK: 
				return  { status : 8, data : action, type: UOM_GET_OK };	
		default:
			return status;						
		}					
	} 