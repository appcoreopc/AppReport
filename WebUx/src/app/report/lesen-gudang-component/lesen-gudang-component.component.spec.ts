import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesenGudangComponentComponent } from './lesen-gudang-component.component';

describe('LesenGudangComponentComponent', () => {
  let component: LesenGudangComponentComponent;
  let fixture: ComponentFixture<LesenGudangComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesenGudangComponentComponent ]
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
