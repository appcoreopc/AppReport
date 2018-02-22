import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {Store} from '@ngrx/store';

let userServiceStub = { 
  subscribe : function() {
  },
  dispatch : function() {
  }
};

import { AuthService } from './auth-service.service';
describe('AuthServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ReactiveFormsModule, FormsModule, 
        StoreModule, HttpClientModule, BrowserAnimationsModule],
      providers: [AuthService, {provide: Store, useValue: userServiceStub }, HttpClient]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
