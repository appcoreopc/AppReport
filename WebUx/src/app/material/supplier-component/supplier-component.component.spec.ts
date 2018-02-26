import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierComponentComponent } from './supplier-component.component';


import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';

let userServiceStub = { 
  subscribe : function() {
  },
  dispatch : function() {
  }
};

describe('SupplierComponentComponent', () => {
  let component: SupplierComponentComponent;
  let fixture: ComponentFixture<SupplierComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierComponentComponent ],
      imports : [NgxDatatableModule, ButtonModule,
        DialogModule, ReactiveFormsModule, FormsModule, 
        StoreModule, HttpClientModule, BrowserAnimationsModule], 
     providers: [ {provide: Store, useValue: userServiceStub }, HttpClient ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
