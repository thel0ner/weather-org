import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetReportsService } from 'src/app/backend-integration/services/get-reports.service';
import { Report } from 'src/app/backend-integration/types/report.type';
import { City } from 'src/app/weather-org/types/city.type';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.scss']
})
export class ListReportsComponent implements OnInit {
  @HostListener('window:scroll', ['events'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY === document.body.scrollHeight &&
      !this.loading
      && this.report.totalValues !== this.report.rows.length
    ) {
      this.loadReport(true);
    }
  }
  loading = false;
  report!: Report;
  pageNumber = 1;
  cities:City[] = [];
  constructor(
    private getReports: GetReportsService,
    private toastr: ToastrService,
  ) { }

  private loadReport(justAppend = false) {
    this.loading = true;
    this.getReports.getReports(this.pageNumber, 10).subscribe(
      next => {
        if (justAppend) {
          this.report.rows = this.report.rows.concat(next.rows);
        } else {
          this.report = next;
        }
        this.cities = this.report.rows.map(item => item.city);
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error('server error');
      }
    );
  }

  ngOnInit(): void {
    this.loadReport();
  }

}
