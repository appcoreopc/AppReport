import { ActionReducer, Action } from '@ngrx/store';
import { PROGRESS_WAIT_SHOW, PROGRESS_WAIT_HIDE, CityAppState, CityData } from '../sharedObjects/sharedMessages';

export function AppProgressSpinnerReducer(status: CityAppState, action: Action) {
	switch (action.type) {
		case PROGRESS_WAIT_HIDE:
			return { status: 6, data: action, type: PROGRESS_WAIT_HIDE };
		case PROGRESS_WAIT_SHOW:
			return { status: 7, data: action, type: PROGRESS_WAIT_SHOW };
		default:
			return status;
	}
}

