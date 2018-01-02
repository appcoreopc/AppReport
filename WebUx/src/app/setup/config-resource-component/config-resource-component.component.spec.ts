import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigResourceComponentComponent } from './config-resource-component.component';

describe('ConfigResourceComponentComponent', () => {
  let component: ConfigResourceComponentComponent;
  let fixture: ComponentFixture<ConfigResourceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigResourceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigResourceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
