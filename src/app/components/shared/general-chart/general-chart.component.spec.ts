import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralChartComponent } from './general-chart.component';

describe('GeneralChartComponent', () => {
  let component: GeneralChartComponent;
  let fixture: ComponentFixture<GeneralChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
