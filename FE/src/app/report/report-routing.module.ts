import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { OutletComponent } from './outlet/outlet.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: 'submit',
        component: ReportComponent
      },
      {
        path: 'list',
        component: ListReportsComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: '',
        redirectTo: 'submit',
        pathMatch: 'full'
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
