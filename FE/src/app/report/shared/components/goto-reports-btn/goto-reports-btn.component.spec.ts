import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoReportsBtnComponent } from './goto-reports-btn.component';

describe('GotoReportsBtnComponent', () => {
  let component: GotoReportsBtnComponent;
  let fixture: ComponentFixture<GotoReportsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotoReportsBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotoReportsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
