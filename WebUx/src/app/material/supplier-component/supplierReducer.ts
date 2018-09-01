
import { ActionReducer, Action } from '@ngrx/store';

import {SUPPLIER_SAVE, SUPPLIER_CANCEL, SUPPLIER_SAVE_SUCCESS, SUPPLIER_WAIT_PENDING, 
	SUPPLIER_DELETE_SUCCESS, CURRENCY_GET, CURRENCY_GET_OK, FACTORYSTATUS_GET, FACTORYSTATUS_GET_OK,
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
		case SUPPLIER_WAIT_PENDING:	 	  
			return  { status : 6, data : action, type: SUPPLIER_WAIT_PENDING };				
		case SUPPLIER_DELETE_SUCCESS:		
			return  { status : 7, data : action, type: SUPPLIER_DELETE_SUCCESS }; 
		case CURRENCY_GET_OK: 
			return  { status : 8, data : action, type: CURRENCY_GET_OK };	 
		case FACTORYSTATUS_GET_OK: 
		  return  { status : 9, data : action, type: FACTORYSTATUS_GET_OK };	
		
		default:
			return status;						
		}					
	} 