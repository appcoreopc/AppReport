
import { ActionReducer, Action } from '@ngrx/store';

import {EMPLOYEE_SAVE, EMPLOYEE_CANCEL, EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_WAIT_PENDING,
	 EMPLOYEE_MESSAGE_END, EMPLOYEE_SAVE_ERR, EMPLOYEE_CANCEL_OK, EMPLOYEE_GET, EMPLOYEE_GET_ERR,
	  EMPLOYEE_GET_OK, JOBTITLE_GET_OK, CityAppState, CityData } from '../../sharedObjects/sharedMessages';

		export function EmployeeReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case EMPLOYEE_GET_OK: 
		  return  { status : 1, data : action, type: EMPLOYEE_GET_OK };
		case EMPLOYEE_SAVE:	
		  console.log('employee save');	  
		  return  { status : 2, data : action, type: EMPLOYEE_MESSAGE_END };	
		case EMPLOYEE_CANCEL:
			console.log(EMPLOYEE_CANCEL);
			return  { status : 3, data : action, type: EMPLOYEE_MESSAGE_END };	
		case EMPLOYEE_SAVE_SUCCESS:
			console.log(EMPLOYEE_SAVE_SUCCESS);
			return { status : 4, data : action, type: EMPLOYEE_SAVE_SUCCESS }
		case EMPLOYEE_SAVE_ERR:
			console.log(EMPLOYEE_SAVE_ERR);
			return  { status : 5, data : action, type: EMPLOYEE_MESSAGE_END };
		case JOBTITLE_GET_OK: 
			return  { status : 6, data : action, type: JOBTITLE_GET_OK };
		case EMPLOYEE_WAIT_PENDING:	
		  console.log('employee pending');	  
		  return  { status : 2, data : action, type: EMPLOYEE_WAIT_PENDING };	
		default:
			return status;						
		}					
	} 