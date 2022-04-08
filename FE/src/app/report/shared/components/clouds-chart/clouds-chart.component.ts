import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Forcast } from 'src/app/weather-org/types/forcast.type';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-clouds-chart',
  templateUrl: './clouds-chart.component.html',
  styleUrls: ['./clouds-chart.component.scss']
})
export class CloudsChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() forcast!: Forcast;
  @ViewChild('CloudsChart', { static: false }) CloudsChart!: ElementRef;
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
      type: 'area',
      width: 100,
    },
    title: {
      text: 'clouds chart'
    },
    series: [
      {
        name: 'cloudy',
        data: [],
      } as any
    ]
  };
  clouds: number[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.startListenForOnChanges && this.generateChart();
  }


  private generateChart() {
    this.clouds = this.forcast.list?.map(item => +item.clouds.all);
    this.chartOptions = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'area',
        width: this.CloudsChart.nativeElement?.clientWidth,
      },
      title: {
        text: 'clouds chart'
      },
      yAxis: {
        min: Math.min(...this.clouds),
        max: Math.max(...this.clouds),
        title: {
          text: 'clouds'
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
          name: 'clouds',
          data: this.clouds,
        } as any
      ]
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startListenForOnChanges = true;
    this.generateChart();
  }
}
