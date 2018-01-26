import { ActionReducer, Action } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';

export const EMPLOYEE_SAVE = 'EMPLOYEE_SAVE';
export const EMPLOYEE_CANCEL = 'EMPLOYEE_CANCEL';
export const EMPLOYEE_SAVE_SUCCESS = 'EMPLOYEE_SAVE_SUCCESS';
export const EMPLOYEE_MESSAGE_END = 'EMPLOYEE_MESSAGE_END';
export const EMPLOYEE_SAVE_ERR = 'EMPLOYEE_SAVE_ERR';
export const EMPLOYEE_CANCEL_OK = 'EMPLOYEE_CANCEL_OK';
export const EMPLOYEE_GET = 'EMPLOYEE_GET';
export const EMPLOYEE_GET_ERR = 'EMPLOYEE_GET_ERR';
export const EMPLOYEE_GET_OK = 'EMPLOYEE_GET_OK';

export const USER_SAVE = 'USER_SAVE';
export const USER_CANCEL = 'USER_CANCEL';
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS';
export const USER_MESSAGE_END = 'USER_MESSAGE_END';
export const USER_SAVE_ERR = 'USER_SAVE_ERR';
export const USER_CANCEL_OK = 'USER_CANCEL_OK';
export const USER_GET = 'USER_GET';
export const USER_GET_ERR = 'USER_GET_ERR';
export const USER_GET_OK = 'USER_GET_OK';

export const RAW_MATERIAL_SAVE = 'RAW_MATERIAL_SAVE';
export const RAW_MATERIAL_CANCEL = 'RAW_MATERIAL_CANCEL';
export const RAW_MATERIAL_SAVE_SUCCESS = 'RAW_MATERIAL_SAVE_SUCCESS';
export const RAW_MATERIAL_MESSAGE_END = 'RAW_MATERIAL_MESSAGE_END';
export const RAW_MATERIAL_SAVE_ERR = 'RAW_MATERIAL_SAVE_ERR';
export const RAW_MATERIAL_CANCEL_OK = 'RAW_MATERIAL_CANCEL_OK';
export const RAW_MATERIAL_GET = 'RAW_MATERIAL_GET';
export const RAW_MATERIAL_GET_ERR = 'RAW_MATERIAL_GET_ERR';
export const RAW_MATERIAL_GET_OK = 'RAW_MATERIAL_GET_OK';

export const SUPPLIER_SAVE = 'SUPPLIER_SAVE';
export const SUPPLIER_CANCEL = 'SUPPLIER_CANCEL';
export const SUPPLIER_SAVE_SUCCESS = 'SUPPLIER_SAVE_SUCCESS';
export const SUPPLIER_MESSAGE_END = 'SUPPLIER_MESSAGE_END';
export const SUPPLIER_SAVE_ERR = 'SUPPLIER_SAVE_ERR';
export const SUPPLIER_CANCEL_OK = 'SUPPLIER_CANCEL_OK';
export const SUPPLIER_GET = 'SUPPLIER_GET';
export const SUPPLIER_GET_ERR = 'SUPPLIER_GET_ERR';
export const SUPPLIER_GET_OK = 'SUPPLIER_GET_OK';

export const MATERIAL_CATEGORY_SAVE = 'MATERIAL_CATEGORY_SAVE';
export const MATERIAL_CATEGORY_CANCEL = 'MATERIAL_CATEGORY_CANCEL';
export const MATERIAL_CATEGORY_SAVE_SUCCESS = 'MATERIAL_CATEGORY_SAVE_SUCCESS';
export const MATERIAL_CATEGORY_MESSAGE_END = 'MATERIAL_CATEGORY_MESSAGE_END';
export const MATERIAL_CATEGORY_SAVE_ERR = 'MATERIAL_CATEGORY_SAVE_ERR';
export const MATERIAL_CATEGORY_CANCEL_OK = 'MATERIAL_CATEGORY_CANCEL_OK';
export const MATERIAL_CATEGORY_GET = 'MATERIAL_CATEGORY_GET';
export const MATERIAL_CATEGORY_GET_ERR = 'MATERIAL_CATEGORY_GET_ERR';
export const MATERIAL_CATEGORY_GET_OK = 'MATERIAL_CATEGORY_GET_OK';

