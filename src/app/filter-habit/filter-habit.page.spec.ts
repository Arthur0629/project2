import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHabitPage } from './filter-habit.page';

describe('FilterHabitPage', () => {
  let component: FilterHabitPage;
  let fixture: ComponentFixture<FilterHabitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterHabitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHabitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
