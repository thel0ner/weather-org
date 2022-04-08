import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forcast } from 'src/app/weather-org/types/forcast.type';
import { environment } from 'src/environments/environment';
import { BackendIntegrationModule } from '../backend-integration.module';

@Injectable({
  providedIn: BackendIntegrationModule
})
export class GetReportService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getReport(pageId: number): Observable<Forcast> {
    const url = `${environment.backend}/run.php`;
    const params = new HttpParams()
      .append('pageId', pageId);
    return this.httpClient.get<Forcast>(url, { params });
  }
}