export const STN_CUSTOM_SAVE = 'STN_CUSTOM_SAVE';
export const STN_CUSTOM_CANCEL = 'STN_CUSTOM_CANCEL';
export const STN_CUSTOM_SAVE_SUCCESS = 'STN_CUSTOM_SAVE_SUCCESS';
export const STN_CUSTOM_MESSAGE_END = 'STN_CUSTOM_MESSAGE_END';
export const STN_CUSTOM_SAVE_ERR = 'STN_CUSTOM_SAVE_ERR';
export const STN_CUSTOM_CANCEL_OK = 'STN_CUSTOM_CANCEL_OK';
export const STN_CUSTOM_GET = 'STN_CUSTOM_GET';
export const STN_CUSTOM_GET_ERR = 'STN_CUSTOM_GET_ERR';
export const STN_CUSTOM_GET_OK = 'STN_CUSTOM_GET_OK';

export const REPORT_SAVE = 'REPORT_SAVE';
export const REPORT_CANCEL = 'REPORT_CANCEL';
export const REPORT_SAVE_SUCCESS = 'REPORT_SAVE_SUCCESS';
export const REPORT_MESSAGE_END = 'REPORT_MESSAGE_END';
export const REPORT_SAVE_ERR = 'REPORT_SAVE_ERR';
export const REPORT_CANCEL_OK = 'REPORT_CANCEL_OK';
export const REPORT_GET = 'REPORT_GET';
export const REPORT_GET_ERR = 'REPORT_GET_ERR';
export const REPORT_GET_OK = 'REPORT_GET_OK';

export const NAVIGATION_SAVE = 'NAVIGATION_SAVE';
export const NAVIGATION_CANCEL = 'NAVIGATION_CANCEL';
export const NAVIGATION_SAVE_SUCCESS = 'NAVIGATION_SAVE_SUCCESS';
export const NAVIGATION_MESSAGE_END = 'NAVIGATION_MESSAGE_END';
export const NAVIGATION_SAVE_ERR = 'NAVIGATION_SAVE_ERR';
export const NAVIGATION_CANCEL_OK = 'NAVIGATION_CANCEL_OK';
export const NAVIGATION_GET = 'NAVIGATION_GET';
export const NAVIGATION_GET_ERR = 'NAVIGATION_GET_ERR';
export const NAVIGATION_GET_OK = 'NAVIGATION_GET_OK';

export const GRN_SAVE = 'GRN_SAVE';
export const GRN_CANCEL = 'GRN_CANCEL';
export const GRN_SAVE_SUCCESS = 'GRN_SAVE_SUCCESS';
export const GRN_MESSAGE_END = 'GRN_MESSAGE_END';
export const GRN_SAVE_ERR = 'GRN_SAVE_ERR';
export const GRN_CANCEL_OK = 'GRN_CANCEL_OK';
export const GRN_GET = 'GRN_GET';
export const GRN_GET_ERR = 'GRN_GET_ERR';
export const GRN_GET_OK = 'GRN_GET_OK';

export const M1LAMPIRAN_SAVE = 'M1LAMPIRAN_SAVE';
export const M1LAMPIRAN_CANCEL = 'M1LAMPIRAN_CANCEL';
export const M1LAMPIRAN_SAVE_SUCCESS = 'M1LAMPIRAN_SAVE_SUCCESS';
export const M1LAMPIRAN_MESSAGE_END = 'M1LAMPIRAN_MESSAGE_END';
export const M1LAMPIRAN_SAVE_ERR = 'M1LAMPIRAN_SAVE_ERR';
export const M1LAMPIRAN_CANCEL_OK = 'M1LAMPIRAN_CANCEL_OK';
export const M1LAMPIRAN_GET = 'M1LAMPIRAN_GET';
export const M1LAMPIRAN_GET_ERR = 'M1LAMPIRAN_GET_ERR';
export const M1LAMPIRAN_GET_OK = 'M1LAMPIRAN_GET_OK';

