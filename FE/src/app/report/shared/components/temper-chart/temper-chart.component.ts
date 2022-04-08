import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Forcast } from 'src/app/weather-org/types/forcast.type';

@Component({
  selector: 'app-temper-chart',
  templateUrl: './temper-chart.component.html',
  styleUrls: ['./temper-chart.component.scss']
})
export class TemperChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() forcast!: Forcast;
  @ViewChild('TempertureChart', { static: false }) TempertureChart!: ElementRef;
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
      type: 'column',
      width: 100,
    },
    title: {
      text: 'Temperature chart'
    },
    series: [
      {
        name: 'cloudy',
        data: [],
      } as any
    ]
  };
  tempertures:number[] = [];
  constructor() { }

  private generateChart() {
    this.tempertures = this.forcast?.list.map(item => item.main.temp);
    this.chartOptions = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        width: this.TempertureChart.nativeElement?.clientWidth,
      },
      title: {
        text: 'Temperature chart'
      },
      yAxis: {
        min: Math.min(...this.tempertures),
        max: Math.max(...this.tempertures),
        title: {
          text: 'Temperature'
        }
      },
      xAxis: {
        categories: this.forcast.list.map(item =>
          Highcharts.dateFormat('%Y-%m-%d', new Date(item.dt_txt).getTime())
        ),
        title: {
          text: 'dates'
        }
      },
      series: [
        {
          name: 'Temperature',
          data: this.tempertures,
        } as any
      ]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.startListenForOnChanges && this.generateChart();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startListenForOnChanges = true;
    this.generateChart();
  }

}
