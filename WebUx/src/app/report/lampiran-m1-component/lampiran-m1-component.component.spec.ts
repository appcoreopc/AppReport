import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LampiranM1ComponentComponent } from './lampiran-m1-component.component';
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


describe('LampiranM1ComponentComponent', () => {
  let component: LampiranM1ComponentComponent;
  let fixture: ComponentFixture<LampiranM1ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampiranM1ComponentComponent ],
      imports : [NgxDatatableModule, TableModule,
        DialogModule, ReactiveFormsModule, FormsModule, TabViewModule,
        CalendarModule, 
        StoreModule, HttpClientModule, BrowserAnimationsModule], 
     providers: [ {provide: Store, useValue: userServiceStub }, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampiranM1ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
