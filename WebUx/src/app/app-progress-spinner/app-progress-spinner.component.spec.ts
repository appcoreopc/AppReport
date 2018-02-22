import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { AppProgressSpinnerComponent } from './app-progress-spinner.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let userServiceStub = { 
  subscribe : function() {
  },
  dispatch : function() {
  }
};

describe('AppProgressSpinnerComponent', () => {
  let component: AppProgressSpinnerComponent;
  let fixture: ComponentFixture<AppProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProgressSpinnerComponent ], 
      imports : [ProgressSpinnerModule, DialogModule, ReactiveFormsModule, 
        FormsModule, StoreModule, BrowserAnimationsModule ],
        providers: [ {provide: Store, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
