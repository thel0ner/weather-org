import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { BackendIntegrationModule } from '../backend-integration/backend-integration.module';
import { WeatherOrgModule } from '../weather-org/weather-org.module';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { OutletComponent } from './outlet/outlet.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { CloudsChartComponent } from './shared/components/clouds-chart/clouds-chart.component';
import { GotoReportsBtnComponent } from './shared/components/goto-reports-btn/goto-reports-btn.component';
import { HumidityChartComponent } from './shared/components/humidity-chart/humidity-chart.component';
import { ReportTitleComponent } from './shared/components/report-title/report-title.component';
import { SaveDataComponent } from './shared/components/save-data/save-data.component';
import { SearchFieldComponent } from './shared/components/search-field/search-field.component';
import { TemperChartComponent } from './shared/components/temper-chart/temper-chart.component';
import { TemperRangeChartComponent } from './shared/components/temper-range-chart/temper-range-chart.component';
import { WeatherReportComponent } from './shared/components/weather-report/weather-report.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    ReportComponent,
    SearchFieldComponent,
    ReportTitleComponent,
    WeatherReportComponent,
    CloudsChartComponent,
    TemperChartComponent,
    TemperRangeChartComponent,
    HumidityChartComponent,
    SaveDataComponent,
    GotoReportsBtnComponent,
    OutletComponent,
    ListReportsComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HighchartsChartModule,
    ReportRoutingModule,
    WeatherOrgModule,
    BackendIntegrationModule
  ]
})
export class ReportModule { }
