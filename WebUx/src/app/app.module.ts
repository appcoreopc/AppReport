import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponentComponent } from './user/user-component/user-component.component';
import { EmployeeComponentComponent } from './employee/employee-component/employee-component.component';
import { RawMaterialComponentComponent } from './material/raw-material-component/raw-material-component.component';
import { MaterialCategoryComponentComponent } from './material/material-category-component/material-category-component.component';
import { StnCustomComponentComponent } from './material/stn-custom-component/stn-custom-component.component';
import { SupplierComponentComponent } from './material/supplier-component/supplier-component.component';
import { ConfigResourceComponentComponent } from './setup/config-resource-component/config-resource-component.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeEffects } from './employee/employee-component/employeeEffects';
import {EmployeeReducer} from './employee/employee-component/employeeReducer';

export const ROUTES: Routes = [
   { path: 'employee', component: EmployeeComponentComponent },
  { path: 'user', component: UserComponentComponent }
];


@NgModule({
  declarations: [
      AppComponent,
    UserComponentComponent,
    EmployeeComponentComponent,
    RawMaterialComponentComponent,
    MaterialCategoryComponentComponent,
    StnCustomComponentComponent,
    SupplierComponentComponent,
    ConfigResourceComponentComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    StoreModule.forRoot([EmployeeReducer]),
    EffectsModule.forRoot([EmployeeEffects]), 
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
