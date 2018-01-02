import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierComponentComponent } from './supplier-component.component';

describe('SupplierComponentComponent', () => {
  let component: SupplierComponentComponent;
  let fixture: ComponentFixture<SupplierComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierComponentComponent ]
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
