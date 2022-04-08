import { Component, OnInit } from '@angular/core';
import { Forcast } from 'src/app/weather-org/types/forcast.type';
import { Geo } from 'src/app/weather-org/types/geo.type';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  emittedForcast!: Forcast;
  refresh!: number;
  constructor() { }

  selectedGeo!: Geo;

  ngOnInit(): void {
  }


}
