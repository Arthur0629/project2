import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAgePage } from './filter-age.page';

describe('FilterAgePage', () => {
  let component: FilterAgePage;
  let fixture: ComponentFixture<FilterAgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAgePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
