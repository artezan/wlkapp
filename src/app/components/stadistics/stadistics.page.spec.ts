import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticsPage } from './stadistics.page';

describe('StadisticsPage', () => {
  let component: StadisticsPage;
  let fixture: ComponentFixture<StadisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadisticsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
