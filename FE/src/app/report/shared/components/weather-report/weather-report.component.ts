import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Forcast5Service } from 'src/app/weather-org/services/forcast-5.service';
import { Forcast } from 'src/app/weather-org/types/forcast.type';
import { Geo } from 'src/app/weather-org/types/geo.type';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit, OnChanges {
  @Input() geo!: Geo;
  @Input() dataWillBeProvided = false;
  @Input() providedForCast!: Forcast;
  @Output() freshForcast: EventEmitter<Forcast> = new EventEmitter();
  weatherInfo!: Forcast;
  loading = false;
  constructor(
    private forcast5Service: Forcast5Service,
    private toastr: ToastrService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataWillBeProvided) {
      this.weatherInfo = this.providedForCast;
    } else {
      this.lookForWeatherInfo();
    }
  }

  private lookForWeatherInfo() {
    this.loading = true;
    this.forcast5Service.getForcast5(this.geo.lat, this.geo.lon).subscribe(
      next => {
        this.weatherInfo = next;
        this.loading = false;
        this.freshForcast.emit(next);
        console.log(next);
      },
      error => {
        this.toastr.error('server error!');
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
  }

}
