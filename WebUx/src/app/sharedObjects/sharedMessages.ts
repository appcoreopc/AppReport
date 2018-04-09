import { ActionReducer, Action } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';


export const CONFIG_SAVE = 'CONFIG_SAVE';
export const CONFIG_CANCEL = 'CONFIG_CANCEL';
export const CONFIG_SAVE_SUCCESS = 'CONFIG_SAVE_SUCCESS';
export const CONFIG_MESSAGE_END = 'CONFIG_MESSAGE_END';
export const CONFIG_SAVE_ERR = 'CONFIG_SAVE_ERR';
export const CONFIG_CANCEL_OK = 'CONFIG_CANCEL_OK';
export const CONFIG_GET = 'CONFIG_GET';
export const CONFIG_GET_ERR = 'CONFIG_GET_ERR';
export const CONFIG_GET_OK = 'CONFIG_GET_OK';
export const CONFIG_WAIT_PENDING = 'CONFIG_WAIT_PENDING';
export const CONFIG_DELETE = 'CONFIG_DELETE';
export const CONFIG_DELETE_SUCCESS = 'CONFIG_DELETE_SUCCESS';
export const CONFIG_DELETE_ERR = 'CONFIG_DELETE_ERR';

export const EMPLOYEE_SAVE = 'EMPLOYEE_SAVE';
export const EMPLOYEE_CANCEL = 'EMPLOYEE_CANCEL';
export const EMPLOYEE_SAVE_SUCCESS = 'EMPLOYEE_SAVE_SUCCESS';
export const EMPLOYEE_MESSAGE_END = 'EMPLOYEE_MESSAGE_END';
export const EMPLOYEE_SAVE_ERR = 'EMPLOYEE_SAVE_ERR';
export const EMPLOYEE_CANCEL_OK = 'EMPLOYEE_CANCEL_OK';
export const EMPLOYEE_GET = 'EMPLOYEE_GET';
export const EMPLOYEE_GET_ERR = 'EMPLOYEE_GET_ERR';
export const EMPLOYEE_GET_OK = 'EMPLOYEE_GET_OK';
export const EMPLOYEE_WAIT_PENDING = 'EMPLOYEE_WAIT_PENDING';
export const EMPLOYEE_WAIT_OK = "EMPLOYEE_WAIT_OK";
export const EMPLOYEE_DELETE = 'EMPLOYEE_DELETE';
export const EMPLOYEE_DELETE_SUCCESS = 'EMPLOYEE_DELETE_SUCCESS';
export const EMPLOYEE_DELETE_ERR = 'EMPLOYEE_DELETE_ERR';

export const PROGRESS_WAIT_SHOW = 'PROGRESS_WAIT_SHOW';
export const PROGRESS_WAIT_HIDE = "PROGRESS_WAIT_HIDE";

export const USER_SAVE = 'USER_SAVE';
export const USER_CANCEL = 'USER_CANCEL';
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS';
export const USER_MESSAGE_END = 'USER_MESSAGE_END';
export const USER_SAVE_ERR = 'USER_SAVE_ERR';
export const USER_CANCEL_OK = 'USER_CANCEL_OK';
export const USER_GET = 'USER_GET';
export const USER_GET_ERR = 'USER_GET_ERR';
export const USER_GET_OK = 'USER_GET_OK';
export const USER_WAIT_PENDING = 'USER_WAIT_PENDING';
export const USER_DELETE = 'USER_DELETE';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_ERR = 'USER_DELETE_ERR';

export const RAW_MATERIAL_SAVE = 'RAW_MATERIAL_SAVE';
export const RAW_MATERIAL_CANCEL = 'RAW_MATERIAL_CANCEL';
export const RAW_MATERIAL_SAVE_SUCCESS = 'RAW_MATERIAL_SAVE_SUCCESS';
export const RAW_MATERIAL_MESSAGE_END = 'RAW_MATERIAL_MESSAGE_END';
export const RAW_MATERIAL_SAVE_ERR = 'RAW_MATERIAL_SAVE_ERR';
export const RAW_MATERIAL_CANCEL_OK = 'RAW_MATERIAL_CANCEL_OK';
export const RAW_MATERIAL_GET = 'RAW_MATERIAL_GET';
export const RAW_MATERIAL_GET_ERR = 'RAW_MATERIAL_GET_ERR';
export const RAW_MATERIAL_GET_OK = 'RAW_MATERIAL_GET_OK';
export const RAW_MATERIAL_WAIT_PENDING = 'RAW_MATERIAL_WAIT_PENDING';
export const RAW_MATERIAL_DELETE = 'RAW_MATERIAL_DELETE';
export const RAW_MATERIAL_DELETE_SUCCESS = 'RAW_MATERIAL_DELETE_SUCCESS';
export const RAW_MATERIAL_DELETE_ERR = 'RAW_MATERIAL_DELETE_ERR';

