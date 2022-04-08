import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendIntegrationModule } from '../backend-integration.module';
import { Report } from '../types/report.type';

@Injectable({
  providedIn: BackendIntegrationModule
})
export class GetReportsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getReports(start: number, length: number): Observable<Report> {
    const url = `${environment.backend}/run.php`;
    const params = new HttpParams()
      .append('report', 'yes')
      .append('length', length)
      .append('start', start);
    return this.httpClient.get<Report>(url, { params });
  }

}
