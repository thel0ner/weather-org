import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Units } from '../enums/units.enum';
import { Forcast } from '../types/forcast.type';
import { WeatherOrgModule } from '../weather-org.module';

@Injectable({
  providedIn: WeatherOrgModule
})
export class Forcast5Service {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getForcast5(lat: number, lon: number, units: Units = Units.metric): Observable<Forcast> {
    const url = 'http://api.openweathermap.org/data/2.5/forecast';
    const params = new HttpParams()
      .append('lat', lat)
      .append('lon', lon)
      .append('units', units)
      .append('appid', environment.weatherOrgApiKey);
    return this.httpClient.get<Forcast>(url, { params });
  }
}