export const SUPPLIER_SAVE = 'SUPPLIER_SAVE';
export const SUPPLIER_CANCEL = 'SUPPLIER_CANCEL';
export const SUPPLIER_SAVE_SUCCESS = 'SUPPLIER_SAVE_SUCCESS';
export const SUPPLIER_MESSAGE_END = 'SUPPLIER_MESSAGE_END';
export const SUPPLIER_SAVE_ERR = 'SUPPLIER_SAVE_ERR';
export const SUPPLIER_CANCEL_OK = 'SUPPLIER_CANCEL_OK';
export const SUPPLIER_GET = 'SUPPLIER_GET';
export const SUPPLIER_GET_ERR = 'SUPPLIER_GET_ERR';
export const SUPPLIER_GET_OK = 'SUPPLIER_GET_OK';
export const SUPPLIER_WAIT_PENDING = 'SUPPLIER_WAIT_PENDING';
export const SUPPLIER_DELETE = 'SUPPLIER_DELETE';
export const SUPPLIER_DELETE_SUCCESS = 'SUPPLIER_DELETE_SUCCESS';
export const SUPPLIER_DELETE_ERR = 'SUPPLIER_DELETE_ERR';

export const MATERIAL_CATEGORY_SAVE = 'MATERIAL_CATEGORY_SAVE';
export const MATERIAL_CATEGORY_CANCEL = 'MATERIAL_CATEGORY_CANCEL';
export const MATERIAL_CATEGORY_SAVE_SUCCESS = 'MATERIAL_CATEGORY_SAVE_SUCCESS';
export const MATERIAL_CATEGORY_MESSAGE_END = 'MATERIAL_CATEGORY_MESSAGE_END';
export const MATERIAL_CATEGORY_SAVE_ERR = 'MATERIAL_CATEGORY_SAVE_ERR';
export const MATERIAL_CATEGORY_CANCEL_OK = 'MATERIAL_CATEGORY_CANCEL_OK';
export const MATERIAL_CATEGORY_GET = 'MATERIAL_CATEGORY_GET';
export const MATERIAL_CATEGORY_GET_ERR = 'MATERIAL_CATEGORY_GET_ERR';
export const MATERIAL_CATEGORY_GET_OK = 'MATERIAL_CATEGORY_GET_OK';
export const MATERIAL_CATEGORY_WAIT_PENDING = 'MATERIAL_CATEGORY_WAIT_PENDING';

export const MATERIAL_CATEGORY_DELETE = 'MATERIAL_CATEGORY_DELETE';
export const MATERIAL_CATEGORY_DELETE_SUCCESS = 'MATERIAL_CATEGORY_DELETE_SUCCESS';
export const MATERIAL_CATEGORY_DELETE_ERR = 'MATERIAL_CATEGORY_DELETE_ERR';
 
export const READYSTOCK_SAVE = ' READYSTOCK_SAVE';
export const READYSTOCK_CANCEL = ' READYSTOCK_CANCEL';
export const READYSTOCK_SAVE_SUCCESS = ' READYSTOCK_SAVE_SUCCESS';
export const READYSTOCK_MESSAGE_END = ' READYSTOCK_MESSAGE_END';
export const READYSTOCK_SAVE_ERR = ' READYSTOCK_SAVE_ERR';
export const READYSTOCK_CANCEL_OK = ' READYSTOCK_CANCEL_OK';
export const READYSTOCK_GET = ' READYSTOCK_GET';
export const READYSTOCK_GET_ERR = ' READYSTOCK_GET_ERR';
export const READYSTOCK_GET_OK = ' READYSTOCK_GET_OK';
export const READYSTOCK_WAIT_PENDING = ' READYSTOCK_WAIT_PENDING';
export const READYSTOCK_DELETE = ' READYSTOCK_DELETE';
export const READYSTOCK_DELETE_SUCCESS = ' READYSTOCK_DELETE_SUCCESS';
export const READYSTOCK_DELETE_ERR = ' READYSTOCK_DELETE_ERR';

export const STN_CUSTOM_SAVE = 'STN_CUSTOM_SAVE';
export const STN_CUSTOM_CANCEL = 'STN_CUSTOM_CANCEL';
export const STN_CUSTOM_SAVE_SUCCESS = 'STN_CUSTOM_SAVE_SUCCESS';
export const STN_CUSTOM_MESSAGE_END = 'STN_CUSTOM_MESSAGE_END';
export const STN_CUSTOM_SAVE_ERR = 'STN_CUSTOM_SAVE_ERR';
export const STN_CUSTOM_CANCEL_OK = 'STN_CUSTOM_CANCEL_OK';
export const STN_CUSTOM_GET = 'STN_CUSTOM_GET';
export const STN_CUSTOM_GET_ERR = 'STN_CUSTOM_GET_ERR';
export const STN_CUSTOM_GET_OK = 'STN_CUSTOM_GET_OK';
export const STN_CUSTOM_WAIT_PENDING = 'STN_CUSTOM_WAIT_PENDING';

