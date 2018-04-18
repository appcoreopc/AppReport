import { ActionReducer, Action } from '@ngrx/store';

import {MATERIAL_CATEGORY_SAVE, MATERIAL_CATEGORY_CANCEL, 
	MATERIAL_CATEGORY_SAVE_SUCCESS, MATERIAL_CATEGORY_DELETE_SUCCESS,
	MATERIAL_CATEGORY_MESSAGE_END, MATERIAL_CATEGORY_SAVE_ERR, MATERIAL_CATEGORY_CANCEL_OK, MATERIAL_CATEGORY_GET, MATERIAL_CATEGORY_GET_ERR,
	  MATERIAL_CATEGORY_GET_OK, MATERIAL_CATEGORY_WAIT_PENDING, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function MaterialCategoryReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case MATERIAL_CATEGORY_GET_OK: 
		  return  { status : 1, data : action, type: MATERIAL_CATEGORY_GET_OK };
		case MATERIAL_CATEGORY_SAVE:			 
		  return  { status : 2, data : action, type: MATERIAL_CATEGORY_SAVE };	
		case MATERIAL_CATEGORY_CANCEL:
			console.log(MATERIAL_CATEGORY_CANCEL);
			return  { status : 3, type: MATERIAL_CATEGORY_MESSAGE_END };	
		case MATERIAL_CATEGORY_SAVE_SUCCESS:
			console.log(MATERIAL_CATEGORY_SAVE_SUCCESS);
			return { status : 4, type: MATERIAL_CATEGORY_SAVE_SUCCESS }
		case MATERIAL_CATEGORY_SAVE_ERR:
			console.log(MATERIAL_CATEGORY_SAVE_ERR);
			return  { status : 5, type: MATERIAL_CATEGORY_MESSAGE_END };		
		case MATERIAL_CATEGORY_WAIT_PENDING:	
		  console.log('MATERIAL_CATEGORY pending');	  
			return  { status : 6, data : action, type: MATERIAL_CATEGORY_WAIT_PENDING };	 
		case MATERIAL_CATEGORY_DELETE_SUCCESS:	
		  console.log('MATERIAL_CATEGORY pending');	  
			return  { status : 7, data : action, type: MATERIAL_CATEGORY_DELETE_SUCCESS };	 

		default:
			return status;						
		}					
	} 