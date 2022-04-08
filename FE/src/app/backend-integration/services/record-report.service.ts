import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forcast } from 'src/app/weather-org/types/forcast.type';
import { environment } from 'src/environments/environment';
import { BackendIntegrationModule } from '../backend-integration.module';
import { RecordResponse } from '../types/record-response.type';

@Injectable({
  providedIn: BackendIntegrationModule
})
export class RecordReportService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public record(record: Forcast): Observable<RecordResponse> {
    const url = `${environment.backend}/run.php`;
    const body = new FormData();
    body.append('record', JSON.stringify(record));
    return this.httpClient.post<RecordResponse>(url, body);
  }
}
