import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StnCustomComponentComponent } from './stn-custom-component.component';

describe('StnCustomComponentComponent', () => {
  let component: StnCustomComponentComponent;
  let fixture: ComponentFixture<StnCustomComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StnCustomComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StnCustomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
