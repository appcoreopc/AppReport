import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesenGudangComponentComponent } from './lesen-gudang-component.component';
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
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';

let userServiceStub = { 
  subscribe : function() {
  },
  dispatch : function() {
  }
};

describe('LesenGudangComponentComponent', () => {
  let component: LesenGudangComponentComponent;
  let fixture: ComponentFixture<LesenGudangComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesenGudangComponentComponent ],
      imports : [NgxDatatableModule,
        DialogModule, ReactiveFormsModule, FormsModule, TabViewModule,
        CalendarModule, TableModule,
        StoreModule, HttpClientModule, BrowserAnimationsModule], 
     providers: [ {provide: Store, useValue: userServiceStub }, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesenGudangComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
