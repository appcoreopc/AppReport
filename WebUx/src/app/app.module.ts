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

import { SupplierEffects } from './material/supplier-component/supplierEffects';
import { SupplierReducer} from './material/supplier-component/supplierReducer';

import { MaterialCategoryEffects } from './material/material-category-component//materialCategoryEffects';
import { MaterialCategoryReducer} from './material/material-category-component/materialCategoryReducer';

import { RawMaterialEffects } from './material/raw-material-component/rawMaterialEffects';
import { RawMaterialReducer} from './material/raw-material-component/rawMaterialReducer';

import { HttpClientModule }  from '@angular/common/http';

import { ReportEffects } from './reporting/reporting-component//reportingEffects';
import { ReportReducer} from './reporting/reporting-component/reportingReducer';
import { ReactiveFormsModule }          from '@angular/forms';

import { ReportGrnComponent } from './report/report-grn/report-grn.component';
import { LampiranM1ComponentComponent } from './report/lampiran-m1-component/lampiran-m1-component.component';
import { LesenGudangComponentComponent } from './report/lesen-gudang-component/lesen-gudang-component.component';
import { SkimKhasComponentComponent } from './report/skim-khas-component/skim-khas-component.component';

import { GrnReducer } from './report/report-grn/grnReducer';
import { M1LampiranReducer } from './report/lampiran-m1-component/m1Reducer';
import { LesenReducer } from './report/lesen-gudang-component/lesenReducer';
import { SkimKhasReducer } from './report/skim-khas-component/skimReducer';

import { GrnEffects } from './report/report-grn/grnEffects';
import { M1LampiranEffects } from './report/lampiran-m1-component/m1Effects';
import { SkimKhasEffects } from './report/skim-khas-component/skimEffects';
import { LesenEffects } from './report/lesen-gudang-component/lesenEffects';

import { UOMEffects } from './effects/uomEffects';
import { UOMReducer } from './reducers/uomReducer';

import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';

export const ROUTES: Routes = [
  { path: 'employee', component: EmployeeComponentComponent },
  { path: 'user', component: UserComponentComponent }, 
  { path: 'supplier', component  : SupplierComponentComponent },
  { path: 'materialCategory', component  : MaterialCategoryComponentComponent },
  { path: 'rawMaterial', component  : RawMaterialComponentComponent },
  { path: 'grn', component  : ReportGrnComponent },
  { path: 'm1', component  : LampiranM1ComponentComponent },
  { path: 'lesen', component  : LesenGudangComponentComponent },
  { path: 'skim', component  : SkimKhasComponentComponent }
];

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
    ConfigResourceComponentComponent,
    ReportGrnComponent,
    LampiranM1ComponentComponent,
    LesenGudangComponentComponent,
    SkimKhasComponentComponent
  ],
  imports: [
    BrowserModule, NgxDatatableModule, ReactiveFormsModule, HttpClientModule, CalendarModule, 
    BrowserAnimationsModule, DialogModule,ConfirmDialogModule, SharedModule,

    StoreModule.forRoot([EmployeeReducer, UserReducer, ReportReducer,
       SupplierReducer, MaterialCategoryReducer, RawMaterialReducer, GrnReducer,
        M1LampiranReducer, SkimKhasReducer, LesenReducer, UOMReducer]),
       
    EffectsModule.forRoot([EmployeeEffects, UserEffects, 
       ReportEffects, SupplierEffects, MaterialCategoryEffects, 
       RawMaterialEffects, GrnEffects, M1LampiranEffects, 
       SkimKhasEffects, LesenEffects, UOMEffects]), 
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
