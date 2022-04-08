import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecordReportService } from 'src/app/backend-integration/services/record-report.service';
import { Forcast } from 'src/app/weather-org/types/forcast.type';

@Component({
  selector: 'app-save-data',
  templateUrl: './save-data.component.html',
  styleUrls: ['./save-data.component.scss']
})
export class SaveDataComponent implements OnInit, OnChanges {
  @Output() savedData: EventEmitter<number> = new EventEmitter();
  @Input() forcast!: Forcast;
  loading = false;
  saved = false;
  constructor(
    private recordReportService: RecordReportService,
    private toastr: ToastrService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.saved = false;
  }

  ngOnInit(): void {
  }

  record() {
    this.loading = true;
    this.recordReportService.record(this.forcast).subscribe(
      next => {
        this.loading = false;
        this.saved = true;
        this.savedData.emit(Math.random());
        this.toastr.success('data saved successfully.');
      },
      error => {
        this.loading = false;
        this.toastr.error('server error');
      }
    );
  }

}
