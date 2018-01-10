import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponentComponent } from './user/user-component/user-component.component';
import { NavigationComponent } from './navigation/navigation.component';


import { EmployeeComponentComponent } from './employee/employee-component/employee-component.component';
import { RawMaterialComponentComponent } from './material/raw-material-component/raw-material-component.component';
import { MaterialCategoryComponentComponent } from './material/material-category-component/material-category-component.component';
import { StnCustomComponentComponent } from './material/stn-custom-component/stn-custom-component.component';
import { SupplierComponentComponent } from './material/supplier-component/supplier-component.component';
import { ConfigResourceComponentComponent } from './setup/config-resource-component/config-resource-component.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { EmployeeEffects } from './employee/employee-component/employeeEffects';
import {EmployeeReducer} from './employee/employee-component/employeeReducer';

import { UserEffects } from './user/user-component/userEffects';
import { UserReducer} from './user/user-component/userReducer';
import { HttpClientModule}  from '@angular/common/http';


export const ROUTES: Routes = [
   { path: 'employee', component: EmployeeComponentComponent },
   { path: 'user', component: UserComponentComponent }, 
   { path: 'supplier', component  : SupplierComponentComponent }
];

import { ReactiveFormsModule }          from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    UserComponentComponent,
    EmployeeComponentComponent,
    NavigationComponent,
    RawMaterialComponentComponent,
    MaterialCategoryComponentComponent,
    StnCustomComponentComponent,
    SupplierComponentComponent,
    ConfigResourceComponentComponent
  ],
  imports: [
    BrowserModule, NgxDatatableModule,ReactiveFormsModule,HttpClientModule,
     
    StoreModule.forRoot([EmployeeReducer, UserReducer]),
    EffectsModule.forRoot([EmployeeEffects, UserEffects]), 
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
