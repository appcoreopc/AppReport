import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponentComponent } from './employee-component.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import {
  CityAppState,
  ADD,
  UPDATE,
  USER_GET,
  USER_GET_OK,
  USER_SAVE,
  USER_SAVE_SUCCESS
} from '../../sharedObjects/sharedMessages';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';


let userServiceStub = { 
  subscribe : function() {
  },
  dispatch : function() {
  }
};

describe('EmployeeComponentComponent', () => {
  let component: EmployeeComponentComponent;
  let fixture: ComponentFixture<EmployeeComponentComponent>;
  let store : Store<CityAppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeComponentComponent ],
      imports : [NgxDatatableModule,
        DialogModule, ReactiveFormsModule, FormsModule, 
        StoreModule, HttpClientModule, BrowserAnimationsModule], 
     providers: [ {provide: Store, useValue: userServiceStub }, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
  
});
