import { Component, Input, OnInit } from '@angular/core';
import { Forcast } from 'src/app/weather-org/types/forcast.type';

@Component({
  selector: 'app-report-title',
  templateUrl: './report-title.component.html',
  styleUrls: ['./report-title.component.scss']
})
export class ReportTitleComponent implements OnInit {
  @Input() forcast!:Forcast;
  @Input() id!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
