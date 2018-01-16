import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkimKhasComponentComponent } from './skim-khas-component.component';

describe('SkimKhasComponentComponent', () => {
  let component: SkimKhasComponentComponent;
  let fixture: ComponentFixture<SkimKhasComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkimKhasComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkimKhasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