export const STN_CUSTOM_DELETE = 'STN_CUSTOM_DELETE';
export const STN_CUSTOM_DELETE_SUCCESS = 'STN_CUSTOM_DELETE_SUCCESS';
export const STN_CUSTOM_DELETE_ERR = 'STN_CUSTOM_DELETE_ERR';

export const REPORT_SAVE = 'REPORT_SAVE';
export const REPORT_CANCEL = 'REPORT_CANCEL';
export const REPORT_SAVE_SUCCESS = 'REPORT_SAVE_SUCCESS';
export const REPORT_MESSAGE_END = 'REPORT_MESSAGE_END';
export const REPORT_SAVE_ERR = 'REPORT_SAVE_ERR';
export const REPORT_CANCEL_OK = 'REPORT_CANCEL_OK';
export const REPORT_GET = 'REPORT_GET';
export const REPORT_GET_ERR = 'REPORT_GET_ERR';
export const REPORT_GET_OK = 'REPORT_GET_OK';
export const REPORT_WAIT_PENDING = 'REPORT_WAIT_PENDING';

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
export const GRN_WAIT_PENDING = 'GRN_WAIT_PENDING';

export const M1LAMPIRAN_SAVE = 'M1LAMPIRAN_SAVE';
export const M1LAMPIRAN_CANCEL = 'M1LAMPIRAN_CANCEL';
export const M1LAMPIRAN_SAVE_SUCCESS = 'M1LAMPIRAN_SAVE_SUCCESS';
export const M1LAMPIRAN_MESSAGE_END = 'M1LAMPIRAN_MESSAGE_END';
export const M1LAMPIRAN_SAVE_ERR = 'M1LAMPIRAN_SAVE_ERR';
export const M1LAMPIRAN_CANCEL_OK = 'M1LAMPIRAN_CANCEL_OK';
export const M1LAMPIRAN_GET = 'M1LAMPIRAN_GET';
export const M1LAMPIRAN_GET_ERR = 'M1LAMPIRAN_GET_ERR';
export const M1LAMPIRAN_GET_OK = 'M1LAMPIRAN_GET_OK';
export const M1LAMPIRAN_WAIT_PENDING = 'M1LAMPIRAN_WAIT_PENDING';
export const M1LAMPIRAN_PRINT = 'M1LAMPIRAN_PRINT';
export const M1LAMPIRAN_PRINT_OK = 'M1LAMPIRAN_PRINT_OK'; 

export const LESEN_SAVE = 'LESEN_SAVE';
export const LESEN_CANCEL = 'LESEN_CANCEL';
export const LESEN_SAVE_SUCCESS = 'LESEN_SAVE_SUCCESS';
export const LESEN_MESSAGE_END = 'LESEN_MESSAGE_END';
export const LESEN_SAVE_ERR = 'LESEN_SAVE_ERR';
export const LESEN_CANCEL_OK = 'LESEN_CANCEL_OK';
export const LESEN_GET = 'LESEN_GET';
export const LESEN_GET_ERR = 'LESEN_GET_ERR';
export const LESEN_GET_OK = 'LESEN_GET_OK';
export const LESEN_WAIT_PENDING = 'LESEN_WAIT_PENDING';

export const SKIMKHAS_SAVE = 'SKIMKHAS_SAVE';
export const SKIMKHAS_CANCEL = 'SKIMKHAS_CANCEL';
export const SKIMKHAS_SAVE_SUCCESS = 'SKIMKHAS_SAVE_SUCCESS';
export const SKIMKHAS_MESSAGE_END = 'SKIMKHAS_MESSAGE_END';
export const SKIMKHAS_SAVE_ERR = 'SKIMKHAS_SAVE_ERR';
export const SKIMKHAS_CANCEL_OK = 'SKIMKHAS_CANCEL_OK';
export const SKIMKHAS_GET = 'SKIMKHAS_GET';
export const SKIMKHAS_GET_ERR = 'SKIMKHAS_GET_ERR';
export const SKIMKHAS_GET_OK = 'SKIMKHAS_GET_OK';
export const SKIMKHAS_WAIT_PENDING = 'SKIMKHAS_WAIT_PENDING';
export const SKIMKHAS_PRINT = 'SKIMKHAS_PRINT';
export const SKIMKHAS_PRINT_OK = 'SKIMKHAS_PRINT_OK'; 

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
export const JOBTITLE_GET = 'JOBTITLE_GET'; 
export const JOBTITLE_GET_OK = 'JOBTITLE_GET_OK';
export const COUNTRY_GET = 'COUNTRY_GET'; 
export const COUNTRY_GET_OK = 'COUNTRY_GET_OK';


export const LOGIN_DO = 'LOGIN_DO';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERR = 'LOGIN_ERR';
 
export const VIEW = 0;
export const UPDATE = 1; 
export const ADD = 2; 
export const DELETE = 4;

export const DELETE_ITEM_DELIMITER = ',';
export const DELETE_ITEM_FIELD = 'deleteItems';

export interface CityAppState {
	status?: number;	
	type? : string; 
	data?  : CityData; 	
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