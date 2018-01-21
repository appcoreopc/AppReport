
import { ActionReducer, Action } from '@ngrx/store';

import {UOM_SAVE, UOM_CANCEL, UOM_SAVE_SUCCESS,
	 UOM_MESSAGE_END, UOM_SAVE_ERR, UOM_CANCEL_OK, UOM_GET, UOM_GET_ERR,
	  UOM_GET_OK, CityAppState, CityData } from '../sharedObjects/sharedMessages';

		export function UOMReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case UOM_GET_OK: 	
		  return  { status : 1, data : action, type: UOM_GET_OK };
		case UOM_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: UOM_MESSAGE_END };	
		case UOM_CANCEL:
			console.log(UOM_CANCEL);
			return  { status : 3, type: UOM_MESSAGE_END };	
		case UOM_SAVE_SUCCESS:
			console.log(UOM_SAVE_SUCCESS);
			return { status : 4, type: UOM_SAVE_SUCCESS }
		case UOM_SAVE_ERR:
			console.log(UOM_SAVE_ERR);
			return  { status : 5, type: UOM_MESSAGE_END };			
		default:
			return status;						
		}					
	} 