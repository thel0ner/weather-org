import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperChartComponent } from './temper-chart.component';

describe('TemperChartComponent', () => {
  let component: TemperChartComponent;
  let fixture: ComponentFixture<TemperChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
