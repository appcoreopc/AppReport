import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponentComponent } from './user/user-component/user-component.component';
import { NavigationComponent } from './navigation/navigation.component';

import { ConfigComponentComponent } from './config/config-component/config-component.component';
import { EmployeeComponentComponent } from './employee/employee-component/employee-component.component';
import { RawMaterialComponentComponent } from './material/raw-material-component/raw-material-component.component';
import { ReadyStockComponent } from './material/readystock-component/readystock-component.component';
import { MaterialCategoryComponentComponent } from './material/material-category-component/material-category-component.component';
import { StnCustomComponentComponent } from './material/stn-custom-component/stn-custom-component.component';
import { SupplierComponent } from './material/supplier-component/supplier-component.component';
import { ConfigResourceComponentComponent } from './setup/config-resource-component/config-resource-component.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ConfigEffects } from './config/config-component/configEffects';
import { ConfigReducer} from './config/config-component/configReducer';

import { EmployeeEffects } from './employee/employee-component/employeeEffects';
import { EmployeeReducer} from './employee/employee-component/employeeReducer';

import { UserEffects } from './user/user-component/userEffects';
import { UserReducer} from './user/user-component/userReducer';

import { AppProgressSpinnerReducer } from './app-progress-spinner/app-progress-spinner.reducer';

import { SupplierEffects } from './material/supplier-component/supplierEffects';
import { SupplierReducer} from './material/supplier-component/supplierReducer';

import { MaterialCategoryEffects } from './material/material-category-component//materialCategoryEffects';
import { MaterialCategoryReducer} from './material/material-category-component/materialCategoryReducer';

import { RawMaterialEffects } from './material/raw-material-component/rawMaterialEffects';
import { RawMaterialReducer} from './material/raw-material-component/rawMaterialReducer';
 
import { ReadyStockEffects } from './material/readystock-component/readyStockEffects';
import { ReadyStockReducer} from './material/readystock-component/readyStockReducer';

import { StnCustomEffects } from './material/stn-custom-component/stnCustomEffects';
import { StnCustomReducer} from './material/stn-custom-component/stnCustomReducer';


import { HttpClientModule }  from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReportGrnComponent } from './report/report-grn/report-grn.component';
import { LampiranM1ComponentComponent } from './report/lampiran-m1-component/lampiran-m1-component.component';
import { LesenGudangComponentComponent } from './report/lesen-gudang-component/lesen-gudang-component.component';
import { SkimKhasComponentComponent } from './report/skim-khas-component/skim-khas-component.component';
import { SkimKhasDataEntryComponent } from './report/skim-khas-component/skim-khas-data-entry';

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

import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { AuthGuard } from './auth/AuthGuard';
import { AuthService } from './auth/auth-service.service';
import { LoginComponent } from './login/login.component';
import { AppProgressSpinnerComponent } from './app-progress-spinner/app-progress-spinner.component';

export const ROUTES: Routes = [
  { path: 'config', component  : ConfigComponentComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponentComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponentComponent, canActivate: [AuthGuard] }, 
  { path: 'supplier', component  : SupplierComponent, canActivate: [AuthGuard]  },
  { path: 'materialCategory', component  : MaterialCategoryComponentComponent, canActivate: [AuthGuard] },
  { path: 'rawMaterial', component  : RawMaterialComponentComponent, canActivate: [AuthGuard] },
  { path: 'readyStock', component  : ReadyStockComponent, canActivate: [AuthGuard] },
  { path: 'stnCustom', component  : StnCustomComponentComponent, canActivate: [AuthGuard]  },
  { path: 'grn', component  : ReportGrnComponent, canActivate: [AuthGuard]  },
  { path: 'm1', component  : LampiranM1ComponentComponent, canActivate: [AuthGuard]  },
  { path: 'lesen', component  : LesenGudangComponentComponent, canActivate: [AuthGuard] },
  { path: 'skim', component  : SkimKhasComponentComponent, canActivate: [AuthGuard] },
  { path: 'login', component  : LoginComponent },
  { path: 'logout', component  : LoginComponent, canActivate: [AuthGuard]},
  { path: '**', component: EmployeeComponentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent, 
    UserComponentComponent,
    ConfigComponentComponent,
    EmployeeComponentComponent,
    NavigationComponent,
    RawMaterialComponentComponent,
    ReadyStockComponent,
    MaterialCategoryComponentComponent,
    StnCustomComponentComponent,
    SupplierComponent,
    ConfigResourceComponentComponent,
    ReportGrnComponent,
    LampiranM1ComponentComponent,
    LesenGudangComponentComponent,
    SkimKhasComponentComponent, SkimKhasDataEntryComponent,
    LoginComponent,
    AppProgressSpinnerComponent
  ],
  imports: [
    BrowserModule, NgxDatatableModule, ReactiveFormsModule, HttpClientModule, CalendarModule, ProgressSpinnerModule,
    BrowserAnimationsModule, DialogModule, MultiSelectModule,ConfirmDialogModule, SharedModule, TabViewModule,TableModule,FormsModule,
    
    StoreModule.forRoot([ConfigReducer, EmployeeReducer, UserReducer, AppProgressSpinnerReducer,
      SupplierReducer, MaterialCategoryReducer, RawMaterialReducer, ReadyStockReducer, GrnReducer,
      M1LampiranReducer, SkimKhasReducer, LesenReducer, UOMReducer, StnCustomReducer]),
      
      EffectsModule.forRoot([ConfigEffects, EmployeeEffects, UserEffects, 
        SupplierEffects, MaterialCategoryEffects, 
        RawMaterialEffects, ReadyStockEffects, GrnEffects, M1LampiranEffects, 
        SkimKhasEffects, LesenEffects, UOMEffects, StnCustomEffects]), 
        RouterModule.forRoot(ROUTES)
      ],
      providers: [AuthGuard, AuthService],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    