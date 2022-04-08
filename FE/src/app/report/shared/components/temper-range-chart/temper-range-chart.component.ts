import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import addMore from "highcharts/highcharts-more";

import { Forcast } from 'src/app/weather-org/types/forcast.type';

@Component({
  selector: 'app-temper-range-chart',
  templateUrl: './temper-range-chart.component.html',
  styleUrls: ['./temper-range-chart.component.scss']
})
export class TemperRangeChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() forcast!: Forcast;
  @ViewChild('TempRangeChart', { static: false }) TempRangeChart!: ElementRef;
  @HostListener('window:resize', ['$event']) onResize() {
    setTimeout(
      () => this.generateChart(), 300
    );
  }
  startListenForOnChanges = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'arearange',
      width: 100,
    },
    title: {
      text: 'Temperature range chart'
    },
    series: [
      {
        name: 'range',
        data: [],
      } as any
    ]
  };
  tempRange: any[][] = [[]];
  constructor() { }


  private generateChart() {
    this.tempRange = [...this.forcast?.list.sort(
      (before, after) => before.dt - after.dt
    ).map(item => {
      const temp: any[] = [];
      temp.push(item.dt_txt);
      temp.push(item.main.temp_min);
      temp.push(item.main.temp_max);
      return temp;
    })];
    this.chartOptions = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'arearange',
        zoomType: 'x',
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
        },
        width: this.TempRangeChart.nativeElement?.clientWidth,
      },
      title: {
        text: 'temperature range chart'
      },
      yAxis: {
        title: {
          text: 'Temperature range'
        }
      },
      xAxis: {
        categories: this.forcast.list.map(item =>
          Highcharts.dateFormat('%Y-%m-%d', new Date(item.dt_txt).getTime())
        ),
      },
      tooltip: {
        shared: true,
        valueSuffix: '°C',
        xDateFormat: '%A, %b %e'
      },

      series: [
        {
          name: 'temperature range',
          data: this.tempRange,
        } as any
      ]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.startListenForOnChanges && this.generateChart();
  }

  ngOnInit(): void {
    addMore(Highcharts);
  }

  ngAfterViewInit(): void {
    this.startListenForOnChanges = true;
    this.generateChart();
  }
}