export const LESEN_SAVE = 'LESEN_SAVE';
export const LESEN_CANCEL = 'LESEN_CANCEL';
export const LESEN_SAVE_SUCCESS = 'LESEN_SAVE_SUCCESS';
export const LESEN_MESSAGE_END = 'LESEN_MESSAGE_END';
export const LESEN_SAVE_ERR = 'LESEN_SAVE_ERR';
export const LESEN_CANCEL_OK = 'LESEN_CANCEL_OK';
export const LESEN_GET = 'LESEN_GET';
export const LESEN_GET_ERR = 'LESEN_GET_ERR';
export const LESEN_GET_OK = 'LESEN_GET_OK';

export const SKIMKHAS_SAVE = 'SKIMKHAS_SAVE';
export const SKIMKHAS_CANCEL = 'SKIMKHAS_CANCEL';
export const SKIMKHAS_SAVE_SUCCESS = 'SKIMKHAS_SAVE_SUCCESS';
export const SKIMKHAS_MESSAGE_END = 'SKIMKHAS_MESSAGE_END';
export const SKIMKHAS_SAVE_ERR = 'SKIMKHAS_SAVE_ERR';
export const SKIMKHAS_CANCEL_OK = 'SKIMKHAS_CANCEL_OK';
export const SKIMKHAS_GET = 'SKIMKHAS_GET';
export const SKIMKHAS_GET_ERR = 'SKIMKHAS_GET_ERR';
export const SKIMKHAS_GET_OK = 'SKIMKHAS_GET_OK';

export const UOM_SAVE = 'UOM_SAVE';
export const UOM_CANCEL = 'UOM_CANCEL';
export const UOM_SAVE_SUCCESS = 'UOM_SAVE_SUCCESS';
export const UOM_MESSAGE_END = 'UOM_MESSAGE_END';
export const UOM_SAVE_ERR = 'UOM_SAVE_ERR';
export const UOM_CANCEL_OK = 'UOM_CANCEL_OK';
export const UOM_GET = 'UOM_GET';
export const UOM_GET_ERR = 'UOM_GET_ERR';
export const UOM_GET_OK = 'UOM_GET_OK';
 
export const COMPONENT_GET = 'COMPONENT_GET'; 
export const COMPONENT_GET_OK = 'COMPONENT_GET_OK';
export const CURRENCY_GET = 'CURRENCY_GET'; 
export const CURRENCY_GET_OK = 'CURRENCY_GET_OK';
export const STNCUSTOM_GET = 'STNCUSTOM_GET'; 
export const STNCUSTOM_GET_OK = 'STNCUSTOM_GET_OK';

export const LOGIN_DO = 'LOGIN_DO';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERR = 'LOGIN_ERR';
 
export const VIEW = 0;
export const UPDATE = 1; 
export const ADD = 2; 
export const DELETE = 4;

export interface CityAppState {
	status: number;	
	type : string; 
	data  : CityData; 	
}

export interface CityData {
	status: number;
	name : string, 
	description : string;
	type : string; 
}  

export interface LocationAppState {
	status: number;	
	type : string; 
	payload  : CountryData; 

}

export interface CountryData {
	status: number;
	name : string, 
	description : string;
	city : string;
	country : string;
	lon : string; 
	lat : string;
	imageUrl : string;
	type : string; 	
} 
	
export interface KeyValueData {
	key: string;
	description : string
} 


export const headersJson = new HttpHeaders().set('Content-Type', 'application/json');