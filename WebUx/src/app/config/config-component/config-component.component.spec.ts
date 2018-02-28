
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigComponentComponent } from './config-component.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {Store} from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

let userServiceStub = { 
  subscribe : function() {
  },
  dispatch : function() {
  }
};

describe('ConfigComponentComponent', () => {
  let component: ConfigComponentComponent;
  let fixture: ComponentFixture<ConfigComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigComponentComponent],
      imports : [
        DialogModule, ReactiveFormsModule, FormsModule, ButtonModule, NgxDatatableModule,
        StoreModule, HttpClientModule, BrowserAnimationsModule], 
         providers: [ {provide: Store, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
