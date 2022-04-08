import { TestBed } from '@angular/core/testing';

import { RecordReportService } from './record-report.service';

describe('RecordReportService', () => {
  let service: RecordReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
