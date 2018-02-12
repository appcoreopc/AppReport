
import { ActionReducer, Action } from '@ngrx/store';
import {EMPLOYEE_WAIT_OK, EMPLOYEE_WAIT_PENDING, CityAppState, CityData } from '../sharedObjects/sharedMessages';

export function AppProgressSpinnerReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case EMPLOYEE_WAIT_OK: 
		console.log(EMPLOYEE_WAIT_OK);
			return  { status : 6, data : action, type: EMPLOYEE_WAIT_OK };
		case EMPLOYEE_WAIT_PENDING:	
		  console.log(EMPLOYEE_WAIT_PENDING);
		  return  { status : 7, data : action, type: EMPLOYEE_WAIT_PENDING };	
		default:
			return status;						
		}					
	} 

