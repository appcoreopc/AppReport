
import { ActionReducer, Action } from '@ngrx/store';

import {GRN_SAVE, GRN_CANCEL, GRN_SAVE_SUCCESS,
	 GRN_MESSAGE_END, GRN_SAVE_ERR, GRN_CANCEL_OK, GRN_GET, GRN_GET_ERR,
		GRN_GET_OK, GRN_WAIT_PENDING,
  SUPPLIER_GET, SUPPLIER_GET_OK,  
  RAW_MATERIAL_GET, RAW_MATERIAL_GET_OK,  
		UOM_GET, UOM_GET_OK, 
		COMPONENT_GET, COMPONENT_GET_OK, 
		CURRENCY_GET, CURRENCY_GET_OK, 
		STNCUSTOM_GET, STNCUSTOM_GET_OK,  	
		CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function GrnReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case GRN_GET_OK: 
		  return  { status : 1, data : action, type: GRN_GET_OK };
		case GRN_SAVE:	
		  console.log('GRN save');	  
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
		case UOM_GET_OK:
		  console.log('uom get');
		  return  { status : 6, data : action, type: UOM_GET_OK };
		case COMPONENT_GET_OK: 
		  return  { status : 7, data : action, type: COMPONENT_GET_OK };
		case CURRENCY_GET_OK: 
		  return  { status : 8, data : action, type: CURRENCY_GET_OK };
		case STNCUSTOM_GET_OK: 
		  return  { status : 9, data : action, type: STNCUSTOM_GET_OK };
		case SUPPLIER_GET_OK: 
		  return  { status : 10, data : action, type: SUPPLIER_GET_OK };
		case RAW_MATERIAL_GET_OK: 
			return  { status : 11, data : action, type: RAW_MATERIAL_GET_OK }; 
		case GRN_WAIT_PENDING:	
		  console.log('GRN pending');	  
		  return  { status : 12, data : action, type: GRN_WAIT_PENDING };			
		default:
			return status;						
		}					
	} 