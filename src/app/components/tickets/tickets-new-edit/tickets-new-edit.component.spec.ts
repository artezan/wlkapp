import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsNewEditComponent } from './tickets-new-edit.component';

describe('TicketsNewEditComponent', () => {
  let component: TicketsNewEditComponent;
  let fixture: ComponentFixture<TicketsNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
