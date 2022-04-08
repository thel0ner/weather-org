import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetReportsService } from 'src/app/backend-integration/services/get-reports.service';

@Component({
  selector: 'app-goto-reports-btn',
  templateUrl: './goto-reports-btn.component.html',
  styleUrls: ['./goto-reports-btn.component.scss']
})
export class GotoReportsBtnComponent implements OnInit, OnChanges {
  @Input() refetch!: number;
  loading = false;
  count = 0;
  constructor(
    private getReportsService: GetReportsService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refetch'].currentValue) {
      this.getCount();
    }
  }

  private getCount() {
    this.loading = true;
    this.getReportsService.getReports(1, 10).subscribe(
      next => {
        this.loading = false;
        this.count = next.totalValues;
      },
      error => {
        this.loading = false;
        this.toastr.error('server error');
      }
    );
  }

  ngOnInit(): void {
    this.getCount();
  }

  go(){
    this.router.navigate(['/reports/list'])
  }
}
