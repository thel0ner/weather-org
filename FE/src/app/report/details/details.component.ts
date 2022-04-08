import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { GetReportService } from 'src/app/backend-integration/services/get-report.service';
import { Forcast } from 'src/app/weather-org/types/forcast.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  loading = false;
  forcast!:Forcast;
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private getReport: GetReportService, 
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.getReport.getReport(id))
    ).subscribe(
      next => {
        this.loading = false;
        this.forcast = next;
      },
      erorr => {
        this.loading = false;
        this.toastr.error('server error');
      }
    );
  }

}
