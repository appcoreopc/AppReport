import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LampiranM1ComponentComponent } from './lampiran-m1-component.component';

describe('LampiranM1ComponentComponent', () => {
  let component: LampiranM1ComponentComponent;
  let fixture: ComponentFixture<LampiranM1ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampiranM1ComponentComponent ]
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
