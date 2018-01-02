import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCategoryComponentComponent } from './material-category-component.component';

describe('MaterialCategoryComponentComponent', () => {
  let component: MaterialCategoryComponentComponent;
  let fixture: ComponentFixture<MaterialCategoryComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCategoryComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCategoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
