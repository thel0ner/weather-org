import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudsChartComponent } from './clouds-chart.component';

describe('CloudsChartComponent', () => {
  let component: CloudsChartComponent;
  let fixture: ComponentFixture<CloudsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
