import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGenderPage } from './filter-gender.page';

describe('FilterGenderPage', () => {
  let component: FilterGenderPage;
  let fixture: ComponentFixture<FilterGenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
