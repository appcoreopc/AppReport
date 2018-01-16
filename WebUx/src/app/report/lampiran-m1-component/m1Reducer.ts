
import { ActionReducer, Action } from '@ngrx/store';

import {M1LAMPIRAN_SAVE, M1LAMPIRAN_CANCEL, M1LAMPIRAN_SAVE_SUCCESS,
	 M1LAMPIRAN_MESSAGE_END, M1LAMPIRAN_SAVE_ERR, M1LAMPIRAN_CANCEL_OK, M1LAMPIRAN_GET, M1LAMPIRAN_GET_ERR,
	  M1LAMPIRAN_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function M1LampiranReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case M1LAMPIRAN_GET_OK: 
		  return  { status : 1, data : action, type: M1LAMPIRAN_GET_OK };
		case M1LAMPIRAN_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: M1LAMPIRAN_MESSAGE_END };	
		case M1LAMPIRAN_CANCEL:
			console.log(M1LAMPIRAN_CANCEL);
			return  { status : 3, type: M1LAMPIRAN_MESSAGE_END };	
		case M1LAMPIRAN_SAVE_SUCCESS:
			console.log(M1LAMPIRAN_SAVE_SUCCESS);
			return { status : 4, type: M1LAMPIRAN_SAVE_SUCCESS }
		case M1LAMPIRAN_SAVE_ERR:
			console.log(M1LAMPIRAN_SAVE_ERR);
			return  { status : 5, type: M1LAMPIRAN_MESSAGE_END };			
		default:
			return status;						
		}					
	} 