import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportGrnComponent } from './report-grn.component';
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

describe('ReportGrnComponent', () => {
  let component: ReportGrnComponent;
  let fixture: ComponentFixture<ReportGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGrnComponent ],
      imports : [NgxDatatableModule,
        DialogModule, ReactiveFormsModule, FormsModule, CalendarModule, TabViewModule,
        StoreModule, HttpClientModule, BrowserAnimationsModule], 
     providers: [ {provide: Store, useValue: userServiceStub }, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
