import { ActionReducer, Action } from '@ngrx/store';

import {REPORT_SAVE, REPORT_CANCEL, REPORT_SAVE_SUCCESS,
	 REPORT_MESSAGE_END, REPORT_SAVE_ERR, REPORT_CANCEL_OK, REPORT_GET, REPORT_GET_ERR,
	  REPORT_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function ReportReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case REPORT_GET_OK: 
		  return  { status : 1, data : action, type: REPORT_GET_OK };
		case REPORT_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: REPORT_MESSAGE_END };	
		case REPORT_CANCEL:
			console.log(REPORT_CANCEL);
			return  { status : 3, type: REPORT_MESSAGE_END };	
		case REPORT_SAVE_SUCCESS:
			console.log(REPORT_SAVE_SUCCESS);
			return { status : 4, type: REPORT_SAVE_SUCCESS }
		case REPORT_SAVE_ERR:
			console.log(REPORT_SAVE_ERR);
			return  { status : 5, type: REPORT_MESSAGE_END };			
		default:
			return status;						
		}					
	} 