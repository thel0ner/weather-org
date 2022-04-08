import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Forcast } from 'src/app/weather-org/types/forcast.type';

@Component({
  selector: 'app-humidity-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.scss']
})
export class HumidityChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() forcast!: Forcast;
  @ViewChild('HumidityChart', { static: false }) HumidityChart!: ElementRef;
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
      text: 'Humidity chart'
    },
    series: [
      {
        name: 'humidity',
        data: [],
      } as any
    ]
  };
  humidity: any[][] = [[]];
  constructor() { }

  private generateChart() {
    this.humidity = this.forcast?.list.map(item => {
      const temp: any[] = [];
      temp.push(item.dt_txt);
      temp.push(item.main.humidity);
      return temp;
    });
    this.chartOptions = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        width: this.HumidityChart.nativeElement?.clientWidth,
      },
      title: {
        text: 'humidity chart'
      },
      yAxis: {
        min: Math.min(...this.humidity.map(item => item[1])),
        max: Math.max(...this.humidity.map(item => item[1])),
        title: {
          text: 'humidity'
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
          name: 'humidity',
          data: this.humidity,
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
