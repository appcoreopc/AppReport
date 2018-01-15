import { ActionReducer, Action } from '@ngrx/store';

import {MATERIAL_CATEGORY_SAVE, MATERIAL_CATEGORY_CANCEL, MATERIAL_CATEGORY_SAVE_SUCCESS,
	 MATERIAL_CATEGORY_MESSAGE_END, MATERIAL_CATEGORY_SAVE_ERR, MATERIAL_CATEGORY_CANCEL_OK, MATERIAL_CATEGORY_GET, MATERIAL_CATEGORY_GET_ERR,
	  MATERIAL_CATEGORY_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function MaterialCategoryReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case MATERIAL_CATEGORY_GET_OK: 
		  return  { status : 1, data : action, type: MATERIAL_CATEGORY_GET_OK };
		case MATERIAL_CATEGORY_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: MATERIAL_CATEGORY_MESSAGE_END };	
		case MATERIAL_CATEGORY_CANCEL:
			console.log(MATERIAL_CATEGORY_CANCEL);
			return  { status : 3, type: MATERIAL_CATEGORY_MESSAGE_END };	
		case MATERIAL_CATEGORY_SAVE_SUCCESS:
			console.log(MATERIAL_CATEGORY_SAVE_SUCCESS);
			return { status : 4, type: MATERIAL_CATEGORY_SAVE_SUCCESS }
		case MATERIAL_CATEGORY_SAVE_ERR:
			console.log(MATERIAL_CATEGORY_SAVE_ERR);
			return  { status : 5, type: MATERIAL_CATEGORY_MESSAGE_END };			
		default:
			return status;						
		}					
	} 