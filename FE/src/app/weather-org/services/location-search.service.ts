import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Geo } from '../types/geo.type';
import { WeatherOrgModule } from '../weather-org.module';

@Injectable({
  providedIn: WeatherOrgModule
})
export class LocationSearchService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getCityInfo(query: string, limit = 5): Observable<Geo[]> {
    const url = 'http://api.openweathermap.org/geo/1.0/direct';
    const params = new HttpParams()
      .append('limit', limit)
      .append('q', query)
      .append('appid', environment.weatherOrgApiKey);
    return this.httpClient.get<Geo[]>(url, { params });
  }
}
