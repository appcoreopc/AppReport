
import { ActionReducer, Action } from '@ngrx/store';

import {RAW_MATERIAL_SAVE, RAW_MATERIAL_CANCEL, RAW_MATERIAL_SAVE_SUCCESS, RAW_MATERIAL_WAIT_PENDING,
	 RAW_MATERIAL_MESSAGE_END, RAW_MATERIAL_SAVE_ERR, RAW_MATERIAL_CANCEL_OK, RAW_MATERIAL_GET, RAW_MATERIAL_GET_ERR,
	  RAW_MATERIAL_GET_OK, MATERIAL_CATEGORY_GET_OK, UOM_GET_OK, COUNTRY_GET, COUNTRY_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function RawMaterialReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case RAW_MATERIAL_GET_OK: 
		  return  { status : 1, data : action, type: RAW_MATERIAL_GET_OK };
		case RAW_MATERIAL_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: RAW_MATERIAL_MESSAGE_END };	
		case RAW_MATERIAL_CANCEL:
			console.log(RAW_MATERIAL_CANCEL);
			return  { status : 3, type: RAW_MATERIAL_MESSAGE_END };	
		case RAW_MATERIAL_SAVE_SUCCESS:
			console.log(RAW_MATERIAL_SAVE_SUCCESS);
			return { status : 4, type: RAW_MATERIAL_SAVE_SUCCESS }
		case RAW_MATERIAL_SAVE_ERR:
			console.log(RAW_MATERIAL_SAVE_ERR);
			return  { status : 5, type: RAW_MATERIAL_MESSAGE_END };		
		case MATERIAL_CATEGORY_GET_OK: 
		  return  { status : 6, data : action, type: MATERIAL_CATEGORY_GET_OK };	
		case UOM_GET_OK: 
		  return  { status : 7, data : action, type: UOM_GET_OK };	
		case COUNTRY_GET_OK: 
			return  { status : 8, data : action, type: COUNTRY_GET_OK };	 
		case RAW_MATERIAL_WAIT_PENDING:	
		  console.log('RAW_MATERIAL pending');	  
		  return  { status : 9, data : action, type: RAW_MATERIAL_WAIT_PENDING };	
		default:
			return status;						
		}					
	} 