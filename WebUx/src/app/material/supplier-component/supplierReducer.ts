
import { ActionReducer, Action } from '@ngrx/store';

import {SUPPLIER_SAVE, SUPPLIER_CANCEL, SUPPLIER_SAVE_SUCCESS,
	 SUPPLIER_MESSAGE_END, SUPPLIER_SAVE_ERR, SUPPLIER_CANCEL_OK, SUPPLIER_GET, SUPPLIER_GET_ERR,
	  SUPPLIER_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';
		
		export function SupplierReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case SUPPLIER_GET_OK: 
		  return  { status : 1, data : action, type: SUPPLIER_GET_OK };
		case SUPPLIER_SAVE:			  
		  return  { status : 2, data : action, type: SUPPLIER_MESSAGE_END };	
		case SUPPLIER_CANCEL:		
			return  { status : 3, data : action, type: SUPPLIER_MESSAGE_END };	
		case SUPPLIER_SAVE_SUCCESS:		
			return { status : 4, data : action, type: SUPPLIER_SAVE_SUCCESS }
		case SUPPLIER_SAVE_ERR:		
			return  { status : 5, data : action, type: SUPPLIER_MESSAGE_END };			
		default:
			return status;						
		}					
	} 