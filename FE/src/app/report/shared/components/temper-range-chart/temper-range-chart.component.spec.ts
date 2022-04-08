import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperRangeChartComponent } from './temper-range-chart.component';

describe('TemperRangeChartComponent', () => {
  let component: TemperRangeChartComponent;
  let fixture: ComponentFixture<TemperRangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperRangeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperRangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
