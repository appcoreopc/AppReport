import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialComponentComponent } from './raw-material-component.component';

describe('RawMaterialComponentComponent', () => {
  let component: RawMaterialComponentComponent;
  let fixture: ComponentFixture<RawMaterialComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
